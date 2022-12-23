import dayjs from 'dayjs';

const humanizePointDate = (date, format) => date ? dayjs(date).format(format) : '';

export {humanizePointDate};
