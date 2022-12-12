import {getRandomInteger, getRandomArrayElement} from '../utils.js';
import {DESCRIPTIONS, NAMES, PICTURE_SRC} from '../const.js';
import {TASK_COUNT} from '../const.js';

const generateDescription = () => {
  const carentDescription = [];
  for (let i = 1; i <= getRandomInteger(); i++) {
    carentDescription.push(getRandomArrayElement(DESCRIPTIONS));
  }
  return carentDescription.join(' ');
};

const generateName = () => getRandomArrayElement(NAMES);

const generatePictures = () => {
  const generatePicture = () => ({
    'src': `${PICTURE_SRC}${Math.random()}`,
    'description': getRandomArrayElement(DESCRIPTIONS)});
  return Array.from({length: getRandomInteger()}, generatePicture);
};

const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  name: generateName(),
  pictures: generatePictures(),
});

export const generateDestinations = () => Array.from({length: TASK_COUNT}, (_item, index) => generateDestination(index + 1));
