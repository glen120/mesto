// Импортируем все переменные и массив с карточками
import {cards, formsConfig,
        popupProfile, popupCard, popupImage, popupAvatar, popupConfirm,
        popupBtnEdit, popupBtnAdd, popupBtnAvatar,
        nameInput, jobInput,
        profileName, profileJob, profileAvatar,
        cardNameInput, cardLinkInput} from "../utils/constants.js";

// Импортируем класс с запросами к серверу
import Api from "../components/Api.js";

// Импортируем класс отрисовки элементов
import Section from "../components/Section.js";

// Импортируем класс с конструктором карточек
import Card from "../components/Card.js";

// Импортируем класс с данными пользователя
import UserInfo from "../components/UserInfo.js";

// Импортируем класс попапов с формами
import PopupWithForm from "../components/PopupWithForm.js";

// Импортируем класс попапа просмотра карточки
import PopupWithImage from "../components/PopupWithImage.js";

// Импортируем класс попапа с подтверждением удаления карточки
import PopupWithConfirm from "../components/PopupWithConfirm.js";

// Импортируем класс с валидацией инпутов
import FormValidator from "../components/FormValidator.js";

// Импортируем css-файлов для сборки
import "./index.css";

// Объявляем класс API с токеном и идентификатором группы для обращения к серверу
const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-63/",
    headers: {
        "content-type": "application/json",
        authorization: "7f770afd-f38b-4e0e-9512-224ef62bef7f"
    }
});

// Объявляем попап редактирования профиля
const userInfo = new UserInfo({profileName, profileJob, profileAvatar});

const popupEditProfile = new PopupWithForm(popupProfile, {callbackSubmitForm: (userData) => {
    popupEditProfile.startSpinner();
    api.editProfile(userData)
        .then((res) => {
            userInfo.setUserInfo(res);
            popupEditProfile.closePopup();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupEditProfile.endSpinner();
        });
    }
});

// Объявляем попап смены аватара
const popupChangeAvatar = new PopupWithForm(popupAvatar, {callbackSubmitForm: (avatarData) => {
    popupChangeAvatar.startSpinner();
    api.editAvatar(avatarData)
        .then((res) => {
            userInfo.setUserAvatar(res);
            popupChangeAvatar.closePopup();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupChangeAvatar.endSpinner();
        });
    }
});

// Объявляем попап добавления карточки
const popupAddCard = new PopupWithForm(popupCard, {callbackSubmitForm: () => {
    const inputItem = {name: cardNameInput.value, link: cardLinkInput.value};
    popupAddCard.startSpinner();
    api.addNewCard(inputItem)
        .then((res) => {
            renderCards.addItem(addCard(res), true);
            popupAddCard.closePopup();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupAddCard.endSpinner();
        });
    }
});

// Объявляем попап просмотра карточки
const popupOpenImage = new PopupWithImage(popupImage);

// Объявляем попап с подтверждением удаления карточки
const popupWithConfirm = new PopupWithConfirm(popupConfirm, {callbackSubmitForm: (cardId) => {
    api.removeCard(cardId)
        .then(() => {
            cards[cardId].deleteCard();
            popupWithConfirm.closePopup();
        })
        .catch((err) => console.log(err));
    }
});

// Активируем отображение попапов
popupEditProfile.setEventListeners();
popupChangeAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupOpenImage.setEventListeners();
popupWithConfirm.setEventListeners();

// Объявляем переменные для валидации попапов с инпутами
const profileValidation = new FormValidator(formsConfig, popupProfile);
const cardValidation = new FormValidator(formsConfig, popupCard);
const avatarValidation = new FormValidator(formsConfig, popupAvatar);

// Объявляем переменную для отображения массива карточек
const renderCards = new Section({renderItems: (cardData) => {
        renderCards.addItem(addCard(cardData));
    }}, ".card");

// Функция добавления новой карточки
function addCard(cardData) {
    const newCard = new Card(cardData, "#card-template", handleCardClick, handleCardRemove, handleCardLike, userInfo.id);
    cards[cardData._id] = newCard;
    return newCard.createCard();
}

// Функция, открывающая попап просмотра карточки
function handleCardClick(link, name) {
    popupOpenImage.openPopup(link, name);
}

// Функция, открывающая попап с подтверждением удаления карточки
function handleCardRemove(cardId) {
    popupWithConfirm.targetCard(cardId);
    popupWithConfirm.openPopup();
}

// Функция, отвечающая за постановку и снятие лайков
function handleCardLike (cardId) {
    if (cards[cardId].isLiked) {
        api.removeLike(cardId)
            .then(likes => {
                cards[cardId].unsetLike();
                cards[cardId].updateLikesCounter(likes);
            })
            .catch((err) => console.log(err));
    } else {
        api.addLike(cardId)
            .then(likes => {
                cards[cardId].setLike();
                cards[cardId].updateLikesCounter(likes);
            })
            .catch((err) => console.log(err));
    }
}

// Получение от сервера первичных данных
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userInfo.save(userData);
        userInfo.setUserInfo(userData);
        userInfo.setUserAvatar(userData);
        renderCards.renderItems(initialCards.reverse());
    })
    .catch((err) => console.log(err));

// Активируем валидацию попапов
profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();

// Обработчик кнопки открытия попапа смены аватара
popupBtnAvatar.addEventListener("click", () => {
    popupChangeAvatar.openPopup();
    avatarValidation.removeValidationErrors();
})

// Обработчик кнопки открытия попапа редактирования профиля
popupBtnEdit.addEventListener("click", () => {
    popupEditProfile.openPopup();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().about;
    profileValidation.removeValidationErrors();
});

// Обработчик кнопки открытия попапа добавления карточки
popupBtnAdd.addEventListener("click", () => {
    popupAddCard.openPopup();
    cardValidation.removeValidationErrors();
});
