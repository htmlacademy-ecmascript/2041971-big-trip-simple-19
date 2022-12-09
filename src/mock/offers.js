import {getRandomInteger} from '../utils.js';
import {OFFER_TITLES} from '../const.js';

const titles = OFFER_TITLES.slice();

export const generateOffers = () => ({
  id: getRandomInteger(),
  title: titles.shift(),
  price: getRandomInteger(1, 10) * 10,
});

