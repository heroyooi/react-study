import { useState, useCallback } from 'react';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';
import { select1_list } from '@src/dummy';
import Link from 'next/link';

const GeneralMember03 = () => {
  const now = moment()
  
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-inquire-sec">
          <div className="mypage-admin-title">
            <h3>나의 문의내역</h3>
            <p className="tx-exp-tp5">&#8251; 1:1 문의하신 내역을 확인하실 수 있습니다.</p>
          </div>

          <div className="list-wrap">
            <div className="list-tit fr">
              <Button size="big" background="blue80" title="1:1 문의하기" width={181} height={48} />
              <Button size="big" background="blue80" title="고객센터 바로가기" width={181} height={48} marginLeft={23} />
            </div>
            <table className="table-tp1 input search th-c" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th rowSpan="3">조회기간</th>
                  <td>
                    <Button className="on" size="mid" line="gray" color="black" title="1개월" width={50} height={40} />
                    <Button size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="6개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="1년" width={50} height={40} marginLeft={8} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <DatePicker defaultValue={now} inputHeight={40} />
                    <em className="mg8">-</em>
                    <DatePicker defaultValue={now} inputHeight={40} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Input type="text" placeHolder="" width={352} height={40} value="차량명을 검색해주세요." />
                    <Button size="mid" background="blue80" title="조회하기" width={130} height={40 }marginLeft={16} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="admin-list tp7 mt64">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="15%" />
                    <col width="15%" />
                    <col width="50%" />
                    <col width="20%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>문의일자</th>
                      <th>상담유형</th>
                      <th>제목</th>
                      <th>답변상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2019-10-01</td>
                      <td>내차사기</td>
                      <td><Link href="#"><a>딜러분의 연락처가 변경된 것 같아요.</a></Link></td>
                      <td>답변대기</td>
                    </tr>
                    <tr>
                      <td>2019-10-01</td>
                      <td>내차사기</td>
                      <td><Link href="#"><a>딜러분의 연락처가 변경된 것 같아요.</a></Link></td>
                      <td className="tx-blue80">답변완료</td>
                    </tr>
                    <tr className="list-none">
                      <td colSpan="4">조회하신 내용이 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <PageNavigator recordCount={50} className="mt32" />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default GeneralMember03