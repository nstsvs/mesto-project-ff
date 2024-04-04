function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  // Деактивируем кнопку при загрузке
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });

  // Добавляем обработчик события reset
  formElement.addEventListener('reset', () => {
    disableButton(buttonElement, validationConfig);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableButton(buttonElement, validationConfig) {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    // Начальное деактивирование кнопки при загрузке
    disableButton(buttonElement, validationConfig);
    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(formElements, validationConfig) {
  formElements.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig)
    });
  });
}
