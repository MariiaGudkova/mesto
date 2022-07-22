export class Popup {
  _POPUP_OPEN = "popup_opened";

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.close();
    }
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add(this._POPUP_OPEN);
  }

  close() {
    this._removeEventListeners();
    this._popup.classList.remove(this._POPUP_OPEN);
  }

  _handleMousedown = (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      this.close();
    }
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  };

  _handleKeydown = (evt) => {
    this._handleEscClose(evt);
  };

  _removeEventListeners() {
    this._popup.removeEventListener("mousedown", this._handleMousedown);
    document.removeEventListener("keydown", this._handleKeydown);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleMousedown);
    document.addEventListener("keydown", this._handleKeydown);
  }
}
