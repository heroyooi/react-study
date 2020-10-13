import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerSell06Info = () => {

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Studio 안내',
        options: ['back', 'gnb', 'transparent']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="mypage-state-sec dealer-live-sec">
          <div className="top-banner">
            <h3>Live Studio<br />촬영을 예약하세요.</h3>
            <p>매번 사진 촬영에 광고등록 번거로우시죠?<br />이제 쉽게 사진 촬영 , 진단 및 광고등록 까지<br />한번에 해결해 드립니다.</p>
          </div>

          <div className="content-wrap live-sec">
            <h3 className="tit2">Live Studio란?</h3>
            <p className="tit3">오토벨 Live Studio 66가지 진단 점검을 통해 해당 차량에 대하여 완전무사고/무사고/유사고 진단분류기준을 제공하여, 고객에게 판매할 차량에 대하여 높은 신뢰도를 제공해드립니다.</p>
            <Link href="/mypage/dealerSell06_01"><a>자세히보기</a></Link>
            <ul className="tx-list">
              <li>
                <div className="img-wrap">
                  <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                </div>
                <div className="summary">
                  <div className="float-wrap btn-xs">
                    <h4 className="tit3">Live Studio</h4>
                    <Button size="sml" background="blue80" radius={true} title="예약신청" width={76} height={24} fontSize={10} fontWeight={500} />
                  </div>
                  <p>오토벨 라이브 스튜디오 촬영장에서 전문 촬영장비를 통한 촬영 및 진단 점검을 진행합니다.</p>
                </div>
              </li>
              <li>
                <div className="img-wrap">
                  <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                </div>
                <div className="summary">
                  <div className="float-wrap btn-xs">
                    <h4 className="tit3">Live Shot</h4>
                    <Button size="sml" background="blue80" radius={true} title="예약신청" width={76} height={24} fontSize={10} fontWeight={500} />
                  </div>
                  <p>차량이 있는 장소로 방문하여 촬영 및 진단 점검을 진행합니다.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="content-sec">
            <h4 className="tit3">예약현황 조회</h4>
            <p className="tit3">Live Service를 신청하셨나요?<br />예약현황 및 이용하신 내역을 확인해보세요.</p>
            <Buttons align="center" marginTop={8}>
              <Button size="sml" line="gray" radius={true} title="예약현황" width={53} height={24} fontSize={10} href="/mypage/dealerSell06" />
            </Buttons>
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default DealerSell06Info