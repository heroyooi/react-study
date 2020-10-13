import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerOuto01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        
      </div>
    </AppLayout>
  )
}

export default DealerOuto01