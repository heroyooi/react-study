import { useState } from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment'
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import SelectBox from '@lib/share/items/SelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';
import { select1_list } from '@src/dummy';
/*
  html 변경이력
  03.12 : 판매완료일 -> 등록일자 로 변경
        
*/
const DealerMember05 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const now = moment();

  const [visitPop, setVisitPop, openVisitPop, closeVisitPop] = useRodal(false, true);

  return (
    <AppLayout>
      <div className="content-wrap live-shot-sec">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>Live shot 배정 리스트</h3>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <colgroup>
                <col width="8.8%" />
                <col width="91.2%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>진행상태</th>
                  <td>
                    <CheckBox id='chk-all' title='전체' />
                    <CheckBox id='chk1' title='등록완료' />
                    <CheckBox id='chk2' title='등록대기' />
                    <CheckBox id='chk3' title='미등록' />
                  </td>
                </tr>
                <tr>
                  <th>등록일자</th>
                  <td>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    <em className="mg8">~</em>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                    <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
                    <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td><p className="tx-exp-tp6">(* 최대 [6개월] 까지 조회 가능합니다.)</p></td>
                </tr>
              </tbody>
            </table>

            <div className="tx-list">
              <p className="inquire-num">방문신청현황 : 오늘 0건 / 이번주 100건</p>
              <ul className="float-wrap">
                <li>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={148} height={36} placeHolder="제조사" />
                </li>
                <li>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={148} height={36} placeHolder="모델" />
                </li>
                <li>
                  <SelectBox id="select1" className="items-sbox" options={[
                    { value: '1', label: '등록순' },
                    { value: '2', label: '판매일순' }
                  ]} width={148} height={36} placeHolder="등록순" />
                </li>
              </ul>
              <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
                <caption className="away">딜러정보 관리</caption>
                <colgroup>
                  <col width="9%" />
                  <col width="13%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>등록일자</th>
                    <th>차량번호</th>
                    <th>차량명</th>
                    <th>신청인이름</th>
                    <th>신청지역</th>
                    <th>진행상태</th>
                    <th>방문정보</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>2019.10.30<br />14:00</td>
                    <td>12가1234</td>
                    <td>제네시스 G80 3.3<br />GDI AWD</td>
                    <td>홍길동</td>
                    <td>서울시<br />강남구</td>
                    <td>등록대기</td>
                    <td><Button size="sml" line="gray" title="보기" width={56} height={32} radius={true} onClick={(e) => openVisitPop(e, "fade")} /></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>2019.10.30<br />14:00</td>
                    <td>12가1234</td>
                    <td>제네시스 G80 3.3<br />GDI AWD</td>
                    <td>홍길동</td>
                    <td>서울시<br />강남구</td>
                    <td>등록대기</td>
                    <td><Button size="sml" line="gray" title="보기" width={56} height={32} radius={true} onClick={(e) => openVisitPop(e, "fade")} /></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>2019.10.30<br />14:00</td>
                    <td>12가1234</td>
                    <td>제네시스 G80 3.3<br />GDI AWD</td>
                    <td>홍길동</td>
                    <td>서울시<br />강남구</td>
                    <td>등록대기</td>
                    <td><Button size="sml" line="gray" title="보기" width={56} height={32} radius={true} onClick={(e) => openVisitPop(e, "fade")} /></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>2019.10.30<br />14:00</td>
                    <td>12가1234</td>
                    <td>제네시스 G80 3.3<br />GDI AWD</td>
                    <td>홍길동</td>
                    <td>서울시<br />강남구</td>
                    <td>등록대기</td>
                    <td><Button size="sml" line="gray" title="보기" width={56} height={32} radius={true} onClick={(e) => openVisitPop(e, "fade")} /></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <PageNavigator recordCount={50} className="mt32" />
            </div>
          </div>
        </div>

      </div>

      <RodalPopup show={visitPop} type={'fade'} closedHandler={closeVisitPop} title="방문정보" mode="normal" size="large">
        <div className="con-wrap popup-visit">
          <table summary="차량 기본정보에 대한 내용" className="table-tp1">
            <caption>차량 기본정보</caption>
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="20%" />
              <col width="30%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td colSpan="3">03라4567</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td colSpan="3">제네시스 G80 3.3 GDI AWD 프리미엄 럭셔리</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>2017-05-07</td>
                <th>형식년도</th>
                <td>2018</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>검정</td>
                <th>연료</th>
                <td>가솔린</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>1,591cc</td>
                <th>차종</th>
                <td>준중형차</td>
              </tr>
              <tr>
                <th>용도</th>
                <td>일반</td>
                <th>출고가격</th>
                <td>50,700,000원</td>
              </tr>
            </tbody>
          </table>

          <table summary="신청자 정보에 대한 내용" className="table-tp1 mt64">
            <caption>신청자 정보</caption>
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="20%" />
              <col width="30%" />
            </colgroup>
            <tbody>
              <tr>
                <th>신청인</th>
                <td>김현대</td>
                <th>연락처</th>
                <td>010-9000-1909</td>
              </tr>
              <tr>
                <th>방문일시</th>
                <td colSpan="3">2019.10.30 14:00</td>
              </tr>
              <tr>
                <th>방문장소</th>
                <td colSpan="3">
                  현대글로비스(주) 서울특별시 강남구 테헤란로 301
                  <div className="map-wrap">
                    <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8997624344956!2d127.01552801565039!3d37.51028223510467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3de09019397%3A0xcc5f8d201cd1f459!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDsnqDsm5Drj5kg7Iug67CY7Y-s66GcIDMxMQ!5e0!3m2!1sko!2skr!4v1571620018249!5m2!1sko!2skr" allowFullScreen></iframe>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <Buttons align="center" marginTop={60}>
            <Button size="big" background="blue80" title="확인" width={245} height={48}/>
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerMember05;