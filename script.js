
// ==========================================
// LUNA — ОСНОВНОЙ JAVASCRIPT
// ==========================================

// Общие настройки
let previouslyFocusedElement = null;
let previousBodyOverflow = "";

// Получаем элементы окна записи
const bookingButton = document.getElementById("booking-button");
const bookingModal = document.getElementById("booking-modal");
const closeBooking = document.getElementById("close-booking");

// Получаем элементы галереи
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");
const prevPhoto = document.getElementById("prev-photo");
const nextPhoto = document.getElementById("next-photo");
const photoCounter = document.getElementById("photo-counter");

// Получаем кнопку возврата наверх
const scrollTopButton = document.getElementById("scroll-top");

let currentPhotoIndex = 0;
let touchStartX = 0;


// ==========================================
// УПРАВЛЕНИЕ ПРОКРУТКОЙ СТРАНИЦЫ
// ==========================================

function lockPageScroll() {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
}

function unlockPageScroll() {
    document.body.style.overflow = previousBodyOverflow;
}


// ==========================================
// УПРАВЛЕНИЕ ОКНОМ ЗАПИСИ
// ==========================================

function openBookingModal() {
    if (!bookingModal) return;

    // Закрываем галерею, если она открыта
    if (lightbox && !lightbox.hidden) {
        closeGallery(false);
    }

    previouslyFocusedElement = document.activeElement;

    bookingModal.hidden = false;
    lockPageScroll();

    if (closeBooking) {
        closeBooking.focus();
    }
}

function closeBookingModal(restoreFocus = true) {
    if (!bookingModal || bookingModal.hidden) return;

    bookingModal.hidden = true;
    unlockPageScroll();

    if (restoreFocus && previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }
}

if (bookingButton) {
    bookingButton.addEventListener("click", openBookingModal);
}

const serviceBookingButtons = document.querySelectorAll(
    ".service-booking-button"
);

serviceBookingButtons.forEach(function (button) {
    button.addEventListener("click", openBookingModal);
});

if (closeBooking) {
    closeBooking.addEventListener("click", function () {
        closeBookingModal();
    });
}

if (bookingModal) {
    bookingModal.addEventListener("click", function (event) {
        if (event.target === bookingModal) {
            closeBookingModal();
        }
    });
}


// ==========================================
// ГАЛЕРЕЯ ФОТОГРАФИЙ
// ==========================================

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

    if (!image) return;

    // Плавно скрываем старую фотографию
    lightboxImage.style.opacity = "0";

    // Обновляем изображение
    lightboxImage.onload = function () {
        if (currentPhotoIndex === index) {
            lightboxImage.style.opacity = "1";
        }
    };

    lightboxImage.onerror = function () {
        lightboxImage.alt = "Не удалось загрузить фотографию: " + image.alt;
        lightboxImage.style.opacity = "1";
        console.warn("Не удалось загрузить изображение:", image.src);
    };

    lightboxImage.alt = image.alt;
    lightboxImage.src = image.currentSrc || image.src;

    // Обновляем счётчик
    if (photoCounter) {
        photoCounter.textContent =
            (currentPhotoIndex + 1) + " / " + galleryItems.length;
    }
}

function openGallery(index) {
    if (!lightbox) return;

    previouslyFocusedElement = document.activeElement;

    showPhoto(index);
    lightbox.hidden = false;
    lockPageScroll();

    if (closeLightbox) {
        closeLightbox.focus();
    }
}

function closeGallery(restoreFocus = true) {
    if (!lightbox || lightbox.hidden) return;

    lightbox.hidden = true;

    if (lightboxImage) {
        lightboxImage.onload = null;
        lightboxImage.onerror = null;
        lightboxImage.removeAttribute("src");
    }

    unlockPageScroll();

    if (restoreFocus && previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }
}

// Открытие фотографий
galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
        openGallery(index);
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

// Закрытие по крестику
if (closeLightbox) {
    closeLightbox.addEventListener("click", function () {
        closeGallery();
    });
}

// Закрытие по нажатию на фон
if (lightbox) {
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeGallery();
        }
    });
}


// ==========================================
// КЛАВИАТУРА
// ==========================================

function getFocusableElements(container) {
    if (!container) return [];

    return Array.from(
        container.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), ' +
            'select:not([disabled]), textarea:not([disabled]), ' +
            '[tabindex]:not([tabindex="-1"])'
        )
    ).filter(function (element) {
        return element.offsetParent !== null;
    });
}

document.addEventListener("keydown", function (event) {

    // Закрытие активного окна по Escape
    if (event.key === "Escape") {
        if (lightbox && !lightbox.hidden) {
            closeGallery();
            return;
        }

        if (bookingModal && !bookingModal.hidden) {
            closeBookingModal();
            return;
        }
    }

    // Переключение фотографий
    if (lightbox && !lightbox.hidden) {

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showPhoto(currentPhotoIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPhoto(currentPhotoIndex - 1);
        }
    }

    // Удерживаем Tab внутри открытого окна
    const activeDialog =
        lightbox && !lightbox.hidden
            ? lightbox
            : bookingModal && !bookingModal.hidden
                ? bookingModal
                : null;

    if (activeDialog && event.key === "Tab") {
        const focusableElements = getFocusableElements(activeDialog);

        if (focusableElements.length === 0) {
            event.preventDefault();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});


// ==========================================
// ПЕРЕКЛЮЧЕНИЕ СВАЙПОМ НА ТЕЛЕФОНЕ
// ==========================================

if (lightbox) {

    lightbox.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (event) {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;

        // Игнорируем короткие движения
        if (Math.abs(difference) < 50) return;

        if (difference > 0) {
            showPhoto(currentPhotoIndex + 1);
        } else {
            showPhoto(currentPhotoIndex - 1);
        }
    }, { passive: true });
}


// ==========================================
// КНОПКА ВОЗВРАТА НАВЕРХ
// ==========================================

function updateScrollTopButton() {
    if (!scrollTopButton) return;

    scrollTopButton.style.display =
        window.scrollY > 300 ? "block" : "none";
}

if (scrollTopButton) {

    window.addEventListener("scroll", updateScrollTopButton, {
        passive: true
    });

    updateScrollTopButton();

    scrollTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

