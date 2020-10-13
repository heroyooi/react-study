import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button'
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

// Components (Only Mobile)
import MobSelectBox from '@lib/share/items/MobSelectBox';

const PricingSpecify = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_PRICING_SYSTEM });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '상세사양',
        options: ['close']
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
        <div className="content-wrap market-view-sec pt14 pb76">
          <h3 className="tit2 mb16">M37 스탠다드</h3>
          <div className="essential-point">
            <ul>
              <li><i className="ico-dot"></i>3.7리터 24벨브 V6</li>
              <li><i className="ico-dot"></i>전자 제어식 7단 자동 변속기</li>
              <li><i className="ico-dot"></i>후륜구동</li>
              <li><i className="ico-dot"></i>어댑티브 프론트 라이팅 시스템</li>
              <li><i className="ico-dot"></i>HID 바이 제논 헤드램프 (오토 레벨링 기능 포함)</li>
              <li><i className="ico-dot"></i>헤트 램프 워셔</li>
              <li><i className="ico-dot"></i>프론트 도어 핸들 웰컴 라이팅 시스템</li>
              <li><i className="ico-dot"></i>속도 감응형 레인 센싱 플랫 블레이드 와이퍼</li>
              <li><i className="ico-dot"></i>파워 썬루프</li>
              <li><i className="ico-dot"></i>스크래치 쉴드 페인트</li>
              <li><i className="ico-dot"></i>리어 LED 콤비네이션 램프</li>
              <li><i className="ico-dot"></i>알로이 휠 18인치</li>
              <li><i className="ico-dot"></i>다기능 메모리 기능이 탑재된 인텔리전트 키</li>
              <li><i className="ico-dot"></i>푸시 스타트 스톱 버튼 (조명 기능 포함)</li>
              <li><i className="ico-dot"></i>4단계 드라이브 모드 셀렉터<br />(ECO. SPORT. STANDARD. SNOW 4가지 모드)</li>
              <li><i className="ico-dot"></i>마일드 플로우 통풍구</li>
              <li><i className="ico-dot"></i>10방향 앞좌석 통풍 파워 시트(럼버 서포트 포함)</li>
              <li><i className="ico-dot"></i>이지 엔트리. 인텔리전트 포지셔닝 시스템</li>
            </ul>
          </div>
        </div>

        <Button className="fixed" size="full" background="blue80" title="확인" height={56} />
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default PricingSpecify;
