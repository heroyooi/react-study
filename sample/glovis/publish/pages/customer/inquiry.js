import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import LoginPopup from '@src/components/common/popup/Login';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_CUSTOMER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const Inquiry = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_CUSTOMER });
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '1:1 상담',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#f6f7f8'
      }
    });
    return (
      <AppLayout>
        <div className="content-sec f-h2">
          <div className="help-inquiry-wrap pd20">
            <div className="inquiry-cont bg-white tx-c">
              <div className="ico-wrap">
                <i className="ico-inquiry"></i>
              </div>
              <div className="tit">
                <h4>궁금한 점이나, 불편한 점이 있으신가요?</h4>
                <p>오토벨 서비스 이용중, 궁금하시거나<br />불편한 사항을 1:1 문의로 남겨주세요.</p>
              </div>
              <div className="center-wrap">
                {/*고객센터 버튼 click 시 전화 자동 연결기능 요청*/}
                <Button size="mid" background="blue80" radius={true} title="오토벨 고객센터 1600-0000" width={198} height={40} />
                <ul>
                  <li>평일 00:00~00:00</li>
                  <li>주말/공휴일 OFF</li>
                </ul>
              </div>                            
            </div>
          </div>
          <Button className="fixed" size="full" background="blue80" title="1:1 문의하기" href="/member/loginPopup" />
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-inquiry-wrap">
          <h3>고객센터</h3>
          
          <TabMenu type="type1" defaultTab={1} tabLink={[
              { index: 0, url: '/customer/noticeList' }, 
              { index: 1, url: '/customer/inquiry' }, 
              { index: 2, url: '/customer/faq' }
              
            ]}>
            <TabCont tabTitle="공지사항" id="tab1-1" index={0}></TabCont>
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1}>
              <div className="tit">
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
            <Button size="big" background="blue80" title="1:1 문의하기" width={180} height={60} onClick={(e) => rodalPopupHandler1(e, "fade")} />
          </Buttons>
        </div>
      </div>

      <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="small" title="로그인">
        <LoginPopup />
      </RodalPopup>
    </AppLayout>
  )
}

export default Inquiry