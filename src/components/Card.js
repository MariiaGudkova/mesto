export class Card {
  _ACTIVE_LIKE_BUTTON = "element__like-button_active";

  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleTrashClick,
    deleteCardApi,
    currentUserId,
    createCardLike,
    deleteCardLike
  ) {
    const { likes, _id, link, name, owner } = data;
    this._likes = likes;
    this._id = _id;
    this._name = name;
    this._link = link;
    this._isOwnedByCurrentUser = owner._id === currentUserId;
    this._currentUserId = currentUserId;
    this._isLiked = false;

    this._element = this._createElementFromTemplate(templateSelector);

    this._image = this._element.querySelector(".element__image");
    this._titleElement = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeCount = this._element.querySelector(".element__like-count");
    this._trashButton = this._element.querySelector(".element__trash-button");

    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._deleteCardApi = deleteCardApi;
    this._createCardLike = createCardLike;
    this._deleteCardLike = deleteCardLike;

    this._initData();
    this._initDelete();
    this._setEventListeners();
  }

  _createElementFromTemplate(templateSelector) {
    return document
      .querySelector(templateSelector)
      .content.querySelector(".element__item")
      .cloneNode(true);
  }

  _initData() {
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._titleElement.textContent = this._name;
    this._likeCount.textContent = this._likes.length ? this._likes.length : "0";
    this._updateLikes(this._likes);
  }

  _initDelete() {
    if (!this._isOwnedByCurrentUser) {
      this._trashButton.remove();
    }
  }

  _updateLikesBlock(count) {
    this._likeCount.textContent = count;
    // const isPressed = this._likeButton.classList.contains(
    //   this._ACTIVE_LIKE_BUTTON
    // );
    if (this._isLiked) {
      this._likeButton.classList.add(this._ACTIVE_LIKE_BUTTON);
    } else {
      this._likeButton.classList.remove(this._ACTIVE_LIKE_BUTTON);
    }
  }

  _updateLikes(likes) {
    if (!Array.isArray(likes)) {
      console.error("likes is not Array");
      return;
    }
    const likesCount = likes.length;
    const isSelfLiked = likes.some((item) => {
      return item._id === this._currentUserId;
    });
    this._isLiked = isSelfLiked;
    this._updateLikesBlock(likesCount);
  }

  _handleSelfLike() {
    if (!this._isLiked) {
      this._createCardLike(this._id)
        .then(({ likes }) => {
          this._isLiked = true;
          this._updateLikes(likes);
        })
        .catch(console.error);
    } else {
      this._deleteCardLike(this._id)
        .then(({ likes }) => {
          this._isLiked = false;
          this._updateLikes(likes);
        })
        .catch(console.error);
    }
  }

  _deleteCard = async (evt) => {
    try {
      await this._deleteCardApi(this._id);
      this._element.remove();
    } catch (error) {
      console.log(error);
    }
  };

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link, this._alt);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleSelfLike(this._isLiked);
    });

    if (this._isOwnedByCurrentUser) {
      this._trashButton.addEventListener("click", () => {
        this._handleTrashClick(this._deleteCard);
      });
    }
  }

  getElement() {
    return this._element;
  }
}
