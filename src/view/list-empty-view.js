import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';
import {EventsMessage} from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: EventsMessage.EVERYTHING,
  [FilterType.FUTURE]: EventsMessage.FUTURE,
};

function createEmptyListTemplate(filterType) {
  const noPointTextValue = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${noPointTextValue}</p>`;
}

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
