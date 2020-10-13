import { axiosPost, axiosGetAsync } from '@src/utils/HttpUtils';
import * as cscenterTypes from './cscenterTypes';

export const getfaqData = (type, page, pageSize, searchText, isMore = false) => async (dispatch) => {

  let keyType = '';
  switch (Number(type)) {
    case 0:
      keyType = 'all';
      break;
    case 1:
      keyType = '0010';
      break;
    case 2:
      keyType = '0020';
      break;
    case 3:
      keyType = '0030';
      break;
    case 4:
      keyType = '0040';
      break;
    case 5:
      keyType = '0050';
      break;
    case 6:
      keyType = '0060';
      break;
    case 7:
      keyType = '0070';
      break;
     }


  const { data } = await axiosGetAsync(`/api/faqMgnt/selectFaqMgntList.do?inqPageNo=${page}&inqQuesTpcd=${keyType}&pageSize=${pageSize}&searchText=${searchText}`);

  dispatch({
    type: cscenterTypes.GET_FAQ_DATA,
    payload: data,
    isMore: isMore,
    page: page
  });
};

/* 공지사항 검색 이전 get 방식
export const getCscenterNotice = (searchText, currentPageNo, pagePerSize = '10', isMore = false) => async (dispatch) => {
  const { data } = await axiosGetAsync(`/api/bbsMgnt/selectBBSMgntList.do?searchText=${searchText}&inqPageNo=${currentPageNo}&pagePerSize=${pagePerSize}`);

  dispatch({
    type: cscenterTypes.GET_NOTICE_DATA,
    payload: data,
    isMore: isMore
  });
};
*/

export const getCscenterNotice = (searchParam) => async (dispatch) => {

  const {data} =  await axiosPost(`/api/bbsMgnt/selectBBSMgntList.do`, searchParam);

  console.log('search')
  console.log(data);


  dispatch({
    type: cscenterTypes.GET_NOTICE_DATA,
    payload: data
  })

};

export const getCscenterNoticeView = (bbsNttId) => async (dispatch) => {
  const { data } = await axiosGetAsync(`/api/bbsMgnt/selectBBSMgntInfo.do?bbsNttId=${bbsNttId}`);

  dispatch({
    type: cscenterTypes.GET_NOTICE_VIEW,
    payload: data
  });
};

export const getCounselOpt = () => async (dispatch) => {
  const { data } = await axiosGetAsync(`/api/bbsMgnt/getCounselOpt.do`);

  console.log(data);
  dispatch({
    type: cscenterTypes.GET_COUNSEL_OPT,
    payload: data
  });
};
