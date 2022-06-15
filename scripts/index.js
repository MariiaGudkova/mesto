//Text constants
const ACTIVE_LIKE_BUTTON = "element__like-button_active";
const CARD_ELEMENT = "element__item";
const ELEMENT_TITLE = "element__title";
const POPUP_OPEN = "popup_opened";
const PROFILE_EDIT_BUTTON = "profile__edit-button";
const PROFILE_ADD_BUTTON = "profile__add-button";

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
function createCardElement(title, imageSrc, imageAlt) {
    const cardElement = cardTemplateLi.cloneNode(true);
    const cardElementImage = cardElement.querySelector(".element__image");
    const cardElementTitle = cardElement.querySelector(".element__title");
    const cardElementLikeButton = cardElement.querySelector(
        ".element__like-button"
    );
    const cardElementTrashButton = cardElement.querySelector(
        ".element__trash-button"
    );

    cardElementImage.src = imageSrc;
    cardElementImage.alt = imageAlt ? imageAlt : title;
    cardElementTitle.textContent = title;

    cardElementLikeButton.addEventListener("click", likeCard);
    cardElementTrashButton.addEventListener("click", deleteCard);
    cardElementImage.addEventListener("click", openPopupHandler);

    return cardElement;
}

function prependToContainer(container, element) {
    container.prepend(element);
}

function addCard(container, card) {
    const { title, link, alt } = card;
    const cardElement = createCardElement(title, link, alt);
    prependToContainer(container, cardElement);
}

function addDefaultCards(container, cards) {
    cards.reverse().forEach((card) => addCard(container, card));
}

addDefaultCards(elementList, cardsArr);

// Popups opening and closing
function openPopupHandler(evt) {
    const button = evt.currentTarget;
    let popup;

    if (button.classList.contains(PROFILE_EDIT_BUTTON)) {
        setPersonalDataPopupInitialValues();
        popup = popupProfile;
    } else if (button.classList.contains(PROFILE_ADD_BUTTON)) {
        setCardAddPopupInitialValues();
        popup = popupAddCard;
    } else {
        makeLargeImage(button);
        popup = popupImage;
    }

    openPopup(popup);
}

function setPersonalDataPopupInitialValues() {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
    nameInput.dispatchEvent(new Event("input", { bubbles: true }));
    jobInput.dispatchEvent(new Event("input", { bubbles: true }));
}

function setCardAddPopupInitialValues() {
    formAddCard.reset();
}

function makeLargeImage(img) {
    popupImageImg.src = img.src;
    popupImageImg.alt = img.alt;
    popupImageTitle.textContent = findTitle(img);
}

function openPopup(popup) {
    popup.classList.add(POPUP_OPEN);
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
}

function closePopupWithButton(evt) {
    const button = evt.target;
    const popup = button.closest(".popup");
    closePopup(popup);
}

function closePopupWithOverlay(evt) {
    const popup = evt.target;
    closePopup(popup);
}

function keyHandler(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
        popupsArray.forEach((popup) => {
            closePopup(popup);
        });
    }
}

//Filling out the profile
function profileFormSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileNameElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;
    closePopup(evt);
}

//Adding a new card
function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    const card = {
        link: cardImageInput.value,
        title: cardNameInput.value,
    };
    addCard(elementList, card);
    closePopup(evt);
}

//Like the card
function likeCard(evt) {
    const button = evt.currentTarget;
    button.classList.toggle(ACTIVE_LIKE_BUTTON);
}

//Delete the card
function deleteCard(evt) {
    const button = evt.currentTarget;
    const card = button.closest("." + CARD_ELEMENT);
    card.remove();
}

//Increase image
function findTitle(element) {
    const card = element.closest("." + CARD_ELEMENT);
    return card.querySelector("." + ELEMENT_TITLE).textContent;
}

//Event Handlers
profileEditButton.addEventListener("click", openPopupHandler);
formProfile.addEventListener("submit", profileFormSubmitHandler);
cardAddButton.addEventListener("click", openPopupHandler);
formAddCard.addEventListener("submit", cardFormSubmitHandler);
document.addEventListener("keydown", keyHandler);