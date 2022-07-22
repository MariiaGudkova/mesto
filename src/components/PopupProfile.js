import { PopupWithForm } from "./PopupWithForm.js";
import { FormValidator } from "./FormValidator.js";
import {
  validationConfig,
  profileNameInput,
  profileJobInput,
} from "../utils/constants.js";

export class PopupProfile extends PopupWithForm {
  open() {
    super.open();
    const validator = new FormValidator(validationConfig, this._form);
    validator.resetValidation();
  }

  setInputValues(userData) {
    const { name, job } = userData;
    profileNameInput.value = name;
    profileJobInput.value = job;
  }
}
