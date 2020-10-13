/**
 * 입찰현황 팝업
 * @fileoverview 입찰현황 팝업
 * @author 김민철
 */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import SellCarInfo from '../sub/SellCarInfo';
import { getLimitTime,getTimeData } from '@src/utils/sellcar/CmprEstmUtil';
import { setComma } from '@src/utils/StringUtil';
/**
 * 입찰현황 팝업
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {obj}  req 신청정보
 * @param {obj}  biddCurrentStat 입찰현황
 * @param {callback} cancelHandler 취소처리 콜백
 * @returns {SelfBiddPopup}
 */
const SelfBiddCurrentStatPopup = ({ car = {}, cmprEstm = {}, cancelHandler, closedHandler }) => {

  /** 경매 타이머 */    
  const [limitTime, setLimitTime] = useState();

  const _cancleHandler = (e) => {
    e.preventDefault();
    closedHandler(false);
    if (cancelHandler) {
      cancelHandler(e);
    }
  };

  useEffect( () => {
    const timer = setInterval(function() {
      const td = getTimeData(cmprEstm.hh24AuctEndDt);
      if( td.isTerminate ){
        clearInterval(timer);
      } else {
        setLimitTime(td.timeText);
      }
      if( td.underTwoHours ){
        //setTimeCls('tx-red80');
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  },[cmprEstm]);

  return (
    <>      
      <div className="con-wrap popup-bidding-inquiry">
        {/* <p className="view-count">
          이 차의 조회수 :{' '}
          <span>
            <em className="tx-blue80">25</em>회
          </span>
        </p> */}
        <SellCarInfo car={car} photoList={car.photoList} />
        <div className="bidding-inquiry">
          <ul>
            <li>
              {/* 남은시간 */}
              <p className="price-tp7">{limitTime}</p>
              {/* <p className="time tx-blue80">{limitTime}</p> */}
            </li>
            <li>
              입찰자수
              <p className="price-tp7">
                {cmprEstm.biddDrlCnt}
                <span className="won">명</span>
              </p>
            </li>
            <li>
              현재 최고가
              <p className="price-tp7">
                {setComma(cmprEstm.maxAmt)}
                <span className="won">만원</span>
              </p>
            </li>
          </ul>
        </div>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="blue80" title="판매취소" width={172} height={60} onClick={_cancleHandler} />
        </Buttons>
      </div>
    </>
  );
};

SelfBiddCurrentStatPopup.propTypes = {
  car: PropTypes.object,
  cmprEstm: PropTypes.object,
  cancelHandler: PropTypes.func,
  closedHandler: PropTypes.func
};

export default SelfBiddCurrentStatPopup;
