import {createElement} from '../render.js';
import {humanizePointDate} from '../utils.js';
import {DateFormat} from '../const.js';

const createOffers = (offers, offersModel) => {
  const carrentOffers = offers.map((id) => offersModel.offers.find((offer) => id === offer.id));
  return carrentOffers.map((offer) => offer !== undefined ?
    `<li class="event__offer">
     <span class="event__offer-title">${offer.title}</span>
     &plus;&euro;&nbsp;
     <span class="event__offer-price">${offer.price}</span>
   </li>` : '').join('');
};

const createPointTemplate = (point, offersModel, destination) => {
  const {dateFrom, dateTo, offers, type, basePrice} = point;

  const date = humanizePointDate(dateFrom, DateFormat.DATE_FORMAT);
  const timeFrom = humanizePointDate(dateFrom, DateFormat.TIME_FORMAT);
  const timeTo = humanizePointDate(dateTo, DateFormat.TIME_FORMAT);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">${createOffers(offers, offersModel)}</ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class EventsItemView {
  #element = null;
  #point = null;
  #offers = null;
  #destination = null;

  constructor({point, offers, destination}) {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destination);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
