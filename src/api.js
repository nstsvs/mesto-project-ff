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

function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(handleRequest);
}

export const getProfileInfo = () => {
  return request(`/users/me`, {
    headers: config.headers
  });
}

export const updateProfileInfo = (name, about) => {
  return request(`/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

export const getInitialCards = () => {
  return request(`/cards`, {
    headers: config.headers
  })
}

export const addNewCard = (name, link) => {
  return request(`/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

export const addLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

export const deleteLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const removeCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const updateAvatar = (avatar) => {
  return request(`/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
}
