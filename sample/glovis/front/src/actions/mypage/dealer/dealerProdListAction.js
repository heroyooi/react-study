// import * as http from '@src/utils/HttpUtils' //axiosGet
import {
  selectSaleProdCnt,
  selectSaleProdItemList,
  updateSaleCarPrice,
  insertSaleCarPic,
  updateSaleCarConfirm,
  selectMyAdProdList,
  selectDealerCondition,
  deleteProdCar,
  updateNewProdCarInfo
} from '@src/api/mypage/dealer/dealerProdApi';

export const dealerProdListTypes = {
  INIT_LIST_INFO : "dealerProdList/INIT_LIST_INFO",
  INIT_ITEM_PROPS_BY_ID : "dealerProdList/INIT_ITEM_PROPS_BY_ID",
  INIT_ITEM_CAR_IMAGE : "dealerProdList/INIT_ITEM_CAR_IMAGE",
  DELETE_ITEMS_PROPS_BY_ID : "dealerProdList/DELETE_ITEMS_PROPS_BY_ID",
  ADD_ITEMS_BY_ID : "dealerProdList/ADD_ITEMS_BY_ID",
  REMOVE_ITEMS_BY_ID : "dealerProdList/REMOVE_ITEMS_BY_ID",
  INIT_STATE : "dealerProdList/INIT_STATE",
  INIT_PROPS : "dealerProdList/INIT_PROPS",
}

//deprecated!!!
export const getMyAdProdListAction = () => async dispatch => {
  const { freepass=[], updatefreepass=[], statusinfo } = await selectMyAdProdList().then(res => res?.data)
  
  if(statusinfo.returncd === '000'){
    dispatch({
      type : dealerProdListTypes.INIT_STATE,
      payload : {
        name : 'adProdList',
        value : [
          freepass, updatefreepass,
        ]
      }
    })
  }
  return statusinfo
}

export const getDealerConditionAction = () => async dispatch => {
  const { data, statusinfo } = await selectDealerCondition().then(res => res?.data)
  console.log('getDealerConditionAction data ::::: ', data)
  if(statusinfo.returncd === '000'){
    dispatch({
      type : dealerProdListTypes.INIT_STATE,
      payload : {
        name : 'member',
        value : data
      }
    })
  }
  return statusinfo
}

export const getDealerProdCntAction = (params) => async (dispatch) => {
  const { data, statusinfo } = await selectSaleProdCnt(params).then(res => res?.data)
  console.log("dispatch :::::::::::::::::::::::: ", dispatch)

  if(statusinfo.returncd === '000'){
    dispatch({
      type: dealerProdListTypes.INIT_LIST_INFO,
      payload: {
        ...data,
      }
    });
  }
  return statusinfo
}

export const getDealerProdListAction = (payload) => async (dispatch) => {
  try {
    const { name, values } = payload
    console.log("getDealerProdListAction :::::::::: payload ", payload)
    const { data, statusinfo, totalcnt } = await selectSaleProdItemList(values).then(result => result?.data)
    console.log("getDealerProdListAction -> data", data)
    console.log("getDealerProdListAction -> totalcnt", totalcnt)
    console.log("getDealerProdListAction -> statusinfo", statusinfo)
    
    dispatch({
      type: dealerProdListTypes.INIT_LIST_INFO,
      payload: {
        [name] : data?.list || [],
        totalcnt
      }
    });
    return statusinfo
  } catch (error) {
    console.error('에러발생', error);
  }
};

export const updateProdPriceAction = (payload) => async (dispatch) => {
  try {
    const { name, values } = payload
    console.log('values : ', values)
    const { data, statusinfo } = await updateNewProdCarInfo(values).then(res => res?.data)
    
    if(statusinfo?.returncd === '000'){
      const {
        slAmt,
        financeCrYn,
        frnchsCrYn,
        hsvcCrYn,
        maxPrice,
        minPrice,
        appPrice,
        uid,
        reportId
      } = values

      dispatch({
        type: dealerProdListTypes.INIT_ITEM_PROPS_BY_ID,
        payload: {
          key : values.dlrPrdId,
          values : {
            slAmt,
            financeCrYn,
            frnchsCrYn,
            hsvcCrYn,
            maxPrice,
            minPrice,
            appPrice,
            uid,
            reportId
          },
          name,
        }
      });
    }
    return statusinfo
  } catch (error) {
    console.error(error);
  }
};

export const updateCarPhotoAction = (payload) => async (dispatch) => {
  try {
    const { values:formData } = payload
    const { data, statusinfo } = await insertSaleCarPic(formData).then(res => res?.data)
    const firstImage = data?.find(img => img.sortNo === '1')

    if(statusinfo?.returncd === '000' && firstImage){
      await dispatch({
        type: dealerProdListTypes.INIT_ITEM_CAR_IMAGE,
        payload: {
          key : formData.get('dlrPrdId'),
          value : [firstImage],
        }
      });
    }
    return statusinfo
  } catch (error) {
    console.error(error);
  }
};


export const updateSaleCarConfirmAction = (payload) => async (dispatch) => {
  try {
    const { name, values } = payload
    const { data, statusinfo } = await updateSaleCarConfirm(values).then(res => res?.data)

    if(statusinfo?.returncd === '000'){
      dispatch({
        type: dealerProdListTypes.REMOVE_ITEMS_BY_ID,
        payload: {
          key : values.dlrPrdId,
          values : values,
          name : 'list',
        }
      });
    }
    return statusinfo
  } catch (error) {
    console.error(error);
  }
};


export const addItemsToListAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: dealerProdListTypes.ADD_ITEMS_BY_ID,
      payload,
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeItemsToListAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: dealerProdListTypes.REMOVE_ITEMS_BY_ID,
      payload,
    });
  } catch (error) {
    console.error(error);
  }
};

export const initStateAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: dealerProdListTypes.INIT_STATE,
      payload,
    });
  } catch (error) {
    console.error(error);
  }
};

export const initPropsAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: dealerProdListTypes.INIT_PROPS,
      payload,
    });
  } catch (error) {
    console.error(error);
  }
};
