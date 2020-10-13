import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Link from 'next/link';
import Button from '@lib/share/items/Button';
import ImgCover from '@lib/share/items/ImgCover';
import { toggleInterestAction } from '@src/actions/sellcar/compareEstmAction';
import { imgUrl } from '@src/utils/HttpUtils';
import { getTimeData, biddBtnData, BTN_TYPE } from '@src/utils/sellcar/CmprEstmUtil';
import { setComma } from '@src/utils/StringUtil';

const getYyMm = (yyyyMM) => {
  const yy = yyyyMM.substr(2, 2);
  const mm = yyyyMM.substr(4, 2);
  return yy + '/' + mm + '식';
};

const getName = (sellcar) => {
  const crMnfcCdNm = sellcar.crMnfcCdNm;
  const crMdlCdNm = sellcar.crMdlCdNm;
  const crClsCdNm = sellcar.crClsCdNm;
  const crDtlClsCdNm = sellcar.crDtlClsCdNm;
  return `${crMnfcCdNm} ${crMdlCdNm} ${crClsCdNm} ${crDtlClsCdNm}`;
};

const maxBiddCnt = 3;

const BannerItem2 = ({ isMobile, v, handlePopup }) => {
  const dispatch = useDispatch();
  const [isInter, setIsInter] = useState(v.itrtYn === 'Y' ? true : false);
  const [time, setTime] = useState();
  const [timeCls, setTimeCls] = useState('');
  const [btnName, setBtnName] = useState('');
  const [background, setBackground] = useState('gray');
  const [btnDisabled, setBtnDisabled] = useState(v.biddCnclY === 'Y' ? true : false);

  const handleOnDragStart = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleInterest = (hh24AuctId) => {
    setIsInter((prevInter) => !prevInter);
    dispatch(
      toggleInterestAction({
        hh24AuctId
      })
    );
  };

  useEffect(() => {
    setIsInter(isInter);
  }, [isInter]);

  useEffect(() => {
    setIsInter(v.itrtYn);
  }, [v.itrtYn]);

  useEffect(() => {
    const timer = setInterval(function() {
      const td = getTimeData(v.hh24AuctEndDt);
      if (td.isTerminate) {
        clearInterval(timer);
        setBtnName('입찰종료');
        setBtnDisabled(true);
        setBackground('gray');
      } else {
        setTime(td.timeText);
      }
      if (td.underTwoHours) {
        setTimeCls('tx-red80');
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [v.hh24AuctEndDt]);

  useEffect(() => {
    const btnData = biddBtnData(v);
    if (btnData.btnType === BTN_TYPE.NEW_BIDD) {
      setBtnName('입찰하기');
      setBackground('blue80');
    } else if (btnData.btnType === BTN_TYPE.UPDATE_BIDD) {
      setBtnName('수정하기');
      setBackground('blue80');
    } else if (btnData.btnType === BTN_TYPE.CANCEL_BIDD) {
      setBtnName('입찰하기');
      setBackground('gray');
      setBtnDisabled(true);
    }
  }, [v]);

  if (isMobile === true) {
    return (
      <li>
        <span>
          <div className="img-cover">
            <p className="state hold">미입찰</p>
            <img src={`${imgUrl}${v.phtUrl}`} alt={getName(v)} />
          </div>
          <div className="img-hover">
            <p className="scrap-wrap">
              <span className={classNames('heart', { on: isInter === true })} onClick={() => handleInterest(v.hh24AuctId)}>
                <i className="ico-heart" />
                <em>관심차량</em>
              </span>
            </p>
          </div>
          <div className="summary">
            <Link href={`/mypage/dealer/buycar/detail?slReqId=${v.slReqId}`}>
              <a>
                <h5 className="subject">{getName(v)}</h5>
              </a>
            </Link>
            <div className="info-wrap">
              <div className="info">
                {[getYyMm(v.frstRegDt), `${setComma(v.drvDist)} km`, v.fuel, v.locNm].map((v, i) => (
                  <span key={i}>{v}</span>
                ))}
              </div>
            </div>
            <div className="bidding-wrap">
              <span className="time">
                <span className={`time`}>
                  입찰가능시간<em>{time}</em>
                </span>
              </span>
              <span className="person">
                입찰중<em>{v.biddDrlCnt}</em>명
              </span>
            </div>
          </div>
        </span>
      </li>
    );
  }
  return (
    <li>
      {
        <span onDragStart={handleOnDragStart}>
          <ImgCover src={`${imgUrl}${v.phtUrl}`} alt={getName(v)}>
            <div className="img-hover">
              <span onClick={() => handleInterest(v.hh24AuctId)}>
                <i className={isInter === true ? 'ico-check-white' : 'ico-plus-white'} />
                <em>관심차량</em>
              </span>
            </div>
          </ImgCover>
          <div className="summary">
            <Link href={`/mypage/dealer/buycar/detail?slReqId=${v.slReqId}`}>
              <a>
                <div className="info-wrap">
                  <h5 className="subject">{getName(v)}</h5>
                  <div className="info">
                    <span>{getYyMm(v.frstRegDt)}</span>
                    <span>{v.drvDist} km</span>
                    <span>{v.fuel}</span>
                    <br />
                    <span>{v.locNm}</span>
                  </div>
                </div>
              </a>
            </Link>
            <div className="limit">
              <span className={`time ${timeCls}`}>{time}</span>
              <span className="num">[{v.biddDrlCnt}명 입찰중]</span>
            </div>
            <Button size="big" background={background} title={btnName} buttonMarkup={true} width={176} marginTop={24} disabled={btnDisabled} onClick={(e) => handlePopup(e, v)} />
          </div>
        </span>
      }
    </li>
  );
};

BannerItem2.propTypes = {
  isMobile: PropTypes.bool,
  v: PropTypes.object,
  handlePopup: PropTypes.func
};

BannerItem2.displayName = 'BannerItem2';
export default BannerItem2;
