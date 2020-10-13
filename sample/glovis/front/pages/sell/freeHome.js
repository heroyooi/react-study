import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Button from '@lib/share/items/Button';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { mScreenInfo2 } from '@src/constant/screenInfo';
import { getAppDownloadUrl } from '@src/utils/SitemapUtil';

const FreeHome = () => {
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
      Router.push('/sellcar/nonValue/noneValuationGuide'); //PC버전
    } else {
      setAppDownloadUrl(getAppDownloadUrl());
    }

    dispatch({ type: SECTION_SELL });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '무평가 판매',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
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
            <h3><span><b>무평가</b>로</span><br />자신있는 내 차를 빠르게 판매하세요!</h3>
            <p>복잡한 과정없이 비대면으로 내 차 팔기</p>
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
                <i className="ico-sell-01"/>
                <span className="free-intro-01"></span>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">상태 좋은 중고차</p>
                  <p className="exp">신차 등록일 33개월, 주행거리 3만 km 이내의 무사고 차량만 가능합니다.</p>
                </div>
              </li>
              <li>
                <i className="ico-sell-02" />
                <span className="free-intro-02"></span>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">온라인으로 간편하게</p>
                  <p className="exp">차량 번호 입력부터 판매 결정까지 비대면으로 진행합니다.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-sec">
            <div className="slide-steps-wrap">
              <h3>무평가 판매 이용 방법</h3>
              <div className="steps-frame">
                <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={mScreenInfo2} dots={true}>
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
                        <p className="tit">03. 상담하기</p>
                        <p className="exp">오토벨 상담사가 차량 정보 확인 및 예상 판매 금액 등 판매 진행을 도와드립니다.</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">04. 내 차 보내기</p>
                        <p className="exp">판매 가격 확정을 위해 고객님의 차량을 오토벨로 배송합니다.</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">05. 내 차 팔기 끝!</p>
                        <p className="exp">평가 결과와 최종 금액을 확인하고 거래를 완료하세요.</p>
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
          <Button className="fixed" size="full" background="blue80" title="무평가 판매 신청하기" href="/sell/freeStep01" />
        </div>
      </AppLayout>
    );
  }

  return <AppLayout>PC 화면으로 이동합니다.</AppLayout>;
};

export default FreeHome;
