export function createCard(cardParameters) {
	const { link, name, likeCard, onDelete, openFullCardPopup } = cardParameters;

	const container = document.querySelector('#card-template').content;
	const cardElement = container.querySelector('.places__item').cloneNode(true);
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const cardImage = cardElement.querySelector('.card__image');
	const likeButton = cardElement.querySelector('.card__like-button');

	cardElement.querySelector('.card__title').textContent = name;
	cardImage.src = link;
	cardImage.alt = name;

	likeButton.addEventListener('click', likeCard);

	deleteButton.addEventListener('click', onDelete);

	cardImage.addEventListener('click', () => {
		openFullCardPopup(name, link);
	});

	return cardElement;
}

export function likeCard(evt) {
	evt.target.classList.toggle('card__like-button_is-active');
}

export function onDelete(evt) {
	const listItem = evt.target.closest('.places__item');
	listItem.remove();
}