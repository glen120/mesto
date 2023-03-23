// Импортируем все переменные и массив с карточками
import {initialCards,
        popupProfile, popupCard, popupImage,
        popupBtnEdit, popupBtnAdd,
        nameInput, jobInput,
        profileName, profileJob,
        cardNameInput, cardLinkInput} from "../utils/constants.js";

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

// Импортируем класс с валидацией инпутов и объект валидации
import {FormValidator, formsConfig} from "../components/FormValidator.js";

// Объявляем попап редактирования профиля
const userInfo = new UserInfo({profileName, profileJob});

const popupEditProfile = new PopupWithForm(popupProfile, {callbackSubmitForm: (userData) => {
    userInfo.setUserInfo(userData);
    popupEditProfile.closePopup();
    },
});

popupEditProfile.setEventListeners();

// Объявляем попап добавления карточки
const popupAddCard = new PopupWithForm(popupCard, {callbackSubmitForm: () => {
    renderInitialCards.addItem(addCard({name: cardNameInput.value, link: cardLinkInput.value}));
    popupAddCard.closePopup();
    }
});

popupAddCard.setEventListeners();

// Объявляем попап просмотра карточки
const popupOpenImage = new PopupWithImage(popupImage);

popupOpenImage.setEventListeners();

// Объявляем переменные для валидации попапа редактирования профиля и попапа добавления карточки
const profileValidation = new FormValidator(formsConfig, popupProfile);
const cardValidation = new FormValidator(formsConfig, popupCard);

// Объявляем переменную для отображения массива карточек
const renderInitialCards = new Section({items: initialCards, renderer: (cardData) => {
        renderInitialCards.addItem(addCard(cardData));
    }}, ".card");

// Функция добавления новой карточки
function addCard(cardData) {
    const newCard = new Card(cardData, "#card-template", handleCardClick);
    return newCard.createCard();
}

// Функция, открывающая попап просмотра карточки
function handleCardClick(link, name) {
popupOpenImage.openPopup(link, name);
}

// Активируем отображение массива карточек
renderInitialCards.renderItems();

// Активируем валидацию попапов
profileValidation.enableValidation();
cardValidation.enableValidation();

// Обработчик кнопки открытия попапа редактирования профиля
popupBtnEdit.addEventListener("click", () => {
    popupEditProfile.openPopup();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job;
    profileValidation.removeValidationErrors();
});

// Обработчик кнопки открытия попапа добавления карточки
popupBtnAdd.addEventListener("click", () => {
    popupAddCard.openPopup();
    cardValidation.disableButtonState();
    cardValidation.removeValidationErrors();
});
