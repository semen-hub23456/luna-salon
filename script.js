
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

// Получаем элементы галереи
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const closeLightbox = document.getElementById("close-lightbox");

// Открываем увеличенную фотографию
if (lightbox) {
    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            lightbox.hidden = false;
        });
    });
}

// Закрываем галерею по крестику
if (closeLightbox && lightbox) {
    closeLightbox.addEventListener("click", function () {
        lightbox.hidden = true;
    });
}

// Закрываем галерею при клике вне фотографии
if (lightbox) {
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.hidden = true;
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
