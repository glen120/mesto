const popupBtnOpen = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const popupBtnClosed = document.querySelector(".popup__close-button");

popupBtnOpen.addEventListener("click", openPopup);
popupBtnClosed.addEventListener("click", closePopup);

function openPopup() {
    popupContainer.classList.add("popup_opened");
}

function closePopup() {
    popupContainer.classList.remove("popup_opened");
}

let container = document.querySelector(".popup__container");
let nameInput = container.querySelector(".popup__name");
let jobInput = container.querySelector(".popup__job");

let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function FormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileJob.textContent = `${jobInput.value}`;
    closePopup();
}
container.addEventListener('submit', FormSubmit);