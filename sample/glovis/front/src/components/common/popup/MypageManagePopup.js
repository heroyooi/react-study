import { useState, useCallback, useContext } from 'react';
import moment from 'moment';
import Link from "next/link";
import CarInfo from '@src/components/common/CarInfo';
import CarStatus from '@src/components/common/CarStatus';
import CarHistory from '@src/components/common/CarHistory';
import CarDetails from '@src/components/common/CarDetails';
import CarPicture from '@src/components/common/CarPicture';
import CarSignature from '@src/components/common/CarSignature';
import CarAddOption from '@src/components/common/CarAddOption';
import CarNameMod from '@src/components/common/CarNameMod';
import MypageSellPrice from '@src/components/common/MypageSellPrice';
import MypageMortgage from '@src/components/common/MypageMortgage';
import MypageAcidentRecord from '@src/components/common/MypageAcidentRecord';
import MypageMovieUrl from '@src/components/common/MypageMovieUrl';
import MypageCarEx from '@src/components/common/MypageCarEx';
import TimePicker from '@src/components/common/TimePicker';
import CarOptions from '@src/components/common/CarOptions';
import DatePicker from '@src/components/common/calendar/DatePicker';
import PageNavigator from '@src/components/common/PageNavigator';
import CarPictureApply from '@src/components/common/CarPictureApply';
import RodalPopup from '@lib/share/popup/RodalPopup';
import InputPic from '@lib/share/items/InputPic';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem'; // #a4추가 
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';// #a6추가
import Steps from '@lib/share/items/Steps'; // #a6추가
import { DealerContext } from '@pages/mypage/dealerSell01';
import { select1_list } from '@src/dummy';
import { preventScroll } from '@src/utils/CommonUtil';

/*
html 변경이력
03.05 : 금융사 제휴회원 -> 제휴회원으로 수정,  #a1 부분 참고
03.12 : id: 'radio4' , radio5 부분 주석 및 변경 #a2 부분참고
03.13 : 팝업추가  #a3 부분 참고 
03.16 : 체크박스 추가  #a3 부분 참고 
      : 업데이트 자유권 관리 팝업 #a4 부분 참고
      : 환불신청하기 팝업 #a6 부분 참고
03.20 : class -> className(문법 오류 수정)
*/
const MypageManagePopup = () => {

  const now = moment();

  const {
    carDeleteShow, carDeleteCloseHandler, carDeletePopupHandler,
    rodalShow, modalCloseHandler, rodalPopupHandler,
    rodalShow1, modalCloseHandler1,
    rodalShow2, modalCloseHandler2,
    rodalShow3, modalCloseHandler3,
    rodalShow4, modalCloseHandler4,
    rodalShow5, modalCloseHandler5,
    rodalShow6, modalCloseHandler6,
    rodalShow7, modalCloseHandler7,
    rodalShow7_1, modalCloseHandler7_1, setRodalShow7_1,
    rodalShow8, modalCloseHandler8,
    rodalShow9, setRodalShow9, modalCloseHandler9,
    rodalShow9_1, setRodalShow9_1, modalCloseHandler9_1, rodalPopupHandler9_1,
    rodalShow10, modalCloseHandler10,
    rodalShow11, modalCloseHandler11,
    rodalShow11_1, modalCloseHandler11_1,
    rodalShow12, modalCloseHandler12,
    rodalShow13, modalCloseHandler13,
    rodalShow13_1, setRodalShow13_1, rodalPopupHandler13_1,
    rodalShow14, modalCloseHandler14,
    rodalShow15, modalCloseHandler15,
    rodalShow16, setRodalShow16, modalCloseHandler16, rodalPopupHandler16,
    rodalShow17, setRodalShow17, modalCloseHandler17, rodalPopupHandler17,
    rodalShow18, setRodalShow18, modalCloseHandler18, rodalPopupHandler18,
    depositPop, closeDepositPop,
    noGroupIdPop, closeNoGroupIdPop,
    noGroupIdPop1, closeNoGroupIdPop1, openNoGroupIdPop1,
    noGroupIdPop2, closeNoGroupIdPop2, openNoGroupIdPop2,
    adeffectPop, closeAdeffectPop
  } = useContext(DealerContext);
  //  #a3 팝업const추가 rodalShow16 라인 추가
  //  #a1 팝업const추가 rodalShow17 라인 추가
  //  #a9 팝업const추가 rodalShow18 라인 추가

  const [textareaDisabled1, setTextareaDisabled1] = useState(true)
  const [textareaDisabled2, setTextareaDisabled2] = useState(true)
  const [textareaDisabled3, setTextareaDisabled3] = useState(true)
  const [textareaDisabled4, setTextareaDisabled4] = useState(true)
  const [textareaDisabled5, setTextareaDisabled5] = useState(true)

  // 팝업 내부 - 체크박스 텍스트어리어 활성
  const handleTextarea1 = useCallback(() => {
    setTextareaDisabled1(!textareaDisabled1)
  }, [textareaDisabled1]);

  const handleTextarea2 = useCallback(() => {
    setTextareaDisabled2(!textareaDisabled2)
  }, [textareaDisabled2]);

  const handleTextarea3 = useCallback(() => {
    setTextareaDisabled3(!textareaDisabled3)
  }, [textareaDisabled3]);

  const handleTextarea4 = useCallback(() => {
    setTextareaDisabled4(!textareaDisabled4)
  }, [textareaDisabled4]);

  const handleTextarea5 = useCallback(() => {
    setTextareaDisabled5(!textareaDisabled5)
  }, [textareaDisabled5]);

  // 팝업 내부 - 옵션 더보기
  const [carOptionMore, setCarOptionMore] = useState(false)
  const [colorOptionMore, setColorOptionMore] = useState(false)

  const handleCarOption = (e) => {
    e.preventDefault()
    setCarOptionMore(!carOptionMore)
  }

  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  }
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  }
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  }

  // 팝업 내부 - 화면 전환
  const [isDeposit, setIsDeposit] = useState(false);
  const handleDeposit = useCallback((e) => {
    e.preventDefault();
    setIsDeposit(true);
  }, []);
  const [isModify, setIsModify] = useState(false);
  const handleModify = useCallback((e) => {
    e.preventDefault();
    setRodalShow9(false);
    setRodalShow9_1(false);
  }, []);

   // 팝업에 팝업으로 나오는 경우(ex: handleClose13_1)는,
  // 만약 body가 fix되어 있는 경우 body를 fix해주는 스크립트 추가.
  // 만약 body가 fix 되어있지 않다면 추가할 필요 없음.
  const handleClose13_1 = () => {
    preventScroll(true);
    setRodalShow13_1(false);
  }

  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };

   // #a6 추가 start
   const [liveStudioStep, setLiveStudioStep] = useState(1);
   const handleStep = useCallback((num, kind) => (e) => {
     e.preventDefault();
     kind === "studio" ? setLiveStudioStep(num) : setLiveShotStep(num);
   }, []);
   // #a6 추가 end


  return (
    <>

      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} mode={'no-padding'} >
        <div className="con-wrap">

        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="차량 삭제" size="medium" >
        <div className="con-wrap popup-delete-reason">
          <p className="delete-tit">판매삭제사유 입력</p>
          <div className="delete-wrap">
            <CheckBox id='chk-reason1' title="실차주 요청으로 인한 삭제" />
            <CheckBox id='chk-reason2' title="차량 소속 변경" />
            <CheckBox id='chk-reason3' title="오프라인 채널 통한 판매" />
            <CheckBox id='chk-reason4' title="타 사이트를 통한 판매" />
            <CheckBox id='chk-reason5' title="기타" />
            <Input type="text" value="" id="car-reason6" height={47} />
            <div className="input-limit">0/12</div>
          </div>
          <p className="careful">삭제 시 복구 및 환불이 안되오니 주의하시기 바랍니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} />
            <Button size="big" background="blue80" title="삭제하기" width={172} height={60} />
          </Buttons>
        </div>
      </RodalPopup>

      {/* 선택차량 프리미엄광고 내용관리 */}
      {/* <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="프리미엄광고 내용 관리" mode="normal" size="large">
        <div className="con-wrap">
          <ul className="ad-content-admin">
            <li>
              <p>사진우대<span>0대</span></p>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="구매하기" width="132" />
            </li>
            <li>
              <p>우대등록<span>0대</span></p>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="구매하기" width="132" />
            </li>
            <li>
              <p>핫마크<span>0대</span></p>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="구매하기" width="132" />
            </li>
            <li>
              <p>모바일 프리미엄<span>0대</span></p>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="구매하기" width="132" />
            </li>
            <li>
              <p>파워텍<span>0대</span></p>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="구매하기" width="132" />
            </li>
            <li>
              <p>사진우대<br />+모바일 프리미엄<span>0대</span></p>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="구매하기" width="132" />
            </li>
            <li>
              <p>우대등록<br />+모바일 프리미엄<span>0대</span></p>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="구매하기" width="132" />
            </li>
            <li>
              <p>파워팩<br />+모바일 프리미엄<span>0대</span></p>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="구매하기" width="132" />
            </li>
          </ul>
          <ul className="ad-content-chk">
            <li>
              <div className="admin-list tp5">
                <div className="content-top">
                  <CheckBox id='register-car-chk' />
                  <div className="img-cover">
                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                  </div>
                  <div className="summary">
                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                    <ul className="info">
                      <li>00가0000</li>
                      <li>09/12식(10년형)</li>
                      <li>84,761km</li>
                      <li>오토</li>
                      <li>디젤</li>
                    </ul>
                  </div>
                  <p className="price-tp7">1,890<span className="won">만원</span></p>
                  <p className="use-chk">미사용</p>
                </div>
              </div>
            </li>
            <li>
              <p className="chk-tit">부가서비스</p>
              <CheckBox id='chk-auto-change' title='오토체인지' />
            </li>
            <li>
              <p className="chk-tit">프리미엄 광고</p>
              <ul className="chk-premium-ad">
                <li><CheckBox id='chk-photo' title='사진우대' /></li>
                <li><CheckBox id='chk-treat' title='우대등록' /></li>
                <li><CheckBox id='chk-hotmark' title='핫마크' /></li>
                <li><CheckBox id='chk-premium' title='모바일 프리미엄' /></li>
                <li><CheckBox id='chk-update' title='자동업데이트' /></li>
                <li><CheckBox id='chk-mobile' title='모바일 우대' /></li>
              </ul>
            </li>
            <li>
              <p className="chk-tit">결합 상품</p>
              <ul className="chk-combine-goods">
                <li><CheckBox id='chk-power' title='파워팩' /></li>
                <li><CheckBox id='chk-photo-premium' title='사진우대+모바일 프리미엄' /></li>
                <li><CheckBox id='chk-treat-premium' title='우대등록+모바일 프리미엄' /></li>
                <li><CheckBox id='chk-power-permium' title='파워팩+모바일 프리미엄' /></li>
              </ul>
            </li>
          </ul>
          <div className="essential-point">
            <p>꼭 알아두세요!</p>
            <ul>
              <li><i className="ico-dot mid"></i> 프리미엄광고는 <span className="tx-blue80">판매중으로 등록되어 있는 차량에만 이용</span>하실 수 있습니다.</li>
              <li className="tx-btn-wrap"><i className="ico-dot mid"></i> 프리미엄광고는 <span className="tx-blue80">자유이용권 또는 대당이용권을 구입</span>하여 이용하실 수 있습니다.<Button size="sml" background="blue80" radius={true} title="프리미엄광고 구입하기" width="165" /></li>
              <li><i className="ico-dot mid"></i> 모바일 프리미엄 광고는 <span className="tx-blue80">앞측면, 정면, 후면, 실내 사진</span>이 있어야만 이용하실 수 있습니다.</li>
              <li><i className="ico-dot mid"></i> 각 차량의 좌측에 있는 체크박스를 체크하시고 프리미엄광고의 등록, 변경, 해제 등을 하실 수 있습니다.</li>
              <li><i className="ico-dot mid"></i> <span className="tx-blue80">광고 등록 해제 후 3시간 이내</span>에는 <span className="tx-blue80">동일 차량에 대해 동일한 광고 등록이 제한</span>됩니다.</li>
            </ul>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} />
            <Button size="big" background="blue80" title="확인" width={172} height={60} />
          </Buttons>
        </div>
      </RodalPopup> */}

      <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} mode="normal" size="xs">
        <div className="con-wrap">
          <p>해당차량을 대기차량으로 변경하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow4} type={'fade'} closedHandler={modalCloseHandler4} title="차량 업데이트" mode="normal" size="medium">
        <div className="popup-update">
          <div className="top">
            <p>해당 차량을 업데이트 하시겠습니까?<br /><span>(업데이트 횟수를 모두 사용한 차량 및 자동업데이트 차량은 제외됩니다.)</span></p>
          </div>
          <div className="bot">
            <p className="tx-btn-wrap">더 많은 횟수와 자동으로 되는 업데이트가 필요하세요?<Button size="mid" background="blue80" radius={true} title="자세히 보기" width="104" /><br /><span>뒤로 밀린 차량을 리스트 가장 앞으로 매시간 자동 이동해주는 신규 상품 출시!</span></p>
            <div className="update-consult">
              <i className="ico-ad"></i>
              <p>혹시 지금 구매자들이 많은 시간대가 아닌데 업데이트 하시나요?<br />
                광고노출이 가장 효과적인 시간에 업데이트 하세요.<br /><span>1577-9789</span>(무료 컨설팅)</p>
            </div>
            <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={172} height={60} />
              <Button size="big" background="blue80" title="확인" width={172} height={60} />
            </Buttons>
          </div>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow5} type={'fade'} width={500} closedHandler={modalCloseHandler5} mode={'no-padding'}>
        <div className="con-wrap">

        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow6} type={'fade'} width={500} closedHandler={modalCloseHandler6} mode={'no-padding'}>
        <div className="con-wrap">

        </div>
      </RodalPopup>

      <TimePicker />

      <RodalPopup show={rodalShow8} type={'fade'} closedHandler={modalCloseHandler8} title="가격 수정" mode="normal" size="medium">
        <div className="con-wrap price-modify">

          <div className="register-exposure">
            <h4>노출유형</h4>
            <RadioGroup dataList={[
              { id: 'radio1', value: 1, checked: true, disabled: false, title: '프랜차이즈' },
              { id: 'radio2', value: 2, checked: false, disabled: false, title: '일반' }
            ]} mode="vertical" />
          </div>

          {/* 판매가격 */}
          <MypageSellPrice mode="viewer" />

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} />
            <Button size="big" background="blue80" title="수정" width={172} height={60} />
          </Buttons>

        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow9} type={'fade'} closedHandler={modalCloseHandler9} title="차량정보 수정" mode="normal" size="large">
        <div className="con-wrap popup-info-modify">
          <form className="register-form">
            {/* 차량 기본 정보 */}
            <fieldset>
              <legend className="away">차량 기본 정보</legend>
              <h4 className="mb33">차량 기본 정보</h4>
              <table summary="차량 기본 정보에 대한 내용" className="table-tp1 input">
                <caption className="away">차량 기본 정보</caption>
                <colgroup>
                  <col width="20%" />
                  <col width="30%" />
                  <col width="20%" />
                  <col width="30%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량명</th>
                    <td colSpan="3">
                      <span className="car-name">
                        기아 K3 쿱 1.6 터보 GDI 프레스티지
                        <i className="ico-pencil" onClick={(e) => rodalPopupHandler(e, "fade")}></i>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>차량번호</th>
                    <td>
                      <label htmlFor="car-num" className="hide">차량번호</label>
                      <Input type="text" value="47러0383" id="car-num" width={160} height={40} />
                    </td>
                    <th>주행거리</th>
                    <td><Input type="text" value="84,761km" id="engine-cc" width={160} height={40} /></td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td><DatePicker defaultValue={now} inputWidth={160} inputHeight={40} /></td>
                    <th>형식년도</th>
                    <td>
                      <SelectBox id="form-date" className="items-sbox" options={[
                        { value: '1', label: '1980' },
                        { value: '2', label: '2020' }
                      ]} width={160} height={40} placeHolder="2018" />
                    </td>
                  </tr>
                  <tr>
                    <th>색상</th>
                    <td>
                      <SelectBox id="car-color" className="items-sbox" options={[
                        { value: '1', label: '검정' }
                      ]} width={160} height={40} placeHolder="검정" />
                    </td>
                    <th>변속기</th>
                    <td>오토</td>
                  </tr>
                  <tr>
                    <th>연료</th>
                    <td>가솔린</td>
                    <th>배기량</th>
                    <td>3000cc</td>
                  </tr>
                  <tr>
                    <th>차종</th>
                    <td>suv</td>
                    <th>용도</th>
                    <td>일반</td>
                  </tr>
                </tbody>
              </table>
            </fieldset>

            {/* 기본옵션 */}
            <CarOptions type={2} mode="check" title="기본 옵션" />

            {/* 추가옵션 */}
            <CarAddOption />

            {/* 압류/저당 입력 */}
            <MypageMortgage />

            {/* 사고이력정보 */}
            <MypageAcidentRecord />

            {/* 동영상 */}
            <MypageMovieUrl />

            {/* 나의설명글 */}
            <MypageCarEx buttonType={1} radioGroup={true} activeTextarea={true} isButtonReset={true} />
          </form>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} />
            <Button size="big" background="blue80" title="수정" width={172} onClick={(e) => rodalPopupHandler9_1(e, "fade")}/>
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow9_1} type={'fade'} closedHandler={modalCloseHandler9_1} mode="normal" size="xs">
        <div className="con-wrap">
          <p>수정한 정보를 적용하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={handleModify} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow10} type={'fade'} closedHandler={modalCloseHandler10} title="차량사진 수정" mode="normal" size="large">
        <div className="con-wrap">
          <CarPictureApply mode="dealer" />
          <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={172} height={60} />
              <Button size="big" background="blue80" title="수정" width={172} height={60} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow11} type={'fade'} closedHandler={modalCloseHandler11} title="성능기록부 수정" mode="normal" size="large">
        <div className="con-wrap popup-perform-record">
          <div className="performance-chk">
            <ul className="pt-number">
              <li>제시번호</li>
              <li><Input type="text" id="Propose01" width={262} /></li>
              <li className="ex">예)202020</li>
              <li>매매회원이 중요정보(제시번호,성능점검기록부,조합/상사명) 미기재 또는 허위 기재시 표시 광고의 공정화에 관한 법률(20조 제1항 제1호)에 의해1억원이하의 과태료가부과될 수 있습니다.</li>
            </ul>
            <div className="management-law">
              <p>자동차관리법 시행규칙 개정(적용일 : 2018.07.01)에 따라 [자동차 성능과 상태, 가격정보]를 함께 제공하도록 개선되었습니다.</p>
            </div>
            <ul className="record">
              <li>중고자동차 성능 • 상태 점검기록부</li>
              <li className="number fr">
                <em className="mr8">제</em>
                <Input type="text" id="record01" width={50} height={40} />
                <em className="mg8">-</em>
                <Input type="text" id="record02" width={50} height={40} />
                <em className="mg8">-</em>
                <Input type="text" id="record03" width={87} height={40} />
                <em className="ml8">호</em>
              </li>
            </ul>
          </div>
          <form className="register-form history-form">
            <CarInfo />
            <CarStatus />
            <CarHistory />
            <CarDetails />
            <fieldset className="car-expert">
              <legend className="away">특기사항 및 점검자의 의견</legend>
              <table summary="특기사항 및 점검자의 의견에 대한 내용" className="table-tp1 input">
                <caption className="away">특기사항 및 점검자의 의견</caption>
                <colgroup>
                  <col width="19%" />
                  <col width="24%" />
                  <col width="57%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>특기사항 및 점검자의 의견</th>
                    <td>성능•상태 점검자</td>
                    <td><Input type="text" id="expert-opinion" disabled={true} /></td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <CarPicture />
            <CarSignature />
          </form>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="닫기" width={172} />
            <Button size="big" background="blue80" title="등록완료" width={172} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow11_1} type={'fade'} closedHandler={modalCloseHandler11_1} title="제휴 성능장 전체 보기" mode="normal" size="large">
        <div className="con-wrap">
          <table summary="제휴 성능장 전체 보기에 대한 내용" className="table-tp1 input th-c td-c">
            <caption className="away">제휴 성능장 전체 보기</caption>
            <colgroup>
              <col width="20%" />
              <col width="28%" />
              <col width="16%" />
              <col width="36%" />
            </colgroup>
            <thead>
              <tr>
                <th>지역</th>
                <th>성능장</th>
                <th>연락처</th>
                <th>주소</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="3">서울특별시</td>
                <td>한양자동차정비 성능장<br />(성능정비소)</td>
                <td>02-903-3900</td>
                <td>서울특별시 도봉구 도봉로 136다길 32(창동)</td>
              </tr>
              <tr>
                <td>강남 진단평가 성능장<br />(진단보증협회)</td>
                <td>02-3411-0611</td>
                <td>서울특별시 강남구 헌릉로 745길 25(율현동)</td>
              </tr>
              <tr>
                <td>웰퓨쳐 강남성능장<br />(진단보증협회)</td>
                <td>02-903-3900</td>
                <td>서울특별시 강남구 헌릉로 745길 27(율현동)</td>
              </tr>
              <tr>
                <td>경기</td>
                <td>양재 기술인협회 성능장<br />(성능정비소)</td>
                <td></td>
                <td>서울특별시 서초구 양재대로 11길 36(양재동)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow12} type={'fade'} closedHandler={modalCloseHandler12} title="판매완료 신고" mode="normal" size="medium">
        <div className="con-wrap popup-declare">
          <div className="admin-list tp4">
            <div className="content-top">
              <div className="img-cover">
                <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
              </div>
              <div className="summary">
                <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                <ul className="info">
                  <li>00가0000</li>
                  <li>09/12식(10년형)</li>
                  <li>84,761km</li>
                  <li>오토</li>
                  <li>디젤</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sell-declare">
            <p>현재광고가격<span><em>4,150</em>만원</span></p>
            <div className="sell-price-wrap">
              <label htmlFor="sell-price">실제판매가격</label>
              <span>
                <Input type="text" id="sell-price" value="4,050" width={282} height={64} />
                <em>만원</em>
              </span>
            </div>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} />
            <Button size="big" background="blue80" title="판매완료" width={172} height={60} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow13} type={'fade'} closedHandler={modalCloseHandler13} title="결제내역 상세보기" mode="normal" size="small">
        <div className="con-wrap popup-payment">
          <h4>상세 결제내역</h4>
          <table summary="상세 결제내역에 대한 내용" className="table-tp1">
            <caption className="away">상세 결제내역</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>20190916-0003426</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>2019-08-16</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>상품명</td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>230,000원</td>
              </tr>
              <tr>
                <th>자동연장 할인</th>
                <td>-0원</td>
              </tr>
              <tr>
                <th>쿠폰 할인</th>
                <td>-0원</td>
              </tr>
              <tr>
                <th>포인트 사용</th>
                <td>-0원</td>
              </tr>
              <tr>
                <th>결제금액</th>
                <td className="tx-blue80">230,000원</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td className="td-btn-fr">
                  <span className="tx">무통장</span>
                  <Button size="sml" line="gray" color="black" radius={true} title="내역보기" className="fr" onClick={(e) => rodalPopupHandler13_1(e, "fade")} width={74} />
                </td>
              </tr>
              <tr>
                <th>세금계산서 발행</th>
                <td>기간만료</td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={48}>
            <Button size="big" color="blue80" line="blue80" title="인쇄하기" width={172} />
            <Button size="big" background="blue80" title="확인" width={172} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow13_1} type={'fade'} closedHandler={handleClose13_1} title="무통장거래명세서 이력조회" mode="normal" size="small">
        <div className="con-wrap">
          <table summary="무통장거래명세서 이력조회에 대한 내용" className="table-tp1">
            <caption className="away">무통장거래명세서 이력조회</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>주문번호</th>
                <td>1234345</td>
              </tr>
              <tr>
                <th>은행</th>
                <td>농협</td>
              </tr>
              <tr>
                <th>입금액</th>
                <td>230,000원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow14} type={'fade'} closedHandler={modalCloseHandler14} title="영수증/증빙" mode="normal" size="small">
        <div className="con-wrap popup-payment">
          <h4>결제정보</h4>
          <table summary="결제정보에 대한 내용" className="table-tp1">
            <caption className="away">결재정보</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>20190916-0003426</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>2019-08-16</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>상품명</td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>230,000원</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td>무통장</td>
              </tr>
              <tr>
                <th>영수증/증빙</th>
                {/* <td>현금영수중{isReceipt }</td> */}
                <td>현금영수중</td>
              </tr>
            </tbody>
          </table>
          <p>
            발급영수증 선택(결제후 다음달 5일까지)<br />
            * 현금영수증/세금계산서 중 <b>1개</b>만 증빙자료로 신청이 가능합니다.
          </p>
          <div className="receipt-apply">
            <RadioGroup dataList={[
              { id: 'cash-receipt1', value: 1, checked: true, disabled: false, title: '현금영수증 신청' },
              { id: 'tax-invoice1', value: 2, checked: false, disabled: false, title: '세금계산서 신청' }
            ]} defaultValue={1} />
          </div>
          <p>현금영수증 신청내역(신청일: 2019-09-09)</p>
          <table summary="현금영수증 신청내역에 대한 내용" className="table-tp1">
            <caption className="away">현금영수증 신청내역</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>구분</th>
                <td>지출증빙용</td>
              </tr>
              <tr>
                <th>발급내역</th>
                <td><Link href="#"><a>현금영수증 보기</a></Link></td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow15} type={'fade'} closedHandler={modalCloseHandler15} title="영수증/증빙" mode="normal" size="small">
        <div className="con-wrap popup-payment">
          <h4>결제정보</h4>
          <table summary="결제정보에 대한 내용" className="table-tp1">
            <caption className="away">결재정보</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>20190916-0003426</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>2019-08-16</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>상품명</td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>230,000원</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td>무통장</td>
              </tr>
              <tr>
                <th>영수증/증빙</th>
                <td>세금계산서</td>
              </tr>
            </tbody>
          </table>
          <p>
            발급영수증 선택(결제후 다음달 5일까지)<br />
            * 현금영수증/세금계산서 중 <b>1개</b>만 증빙자료로 신청이 가능합니다.
          </p>
          <div className="receipt-apply">
            <RadioGroup dataList={[
              { id: 'cash-receipt2', value: 1, checked: false, disabled: false, title: '현금영수증 신청' },
              { id: 'tax-invoice2', value: 2, checked: true, disabled: false, title: '세금계산서 신청' }
            ]} defaultValue={2} />
          </div>
          <p>세금계산서 신청내역(신청일: 2019-09-09)</p>
          <table summary="세금계산서 신청내역에 대한 내용" className="table-tp1">
            <caption className="away">세금계산서 신청내역</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>발급번호</th>
                <td>2019092103233428</td>
              </tr>
              <tr>
                <th>상호</th>
                <td>(주)글로비스</td>
              </tr>
              <tr>
                <th>대표자명</th>
                <td>김대표</td>
              </tr>
              <tr>
                <th>담당자명</th>
                <td>김직원</td>
              </tr>
              <tr>
                <th>업태</th>
                <td>도매 및 소매업</td>
              </tr>
              <tr>
                <th>종목</th>
                <td>중고자동차판매</td>
              </tr>
              <tr>
                <th>사업자등록번호</th>
                <td>0123456</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>010-0000-0000</td>
              </tr>
              <tr>
                <th>이메일주소</th>
                <td>00112233@glovis.com</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>서울 강남구 논현동 1234</td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" className="pop-car-name-mod" width={894}>
        <div className="con-wrap">
          <CarNameMod />
        </div>
      </RodalPopup>

      <RodalPopup show={depositPop} type={'fade'} closedHandler={closeDepositPop} mode="normal" size="xs">
        <div className='con-wrap'>
          {
            isDeposit === false
              ? (
                <>
                  <p>해당 입금 대기건을<br />취소하시겠습니까?</p>
                  <Buttons align="center" marginTop={54}>
                    <Button size="big" background="gray" title="취소" width={130} height={48} />
                    <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={handleDeposit} />
                  </Buttons>
                </>
              ) : (
                <>
                  <p>해당 입금 대기건을<br />취소 완료되었습니다.</p>
                  <Buttons align="center" marginTop={54}>
                    <Button size="big" background="blue80" title="확인" width={130} height={48} />
                  </Buttons>
                </>
              )
          }
        </div>
      </RodalPopup>

      <RodalPopup show={noGroupIdPop} type={'fade'} closedHandler={closeNoGroupIdPop} mode="normal" size="small">
        <div className="con-wrap popup-no-group-id">
          <ul>
            <li>
              단체 회원이란?
              <span>소속 상사의 딜러들과 소속 차량들을 편하게 관리할 수 있는 기능 있는 회원입니다. 단체회원은 각 상사 대표만 신청할 수 있습니다.</span>
            </li>
            <li>
              제휴법인회원이란?
              <span>오토벨과의 별도 협약을 통해 제휴 관계를 유지하는 회원입니다. 금융사/수입인증 제휴회원으로 구분되며, 단체회원에게 제공되는 기능 이외에 인증몰 기능을 추가로 이용할 수 있습니다.</span>
            </li>
            <li>
              제휴법인회원이란?
              <span>1. 아래 신청을 원하는 회원유형 선택 후, ‘신청하기’ 버튼을 클릭</span>
              <span>2. 문자로 받은 URL로 접속 후, 신청양식 작성&amp;제출</span>
              <span>3. 고객센터에서 확인 후 승인하면 단체ID 발급 완료!<br />(영업일 기준 1~2일 소요)</span>
            </li>
          </ul>         
          <RadioGroup dataList={[
            { id: 'radio3', value: 1, checked: true, disabled: false, title: '단체회원' },
            { id: 'radio4', value: 2, checked: false, disabled: false, title: '제휴회원' },
            // { id: 'radio5', value: 3, checked: false, disabled: false, title: '수입인증제휴회원' }
          ]} /> {/* #a2 금융사 제휴회원 -> 제휴회원으로 수정, 수입인증제휴회원 항목삭제 */}

          <Buttons align="center" marginTop={54}>
            <Button size="big" background="gray" title="닫기" width={130} height={48} />
            <Button size="big" background="blue80" title="신청하기" width={130} height={48} onClick={(e) => openNoGroupIdPop1(e, "fade")} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={noGroupIdPop1} type={'fade'} closedHandler={closeNoGroupIdPop1} mode="normal" size="xs">
        <div className="con-wrap">
          <p>다시 보지 않기를 클릭 시<br />단체회원/제휴법인회원ID를 발급받으실 수 없습니다.<br />그래도 진행하시겠습니까?</p>
          <Buttons align="center" marginTop={54}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={(e) => openNoGroupIdPop2(e, "fade")} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={noGroupIdPop2} type={'fade'} closedHandler={closeNoGroupIdPop2} mode="normal" size="xs">
        <div className="con-wrap">
          <p>신청접수가 완료되었습니다.<br />신청해주셔서 감사합니다.</p>
          <Buttons align="center" marginTop={54}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="확인" width={130} height={48} />
          </Buttons>
        </div>
      </RodalPopup>


      <RodalPopup show={adeffectPop} type={'fade'} closedHandler={closeAdeffectPop} title="다른 차량 불러오기" mode="normal" size="medium">
        <div className="con-wrap popup-adeffect">
          <table className="table-tp1" summary="다른 차량 불러오기에 대한 내용">
            <caption className="away">다른 차량 불러오기</caption>
            <colgroup>
              <col width="85%" />
              <col width="15%" />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <div className="summary">
                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                    <ul className="info">
                      <li>00가0000</li>
                      <li>09/12식(10년형)</li>
                      <li>84,761km</li>
                      <li>오토</li>
                      <li>디젤</li>
                    </ul>
                  </div>
                </td>
                <td>
                  <p className="price">2,300만원</p>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="summary">
                    <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                    <ul className="info">
                      <li>00가0000</li>
                      <li>09/12식(10년형)</li>
                      <li>84,761km</li>
                      <li>오토</li>
                      <li>디젤</li>
                    </ul>
                  </div>
                </td>
                <td>
                  <p className="price">2,700만원</p>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="summary">
                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                    <ul className="info">
                      <li>00가0000</li>
                      <li>09/12식(10년형)</li>
                      <li>84,761km</li>
                      <li>오토</li>
                      <li>디젤</li>
                    </ul>
                  </div>
                </td>
                <td>
                  <p className="price">2,300만원</p>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="summary">
                    <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                    <ul className="info">
                      <li>00가0000</li>
                      <li>09/12식(10년형)</li>
                      <li>84,761km</li>
                      <li>오토</li>
                      <li>디젤</li>
                    </ul>
                  </div>
                </td>
                <td>
                  <p className="price">2,700만원</p>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="summary">
                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                    <ul className="info">
                      <li>00가0000</li>
                      <li>09/12식(10년형)</li>
                      <li>84,761km</li>
                      <li>오토</li>
                      <li>디젤</li>
                    </ul>
                  </div>
                </td>
                <td>
                  <p className="price">2,300만원</p>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="summary">
                    <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                    <ul className="info">
                      <li>00가0000</li>
                      <li>09/12식(10년형)</li>
                      <li>84,761km</li>
                      <li>오토</li>
                      <li>디젤</li>
                    </ul>
                  </div>
                </td>
                <td>
                  <p className="price">2,700만원</p>
                </td>
              </tr>
            </tbody>
          </table>
          <PageNavigator recordCount={50} className="mt32" />
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
      
      {/* #a3 자동결제 신청 팝업 추가   */}
      <RodalPopup show={rodalShow16} type={'fade'} closedHandler={modalCloseHandler16} title="자동결제" mode="normal" size="small">
        <div className="con-wrap popup-self-clearing">
         
          <div className="self-clearing">
            <ul>
              <li>
                <strong>이용권명 : </strong>
                <span>자유이용권 1개월 10대</span>
              </li>
              <li>
                <strong>자동결제일 : </strong>
                <span>매월 20일</span>
              </li>
              <li>
                <strong>결제예정금액 : </strong>
                <span><del>330,000</del>300,000</span>
              </li>
            </ul>
          </div>

          <p className="txt-ex">위의 내용으로 자동결제를 신청하시겠습니까?</p>                  
          
          <Buttons align="center" marginTop={32}>
            <Button size="big" background="gray" title="취소" width={172} height={60} />
            <Button size="big" background="blue80" title="결제하기" width={172} height={60} />
          </Buttons>
         
        </div>
      </RodalPopup>

      {/* #a4 업데이트 자유권 관리 팝업 start */}
      <RodalPopup show={rodalShow17} type={'fade'} closedHandler={modalCloseHandler17} title="업데이트 자유권 관리" subTitle="이용권 : 1개월 10대(D-23, 7대/10대)" mode="normal" size="large" >
        <div className="con-wrap popup-update">
          <form className="register-form">
            {/* 차량 기본 정보 */}
            <fieldset>
              <legend className="away">업데이트 자유권 권리</legend>
              <div className="update-wrap">
                <div className="update-left">
                  <ul className="check-all">
                    <CheckBoxItem id="chk-update-all01" checked={false}>
                      <p>적용차량</p>                        
                    </CheckBoxItem>
                  </ul>

                  <div className="check-list">
                    <ul>
                      <CheckBoxItem id="chk-update01-01" checked={false}>
                        <p>
                          현대 투싼 IX 디젤 2WD LX20 럭셔리
                          <span>22가9182 | 09/12식(10년형) | 84,761km | 오토 | 디젤 | 770만원</span>
                        </p>                        
                      </CheckBoxItem>

                      <CheckBoxItem id="chk-update01-02" checked={false}>
                        <p>
                          현대 쏘나타 IX 디젤 2WD LX20 럭셔리 쏘나타 IX 디젤 2WD LX20 럭셔리
                          <span>22가9182 | 09/12식(10년형) | 84,761km | 오토 | 휘발유 | 770만원</span>
                        </p>                        
                      </CheckBoxItem>  

                      <CheckBoxItem id="chk-update01-03" checked={false}>
                        <p>
                          현대 투싼 IX 디젤 2WD LX20 럭셔리
                          <span>22가9182 | 09/12식(10년형) | 84,761km | 오토 | 디젤 | 770만원</span>
                        </p>                        
                      </CheckBoxItem>   

                      <CheckBoxItem id="chk-update01-04" checked={false}>
                        <p>
                          현대 투싼 IX 디젤 2WD LX20 럭셔리
                          <span>22가9182 | 09/12식(10년형) | 84,761km | 오토 | 디젤 | 770만원</span>
                        </p>                        
                      </CheckBoxItem> 
                    </ul>  
                 </div>
                </div>

                <div className="update-right">
                  <ul className="check-all">
                    <CheckBoxItem id="chk-update-all02" checked={false}>
                      <p>미적용차량</p>                        
                    </CheckBoxItem>
                  </ul>

                  <div className="check-list">
                    <ul className="chk_list">
                      <CheckBoxItem id="chk-update02-01" checked={false}>
                        <p>
                          현대 투싼 IX 디젤 2WD LX20 럭셔리
                          <span>22가9182 | 09/12식(10년형) | 84,761km | 오토 | 디젤 | 770만원</span>
                        </p>                        
                      </CheckBoxItem>

                      <CheckBoxItem id="chk-update02-02" checked={false}>
                        <p>
                          현대 쏘나타 IX 디젤 2WD LX20 럭셔리 쏘나타 IX 디젤 2WD LX20 럭셔리
                          <span>22가9182 | 09/12식(10년형) | 84,761km | 오토 | 휘발유 | 770만원</span>
                        </p>                        
                      </CheckBoxItem>  

                      <CheckBoxItem id="chk-update02-03" checked={false}>
                        <p>
                          현대 투싼 IX 디젤 2WD LX20 럭셔리
                          <span>22가9182 | 09/12식(10년형) | 84,761km | 오토 | 디젤 | 770만원</span>
                        </p>                        
                      </CheckBoxItem>   

                      <CheckBoxItem id="chk-update02-04" checked={false}>
                        <p>
                          현대 투싼 IX 디젤 2WD LX20 럭셔리
                          <span>22가9182 | 09/12식(10년형) | 84,761km | 오토 | 디젤 | 770만원</span>
                        </p>                        
                      </CheckBoxItem>  
                    </ul>
                  </div>
                </div>

                <Buttons align="center" className="btn-move-wrap">
                  <Button size="mid" line="gray" color="darkgray" radius={true} title="미적용으로 이동" width={40}  className="btn-arr-right on"/>
                  <Button size="mid" line="gray" color="darkgray" radius={true} title="적용으로 이동" width={40} className="btn-arr-left" />
                </Buttons>
              </div>
            </fieldset>
          </form>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} />
            <Button size="big" background="blue80" title="확인" width={172} />
          </Buttons>
        </div>
      </RodalPopup>
      {/* #a4 업데이트 자유권 관리 팝업 end */}

      {/* #a6 환불신청하기 start  */}    
      <RodalPopup show={rodalShow18} type={'fade'} closedHandler={modalCloseHandler18} title="환불신청하기" mode="normal" size="medium">
        <div className="popup-refund">
          <div className="refund-step">
            <Steps type={2} contents={['환불상품선택', '증빙첨부', '신청완료']} active={liveStudioStep} />
          </div>
          {liveStudioStep === 1 && (
            <div className="refund-wrap">
              <div className="refund_inner">
                <table className="table-tp1 first-chk th-c td-c" summary="시간선택 영역">
                  <caption className="away">시간선택</caption>
                  <colgroup>
                    <col width="10%" />
                    <col width="20%" />
                    <col width="30%" />
                    <col width="20%" />
                    <col width="20%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th><CheckBox id='chk-all' /></th>
                      <th>결제일</th>
                      <th>이용권명</th>
                      <th>결제금액</th>
                      <th>결제수단</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><CheckBox id='chk-refu01' /></td>
                      <td>2019/08/17</td>
                      <td>대당 이용권</td>
                      <td>230,000원</td>
                      <td>무통장입금</td>
                    </tr>
                    <tr>
                      <td><CheckBox id='chk-refu02' /></td>
                      <td>2019/08/18</td>
                      <td>자유 이용권 1개월/5대</td>
                      <td>230,000원</td>
                      <td>신용카드</td>
                    </tr>
                    <tr>
                      <td><CheckBox id='chk-refu03' /></td>
                      <td>2019/08/23</td>
                      <td>업데이트 자유권 3개월/10대</td>
                      <td>220,000원</td>
                      <td>간편결제</td>
                    </tr>
                  </tbody>
                </table> 
              </div>

              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" onClick={handleStep(2, "studio")} />
              </Buttons>
            </div>
          )}
          {liveStudioStep === 2 && (                
            <div className="refund-wrap">
              <ul className="record-list">
                <li>
                  <strong>사업자 휴/폐업 확인서 첨부</strong>
                  <InputFile uploadList={uploadList1} />
                </li>
                <li>
                  <strong>계좌인증</strong>                 
                  <label htmlFor="account-num" className="hide">계좌 번호</label>
                  <span className="bridge">
                    <SelectBox id="bank-name" className="items-sbox" placeHolder="은행명" options={select1_list} width={173} height={40} />
                  </span>
                  <span className="bridge" marginLeft={8}>
                    <Input type="text" placeHolder="계좌번호( ‘ - ‘ 제외 입력)" id="account-num" width={173}/>
                  </span>
                  <span className="bridge" marginLeft={8}>
                    <Input type="text" placeHolder="예금주" id="account-holder" width={173}/>
                  </span>
                  <Button size="mid" background="gray" title="계좌인증" width={160} height={40} marginLeft={8}/>
                </li>  
              </ul> 

              <ul className="list-gray">
                <li><i className="ico-dot mid"></i> 증빙서류가 정확하지 않을 시, 환불 및 취소처리가 불가능 할 수 있습니다.</li>
                <li><i className="ico-dot mid"></i> 환불 완료 시, 취소가 되지 않으니 신중하게 신청하시기 바랍니다.</li>                
              </ul> 

              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} mode="normal" onClick={handleStep(3, "studio")} />
              </Buttons>
            </div>  
            
          )}
          {liveStudioStep === 3 && (
            <div className="refund-wrap co-wrap">
              <p className="tit">신청이 완료되었습니다.</p>
              <p className="exp">진행 현황은 마이페이지 &gt; 취소 및 환불 탭에서 확인 가능합니다. </p>
                         
              <Buttons align="center" marginTop={64}>
                <Button size="big" background="blue80" title="확인" width={172} height={60} mode="normal"  />                
              </Buttons>
            </div>
          )}
        </div>
      </RodalPopup>
      {/* #a6 환불신청하기 end */}
    
          
    </>
  )
}

export default MypageManagePopup;