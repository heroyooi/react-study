import _ from 'lodash';

export function addMonths(d, n) {
  if (isDate(d) !== true) {
    return null;
  }
  const newDate = clone(d);
  newDate.setMonth(d.getMonth() + n);
  return newDate;
}

export function clone(d) {
  return new Date(d.getTime());
}

export function dateToString(date, format = '-') {
  let toDate = date;
  if (typeof date === 'string') {
    const dateObj = dateParse(date.substr(0, 10));

    if ( dateObj ) {
      toDate = new Date(dateObj.y, dateObj.m - 1, dateObj.d);
    }
  }

  if (isDate(toDate)) {
    const year = String(toDate.getFullYear());
    const month = String(toDate.getMonth() + 1);
    const day = String(toDate.getDate());

    return year + format + (month.length === 1 ? '0' + month : month) + format + (day.length === 1 ? '0' + day : day);
  }

  return '';
}

export function isDate(value) {
  return value instanceof Date && !isNaN(value.valueOf());
}

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


export function dateParse(value) {
  let y = 0;
  let m = 0;
  let d = 0;

  if (value.length === 8) {
    y = value.substr(0, 4);
    m = value.substr(4, 2);
    d = value.substr(6, 2);
  } else if (value.length === 10) {
    y = value.substr(0, 4);
    m = value.substr(5, 2);
    d = value.substr(8, 2);
  } else {
    return null;
  }

  return {
    y: parseInt(y),
    m: parseInt(m),
    d: parseInt(d)
  };
}