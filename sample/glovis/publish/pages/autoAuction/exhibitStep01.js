import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import AuctionCheckBoxGroup from '@src/components/common/AuctionCheckBoxGroup';
import Steps from '@lib/share/items/Steps';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { radio_auction_house, auction_check_list } from '@src/dummy';
import { auction_check_term } from '@src/dummy/terms';

const ExhibitStep01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });

  const [auctionHousePopup, setAuctionHousePopup, openHousePopup, closeHousePopup] = useRodal(false, true);
  const [defaultTab, setDefaultTab] = useState(0);
  const popupOpen = (e, n) => {
    e.preventDefault();
    setDefaultTab(n);
    setAuctionHousePopup(true);
  }
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '내 차 출품하기',
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
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={1} mode="stick" />
        </div>
        <div className="member-sec auction-chk-terms">        
          <div className="content-wrap member-contents">
            <h3 className="away">경매약관 및 주의사항</h3>
            <form className="register-form">
              <AuctionCheckBoxGroup
                title="전체동의 합니다."
                id="chk-agree-all"
                agree_list={auction_check_list}
                agree_term={auction_check_term}
                links={['/autoAuction/termsView?seq=0', '/autoAuction/termsView?seq=1', '/autoAuction/termsView?seq=2', '/autoAuction/termsView?seq=3', '/autoAuction/termsView?seq=4']}
              /> 
              <p className="tx-sub tx-red80 mt8" style={{paddingLeft:28}}>오토옥션 경매약관 및 주의사항 동의를 해주세요</p>       
            </form>
            <Button className="fixed" size="full" background="blue80" title="다음" href="exhibitStep01_02" />    
          </div>
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
        <Steps type={1} contents={['경매약관 및 주의사항', '회원정보', '차량정보', '탁송신청']} active={1} />
      </div>
      <div className="content-sec auction-chk-terms">
        <div className="content-wrap">
          <h3>경매약관 및 주의사항</h3>
          <form className="register-form">
            <AuctionCheckBoxGroup
              title="전체 동의"
              id="chk-agree-all"
              agree_list={auction_check_list}
              agree_term={auction_check_term}
            />
          </form>
        </div>
      </div>
      <div className="content-wrap auction-house-sel">
        <h4>경매장 선택</h4>
        <RadioGroup
          dataList={radio_auction_house}
          defaultValue={1}
          boxType={true}
          className="mb20"
        >
          <RadioItem>
            <p className="con">서울 중앙/동부/남부/동북부, 경기 남부지역에서<br />이용하시면 편리합니다.</p>
            <Button size="mid" line="gray" color="darkgray" title="위치보기" width={85} height={32} marginTop={24} fontSize={16} onClick={(e) => popupOpen(e, 0)} />
          </RadioItem>
          <RadioItem>
            <p className="con">부산, 울산, 대구, 경상도 지역에서<br />이용하시면 편리합니다.</p>
            <Button size="mid" line="gray" color="darkgray" title="위치보기" width={85} height={32} marginTop={24} fontSize={16} onClick={(e) => popupOpen(e, 1)} />
          </RadioItem>
          <RadioItem>
          <p className="con">서울 서부/서북부, 인천, 경기 서부지역에서<br />이용하시면 편리합니다.</p>
            <Button size="mid" line="gray" color="darkgray" title="위치보기" width={85} height={32} marginTop={24} fontSize={16} onClick={(e) => popupOpen(e, 2)} />
          </RadioItem>
        </RadioGroup>
        <Buttons align="center" marginTop={60}>
          <Button size="big" background="blue80" title="다음 단계로" width={240} height={72} href="exhibitStep02" />
        </Buttons>
      </div>

      {
        auctionHousePopup &&
        <RodalPopup show={auctionHousePopup} type={'slideUp'} closedHandler={closeHousePopup} title="경매장 위치 안내" mode="normal" size="medium">
          <div className="con-wrap">
            <TabMenu type="type1" className="auction-house" defaultTab={defaultTab}>
              <TabCont tabTitle="분당 경매장" id="auction-house-1" index={0}>
                <iframe  id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8997624344956!2d127.01552801565039!3d37.51028223510467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3de09019397%3A0xcc5f8d201cd1f459!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDsnqDsm5Drj5kg7Iug67CY7Y-s66GcIDMxMQ!5e0!3m2!1sko!2skr!4v1571620018249!5m2!1sko!2skr" width="100%" height="400" frameBorder="0" allowFullScreen></iframe>
                <div className="auction-house-info">
                  <ul>
                    <li><span>· 구분</span>오토벨분당센터</li>
                    <li><span>· 전화</span>031-760-5309</li>
                    <li><span>· 주소</span>(12773) 경기도 광주시 능평로 167</li>
                    <li><span>· 팩스</span>031-768-4671</li>
                  </ul>
                </div>
              </TabCont>
              <TabCont tabTitle="양산 경매장" id="auction-house-2" index={1}>
                <iframe  id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8997624344956!2d127.01552801565039!3d37.51028223510467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3de09019397%3A0xcc5f8d201cd1f459!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDsnqDsm5Drj5kg7Iug67CY7Y-s66GcIDMxMQ!5e0!3m2!1sko!2skr!4v1571620018249!5m2!1sko!2skr" width="100%" height="400" frameBorder="0" allowFullScreen></iframe>
                <div className="auction-house-info">
                  <ul>
                    <li><span>· 구분</span>오토벨양산센터</li>
                    <li><span>· 전화</span>055-370-2803</li>
                    <li><span>· 주소</span>(50567) 경남 양산시 산막공단북9길 33</li>
                    <li><span>· 팩스</span>055-367-5775</li>
                  </ul>
                </div>
              </TabCont>
              <TabCont tabTitle="시화 경매장" id="auction-house-3" index={2}>
                <iframe  id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8997624344956!2d127.01552801565039!3d37.51028223510467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3de09019397%3A0xcc5f8d201cd1f459!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDsnqDsm5Drj5kg7Iug67CY7Y-s66GcIDMxMQ!5e0!3m2!1sko!2skr!4v1571620018249!5m2!1sko!2skr" width="100%" height="400" frameBorder="0" allowFullScreen></iframe>
                <div className="auction-house-info">
                  <ul>
                    <li><span>· 구분</span>오토벨시화센터</li>
                    <li><span>· 전화</span>031-496-5007</li>
                    <li><span>· 주소</span>(15073) 경기도 시흥시 정왕천로 271</li>
                    <li><span>· 팩스</span>031-434-8601</li>
                  </ul>
                </div>
              </TabCont>
            </TabMenu>          
          </div>
        </RodalPopup>
      }
      

    </AppLayout>
  )
}

export default ExhibitStep01;