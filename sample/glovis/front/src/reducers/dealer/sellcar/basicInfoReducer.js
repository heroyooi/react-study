import { produce } from 'immer';
import * as type from '../../../actions/dealer/sellcar/types';

const initialState = {
    registerInfo :{}
};

export default function basicInfoReducer(state = initialState, action) {
    switch (action.type) {

        case type.dealerSellCarType.INPUT_REGI_CAR:
            return produce(state, (draft) => {
                const { target, value, prop } = action.payload;
                console.log(target);
                if(![target, prop, value].some(item => item === undefined)){
                    console.log(draft[target]);
                    draft[target][prop] = value
                }
            })

        default:
            return state;
    }
}
