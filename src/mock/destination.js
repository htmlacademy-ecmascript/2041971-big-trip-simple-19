import {getRandomInteger} from '../utils.js';

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const generateDescription = () => {
  const carentDescription = [];
  for (let i = 1; i <= getRandomInteger(1,5); i++) {
    const randomIndexDescription = getRandomInteger(0, DESCRIPTIONS.length - 1);
    carentDescription.push(DESCRIPTIONS[randomIndexDescription]);
  }
  return carentDescription.join(' ');
};

const generateName = () => {
  const names = ['Naha', 'Motobu', 'Osaka', 'Nara', 'Kioto', 'Tokio'];

  const randomIndex = getRandomInteger(0, names.length - 1);
  return names[randomIndex];
};

const generatePictures = () => {
  const generatePicture = () => ({
    'src': `http://picsum.photos/300/200?r=${Math.random()}`,
    'description': DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]});
  return Array.from({length: getRandomInteger(1, 5)}, generatePicture);
};

export const generateDestination = () => ({
  'id': getRandomInteger(0, 5),
  'description': generateDescription(),
  'name': generateName(),
  'pictures': generatePictures(),
});
