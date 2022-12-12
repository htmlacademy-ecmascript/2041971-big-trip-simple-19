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

const NAMES = ['Naha', 'Motobu', 'Osaka', 'Nara', 'Kioto', 'Tokio'];

const PICTURE_SRC = 'http://picsum.photos/300/200?r=';

const OFFER_TITLES = ['Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Add breakfast', 'Book tickets', 'Lunch in city',];

const TIPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const TASK_COUNT = 12;
const PRICE_COEFFICIENT = 10;

const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: {},
  offers: [],
  type: '',
};

const DateFormat = {
  DATE_FORMAT: 'MMM D',
  TIME_FORMAT: 'hh:mm',
  FORM_DATE_FORMAT: 'YY/MM/DD hh:mm',
};


export {DESCRIPTIONS, NAMES, PICTURE_SRC, OFFER_TITLES, TIPES, TASK_COUNT, BLANK_POINT, DateFormat, PRICE_COEFFICIENT};
