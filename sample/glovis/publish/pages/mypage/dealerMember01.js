import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout'
import MypageNavi from '@src/components/common/MypageNavi'
import BidderInfo from '@src/components/common/popup/BidderInfo'
import Buttons from '@lib/share/items/Buttons'
import Button from '@lib/share/items/Button'
import TabMenu from '@lib/share/tab/TabMenu'
import TabCont from '@lib/share/tab/TabCont'
import StarScore from '@lib/share/items/StarScore';
import Input from '@lib/share/items/Input'
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup'
import useRodal from '@lib/share/custom/useRodal'
import Textarea from '@lib/share/items/Textarea'
import { textDummy } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import Link from 'next/link';

// 풀페이지 팝업 관련 컴포넌트 및 액션 타입명
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobCarInfoModify from '@src/components/common/MobCarInfoModify';
import MobFilterModel from '@src/components/common/MobFilterModel';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
/*
  html 변경이력
  03.12 : #a1 케이스 분기처리
 
*/

const DealerMember01 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const { member, seq, popup, fs_popup } = router.query;
  const [memberType ,setMemberType] = useState(member === "organization" ? "organization" : "private"); //  private(개인딜러 회원), organization(단체, 제휴 회원)

  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
  const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false);
  const [rodalShow4, setRodalShow4, rodalPopupHandler4, modalCloseHandler4] = useRodal(false);
  const [rodalShow5, setRodalShow5, rodalPopupHandler5, modalCloseHandler5] = useRodal(false);
  const [bidderInfoShow, setBiddersInfoShow, bidderInfoPopupHandler, bidderInfoCloseHandler] = useRodal(false);
  
  // Textarea
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

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [InfoMode, setInfoMode] = useState("info")
  const handleInfoMode = useCallback((mode) => () => {
    setInfoMode(mode);
  }, []);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원정보/소개관리',
        options: ['back','gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#ffffff'
      }
    });
    const [dimm1, setDimm1] = useState(Boolean(popup) === true ? true : false);
    const [active1, setActive1] = useState(Boolean(popup) === true ? true : false);
    const handleOpenCorrect = useCallback((e) => {
      e.preventDefault();
      setActive1(true);
      setDimm1(true);
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, []);    
    const handleCloseDimm1 = useCallback((e) => {
      e.preventDefault();
      setActive1(false);
      setDimm1(false);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, []);    
    
    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    const [fpBusinessApply, setFpBusinessApply] = useState(false);
    const [fpManageBusinessApply, setFpManageBusinessApply] = useState(false);
    const handleFullpagePopup = useCallback(name => e => {
      e.preventDefault();
      if (name === "mpop1") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '사업자 등록증',
            options: ['back', 'close'],
          }
        });
        setFpBusinessApply(true);
        setFpManageBusinessApply(false);
      } else if (name === "mpop2") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '관리 사업자 등록증',
            options: ['back', 'close'],
          }
        });
        setFpManageBusinessApply(true);
        setFpBusinessApply(false);
      }
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, []);
    
    useEffect(() => {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '사업자 등록증',
          options: ['back', 'close'],
        }
      });
      setFpBusinessApply(true);
      setFpManageBusinessApply(false);
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, [+fs_popup === 1]);

    useEffect(() => {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '관리 사업자 등록증',
          options: ['back', 'close'],
        }
      });
      setFpManageBusinessApply(true);
      setFpBusinessApply(false);
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, [+fs_popup === 2]);
    
    const closeFullpagePopup = useCallback((e) => {
      e.preventDefault();
      setFpBusinessApply(false);
      setFpManageBusinessApply(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE,
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, [])
    // 풀페이지 팝업 END

    const [isTab, setIsTab] = useState(+seq === 2 ? 1 : 0);

    return (
      <AppLayout>
        <div className="content-wrap seller-wrap">
          {
            memberType === "private" && (
              <>
                <div className="profile">
                  <div className="img-wrap">
                    <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />
                  </div>
                  <div className="tx-wrap v-2">              
                    <h2>김현대</h2>
                    <p>010-1234-1234</p>
                    <ul className="employee-card">
                      <li>00000단지 00000상사</li>
                      <li>종사원증번호: A1240B56<span className="d-day tx-blue80">(D-300)</span></li>
                    </ul>
                    <Buttons className="tx-btn-wrap mt16">
                      <Button size="sml" line="gray" title="회원정보 수정" width={74} height={24} fontSize={10} radius={true} href="/mypage/dealerMember01_01" />
                      <Button size="sml" line="gray" title="비밀번호 변경" width={74} height={24} fontSize={10} radius={true} href="/mypage/dealerMember01_04" />
                    </Buttons>
                  </div>
                </div>
                <ul>
                  <li>판매중<span>21</span></li>
                  <li>판매완료<span>35</span></li>
                </ul>
              </>
            )
          }
          {
            memberType === "organization" && (
              <>
                <div className="profile">
                  <div className="img-wrap">
                    <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />
                  </div>
                  <div className="tx-wrap v-2">              
                    <h2>현대 글로비스 경인직영점</h2>
                    <p>010-1234-1234</p>
                    <ul className="employee-card">
                      <li>00000단지 00000상사</li>                    
                    </ul>
                    <Buttons className="tx-btn-wrap mt16">
                      <Button size="sml" line="gray" title="회원정보 수정" width={74} height={24} fontSize={10} radius={true} href="/mypage/dealerMember01_01" />
                      <Button size="sml" line="gray" title="비밀번호 변경" width={74} height={24} fontSize={10} radius={true} href="/mypage/dealerMember01_04" />
                    </Buttons>
                  </div>
                </div>
                <ul>
                  <li>판매중<span>21</span></li>
                  <li>판매완료<span>35</span></li>
                </ul>
              </>
            )
          }
         
        </div>
        <TabMenu type="type2 big" className="mt8" defaultTab={isTab}>
          <TabCont tabTitle="판매점 정보" id="tab7-1" index={0} onClick={handleInfoMode("info")}> 
          { 
            memberType === "organization" && (
              <>       
              <Buttons align="right" className="mb16">
                <Button size="sml" line="gray" title="사업자등록증" width={74} height={24} fontSize={10} radius={true} onClick={handleFullpagePopup("mpop1")} />
                <Button size="sml" line="gray" title="관리사업자등록증" width={90} height={24} fontSize={10} radius={true} onClick={handleFullpagePopup("mpop2")} />
              </Buttons>
              </> 
            )
          }
            <table summary="판매자 정보에 대한 내용" className="table-tp1">
              <caption className="away">판매자 정보</caption>
              <colgroup>
                <col width="35%" />
                <col width="65%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>소속상사명</th>
                  <td>현대 글로비스 경인직영점</td>
                </tr>
                <tr>
                  <th>대표자명</th>
                  <td>김현대</td>
                </tr>
                <tr>
                  <th>소속단지</th>
                  <td>선택정보 노출영역</td>
                </tr>
                <tr>
                  <th>사업자등록번호</th>
                  <td>입력정보 노출영역</td>
                </tr>
                <tr>
                  <th>판매점 주소</th>
                  <td><span className="tx-blue80 t-underline"><Link href="#"><a>서울특별시 서초구 신반포로 311</a></Link></span></td>
                </tr>
                <tr>
                  <th>판매점 연락처</th>
                  <td>050-0000-0000</td>
                </tr>
                <tr>
                  <th>팩스</th>
                  <td>050-0000-0000</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td>월~토요일 : 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)<br />일요일/공휴일 휴무</td>
                </tr>                    
              </tbody>
            </table>                                
          </TabCont>
          <TabCont tabTitle="셀프평가 이용현황" id="tab7-2" index={1} onClick={handleInfoMode("self")}>
            <Buttons align="right" className="mb16">
              <Button size="sml" line="gray" title="주요정보/소개글 수정" width={105} height={24} fontSize={10} radius={true} onClick={handleOpenCorrect} />              
            </Buttons>
            <table summary="셀프평가 이용현황에 관한 내용" className="table-tp1">
              <caption className="away">셀프평가 이용현황</caption>
              <colgroup>
                <col width="35%" />
                <col width="65%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2">평점</th>
                </tr>
                <tr>
                  <td colSpan="2">
                    <ul className="star-wrap">
                      <li><span className="start-group"><StarScore grade={4.2} /></span><span className="score-txt">4.2</span></li>
                    </ul>                    
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">셀프평가 이용현황</th>  
                </tr>
                <tr>
                  <td colSpan="2">
                    <dl className="tx-left-group">
                      <dd>입찰: 200</dd>
                      <dd>성사: 180</dd>
                      <dd>성사율: 90%</dd>
                    </dl>
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">만족도</th>
                </tr>
                <tr>
                  <td colSpan="2">
                    <ul className="star-wrap">
                      <li><span className="score-tit">가격</span><span className="start-group"><StarScore grade={4.5} /></span><span className="score-txt">4.5</span></li>
                      <li><span className="score-tit">서비스</span><span className="start-group"><StarScore grade={2.5} /></span><span className="score-txt">2.5</span></li>
                      <li><span className="score-tit">추천여부</span><span className="start-group"><StarScore grade={4.2} /></span><span className="score-txt">4.2</span></li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>주요정보</th>
                  <td>#수입전문 #BMW시리즈 #최고가</td>
                </tr>
                <tr>
                  <th>자기소개</th>
                  <td>안녕하세요 김현대 입니다. 안녕하세요 김현대 입니다. 안녕하세요 김현대 입니다. 안녕하세요 김현대 입니다. 안녕하세요 김현대 입니다. 안녕하세요 김현대 입니다.</td>
                </tr>                     
              </tbody>
            </table>                            
          </TabCont>
        </TabMenu>

        <div className={dimm1 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm1}></div>
        <MobBottomArea active={active1}>
          <div className="inner correct">
            <h3 className="tit1 mb12">주요정보/소개글 수정</h3>
            <table summary="주요정보/소개글 수정" className="table-tp2 th-none">
              <caption className="away">주요정보/소개글 수정</caption>
              <tbody>
                <tr>
                  <td>
                    <p className="tx-tit">주요정보</p>                    
                    <Textarea countLimit={50} type="tp1" height={96} placeHolder="주요정보를 입력하세요." />
                    <p className="tx-tp3 mt8">예시) #수입전문 #BMW #5시리즈 #최고가</p> 
                  </td>
                </tr>            
                <tr>
                  <td>
                    <p className="tx-tit">소개글</p>
                    <Textarea countLimit={500} type="tp1" height={133} data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />                    
                  </td>
                </tr>
              </tbody>
            </table>           
          </div>          
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" height={56} onClick={handleCloseDimm1} />
            <Button size="big" background="blue80" title="수정완료" height={56} />
          </Buttons>           
        </MobBottomArea>
        
        <MobFullpagePopup active={mFullpagePopup}>
          {fpBusinessApply && (
            <div className="img-wrap v-2 pd20">
              <img src="/images/dummy/business-license.jpg" alt="사업자등록증 이미지" />
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFullpagePopup} />
            </div>
          )}
          {fpManageBusinessApply && (
            <div className="img-wrap v-2 pd20">
              <img src="/images/dummy/business-license.jpg" alt="관리사업자등록증 이미지" />
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFullpagePopup} />
            </div>
          )}
        </MobFullpagePopup>        
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec member-info">
          <div className="mypage-admin-title">
            <h3>회원정보/소개 관리</h3>
          </div>
          
          <Buttons align="right">
            <Button size="big" background="blue80" title="회원정보 수정" width={170} height={48} href="/mypage/dealerMember01_01" />
            <Button size="big" background="blue80" title="비밀번호 변경" width={170} height={48} href="/mypage/dealerMember01_04" />
          </Buttons>
          
          <div className={memberType === "private" ? "basic-info-wrap" : "basic-info-wrap"}>
            <h4>기본정보</h4>
            <div className="img-wrap">
              <img src="/images/dummy/review-img.png" alt="프로필 사진"/>
            </div>
            {
              memberType === "private" && (
                <table className="table-tp1 th-c td-c info-top" summary="회원 기본정보 내용">
                  <caption className="away">기본정보</caption>
                  <colgroup>
                    <col width="25%" />
                    <col width="25%" />
                    <col width="25%" />
                    <col width="25%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>판매자</th>
                      <td colSpan="3">장현대</td>
                    </tr>
                    <tr>
                      <th>종사원증 번호</th>
                      <td colSpan="3">000000 <span className="tx-blue80">[-98일]</span></td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td colSpan="3">010-1234-5678</td>
                    </tr>
                    <tr>
                      <th>판매중 차량</th>
                      <td>21</td>
                      <th>판매완료 차량</th>
                      <td>35</td>
                    </tr>
                  </tbody>
                </table>
              )
            }
            {
              memberType === "organization" && (
                <>
                  <table className="table-tp1 th-c td-c info-top" summary="회원 기본정보 내용">
                    <caption className="away">기본정보</caption>
                    <colgroup>
                      <col width="25%" />
                      <col width="25%" />
                      <col width="25%" />
                      <col width="25%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>소속상사명/대표자명</th>
                        <td colSpan="3">현대 글로비스 경인직영점/김현대</td>
                      </tr>
                      <tr>
                        <th>사업자 등록번호</th>
                        <td colSpan="3">0000000000000000</td>
                      </tr>
                      <tr>
                        <th>사업자주소</th>
                        <td colSpan="3">서울특별시 서초구 신반포동 311</td>
                      </tr>
                      <tr>
                        <th>판매중 차량</th>
                        <td>21</td>
                        <th>판매완료 차량</th>
                        <td>35</td>
                      </tr>
                    </tbody>
                  </table>
                  <Buttons marginTop={20}>              
                    <span className="step-btn-r">
                      <Button size="big" background="gray" title="사업자등록증 이미지" width={220} height={48} onClick={(e) => rodalPopupHandler3(e, "fade")} />
                      <Button size="big" background="gray" title="관리사업자등록증 이미지" width={220} height={48} onClick={(e) => rodalPopupHandler4(e, "fade")} />
                    </span>
                  </Buttons> 
                </>
              )
            }
            <table className={memberType === "private" ? "table-tp1 th-c td-c info-bottom" : "table-tp1 th-c td-c info-bottom mt32"} summary="회원 기본정보 내용">
              <caption className="away">기본정보</caption>
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                {/* #a1 start*/}
                {memberType === "private" &&
                <>
                <tr>
                  <th>소속상사명 / 대표자명</th>
                  <td>현대 글로비스 경인직영점 / 김현대</td>
                </tr>
                <tr>
                  <th>소속단지</th>
                  <td>선택정보 노출영역</td>
                </tr>
                <tr>
                  <th>사업자 등록번호</th>
                  <td>입력정보 노출영역</td>
                </tr>
                </>
                }
                {/* #a1 end */}
                <tr>
                  <th>판매점 주소</th>
                  <td><span className="tx-blue80 t-underline"><Link href="#"><a>서울특별시 서초구 신반포로 311</a></Link></span></td>
                </tr>
                <tr>
                  <th>판매점 연락처</th>
                  <td>050-0000-000</td>
                </tr>
                <tr>
                  <th>팩스</th>
                  <td>050-0000-000</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td className="pd15">
                    월~토요일 09:00 ~ 18:00<br />
                    일요일/공휴일 휴무<br />
                    (점심시간 12:00 ~ 13:00)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <table className="table-tp1 th-c td-c" summary="셀프평가 이용현황에 관한 내용">
            <caption>셀프평가 이용현황</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <tbody>
              <tr>
                <th>평점</th>
                <td colSpan="3"><StarScore grade={4.2} /> <span>(4.6/5.0)</span></td>
              </tr>
              <tr>
                <th>입찰</th>
                <td>200대</td>
                <th>성사</th>
                <td>180대</td>
              </tr>
              <tr>
                <th>성사율</th>
                <td colSpan="3">성 90%</td>                
              </tr>
              <tr>
                <th rowSpan="3">만족도</th>
                <th>가격만족</th>
                <td colSpan="2">70% (100%)</td>
              </tr>
              <tr>
                <th>서비스</th>
                <td colSpan="2">70% (100%)</td>
              </tr>
              <tr>
                <th>추천여부</th>
                <td colSpan="2">70% (100%)</td>
              </tr>
              <tr>
                <th>주력정보<br /><Button size="sml" background="blue80" title="수정" width={67} height={24} onClick={(e) => rodalPopupHandler1(e, "fade")} /></th>
                <td colSpan="3">#수입전문 #BMW #5시리즈 #최고가</td>
              </tr>
              <tr>
                <th>자기소개<br /><Button size="sml" background="blue80" title="수정" width={67} height={24} onClick={(e) => rodalPopupHandler2(e, "fade")} /></th>
                <td colSpan="3" className="pd15">안녕하세요. 김현대입니다 안녕하세요. 김현대입니다 안녕하세요. 김현대입니다 안녕하세요. 김현대입니다 안녕하세요. 김현대입니다 안녕하세요. 김현대입니다 </td>
              </tr>
            </tbody>
          </table>
          <Buttons align="right" marginTop={48}>
            <Button size="big" background="blue80" title="내 입찰자 정보 페이지 보기" width={255} height={48} onClick={(e) => bidderInfoPopupHandler(e, "fade")}/>
            <Button size="big" background="gray" title="회원탈퇴" width={183} height={48} onClick={(e) => rodalPopupHandler5(e, "fade")}/>
          </Buttons>
        </div>
      </div>

      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} mode="normal" size="medium" title="주력정보 수정">
        <div className="con-wrap popup-member-info">
          <Input type="text" placeHolder="주력정보를 입력하세요" width='100%' />
          <p>예시) #수입전문 #BMW #5시리즈 #최고가</p>
          <Buttons align="center" marginTop={85}>
            <Button size="big" background="gray" title="취소" width={130} height={48}/>
            <Button size="big" background="blue80" title="수정완료" width={130} height={48}/>
          </Buttons>
        </div>
      </RodalPopup>
      
      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} mode="normal" size="medium" title="소개글 수정">
        <div className="con-wrap popup-member-info">
          <Textarea countLimit={500} type="tp1" data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus}/>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} height={48}/>
            <Button size="big" background="blue80" title="수정완료" width={130} height={48}/>
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={bidderInfoShow} type={'fade'} closedHandler={bidderInfoCloseHandler} mode="normal" title="입찰자 정보" width={1200}>
        <BidderInfo/>
      </RodalPopup>

      <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} title="사업자등록증 이미지" mode="normal" width={960}>
        <div className="con-wrap">
          <div className="img-wrap v-2">
            <img src="/images/dummy/business-license.jpg" alt="사업자등록증 이미지" />
          </div>
          <Buttons align="center" marginTop={20}>
            <Button size="mid" background="blue80" title="확인" width={245} height={48} />
          </Buttons>
        </div>
      </RodalPopup>
      
      <RodalPopup show={rodalShow4} type={'fade'} closedHandler={modalCloseHandler4} title="관리사업자등록증 이미지"  mode="normal" width={960}>
        <div className="con-wrap">
          <div className="img-wrap v-2">
            <img src="/images/dummy/business-license.jpg" alt="사업자등록증 이미지" />
          </div>
          <Buttons align="center" marginTop={20}>
            <Button size="mid" background="blue80" title="확인" width={245} height={48} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow5} type={'fade'} closedHandler={modalCloseHandler5}  mode="normal" size="xs">
        <div className="con-wrap">
          <p>회원탈퇴를 원하시면<br />고객센터 1234-1234로 문의주세요.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="mid" background="blue80" title="확인" width={245} height={48} href="/mypage/dealerMember01_06" />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(DealerMember01)