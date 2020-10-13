import { produce } from 'immer';
import * as type from '@src/actions/dealer/sellcar/types';

const initialState = {
    carInfo : {},
    carOption : [],
    carAddOption: [],
    carAddOptionText:[]
};

export default function dealerSellCarReducer(state = initialState, action) {
    switch (action.type) {
        case type.dealerSellCarType.GET_CAR_INFO :
            return produce(state, (draft) => {
                const { carInfo, carOption, carAddOption, carAddOptionText } = action.payload;
                draft.carInfo = carInfo;
                draft.carOption = carOption;
                draft.carAddOption = carAddOption;
                draft.carAddOptionText = carAddOptionText;
            })


        case type.dealerSellCarType.GET_DEFAULT_DATA :
            return produce(state, (draft) => {
                const { carInfo, carOption, carAddOption, carAddOptionText } = action.payload;
                draft.carInfo = carInfo;
                draft.carOption = carOption;
                draft.carAddOption = carAddOption;
                draft.carAddOptionText = carAddOptionText;
            })


        case type.dealerSellCarType.RESET_CAR_INFO:
            return produce(state, (draft) => {
                draft.carInfo =  {}
                draft.carOptions = [];
                draft.carAddOption = [];
            })



        case type.dealerSellCarType.SET_CAR_INFO:
            return produce(state, (draft) => {
                draft.carInfo = {}
                draft.carInfo = action.payload;
        })


        case type.dealerSellCarType.INPUT_DATA:
            return produce(state, (draft) => {
                const { target, value, prop } = action.payload
                if(![target, prop, value].some(item => item === undefined)){
                    draft[target][prop] = value
                }
            })


        case type.dealerSellCarType.UPDATE_OP:
            return produce(state, (draft) => {
                const { target, value, prop } = action.payload
                if(![target, prop, value].some(item => item === undefined)){
                    draft[target].map(option => {
                        if(option.code == prop){
                            option.onOff = value
                        }
                    });
                }
            })

        case type.dealerSellCarType.UPDATE_ADD_OP:
            return produce(state, (draft) => {
                const { target, value, prop } = action.payload
                if(![target, prop, value].some(item => item === undefined)){
                    draft[target].map(option => {
                        if(option.code == prop){
                            option.checked = value
                        }
                    });
                }
            })

        case type.dealerSellCarType.UPDATE_EX_OP:
            return produce(state, (draft) => {
                const { target, value, prop } = action.payload
                if(![target, prop, value].some(item => item === undefined)){
                    draft[target] = [];
                    draft[target].push(value);
                }
            })


        case 'GET_CAR_INFO_TEST':
            console.log( state.carInfo);
            return state;

        default:
            return state;
    }
}
