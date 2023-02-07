import {render, replace, remove} from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import NewPointView from '../view/new-point-view.js';
import {UserAction, UpdateType} from '../const.js';

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
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevNewPointComponent = this.#newPointComponent;

    this.#pointComponent = new EventsItemView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onRollupClick: this.#handleRollupClick,
    });

    this.#newPointComponent = new NewPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevNewPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
      this.#mode = Mode.DEFAULT;
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
      this.#newPointComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#newPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#newPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointComponent.shake(resetFormState);
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
      this.#newPointComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  #handleRollupClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCancelClick = () => {
    this.#newPointComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
