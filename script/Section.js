export default class Section {
  constructor({ items, renderer}, selector) {
    this.items= items;
    this._renderer = renderer;
    this.container = document.querySelector(selector);
  }
  renderItems() {
    this.items.forEach((item) => this._renderer(item));
  }
  addItem(element) {
    this.container.append(element);
  }
}