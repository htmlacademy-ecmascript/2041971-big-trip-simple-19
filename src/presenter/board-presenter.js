import {render, replace} from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';
import NewPointView from '../view/new-point-view.js';
import SortView from '../view/list-sort-view.js';
import EmptyListView from '../view/list-empty-view.js';
export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new EventsListView();
  #sortView = new SortView();

  #boardPoints = [];
  #boardOffers = [];
  #boardDestination = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardOffers = [...this.#pointsModel.offers];
    this.#boardDestination = [...this.#pointsModel.destination];

    this.#renderBoard();
  }

  #renderPoint(point, offers, destination) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new EventsItemView({
      point,
      offers,
      destination,
      onRollupClick: () => {
        replaceCardToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const newPointComponent = new NewPointView({
      point,
      offers,
      destination,
      onFormSubmit: () => {
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm () {
      replace(newPointComponent, pointComponent);
    }

    function replaceFormToCard () {
      replace(pointComponent, newPointComponent);
    }

    render(pointComponent, this.#boardComponent.element);
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      render(new EmptyListView(), this.#boardContainer);
    } else {
      render(this.#sortView, this.#boardContainer);
      render(this.#boardComponent, this.#boardContainer);

      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i], this.#boardOffers[i], this.#boardDestination[i]);
      }
    }
  }
}
