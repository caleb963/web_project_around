class Card {
  constructor(title, link, template) {
    this.title = title;
    this.link = link;
    this.template = template;
  }
    _getCardClone() {
      this.card = template.cloneNode(true).content.querySelector(".card");
    }
    _handleLike (){}
    _handleDislike () {}
    _handleSetLike() {}
    _handleRemoveCard() {}
    _handleOpenImageCard() {}
    _setProperties() {}
    _setEventListeners() {}
    generateCard() {}

}