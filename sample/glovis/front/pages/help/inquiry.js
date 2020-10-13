import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

const inquiry = () => {
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-inquiry-wrap">
          <h3>고객센터</h3>
          
          <TabMenu type="type1" defaultTab={1} tabLink={[
              { index: 0, url: '/help/noticelist' }, 
              { index: 1, url: '/help/inquiry' }, 
              { index: 2, url: '/help/faq' }
              
            ]}>
            <TabCont tabTitle="공지사항" id="tab1-1" index={0}></TabCont>
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1}>
              <div className="title">
                <h4>궁금한 점이나, 불편한 점이 있으신가요?</h4>
                <p>오토벨 서비스 이용중, 궁금하시거나 불편한 사항을 1:1 문의로 남겨주세요.</p>
              </div>
              <div className="ico-wrap">
                <i className="ico-inquiry"></i>
              </div>
              <div className="center-wrap">
                <p>오토벨 고객센터<span className="num">1600-000</span></p>
                <ul>
                  <li>평일 00:00~00:00</li>
                  <li>주말/공휴일 OFF</li>
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="FAQ" id="tab1-3" index={2}></TabCont>
          </TabMenu>
          <Buttons align="center">
            <Button size="big" background="blue80" title="1:1 문의하기" width={180} height={60} href="/help/inquiryWrite"/>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default inquiry