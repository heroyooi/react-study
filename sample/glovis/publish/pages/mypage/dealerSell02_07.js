import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Steps from '@lib/share/items/Steps';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_MYPAGE } from '@src/actions/types';

/*
html 변경이력
  03.17 : 가격 및 차량소개와 성능점검 서로 위치 바뀜 
*/

const DealerSell02_07 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        
        <div className="mypage-state-sec payment-sec">
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={5} /> {/* 가격 및 차량소개와 성능점검 서로 위치 바뀜 */}
          </div>

          <h3 className="sub-tit">이용권 결제</h3>
          <div className="admin-list tp2">
            <div className="content-top">
              <div className="img-cover">
                <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
              </div>
              <div className="summary">
                <h5 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h5>
                <ul className="info">
                  <li>00가0000</li>
                  <li>09/12식(10년형)</li>
                  <li>84,761km</li>
                  <li>오토</li>
                  <li>디젤</li>
                </ul>
                <p className="price-tp6">7,760<span className="won">만원</span></p>
              </div>
            </div>
          </div>
          <div className="usage-wrap">
            <p className="tag-tp5">차량등록상품</p>
            <RadioGroup
              dataList={[
                {id:'radio1', value:1, checked:true, disabled:false, title:'경매 낙찰 이용권'},
                {id:'radio2', value:2, checked:false, disabled:false, title:'대당 이용권'},
                {id:'radio3', value:3, checked:false, disabled:false, title:'10대 자유 이용권'}
              ]} defaultValue={1} className="tx-list" mode="vertical"
            >
              <RadioItem>
                <p>경매장에서 낙찰받은 차량 한대를 등록할 수 있습니다.</p>
                <span className="price">50,000원</span>
              </RadioItem>
              <RadioItem>
                <p>차종 제한없이 차량 한대를 등록할 수 있습니다.</p>
                <span className="price">24,000원</span>
              </RadioItem>
              <RadioItem>
                <p>잔여 3대</p>
                <span className="price">0원</span>
              </RadioItem>
            </RadioGroup>
          </div>

          <div className="usage-wrap">
            <p className="tag-tp5">부가상품</p>

            <ul className="tx-list">
              <li>
                <CheckBox id='chk1' title='Bestpick 이용권' />
                <p>경매장에서 낙찰받은 차량 한대를 등록할 수 있습니다.</p>
                <span className="price">50,000<em>원</em></span>
              </li>
              <li>
                <CheckBox id='chk2' title='업데이트 20 대당' />
                <p>차종 제한없이 차량 한대를 등록할 수 있습니다.</p>
                <span className="price">24,000<em>원</em></span>
              </li>
            </ul>
          </div>

          <div className="pick-list">
            <ul>
              <li>대당 이용권</li>
              <li>1개월 5대</li>
              <li>138,000원</li>
            </ul>
            <ul>
              <li>업데이트 20 대당</li>
              <li>3개월 10대</li>
              <li>742,000원</li>
            </ul>
            <ul>
              <li>프라이싱 10회</li>
              <li>10회</li>
              <li>10,000원</li>
            </ul>
          </div>
          <div className="sum">
            <p>합계 금액</p>
            <p className="price">890,000<span>원</span></p>
          </div>
          
          <Buttons marginTop={51}>
            <span className="step-btn-l">
              <Button size="big" background="gray" title="이전" width={150} height={60} />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="다음" width={150} height={60} mode="normal" />
            </span>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerSell02_07