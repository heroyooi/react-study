import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { isEmpty, replace } from 'lodash';
import PageNavigator from '@src/components/common/PageNavigator';
import { getCscenterNotice } from '@src/actions/cscenter/cscenterAction';
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { SystemContext } from '@src/provider/SystemProvider'
import { SECTION_CUSTOMER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const NoticeList = () => {
  const dispatch = useDispatch();

  const tabLink = [
    { index: 0, url: '/cscenter/noticeList' },
    { index: 1, url: '/cscenter/directConsultGuide' },
    { index: 2, url: '/cscenter/faq' }
  ];

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const noticeDataSel = useSelector((state) => state.cscenter.noticeData, []);
  const totalPage = useSelector((state) => state.cscenter.totalPage, 0);
  const fixedBBsCount = useSelector((state) => state.cscenter.fixedBBsCount, 0);
  const { showAlert, showConfirm, Alert,  Confirm, initAlert, initConfirm, } = useContext(SystemContext);

  const [page, setPage] = useState(1);

  const pageChangeHandler = (e, pageNo) => {
    setPage(pageNo);
  };

  const [searchText, setSearchText] = useState('');

  const handleMore = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const onChangeSearchText = useCallback(
    e => {
      setSearchText(e.target.value);
    },
    [searchText]
  );

  const searchNotice = useCallback(
    e => {
      e.preventDefault();
      if (objIsEmpty(searchText)) {
        alert('검색어를 입력해주세요.');
        return;
      }
      const searchInfo = {
        inqPageNo: page,
        searchText: searchText,
      };

      //console.log(searchInfo);
      dispatch(getCscenterNotice(searchInfo));
    },
    [searchText]
  );

  useEffect(() => {
    dispatch({ type: SECTION_CUSTOMER });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '공지사항',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#ffffff'
        }
      });
    }
  }, [dispatch, hasMobile]);

  useEffect(() => {
    if (hasMobile) {
      dispatch(getCscenterNotice(page, '15', page > 1 ? true : false));
    } else {
      const searchInfo = {
        inqPageNo: page,
        pagePerSize: '10',
        searchText: searchText,
        isMore: false
      };
      dispatch(getCscenterNotice(searchInfo));
    }
  }, [dispatch, hasMobile, page]);

//console.log("전체개수totalPage", totalPage);
//console.log("고정fixedBBsCount", fixedBBsCount);
//console.log("현재page", page);
//console.log("noticeDataSel", noticeDataSel);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap help-notice-wrap">
          <ul>
            {!isEmpty(noticeDataSel) &&
              noticeDataSel.map((v, i) => {
                return (
                  <li key={i}>
                    <Link href={`/cscenter/noticeView?id=${v.bbsNttId}`}>
                      <a className="notice-cont">
                        {v.bbsNo === '0' ? <span className="notice">공지</span> : <span className="num">{v.bbsNo}</span>}
                        <span className="txt">
                          {v.nttTtlNm}
                          {v.atchFileYn === 'Y' && <i className="ico-file" />}
                        </span>
                        <span className="date">{replace(v.regDt, /-/gi, '.')}</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
          {totalPage > (noticeDataSel?.length || 0) && (
            <div className="mt16">
              <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} lineHeight={40} fontSize={14} onClick={handleMore} />
            </div>
          )}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-notice-wrap">
          <h3>고객센터</h3>
          <TabMenu type="type1" defaultTab={0} tabLink={tabLink}>
            <TabCont tabTitle="공지사항" id="tab1-1" index={0}>
            <table className='table-tp1 input search' summary='조회 영역'>
              <caption className='away'>조회 영역</caption>
              <tbody>
                <tr>
                  <th>검색어</th>
                  <td>
                    <Input
                      type='text'
                      placeHolder=''
                      width={803}
                      value={searchText}
                      onChange={onChangeSearchText}
                    />
                  </td>
                  <td>
                    <div className='fr'>
                      <Button
                        size='sml'
                        background='blue80'
                        title='조회'
                        width={114}                    
                        onClick={searchNotice}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
              <table summary="결제 정보에 대한 내용" className="table-tp1 th-c td-c">
                <caption className="away">공지사항</caption>
                <colgroup>
                  <col width="10%" />
                  <col width="70%" />
                  <col width="20%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(noticeDataSel) &&
                    noticeDataSel.map((data, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              {data.bbsNo === '0' ? (
                                <span key={index} className="notice">
                                  공지
                                </span>
                              ) : (
                                data.bbsNo
                              )}
                            </td>
                            <td>
                              <Link href={`/cscenter/noticeView?id=${data.bbsNttId}`}>
                                <a>&nbsp;{data.nttTtlNm} </a>
                              </Link>
                              {data.atchFileYn === 'Y' && <i key={index} className="ico-file" />}
                            </td>
                            <td>{data.regDt}</td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>

              <PageNavigator className="mt20" blockSize={10} currentPage={page} recordCount={totalPage} recordSize={10 + fixedBBsCount} changed={pageChangeHandler} />
            </TabCont>
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1} />
            <TabCont tabTitle="FAQ" id="tab1-3" index={2} />
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  );
};

export default NoticeList;
