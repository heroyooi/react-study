/**
 * 설명 : 옥션 멤버 리듀서
 * @author 최승희
 */
import { produce } from 'immer';
import { types } from '@src/actions/mypage/dealer/auction/auctionMemberAction';

const initialState = {
  auctMbInfo: {},
  auctMbCorpInfo: {},
  auctMbResult: {},
  memberState : {},
};

export default function auctionMemberReducer(state = initialState, action) {
  switch (action.type) {
    case types.INPUT_OBJECT_PROP: {
      return produce(state, (draft) => {
        const {state,value,name} = action.payload

        if([state, value, name].every(value => value != undefined)){
          draft[state][name] = value
        }
      });
    }
    case types.INIT_VALUES_TO_PROPS: {
      return produce(state, (draft) => {
        const { name, values } = action.payload
        console.log("auctionMemberReducer -> name", name)
        console.log("auctionMemberReducer -> values", values)

        if([name, values].every(value => value != undefined)){
          Object.keys(values).forEach(key => {
              draft[name][key] = values[key]
          })
        }

      });
    }
    case types.INIT_OBJECT_TO_STORE: {
      return produce(state, (draft) => {
        Object.keys(action.payload).forEach(key => {
          console.log("INIT_OBJECT_TO_STORE -> key", key)
          console.log("INIT_OBJECT_TO_STORE -> action.payload[key]", action.payload[key])
          draft[key] = action.payload[key]
        })
      });
    }
   
    default:
      return state;
  }
}
