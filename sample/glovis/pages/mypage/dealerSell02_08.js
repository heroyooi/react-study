import { useState, useCallback } from 'react'; // #a1
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Steps from '@lib/share/items/Steps';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import useRodal from '@lib/share/custom/useRodal'; // #a1
import RodalPopup from '@lib/share/popup/RodalPopup';// #a1
import { SECTION_MYPAGE } from '@src/actions/types';

/*
html 변경이력
  03.17 : 가격 및 차량소개와 성능점검 서로 위치 바뀜
        : 증빙선택 추가, 약관부분 추가  #a1 참고 부분
*/

const DealerSell02_08 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  // #a1 추가 start
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);

  const handleChangeAgree = useCallback((e) =>{
    console.log(e.target)
  }, [])

  const handleChangeTerm1 = useCallback((e) => {
    setTerm1(prevTerm => !prevTerm);
    if (term1 === false) {
      rodalPopupHandler1(e, "fade");
    }
  }, [term1]);
  const handleChangeTerm2 = useCallback((e) => {
    setTerm2(prevTerm => !prevTerm);
    if (term2 === false) {
      rodalPopupHandler2(e, "fade");
    }
  }, [term2]);
  // #a1 추가 end
  
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        
        <div className="mypage-state-sec payment-sec method">
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={5} /> {/* 가격 및 차량소개와 성능점검 서로 위치 바뀜  */}
          </div>

          <h3 className="sub-tit">이용권 결제</h3>
          <div className="point-area">
            <div className="pay-detail">
              <h4>구매내역</h4>
              <div className="pick-list">
                <ul>
                  <li>자유이용권</li>
                  <li>1개월 5대</li>
                  <li>138,000원</li>
                </ul>
                <ul>
                  <li>업데이트 20 자유</li>
                  <li>3개월 10대</li>
                  <li>742,000원</li>
                </ul>
                <ul>
                  <li>프라이싱 10회</li>
                  <li>10회</li>
                  <li>10,000원</li>
                </ul>
                <div className="sum">
                  <p>합계 금액</p>
                  <p className="price">890,000<span>원</span></p>
                </div>
              </div>
            </div>
            <div className="point-wrap">
              <div className="point">
                <CheckBox id='chk1' title='포인트 적용' />
                <p>보유포인트<span>3,000</span>원</p>
              </div>
              <Input type="text" placeHolder="" width={318} height={48} value="사용할 포인트를 입력하세요" />
              <CheckBox id='chk2' title='포인트 모두 사용' size="small" />
            </div>
            <div className="coupon-wrap">
              <div className="coupon">
                <CheckBox id='chk3' title='쿠폰 적용' />
                <p>적용 가능한 보유쿠폰<span>3</span>장</p>
              </div>
              <RadioGroup
                dataList={[
                  {id:'radio1', value:1, checked:true, disabled:false, title:'15% 할인 쿠폰'},
                  {id:'radio2', value:2, checked:false, disabled:false, title:'1,000원 할인 쿠폰'},
                  {id:'radio3', value:3, checked:false, disabled:false, title:'신규회원 가입 할인 쿠폰 신규회원 가입 할인 쿠폰'}
                ]} defaultValue={1} size="small" mode="vertical"
              ></RadioGroup>
              <p className="ex">
                적립된 포인트는 3,000원부터 사용이 가능하며 쿠폰, 포인트 결제 금액을 제외한 구매 금액의 N%가 포인트로 적립됩니다.<br />
                <span className="tx-red80">쿠폰 적용 시에는 추가 결제와 혼합 사용하실 수 없습니다.</span>
              </p>
            </div>
          </div>
          <div className="last-sum">
            <ul>
              <li>이용권금액<span>890,000<em>원</em></span></li>
              <li>할인금액<span>12,000<em>원</em></span></li>
              <li>최종결제금액<span>878,000<em>원</em></span></li>
            </ul>
          </div>

          <div className="method-wrap">
            <p>결제 수단</p>
            <RadioGroup
              dataList={[
                {id:'radio4', value:1, checked:true, disabled:false, title:'신용카드'},
                {id:'radio5', value:2, checked:false, disabled:false, title:'휴대전화'},
                {id:'radio6', value:3, checked:false, disabled:false, title:'무통장입급'},
                {id:'radio7', value:4, checked:false, disabled:false, title:'카카오페이'},
                {id:'radio8', value:5, checked:false, disabled:false, title:'네이버페이'}
              ]} defaultValue={1}
            ></RadioGroup>
          </div>

          {/* #a1 증빙선택 추가, 약관추가 start */}    
          <div className="method-wrap col2  mt40">
            <p>증빙 선택</p>
            <RadioGroup
              dataList={[
                { id: 'radio9', value: 1, checked: true, disabled: false, title: '현금영수증 신청' },
                { id: 'radio10', value: 2, checked: false, disabled: false, title: '세금계산서 신청' }                                  
              ]} defaultValue={1}
            ></RadioGroup>
             <p className="ex">현금영수증/세금계산서 중 1개만 증빙자료로 신청이 가능합니다. </p>
          </div>

          <div className="register-agree">
            <CheckBox id='chk-useGuide1' title='현금영수증 신청 (필수)' termPop={true} onChange={handleChangeAgree} termPopHandle={handleChangeTerm1} />
            <CheckBox id='chk-useGuide2' title='매물등록 규정 확인 (필수)' termPop={true} onChange={handleChangeAgree} termPopHandle={handleChangeTerm2} />
          </div>    
          {/* #a1 증빙선택 추가, 약관추가 팝업 end */}

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

      {/* #a1 약관 팝업 추가 start*/}
      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} title="현금영수증 신청 (필수)" mode="normal" size="medium">
        <div className="con-wrap">
          약관내용
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="매물등록 규정 확인(필수)" mode="normal" size="medium">
        <div className="con-wrap">
          약관내용
        </div>
      </RodalPopup>
      {/* #a1 약관 팝업 추가 end*/}

    </AppLayout>
  )
}

export default DealerSell02_08