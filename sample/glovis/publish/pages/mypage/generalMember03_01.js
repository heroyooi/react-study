import { useState, useCallback } from 'react';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list } from '@src/dummy';
import Link from 'next/link';

const GeneralMember03_01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const now = moment()
  // 달력 기간 선택
  const handleBtnFilterClick1 = (label, e) => {
    console.log(label);
  }

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '나의 문의내역',
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
    return (
      <AppLayout>
        <div className="mypage-state-sec general-inquire-sec">
         
          <div className="content-wrap">
            <div className="mypage-admin-title mt20">
              <p className="tx-exp-tp5 tx-gray mt0">&#8251; 1:1 문의하신 내역을 확인하실 수 있습니다.</p>
            </div>
            <ul className="m-toggle-list search mt16">
              <MenuItem>
                <MenuTitle><p className="tit2">나의 문의내역</p><span>상세조회</span></MenuTitle>
                <MenuCont>
                  <MobButtonFilter checkList={[
                    {title: "1개월", checked: true}, 
                    {title: "3개월", checked: false}, 
                    {title: "6개월", checked: false},
                    {title: "1년", checked: false}
                  ]} onClick={handleBtnFilterClick1} />
                  {/* 2개 이상인 경우 - 사용시 주석 삭제 요망 */}
                  {/* <MobButtonFilter checkList={[
                    {title: "11", checked: true}, 
                    {title: "222", checked: false}, 
                    {title: "333", checked: false},
                    {title: "444", checked: false}
                  ]} onClick={handleBtnFilterClick2} /> */}
                  <div className="mt8">
                    <DatePicker defaultValue={now} width='46%'/>
                    <em className="from">~</em>
                    <DatePicker defaultValue={now} width='46%'/>
                  </div>
                  <Input type="text" height={40} placeHolder="차량명을 검색하세요" marginTop={8}/>
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} />
                </MenuCont>
              </MenuItem>
              <li>
                <div className="float-wrap">
                  <p>2019.08.17 ~ 2019.09.16</p>
                  <p>총 <span className="tx-blue80">123</span>건</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-wrap content-border pdside20">
            
            <Buttons align="right" marginTop={16}>
              <Button size="sml" line="gray" color="gray" radius={true} className="" title="1:1 문의하기" width={72} href="/customer/inquiry" />
              <Button size="sml" line="gray" color="gray" radius={true} title="고객센터 바로가기" width={102} marginLeft={8} href="/customer/noticeList" />
            </Buttons>       

            <div className="qna-wrap">
              <ul className="m-toggle-list qna">
                <MenuItem>
                  <MenuTitle>
                    <div className="float-wrap mt0">
                      <ul className="fl">
                        <li>2019.12.04</li>
                        <li className="sec tx-blue80">답변완료</li>
                      </ul>
                    </div>
                    <p className="subject mt8">기아 그랜드카니발 GLX 11인승 GLX 11인승</p>
                    <span className="cont mt8">딜러분의 연락처가 변경된 것 같아요. 저번에 연락했던 딜러에게 다시 전화를 거니 없는 번호라고 뜹니다. 딜러와 연락할 수 있는 방법을 알려주세요.</span>
                  </MenuTitle>
                  <MenuCont>
                    <div className="answer-box">
                      <p>안녕하세요.<br />친절을 다하는 현대오토벨 고객센터입니다.<br />확인결과 홍길동 딜러분의 연락처가 변경되어 고객님의 SMS로 안내해드렸습니다.<br />불편을 드려 대단히 죄송합니다. 감사합니다.</p>
                      <p className="fs12 mt8">2018.10.01</p>
                    </div>
                  </MenuCont>
                </MenuItem>

                <MenuItem>
                  <MenuTitle>
                    <div className="float-wrap mt0">
                      <ul className="fl">
                        <li>2019.12.04</li>
                        <li className="sec tx-gray">답변대기</li>
                      </ul>
                    </div>
                    <p className="subject mt8">기아 그랜드카니발 GLX 11인승 GLX 11인승</p>
                    <span className="cont mt8">딜러분의 연락처가 변경된 것 같아요. 저번에 연락했던 딜러에게 다시 전화를 거니 없는 번호라고 뜹니다. 딜러와 연락할 수 있는 방법을 알려주세요.</span>
                  </MenuTitle>
                </MenuItem>
              </ul>
            </div>

          </div>
        </div>
      </AppLayout>
    )
  }
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
                <Button size="big" background="blue80" title="1:1 문의하기" width={181} height={48} href="/customer/inquiry" />
                <Button size="big" background="blue80" title="고객센터 바로가기" width={181} height={48} marginLeft={23} href="/customer/noticeList" />
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
                  안녕하세요. 친절을 다하는 현대오토벨 고객센터입니다.<br />
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