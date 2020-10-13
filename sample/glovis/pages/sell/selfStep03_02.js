import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const SelfStep03_02 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '촬영기능 안내',
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
        <div className="photo-info-wrap">
          <TabMenu type="type2" mount={false}>
            <TabCont tabTitle="촬영안내" id="tab2-1" index={0}>
              <div className="content-wrap">
                <h4>사진등록 방법</h4>
                <p>차량 사진은 직접 촬영하신 사진 업로드, 오토벨 App을 통하여 업로드 하실 수 있습니다.</p>
                <p>오토벨 App을 이용하시면 편리하게 사진 촬영하시고 업로드 하실 수 있습니다. 업로드 이후 언제 어디에서나 계속 진행 하실 수 있습니다.</p>
                <div className="app-down">
                  <i className="ico-app"></i>
                  <Button color="blue80" title="오토벨앱 다운로드" href="#" />
                </div>

                <h4>촬영안내</h4>
                <div className="img-wrap"></div>
                <p>차량 외부 사진 촬영 시, 차량으로부터 2~3m정도 떨어져서 자세를 낮춘 상태에서  가이드 이미지에 맞춰 사진을 촬영하시면  멋진 사진이 나와요.</p>
                <p>연속촬영 선택 시, 차량외부 → 차량내부 → 스크래치샷 순으로 촬영이 계속 진행됩니다.</p>
                <p>어두운 환경(실내 주차장, 흐린날) 보다는 밝은 날 촬영해 주세요.</p>

                <h4>촬영예시</h4>
                <ul className="img-tx-wrap">
                  <li>
                    <div className="img-wrap"></div>
                  </li>
                  <li>
                    <span className="tx">높은 자세에서 촬영이 이뤄졌고, 가이드도 맞지 않네요.</span>
                  </li>
                  <li>
                    <div className="img-wrap"></div>
                  </li>
                  <li>
                    <span className="tx">가이드 맞춤 및 촬영구도가 완벽 합니다.</span>
                  </li>
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="360 촬영" id="tab2-2" index={1}>
              <div className="content-wrap">
                <h4>360 촬영이란?</h4>
                <p>라이브 스튜디오나 별도의 특수 촬영장비 없이 오토벨 App으로 간편하게 차량 외부 360 사진을 얻을 수 있습니다.</p>
                <p>제공해드리는 가이드  이미지를 따라 촬영을 하시면  자연스럽게 360도 사진을 얻을 수 있습니다.</p>

                <h4>촬영안내</h4>
                <div className="img-wrap"></div>
                <p>360 촬영은 차량 정면을 시작으로 운전석 방향으로 회전하며 12방향의 사진을 촬영하게 됩니다.</p>
                <div className="img-wrap"></div>
                <p>촬영 방향을 확인 하신 후, 가이드에 맞춰 촬영을 진행해 주세요.</p>
              </div>
            </TabCont>
            <TabCont tabTitle="차량외부" id="tab2-3" index={2}>
              <div className="content-wrap">
                <h4>차량전면</h4>
                <p>차량의 정면에서 자세를 낮춰 가이드에 맞게 촬영해 주세요.</p>
                <ul className="img-tx-wrap">
                  <li>
                    <div className="img-wrap"></div>
                  </li>
                  <li>
                    <span className="tx">높은 자세에서 촬영이 이뤄졌고, 가이드도 맞지 않네요.</span>
                  </li>
                  <li>
                    <div className="img-wrap"></div>
                  </li>
                  <li>
                    <span className="tx">가이드 맞춤 및 촬영구도가 완벽 합니다.</span>
                  </li>
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="차량내부" id="tab2-4" index={3}>
              <div className="content-wrap">
                <h4>사진명</h4>
                <ul className="img-tx-wrap">
                  <li>
                    <div className="img-wrap"></div>
                  </li>
                  <li>
                    <span className="tx">높은 자세에서 촬영이 이뤄졌고, 가이드도 맞지 않네요.</span>
                  </li>
                  <li>
                    <div className="img-wrap"></div>
                  </li>
                  <li>
                    <span className="tx">가이드 맞춤 및 촬영구도가 완벽 합니다.</span>
                  </li>
                </ul>
              </div>
            </TabCont>
          </TabMenu>
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

export default SelfStep03_02