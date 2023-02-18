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
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card__cell");
const cardsContainer = document.querySelector(".card");
const cardForm = document.querySelector(".popup__form_card");
const cardNameInput = cardForm.querySelector(".popup__input_card_name");
const cardLinkInput = cardForm.querySelector(".popup__input_card_link");
const cardSubmit = cardForm.querySelector(".popup__save-button");

//Объявляем переменные для попапа просмотра карточки
const popupImage = document.querySelector(".popup_image");
const popupImagePicture = document.querySelector(".popup__image-picture");
const popupImageSign = document.querySelector(".popup__image-sign");
const popupImageBtnClosed = document.querySelector(".popup__close-button_image");

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeEsc);
    cardForm.reset();
    deleteValidationErrors();
    closeEsc(popup);
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

//Обработчик закрытия попапов на клик за пределы попапа
popupList.forEach(function (item) {
    item.addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(evt.target);
        }
    });
});

//Функция удаления сообщений об ошибках при закрытии попапов
function deleteValidationErrors() {
    const popupOpened = document.querySelector(".popup_opened");
    const textError = popupOpened.querySelectorAll(".popup__input-error");
    textError.forEach(function (textItem) {
        textItem.classList.remove("popup__input-error_active");
        textItem.textContent = "";
    });
    const lineError = popupOpened.querySelectorAll(".popup__input");
    lineError.forEach(function (lineItem) {
        lineItem.classList.remove("popup__input_invalid");
    });
}

// Обработчик кнопки открытия попапа редактирования профиля
popupBtnEdit.addEventListener("click", () => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

// Обработчик формы сохранения новых данных профиля
profileForm.addEventListener('submit', (evt) => {
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
});

// Обработчик кнопки закрытия попапа добавления карточки
popupCardBtnClosed.addEventListener("click", () => {
    closePopup(popupCard);
});

renderInitialCards();

//Обработчик формы добавления новой карточки
cardForm.addEventListener("submit",(evt) => {
    evt.preventDefault();
    cardSubmit.setAttribute("disabled", "true");
    cardSubmit.classList.add("popup__save-button_disabled");
    const card = createCard({name: cardNameInput.value, link: cardLinkInput.value});
    cardsContainer.prepend(card);
    closePopup(popupCard);
});

//Функция отображения массива карточек
function renderInitialCards() {
    const cards = initialCards.map((item) => {
        return createCard(item);
    });
    cardsContainer.append(...cards);
}

//Функция создания карточки
function createCard(cardData) {
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    card.querySelector(".card__title").textContent = cardData.name;
    //Обработчик удаления карточки
    card.querySelector(".card__bin-button").addEventListener("click", () => {
        card.remove();
    });
    //Обработчик кнопки лайка
    card.querySelector(".card__like-button").addEventListener("click", (evt)=> {
        evt.target.classList.toggle("card__like-button_active");
    });
    //Обработчик открытия попапа просмотра карточки
    cardImage.addEventListener("click", () => {
        openPopup(popupImage);
        popupImagePicture.src = cardData.link;
        popupImagePicture.alt = cardData.name;
        popupImageSign.textContent = cardData.name;
    });
    return card;
}

//Обработчик закрытия попапа просмотра карточки
popupImageBtnClosed.addEventListener("click", () => {
    closePopup(popupImage);
});




