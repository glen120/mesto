export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    // Проверяем результат запроса
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Произошла ошибка ${res.status}.`);
        }
    }

    // Запрашиваем начальные данные пользователя
    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then((res) => this._checkResponse(res));
    }

    // Запрашиваем начальные карточки
    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: "GET",
            headers: this._headers
        })
            .then((res) => this._checkResponse(res));
    }

    // Меняем аватар пользователя
    editAvatar(body) {
        return fetch(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body:JSON.stringify(body)
        })
            .then((res) => this._checkResponse(res));
    }

    // Редактируем данные пользователя
    editProfile(body) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then((res) => this._checkResponse(res));
    }

    // Добавляем новую карточку
    addNewCard({picture, link}) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: picture,
                link
            })
        })
            .then((res) => this._checkResponse(res));
    }

    // Удаляем карточку
    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then((res) => this._checkResponse(res));
    }

    // Ставим лайк карточке
    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        })
            .then((res) => this._checkResponse(res));
    }

    // Удаляем лайк карточке
    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
            .then((res) => this._checkResponse(res));
    }
}