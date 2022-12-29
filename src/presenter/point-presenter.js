import {render, replace, remove} from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import NewPointView from '../view/new-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChenge = null;

  #pointComponent = null;
  #newPointComponent = null;

  #point = null;
  #offers = null;
  #destination = null;

  constructor({pointListContainer, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChenge = onDataChange;
  }

  init(point, offers, destination) {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;

    const prevPointComponent = this.#pointComponent;
    const prevNewPointComponent = this.#newPointComponent;

    this.#pointComponent = new EventsItemView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      onRollupClick: this.#handleRollupClick,
    });

    this.#newPointComponent = new NewPointView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevPointComponent === null || prevNewPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevNewPointComponent.element)) {
      replace(this.#newPointComponent, prevNewPointComponent);
    }

    remove(prevPointComponent);
    remove(prevNewPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#newPointComponent);
  }

  #replaceCardToForm() {
    replace(this.#newPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#newPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleRollupClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (point) => {
    console.log(point);
    this.#handleDataChenge(point);
    this.#replaceFormToCard();
  };
}
