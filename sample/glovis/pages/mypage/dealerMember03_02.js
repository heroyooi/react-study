import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerMember03_02 = ({ router }) => {
  const { apply } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [isApply, setIsApply] = useState(apply === "yes" ? true : false); // 승인 상태
  const [isWithdrawal, setIsWithdrawal] = useState(false); // 탈퇴 처리
  const handleWithdrawal = useCallback((e) => {
    e.preventDefault();
    setIsWithdrawal(true);
  }, []);
  const handleClose = (e) => {
    e.preventDefault();
    setRodalShow(false);
    document.getElementsByTagName('html')[0].style.overflow="auto";
  }
  
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        
        <div className="mypage-state-sec dealer-info v-2">
          <div className="mypage-admin-title">
            <h3>딜러정보 관리</h3>
            <p className="tx-exp-tp5">&#8251; 단체회원 계정으로 등록된 차량에 한해 딜러배정(연락처 변경)을 하실 수 있습니다.</p>
            <p className="tx-exp-tp5">&#8251; 미승인 상태의 딜러, 및 종사원증 만료 상태인 딜러는 딜러 배정을 하실 수 없습니다.</p>
          </div>
          <div className="tit-wrap">
            <h4>[소속딜러] 장현대</h4>
            <Button size="mid" line="gray" radius={true} title={isApply === false ? "소속딜러 등록" : "소속딜러 탈퇴"} width={118} height={36} onClick={(e) => rodalPopupHandler(e, "fade")} />
            <p className="fr mt16">광고중인 차량 ( 7대 )</p>
          </div>
          <table summary="소속딜러 정보" className="table-tp1 th-c td-c mt8">
            <caption className="away">[소속딜러] 장현대</caption>           
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th>종사원증 번호</th>
                <td>00000000000000000 <span className="tx-blue80">[-398일]</span></td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>010-1234-5678</td>
              </tr>
            </tbody>
          </table>

          <div className="tx-list">     
            <table summary="광고중인 차량" className="table-tp1 th-c td-c">
              <caption className="away">광고중인 차량</caption>
              <colgroup>
                <col width="8%" />
                <col width="77%" />
                <col width="15%" />                
              </colgroup>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>차량명(기본정보)</th>
                  <th>가격(만원)</th>                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7</td>
                  <td className="info">
                    <Link href=""><a className="tx-blue80 t-underline">
                      기아 더 프레스티지 K7 3.0 GDI 럭셔리<br />
                      <ul>
                        <li>( 00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤 )</li>
                      </ul>
                    </a></Link>
                  </td>
                  <td>4,000</td>                  
                </tr>
                <tr>
                  <td>6</td>
                  <td className="info">
                    <Link href=""><a className="tx-blue80 t-underline">
                      기아 더 프레스티지 K7 3.0 GDI 럭셔리<br />
                      <ul>
                        <li>( 00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤 )</li>
                      </ul>
                    </a></Link>
                  </td>
                  <td>4,000</td>                  
                </tr>
                <tr>
                  <td>5</td>
                  <td className="info">
                    <Link href=""><a className="tx-blue80 t-underline">
                      기아 더 프레스티지 K7 3.0 GDI 럭셔리<br />
                      <ul>
                        <li>( 00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤 )</li>
                      </ul>
                    </a></Link>
                  </td>
                  <td>4,000</td>                  
                </tr>
                <tr>
                  <td>4</td>
                  <td className="info">
                    <Link href=""><a className="tx-blue80 t-underline">
                      기아 더 프레스티지 K7 3.0 GDI 럭셔리<br />
                      <ul>
                        <li>( 00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤 )</li>
                      </ul>
                    </a></Link>
                  </td>
                  <td>4,000</td>                  
                </tr>
              </tbody>
            </table>
            <div className="mt32">
              <PageNavigator recordCount={50} />
            </div>
          </div>

          <Buttons align="center" marginTop={48}>            
            <Button size="big" background="blue80" title="확인" width={130} height={48}/>
          </Buttons>
        </div>
      </div>
      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className='con-wrap withdrawal1'>
          {
            isApply === false
              ? isWithdrawal === false
                  ? <p>김현대 딜러님을 소속딜러로 승인하시겠습니까?</p>
                  : <p>승인이 완료되었습니다.</p>
              : isWithdrawal === false
                  ? <p>김현대 딜러님을 소속딜러에서 탈퇴처리하시겠습니까?</p>
                  : <p>처리가 완료되었습니다.</p>
          }
          <Buttons align="center" marginTop={85}>
            {isWithdrawal === false && <Button size="big" background="gray" title="취소" width={130} height={48} onClick={handleClose} />}
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={isWithdrawal === false ? handleWithdrawal : handleClose} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(DealerMember03_02);