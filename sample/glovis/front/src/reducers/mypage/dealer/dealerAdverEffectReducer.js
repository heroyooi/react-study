import { produce } from 'immer';

export const adverEffectTypes = {
  OBJECT_TO_STORE_PROPS : 'dealerAdverEffect/OBJECT_TO_STORE_PROPS',
}

const initialState = {
  analysis : {},
  advEffect : {},
  list : []
};

export default function dealerAdverEffectReducer(store = initialState, action) {
  switch (action.type) {
    case adverEffectTypes.OBJECT_TO_STORE_PROPS:
      return produce(store, (draft) => {
        const { payload } = action

        Object.keys(payload).forEach(key => {
          if(payload[key]){
            draft[key] = payload[key]
          }
        })
      });
    default:
      return store;
  }
}
