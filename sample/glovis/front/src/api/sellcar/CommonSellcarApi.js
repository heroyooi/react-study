/**
 * @author 김민철
 */
import { aixosUpFile, axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { API_SERVER } from '../config';

const BASE = `${API_SERVER}/sellcar/common`;
const UPLOAD_CARPHOTO = BASE + '/uploadCarphoto.do';
const FAQ_LIST = API_SERVER + '/admin/cs/faq/selectFaqList.do';

/**
 * 차량 이미지 업로드
 * @param {
 *  slReqId,          // 신청서 아이디 필수
 *  sortNo
 *  files,
 * } params kr.co.autobell.common.sellcar.vo.CarMstVO
 */
const uploadCarPhoto = (formData) => {
  return aixosUpFile(UPLOAD_CARPHOTO, formData);
};

/**
 * 회원의 변경된 휴대전화번호가져오기
 */
const getHpPn = (params) => {
  console.log("getHpPn",params);
  return axiosPost(`${BASE}/findHpPn.do`, JSON.stringify(params));
};

/**
 * 내차 팔기 메인 하단 - 자주 묻는 질문 데이터 가져오기
 * {"pageNo " : 1, "tabNo": 2}
      {label:'전체', value: '0'},
      {label:'내 차 사기', value:'1'},
      {label:'내 차 팔기', value:'2'},
      {label:'회원', value:'3'},
      {label:'결제', value:'4'},
      {label:'금융', value:'5'},
      {label:'EW', value:'6'},
      {label:'자주찾는 질문', value:'7'}
 */
const getSellCarFaqList = (params) => {
  return axiosPost(FAQ_LIST, params);
};

/**
 * 내차팔기 조회 등록자 <-> 로그인 일치 체크
 */
const validReqIdAndRgstIdCheck = (params) => {
  return axiosPost(`${BASE}/validSlReqIdAndRgstIdCheck.do`, JSON.stringify(params));
};

/**
 * 내차팔기 차량 등록 사진 삭제 _ crID, sortNoList
 */
const deleteCarPhotos = (params) => {
  console.warn(params);
  return axiosPost(`${BASE}/deleteCarPhotos.do`, JSON.stringify(params));
};

export { uploadCarPhoto, getHpPn, getSellCarFaqList, validReqIdAndRgstIdCheck, deleteCarPhotos };
