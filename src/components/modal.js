export function openModal(modal) {
	modal.classList.add('popup_is-opened');
	document.addEventListener('keydown', keyHandler);
}

export function closeModal(modal) {
	modal.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', keyHandler);
}

export function closeOverlay(evt) {
	if (evt.target.classList.contains('popup_is-opened')) {
		closeModal(evt.currentTarget);
	}
}

function keyHandler(evt) {
	if (evt.key === 'Escape') {
		closeModal(document.querySelector('.popup_is-opened'));
	}
}
