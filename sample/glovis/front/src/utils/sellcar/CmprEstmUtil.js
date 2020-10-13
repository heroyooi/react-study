import moment from 'moment';
import {isEmpty} from 'lodash';
import { AUCT_STT_DVCD } from '@src/constant/mbSlReqStt';

const BTN_TYPE = {
  NEW_BIDD:'newBidd',
  UPDATE_BIDD:'updateBidd',
  CANCEL_BIDD:'cancelBidd'
};

const fillZero = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

const getLimitTime = (_endTime) => {
  const endTime = moment(_endTime, 'YYYY-MM-DD HH:mm:ss', true);
  const diff = endTime.diff(moment());
  const diffHour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMin = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const diffSec = Math.floor((diff % (1000 * 60)) / 1000);  
  return `-${fillZero(diffHour)} : ${fillZero(diffMin)} : ${fillZero(diffSec)}`;
};

const getTimeText = (diff) => {
  const diffHour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMin = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const diffSec = Math.floor((diff % (1000 * 60)) / 1000);
  // return `-${diffHour} : ${diffMin} : ${diffSec}`;
  return `-${fillZero(diffHour)} : ${fillZero(diffMin)} : ${fillZero(diffSec)}`;
};

const getTimeData = (_endTime) => {
  const data = {
    isTerminate: false,
    timeText: '',
    underTwoHours: false
  };

  const endTime = moment(_endTime, 'YYYY-MM-DD HH:mm:ss', true);
  const diff = endTime.diff(moment());
  data.isTerminate = diff <= 0 ? true : false;
  data.timeText = getTimeText(diff);
  data.underTwoHours = (Math.floor((diff % (1000 * 60 * 60 * 24) ) / (1000 * 60 * 60)) <= 1) ? true : false;
  return data;
};

function isBidding(cmprEstm) {
  return cmprEstm?.biddCnclYn === null || cmprEstm?.biddCnclYn === 'Y' || cmprEstm.biddChngCnt === 0 ? false : true;
};

function isNewBidding(cmprEstm, type = '01') {
  if (type === '01') {
    return isBidding(cmprEstm) ? false : true;
  }
  return cmprEstm.myBidd === null ? true : false;
};

const biddBtnData = (cmprEstm, type = '01') => {
  const data = {
    btnType: ''
  };
  const newBidding = isNewBidding(cmprEstm, type);
  const biddCnclYn = type === '01' ? cmprEstm?.biddCnclYn : cmprEstm?.myBidd?.biddCnclYn;
  const cancelBidding = !newBidding && biddCnclYn === 'Y' ? true : false;
  if (cancelBidding) {
    data.btnType = BTN_TYPE.CANCEL_BIDD;
  } else if (newBidding) {
    data.btnType = BTN_TYPE.NEW_BIDD;
  } else {
    data.btnType = BTN_TYPE.UPDATE_BIDD;
  }
  return data;
}

const isBeforeAuctTime = (cmprEstm) => {
  const now = moment();
  const startDateTime = moment(cmprEstm.hh24AuctStrtDt, 'YYYY-MM-DD HH:mm:ss');
  return now.isBefore(startDateTime);
};

const isBiddingTime = (cmprEstm) => {
  const now = moment();
  const startDateTime = moment(cmprEstm.hh24AuctStrtDt, 'YYYY-MM-DD HH:mm:ss');
  const endDateTime = moment(cmprEstm.hh24AuctEndDt, 'YYYY-MM-DD HH:mm:ss');
  return now.isAfter(startDateTime) && now.isBefore(endDateTime) ? true : false;
};

const isAuctEndTime = (cmprEstm) => {
  const now = moment();
  const endDateTime = moment(cmprEstm.hh24AuctEndDt, 'YYYY-MM-DD HH:mm:ss');
  return now.isAfter(endDateTime);
};

const progressState = (data) => {
    const { hh24AuctSttDvcd: stt, hh24AuctStrtDt:_strtDt, hh24AuctEndDt:_endDt } = data;
    const result = { 'code':'', 'label':'', 'biddAvail':false }
    if( stt === AUCT_STT_DVCD.APPROVED){ //승인
      const now = moment();
      const strtDt = moment(_strtDt, "YYYY-MM-DD HH:mm:ss");
      const endDt = moment(_endDt, "YYYY-MM-DD HH:mm:ss");
      // console.log("_strtDt",_strtDt);
      if(now.isAfter(strtDt)){
        if( now.isBefore(endDt) ){
          result.code = 'progress';
          result.label = '입찰가격수정';
          result.biddAvail = true;
        }
        else if( now.isAfter(endDt) ){
          result.code = 'end';
          result.label = '입찰 종료';
          result.biddAvail = true;
        }
      }
    } 
    else if ( stt === AUCT_STT_DVCD.PROGRESSING){
      result.code = 'progress';
      result.label = '입찰가격수정';
      result.biddAvail = true;
    }
    else if ( stt === AUCT_STT_DVCD.END){
      result.code = 'end';
      result.label = '입찰 종료';
      result.biddAvail = false;
    }
    else if ( stt === AUCT_STT_DVCD.SUCCEED_BIDDING ){
      result.code = 'succBidd';
      result.label = '';
      result.biddAvail = false;
    }
    return result;
}

export { progressState, isBeforeAuctTime, isBiddingTime, isAuctEndTime, getLimitTime, isBidding, getTimeData, biddBtnData, isNewBidding, BTN_TYPE };