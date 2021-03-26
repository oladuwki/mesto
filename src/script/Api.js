import Section from "./Section.js";
export default class Api {
  constructor(options) {
    this._options = options;
    console.log(this._options);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
          authorization: `${this._options.headers.authorization}`,
          'Content-Type': 'application/json'
      }
    })
      
  }

  getProfileInfo() {
   return fetch(`${this._options.baseUrl}/users/me`, {
  headers: {
    authorization: `${this._options.headers.authorization}`,
  }
})
  
  }

  getCardInfo() {
    return fetch(`${this._options.baseUrl}/cards`, {
  headers: {
    authorization: `${this._options.headers.authorization}`,
  }
})
  
  }

  getHandleFormSubmit(body) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._options.headers.authorization}`,
        'Content-Type': 'application/json'
      }, body})
  }

  getNewCard(body) {
    return fetch(`${this._options.baseUrl}/cards`, {
  method: 'POST',
  headers: {
    authorization: `${this._options.headers.authorization}`,
    'Content-Type': 'application/json'
      }, body} )
  }

  deleteCard(cardId){
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: `${this._options.headers.authorization}`,
          'Content-Type': 'application/json'
        }})
  }

  putLikes(cardId){
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: `${this._options.headers.authorization}`,
          'Content-Type': 'application/json'
        }})
  }

  deleteLikes(cardId){
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: `${this._options.headers.authorization}`,
          'Content-Type': 'application/json'
        }})
  }

  changeAvatar(body) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: {
    authorization: `${this._options.headers.authorization}`,
    'Content-Type': 'application/json'
  }, body})
  }
  // другие методы работы с API
}



