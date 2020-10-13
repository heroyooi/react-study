/**
 * @author 최승희
 */
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import qs from 'qs';

const BASE = '/api/member/';

const SELECT_MB_INFO = BASE + 'selectMbInfo.do';
const SELECT_MB_BY_ENTR_LIST = BASE + 'selectMbByEntrList.do';

export const selectMbInfo = () => axiosGet(SELECT_MB_INFO)
export const selectMbByEntrList = (params) => axiosPost(SELECT_MB_BY_ENTR_LIST, params)

