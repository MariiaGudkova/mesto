import "./index.css";
import {
  cardsArr,
  validationConfig,
  userDataConfig,
  profileEditButton,
  profileAvatarChangeButton,
  profileAvatarInput,
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
import { Api } from "../components/Api";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupDeleteConfirmation } from "../components/PopupDeleteConfirmation";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";

//Create API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "71958807-8b11-4210-86a4-64ac3be2e55a",
    "Content-Type": "application/json",
  },
});

// Create gallery
function createGallerySection(cards, container) {
  const cardList = new Section(
    {
      items: cards.reverse(),
      renderer: (card) => {
        const newCard = new Card(
          card,
          "#card",
          openImagePopup,
          openCardDeletePopup,
          handleDeleteCardApi,
          pageData.userInfo.getUserInfo().id,
          api.createLike,
          api.deleteLike
        );
        const cardElement = newCard.getElement();
        return cardElement;
      },
    },
    container
  );
  cardList.renderItems();
  return cardList;
}

//Popups
function createPopups() {
  popups["popupProfile"] = new PopupWithForm(
    ".popup_personal-data",
    handleProfileFormSubmit,
    formValidators["profile-form"].resetValidation
  );

  popups["popupChangeProfileAvatar"] = new PopupWithForm(
    ".popup_change-avatar",
    handleProfileAvatarFormSubmit,
    formValidators["avatar-form"].resetValidation
  );

  popups["popupAddCard"] = new PopupWithForm(
    ".popup_add-card",
    handleCardFormSubmit,
    formValidators["card-form"].resetValidation
  );

  popups["popupImage"] = new PopupWithImage(".popup_large-img");

  popups["popupDeleteCard"] = new PopupDeleteConfirmation(
    ".popup_delete-card",
    formValidators["delete-form"].resetValidation
  );
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
  const about = values[profileJobInput.name];
  return api
    .createUserInfo(name, about)
    .then(pageData.userInfo.setUserInfo)
    .catch(console.error);
}

//Changing profile avatar
function handleProfileAvatarFormSubmit(values) {
  const avatar = values[profileAvatarInput.name];
  return api
    .createUserAvatar(avatar)
    .then(pageData.userInfo.setUserInfo)
    .catch(console.error);
}

//Adding a new card
async function handleCardFormSubmit(values) {
  try {
    const title = values[cardNameInput.name];
    const link = values[cardImageInput.name];

    const card = await api.createUserCard(title, link);

    sections["gallery"].addItem(card);
  } catch (err) {
    console.log(err);
  }
}

//Delete card
function handleDeleteCardApi(id) {
  return api.deleteUserCard(id).catch(console.error);
}

// Page initialization
function initPage() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      pageData.userInfo = new UserInfo(userDataConfig);
      pageData.userInfo.setUserInfo(userData);
      console.info("userinfo", pageData.userInfo);
      profileEditButton.addEventListener("click", openProfilePopup);
      profileAvatarChangeButton.addEventListener(
        "click",
        openProfileAvatarPopup
      );
      cardAddButton.addEventListener("click", openAddCardPopup);
      enableFormsValidation(validationConfig);
      sections["gallery"] = createGallerySection(cards, elementList);
      createPopups();
    })
    .catch((err) => {
      console.log(err);
    });
}

initPage();

// Popups opening
function openProfilePopup() {
  const defaultUserData = pageData.userInfo.getUserInfo();
  popups["popupProfile"].setInputValues(defaultUserData);
  popups["popupProfile"].open();
}

function openProfileAvatarPopup() {
  popups["popupChangeProfileAvatar"].open();
}

function openAddCardPopup() {
  popups["popupAddCard"].open();
}

function openImagePopup(title, link, alt) {
  popups["popupImage"].open(title, link, alt);
}

function openCardDeletePopup(deleteCallback) {
  popups["popupDeleteCard"].open(deleteCallback);
}
