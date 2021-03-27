export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar, userId) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);    
    this._profileAvatar = document.querySelector(profileAvatar);
    this._userId = userId;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
      avatar: this._profileAvatar.src,
      _id: this._userId
    }
  }

  get userId() {
    return this._userId;
  }

  setUserInfo({name, about, avatar, _id}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this._profileAvatar.src = avatar;
    this._userId = _id;
  }
}