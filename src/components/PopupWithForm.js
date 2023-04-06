// Импортируем класс с родительским попапом
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, {callbackSubmitForm}) {
        super(popup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._popupInputList = this._popupForm.querySelectorAll(".popup__input");
        this._saveButton = this._popupForm.querySelector(".popup__save-button");
        this._buttonText = this._saveButton.textContent;
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

    // Метод, сообщающий о начале процесса загрузки
    startSpinner() {
        this._loadingButtonText = "Сохранение...";
        this._saveButton.disabled = true;
        this._saveButton.textContent = this._loadingButtonText;
    }

    // Метод, возвращающий надпись на кнопке сохранения в исходное состояние
    endSpinner() {
        this._saveButton.disabled = false;
        this._saveButton.textContent = this._buttonText;
    }
}
