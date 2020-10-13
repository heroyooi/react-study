import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import AppLayout from '@src/components/layouts/AppLayout';
import PageNavigator from '@src/components/common/PageNavigator';
import { getNoticeList } from '@src/actions/autoAuction/autoAuctionAction';

const AuctionNotice = ({ query }) => {
  const { pageNo = 1 } = query;
  const dispatch = useDispatch();
  const { noticeList, noticeTotalCount, noticeRecordSize } = useSelector((state) => state.autoAuction);

  const detailView = (e, bbsNo) => {
    e.preventDefault();
    console.log('bbsNo >>>>', bbsNo);
    Router.push(`/autoAuction/auctionNoticeView?bbsNo=${bbsNo}&pageNo=${pageNo}`).then(() => window.scrollTo(0, 0));
  };

  const clickPageNavi = (e, clickedPageNo) => {
    Router.push(`/autoAuction/auctionNotice?pageNo=${clickedPageNo}`).then(() => window.scrollTo(0, 0));
  };

  useEffect(() => {
    dispatch(getNoticeList(pageNo));
  }, [pageNo]);

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-notice-wrap">
          <h3>스마트옥션 공지사항</h3>

          <table summary="공지사항" className="table-tp1 th-c td-c">
            <caption className="away">공지사항</caption>
            <colgroup>
              <col width="10%" />
              <col width="77%" />
              <col width="13%" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {noticeList &&
                noticeList.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.bbsNo}</td>
                      <td onClick={(e) => detailView(e, data.bbsNo)}>
                        <span className="fl" style={{ cursor: 'pointer' }}>
                          <a>{data.bbsSubject}</a>
                        </span>
                        <span className="fl" style={{ cursor: 'pointer' }}>
                          {data.bbsFileName !== null ? (
                            <i className="ico-file" />
                          ) : (
                            // <a href={`${apiUrl}/api/oldAutobell/common/fileDownload.do?bbsCode=${data.bbsCode}&fileName=${data.bbsFileName}`} style={{ display: 'block' }}>
                            //   <i className="ico-file" />
                            // </a>
                            ''
                          )}
                        </span>
                      </td>
                      <td>{data.bbsIsDate}</td>
                    </tr>
                  );
                })}
              {/* <tr>
                <td>
                  <span className="notice">공지</span>
                </td>
                <td>
                  <Link href="/help/noticeview">
                    <a>
                      <span className="tx-blue80">[시스템]</span>성능점검 기준 변경 공지
                    </a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>
                  <span className="notice">공지</span>
                </td>
                <td>
                  <Link href="/help/noticeview">
                    <a>
                      <span className="tx-blue80">[시스템]</span>스마트옥션 증강현실앱 서비스 오픈
                    </a>
                  </Link>
                  <i className="ico-file" />
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>[시스템]성능점검 기준 변경 공지</a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr>
              <tr>
                <td>33</td>
                <td>
                  <Link href="/help/noticeview">
                    <a>
                      <span className="tx-blue80">[공지분류]</span>성능점검 기준 변경 공지
                    </a>
                  </Link>
                </td>
                <td>2013.05.28</td>
              </tr> */}
            </tbody>
          </table>
          <PageNavigator className="mt40" currentPage={Number(pageNo)} recordCount={noticeTotalCount} recordSize={noticeRecordSize} changed={clickPageNavi} />
        </div>
      </div>
    </AppLayout>
  );
};

AuctionNotice.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  const { pageNo = 1 } = query;

  await reduxStore.dispatch(getNoticeList(pageNo));

  return { query };
};

export default AuctionNotice;
