import { isEmpty } from 'lodash';
import { numberFormat } from '@src/utils/CommonUtil';

export function createCate(data) {
  const rtn = [];
  rtn.push(data.crMnfcNm);
  rtn.push(data.crMdlNm);
  if (!isEmpty(data.crDtlMdlNm)) rtn.push(data.crDtlMdlNm.join(', '));
  if (!isEmpty(data.crClsNm)) rtn.push(data.crClsNm.join(', '));
  if (!isEmpty(data.crDtlClsNm)) rtn.push(data.crDtlClsNm.join(', '));
  if (!isEmpty(data.carType)) rtn.push(data.crDtlClsNm.join(', '));
  rtn.push(numberFormat(data.priceRange.min) + ' 만원 ~ ' + numberFormat(data.priceRange.max) + ' 만원');
  rtn.push(numberFormat(data.distanceRange.min) + ' KM ~ ' + numberFormat(data.distanceRange.max) + ' KM');
  rtn.push(numberFormat(data.yearRange.min) + ' 년 ~ ' + numberFormat(data.yearRange.max) + ' 년');

  return rtn;
}

export function getCarDefaultFilter(type, prtnKncd = '', crMnfcCd = '', crMnfcNm = '') {
  const svc = [];
  if (type === 'live') {
    svc.push('0010');
  } else if (type === 'auction') {
    svc.push('0020');
  } else if (type === 'home') {
    svc.push('0040');
  } else if (type === 'certi') {
    // 수입인증
    if (prtnKncd === '0020') {
      return {
        loc: [],
        fuel: [],
        selectedModels: { manufactureId: crMnfcCd, manufactureNm: crMnfcNm }
      };
    }
  }

  return {
    cho: ['1', '2'],
    priceRange: { min: 0, max: 10000 },
    distanceRange: { min: 0, max: 200000 },
    yearRange: { min: 1990, max: 2021 },
    carType: [],
    svc,
    loc: [],
    fuel: [],
    mss: [],
    carOption: [],
    color: [],
    crClsCd: [],
    crDtlClsCd: [],
    crClsNm: [],
    creDtlClsNm: []
  };
}
export function getCarDistance() {
  const selectDsitance = [];
  for (let i = 0; i <= 20; i++) {
    const dist = 10000 * i;
    selectDsitance.push({ id: dist, min: dist, max: dist, value: dist, label: numberFormat(dist) });
  }

  return selectDsitance;
}

export function getCarNumberOfYears() {
  const selectYear = [];

  for (let year = new Date().getFullYear() + 1; year > 1980; year--) {
    selectYear.push({ id: year, min: year, max: year, value: year, label: year });
  }

  return selectYear;
}
