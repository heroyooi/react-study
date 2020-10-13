import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select_time_list } from '@src/dummy'

const DealerMember03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const [isDelete, setIsDelete] = useState(false);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);
  const hasMobile = useSelector((state) => state.common.hasMobile);

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


if (hasMobile) {
  dispatch({
    type: MOBILE_HEADER_TYPE_SUB,
    data: {
      title: '딜러정보 관리',
      options: ['back', 'search', 'gnb']
    }
  });
  dispatch({
    type: MOBILE_CONTENT_STYLE,
    data: {
      bottom: 24,
      color: '#fff'
    }
  });

  return (
    <AppLayout>
      <div className="inner pd20">        
        <h3 className="tit2">소속딜러</h3>
        
       <div className="info-list-wrap">
          <p className="list-ex">총<span>15</span>명</p>          
          <ul className="info-list">
            <li>
              <Link href="#">
                <a>
                  <div className="info-left">
                    <p className="days-area">2019.08.01 등록</p>
                    <p className="waterman-area"><span>단체</span>현대 오토오토</p>
                    <p className="count-area">대표계정</p>
                  </div>                  
                  <div className="info-right">
                    <em><span>20</span> 대</em>
                    <span>등록중</span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>
                  <div className="info-left">
                    <p className="days-area">2019.08.01 등록 <span>D-398</span></p>
                    <p className="waterman-area"><span>단체</span>김현대 (010-1234-5678)</p>
                    <p className="count-area">123-45-67892</p>
                  </div>                  
                  <div className="info-right">
                    <em><span>10</span>대</em>
                    <span>등록중</span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>
                 <div className="info-left">
                    <p className="days-area">2019.08.01 등록 <span>D-398</span></p>
                    <p className="waterman-area">김현대 (010-1234-5678)</p>
                    <p className="count-area">대표계정</p>
                  </div>                  
                  <div className="info-right">                    
                    <span>승인필요</span>
                  </div>
                </a>
              </Link>
            </li>            
          </ul>
        </div> 

        <p className="tx-tp3 mt8">&#8251; 단체회원 계정으로 등록된 차량에 한해 딜러배정(연락처 변경)을 하실 수 있습니다.</p>
        <p className="tx-tp3 mt8">&#8251; 신규 가입 한 딜러인 경우, 단체회원의 승인을 거친 이후 딜러배정을 하실 수 있습니다.</p>
      </div>

      
      
    </AppLayout>
  );
}  

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-info">
          <div className="mypage-admin-title">
            <h3>딜러정보 관리</h3>
            <p className="tx-exp-tp5">&#8251; 단체회원 계정으로 등록된 차량에 한해 딜러배정(연락처 변경)을 하실 수 있습니다.</p>
            <p className="tx-exp-tp5">&#8251; 신규 가입 한 딜러인 경우, 단체회원의 승인을 거친 이후 딜러배정을 하실 수 있습니다.</p>
          </div>
          <div className="tx-list">
            <p className="inquire-num">총 15명</p>
            <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
              <caption className="away">딜러정보 관리</caption>
              <colgroup>
                <col width="8%" />
                <col width="8%" />
                <col width="13%" />
                <col width="13%" />
                <col width="*" />
                <col width="29%" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>구분</th>
                  <th>이름</th>
                  <th>배정차량</th>
                  <th>연락처</th>
                  <th>종사원번호</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15</td>
                  <td>단체</td>
                  <td><Link href="/mypage/dealerMember03_02"><a className="tx-blue80 t-underline">현대 오토오토</a></Link></td>
                  <td>2대</td>
                  <td>010-1234-5678</td>
                  <td>123-45-67892 <span className="tx-blue80">[-398일]</span></td>
                  <td>2019-09-09</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>대표</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">김현대</a></Link></td>
                  <td>2대</td>
                  <td>010-1234-5678</td>
                  <td>123-45-67892 <span className="tx-blue80">[-398일]</span></td>
                  <td>2019-09-09</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>딜러</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">김현대</a></Link></td>
                  <td>2대</td>
                  <td>010-1234-5678</td>
                  <td>123-45-67892 <span className="tx-blue80">[-398일]</span></td>
                  <td>승인 필요</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>딜러</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">김현대</a></Link></td>
                  <td>2대</td>
                  <td>010-1234-5678</td>
                  <td>123-45-67892 <span className="tx-blue80">[-398일]</span></td>
                  <td>2019-09-09</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>딜러</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">김현대</a></Link></td>
                  <td>2대</td>
                  <td>010-1234-5678</td>
                  <td>123-45-67892 <span className="tx-blue80">[-398일]</span></td>
                  <td>2019-09-09</td>
                </tr>
              </tbody>
            </table>            
          </div>

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
                    <Button size="big" background="gray" title="취소" width={130} height={48} onClick={handleClosePop1} />
                    <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={handleDelete} />
                  </Buttons>
                </>      
              ) : (
                <>
                  <p>삭제되었습니다.</p>
                  <Buttons align="center" marginTop={85}>
                    <Button size="big" background="blue80" title="확인" width={245} height={48} onClick={handleClosePop1} />
                  </Buttons>
                </>
              )
          }
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} mode="normal" size="medium" title="지점등록">
        <div className="con-wrap popup-dealer-info">
          <ul>
            <li className="tit">지점명</li>
            <li><Input type="text" id="name" value="지점명을 입력하세요" width={384} height={48} /></li>
            <li className="tit">전화번호</li>            
            <li>
              <Input type="text" id="phone1" width={116} height={48} />
              <em className="mg8">-</em>
              <Input type="text" id="phone2" width={115} height={48} />
              <em className="mg8">-</em>
              <Input type="text" id="phone3" width={115} height={48} />
            </li>
            <li className="tit">주소</li>
            <li>
              <span className="bridge">
                <Input type="text" placeHolder="우편번호" disabled={false} id="consign-address-number" width={250} />
              </span>
              <Button size="mid" background="gray" title="우편번호" width={124} height={48} marginLeft={8} />
            </li>            
            <li className="tit">영업시간</li>
            <li>
              <div className="office-hours">
                <span className="hours-box">
                  <span className="tit">평일</span>
                  <SelectBox id="h-number1" className="items-sbox" options={select_time_list} placeHolder="시간선택" width={147} height={40} />
                  <em className="mg8">-</em>
                  <SelectBox id="h-number2" className="items-sbox" options={select_time_list} placeHolder="시간선택" width={147} height={40} />                
                </span>             
                <span className="hours-box mt8">
                  <span className="tit">토요일</span>
                  <SelectBox id="h-number3" className="items-sbox" options={select_time_list} placeHolder="시간선택" width={147} height={40} />
                  <em className="mg8">-</em>
                  <SelectBox id="h-number4" className="items-sbox" options={select_time_list} placeHolder="시간선택" width={147} height={40} />                
                </span>
                <span className="hours-box mt8">
                  <span className="tit">일요일</span>
                  <SelectBox id="h-number5" className="items-sbox" options={select_time_list} placeHolder="시간선택" width={147} height={40} />
                  <em className="mg8">-</em>
                  <SelectBox id="h-number6" className="items-sbox" options={select_time_list} placeHolder="시간선택" width={147} height={40} />                
                </span>
              </div>
            </li>
          </ul>
          <Buttons align="center" marginTop={32}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={handleClosePop2} />
            <Button size="big" background="blue80" title="등록완료" width={130} height={48}/>
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerMember03;
