import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {BLANK_POINT, DateFormat} from '../const.js';
import {humanizePointDate} from '../utils/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function renderOffersByType(type, offersModel) {
  const typeInLowerCase = type.toLowerCase();
  return offersModel.find((offer) => offer.type.toLowerCase() === typeInLowerCase);
}

function createOffersTemplate(offersByType, selectedOffers) {
  return offersByType.offers.map((offer) => {
    const checked = selectedOffers.includes(offer.id) ? 'checked' : '';
    return `
     <div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" data-id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${checked}>
       <label class="event__offer-label" for="event-offer-${offer.id}">
         <span class="event__offer-title">${offer.title}</span>
         &plus;&euro;&nbsp;
         <span class="event__offer-price">${offer.price}</span>
       </label>
     </div>`;
  }).join(' ') ;
}

function createPicturesTemplate(pictures) {
  return pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`);
}

function createDestinationsTemplate(destinationsModel) {
  return destinationsModel.map((destination) => `<option value="${destination.name}"></option>`).join(' ');
}

function renderCurrentDestination(point, destinationsModel) {
  return destinationsModel.find((destination) => destination.id === point.destination);
}

function renderOffersContainerTemplate(type, offersModel, selectedOffers) {
  const offersByType = renderOffersByType(type, offersModel);
  return offersByType.offers.length ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">${createOffersTemplate(offersByType, selectedOffers)}</div>
  </section>` : '';
}

function renderDestinationsContainerTemplate(carrentDestination) {
  return carrentDestination ?
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${carrentDestination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">${createPicturesTemplate(carrentDestination.pictures)}</div>
        </div>
      </section>` : '';
}

function renderDate(dateFrom, dateTo) {
  return {
    startTime: humanizePointDate(dateFrom, DateFormat.FORM_DATE_FORMAT),
    endTime: humanizePointDate(dateTo, DateFormat.FORM_DATE_FORMAT),
  };
}

function getResetButtonName (id, isDeleting) {
  if (id === undefined) {
    return 'Cancel';
  }
  if (isDeleting) {
    return 'Deleting...';
  }
  return 'Delete';
}

function createNewPointTemplate(point, offersModel, destinationsModel) {
  const {dateFrom, dateTo, offers, type, basePrice, id, isDisabled, isSaving, isDeleting,} = point;
  const carrentDestination = renderCurrentDestination(point, destinationsModel);

  const startTime = renderDate(dateFrom, dateTo).startTime;
  const endTime = renderDate(dateFrom, dateTo).endTime;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1" ${isDisabled ? 'disabled' : ''}>${type}</label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${carrentDestination ? carrentDestination.name : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''} required>
        <datalist id="destination-list-1">${createDestinationsTemplate(destinationsModel)}</datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}" ${isDisabled ? 'disabled' : ''}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}"  ${isDisabled ? 'disabled' : ''} required>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'saving...' : 'save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${getResetButtonName(id, isDeleting)}</button>
    </header>
    <section class="event__details">
      ${renderOffersContainerTemplate(type, offersModel, offers)}
      ${renderDestinationsContainerTemplate(carrentDestination)}
    </section>
  </form>
</li>`;
}

export default class NewPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleCancelClick = null;
  #handleDeleteClick = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({point = BLANK_POINT, offers, destinations, onFormSubmit, onCancelClick, onDeleteClick}) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this._setState(NewPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createNewPointTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  reset(point) {
    this.updateElement(
      NewPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener( 'change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    const availableOffersElement = this.element.querySelector('.event__available-offers');
    if (availableOffersElement) {
      availableOffersElement.addEventListener('change', this.#offersChangeHandler);
    }
    const resetBtnElement = this.element.querySelector('.event__reset-btn');
    if (this._state.id === undefined) {
      resetBtnElement.addEventListener('click', this.#formCancelClickHandler);
    } else {
      resetBtnElement.addEventListener('click', this.#formDeleteClickHandler);
    }
    this.#setDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(NewPointView.parseStateToPoint(this._state), this.#offers, this.#destinations);
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this.#destinations.find((destination) => evt.target.value === destination.name);

    if (!selectedDestination) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination: selectedDestination.id,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value > 0) {
      this.updateElement({
        basePrice: evt.target.value,
      });
    } else {
      evt.target.value = '';
    }
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const selectOffers = [];

    if (evt.target.tagName === 'INPUT') {
      Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
        .forEach((checkbox) => checkbox.checked ? selectOffers.push(Number(checkbox.dataset.id)) : '');
      this.updateElement({
        offers: selectOffers,
      });
    }
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {
    this.#dateFromPicker = flatpickr(this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: DateFormat.DATEPICKER_FORMAT,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      });

    this.#dateToPicker = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: DateFormat.DATEPICKER_FORMAT,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler
      });
  }

  #formCancelClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleCancelClick(NewPointView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleDeleteClick(NewPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
