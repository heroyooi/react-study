import { round } from 'lodash';
import { objIsEmpty, stringToDate } from '@src/utils/CommonUtil';

export function carmartJosnTocarInfo(inCarNo, reqParam, carmart, defaultOptions, colorOptions) {
  if (objIsEmpty(carmart)) {
    return null;
  }

  const cDay = carmart.cDay;
  const { cardata, modellist } = carmart;
  let grades = null;
  let modelNo = null;
  let modelNm = null;
  let optionPrice = 0;

  if (!objIsEmpty(modellist)) {
    grades = modellist[0].serieslist.map((item, i) => {
      return {
        id: item.seriesno,
        value: i,
        title: item.seriesname,
        seriesPrice: item.seriesprice,
        seriesNo: item.seriesno,
        seriesNm: item.seriesname,
        checked: i === 0,
        disabled: false
      };
    });
    modelNo = modellist[0].modelno;
    modelNm = modellist[0].modelname;
  } else if (cardata) {
    modelNo = cardata.modelno;
    modelNm = cardata.modelname;
  }

  const carMartOption = [
    { id: 'sunroof-common', yn: 'N', key1: '2', key2: '4', key3: '65', value: 'SUNLOOPCOMMON' }, //썬루프
    { id: 'sunroof-dual', yn: 'N', key1: '2', key2: '4', key3: '66', value: 'SUNLOOPDUAL' }, //듀얼썬루프
    { id: 'sunroof-panorama', yn: 'N', key1: '2', key2: '4', key3: '67', value: 'SUNLOOPPANORAMA' }, //파노라마썬루프
    { id: 'led', yn: 'N', key1: '2', key2: '2', key3: '6', value: 'OS_HL_LED' },
    { id: 'hipass', yn: 'N', key1: '3', key2: '9', key3: '31', value: 'IS_HP_RM_MIRROR' },
    { id: 'ventilation-seat', yn: 'N', key1: '3', key2: '8', key3: '26', value: 'IS_DV_WIND_SEAT' },
    { id: 'back-camera', yn: 'N', key1: '4', key2: '13', key3: '51', value: 'SAFE_DRIVE_BSD' },
    { id: 'around-view', yn: 'N', key1: '4', key2: '14', key3: '57', value: 'SAFE_SP_AVM' },
    { id: 'hud', yn: 'N', key1: null, key2: null, key3: null, value: 'SAFE_HUP_DISP' },
    { id: 'smart-key', yn: 'N', key1: '5', key2: '37', key3: '0', value: 'SMARTKEY' },
    { id: 'smartcruze', yn: 'N', key1: '5', key2: '24', key3: '0', value: 'CF_CRUISE_CONTROL' },
    { id: 'navigation', yn: 'N', key1: '6', key2: '32', key3: '0', value: 'NAVIGATION' },
    { id: 'ab', yn: 'N', key1: '4', key2: '13', key3: '46', value: 'AB' }, // 미끄럼 방지장치(ABS)
    { id: 'tcs', yn: 'N', key1: '4', key2: '13', key3: '47', value: 'TCS' }, // 구동력제어장치
    { id: 'vdc', yn: 'N', key1: '4', key2: '13', key3: '48', value: 'VDC' } // 차체제어장치
  ];

  const sunroofDuals = ['듀얼와이드썬루프', '듀얼썬루프'];
  const sunroofPanoramas = ['파노라마썬루프', '파노라마 썬루프'];

  if (cardata && !objIsEmpty(cardata.option_table)) {
    carMartOption.forEach((opt) => {
      let findItem = null;
      if (opt.key1 && opt.key2 && opt.key3) {
        findItem = cardata.option_table.find((x) => x.option_key1 === opt.key1 && x.option_key2 === opt.key2 && x.option_key3 === opt.key3);
        if (findItem && findItem.option_flag === 'O') {
          opt.yn = 'Y';
        }
      }
    });
  }

  if (cardata && !objIsEmpty(cardata.optlist)) {
    cardata.optlist.forEach((opt) => {
      if (opt.name) {
        if (sunroofPanoramas.includes(opt.name)) {
          carMartOption[2].yn = 'Y';
        } else if (sunroofDuals.includes(opt.name)) {
          carMartOption[1].yn = 'Y';
        } else if (opt.name.includes('썬루프') || opt.name.includes('선루프')) {
          carMartOption[0].yn = 'Y';
        } else if (opt.name.includes('내비') || opt.name.includes('네비') || opt.name.includes('NAVI')) {
          carMartOption[11].yn = 'Y';
        }
      }
    });
  }

  if (!objIsEmpty(carmart.seloptlist)) {
    carmart.seloptlist.forEach((opt) => {
      if (!isNaN(opt.optprice)) {
        optionPrice += parseInt(opt.optprice);
      }
    });
  }

  carMartOption.forEach((opt) => {
    const hasSunloop = opt.value === 'SUNLOOPCOMMON' || opt.value === 'SUNLOOPDUAL' || opt.value === 'SUNLOOPPANORAMA';
    let mappingValue = opt.value;
    if (hasSunloop && opt.yn === 'Y') {
      mappingValue = 'SUNLOOPCOMMON';
    }
    const findOpt = defaultOptions.find((x) => x.value === mappingValue);
    if (findOpt) {
      opt.icon = findOpt.icon;
      opt.imgUrl = findOpt.imgUrl;
      opt.value = findOpt.value;
      opt.label = findOpt.label;
      opt.displayYn = hasSunloop === true ? opt.yn : findOpt.displayYn;
      opt.displayName = findOpt.displayName || findOpt.label;
    }
  });

  const sunloopount = carMartOption.filter((x) => (x.value === 'SUNLOOPCOMMON' || x.value === 'SUNLOOPDUAL' || x.value === 'SUNLOOPPANORAMA') && x.displayYn === 'Y').length;
  if (sunloopount > 1) {
    carMartOption
      .filter((x) => (x.value === 'SUNLOOPCOMMON' || x.value === 'SUNLOOPDUAL' || x.value === 'SUNLOOPPANORAMA') && x.displayYn === 'Y')
      .forEach((opt, idx) => {
        if (idx > 0) {
          opt.displayYn = 'N';
        }
      });
  } else if (sunloopount === 0) {
    carMartOption
      .filter((x) => x.value === 'SUNLOOPCOMMON')
      .forEach((opt, idx) => {
        if (idx === 0) {
          opt.displayYn = 'Y';
        }
      });
  }

  const res = {
    resStatus: {
      uid: reqParam.uid,
      tsKey: carmart.ts_key,
      rstCode: carmart.rst_code,
      cDay: cDay
    }
  };

  if (carmart.rst_code === '1') {
    let carColor = '';
    if (colorOptions && cardata.color) {
      const colorItem = colorOptions.find((x) => x.value === cardata.color);
      if (colorItem) {
        carColor = cardata.color;
      }
    }

    Object.assign(res, {
      carOptions: carMartOption,
      clr: reqParam && reqParam.userSelect && reqParam.userSelect.clr ? reqParam.userSelect.clr : carColor,
      crNm: `${cardata.makername} ${cardata.modelname} ${cardata.seriesname}`, //${cardata.seriesname2}
      crNo: cardata.carnum || inCarNo,
      defaultImg: cardata.modelimage || null,
      markerImg: cardata.markerImg || null,
      drvDist: reqParam && reqParam.userSelect ? reqParam.userSelect.drvDist : 0,
      dspl:
        round(
          parseInt(
            (cardata.displacement || '0')
              .toString()
              .toLowerCase()
              .replace(/cc/g, '')
          ),
          -2
        ) + 'cc',
      frstRegDt: stringToDate(cardata.firstdate),
      fuel: cardata.fuel,
      grades: grades,
      modelNm: modelNm,
      modelNo: modelNo,
      mss: cardata.gearbox === '수동' ? 'M/T' : cardata.gearbox === '오토' ? 'A/T' : cardata.gearbox === '세미오토' ? 'SAT' : cardata.gearbox === 'CVT' ? 'CVT' : '',
      noy: cardata.year,
      rlsPrc: cardata.carmakeprice && !isNaN(cardata.carmakeprice) && parseInt(cardata.carmakeprice) > 1 ? parseInt(cardata.carmakeprice) : parseInt(cardata.newprice || 0) + optionPrice,
      usegubun: cardata.usegubun,
      vin: cardata.vin,
      seriesNo: cardata.seriesno,
      modelInfo: {
        crMnfcCd: cardata.makerno,
        crMdlCd: cardata.classno,
        crDtlMdlCd: modelNo,
        crClsCd: cardata.seriesno1,
        crDtlClsCd: cardata.seriesno2,
        crMnfcCdNm: cardata.makername,
        crMdlCdNm: cardata.classname,
        crDtlMdlCdNm: cardata.modelname,
        crClsCdNm: cardata.seriesname1,
        crDtlClsCdNm: cardata.seriesname2
      }
    });
  } else {
    Object.assign(res, {
      crNm: cardata.modelname,
      crNo: inCarNo || '',
      defaultImg: cardata.modelimage || null,
      modelNo: modelNo,
      modelNm: modelNm,
      grades: grades,
      tsKey: carmart.ts_key,
      seriesNo: null,
      modelInfo: {}
    });
  }

  return res;
}
