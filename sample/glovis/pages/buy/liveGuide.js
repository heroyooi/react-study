import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import FaqList from '@src/components/common/FaqList';
import CarFilter from '@src/components/common/CarFilter';
import BannerItem from '@src/components/common/banner/BannerItem';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { car_list } from '@src/dummy';

const LiveGuide = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

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
    return (
      <AppLayout>
        <div className="live-wrap">
          <div className="live-tit">
            <h3>오토벨 <span>라이브 스튜디오 차량이란?</span></h3>
            <p>
              사고 유무 확인부터 성능까지, 구매자가<br />
              직접 확인하기 어려운 모든 부분을 진단하여<br />
              제공되는 엄선된 차량입니다.
              </p>
          </div>

          <div className="live-sec content-wrap">
            <div className="tit-wrap">
              <h4>왜 믿을 수 있는<br />오토벨 <span>라이브 스튜디오</span>인가요?</h4>
            </div>
            <div className="con-wrap">
              <div className="exp-wrap">
                <div className="tit">
                  <h5><span>01</span> 사진 촬영</h5>
                  <p>전문 촬영장에서 고해상도 외부 360˚,<br />내부 VR, wear&amp;tear, Key point등을 촬영합니다.</p>
                </div>
                <ul className="img-group">
                  <li><img src="/images/dummy/live-img-01.jpg" alt="사진촬영 예시이미지" /></li>
                  <li><img src="/images/dummy/live-img-02.jpg" alt="사진촬영 예시이미지" /></li>
                  <li><img src="/images/dummy/live-img-03.jpg" alt="사진촬영 예시이미지" /></li>
                  <li><img src="/images/dummy/live-img-04.jpg" alt="사진촬영 예시이미지" /></li>
                  <li><img src="/images/dummy/live-img-04.jpg" alt="사진촬영 예시이미지" /></li>
                  <li><img src="/images/dummy/live-img-04.jpg" alt="사진촬영 예시이미지" /></li>
                </ul>
              </div>
              <div className="exp-wrap">
                <div className="tit">
                  <h5><span>02</span> 차량 정보 확인</h5>
                  <p>전문 평가사가 실 매물 확인부터, 차량 정보,<br />옵션 등 차별화된 정확한 차량 정보를 확인합니다.</p>
                </div>
                <div className="img-wrap"><img src="/images/dummy/live-img-01.jpg" alt="차량정보확인 예시이미지" /></div>
              </div>
              <div className="exp-wrap pd">
                <div className="tit">
                  <h5><span>03</span> 사고 진단</h5>
                  <p>정밀 검사를 통해 안전과 직결 되는 중요 부위의<br />사고 손상 유무를 정밀 진단하여 골격(프레임)<br />손상 차량을 선별합니다.</p>
                </div>
                <div className="img-wrap"><img src="/images/dummy/live-img-06.png" alt="사고진단 이미지" /></div>
              </div>
              <div className="exp-wrap pd">
                <div className="tit">
                  <h5><span>04</span> 기능 진단</h5>
                  <p>오토벨 스튜디오는 차량 기본 및 사고 진단 외에<br />66가지 기능 진단을 통해 품질을 확인합니다.</p>
                </div>
                <div className="img-wrap"><img src="/images/dummy/live-img-07.png" alt="기능진단 이미지" /></div>
              </div>
            </div>
          </div>

          <div className="live-sec content-wrap bt">
            <div className="tit-wrap">
              <h4 className="tx-l">오토벨 라이브 스튜디오만의<br /><span>제공서비스 3가지</span></h4>
              <p>66가지 차량 진단 (외장/실내/기능)</p>
            </div>
            <FaqList mode="live" />
          </div>

          <div className="live-sec content-sec">
            <div className="tit-wrap">
              <h4>오토벨 Live Shot</h4>
              <p>전문 평가사가 직접 방문하여 라이브 스튜디오와<br />동일한 서비스를 제공합니다.</p>
            </div>
          </div>

        </div>
        <Button className="fixed" size="full" background="blue80" title="진단차량 보러가기" href="/buy/liveList" />
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="list-nav-sec">
        <ul className="content-wrap">
          <li><Link href="list"><a><i className="ico-allcar"></i><span>전체차량</span></a></Link></li>
          <li className="on"><Link href="liveList"><a><i className="ico-livestudio"></i><span>라이브스튜디오</span></a></Link></li>
          <li><Link href="auctionList"><a><i className="ico-bid"></i><span>경매낙찰차량</span></a></Link></li>
          <li><Link href="certifyMall"><a><i className="ico-income"></i><span>인증몰</span></a></Link></li>
        </ul>
      </div>
      <div className="content-sec">
        <div className="content-wrap live-wrap">
          <div className="live-tit">
            <h3>오토벨 <span>라이브 스튜디오 차량이란?</span></h3>
            <p>
              차별화된 진단과  최고의 노하우로  사고 유무 확인부터 성능까지,<br />
              구매자가 직접 확인하기 어려운 모든 부분을 확인하여  제공되는 차량 입니다.
            </p>
            <Buttons align="center" marginTop={40}>
              <Button size="big" background="blue80" title="진단차량 보러가기" width={160} href="/buy/liveList" />
            </Buttons>
          </div>

          <div className="live-sec">
            <div className="tit-wrap">
              <h4>왜 믿을 수 있는<br />오토벨 <span>라이브 스튜디오</span>인가요?</h4>
            </div>
            <div className="con-wrap">
              <div className="exp-wrap">
                <div className="tit">
                  <h5><span>01</span> 사진 촬영</h5>
                  <p>전문 촬영장에서 고해상도 외부 360˚, 내부 VR, wear&amp;tear, Key point등을 촬영합니다.</p>
                </div>
                <ul className="img-group">
                  <li><img src="/images/dummy/live-img-01.jpg" alt="사진촬영 예시이미지" /></li>
                  <li><img src="/images/dummy/live-img-02.jpg" alt="사진촬영 예시이미지" /></li>
                  <li><img src="/images/dummy/live-img-03.jpg" alt="사진촬영 예시이미지" /></li>
                  <li><img src="/images/dummy/live-img-04.jpg" alt="사진촬영 예시이미지" /></li>
                </ul>
              </div>
              <div className="exp-wrap">
                <div className="tit fr">
                  <h5><span>02</span> 차량 정보 확인</h5>
                  <p>전문 평가사가 실 매물 확인부터, 차량 정보,<br />옵션 등 차별화된 정확한 차량 정보를 확인합니다.</p>
                  <ul className="info">
                    <li>세이프터 썬루프</li>
                    <li>하이패스 시스템</li>
                    <li>스마트 후속방</li>
                    <li>스마트 패키지</li>
                    <li>네비게이션</li>
                  </ul>
                </div>
                <div className="img-wrap fl"><img src="/images/dummy/live-img-05.jpg" alt="차량정보확인 예시이미지" /></div>
              </div>
              <div className="exp-wrap fl">
                <div className="tit">
                  <h5><span>03</span> 사고 진단</h5>
                  <p>정밀 검사를 통해 안전과 직결 되는 중요 부위의<br />사고 손상 유무를 정밀 진단하여 골격(프레임) 손상 차량을<br />선별합니다.</p>
                </div>
                <div className="img-wrap"><img src="/images/dummy/live-img-06.png" alt="사고진단 이미지" /></div>
              </div>
              <div className="exp-wrap fr">
                <div className="tit">
                  <h5><span>04</span> 기능 진단</h5>
                  <p>오토벨 스튜디오는 차량 기본 및 사고 진단 외에<br /><span>66가지 기능 진단</span>을 통해 품질을 확인합니다.</p>
                </div>
                <div className="img-wrap"><img src="/images/dummy/live-img-07.png" alt="기능진단 이미지" /></div>
              </div>
            </div>
          </div>

          <div className="live-sec">
            <div className="tit-wrap">
              <h4>오토벨 라이브 스튜디오만의 <span>제공서비스 3가지</span></h4>
              <p>66가지 차량 진단 (외장/실내/기능)</p>
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
                      앞유리 상태, 뒷유리 상태, 창문상태, 스티커 제거, 광택상태,  와이퍼 작동 상태, 텐트, 흡집 상태, 도장 상태,<br />휠 상태, 타이어 상태, 번호판 상태, 플라스틱류 부품 상태 총 12가지 항목
                    </td>
                  </tr>
                  <tr>
                    <th>실내 진단</th>
                    <td>
                      실내상태, 실내세정 확인, 금연차량여부, 글로스 박스 상태, 대시보도, 실내장식, 룸미러, 거울 유리창 내면,<br />트렁크, 모든 시트, 모든 매트, 안전벨트 청결 상태, 악취, 루프 라이닝, 보조키, 매뉴얼, 스페어타이어, 도어 및<br />내장 트림, 스티커 제거 상태  총 19가지 항목
                    </td>
                  </tr>
                  <tr>
                    <th>기능 진단</th>
                    <td>
                      모든 잠김장치, 스마트키, 모든 실내등, 외부 라이트, 계기판, 메모리 시트, 전동 시트 조절, 열선 스터어링 ,<br />창문개폐, 선루프, 경적, 시트열선, 통풍, 마사지 , 12V 충전단자, USB작동, 안전벨트, 에어컨, 히터, 네비게이션,<br />후방카메라, 360 어라운드 뷰, 주차 보조 시스템 총 35가지 항목
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="live-sec">
            <div className="tit-wrap">
              <h4>스튜디오까지 방문이 어려운 차량을 위한 <span>오토벨 Live Shot</span></h4>
              <p>전문가 평가사가 직접 차량이 있는 곳으로 방문하여 라이브 스튜디오와 동일한 서비스를 제공합니다.</p>
              <div className="img-wrap"><img src="/images/dummy/live-img-08.png" alt="오토벨 Live Shot 이미지" /></div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="content-wrap buy-wrap">
        
      </div> */}
    </AppLayout>
  )
}

export default LiveGuide
