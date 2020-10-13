import { useState, useCallback } from 'react';// #a1 추가
import { useSelector, useDispatch } from 'react-redux';
import Input from '@lib/share/items/Input';// #a1 추가
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';// #a1 추가
import SelectBox from '@lib/share/items/SelectBox';// #a1 추가
import Textarea from '@lib/share/items/Textarea';// #a1 추가
import Radio from '@lib/share/items/Radio';
import RodalPopup from '@lib/share/popup/RodalPopup';// #a1 추가
import useRodal from '@lib/share/custom/useRodal';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import {select1_list} from '@src/dummy';
import Link from 'next/link';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

/*
  html 변경이력
  03.10 : 하단 메뉴에 영상정보처리방침 항목삭제  
  03.17 : 제휴문의 팝업 추가 #a1 참고
          회사소개 링크 수정 #a2 참고
*/

const Footer = () => { 
  const dispatch = useDispatch();
  // #a1 추가 start
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);

  const [isCertify, setIsCertify] = useState(false);
  const handleCertify = useCallback((e) => {
    e.preventDefault();
    setIsCertify(true);
  }, []);
//  #a1 추가 end
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if (hasMobile) {
    // 버튼식 라디오
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    // 컨펌&얼럿 팝업
    const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
    const closeMpop = useCallback((e) => {
      e.preventDefault();
      setMpop(false);
    }, []);
    
    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [fpInquire, setFpInquire] = useState(false); // 제휴문의팝업
    const [fpAterms, setFpAterms] = useState(false); // 이용/환불약관
    const [fpPolicy, setFpPolicy] = useState(false); // 개인정보처리방침
      
    const handleFullpagePopup = useCallback(name => e => {
      e.preventDefault();
      if (name === "Inquire") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제휴문의',
            options: ['close'],
          }
        });              
        setFpInquire(true);
        setFpAterms(false);
        setFpPolicy(false);
      } else if (name === "Aterms"){
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '오토벨 이용약관',
            options: ['back', 'close'],
          }
        });        
        setFpAterms(true);
        setFpInquire(false);
        setFpPolicy(false);
      } else if (name === "Policy"){
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '개인정보처리방침',
            options: ['back', 'close'],
          }
        });
        setFpPolicy(true);        
        setFpAterms(false);
        setFpInquire(false);        
      }
      setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    }, [fpInquire,fpAterms]);

    const closeFullpagePopup = useCallback((e) => {
      e.preventDefault();
      setFpInquire(false);      
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, [fpInquire,fpAterms])
    // 풀페이지 팝업 END
    return (
      <>
      <footer id="footer-sec">
        <div className="sec-top">
          <div className="inner">
            <h3 className="hide">하단 메뉴</h3>
            <ul className="ft-menu">
              <li><a href="https://www.glovis.net/Kor/company/contentsid/228/index.do" target="_blank">회사소개</a></li>{/* #a1 */}
              <li onClick={handleFullpagePopup("Inquire")}>제휴문의</li>
              <li onClick={handleFullpagePopup("Aterms")}>이용/환불약관</li>
              <li onClick={handleFullpagePopup("Policy")}>개인정보처리방침</li>    
            </ul>
          </div>
        </div>
        <div className="sec-bottom">
          <div className="inner">
            <h2 className="ft-logo"><Link href="/main"><a>하단 로고</a></Link></h2>
            <div className="copyright">
              <p><span>현대글로비스㈜ 서울특별시 강남구 테헤란로 301</span><span>사업자등록번호 : 106-81-97118</span></p>
              <p><span>Copyright (c) HYUNDAI GLOVIS Co., Ltd.</span><span>All Rights Reserved.</span></p>
            </div>
          </div>
        </div>
      </footer>
      {/* #a1 제휴문의 팝업추가 start */}
      <MobFullpagePopup active={mFullpagePopup}>         
        {fpInquire && 
          <>
          <div className="live-tit">
            <p>
              제휴문의에 관하여 궁금한 사항을 보내주시면<br />
              담당자 확인 후 보다 자세한 상담을 드릴 수 있도록 하겠습니다.
              </p>
          </div>
          <div className="content-wrap inquire-wrap v-2">
            <form>
              <fieldset>
                <legend className="away">제휴문의</legend>
                <table summary="제휴문의에 대한 내용" className="table-tp2">
                  <caption className="away">제휴문의</caption>
                  <colgroup>
                    <col width="34%" />
                    <col width="76%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>회사명</th>
                      <td><Input type="text" id="agency-name" /></td>
                    </tr>
                    <tr>
                      <th><label htmlFor="user-name">담당자 성함</label></th>
                      <td><Input type="text" id="user-name" /></td>
                    </tr>
                    <tr>
                      <th><label htmlFor="user-phone">전화번호</label></th>
                      <td><Input type="text" id="user-phone" /></td>
                    </tr>
                    <tr>
                      <th><label htmlFor="email">이메일 주소</label></th>
                      <td><Input type="text" id="email" /></td>
                    </tr>
                    <tr>
                      <th><label htmlFor="partner-name">제목</label></th>
                      <td><Input type="text" id="partner-name" /></td>
                    </tr>
                    <tr>
                      <th>문의내용</th>
                      <td><Textarea countLimit={200} type="tp1" height={176} /></td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
            </form>
            <Button className="fixed" size="full" background="blue80" title="문의하기" onClick={(e) => openMpop(e, 'fade')} />
          </div>

          <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
            <div className="con-wrap">
              <p className="tit1">제휴문의가 접수되었습니다.</p>
              <p>빠른 시일안에 담당자가 연락드리겠습니다.</p>
              <Buttons align="right" marginTop={16}>
                <Button fontSize={14} title="확인" color="blue80" fontWeight={500}  href="/main" />
              </Buttons>
            </div>
          </RodalPopup>
          </>
        }
        {
          fpAterms && (
            <div>이용약관</div>
          )
        }
        {
          fpPolicy && (
            <div>개인정보처리방침</div>
          )
        } 
      </MobFullpagePopup>
      </>     
    )
  }

  return (
    <>
    <footer id="footer-sec">
      <div className="sec-top">
        <div className="inner">
          <h3 className="hide">하단 메뉴</h3>
          <ul className="ft-menu">
            <li><a href="https://www.glovis.net/Kor/company/contentsid/228/index.do" target="_blank">회사소개</a></li>{/* #a1 */}
            <li>             
              <Link href=""><a onClick={(e) => rodalPopupHandler1(e, "fade")}>제휴문의</a></Link>
            </li>
            <li><Link href="/common/terms"><a>이용/환불약관</a></Link></li>
            <li><Link href="/common/policy"><a>개인정보처리방침</a></Link></li>    
          </ul>
        </div>
      </div>
      <div className="sec-bottom">
        <div className="inner">
          <h2 className="ft-logo"><Link href="/main"><a>하단 로고</a></Link></h2>
          <div className="copyright">
            <p><span>현대글로비스㈜ 서울특별시 강남구 테헤란로 301</span><i className="line"></i><span>사업자등록번호 : 106-81-97118</span></p>
            <p><span>COPYRIGHT (C) HYUNDAI GLOVIS CO., LTD. ALL RIGHTS RESERVED.</span></p>
          </div>
        </div>
      </div>
    </footer>

    {/* #a1 제휴문의 팝업추가 start */}
    <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} mode="normal" size="small" title="제휴문의">
      <div className="popup-inquire">
        <div className="inquire-wrap">
        {
              isCertify === false &&
              (
                <>
                  <p className="tx-tit">인증몰 입점에 관하여 궁금한 사항을 보내주시면<br />담당자 확인 후 보다 자세한 상담을 드릴 수 있도록 하겠습니다.</p>
                  <form>
                    <fieldset>
                      <legend className="away">인증몰 입점문의</legend>
                      <table summary="인증몰 입점문의에 대한 내용" className="table-tp2">
                        <caption className="away">인증몰 입점문의</caption>
                        <colgroup>
                          <col width="27.5%" />
                          <col width="72.5%" />
                        </colgroup>
                        <tbody>                          
                          <tr>
                            <th><label htmlFor="agency-name">회사명</label></th>
                            <td><Input type="text" id="agency-name" /></td>
                          </tr>
                          <tr>
                            <th><label htmlFor="user-name">담당자 성함</label></th>
                            <td><Input type="text" id="user-name" /></td>
                          </tr>
                          <tr>
                            <th><label htmlFor="user-phone">전화번호</label></th>
                            <td>
                              <span className="bridge">
                                <SelectBox id="user-phone" className="items-sbox" options={select1_list} width={119} height={48} />
                              </span>
                              <span className="bridge">
                                <Input type="text" id="user-phone2" width={119} />
                              </span>
                              <Input type="text" id="user-phone3" width={108} />
                            </td>
                          </tr>
                          <tr>
                            <th><label htmlFor="email">이메일 주소</label></th>
                            <td>
                              <span className="bridge2">
                                <Input type="text" id="email" width={168} />
                                <em className="mg8">@</em>
                                <Input type="text" id="email2" width={169} />
                              </span>
                              <span className="bridge2">
                                <SelectBox id="email3" className="items-sbox" options={select1_list} placeHolder="직접입력" width="100%" height={48} />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th><label htmlFor="partner-name">제목</label></th>
                            <td><Input type="text" id="partner-name" /></td>
                          </tr>
                          <tr>
                            <th>문의내용</th>
                            <td><Textarea countLimit={400} type="tp1" height={218} /></td>
                          </tr>
                        </tbody>
                      </table>
                    </fieldset>
                  </form>
                  <Buttons align="center" marginTop={20} className="w-line">
                    <Button size="big" background="gray" title="취소" width={180} height={60} />
                    <Button size="big" background="blue80" title="보내기" width={180} height={60} onClick={handleCertify} />
                  </Buttons>
                </>
              )
            }
            {
              isCertify === true &&
              (
                <>
                  <div className="co-wrap">
                    <p>
                      <span className="ico-wrap"><i className="ico-document"></i></span>
                      제휴 문의가<br />접수되었습니다.
                    </p>
                  </div>
                  <p className="tx-sub">* 빠른 시일안에 담당자가 연락드리겠습니다.</p>

                  <Buttons align="center" marginTop={40} className="w-line">
                    <Button size="big" background="blue80" title="확인" width={180} height={60} />
                  </Buttons>
                </>
              )
            }
          </div>   
      </div>
    </RodalPopup>
    {/* #a1 제휴문의 팝업추가 end*/}
    </>
  )
}

export default Footer