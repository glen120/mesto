// Импортируем массив с карточками
import {initialCards} from "./initialCards.js";

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

//Объявляем переменные для массива карточек и формы ввода новых карточек
const cardsContainer = document.querySelector(".card");
const cardForm = document.querySelector(".popup__form_card");
const cardNameInput = cardForm.querySelector(".popup__input_card_name");
const cardLinkInput = cardForm.querySelector(".popup__input_card_link");
const cardSubmit = cardForm.querySelector(".popup__save-button");

//Объявляем переменные для попапа просмотра карточки
export const popupImage = document.querySelector(".popup_image");
export const popupImagePicture = document.querySelector(".popup__image-picture");
export const popupImageSign = document.querySelector(".popup__image-sign");
const popupImageBtnClosed = document.querySelector(".popup__close-button_image");

// Функция открытия попапа
export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeEsc);
}

// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeEsc);
}

// Функция закрытия попапов на кнопку Esc
function closeEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
    }
}

// Функция удаления сообщений об ошибках при закрытии попапов
function deleteValidationErrors(popupOpened) {
    const popupForm = popupOpened.querySelector(".popup__form");
    const textError = popupForm.querySelectorAll(".popup__input-error");
    textError.forEach(function (textItem) {
        textItem.classList.remove("popup__input-error_active");
        textItem.textContent = "";
    });
    const lineError = popupForm.querySelectorAll(".popup__input");
    lineError.forEach(function (lineItem) {
        lineItem.classList.remove("popup__input_invalid");
    });
}

// Функция отображения массива карточек
function renderInitialCards() {
    initialCards.forEach(cardData => {
        cardsContainer.append(new Card(cardData, "#card-template").createCard());
    });
}

// Функция валидации попапа редактирования профиля
function startProfileValidation() {
    const form = new FormValidator(formsConfig, popupProfile);
    form.enableValidation();
}

// Функция валидации попапа добавления карточки
function startCardValidation() {
    const form = new FormValidator(formsConfig, popupCard);
    form.enableValidation();
}

// Вызываем функцию для добавления карточек
renderInitialCards();

// Вызываем функцию валидации попапа редактирования профиля
startProfileValidation();

// Вызываем функцию валидации попапа добавления карточки
startCardValidation();

// Обработчик кнопки открытия попапа редактирования профиля
popupBtnEdit.addEventListener("click", () => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    deleteValidationErrors(popupProfile);
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
    deleteValidationErrors(popupCard);
});

// Обработчик формы добавления новой карточки
cardForm.addEventListener("submit",(evt) => {
    evt.preventDefault();
    cardsContainer.prepend(new Card({name: cardNameInput.value, link: cardLinkInput.value}, "#card-template").createCard());
    cardSubmit.setAttribute("disabled", "true");
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
