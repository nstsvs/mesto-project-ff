export function renderLoading(isLoading, buttonElement, initialText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    buttonElement.textContent = loadingText;
  } else {
    buttonElement.textContent = initialText;
  }
}

// Универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузки
export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();
  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset()
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton, initialText)
    });
}
