import { axiosGet } from '@src/utils/HttpUtils';
import mapper from '../mapper';

export const types = {
  GET_CARS_AUCTION: 'buycar/auction/buyCarList/GET_CARS_AUCTION',
  TOGGLE_INTEREST: 'buycar/auction/buyCarList/TOGGLE_INTEREST'
};

export const getCarListAuction = (itemMaxPerPage) => async (dispatch) => {
  // const { data } = await axiosGet(`/mock/buycar/carListAutobell.json`);
  // dispatch({
  //   type: types.GET_CARS_AUCTION,
  //   payload: data.filter((car, i) => i < itemMaxPerPage) || null
  // });
  await axiosGet(`/mock/buycar/sampleList.json`, null).then((res) => {
    dispatch({
      type: types.GET_CARS_AUCTION,
      //TODO : api 파라미터 적용 되면 filter 삭제
      // payload: res?.data?.data?.prdLst || []
      payload: res?.data?.data?.prdLst.filter((car, i) => i < itemMaxPerPage) || null
    });
  });
};

export const toggleItrt = (listName, carId) => async (dispatch) => {
  // API를 통해 숫자를 증감할 것
  // api update 이후 useRef 에 저장한 목록길이만큼 다시 조회하거나 조회생략
  dispatch({
    type: types.TOGGLE_INTEREST,
    payload: { listName, carId }
  });
};
