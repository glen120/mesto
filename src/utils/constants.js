// Экспортируем переменные селекторов всех попапов
export const popupProfile = document.querySelector(".popup_profile");
export const popupCard = document.querySelector(".popup_card");
export const popupImage = document.querySelector(".popup_image");
export const popupAvatar = document.querySelector(".popup_avatar");
export const popupConfirm = document.querySelector(".popup_confirmation");

// Экспортируем переменные для кнопок открытия попапов
export const popupBtnEdit = document.querySelector(".profile__edit-button");
export const popupBtnAdd = document.querySelector(".profile__add-button");
export const popupBtnAvatar = document.querySelector(".profile__avatar-button");

// Экспортируем переменные для формы ввода данных в попапе редактирования профиля
const profileForm = document.querySelector(".popup__form_profile");
export const nameInput = profileForm.querySelector(".popup__input_type_name");
export const jobInput = profileForm.querySelector(".popup__input_type_job");

// Экспортируем переменные для текстовых значений профиля
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
export const profileAvatar =document.querySelector(".profile__avatar-image");

// Экспорт объекта с настройками валидации
export const formsConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active'
}

// Экспортируем пустой объект для хранения полученного от сервера массива карточек
export const cards = {};