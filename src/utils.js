import dayjs from 'dayjs';

const getRandomInteger = (a = 1, b = 5) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const humanizePointDate = (date, format) => date ? dayjs(date).format(format) : '';

export {getRandomInteger, getRandomArrayElement, humanizePointDate};
