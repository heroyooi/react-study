import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { auction_check_term } from '@src/dummy/terms';


const termsView = ({ router }) => {
  const { seq } = router.query;
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '스마트옥션 경매약관 및 주의사항',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 60,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>        
        <div className="member-terms-wrap">
          <div className="view-wrap">
            <div className="content">
              {auction_check_term[seq]}
            </div>                      
            <Button className="fixed" size="full" background="blue80" title="확인" href="/autoAuction/exhibitStep01" nextLink={true} />
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
export default withRouter(termsView);