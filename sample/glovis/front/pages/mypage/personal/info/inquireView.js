/**
 * 설명 : 나의 문의내역 상세
 * @fileoverview 마이페이지(일반)>회원정보 관리>나의 문의내역
 * @requires [inquireAction,inquire]
 * @author 박진하
 * @author D191364
 */
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import _, { isEmpty } from 'lodash';

import moment from 'moment';
import Button from '@lib/share/items/Button';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import { axiosGet, axiosDown } from '@src/utils/HttpUtils';

//mobile
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';

/**
 * 설명 : 나의 문의내역을 상세 조회하고 문의내역 리스트 페이지를 호출한다.
 * @param {state.personalInquire.inquireList} 나의 문의내역
 * @returns {InquireView} 나의 문의내역 상세
 */
const InquireView = (data) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, []);

  //console.log("data:", data.data.data);
  const inqData = data.data.data;
  const inquire = data.data.data[0];

  const fileDown = useCallback((e, fileSaveId, fileNm) => {
    if (fileSaveId !== '') {
      //document.location.href = `/api/cmm/file/download.do?fileId=${fileSaveId}`;
      axiosDown(`/api/cmm/file/download.do?fileId=${fileSaveId}`, true).then((response) => {
        console.log('response:', response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileNm);
        document.body.appendChild(link);
        link.click();
      });
    }
  });

  const hasMobile = useSelector((state) => state.common.hasMobile);

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

    const now = moment();
    // 달력 기간 선택
    const handleBtnFilterClick1 = (label, e) => {
      console.log(label);
      console.log(e);
    };

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
              <Button size="sml" line="gray" color="gray" radius={true} className="" title="1:1 문의하기" width={72} href="/cscenter/directConsult" />
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
                      <p>안녕하세요.<br />친절을 다하는 현대 글로비스 오토벨 고객센터입니다.<br />확인결과 홍길동 딜러분의 연락처가 변경되어 고객님의 SMS로 안내해드렸습니다.<br />불편을 드려 대단히 죄송합니다. 감사합니다.</p>
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
    );
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
              <span className="fr" style={{ float: 'right' }}>
                <Button size="normal" background="blue80" title="1:1 문의하기" width={151} height={28} href="/cscenter/directConsult" />
                <Button size="normal" background="blue80" title="고객센터 바로가기" width={151} height={28} marginLeft={23} href="/cscenter/noticeList" />
              </span>
            </div>

            <div className="view-wrap">
              <div className="header">
                <h5>
                  <b>[ {inquire?.cnslTpcdNm} ]</b>
                  {inquire?.quesTtlNm}
                </h5>
                <span>{inquire?.quesDt}</span>
              </div>
              <div className="content">
                {inquire?.quesCntn.split('\n').map((item, index) => {
                  return (
                    <span key={index}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </div>
              {!isEmpty(inquire.fileSaveId) && (
                <div className="file">
                  {inqData.map((lists, index) => {
                    return (
                      <span key={index}>
                        <Button
                          size="normal"
                          color="gray"
                          title={lists.fileNm}
                          height={28}
                          buttonMarkup={true}
                          onClick={(e) => fileDown(e, lists.fileSaveId, lists.fileNm)}
                          iconType="file"
                          iconReverse={true}
                        />
                      </span>
                    );
                  })}
                </div>
              )}
              {inquire?.answSttDvcd === '0020' ? (
                <div className="answer">
                  <p>
                    <b>답변</b>
                    {inquire?.answCntn.split('\n').map((item, index) => {
                      return (
                        <span key={index}>
                          {item}
                          <br />
                        </span>
                      );
                    })}
                  </p>
                  <p className="date">{inquire?.answDt}</p>
                </div>
              ) : (
                ''
              )}
              <Button size="mid" background="gray" title="목록으로" width={160} height={48} href="inquire" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

InquireView.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';

  //내용 불러 오기
  const url = `/api/member/selectMyQuesInfo.do?seqNo=` + Number(query.seqNo);
  //let url = `/api/member/selectMyQuesInfo.do?seqNo=7`
  const res = await axiosGet(url, null);

  return {
    data: res.data
  };
};

export default InquireView;
