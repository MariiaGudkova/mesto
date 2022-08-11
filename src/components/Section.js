export class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(card) {
    const element = this._renderer(card);
    this._container.prepend(element);
  }

  renderItems() {
    if (Array.isArray(this._renderedItems)) {
      this._renderedItems.forEach((item) => {
        this.addItem(item);
      });
    } else {
      this.addItem(this._renderedItems);
    }
  }
}
