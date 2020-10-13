import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import AppLayout from '@src/components/layouts/AppLayout';
import PageNavigator from '@src/components/common/PageNavigator';
import { getFormatList } from '@src/actions/autoAuction/autoAuctionAction';
import { apiUrl } from '@src/utils/HttpUtils';

const AuctionFormat = ({ query }) => {
  const { pageNo = 1 } = query;
  const dispatch = useDispatch();
  const { formatList, formatTotalCount, formatRecordSize } = useSelector((state) => state.autoAuction);

  const detailView = (e, fileNo) => {
    e.preventDefault();
    console.log('fileNo >>>>', fileNo);
    Router.push(`/autoAuction/auctionFormatView?pageNo=${pageNo}&fileNo=${fileNo}`).then(() => window.scrollTo(0, 0));
  };

  const clickPageNavi = (e, clickedPageNo) => {
    Router.push(`/autoAuction/auctionFormat?pageNo=${clickedPageNo}`).then(() => window.scrollTo(0, 0));
  };

  useEffect(() => {
    dispatch(getFormatList(pageNo));
  }, [pageNo]);

  console.log('formatList >>>>>>>', formatList);

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-notice-wrap">
          <h3>스마트옥션 서식다운로드</h3>

          <table summary="공지사항" className="table-tp1 th-c td-c">
            <caption className="away">서식다운로드</caption>
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
              {formatList &&
                formatList.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.fileNo}</td>
                      <td onClick={(e) => detailView(e, data.fileNo)}>
                        {/* <td> */}
                        {/* <a href={`${apiUrl}/api/oldAutobell/common/fileDownload.do?bbsCode=FORMAT&fileName=${data.fileName}`} style={{ cursor: 'pointer' }}> */}
                        <span className="fl" style={{ cursor: 'pointer' }}>
                          <a>{data.fileSubject}</a>
                        </span>
                        <span className="fl" style={{ cursor: 'pointer' }}>
                          {data.fileName !== null ? <i className="ico-file" /> : ''}
                        </span>
                        {/* </a> */}
                      </td>
                      <td>{data.creaDt}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <PageNavigator className="mt40" currentPage={Number(pageNo)} recordCount={formatTotalCount} recordSize={formatRecordSize} changed={clickPageNavi} />
        </div>
      </div>
    </AppLayout>
  );
};

AuctionFormat.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  const { pageNo = 1 } = query;

  await reduxStore.dispatch(getFormatList(pageNo));

  return { query };
};

export default AuctionFormat;
