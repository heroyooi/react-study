/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty, replace } from 'lodash';
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import { SECTION_CUSTOMER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { axiosGet } from '@src/utils/HttpUtils';

const NoticeView = ({ res }) => {
  console.log("NoticeView -> res", res)
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const tabLink = [
    { index: 0, url: '/cscenter/noticeList' },
    { index: 1, url: '/cscenter/directConsultGuide' },
    { index: 2, url: '/cscenter/faq' }
  ];

  const onClickHandler = () => {
    Router.push('/cscenter/noticeList');
  };

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
          bottom: 60,
          color: '#ffffff'
        }
      });
    }
  }, [dispatch, hasMobile]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="help-notice-wrap">
          <div className="view-wrap">
            <div className="header">
              <h5>{res.nttTtlNm}</h5>
              <span className="date">{replace(res.regDt, /-/gi, '.')}</span>
            </div>
            {!isEmpty(res.fileList) && (
              <div className="add-file">
                {res.fileList.map((v, i) => {
                  return (
                    <p key={i}>
                      <a href={`/api/cmm/file/download.do?fileId=${v.fileSaveId}`}>
                        <span>
                          <i className="ico-file" /> {v.originalFileName}
                        </span>
                      </a>
                    </p>
                  );
                })}
              </div>
            )}
            <div className="content" dangerouslySetInnerHTML={{ __html: res.nttCntn }} />
            <Button className="fixed" size="full" background="blue80" title="목록" href="/cscenter/noticeList" nextLink={true} />
          </div>
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
              <div className="view-wrap">
                <div className="header">
                  <h5>{res.nttTtlNm}</h5>
                  <span>{res.regDt}</span>
                </div>
                <div className="header" style={{ backgroundColor: '#ffffff', height: '40px' }}>
                  {res.fileList &&
                    res.fileList.map((data, index) => {
                      return (
                        <span key={index}>
                          <a href={`/api/cmm/file/download.do?fileId=${data.fileSaveId}`}>
                            <i className="ico-file" />
                            {data.originalFileName}
                          </a>
                        </span>
                      );
                    })}
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: res.nttCntn }} />
                <ul className="list-wrap">
                  <li>
                    <span>
                      이전 글<i className="ico-sel-arrow" />
                    </span>
                    {res.prevBbsNttId !== null ? (
                      <Link href={`/cscenter/noticeView?id=${res.prevBbsNttId}`}>
                        <a>{res.prevNttTtlNm}</a>
                      </Link>
                    ) : (
                      <span>{res.prevNttTtlNm}</span>
                    )}
                  </li>
                  <li>
                    <span>
                      다음 글<i className="ico-sel-arrow" />
                    </span>
                    {res.nextBbsNttId !== null ? (
                      <Link href={`/cscenter/noticeView?id=${res.nextBbsNttId}`}>
                        <a>{res.nextNttTtlNm}</a>
                      </Link>
                    ) : (
                      <span>{res.nextNttTtlNm}</span>
                    )}
                  </li>
                </ul>
                <Button size="mid" background="blue80" title="목록" width={120} height={48} onClick={onClickHandler} buttonMarkup={true} />
              </div>
            </TabCont>
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1} />
            <TabCont tabTitle="FAQ" id="tab1-3" index={2} />
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  );
};

NoticeView.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  const { data } = await axiosGet(`/api/bbsMgnt/selectBBSMgntInfo.do?bbsNttId=${query.id}`);
  return {
    res: data.data
  };
};

export default NoticeView;
