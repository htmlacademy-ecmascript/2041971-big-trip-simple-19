import {getRandomInteger} from '../utils.js';

const generateOffer = () => {
  const offers = [
    {
      title: 'Order Uber',
      price: `${getRandomInteger(1, 10) * 10}`,
    },
    {
      title: 'Add luggage',
      price: `${getRandomInteger(1, 10) * 10}`,
    },
    {
      title: 'Switch to comfort',
      price: `${getRandomInteger(1, 10) * 10}`,
    },
    {
      title: 'Rent a car',
      price: `${getRandomInteger(1, 10) * 10}`,
    },
    {
      title: 'Add breakfast',
      price: `${getRandomInteger(1, 10) * 10}`,
    },
    {
      title: 'Book tickets',
      price: `${getRandomInteger(1, 10) * 10}`,
    },
    {
      title: 'Lunch in city',
      price: `${getRandomInteger(1, 10) * 10}`,
    },
  ];
  const randomIndex = getRandomInteger(0, offers.length - 1);
  return offers[randomIndex];
};

export const generateOffers = () => {
  const offer = generateOffer();
  return {
    id: getRandomInteger(0, 5),
    title: offer.title,
    price: offer.price,
  };
};
