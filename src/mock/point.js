import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {TIPES, PRICE_COEFFICIENT} from '../const.js';
import dayjs from 'dayjs';

const generatePrice = () => getRandomInteger(1, PRICE_COEFFICIENT) * PRICE_COEFFICIENT;

const generateFromToDates = () => {
  const MAX_GAP = 14;
  const fromDate = dayjs()
    .add(getRandomInteger(-MAX_GAP, MAX_GAP), 'day')
    .add(getRandomInteger(-MAX_GAP, MAX_GAP), 'hour')
    .add(getRandomInteger(-MAX_GAP, MAX_GAP), 'minute');
  const toDate = fromDate
    .clone()
    .add(getRandomInteger(0, 14), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');
  return {
    from: fromDate.toISOString(),
    to: toDate.toISOString()
  };
};
const generateType = () => getRandomArrayElement(TIPES);

export const generatePoint = (id) => {
  const dates = generateFromToDates();
  const offersGroup = Array.from({length:getRandomInteger(1, 4)}, (i, j) => getRandomInteger(j + 1));
  const offers = new Set(offersGroup);

  return{
    basePrice: generatePrice(),
    dateFrom: dates.from,
    dateTo: dates.to,
    destination: id,
    id,
    offers: [...offers],
    type: generateType(),
  };
};

