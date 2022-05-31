//Text constants
const ACTIVE_LIKE_BUTTON = 'element__like-button-image-active';
const ACTIVE_LIKE_BUTTON_IMAGE_SRC = './images/element__like_active.svg';
const DISABLED_LIKE_BUTTON_IMAGE_SRC = './images/element__like_disabled.svg';
const CARD_ELEMENT = 'element__item';
const ELEMENT_TITLE = 'element__title';
const POPUP_OPEN = 'popup_opened';
const POPUP_OPEN_CARD = 'popup-add-card_opened';
const POPUP_OPEN_IMAGE = 'popup-large-img_opened';


// DOM-elements 
const nameElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const elementList = document.querySelector('.element');
const elementImg = elementList.querySelector('.element__image');
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__container');
const nameInput = popup.querySelector('.popup__name');
const jobInput = popup.querySelector('.popup__description');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupAddCard = document.querySelector('.popup-add-card');
const popupCloseButtonAddCard = popupAddCard.querySelector('.popup-add-card__close-button');
const cardFormElement = popupAddCard.querySelector('.popup-add-card__container');
const cardNameInput = popupAddCard.querySelector('.popup-add-card__name');
const cardImageInput = popupAddCard.querySelector('.popup-add-card__image');
const popupImage = document.querySelector('.popup-large-img');
const popupImageCloseButton = popupImage.querySelector('.popup-large-img__close-button');
const popupImageImg = popupImage.querySelector('.popup-large-img__image');
const popupImageTitle = popupImage.querySelector('.popup-large-img__title');
const cardTemplate = document.querySelector('#card').content;
const cardTemplateLi = cardTemplate.querySelector('.' + CARD_ELEMENT);


//Adding place cards to the page
const cardsArr = [{
        link: './images/template/template-spb.jpg',
        alt: 'Санкт-Петербург',
        title: 'Санкт-Петербург'
    },

    {
        link: './images/template/template-ekb.jpg',
        alt: 'Екатеринбург',
        title: 'Екатеринбург'
    },

    {
        link: './images/template/template-vyborg.jpg',
        alt: 'Выборг',
        title: 'Выборг'
    },

    {
        link: './images/template/template-rom.jpg',
        alt: 'Рим',
        title: 'Рим'
    },

    {
        link: './images/template/template-pomorie.jpg',
        alt: 'Поморие',
        title: 'Поморие'
    },

    {
        link: './images/template/template-batumi.jpg',
        alt: 'Батуми',
        title: 'Батуми'
    }
];

function addCard(title, imageSrc, imageAlt) {
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
    cardElementImage.addEventListener('click', openImgPopup);

    elementList.prepend(cardElement);
}

function addDefaultCards() {
    cardsArr.reverse().forEach(card => addCard(card.title, card.link, card.alt));
}

addDefaultCards();


// Personal data pop-up opening and closing 
function setPopupInitialValues() {
    nameInput.value = nameElement.textContent;
    jobInput.value = subtitleElement.textContent;
}

function openPopup() {
    setPopupInitialValues();
    popup.classList.add(POPUP_OPEN);
}

function closePopup() {
    popup.classList.remove(POPUP_OPEN);
}

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    nameElement.textContent = nameInput.value;
    subtitleElement.textContent = jobInput.value;
    closePopup();
}


//Adding a new card
function setAddPopupInitialValues() {
    cardNameInput.value = '';
    cardImageInput.value = '';
}

function openAddPopup() {
    setAddPopupInitialValues();
    popupAddCard.classList.add(POPUP_OPEN_CARD);
}

function closeAddPopup() {
    popupAddCard.classList.remove(POPUP_OPEN_CARD);
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    const name = cardNameInput.value;
    const image = cardImageInput.value;
    addCard(name, image);
    closeAddPopup();
}


//Like the card
function likeCard(evt) {
    if (evt.target.classList.contains(ACTIVE_LIKE_BUTTON)) {
        evt.target.src = DISABLED_LIKE_BUTTON_IMAGE_SRC;
        evt.target.classList.remove(ACTIVE_LIKE_BUTTON);
        return;
    }
    evt.target.src = ACTIVE_LIKE_BUTTON_IMAGE_SRC;
    evt.target.classList.add(ACTIVE_LIKE_BUTTON);
}


//Delete the card
function findParentByClass(element, parentClass) {
    let parent = element;
    while (!parent.classList.contains(parentClass)) {
        parent = parent.parentNode;
    }
    return parent;
}

function deleteCard(evt) {
    const element = evt.target;
    const card = findParentByClass(element, CARD_ELEMENT);
    card.remove();
}


//Increase image
function findTitle(element) {
    const card = findParentByClass(element, CARD_ELEMENT);
    return card.querySelector('.' + ELEMENT_TITLE).textContent;
}

function makeLargeImage(element) {
    popupImageImg.src = element.src;
    popupImageImg.alt = element.alt;
    popupImageTitle.textContent = findTitle(element);
}

function openImgPopup(evt) {
    const element = evt.target;
    makeLargeImage(element)
    popupImage.classList.add(POPUP_OPEN_IMAGE);
}

function closeImgPopup() {
    popupImage.classList.remove(POPUP_OPEN_IMAGE);
}


//Event Handlers
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', openAddPopup);
popupCloseButtonAddCard.addEventListener('click', closeAddPopup);
cardFormElement.addEventListener('submit', cardFormSubmitHandler);
popupImageCloseButton.addEventListener('click', closeImgPopup);