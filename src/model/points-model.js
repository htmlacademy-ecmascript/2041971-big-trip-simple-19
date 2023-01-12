import {generatePoint} from '../mock/point.js';
import {generateOffersByTipe} from '../mock/offers.js';
import {generateDestinations} from '../mock/destination.js';
import {TASK_COUNT} from '../const.js';
export default class PointsModel {
  #points = Array.from({length: TASK_COUNT}, (_item, index) => generatePoint(index + 1));
  #offers = generateOffersByTipe();
  #destinations = generateDestinations();

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
