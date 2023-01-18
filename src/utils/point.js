import dayjs from 'dayjs';

function humanizePointDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function isPointFuture (date) {
  return date || dayjs().isAfter(date, 'D');
}

function getWeightForNullData(dataA, dataB) {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
}

function sortPointDate(pointA, pointB) {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointPrice(pointA, pointB) {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);

  return weight ?? pointB.basePrice - pointA.basePrice;
}

function isDatesEqual(dateA, dateB) {
  return dayjs(dateA).isSame(dateB, 'D');
}

export {humanizePointDate, isPointFuture, sortPointDate, sortPointPrice, isDatesEqual};
