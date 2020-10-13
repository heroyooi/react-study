import { useState, useCallback } from 'react';
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import SwipeableInkTabBar from "rc-tabs/lib/SwipeableInkTabBar";

const MobEffect = ({withoutList}) => {
  const [tabKey, setTabKey] = useState(1);
  const tabCallback = useCallback(key => {
    if (+key < 2) {
      setTabKey('first');
    } else if (+key >= 2 && +key < 5) {
      setTabKey(key);
    } else {
      setTabKey('last');
    }
  }, []);

  return (
    <>
      <div className="dealer-adeffect-sec pb0">
          <ul className="admin-list-wrap">
            <li>
              <div className="goods-list admin-list tp4">
                <ul>
                  <li>
                    <span>
                      <div className="img-cover">
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
          <Tabs
            renderTabBar={() => <SwipeableInkTabBar pageSize={4} />}
            renderTabContent={() => <TabContent />}
            defaultActiveKey="1"
            onChange={tabCallback}
          >
            <TabPane tab="전체차량" data-extra="tabpane" key="1">
              {
                withoutList === true
                  ? (
                    <div className="list-none-wrap">
                      <p className="list-none">광고효과 분석은 차량 등록 후<br />48시간 이후 확인 하실 수 있습니다.</p>
                    </div>
                  ) : (
                    <table className="table-tp1 th-c td-c" summary="전체차량에 대한 내용">
                      <caption className="away">전체차량</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th></th>
                          <th>내차량</th>
                          <th>전체차량</th>
                          <th>전체차량<br />대비</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>클릭수<br />(일평균)</td>
                          <td className="tx-blue80">20회</td>
                          <td>15회</td>
                          <td className="tx-red80">10%<i className="ico-triangle-top"></i></td>
                        </tr>
                        <tr>
                          <td>관심<br />고객수</td>
                          <td className="tx-blue80">20회</td>
                          <td>15회</td>
                          <td className="tx-red80">3%<i className="ico-triangle-top"></i></td>
                        </tr>
                        <tr>
                          <td>콜수<br />(주간)</td>
                          <td className="tx-blue80">20회</td>
                          <td>15회</td>
                          <td className="tx-blue80">10%<i className="ico-triangle-bottom"></i></td>
                        </tr>
                        <tr>
                          <td>재고일수</td>
                          <td className="tx-blue80">20회</td>
                          <td>15회</td>
                          <td className="tx-blue80">-</td>
                        </tr>
                        <tr>
                          <td>광고가<br />(평균)</td>
                          <td className="tx-blue80">2,300만원</td>
                          <td>15회</td>
                          <td className="tx-red80">10%<i className="ico-triangle-top"></i></td>
                        </tr>
                      </tbody>
                    </table>
                  )
              }
            </TabPane>
            <TabPane tab="동일모델" data-extra="tabpane" key="2">

            </TabPane>
            <TabPane tab="동일등급" data-extra="tabpane" key="3">

            </TabPane>
            <TabPane tab="동일 세그먼트" data-extra="tabpane" key="4">

            </TabPane>
            <TabPane tab="Live Service 차량" data-extra="tabpane" key="5">

            </TabPane>
          </Tabs>
        </div>
    </>
  )
}

export default MobEffect;