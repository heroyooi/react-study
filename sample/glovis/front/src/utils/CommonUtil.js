import React from 'react';
const os = require('os');
const UAParser = require('ua-parser-js/dist/ua-parser.min');

export function endsWith(str, suffix, position) {
  const subjectString = str.toString().toLowerCase();

  if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
    position = subjectString.length;
  }

  position -= suffix.length;
  const lastIndex = subjectString.indexOf(suffix.toLowerCase(), position);
  return lastIndex !== -1 && lastIndex === position;
}

export function getIsMobile(req) {
  const userAgent = req && req.headers ? req.headers['user-agent'] : '';

  const UA = new UAParser(userAgent);
  const deviceType = UA.getDevice().type || 'desktop';

  return deviceType !== 'desktop';
}

/**
 * IE 브라우저 체크
 * useEffect 안에서만 작동됩니다.
 * @param userAgent
 * @return {boolean} IE여부 IE11/12
 */
export function ieBrowserCheck(userAgent) {
  const agent = (userAgent || navigator.userAgent || '').toLowerCase();

  return agent.includes('trident') || agent.includes('edge') ? true : false;
}

/*
 * Mac, Windows 체크
 */
export const Mac = os.release().includes('Mac');
export const Windows = os.release().includes('Windows');

/*
 * 숫자 3자리 콤마 표시 제거
 * @param {String} [+-]d{3}""
 * @return {number} 숫자 콤마제거숫자
 */
export function numberFormat(number) {
  const reg = /(^[+-]?\d+)(\d{3})/;
  let n = String(number);

  while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

  return n;
}

/*
 * 홈서비스 계좌이체금액 입력 자리수(10) 제한
 */
export function numberMaxLength(number) {
  if (number.length > 10) {
    // eslint-disable-next-line no-alert
    alert('10개까지만 입력하세요');
    number = number.slice(0, 10);
    return number;
  }
}

/**
 * 새로운 객체로 복사
 * @param {Object} 타입
 * @return {Object} 복사한객체
 */
export function clone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  const copy = obj.constructor();

  for (const attr in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, attr)) {
      copy[attr] = obj[attr];
    }
  }

  return copy;
}
/**
 * 줄내림문자포함된 문자열을 줄을 내려 html형식으로 변경해준다.
 * @param {String} String '\n'포함문자열
 * @return {html} [<span>text</span>]
 */
export function transformText(string) {
  if (string === undefined) {
    return string;
  }
  const stringArr = string.split('\n');
  return stringArr.map((v, i) => {
    return i !== stringArr.length - 1 ? (
      <span key={i}>
        {v}
        <br />
      </span>
    ) : (
      <span key={i}>{v}</span>
    );
  });
}

/**
 * 쿼리 파라메터 uniform,vendor,color_li,fuel,trans,name 를 분리해서 가져온다.
 * @param parameter
 * 예) 변경 전
 * obj.uniform = ['RV', 'SUV', '경차', '중형차']
 * obj.vendor = ['현대', '기아']
 *     변경 후
 * obj.uniform = "'RV','SUV','경차','중형차'"
 * obj.vendor = "'현대','기아'"
 * @return {Object} 파라메터분리값 uniform,vendor,color_li,fuel,trans,name
 */
export function makeQueryParameter(parameter) {
  const obj = Object();
  if (Object.prototype.hasOwnProperty.call(parameter, 'uniform')) obj.uniform = parameter.uniform.split(',', "'");
  if (Object.prototype.hasOwnProperty.call(parameter, 'vendor')) obj.vendor = parameter.vendor.split(',', "'");
  if (Object.prototype.hasOwnProperty.call(parameter, 'color_li')) obj.color_li = parameter.color_li.split(',', "'");
  if (Object.prototype.hasOwnProperty.call(parameter, 'fuel')) obj.fuel = parameter.fuel.split(',', "'");
  if (Object.prototype.hasOwnProperty.call(parameter, 'trans')) obj.trans = parameter.trans.split(',', "'");
  if (Object.prototype.hasOwnProperty.call(parameter, 'name')) obj.name = parameter.name.split(',', "'");
  return obj;
}

/**
 * 날자 복사
 * @param {Date} date
 */
export function dateClone(d) {
  return new Date(d.getTime());
}

/**
 * 날자형식 문자열 ymd 반환
 * @param {String} value
 */
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

/**
 * Return true if day1 is before day2.
 * @param {Date} d1
 * @param {Date} d2
 */
export function isDayBefore(d1, d2) {
  const day1 = dateClone(stringToDate(d1)).setHours(0, 0, 0, 0);
  const day2 = dateClone(stringToDate(d2)).setHours(0, 0, 0, 0);
  return day1 < day2;
}

/**
 * Checks if value is an empty object, collection, map, or set.
 * @param {*} obj
 */
export function objIsEmpty(obj) {
  if (obj === null || obj === undefined || obj === '') {
    return true;
  }

  if (typeof obj === 'object' && obj instanceof Date) {
    return false;
  }

  if (Array.isArray(obj) && obj.length === 0) {
    return true;
  }

  if (typeof obj === 'object' && Object.keys(obj).length === 0) {
    return true;
  }

  if (typeof obj === 'string') {
    const blankPattern = /^\s+|\s+$/g;

    if (obj.replace(blankPattern, '') === '' || obj.toLowerCase() === 'undefined' || obj.toLowerCase() === 'null') {
      return true;
    }
  }

  return false;
}

export function isNumber(obj) {
  if (obj === null || obj === undefined || obj === '') {
    return false;
  }

  return isNaN(obj);
}

/**
 * Split array into chunks
 * @param {Array} array
 * @param {Number} chunkSize
 */
export function splitChunk(array, chunkSize) {
  return [].concat.apply(
    [],
    array.map(function(elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
}

/**
 * 날자 형식 반환
 * @param {Array} array
 * @param {Number} chunkSize
 */
export function stringToDate(value) {
  if (typeof value === 'string' && (value.length === 8 || value.length === 10)) {
    const dateObj = dateParse(value);

    return dateObj ? new Date(dateObj.y, dateObj.m - 1, dateObj.d) : null;
  }

  if (value instanceof Date) {
    return value;
  }

  return null;
}

/**
 * 연속된 문자 카운트 존재 체크
 * @param {String, number}
 * @return {boolean}  true
 */
export function isStrCnt(str, limit) {
  let o;
  let d;
  let p;
  let n = 0;
  const l = limit === null ? 4 : limit;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (i > 0 && (p = o - c) > -2 && p < 2 && (n = p === d ? n + 1 : 0) > l - 3) return false;
    // eslint-disable-next-line no-unused-expressions
    (d = p), (o = c);
  }
  return true;
}

export function stringToDateFotmat(val, delimeter = '-') {
  if (typeof val === 'string' && val.length === 8) {
    const year = val.substr(0, 4);
    const month = val.substr(4, 2);
    const date = val.substr(6, 2);
    return `${year}${delimeter}${month}${delimeter}${date}`;
  } else if (typeof val === 'string' && val.length === 10) {
    const year = val.substr(0, 4);
    const month = val.substr(5, 2);
    const date = val.substr(8, 2);
    return `${year}${delimeter}${month}${delimeter}${date}`;
  } else if (typeof val === 'string' && val.length === 19) {
    const year = val.substr(0, 4);
    const month = val.substr(5, 2);
    const date = val.substr(8, 2);
    return `${year}${delimeter}${month}${delimeter}${date}`;
  }

  return '';
}

export function deselectCurrent() {
  const selection = document.getSelection();
  if (!selection.rangeCount) {
    return function() {};
  }

  const ranges = [];
  let active = document.activeElement;

  for (let i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (
    active.tagName.toUpperCase() // .toUpperCase handles XHTML
  ) {
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function() {
    selection.type === 'Caret' && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active && active.focus();
  };
}

export function clipboardCopy(text, options) {
  let reselectPrevious;
  let range;
  let selection;
  let mark;
  let success = false;

  if (!options) {
    options = {};
  }

  const debug = options.debug || false;

  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('span');
    mark.textContent = text;
    // reset user styles for span element
    mark.style.all = 'unset';
    // prevents scrolling to the end of the page
    mark.style.position = 'fixed';
    mark.style.top = 0;
    mark.style.clip = 'rect(0, 0, 0, 0)';
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = 'pre';
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = 'text';
    mark.style.MozUserSelect = 'text';
    mark.style.msUserSelect = 'text';
    mark.style.userSelect = 'text';
    mark.addEventListener('copy', function(e) {
      e.stopPropagation();
    });

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection.addRange(range);

    const successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    debug && console.log('unable to copy using execCommand: ', err);
    debug && console.log('trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
      success = true;
    } catch (err) {
      debug && console.log('unable to copy using clipboardData: ', err);
      debug && console.log('falling back to prompt');
      const defaultMessage = 'Copy to clipboard: #{key}, Enter';
      const copyKey = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C';
      const message = defaultMessage.replace(/#{\s*key\s*}/g, copyKey);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

export function isAndroid() {
  if (typeof window !== 'undefined' && navigator && navigator.userAgent) {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.match('android') !== null) {
      return true;
    }
  }

  return false;
}

export function isIOS() {
  if (typeof window !== 'undefined' && navigator && navigator.userAgent) {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.includes('iphone') || varUA.includes('ipad') || varUA.includes('ipod')) {
      return true;
    }
  }

  return false;
}

export function fnChkByte(obj, maxByte) {
  let str = obj.value;
  let str_len = str.length;
  let rbyte = 0;
  let rlen = 0;
  let one_char = '';
  let str2 = '';
  for (let i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      rbyte += 3;
    } else {
      rbyte++;
    }
    if (rbyte <= maxByte) {
      rlen = i + 1;
    }
  }
  if (rbyte > maxByte) {
    alert('메세지는 최대 ' + maxByte + 'byte를 초과할 수 없습니다.');
    str2 = str.substr(0, rlen);
    obj.value = str2;
    fnChkByte(obj, maxByte);
  } else {
    return rbyte;
  }
}

export function preventScroll(boolean) {
  const htmlEl = document.getElementsByTagName('html')[0];
  const bodyEl = document.getElementsByTagName('body')[0];
  if (boolean === true) {
    htmlEl.style.overflow = 'hidden';
    bodyEl.style.overflow = 'hidden';
  } else {
    htmlEl.style.overflow = 'auto';
    bodyEl.style.overflow = 'auto';
  }
}
