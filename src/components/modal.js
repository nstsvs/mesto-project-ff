export function openPopup(popup) {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', keyHandler);
}

export function closePopup(popup) {
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_is-opened'));
	}
}
