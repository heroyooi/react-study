/**
 * 설명 : 무평가 판매 서비스
 * @fileoverview 무평가 판매 서비스 화면
 * @author 최승희
 * @requires resetAllCarInfoAction
 */

import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import { screenInfo2 } from '@src/constant/screenInfo';
import AutobellAppDownload from '@src/components/sellcar/self/sub/AutobellAppDownload';
import { isLogin } from '@src/utils/LoginUtils';

/**
 * 무평가 판매 서비스 안내
 * @returns {noneValuationGuide}
 */
const noneValuationGuide = () => {
  const [displayAppDownPop, setDisplayAppDownPop, showAppDownPop, hideAppDownPop] = useRodal(false, true);
  const { carSise } = useSelector((rootStore) => rootStore.sellCarStore);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    if (hasMobile) {
      Router.replace('/sell/freeHome'); //모바일로 이동
    }
  }, [hasMobile]);

  if (hasMobile) {
    return <AppLayout />;
  }

  return (
    <AppLayout>
      <div className="content-wrap sell-service-wrap">
        <h3><span><b>무평가</b>로</span><br />자신있는 내 차를 빠르게 판매하세요!</h3>
        <p>복잡한 과정없이 비대면으로 내 차 팔기</p>
        <ul className="sell-ico-wrap">
          <li>
            <i className="ico-sell-01" />
            <p className="tit">쉽고 빠른 등록</p>
            <p className="exp">PC와 모바일에 직접 촬영한 사진을 올리면 끝!</p>
          </li>
          <li>
            <i className="ico-none-01" />
            <p className="tit">상태 좋은 중고차</p>
            <p className="exp">
              신차 등록일 33개월, 주행거리 3만km 이내의
              <br />
              무사고 차량만 가능합니다.
            </p>
          </li>
          <li>
            <i className="ico-none-02" />
            <p className="tit">온라인으로 간편하게</p>
            <p className="exp">
              차량 번호 입력부터 판매 결정까지 <br />비대면으로 진행합니다.
            </p>
          </li>
        </ul>
      </div>
      <div className="content-sec">
        <div className="content-wrap slide-steps-wrap none">
          <div className="steps-frame">
            <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={screenInfo2} customArrow={true} buttonType="circle" pagination={true}>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit">
                      <em>Step1</em>내 차 번호 입력하기
                    </p>
                    <p className="exp">차량정보를 조회하고, 추가 정보를 입력하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit">
                      <em>Step2</em>내 차 사진 올리기
                    </p>
                    <p className="exp">PC 혹은 모바일에서 차량 사진을 올려주세요.</p>
                    <p className="sub">
                      <span>쉽고 빠른 사진 등록 Tip!</span>
                      모바일 App을 이용하면 촬영 가이드에 맞추어 <br />쉽고 빠르게 사진을 등록할 수 있습니다.
                    </p>
                  </div>
                  <div className="app-down">
                    <i className="ico-app-blue" />
                    <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => showAppDownPop(e, 'fade')} />
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit">
                      <em>Step3</em>상담하기
                    </p>
                    <p className="exp">오토벨 상담사가 차량 정보 확인 및 예상 판매 금액 등 <br />판매 진행을 도와드립니다.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit">
                      <em>Step4</em>내 차 보내기
                    </p>
                    <p className="exp">판매 가격 확정을 위해 고객님의 차량을 오토벨로 배송합니다.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit">
                      <em>Step5</em>내 차 팔기 끝!
                    </p>
                    <p className="exp">
                      평가 결과와 최종 금액을 확인하고 거래를 완료하세요.
                    </p>
                  </div>
                </div>
              </div>
            </SlideBanner>
          </div>
        </div>
      </div>
      <Buttons align="center" marginTop={48} marginBottom={140}>
        { (isLogin() && carSise.type === 'sise')
          ?
          <Button size="big" background="blue80" title="무평가 판매 신청하기" width={245} height={60} nextLink={true} href="/sellcar/nonValue/noneValuationSellCarSearch" />
          :
          <Button size="big" background="blue80" title="무평가 판매 신청하기" width={245} height={60} nextLink={true} href="/sellcar/nonValue/noneValuationCertify" />
        }
      </Buttons>
      <RodalPopup show={displayAppDownPop} type={'fade'} closedHandler={hideAppDownPop} mode="normal" size="xs" className="today-banner sml">
        <AutobellAppDownload />
      </RodalPopup>
    </AppLayout>
  );
};

export default noneValuationGuide;
