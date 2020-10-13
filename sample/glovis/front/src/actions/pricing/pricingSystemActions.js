import uuid from 'uuid';
import { endsWith, orderBy, round } from 'lodash';
import { axiosGetAsync, axiosPostAsync } from '@src/utils/HttpUtils';
import { numberFormat, objIsEmpty, stringToDateFotmat } from '@src/utils/CommonUtil';
import { gInfoLive } from '@src/utils/LoginUtils';
import { convertDefaultImage, groupBy, getMakerImageAsync, getMarketPriceParameter, getMarketPriceAsync, getPricingCarColors, getPricingCarOptions } from '@src/components/pricingSystem/pricingUtil';
export const GET_PRICING_CAR_INFO = 'GET_PRICING_CAR_INFO';
export const GET_PRICING_MARKET_PRICE = 'GET_PRICING_MARKET_PRICE';
export const GET_PRICING_MARKET_PRICE_RESET = 'GET_PRICING_MARKET_PRICE_RESET';
export const GET_PRICING_VIEWABLE_CNT = 'GET_PRICING_VIEWABLE_CNT';
export const GET_PRICING_TICKET_INFO = 'GET_PRICING_TICKET_INFO';
export const GET_PRICING_CAR_BID_LIST = 'GET_PRICING_CAR_BID_LIST';

export const GET_PRICING_SEARCH_CAR_COLOR = 'GET_PRICING_SEARCH_CAR_COLOR';
export const GET_PRICING_SEARCH_CAR_DEFAULT_OPTION = 'GET_PRICING_SEARCH_CAR_DEFAULT_OPTION';
export const GET_PRICING_SEARCH_CAR_DISPLACEMENT = 'GET_PRICING_SEARCH_CAR_DISPLACEMENT';
export const GET_PRICING_SEARCH_CAR_FUEL = 'GET_PRICING_SEARCH_CAR_FUEL';
export const GET_PRICING_SEARCH_CAR_NOY = 'GET_PRICING_SEARCH_CAR_NOY';
export const GET_PRICING_SEARCH_CAR_TRANSMISSION = 'GET_PRICING_SEARCH_CAR_TRANSMISSION';
export const GET_PRICING_SEARCH_CAR_SEPC_INFO = 'GET_PRICING_SEARCH_CAR_SEPC_INFO';

export const SET_PRICING_CAR_INFO = 'SET_PRICING_CAR_INFO';
export const SET_PRICING_CAR_INFO_NAME = 'SET_PRICING_CAR_INFO_NAME';
export const SET_PRICING_CAR_SELECTION_POPUP_STATE = 'SET_PRICING_CAR_SELECTION_POPUP_STATE';
export const SET_PRICING_CAR_INFO_CLEAR = 'SET_PRICING_CAR_INFO_CLEAR';
export const SET_PRICING_CAR_INFO_PRICE = 'SET_PRICING_CAR_INFO_PRICE';
export const SET_PRICING_RESET = 'SET_PRICING_RESET';

export const getPricingCarInfo = (crNo, carInfo, cancelToken = null) => async (dispatch) => {
  const reqParam = {
    uid: uuid.v4(),
    crNo: crNo,
    inqMbId: gInfoLive().id || 'guest'
  };

  if (carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '2') {
    reqParam.uid = carInfo.resStatus.uid;
    reqParam.crNo = carInfo.crNo;
    reqParam.tskey = carInfo.resStatus.tsKey || null;
    reqParam.seriesno = carInfo.seriesNo || null;
    reqParam.userSelect = {
      clr: carInfo.clr,
      drvDist: carInfo.drvDist,
      rlsPrc: carInfo.rlsPrc
    };
  }

  let payload = null;

  const res = await axiosPostAsync('/api/pricing/getPricingCarInfo.do', reqParam, true, cancelToken);
  let resData = null;
  if (res && res.data && res.data.data) {
    resData = res.data;
  } else if (res.data.statusinfo && res.data.statusinfo.returncd === 'SYS9999' && res.data.statusinfo.returnmsg) {
    alert(res.data.statusinfo.returnmsg);
    return;
  } else {
    alert('조회된 정보가 없습니다.');
    return;
  }

  if (resData) {
    if (resData.data.rst_code === '1' || resData.data.rst_code === '2' || resData.data.rst_code === '300002') {
      payload = res.data.data;
      if (payload.rst_code === '300002') {
        payload.rst_code = '1';
      }
      if (resData.data.rst_code) {
        if (!objIsEmpty(resData.data.modellist)) {
          const imgRes = await axiosGetAsync(`/api/pricing/getPricingCarImage.do?modelId=${resData.data.modellist[0].modelno}`, false, cancelToken);
          if (imgRes && imgRes.data && imgRes.data.data) {
            payload.cardata.modelimage = convertDefaultImage(imgRes.data.data);
          }
        }

        if (!objIsEmpty(resData.data.cardata.makerno)) {
          const makerImg = await getMakerImageAsync(resData.data.cardata.makerno);
          if (makerImg) {
            payload.cardata.markerImg = makerImg;
          }
        }
      }
    }

    if ((resData.data.rst_code === '100004' || resData.data.rst_code === '100005') && resData.data.rst_msg) {
      alert(res.data.data.rst_msg);
    }

    if (resData.data.statusinfo && resData.data.statusinfo.returncd === 'SYS9999') {
      alert(res.data.statusinfo.returnmsg);
    }
  }

  dispatch({
    type: GET_PRICING_CAR_INFO,
    payload,
    crNo,
    reqParam,
    searchCarDefaultOptions: getPricingCarOptions(),
    searchCarColors: getPricingCarColors()
  });
};

export const getPricingMarketPrice = (carInfo, carOptions, cancelToken = null, reqType = '', odrNum = 0, odrDtlSeq = 0) => async (dispatch) => {
  const reqParam = getMarketPriceParameter(gInfoLive().id || 'guest', carInfo, carOptions, reqType);
  reqParam.odrNum = odrNum;
  reqParam.odrDtlSeq = odrDtlSeq;
  const payload = await getMarketPriceAsync(gInfoLive().id || 'guest', reqParam, cancelToken);
  if (payload) {
    dispatch({
      type: GET_PRICING_MARKET_PRICE,
      payload,
      reqParam
    });
  } else {
    dispatch({
      type: GET_PRICING_MARKET_PRICE,
      payload: {
        reportId: 'N/A',
        monthlyPrice: [0, 0, 0, 0, 0],
        currentPrice: {
          minPrice: 0,
          maxPrice: 0,
          marketMinPrice: 0,
          marketMaxPrice: 0,
          price: 0
        },
        retailPrice: {
          minPrice: 0,
          maxPrice: 0,
          marketMinPrice: 0,
          marketMaxPrice: 0,
          price: 0
        }
      },
      reqParam
    });
  }
};

export const getPricingMarketPriceRest = () => (dispatch) => {
  dispatch({
    type: GET_PRICING_MARKET_PRICE_RESET
  });
};

export const setPricingReset = () => (dispatch) => {
  dispatch({
    type: SET_PRICING_RESET
  });
};

export const getPricingCarBidList = (crClsCd, crDtlClsCd, cancelToken = null) => async (dispatch) => {
  let payload = null;

  const res = await axiosGetAsync(`/api/pricing/getPricingBidList.do?crClsCd=${crClsCd || ''}&crDtlClsCd=${crDtlClsCd || ''}`, false, cancelToken);

  if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
    payload = await res.data.data;

    payload.forEach((item) => {
      item.succpricNum = item.succpric || 0;
      item.evalpointNum = item.evalpoint || 0;
      item.auctroomnm = item.auctroomnm ? item.auctroomnm.replace('현대글로비스(주)오토벨', '') : '';
      item.auctroomnm = endsWith(item.auctroomnm, '센터') ? item.auctroomnm.substr(0, item.auctroomnm.length - 2) : item.auctroomnm;
      item.sellymd = item.sellymd ? stringToDateFotmat(item.sellymd, '.') : '';
      item.succymd = item.succymd ? stringToDateFotmat(item.succymd, '.') : '';
      item.carregiymd = item.carregiymd ? stringToDateFotmat(item.carregiymd, '.') : '';
      item.exha = item.exha ? numberFormat(item.exha) : '';
      item.travdist = item.travdist ? numberFormat(item.travdist) : '';
      item.starpric = item.starpric ? numberFormat(item.starpric) : '';
      item.succpric = item.succpric ? numberFormat(item.succpric) : '';
    });
  }

  dispatch({
    type: GET_PRICING_CAR_BID_LIST,
    payload
  });
};

export const getPricingViewableCount = (userId, cancelToken = null) => async (dispatch) => {
  let payload = null;
  const res = await axiosGetAsync(`https://price.glovisaa.com/api/pricing/getPricingViewableCount.do?userId=${userId}`, cancelToken);

  if (res && res.data) {
    payload = await res.data;
  } else {
    payload = {
      statusinfo: {
        ReturnCd: '000'
      },
      viewableCount: 0
    };
  }

  dispatch({
    type: GET_PRICING_VIEWABLE_CNT,
    payload
  });
};

export const getPricingTicketInfo = (userId, cancelToken = null) => async (dispatch) => {
  let payload = null;

  const res = await axiosGetAsync(`/api/mypage/dealer/selectDlrPricingInfo.do?mbId=${userId}`, cancelToken).then(res);
  if (res && res.data && res.data.data && res.data.statusinfo.returncd === '000') {
    payload = await res.data.data;
  } else {
    payload = {
      availableAdCnt: 0,
      odrNum: 0,
      odrDtlSeq: 0
    };
  }

  dispatch({
    type: GET_PRICING_TICKET_INFO,
    payload
  });
};

export const getSearchCarColors = () => (dispatch) => {
  const payload = getPricingCarColors();

  dispatch({
    type: GET_PRICING_SEARCH_CAR_COLOR,
    payload
  });
};

export const getSearchCarDefaultOptions = () => async (dispatch) => {
  const payload = [...getPricingCarOptions()];

  dispatch({
    type: GET_PRICING_SEARCH_CAR_DEFAULT_OPTION,
    payload
  });
};

export const getSearchCarSpecInfo = (modelId, cancelToken = null) => async (dispatch) => {
  const res = await axiosGetAsync(`/api/pricing/getSearchCarSpecInfo.do?modelId=${modelId}`, cancelToken);
  const noyOptions = [];
  const dsplOptions = [];
  const fuelOptions = [];
  const mssOptions = [];

  if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
    const data = await res.data.data;
    const nowYear = data.prodYearStart;
    const endYear = data.prodYearEnd || new Date().getFullYear();

    for (let year = nowYear; year <= endYear; year++) {
      noyOptions.push({ id: year.toString(), value: year, label: year + '년식', checked: false });
    }
    groupBy(
      data.srchSpecList.map((item) => {
        if (isNaN(item.displace)) {
          return null;
        }
        return round(parseInt(item.displace), -2).toString();
      }),
      (x) => x
    ).forEach((p) => {
      if (!objIsEmpty(p) && !objIsEmpty(p[0])) {
        dsplOptions.push({ id: p[0], cdNm: p[0] + 'cc', cdId: p[0] + 'cc', value: p[0] + 'cc', label: numberFormat(p[0]) + 'cc' });
      }
    });

    groupBy(
      data.srchSpecList.map((item) => {
        return item.fuel;
      }),
      (x) => x
    ).forEach((p) => {
      if (!objIsEmpty(p) && !objIsEmpty(p[0])) {
        fuelOptions.push({ id: p[0], cdNm: p[0], cdId: p[0], value: p[0], label: p[0] });
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
        mssOptions.push({ id: p[0], cdNm: cd, cdId: cd, value: cd, label: cd });
      }
    });
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_SEPC_INFO,
    payload: {
      noyOptions: orderBy(noyOptions, ['id'], ['desc']),
      dsplOptions: orderBy(dsplOptions, ['id'], ['asc']),
      fuelOptions,
      mssOptions
    }
  });
};

export const getSearchCarDisplacement = (cancelToken = null) => async (dispatch) => {
  let payload = null;

  const res = await axiosGetAsync(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=CR002`, cancelToken);

  if (res && res.data) {
    payload = await res.data.data;
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_DISPLACEMENT,
    payload
  });
};

export const getSearchCarFuels = (cancelToken = null) => async (dispatch) => {
  let payload = null;

  const res = await axiosGetAsync(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=BS016`, cancelToken);

  if (res && res.data) {
    payload = await res.data.data;
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_FUEL,
    payload
  });
};

export const getSearchCarNumberOfYears = () => (dispatch) => {
  const nowYear = new Date().getFullYear();
  const noyOptions = [];
  for (let year = nowYear; year >= nowYear - 20; year--) {
    noyOptions.push({ id: year.toString(), value: year, label: year + '년식', checked: false });
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_NOY,
    payload: orderBy(noyOptions, ['id'], ['asc'])
  });
};

export const getSearchCarTranmission = (cancelToken = null) => async (dispatch) => {
  let payload = null;

  const res = await axiosGetAsync(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=BS015`, cancelToken);
  if (res && res.data) {
    payload = await res.data.data;
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_TRANSMISSION,
    payload
  });
};

export const setToggleCarSelectionPopUp = () => (dispatch) => {
  dispatch({
    type: SET_PRICING_CAR_SELECTION_POPUP_STATE
  });
};

export const setPricingCarInfo = (carinfo) => (dispatch) => {
  dispatch({
    type: SET_PRICING_CAR_INFO,
    payload: carinfo
  });
};

export const setPricingCarInfoName = (crNm, carInfo) => (dispatch) => {
  dispatch({
    type: SET_PRICING_CAR_INFO_NAME,
    payload: crNm ? { crNm } : carInfo
  });
};

export const setPricingCarInfoClear = () => (dispatch) => {
  dispatch({
    type: SET_PRICING_CAR_INFO_CLEAR
  });
};

export const setPricingCarInfoPrice = (carInfo, marketPrice) => (dispatch) => {
  dispatch({
    type: SET_PRICING_CAR_INFO_PRICE,
    carInfo,
    marketPrice
  });
};
