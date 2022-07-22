export class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    if (Array.isArray(this._renderedItems)) {
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    } else {
      this._renderer(this._renderedItems);
    }
  }
}
