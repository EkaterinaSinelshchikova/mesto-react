export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  };

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  };

  editAvatar = (data) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._requestResult(res));
  };

  editProfile = (data) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._requestResult(res));
  };

  addNewCard = (data) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._requestResult(res));
  };

  deleteCard = (data) => {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  };

  addCardLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  };

  deleteCardLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  };
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    authorization: "5a68fdde-5fb9-43c7-accb-5d00338b1372",
    "Content-Type": "application/json",
  },
});
