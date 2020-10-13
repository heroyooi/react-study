import { orderBy } from 'lodash';
import { selectCarMart } from '@src/api/common/CarInfoApi';
import { axiosGet, axiosGetAsync } from '@src/utils/HttpUtils';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { getCommonCodeAsync, getCommonCodeAsyncNoSelect } from '@src/utils/DataUtils';
import { groupBy } from '@src/components/pricingSystem/pricingUtil';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import { selectSellcar, selectSellcarTerms } from '../../api/sellcar/AllSellcarSearchApi';
import { uploadCarPhoto, getSellCarFaqList, getHpPn } from '../../api/sellcar/CommonSellcarApi';
import sellCarTypes from './sellCarTypes';

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // Firefox를 제외한 모든 브라우저
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // 코드가 존재하지 않을 수도 있기 떄문에 이름 필드도 확인합니다.
          // Firefox를 제외한 모든 브라우저
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
          (storage && storage.length !== 0);
  }
}

/****************************** 1/3 카마트 API  ******************************/

/**
 * @memberof module:sellCarAction
 * @desc 차번호로 카마트에서 차량 정보 조회
 * @param {String} carNo
 */
const getCarMartInfoAction = (params) => async (dispatch) => {
  // console.log('car::', 'getCarMartInfoAction', params);
  try {
    const { data: car, statusinfo } = await selectCarMart(params).then((res) => res?.data);

    // const { car } = getParsedCarMart(data); // selectCarMartApi에서 일반적인 Car 포맷으로 변환되어서 들어오기 때문에 주석처리함 - D191470
    // console.log('car::', 'getCarMartInfoAction -> car', car, statusinfo);
    if (statusinfo?.returncd === '000') {
      dispatch({
        type: sellCarTypes.INIT_CAR_STATE,
        payload: { car } || {}
      });
    }
    return {
      car,
      statusinfo
    };
  } catch (err) {
    // console.error('error : 에러페이지로 리디렉션 : ', err);
    return err;
  }
};

/****************************** 2/3 신청서 API  ******************************/

/**
 * @memberof module:sellCarAction
 * @desc 신청서 번호로 신청서 정보(차량정보 포함) 조회
 * @param {String} carNo
 */
const getReqAction = (slReqId) => async (dispatch) => {
  try {
    const seller = await selectSellcar({ slReqId })
      .then((res) => res?.data?.data)
      .catch((err) => console.log(err));
    const car = seller?.car;
    dispatch({
      type: sellCarTypes.INIT_CAR_STATE,
      payload: { seller, car } || {}
    });
  } catch (err) {
    console.error('error : 에러페이지로 리디렉션 : ', err);
  }
};

/**
 * @memberof module:sellCarAction
 * @desc 데이터를 업로드하는 api 호출 후 결과값을 Object를 기존 데이터에 덮어씌운다
 * @param {String} payload.state - store안의 state 이름
 * @param {Object} payload.value - state에 들어갈 object data
 */
const uploadImageAction = ( payload, replace ) => async ( dispatch ) => {
  try {
    console.log('TCL: uploadImageAction -> payload', payload);
    const {
      state,
      prop,
      files,
      key,
      value: { sortNo, slReqId }
    } = payload;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('sortNo', sortNo);
    formData.append('slReqId', slReqId);
    console.log('TCL: uploadImageAction -> formData', formData);

    uploadCarPhoto(formData)
      .then((res) => {
        console.log(res);
        // const { data } = await uploadCarPhoto(formData);
        // console.log('TCL: uploadImageAction -> data', data);
        // const { fileId, folderPath, storedFileName } = data?.result[0];
        // dispatch({
        //   type: replace ? sellCarTypes.REPLACE_OBJECT_BY_KEY : sellCarTypes.PUSH_OBJECT,
        //   payload: {
        //     state,
        //     prop,
        //     key,
        //     value: {
        //       fileSaveId: fileId,
        //       sortNo,
        //       phtUrl: folderPath + storedFileName
        //     }
        //   }
        // });
      })
      .catch((err) => {
        console.log(err);
      });

    // const { data } = await http.ax(`/mock/sellcar/sellReqForm.json?carNum=${carNum}`)
    // payload.value['phtUrl'] = '/images/mock/sellcar/self/1.png'; //upload 성공후 받아온 url 대입
  } catch (err) {
    console.error('error : 에러페이지로 리디렉션');
  }
};

/****************************** 3/3 STORE STATE  ******************************/

/**
 * @memberof module:sellCarAction
 * @desc selfStore를 비우는 action
 * @param {String} carNum
 */
const resetAllCarInfoAction = () => (dispatch) => {
  dispatch({
    type: sellCarTypes.INIT_CAR_STATE,
    payload: {}
  });
};

/**
 * @memberof module:sellCarAction
 * @desc store에 state값을 변경하는 action
 * @param {Object} payload - payload
 * @param {String} payload.state - store안의 state 이름
 * @param {String} payload.value - store안의 state에 대입할 값
 */
const inputStateAction = (payload) => (dispatch) => {
  dispatch({
    type: sellCarTypes.INPUT_STATE,
    payload
  });
};

/**
 * @memberof module:sellCarAction
 * @desc store의 object로 된 state의 property를 변경하는 action
 * @param {Object} payload - payload
 * @param {String} payload.state - store안의 state 이름
 * @param {String} payload.prop - store안의 state에 변경할 property
 * @param {String} payload.value - store안의 state의 property에 대입할 값
 */
const inputPropAction = (payload) => (dispatch) => {
  console.log('inputPropAction', payload);
  dispatch({
    type: sellCarTypes.INPUT_PROP,
    payload
  });
};

/**
 * @memberof module:sellCarAction
 * @desc selfStore를 비우는 action
 * @param {String} payload.state - store안의 state 이름
 * @param {Object} payload.value - store안의 state에 넣을 objectg
 */
const pushObjectAction = (payload) => (dispatch) => {
  dispatch({
    type: sellCarTypes.PUSH_OBJECT,
    payload
  });
};

/**
 * @memberof module:sellCarAction
 * @desc Object[] 타입의 state안에서 하나의 Object를 삭제. 삭제할 대상은 key
 * @param {String} payload.state - store안의 state 이름
 * @param {String} payload.key - 비교할 property key
 * @param {Any} payload.value - 비교할 property value
 */
const removeObjectByKeyAction = (payload) => (dispatch) => {
  dispatch({
    type: sellCarTypes.REMOVE_OBJECT_BY_KEY,
    payload
  });
};

/**
 * @memberof module:sellCarAction
 * @desc 데이터를 업로드하는 api 호출 후 결과값을 Object를 기존 데이터에 덮어씌운다
 * @param {String} payload.state - store안의 state 이름
 * @param {String} payload.key - 비교할 property key
 * @param {Object} payload.value - 비교 할 값을 가지고 있는 대상이자 교체되어 들어갈 object data
 */
const replaceImageByKeyAction = (payload) => async (dispatch) => {
  try {
    console.log('TCL: replaceImageByKeyAction -> payload', payload);
    // const { data } = await http.ax(`/mock/sellcar/sellReqForm.json?carNum=${carNum}`)
    // payload.value['phtUrl'] = '/images/mock/sellcar/self/1.png'; //upload 성공후 받아온 url 대입

    // dispatch({
    //   type: sellCarTypes.REPLACE_OBJECT_BY_KEY,
    //   payload
    // });
    // updateCarPhotoList
  } catch (err) {
    console.error('error : 에러페이지로 리디렉션');
  }
};

const updateReqSttTpcd = (payload) => async (dispatch) => {
  console.log('updateReqSttTpcd', payload);
  dispatch({
    type: sellCarTypes.INPUT_PROP_OBJ,
    payload: {
      state: 'seller',
      obj: {
        reqSttTpcd: payload.reqSttTpcd,
        reqSttTpcdNm: payload.reqSttTpcdNm
      }
    }
  });
  // 목록에서 해당 신청서 정보 수정
  dispatch({
    type: sellCarTypes.INPUT_REQ_LIST_PROP_OBJ,
    payload: {
      slReqId: payload.slReqId,
      obj: {
        reqSttTpcd: payload.reqSttTpcd,
        reqSttTpcdNm: payload.reqSttTpcdNm
      }
    }
  });
};

/**
 * @memberof module:sellCarAction
 * @desc 자주하는 질문 데이터 가져오기
 * @param {Object} codes 데이터 조회용 코드
 */
const getSellCarFaqAction = (codes) => async (dispatch) => {
  await getSellCarFaqList(codes).then((res) => {
    console.log('sellCarAction > getSellCarFaqAction>');
    dispatch({
      type: sellCarTypes.GET_SELLCAR_FAQ_LIST,
      payload: res
    });
  });
};

/**
 * @memberof module:sellCarAction
 * @desc 전화번호 모바일용 가공 및 가져오기
 * @param {String} code 공통 코드 조회용 전화번호 코드
 */
const getSellCarMobileOption = (code) => async (dispatch) => {
  await getCommonCodeAsync(code).then((res) => {
    console.log('sellCarAction > getSellCarMobileOption>');
    dispatch({
      type: sellCarTypes.GET_SELLCAR_MOBILE_OPTION,
      payload: res
    });
  });
};

/**
 * @memberof module:sellCarAction
 * @desc 내차팔기 약관 가져오기
 * @param {Object} codes 약관 데이터 조회용 코드
 */
const getSellCarTermData = (codes) => async (dispatch) => {
  // * tmsTp          tmsDiv
  // * 0500 방문평가    0510 이용약관
  // * 0600 셀프평가    0610 이용약관
  // * 0700 무평가      0710 이용약관
  // * 0700 무평가      0720 환불규정
  await selectSellcarTerms(codes).then((res) => {
    console.log('sellCarAction > getSellCarTermList>');
    dispatch({
      type: sellCarTypes.GET_SELLCAR_TERM_LIST,
      payload: res
    });
  });
};

const resetCarAction = () => (dispatch) => {
  dispatch({
    type: sellCarTypes.RESET_CAR_STATE
  });
};

const getSearchCarSpecInfo = (modelId, cancelToken = null) => async (dispatch) => {
  console.log(':::: getSearchCarSpecInfo');
  const res = await axiosGetAsync(`/api/pricing/getSearchCarSpecInfo.do?modelId=${modelId}`, cancelToken);
  console.log(':::: getSearchCarSpecInfo -> res', res);
  const noyOptions = [];
  const dsplOptions = [];
  const fuelOptions = [];
  const mssOptions = [];

  if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
    const data = await res.data.data;
    let nowYear = data.prodYearStart;
    let endYear = data.prodYearEnd;
    if (nowYear === null && endYear !== null) {
      nowYear = endYear;
    } else if (nowYear !== null && endYear === null) {
      endYear = nowYear;
    }
    for (let year = nowYear; year <= endYear; year++) {
      noyOptions.push({ id: year.toString(), value: year, label: year + '년식', checked: false });
    }
    groupBy(
      data.srchSpecList.map((item) => {
        if (isNaN(item.displace.replace(',', ''))) {
          return null;
        }
        return item.displace.replace(',', '').toString();
      }),
      (x) => x
    ).forEach((p) => {
      if (!objIsEmpty(p) && !objIsEmpty(p[0])) {
        dsplOptions.push({ id: p[0], cdNm: p[0] + 'cc', cdId: p[0] + 'cc', value: p[0], label: p[0] + 'cc' });
      }
    });

    groupBy(
      data.srchSpecList.map((item) => {
        return item.fuel;
      }),
      (x) => x
    ).forEach((p) => {
      if (!objIsEmpty(p) && !objIsEmpty(p[0])) {
        const cd =
          p[0] === '가솔린'
            ? '01'
            : p[0] === '디젤'
            ? '02'
            : p[0] === 'LPG'
            ? '03'
            : p[0] === '겸용'
            ? '04'
            : p[0] === 'Hybrid' || p[0] === '가솔린+전기'
            ? '05'
            : p[0] === 'CNG'
            ? '06'
            : p[0] === '전기'
            ? '07'
            : p[0] === '수소'
            ? '08'
            : '';
        fuelOptions.push({ id: p[0], cdNm: p[0], cdId: cd, value: cd, label: p[0] });
      }
    });

    groupBy(
      data.srchSpecList.map((item) => {
        return item.gearbox;
      }),
      (x) => x
    ).forEach((p) => {
      if (!objIsEmpty(p) && !objIsEmpty(p[0])) {
        const cd = p[0] === '수동' ? 'M/T' : p[0] === '오토' ? 'A/T' : p[0] === '세미오토' ? 'SAT' : p[0] === 'CVT' ? 'CVT' : '';
        const val = p[0] === '수동' ? '01' : p[0] === '오토' ? '02' : p[0] === '세미오토' ? '03' : p[0] === 'CVT' ? '04' : '';
        mssOptions.push({ id: p[0], cdNm: cd, cdId: val, value: val, label: cd });
      }
    });
  }

  dispatch({
    type: sellCarTypes.GET_SELLCAR_SEARCH_CAR_SEPC_INFO,
    payload: {
      noyOptions: orderBy(noyOptions, ['id'], ['desc']),
      dsplOptions: orderBy(dsplOptions, ['id'], ['asc']),
      fuelOptions,
      mssOptions
    }
  });
};

const carHistoryAuthSucc = ( payload ) => async (dispatch) => {
  dispatch({
    type: sellCarTypes.CAR_HISTORY_AUTH_SUCC,
    payload
  });
};

const carHistoryAuthFail = () => (dispatch) => {
  dispatch({
    type: sellCarTypes.CAR_HISTORY_AUTH_FAIL
  });
};

const userInfoAction = (userInfo) => async (dispatch) => {
  const { type, id, name, phone } = userInfo;
  let payload = { name };
  let storeAvail = false;
  let localStorageUseAvail = false;

  if (storageAvailable('localStorage')) {
    localStorageUseAvail = true;
  }

  if (type === 'member') {
    // 로그인 회원
    await getHpPn({ mbId: id }).then((res) => {
      const { statusinfo, hpPn: newHpPn, nmbNm } = res.data;
      if (statusinfo.returncd === '000') {
        payload = {
          phonenumber: setHpPnFormat(newHpPn),
          name: nmbNm
        };
        storeAvail = true;
      }
    });
  } else if (type === undefined) {
    // 휴대전화번호 인증회원
    payload = { ...payload, phonenumber: phone };
    storeAvail = true;
  }
  
  if (storeAvail && localStorageUseAvail) {
    const storage = window['localStorage'];
    storage.name        = payload.name;
    storage.phonenumber = payload.phonenumber;
  } 
  dispatch({
    type: sellCarTypes.USER_INFO_UPDATE,
    payload
  });
};

const copyUserInfoAction = () => async (dispatch) => {
  dispatch({
    type: sellCarTypes.COPY_USER_INFO_UPDATE
  });
};

// 촬영 부위
const getShootingPartList = (type = '') => async (dispatch) => {
  const mainPhotoList = [];
  const subPhotoList = [];
  let originalList;
  let mainAttrList;
  let subAttrList;
  const res = await axiosGet(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=FM057`, null);
  // if (data?.statusinfo?.returncd === 'SUCCESS') {
  if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
    originalList = res.data.data;
    console.log("getShootingPartList -> originalList", originalList)

    if (type === 'seller') { //일반 유저
      mainAttrList = originalList.filter((item) => item.attr1 === 'Y');
      subAttrList = originalList.filter((item) => item.attr2 === 'Y');
    } else if (type === 'dealer') { //딜러 - 검증필요
      mainAttrList = originalList.filter((item) => item.attr3 === 'Y');
      subAttrList = originalList.filter((item) => item.attr4 === 'Y');
    } else if (type === 'appraiser') { //평가사 - 검증필요
      mainAttrList = originalList.filter((item) => item.attr5 === 'Y');
      subAttrList = originalList.filter((item) => item.attr6 === 'Y');
    }
    mainAttrList.forEach((item) => {
      mainPhotoList.push({ title: item.cdNm, fileSaveId: `${item.sortNo}`, sortNo: item.sortNo, crId: `${item.sortNo}` });
    });
    subAttrList.forEach((item) => {
      subPhotoList.push({ title: item.cdNm, fileSaveId: `${item.sortNo}`, sortNo: item.sortNo, crId: `${item.sortNo}` });
    });
  }
  console.log("getShootingPartList -> mainPhotoList", mainPhotoList)
  console.log("getShootingPartList -> subAttrList", subAttrList)

  dispatch({
    type: sellCarTypes.GET_SHOOTING_PART_LIST,
    payload: {
      mainPhotoList,
      subPhotoList
    }
  });
};

const updateCarSiseAction = (crNo, tsKey, seriesno, type) => async (dispatch) => {
  dispatch({
    type: sellCarTypes.CAR_SISE_UPDATE,
    payload: { crNo, tsKey, seriesno, type }
  });
};

const resetCarSiseAction = () => async (dispatch) => {
  dispatch({
    type: sellCarTypes.CAR_SISE_RESET,
    payload: {}
  });
};

/**
 * @category actions
 * @module sellCarAction
 * @desc 셀프 등록 판매 관련 actions
 */
export {
  getReqAction,
  resetAllCarInfoAction,
  inputStateAction,
  inputPropAction,
  pushObjectAction,
  removeObjectByKeyAction,
  replaceImageByKeyAction,
  uploadImageAction,
  getCarMartInfoAction,
  updateReqSttTpcd,
  getSellCarFaqAction,
  getSellCarMobileOption,
  getSellCarTermData,
  resetCarAction,
  getSearchCarSpecInfo,
  carHistoryAuthSucc,
  carHistoryAuthFail,
  userInfoAction,
  getShootingPartList,
  copyUserInfoAction,
  updateCarSiseAction,
  resetCarSiseAction
};
