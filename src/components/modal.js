export function openPopup(popup) {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', keyHandler);
}

export function closePopup(popup) {
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', keyHandler);
}

export function closeOverlay(evt) {
	if (evt.target.classList.contains('popup_is-opened')) {
		closePopup(evt.currentTarget);
	}
}

function keyHandler(evt) {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_is-opened'));
	}
}
