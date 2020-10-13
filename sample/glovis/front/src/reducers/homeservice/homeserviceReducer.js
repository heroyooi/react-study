/**
 * 설명 : 홈서비스 필터 조회
 * @fileoverview Component - 홈서비스 필터 조회 리듀서
 * @requires [homeserviceTypes]
 * @author 김지훈
 */
import { produce } from 'immer';
import { isUndefined, orderBy } from 'lodash';
import * as types from '@src/actions/homeservice/homeserviceTypes';
const initialState = {
  inputInfo: {
    /*  */
    hpPn1_1: '',
    hpPn1_2: '',
    hpPn1_3: '',
    hpPn2_1: '',
    hpPn2_2: '',
    hpPn2_3: '',
    brn1_1: '',
    brn1_2: '',
    brn1_3: '',
    brn2_1: '',
    brn2_2: '',
    brn2_3: '',
    corpRegNo1: '',
    corpRegNo2: '',
    /*  */

    /* 홈서비스 결제 상세 정보 Start*/
    athMthdDvcd: '', // 결제 방식 구분코드 (0010: 할부, 0020: 계좌이체, 0030: 할부+계좌이체)
    rdpmMgmtAmt: 0, // 이전 관리 금액 (취등록세 + 이전대행료 + 차량관리비)
    atbWrntAmt: 0, // 오토벨 보증 금액 (EW 상품 금액)
    deliAmt: 0, // 배송금액
    hsvcUseAmt: 0, // 홈서비스 사용 금액 (총 비용)
    regAcqAmt: 0, // 취등록세
    crMgmtAmt: 0, // 차량관리비
    rdpmAgcyFeeAmt: 0, // 이전대행료
    installAmt: 0, // 할부금액
    trnsAmt: 0, // 계좌이체금액
    crAmt: 0, // 차량 금액
    inputAmt: 0,
    /* 홈서비스 결제 상세 정보 End*/

    /* 계약자 정보 Start */
    // 계약자 1 (메인 명의자 정보)
    cntrctrTp1: '', // 계약자1 유형 (0010: 개인, 0020: 개인사업자, 0030: 법인사업자)
    shrNomYn: 'N', // 공동명의 여부
    nom1: '', // 명의자1 명
    hpNoEnc1: '', // 명의자1 휴대폰번호
    zcd1: '', // 명의자1 우편번호
    addr1: '', // 명의자1 주소
    addr2: '', // 명의자1 상세주소
    locCd: '', // 지역코드
    ctyCd: '', // 도시코드
    bankDvcd: '', // 명의자1 은행 구분코드
    acntNoEnc: '', // 명의자1 계좌번호
    dpstNm: '', // 명의자1 예금주 명
    plbzNm1: '', // 명의자1 사업장 명
    brn1: '', // 명의자1 사업자등록번호
    plbzAddrZcd1: '', // 명의자1 사업장 우편번호
    plbzAddr1: '', // 명의자1 사업장 주소
    plbzAddr2: '', // 명의자1 사업장 상세주소
    plbzLocCd1: '',
    plbzCtyCd1: '',
    corpRegNo: '', // 명의자1 법인 등록 번호
    corpNm: '', // 명의자1 법인 명
    corpZcd: '', // 명의자1 법인 우편번호
    corpAddr1: '', // 명의자1 법인 주소
    corpAddr2: '', // 명의자1 법인 상세주소
    corpLocCd: '',
    corpCtyCd: '',
    txivPblcYn: '', // 세금계산서 발행 여부

    // 계약자 2 (공동 명의자 정보)
    cntrctrTp2: '', // 계약자2 유형 (0010: 개인, 0020: 개인사업자)
    nom2: '', // 명의자2 명
    hpNoEnc2: '', // 명의자2 휴대폰번호
    zcd2: '', // 명의자2 우편번호
    addrSec1: '', // 명의자2 주소
    addrSec2: '', // 명의자2 상세주소
    locCd2: '',
    ctyCd2: '',
    plbzNm2: '', // 명의자2 사업장 명
    brn2: '', // 명의자2 사업자등록번호
    plbzAddrZcd2: '', // 명의자2 사업장 우편번호
    plbzAddrSec1: '', // 명의자2 사업장 주소
    plbzAddrSec2: '', // 명의자2 사업장 상세주소
    plbzLocCd2: '',
    plbzCtyCd2: '',
    /* 계약자 정보 End */

    /* 배송지 */
    arvZcd: '', // 우편번호
    arvAddr1: '', // 주소
    arvAddr2: '', // 상세주소
    arvLocCd: '', // 지역코드
    arvCtyCd: '', // 도시코드

    atbWrntNo: '', // EW 일련번호
    tmsCnsn: [], // 약관 동의 목록 ({tmsCd: value, cnsnYn: 'Y,N'})
    emlAddr: '', // email주소
    cntrSignTpcd: '0010', // 계약 서명 유형코드
    dlrPrdId: ''
  },
  contCdList: [],
  bankCdList: [],
  hpPnCdList: [],
  txivPblcList: [],
  paymentList: [],
  policyList: [],
  ewList: [],
  carInfo: null,
  perfomence: null,
  carHistory: null,
  autobellInsp: null,
  mbInfo: null,
  hsvcReqInfo: {},
  transRate: {
    regRt: 0,
    acqRt: 0,
    pbndBygRt: 0,
    pbndBygCost: 0
  },
  faqList: [],
  nation: [],
  option: [],
  dataProvider: [],
  local: [],
  carList: [],
  homeServiceOnGoing: false
};

/**
 * 설명 : 홈서비스 필터 조회
 * @author 김지훈
 * @returns {map} 필터 데이터 보관
 */
export default function homeServiceReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_INPUT_INFO: {
      console.log('SET_INPUT_INFO', action);

      return produce(state, (draft) => {
        draft.inputInfo = action.payload;
      });
    }

    case types.GET_COMMON_CODE_LIST: {
      console.log('GET_COMMON_CODE_LIST', action);

      return produce(state, (draft) => {
        const cmCdTpId = action.payload.data.cmCdTpId;
        const data = orderBy(action.payload.data.data, ['cdId'], ['ASC']);
        if (cmCdTpId === 'FM053') {
          draft.bankCdList = [{ value: '', label: '선택' }, ...data];
        } else if (cmCdTpId === 'FM005') {
          draft.hpPnCdList = data;
        } else if (cmCdTpId === 'AM065') {
          let radioArray = [];
          for (const [i, v] of data.entries()) {
            radioArray = [...radioArray, { id: v.id, value: v.value, checked: i === 0 ? true : false, disabled: false, title: v.title, label: v.label }];
          }
          draft.contCdList = radioArray;
        } else if (cmCdTpId === 'FM020') {
          let radioArray = [];
          for (const [i, v] of data.entries()) {
            radioArray = [...radioArray, { id: v.id, value: v.value, checked: i === 0 ? true : false, disabled: false, title: v.title, label: v.label }];
          }
          draft.txivPblcList = radioArray;
        } else if (cmCdTpId === 'AM062') {
          let radioArray = [];
          for (const [i, v] of data.entries()) {
            radioArray = [...radioArray, { id: v.id, value: v.value, checked: i === 0 ? true : false, disabled: false, title: v.title, label: v.label }];
          }
          draft.paymentList = radioArray;
        }
      });
    }

    case types.GET_POLICY: {
      console.log('GET_POLICY', action);

      return produce(state, (draft) => {
        draft.policyList = action.payload.data.data;
      });
    }

    case types.GET_EW_LIST: {
      console.log('GET_EW_LIST', action);

      return produce(state, (draft) => {
        const ew = action.payload.data.data;
        let radioArray = [];
        for (const [i, v] of ew.entries()) {
          radioArray = [
            ...radioArray,
            {
              id: v.id,
              value: String(v.seqNo),
              checked: i === 0 ? true : false,
              disabled: false,
              title: v.dtlPrdNm,
              basicPrc: v.basicPrc,
              wrntDist: v.wrntDist,
              wrntMnthCd: v.wrntMnthCd,
              wrntMnthNm: v.wrntMnthNm,
              label: v.dtlPrdNm
            }
          ];
        }
        radioArray = [...radioArray, { id: 'radio_99', title: '보증없음', value: '99', basicPrc: 0, theOther: '현대 오토벨의 보증서비스가', theOther2: '적용되지 않습니다.', label: '보증없음' }];
        draft.ewList = radioArray;
      });
    }

    case types.GET_CAR_INFO: {
      console.log('GET_CAR_INFO', action);

      return produce(state, (draft) => {
        draft.carInfo = action.payload.data.data;
      });
    }

    case types.GET_PERFOMENCE: {
      console.log('GET_PERFOMENCE', action);

      return produce(state, (draft) => {
        if (action.payload.data.data !== null) {
          draft.perfomence = action.payload.data.data;
        } else {
          draft.perfomence = null;
        }
      });
    }

    case types.GET_CAR_HISTORY: {
      console.log('GET_CAR_HISTORY', action);

      return produce(state, (draft) => {
        console.log('action.payload.data >>>>>>', action.payload.data);

        if (action.payload.data.data !== null) {
          if (action.payload.data.data.code === '000') {
            draft.carHistory = action.payload.data.data;
          }
        } else {
          draft.carHistory = null;
        }
      });
    }

    case types.GET_AUTOBELL_INSPECTION: {
      console.log('GET_AUTOBELL_INSPECTION', action);

      return produce(state, (draft) => {
        if (action.payload.data.data !== null) {
          draft.autobellInsp = action.payload.data.data;
        } else {
          draft.autobellInsp = null;
        }
      });
    }

    case types.GET_MEMBER_INFO: {
      console.log('GET_MEMBER_INFO', action);

      return produce(state, (draft) => {
        draft.mbInfo = action.payload.data.data;
      });
    }

    case types.GET_CONSIGN_FEE: {
      console.log('GET_CONSIGN_FEE', action);
      return produce(state, (draft) => {
        if (action.payload.data.data !== null) {
          if (isUndefined(action.payload.data.data)) {
            console.log('GET_CONSIGN_FEE data undefined 0 setting');
            draft.inputInfo.deliAmt = 0;
          } else {
            draft.inputInfo.deliAmt = action.payload.data.data;
          }
        }
      });
    }

    case types.GET_TRANS_FEE: {
      console.log('GET_TRANS_FEE', action);

      return produce(state, (draft) => {
        draft.inputInfo.crMgmtAmt = action.payload.crMgmtAmt;
        draft.inputInfo.rdpmAgcyFeeAmt = action.payload.rdpmAgcyFeeAmt;
      });
    }

    case types.GET_TRANS_RATE: {
      console.log('GET_TRANS_RATE', action);

      return produce(state, (draft) => {
        draft.transRate = action.payload.data.data;
      });
    }

    case types.GET_HSVC_REQ_INFO: {
      console.log('GET_HSVC_REQ_INFO', action);

      return produce(state, (draft) => {
        draft.hsvcReqInfo = action.payload.data.data;
      });
    }

    case types.GET_FILTER_LABEL: {
      console.log('GET_FILTER_LABEL', action);

      return produce(state, (draft) => {
        draft.nation = action.payload.nation;
        draft.option = action.payload.option;
        draft.dataProvider = action.payload.dataProvider;
        draft.local = action.payload.local;
      });
    }

    case types.CAR_LIST: {
      return produce(state, (draft) => {
        draft.carList = action.payload;
      });
    }

    case types.SET_HOME_ONGOING: {
      return produce(state, (draft) => {
        draft.homeServiceOnGoing = action.payload;
      });
    }

    case types.HOME_REQ_DATA: {
      console.log('HOME_REQ_DATA', action);

      return produce(state, (draft) => {
        draft.faqList = action.payload.data.data;
      });
    }

    default:
      return state;
  }
}
