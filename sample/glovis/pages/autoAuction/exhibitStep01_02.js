import { useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Steps from '@lib/share/items/Steps';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import Button from '@lib/share/items/Button';
import Link from 'next/link';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { radio_auction_house, auction_check_list } from '@src/dummy';


const ExhibitStep01_02 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
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
        bottom: 80,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={2} mode="stick" />
        </div>
        
        <div className="content-wrap radio-auction-chk">
          <RadioGroup
            dataList={radio_auction_house}
            defaultValue={1}
            boxType={true}
          >
            <RadioItem>
              <p className="tit4">분당 경매장</p>
              <p className="con">서울 중앙/동부/남부/동북부, 경기 남부지역에서<br />이용하시면 편리합니다.</p>
              <Link href="viewMap?seq=1"><a>위치보기</a></Link>
            </RadioItem>
            <RadioItem>
              <p className="tit4">양산 경매장</p>
              <p className="con">부산, 울산, 대구, 경상도 지역에서<br />이용하시면 편리합니다.</p>
              <Link href="viewMap?seq=2"><a>위치보기</a></Link>
            </RadioItem>
            <RadioItem>
              <p className="tit4">사화 경매장</p>
              <p className="con">서울 서부/서북부, 인천, 경기 서부지역에서<br />이용하시면 편리합니다.</p>
              <Link href="viewMap?seq=3"><a>위치보기</a></Link>
            </RadioItem>
          </RadioGroup>
          <Button className="fixed" size="full" background="blue80" title="다음" href="exhibitStep02" />    
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

export default ExhibitStep01_02;