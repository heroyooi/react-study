import { isDayBefore, objIsEmpty } from '@src/utils/CommonUtil';

export function dateToString(val) {
  if (isDate(val)) {
    const year = val.getFullYear();
    const month = val.getMonth();
    const date = val.getDate();

    return `${year}-${padLeft(month, 2, '0')}-${padLeft(date, 2, '0')}`;
  }

  return '';
}

export function endsWith(str, suffix, position) {
  const subjectString = str.toString().toLowerCase();

  if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
    position = subjectString.length;
  }

  position -= suffix.length;
  const lastIndex = subjectString.indexOf(suffix.toLowerCase(), position);
  return lastIndex !== -1 && lastIndex === position;
}

export function getPageName(pathName) {
  if (endsWith(pathName, 'pricing01')) {
    return 'pricingSystem';
  } else if (endsWith(pathName, 'marketPrice')) {
    return 'marketPrice';
  } else if (endsWith(pathName, 'marketPriceHyundai')) {
    return 'pricingHyundai';
  }

  return null;
}
export function numberWithCommas(x, postfix) {
  if (x && !isNaN(x)) {
    let val = typeof x === 'string' ? x : x.toString();

    if (postfix) {
      val = val.replace(postfix, '');
    }

    // eslint-disable-next-line security/detect-unsafe-regex
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (postfix || '');
  }

  return '';
}

export function isDate(value) {
  return value instanceof Date && !isNaN(value.valueOf());
}

export function isPricingTicket(pricingTicket) {
  if (pricingTicket && pricingTicket.expiredDate && !isDayBefore(pricingTicket.expiredDate, new Date())) {
    return true;
  }

  return false;
}

export function objToQueryParams(url, pricingCarInfo) {
  let queryString = '';

  if (!objIsEmpty(pricingCarInfo)) {
    const { carNo, noy, dspl, rlsPrc, fuel, frstRegDt, drvDist, clr, drvDistRange, defaultOptions } = pricingCarInfo;
    const distRangeMin = drvDistRange ? drvDistRange.min || 0 : 0;
    const distRangeMax = drvDistRange ? drvDistRange.max || 200000 : 200000;

    queryString = `carNo=${carNo || ''}&noy=${noy || ''}&dspl=${dspl || ''}&rlsPrc=${rlsPrc || ''}&fuel=${fuel || ''}&frstRegDt=${dateToString(frstRegDt)}&drvDist=${drvDist || ''}&clr=${clr ||
      ''}&drvDistRange=${distRangeMin}-${distRangeMax}`;

    if (defaultOptions) {
      defaultOptions.forEach((option) => {
        queryString += `&${option.id}=${option.yn || 'N'}`;
      });
    }

    return `${url}?${queryString}`;
  }

  return url;
}

export function padLeft(value, n, str) {
  const newValue = (value || '').toString();

  return Array(n - newValue.length + 1).join(str || '0') + newValue;
}
