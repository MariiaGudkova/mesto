export class UserInfo {
  constructor(userData) {
    const {
      userNameSelector,
      userJobSelector,
      userAvatarSelector,
      currentUserId,
      userName,
      userJob,
      userAvatar,
    } = userData;
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._currentUserId = currentUserId;
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;
    this._userAvatar.src = userAvatar;
  }

  get userId() {
    return this._currentUserId;
  }

  get userName() {
    return this._userName.textContent;
  }

  set userName(userName) {
    this._userName.textContent = userName;
  }

  get userJob() {
    return this._userJob.textContent;
  }

  set userJob(userJob) {
    this._userJob.textContent = userJob;
  }

  get userAvatar() {
    return this._userAvatar.src;
  }

  set userAvatar(userAvatar) {
    this._userAvatar.src = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._userAvatar.src,
      id: this._currentUserId,
    };
  }
}
