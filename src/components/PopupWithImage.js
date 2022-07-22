import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  _popupImageImg = document.querySelector(".popup__large-img-image");
  _popupImageTitle = document.querySelector(".popup__large-img-signature");

  constructor(popupSelector) {
    super(popupSelector);
  }

  open(title, link) {
    super.open();
    this._popupImageTitle.textContent = title;
    this._popupImageImg.src = link;
  }
}
