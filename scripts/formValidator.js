export class FormValidator {
    constructor(data, form) {
        const {
            formSelector,
            formSetSelector,
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            inputErrorClass,
            errorClass,
        } = data;
        this._formSelector = formSelector;
        this._formSetSelector = formSetSelector;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._form = form;
        this._inputList = Array.from(
            this._form.querySelectorAll(this._inputSelector)
        );
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    _showInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    };

    _disableButton = () => {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    _enableButton = () => {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _setInputEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _clearFormInputErrors = () => {
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        inputs.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._disableButton();
    };

    enableValidation = () => {
        this._form.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        this._setInputEventListeners();
        this._form.addEventListener("clearFormErrors", this._clearFormInputErrors);
        this._toggleButtonState();
    };
}