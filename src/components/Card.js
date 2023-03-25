export default class Card {
    constructor({link, name}, templateSelector, handleCardClick) {
        this._link = link;
        this._name = name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();
        this._binButton = this._element.querySelector(".card__bin-button");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._cardImage = this._element.querySelector(".card__image");
    }

    // Метод клонирования темплейта
    _getTemplate() {
        return document.querySelector(this._templateSelector).
        content.querySelector(".card__cell").
        cloneNode(true);
    }

    // Метод создания карточки
    createCard() {
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        return this._element;
    }

    // Метод постановки слушателей событий
     _setEventListeners() {
         this._binButton.addEventListener("click", () => this._removeCard());
         this._likeButton.addEventListener("click", () => this._likeCard());
         this._cardImage.addEventListener("click", () => this._handleCardClick(this._link, this._name));
     }

    // Метод удаления карточки
    _removeCard() {
        this._element.remove();
        this._element = null;
    }

    // Метод постановки лайка
    _likeCard() {
        this._likeButton.classList.toggle("card__like-button_active");
    }

}