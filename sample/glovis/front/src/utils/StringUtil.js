export const setBe = (str, unit = '회') => {
  if (str === undefined || str === null) {
    return '없음';
  }

  const result = parseInt(str);
  if (Number.isInteger(result) && result > 0) {
    return `${setComma(result) + unit}`;
  }

  return '없음';
};

export const setComma = (number, option) => {
  const parsed = parseInt(number);

  return isNaN(parsed) ? 0 : parsed.toLocaleString(undefined, option);
};

export const removeComma = (number) => parseInt(number?.replace(/\,/gi, '')) || 0;

export const getLabelFromArray = (labelList, value, label = 'label') => {
  if (!Array.isArray(labelList)) {
    return '';
  }
  const target = labelList.find((obj) => obj.value === value);

  return target ? target[label] : '';
};

//공유하기 description 생성기
export const makeShareDesc = (arr) => {
  return arr
    .map((e) => (e ? `#${e}` : ''))
    .join(' ')
    .trim();
};

/**
 * "01012345678" => "010-1234-5678"
 * @param {string} tel
 * @returns {string} 구분자 추가된 문자열 반환
 */
export const telToStrFormat = (tel, divider = '-') => {
  return tel.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, `$1${divider}$2${divider}$3`);
};

/**
 * "01012345678" => ["010","1234","5678"]
 * @param {string} tel
 * @returns {array} length === 3 인 배열 반환
 */
export const telToArray = (tel) => {
  return telToStrFormat(tel).split('-');
};

/*
 *
 * @param {string} 탈퇴사유
 * @returns {string} 4자리수 마다 , 표시
 */
export const setCommaString = (value) => {
  let data = value + '';

  var arrResult = data.split('');

  var startIndex = arrResult.length - 4;

  for (var i = startIndex; i > 0; i -= 4) {
    arrResult.splice(i, 0, ',');
  }

  return arrResult.join('');
};

export const subStringOfAnchor = (anchor, str) => {
  const tmp = str;

  const idx = tmp.indexOf(anchor);
  if (idx === -1) {
    return str;
  }

  const result = tmp.substring(idx);

  return result;
};

export function ltrim(value) {
  return value.replace(/^\s+/, '');
}

export function rtrim(value) {
  return value.replace(/\s+$/, '');
}
