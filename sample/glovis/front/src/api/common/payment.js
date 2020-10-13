/**
 * @author 최승희
 */
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import qs from 'qs';

const BASE = '/api/common/pay/';

const INI_STD_PAY_CANCEL_REQUEST = BASE + 'INIStdPayCancelRequest.do';

export const INIStdPayCancelRequest = (params) => axiosPost(INI_STD_PAY_CANCEL_REQUEST, params)

