
// Получаем элементы окна записи
const bookingButton = document.getElementById("booking-button");
const bookingModal = document.getElementById("booking-modal");
const closeBooking = document.getElementById("close-booking");

// Открываем окно записи
bookingButton.addEventListener("click", function () {
    bookingModal.hidden = false;
});

// Закрываем окно записи по крестику
closeBooking.addEventListener("click", function () {
    bookingModal.hidden = true;
});

// Закрываем окно записи при клике вне него
bookingModal.addEventListener("click", function (event) {
    if (event.target === bookingModal) {
        bookingModal.hidden = true;
    }
});

// Получаем элементы галереи
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const closeLightbox = document.getElementById("close-lightbox");

// Открываем увеличенную фотографию
galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
        lightbox.hidden = false;
    });
});

// Закрываем галерею по крестику
closeLightbox.addEventListener("click", function () {
    lightbox.hidden = true;
});

// Закрываем галерею при клике вне фотографии
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.hidden = true;
    }
});

// Закрываем окна клавишей Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        bookingModal.hidden = true;
        lightbox.hidden = true;
    }
});
