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
  userName,
  userJob,
  userPhoto,
} from "../utils/constants.js";
import { Api } from "../components/Api";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupProfile } from "../components/PopupProfile.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupDeleteConfirmation } from "../components/PopupDeleteConfirmation";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";

let currentUserId;

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
    currentUserId,
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
  popups["popupProfile"] = new PopupProfile(
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
  const job = values[profileJobInput.name];
  pageData.userInfo.setUserInfo(name, job);
  return api.createUserInfo(name, job).catch(console.log);
}

//Changing profile avatar
function handleProfileAvatarFormSubmit(values) {
  const avatar = values[profileAvatarInput.name];
  return api
    .createUserAvatar(avatar)
    .then((res) => {
      loadUserInfo(res);
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
  loadUserInfo().then(() => {
    pageData.userInfo = new UserInfo(userDataConfig);
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

//Loading User Info
function loadUserInfo() {
  return api.getUserInfo().then(({ name, about, avatar, _id }) => {
    userName.textContent = name;
    userJob.textContent = about;
    userPhoto.src = avatar;
    currentUserId = _id;
  });
}

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
