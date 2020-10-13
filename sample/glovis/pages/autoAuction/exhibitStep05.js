import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ExhibitStep05 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const now = moment();
  const [consignMode, setConsignMode] = useState(1);
  const handleConsignChange = useCallback((e) => {
    setConsignMode(Number(e));
  }, []);
    
  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '출품완료',
        options: ['back', 'close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 76,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="auction-complete-wrap">
          <div className="content-wrap tx">
            <div className="auction-tit tx-c">
              <h4 className="tit2">출품 신청이 완료되었습니다.</h4>
              <p className="tx-tp2 mt8"><span>※</span>차량 탁송이 완료된 후, 경매가 진행됩니다.</p>
            </div>
            <div className="license-plate-wrap">
              <div className="license-plate">
                <span className="car-number">01가 1234</span>
              </div>
              <div className="license-plate">
                <span className="car-number">02가 1235</span>
              </div>
            </div>
          </div>
          <Buttons align="center" className="fixed full">
            <Button size="big" background="blue20" color="blue80" title="출품 내역 확인" />
            <Button size="big" background="blue80" title="확인" href="/autoAuction/auctionHome" />
          </Buttons>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>내 차 출품하기</h3>
          <p>공개 경쟁 입찰의 오토옥션으로 내 차를 최고가로 판매하세요.</p>
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
              <div className="license-plate">
                <span className="car-number">01가 1234</span>
              </div>
            </div>
            <p className="tail-info"><span>※</span>차량 탁송이 완료된 후, 경매가 진행됩니다.</p>
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" line="black" color="black" title="나의 출품 내역 확인" width={240} height={72} />
              <Button size="big" background="blue80" title="확인" width={240} height={72} href="/autoAuction/auctionHome" />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default ExhibitStep05;