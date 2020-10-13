import { useState, useCallback } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import Router from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list, m_mobile_number_list } from '@src/dummy';

/*
html 변경이력
03.09 : (선택) 텍스트 삭제 #a1 참고
      :  텍스트 추가 #a2 참고
*/

const GeneralMember01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const [chkPopup, setChkPopup, openChkPopup, closeChkPopup] = useRodal(false, false);
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
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
        bottom: 80,
        color: '#fff'
      }
    });

    const [isMarketing, setIsMarketing] = useState(false);
    const handleTermsChange = (e) => {
      setIsMarketing(prevMarketing => !prevMarketing);
    }
    const handleTermsView = (href) => () => {
      Router.push(href);
    }
    return (
      <AppLayout>
        <div className="content-wrap">
          <div className="mypage-admin-title mt20">            
            <p className="tx-exp-tp5">&#8251; 보다 다양한 서비스를 받으시려면 정확한 정보를 항상 유지해 주셔야 합니다.</p>
            <p className="tx-exp-tp5">&#8251; 타인의 개인정보를 도용한 피해방지 및  회원님의 개인정보보호를 위해 본인확인 과정을 실시하고 있습니다.</p>
          </div>
          <table className="table-tp2 th-none" summary="회원정보 수정 내용">
            <caption className="away">회원정보 수정</caption>            
            <tbody>              
              <tr>
                <td>
                  <p className="tx-tit">이름</p>
                  <Input type="text" id="member-id" height={40} value="김현대" disabled={true}/>  
                </td>               
              </tr>
              <tr>            
                <td>
                  <p className="tx-tit">휴대폰번호</p>
                  <span className="bridge2">
                    <MobSelectBox options={m_mobile_number_list} width='23%' disabled={true} />
                    <Input type="text" height={40} value="1234-5678" width='47.5%' disabled={true}/>
                    <Button size="mid" background="blue80" radius={true} title="변경" measure={'%'} width={24.5} />
                  </span>                  
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">이메일</p>
                  <Input type="text" height={40} value="" />                 
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">주소<em>(선택)</em></p>
                  <span className="bridge2">
                    <Input type="text" height={40} value="12345" disabled={true} id="m-post" width='73%' />
                    <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} href="/sell/freeStep01Filter01" nextLink={true} />
                  </span>
                  <span className="bridge2">
                    <Input type="text" height={40} value="서울특별시 강남구 테헤란로 301" disabled={true} id="m-address" />
                  </span>
                  <span className="bridge2">
                    <Input type="text" height={40} value="현대글로비스(주)" disabled={true} id="m-address2" />
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <ul className="check-select-list">
                    <li><CheckBox id="chk-marketing" title="마케팅 활용 동의 (선택)" size="noborder" checked={isMarketing} onChange={handleTermsChange} /><span className="term-view" onClick={handleTermsView('/mypage/termsView?seq=4')}></span></li>
                  </ul>
                </td>
              </tr>       
            </tbody>
          </table>
          <Buttons align="center"  className="full fixed">
            <Button size="big" background="blue20" color="blue80" title="취소" href="" />
            <Button size="big" background="blue80" title="변경 "  href=""/>
          </Buttons>
        </div>

      </AppLayout>
    )
  }  
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-buy-sec">
          <div className="mypage-admin-title">
            <h3>회원정보 수정</h3>
            <p className="tx-exp-tp5">&#8251; 보다 다양한 서비스를 받으시려면 정확한 정보를 항상 유지해 주셔야 합니다.</p>
            <p className="tx-exp-tp5">&#8251; 타인의 개인정보를 도용한 피해방지 및  회원님의 개인정보보호를 위해 본인확인 과정을 실시하고 있습니다.</p>
          </div>

          <table className="table-tp1 input" summary="회원정보 수정 내용">
            <caption className="away">회원정보 수정</caption>
            <colgroup>
              <col width="25%" />
              <col width="75%" />
            </colgroup>
            <tbody>
              <tr>
                <th>아이디</th>
                <td>autobleuser</td>
              </tr>
              <tr>
                <th>이름</th> {/* #a1 */}
                <td>이현대</td>
              </tr>
              <tr>
                <th>휴대폰번호</th> {/* #a1 */}
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
                <td><Input type="text" id="member-modify4" width={270} height={40} value="autobeluser@naver.com"/></td>
              </tr>
              <tr className="address">
                <th>주소<em>(선택)</em></th>
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
                <th>마케팅 활용/수신 동의</th> {/* #a2 */}
                <td>
                  <CheckBox id='chk-agree' title="마케팅활용/수신 (선택)" />
                  <div className="terms-wrap">
                    약관 전문 노출 영역
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <Buttons align="center" marginTop={49}>
            <Button size="big" background="gray" title="취소" width={180} height={52} href="/mypage/generalMain" />
            <Button size="big" background="blue80" title="확인" width={180} height={52} onClick={(e) => openChkPopup(e, "fade")}/>
          </Buttons>
        </div>
      </div>

      <RodalPopup show={chkPopup} type={'fade'} closedHandler={closeChkPopup} mode="normal" size="xs">
        <div className="con-wrap">
          <p>이현대님의 회원정보가 정상적으로 수정되었습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} height={52}/>
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default GeneralMember01