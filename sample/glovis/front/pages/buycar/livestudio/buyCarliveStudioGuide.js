/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import FaqList from '@src/components/common/FaqList';
import BuyCarNav from '@src/components/buycar/BuyCarNav';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST } from '@src/actions/types';

const buyCarliveStudioGuide = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({ type: SECTION_BUY });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '오토벨 라이브 스튜디오 차량이란?',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, [dispatch, hasMobile]);
  if (hasMobile) {
    return (
      <AppLayout>
        <div className="live-wrap">
          <div className="live-tit">
            <h3>
              오토벨 <span>라이브 스튜디오 차량이란?</span>
            </h3>
            <p>차별화된 진단과 최고의 노하우로 사고유무확인부터 성능까지, 구매자가 직접 확인하기 어려운 부분을 오토벨이 확인한 차량입니다.</p>
          </div>

          <div className="live-sec content-wrap">
            <div className="tit-wrap">
              <h4 className="mt0">
                오토벨 <span>라이브 스튜디오</span>,<br />
                무엇이 좋을까요?
              </h4>
            </div>
            <div className="con-wrap">
              <div className="exp-wrap">
                <div className="tit">
                  <h5>
                    <span>01</span> 내·외부 360˚ LIVE 이미지
                  </h5>
                  <p>
                    라이브 스튜디오에서 촬영한 고해상도 외부 360˚, 내부 VR, wear&amp;tear 등 차량의 모든 부분을 생생하게 확인할 수 있습니다.
                  </p>
                </div>
                <ul className="img-group">
                  <li>
                    <img src="/images/dummy/live-img-01.jpg" alt="사진촬영 예시이미지" />
                  </li>
                  <li>
                    <img src="/images/dummy/live-img-s02.png" alt="사진촬영 예시이미지" />
                  </li>
                  <li>
                    <img src="/images/dummy/live-img-s03.png" alt="사진촬영 예시이미지" />
                  </li>
                  <li>
                    <img src="/images/dummy/live-img-s04.png" alt="사진촬영 예시이미지" />
                  </li>
                  <li>
                    <img src="/images/dummy/live-img-s05.png" alt="사진촬영 예시이미지" />
                  </li>
                  <li>
                    <img src="/images/dummy/live-img-s06.png" alt="사진촬영 예시이미지" />
                  </li>
                </ul>
              </div>
              <div className="exp-wrap">
                <div className="tit">
                  <h5>
                    <span>02</span> 차량 정보 확인 및 진단
                  </h5>
                  <p>오토벨 전문 평가사가 실 매물 확인부터 기본 및 옵션,<br />보험이력을 확인하여 믿을 수 있습니다.</p>
                </div>
                <div className="img-wrap">
                  <img src="/images/contents/studio-guide-img-01.png" alt="차량정보확인 예시이미지" />
                </div>
              </div>
              <div className="exp-wrap pd">
                <div className="tit">
                  <h5>
                    정밀 사고 진단
                  </h5>
                  <p>
                    정밀 검사를 통해 안전과 직결 되는 중요 부위의
                    <br />
                    사고 손상 유무를 정밀 진단하여 골격(프레임)
                    <br />
                    손상 차량을 선별합니다.
                  </p>
                </div>
                <div className="img-wrap">
                  <img src="/images/contents/studio-guide-img-02.png" alt="사고진단 이미지" />
                </div>
              </div>
              <div className="exp-wrap pd">
                <div className="tit">
                  <h5>
                    61가지 차량 진단
                  </h5>
                  <p>
                    차량 기본 및 사고 진단 외에 오토벨 라이브 스튜디오만의 <br /><span className="tx-blue60">61가지 차량 진단</span>을 통해 품질을 확인합니다.
                  </p>
                </div>
                <div className="img-wrap">
                  <img src="/images/contents/studio-guide-img-03.png" alt="기능진단 이미지" />
                </div>
              </div>
            </div>
          </div>

          <div className="live-sec content-wrap bt">
            <div className="tit-wrap">
              <h4 className="tx-l mt0">
                오토벨 라이브 스튜디오만의 
                <br />
                <span>61가지 차량진단</span>
              </h4>
              <p>오토벨 상세진단서로 차별화된 외장/실내/기능 진단을 확인하세요.</p>
            </div>
            <FaqList mode="live" />
          </div>

          <div className="live-sec content-sec">
            <div className="tit-wrap">
              <h4>오토벨 Live Check</h4>
              <p>
                전문 평가사가 직접 방문하여 라이브 스튜디오와
                <br />
                동일한 서비스를 제공합니다.
              </p>
            </div>
            <div className="img-wrap img-liveshot">
              <img src="/images/contents/studio-guide-liveshot.png" alt="기능진단 이미지" />
            </div>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="대상 차량 보러가기" href="/buycar/livestudio/buyCarList" />
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <BuyCarNav nowPage={'livestudio'} />
      <div className="content-sec">
        <div className="content-wrap live-wrap">
          <div className="live-tit">
            <h3>
              오토벨 <span>라이브 스튜디오 차량이란?</span>
            </h3>
            <p>
              차별화된 진단과 최고의 노하우로 사고유무확인부터 성능까지,<br />
              구매자가 직접 확인하기 어려운 부분을 오토벨이 확인한 차량입니다.
            </p>
            <Buttons align="center" marginTop={40}>
              <Button size="big" background="blue80" title="대상 차량 보러가기" width={160} href="buyCarList" />
            </Buttons>
          </div>
          <div className="live-sec">
            <div className="tit-wrap">
              <h4>
                오토벨 <span>라이브 스튜디오</span><br />
                무엇이 좋을까요?
              </h4>
            </div>
            <div className="con-wrap">

              <div className="exp-wrap">
                <div className="tit">
                  <h5>
                    내·외부 360˚ LIVE 이미지
                  </h5>
                  <p>라이브 스튜디오에서 촬영한 고해상도 외부 360˚, 내부 VR, wear&amp;tear 등 차량의 모든 부분을 생생하게 확인할 수 있습니다.</p>
                </div>
                <ul className="img-group">
                  <li>
                    <img src="/images/dummy/live-img-01.jpg" alt="사진촬영 예시이미지" />
                  </li>
                  <li>
                    <img src="/images/dummy/live-img-02.jpg" alt="사진촬영 예시이미지" />
                  </li>
                  <li>
                    <img src="/images/dummy/live-img-03.jpg" alt="사진촬영 예시이미지" />
                  </li>
                  <li>
                    <img src="/images/dummy/live-img-04.jpg" alt="사진촬영 예시이미지" />
                  </li>
                </ul>
              </div>

              <div className="exp-wrap">

                <div className="tit">
                  <h5>차량 정보 확인 및 진단</h5>
                </div>
                <dl className="car-manage-info">
                  <dt>전문 평가사 진단</dt>
                  <dd>오토벨 전문 평가사가 실 매물 확인부터 기본 및 옵션, 보험 이력을 확인하여 믿을 수 있습니다.</dd>
                </dl>
                <div className="img-wrap-manage mt64 mb4">
                  <img src="/images/contents/car-manage-img-01.png" alt="전문 평가사 진단 예시이미지" />
                </div>

                <dl className="car-manage-info">
                  <dt>61가지 차량 진단</dt>
                  <dd>오토벨 스튜디오는 차량 기본 및 사고 진단 외에 <span>61가지 기능 진단</span>을 통해 품질을 확인합니다.</dd>
                </dl>
                <div className="img-wrap-manage mt58 mb29">
                  <img src="/images/contents/car-manage-img-02.png" alt="61가지 차량 진단 예시이미지" />
                </div>

                <dl className="car-manage-info">
                  <dt>정밀 사고 진단</dt>
                  <dd>정밀 검사를 통해 안전과 직결 되는 중요 부위의 사고 손상 유무를 정밀 진단하여 골격(프레임) 손상 차량을 선별합니다.</dd>
                </dl>
                <div className="img-wrap-manage mt73">
                  <img src="/images/contents/car-manage-img-03.png" alt="정밀 사고 진단 예시이미지" />
                </div>

              </div>

            </div>
          </div>
          <div className="live-sec benefit">
            <div className="tit-wrap">
              <h4>
                오토벨 라이브 스튜디오만의 <span>61가지 차량진단</span>
              </h4>
              <p>오토벨 상세진단서로 차별화된 외장/실내/기능 진단을 확인하세요.</p>
            </div>
            <div className="con-wrap">
              <table summary="라이브 스튜디오 제공 서비스 정보에 대한 내용" className="table-tp1 th-c">
                <caption className="away">라이브 스튜디오 제공 서비스</caption>
                <colgroup>
                  <col width="22%" />
                  <col width="78%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>외장 진단</th>
                    <td>
                      앞유리 상태, 뒷유리 상태, 창문상태, 광택상태, 와이퍼 작동 상태, 텐트, 흡집 상태, 도장 상태,
                      <br />휠 상태, 타이어 상태, 번호판 상태, 플라스틱류 부품 상태 총 15가지 항목
                    </td>
                  </tr>
                  <tr>
                    <th>실내 진단</th>
                    <td>
                      실내세정 확인, 글로스 박스 상태, 대시보도, 룸미러, 거울 유리창 내면,
                      트렁크, 모든 시트, 모든 매트,<br /> 안전벨트 청결 상태, 악취, 루프 라이닝, 보조키, 매뉴얼, 스페어타이어 총 14가지 항목
                    </td>
                  </tr>
                  <tr>
                    <th>기능 진단</th>
                    <td>
                      모든 잠김장치, 스마트키, 모든 실내등, 외부 라이트, 계기판, 메모리 시트, 전동 시트 조절, 열선 스터어링 ,<br />
                      창문개폐, 선루프, 경적, 시트열선, 통풍, 마사지 , 12V 충전단자, USB작동, 안전벨트, 에어컨, 히터, 네비게이션,
                      <br />
                      후방카메라, 360 어라운드 뷰, 주차 보조 시스템 총 32가지 항목
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="live-sec liveshot">
            <div className="tit-wrap">
              <h4>
                스튜디오까지 방문이 어려운 차량을 위한 <span>오토벨 Live Check</span>
              </h4>
              <p>전문 평가사가 직접 차량이 있는 곳으로 방문하여 라이브 스튜디오와 동일한 서비스를 제공합니다.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="content-wrap buy-wrap">
      </div> */}
    </AppLayout>
  );
};

export default buyCarliveStudioGuide;
