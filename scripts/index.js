// DOM-elements 
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');


// Cleaning the form
function cleanForm() {
    let form = popup.querySelector('.popup__container').reset();
}

// Pop-up opening and closing */
function togglePopup(popupEvent) {
    popup.classList.toggle('popup_opened');
    cleanForm();
}

profileEditButton.addEventListener('click', () => {
    togglePopup();
});

popupCloseButton.addEventListener('click', () => {
    togglePopup();
});

// Entering data from the form 
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__description');

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let name = document.querySelector('.profile__title');
    let subtitile = document.querySelector('.profile__subtitle');

    // Вставьте новые значения с помощью textContent
    name.textContent = nameValue;
    subtitile.textContent = jobValue;

    togglePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);