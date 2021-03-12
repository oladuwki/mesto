export default class UserInfo {
  constructor({profileName, profileJob}) {
    this._profileName = document.querySelector('.profile__name');
    this._profileJob = document.querySelector('.profile__job');
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }

  setUserInfo({name, job}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}