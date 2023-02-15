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
const popupContainer = document.querySelectorAll(".popup");

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add("popup_opened");
    closeEsc(popup);
}

// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

// Функция закрытия попапов на кнопку Esc
function closeEsc(evt) {
    document.addEventListener("keydown", closeEsc);
    if (evt.key === "Escape") {
        closePopup(popupProfile);
        closePopup(popupCard);
        closePopup(popupImage);
        deleteValidationErrors();
        cardForm.reset();
        document.removeEventListener("keydown", closeEsc);
    }
}

//Обработчик закрытия попапов на клик за пределы попапа
popupContainer.forEach(function (item) {
    item.addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popupProfile);
            closePopup(popupCard);
            closePopup(popupImage);
            deleteValidationErrors();
            cardForm.reset();
        }
    });
});

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
    deleteValidationErrors();
});

// Обработчик кнопки открытия попапа добавления карточки
popupBtnAdd.addEventListener("click", () => {
    openPopup(popupCard);
});

// Обработчик кнопки закрытия попапа добавления карточки
popupCardBtnClosed.addEventListener("click", () => {
    closePopup(popupCard);
    cardForm.reset();
    deleteValidationErrors();
});

//Объявляем переменные для массива карточек и формы ввода новых карточек
const template = document.querySelector("#card-template").content.querySelector(".card__cell");
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

renderCards();

//Обработчик формы добавления новой карточки
cardForm.addEventListener("submit",(evt) => {
    evt.preventDefault();
    cardSubmit.setAttribute("disabled", "disabled");
    const card = createCard({name: cardNameInput.value, link: cardLinkInput.value});
    cardForm.reset();
    cardsContainer.prepend(card);
    closePopup(popupCard);
});

//Функция отображения массива карточек
function renderCards() {
    const cards = initialCards.map((item) => {
        return createCard(item);
    });
    cardsContainer.append(...cards);
}

//Функция создания карточки
function createCard(item) {
    const card = template.cloneNode(true);
    card.querySelector(".card__image").src = item.link;
    card.querySelector(".card__image").alt = item.name;
    card.querySelector(".card__title").textContent = item.name;
    //Обработчик удаления карточки
    card.querySelector(".card__bin-button").addEventListener("click", () => {
        card.remove();
    });
    //Обработчик кнопки лайка
    card.querySelector(".card__like-button").addEventListener("click", (evt)=> {
        evt.target.classList.toggle("card__like-button_active");
    });
    //Обработчик открытия попапа просмотра карточки
    card.querySelector(".card__image").addEventListener("click", () => {
        openPopup(popupImage);
        popupImagePicture.src = item.link;
        popupImagePicture.alt = item.name;
        popupImageSign.textContent = item.name;
    });
    return card;
}

//Обработчик закрытия попапа просмотра карточки
popupImageBtnClosed.addEventListener("click", () => {
    closePopup(popupImage);
});

// Функция удаления сообщений об ошибках при закрытии попапов
function deleteValidationErrors() {
    const textError = document.querySelectorAll(".popup__input-error");
    textError.forEach(function (item) {
        item.classList.remove("popup__input-error_active");
        item.textContent = "";
    });
    const lineError = document.querySelectorAll(".popup__input");
    lineError.forEach(function (item) {
        item.classList.remove("popup__input_invalid");
    });
}




