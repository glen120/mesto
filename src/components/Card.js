export default class Card {
    constructor({link, name}, templateSelector, handleCardClick) {
        this._link = link;
        this._name = name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    // Метод клонирования темплейта
    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector(".card__cell").cloneNode(true);
    }

    // Метод создания карточки
    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._cardImage = this._element.querySelector(".card__image");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        return this._element;
    }

    // Метод постановки слушателей событий
     _setEventListeners() {
         this._element.querySelector(".card__bin-button").addEventListener("click", () =>
             this._element.remove());
         this._element.querySelector(".card__like-button").addEventListener("click", (evt) =>
             evt.target.classList.toggle("card__like-button_active"));
         this._element.querySelector(".card__image").addEventListener("click", () =>
             this._handleCardClick(this._link, this._name));
     }
}