//Text constants
const ACTIVE_LIKE_BUTTON = 'element__like-button_active';
const CARD_ELEMENT = 'element__item';
const ELEMENT_TITLE = 'element__title';
const POPUP_OPEN = 'popup_opened';
const PROFILE_EDIT_BUTTON = 'profile__edit-button';
const PROFILE_ADD_BUTTON = 'profile__add-button';


// DOM-elements 
const profileNameElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const elementList = document.querySelector('.element');
const elementImg = elementList.querySelector('.element__image');
const popupProfile = document.querySelector('.popup_personal-data');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_large-img');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupImageImg = popupImage.querySelector('.popup__large-img-image');
const popupImageTitle = popupImage.querySelector('.popup__large-img-signature');
const formProfile = document.querySelector('.form_personal-data');
const formProfileSaveButton = document.querySelector('.form__save-button_personal-data');
const formAddCard = document.querySelector('.form_add-card');
const formAddCardSaveButton = document.querySelector('.form__save-button_add-card');
const nameInput = document.querySelector('.form__input_text_name');
const jobInput = document.querySelector('.form__input_text_description');
const cardNameInput = document.querySelector('.form__input_text_name-card');
const cardImageInput = document.querySelector('.form__input_text_image');
const cardTemplate = document.querySelector('#card').content;
const cardTemplateLi = cardTemplate.querySelector('.' + CARD_ELEMENT);


//Adding place cards to the page
function createCard(title, imageSrc, imageAlt) {
    const cardElement = cardTemplateLi.cloneNode(true);
    const cardElementImage = cardElement.querySelector('.element__image');
    const cardElementTitle = cardElement.querySelector('.element__title');
    const cardElementLikeButton = cardElement.querySelector('.element__like-button');
    const cardElementTrashButton = cardElement.querySelector('.element__trash-button');

    cardElementImage.src = imageSrc;
    cardElementImage.alt = imageAlt ? imageAlt : title;
    cardElementTitle.textContent = title;

    cardElementLikeButton.addEventListener('click', likeCard);
    cardElementTrashButton.addEventListener('click', deleteCard);
    cardElementImage.addEventListener('click', openPopupHandler);

    addCard(cardElement);
}

function addCard(card) {
    elementList.prepend(card);
}

function addDefaultCards() {
    cardsArr.reverse().forEach(card => createCard(card.title, card.link, card.alt));
}

addDefaultCards();


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
    popupCloseButtons.forEach(button => button.addEventListener('click', closePopup));
}

setClosePopupHandlers();

function closePopup(evt) {
    const button = evt.target;
    const popup = button.closest('.popup');
    popup.classList.remove(POPUP_OPEN);
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
    const name = cardNameInput.value;
    const image = cardImageInput.value;
    createCard(name, image);
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
    const card = button.closest('.' + CARD_ELEMENT);
    card.remove();
}


//Increase image
function findTitle(element) {
    const card = element.closest('.' + CARD_ELEMENT);;
    return card.querySelector('.' + ELEMENT_TITLE).textContent;
}


//Event Handlers
profileEditButton.addEventListener('click', openPopupHandler);
formProfile.addEventListener('submit', profileFormSubmitHandler);
cardAddButton.addEventListener('click', openPopupHandler);
formAddCard.addEventListener('submit', cardFormSubmitHandler);