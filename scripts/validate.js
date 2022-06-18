const showInputError = ({
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass,
}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = ({
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

const checkInputValidity = ({
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
}) => {
    if (!inputElement.validity.valid) {
        showInputError({
            formElement,
            inputElement,
            errorMessage: inputElement.validationMessage,
            inputErrorClass,
            errorClass,
        });
    } else {
        hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
    }
};

const toggleButtonState = ({
    inputList,
    buttonElement,
    inactiveButtonClass,
}) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const setEventListeners = ({
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState({ inputList, buttonElement, inactiveButtonClass });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function() {
            checkInputValidity({
                formElement,
                inputElement,
                inputErrorClass,
                errorClass,
            });
            toggleButtonState({
                inputList,
                buttonElement,
                inactiveButtonClass,
            });
        });
    });
};

const enableValidation = ({
    formSelector,
    formSetSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        formElement.addEventListener("clearFormErrors", () => {
            clearFormInputErrors({
                formElement,
                inputSelector,
                inputErrorClass,
                errorClass,
            });
        });
        const fieldsetList = Array.from(
            formElement.querySelectorAll(formSetSelector)
        );
        fieldsetList.forEach((fieldSet) => {
            setEventListeners({
                formElement: fieldSet,
                inputSelector,
                submitButtonSelector,
                inactiveButtonClass,
                inputErrorClass,
                errorClass,
            });
        });
    });
};

const clearFormInputErrors = ({
    formElement,
    inputSelector,
    inputErrorClass,
    errorClass,
}) => {
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    inputs.forEach((inputElement) => {
        hideInputError({
            formElement,
            inputElement,
            inputErrorClass,
            errorClass,
        });
    });
};

enableValidation({
    formSelector: ".form",
    formSetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input_error",
    errorClass: "form__error_visible",
});