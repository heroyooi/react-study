/**
 * 설명 : 스마트옥션 출품하기
 * @author 박진하
 */
import { produce } from 'immer';
import _, { orderBy } from 'lodash';
import * as types from '@src/actions/autoAuction/autoAuctionTypes';

const initialState = {
  inputInfo: {
    /* 회원 정보 */
    mbHpPn: '',
    mbHpPn1: '',
    mbHpPn2: '',
    mbHpPn3: '',
    mbTelNo: '',
    telNo1: '',
    telNo2: '',
    telNo3: '',
    bankCd: '',
    accountNo: '',
    accountNm: '',
    tmsCnsn: [],
    auctId: '1100',
    auctNoYmd: '',
    auctDt: '',
    exhiPathClasCd: '', // 출품신청 경로 구분 (PC : 02, Mobile: 04)

    /* 출품대기 차량 등록 정보 */
    ownerNm: '',
    crNo: '',
    crNm: '',
    carCd: '',
    crMnfcCd: '',
    crMdlCd: '',
    crDtlMdlCd: '',
    drvDist: '',
    ownerTypeCd: '',
    floodingYn: '',
    joinYn: '',
    operationYn: '',
    commercialYn: '',
    starPrice: 0,
    hopePrice: 0,
    estimatedPrice: 0,
    cashReceiptCd: '',
    mssDvcd: '',

    /* 탁송 신청 정보 */
    consignCd: '0010',
    consignDt: '',
    consignYmd: '',
    consignHh: '',
    consignMm: '',
    consignChargeNm: '',
    consignHpNo: '',
    consignBizNo: '9999',
    hpPn1: '',
    hpPn2: '',
    hpPn3: '',
    memo: '',
    zipcode: '',
    addr1: '',
    addr2: '',
    locCd: '',
    ctyCd: '',
    actuIdArr: [],
    consignCarNo: []
  },
  nextAuctionInfo: {},
  policyList: [],
  auctionHouseList: [],
  auctionNoList: [],
  mobAuctionNoList: [],
  auctionHouse: {},
  mbInfo: {},
  latestAccountList: [],
  exhibitCarList: [],
  auctionWinningList: [],
  consignment1: [],
  consignment2: [],
  consignment3: [],

  autobellFaqList: [],
  auctionHouseRadio: [],
  bankCdList: [],
  mobBankCdList: [],
  hpPnCdList: [],
  mobHpPnCdList: [],
  telCdList: [],
  mobTelCdList: [],
  ownerTypeCdList: [],
  mobOwnerTypeCdList: [],
  cashReceiptCdList: [],
  mobCashReceiptCdList: [],
  mnfcCdList: [],
  mobMnfcCdList: [],
  consignCdRadio: [],
  mssDvcdList: [],
  mobMssDvcdList: [],
  auctionOngoing: false,
  marketPrice: null,
  noticeList: [],
  noticeCurrentPage: 1,
  noticeTotalCount: 0,
  noticeRecordSize: 10,
  notice: null,
  formatList: [],
  formatCurrentPage: 1,
  formatTotalCount: 0,
  formatRecordSize: 10,
  formatInfo: null
};

/**
 * 설명 : 스마트옥션 출품하기
 * @author 박진하
 * @param {String} action.type
 * @returns {map} state 출품정보를 state에 보관
 */
export default function autoAuctionReducer(state = initialState, action) {
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
          let selectArray = [{ value: '', label: '선택' }];
          data.map((v, i) => {
            if (v.attr1 !== null && v.attr2 !== null) {
              selectArray = [...selectArray, { ...v }];
            }
          });
          draft.bankCdList = selectArray;

          // Mobile용 코드(은행코드)
          const mobBankCdArr = [{ codeValue: '', id: `${cmCdTpId}_select`, label: '선택', value: 1, checked: false }];
          if (draft.bankCdList.length > 0) {
            data.map((el, i) => {
              if (el.attr1 !== null && el.attr2 !== null) {
                mobBankCdArr.push({
                  codeValue: el.value,
                  id: `${cmCdTpId}_${el.cdId}`,
                  label: el.label,
                  value: i + 2,
                  checked: false
                });
              }
            });
          }
          draft.mobBankCdList = mobBankCdArr;
        } else if (cmCdTpId === 'FM005') {
          draft.hpPnCdList = data;

          // Mobile용 코드(휴대폰번호 앞자리)
          const mobHpPnCdArr = [];
          if (draft.hpPnCdList.length > 0) {
            draft.hpPnCdList.map((el, i) => {
              mobHpPnCdArr.push({
                codeValue: el.value,
                id: `${cmCdTpId}_${el.cdId}`,
                label: el.label,
                value: i + 1,
                checked: i === 0 ? true : false
              });
            });
          }
          draft.mobHpPnCdList = mobHpPnCdArr;

          // let selectArray = [];
          // for (const [i, v] of data.entries()) {
          //   selectArray = [...selectArray, { id: v.id, value: v.value, checked: i === 0 ? true : false, title: v.title, label: v.label }];
          // }
          // draft.hpPnCdList = selectArray;
        } else if (cmCdTpId === 'FM014') {
          const arr = [{ value: '', label: '선택' }];
          for (const v of data) {
            arr.push({ value: v.label, label: v.label });
          }
          draft.telCdList = arr;

          // 모바일용 코드 (전화번호 국번)
          const dataList = action.payload.data.data;
          const mobArr = [{ codeValue: '', id: `${cmCdTpId}_select`, label: '선택', value: 1, checked: false }];

          if (dataList.length > 0) {
            dataList.map((el, i) => {
              mobArr.push({
                codeValue: el.label,
                label: el.label,
                id: `${cmCdTpId}_${el.cdId}`,
                value: i + 2,
                checked: false
              });
            });
          }
          draft.mobTelCdList = mobArr;
        } else if (cmCdTpId === 'FM015') {
          let radioArray = [];
          let mobRadioArray = [{ id: `${cmCdTpId}_select`, value: 1, codeValue: '', checked: true, label: '선택' }];
          for (const [i, v] of data.entries()) {
            radioArray = [...radioArray, { id: v.id, value: v.value, checked: i === 0 ? true : false, disabled: false, title: v.title, label: v.label }];
            mobRadioArray = [...mobRadioArray, { id: v.id, value: i + 2, codeValue: v.value, checked: false, label: v.label }];
          }
          draft.ownerTypeCdList = radioArray;
          draft.mobOwnerTypeCdList = mobRadioArray;
        } else if (cmCdTpId === 'FM020') {
          //draft.cashReceiptCdList = [{ value: '', label: '선택' }, ...action.payload.data.data];

          // 모바일용 코드 (현금영수증 발급대상)
          const dataList = action.payload.data.data;
          const mobArr = [{ codeValue: '', id: `${cmCdTpId}_select`, label: '선택', value: 1, checked: true }];

          if (dataList.length > 0) {
            dataList.map((el, i) => {
              mobArr.push({
                codeValue: el.value,
                label: el.label,
                id: `${cmCdTpId}_${el.cdId}`,
                value: i + 2,
                checked: false
              });
            });
          }
          draft.mobCashReceiptCdList = mobArr;
        } else if (cmCdTpId === 'FM017') {
          let radioArray = [];
          for (const [i, v] of data.entries()) {
            radioArray = [...radioArray, { id: v.id, value: v.value, checked: i === 0 ? true : false, disabled: false, title: v.title, label: v.label }];
          }
          draft.consignCdRadio = radioArray;
        } else if (cmCdTpId === 'FM047') {
          // 미션
          let radioArray = [];
          let mobRadioArray = [{ id: `${cmCdTpId}_select`, value: 1, codeValue: '', checked: true, label: '선택' }];
          for (const [i, v] of data.entries()) {
            radioArray = [...radioArray, { id: v.id, value: v.value, checked: i === 0 ? true : false, disabled: false, title: v.title, label: v.label }];
            mobRadioArray = [...mobRadioArray, { id: v.id, value: i + 2, codeValue: v.value, checked: false, label: v.label }];
          }
          draft.mssDvcdList = radioArray;
          draft.mobMssDvcdList = mobRadioArray;
        }
      });
    }

    // 현금영수증 코드 리스트 추가 : 20.04.24  -- 경매시스템용
    case types.GET_CASH_RECEIPT_CODE_LIST: {
      console.log('GET_CASH_RECEIPT_CODE_LIST', action);

      return produce(state, (draft) => {
        const data = action.payload.data.data;

        let selectArray = [{ value: '', label: '선택' }];
        if (data !== undefined) {
          for (const [i, v] of data.entries()) {
            selectArray = [...selectArray, { value: v.value, label: v.label }];
          }
        }
        draft.cashReceiptCdList = selectArray;
      });
    }

    case types.GET_AUCTION_NOTICE_LIST: {
      console.log('GET_AUCTION_NOTICE_LIST', action);

      return produce(state, (draft) => {
        draft.noticeList = action.payload.data.data;
        draft.noticeCurrentPage = action.payload.data.pagingInfo.currentPageNo;
        draft.noticeTotalCount = action.payload.data.pagingInfo.totalRecordCount;
      });
    }

    case types.GET_NOTICE: {
      console.log('GET_NOTICE', action);

      return produce(state, (draft) => {
        draft.notice = action.payload.data.data;
      });
    }

    case types.GET_FORMAT_LIST: {
      console.log('GET_FORMAT_LIST', action);

      return produce(state, (draft) => {
        draft.formatList = action.payload.data.data;
        draft.formatCurrentPage = action.payload.data.pagingInfo.currentPageNo;
        draft.formatTotalCount = action.payload.data.pagingInfo.totalRecordCount;
      });
    }

    case types.GET_FORMAT: {
      console.log('GET_FORMAT', action);

      return produce(state, (draft) => {
        draft.formatInfo = action.payload.data.data;
      });
    }

    case types.GET_AUTOBELL_FAQ_LIST: {
      console.log('GET_AUTOBELL_FAQ_LIST', action);

      return produce(state, (draft) => {
        draft.autobellFaqList = action.payload.data.data;
      });
    }

    case types.GET_POLICY_LIST: {
      console.log('GET_POLICY_LIST', action);

      return produce(state, (draft) => {
        draft.policyList = action.payload;
      });
    }

    case types.GET_AUCTION_HOUSE_LIST: {
      console.log('GET_AUCTION_HOUSE_LIST', action);

      return produce(state, (draft) => {
        const data = action.payload;
        let radioArray = [];
        for (const [i, v] of data.entries()) {
          radioArray = [...radioArray, { id: v.id, value: v.auctId, checked: state.inputInfo.auctId === v.auctId ? true : false, disabled: false, title: v.auctNm.trim(), label: v.auctNm.trim() }];
        }
        draft.auctionHouseRadio = radioArray;
        draft.auctionHouseList = data;
      });
    }

    case types.GET_MEMBER_INFO: {
      console.log('GET_MEMBER_INFO', action);

      return produce(state, (draft) => {
        draft.mbInfo = action.payload;
      });
    }

    case types.SET_MEMBER_INFO: {
      console.log('SET_MEMBER_INFO', action);

      return produce(state, (draft) => {
        const mbInfo = _.cloneDeep(state.mbInfo);
        mbInfo.mbHpPn = action.payload.mbHpPn;
        mbInfo.telNo = action.payload.telNo;
        mbInfo.bankCd = action.payload.bankCd;
        mbInfo.accountNm = action.payload.accountNm;
        mbInfo.accountNo = action.payload.accountNo;
        mbInfo.mbId = action.payload.mbId;
        mbInfo.auctPrstlsNrmlMb = action.payload.auctPrstlsNrmlMb; // 경매 일반회원 ID
        mbInfo.auctPrstlsMb = action.payload.auctPrstlsMb; // 경매 유료회원 ID
        mbInfo.regDt = action.payload.regDt;
        mbInfo.rgstId = action.payload.rgstId;
        mbInfo.updDt = action.payload.updDt;
        mbInfo.updtId = action.payload.updtId;

        draft.mbInfo = mbInfo;
      });
    }

    case types.GET_AUCTION_HOUSE_INFO: {
      console.log('GET_AUCTION_HOUSE_INFO', action);

      return produce(state, (draft) => {
        draft.auctionHouse = action.payload.data.data;
      });
    }

    case types.GET_AUCTION_NO_LIST: {
      console.log('GET_AUCTION_NO_LIST', action);

      return produce(state, (draft) => {
        const data = action.payload.data.data;
        const auctNoArr = []; // PC
        const mobAuctNoArr = [{ codeValue: '', id: 'auctNo_select', label: '선택', value: 1, checked: false }]; // Mobile

        if (data.length > 0) {
          data.map((auct, i) => {
            auctNoArr.push({ value: auct.auctNoYmd, label: auct.auctNoYmd });
            mobAuctNoArr.push({
              codeValue: auct.auctNoYmd,
              label: auct.auctNoYmd,
              id: `auctNo_${auct.auctNo}`,
              value: i + 2,
              checked: false
            });
          });
        }
        draft.auctionNoList = auctNoArr;
        draft.mobAuctionNoList = mobAuctNoArr;
      });
    }

    case types.GET_LATEST_ACCOUNT_LIST: {
      console.log('GET_LATEST_ACCOUNT_LIST', action);

      return produce(state, (draft) => {
        draft.latestAccountList = action.payload;
      });
    }

    case types.GET_MNFC_CD_LIST: {
      console.log('GET_MNFC_CD_LIST', action);

      return produce(state, (draft) => {
        const mnfcList = [{ value: '', label: '선택' }];
        const mobMnfcList = [{ codeValue: '', id: 'crMnfcCd_1', label: '선택', value: 1, checked: true }]; // Mobile
        action.payload.data.data.map((list, i) => {
          mnfcList.push({ value: list.id, label: list.name });
          mobMnfcList.push({ codeValue: list.id, id: `crMnfcCd_${i + 2}`, label: list.name, value: i + 2, checked: false });
        });
        draft.mnfcCdList = mnfcList;
        draft.mobMnfcCdList = mobMnfcList;
      });
    }

    case types.GET_EXHIBIT_CAR_LIST: {
      console.log('GET_EXHIBIT_CAR_LIST', action);

      return produce(state, (draft) => {
        draft.exhibitCarList = action.payload.data.data;
      });
    }

    case types.SET_EXHIBIT_CAR: {
      console.log('SET_EXHIBIT_CAR', action);

      return produce(state, (draft) => {
        const exhibitCarList = _.filter(state.exhibitCarList, ['delYn', 'N']);
        action.payload.actuId = _.maxBy(exhibitCarList, 'actuId').actuId + 1;
        draft.exhibitCarList = _.concat(state.exhibitCarList, action.payload);
      });
    }

    case types.GET_WINNING_BID_LIST: {
      console.log('GET_WINNING_BID_LIST', action);

      return produce(state, (draft) => {
        draft.auctionWinningList = action.payload;
      });
    }

    case types.GET_CONSIGMENT_FEE_LIST: {
      console.log('GET_CONSIGMENT_FEE_LIST', action);

      return produce(state, (draft) => {
        const data = action.payload.data.data;
        const consignment1 = [];
        const consignment2 = [];
        const consignment3 = [];
        data.map((consign) => {
          if (consign.auctRoomCd === '1100') {
            consignment1.push(consign);
          } else if (consign.auctRoomCd === '2100') {
            consignment2.push(consign);
          } else if (consign.auctRoomCd === '3100') {
            consignment3.push(consign);
          }
        });

        draft.consignment1 = consignment1;
        draft.consignment2 = consignment2;
        draft.consignment3 = consignment3;
      });
    }

    case types.SET_AUCTION_ONGOING: {
      console.log('SET_AUCTION_ONGOING', action.payload);

      return produce(state, (draft) => {
        draft.auctionOngoing = action.payload;
      });
    }

    case types.GET_NEXT_AUCTION_INFO: {
      console.log('GET_NEXT_AUCTION_INFO', action);

      return produce(state, (draft) => {
        draft.nextAuctionInfo = action.payload.data.data;
      });
    }

    case types.GET_MARKET_PRICE: {
      console.log('GET_MARKET_PRICE', action);

      return produce(state, (draft) => {
        draft.marketPrice = action.payload;
      });
    }

    default:
      return state;
  }
}
