import { useSelector, useDispatch } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

/*
  html 변경이력
  03.10 : #a1 참고 septs 항목추가     
*/

const FreeStep03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '무평가 판매',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap co-wrap">
          <p className="tit">무평가 판매 신청이<br />완료되었습니다.</p>
          <p className="exp">
          신청하신 정보는 마이페이지에서 확인이 가능하며,<br />
          등록해주신 연락처로 견적안내를 드립니다.<br />
          감사합니다.
        </p>
          <div className="co-result">
            <p className="num">신청번호 : <span>XXXXXXXNNNXXX</span></p>
            <p className="sub">(마이페이지 현황 조회하시려면 신청번호가 필요합니다.)</p>
          </div>
          <Buttons align="center" marginTop={16}>
            <Button size="sml" background="blue80" radius={true} title="마이페이지로 이동" width={108} href="#" />
          </Buttons>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" href="/main" />
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>무평가 판매</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps type={2} contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인' , '신청 완료']} active={5} />
        </div>
      </div>
      <div className="content-wrap">
        <div className="co-wrap">
          <p className="tit">무평가 판매 신청이 완료되었습니다!</p>
          <p className="exp">
            신청하신 정보는 마이 페이지에서 확인이 가능하며<br />
            고객님의 연락처로 상담원이 안내 드립니다.<br />
            감사합니다.
          </p>
          <div className="co-result">
            <p className="num">신청 번호 : <span>1928375GHS293</span></p>
            <p className="sub">마이 페이지에서 현황을 확인하시려면 신청 번호가 필요합니다.</p>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="확인" width={172} height={60} href="/main" />
            <Button size="big" background="blue80" title="마이 페이지" width={172} height={60} />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default FreeStep03