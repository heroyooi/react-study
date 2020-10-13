import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { isEqual, isUndefined } from 'lodash';
import { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import Tabs, { TabPane } from 'rc-tabs';
import { Tabs, DefaultTabBar } from 'rmc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import { getfaqData } from '@src/actions/cscenter/cscenterAction';
import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';
import PageNavigator from '@src/components/common/PageNavigator';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { MOBILE_CONTENT_STYLE, MOBILE_HEADER_TYPE_SUB, SECTION_CUSTOMER } from '@src/actions/types';
import { console, Number } from 'globalthis/implementation';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Faq = ({ router }) => {
  const query = router?.query || {};
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const faqDataSel = useSelector((state) => state.cscenter.faqData, []);
  // const currentPage = useSelector((state) => state.cscenter.faqCurrentPage, 1);
  const currentPage = useSelector((state) => state.cscenter.currentPage, 1);
  const totalPage = useSelector((state) => state.cscenter.faqTotalPage, 0);
  const pageSize = useSelector((state) => state.cscenter.pageSize, 0);

  const [tabNo, setTabNo] = useState(Number(query?.tabNo) || 0);
  const [defaultTab, setDefaultTab] = useState(Number(tabNo));
  const [tabType, setTabType] = useState('all');
  //const prevTabNo = usePrevious(0);
  const [prevTabNo, setPrevTabNo] = useState(Number(tabNo));
  const [tabKey, setTabKey] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [prevPageNo, setPrevPageNo] = useState(pageNo);
  // const [morePageSize, setMorePageSize] = useState(pageSize);
  // const [nowPage, setNowPage] = useState(1);

  const [searchText, setSearchText] = useState('');

  const onChangeSearchText = useCallback(
    e => {
      setSearchText(e.target.value);
    },
    [searchText]
  );

  const searchFaq = useCallback(
    e => {
      e.preventDefault();
      if (objIsEmpty(searchText)) {
        alert('검색어를 입력해주세요.');
        return;
      }
      //const searchInfo = {
      //  inqPageNo: page,
      //  searchText: searchText,
      //};

      //console.log(searchInfo);
      //dispatch(getfaqData(searchInfo));
      dispatch(getfaqData(tabNo, 1, pageSize, searchText, hasMobile ? true : false));
      setDefaultTab(defaultTab);
      setPageNo(1);
      setPrevPageNo(1);
      setSearchText(searchText);
    },
    [searchText]
  );

  const tabLink = [
    { index: 0, url: '/cscenter/noticeList' },
    { index: 1, url: '/cscenter/directConsultGuide' },
    { index: 2, url: '/cscenter/faq' }
  ];

  const MenuData = [
    { key: 't0', title: '전체' },
    { key: 't1', title: '내 차 사기' },
    { key: 't2', title: '내 차 팔기' },
    { key: 't3', title: '회원' },
    { key: 't4', title: '결제' },
    { key: 't5', title: '금융' },
    { key: 't6', title: 'EW' },
    { key: 't7', title: '자주찾는 질문' }
  ];
  const tabCallback = useCallback((key) => {
    setTabNo(key);
    if (key === '0') {
      setTabKey('first');
    } else if (key === '7') {
      setTabKey('last');
    } else {
      setTabKey(key);
    }
  }, []);

  const pageChangeHandler = (e, page) => {
    console.log('이동할 페이지 : ' + page);
    setPrevPageNo(pageNo);
    if (isUndefined(page)) {
      setPageNo(pageNo + 1);
    } else {
      setPageNo(page);
    }
  };

  // 모바일 더보기
  const MobListMore = (e, page) => {
    // 더보기 버튼 동작
    if (hasMobile && page) {
      console.log('현재 페이지 : ', currentPage);
      console.log('더할 페이지 : ', page);
      console.log('이동할 페이지 : ', currentPage + page);
      setPrevPageNo(currentPage);
      setPageNo(currentPage + page);
    }
  };

  useEffect(() => {
    dispatch({ type: SECTION_CUSTOMER });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: 'FAQ',
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
  }, []);
  console.log('prevTab : %o, tabNo: %o, prevpageNo : %o, pageno : %o, searchText : %o', prevTabNo, tabNo, prevPageNo, pageNo, searchText);
  useEffect(() => {
    if (prevTabNo === 0 && tabNo === 0 && pageNo === 1) {
      dispatch(getfaqData(tabNo, 1, pageSize, searchText, hasMobile ? true : false));
      setDefaultTab(defaultTab);
      setSearchText(searchText);
    } else if (!isEqual(prevTabNo, tabNo)) {
      dispatch(getfaqData(tabNo, 1, pageSize, searchText, hasMobile ? true : false));
      setDefaultTab(defaultTab);
      setPageNo(1);
      setPrevPageNo(1);
      setSearchText(searchText);
    } else if (pageNo > 0 && !isEqual(prevPageNo, pageNo)) {
      dispatch(getfaqData(tabNo, pageNo, pageSize, searchText, hasMobile ? true : false));
    }
  }, [dispatch, tabNo, pageNo, prevPageNo, prevTabNo, pageSize, searchText, defaultTab, hasMobile]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap help-faq-wrap">
          <p className="ex">더 궁금한 내용이 있으실 경우에는, 1:1 상담 메뉴를 이용해주세요.</p>
          <div className="tabmenu-swipe">
            <Tabs
              tabs={MenuData}
              page={'t' + tabNo}
              renderTabBar={(props) => <DefaultTabBar {...props} page={4} />}
              onChange={(tab, index) => {
                tabCallback(index);
              }}
            >
              {MenuData.map((v, i) => {
                return (
                  <div key={v.key} className="content-wrap content-border">
                    <FaqList isTitle={false} more={true} faqData={faqDataSel} faqDataTotalCount={totalPage} onClick={MobListMore} />
                  </div>
                );
              })}
            </Tabs>
            {/* <Tabs renderTabBar={() => <SwipeableInkTabBar pageSize={4} />} renderTabContent={() => <TabContent />} defaultActiveKey={tabNo} onChange={tabCallback}>
              {MenuData.map((v, i) => {
                return (
                  <TabPane tab={v} data-extra="tabpane" key={i}>
                    <div className="rc-tabs-tabpane-inner">
                      <FaqList isTitle={false} more={true} faqData={faqDataSel} faqDataTotalCount={totalPage} onClick={pageChangeHandler} />
                    </div>
                  </TabPane>
                );
              })}
            </Tabs> */}
          </div>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-faq-wrap">
          <h3>고객센터</h3>
          <TabMenu type="type1" defaultTab={2} tabLink={tabLink}>
            <TabCont tabTitle="공지사항" id="tab1-1" index={0} />
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1} />
            <TabCont tabTitle="FAQ" id="tab1-3" index={2}>
              <p className="ex">더 궁금한 내용이 있으실 경우에는, 1:1 상담 메뉴를 이용해주세요.</p>
              <TabMenu type="type7" responsive={true} defaultTab={defaultTab}>
                {MenuData.map((v, i) => {
                  return (
                    <TabCont tabTitle={v.title} id={'tab7-' + i} index={i} key={i} onClick={() => tabCallback(i)}>
                    <table>
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
                                onClick={searchFaq}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                      <FaqList isTitle={false} faqData={faqDataSel} />
                    </TabCont>
                  );
                })}
              </TabMenu>
              <PageNavigator className="mt40" blockSize={10} currentPage={pageNo} recordCount={totalPage} recordSize={pageSize} changed={pageChangeHandler} />
            </TabCont>
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  );
};

Faq.propTypes = {
  router: PropTypes.any
};

export default withRouter(Faq);
