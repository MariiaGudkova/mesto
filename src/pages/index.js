import "./index.css";
import {
  cardsArr,
  validationConfig,
  userDataConfig,
  profileEditButton,
  cardAddButton,
  elementList,
  cardNameInput,
  cardImageInput,
  formValidators,
  profileNameInput,
  profileJobInput,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupProfile } from "../components/PopupProfile.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";

//Adding place cards to the page
const defaultCardList = new Section(
  {
    items: cardsArr,
    renderer: (card) => {
      const newCard = new Card(card, "#card", openImagePopup);
      const cardElement = newCard.getElement();
      defaultCardList.addItem(cardElement);
    },
  },
  elementList
);

defaultCardList.renderItems();

//Adding a new card
function handleCardFormSubmit(evt) {
  const card = {
    link: cardImageInput.value,
    title: cardNameInput.value,
  };
  const newUserCard = new Section(
    {
      items: card,
      renderer: (card) => {
        const newCard = new Card(card, "#card", openImagePopup);
        const cardElement = newCard.getElement();
        newUserCard.addItem(cardElement);
      },
    },
    elementList
  );

  newUserCard.renderItems();
  popupAddCard.close();
}

//User info
const userData = new UserInfo(userDataConfig);

//Popups
const popupProfile = new PopupProfile(
  ".popup_personal-data",
  handleProfileFormSubmit
);

const popupAddCard = new PopupWithForm(".popup_add-card", handleCardFormSubmit);

const popupImage = new PopupWithImage(".popup_large-img");

// Popups opening
function openProfilePopup() {
  formValidators["profile-form"].resetValidation();
  const defaultUserData = userData.getUserInfo();
  popupProfile.setInputValues(defaultUserData);
  popupProfile.open();
}

function openAddCardPopup() {
  formValidators["card-form"].resetValidation();
  popupAddCard.open();
}

function openImagePopup(title, link) {
  popupImage.open(title, link);
}

//Filling out the profile
function handleProfileFormSubmit(values) {
  const name = values[profileNameInput.name];
  const job = values[profileJobInput.name];
  userData.setUserInfo(name, job);
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
  profileEditButton.addEventListener("click", openProfilePopup);
  cardAddButton.addEventListener("click", openAddCardPopup);
  enableFormsValidation(validationConfig);
}

initPage();
