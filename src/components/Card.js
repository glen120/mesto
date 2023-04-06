export default class Card {
    constructor({link, name, likes, owner, _id}, templateSelector, handleCardClick, handleCardRemove, handleCardLike, userId) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._owner = owner;
        this._id = _id;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleCardLike = handleCardLike;
        this._element = this._getTemplate();
        this._binButton = this._element.querySelector(".card__bin-button");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._likeCounter = this._element.querySelector(".card__like-counter");
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
        this._likeToggle();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        if (this._owner._id !== this._userId) {
        this._element.querySelector(".card__bin-button").remove();
        }

        this._likeCounter.textContent = this._likes.length;

        return this._element;
    }

    // Метод постановки слушателей событий
     _setEventListeners() {
         this._binButton.addEventListener("click", () => this._handleCardRemove(this._id));
         this._likeButton.addEventListener("click", () => this._handleCardLike(this._id));
         this._cardImage.addEventListener("click", () => this._handleCardClick(this._link, this._name));
     }

    // Метод удаления карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    // Метод, определяющий наличие лайка пользователя
    _checkUserLike() {
        return this._likes.some(user => user._id === this._userId);
    }

    // Метод переключения состояния лайка
    _likeToggle() {
        if (this._checkUserLike()) {
            this.setLike();
        } else {
            this.unsetLike();
        }
    }

    // Метод постановки лайка
    setLike() {
        this._likeButton.classList.add("card__like-button_active");
        this.isLiked = true;
    }

    // Метод снятия лайка
    unsetLike() {
        this._likeButton.classList.remove("card__like-button_active");
        this.isLiked = false;
    }

    // Метод обновления данных счетчика лайков
    updateLikesCounter(data) {
        this._likeCounter.textContent = data.likes.length;
    }
}