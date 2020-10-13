import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox'
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';
import { select_time_list } from '@src/dummy'

const DealerMember04 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const [isDelete, setIsDelete] = useState(false);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);

  const handleDelete = useCallback((e) => {
    e.preventDefault();
    setIsDelete(true);
  }, []);
  const handleClosePop1 = useCallback((e) => {
    e.preventDefault();
    setRodalShow1(false);
  }, []);
  const handleClosePop2 = useCallback((e) => {
    e.preventDefault();
    setRodalShow2(false);
  }, []);

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-info">
          <div className="mypage-admin-title">
            <h3>지점 관리</h3>            
          </div>
          <div className="tx-list">
            <p className="inquire-num">총 3곳</p>
            <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
              <caption className="away">딜러정보 관리</caption>
              <colgroup>
                <col width="6%" />
                <col width="8%" />
                <col width="15%" />
                <col width="*" />
                <col width="18%" />
                <col width="20%" />
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th>NO.</th>
                  <th>이름</th>
                  <th>주소</th>
                  <th>전화번호</th>
                  <th>영업시간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><CheckBox id='chk-list02-01' /></td>
                  <td>1</td>
                  <td><Link href=""><a>가양<br />(도이치모터스)</a></Link></td>
                  <td className="tx-l">서울 강서구 양촌로53길 30, 서서울모터리움 1층</td>
                  <td>1644-3883</td>
                  <td>평&nbsp;&nbsp;&nbsp;&nbsp;일 : 09:00 ~ 19:00<br/>토요일 : 09:00 ~ 17:00<br/>일요일 : 09:00 ~ 19:00</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-list02-02' /></td>
                  <td>2</td>
                  <td><Link href=""><a>광주<br />(코오롱)</a></Link></td>
                  <td className="tx-l">광주 서구 매월1로62번길 16, 빛고을 오토갤러리 1층</td>
                  <td>1644-3883</td>
                  <td>평&nbsp;&nbsp;&nbsp;&nbsp;일 : 09:00 ~ 19:00<br/>토요일 : 09:00 ~ 17:00<br/>일요일 : 09:00 ~ 19:00</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-list02-03' /></td>
                  <td>3</td>
                  <td><Link href=""><a>가양<br />(도이치모터스)</a></Link></td>
                  <td className="tx-l">서울 강서구 양촌로53길 30, 서서울모터리움 1층</td>
                  <td>1644-3883</td>
                  <td>평&nbsp;&nbsp;&nbsp;&nbsp;일 : 09:00 ~ 19:00<br/>토요일 : 09:00 ~ 17:00<br/>일요일 : 09:00 ~ 19:00</td>
                </tr>
              </tbody>
            </table>            
          </div>
          <Buttons align="right" marginTop={26}>
            <Button size="big" background="blue80" title="수정" width={130} height={48} onClick={(e) => rodalPopupHandler2(e, "fade")}  />
            <Button size="big" background="gray" title="삭제" width={130} height={48} onClick={(e) => rodalPopupHandler1(e, "fade")}  />
            <Button size="big" background="blue80" title="+딜러등록" width={130} height={48} onClick={(e) => rodalPopupHandler2(e, "fade")}  />
          </Buttons>

          <PageNavigator recordCount={50} className="mt32" />
        </div>
      </div>

      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} mode="normal" size="xs" >
        <div className="con-wrap">
          {
            isDelete === false
              ? (
                <>
                  <p>정말 삭제하시겠습니까?</p>
                  <Buttons align="center" marginTop={85}>
                    <Button size="big" background="gray" title="취소" width={130} onClick={handleClosePop1} />
                    <Button size="big" background="blue80" title="확인" width={130} onClick={handleDelete} />
                  </Buttons>
                </>      
              ) : (
                <>
                  <p>삭제되었습니다.</p>
                  <Buttons align="center" marginTop={85}>
                    <Button size="big" background="blue80" title="확인" width={245} onClick={handleClosePop1} />
                  </Buttons>
                </>
              )
          }
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} mode="normal" size="medium" title="지점등록">
        <div className="con-wrap popup-dealer-info">
          <ul>
            <li className="tit">이름</li>
            <li><Input type="text" id="name" value="지점명을 입력하세요" width={384} height={48} /></li>
            <li className="tit">전화번호</li>            
            <li>
              <Input type="text" id="phone1" width={115} height={48} />
              <em className="mg8">-</em>
              <Input type="text" id="phone2" width={115} height={48} />
              <em className="mg8">-</em>
              <Input type="text" id="phone3" width={115} height={48} />
            </li>
            <li className="tit">주소</li>
            <li>
              <span className="bridge">
                <Input type="text" placeHolder="주소를 검색하세요" disabled={false} id="consign-address-number" width={254} />
              </span>
              <Button size="mid" background="gray" title="주소검색" width={123} height={48} marginLeft={8} />
            </li>            
            <li className="tit">영업시간</li>
            <li>
              <div className="office-hours">
                <span className="hours-box">
                  <span className="tit">평일</span>
                  <SelectBox id="h-number1" className="items-sbox" options={select_time_list} placeHolder="09:00" width={110} height={48} />
                  <em className="mg8">~</em>
                  <SelectBox id="h-number2" className="items-sbox" options={select_time_list} placeHolder="09:00" width={110} height={48} />                
                </span>             
                <span className="hours-box mt8">
                  <span className="tit">토요일</span>
                  <SelectBox id="h-number3" className="items-sbox" options={select_time_list} placeHolder="09:00" width={110} height={48} />
                  <em className="mg8">~</em>
                  <SelectBox id="h-number4" className="items-sbox" options={select_time_list} placeHolder="09:00" width={110} height={48} />                
                </span>
                <span className="hours-box mt8">
                  <span className="tit">일요일</span>
                  <SelectBox id="h-number5" className="items-sbox" options={select_time_list} placeHolder="09:00" width={110} height={48} />
                  <em className="mg8">~</em>
                  <SelectBox id="h-number6" className="items-sbox" options={select_time_list} placeHolder="09:00" width={110} height={48} />                
                </span>
              </div>
            </li>
          </ul>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={handleClosePop2} />
            <Button size="big" background="blue80" title="등록완료" width={130} height={48}/>
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerMember04;
