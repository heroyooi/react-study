import { selectMyAuctionMemberState, selectMbInfo, uploadFile} from '@src/api/mypage/dealer/AuctionApi'
import { insertAutoAuctionDealer } from '@src/api/mypage/dealer/AuctionApi';
import { setHpPnFormat } from '@src/utils/MemberUtil';

export const types = {
    INPUT_OBJECT_PROP: 'auctionMember/INPUT_OBJECT_PROP',
    INIT_VALUES_TO_PROPS: 'auctionMember/INIT_VALUES_TO_PROPS',
    INIT_OBJECT_TO_STORE: 'auctionMember/INIT_OBJECT_TO_STORE',
};

export const inputAuctionObjectProp = payload => dispatch => {
    dispatch({
        type : types.INPUT_OBJECT_PROP,
        payload
    })
}

export const getMyAuctionMemberStateAction = () => async dispatch => {
    try {
        const payload = await selectMyAuctionMemberState().then(res => res?.data?.data)
        console.log('getMyAuctionMemberStateAction payload : ', payload)

        dispatch({
            type : types.INIT_VALUES_TO_PROPS,
            payload : {
                name : 'memberState',
                values : payload
            }
        })
    } catch (error) {
        console.error('error : ', error);
    }
}

export const getMbInfoAction = () => async dispatch => {
    try {
        const payload = await selectMbInfo().then(res => res?.data?.data?.[0])
        console.log("getMbInfoAction :::::: payload", payload)
        const { mbHpPnEnc } = payload
        if(mbHpPnEnc && !/\-/.test(mbHpPnEnc) ){
            payload.mbHpPnEnc = setHpPnFormat(mbHpPnEnc)
        }

        dispatch({
            type : types.INIT_VALUES_TO_PROPS,
            payload : {
                name : 'auctMbInfo',
                values : payload
            }
        })
    } catch (error) {
        console.error('error : ', error);
    }
}

export const postImageAction = (e) => async dispatch => {
    try {
        const { files, name } = e.target

        // const payload = await uploadFile().then(res => res?.data?.data)
        //임의로 업로드 하는 api 호출에 성공했다 치고 url 반환

        const payload = {//사업자 state
            state : 'auctMbCorpInfo',
            name,
            value : '/image.jpg'
        }


        dispatch({
            type : types.INPUT_OBJECT_PROP,
            payload
        })
    } catch (error) {
        console.error('error : ', error);
    }
}

export const postMyAuctionMemberInfoAction = (params) => async dispatch => {
    try {
        const result = await insertAutoAuctionDealer(params)
        //test
        // const result = {
        //     data :{
        //         data: {
        //             "membCustNo": "8530",
        //             "mbNm": "홍길동",
        //             "tmpPw": "2604F5DBE2FA"
        //         },
        //         statusinfo : {
        //             returncd : '000'
        //         }
        //     }
        // }
        console.log('result : ', result)

        const payload = {
            auctMbResult : result?.data?.data || {}
        }

        dispatch({
            type : types.INIT_OBJECT_TO_STORE,
            payload
        })

        return result
    } catch (error) {
        console.error('error : ', error);
    }
}

export const putAuctionMemberPropsAction = (payload) => async dispatch => {
    try {
        dispatch({
            type : types.INIT_VALUES_TO_PROPS,
            payload
        })
    } catch (error) {
        console.error('error : ', error);
    }
}