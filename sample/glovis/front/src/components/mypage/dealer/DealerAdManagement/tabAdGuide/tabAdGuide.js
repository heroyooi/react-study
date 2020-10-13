import { useState, useCallback, createContext, memo } from 'react';
import Router from 'next/router';
import qs from 'qs';
import { CSSTransition } from 'react-transition-group';

import Button from '@lib/share/items/Button';
import useToggle from '@lib/share/custom/useToggle';

import UsingTicketList from './UsingTicketList'
import FreeTicketList from './FreeTicketList'
import UpdateTicketList from './UpdateTicketList'
import PricingTicketList from './PricingTicketList'
import EtcTicketListItems from './EtcTicketListItems'

import { setComma } from '@src/utils/StringUtil';

const tabAdGuide = ({ params, eventHandler, advStore, memberInfo = {} }) => {
  const {
    usingTicketList = {},
    free = [],
    update = [],
    pricing = [],
    auction = [],
    perCar = [],

    financeData = [],
    importData = [],
    superiorData = [],
  } = advStore
  const { mbPrtnDvcd  } = memberInfo
  
  console.log("tabAdGuide -> financeData", financeData)
  console.log("tabAdGuide -> importData", importData)
  console.log("tabAdGuide -> superiorData", superiorData)
  const [usageDetailMore1, handleUsageDetail1] = useToggle(false);
  // console.log("tabAdGuide -> usingTicketList", usingTicketList)
  // console.log("tabAdGuide -> free", free)
  // console.log("tabAdGuide -> update", update)
  // console.log("tabAdGuide -> pricing ", pricing )
  const [usageDetailMore2, handleUsageDetail2] = useToggle(false);
  const [usageDetailMore3, handleUsageDetail3] = useToggle(false);
  const [usageDetailMore4, handleUsageDetail4] = useToggle(false);


  const goPurchagePage = (tag) => {
    Router.push(
      `/mypage/dealer/sellcar/carManagement` +
        '?' +
        qs.stringify({
          ...params,
          sub: 2
        }) + tag
    );
  }

  return (
    <div className="payment-sec">
      <h3 className="sub-tit">사용중인 이용권</h3>
      
      <UsingTicketList item={usingTicketList} />

      <h3 className="sub-tit">상품 안내</h3>
      <div className="usage-wrap">
        <p className="tag-tp5">차량등록상품</p>
        <div className="tx-list">
          <ul>
            <li>
              <h5>경매 낙찰 이용권</h5>
              <p>오토벨 경매장에서 낙찰받은 차량을 광고로 등록하실 수 있는 이용권입니다.</p>
              <span className="period">최대 2개월</span>
              <span className="price">{setComma(auction[0]?.prdSlAmt)}원</span>
            </li>
            <li>
              <h5>대당 이용권</h5>
              <p>
                차량 1대를 등록할 수 있는 이용권입니다.
                <span>* 일반등록차량 리스트에 노출됩니다.</span>
              </p>
              <span className="period">최대 2개월</span>
              <span className="price">{setComma(perCar[0]?.prdSlAmt)}원</span>
            </li>
            <li>
              <h5>
                자유 이용권
                <Button
                  size="sml"
                  background="blue80"
                  radius={true}
                  title="구입하기"
                  width={64}
                  marginLeft={16}
                  buttonMarkup={true}
                  onClick={() => {
                    goPurchagePage('#free')
                  }}
                />
              </h5>
              <p>
                선택 기간 동안 선택한 차량 대수를 등록할 수 있는 이용권입니다.
                <span>
                  * 일반등록차량 리스트에 노출됩니다.
                  <br />* 등록차량이 판매완료 시, 기간이 남았다면 다른 차량을 등록할 수 있습니다.
                </span>
              </p>
              <span className="period">1개월 ~ 12개월</span>
              <span className="price">27,000원~</span>

              <CSSTransition in={usageDetailMore1} timeout={300} classNames={'fade'} unmountOnExit>
                <FreeTicketList items={free}/>
              </CSSTransition>
              <button className={usageDetailMore1 ? 'tx-btn active' : 'tx-btn'} onClick={handleUsageDetail1}>
                {usageDetailMore1 ? '접기' : '상세보기'}
              </button>
            </li>
            
            {
              mbPrtnDvcd === '0030' &&
              <EtcTicketListItems
                items={superiorData}
                name="우량업체"
              />
            }


            {
              mbPrtnDvcd === '0010' &&
              <EtcTicketListItems
                items={importData}
                name="수입인증 중고차 법인 업체"
              />
            }

            {
              mbPrtnDvcd === '0020' &&
              <EtcTicketListItems
                items={financeData}
                name="금융사"
              />
            }
          </ul>
        </div>
      </div>




      <div className="usage-wrap">
        <p className="tag-tp5">부가상품</p>
        <div className="tx-list">
          <ul>
            {/* <li>
              <h5>Bestpick 이용권</h5>
              <p>사이트 메인 ‘Bestpick’영역에 차량 한 대를 등록/노출 할 수 있는 이용권입니다.</p>
              <span className="period">12시간 ~ 72시간</span>
              <span className="price">100,000원~</span>
              
                    <CSSTransition
                    in={usageDetailMore2}
                    timeout={300}
                    classNames={'fade'}
                    unmountOnExit
                    >
                    <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
                        <caption className="away">자유 이용권 상품 상세 내역</caption>
                        <colgroup>
                        <col width="12.5%" />
                        <col width="12.5%" />
                        <col width="12.5%" />
                        <col width="12.5%" />
                        <col width="12.5%" />
                        <col width="12.5%" />
                        <col width="12.5%" />
                        <col width="12.5%" />
                        </colgroup>
                        <thead>
                        <tr>
                            <th></th>
                            <th>12시간</th>
                            <th>24시간</th>
                            <th>48시간</th>
                            <th>72시간</th>
                            <th>1주일</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>1대</th>
                            <td>27,000</td>
                            <td>138,000</td>
                            <td>276,000</td>
                            <td>414,000</td>
                            <td>552,000</td>
                            <td>828,000</td>
                            <td>1,380,000</td>
                        </tr>
                        </tbody>
                    </table>
                    </CSSTransition>
                    <button className={usageDetailMore2 ? "tx-btn active" : "tx-btn"} onClick={handleUsageDetail2}>{usageDetailMore2 ? "접기" : "상세보기"}</button> 
            </li> */}
            <li>
              <h5>업데이트 20 (대당)</h5>
              <p>
                차량 업데이트를 추가로 20회 할 수 있는 이용권입니다.
                <br />
                무료 4회 포함 24회 업데이트 할 수 있습니다.
              </p>
              <span className="period">한 대당</span>
              <span className="price">10,000원</span>
            </li>
            <li>
              <h5>
                업데이트 20 (자유)
                <Button
                  size="sml"
                  background="blue80"
                  radius={true}
                  title="구입하기"
                  width={64}
                  marginLeft={16}
                  buttonMarkup={true}
                  onClick={() => {
                    goPurchagePage('#update20')
                  }}
                />
              </h5>
              <p>
                선택 기간 동안 선택한 차량 대 수 만큼 추가로 20회 업데이트할 수 있는
                <br />
                이용권입니다.
              </p>
              <span className="period">1개월 ~ 12개월</span>

              <CSSTransition in={usageDetailMore3} timeout={300} classNames={'fade'} unmountOnExit>
                <UpdateTicketList items={update}/>
              </CSSTransition>
              <button className={usageDetailMore3 ? 'tx-btn active' : 'tx-btn'} onClick={handleUsageDetail3}>
                {usageDetailMore3 ? '접기' : '상세보기'}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="usage-wrap">
        <p className="tag-tp5">프라이싱상품</p>
        <div className="tx-list">
          <ul>
            <li>
              <h5>
                프라이싱 조회권
                <Button
                  size="sml"
                  background="blue80"
                  radius={true}
                  title="구입하기"
                  width={64}
                  marginLeft={16}
                  buttonMarkup={true}
                  onClick={() => {
                    goPurchagePage('#pricing')
                  }}
                />
              </h5>
              <p>스마트옥션에서 실제 거래되었던 차량의 낙찰가를 확인할 수 있는 이용권입니다.</p>
              <span className="period">12시간 ~ 72시간</span>
              <span className="price">100,000원~</span>

              <CSSTransition in={usageDetailMore4} timeout={300} classNames={'fade'} unmountOnExit>
                <PricingTicketList items={pricing}/>
              </CSSTransition>
              <button className={usageDetailMore4 ? 'tx-btn active' : 'tx-btn'} onClick={handleUsageDetail4}>
                {usageDetailMore4 ? '접기' : '상세보기'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(tabAdGuide);
