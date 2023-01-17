import Observable from '../framework/observable.js';
import {generatePoint} from '../mock/point.js';
import {TASK_COUNT} from '../const.js';
export default class PointsModel extends Observable {
  #points = Array.from({length: TASK_COUNT}, (_item, index) => generatePoint(index + 1));

  get points() {
    return this.#points;
  }

  updatePoint(updatePoint, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updatePoint, update);
  }

  addPoint(updatePoint, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updatePoint, update);
  }

  deletePoint(updatePoint, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updatePoint);
  }
}
