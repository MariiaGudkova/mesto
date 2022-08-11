import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageImg = this._popup.querySelector(".popup__large-img-image");
    this._popupImageTitle = this._popup.querySelector(
      ".popup__large-img-signature"
    );
  }

  open(title, link, alt) {
    super.open();
    this._popupImageTitle.textContent = title;
    this._popupImageImg.src = link;
    this._popupImageImg.alt = alt ? alt : title;
  }
}
