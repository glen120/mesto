// Экспортируем функцию открытия попапа
export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeEsc);
}

// Экспортируем функцию закрытия попапа
export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeEsc);
}

// Функция закрытия попапов на кнопку Esc
function closeEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
    }
}

