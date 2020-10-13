import { produce } from 'immer';
import * as cmprEstmTypes from '../../actions/sellcar/compareEstmTypes';

const initialState = {
  selfList: [],
  selfParams: {},
  compBiddList: [],
  compBiddParams: {},
  succBiddList: [],
  succBiddParams: {},
  recordCount: 0,
  succBiddCount: 0,
  compBiddCount: 0
};

export default function compareEstmReducer(store = initialState, action) {
  switch (action.type) {
    case cmprEstmTypes.SET_SELF_LIST: {
      return produce(store, (draft) => {
        if(action.payload!==undefined && Array.isArray(action.payload)){
         draft.recordCount=action.payload.length;
        }
        draft.selfList = action.payload;
      });
    }
    case cmprEstmTypes.SET_COMPBIDD_LIST: {
      return produce(store, (draft) => {
        if(action.payload!==undefined && Array.isArray(action.payload)){
          draft.compBiddCount=action.payload.length;
         }
        draft.compBiddList = action.payload;
      });
    }
    case cmprEstmTypes.SET_SUCCBIDD_LIST: {
      return produce(store, (draft) => {
        if(action.payload!==undefined && Array.isArray(action.payload)){
          draft.succBiddCount=action.payload.length;
         }
        draft.succBiddList = action.payload;
      });
    }

    case cmprEstmTypes.INSERT_BIDD: {
      console.log('cmprEstmTypes.INSERT_BIDD=', action.payload);
      // const listType = action.payload.listType;
      const listTypes = ['selfList', 'compBiddList', 'succBiddList'];
      return produce(store, (draft) => {
        listTypes.forEach((listType) => {
          for (let idx in store[listType]) {
            if (store[listType][idx].hh24AuctId === action.payload.hh24AuctId) {
              const myBidd = {
                dlrBiddNo: action.payload.dlrBiddNo,
                biddAmt: action.payload.biddAmt,
                updtCnt: 1
              };
              draft[listType][idx].myBidd = myBidd;
              draft[listType][idx].biddDrlCnt = store[listType][idx].biddDrlCnt + 1;
            }
          }
        });
      });
    }
    case cmprEstmTypes.UPDATE_BIDD: {
      console.log('cmprEstmTypes.UPDATE_BIDD=', action.payload);
      // const listType = action.payload.listType;
      const listTypes = ['selfList', 'compBiddList', 'succBiddList'];
      return produce(store, (draft) => {
        listTypes.forEach((listType) => {
          for (let idx in store[listType]) {
            if (store[listType][idx].hh24AuctId === action.payload.hh24AuctId) {
              draft[listType][idx].myBidd.dlrBiddNo = action.payload.dlrBiddNo;
              draft[listType][idx].myBidd.biddAmt = action.payload.biddAmt;
              draft[listType][idx].myBidd.updtCnt = store[listType][idx].myBidd.updtCnt + 1;
            }
          }
        });
      });
    }
    case cmprEstmTypes.CANCEL_BIDD: {
      console.log(action.payload);
      // const listType = action.payload.listType;
      const listTypes = ['selfList', 'compBiddList', 'succBiddList'];
      return produce(store, (draft) => {
        listTypes.forEach((listType) => {
          for (let idx in store[listType]) {
            if (store[listType][idx].hh24AuctId === action.payload.hh24AuctId) {
              draft[listType][idx].myBidd.biddCnclYn = 'Y';
              draft[listType][idx].myBidd.updtCnt = store[listType][idx].myBidd.updtCnt + 1;
              draft[listType][idx].biddDrlCnt = store[listType][idx].biddDrlCnt - 1;
            }
          }
        });
      });
    }
    case cmprEstmTypes.TOGGLE_INTEREST: {
      console.log(action.payload);
      const listTypes = ['selfList', 'compBiddList', 'succBiddList'];
      return produce(store, (draft) => {
        listTypes.forEach((listType) => {
          for (let idx in store[listType]) {
            // console.log('cmprEstmTypes.TOGGLE_INTEREST :: store[listType][idx] listType', listType);
            // console.log('cmprEstmTypes.TOGGLE_INTEREST :: store[listType][idx]::', store[listType][idx]);
            // console.log('cmprEstmTypes.TOGGLE_INTEREST :: store[listType][idx].hh24AuctId::', store[listType][idx].hh24AuctId);
            if (store[listType][idx].hh24AuctId !== undefined && store[listType][idx].hh24AuctId === action.payload.hh24AuctId) {
              draft[listType][idx].interest = !store[listType][idx].interest;
            }
          }
        });
      });
    }
    case cmprEstmTypes.UPDATE_PROPS: {
      const listTypes = ['selfList', 'compBiddList', 'succBiddList'];
      return produce(store, (draft) => {
        listTypes.forEach((listType) => {
          for (let idx in store[listType]) {
            if (store[listType][idx].hh24AuctId === action.payload.hh24AuctId) {
              for (let [key, value] of Object.entries(action.payload)) {
                draft[listType][idx][key] = value;
              }
            }
          }
        });
      });
    }

    // case cmprEstmTypes.UPDATE_BS_STT: {
    //   console.log(action.payload);
    //   return produce(store, (draft) => {
    //     for (let idx in store.succBiddList) {
    //       if (store.succBiddList[idx].hh24AuctId === action.payload.hh24AuctId) {
    //         draft.succBiddList[idx].bsSttDvcd = action.payload.bsSttDvcd;
    //         draft.succBiddList[idx].bsSttDvcdNm = action.payload.bsSttDvcdNm;
    //       }
    //     }
    //   });
    // }
    // case cmprEstmTypes.UPDATE_SUCCBIDD_PROP: {
    //   console.log('cmprEstmTypes.UPDATE_SUCCBIDD_PROP', action.payload);
    //   const propKey = action.payload.propKey;
    //   const propValue = action.payload.propValue;
    //   return produce(store, (draft) => {
    //     for (let idx in store.succBiddList) {
    //       if (store.succBiddList[idx].hh24AuctId === action.payload.hh24AuctId) {
    //         draft.succBiddList[idx][propKey] = propValue;
    //       }
    //     }
    //   });
    // }
    // case cmprEstmTypes.UPDATE_VISITDATE: {
    //   console.log(action.payload);
    //   return produce(store, (draft) => {
    //     for (let idx in store.succBiddList) {
    //       if (store.succBiddList[idx].hh24AuctId === action.payload.hh24AuctId) {
    //         draft.succBiddList[idx].bsSttDvcd = action.payload.bsSttDvcd;
    //         draft.succBiddList[idx].bsSttDvcdNm = action.payload.bsSttDvcdNm;
    //         draft.succBiddList[idx].vstDt = action.payload.vstDt;
    //         draft.succBiddList[idx].vstLocNm = action.payload.vstLocNm;
    //         draft.succBiddList[idx].vstLocDtlNm = action.payload.vstLocDtlNm;
    //       }
    //     }
    //   });
    // }
    // case cmprEstmTypes.UPDATE_DELAYRSN: {
    //   console.log('cmprEstmTypes.UPDATE_DELAYRSN', action.payload);
    //   return produce(store, (draft) => {
    //     for (let idx in store.succBiddList) {
    //       if (store.succBiddList[idx].hh24AuctId === action.payload.hh24AuctId) {
    //         draft.succBiddList[idx].bsSttDvcd = action.payload.bsSttDvcd;
    //         draft.succBiddList[idx].bsSttDvcdNm = action.payload.bsSttDvcdNm;
    //         draft.succBiddList[idx].bsDlRsnCntn = action.payload.bsDlRsnCntn;
    //       }
    //     }
    //   });
    // }
    // case cmprEstmTypes.UPDATE_FAIL_REASON: {
    //   console.log('cmprEstmTypes.UPDATE_FAIL_REASON', action.payload);
    //   return produce(store, (draft) => {
    //     for (let idx in store.succBiddList) {
    //       if (store.succBiddList[idx].hh24AuctId === action.payload.hh24AuctId) {
    //         draft.succBiddList[idx].bsSttDvcd = action.payload.bsSttDvcd;
    //         draft.succBiddList[idx].bsSttDvcdNm = action.payload.bsSttDvcdNm;
    //         draft.succBiddList[idx].bsFailYmd = action.payload.bsFailYmd;
    //         draft.succBiddList[idx].failRsnTpcd = action.payload.failRsnTpcd;
    //         draft.succBiddList[idx].failRsnCntn = action.payload.failRsnCntn;
    //       }
    //     }
    //   });
    // }
    // case cmprEstmTypes.UPDATE_COMPLETEFILE: {
    //   console.log('cmprEstmTypes.UPDATE_COMPLETEFILE', action.payload);
    //   return produce(store, (draft) => {
    //     for (let idx in store.succBiddList) {
    //       if (store.succBiddList[idx].hh24AuctId === action.payload.hh24AuctId) {
    //         draft.succBiddList[idx].bsSttDvcd = action.payload.bsSttDvcd;
    //         draft.succBiddList[idx].bsSttDvcdNm = action.payload.bsSttDvcdNm;
    //         draft.succBiddList[idx].lastBsYmd = action.payload.lastBsYmd;
    //         draft.succBiddList[idx].reduItmTpcd = action.payload.reduItmTpcd;
    //         draft.succBiddList[idx].reduItmRsnCntn = action.payload.reduItmRsnCntn;
    //         draft.succBiddList[idx].lastPrchAmt = action.payload.lastPrchAmt;
    //       }
    //     }
    //   });
    // }
    // case cmprEstmTypes.UPDATE_CMFGBSEXPL: {
    //   console.log('cmprEstmTypes.UPDATE_CMFGBSEXPL', action.payload);
    //   return produce(store, (draft) => {
    //     for (let idx in store.succBiddList) {
    //       if (store.succBiddList[idx].hh24AuctId === action.payload.hh24AuctId) {
    //         draft.succBiddList[idx].bsSttDvcd = action.payload.bsSttDvcd;
    //         draft.succBiddList[idx].bsSttDvcdNm = action.payload.bsSttDvcdNm;
    //         draft.succBiddList[idx].cmfgBsExplCntn = action.payload.cmfgBsExplCntn;
    //       }
    //     }
    //   });
    // }
    default: {
      return store;
    }
  }
}
