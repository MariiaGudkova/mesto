import "./index.css";
import {
  cardsArr,
  validationConfig,
  userDataConfig,
  profileEditButton,
  cardAddButton,
  elementList,
  formValidators,
  profileNameInput,
  profileJobInput,
  popups,
  cardNameInput,
  cardImageInput,
  sections,
  pageData,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupProfile } from "../components/PopupProfile.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";

//Adding place cards to the page
function createCard(card) {
  const newCard = new Card(card, "#card", openImagePopup);
  const cardElement = newCard.getElement();
  return cardElement;
}

function createGallerySection(cards, container) {
  const cardList = new Section(
    {
      items: cards,
      renderer: (card) => {
        const cardElement = createCard(card);
        cardList.addItem(cardElement);
      },
    },
    container
  );
  cardList.renderItems();
  return cardList;
}

//Popups
function createPopups() {
  popups["popupProfile"] = new PopupProfile(
    ".popup_personal-data",
    handleProfileFormSubmit,
    formValidators["profile-form"].resetValidation
  );

  popups["popupAddCard"] = new PopupWithForm(
    ".popup_add-card",
    handleCardFormSubmit,
    formValidators["card-form"].resetValidation
  );

  popups["popupImage"] = new PopupWithImage(".popup_large-img");
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

//Filling out the profile
function handleProfileFormSubmit(values) {
  const name = values[profileNameInput.name];
  const job = values[profileJobInput.name];
  pageData.userInfo.setUserInfo(name, job);
}

//Adding a new card
function handleCardFormSubmit(values) {
  const title = values[cardNameInput.name];
  const link = values[cardImageInput.name];
  const card = createCard({ title, link });
  sections["gallery"].addItem(card);
  popups["popupAddCard"].close();
}

// Page initialization
function initPage() {
  pageData.userInfo = new UserInfo(userDataConfig);
  profileEditButton.addEventListener("click", openProfilePopup);
  cardAddButton.addEventListener("click", openAddCardPopup);
  enableFormsValidation(validationConfig);
  sections["gallery"] = createGallerySection(cardsArr, elementList);
  createPopups();
}

initPage();

// Popups opening
function openProfilePopup() {
  const defaultUserData = pageData.userInfo.getUserInfo();
  popups["popupProfile"].setInputValues(defaultUserData);
  popups["popupProfile"].open();
}

function openAddCardPopup() {
  popups["popupAddCard"].open();
}

function openImagePopup(title, link, alt) {
  popups["popupImage"].open(title, link, alt);
}
