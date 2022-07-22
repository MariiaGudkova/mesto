export class Card {
    _ACTIVE_LIKE_BUTTON = "element__like-button_active";

    constructor(data, templateSelector, handleCardClick) {
        const { link, title, alt } = data;
        this._title = title;
        this._link = link;
        this._alt = alt ? alt : title;

        this._element = this._createElementFromTemplate(templateSelector);

        this._image = this._element.querySelector(".element__image");
        this._titleElement = this._element.querySelector(".element__title");
        this._likeButton = this._element.querySelector(".element__like-button");
        this._trashButton = this._element.querySelector(".element__trash-button");

        this._handleCardClick = handleCardClick;

        this._initData();
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
        this._titleElement.textContent = this._title;
    }

    _handleLikeButtonPress() {
        this._likeButton.classList.toggle(this._ACTIVE_LIKE_BUTTON);
    }

    _handleTrashButtonPress() {
        this._element.remove();
    }

    _setEventListeners() {
        this._image.addEventListener("click", () => {
            this._handleCardClick(this._title, this._link, this._alt);
        });

        this._likeButton.addEventListener("click", () => {
            this._handleLikeButtonPress();
        });

        this._trashButton.addEventListener("click", () => {
            this._handleTrashButtonPress();
        });
    }

    getElement() {
        return this._element;
    }
}
