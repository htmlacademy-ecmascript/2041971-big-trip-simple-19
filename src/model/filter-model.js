import Observable from '../framework/observable.js';
import {FilterTipe} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterTipe.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
