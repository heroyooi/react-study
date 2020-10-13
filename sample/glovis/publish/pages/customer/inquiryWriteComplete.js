import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_CUSTOMER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const inquiryWriteComplete = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_CUSTOMER });
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '1:1 상담',
        options: ['back']
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
      <div className="content-sec f-h1">
        <div className="help-inquiry-wrap pd20">
          <div className="inquiry-cont bg-white tx-c"> 
            <div className="tit">
              <h4>등록이 완료되었습니다.</h4>
              <p>문의 내역은 [마이페이지>1:1상담]에서<br />확인하실 수 있습니다.</p>
            </div>
            <div className="step-btn center">
              <Buttons align="center" marginTop={20}>
                <Button size="mid" line="gray" color="darkgray" radius={true} title="메인" width={126} href="/main" nextLink={true} />
                <Button size="mid" background="blue80" radius={true} title="마이페이지" width={126} />
              </Buttons>  
            </div>                                      
          </div>
        </div>        
      </div>
    </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default inquiryWriteComplete