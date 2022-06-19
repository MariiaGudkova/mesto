// Text constants
const ACTIVE_LIKE_BUTTON = "element__like-button_active";
const CARD_ELEMENT = "element__item";
const POPUP_OPEN = "popup_opened";
const POPUP = "popup";

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
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupImageImg = popupImage.querySelector(".popup__large-img-image");
const popupImageTitle = popupImage.querySelector(".popup__large-img-signature");
const formProfile = document.querySelector(".form_personal-data");
const formAddCard = document.querySelector(".form_add-card");
const nameInput = document.querySelector(".form__input_text_name");
const jobInput = document.querySelector(".form__input_text_description");
const cardNameInput = document.querySelector(".form__input_text_name-card");
const cardImageInput = document.querySelector(".form__input_text_image");
const cardTemplate = document.querySelector("#card").content;
const cardTemplateLi = cardTemplate.querySelector("." + CARD_ELEMENT);

//Adding place cards to the page
function createCardElement(card) {
    const { title, link, alt } = card;
    const cardElement = cardTemplateLi.cloneNode(true);
    const cardElementImage = cardElement.querySelector(".element__image");
    const cardElementTitle = cardElement.querySelector(".element__title");
    const cardElementLikeButton = cardElement.querySelector(
        ".element__like-button"
    );
    const cardElementTrashButton = cardElement.querySelector(
        ".element__trash-button"
    );

    cardElementImage.src = link;
    cardElementImage.alt = alt ? alt : title;
    cardElementTitle.textContent = title;

    cardElementLikeButton.addEventListener("click", () =>
        cardElementLikeButton.classList.toggle(ACTIVE_LIKE_BUTTON)
    );
    cardElementTrashButton.addEventListener("click", () => cardElement.remove());
    cardElementImage.addEventListener("click", () =>
        openImagePopup(title, link, alt)
    );

    return cardElement;
}

function prependToContainer(container, element) {
    container.prepend(element);
}

function addCard(container, card) {
    const cardElement = createCardElement(card);
    prependToContainer(container, cardElement);
}

function addDefaultCards(container, cards) {
    cards.reverse().forEach((card) => addCard(container, card));
}

addDefaultCards(elementList, cardsArr);

//Popups Handlers
function openProfilePopup() {
    setPersonalDataPopupInitialValues();
    openPopup(popupProfile);
}

function openAddCardPopup() {
    setCardAddPopupInitialValues();
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
    popupCloseButtons.forEach((button) =>
        button.addEventListener("click", closePopupWithButton)
    );

    popupsArray.forEach((popup) => {
        popup.addEventListener("click", closePopupWithOverlay);
    });
}

setClosePopupHandlers();

function closePopup(popup) {
    popup.classList.remove(POPUP_OPEN);
    document.removeEventListener("keydown", handleEscKeyPress);
    const form = popup.querySelector(".form");
    if (form) {
        form.dispatchEvent(new CustomEvent("clearFormErrors", { bubbles: true }));
    }
}

function closePopupWithButton(evt) {
    const button = evt.target;
    const popup = button.closest(".popup");
    closePopup(popup);
}

function closePopupWithOverlay(evt) {
    const popup = evt.target;
    if (!popup.classList.contains(POPUP)) {
        return;
    }
    closePopup(popup);
}

function handleEscKeyPress(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
        popupsArray.forEach((popup) => {
            closePopup(popup);
        });
    }
}

//Resetting values
function setPersonalDataPopupInitialValues() {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
    nameInput.dispatchEvent(new Event("input", { bubbles: true }));
    jobInput.dispatchEvent(new Event("input", { bubbles: true }));
}

function setCardAddPopupInitialValues() {
    formAddCard.reset();
}

//Filling out the profile
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
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
    addCard(elementList, card);
    closePopup(popupAddCard);
    setCardAddPopupInitialValues();
}

//Increase image
function initImagePreview(title, link, alt) {
    popupImageImg.src = link;
    popupImageImg.alt = alt;
    popupImageTitle.textContent = title;
}

//Event Handlers
profileEditButton.addEventListener("click", openProfilePopup);
formProfile.addEventListener("submit", handleProfileFormSubmit);
cardAddButton.addEventListener("click", openAddCardPopup);
formAddCard.addEventListener("submit", handleCardFormSubmit);