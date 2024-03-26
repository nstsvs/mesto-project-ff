function showInputError(validationConfig, formSelector, inputSelector, errorMessage) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(validationConfig, formSelector, inputSelector) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

function isValid(validationConfig, formSelector, inputSelector) {
  if (!inputSelector.validity.valid) {
    showInputError(validationConfig, formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(validationConfig, formSelector, inputSelector);
  }
};

export function enableValidation(validationConfig) {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((formSelector) => {
    setEventListeners(validationConfig, formSelector)
  });
}

function setEventListeners(validationConfig, formSelector){
  const inputList = document.querySelectorAll(validationConfig.inputSelector);
  console.log(inputList);

  const buttonElement = formSelector.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(validationConfig, inputList, buttonElement)

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      isValid(validationConfig, formSelector, inputSelector);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
}
