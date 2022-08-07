import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitFormCallback, resetValidation) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleSubmitFormCallback = handleSubmitFormCallback;
    this._resetValidation = resetValidation;
    this._form = this._popup.querySelector(".form");
    this._saveButton = this._form.querySelector(".form__save-button");
    this._saveButtonText = this._saveButton.textContent;
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
    this._isLoading = false;
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

  close = () => {
    super.close();
    this._form.reset();
  };

  _handleSubmit = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    this.setIsLoading(true);
    this._handleSubmitFormCallback(values)
      .then(() => this.setIsLoading(false))
      .then(this.close);
  };

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  _changeButtonForLoading = () => {
    if (this._isLoading === true) {
      this._saveButton.textContent = "Сохранение...";
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  };

  setIsLoading = (isLoading) => {
    this._isLoading = isLoading;
    this._changeButtonForLoading();
  };
}
