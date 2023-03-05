// Объект валидации
export const formsConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorTextSelector: '.popup__input-error',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active'
}

export class FormValidator {
    constructor(formsConfig, formElement) {
        this._formElement = formElement;
        this._inputSelector = formsConfig.inputSelector;
        this._submitButtonSelector = formsConfig.submitButtonSelector;
        this._inactiveButtonClass = formsConfig.inactiveButtonClass;
        this._inputErrorClass = formsConfig.inputErrorClass;
        this._errorClass = formsConfig.errorClass;
        this._errorTextSelector = formsConfig.errorTextSelector;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._textErrors = this._formElement.querySelectorAll(this._errorTextSelector);
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    // Метод отображения ошибок
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    // Метод скрытия ошибок
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    // Метод проверки валидации
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Метод прохода по массиву инпутов
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // Метод переключения кнопки submit
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableButtonState();
        } else {
            this._enableButtonState();
        }
    }

    // Метод выключения кнопки submit
    disableButtonState() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", true);
    }

    // Метод включения кнопки submit
    _enableButtonState() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled", false);
    }

    // Метод проверки инпутов
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    // Метод удаления сообщений об ошибках при закрытии попапов
    removeValidationErrors() {
        this._textErrors.forEach((textItem) => {
            textItem.classList.remove(this._errorClass);
            textItem.textContent = "";
        });
        this._inputList.forEach((lineItem) => {
            lineItem.classList.remove(this._inputErrorClass);
        });
    }

    // Метод запуска проверки валидации
    enableValidation () {
        this._setEventListeners();
    }
}