import imageSpb from "../images/template/template-spb.jpg";
import imageEkb from "../images/template/template-ekb.jpg";
import imageVyborg from "../images/template/template-vyborg.jpg";
import imageRom from "../images/template/template-rom.jpg";
import imagePomorie from "../images/template/template-pomorie.jpg";
import imageBatumi from "../images/template/template-batumi.jpg";

export const cardsArr = [
  {
    link: imageSpb,
    alt: "Санкт-Петербург",
    title: "Санкт-Петербург",
  },

  {
    link: imageEkb,
    alt: "Екатеринбург",
    title: "Екатеринбург",
  },

  {
    link: imageVyborg,
    alt: "Выборг",
    title: "Выборг",
  },

  {
    link: imageRom,
    alt: "Рим",
    title: "Рим",
  },

  {
    link: imagePomorie,
    alt: "Поморие",
    title: "Поморие",
  },

  {
    link: imageBatumi,
    alt: "Батуми",
    title: "Батуми",
  },
].reverse();

export const validationConfig = {
  formSelector: ".form",
  formSetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_visible",
};

export const userDataConfig = {
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__avatar",
};

export const profileNameInput = document.querySelector(
  ".form__input_text_name"
);

export const profileJobInput = document.querySelector(
  ".form__input_text_description"
);

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAvatarChangeButton = document.querySelector(
  ".profile__avatar-change-button"
);
export const profileAvatarInput = document.querySelector(
  ".form__input_avatar_image"
);
export const cardAddButton = document.querySelector(".profile__add-button");
export const elementList = document.querySelector(".element");
export const cardNameInput = document.querySelector(
  ".form__input_text_name-card"
);
export const cardImageInput = document.querySelector(".form__input_text_image");

export const formValidators = {};

export const popups = {};

export const sections = {};

export const pageData = {};

export const apiConfig = {
  host: "https://mesto.nomoreparties.co/v1/cohort-47",
  token: "71958807-8b11-4210-86a4-64ac3be2e55a",
};
