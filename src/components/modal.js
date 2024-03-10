function openModal(modal) {
	modal.classList.add('popup_is-opened');
	document.addEventListener('keydown', keyHandler);
}

function closeModal(modal) {
	modal.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
	if (evt.key === 'Escape') {
		closeModal(document.querySelector('.popup_is-opened'));
	}
}

function closeOverlay(evt) {
	if (evt.target.classList.contains('popup_is-opened')) {
		closeModal(evt.currentTarget);
	}
}

export { openModal, closeModal, closeOverlay }
