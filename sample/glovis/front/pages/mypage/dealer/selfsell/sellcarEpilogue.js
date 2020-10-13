/**
 * 설명 : 차량 판매 후기 관리
 * @fileoverview 마이페이지(딜러)>회원정보관리>차량판매 후기 관리
 * @requires [sellcarEpilogueAction,sellcarEpilogueInfo]
 * @author 김지현
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, orderBy } from 'lodash';
import Link from 'next/link';

import Router, { withRouter } from 'next/router';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import PageNavigator from '@src/components/common/PageNavigator';

import { getEpilogueList } from '@src/actions/mypage/dealer/sellcarEpilogueAction';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { gInfoLive } from '@src/utils/LoginUtils';

/**
 * 설명 : 차량판매 후기 관리 목록을 조회하고 등록/수정 페이지를 호출한다.
 * @param {state.epliogue.epilogueList} 차량판매 후기 관리 목록
 * @returns {sellcarEpilogue} 차량판매 후기 관리 목록을 조회한다.
 */

const sellcarEpilogue = ({ router }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량 판매 후기 관리',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    dispatch({
      type: MOBILE_QUICK_EXIST,
      data: {
        exist: false
      }
    });
    dispatch({
      type: MOBILE_FOOTER_EXIST,
      data: {
        exist: false
      }
    });
  }, []);

  const userId = gInfoLive().id;
  const [currentPage, setCurrentPage] = useState(1);
  const [recordSize, setRecordSize] = useState(30);
  const epilogueList = useSelector((state) => orderBy(state.epliogue.epilogueList, {}));
  const nf = new Intl.NumberFormat();

  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

  useEffect(() => {
    const data = { currentPage: currentPage, recordSize: recordSize, userId: userId };
    if (isEmpty(epilogueList)) {
      dispatch(getEpilogueList(data));
    }
  }, []);

  const onHandleBtnClick = (e, url, id) => {
    e.preventDefault();
    Router.push(url + '?slPsId=' + id, url);
  };

  const onHandlePageChange = (e, page) => {
    console.log('page change');
    console.log(e);
    console.log(page);
    const data = { currentPage: page, recordSize: recordSize, userId: userId };
    dispatch(getEpilogueList(data));
  };

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap">
          <div className="mypage-state-sec member-review mt20">
            <div className="float-wrap btn-xs">
              <h3 className="tit2">
                이용후기
                <span>
                  (<em className="tx-blue80">{!isEmpty(epilogueList) && epilogueList.length > 0 ? epilogueList[0].totcnt : 0}</em>건)
                </span>
              </h3>
              <Button
                size="sml"
                line="gray"
                radius={true}
                title="후기등록"
                width={56}
                height={24}
                fontSize={10}
                fontWeight={500}
                onClick={(e) => onHandleBtnClick(e, '/mypage/dealer/selfsell/sellcarEpilogueInfo')}
              />
            </div>
            {!isEmpty(epilogueList) && (
              <ul className="notice v-2">
                {epilogueList.map((data, index) => {
                  return (
                    <li key={index}>
                      <Link href={'/mypage/dealer/selfsell/sellcarEpilogueInfo?slPsId=' + data.slPsId}>
                        <a>
                          <p>
                            {data.crNm}
                            <span>{data.ttlNm}</span>
                          </p>
                          <span>등록일: {data.regDt}</span>
                          <span>최종수정: {data.updDt}</span>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
            {isEmpty(epilogueList) && (
              <div className="list-none-wrap">
                <p className="list-none">등록된 이용후기가 없습니다.</p>
              </div>
            )}
            {/*
              withoutList === false
              ? (
                <ul className="notice v-2">
                  <li>
                    <Link href="#">
                      <a>
                        <p>
                          기아 더 프레스티지 K7 3.0 GDI 럭셔리
                          <span>친절하고 쿨하고 전반적으로 만족! 만족만족만족만친절하고 쿨하고 전반적으로 만족! 만족만족만족만친절하고 쿨하고 전반적으로 만족! 만족만족만족만</span>
                        </p>
                        <span>등록일: 2019.09.16</span>
                        <span>최종수정: 2019.09.16</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>
                        <p>
                          기아 더 프레스티지 K7 3.0 GDI 럭셔리
                          <span>친절하고 쿨하고 전반적으로 만족! 만족만족만족만친절하고 쿨하고 전반적으로 만족! 만족만족만족만친절하고 쿨하고 전반적으로 만족! 만족만족만족만</span>
                        </p>
                        <span>등록일: 2019.09.16</span>
                        <span>최종수정: 2019.09.16</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              ) : (
                <div className="list-none-wrap">
                  <p className="list-none">등록된 이용후기가 없습니다.</p>
                </div>
              )
              */}
          </div>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec member-review">
          <div className="mypage-admin-title">
            <h3>차량 판매 후기 관리</h3>
            <p className="tx-exp-tp5">&#8251; 셀프판매 낙찰 시 회원에게 노출됩니다.</p>
          </div>

          <div className="tx-list">
            <p className="inquire-num">총 {isEmpty(epilogueList) ? 0 : epilogueList[0].totcnt}건</p>
            <table summary="차량 판매 후기 관리" className="table-tp1 th-c td-c">
              <caption className="away">차량 판매 후기 관리</caption>
              <colgroup>
                <col width="8%" />
                <col width="30%" />
                <col width="39%" />
                <col width="23%" />
              </colgroup>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>제목</th>
                  <th>차량명</th>
                  <th>등록일(최종 수정일)</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(epilogueList) &&
                  epilogueList.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.rownum}</td>
                        <td key={data.slPsId}>
                          <Link href={'/mypage/dealer/selfsell/sellcarEpilogueInfo?slPsId=' + data.slPsId}>
                            <a>&nbsp;{data.ttlNm} </a>
                          </Link>
                        </td>
                        <td>{data.crNm}</td>
                        <td>{data.updDt}</td>
                      </tr>
                    );
                  })}
                {isEmpty(epilogueList) && (
                  <tr>
                    <td colSpan="4">결과가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <PageNavigator className="mt20" currentPage={currentPage} recordCount={isEmpty(epilogueList) ? 0 : epilogueList[0].totCnt} recordSize={recordSize} changed={onHandlePageChange} />
          </div>

          <Buttons align="right" marginTop={26}>
            <Button size="big" background="blue80" title="후기등록" width={180} height={48} onClick={(e) => onHandleBtnClick(e, '/mypage/dealer/selfsell/sellcarEpilogueInfo')} />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};

export default withRouter(sellcarEpilogue);
