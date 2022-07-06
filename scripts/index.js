import { cardsArr } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Text constants
const POPUP_OPEN = "popup_opened";

// DOM-elements
const profileNameElement = document.querySelector(".profile__title");
const profileSubtitleElement = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const elementList = document.querySelector(".element");
const popupsArray = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup_personal-data");
const popupAddCard = document.querySelector(".popup_add-card");
const popupImage = document.querySelector(".popup_large-img");
const popupImageImg = popupImage.querySelector(".popup__large-img-image");
const popupImageTitle = popupImage.querySelector(".popup__large-img-signature");
const formProfile = document.querySelector(".form_personal-data");
const formAddCard = document.querySelector(".form_add-card");
const nameInput = document.querySelector(".form__input_text_name");
const jobInput = document.querySelector(".form__input_text_description");
const cardNameInput = document.querySelector(".form__input_text_name-card");
const cardImageInput = document.querySelector(".form__input_text_image");

const validationConfig = {
    formSelector: ".form",
    formSetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input_error",
    errorClass: "form__error_visible",
};

const formValidators = {};

//Adding place cards to the page
function createCard(card) {
    const newCard = new Card(card, "#card", openImagePopup);
    const cardElement = newCard.getElement();
    return cardElement;
}

function prependToContainer(cardElement, container) {
    container.prepend(cardElement);
}

function addCard(card, container) {
    const cardElement = createCard(card);
    prependToContainer(cardElement, container);
}

function addDefaultCards(cards, container) {
    cards.reverse().forEach((card) => {
        addCard(card, container);
    });
}

//Popups Handlers
function openProfilePopup() {
    setPersonalDataPopupInitialValues();
    formValidators["profile-form"].resetValidation();
    openPopup(popupProfile);
}

function openAddCardPopup() {
    setCardAddPopupInitialValues();
    formValidators["card-form"].resetValidation();
    openPopup(popupAddCard);
}

function openImagePopup(title, link, alt) {
    initImagePreview(title, link, alt);
    openPopup(popupImage);
}

// Popups opening and closing
function openPopup(popup) {
    popup.classList.add(POPUP_OPEN);
    document.addEventListener("keydown", handleEscKeyPress);
}

function setClosePopupHandlers() {
    popupsArray.forEach((popup) => {
        popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup__close")) {
                closePopup(popup);
            }
            if (evt.target.classList.contains("popup_opened")) {
                closePopup(popup);
            }
        });
    });
}

function closePopup(popup) {
    popup.classList.remove(POPUP_OPEN);
    document.removeEventListener("keydown", handleEscKeyPress);
}

function handleEscKeyPress(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
        popupsArray.forEach(closePopup);
    }
}

//Resetting values
function setPersonalDataPopupInitialValues() {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

function setCardAddPopupInitialValues() {
    formAddCard.reset();
}

//Filling out the profile
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;
    closePopup(popupProfile);
}

//Adding a new card
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const card = {
        link: cardImageInput.value,
        title: cardNameInput.value,
    };
    addCard(card, elementList);
    setCardAddPopupInitialValues();
    closePopup(popupAddCard);
}

//Increase image
function initImagePreview(title, link, alt) {
    popupImageImg.src = link;
    popupImageImg.alt = alt;
    popupImageTitle.textContent = title;
}

//Form validation
function enableFormsValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute("name");
        formValidators[formName] = validator;
        validator.enableValidation();
    });
}

function initPage() {
    addDefaultCards(cardsArr, elementList);
    setClosePopupHandlers();
    profileEditButton.addEventListener("click", openProfilePopup);
    formProfile.addEventListener("submit", handleProfileFormSubmit);
    cardAddButton.addEventListener("click", openAddCardPopup);
    formAddCard.addEventListener("submit", handleCardFormSubmit);

    enableFormsValidation(validationConfig);
}

initPage();