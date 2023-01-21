import Observable from '../framework/observable.js';
import {generateOffersByTipe} from '../mock/offers.js';

export default class OffersModel extends Observable {
  #offers = generateOffersByTipe();

  get offers() {
    return this.#offers;
  }
}
