import FilterView from './view/list-filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointsModel,
});

render(new FilterView(), tripFiltersElement);

boardPresenter.init();
