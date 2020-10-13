import uuid from 'uuid';
import { objIsEmpty, stringToDate } from '@src/utils/CommonUtil';

export function carmartJosnTocarInfo(inCarNo, carmart, defaultOptions) {
  if (objIsEmpty(carmart)) {
    return null;
  }

  const cDay = carmart.cDay;
  const { cardata, modellist } = carmart;
  let grades = null;
  let modelNo = null;
  let modelNm = null;

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
  }

  const carMartOption = [
    { id: 'sunroof', yn: 'N', icon: 'ico-sunroof', key1: '2', key2: '4', key3: '65', mappingName: 'OS_SUBLOOP' }, //썬루프
    { id: 'dual-sunroof', yn: 'N', icon: '', key1: '2', key2: '4', key3: '66', mappingName: 'OS_DUAL_SUNLOOP' }, //듀얼썬루프
    { id: 'panorama-sunroof', yn: 'N', icon: '', key1: '2', key2: '4', key3: '67', mappingName: 'OS_PANORAMA_SUNLOOP' }, //파노라마썬루프
    { id: 'led', yn: 'N', icon: 'ico-led', key1: '2', key2: '2', key3: '6', mappingName: 'OS_HL_LED' },
    { id: 'hipass', yn: 'N', icon: 'ico-hipass', key1: '3', key2: '9', key3: '31', mappingName: 'IS_HP_RM_MIRROR' },
    { id: 'ventilation-seat', yn: 'N', icon: 'ico-ventilation-seat', key1: '3', key2: '8', key3: '26', mappingName: 'IS_DV_WIND_SEAT' },
    { id: 'back-camera', yn: 'N', icon: 'ico-back-camera', key1: '4', key2: '13', key3: '51', mappingName: 'SAFE_DRIVE_BSD' },
    { id: 'around-view', yn: 'N', icon: 'ico-around-view', key1: '4', key2: '14', key3: '57', mappingName: 'SAFE_SP_AVM' },
    { id: 'hud', yn: 'N', icon: 'ico-hud', key1: null, key2: null, key3: null, mappingName: 'SAFE_HUP_DISP' },
    { id: 'smart-key', yn: 'N', icon: 'ico-smart-key', key1: '5', key2: '37', key3: null, mappingName: 'CF_SMART_KEY' },
    { id: 'smartcruze', yn: 'N', icon: 'ico-smartcruze', key1: '5', key2: '24', key3: null, mappingName: 'CF_CRUISE_CONTROL' },
    { id: 'navigation', yn: 'N', icon: 'ico-navigation', key1: '6', key2: '32', key3: '', mappingName: 'MULTI_NAVIGATION' },
    { id: 'abs', yn: 'N', key1: '4', icon: '', key2: '13', key3: '46', mappingName: 'SAFE_DRIVE_ABS' } // 미끄럼 방지장치(ABS)
  ];

  if (cardata && !objIsEmpty(cardata.option_table)) {
    carMartOption.forEach((opt) => {
      let findItem = null;
      if (opt.key1 && opt.key2 && opt.key3) {
        if (opt.key3) {
          findItem = cardata.option_table.find((x) => x.option_key1 === opt.key1 && x.option_key2 === opt.key2 && x.option_key3 === opt.key3);
        } else {
          findItem = cardata.option_table.find((x) => x.option_key1 === opt.key1 && x.option_key2 === opt.key2);
        }
      }
      if (findItem) {
        opt.yn = 'Y';
      }
    });
  }

  carMartOption.forEach((opt) => {
    if (!objIsEmpty(opt.id)) {
      const findOpt = defaultOptions.find((x) => x.mappingName === opt.mappingName);
      if (findOpt) {
        opt.sno = findOpt.sno;
        opt.cat1Seq = findOpt.cat1Seq;
        opt.cat1Nm = findOpt.cat1Nm;
        opt.cat2Seq = findOpt.cat2Seq;
        opt.cat2Nm = findOpt.cat2Nm;
        opt.cat3Seq = findOpt.cat3Seq;
        opt.cat3Nm = findOpt.cat3Nm;
        opt.snoptNmo = findOpt.optNm;
        opt.imgUrl = findOpt.imgUrl;
        opt.optCmnt = findOpt.optCmnt;
        opt.iconClass = findOpt.iconClass;
        opt.mappingName = findOpt.mappingName;
        opt.value = findOpt.value;
        opt.label = findOpt.label;
        opt.isDiaplay = findOpt.isDiaplay;
        opt.displayName = findOpt.label;
      }
    }
  });

  const res = {
    resStatus: {
      uid: uuid.v4(),
      tsKey: carmart.ts_key,
      rstCode: carmart.rst_code,
      cDay: cDay
    }
  };

  if (cardata) {
    Object.assign(res, {
      carOptions: carMartOption,
      clr: cardata.color,
      crNm: `${cardata.makername} ${cardata.modelname} ${cardata.seriesname} ${cardata.seriesname2}`,
      crNo: cardata.carnum,
      defaultImg: cardata.modelimage || '/images/dummy/market-thum-img.png',
      drvDist: 0,
      dspl: cardata.displacement,
      frstRegDt: stringToDate(cardata.firstdate),
      fuel: cardata.fuel,
      grades: grades,
      modelNm: modelNm,
      modelNo: modelNo,
      mss: cardata.gearbox,
      noy: cardata.year,
      rlsPrc: cardata.newprice,
      usegubun: cardata.usegubun,
      vin: cardata.vin,
      seriesNo: cardata.seriesno
    });
  } else {
    Object.assign(res, {
      crNo: inCarNo,
      defaultImg: '/images/dummy/market-car-img.png',
      modelNo: modelNo,
      modelNm: modelNm,
      grades: grades,
      seriesNo: null
    });
  }

  return res;
}
