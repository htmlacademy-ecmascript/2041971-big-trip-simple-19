import {render, RenderPosition} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/list-sort-view.js';
import EmptyListView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new EventsListView();
  #sortComponent = new SortView();
  #noPointComponent = new EmptyListView();

  #boardPoints = [];
  #boardOffers = [];
  #boardDestination = [];
  #pointPresenter = new Map();

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

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, offers, destination) {
    const pointPresenter = new PointPresenter({pointListContainer: this.#boardComponent.element});
    pointPresenter.init(point, offers, destination);
    //this.#pointPresenter(point.id, pointPresenter);
  }

  #renderPointList() {
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardOffers[i], this.#boardDestination[i]);
    }
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();
      render(this.#boardComponent, this.#boardContainer);

      this.#renderPointList();
    }
  }
}
