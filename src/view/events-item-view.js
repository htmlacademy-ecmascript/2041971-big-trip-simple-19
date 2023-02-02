import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate} from '../utils/point.js';
import {DateFormat} from '../const.js';

function renderCurrentOffers(selectedOffers, type, offersModel) {
  const typeInLowerCase = type.toLowerCase();
  const offersByType = offersModel.find((offerModel) =>offerModel.type.toLowerCase() === typeInLowerCase);
  return offersByType ? selectedOffers.map((id) => offersByType.offers.find((offer) => id === offer.id)) : '';
}

function createOffersTemplate(selectedOffers, type, offersModel) {
  const carrentOffers = renderCurrentOffers(selectedOffers, type, offersModel);

  return carrentOffers.length !== 0 ? carrentOffers.map((offer) => offer !== undefined ?
    `<li class="event__offer">
     <span class="event__offer-title">${offer.title}</span>
     &plus;&euro;&nbsp;
     <span class="event__offer-price">${offer.price}</span>
   </li>` : '').join('') :
    `<li class="event__offer">
     <span class="event__offer-title">No additional offers</span>
   </li>`;
}

function renderCurrentDestination(point, destinationsModel) {
  return destinationsModel.find((destination) => destination.id === point.destination);
}

function renderDate(dateFrom, dateTo) {
  return {
    date: humanizePointDate(dateFrom, DateFormat.DATE_FORMAT),
    timeFrom: humanizePointDate(dateFrom, DateFormat.TIME_FORMAT),
    timeTo: humanizePointDate(dateTo, DateFormat.TIME_FORMAT),
  };
}

function createPointTemplate(point, offersModel, destinationsModel) {
  const {dateFrom, dateTo, offers, type, basePrice} = point;
  const carrentDestination = renderCurrentDestination(point, destinationsModel);
  const date = renderDate(dateFrom, dateTo).date;
  const timeFrom = renderDate(dateFrom, dateTo).timeFrom;
  const timeTo = renderDate(dateFrom, dateTo).timeTo;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${carrentDestination ? carrentDestination.name : ''}</h3>
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
      <ul class="event__selected-offers">${createOffersTemplate(offers, type, offersModel)}</ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}

export default class EventsItemView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleRollupClick = null;

  constructor({point, offers, destinations, onRollupClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleRollupClick = onRollupClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };
}
