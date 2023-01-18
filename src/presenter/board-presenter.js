import {remove, render, RenderPosition} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/list-sort-view.js';
import EmptyListView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {sortPointDate, sortPointPrice} from '../utils/point.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #boardComponent = new EventsListView();
  #sortComponent = null;
  #noPointComponent = new EmptyListView();

  #pointPresenter = new Map();
  #currentSortType = SortType.DATE;

  constructor({boardContainer, pointsModel, offersModel, destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#pointsModel.points].sort(sortPointDate);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
    }

    return [...this.#pointsModel.points].sort(sortPointDate);
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({currentSortType: this.#currentSortType, onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#boardComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.uniqueId, pointPresenter);
  }

  #renderPointList() {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.offers, this.destinations);
    }
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DATE;
    }
  }

  #renderBoard() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();
      render(this.#boardComponent, this.#boardContainer);

      this.#renderPointList();
    }
  }
}
