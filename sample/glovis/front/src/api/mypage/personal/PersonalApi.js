/**
 * @author 최승희
 */
import { axiosGet, } from '@src/utils/HttpUtils';
import qs from 'qs';

const BASE = '/api/mypage/user/';
const SELECT_PERSONAL_MAIN_INIT = BASE + 'selectPersonalMainInit.do';
const SELECT_LASTEST_VIEW_CAR = BASE + 'selectLastestViewCar.do';

export const selectPersonalMainInit = () => axiosGet(SELECT_PERSONAL_MAIN_INIT)
export const selectLastestViewCar = () => axiosGet(SELECT_LASTEST_VIEW_CAR)

