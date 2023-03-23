// Импортируем класс с родительским попапом
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImagePicture = this._popupSelector.querySelector(".popup__image-picture");
        this._popupImageSign = this._popupSelector.querySelector(".popup__image-sign");
    }

    // Перезаписанный родительский метод, открывающий попап просмотра карточки
    openPopup(link, name) {
        super.openPopup();
        this._popupImagePicture.src = link;
        this._popupImagePicture.alt = name;
        this._popupImageSign.textContent = name;
    }
}