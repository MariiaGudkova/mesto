import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitFormCallback, resetValidation) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleSubmitFormCallback = handleSubmitFormCallback;
    this._resetValidation = resetValidation;
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  open() {
    super.open();
    this._resetValidation();
  }

  close() {
    super.close();
    this._form.reset();
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    this._handleSubmitFormCallback(values);
    this.close();
  };

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }
}
