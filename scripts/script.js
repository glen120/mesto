// Импортируем функции открытия и закрытия попапа
import {openPopup, closePopup} from "./utils/utils.js";

// Импортируем переменную для попапа просмотра карточки и массив с карточками
import {popupImage, initialCards} from "./utils/constants.js";

// Импортируем класс с конструктором карточек
import Card from "./Card.js";

// Импортируем класс с валидацией инпутов и объект валидации
import {FormValidator, formsConfig} from "./FormValidator.js";

// Объявляем переменные для открытия и закрытия попапа редактирования профиля
const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupProfBtnClosed = document.querySelector(".popup__close-button_profile");
const popupProfile = document.querySelector(".popup_profile");

//Объявляем переменные для открытия и закрытия попапа добавления карточки
const popupBtnAdd = document.querySelector(".profile__add-button");
const popupCardBtnClosed = document.querySelector(".popup__close-button_card");
const popupCard = document.querySelector(".popup_card");

// Объявляем переменные для формы ввода данных в попапе редактирования профиля
const profileForm = document.querySelector(".popup__form_profile");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");

// Объявляем переменные для текстовых значений профиля
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Объявляем переменную, которая находит все попапы
const popupList = document.querySelectorAll(".popup");

// Объявляем переменные для массива карточек и формы ввода новых карточек
const cardsContainer = document.querySelector(".card");
const cardForm = document.querySelector(".popup__form_card");
const cardNameInput = cardForm.querySelector(".popup__input_card_name");
const cardLinkInput = cardForm.querySelector(".popup__input_card_link");
const cardSubmit = cardForm.querySelector(".popup__save-button");

// Объявляем переменную для закрывания попапа просмотра карточки на кнопку
const popupImageBtnClosed = document.querySelector(".popup__close-button_image");

// Объявляем переменные для валидации попапа редактирования профиля и попапа добавления карточки
const profileValidation = new FormValidator(formsConfig, popupProfile);
const cardValidation = new FormValidator(formsConfig, popupCard);

// Функция добавления новой карточки
function addCard(cardData) {
    const newCard = new Card(cardData, "#card-template").createCard();
    return newCard;
}

// Функция отображения массива карточек
function renderInitialCards() {
    initialCards.forEach(cardData => {
        cardsContainer.append(addCard(cardData));
    });
}

// Вызываем функцию для добавления массива карточек
renderInitialCards();

// Активируем валидацию попапов
profileValidation.enableValidation();
cardValidation.enableValidation();

// Обработчик кнопки открытия попапа редактирования профиля
popupBtnEdit.addEventListener("click", () => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    profileValidation.removeValidationErrors();
});

// Обработчик формы сохранения новых данных профиля
profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
});

// Обработчик кнопки закрытия попапа редактирования профиля
popupProfBtnClosed.addEventListener("click", () => {
    closePopup(popupProfile);
});

// Обработчик кнопки открытия попапа добавления карточки
popupBtnAdd.addEventListener("click", () => {
    openPopup(popupCard);
    cardForm.reset();
    cardValidation.removeValidationErrors();
});

// Обработчик формы добавления новой карточки
cardForm.addEventListener("submit",(evt) => {
    evt.preventDefault();
    cardsContainer.prepend(addCard({name: cardNameInput.value, link: cardLinkInput.value}));
    cardValidation.disableButtonState();
    cardSubmit.classList.add("popup__save-button_disabled");
    closePopup(popupCard);
});

// Обработчик кнопки закрытия попапа добавления карточки
popupCardBtnClosed.addEventListener("click", () => {
    closePopup(popupCard);
});

//Обработчик закрытия попапа просмотра карточки
popupImageBtnClosed.addEventListener("click", () => {
    closePopup(popupImage);
});

// Обработчик закрытия попапов на клик за пределы попапа
popupList.forEach(function (item) {
    item.addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(evt.target);
        }
    });
});
