import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import FindAddress from '@src/components/common/popup/FindAddress';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup'
import InputFile from '@lib/share/items/InputFile';
import Input from '@lib/share/items/Input'
import Steps from '@lib/share/items/Steps';
import { signup_check_list } from '@src/dummy';
import { auction_check_term } from '@src/dummy/terms';
import { m_mobile_number_list } from '@src/dummy';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

/*
  html 변경이력
  03.10 : #a1참고 항목추가  
  03.10 : #a2 참고 항목추가 
*/

const AllyStep02_01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };

  const [agencyApply, setAgencyApply] = useState("select");
  const handleAgency = (e) => {
    e.preventDefault();
    setAgencyApply("input");
  }

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '제휴회원 가입',
        options: ['back','gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 88,
        color: '#ffffff'
      }
    });
    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [fpAddress, setFpAddress] = useState(false); // 달력 팝업
    const [fpTerms, setFpTerms] = useState(false); // 약관 팝업
    const [seq, setSeq] = useState(0);
    
    const handleFullpagePopup = useCallback((name,seq) => e => {
      e.preventDefault();
      if (name === "Address") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '우편번호',
            options: ['back', 'close'],
          }
        });
        setFpTerms(false);
        setFpAddress(true);
      } else if (name === "terms") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: signup_check_list[seq].title,
            options: ['close']
          }
        });
        setSeq(seq);
        setFpAddress(false);
        setFpTerms(true);
      }
      setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    }, [fpAddress, fpTerms]);

    const CloseFpPop = useCallback((e) => {
      e.preventDefault();
      setFpTerms(false);
      setFpAddress(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, [])
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
                      <th className="ver-t">제휴구분</th>
                      <td>
                        <RadioGroup dataList={[
                          { id: 'ally-sort1', value: 1, checked: true, disabled: false, label: '수입인증 중고차' },
                          { id: 'ally-sort2', value: 2, checked: false, disabled: false, label: '금융사인증 중고차' },
                          { id: 'ally-sort3', value: 3, checked: false, disabled: false, label: '프랜차이즈' }
                        ]} className="v-3"/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">제휴법인명</p>
                        <Input type="text" value="현대모터스" disabled={true} id="m-ally-name" height={40} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">대표자명</p>
                        <Input type="text" value="김현대" disabled={true} id="m-ceo-name" height={40} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">대표자 휴대폰번호</p>
                        <span className="bridge2">
                          <MobSelectBox disabled={true} options={m_mobile_number_list} width='30%' />
                          <Input type="text" value="010-1234-5678" disabled={true} id="m-ceo-phone" height={40} width='67.5%' />                          
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">사업자 등록번호</p>
                        <Input type="text" value="123-12-12345" disabled={true} id="m-agency-num" height={40} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">사업자 주소</p>
                        <span className="bridge2">
                          <Input type="text" height={40} value="12345" id="m-agency-post" width='73%' />
                          <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={handleFullpagePopup("Address")} />
                        </span>
                        <span className="bridge2">
                          <Input type="text" height={40} value="서울특별시 강남구 테헤란로 301" id="m-agency-address" />
                        </span>
                        <span className="bridge2">
                          <Input type="text" height={40} value="현대글로비스(주)" id="agency-address2" />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">소속단지</p>
                        <div className="halfselec-wrap">
                          <span className="halfselect">
                            <Input type="text" value="지역" disabled={true} id="m-agency-area" />
                          </span>
                          <span className="halfselect">
                            <Input type="text" value="단지" disabled={true} id="m-agency-area2" />
                          </span>                          
                        </div>
                      </td> 
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">이름(담당자명)</p>
                        <Input type="text" value="김현대" id="m-user-name" height={40} />                        
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">이메일</p>
                        <Input type="text" value="hyundai123@glovis.net" id="m-user-email" />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">사업자등록증 이미지</p>
                        <InputFile uploadList={uploadList1} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">관리사업자등록증 이미지</p>
                        <InputFile uploadList={uploadList1} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">법인인감증명서 이미지</p>
                        <InputFile uploadList={uploadList1} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">업무제휴계약서</p>
                        <InputFile uploadList={uploadList1} />
                        <Button size="full" line="gray" radius={true} title="업무제휴계약서 다운로드" height={40} marginTop={8} fontSize={14}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">위임장 이미지<span>(선택)</span></p>
                        <InputFile uploadList={uploadList1} />
                        <dl className="tx-sm-info">
                          <dd>대표자 대신 가입 시 위임장 이미지를 넣어주세요.</dd>
                        </dl>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">프로필 사진<em>(선택)</em></p>
                        <RadioGroup dataList={[
                          { id: 'm-open', value: 1, checked: false, disabled: false, label: '공개' },
                          { id: 'm-non-open', value: 2, checked: true, disabled: false, label: '비공개' }
                        ]} className="v-2"/>
                        <InputFile uploadList={uploadList1} />
                        <dl className="tx-sm-info">
                          <dd>이미지 등록기준 : 80X100 사이즈 / JPG 파일</dd>
                          <dd>본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제 될 수도 있습니다.</dd>
                        </dl>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="tx-tit">소속딜러 정보</p>
                        <dl className="tx-sm-info">
                          <dd>동일 소속의 딜러목록이 자동으로 노출됩니다.</dd>
                          <dd>마이페이지에서도 쉽게 소속딜러 관리를 하실 수 있습니다.</dd>
                        </dl>
                        <table summary="소속딜러 정보에 대한 내용" className="table-tp1 mt8">
                          <caption className="away">소속딜러 정보</caption>
                          <colgroup>
                            <col width="50px" />
                            <col width="*" />
                            <col width="*" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>대표</th>
                              <td>
                                김현대<br />
                                010-1234-5678
                              </td>
                              <td>
                                GG19-01865<br />
                                ( ~ YYYY.MM.DD)
                              </td>
                            </tr>
                            <tr>
                              <th>딜러</th>
                              <td>
                                김현대<br />
                                010-1234-5678
                              </td>
                              <td>
                                종사원증번호<br />
                                ( ~ 유효기간 만료일자)
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
              <div className="select-wrap">
                <SignUpCheckBoxGroup
                  sub_title="필수약관만 동의합니다."
                  sub_id="chk-agree-essential"
                  title="전체동의 합니다."
                  id="chk-agree-all"
                  agree_list={signup_check_list}
                  agree_term={auction_check_term}
                  events={[handleFullpagePopup("terms", 0), handleFullpagePopup("terms", 1), handleFullpagePopup("terms", 2), handleFullpagePopup("terms", 3), handleFullpagePopup("terms", 4)]}
                  links={['/member/termsView?seq=0', '/member/termsView?seq=1', '/member/termsView?seq=2', '/member/termsView?seq=3']}
                /> 
              </div>
            </form>            
            <Button className="fixed" size="full" background="blue80" title="가입완료" onClick={CloseFpPop}/>
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup}>          
          {fpAddress && <FindAddress callback={CloseFpPop} />}
          {fpTerms && (
          <div className="member-terms-wrap">
            <div className="view-wrap">
              <div className="content">{auction_check_term[seq]}</div>                      
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
            </div>          
          </div>)}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
      <AppLayout>
        <div className="content-sec">
          <div className="member-sec">
            <div className="content-wrap member-contents">
              <div className="member-tit-area">
                <h4>제휴회원 가입</h4>
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
                        <th><label htmlFor="user-id">아이디</label></th>
                        <td><Input type="text" placeHolder="영문, 숫자 혼합 15자 이내" id="user-id" /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="user-pw">비밀번호</label></th>
                        <td><Input type="password" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" id="user-pw" width={548} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="pw-chk">비밀번호 확인</label></th>
                        <td><Input type="password" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" id="pw-chk" width={548} /></td>
                      </tr>
                      <tr>
                        <th>제휴구분</th>
                        <td>
                          <RadioGroup dataList={[
                            { id: 'ally-sort1', value: 1, checked: true, disabled: false, title: '수입인증 중고차' },
                            { id: 'ally-sort2', value: 2, checked: false, disabled: false, title: '금융사인증 중고차' },
                            { id: 'ally-sort3', value: 3, checked: false, disabled: false, title: '프랜차이즈' }
                          ]} />
                        </td>
                      </tr>
                      <tr>
                        <th><label htmlFor="ally-name">제휴법인명</label></th>
                        <td><Input type="text" value="현대모터스" disabled={true} id="ally-name" width={548} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="ceo-name">대표자명</label></th>
                        <td><Input type="text" value="김현대" disabled={true} id="ceo-name" width={548} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="ceo-phone">대표자 휴대폰번호</label></th>
                        <td><Input type="text" value="010-1234-5678" disabled={true} id="ceo-phone" width={548} /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="agency-num">사업자 등록번호</label></th>
                        <td><Input type="text" value="123-12-12345" disabled={true} id="agency-num" width={548} /></td>
                      </tr>
                      {/* #a1 항목추가 start */}
                      <tr>
                        <th>사업자형태</th>
                        <td>                       
                          <span className="bridge2">
                            <RadioGroup dataList={[
                              { id: 'corporate-business', value: 1, checked: false, disabled: false, title: '법인사업자' },
                              { id: 'individual-business', value: 2, checked: true, disabled: false, title: '개인사업자' }
                            ]} />
                          </span>
                        </td>
                      </tr>
                      {/* #a1 항목추가 start */}
                      <tr>
                        <th><label htmlFor="agency-address">사업자 주소</label></th>
                        <td>
                          <span className="bridge2">
                            <Input type="text" value="12345" disabled={true} id="agency-post" width={378} />
                            <Button size="mid" background="gray" title="우편번호" width={160} height={48} marginLeft={10} />
                          </span>
                          <span className="bridge2">
                            <Input type="text" value="서울특별시 강남구 테헤란로 301" disabled={true} id="agency-address" width={548} />
                          </span>
                          <span className="bridge2">
                            <Input type="text" value="현대글로비스(주)" disabled={true} id="agency-address2" width={548} />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th><label htmlFor="agency-area">소속단지</label></th>
                        <td>
                          <span className="bridge">
                            <Input type="text" value="지역" disabled={true} id="agency-area" width={269} />
                          </span>
                          <Input type="text" value="단지" disabled={true} id="agency-area2" width={269} />
                        </td>
                      </tr>
                      {/* #a2 start 추가*/}
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
                      {/* #a2 end */}
                      <tr>
                        <th><label htmlFor="user-name">이름(담당자명)</label></th>
                        <td>
                          <Input type="text" value="이현대" id="user-name" width={548} />
                        </td>
                      </tr>
                      <tr>
                        <th><label htmlFor="user-email">이메일</label></th>
                        <td><Input type="text" value="hyundai123@glovis.net" id="user-email" width={548} /></td>
                      </tr>
                      <tr>
                        <th>사업자등록증 이미지</th>
                        <td><InputFile uploadList={uploadList1} /></td>
                      </tr>
                      <tr>
                        <th>관리사업자등록증 이미지</th>
                        <td><InputFile uploadList={uploadList1} /></td>
                      </tr>
                      <tr>
                        <th>법인인감증명서 이미지</th>
                        <td><InputFile uploadList={uploadList1} /></td>
                      </tr>
                      <tr>
                        <th>업무제휴계약서</th>
                        <td>
                          <InputFile uploadList={uploadList1} />
                          <Button size="mid" line="darkgray" title="업무제휴계약서 다운로드" width={180} height={48} marginTop={10} />
                        </td>
                      </tr>
                      <tr>
                        <th>위임장 이미지<em>(선택)</em></th>
                        <td>
                          <InputFile uploadList={uploadList1} />
                          <p className="tx-exp-tp6 line1">
                            · 대표자 대신 가입 시 위임장 이미지를 넣어주세요.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th><label htmlFor="profile-img">프로필 사진<em>(선택)</em></label></th>
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
                      <tr>
                        <th>소속딜러 정보</th>
                        <td>
                          <table summary="소속딜러 정보에 대한 내용" className="table-tp1 th-c">
                            <caption className="away">소속딜러 정보</caption>
                            <colgroup>
                              <col width="26%" />
                              <col width="38%" />
                              <col width="38%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th>대표</th>
                                <td>
                                  김현대<br />
                                  010-1234-5678
                                </td>
                                <td>
                                  GG19-01865<br />
                                  ( ~ YYYY.MM.DD)
                                </td>
                              </tr>
                              <tr>
                                <th>딜러</th>
                                <td>
                                  김현대<br />
                                  010-1234-5678
                                </td>
                                <td>
                                  종사원증번호<br />
                                  ( ~ 유효기간 만료일자)
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p className="tx-exp-tp6">
                            · 동일 소속의 딜러목록이 자동으로 노출됩니다.<br />
                            · 마이페이지에서도 쉽게 소속딜러 관리를 하실 수 있습니다.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </fieldset>
                <SignUpCheckBoxGroup
                  sub_title="필수 약관 동의"
                  sub_id="chk-agree-essential"
                  title="약관 전체 동의"
                  id="chk-agree-all"
                  agree_list={signup_check_list}
                  agree_term={auction_check_term}
                />
              </form>
              <Buttons align="center" marginTop={60} className="w-line">
                <Button size="big" background="blue80" title="가입완료" width={180} height={60} href="allyStep04" />
              </Buttons>
            </div>
          </div>
        </div>
      </AppLayout>
    )
}

export default AllyStep02_01;
