const container = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

function createCard(link, name, onDelete) {
    const cardElement = container.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    deleteButton.addEventListener('click', onDelete);

    return cardElement;
}

function addCard(link, name) {
    const cardElement = createCard(link, name, onDelete);
    cardsList.append(cardElement);
}

initialCards.forEach(function (element) {
    addCard(element.link, element.name);
});

function onDelete(evt) {
    const listItem = evt.target.closest('.places__item');
    listItem.remove();
}
