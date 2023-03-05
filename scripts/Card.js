import {popupImage, popupImagePicture, popupImageSign, openPopup} from "./script.js";

export default class Card {
    constructor(cardData, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
    }

    // Метод клонирования темплейта
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card__cell")
            .cloneNode(true);
        return cardElement;
    }

    // Метод создания карточки
    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        return this._element;
    }

    // Метод постановки слушателей событий
     _setEventListeners() {
         this._element.querySelector(".card__bin-button").addEventListener("click", () =>
             this._element.remove());
         this._element.querySelector(".card__like-button").addEventListener("click", (evt) =>
             evt.target.classList.toggle("card__like-button_active"));
         this._element.querySelector(".card__image").addEventListener("click", () => this._popupImageOpen());
     }

    // Метод открытия попапа просмотра карточки
     _popupImageOpen() {
         openPopup(popupImage);
         popupImagePicture.src = this._link;
         popupImagePicture.alt = this._name;
         popupImageSign.textContent = this._name;
     }
}