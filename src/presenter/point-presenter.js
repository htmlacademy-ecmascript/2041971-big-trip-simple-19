import {render, replace, remove} from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import NewPointView from '../view/new-point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #newPointComponent = null;

  #point = null;
  #offers = null;
  #destination = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#newPointComponent, prevNewPointComponent);
    }

    remove(prevPointComponent);
    remove(prevNewPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#newPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#newPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#newPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

  #handleFormSubmit = (point, offers, destination) => {
    this.#handleDataChange(point, offers, destination);
    this.#replaceFormToCard();
  };
}
