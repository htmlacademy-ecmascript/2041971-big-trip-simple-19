import {render, RenderPosition} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/list-sort-view.js';
import EmptyListView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortPointDate, sortPointPrice} from '../utils/point.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new EventsListView();
  #sortComponent = null;
  #noPointComponent = new EmptyListView();

  #boardPoints = [];
  #boardOffers = [];
  #boardDestination = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DATE;
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points].sort(sortPointDate);
    this.#boardOffers = [...this.#pointsModel.offers];
    this.#boardDestination = [...this.#pointsModel.destination];
    console.log(this.#boardDestination);
    this.#sourcedBoardPoints = [...this.#pointsModel.points].sort(sortPointDate);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint, offers, destination) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.uniqueId).init(updatedPoint, offers, destination);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#boardPoints.sort(sortPointDate);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, offers, destination) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#boardComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, offers, destination);
    this.#pointPresenter.set(point.uniqueId, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
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
