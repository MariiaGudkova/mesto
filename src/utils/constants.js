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
export const cardAddButton = document.querySelector(".profile__add-button");
export const elementList = document.querySelector(".element");
export const cardNameInput = document.querySelector(
  ".form__input_text_name-card"
);
export const cardImageInput = document.querySelector(".form__input_text_image");

export const formValidators = {};
