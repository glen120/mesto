// Объявляем переменные для открытия и закрытия попапа
let popupBtnOpen = document.querySelector(".profile__edit-button");
let popupContainer = document.querySelector(".popup");
let popupBtnClosed = document.querySelector(".popup__close-button");

// Объявляем переменные для формы ввода попапа
let form = document.querySelector(".popup__form");
let nameInput = form.querySelector(".popup__input_name");
let jobInput = form.querySelector(".popup__input_job");

// Объявляем переменные для текстовых значений профиля
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

// Функция открытия попапа и присваивания инпутам текстовых значений профиля
function openPopup() {
    popupContainer.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// Функция закрытия попапа
function closePopup() {
    popupContainer.classList.remove("popup_opened");
}

// Функция отправки новых текстовых значений инпутов в профиль
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

// Слушатели событий
popupBtnOpen.addEventListener("click", openPopup);
popupBtnClosed.addEventListener("click", closePopup);
form.addEventListener('submit', handleFormSubmit);