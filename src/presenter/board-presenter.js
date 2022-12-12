import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';
import NewPointView from '../view/new-point-view.js';
import SortView from '../view/list-sort-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new EventsListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardOffers = [...this.pointsModel.getOffers()];
    this.boardDestination = [...this.pointsModel.getDestination()];

    render(new SortView, this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new NewPointView, this.boardComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new EventsItemView({point: this.boardPoints[i], offers: this.boardOffers[i], destination: this.boardDestination[i]}), this.boardComponent.getElement());
    }
  }
}
