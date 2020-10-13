/**
 * 설명 : 마이페이지(일반) 스마트옥션 출품내역
 * @author 박진하
 */
import { produce } from 'immer';
import { orderBy } from 'lodash';
import * as types from '@src/actions/mypage/personal/sellcar/autoAuctionTypes';

const initialState = {
  exhibitCarList: null,
  totalRecordCount: 0,
  autoAuctionSearchType: []
};

/**
 * 설명 : 스마트옥션 출품내역 조회
 * @author 박진하
 * @param {String} action.type
 * @returns {map} state 스마트옥션 출품내역 정보를 state에 보관
 */
export default function autoAuctionReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_EXHIBIT_LIST: {
      console.log('GET_EXHIBIT_LIST:', action);

      return produce(state, (draft) => {
        draft.exhibitCarList = action.payload.data;
        draft.totalRecordCount = action.payload.totalRecordCount;
      });
    }

    case types.GET_COMMON_CODE_LIST: {
      console.log('GET_COMMON_CODE_LIST', action);
      return produce(state, (draft) => {
        const cmCdTpId = action.payload.data.cmCdTpId;
        const data = orderBy(action.payload.data.data, ['cdId'], ['ASC']);

        if (cmCdTpId === 'AM057') {
          let selectArray = [{ value: '', label: '선택' }];
          data.map((v, i) => {
            if (v.attr1 !== null && v.attr2 !== null) {
              selectArray = [...selectArray, { ...v }];
            }
          });
          draft.searchTypeList = selectArray;

          // Mobile용 코드(검색조건)
          const autoAuctionSearchTypeArr = [{ codeValue: '', id: `${cmCdTpId}_select`, label: '선택', value: 1, checked: false }];
          if (draft.searchTypeList.length > 0) {
            console.log('autoAuction searchType : ', data);
            data.map((el, i) => {
              autoAuctionSearchTypeArr.push({
                codeValue: el.value,
                id: `${cmCdTpId}_${el.cdId}`,
                label: el.label,
                value: i + 2,
                checked: false
              });
            });
          }
          draft.autoAuctionSearchType = autoAuctionSearchTypeArr;
        }
      });
    }

    default:
      return state;
  }
}
