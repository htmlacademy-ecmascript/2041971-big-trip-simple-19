import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';
import NewPointView from '../view/new-point-view.js';
import SortView from '../view/list-sort-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new EventsListView();

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

    render(new SortView(), this.#boardContainer);
    render(this.#boardComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardOffers[i], this.#boardDestination[i]);
    }
  }

  #renderPoint(point, offers, destination) {
    const pointComponent = new EventsItemView({point, offers, destination});
    const newPointComponent = new NewPointView({point, offers, destination});

    const replaceCardToForm = () => this.#boardComponent.element.replaceChild(newPointComponent.element, pointComponent.element);
    const replaceFormToCard = () => this.#boardComponent.element.replaceChild(pointComponent.element, newPointComponent.element);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    newPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#boardComponent.element);
  }
}
