import { produce } from 'immer';
import { orderBy } from 'lodash';
import sellCarTypes from '@src/actions/sellcar/sellCarTypes';

const initialCarState = {
  car: {
    optionList: [],
    photoList: []
  },
  seller: {},
  visitDetail: {},
  cmprEstm: {},
  saleMethod: {},
  reqList: [],
  collectAgree: false,
  provideAgree: false,
  marketingAgree: false,
  selfAgree: false,
  nonevalAgree1: false,
  nonevalAgree2: false,
  callback: {},
  sellFaqList: [],
  sellMobileOptionCode: [],
  mobBankCdList: [],
  carHistory: {
    authorized: false,
    hashCode: undefined,
    crNo: undefined
  },
  carSise: {
    crNo: undefined,
    tsKey: undefined,
    seriesno: undefined,
    type: 'none'
  },
  userInfo: {
    name: undefined,
    phonenumber: undefined
  },
  nonevalCnsgInfo: null,
  nonevalCnclCnsgInfo: null
};

export default function sellCarReducer(store = initialCarState, action) {
  switch (action.type) {
    case sellCarTypes.INIT_REQ_LIST: {
      return produce(store, (draft) => {
        console.log('sellCarTypes.INIT_REQ_LIST reducer', action.payload);
        draft.reqList = action.payload;
      });
    }
    case sellCarTypes.INPUT_REQ_LIST_PROP: {
      return produce(store, (draft) => {
        console.log('INPUT_REQ_LIST_PROP reducer', action.payload);
        const { slReqId, prop, value } = action.payload;
        for (let idx in store.reqList) {
          if (store.reqList[idx].slReqId === slReqId) {
            draft.reqList[idx][prop] = value;
            break;
          }
        }
      });
    }
    case sellCarTypes.INPUT_REQ_LIST_PROP_OBJ: {
      return produce(store, (draft) => {
        // console.log('sellCarTypes.INPUT_REQ_LIST_PROP reducer', action.payload);
        const { slReqId, obj } = action.payload;

        for (let idx in store.reqList) {
          if (store.reqList[idx].slReqId === slReqId) {
            for (let [key, value] of Object.entries(obj)) {
              // console.log('INPUT_REQ_LIST_PROP findandChange reducer', action.payload);
              draft.reqList[idx][key] = value;
            }
            break;
          }
        }
      });
    }
    case sellCarTypes.INIT_CAR_STATE:
      // console.log('car::','sellCarTypes.INIT_CAR_STATE', action.payload);
      return produce(store, (draft) => {
        const {
          car = {
            optionList: [],
            photoList: []
          },
          seller = {},
          collectAgree = false,
          provideAgree = false,
          marketingAgree = false,
          selfAgree = false,
          nonevalAgree1 = false,
          nonevalAgree2 = false
        } = action.payload;

        console.log('cmprEstm::', seller.cmprEstm);

        draft.car = car;
        draft.seller = seller;
        draft.cmprEstm = seller.cmprEstm ? seller.cmprEstm : {};
        draft.saleMethod = seller.saleMethod ? seller.saleMethod : {};
        draft.collectAgree = collectAgree;
        draft.provideAgree = provideAgree;
        draft.marketingAgree = marketingAgree;
        draft.selfAgree = selfAgree;
        draft.nonevalAgree1 = nonevalAgree1;
        draft.nonevalAgree2 = nonevalAgree2;
      });

    case sellCarTypes.INIT_VISIT_DETAIL:
      return produce(store, (draft) => {
        draft.visitDetail = action.payload;
      });

    case sellCarTypes.INPUT_STATE:
      return produce(store, (draft) => {
        const { state, value } = action.payload;
        console.log('sellCarTypes.INPUT_STATE', state, value);
        if (![state, value].some((item) => item === undefined)) {
          draft[state] = value;
        }
      });

    case sellCarTypes.INPUT_PROP:
      return produce(store, (draft) => {
        const { state, value, prop } = action.payload;
        console.log('INPUT_PROP', action.payload);
        if (![state, prop, value].some((item) => item === undefined)) {
          draft[state][prop] = value;
        }
      });
    case sellCarTypes.INPUT_PROP_OBJ: {
      return produce(store, (draft) => {
        const { state, obj } = action.payload;
        console.log('INPUT_PROP', action.payload);
        for (let [key, value] of Object.entries(obj)) {
          draft[state][key] = value;
        }
      });
    }
    case sellCarTypes.PUSH_OBJECT:
      return produce(store, (draft) => {
        const { state, value, prop } = action.payload;
        if (![state, value, prop].some((item) => item === undefined)) {
          draft[state][prop].push(value);
        }
      });

    case sellCarTypes.REMOVE_OBJECT_BY_KEY:
      return produce(store, (draft) => {
        const { state, value, prop, key } = action.payload;
        if (![state, value, prop, key].some((item) => item === undefined)) {
          draft[state][prop] = draft[state][prop].reduce((newArray, draftState) => {
            if (draftState[key] !== value) newArray.push(draftState);
            return newArray;
          }, []);
        }
      });

    case sellCarTypes.REPLACE_OBJECT_BY_KEY:
      return produce(store, (draft) => {
        const { state, value, prop, key } = action.payload;
        if (![state, value, prop, key].some((item) => item === undefined)) {
          draft[state][prop] = draft[state][prop].reduce((newArray, draftState) => {
            if (draftState[key] !== value[key]) newArray.push(draftState);
            return newArray;
          }, []);
          draft[state][prop].push(value);
        }
      });

    case sellCarTypes.GET_SELLCAR_FAQ_LIST:
      return produce(store, (draft) => {
        const { statusinfo, data } = action.payload.data;
        let _rtnData = [];
        if (statusinfo?.returncd === 'SUCCESS') {
          _rtnData = data;
        }
        console.table(_rtnData);
        draft.sellFaqList = _rtnData;
      });

    case sellCarTypes.GET_SELLCAR_MOBILE_OPTION: //모바일 셀렉트 박스에 사용 가능한 옵션
      return produce(store, (draft) => {
        const data = action.payload;
        const _rtnData = [];
        let _LoopCount = 1;
        if (data?.length > 0) {
          data.map((item) => {
            if (item?.cmCdTpId !== undefined && item?.label !== '선택') {
              _rtnData.push({
                id: `radio_phone_${_LoopCount}`,
                value: _LoopCount++,
                checked: item.label === '010' ? true : false,
                disabled: false,
                label: item.cdNm
              });
            }
          });
        }
        console.table(_rtnData);
        draft.sellMobileOptionCode = _rtnData;
      });

    case sellCarTypes.GET_SELLCAR_TERM_LIST:
      return produce(store, (draft) => {
        const { statusinfo, data } = action.payload.data;
        let _rtnData = '';
        if (statusinfo?.returncd === '000') {
          _rtnData = data?.tmsCntn.length > 0 ? data.tmsCntn : _rtnData;
        }
        console.table(_rtnData);
        draft.sellCarTermList = _rtnData;
      });

    case sellCarTypes.RESET_CAR_STATE:
      return produce(store, (draft) => {
        draft.car = {};
        draft.seller = {};
        draft.cmprEstm = {};
        draft.saleMethod = {};
        draft.collectAgree = false;
        draft.provideAgree = false;
        draft.marketingAgree = false;
        draft.selfAgree = false;
        draft.nonevalAgree1 = false;
        draft.nonevalAgree2 = false;
      });

    case sellCarTypes.APPEND_REQ_LIST:
      return produce(store, (draft) => {
        draft.reqList = draft.reqList.concat(action.payload);
      });

    case sellCarTypes.GET_SELLCAR_SEARCH_CAR_SEPC_INFO:
      return produce(store, (draft) => {
        draft.searchCarMssOptions = action.payload.mssOptions;
        draft.searchCarNoyOptions = action.payload.noyOptions;
        draft.searchCarDsplOptions = action.payload.dsplOptions;
        draft.searchCarFuelOptions = action.payload.fuelOptions;
      });

    case sellCarTypes.SET_LOADING_IMAGE_MOBILE: {
      return produce(store, (draft) => {
        draft.isLoadingImage = action.payload;
      });
    }

    case sellCarTypes.GET_COMMON_CODE_LIST: {
      console.log('GET_COMMON_CODE_LIST', action);
      return produce(store, (draft) => {
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
        }
      });
    }
    case sellCarTypes.CAR_HISTORY_AUTH_SUCC: {
      return produce(store, (draft) => {
        const keys = Object.keys(action.payload);

        keys.forEach((key) => {
          draft.carHistory[key] = action.payload[key];
        });
      });
    }
    case sellCarTypes.CAR_HISTORY_AUTH_FAIL: {
      return produce(store, (draft) => {
        draft.carHistory.authorized = false;
        draft.carHistory.crNo = undefined;
        draft.carHistory.hashCode = undefined;
      });
    }
    case sellCarTypes.USER_INFO_UPDATE: {
      return produce(store, (draft) => {
        // console.log("userInfoAction::",action.payload);
        if (action.payload.name !== undefined) {
          draft.userInfo.name = action.payload.name;
          draft.seller.nmbNm = action.payload.name;
        }
        draft.userInfo.phonenumber = action.payload.phonenumber;
        draft.seller.hpPn = action.payload.phonenumber;
      });
    }
    case sellCarTypes.COPY_USER_INFO_UPDATE: {
      return produce(store, (draft) => {
        console.log('COPY_USER_INFO_UPDATE::', store.userInfo);
        if (store.userInfo.name !== undefined) {
          draft.seller.nmbNm = store.userInfo.name;
        }
        draft.seller.hpPn = store.userInfo.phonenumber;
      });
    }
    case sellCarTypes.GET_SHOOTING_PART_LIST: {
      return produce(store, (draft) => {
        console.log('sellCarReducer -> action.payload', action.payload);
        draft.mainPhotoList = action.payload.mainPhotoList;
        draft.subPhotoList = action.payload.subPhotoList;
      });
    }
    case sellCarTypes.SELECT_CNSG_INFO: {
      return produce(store, (draft) => {
        draft.nonevalCnsgInfo = action.payload;
      });
    }
    case sellCarTypes.SELECT_CANCEL_CNSG_INFO: {
      return produce(store, (draft) => {
        draft.nonevalCnclCnsgInfo = action.payload;
      });
    }
    case sellCarTypes.CAR_SISE_UPDATE: {
      return produce(store, (draft) => {
        draft.carSise = action.payload;
      });
    }
    case sellCarTypes.CAR_SISE_RESET: {
      return produce(store, (draft) => {
        draft.carSise = {
          crNo: undefined,
          tsKey: undefined,
          seriesno: undefined,
          type: 'none'
        };
      });
    }
    default:
      return store;
  }
}
