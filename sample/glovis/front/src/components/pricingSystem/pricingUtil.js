import uuid from 'uuid';
import { ltrim, rtrim } from '@src/utils/StringUtil';
import { isDayBefore, objIsEmpty, stringToDate } from '@src/utils/CommonUtil';
import { axiosGet, axiosGetAsync, axiosPostAsync } from '@src/utils/HttpUtils';
import { dateToString } from '@src/utils/DateUtils';
import { getMenuAuthruleCd } from '@src/utils/LoginUtils';

const globalThis = require('globalthis')();

function convertToExha(dspl) {
  return (dspl || '0')
    .toString()
    .toLowerCase()
    .replace(/cc/g, '')
    .replace(/,/g, '');
}

export function convertDefaultImage(url) {
  if (url) {
    return 'https://price.glovisaa.com/car/' + url;
  }
  return null;
}

export const carOptionsCodes = [
  {
    optCd: '063200',
    name: 'NAVIGATION'
  },
  {
    optCd: '020206',
    name: 'OS_HL_LED'
  },
  {
    optCd: '020465',
    name: 'SUNLOOPCOMMON'
  },
  {
    optCd: '030826',
    name: 'IS_DV_WIND_SEAT'
  },
  {
    optCd: '044300',
    name: 'SAFE_HUP_DISP'
  },
  {
    optCd: '053700',
    name: 'SMARTKEY'
  },
  {
    optCd: '041457',
    name: 'SAFE_SP_AVM'
  },
  {
    optCd: '041351',
    name: 'SAFE_DRIVE_BSD'
  },
  {
    optCd: '052400',
    name: 'CF_CRUISE_CONTROL'
  },
  {
    optCd: '030931',
    name: 'IS_HP_RM_MIRROR'
  }
];

export function convertCarOptionToStringArray(options) {
  const rtn = [];

  options.forEach((option) => {
    const find = carOptionsCodes.find((x) => x.optCd === option.optCd);

    if (find) {
      rtn.push(find.name);
    }
  });

  return rtn;
}

export function dateFormat(val) {
  if (isDate(val)) {
    const year = val.getFullYear();
    const month = val.getMonth() + 1;
    const date = val.getDate();

    return `${year}-${padLeft(month, 2, '0')}-${padLeft(date, 2, '0')}`;
  } else if (typeof val === 'string' && val.length === 8) {
    const year = val.substr(0, 4);
    const month = val.substr(4, 2);
    const date = val.substr(6, 2);
    return `${year}-${month}-${date}`;
  } else if (typeof val === 'string' && val.length === 10) {
    const year = val.substr(0, 4);
    const month = val.substr(5, 2);
    const date = val.substr(8, 2);
    return `${year}-${month}-${date}`;
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

export function findCodeNameItem(options, val) {
  let findItem = null;
  if (options && val) {
    findItem = options.find((x) => x.cdId.toString() === val.toString());
  }
  return findItem;
}

export function findLabelValue(options, val) {
  if (options && val) {
    return options.find((x) => x.id === val.toString());
  }

  return null;
}

export function getCarFuel(fuel) {
  if (objIsEmpty(fuel)) {
    return '';
  }

  if (fuel === '전기+가솔린' || fuel === '가솔린+전기') {
    return 'Hybrid';
  }

  return fuel;
}

export function getCarColor(colorList, color) {
  if (colorList && color) {
    const findColor = colorList.find((x) => x.value === color);

    if (findColor) {
      return findColor.groupCode;
    }
  }

  return '';
}

export const getCarOptionText = (options, isFullText) => {
  if (options) {
    const selectOption = options.filter((x) => x.yn === 'Y' && x.displayYn === 'Y');
    if (!objIsEmpty(selectOption)) {
      if (isFullText === true) {
        return selectOption
          .map((x) => {
            return x.label;
          })
          .join(', ');
      }
      return selectOption.length === 1 ? selectOption[0].label : `${selectOption[0].label} 외 ${selectOption.length - 1}건`;
    }
  }
  return '-';
};

export function getUseGubun(str) {
  if (objIsEmpty(str) || str === '일반' || str === '장애인') {
    return '자가';
  }

  if (str === '택시' || str === '렌타가' || str === '운전교습용') {
    return '렌트';
  }

  return '자가';
}

export function getPageName(pathName) {
  if (endsWith(pathName, 'pricing') || endsWith(pathName, 'pricingsearch') || endsWith(pathName, 'pricingview')) {
    return 'pricingSystem';
  } else if (endsWith(pathName, 'marketPrice')) {
    return 'marketPrice';
  } else if (endsWith(pathName, 'marketPriceHyundai') || endsWith(pathName, 'marketView')) {
    return 'pricingHyundai';
  }

  return null;
}

export function getCarDefaultImage(modelId) {
  return new Promise((resolve) => {
    axiosGet(`/api/pricing/getPricingCarImage.do?modelId=${modelId}`)
      .then((res) => {
        resolve(res && res.data && res.data.data ? convertDefaultImage(res.data.data) : null);
      })
      .catch(() => {
        resolve(null);
      });
  });
}

export async function getMakerImageAsync(makerNo) {
  const res = await axiosGetAsync(`/api/pricing/getCarBrandLogoImage.do?makerNo=${makerNo}`);
  if (res && res.data && res.data.data) {
    return 'https://price.glovisaa.com/logo/' + res.data.data;
  }

  return null;
}

export function getCarFirstRegDate(carCond) {
  if (objIsEmpty(carCond)) {
    return null;
  }

  if (carCond.frstRegDt) {
    if (typeof carCond.frstRegDt === 'string') {
      return stringToDate(carCond.frstRegDt);
    } else if (typeof carCond.frstRegDt === 'object' && carCond.frstRegDt instanceof Date) {
      return carCond.frstRegDt;
    }
  }
  if (carCond.noy) {
    return new Date(parseInt(carCond.noy), 0, 1);
  }

  return null;
}

export function getSharedUrl(reportId, uid) {
  return `${globalThis?.window?.location?.origin}/marketPrice/marketsearch?uid=${uid}&reportId=${reportId}`;
}

export function getSharedTitle() {
  return '현대 글로비스 - 시세조회';
}

export function groupBy(arr, keyGetter) {
  const map = new Map();
  arr.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function shareFaceBook(shareUrl, shareTitle) {
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(shareTitle)}`;
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const popWindow = window.open(fbUrl, 'fbPop', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');

  if (popWindow) {
    popWindow.focus();
  }
}

export function numberWithCommas(x, postfix) {
  if (x && !isNaN(x)) {
    let val = typeof x === 'string' ? x : x.toString();

    if (postfix) {
      val = val.replace(postfix, '');
    }

    const num = parseInt(val);
    // eslint-disable-next-line security/detect-unsafe-regex
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (postfix || '');
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

export function isValidationCarInfo(carInfo) {
  if (objIsEmpty(carInfo)) {
    return false;
  }
  if (objIsEmpty(carInfo.crNm)) {
    return false;
  } else if (objIsEmpty(carInfo.clr)) {
    return false;
  } else if (objIsEmpty(carInfo.dspl)) {
    return false;
  } else if (objIsEmpty(carInfo.fuel)) {
    return false;
  } else if (objIsEmpty(carInfo.frstRegDt)) {
    return false;
  } else if (objIsEmpty(carInfo.drvDist) || parseInt(carInfo.drvDist) < 1) {
    return false;
  } else if (objIsEmpty(carInfo.mss)) {
    return false;
  } else if (objIsEmpty(carInfo.noy)) {
    return false;
  } else if (objIsEmpty(carInfo.rlsPrc) || isNaN(carInfo.rlsPrc) || parseInt(carInfo.rlsPrc) < 1) {
    return false;
  }

  return true;
}

export function padLeft(value, n, str) {
  const newValue = (value || '').toString();

  return Array(n - newValue.length + 1).join(str || '0') + newValue;
}

export function validationCarCond(carInfo) {
  if (objIsEmpty(carInfo)) {
    alert('차량을 선택해주세요.');
    return false;
  }

  if (objIsEmpty(carInfo.crNm)) {
    alert('차량을 선택해주세요.');
    return false;
  }

  if (objIsEmpty(carInfo.noy)) {
    alert('연식을 선택해주세요.');
    return false;
  }

  if (objIsEmpty(carInfo.clr)) {
    alert('색상을 선택해주세요.');
    return false;
  }

  if (objIsEmpty(carInfo.mss)) {
    alert('변속기를 선택해주세요.');
    return false;
  }

  if (objIsEmpty(carInfo.frstRegDt)) {
    alert('최초등록일을 선택해주세요.');
    return false;
  }

  if (objIsEmpty(carInfo.dspl)) {
    alert('배기량을 선택해주세요.');
    return false;
  }

  if (objIsEmpty(carInfo.fuel)) {
    alert('연료를 선택해주세요.');
    return false;
  }

  if (objIsEmpty(carInfo.drvDist) || parseInt(carInfo.drvDist) < 1) {
    alert('주행거리를 입력해주세요');
    return false;
  }

  if (parseInt(carInfo.drvDist) > 400000) {
    alert('주행거리는 최대거리는 400,000 Km 입니다.');
    return false;
  }

  if (objIsEmpty(carInfo.rlsPrc) || isNaN(carInfo.rlsPrc) || parseInt(carInfo.rlsPrc) < 1) {
    alert('신차가격을 입력해주세요');
    return false;
  }

  return true;
}

export function getPringCarGradeSpecifation(modelNo, seriesNo) {
  return new Promise((resolve) => {
    axiosGet(`/api/pricing/getPricingCarGradeSpecification.do?modelId=${modelNo}&modelGrade=${seriesNo}`)
      .then((res) => {
        resolve(res && res.data && res.data.data ? res.data.data : null);
      })
      .catch(() => {
        resolve(null);
      });
  });
}

export function getMarketPriceParameter(memberId, carInfo, carOptions, reqType = '') {
  if (!memberId) {
    // eslint-disable-next-line no-throw-literal
    throw 'memberId is null or empty';
  }

  const specInfo = {};
  const mappingSet = [
    {
      name: 'hood'
    },
    {
      name: 'frontFenderLeft',
      prop: 'frontLeftFender'
    },
    {
      name: 'frontFenderRight',
      prop: 'frontRightFender'
    },
    {
      name: 'frontDoorLeft',
      prop: 'frontLeftDoor'
    },
    {
      name: 'frontDoorRight',
      prop: 'frontRightDoor'
    },
    {
      name: 'rearDoorLeft',
      prop: 'backLeftDoor'
    },
    {
      name: 'rearDoorRight',
      prop: 'backRightDoor'
    },
    {
      name: 'trunklid',
      prop: 'trunk'
    },
    {
      name: 'rdarSpt'
    },
    {
      name: 'roofPnst'
    },
    {
      name: 'qrtrPnstLeft',
      prop: 'leftQuarter'
    },
    {
      name: 'qrtrPnstRight',
      prop: 'rightQuarter'
    },
    {
      name: 'sideSealPnstLeft'
    },
    {
      name: 'sideSealPnstRight'
    },
    {
      name: 'frtPnst',
      prop: 'frontPannel'
    },
    {
      name: 'crossMem'
    },
    {
      name: 'insdPnstLeft',
      prop: 'leftInSidePanel'
    },
    {
      name: 'insdPnstRight',
      prop: 'rightInSidePanel'
    },
    {
      name: 'rearPnst'
    },
    {
      name: 'trunkFloor'
    },
    {
      name: 'frtSideMemLeft'
    },
    {
      name: 'frtSideMemRight'
    },
    {
      name: 'rearSideMemLeft'
    },
    {
      name: 'rearSideMemRight'
    },
    {
      name: 'frtWhlHouseLeft',
      prop: 'leftWheelHouse'
    },
    {
      name: 'frtWhlHouseRight',
      prop: 'rightWheelHouse'
    },
    {
      name: 'rearWhlHouseLeft',
      prop: 'leftRearWheelHouse'
    },
    {
      name: 'rearWhlHouseRight',
      prop: 'rightRearWheelHouse'
    },
    {
      name: 'pilrPnstFrtLeft',
      prop: 'leftFilerA'
    },
    {
      name: 'pilrPnstFrtRight',
      prop: 'rightFilerA'
    },
    {
      name: 'pilrPnstMedmLeft',
      prop: 'leftFilerB'
    },
    {
      name: 'pilrPnstMedmRight',
      prop: 'rightFilerB'
    },
    {
      name: 'pilrPnstRearLeft',
      prop: 'leftFilerC'
    },
    {
      name: 'pilrPnstRearRight',
      prop: 'rightFilerC'
    },
    {
      name: 'pckgTray'
    },
    {
      name: 'dashPnst'
    },
    {
      name: 'floorPnst',
      prop: 'floorPanel'
    }
  ];

  if (carInfo.historyData) {
    for (const [key, value] of Object.entries(carInfo.historyData)) {
      const findMap = mappingSet.find((x) => x.name === key);
      if (findMap && findMap.prop) {
        specInfo[findMap.prop] = value === 1 ? 0 : 1;
      }
    }
  }

  return {
    uid: carInfo.resStatus && carInfo.resStatus.uid ? carInfo.resStatus.uid : uuid.v4(),
    reqType: reqType,
    mbSearchDt: dateToString(new Date(), '') || null,
    mbTpCd: getMenuAuthruleCd(),
    tskey: carInfo.resStatus ? carInfo.resStatus.tsKey || '' : '',
    cDay: carInfo.resStatus ? carInfo.resStatus.cDay || '' : '',
    inqMbId: memberId || 'guest',
    crNo: carInfo.crNo || null,
    crNm: ltrim(rtrim(carInfo.crNm || '')),
    year: (carInfo.noy || '').toString() || null,
    exha: convertToExha(carInfo.dspl),
    clr: getCarColor(getPricingCarColors(), carInfo.clr),
    clrName: carInfo.clr,
    mss: carInfo.mss || 'A/T',
    firstRegDt: dateToString(carInfo.frstRegDt || new Date(), '') || null,
    fuel: getCarFuel(carInfo.fuel),
    drvDist: carInfo.drvDist || '0',
    newPrice: (carInfo.rlsPrc || '0').toString(),
    defaultImg: carInfo.defaultImg || '',
    useGubun: getUseGubun(carInfo.usegubun),
    makerNo: carInfo.modelInfo ? carInfo.modelInfo.crMnfcCd : '',
    classNo: carInfo.modelInfo ? carInfo.modelInfo.crMdlCd : '',
    seriesNo1: carInfo.modelInfo ? carInfo.modelInfo.crClsCd : '',
    seriesNo2: carInfo.modelInfo ? carInfo.modelInfo.crDtlClsCd : '',
    seriesNo: carInfo.seriesNo || '',
    succYmd: carInfo.succYmd || null,
    options: carOptions,
    specInfo
  };
}

/**
 * 시세조회 함수
 * @param memberId 사용자 ID
 * @carInfo {
 *  uid: uuid.v4(),
 *  mbSearchDt: '20190909'
 *  inqMbId: 사용자 ID
 *  crNo: 차량번호(11가12234)
 *  crNm: 차량명 (현대 쏘나타)
 *  year: 년식 ('2019')
 *  exha: 배기량 ('2000')
 *  clr: 색상(A,B,C,D,F),
 *  clrName: 색상(흰색)
 *  mss: 변속기(A/T)
 *  firstRegDt: '20190909'
 *  fuel: 연료 (가솔린, 전기)
 *  drvDist: 주행거리('10000')
 *  newPrice: 신차가격('10000')
 *  useGubun: 용도(일반)
 *  makerNo: 제조사 코드(옵션)
 *  classNo: 모델코드(옵션)
 *  seriesNo1: 상세모델(옵션)
 *  seriesNo2: 상세등급(옵션)
 *  seriesNo: 카마트 차량 등급(옵션),
 *  options: ['SUNLOOPCOMMON', 'NAVIGATION'](옵션)
 * }
 * @carOptions 차량옵션
 * @return {
    reportId: "2004-000705"
    monthlyPrice: (5) [1341, 1320, 1299, 1279, 1258]
    currentPrice: {minPrice: 0, maxPrice: 2674, marketMinPrice: 1274, marketMaxPrice: 1408, price: 1341}
  } || 오류발생시 null
 */
export async function getMarketPriceAsync(memberId, data, cancelToken = null) {
  if (!memberId) {
    // eslint-disable-next-line no-throw-literal
    throw 'memberId is null or empty';
  }

  let payload = null;
  const domain = process.env.NODE_ENV === 'development' ? 'https://price.glovisaa.com' : 'https://price.glovisaa.com';

  const res = await axiosPostAsync(`${domain}/api/pricing/getPricingMarketPrice.do`, JSON.stringify(data), cancelToken);
  const unit = 10000;
  if (res && res.data && res.data.data) {
    payload = await res.data.data;
    const monthly = [
      Math.floor(parseInt(payload.priceInfo.currentPrice.price) / unit),
      Math.floor(parseInt(payload.priceInfo.monthlyPrice.predprice3mon) / unit),
      Math.floor(parseInt(payload.priceInfo.monthlyPrice.predprice6mon) / unit),
      Math.floor(parseInt(payload.priceInfo.monthlyPrice.predprice9mon) / unit),
      Math.floor(parseInt(payload.priceInfo.monthlyPrice.predprice12mon) / unit)
    ];

    const currentPrice = {
      minPrice: 0,
      maxPrice: Math.floor(data.newPrice === '0' ? parseInt(payload.priceInfo.currentPrice.marketMaxPrice) / unit : parseInt(payload.priceInfo.currentPrice.maxPrice) / unit),
      marketMinPrice: Math.floor(parseInt(payload.priceInfo.currentPrice.marketMinPrice) / unit),
      marketMaxPrice: Math.floor(parseInt(payload.priceInfo.currentPrice.marketMaxPrice) / unit),
      price: Math.floor(parseInt(payload.priceInfo.currentPrice.price) / unit)
    };

    const retailPrice = {
      minPrice: 0,
      maxPrice: Math.floor(data.newPrice === '0' ? parseInt(payload.priceInfo.retailPrice.marketMaxPrice) / unit : parseInt(payload.priceInfo.retailPrice.maxPrice) / unit),
      marketMinPrice: Math.floor(parseInt(payload.priceInfo.retailPrice.marketMinPrice) / unit),
      marketMaxPrice: Math.floor(parseInt(payload.priceInfo.retailPrice.marketMaxPrice) / unit),
      price: Math.floor(parseInt(payload.priceInfo.retailPrice.price) / unit)
    };

    return {
      uid: payload.uid,
      reportId: payload.reportId,
      monthlyPrice: monthly,
      currentPrice,
      retailPrice
    };
  }

  return null;
}

export function getPricingCarColors() {
  return [
    { cdId: '0150', id: 'chk-white-02', bgColor: '#fff', chkColor: null, value: '흰색', label: '흰색', mainYn: 'Y', groupCode: 'A' },
    { cdId: '0020', id: 'chk-black-02', bgColor: '#000', chkColor: 'white', value: '검정색', label: '검정색', mainYn: 'Y', groupCode: 'B' },
    { cdId: '0070', id: 'chk-silver-02', bgColor: '#e5e5e5', chkColor: 'black', value: '은색', label: '은색', mainYn: 'Y', groupCode: 'C' },
    { cdId: '0140', id: 'chk-silvergray-02', bgColor: '#bcbcbc', chkColor: 'white', value: '회색', label: '회색', mainYn: 'Y', groupCode: 'C' },
    { cdId: '0100', id: 'chk-pearl-02', bgColor: '#f8f7e2', chkColor: 'black', value: '진주색', label: '진주색', mainYn: 'Y', groupCode: 'A' },
    { cdId: '0120', id: 'chk-blue-02', bgColor: '#12427f', chkColor: 'white', value: '파랑색', label: '파랑색', mainYn: 'N', groupCode: 'C' },
    { cdId: '0130', id: 'chk-sky-02', bgColor: '#75919c', chkColor: 'white', value: '하늘색(민트)', title: '하늘색<br>(민트)', label: '하늘색(민트)', mainYn: 'N', groupCode: 'C' },
    { cdId: '0060', id: 'chk-red-02', bgColor: '#cc001f', chkColor: 'white', value: '빨강색', label: '빨강색', mainYn: 'N', groupCode: 'F' },
    { cdId: '0010', id: 'chk-brown-02', bgColor: '#685a36', chkColor: 'white', value: '갈색', label: '갈색', mainYn: 'N', groupCode: 'D' },
    { cdId: '0110', id: 'chk-green-02', bgColor: '#2ecd00', chkColor: 'white', value: '초록색', label: '초록색', mainYn: 'N', groupCode: 'F' },
    { cdId: '0040', id: 'chk-yellow-02', bgColor: '#fff845', chkColor: 'black', value: '노랑색', label: '노랑색', mainYn: 'N', groupCode: 'F' },
    { cdId: '0030', id: 'chk-gold-02', bgColor: '#827438', chkColor: 'white', value: '금색', label: '금색', mainYn: 'N', groupCode: 'F' },
    { cdId: '0090', id: 'chk-orange-02', bgColor: '#fb7902', chkColor: 'white', value: '주황색', label: '주황색', mainYn: 'N', groupCode: 'F' },
    { cdId: '0080', id: 'chk-wine-02', bgColor: '#7d265b', chkColor: 'white', value: '자주색(보라)', title: '자주색<br>(보라)', label: '자주색(보라)', mainYn: 'N', groupCode: 'D' },
    { cdId: '0050', id: 'chk-pink-02', bgColor: '#fdc3d8', chkColor: 'black', value: '분홍색', label: '분홍색', mainYn: 'N', groupCode: 'F' }
  ];
}

export function getPricingCarOptions() {
  return [
    {
      displayYn: 'Y',
      value: 'SUNLOOPCOMMON',
      icon: 'ico-sunroof',
      id: 'sunroof-common',
      imgUrl: '/images/ico/ico-sunroof-on.png',
      label: '선루프'
    },
    {
      displayYn: 'Y',
      value: 'OS_HL_LED',
      icon: 'ico-led',
      id: 'led',
      imgUrl: '/images/ico/ico-led-on.png',
      label: 'LED'
    },
    {
      displayYn: 'Y',
      value: 'IS_HP_RM_MIRROR',
      icon: 'ico-hipass',
      id: 'hipass',
      imgUrl: '/images/ico/ico-hipass-on.png',
      label: '하이패스'
    },
    {
      displayYn: 'Y',
      value: 'IS_DV_WIND_SEAT',
      icon: 'ico-ventilation-seat',
      id: 'ventilation-seat',
      imgUrl: '/images/ico/ico-ventilation-seat-on.png',
      displayName: '통풍시트<em>(운전석)</em>',
      label: '통풍시트(운전석)'
    },
    {
      displayYn: 'Y',
      value: 'SAFE_DRIVE_BSD',
      icon: 'ico-back-camera',
      id: 'back-camera',
      imgUrl: '/images/ico/ico-back-camera-on.png',
      displayName: '후측방경보<em>(BSD)</em>',
      label: '후측방경보(BSD)'
    },
    {
      displayYn: 'Y',
      value: 'SAFE_SP_AVM',
      icon: 'ico-around-view',
      id: 'around-view',
      imgUrl: '/images/ico/ico-around-view-on.png',
      displayName: '어라운드뷰<em>(AVIM)</em>',
      label: '어라운드뷰(AVIM)'
    },
    {
      displayYn: 'Y',
      value: 'SAFE_HUP_DISP',
      icon: 'ico-hud',
      id: 'hud',
      imgUrl: '/images/ico/ico-hud-on.png',
      label: 'HUD'
    },
    {
      displayYn: 'Y',
      value: 'SMARTKEY',
      icon: 'ico-smart-key',
      id: 'smart-key',
      imgUrl: '/images/ico/ico-smart-key-on.png',
      label: '스마트키'
    },
    {
      displayYn: 'Y',
      value: 'CF_CRUISE_CONTROL',
      icon: 'ico-smartcruze',
      id: 'smartcruze',
      imgUrl: '/images/ico/ico-smartcruze-on.png',
      label: '크루즈컨트롤'
    },
    {
      displayYn: 'Y',
      value: 'NAVIGATION',
      icon: 'ico-navigation',
      id: 'navigation',
      imgUrl: '/images/ico/ico-navigation-on.png',
      label: '네비게이션'
    }
  ];
}

export function isAllowPricingSearch(viewableCnt, ticketInfo, isShowMsg = true) {
  const mbTpcd = getMenuAuthruleCd();
  if (mbTpcd === '0110') {
    return true;
  }

  if (viewableCnt === 0 && ticketInfo?.availableAdCnt === 0) {
    if (isShowMsg === true) {
      alert('무료조회횟수를 모두 사용하였습니다. 더 조회하시려면 이용권을 구매해주세요');
    }
    return false;
  }

  return true;
}
