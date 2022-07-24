import { PopupWithForm } from "./PopupWithForm.js";

export class PopupProfile extends PopupWithForm {
  constructor(popupSelector, handleSubmitFormCallback, resetValidation) {
    super(popupSelector, handleSubmitFormCallback, resetValidation);
    this._popup = document.querySelector(popupSelector);
    this._handleSubmitFormCallback = handleSubmitFormCallback;
    this._resetValidation = resetValidation;
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
    this._profileNameInput = document.querySelector(".form__input_text_name");
    this._profileJobInput = document.querySelector(
      ".form__input_text_description"
    );
  }

  setInputValues(userData) {
    const { name, job } = userData;
    this._profileNameInput.value = name;
    this._profileJobInput.value = job;
  }
}
