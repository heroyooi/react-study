import { isEmpty } from 'lodash';
import uuid from 'uuid';
import { axiosGetAsync, axiosPostAsync } from '@src/utils/HttpUtils';
import { dateToString } from '@src/utils/DateUtils';
import { getPricingCarInfoDummy, getPricingNoCarInfoDummy, getPricingMarketPriceDummy, imageListDummy, getBidListDummy, searchCarColorsDummy, searchCarOptionsDummy } from '@src/dummy/pricingDummy';
export const GET_PRICING_CAR_INFO = 'GET_PRICING_CAR_INFO';
export const GET_PRICING_MARKET_PRICE = 'GET_PRICING_MARKET_PRICE';
export const GET_PRICING_AUCTION_DATA = 'GET_PRICING_AUCTION_DATA';
export const GET_PRICING_VIEWABLE_CNT = 'GET_PRICING_VIEWABLE_CNT';
export const GET_PRICING_TICKET_INFO = 'GET_PRICING_TICKET_INFO';
export const GET_PRICING_CAR_BID_LIST = 'GET_PRICING_CAR_BID_LIST';
export const GET_PRICING_CAR_GRADE_SPECIFICATION = 'GET_PRICING_CAR_GRADE_SPECIFICATION';

export const GET_PRICING_SEARCH_CAR_COLOR = 'GET_PRICING_SEARCH_CAR_COLOR';
export const GET_PRICING_SEARCH_CAR_DEFAULT_OPTION = 'GET_PRICING_SEARCH_CAR_DEFAULT_OPTION';
export const GET_PRICING_SEARCH_CAR_DISPLACEMENT = 'GET_PRICING_SEARCH_CAR_DISPLACEMENT';
export const GET_PRICING_SEARCH_CAR_FUEL = 'GET_PRICING_SEARCH_CAR_FUEL';
export const GET_PRICING_SEARCH_CAR_NOY = 'GET_PRICING_SEARCH_CAR_NOY';
export const GET_PRICING_SEARCH_CAR_TRANSMISSION = 'GET_PRICING_SEARCH_CAR_TRANSMISSION';

export const SET_PRICING_CAR_INFO = 'SET_PRICING_CAR_INFO';
export const SET_PRICING_CAR_INFO_NAME = 'SET_PRICING_CAR_INFO_NAME';
export const SET_PRICING_CAR_SELECTION_POPUP_STATE = 'SET_PRICING_CAR_SELECTION_POPUP_STATE';
export const SET_PRICING_CAR_INFO_CLEAR = 'SET_PRICING_CAR_INFO_CLEAR';

export const getPricingCarInfo = (crNo, carInfo, cancelToken = null) => async (dispatch) => {
  console.log(':::: getPricingCarInfo -> crNo {}', crNo);
  const reqParam = {
    uid: uuid.v4(),
    crNo: crNo,
    inqMbId: 'guest'
  };

  if (carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '2') {
    reqParam.tsKey = carInfo.resStatus.tskey || null;
    reqParam.seriesNo = carInfo.resStatus.modelNo || null;
  }

  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    payload = getPricingCarInfoDummy.data;
    if (crNo === '1111' || crNo === '1234') {
      payload = getPricingNoCarInfoDummy.data;
    }
  } else {
    const res = await axiosPostAsync('/api/pricing/getPricingCarInfo.do', reqParam, cancelToken);
    console.log(':::: getPricingCarInfo -> res', res);

    if (res && res.data && res.data.data && (res.data.data.rst_code === '1' || res.data.data.rst_code === '2')) {
      payload = res.data.data;
    }

    if (res && res.data && res.data.data && res.data.data.rst_code === '100004' && res.data.data.rst_msg) {
      // eslint-disable-next-line no-alert
      alert(res.data.data.rst_msg);
    }
  }

  dispatch({
    type: GET_PRICING_CAR_INFO,
    payload,
    crNo
  });
};

// TODO 차량정보 조회 - 시세예측, 차량정보, 동급차량 낙찰정보 목록조회
export const getPricingMarketPrice = (carInfo, carOptions, viewableCnt, hasPricingTicket, cancelToken = null) => async (dispatch) => {
  console.log(':::: getPricingByCarNo -> carInfo', carInfo);
  const reqParam = {
    uid: carInfo.resStatus && carInfo.resStatus.uid ? carInfo.resStatus.uid : uuid.v4(),
    inqMbId: 'guest',
    crNo: carInfo.crNo || null,
    crNm: carInfo.crNm || null,
    year: (carInfo.noy || '').toString() || null, //년식
    exha:
      parseInt(
        carInfo.dspl
          .toString()
          .toLowerCase()
          .replace(/cc/g, '')
      ) || 0, //배기량
    clr: carInfo.clr || null, //색상
    mss: carInfo.mss || null, //변속기
    frstRegDt: dateToString(carInfo.frstRegDt || new Date(), '') || null, // 최초등록일
    fuel: carInfo.fuel || null, // 연료
    drvDist: parseInt(carInfo.drvDist) || 0, // 주행거리
    newPrice: carInfo.rlsPrc || null,
    options: carOptions
  };

  console.log(':::: getPricingByCarNo -> reqParam', reqParam);

  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    payload = getPricingMarketPriceDummy.data;
  } else {
    const res = await axiosPostAsync(`/api/pricing/getPricingByCarNo.do`, JSON.stringify(reqParam), cancelToken);
    console.log(':::: getPricingByCarNo -> res', res);
    if (res && res.data) {
      payload = await res.data.data;
    }
  }
  const unit = 10000;
  const monthly = [
    payload.priceInfo.monthlyPrice['1'] / unit,
    payload.priceInfo.monthlyPrice['3'] / unit,
    payload.priceInfo.monthlyPrice['6'] / unit,
    payload.priceInfo.monthlyPrice['7'] / unit,
    payload.priceInfo.monthlyPrice['12'] / unit
  ];

  const currentPrice = {
    minPrice: 0,
    maxPrice: parseInt(payload.priceInfo.currentPrice.maxPrice) / unit,
    marketMinPrice: parseInt(payload.priceInfo.currentPrice.marketMinPrice) / unit,
    marketMaxPrice: parseInt(payload.priceInfo.currentPrice.marketMaxPrice) / unit,
    price: parseInt(payload.priceInfo.currentPrice.price) / unit
  };
  console.log(currentPrice);
  const data = {
    monthlyPrice: monthly,
    currentPrice: currentPrice
  };

  dispatch({
    type: GET_PRICING_MARKET_PRICE,
    viewableCnt: hasPricingTicket === true ? viewableCnt : viewableCnt - 1,
    payload: data
  });
};

// TODO 이미지완료, 차량경매정보 조회 정의 필요.
export const getAuctionDetailInfo = (carInfo, auctionInfo, cancelToken = null) => async (dispatch) => {
  console.log(':::: getAuctionDetailInfo -> carInfo', carInfo, auctionInfo);
  let payload = null;
  if (process.env.systemEnv === 'publisher') {
    payload = {
      auctionInfo,
      imageList: imageListDummy
    };
  } else {
    //검색조건 Key를 모르겠음....경매정보 아이디이여야 될듯한 api.....
    const res = await axiosGetAsync(`/api/pricing/getAuctionDetailInfo.do?carNo=123`, cancelToken);

    if (res && res.data) {
      payload = {
        auctionInfo,
        imageList: await res.data.data
      };
    }
  }

  dispatch({
    type: GET_PRICING_AUCTION_DATA,
    payload
  });
};

// TODO 이력데이터 입력 후, 후보정필요.
export const getPricingViewableCount = (userId, cancelToken = null) => async (dispatch) => {
  console.log(':::: getPricingViewableCount -> userId', userId);
  const userId = 'test';
  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    payload = {
      statusinfo: {
        ReturnCd: '000'
      },
      viewableCount: 3
    };
  } else {
    const res = await axiosGetAsync(`/api/pricing/getPricingViewableCount.do?userId=${userId}`, cancelToken);
    console.log(':::: getPricingViewableCount -> res', res);
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
  }

  dispatch({
    type: GET_PRICING_VIEWABLE_CNT,
    payload
  });
};

export const getPricingCarBidList = (carInfo, cancelToken = null) => async (dispatch) => {
  console.log(':::: getPricingCarBidList ', carInfo);

  let crClsCd = '';
  if (carInfo && carInfo.carManufactInfo && carInfo.carManufactInfo.length === 5) {
    crClsCd = `${carInfo.carManufactInfo[2].text} ${carInfo.carManufactInfo[3].text} ${carInfo.carManufactInfo[4].text}`;
  }

  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    payload = getBidListDummy.data;
  } else {
    const res = await axiosGetAsync(`/api/pricing/getPricingBidList.do?crClsCd=${crClsCd}`, cancelToken);
    console.log(':::: getPricingCarBidList -> res', res);
    if (res && res.data) {
      payload = await res.data.data;
    } else {
      payload = {
        statusinfo: {
          ReturnCd: '000'
        },
        data: {
          expiredDate: new Date(1900, 0, 1)
        }
      };
    }
  }

  dispatch({
    type: GET_PRICING_CAR_BID_LIST,
    payload
  });
};

// TODO 미정의
export const getPricingTicketInfo = (userId, cancelToken = null) => async (dispatch) => {
  console.log(':::: getPricingTicketInfo -> userId', userId);

  const userId = 'test';
  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    payload = {
      statusinfo: {
        ReturnCd: '000'
      },
      data: {
        expiredDate: new Date(2020, 1, 31)
      }
    };
  } else {
    const res = await axiosGetAsync(`/api/pricing/getPricingTicketInfo.do?userId=${userId}`, cancelToken);
    console.log(':::: getPricingTicketInfo -> res', res);
    if (res && res.data) {
      payload = await res.data.data;
    } else {
      payload = {
        statusinfo: {
          ReturnCd: '000'
        },
        data: {
          expiredDate: new Date(1900, 0, 1)
        }
      };
    }
  }

  dispatch({
    type: GET_PRICING_TICKET_INFO,
    payload
  });
};

// 차량 등급 사양 조회
export const getPricingCarGradeSpecification = (modelNo, seriesInfo, cancelToken = null) => async (dispatch) => {
  console.log(':::: getPricingCarGradeSpecification ->', seriesInfo);

  let payload = null;

  if (!isEmpty(modelNo)) {
    payload = {
      seriesNm: seriesInfo.seriesNm,
      seriesPrice: seriesInfo.seriesPrice,
      list: []
    };

    if (process.env.systemEnv === 'publisher') {
      payload.list = [{ text: '후륜구동' }, { text: '3.7리터 7단 자동변속기' }, { text: '헤드램프 워셔' }, { text: '스크래치 쉴드 페인트' }];
    } else {
      const res = await axiosGetAsync(`/api/pricing/getPricingCarGradeSpecification.do?modelId=${modelNo}&modelGrade=${seriesInfo.seriesNo}`, cancelToken);
      console.log(':::: getPricingCarGradeSpecification -> res', res);
      if (res && res.data) {
        payload.list = await res.data.data;
      }
    }
  }

  dispatch({
    type: GET_PRICING_CAR_GRADE_SPECIFICATION,
    payload
  });
};

// 차량 색상 조회
export const getSearchCarColors = (cancelToken = null) => async (dispatch) => {
  console.log(':::: getSearchCarColors');
  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    payload = searchCarColorsDummy;
  } else {
    const res = await axiosGetAsync('/api/pricing/getSearchCarColor.do', cancelToken);
    if (res && res.data) {
      payload = await res.data.data;

      payload.forEach((item) => {
        item.value = item.clrNm;
        item.label = item.clrNm;
      });
    }

    console.log(':::: getSearchCarColors -> res', res);
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_COLOR,
    payload
  });
};

// 차량 기본 옵션 조회
export const getSearchCarDefaultOptions = (cancelToken = null) => async (dispatch) => {
  console.log(':::: getSearchCarDefaultOptions');
  let tmp = null;
  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    tmp = [...searchCarOptionsDummy];
  } else {
    const res = await axiosGetAsync('/api/pricing/getSearchCarDefaultOptions.do', cancelToken);
    console.log(':::: getSearchCarDefaultOptions -> res', res);
    if (res && res.data) {
      tmp = await res.data.data;
    }
  }

  if (tmp) {
    payload = tmp.map((item) => {
      return Object.assign(
        { ...item },
        {
          value: item.mappingName,
          label: item.cat3Nm,
          isDiaplay: true
      });
    });
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_DEFAULT_OPTION,
    payload
  });
};

export const getSearchCarDisplacement = (cancelToken = null) => async (dispatch) => {
  console.log(':::: getSearchCarDisplacement');
  let payload = null;
  if (process.env.systemEnv === 'publisher') {
    payload = [
      { value: '1', label: '1000cc' },
      { value: '2', label: '2000cc' },
      { value: '3', label: '3000cc' }
    ];
  } else {
    const res = await axiosGetAsync(`/commonCode/selectCommonCodeList.do?cmCdTpId=CR002`, cancelToken);
    console.log(':::: getSearchCarDisplacement -> res', res);

    if (res && res.data) {
      payload = await res.data.data;
    }
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_DISPLACEMENT,
    payload
  });
};

export const getSearchCarFuels = (cancelToken = null) => async (dispatch) => {
  console.log(':::: getSearchCarFuels');
  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    payload = [
      { value: '1', label: '휘발유' },
      { value: '2', label: '경유' },
      { value: '4', label: '전기' }
    ];
  } else {
    const res = await axiosGetAsync(`/commonCode/selectCommonCodeList.do?cmCdTpId=BS016`, cancelToken);
    console.log(':::: getSearchCarFuels -> res', res);

    if (res && res.data) {
      payload = await res.data.data;
    }
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
    noyOptions.push({ value: year, label: year + '년식' });
  }

  dispatch({
    type: GET_PRICING_SEARCH_CAR_NOY,
    payload: noyOptions
  });
};

export const getSearchCarTranmission = (cancelToken = null) => async (dispatch) => {
  console.log(':::: getTranmission');
  let payload = null;

  if (process.env.systemEnv === 'publisher') {
    payload = [
      { value: '1', label: '자동' },
      { value: '2', label: '수동' }
    ];
  } else {
    const res = await axiosGetAsync(`/commonCode/selectCommonCodeList.do?cmCdTpId=BS015`, cancelToken);
    console.log(':::: getTranmission -> res', res);
    if (res && res.data) {
      payload = await res.data.data;
    }
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
  console.log('setPricingCarInfo', carinfo);
  dispatch({
    type: SET_PRICING_CAR_INFO,
    payload: carinfo
  });
};

export const setPricingCarInfoName = (crNm) => (dispatch) => {
  dispatch({
    type: SET_PRICING_CAR_INFO_NAME,
    payload: {
      crNm
    }
  });
};

export const setPricingCarInfoClear = () => (dispatch) => {
  dispatch({
    type: SET_PRICING_CAR_INFO_CLEAR
  });
};

export const setUserIdentifyVerfication = (data, accessToken) => (dispatch) => {
  dispatch({
    type: types.POST_IDENTITY_VERFICATION,
    payload: {
      isIdentityVerify: true
    }
  });
};
