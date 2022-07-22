import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitFormCallback) {
    super(popupSelector);
    this._handleSubmitFormCallback = handleSubmitFormCallback;
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
  }

  _getInputValues() {
    return this._inputs.reduce((res, input) => {
      const { name, value } = input;
      res[name] = value;
      return res;
    }, {});
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
