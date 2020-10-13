import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { alert, window } from 'globalthis/implementation';
import { getAppDownloadUrl } from '@src/utils/SitemapUtil';
import { mScreenInfo } from '@src/constant/screenInfo';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import Button from '@lib/share/items/Button';

const SelfHome = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [appDownloadUrl, setAppDownloadUrl] = useState('');

  // 앱, 웹 브라우저에 따른 버튼 출력 여부 확인 객체
  const [appCheck, setAppCheck] = useState(false);

  useEffect(() => {
    console.log('앱설치여부 확인중');
    console.log(window.navigator.userAgent);
    const MobUA = window.navigator.userAgent;
    // 앱일경우
    if (MobUA.includes('AUTOBELL_Android') || MobUA.includes('AUTOBELL_iOS')) {
      setAppCheck(false);
    } else {
      setAppCheck(true);
    }
  }, []);

  useEffect(() => {
    if (!hasMobile) {
      Router.push('/sellcar/self/selfSellCarGuide'); //PC버전
    } else {
      setAppDownloadUrl(getAppDownloadUrl());
    }

    dispatch({ type: SECTION_SELL });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '비교견적 판매',
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
          exist: true
        }
      });
    }
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="sell-service-wrap">
          <div className="content-wrap">
            <h3>
              <span><b>비교견적</b>으로</span><br />최고가  판매하세요!
            </h3>
            <p>내가 찍은 사진으로 24시간 비교견적을 통해 최고가로 판매할 수 있습니다.</p>
            <ul className="sell-ico-wrap">
              <li>
                <i className="ico-sell-01" />
                <span className="self-intro-01"></span>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">쉽고 빠른 등록</p>
                  <p className="exp">PC와 모바일에 직접 촬영한 사진을 올리면 끝!</p>
                </div>
              </li>
              <li>
                <i className="ico-sell-02" />
                <span className="self-intro-02"></span>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">24시간 최고가 견적 비교</p>
                  <p className="exp">실시간으로 도착하는 오토벨 제휴 딜러들의 견적을 확인하세요.</p>
                </div>
              </li>
              <li>
                <i className="ico-sell-03" />
                <span className="self-intro-03"></span>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">직접 판매 결정</p>
                  <p className="exp">비교 견적 종료 후 판매 여부를 직접 결정하세요.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-sec">
            <div className="slide-steps-wrap">
              <h3>
                비교견적 판매는 <br />
                <strong>이렇게 진행됩니다</strong>
              </h3>
              <div className="steps-frame">
                <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={mScreenInfo} dots={true}>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">01. 내 차 번호 입력하기</p>
                        <p className="exp">차량정보를 조회하고, 추가 정보를 입력하세요.</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">02. 내 차 사진 올리기</p>
                        <p className="exp">PC 혹은 모바일에서 차량 사진을 올려주세요.</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">03. 24시간 경쟁 입찰 시작!</p>
                        <p className="exp">실시간 견적을 확인하고 마음에 드는 제안을 선택하세요.</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">04. 딜러와 차량 확인하기</p>
                        <p className="exp">선택하신 딜러와 현장에서 차량을 확인하고 최종 금액을 확정하세요.</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">05. 내 차 팔기 끝!</p>
                        <p className="exp">거래를 완료한 후 후기를 남겨주세요.</p>
                      </div>
                    </div>
                  </div>
                </SlideBanner>
              </div>
            </div>
          </div>
          {appCheck && (
            <div className="content-wrap">
              <h3>쉽고 빠른 사진 등록 Tip!</h3>
              <p>모바일 App을 이용하면 촬영 가이드에 맞추어 쉽고 빠르게 사진을 등록할 수 있습니다.</p>
              <div className="app-down">
                <i className="ico-app" />
                <Button color="blue80" title="오토벨앱 다운로드" href={appDownloadUrl} />
              </div>
            </div>
          )}
          <Button className="fixed" size="full" background="blue80" title="비교견적 판매 신청하기" href="selfStep01" />
        </div>
      </AppLayout>
    );
  }

  return <AppLayout>PC 화면으로 이동합니다.</AppLayout>;
};

export default SelfHome;
