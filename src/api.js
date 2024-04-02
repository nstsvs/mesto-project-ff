const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: '43bd1d02-664a-40fa-ac3e-dfdef7bf9773',
    'Content-Type': 'application/json'
  }
}

const handleRequest = (res) => {
  if(res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleRequest)
    .catch((err) => {
      console.log(err);
    });
}

export const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(handleRequest)
    .catch((err) => {
      console.log(err)
    })
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleRequest)
    .catch((err) => {
      console.log(err);
    });
}

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(handleRequest)
    .catch((err) => {
      console.log(err)
    })
}

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(handleRequest)
    .catch((err) => {
      console.log(err)
    })
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleRequest)
    .catch((err) => {
      console.log(err)
    })
}

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleRequest)
    .catch((err) => {
      console.log(err)
    })
}

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
    .then(handleRequest)
    .catch((err) => {
      console.log(err)
    })
}
