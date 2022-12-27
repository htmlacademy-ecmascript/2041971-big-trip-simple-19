import dayjs from 'dayjs';

function humanizePointDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function isPointFuture (date) {
  return date || dayjs().isAfter(date, 'D');
}

export {humanizePointDate, isPointFuture};
