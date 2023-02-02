// Объявляем переменные для открытия и закрытия попапа редактирования профиля
const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupProfContainer = document.querySelector(".popup_profile");
const popupProfBtnClosed = document.querySelector(".popup__close-button_profile");

//Объявляем переменные для открытия и закрытия попапа добавления карточки
const popupBtnAdd = document.querySelector(".profile__add-button");
const popupCardContainer = document.querySelector(".popup_card");
const popupCardBtnClosed = document.querySelector(".popup__close-button_card");

// Объявляем переменные для формы ввода данных в попапе редактирования профиля
const profileForm = document.querySelector(".popup__form_profile");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");

// Объявляем переменные для текстовых значений профиля
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Функция открытия попапа редактирования профиля и присваивания инпутам текстовых значений профиля
function openProfPopup() {
    popupProfContainer.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//Функция открытия попапа добавления карточки
function openCardPopup() {
    popupCardContainer.classList.add("popup_opened");
}

// Функция закрытия попапа редактирования профиля
function closeProfPopup() {
    popupProfContainer.classList.remove("popup_opened");
    }

// Функция закрытия попапа добавления карточки
function closeCardPopup() {
    popupCardContainer.classList.remove("popup_opened");
}

// Функция отправки новых текстовых значений инпутов в профиль
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeProfPopup();
}

// Обработчик кнопки открытия попапа редактирования профиля
popupBtnEdit.addEventListener("click", openProfPopup);

// Обработчик кнопки открытия попапа добавления карточки
popupBtnAdd.addEventListener("click", openCardPopup);

// Обработчик кнопки закрытия попапа редактирования профиля
popupProfBtnClosed.addEventListener("click", closeProfPopup);

// Обработчик кнопки закрытия попапа добавления карточки
popupCardBtnClosed.addEventListener("click", closeCardPopup);

// Обработчик формы сохранения новых данных профиля
profileForm.addEventListener('submit', handleFormSubmit);

//Объявляем массив с карточками
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Объявляем переменные для массива карточек и формы ввода новых карточек
const template = document.querySelector("#card-template").content.querySelector(".card__cell");
const list = document.querySelector(".card");
const cardForm = document.querySelector(".popup__form_card");
const cardNameInput = cardForm.querySelector(".popup__input_card_name");
const cardLinkInput = cardForm.querySelector(".popup__input_card_link");

//Объявляем переменные для попапа просмотра карточки
const popupImageOpen = document.querySelector(".popup_image");
const popupImagePicture = document.querySelector(".popup__image-picture");
const popupImageSign = document.querySelector(".popup__image-sign");

renderCards();

//Обработчик формы добавления новой карточки
cardForm.addEventListener('submit',(evt) => {
    evt.preventDefault();
    const card = createCard({name: cardNameInput.value, link: cardLinkInput.value});
    list.prepend(card);
    closeCardPopup();
});

//Функция отображения массива карточек
function renderCards() {
    const cards = initialCards.map((item) => {
        return createCard(item);
    });
    list.append(...cards);
}

//Функция создания карточки, обработчик удаления карточки, кнопки лайка и попапа карточки
function createCard(item) {
    const card = template.cloneNode(true);
    card.querySelector(".card__image").src = item.link;
    card.querySelector(".card__image").alt = item.name;
    card.querySelector(".card__title").textContent = item.name;
    card.querySelector(".card__bin-button").addEventListener("click", () => {
        card.remove();
    });
    card.querySelector(".card__like-button").addEventListener("click", (evt)=> {
        evt.target.classList.toggle("card__like-button_active");
    });
    card.querySelector(".card__image").addEventListener("click", () => {
        openImagePopup();
        closeImagePopup();
        popupImagePicture.src = item.link;
        popupImageSign.textContent = item.name;
    });
    return card;
}

//Функция открытия попапа карточки
function openImagePopup() {
    popupImageOpen.classList.add("popup_opened");
}

//Функция закрытия попапа карточки
function closeImagePopup() {
    const popupImageBtnClosed = document.querySelector(".popup__close-button_image");
    popupImageBtnClosed.addEventListener("click", () => {
        popupImageOpen.classList.remove("popup_opened");
    });
}
