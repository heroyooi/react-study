import { useCallback } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Textarea from '@lib/share/items/Textarea';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
/*
  html 변경이력
  03.12 : 탈퇴취소 버튼  <==> 탈퇴하기 버튼과 위치변경
  03.17 : 법인 ID로 귀속되며 -> 대표자 딜러계정으로 변경되며 문구변경
           #a1 참고
        : 문구 수정 및 추가 #a2 참고   

*/

const leaveLastMemberMod = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);

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

  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원탈퇴',
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
    return (  
      <AppLayout>
        <div className="content-wrap pd0">      
          <div className="mypage-state-sec member-info-pw withdrawal">
            <div className="mypage-admin-title v-2 bg-gray20 pd20">              
              <p className="b-tit">그동안 현대 글로비스 오토벨을 이용해주신<br />고객님께 감사드립니다.</p>
              <p className="s-tit mt8">탈퇴 사유를 알려주시면<br /> 더 나은 서비스를 만들기 위해 최선을 다하겠습니다.</p>
            </div>

            <div className="withdrawal-reason pdside20 mt24">
              <p>탈퇴 사유 선택<span>(중복 선택 가능)</span></p>
              <ul className="mt8">
                <li><CheckBox id='chk-withdrawal1' title='서비스 기능 불만족' /></li>
                <li><CheckBox id='chk-withdrawal2' title='서비스 정책 불만족' /></li>
                <li><CheckBox id='chk-withdrawal3' title='개인정보 및 보안우려' /></li>
                <li><CheckBox id='chk-withdrawal4' title='고객 응대에 대한 불만족' /></li>
                <li><CheckBox id='chk-withdrawal5' title='타사 서비스 이용' /></li>
                <li><CheckBox id='chk-withdrawal6' title='이용 빈도 낮음' /></li>
              </ul>
              <p className="mt24">기타사유</p>
              <div className="mt8">
                <Textarea height={133} countLimit={200} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} placeHolder="기타 의견을 자유롭게 작성해주세요." />
              </div>              
            </div>

            <MobBottomArea isFix={true} isSimple={true}>
              <Buttons align="center" className="full">
                <Button size="big" background="blue20" color="blue80" title="취소" height={56} href="/mypage/dealerMember01_01" nextLink={true} />
                <Button size="big" background="blue80" title="탈퇴" height={56}  onClick={(e) => openMpop(e, "fade")} />
              </Buttons>
            </MobBottomArea> 
          </div>
        </div>

        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1"></p>            
            <p>정말 탈퇴하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
            </Buttons>
          </div>
          {/*<div className="con-wrap">
            <p className="tit1"></p>            
            <p>탈퇴되었습니다. 감사합니다.</p>
            <Buttons align="right" marginTop={24}>              
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
            </Buttons>
          </div>
          <div className="con-wrap">
            <p className="tit1"></p>            
            <p>탈퇴신청이 접수되었습니다.<br />관리자 확인 후 탈퇴처리가 진행됩니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
            </Buttons>
          </div>
          <div className="con-wrap">
            <p className="tit1"></p>            
            <p>이용중인 서비스가 있어 관리자의 확인 이후<br />탈퇴가 가능합니다.<br />계속 진행하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>              
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
            </Buttons>
          </div>*/}
        </RodalPopup>
      </AppLayout>    
    )
  }
  return (  
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec member-info-pw withdrawal">
          <div className="mypage-admin-title">
            <h3>회원탈퇴</h3>
            <p className="tx-exp-tp5">그동안 현대 글로비스 오토벨을 이용해주신 고객님께 감사드립니다.</p>
            <p className="tx-exp-tp5">탈퇴 사유를 알려주시면 더 나은 서비스를 만들기 위해 최선을 다하겠습니다.</p>
          </div>

          <div className="withdrawal-reason">
            <p>탈퇴 사유 선택<br />(중복 선택 가능)</p>
            <ul>
              <li><CheckBox id='chk-withdrawal1' title='서비스 기능 불만족' /></li>
              <li><CheckBox id='chk-withdrawal2' title='서비스 정책 불만족' /></li>
              <li><CheckBox id='chk-withdrawal3' title='개인정보 및 보안우려' /></li>
              <li><CheckBox id='chk-withdrawal4' title='고객 응대에 대한 불만족' /></li>
              <li><CheckBox id='chk-withdrawal5' title='타사 서비스 이용' /></li>
              <li><CheckBox id='chk-withdrawal6' title='이용 빈도 낮음' /></li>
            </ul>
            <Textarea height={219} countLimit={200} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} placeHolder="기타 의견을 자유롭게 작성해주세요." />
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="탈퇴취소" width={127} height={48} href="/mypage/dealerSell01" />
            <Button size="big" background="blue80" title="탈퇴하기" width={127} height={48} onClick={(e) => rodalPopupHandler(e, "fade")} />
          </Buttons>
        </div>
      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className='con-wrap'>
          <p>정말 탈퇴하시겠습니까?</p>
          <Buttons align="center" marginTop={85}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={(e) => rodalPopupHandler2(e, "fade")}/>
          </Buttons>
        </div>

        {/* <div className="con-wrap">
            <p>탈퇴되었습니다.<br />감사합니다.</p>
            <Buttons align="center" marginTop={60}>
              <Button size="big" background="blue80" title="확인" width={245} height={48}/>
            </Buttons>
          </div>

          <div className="con-wrap">
            <p>고객님은 탈퇴가 불가능한 상태입니다.<br />고객센터로 문의해주세요.</p>
            <Buttons align="center" marginTop={60}>
              <Button size="big" background="blue80" title="확인" width={245} height={48}/>
            </Buttons>
          </div> */}
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="이용중인 서비스" mode="normal" size="small">
        <div className='con-wrap popup-use-service'>
          <p className="service-tit">고객님의 서비스 이용 현황입니다.</p>

          <p className="name">경매회원</p>
          <div className="cont">
            <p><i className="ico-dot mid"></i>오토벨을 탈퇴하시더라도 경매장은 계속 이용하실 수 있습니다.</p>
            <p><i className="ico-dot mid"></i>경매회원 탈퇴는 경매장에 문의해주세요.</p>
          </div>

          <p className="name">경매낙찰 차량 보내기</p>
          <div className="cont">
            <p><i className="ico-dot mid"></i>광고대기 상태의 경매장 낙찰 차량은 발송자의 경우 대표자 딜러계정으로 변경되며, 수신인의 경우 발송자의 ID로 귀속됩니다.</p>{/* #a1 문구변경 */}
          </div>
          

          <p className="name">이용중인 광고상품</p>
          <div className="cont">
            <p>
              <i className="ico-dot mid"></i>환불 정책에 의거하여 환불가능 상품에 한해 환불처리를 진행합니다. 자세한 사항은 환불정책을 확인하여 주시기 바랍니다.
              <Button size="sml" line="gray" radius={true} title="환불정책 자세히보기" width={120} height={24} />
            </p>
          </div>

          <p className="name">포인트</p>
          <div className="cont">
            <p><i className="ico-dot mid"></i>보유 포인트는 <span className="tx-blue80">3,000</span> P 이며, 회원탈퇴 시 보유 포인트는 소멸됩니다.</p>
          </div>

          <p className="name">셀프평가 진행 및 수수료 안내</p> {/* #a2 문구 수정 */}
          <div className="cont">
             <p><i className="ico-dot mid"></i>고객과 셀프평가 거래가 진행 중입니다. 완료 후 탈퇴가 가능합니다.</p> {/* #a2 문구 추가 */}
            <p><i className="ico-dot mid"></i>셀프평가 미정산 수수료는 <span className="tx-blue80">100,000</span> 원 이며, 납부 이후 탈퇴처리가 완료됩니다.</p>
          </div>

          <p className="ex">
            회원 탈퇴 시<span className="tx-red80"> 30일 이내 재가입 불가</span>하며, 이용내역은 일정기간 보관 이후 삭제됩니다.<br />
            <Button size="sml" line="gray" radius={true} title="개인정보처리방침 자세히보기" width={175} height={24} /><br />
            본인 인증 후 탈퇴신청이 완료되며,<span className="tx-blue80"> 관리자 확인 후 탈퇴처리가 완료</span>됩니다.
          </p>

          <p className="next">계속 진행하시겠습니까?</p>

          <Buttons align="center" marginTop={32}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="확인" width={130} height={48} />
          </Buttons>
        </div>
        
        {/* <div className='con-wrap popup-use-service'>
          <p className="service-tit">고객님의 서비스 이용 현황입니다.</p>

          <p className="name">경매회원</p>
          <div className="cont">
            진행 중인 내차팔기 신청내역이 있습니다.<br />
            신청 완료 혹은 취소 이후 탈퇴하실 수 있습니다.
          </div>

          <p className="name">경매낙찰 차량 보내기</p>
          <div className="cont">
            진행 중인 홈서비스 신청내역이 있습니다<br />
            신청 완료 혹은 취소 이후 탈퇴하실 수 있습니다.
          </div>

          <p className="name">이용중인 광고상품</p>
          <div className="cont">
            고객님께서는 BW상품을 이용하고 계십니다.<br />
            BW 보증기간 동안에는 탈퇴하실 수 없습니다.
          </div>

          <Buttons align="center" marginTop={32}>
            <Button size="big" background="blue80" title="확인" width={130} height={48} />
          </Buttons>
        </div> */}

      </RodalPopup>
    </AppLayout>    
  ) 
}

export default leaveLastMemberMod