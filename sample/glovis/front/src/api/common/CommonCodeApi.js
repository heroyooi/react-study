/**
 * @author 최승희
 */
import qs from 'qs';
import { axiosGet } from '@src/utils/HttpUtils';
import { API_SERVER } from '../config';

// const SERVER = 'http://10.25.44.131:8080/api/commonCode/';
const BASE = `/api/commonCode/`;
const BASE_ENUM = `${API_SERVER}/commonCodeEnum/`;
const SELECT_COMMON_CODE_LIST = BASE + 'selectCommonCodeList.do';
const SELECT_COMMON_CODE_ENUM_LIST = BASE_ENUM + 'selectList.do';

export const selectCommonCodeList = (cmCdTpId) => axiosGet(SELECT_COMMON_CODE_LIST + '?' + qs.stringify({ cmCdTpId }));
export const selectCommonCodeEnumList = (cmCdTpId) => axiosGet(SELECT_COMMON_CODE_ENUM_LIST + '?' + qs.stringify({ cmCdTpId }));

//변속기 : BS015 -> FM047
//연료 : BS016 -> FM048
