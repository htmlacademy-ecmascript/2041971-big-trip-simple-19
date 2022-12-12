import dayjs from 'dayjs';

const DATE_FORMATE = 'MMM D';
const TIME_FORMATE = 'hh:mm';

const getRandomInteger = (a = 1, b = 5) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const humanizePointDate = (date) => date ? dayjs(date).format(DATE_FORMATE) : '';
const humanizePointTime = (date) => date ? dayjs(date).format(TIME_FORMATE) : '';

export {getRandomInteger, getRandomArrayElement, humanizePointDate, humanizePointTime};
