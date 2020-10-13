import * as auctionApi from '@src/api/mypage/dealer/AuctionApi'

export const types = {
    INIT_OBJECT_TO_STORE: 'currentList/INIT_OBJECT_TO_STORE',
};

export const getAuctionSuccBidList = (params) => async dispatch => {
    try {
        const { data = [], statusinfo = {} } = await auctionApi.selectAuctionSuccBidList(params).then(res => res?.data)

        dispatch({
            type : types.INIT_OBJECT_TO_STORE,
            payload : {                
                list : data ?? [],                
                totalCnt : statusinfo?.totalCnt ?? 0,
                succBidList : data ?? []
            }
        })
    } catch (error) {
        console.error('error :::::::::::::::::::::::: ', error);
    }
}

export const getAuctionBidInfoList = (params) => async dispatch => {
    try {
        const { data = [], statusinfo = {} } = await auctionApi.selectAuctionBidInfoList(params).then(res => res?.data)

        dispatch({
            type : types.INIT_OBJECT_TO_STORE,
            payload : {                
                list : data ?? [],                
                totalCnt : statusinfo?.totalCnt ?? 0,
                bidInfoList : data ?? []                
            }
        })
    } catch (error) {
        console.error('error :::::::::::::::::::::::: ', error);
    }
}
 
export const getAuctionSellCarList = (params) => async dispatch => {
    try {
        const { data = [], statusinfo = {} } = await auctionApi.selectAuctionSellCarList(params).then(res => res?.data)

        dispatch({
            type : types.INIT_OBJECT_TO_STORE,
            payload : {                
                list : data ?? [],                
                totalCnt : statusinfo?.totalCnt ?? 0,
                sellCarList : data ?? []
            }
        })
    } catch (error) {
        console.error('error :::::::::::::::::::::::: ', error);
    }
}
 