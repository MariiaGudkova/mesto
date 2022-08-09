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
  apiConfig,
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
const api = new Api(apiConfig.host, apiConfig.token);

//Adding place cards to the page
function createCard(card) {
  const newCard = new Card(
    card,
    "#card",
    openImagePopup,
    openCardDeletePopup,
    handleDeleteCardApi,
    pageData.userInfo.userId,
    api.createLike,
    api.deleteLike
  );
  const cardElement = newCard.getElement();
  return cardElement;
}

function createGallerySection(cards, container) {
  const cardList = new Section(
    {
      items: cards.reverse(),
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
    .then(({ name, about }) => {
      pageData.userInfo.userName = name;
      pageData.userInfo.userJob = about;
    })
    .catch(console.error);
}

//Changing profile avatar
function handleProfileAvatarFormSubmit(values) {
  const avatar = values[profileAvatarInput.name];
  return api
    .createUserAvatar(avatar)
    .then(({ avatar }) => {
      pageData.userInfo.userAvatar = avatar;
    })
    .catch(console.error);
}

//Adding a new card
async function handleCardFormSubmit(values) {
  try {
    const title = values[cardNameInput.name];
    const link = values[cardImageInput.name];

    const card = await api.createUserCard(title, link);

    const cardElement = createCard(card);
    sections["gallery"].addItem(cardElement);
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
  api.getUserInfo().then(({ name, about, avatar, _id }) => {
    pageData.userInfo = new UserInfo({
      ...userDataConfig,
      userName: name,
      userJob: about,
      userAvatar: avatar,
      currentUserId: _id,
    });
    profileEditButton.addEventListener("click", openProfilePopup);
    profileAvatarChangeButton.addEventListener("click", openProfileAvatarPopup);
    cardAddButton.addEventListener("click", openAddCardPopup);
    enableFormsValidation(validationConfig);
    api
      .getInitialCards()
      .then((cards) => {
        sections["gallery"] = createGallerySection(cards, elementList);
      })
      .catch((err) => {
        console.log(err);
      });
    createPopups();
  });
}

initPage();

// Popups opening
function openProfilePopup() {
  const defaultUserData = pageData.userInfo.getUserInfo();
  popups["popupProfile"].setInputValues(
    defaultUserData,
    profileNameInput,
    profileJobInput
  );
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
