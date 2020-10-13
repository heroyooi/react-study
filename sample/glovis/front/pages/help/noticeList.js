import AppLayout from '@src/components/layouts/AppLayout';
import Link from 'next/link'

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import PageNavigator from '@src/components/common/PageNavigator'
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

const NoticeList = () => {
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-notice-wrap">
          <h3>고객센터</h3>
          
          <TabMenu type="type1" defaultTab={0} tabLink={[
              { index: 0, url: '/help/noticelist' }, 
              { index: 1, url: '/help/inquiry' }, 
              { index: 2, url: '/help/faq' }
              
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
                    <td><Link href="/help/noticeview"><a><span className="tx-blue80">[시스템]</span>성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td><span className="notice">공지</span></td>
                    <td><Link href="/help/noticeview"><a><span className="tx-blue80">[시스템]</span>스마트옥션 증강현실앱 서비스 오픈</a></Link><i className="ico-file"></i></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a>[시스템]성능점검 기준 변경 공지</a></Link></td>
                    <td>2013.05.28</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td><Link href="/help/noticeview"><a><span className="tx-blue80">[공지분류]</span>성능점검 기준 변경 공지</a></Link></td>
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