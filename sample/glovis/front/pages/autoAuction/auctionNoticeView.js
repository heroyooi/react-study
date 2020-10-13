import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import ReactHtmlParser from 'react-html-parser';

import Button from '@lib/share/items/Button';

import AppLayout from '@src/components/layouts/AppLayout';
import { getNotice } from '@src/actions/autoAuction/autoAuctionAction';
import { apiUrl } from '@src/utils/HttpUtils';

const Editor = dynamic(() => import('@lib/share/textEditor/editor'), {
  ssr: false,
  loading() {
    return <span>Loading...</span>;
  }
});

const AuctionNoticeView = ({ query }) => {
  const { bbsNo, pageNo = 1 } = query;
  const dispatch = useDispatch();
  const nf = new Intl.NumberFormat();
  const { notice } = useSelector((state) => state.autoAuction);

  const fileDownload = (e, notice) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = `https://www.glovisaa.com/cm/fileDownMan.do?menuCd=INEWS&filename=${encodeURIComponent(notice?.bbsFileNameEnc)}`;
    //link.href = `${apiUrl}/api/oldAutobell/common/fileDownload.do?bbsCode=${notice?.bbsCode}&fileName=${notice?.bbsFileName}`;
    //link.href = `${apiUrl}/api/oldAutobell/common/fileDownload.do?bbsCode=INEWS&fileName=${encodeURIComponent(notice?.bbsFileNameEnc)}`;
    link.target = '_blank';
    link.click();
  };

  const nextPrevNoticeView = (e, bbsNo) => {
    e.preventDefault();
    console.log('bbsNo >>>>', bbsNo);
    if (bbsNo !== null) Router.push(`/autoAuction/auctionNoticeView?bbsNo=${bbsNo}&pageNo=${pageNo}`).then(() => window.scrollTo(0, 0));
  };

  const onClickList = (e) => {
    e.preventDefault();
    Router.push(`/autoAuction/auctionNotice?pageNo=${pageNo}`).then(() => window.scrollTo(0, 0));
  };

  console.log('notice >>>>>>>>', notice);

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-notice-wrap">
          <h3>스마트옥션 공지사항</h3>

          <div className="view-wrap">
            <div className="header">
              <h5>{notice?.bbsSubject}</h5>
              {notice?.bbsFileName !== null ? (
                <span onClick={(e) => fileDownload(e, notice)} style={{ cursor: 'pointer' }}>
                  {/* <a href={`${apiUrl}/api/oldAutobell/common/fileDownload.do?bbsCode=${notice?.bbsCode}&fileName=${notice?.bbsFileName}`} style={{ cursor: 'pointer' }}> */}
                  <i className="ico-file" />
                  {notice?.bbsFileName + ' (' + nf.format(notice?.bbsFileSize) + ' Byte)'}
                  {/* </a> */}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="content">
              {ReactHtmlParser(notice?.bbsContents)}
              {/* <Editor value={notice?.bbsContents} editing={false} /> */}
            </div>
            <ul className="list-wrap">
              <li>
                <span>
                  이전 글<i className="ico-sel-arrow" />
                </span>
                <a onClick={(e) => nextPrevNoticeView(e, notice?.prevBbsNo)} style={{ cursor: 'pointer' }}>
                  {notice?.prevBbsSubject}
                </a>
              </li>
              <li>
                <span>
                  다음 글<i className="ico-sel-arrow" />
                </span>
                <a onClick={(e) => nextPrevNoticeView(e, notice?.nextBbsNo)} style={{ cursor: 'pointer' }}>
                  {notice?.nextBbsSubject}
                </a>
              </li>
            </ul>
            <Button size="mid" background="blue80" title="목록" width={120} height={48} onClick={onClickList} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

AuctionNoticeView.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  const { bbsNo = 1 } = query;

  await reduxStore.dispatch(getNotice(bbsNo));

  return { query };
};

export default AuctionNoticeView;
