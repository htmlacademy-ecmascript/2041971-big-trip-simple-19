import {render} from './framework/render.js';
import FilterView from './view/list-filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import {generateFilter} from './mock/filter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointsModel,
  offersModel,
  destinationsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), tripFiltersElement);

boardPresenter.init();
