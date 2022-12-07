import FilterView from './view/list-filter-view.js';
import SortView from './view/list-sort-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement});

render(new FilterView(), tripFiltersElement);
render(new SortView(), tripEventsElement);

boardPresenter.init();
