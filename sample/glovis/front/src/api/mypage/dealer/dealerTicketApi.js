/**
 * @author 최승희
 */
import { axiosGet, axiosPost, axiosDelete, aixosUpFile } from '@src/utils/HttpUtils';
import qs from 'qs';

const BASE = '/api/mypage/dealer/';
// const BASE = 'http://10.25.44.131:8080/api/mypage/dealer/';
const INSERT_DEALER_PROD = BASE + 'insertDealerProd.do';
const SELECT_UPDATE_PASS_TIME_INFO = BASE + 'selectUpdatePassTimeInfo.do'
const SELECT_MY_UPDATE_TICKET_LIST = BASE + 'selectMyUpdateTicketList.do'
const SELECT_UPDATE_BOX_LIST = BASE + 'selectUpdateBoxList.do'

const INSERT_UPDATE_BOX = BASE + 'insertUpdateBox.do';
const UPDATE_BOX_INFO = BASE + 'updateBoxInfo.do';
const DELETE_UPDATE_BOX = BASE + 'deleteUpdateBoxTime.do';
const INSERT_UPDATE_PASS_TIME = BASE + 'insertUpdatePassTime.do';

// const selectMyUpdateTicketList = () => axiosGet(SELECT_MY_UPDATE_TICKET_LIST)
export const selectMyUpdateTicketList = (dlrPrdId) => axiosGet(SELECT_UPDATE_PASS_TIME_INFO + '?' + qs.stringify({dlrPrdId}))

export const selectUpdateBoxList = () => axiosGet(SELECT_UPDATE_BOX_LIST)

export const insertUpdateBox = (params) => axiosPost(INSERT_UPDATE_BOX, params)

export const updateMyUpdateTicketLocker = (params) => axiosPost(UPDATE_BOX_INFO, params)

export const deleteMyUpdateTicketLocker = (params) => axiosPost(DELETE_UPDATE_BOX, params)

export const insertUpdatePassTime = (params) => axiosPost(INSERT_UPDATE_PASS_TIME, params)
