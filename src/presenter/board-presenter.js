import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';
import NewPointView from '../view/new-point-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new EventsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new NewPointView, this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventsItemView, this.boardComponent.getElement());
    }
  }
}
