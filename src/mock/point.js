import {getRandomInteger} from '../utils.js';
import {generateDestination} from './destination.js';
import {generateOffers} from './offers.js';

export const generatePoint = () => ({
  'basePrice': getRandomInteger() * 100,
  'dateFrom': null,
  'dateTo': null,
  'destination': generateDestination(),
  'id': null,
  'offers': generateOffers(),
  'type': [],
});

