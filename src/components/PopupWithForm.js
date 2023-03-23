// Импортируем класс с родительским попапом
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {callbackSubmitForm}) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupForm = this._popupSelector.querySelector(".popup__form");
        this._popupInputList = this._popupForm.querySelectorAll(".popup__input");
    }

    // Приватный метод, собирающий данные всех полей формы
    _getInputValues() {
        this._popupInputValues = {};
        this._popupInputList.forEach(item => {
            this._popupInputValues[item.name] = item.value;
        });
        return this._popupInputValues;
    }

    // Перезаписанный родительский метод, добавляющий обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues());
        });
    }

    // Перезаписанный родительский метод, добавляющий сброс формы при закрытии попапа
    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }
}
