import { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import Textarea from '@lib/share/items/Textarea';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { select1_list } from '@src/dummy';
import { select_area, mobile_select_area } from '@src/dummy';
import { m_mobile_number_list } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerMember01_02 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const { member } = router.query;
  const [memberType ,setMemberType] = useState(member === "organization" ? "organization" : "private"); //  private(개인), organization(단체)

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
  const handleDatepicker = (href) => (e) => {
    e.preventDefault();
    Router.push(href)
  }

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원정보 수정',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    });
    const [busiNum, setBusiNum] = useState('12345');
    const [busiAddr, setBusiAddr] = useState('서울 서초구 신반포로');
    const [busiAddrDetail, setBusiAddrDetail] = useState('');
    const handleChangeNum = (e) => setBusiNum(e.target.value);
    const handleChangeAddr = (e) => setBusiAddr(e.target.value);
    const handleChangeAddrDetail = (e) => setBusiAddrDetail(e.target.value);

    const [copyNum, setCopyNum] = useState('');
    const [copyAddr, setCopyAddr] = useState('');
    const [copyAddrDetail, setCopyDetail] = useState('');
    

    const handleBusiness = (e) => {
      if (e.target.checked) {
        setCopyNum(busiNum);
        setCopyAddr(busiAddr);
        setCopyDetail(busiAddrDetail);
      } else {
        setCopyNum('');
        setCopyAddr('');
        setCopyDetail('');
      }
    }
    return (
      <AppLayout>
        <div className="content-wrap">        
          <div className="mypage-state-sec member-info-modify mt20">

            {
              memberType === "private" && ( // 개인 딜러 회원
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
                            <p className="tx-tit">이름</p>
                            <Input type="text" value="김현대" id="m-member-modify1" height={40} />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">휴대폰번호</p>
                            <span className="bridge2">
                              <MobSelectBox disabled={false} options={m_mobile_number_list} width='20%' />
                              <Input type="text" disabled={false} id="m-member-modify2" height={40} width='50.5%' />
                              <Button size="mid" background="blue80" title="변경" height={40} measure={'%'} width={24.5} radius={true}/>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">이메일</p>
                            <span className="bridge2"> 
                              <Input type="text" value="" id="m-member-modify3" height={40} />
                            </span>
                            <p className="tx-sub tx-red80">올바른 이메일 주소를 입력하세요. (예: name@gmail.com)</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">주소</p>
                            <span className="bridge2">
                              <Input type="text" height={40} value="12345" id="m-member-modify4" width='73%' />
                              <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} />
                            </span>
                            <span className="bridge2">
                              <Input type="text" height={40} value="서울 서초구 신반포로" id="m-member-modify5" />
                            </span>
                            <span className="bridge2">
                              <Input type="text" height={40} value="상세주소" id="m-member-modify6" />
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">소속상사명/대표자명</p>
                            <Input type="text" placeHolder="소속 상사명을 입력하세요." id="m-member-modify7" height={40} />
                            <Input type="text" placeHolder="소속 상사 대표자명을 입력하세요." id="m-member-modify8" height={40} marginTop={8} />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">소속단지</p>
                            <div className="halfselec-wrap">
                              <span className="halfselect">
                                <Input type="text" placeHolder="지역" id="m-member-modify9" />
                              </span>
                              <span className="halfselect">
                                <Input type="text" placeHolder="단지" id="m-member-modify10" />
                              </span>
                            </div>
                          </td>                       
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">종사원증번호/유효기간</p>
                            <Input type="text" placeHolder="사원증번호를 입력하세요." id="m-member-modify11" height={40}/>
                            <DatePicker placeHolder="유효기간을 선택하세요." marginTop={8} disabled={true} onClick={handleDatepicker('/member/calendar')} />
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
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">판매점주소</p>
                            <span className="bridge2">
                              <Input type="text" height={40} value="12345" id="m-member-modify12" width='73%' />
                              <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} />
                            </span>
                            <span className="bridge2">
                              <Input type="text" height={40} value="서울 서초구 신반포로" id="m-member-modify13" />
                            </span>
                            <span className="bridge2">
                              <Input type="text" height={40} value="상세주소" id="m-member-modify14" />
                            </span>
                          </td>
                        </tr>
                         <tr>
                          <td colSpan="2">
                            <p className="tx-tit">판매점 연락처</p>
                            <span className="bridge2">
                              <MobSelectBox options={m_mobile_number_list} width='30%' />
                              <Input type="text" value="1234-5678" id="m-member-modify15" height={40} width='67.5%' />                          
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">팩스</p>
                            <span className="bridge2">
                              <MobSelectBox options={m_mobile_number_list} width='30%' />
                              <Input type="text" value="1234-5678" id="m-member-modify16" height={40} width='67.5%' />                          
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">영업시간</p>                            
                            <Textarea countLimit={30} type="tp1" height={50} placeHolder="입력해주세요." disabledEnter={true} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus}/>
                          </td>                          
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </form> 
              )
            }
            {
              memberType === "organization" && ( // 단체, 제휴 회원
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
                            <p className="tx-tit">소속상사명/대표자명</p>
                            <Input type="text" placeHolder="소속 상사명을 입력하세요." id="m-member-modify2-1" height={40} />
                            <Input type="text" placeHolder="소속 상사 대표자명을 입력하세요." id="m-member-modify2-2" height={40} marginTop={8} />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">대표자 휴대폰번호</p>
                            <span className="bridge2">
                              <MobSelectBox disabled={false} options={m_mobile_number_list} width='20%' />
                              <Input type="text" disabled={false} id="m-member-modify2-3" height={40} width='50.5%' />
                              <Button size="mid" background="blue80" title="변경" height={40} measure={'%'} width={24.5} radius={true}/>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">사업자 등록번호</p>
                            <span className="bridge2">
                              <Input type="text" height={40} placeHolder="사업자 등록번호를 입력하세요." id="m-member-modify2-4" />                              
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">사업자 주소</p>
                            <span className="bridge2">
                              <Input type="text" height={40} id="m-member-modify2-5" width='73%' value={busiNum} onChange={handleChangeNum} />
                              <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} />
                            </span>
                            <span className="bridge2">
                              <Input type="text" height={40} id="m-member-modify2-6" value={busiAddr} onChange={handleChangeAddr} />
                            </span>
                            <span className="bridge2">
                              <Input type="text" height={40} placeHolder="상세주소" id="m-member-modify2-7" value={busiAddrDetail} onChange={handleChangeAddrDetail} />
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">소속단지</p>
                            <div className="halfselec-wrap">
                              <span className="halfselect">
                                <Input type="text" placeHolder="지역" id="m-member-modify2-8" />
                              </span>
                              <span className="halfselect">
                                <Input type="text" placeHolder="단지" id="m-member-modify2-9" />
                              </span>
                            </div>
                          </td>                       
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">이메일</p>
                            <span className="bridge2"> 
                              <Input type="text" value="" id="m-member-modify2-10" height={40} />
                            </span>
                            <p className="tx-sub tx-red80">올바른 이메일 주소를 입력하세요. (예: name@gmail.com)</p>
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
                            <p className="tx-tit">프로필 사진<em>(선택)</em></p>
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
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">판매점주소</p>
                            <div className="m-chk-wrap">
                              <CheckBox id="chk-basic-sml" title="사업자주소 동일" size="small" onChange={handleBusiness} />
                            </div>                           
                            <span className="bridge2">
                              <Input type="text" height={40} data={copyNum} isSelf={false} id="m-member-modify2-11" width='73%' />
                              <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} />
                            </span>
                            <span className="bridge2">
                              <Input type="text" height={40} data={copyAddr} isSelf={false} id="m-member-modify2-12" />
                            </span>
                            <span className="bridge2">
                              <Input type="text" height={40} data={copyAddrDetail} isSelf={false} id="m-member-modify2-13" />
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">판매점 연락처</p>
                            <span className="bridge2">
                              <MobSelectBox options={m_mobile_number_list} width='30%' />
                              <Input type="text" value="1234-5678" id="m-member-modify2-14" height={40} width='67.5%' />                          
                            </span>
                          </td>
                        </tr>                                                                                             
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">팩스</p>
                            <span className="bridge2">
                              <MobSelectBox options={m_mobile_number_list} width='30%' />
                              <Input type="text" value="1234-5678" id="m-member-modify2-15" height={40} width='67.5%' />                          
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <p className="tx-tit">영업시간</p>                            
                            <Textarea countLimit={30} type="tp1" height={50} placeHolder="입력해주세요." disabledEnter={true} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus}/>
                          </td>                          
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </form> 
              )
            }
            <MobBottomArea isFix={true} isSimple={true}>
              <Buttons align="center" className="full">
                <Button size="big" background="blue20" color="blue80" title="취소" height={56} href="/mypage/dealerMember01_01" nextLink={true} />
                <Button size="big" background="blue80" title="변경" height={56} />
              </Buttons>
            </MobBottomArea> 
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec member-info-modify">
          <div className="mypage-admin-title">
            <h3>회원정보 수정</h3>
          </div>

          {
            memberType === "private" && ( // 개인 딜러 회원
              <table className="table-tp1 input" summary="회원정보 수정 내용">
                <caption className="away">회원정보 수정</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <tbody>
                  {/* 이름 ~ 주소 까지 디자인에 없는데 기획서에 있어서 넣음 */}
                  <tr>
                    <th>이름</th>
                    <td><Input type="text" id="member-modify1" width={223} height={40} /></td>
                  </tr>
                  <tr>
                    <th>휴대폰번호</th>
                    <td>
                      <SelectBox id="member-modify1" className="items-sbox" options={select1_list} width={125} placeHolder="02" />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify2" width={125} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify3" width={125} height={40} />
                      <Button size="mid" background="gray" title="휴대폰번호 변경" width={140} height={40} marginLeft={8} marginRight={8} />
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td><Input type="text" id="member-modify4" width={270} height={40} /></td>
                  </tr>
                  <tr className="address">
                    <th>주소</th>
                    <td className="address">
                      <span className="bridge2">
                        <Input type="text" disabled={true} id="member-modify5" width={110} height={40} />
                        <Button size="big" background="gray" title="우편번호" width={140} height={40} /><br />
                      </span>
                      <span className="bridge2">
                        <Input type="text" disabled={true} id="member-modify6" width={258} height={40} />
                        <Input type="text" id="member-modify7" width={258} height={40} />
                      </span>                
                    </td>
                  </tr>
                  <tr>
                    <th>소속상사명/대표자명</th>
                    <td>
                      <Input type="text" id="member-modify8" width={223} height={40} />
                      <em></em>
                      <Input type="text" id="member-modify9" width={223} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>소속단지</th>
                    <td>
                      <Input type="text" id="member-modify10" width={223} height={40} />
                      <em></em>
                      <Input type="text" id="member-modify11" width={223} height={40} />
                    </td>
                  </tr>
                  <tr className="worker-num">
                    <th>종사원번호/유효기간</th>
                    <td>
                      <Input type="text" placeHolder="사원증번호를 입력하세요" id="member-modify9" width={224} height={40} />
                      <DatePicker inputWidth={224} inputHeight={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>종사원증 이미지</th>
                    <td>
                      <span className="bridge2">
                        <em className="mr16">앞면</em>
                          <InputFile uploadList={uploadList1} inputW={248}/>
                      </span><br />
                      <span className="bridge2">
                        <em className="mr16">뒷면</em>
                          <InputFile uploadList={uploadList1} inputW={248}/>
                        <p className="tx-exp-tp5 mt20 mb8">* 종 사원증 이미지는 앞뒤면을 모두 등록해주세요.</p>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>프로필 사진<em>(선택)</em></th>
                    <td>
                      <RadioGroup dataList={[
                        {id:'member-modify12', value:1, checked:true, disabled:false, title:'공개'},
                        {id:'member-modify13', value:2, checked:false, disabled:false, title:'비공개'}
                      ]} size="small" />
                      <InputFile uploadList={uploadList1} inputW={290} />
                      <p className="tx-exp-tp5 mt20">* 이미지 등록기준 : 80X100 사이즈 / JPG 파일</p>
                      <p className="tx-exp-tp5 mb8">* 본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제될 수도 있습니다.</p>
                    </td>
                  </tr>
                  <tr className="address">
                    <th>판매점 주소</th>
                    <td className="address">
                      <span className="bridge2">
                        <Input type="text" disabled={true} id="member-modify15" width={110} height={40} />
                        <Button size="big" background="gray" title="우편번호" width={140} height={40} /><br />
                      </span>
                      <span className="bridge2">
                        <Input type="text" disabled={true} id="member-modify9" width={258} height={40} />
                        <Input type="text" id="member-modify10" width={258} height={40} />
                      </span>                
                    </td>
                  </tr>
                  <tr>
                    <th>판매점 연락처</th>
                    <td>
                      <SelectBox id="member-modify16" placeHolder="02" className="items-sbox" options={select1_list} width={125} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify17" width={125} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify18" width={125} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>
                      <SelectBox id="member-modify13" placeHolder="02" className="items-sbox" options={select1_list} width={125} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify19" width={125} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify20" width={125} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>영업시간</th>
                    <td><Textarea countLimit={500} height={160} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} /></td>
                  </tr>
                </tbody>
              </table>
            )
          }
          {
            memberType === "organization" && ( // 단체, 제휴 회원
              <table className="table-tp1 input" summary="회원정보 수정 내용">
                <caption className="away">회원정보 수정</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>소속상사명/대표자명</th>
                    <td><Input type="text" id="member-modify2-1" width={300} height={40} /></td>
                  </tr>
                  <tr>
                    <th>대표자명</th>
                    <td><Input type="text" id="member-modify2-2" width={300} height={40} /></td>
                  </tr>
                  <tr>
                    <th>대표자 휴대폰번호</th>
                    <td><Input type="text" id="member-modify2-3" width={300} height={40} /></td>
                  </tr>
                  <tr>
                    <th>사업자등록번호</th>
                    <td><Input type="text" id="member-modify2-4" width={300} height={40} /></td>
                  </tr>
                  <tr className="address">
                    <th>사업자 주소</th>
                    <td className="address">
                      <span className="bridge2">
                        <Input type="text" disabled={true} id="member-modify2-5" width={110} height={40} />
                        <Button size="big" background="gray" title="우편번호" width={140} height={40} /><br />
                      </span>
                      <span className="bridge2">
                        <Input type="text" disabled={true} id="member-modify2-6" width={258} height={40} />
                        <Input type="text" id="member-modify2-17" width={258} height={40} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>소속단지</th>
                    <td>
                      <Input type="text" id="member-modify2-8" width={233} height={40} />
                      <em></em>
                      <Input type="text" id="member-modify2-9" width={233} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td>
                      <Input type="text" id="member-modify2-10" width={233} height={40} />
                      <em></em>
                      <Input type="text" id="member-modify2-11" width={233} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>사업자등록증 이미지</th>
                    <td><InputFile uploadList={uploadList1} inputW={290}/></td>
                  </tr>
                  <tr>
                    <th>관리자사업등록증 이미지</th>
                    <td><InputFile uploadList={uploadList1} inputW={290}/></td>
                  </tr>
                  <tr>
                    <th>프로필 사진<em>(선택)</em></th>
                    <td>
                      <RadioGroup dataList={[
                        {id:'member-modify12', value:1, checked:true, disabled:false, title:'공개'},
                        {id:'member-modify13', value:2, checked:false, disabled:false, title:'비공개'}
                      ]} size="small" />
                      <InputFile uploadList={uploadList1} inputW={290} />
                      <p className="tx-exp-tp5 mt20">* 이미지 등록기준 : 80X100 사이즈 / JPG 파일</p>
                      <p className="tx-exp-tp5 mb8">* 본인 프로필이 아닌 사진(예 : 연예인, 동물 등) 등록 시 삭제될 수도 있습니다.</p>
                    </td>
                  </tr>
                  <tr className="address">
                    <th>판매점 주소</th>
                    <td className="address">
                      <span className="bridge2">
                        <Input type="text" disabled={true} id="member-modify15" width={110} height={40} />
                        <Button size="big" background="gray" title="우편번호" width={140} height={40} /><br />
                      </span>
                      <span className="bridge2">
                        <Input type="text" disabled={true} id="member-modify2-9" width={258} height={40} />
                        <Input type="text" id="member-modify2-10" width={258} height={40} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>판매점 연락처</th>
                    <td>
                      <SelectBox id="member-modify2-10" placeHolder="02" className="items-sbox" options={select1_list} width={125} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify2-11" width={125} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify2-12" width={125} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>
                      <SelectBox id="member-modify2-13" placeHolder="02" className="items-sbox" options={select1_list} width={125} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify2-14" width={125} height={40} />
                      <em className="mg8">-</em>
                      <Input type="text" id="member-modify2-15" width={125} height={40} />
                    </td>
                  </tr>
                  <tr>
                    <th>영업시간</th>
                    <td><Textarea countLimit={500} type="tp1" height={160} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} /></td>
                  </tr>
                </tbody>
              </table>
            )
          }
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="수정완료" width={248} height={60}/>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default withRouter(DealerMember01_02)
