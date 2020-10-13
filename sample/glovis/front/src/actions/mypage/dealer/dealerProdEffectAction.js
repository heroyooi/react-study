// import * as http from '@src/utils/HttpUtils' //axiosGet
import { selectAdverBaseInfo, selectAnalysisData } from '@src/api/mypage/dealer/dealerProdApi';
import { adverEffectTypes } from '@src/reducers/mypage/dealer/dealerAdverEffectReducer'

export const getAdverBaseInfoAction = (dealerProdVO) => async (dispatch) => {
  try {
    console.log("getAdverBaseInfoAction -> dealerProdVO", dealerProdVO)
    const { dlrPrdId } = dealerProdVO
    const { data, statusinfo } = await selectAdverBaseInfo(dlrPrdId).then((res) => res?.data);
    console.log("getAdverBaseInfoAction -> data", data)
    console.log("getAdverBaseInfoAction -> statusinfo", statusinfo)

    dispatch({
      type: adverEffectTypes.OBJECT_TO_STORE_PROPS,
      payload : {
        advEffect : data
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAnalysisDataAction = (dealerProdVO) => async (dispatch) => {
  try {
    console.log("getAnalysisDataAction -> dealerProdVO", dealerProdVO)
    const { dlrPrdId, effectCategory } = dealerProdVO
    console.log("getAnalysisDataAction -> effectCategory", effectCategory)
    const {data, statusinfo} = await selectAnalysisData({
      dlrPrdId, effectCategory
    }).then((res) => res?.data);

    console.log("getAnalysisDataAction -> data", data)
    console.log("getAnalysisDataAction -> statusinfo", statusinfo)

    dispatch({
      type: adverEffectTypes.OBJECT_TO_STORE_PROPS,
      payload : {
        analysis : data
      }
    });
  } catch (error) {
    console.error(error);
  }
};
