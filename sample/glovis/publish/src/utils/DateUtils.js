import _ from 'lodash';

export function toDay(format) {
  if (_.isEmpty(format)) {
    format = '-';
  }

  const toDate = new Date();
  const year = String(toDate.getFullYear());
  const month = String(toDate.getMonth() + 1);
  const date = String(toDate.getDate());

  return year + format + (month.length === 1 ? '0' + month : month) + format + (date.length === 1 ? '0' + date : date);
}

export function dateToString(date, format = '-') {
  if (typeof date === 'string') {
    return date;
  }
  const toDate = date;
  const year = String(toDate.getFullYear());
  const month = String(toDate.getMonth() + 1);
  const day = String(toDate.getDate());

  return year + format + (month.length === 1 ? '0' + month : month) + format + (day.length === 1 ? '0' + day : day);
}
