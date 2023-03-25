export default class Popup {
    constructor(popup) {
        this._popup = popup;
    }

    // Метод, открывающий попап
    openPopup() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._closeEsc);
    }

    // Метод, закрывающий попап
    closePopup() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._closeEsc);
    }

    // Приватный метод, закрывающий попап на кнопку Esc
    _closeEsc = (evt) => {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    }

    // Метод, закрывающий попап на крестик или по клику в пустой области
    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
                this.closePopup();
            }
        });
    }
}




