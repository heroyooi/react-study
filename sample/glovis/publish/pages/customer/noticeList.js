import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import PageNavigator from '@src/components/common/PageNavigator';
import Button from '@lib/share/items/Button';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import { SECTION_CUSTOMER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const NoticeList = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_CUSTOMER });
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
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
    const noticeList = [
      {
        type: 'notice',
        link: '/customer/noticeView',
        tag: '시스템',
        title: '추석 휴무일공지 및 경매일정변경 안내',
        file: '',
        date: '2020.05.28'
      },
      {
        number: 32,
        type: 'normal',
        link: '/customer/noticeView',
        tag: '시스템',
        title: '성능점검 기준 변경 공지',
        date: '2020.05.28'
      },
      {
        number: 31,
        type: 'normal',
        link: '/customer/noticeView',
        title: '성능점검 기준 변경 공지',
        date: '2020.05.27'
      },
      {
        number: 30,
        type: 'normal',
        link: '/customer/noticeView',
        tag: '시스템',
        title: '성능점검 기준 변경 공지',
        date: '2020.05.27'
      },
      {
        number: 29,
        type: 'normal',
        link: '/customer/noticeView',
        title: '성능점검 기준 변경 공지',
        date: '2020.05.27'
      }
    ];
    
    const dummyData = {
      number: 28,
      type: 'normal',
      link: '/customer/noticeView',
      title: '성능점검 기준 변경 공지',
      date: '2020.05.27'
    }
    const [listData, setListData] = useState(noticeList);
    const handleMore = (e) => {
      e.preventDefault();
      setListData(listData => [...listData, dummyData, dummyData, dummyData, dummyData, dummyData])
    }
    return (
      <AppLayout>        
        <div className="content-wrap help-notice-wrap">
          <table summary="결제 정보에 대한 내용" className="table-tp2 pd20">
            <caption className="away">공지사항</caption>
            <colgroup>
              <col width="50px" />
              <col width="*" />              
            </colgroup>
            <tbody>
              {listData.map((v, i) => {
                return (
                  <tr key={i}>
                    <th>{v.type === "normal" ? v.number : <span className="notice">공지</span>}</th>
                    <td>
                      <Link href={v.link}><a>
                        {v.tag && <span className="tx-blue80">[{v.tag}]</span>}
                        {v.title}
                      </a></Link>
                      {v.file && <i className="ico-file"></i>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* backup 주석 삭제하지마세요.
          <ul>
            <li>
              <Link href="/customer/noticeview">
                <a className="notice-cont">
                  <span className="notice">공지</span>
                  <span className="txt"><em className="tx-blue80">[시스템]</em>성능점검 기준 변경 공지<i className="ico-file"></i></span>
                  <span className="date">2019.11.25</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/customer/noticeview">
                <a className="notice-cont">
                  <span className="num">32</span>
                  <span className="txt"><em>[시스템]</em>성능점검 기준 변경 공지</span>
                  <span className="date">2019.11.25</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/customer/noticeview">
                <a className="notice-cont">
                  <span className="num">32</span>
                  <span className="txt"><em>[시스템]</em>성능점검 기준 변경 공지</span>
                  <span className="date">2019.11.25</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/customer/noticeview">
                <a className="notice-cont">
                  <span className="num">31</span>
                  <span className="txt">추석 휴무일공지 및 경매일정변경 안내<i className="ico-file"></i></span>
                  <span className="date">2019.11.25</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/customer/noticeview">
                <a className="notice-cont">
                  <span className="num">30</span>
                  <span className="txt">추석 휴무일공지 및 경매일정변경 안내</span>
                  <span className="date">2019.11.25</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/customer/noticeview">
                <a className="notice-cont">
                  <span className="num">29</span>
                  <span className="txt">추석 휴무일공지 및 경매일정변경 안내</span>
                  <span className="date">2019.11.25</span>
                </a>
              </Link>
            </li>
          </ul>
          */}
          <div className="mt16">
            <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} lineHeight={40} fontSize={14} onClick={handleMore} />
          </div>         
        </div>        
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-notice-wrap">
          <h3>고객센터</h3>
          
          <TabMenu type="type1" defaultTab={0} tabLink={[
              { index: 0, url: '/customer/noticeList' }, 
              { index: 1, url: '/customer/inquiry' }, 
              { index: 2, url: '/customer/faq' }
              
            ]}>
            <TabCont tabTitle="공지사항" id="tab1-1" index={0}>
              <table summary="결제 정보에 대한 내용" className="table-tp1 th-c td-c">
                <caption className="away">공지사항</caption>
                <colgroup>
                  <col width="10%" />
                  <col width="77%" />
                  <col width="13%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="notice">공지</span></td>
                    <td><Link href="/customer/noticeview"><a><span className="tx-blue80">[시스템]</span>성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td><span className="notice">공지</span></td>
                    <td><Link href="/customer/noticeview"><a><span className="tx-blue80">[시스템]</span>오토옥션 증강현실앱 서비스 오픈</a></Link><i className="ico-file"></i></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/customer/noticeview"><a><span className="tx-blue80">[공지분류]</span>성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                </tbody>
              </table>
              <PageNavigator recordCount={50} className="mt40" />
            </TabCont>
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1}></TabCont>
            <TabCont tabTitle="FAQ" id="tab1-3" index={2}></TabCont>
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  )
}

export default NoticeList