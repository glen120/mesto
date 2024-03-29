export default class FormValidator {
    constructor(formsConfig, formElement) {
        this._formElement = formElement;
        this._inputSelector = formsConfig.inputSelector;
        this._submitButtonSelector = formsConfig.submitButtonSelector;
        this._inactiveButtonClass = formsConfig.inactiveButtonClass;
        this._inputErrorClass = formsConfig.inputErrorClass;
        this._errorClass = formsConfig.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
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
            this._disableButtonState();
        } else {
            this._enableButtonState();
        }
    }

    // Метод выключения кнопки submit
    _disableButtonState() {
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

    // Метод, удаляющий сообщения об ошибках и отключающий кнопку submit при открытии попапов
    removeValidationErrors() {
        this._inputList.forEach(lineItem => this._hideInputError(lineItem));
        this._disableButtonState();
    }

    // Метод запуска проверки валидации
    enableValidation () {
        this._setEventListeners();
    }
}