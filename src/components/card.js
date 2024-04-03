import { addLike, deleteLike, removeCard } from '../api';
import { closePopup, openPopup } from "./modal";
import { confirmDeleteButton, confirmDeletePopup } from '../utils/constants';

let currentCardToDelete = null;

export function createCard(cardParameters) {
	const { cardData, userId, onLike, onDelete, openFullCardPopup } = cardParameters;

	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const cardImage = cardElement.querySelector('.card__image');
	const likeButton = cardElement.querySelector('.card__like-button');
	const likeCount = cardElement.querySelector('.card__like-count');

	cardElement.querySelector('.card__title').textContent = cardData.name;
	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	likeCount.textContent = cardData.likes.length;

	if(userId === cardData.owner._id) {
		deleteButton.classList.add('card__delete-button_visible')
		deleteButton.addEventListener('click', () => {
			onDelete(cardData._id, cardElement)
		})
	} else {
		deleteButton.remove();
	}

	likeButton.addEventListener('click', () => {
		onLike(cardData._id, likeButton, likeCount);
	});

	isLiked(cardData, likeButton, userId);

	cardImage.addEventListener('click', () => {
		openFullCardPopup(cardData.name, cardData.link);
	});

	return cardElement;
}

confirmDeleteButton.addEventListener('click', () => {
	if (currentCardToDelete) {
		removeCard(currentCardToDelete.cardId)
			.then(() => {
				// Удаление элемента карточки из DOM
				currentCardToDelete.cardElement.remove();
				// Сброс текущей карточки
				currentCardToDelete = null;
				closePopup(confirmDeletePopup);
			})
			.catch(() => {
				console.error();
			});
	}
});

export function onDelete(cardId, cardElement) {
	currentCardToDelete = {cardId, cardElement};
	openPopup(confirmDeletePopup);
}

export function onLike(cardId, buttonElement, likeCount) {
	if (buttonElement.classList.contains('card__like-button_is-active')) {
		deleteLike(cardId)
			.then((card) => {
				buttonElement.classList.remove('card__like-button_is-active');
				likeCount.textContent = card.likes.length;
			})
			.catch(() => {
				console.error();
			});
	} else {
		addLike(cardId)
			.then((card) => {
				buttonElement.classList.add('card__like-button_is-active');
				likeCount.textContent = card.likes.length;
			})
			.catch(() => {
				console.error();
			});
	}
}

function isLiked(cardElement, buttonElement, userId) {
	if (cardElement.likes.some((user) => user._id === userId)) {
		buttonElement.classList.add('card__like-button_is-active');
	}
}
