import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

const Help = () => {
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-contents">
          <h3>고객센터</h3>
          
          <TabMenu type="type1" defaultTab={0} tabLink={[
              { index: 0, url: '/help/notice' }, 
              { index: 1, url: '/help/inquiry' }, 
              { index: 2, url: '/help/faq' }
              
            ]}>
            <TabCont tabTitle="공지사항" id="tab1-1" index={0}></TabCont>
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1}></TabCont>
            <TabCont tabTitle="FAQ" id="tab1-3" index={2}></TabCont>
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  )
}

export default Help