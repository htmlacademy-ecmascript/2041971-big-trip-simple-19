const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: {},
  offers: [],
  type: 'flight',
};

const DateFormat = {
  DATE_FORMAT: 'MMM D',
  TIME_FORMAT: 'hh:mm',
  FORM_DATE_FORMAT: 'YY/MM/DD hh:mm',
  DATEPICKER_FORMAT: 'y/m/d H:i',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const SortType = {
  DATE: 'date',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const ErrorMessage = {
  UNEXISTING_ERROR:'Can\'t update unexisting point',
  UPDATE_ERROR: 'Can\'t update point',
  ADD_ERROR: 'Can\'t add point',
  DELETE_ERROR: 'Can\'t delete point',
};

const Url = {
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
  POINTS: 'points',
};

const EventsMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
};

export {
  BLANK_POINT,
  DateFormat,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  Method,
  TimeLimit,
  ErrorMessage,
  Url,
  EventsMessage,
};
