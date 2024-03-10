const container = document.querySelector('#card-template').content;

export function createCard(link, name, onDelete) {
	const cardElement = container.querySelector('.places__item').cloneNode(true);
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const cardImage = cardElement.querySelector('.card__image');

	cardElement.querySelector('.card__title').textContent = name;
	cardImage.src = link;
	cardImage.alt = name;

	deleteButton.addEventListener('click', onDelete);

	return cardElement;
}
