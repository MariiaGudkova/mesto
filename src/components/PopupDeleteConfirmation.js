import { PopupWithForm } from "./PopupWithForm";

export class PopupDeleteConfirmation extends PopupWithForm {
  constructor(popupSelector, resetValidation) {
    super(popupSelector, () => {}, resetValidation);
  }

  open = (deleteCallback) => {
    this._handleSubmitFormCallback = deleteCallback;
    super.open();
  };

  close = () => {
    this._handleSubmitFormCallback = () => {};
    super.close();
  };

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmitFormCallback().then(this.close);
  };
}
