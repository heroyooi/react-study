import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import ReactHtmlParser from 'react-html-parser';

import Button from '@lib/share/items/Button';

import AppLayout from '@src/components/layouts/AppLayout';
import { getFormatInfo } from '@src/actions/autoAuction/autoAuctionAction';
import { apiUrl } from '@src/utils/HttpUtils';

const Editor = dynamic(() => import('@lib/share/textEditor/editor'), {
  ssr: false,
  loading() {
    return <span>Loading...</span>;
  }
});

const AuctionFormatView = ({ query }) => {
  const { fileNo, pageNo = 1 } = query;
  const dispatch = useDispatch();
  const nf = new Intl.NumberFormat();
  const { formatInfo } = useSelector((state) => state.autoAuction);

  const fileDownload = (e, fileNameEnc) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = `https://www.glovisaa.com/cm/fileDownMan.do?menuCd=FORMAT&filename=${encodeURIComponent(fileNameEnc)}`;
    //link.href = `${apiUrl}/api/oldAutobell/common/fileDownload.do?bbsCode=FORMAT&fileName=${fileName}`;
    //link.href = `${apiUrl}/api/oldAutobell/common/fileDownload.do?bbsCode=FORMAT&fileName=${encodeURIComponent(fileNameEnc)}`;
    link.target = '_blank';
    link.click();
  };

  const nextPrevFormatView = (e, fileNo) => {
    e.preventDefault();
    console.log('fileNo >>>>', fileNo);
    if (fileNo !== null) Router.push(`/autoAuction/auctionFormatView?pageNo=${pageNo}&fileNo=${fileNo}`).then(() => window.scrollTo(0, 0));
  };

  const onClickList = (e) => {
    e.preventDefault();
    Router.push(`/autoAuction/auctionFormat?pageNo=${pageNo}`).then(() => window.scrollTo(0, 0));
  };

  console.log('formatInfo >>>>>>>>', formatInfo);

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-notice-wrap">
          <h3>스마트옥션 서식다운로드</h3>

          <div className="view-wrap">
            <div className="header">
              <h5>{formatInfo?.fileSubject}</h5>
              {formatInfo?.fileName !== null ? (
                <span onClick={(e) => fileDownload(e, formatInfo?.fileNameEnc)} style={{ cursor: 'pointer' }}>
                  {/* <a href={`${apiUrl}/api/oldAutobell/common/fileDownload.do?bbsCode=FORMAT&fileName=${formatInfo?.fileName}`} style={{ cursor: 'pointer' }}> */}
                  <i className="ico-file" />
                  {formatInfo?.fileName + ' (' + nf.format(formatInfo?.fileSize) + ' Byte)'}
                  {/* </a> */}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="content">
              {ReactHtmlParser(formatInfo?.fileContents)}
              {/* <Editor value={formatInfo?.fileContents} editing={false} /> */}
            </div>
            <ul className="list-wrap">
              <li>
                <span>
                  이전 글<i className="ico-sel-arrow" />
                </span>
                <a onClick={(e) => nextPrevFormatView(e, formatInfo?.prevFileNo)} style={{ cursor: 'pointer' }}>
                  {formatInfo?.prevFileSubject}
                </a>
              </li>
              <li>
                <span>
                  다음 글<i className="ico-sel-arrow" />
                </span>
                <a onClick={(e) => nextPrevFormatView(e, formatInfo?.nextFileNo)} style={{ cursor: 'pointer' }}>
                  {formatInfo?.nextFileSubject}
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

AuctionFormatView.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  const { fileNo = 1 } = query;

  await reduxStore.dispatch(getFormatInfo(fileNo));

  return { query };
};

export default AuctionFormatView;
