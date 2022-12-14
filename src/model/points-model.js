import {generatePoint} from '../mock/point.js';
import {generateOffersByTipe} from '../mock/offers.js';
import {generateDestinations} from '../mock/destination.js';
import {TASK_COUNT} from '../const.js';

const offersGroup = generateOffersByTipe();
const destinations = generateDestinations();

export default class PointsModel {
  #points = Array.from({length: TASK_COUNT}, (_item, index) => generatePoint(index + 1));
  #offers = this.points.map((point) => offersGroup.find((offer) => offer.type === point.type));
  #destination = this.points.map((point) => destinations.find((destination) => destination.id === point.id));

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destination() {
    return this.#destination;
  }
}
