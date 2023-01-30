import {FilterType} from '../const.js';
import {isPointFuture} from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom) || isPointFuture(point.dateTo)),
};

export {filter};
