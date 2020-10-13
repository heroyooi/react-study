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

const GeneralMember03_01 = () => {
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
            <div className="list-tit">
              <span className="fr">
                <Button size="big" background="blue80" title="1:1 문의하기" width={181} height={48} />
                <Button size="big" background="blue80" title="고객센터 바로가기" width={181} height={48} marginLeft={23} />
              </span>
            </div>
            <div className="view-wrap">
              <div className="header">
                <h5><b>[ 내차사기 ]</b>보험처리이력 등록기준일</h5>
                <span>2019.03.11</span>
              </div>
              <div className="content">
                저번에 연락했던 딜러에게 다시 전화를 거니 없는 번호라고 뜹니다.<br />
                딜러와 연락할 수 있는 방법을 알려주세요
              </div>
              <div className="answer">
                <p>
                  <b>답변</b>
                  안녕하세요. 친절을 다하는 현대 글로비스 오토벨 고객센터입니다.<br />
                  확인결과, 홍길동 딜러분의 연락처가 변경되어 고객님의 SMS로 안내해드렸습니다.<br />
                  불편을 드려 대단히 죄송합니다. 감사합니다.
                </p>
                <p className="date">2019.03.11</p>
              </div>
              <Button size="mid" background="gray" title="목록으로" width={160} height={48} href="/mypage/generalMember03"/>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default GeneralMember03_01