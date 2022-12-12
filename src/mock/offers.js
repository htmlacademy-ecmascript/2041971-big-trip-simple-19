import {getRandomInteger, getRandomArrayElement} from '../utils.js';
import {OFFER_TITLES, TIPES} from '../const.js';

const generateTitle = () => getRandomArrayElement(OFFER_TITLES);

const generateOffer = (id) => ({
  id,
  title: generateTitle(),
  price: getRandomInteger(1, 10) * 10,
});

const generateOffers = () => {
  const offers = Array.from({length: getRandomInteger()}, (_item, index) => generateOffer(index + 1));
  const unicOffersList = offers.reduce((acc, offer) => acc.map[offer.title] ? acc : ((acc.map[offer.title] = true), acc.offers.push(offer), acc), {
    map: {},
    offers: []
  }).offers;
  return unicOffersList;
};

export const generateOffersByTipe = () => TIPES.map((type) => ({
  type,
  offers: generateOffers(),
}));

