// Экспортируем переменные селекторов всех попапов
export const popupProfile = document.querySelector(".popup_profile");
export const popupCard = document.querySelector(".popup_card");
export const popupImage = document.querySelector(".popup_image");

// Экспортируем переменные для кнопок открытия попапов
export const popupBtnEdit = document.querySelector(".profile__edit-button");
export const popupBtnAdd = document.querySelector(".profile__add-button");

// Экспортируем переменные для формы ввода данных в попапе редактирования профиля
const profileForm = document.querySelector(".popup__form_profile");
export const nameInput = profileForm.querySelector(".popup__input_type_name");
export const jobInput = profileForm.querySelector(".popup__input_type_job");

// Экспортируем переменные для текстовых значений профиля
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");

// Экспортируем переменные для формы ввода в попапе добавления новых карточек
const cardForm = document.querySelector(".popup__form_card");
export const cardNameInput = cardForm.querySelector(".popup__input_card_name");
export const cardLinkInput = cardForm.querySelector(".popup__input_card_link");

// Экспортируем массив с карточками
export const initialCards = [
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }
];