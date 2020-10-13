/**
 * 설명 :마이페이지(개인) 내차사기 > 홈서비스 내역 리듀서
 * @author 한관영
 */
import { produce } from 'immer';
import { types } from '@src/actions/mypage/personal/buycar/homeService/homeServiceAction';

const initialState = {
  homeServiceTotalCnt: 0,
  homeServiceList: [
    {
      hsvcId: '',
      mbId: '',
      carPhotoURL: '',
      carNm: '',
      carNo: '',
      carFuelNm: '',
      firstRegDt: '',
      drvDist: 0,
      carTypeNm: '',
      mssNm: '',
      carAmt: 0,
      reqDt: '',
      sttDvcd: '',
      sttNm: '',
      cnclSttNm: '',
      dlrNm: '',
      dlrHpno: '',
      entrCorpNm: ''
    }
  ],
  homeServiceDetail: {
    hsvcId: '',
    mbId: '',
    sttDvcd: '', //   홈서비스신청상태 코드 AM061[신청완료:0010, 결제대기중:0020, 배송 준비중:0030, 배송중:0040, 배송완료:0050]
    sttNm: '',
    cnclSttDvcd: null, //   홈서비스신청상태 코드 AM061[취소신청:0810, 취소완료:0820, 환불진행중:0910, 환불완료:0920]
    cnclSttNm: '',
    athMthdDvcd: '', // 결제방식 구분 코드
    athMthdNm: '', // 결제방식 구분 명
    crAmt: 0, //      차량 금액
    rdpmMgmtAmt: 0, // 이전 관리 금액
    atbWrntAmt: 0, //  오토벨 보증 금액
    deliAmt: 0, //     배송 금액
    hsvcUseAmt: 0, // 홈서비스 사용 금액
    // totalAmt: 11300000, // 총 금액( TODO: 홈서비스 사용금액과 동일한지 확인필요)
    rcpsBankNm: '', //          예금은행
    rcpsDpstNm: '', // 예금주명
    rcpsAcntNoEnc: '', // 예금계좌
    nom: '',
    hpNoEnc: '', // 명의자 전화번호
    addr: '', // 회원 기본주소
    bankNm: '', //    환불 은행 명
    dpstNm: '', // 환불예금주명
    acntNoEnc: '', //  환불계좌번호
    destAddr: '', // 배송지 전체주소
    addr1: '', // 배송지 주소1
    addr2: '', // 배송지 주소1
    zcd: '', // 배송지 우편번호
    reciNm: '', //        수령인명
    reciHpPnEnc: '', // 배송지 연락처
    email: '',
    insuBillFileId: '', // 보험증서파일 id
    cnsgStatCd: '' //   탁송상태코드 AM068[전체:0010, 입금:0020, 배차:0030, 완료:0040, 취소:0050]
  },
  addrData: {
    hsvcId: '',
    reciNm: '',
    zcd: '',
    addr1: '',
    addr2: '',
    pn1: '',
    pn2: '',
    pn3: ''
  },
  receiptData: {
    hsvcId: null, // 홈서비스 ID
    payNum: null, // 결제번호
    payDt: null, // 결제일
    prdNm: null, // 결제내용
    payAmt: null, // 결제금액
    athMthdNm: null, // 결재수단
    rcptType: null, // 영수증 타입
    cshrYn: null, // 현금영수증 발급 여부
    txivPblcYn: null, // 세급계산서 발급 여부
    cashReceiptPblcUse: null, // 현금영수증발행용도
    taxNo: null // 발급번호
  },
  homeServiceMobileDetail: {
    hsvcId: '',
    mbId: '',
    sttDvcd: '', //   홈서비스신청상태 코드 AM061[신청완료:0010, 결제대기중:0020, 배송 준비중:0030, 배송중:0040, 배송완료:0050]
    sttNm: '',
    cnclSttDvcd: null, //   홈서비스신청상태 코드 AM061[취소신청:0810, 취소완료:0820, 환불진행중:0910, 환불완료:0920]
    cnclSttNm: '',
    crAmt: 0, //      차량 금액
    rdpmMgmtAmt: 0, // 이전 관리 금액
    atbWrntAmt: 0, //  오토벨 보증 금액
    deliAmt: 0, //     배송 금액
    hsvcUseAmt: 0, // 홈서비스 사용 금액
    // totalAmt: 11300000, // 총 금액( TODO: 홈서비스 사용금액과 동일한지 확인필요)
    athMthdNm: '', //               결제방식
    rcpsBankNm: '', //          예금은행
    rcpsDpstNm: '', // 예금주명
    rcpsAcntNoEnc: '', // 예금계좌
    nom: '',
    hpNoEnc: '', // 명의자 전화번호
    addr: '', // 회원 기본주소
    bankNm: '', //    환불 은행 명
    dpstNm: '', // 환불예금주명
    acntNoEnc: '', //  환불계좌번호
    destAddr: '', // 배송지 전체주소
    addr1: '', // 배송지 주소1
    addr2: '', // 배송지 주소1
    zcd: '', // 배송지 우편번호
    reciNm: '', //        수령인명
    reciHpPnEnc: '', // 배송지 연락처
    email: '',
    insuBillFileId: '', // 보험증서파일 id
    cnsgStatCd: '', //   탁송상태코드 AM068[전체:0010, 입금:0020, 배차:0030, 완료:0040, 취소:0050]
    insuBillFileNm: '',
    fileNm: '',
    carPhotoUrl: '',
    carNo: '',
    firstRegDt: '',
    drvDist: '',
    mssNm: '',
    carFuelNm: '',
    carAmt: 0,
    dlrHpno: '',
    dlrNm: '',
    entrCorpNm: '',
    reqDt: ''
  },
  isLoadingImage: false,
  isListLoading: false
};

/** ##################################### 미완성 #######################################
 * 설명 : 마이페이지(개인) 내차사기 > 홈서비스 내역 리듀서
 * @author 한관영
 * @param {String} action.type
 * @returns {map} state 홈서비스 내역 정보를 state에 보관
 */
export default function homeServiceReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_HSVC_LIST: {
      return produce(state, (draft) => {
        draft.homeServiceList = action.payload;
        draft.homeServiceTotalCnt = action.totalCnt;
        draft.isLoadingImage = false;
        draft.isListLoading = true;
      });
    }
    case types.GET_HSVC_DETAIL: {
      return produce(state, (draft) => {
        draft.homeServiceDetail = action.payload;
        draft.addrData = action.addrData;
      });
    }
    case types.CHANGE_SHIPPING_ADDRESS: {
      console.log('CHANGE_SHIPPING_ADDRESS:', action);
      return produce(state, (draft) => {
        // draft.messageCarList = action.payload;
      });
    }
    case types.REQUEST_RECEIPT: {
      console.log('REQUEST_RECEIPT:', action);
      return produce(state, (draft) => {
        // draft.lastViewList = action.payload;
      });
    }
    // case types.CANCEL_PURCHASE: {
    //   console.log('CANCEL_PURCHASE:', action);
    //   return produce(state, (draft) => {
    //     // draft.messageCarList = action.payload;
    //   });
    // }
    case types.HOME_SERVICE_MOBILE_DETAIL: {
      console.log('HOME_SERVICE_MOBILE_DETAIL: ', action);
      return produce(state, (draft) => {
        draft.homeServiceMobileDetail = action.payload;
        draft.addrData = action.addrData;
      });
    }
    case types.SET_LIST_LOADING_MOBILE: {
      return produce(state, (draft) => {
        draft.isListLoading = action.payload;
      });
    }
    case types.SET_LOADING_IMAGE_MOBILE: {
      return produce(state, (draft) => {
        draft.isLoadingImage = action.payload;
      });
    }

    default:
      return state;
  }
}
