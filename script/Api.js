export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }


_checkResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

getInitialCards() {
  return fetch(`${this.baseUrl}/cards`, {
    headers: this.headers,
  })
  .then(this._checkResponse);
}

updateUserProfile(data) {
  return fetch (`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify(data)
  })
  .then(this._checkResponse);
}

addCard(data) {
  return fetch(`${this.baseUrl}/cards`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(data)
  })
  .then(this._checkResponse);
}

updateAvatar(data) {
  return fetch(`${this.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify(data)
  })
  .then(this._checkResponse);
}

deleteCard(cardId) {
  return fetch(`${this.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this.headers,
  })
  .then(this._checkResponse);
}

toggleLike(cardId, isLiked) {
  const method = isLiked ? 'DELETE' : 'PUT';
  return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: this.headers,
  })
  .then(this._checkResponse);
}

getUserInfo() {
  return fetch(`${this.baseUrl}/users/me`, {
    headers: this.headers,
  })
  .then(this._checkResponse);
}

}