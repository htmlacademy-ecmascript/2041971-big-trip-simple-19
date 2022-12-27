import {FilterTipe} from '../const.js';
import {isPointFuture} from './point.js';

const filter = {
  [FilterTipe.EVERYTHING]: (points) => points,
  [FilterTipe.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom) || isPointFuture(point.dataTo)),
};

export {filter};
