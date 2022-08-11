export class UserInfo {
  constructor(userData) {
    const { userNameSelector, userJobSelector, userAvatarSelector } = userData;
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  setUserInfo = ({ name, about, avatar, _id }) => {
    this._currentUserId = _id;
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._userAvatar.src = avatar;
  };

  getUserInfo = () => {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
      avatar: this._userAvatar.src,
      id: this._currentUserId,
    };
  };
}
