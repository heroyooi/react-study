import { useCallback } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerMember01_04 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  
  const [chkPop, setChkPop, openChkPop, closeChkPop] = useRodal(false, true);
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
        title: '비밀번호 변경',
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
        <div className="content-wrap login-contents">
          <div className="mypage-state-sec member-info-pw pw-change mt20">
            <div className="mypage-admin-title">              
              <p className="tx-exp-tp5">&#8251; 회원님의 비밀번호를 새롭게 변경하실 수 있으며, 도용방지를 위해 주기적인 변경을 권장합니다.</p>
            </div>

            <div className="member-pw-wrap">
              <div className="member-pw change">
                <label htmlFor="m-member-pw1">현재 비밀번호</label>
                <Input type="password" id="m-member-pw1" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" height={40} />
                <label htmlFor="m-member-pw2">새 비밀번호</label>
                <Input type="password" id="m-member-pw2" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" height={40} />
                <label htmlFor="m-member-pw3">새 비밀번호 확인</label>
                <Input type="password" id="m-member-pw3" placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내" height={40} />                
              </div>
            </div>

            <div className="tx-wrap">
              <p className="tit">[안내]</p>
              <dl className="con">
                <dd>비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.</dd>
                <dd>아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.</dd>
                <dd>연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가  (ex. 123kbcha, aaa, 111 등)</dd>
                <dd>타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.</dd>
              </dl>              
            </div>
            <Button size="big" className="fixed" size="full" background="blue80" title="변경" onClick={(e) => openMpop(e, "fade")} />
          </div>
        </div>

        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1"></p>            
            <p>비밀번호가 변경되었습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeMpop} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        
        <div className="mypage-state-sec member-info-pw pw-change">
          <div className="mypage-admin-title">
            <h3>비밀번호 변경</h3>
            <p className="tx-exp-tp5">&#8251; 회원님의 비밀번호를 새롭게 변경하실 수 있으며, 도용방지를 위해 주기적인 변경을 권장합니다.</p>
          </div>

          <div className="member-pw-wrap">
            <div className="member-pw change">
              <Input type="text" id="member-pw1" placeHolder="현재 비밀번호" width={270} height={48} />
              <Input type="text" id="member-pw2" placeHolder="새 비밀번호" width={270} height={48} />
              <Input type="text" id="member-pw3" placeHolder="새 비밀번호 확인" width={270} height={48} />
            </div>
          </div>

          <div className="essential-point">
            <ul>
              <li>안내</li>
              <li><i className="ico-dot mid"></i> 비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요</li>
              <li><i className="ico-dot mid"></i> 아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.</li>
              <li><i className="ico-dot mid"></i> 연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가  (ex. 123kbcha, aaa, 111 등)</li>
              <li><i className="ico-dot mid"></i> 타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.</li>
            </ul>
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="변경하기" width={245} height={48} onClick={(e) => openChkPop(e, "fade")}/>
          </Buttons>
        </div>
      </div>

      <RodalPopup show={chkPop} type={'fade'} closedHandler={closeChkPop} mode="normal" size="xs">
        <div className="con-wrap">
          <p>비밀번호가 변경되었습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerMember01_04