/**
 * 설명 : 스마트옥션 출품 완료
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires autoAuction(스마트옥션안내)
 * @requires currentState(딜러마이페이지)
 * @requires autoAuction(개인마이페이지)
 * @author 박진하
 */
import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import AppLayout from '@src/components/layouts/AppLayout';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import { SystemContext } from '@src/provider/SystemProvider';
const globalThis = require('globalthis')();

/**
 * 설명 : 출품신청한 차량 번호를 확인하고 이동할 페이지를 선택한다.
 * @param {state.autoAuction.consignInfoList} 탁송 신청 목록
 * @returns {autoAuctionComplete} 출품신청 완료
 */
const AutoAuctionComplete = () => {
  //console.log('*** autoAuctionComplete > isLoginLiveCheck', isLoginLiveCheck());
  const dispatch = useDispatch();
  const { showAlert, initAlert } = useContext(SystemContext);
  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    dispatch({ type: SECTION_AUTO_AUCTION });

    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '출품완료',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  const { inputInfo, auctionOngoing } = useSelector((state) => state.autoAuction);
  // 화면 Refresh 여부 감지 (진행상태, Refresh 이후 Redirect URL)
  useDetectPageRefresh(auctionOngoing, '/autoAuction/autoAuctionMain');

  const hasMobile = useSelector((state) => state.common.hasMobile);

  const onClickHandler = (e) => {
    e.preventDefault();
    let url = '';
    if (isLoginLiveCheck()) {
      if (gInfoLive().membertype === '0010') {
        url = '/mypage/personal/sellcar/autoAuction';
      } else {
        url = '/mypage/dealer/autoauction/currentState?pageValue=sellCarList';
      }
    } else {
      url = '/login';
    }
    // Router.push(url).then(() => {
    //   window.scrollTo(0, 0);
    // });
    globalThis.window.location.href = url
  };

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="auction-complete-wrap">
          <div className="content-wrap tx">
            <div className="auction-tit tx-c">
              <h4 className="tit2">출품 신청이 완료되었습니다.</h4>
              <p className="tx-tp2 mt8">
                <span>※</span>차량 탁송이 완료된 후, 경매가 진행됩니다.
              </p>
            </div>
            <div className="license-plate-wrap">
              {inputInfo?.consignCarNo.map((crNo, index) => {
                return (
                  <div className="license-plate" key={index}>
                    <span className="car-number">{crNo}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Buttons align="center" className="fixed full">
            <Button size="big" background="blue20" color="blue80" title="출품 내역 확인" onClick={onClickHandler} />
            <Button size="big" background="blue80" title="확인" href="autoAuctionMain" />
          </Buttons>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>내 차 출품하기</h3>
          <p>공개 경쟁 입찰의 스마트옥션으로 내 차를 최고가로 판매하세요.</p>
        </div>
      </div>
      <div className="content-wrap auction-step">
        <Steps type={1} contents={['경매약관 및 주의사항', '회원정보', '차량정보', '탁송신청']} active={5} />
      </div>
      <div className="content-sec auction-sec">
        <div className="auction-complete-wrap">
          <div className="content-wrap">
            <div className="auction-tit">
              <h4>출품 신청이 완료되었습니다.</h4>
              <h5>차량번호</h5>
            </div>
            <div className="license-plate-wrap">
              {inputInfo?.consignCarNo.map((crNo, index) => {
                return (
                  <div className="license-plate" key={index}>
                    <span className="car-number">{crNo}</span>
                  </div>
                );
              })}
            </div>
            <p className="tail-info">
              <span>※</span>차량 탁송이 완료된 후, 경매가 진행됩니다.
            </p>
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" line="black" color="black" title="나의 출품 내역 확인" width={240} height={72} onClick={onClickHandler} />
              <Button size="big" background="blue80" title="확인" width={240} height={72} href="autoAuctionMain" />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AutoAuctionComplete;
