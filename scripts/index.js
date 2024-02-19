const container = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

function addCard(link, name) {
    const cardElement = container.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    deleteButton.addEventListener('click', onDelete);

    cardsList.append(cardElement);
}

initialCards.forEach(function (element) {
    addCard(element.link, element.name);
});

function onDelete(evt) {
    const listItem = evt.target.closest('.places__item');
    listItem.remove();
}
