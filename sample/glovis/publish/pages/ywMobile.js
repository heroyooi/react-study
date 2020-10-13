// 데모 페이지 기본
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import { MOBILE_HEADER_TYPE_SUB } from '@src/actions/types';

// 달력
import moment from 'moment';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobCalendar from '@lib/share/items/MobCalendar';

// 컨펌&얼럿 팝업 관련 컴포넌트
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

// 기타 컴포넌트
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

// 풀페이지 팝업 관련 컴포넌트 및 액션 타입명
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobCarInfoModify from '@src/components/common/MobCarInfoModify';
import MobFilterModel from '@src/components/common/MobFilterModel';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

// 포털
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

// 셀렉트박스 컴포넌트
import MobSelectBox from '@lib/share/items/MobSelectBox';
import CheckColors from '@src/components/common/CheckColors'; // 셀렉트박스 커스텀 옵션 예제를 위한 컴포넌트

const ywMobile = () => {
  const dispatch = useDispatch();
  dispatch({
    type: MOBILE_HEADER_TYPE_SUB,
    data: {
      title: '모바일 테스트',
      options: ['back', 'alarm', 'gnb']
    }
    // 헤더에 이벤트를 주는 경우
    // data: {
    //   title: 'BMW 인증몰 80대',
    //   options: ['back', 'search', 'gnb'],
    //   events: [null, () => {console.log('헤더에 준 이벤트 작동!')}, null]
    // }
  });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 테스트 페이지 초기 세팅
  const ExSection = ({title, children, minHeight}) => <div style={{padding:15, margin:15, border:'1px solid #e7e7e7', borderRadius: 3, minHeight: minHeight}}><h2 style={{fontSize: 16, marginBottom: 10}}>{title}</h2>{children}</div>;
  const h3Style = {fontSize: 14, marginBottom: 10, background: '#eee', padding: 10, textTransform: 'uppercase', fontWeight: 500, borderRadius: 3}

  const now = moment(); // 달력

  if (hasMobile) {

    // 컨펌&얼럿 팝업
    const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
    const closeMpop = useCallback((e) => {
      e.preventDefault();
      setMpop(false);
    }, []);

    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

    const [fpCarModify, setFpCarModify] = useState(false); // 차량정보 수정 팝업
    const [fpCalendar, setFpCalendar] = useState(false); // 달력 팝업
    
    // 제조사, 모델, 등급 팝업 (상황별 컴포넌트 props 설정)
    const [fpFilter01, setFpFilter01] = useState(false); // 값이 없는 경우
    const [fpFilter02, setFpFilter02] = useState(false); // 제조사 값이 경우
    const [fpFilter03, setFpFilter03] = useState(false); // 모델 값이 있는 경우
    const [fpFilter04, setFpFilter04] = useState(false); // 등급 값이 있는 경우
    const [fpFilter05, setFpFilter05] = useState(false); // 재선택 하는 경우
    const [fpFilter06, setFpFilter06] = useState(false); // 탭이 없고, 모델만 존재하는 경우
    const [fpFilter07, setFpFilter07] = useState(false); // 제조사, 모델 탭만 있는 경우

    // 포털을 쓰는 경우
    const createBodyPortal = useCreatePortalInBody(null, "wrap");

    const handleFullpagePopup = useCallback(name => e => {
      e.preventDefault();
      if (name === "car_modify") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 정보 수정',
            options: ['back', 'close']
          }
        });
        setFpCalendar(false);
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCarModify(true);
      } else if (name === "calendar") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '최초등록일',
            options: ['back'],
          }
        });
        setFpCarModify(false);
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar(true);
      } else if (name === "f1") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 · 등급 선택',
            options: ['back', 'reset'],
          }
        });
        setFpCalendar(false);
        setFpCarModify(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpFilter01(true);
      } else if (name === "f2") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 · 등급 선택',
            options: ['back', 'reset'],
          }
        });
        setFpCalendar(false);
        setFpCarModify(false);
        setFpFilter01(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpFilter02(true);
      } else if (name === "f3") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 · 등급 선택',
            options: ['back', 'reset'],
          }
        });
        setFpCalendar(false);
        setFpCarModify(false);
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpFilter03(true);
      } else if (name === "f4") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 · 등급 선택',
            options: ['back', 'reset'],
          }
        });
        setFpCalendar(false);
        setFpCarModify(false);
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpFilter04(true);
      } else if (name === "f5") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '그랜저',
            options: ['back', 'reset'],
          }
        });
        setFpCalendar(false);
        setFpCarModify(false);
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpFilter05(true);
      } else if (name === "f6") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: 'BMW',
            options: ['back', 'reset'],
          }
        });
        setFpCalendar(false);
        setFpCarModify(false);
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter07(false);
        setFpFilter06(true);
      } else if (name === "f7") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 선택',
            options: ['back', 'reset'],
          }
        });
        setFpCalendar(false);
        setFpCarModify(false);
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(true);
      }
      // document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      // 위의 방법으로 했을 경우 body가 hidden 이 안되는 case에서는 아래와 같이 처리
      setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    }, [fpCarModify, fpCalendar, fpFilter01, fpFilter02, fpFilter03, fpFilter04, fpFilter05, fpFilter06, fpFilter07]);

    const [isDate, setIsDate] = useState(moment());
    const carInfoCallback = useCallback((e) => {
      e.preventDefault();
      setFpCarModify(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, [fpCarModify])
    const calendarCallback = useCallback((e, date) => {
      e.preventDefault();
      setFpCalendar(false);
      setIsDate(date); // 달력 값 Datepicker에 바인딩
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, [fpCalendar])
    // 풀페이지 팝업 END

    // 셀렉트박스 - 커스텀 모드
    const [isChange, setIsChange] = useState(false);
    const [colorChange, setColorChange] = useState("색상");
    const handleSelectColors = useCallback((color) => {
      setIsChange(prevChange => !prevChange);
      setColorChange(color);
    }, [colorChange]);

    return (
      <AppLayout>

        <ExSection title="풀페이지 팝업">
          <Button size="sml" line="gray" radius={true} title="차량정보 수정" width={96} onClick={handleFullpagePopup("car_modify")} /><br /><br />
          <DatePicker defaultValue={isDate} inputWidth={100} inputMeasure="%" onClick={handleFullpagePopup("calendar")} />
        </ExSection>

        <ExSection title="컨펌 or 얼럿 팝업">
          <Button size="full" background="blue80" radius={true} title="팝업 호출 버튼" onClick={(e) => openMpop(e, "fade")} />
          <RodalPopup show={mpop} type={'fade'} closedHandler={closeDimmMpop} isButton={false} subPop={false}>
            <div className="con-wrap">
              <p className="tit1">정말 나가시겠습니까?</p>
              <p>작성한 내용은 임시저장 됩니다.</p>
              <Buttons align="right" marginTop={24}>
                <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
                <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
              </Buttons>
            </div>
          </RodalPopup>
        </ExSection>

        <ExSection title="셀렉트박스">
          <h3 style={h3Style}>Normal</h3>
          <MobSelectBox options={[
            { id: 'radio1', value: 1, checked: true, disabled: false, label: '2016년' },
            { id: 'radio2', value: 2, checked: false, disabled: false, label: '2017년' }
          ]} zid={101} /><br /><br />
          <h3 style={h3Style}>Custom</h3>
          <MobSelectBox customMode={true} customName={colorChange} isChange={isChange}>
            <div className="inner filter-list-wrap pt0">
              <CheckColors mode="radio" onSelect={handleSelectColors} />
            </div>
          </MobSelectBox>
        </ExSection>

        <ExSection title="제조사, 모델, 등급 팝업">
        <h3 style={h3Style}>상황별 case</h3>
          <p style={{marginBottom: 10}}>차량검색 - 필터 <Button size="sml" line="gray" radius={true} title="사용된 페이지" width={86} href="/marketPrice/marketSearch" target="_blank" /></p>
          <ul className="m-menu-list tp1">
            <li onClick={handleFullpagePopup("f1")}>
              <span className="tit">제조사/모델/등급</span>
            </li>
            <li className="model">
              <div className="sel-wrap">
                <span className="tit">제조사/모델/등급</span>
                <ul className="select1">
                  <li onClick={handleFullpagePopup("f2")}>현대</li>
                  <li onClick={handleFullpagePopup("f3")}>싼타페</li>
                </ul>
              </div>
              <ul className="select2">
                <li onClick={handleFullpagePopup("f4")}>
                  <span>
                    <span>가솔린 2400cc, 2.4 모던, 2.4 프리미엄, 2.4 프리미엄, 2.4 프리미엄</span>
                    <em>외 1건</em>
                  </span>
                </li>
              </ul>
            </li>
          </ul>

          <hr style={{margin:'30px 0'}} />

          <p style={{marginBottom: 10}}>조회결과 - 재검색 <Button size="sml" line="gray" radius={true} title="사용된 페이지" width={86} href="/marketPrice/marketView?search=number" target="_blank" /></p>
          <Button size="mid" background="blue80" fontSize={14} radius={true} title="모델재선택" width={100} measure="%" onClick={handleFullpagePopup("f5")} />

          <hr style={{margin:'30px 0'}} />
          
          <p style={{marginBottom: 10}}>내차사기 - 이미 제조사가 선택됨 <Button size="sml" line="gray" radius={true} title="사용된 페이지" width={86} href="/buy/brandSearchFilter01" target="_blank" /></p>
          <Button size="mid" background="blue80" fontSize={14} radius={true} title="탭이 없고, 모델만 존재하는 경우" width={100} measure="%" onClick={handleFullpagePopup("f6")} />

          <hr style={{margin:'30px 0'}} />

          <p style={{marginBottom: 10}}>내차사기 - 프랜차이즈, 금융인증차량 보여줌 <Button size="sml" line="gray" radius={true} title="사용된 페이지" width={86} href="/buy/financeSearchFilter01" target="_blank" /></p>
          <Button size="mid" background="blue80" fontSize={14} radius={true} title="제조사, 모델 탭만 있는 경우" width={100} measure="%" onClick={handleFullpagePopup("f7")} />
        </ExSection>
        
        <MobFullpagePopup active={mFullpagePopup}>
          {fpCarModify && <MobCarInfoModify callback={carInfoCallback} />}
          {fpCalendar && <MobCalendar date={isDate} callback={calendarCallback} />}
          {fpFilter01 && <MobFilterModel result="no" />}{/* 값이 없는 경우 */}
          {fpFilter02 && <MobFilterModel kind="manufacturer" />}{/* 제조사 값이 경우 */}
          {fpFilter03 && <MobFilterModel kind="model" />}{/* 모델 값이 있는 경우 */}
          {fpFilter04 && <MobFilterModel kind="rating" />}{/* 등급 값이 있는 경우 */}
          {fpFilter05 && <MobFilterModel research="yes" />}{/* 모델재선택 */}
          {fpFilter06 && <MobFilterModel defaultNum={1} hiddenTab={[0, 1, 2]} />}{/* 탭이 없고, 모델만 존재하는 경우 - buy/brandSearchFilter01 */}
          {fpFilter07 && <MobFilterModel hiddenTab={[2]} />}{/* 제조사, 모델 탭만 있는 경우 - buy/financeSearchFilter01 */}
        </MobFullpagePopup>
        
      </AppLayout>
    )
  }
  
  return (
    <AppLayout>
      모바일 전용 페이지입니다.  
    </AppLayout>
  )
}

export default ywMobile;