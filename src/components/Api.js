export class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;

    this._getJsonOnError = this._getJsonOnError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getJsonOnError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _getHeaders = () => {
    return {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  };

  getUserInfo = () => {
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOnError);
  };

  createUserInfo = (name, about) => {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._getJsonOnError);
  };

  createUserAvatar = (avatar) => {
    return fetch(`${this._host}/users/me/avatar `, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    }).then(this._getJsonOnError);
  };

  getInitialCards = () => {
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOnError);
  };

  createUserCard = (name, link) => {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then(this._getJsonOnError);
  };

  deleteUserCard = (id) => {
    return fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOnError);
  };

  createLike = (id) => {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
      body: JSON.stringify({ id }),
    }).then(this._getJsonOnError);
  };

  deleteLike = (id) => {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOnError);
  };
}
