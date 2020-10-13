import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';

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
              <div className="view-wrap">
                <div className="header">
                  <h5>[시스템]성능점검 기준 변경 공지</h5>
                  <span><i className="ico-file"></i>성능점검 부분 개선 안내.pdf</span>
                </div>
                <div className="content">
                  안녕하십니까? 항상 저희 경매장을 애용해 주신 고객 여러분께 진심으로 감사드립니다.<br />
                  저희 경매장은 경매장을 이용하시는 고객분들의 소중한 재산이자 자산인 자동차에 대해 객관적이고 정확한 성능점검을 실시하기 위해 끊임 없는 연구와 노력을 경주하고 있습니다.<br />
                  이러한 노력의 결과로 성능점검 기준에 대한 개선작업을 일부 변경하오니 첨부된 파일을 참조하여 주시기 바랍니다.<br />
                  감사합니다.<br />
                  <br />
                  - 시행일시 : 2013년 6월 10일 부(6월 11일 분당 633회 경매부터 적용)
                </div>
                <ul className="list-wrap">
                  <li><span>이전 글<i className="ico-sel-arrow"></i></span>[시스템]스마트옥션 증강현실앱 서비스 오픈</li>
                  <li><span>다음 글<i className="ico-sel-arrow"></i></span>다음 글이 없습니다.</li>
                </ul>
                <Button size="mid" background="blue80" title="목록" width={120} height={48}/>
              </div>
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