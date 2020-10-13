// import * as http from '@src/utils/HttpUtils' //axiosGet
import axios from 'axios';
import dealerTicketListTypes from '@src/actions/mypage/dealer/dealerTicketListTypes';
import { selectMyUpdateTicketList } from '@src/api/mypage/dealer/dealerTicketApi';

export const getMyUpdateTicketList = () => async (dispatch) => {
  try {
    const payload = await selectMyUpdateTicketList().then((res) => res?.data?.data);
    console.log('getMyUpdateTicketList payload : ', payload);

    // dispatch({
    //   type: dealerTicketListTypes.INIT_DEALER_PROD,
    //   payload
    // });
    return payload
  } catch (error) {
    console.error('error : ', error);
  }
};
