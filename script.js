
// Получаем элементы окна записи
const bookingButton = document.getElementById("booking-button");
const bookingModal = document.getElementById("booking-modal");
const closeBooking = document.getElementById("close-booking");

// Функция открытия окна записи
function openBookingModal() {
    if (bookingModal) {
        bookingModal.hidden = false;
    }
}

// Открываем окно по кнопке в шапке
if (bookingButton) {
    bookingButton.addEventListener("click", openBookingModal);
}

// Открываем окно по кнопкам в карточках услуг
const serviceBookingButtons = document.querySelectorAll(".service-booking-button");

serviceBookingButtons.forEach(function (button) {
    button.addEventListener("click", openBookingModal);
});

// Закрываем окно записи по крестику
if (closeBooking && bookingModal) {
    closeBooking.addEventListener("click", function () {
        bookingModal.hidden = true;
    });
}

// Закрываем окно записи при клике вне него
if (bookingModal) {
    bookingModal.addEventListener("click", function (event) {
        if (event.target === bookingModal) {
            bookingModal.hidden = true;
        }
    });
}


// ГАЛЕРЕЯ ФОТОГРАФИЙ

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");

const prevPhoto = document.getElementById("prev-photo");
const nextPhoto = document.getElementById("next-photo");
const photoCounter = document.getElementById("photo-counter");

let currentPhotoIndex = 0;

// Показываем фотографию
function showPhoto(index) {
    if (!lightboxImage || galleryItems.length === 0) return;

    // Зацикливаем галерею
    if (index < 0) {
        index = galleryItems.length - 1;
    }

    if (index >= galleryItems.length) {
        index = 0;
    }

    currentPhotoIndex = index;

    const image = galleryItems[index].querySelector("img");

    if (image) {
        lightboxImage.style.opacity = "0";

        setTimeout(function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxImage.style.opacity = "1";
        }, 150);
    }

    if (photoCounter) {
        photoCounter.textContent =
            (currentPhotoIndex + 1) + " / " + galleryItems.length;
    }
}

// Открываем фотографию
galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
        showPhoto(index);
        lightbox.hidden = false;
    });
});

// Следующая фотография
if (nextPhoto) {
    nextPhoto.addEventListener("click", function () {
        showPhoto(currentPhotoIndex + 1);
    });
}

// Предыдущая фотография
if (prevPhoto) {
    prevPhoto.addEventListener("click", function () {
        showPhoto(currentPhotoIndex - 1);
    });
}

// Закрываем галерею
function closeGallery() {
    if (lightbox) {
        lightbox.hidden = true;
    }

    if (lightboxImage) {
        lightboxImage.src = "";
    }
}

if (closeLightbox) {
    closeLightbox.addEventListener("click", closeGallery);
}

// Закрытие при клике вне фотографии
if (lightbox) {
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeGallery();
        }
    });
}

// Переключение клавишами
document.addEventListener("keydown", function (event) {
    if (!lightbox || lightbox.hidden) return;

    if (event.key === "ArrowRight") {
        showPhoto(currentPhotoIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showPhoto(currentPhotoIndex - 1);
    }

    if (event.key === "Escape") {
        closeGallery();
    }
});

// Листание пальцем на телефоне
let touchStartX = 0;
let touchEndX = 0;

if (lightbox) {
    lightbox.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    lightbox.addEventListener("touchend", function (event) {
        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) < 50) return;

        if (difference > 0) {
            showPhoto(currentPhotoIndex + 1);
        } else {
            showPhoto(currentPhotoIndex - 1);
        }
    });
}


// Закрываем окна клавишей Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        if (bookingModal) {
            bookingModal.hidden = true;
        }

        if (lightbox) {
            lightbox.hidden = true;
        }
    }
});

// Кнопка возврата наверх
const scrollTopButton = document.getElementById("scroll-top");

if (scrollTopButton) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollTopButton.style.display = "block";
        } else {
            scrollTopButton.style.display = "none";
        }
    });

    scrollTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
