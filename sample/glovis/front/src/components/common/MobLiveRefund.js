import React, { memo } from 'react';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';

const MobLiveRefund = memo(() => {
  return (
    <div className="live-refund-sec">
      <div className="mypage-admin-title">
        <p className="tx-exp-tp5">&#8251; 카드결제 취소는 위약금을 제외 후 부분취소 됩니다.</p>
        <p className="tx-exp-tp5">&#8251; 무통장입금 환불요청 시 입금자의 통장사본이 필요하며, 통장사본 접수 이후 최대 7일(영업일 기준) 이내 환불 완료됩니다.</p>
      </div>
      <TabMenu type="type2" defaultTab={0} mount={false}>
        <TabCont tabTitle="Live Studio" id="tab2-1" index={0}>
          <div className="popup-refund">
            <p className="tit3 mb16">
              <i className="ico-dot" /> 전일예약
            </p>
            <table summary="전일예약에 대한 내용" className="table-tp1 th-c">
              <colgroup>
                <col width="65%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th>내용</th>
                  <th>취소위약금</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>결제당일 영업시간(18:00) 이전까지</td>
                  <td>전액환불</td>
                </tr>
                <tr>
                  <td>결제당일 영업시간(18:00) 이후부터 ~ 예약시간 1시간 전까지</td>
                  <td>
                    위약금
                    <br />
                    10%공제 후 환불
                  </td>
                </tr>
                <tr>
                  <td>예약시간 1시간 전 ~ 예약시간 30분 전까지</td>
                  <td>
                    위약금
                    <br />
                    50%공제 후 환불
                  </td>
                </tr>
                <tr>
                  <td>예약시간 30분전 ~ 예약시간 경과 후</td>
                  <td>환불불가</td>
                </tr>
              </tbody>
            </table>

            <p className="tit3 mb16">
              <i className="ico-dot" /> 당일예약
            </p>
            <table summary="전일예약에 대한 내용" className="table-tp1 th-c">
              <colgroup>
                <col width="65%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th>내용</th>
                  <th>취소위약금</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>예약시간 1시간 전까지</td>
                  <td>
                    위약금
                    <br />
                    10%공제 후 환불
                  </td>
                </tr>
                <tr>
                  <td>예약시간 1시간 전 ~ 예약시간 30분전 까지</td>
                  <td>
                    위약금
                    <br />
                    50%공제 후 환불
                  </td>
                </tr>
                <tr>
                  <td>예약시간 30분전 ~ 예약시간 경과 후</td>
                  <td>환불불가</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabCont>
        <TabCont tabTitle="Live Shot" id="tab2-2" index={1}>
          <div className="popup-refund">
            <p className="tit3 mb16">
              <i className="ico-dot" /> 전일예약
            </p>
            <table summary="전일예약에 대한 내용" className="table-tp1 th-c">
              <colgroup>
                <col width="65%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th>내용</th>
                  <th>취소위약금</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>결제당일 영업시간(18:00) 이전까지</td>
                  <td>전액환불</td>
                </tr>
                <tr>
                  <td>결제당일 영업시간(18:00) 이후부터 ~ 예약시간 1시간 전까지</td>
                  <td>
                    위약금
                    <br />
                    10%공제 후 환불
                  </td>
                </tr>
                <tr>
                  <td>예약시간 1시간 전 ~ 예약시간 30분 전까지</td>
                  <td>
                    위약금
                    <br />
                    50%공제 후 환불
                  </td>
                </tr>
                <tr>
                  <td>예약시간 30분전 ~ 예약시간 경과 후</td>
                  <td>환불불가</td>
                </tr>
              </tbody>
            </table>

            <p className="tit3 mb16">
              <i className="ico-dot" /> 당일예약
            </p>
            <table summary="전일예약에 대한 내용" className="table-tp1 th-c">
              <colgroup>
                <col width="65%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th>내용</th>
                  <th>취소위약금</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>예약시간 1시간 전까지</td>
                  <td>
                    위약금
                    <br />
                    10%공제 후 환불
                  </td>
                </tr>
                <tr>
                  <td>예약시간 1시간 전 ~ 예약시간 30분전 까지</td>
                  <td>
                    위약금
                    <br />
                    50%공제 후 환불
                  </td>
                </tr>
                <tr>
                  <td>예약시간 30분전 ~ 예약시간 경과 후</td>
                  <td>환불불가</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabCont>
      </TabMenu>
    </div>
  );
});

MobLiveRefund.displayName = 'MobLiveRefund';
export default MobLiveRefund;
