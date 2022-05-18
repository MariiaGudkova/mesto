// DOM-elements 
const nameElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__container');
const nameInput = popup.querySelector('.popup__name');
const jobInput = popup.querySelector('.popup__description');
const popupCloseButton = popup.querySelector('.popup__close-button');

function setPopupInitialValues() {
    nameInput.value = nameElement.textContent;
    jobInput.value = subtitleElement.textContent;
}

// Pop-up opening and closing */
function openPopup() {
    setPopupInitialValues();
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}


//Saving form data
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    nameElement.textContent = nameInput.value;
    subtitleElement.textContent = jobInput.value;
    closePopup();
}


//Event Handlers
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);