import React, { useEffect } from 'react';
import Router from 'next/router';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import RenderHelper from '@lib/share/render/helper';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import { SECTION_SELL } from '@src/actions/types';
import { screenInfo } from '@src/constant/screenInfo';
import AutobellAppDownload from '@src/components/sellcar/self/sub/AutobellAppDownload';

const NEXT_PAGE = '/sellcar/self/selfSellCarSearch';

const SelfSellCarGuide = ({ innerValid = true, crNo, tsKey, seriesno, type }) => {
  const dispatch = useDispatch();

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { carSise } = useSelector((rootStore) => rootStore.sellCarStore);

  const onSubmit = (e) => {
    e.preventDefault();
    if (carSise.type === 'sise') {
      location.href = `/sellcar/self/selfSellCarSearch?crNo=${carSise.crNo}`;
    } else {
      location.href = 'selfCertify';
    }
  };

  useEffect(() => {
    if (hasMobile) {
      Router.replace('/sell/selfHome'); //모바일로 이동
    }
  }, [hasMobile]);

  const [displayAppDownPop, setDisplayAppDownPop, showAppDownPop, hideAppDownPop] = useRodal(false, true);
  dispatch({ type: SECTION_SELL });

  if (hasMobile) {
    return <AppLayout />;
  }

  return (
    <AppLayout>
      <div className="content-wrap sell-service-wrap">
        <h3><span><b>비교견적</b>으로</span><br />최고가  판매하세요!</h3>
        <p>내가 찍은 사진으로 24시간 비교견적을 통해 최고가로 내 차 팔기</p>
        <ul className="sell-ico-wrap">
          <li>
            <i className="ico-sell-01" />
            <p className="tit">쉽고 빠른 등록</p>
            <p className="exp">PC와 모바일에 직접 촬영한 사진을 올리면 끝!</p>
          </li>
          <li>
            <i className="ico-sell-02" />
            <p className="tit">24시간 최고가 견적 비교</p>
            <p className="exp">실시간으로 도착하는 오토벨 제휴 딜러들의 <br />견적을 확인하세요.</p>
          </li>
          <li>
            <i className="ico-sell-03" />
            <p className="tit">직접 판매 결정</p>
            <p className="exp">비교 견적 종료 후 판매 여부를 직접 결정하세요.</p>
          </li>
        </ul>
      </div>
      <div className="content-sec">
        <div className="content-wrap slide-steps-wrap self">
          <div className="steps-frame">
            <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={screenInfo} customArrow={true} buttonType="circle" pagination={true}>
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
                      모바일 App을 이용하면 촬영 가이드에 맞추어 쉽고 빠르게 <br />사진을 등록할 수 있습니다.
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
                      <em>Step3</em>24시간 경쟁 입찰 시작!
                    </p>
                    <p className="exp">
                    실시간 견적을 확인하고 마음에 드는 제안을 선택하세요.
                      {/* 원하는 매각 방법을 선택하세요. */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit">
                      <em>Step4</em>딜러와 차량 확인하기
                    </p>
                    <p className="exp">선택하신 딜러와 현장에서 차량을 확인하고 <br />최종 금액을 확정하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit">
                      <em>Step5</em>내 차 팔기 끝!
                    </p>
                    <p className="exp">거래를 완료한 후 후기를 남겨주세요.</p>
                  </div>
                </div>
              </div>
            </SlideBanner>
          </div>
        </div>
      </div>
      <Buttons align="center" marginTop={48} marginBottom={140}>
        {/* <Button size="big" background="blue80" title="비교견적 판매 신청하기" width={240} height={60} href="selfCertify" /> */}
        <Button size="big" background="blue80" title="비교견적 판매 신청하기" width={240} height={60} onClick={onSubmit} />
      </Buttons>
      {/* <RodalPopup show={displayAppDownPop} type={'fade'} closedHandler={hideAppDownPop} mode="normal" size="xs" className="today-banner sml">
        <AutobellAppDownload />
      </RodalPopup> */}
      <RodalPopup show={displayAppDownPop} type={'fade'} closedHandler={hideAppDownPop} width={380} mode="normal" size="xs">
        <AutobellAppDownload />
      </RodalPopup>
    </AppLayout>
  );
};

SelfSellCarGuide.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { crNo, tsKey, seriesno, type } = query;
  return { crNo, tsKey, seriesno, type };
};

export default SelfSellCarGuide;
