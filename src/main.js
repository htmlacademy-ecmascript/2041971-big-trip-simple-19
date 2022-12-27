import {render} from './framework/render.js';
import FilterView from './view/list-filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), tripFiltersElement);

boardPresenter.init();
