import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_MYPAGE } from '@src/actions/types';

/*
html 변경이력
  03.17 : 가격 및 차량소개와 성능점검 서로 위치 바뀜 
*/

const DealerSell02_09 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={6} /> {/* 가격 및 차량소개와 성능점검 서로 위치 바뀜  */}
          </div>
          <div className="co-wrap">
            <p className="tit">등록이 완료되었습니다.</p>
            <p className="exp">등록 현황은 마이페이지에서 확인이 가능합니다.</p>
            <Buttons align="center" marginTop={80}>
              <Button size="big" line="blue80" color="blue80" title="등록차량 관리로 이동" width={200} height={60} />
              <Button size="big" background="blue80" title="확인" width={200} height={60} />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerSell02_09