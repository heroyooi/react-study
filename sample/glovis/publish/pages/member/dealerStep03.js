import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import FindAddress from '@src/components/common/popup/FindAddress';
import DatePicker from '@src/components/common/calendar/DatePicker';//#a2
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import RadioGroup from '@lib/share/items/RadioGroup';
import Radio from '@lib/share/items/Radio';
import InputFile from '@lib/share/items/InputFile';
import SelectBox from '@lib/share/items/SelectBox'; //#a2
import Input from '@lib/share/items/Input';
import Steps from '@lib/share/items/Steps';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import MobCalendar from '@lib/share/items/MobCalendar';
import { select_area, mobile_select_area } from '@src/dummy';
import { m_mobile_number_list } from '@src/dummy';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

/*
  html 변경이력
  03.10 : #a1 항목추가  
  03.10 : #a2 참고 class="bridge" input width size 변경, DatePicker 추가 및 사이즈 변경 
  03.10 : #3참고 텍스트 항목추가 
*/

const DealerStep03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const now = moment();

  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  // 소속상사 검색 팝업의 라디오 버튼
  const [isValue, setIsValue] = useState(1);
  const handleChange = useCallback((e) => {
    e.preventDefault();
    setIsValue(Number(e.target.value));
  }, []);

  //#a2 start
  const [agencyApply, setAgencyApply] = useState("select");
  const handleAgency = (e) => {
    e.preventDefault();
    setAgencyApply("input");
  }
   //#a2 end

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '딜러회원 가입',
        options: ['back','gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 60,
        color: '#ffffff'
      }
    });
    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [fpCalendar, setFpCalendar] = useState(false); // 달력 팝업
    const [fpAddress, setFpAddress] = useState(false); // 우편번호 팝업
    
    const handleFullpagePopup = useCallback(name => e => {
      e.preventDefault();
      if (name === "calendar") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '날짜선택',
            options: ['back'],
          }
        });      
        setFpAddress(false);
        setFpCalendar(true);
      } else if (name === "Address"){
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '우편번호',
            options: ['back', 'close'],
          }
        });
        setFpCalendar(false);        
        setFpAddress(true);
      }
      setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    }, [fpCalendar,fpAddress]);

    const closeFullpagePopup = useCallback((e) => {
      e.preventDefault();
      setFpCalendar(false);
      setFpAddress(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, [fpCalendar,fpAddress])
    // 풀페이지 팝업 END
  
    return (
      <AppLayout>
        <Steps type={1} contents={['약관동의', '본인인증', '회원가입 신청', '회원가입완료']} active={3} reverse={true} mode="stick"/>        
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <form className="join-form">
              <fieldset>
                <legend className="away">가입정보입력</legend>
                <table summary="가입정보입력에 대한 내용" className="table-tp2 th-none">
                  <caption className="away">가입정보입력</caption>
                  <colgroup>
                    <col width="33%" />
                    <col width="67%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">아이디</p>                        
                        <Input type="text" placeHolder="영문, 숫자 혼합 15자 이내" id="m-user-id" height={40} width='73%' />
                        <Button size="mid" background="blue80" radius={true} title="중복확인" measure={'%'} width={24.5} mgMeasure={'%'} marginLeft={2.5} />                        
                        <p className="tx-sub tx-red80 mt8">아이디 중복을 확인해주세요.</p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">비밀번호</p>
                        <Input type="password" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" id="m-user-pw" height={40} />
                        <p className="tx-tit mt16">비밀번호 확인</p>
                        <Input type="password" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" id="m-pw-chk" height={40} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">이름</p>
                        <Input type="text" value="김현대" disabled={true} id="m-user-name" height={40} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">휴대폰번호</p>
                        <span className="bridge2">
                          <MobSelectBox disabled={true} options={m_mobile_number_list} width='30%' />
                          <Input type="text" value="1234-5678" disabled={true} id="m-user-phone" height={40} width='67.5%' />                          
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">이메일</p>
                        <span className="bridge2"> 
                          <Input type="text" value="" id="m-user-email" height={40} />
                        </span>
                        <p className="tx-sub tx-red80">올바른 이메일 주소를 입력하세요. (예: name@gmail.com)</p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">주소<em>(선택)</em></p>
                        <span className="bridge2">
                          <Input type="text" height={40} value="12345" id="m-post" width='73%' />
                          <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={handleFullpagePopup("Address")} />
                        </span>
                        <span className="bridge2">
                          <Input type="text" height={40} value="서울 서초구 신반포로" id="m-address" />
                        </span>
                        <span className="bridge2">
                          <Input type="text" height={40} value="상세주소" id="m-address2" />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>가입구분</th>
                      <td>
                        <RadioGroup dataList={[
                          { id: 'dealer', value: 1, checked: false, disabled: false, label: '딜러' },
                          { id: 'ceo', value: 2, checked: true, disabled: false, label: '대표' }
                        ]} className="fr" />                        
                        <Tooltip placement="topRight" width={234}>
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>대표로 가입하신 경우 소속딜러 관리를 위한 [단체회원] ID 발급신청을 하실 수 있습니다.</p>
                          </TooltipCont>
                        </Tooltip>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">소속단지</p>
                        <div className="halfselec-wrap">
                          <span className="halfselect">
                            <MobSelectBox id="m-agency-area" options={mobile_select_area} placeHolder="시/도 선택" />
                          </span>
                          <span className="halfselect">
                            <MobSelectBox id="m-agency-area2" options={mobile_select_area} placeHolder="시/군/구 선택"/>
                          </span>
                          <span className="halfselect">
                            {agencyApply === "select" && <MobSelectBox id="m-agency-area3-select" options={mobile_select_area} placeHolder="소속단지 선택"/>}
                            {agencyApply === "input" && <Input type="text" placeHolder="소속단지" id="m-agency-area3-input" />}
                          </span>                          
                          <span className="halfselect">
                            <Button size="full" background="blue80" radius={true} title="" title={agencyApply === "select" ? "소속단지 직접입력" : "소속단지 선택"} height={40} onClick={handleAgency} fontSize={14} fontWeight={500}/>
                          </span>
                        </div>
                      </td>                       
                    </tr> 
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">소속상사명/대표자명</p>
                        <Input type="text" placeHolder="소속 상사명을 입력하세요." id="m-agency-name" height={40} />
                        <Input type="text" placeHolder="소속 상사 대표자명을 입력하세요." id="m-agency-ceo" height={40} marginTop={8} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">소속/대표 사업자 등록번호</p>
                        <span className="bridge2">
                          <Input type="text" height={40} placeHolder="사업자 등록번호를 입력하세요." id="m-agency-num" width='73%' />
                          <Button size="mid" background="blue20" color="blue80" fontWeight={500} radius={true} title="조회" measure={'%'} width={24.5} />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">종사원증번호/유효기간</p>
                        <Input type="text" placeHolder="사원증번호를 입력하세요." id="m-employee-num" height={40}/>                        
                        <DatePicker defaultValue={now} inputWidth='100' inputMeasure="%" placeHolder="유효기간을 선택하세요." marginTop={8} onClick={handleFullpagePopup("calendar")} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">종사원증 이미지</p>
                        <div className="file-wrap">
                          <p className="tx-tit">앞면</p>
                          <InputFile uploadList={uploadList1} />
                        </div>
                        <div className="file-wrap mt8">
                          <p className="tx-tit">뒷면</p>
                          <InputFile uploadList={uploadList1} />
                        </div>
                        <dl className="tx-sm-info">
                          <dd>종사원증 이미지는 앞뒤면을 모두 등록해주세요</dd>
                        </dl>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">프로필 사진</p>
                        <RadioGroup dataList={[
                          { id: 'mo-open', value: 1, checked: false, disabled: false, label: '공개' },
                          { id: 'mo-non-open', value: 2, checked: true, disabled: false, label: '비공개' }
                        ]} className="v-2"/>
                        <InputFile uploadList={uploadList1} />
                        <dl className="tx-sm-info">
                          <dd>이미지 등록기준 : 80X100 사이즈 / JPG 파일</dd>
                          <dd>본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제 될 수도 있습니다.</dd>
                        </dl>
                      </td>
                    </tr>                    
                  </tbody>
                </table>
              </fieldset>
            </form>            
            <Button className="fixed" size="full" background="blue80" title="가입완료" href="dealerStep04" nextLink={true} />
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup}>          
          {fpCalendar && <MobCalendar callback={closeFullpagePopup} />}
          {fpAddress && <FindAddress callback={closeFullpagePopup} />}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec-w">
          <div className="content-wrap member-steps">
            <div className="member-tit-area">
              <h3>딜러회원 가입</h3>
            </div>
            <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={3} reverse={true} marginTop={59} />
          </div>
        </div>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>가입정보입력</h4>
            </div>
            <form className="join-form">
              <fieldset>
                <legend className="away">가입정보입력</legend>
                <table summary="가입정보입력에 대한 내용" className="table-tp2">
                  <caption className="away">가입정보입력</caption>
                  <colgroup>
                    <col width="33%" />
                    <col width="67%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="user-id">아이디</label>
                      </th>
                      <td>
                        <span className="bridge">
                          <Input type="text" placeHolder="영문, 숫자 혼합 15자 이내" id="user-id" width={378} />
                        </span>
                        <Button size="mid" background="gray" title="중복확인" width={160} height={48} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="user-pw">비밀번호</label>
                      </th>
                      <td>
                        <Input type="password" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" id="user-pw" width={548} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="pw-chk">비밀번호 확인</label>
                      </th>
                      <td>
                        <Input type="password" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" id="pw-chk" width={548} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="user-name">이름</label>
                      </th>
                      <td>
                        <Input type="text" value="김현대" disabled={true} id="user-name" width={548} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="user-phone">휴대폰 번호</label>
                      </th>
                      <td>
                        <Input type="text" value="010-1234-5678" disabled={true} id="user-phone" width={548} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="user-email">이메일</label>
                      </th>
                      <td>
                        <Input type="text" id="user-email" width={548} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="address">주소<em>(선택)</em></label>
                      </th>
                      <td>
                        <span className="bridge2">
                          <Input type="text" value="12345" disabled={true} id="post" width={378} />
                          <Button size="mid" background="gray" title="우편번호" width={160} height={48} marginLeft={10} href="/sell/freeStep01Filter01" nextLink={true} />
                        </span>
                        <span className="bridge2">
                          <Input type="text" value="서울 서초구 신반포로" disabled={true} id="address" width={548} />
                        </span>
                        <span className="bridge2">
                          <Input type="text" placeHolder="상세주소" id="address2" width={548} />
                        </span>
                      </td>
                    </tr>
                    {/* #a1 start 추가*/}
                    <tr>
                      <th>
                        <label htmlFor="user-email">판매점 연락처</label>
                      </th>
                      <td>
                        <Input type="text" id="user-email" width={548} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="user-email">판매점 FAX</label>
                      </th>
                      <td>
                        <Input type="text" id="user-email" width={548} />
                      </td>
                    </tr>
                    {/* #a1 end */}
                    <tr>
                      <th>가입구분</th>
                      <td>
                        <RadioGroup dataList={[
                          { id: 'dealer', value: 1, checked: false, disabled: false, title: '딜러' },
                          { id: 'ceo', value: 2, checked: true, disabled: false, title: '대표' }
                        ]} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="agency-area">소속단지</label>
                      </th>
                      <td>
                        <span className="bridge">
                          <SelectBox id="agency-area" className="items-sbox" options={select_area} width={130} height={48} placeHolder="시/도 선택" />
                        </span>
                        <span className="bridge">
                          <SelectBox id="agency-area2" className="items-sbox" options={select_area} width={148} height={48} placeHolder="시/군/구 선택"/>
                        </span>
                        {agencyApply === "select" && <SelectBox id="agency-area3-select" className="items-sbox" options={select_area} width={250} height={48} placeHolder="소속단지 선택"/>}
                        {agencyApply === "input" && <Input type="text" placeHolder="소속단지" id="agency-area3-input" width={250} />}
                        <Button size="mid" background="gray" title="" title={agencyApply === "select" ? "소속단지 직접입력" : "소속단지 선택"} width={160} height={48} marginTop={10} onClick={handleAgency} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="agency-name">소속상사명 / 대표자명</label>
                      </th>
                      <td>
                        <span className="bridge">
                          <Input type="text" placeHolder="소속 상사명을 입력하세요." id="agency-name" width={269} />
                        </span>
                        <Input type="text" placeHolder="소속 상사 대표자명을 입력하세요." id="agency-ceo" width={269} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="agency-num">소속/대표 사업자 등록번호</label>
                      </th>
                      <td>
                        <Input type="text" placeHolder="사업자 등록번호를 입력하세요." id="agency-num" width={378} />
                        <Button size="mid" background="gray" title="사업자번호 조회" width={160} height={48} marginLeft={10} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="employee-num">종사원증번호/유효기간</label>
                      </th>
                      <td>
                        {/* #a2 start */}
                        <span className="bridge">
                          <Input type="text" placeHolder="사원증번호를 입력하세요." id="employee-num" width={212} />
                        </span>
                        <DatePicker defaultValue={now} inputHeight={48} inputWidth={150}/>
                        <em className="mg8">~</em>
                        <DatePicker defaultValue={now} inputHeight={48} inputWidth={150}/>
                        {/* #a2 end */}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="employee-img">종사원증 이미지</label>
                      </th>
                      <td>
                        <span className="bridge2">
                          <p className="tx-tit">앞면</p>
                          <InputFile uploadList={uploadList1} />
                        </span>
                        <span className="bridge2">
                          <p className="tx-tit">뒷면</p>
                          <InputFile uploadList={uploadList1} />
                        </span>
                        <p className="tx-exp-tp6">
                          · 종사원증 이미지는 앞뒤면을 모두 등록해주세요.<br />
                          <span>종사원증 이미지(뒷면)를 등록해주세요.</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="profile-img">프로필 사진<em>(선택)</em></label>
                      </th>
                      <td>
                        <span className="bridge2">
                          <RadioGroup dataList={[
                            { id: 'opne', value: 1, checked: false, disabled: false, title: '공개' },
                            { id: 'non-opne', value: 2, checked: true, disabled: false, title: '비공개' }
                          ]} />
                        </span>
                        <InputFile uploadList={uploadList1} />
                        <p className="tx-exp-tp6">
                          · 이미지 등록기준 : 80X100 사이즈 / JPG 파일<br />
                          · 본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제될 수도 있습니다.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* #a3 start */}
                <p className="tx-exp-tp6 tx-black mt10">※마이페이지 >회원정보 수정에서  판매점 주소와 영업시간 등을 추가할 수 있습니다. </p>
                {/* #a3 end */}
              </fieldset>
            </form>
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="가입완료" width={180} height={60} href="memberStep03" />
            </Buttons>
          </div>
        </div>
      </div>
      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} title="소속상사 검색" mode="normal" size="small">
        <div className="popup-agency">
          <form className="agency-form">
            <fieldset>
              <legend className="away">소속상사 검색</legend>
              <label htmlFor="search-terms">검색조건</label>
              <span className="bridge">
                <SelectBox id="search-terms" className="items-sbox" options={select_area} width={160} height={48} />
              </span>
              <span className="bridge">
                <Input type="text" placeHolder="검색어를 입력하세요." id="search-terms2" width={248} height={48} />
              </span>
              <Button size="big" background="blue80" title="조회" width={80} />
            </fieldset>
          </form>
          <div className="agency-con">
            {/* <p>검색어를 입력해주세요.</p> */}

            <table summary="소속상사 정보에 대한 내용" className="table-tp1 th-c td-c">
              <caption className="away">소속상사 정보</caption>
              <colgroup>
                <col width="12%" />
                <col width="32%" />
                <col width="24%" />
                <col width="32%" />
              </colgroup>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>소속상사명</th>
                  <th>대표자명</th>
                  <th>사업자등록번호</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Radio className="simple" id="radio-simple-1" value={1} checked={isValue} disabled={false} onChange={handleChange} /></td>
                  <td>현대모터스</td>
                  <td>김현대</td>
                  <td>123-12-12345</td>
                </tr>
                <tr>
                  <td><Radio className="simple" id="radio-simple-2" value={2} checked={isValue} disabled={false} onChange={handleChange} /></td>
                  <td>현대모터스2</td>
                  <td>김현대</td>
                  <td>123-12-12345</td>
                </tr>
                <tr>
                  <td><Radio className="simple" id="radio-simple-3" value={3} checked={isValue} disabled={false} onChange={handleChange} /></td>
                  <td>현대모터스3</td>
                  <td>김현대</td>
                  <td>123-12-12345</td>
                </tr>
                <tr>
                  <td><Radio className="simple" id="radio-simple-4" value={4} checked={isValue} disabled={false} onChange={handleChange} /></td>
                  <td>현대모터스4</td>
                  <td>김현대</td>
                  <td>123-12-12345</td>
                </tr>
                <tr>
                  <td><Radio className="simple" id="radio-simple-5" value={5} checked={isValue} disabled={false} onChange={handleChange} /></td>
                  <td>현대모터스5</td>
                  <td>김현대</td>
                  <td>123-12-12345</td>
                </tr>
              </tbody>
            </table>
            <Buttons align="center" marginTop={40} className="w-line">
              <Button size="big" background="blue80" title="선택" width={180} height={60} />
            </Buttons>


            {/* <p>검색결과가 없습니다.<br />소속정보를 등록해주세요.</p>
            <Buttons align="center" marginTop={40} className="w-line">
              <Button size="big" background="blue80" title="신규둥록" width={180} height={60} />
            </Buttons> */}
          </div>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerStep03;
