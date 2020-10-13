import { carFuelList, carMssList, carUseDvcdList } from '@src/dummy/carTypeCd';
import { selectCommonCodeList } from '@src/api/common/CommonCodeApi';

export const combineValues = (e, i, separator = '-') => {
  const isInput = !!e.target;
  const name = isInput ? e.target.name : i.name;
  const value = isInput ? e.target.value : e.value;

  const sameNameEles = Array.from(globalThis.window.document.querySelectorAll(`[name=${name}]`));

  return sameNameEles?.reduce((str, item, i) => {
    if (i !== 0) {
      str += separator;
    }

    if (isInput) {
      str += item.value;
    } else {
      if (item.type == 'hidden') {
        str += value;
      } else {
        str += item.value;
      }
    }

    return str;
  }, '');
};

//commonCode 관련 start
export const getDataFromResult = (result) => result?.data?.data || [];
export const getOptionsFromCommonCode = (items) => [
  { value: '', label: '전체' },
  ...items.map((item) => ({
    ...item,
    value: item.cdId,
    label: item.cdNm
  }))
];

export const getCommonCodeList = (res) => getOptionsFromCommonCode(getDataFromResult(res));
export const getCommonCodeAsync = (code) => selectCommonCodeList(code).then(getCommonCodeList);

export const getOptionsFromCommonCodeNoSelect = (items) => [
  ...items.map((item) => ({
    ...item,
    value: item.cdId,
    label: item.cdNm
  }))
];
export const getCommonCodeListNoSelect = (res) => getOptionsFromCommonCodeNoSelect(getDataFromResult(res));
export const getCommonCodeAsyncNoSelect = (code) => selectCommonCodeList(code).then(getCommonCodeListNoSelect);
//commonCode 관련 end

//id, name -> value, label
export const getOptionsFromSelectCode = (items) => [
  { value: '', label: '선택하세요' },
  ...items.map((item) => ({
    ...item,
    value: item.id.toString(),
    label: item.name
  }))
];

export const getSelectCodeList = (res) => getOptionsFromSelectCode(getDataFromResult(res));

export const getParsedCarMart = (carMartData = {}) => {
  //임시
  // console.log("getParsedCarMart -> carMartData", carMartData)
  const {
    realFuel,
    firstRegistrationDate,
    cargubun,
    cargubunno,
    carReleaseOption,
    fuel,
    factoryPrice,
    carMainColor,
    modelno,
    newPrice,
    carYear,
    carModelDetail,
    carMaker,
    carGrade,
    missionType,
    carSerialNumber,
    setaterLimitCount,
    classno,
    displacement,
    recentCheckSpecDate,
    mileage,
    carMakerCd,
    makerno,
    carOptionList,
    carNumber,
    seriesno1,
    seriesname1,
    carCd,
    seriesno2,
    seriesname2,
    useGubun,
    carModel,
    carMainColor1,
    gearbox,
    seating
  } = carMartData;

  const dummyFuel = carFuelList.find((carFuel) => carFuel?.label?.toLowerCase() == fuel?.toLowerCase());
  const dummyMss = carMssList.find((carMss) => carMss?.label?.toLowerCase() == missionType?.toLowerCase());
  const dummyCarUse = carUseDvcdList.find((carUseDvcd) => carUseDvcd?.label?.toLowerCase() == useGubun?.toLowerCase());

  return {
    car: {
      crId: '',
      crNm: `${carMaker} ${carModel} ${carModelDetail}`,
      crNo: carNumber,
      crTypeCd: cargubunno,
      // crTypeCdNm: cargubun,
      crMnfcCd: makerno,
      crMnfcCdNm: carMaker,
      crMdlCd: classno,
      crMdlCdNm: carModel,
      crDtlMdlCd: modelno,
      crDtlMdlCdNm: carModelDetail,
      crClsCd: seriesno1,
      crClsCdNm: seriesname1,
      crDtlClsCd: seriesno2,
      crDtlClsCdNm: seriesname2,
      crClrCd: carMainColor1,
      crClrCdNm: carMainColor,
      crCmnt: '',
      crUseDvcd: dummyCarUse?.value,
      // crUseDvcdNm: useGubun,
      crRlsPrc: newPrice,
      dspl: displacement,
      frmYyyy: carYear,
      frstRegDt: firstRegistrationDate,
      fuelDvcd: dummyFuel?.value,
      // fuelNm: fuel,
      drvDist: mileage,
      mssDvcd: dummyMss?.value,
      // mssNm: missionType,
      spExchYn: '',
      spExchCntn: '',
      addOptCntn: '',
      atbInspNo: '',
      crDoorCnt: '',
      crTkcarPsncpa: seating,
      frstInsuRegDt: '',
      optionList: [],
      // { //options
      //   addOptYn: "N",
      //   optCd: "063200",
      //   crId: null,
      //   cat1Seq: 6,
      //   cat1Nm: null,
      //   cat2Seq: 32,
      //   cat2Nm: null,
      //   cat3Seq: 0,
      //   cat3Nm: null,
      //   optNm: null
      // },
      // {
      //   optCd: "052061"
      // }
      photoList: []
    }
  };
};
