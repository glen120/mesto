// Импортируем класс с родительским попапом
import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popup, {callbackSubmitForm}) {
        super(popup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._confirmButton = this._popup.querySelector(".popup__save-button");
    }

    // Перезаписанный родительский метод, добавляющий обработчик кнопке подтверждения
    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener("click", () => {
            this._callbackSubmitForm(this._target);
        });
    }

    // Метод, задающий целевую карточку для передачи её колбэку
    setTargetCard(target) {
        this._target = target;
    }
}