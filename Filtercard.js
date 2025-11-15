class FilterCard {
  constructor(cardElement) {
    this._name = cardElement.textContent.trim();
    this._isActive = false;
    this._element = cardElement;
    this._filterIsClicked();
  }

  _filterIsClicked() {
    this._element.addEventListener('click', () => {
      this._isActive = this._element.classList.toggle('is-active');
    });
  }
  get name() {
    return this._name;
  }

  get isActive() {
    return this._isActive;
  }

  get cardElement() {
    return this._element;
  }
}
