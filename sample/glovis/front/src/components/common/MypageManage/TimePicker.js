import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Marker from '@src/components/common/Marker';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import RadioGroup from '@lib/share/items/RadioGroup';
import Input from '@lib/share/items/Input';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import CheckBox from '@lib/share/items/CheckBox';
import useRodal from '@lib/share/custom/useRodal';
import Radio from '@lib/share/items/Radio';
import useRadio from '@lib/share/custom/useRadio';
//import { DealerContext } from '@pages/mypage/dealerSell01';
import { DealerContext } from '@pages/mypage/dealer/sellcar/carManagement';
import { getMyTime } from '@src/actions/mypage/dealer/sellcar/carManagementAction';

const TimePicker = () => {
  console.log(getMyTime);

/*   const dispatch = useDispatch();

  const [myTime2, setMyTime2] = useState({});  //딜러상품의 현 업데이트 시간
  const myTime2Data = useSelector((state) => state.carManagement.myTime2);

  useEffect(() => {
    dispatch(getMyTime());
  }, []);

  useEffect(() => {
    setMyTime2(myTime2Data);
  }, [myTime2Data]); */

  const wrapperRef = useRef(null);
  const { rodalShow7, setRodalShow7, modalCloseHandler7 } = useContext(DealerContext);
  const [isValue1, isView1, handleChange1] = useRadio(0);

  const [rodalShow7_1, setRodalShow7_1, rodalPopupHandler7_1, modalCloseHandler7_1] = useRodal(false);
  const [rodalShow7_2, setRodalShow7_2, rodalPopupHandler7_2, modalCloseHandler7_2] = useRodal(false);
  const [rodalShow7_3, setRodalShow7_3, rodalPopupHandler7_3, modalCloseHandler7_3] = useRodal(false);
  const [rodalShow7_4, setRodalShow7_4, rodalPopupHandler7_4, modalCloseHandler7_4] = useRodal(false);
  const [rodalShow7_5, setRodalShow7_5, rodalPopupHandler7_5, modalCloseHandler7_5] = useRodal(false);
  const [rodalShow7_6, setRodalShow7_6, rodalPopupHandler7_6, modalCloseHandler7_6] = useRodal(false);
  const [rodalShow7_7, setRodalShow7_7, rodalPopupHandler7_7, modalCloseHandler7_7] = useRodal(false);

  //24:00 => 1440 변환
  const calcTime = useCallback((tempTime) => {
    return tempTime.map((item, i) => {
      let hour = item.split(':')[0];
      let minute = item.split(':')[1];
      return parseInt(hour) * 60 + parseInt(minute);
    });
  }, []);

  //1440 => 24:00 변환
  const timeCalc = useCallback((tempTime) => {
    return tempTime.map((item, i) => {
      let tempHour = 0,
        tempMinute = 0;

      tempHour = Math.floor(item / 60);
      tempMinute = item - tempHour * 60;
      if (tempHour < 10) {
        tempHour = '0' + tempHour;
      }
      if (tempMinute < 10) {
        tempMinute = '0' + tempMinute;
      }
      return tempHour + ':' + tempMinute;
    });
  }, []);

   //내 시간 배열
  const myTime2 = [
    {
      id: '0',
      name: '소나타1 업데이트',
      time: ['01:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
    }
  ]; 

 
  //업데이트 시간 보관함의 시간 배열 dummy
  const dummyTime = [
    {id:'0', name:'소나타1 업데이트', time:['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']},
    {id:'1', name:'소나타2 업데이트', time:['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']},
    {id:'2', name:'소나타3 업데이트', time:['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']},
    {id:'3', name:'소나타4 업데이트', time:['08:00','12:00','16:00','20:00']},
    {id:'4', name:'소나타5 업데이트', time:['08:00','12:00','16:00','20:00']},
    {id:'5', name:'소나타6 업데이트', time:['01:30','02:30','03:30','04:30','05:30','06:30','07:30','08:30','09:30','10:30','11:30','12:30','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30','21:30','22:30','23:30','24:30']}
  ];

  const [ratioX, setRatioX] = useState(0); //거리별 시간 비율
  const [adInfo, setAdInfo] = useState(calcTime(myTime2[0].time)); //뿌려질 마커 배열
  const [activeMarker, setActiveMarker] = useState(false);

  //디자인 표기를 위한 시간 요소
  const hour_pos = [
    '00',
    '0.5',
    '01',
    '1.5',
    '02',
    '2.5',
    '03',
    '3.5',
    '04',
    '4.5',
    '05',
    '5.5',
    '06',
    '6.5',
    '07',
    '7.5',
    '08',
    '8.5',
    '09',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
    '13.5',
    '14',
    '14.5',
    '15',
    '15.5',
    '16',
    '16.5',
    '17',
    '17.5',
    '18',
    '18.5',
    '19',
    '19.5',
    '20',
    '20.5',
    '21',
    '21.5',
    '22',
    '22.5',
    '23',
    '23.5',
    '24'
  ];

  //개별 마커 레이어 on,off
  const [adInfoLayer, setAdInfoLayer] = useState(myTime2[0].time.map((item) => false));

  //timepicker width 계산
  let wrapperWidth = 0;
  useEffect(() => {
    setTimeout(() => {
      wrapperWidth = wrapperRef.current ? wrapperRef.current.style.width : 0;
      const markerWidth = 21;
      setRatioX((parseInt(wrapperWidth) - markerWidth) / 1440);
    }, 10);
  }, [wrapperRef.current]);

  //개별 마커 콜백함수
  const callBackHandle = (markerNum, callbackTime) => {
    setActiveMarker(markerNum);
    let tempArr = [...adInfo];
    tempArr[markerNum] = callbackTime;
    setAdInfo(tempArr);
  };

  //개별 마커 레이어 컨트롤
  const handleLyOpen = useCallback(
    (markerNum) => {
      let tempArr = [...adInfoLayer];
      tempArr[markerNum] = !tempArr[markerNum];
      setAdInfoLayer(tempArr);
    },
    [adInfoLayer]
  );

  //시간 자동설정
  const autoSelect = useCallback((e, dummyTime) => {
    setAdInfo(calcTime(dummyTime)); //시간 배열 설정 예시
    setAdInfoLayer(dummyTime.map((item) => false)); //시간 배열 설정 예시
    handlePopupClose(e, '7_3');
  }, []);

  //팝업 닫기
  const handlePopupClose = (e, type) => {
    e.preventDefault();

    switch (type) {
      case '7':
        setRodalShow7(false);
      case '7_1':
        setRodalShow7_1(false);
      case '7_3':
        setRodalShow7_3(false);
      case '7_4':
        setRodalShow7_4(false);
      case '7_5':
        setRodalShow7_5(false);
      case '7_6':
        setRodalShow7_6(false);
      case '7_7':
        setRodalShow7_7(false);
    }
  };

  //업데이트 시간변경 확인
  const updateTimeMod = (e) => {
    let saveTime = timeCalc(adInfo);
    console.log(saveTime); //시간 배열에 담을 값 예시
    handlePopupClose(e, '7');
  };

  //보관함에 저장
  const saveBoxAdd = (e) => {
    handlePopupClose(e, '7_1');
    rodalPopupHandler7_2(e, 'fade');
  };
  //보관명 변경
  const saveBoxMod = (e) => {
    handlePopupClose(e, '7_5');
  };

  //시간저장 완료
  const saveComplete = (e) => {
    e.preventDefault();
    let saveTime = timeCalc(adInfo);
    console.log(saveTime); //시간 배열에 담을 값 예시
    modalCloseHandler7_2(false);
  };

  //업데이트 시간 선택 적용
  const chooseTime = (e) => {
    handlePopupClose(e, '7_4');
    setAdInfo(calcTime(dummyTime[isValue1].time)); //선택한 시간 배열 설정 예시
    setAdInfoLayer(dummyTime[isValue1].time.map((item) => false)); //선택한 시간 배열 설정 예시
  };

  //업데이트 시간 삭제
  const deleteTime = (e) => {
    handlePopupClose(e, '7_6');
  };
  //결제진행
  const payment = (e) => {
    handlePopupClose(e, '7_7');
  };

  return (
    <>
      <RodalPopup show={rodalShow7} type={'fade'} closedHandler={modalCloseHandler7} title="업데이트 시간 변경" mode="normal" size="large">
        <div className="con-wrap time-update">
          <div className="time-picker-wrap">
            <Buttons align="right" marginTop={0} marginBottom={15}>
              <Button size="mid" line="gray" radius={true} title="자동세팅 적용" width={109} onClick={(e) => rodalPopupHandler7_3(e, 'fade')} />
              <Button size="mid" line="gray" radius={true} title="업데이트 시간 보관함" width={148} onClick={(e) => rodalPopupHandler7_4(e, 'fade')} />
            </Buttons>
            <div className="time-picker-area">
              <div className="time-picker" ref={wrapperRef} style={{ width: '1029px' }}>
                <div className="t-track">
                  <div className="t-track-fake"></div>
                  {ratioX !== 0 &&
                    adInfo.map((item, i) => (
                      <Marker
                        key={i}
                        ratioX={ratioX}
                        time={item}
                        markerNum={i}
                        callBackHandle={callBackHandle}
                        lastMod={activeMarker === i ? true : false}
                        lyOpen={adInfoLayer[i]}
                        handleLyOpen={handleLyOpen}
                      />
                    ))}
                </div>
                {ratioX !== 0 &&
                  hour_pos.map((item, i) => (
                    <span key={i} className={i % 2 === 0 ? 't-hour' : 't-hour empty'} style={{ left: ratioX * 60 * parseFloat(item) + 3 }}>
                      {i % 2 === 0 ? item : ''}
                    </span>
                  ))}
              </div>
              <p className="time-picker-msg">
                최초 등록 시간 : <strong>08</strong>시 <strong>30</strong>분 <strong>25</strong>초
              </p>
              <p className="time-picker-msg">
                업데이트 회수 : <strong>24</strong>회
              </p>
              <Buttons align="right" marginTop={-20}>
                <Button size="mid" line="blue80" color="blue80" radius={true} title="보관함에 저장" width={109} onClick={(e) => rodalPopupHandler7_1(e, 'fade')} />
                <Button size="mid" background="blue80" radius={true} title="추가업데이트 구매" width={148} onClick={(e) => rodalPopupHandler7_7(e, 'fade')} />
              </Buttons>
            </div>

            <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={172} height={60} onClick={(e) => handlePopupClose(e, '7')} />
              <Button size="big" background="blue80" title="확인" width={172} height={60} onClick={updateTimeMod} />
            </Buttons>
          </div>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow7_1} type={'fade'} closedHandler={modalCloseHandler7_1} title="업데이트 보관함" mode="normal" size="small" subPop={true}>
        <div className="con-wrap">
          <p className="save-box-txt">보관명을 입력하세요.</p>
          <div>
            <Input type="text" placeHolder="" height={48} value="" />
          </div>
          <div className="input-limit">0/12</div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} onClick={(e) => handlePopupClose(e, '7_1')} />
            <Button size="big" background="blue80" title="확인" width={172} height={60} onClick={saveBoxAdd} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow7_2} type={'fade'} closedHandler={modalCloseHandler7_2} size="xs" subPop={true}>
        <div className="con-wrap tac">
          <p>업데이트 시간 저장이 완료되었습니다.</p>
          <Button size="big" align="center" marginTop={80} background="blue80" title="확인" width={245} height={48} onClick={saveComplete} />
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow7_3} type={'fade'} closedHandler={modalCloseHandler7_3} size="xs" subPop={true}>
        <div className="con-wrap tac">
          <p>
            이 차량의 등록 시의 분/초를 기준으로
            <br /> 매 시에 자동 업데이트 됩니다. 적용하시겠습니까?
          </p>
          {/* <p>이 차량의 등록 시의 분/초를 기준으로<br /> 8시/12시/16시/20시에 자동 업데이트 됩니다.<br />적용하시겠습니까?</p> */}
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={(e) => handlePopupClose(e, '7_3')} />
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={(e) => autoSelect(e, dummyTime[0].time)} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow7_4} type={'fade'} closedHandler={modalCloseHandler7_4} title="업데이트 시간 보관함" mode="normal" size="medium" subPop={true}>
        <div className="con-wrap save-box-pop">
          <Buttons align="right" marginTop={0}>
            <Button size="big" line="blue80" color="blue80" radius={true} title="보관명 변경" width={116} height={48} onClick={(e) => rodalPopupHandler7_5(e, 'fade')} />
          </Buttons>
          <div className="save-box">
            <ColoredScrollbars autoHeightMax={320}>
              <ul>
                {dummyTime.map((item, i) => {
                  return (
                    <li key={i}>
                      <Radio className="simple has-title checkbox" id={'chk-box-item' + item.id} value={i} checked={isValue1} disabled={false} onChange={handleChange1} title={item.name} />

                      <div className="box-item">
                        {item.time.map((v, j) => (
                          <span key={j} className="time-info">
                            {v}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ColoredScrollbars>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="선택 삭제" width={130} height={48} onClick={(e) => rodalPopupHandler7_6(e, 'fade')} />
            <Button size="big" background="blue80" title="선택 적용" width={130} height={48} onClick={chooseTime} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow7_5} type={'fade'} closedHandler={modalCloseHandler7_5} title="업데이트 보관함" mode="normal" size="small" subPop={true}>
        <div className="con-wrap">
          <p className="save-box-txt">보관명을 변경하세요.</p>
          <div>
            <Input type="text" placeHolder="" height={48} value="" />
          </div>
          <div className="input-limit">0/12</div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} onClick={(e) => handlePopupClose(e, '7_5')} />
            <Button size="big" background="blue80" title="확인" width={172} height={60} onClick={saveBoxMod} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow7_6} type={'fade'} closedHandler={modalCloseHandler7_6} size="xs" subPop={true}>
        <div className="con-wrap tac">
          <p>정말 삭제하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={(e) => handlePopupClose(e, '7_6')} />
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={deleteTime} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow7_7} type={'fade'} closedHandler={modalCloseHandler7_7} size="medium" title="이용권 결제" subPop={true}>
        <div className="con-wrap popup-mypage-payment">
          <ColoredScrollbars autoHeightMax={550}>
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
                  <p className="price-tp6">
                    7,760<span className="won">만원</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="price-wrap">
              <p className="price-name">업데이트 20대당 1개</p>
              <p className="price-tp7">
                1,800<span className="won">만원</span>
              </p>
            </div>

            <div className="payment-sec method">
              <h3 className="sub-tit">쿠폰/포인트 할인</h3>
              <div className="point-area">
                <div className="point-wrap">
                  <div className="point">
                    <CheckBox id="chk-point" title="포인트 적용" />
                    <p>
                      보유포인트<span>3,000</span>원
                    </p>
                  </div>
                  <Input type="text" placeHolder="" width={318} height={48} value="사용할 포인트를 입력하세요" />
                  <CheckBox id="chk2-point-use" title="포인트 모두 사용" size="small" />
                </div>
                <div className="coupon-wrap">
                  <div className="coupon">
                    <CheckBox id="chk-coupon-use" title="쿠폰 적용" />
                    <p>
                      적용 가능한 보유쿠폰<span>3</span>장
                    </p>
                  </div>
                  <RadioGroup
                    dataList={[
                      { id: 'radio1', value: 1, checked: true, disabled: false, title: '15% 할인 쿠폰' },
                      { id: 'radio2', value: 2, checked: false, disabled: false, title: '1,000원 할인 쿠폰' },
                      { id: 'radio3', value: 3, checked: false, disabled: false, title: '신규회원 가입 할인 쿠폰 신규회원 가입 할인 쿠폰' }
                    ]}
                    defaultValue={1}
                    size="small"
                    mode="vertical"
                  ></RadioGroup>
                  <p className="ex">
                    적립된 포인트는 3,000원부터 사용이 가능하며 쿠폰, 포인트 결제 금액을 제외한 구매 금액의 N%가 포인트로 적립됩니다.
                    <br />
                    <span className="tx-red80">쿠폰 적용 시에는 추가 결제와 혼합 사용하실 수 없습니다.</span>
                  </p>
                </div>
              </div>
              <div className="last-sum">
                <ul>
                  <li>
                    이용권금액
                    <span>
                      890,000<em>원</em>
                    </span>
                  </li>
                  <li>
                    할인금액
                    <span>
                      12,000<em>원</em>
                    </span>
                  </li>
                  <li>
                    최종결제금액
                    <span>
                      878,000<em>원 (VAT 포함)</em>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="method-wrap">
                <p>결제 수단</p>
                <RadioGroup
                  dataList={[
                    { id: 'pay-r1', value: 1, checked: true, disabled: false, title: '신용카드' },
                    { id: 'pay-r2', value: 2, checked: false, disabled: false, title: '휴대전화' },
                    { id: 'pay-r3', value: 3, checked: false, disabled: false, title: '무통장입급' },
                    { id: 'pay-r4', value: 4, checked: false, disabled: false, title: '카카오페이' },
                    { id: 'pay-r5', value: 5, checked: false, disabled: false, title: '네이버페이' }
                  ]}
                  defaultValue={1}
                ></RadioGroup>
              </div>
            </div>
            <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={130} height={48} onClick={(e) => handlePopupClose(e, '7_7')} />
              <Button size="big" background="blue80" title="결제진행" width={130} height={48} onClick={payment} />
            </Buttons>
          </ColoredScrollbars>
        </div>
      </RodalPopup>
    </>
  );
};

export default TimePicker;
