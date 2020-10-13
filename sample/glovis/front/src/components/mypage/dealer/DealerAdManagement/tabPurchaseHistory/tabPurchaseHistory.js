import { useState, useContext, useEffect, createElement, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Radio from '@lib/share/items/Radio'

import FilterTable from '@src/components/mypage/dealer/DealerAdManagement/tabPurchaseHistory/FilterTable'
import PageNavigator from '@src/components/common/PageNavigator';
import { setComma } from '@src/utils/StringUtil';
import { getEvidenceAction } from '@src/actions/mypage/dealer/dealerAdverAction';
import { SystemContext } from '@src/provider/SystemProvider';
import { INIStdPayCancelRequest } from '@src/api/common/payment';

const globalThis = require('globalthis')();

const paymentMethods = [
  {code:"01", label: "신용카드"},
  {code:"02", label: "휴대전화"},
  {code:"03", label: "무통장입금"},
  {code:"04", label: "쿠폰/포인트"},
  {code:"05", label: "간편결제"},
]

const services = [
  {code:"01", label: "서비스1"},
  {code:"02", label: "서비스2"},
  {code:"03", label: "서비스3"},
  {code:"04", label: "서비스4"},
  {code:"05", label: "서비스5"},
]

const evidences = [
  {code:"01", label: "현금영수증"},
  {code:"02", label: "세금계산서"},
]

const periodList = [
  {title:"3개월", code:"3month" },
  {title:"1개월", code:"1month" },
  {title:"15일", code:"15days" },
  {title:"1주일", code:"1week" },
  {title:"오늘", code:"today" },
]

const tabPurchaseHistory = ({params, eventHandler, advStore}) => {
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm, showLoginForm } = useContext(SystemContext);
  const { currentPage, viewPageCnt = 10, order, by, payments, service, startDt, endDt, period} = params
  const dispatch = useDispatch();
  const [displayPayment, setDisplayPayment, showPayment, hidePayment] = useRodal(false, true);
  const [displayHistory, setDisplayHistory, showHistory, hideHistory] = useRodal(false, true);
  const [displayEvidence, setDisplayEvidence, showEvidence, hideEvidence] = useRodal(false, true);
  const { totalcnt = "0", paymentList=[] } = advStore
  const [ paymentItem, setPaymentItem ] = useState()
  const [ evidenceItem, setEvidenceItem ] = useState()

  const showHistoryPop = async (e, item) => {
    setPaymentItem(item)
    showPayment(true) 
  }

  const showBillsPop = async (e, item) => {
    console.log("showBillsPop -> e ", e )
    console.log("showBillsPop -> item", item)
    // const { evidence } = await dispatch(getEvidenceAction(item.paymentNo))
    // console.log("showBillsPop -> evidence ", evidence )

    // setEvidenceItem(evidence)
    showEvidence(true)
  }

  const checkEvidence= (e) => {
    console.log('checkEvidence e : ', e)
  }

  const print = () => {
    console.log('print')
    globalThis?.window?.print()
  }

  const cancel = async (e, item) => {
    console.log('cancel : ', item)
    showConfirm('취소하시겠습니까?', async () => {
      const result = await INIStdPayCancelRequest(item).then(res => res?.data)
      console.log("tabPurchaseHistory -> result", result)


    })
  }

  return (
    <>
      <FilterTable
        params={params}
        onSubmit={eventHandler}
      />

      <div className="payment-tx-list">
        <p className="inquire-num">결제완료건 수 : 총 {paymentList?.length}건</p>
        <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
          <caption className="away">결제내역</caption>
          <colgroup>
            <col width="12%" />
            <col width="14%" />
            <col width="*" />
            <col width="16%" />
            <col width="18%" />
            <col width="13%" />
          </colgroup>
          <thead>
            <tr>
              <th>결제일</th>
              <th>결제번호</th>
              <th>결제내용</th>
              <th>결제금액</th>
              <th>결제수단</th>
              <th>영수증/증빙</th>
            </tr>
          </thead>
          {
              <tbody>
                {
                  paymentList?.length ?
                    paymentList.map((payment,i) =>
                      <tr key={i}>
                        <td>{payment.payDt}</td>
                        <td>{payment.odrNum}</td>
                        <td>
                          <span onClick={(e) => showHistoryPop(e, payment)}>
                            {payment.prdNm}
                          </span>
                        </td>
                        <td>{setComma(payment.payAmt)}원</td>
                        <td>
                          {payment.cdNm}
                          {/* {
                            <>
                              <br/>
                              <Button
                                size="sml"
                                line="gray"
                                color="black"
                                radius={true}
                                title="승인취소"
                                className="fr"
                                buttonMarkup={true}
                                onClick={(e) => cancel(e, payment)}
                              />
                            </>
                          } */}
                        </td>
                        <td>
                          <span onClick={(e) => showBillsPop(e, payment)}>
                            현금영수증
                            {/* {evidences.find(evidence => evidence.code == payment.evidence)?.label || ""} */}
                          </span>
                        </td>
                      </tr>
                    )
                  :
                    <tr className="list-none">
                      <td colSpan="6">결제내역이 없습니다.</td>
                    </tr>
                }
              </tbody>
          }
        </table>
        <PageNavigator
          recordCount={parseInt(totalcnt)}
          recordSize={parseInt(viewPageCnt)}
          className="mt32"
          currentPage={parseInt(currentPage)}
          changed={(e, currentPage) =>
            eventHandler({
              currentPage
            })
          }
        />
        
      </div>

      <div className="essential-point">
        <p>꼭 알아두세요!</p>
        <ul>
          <li><i className="ico-dot mid"></i> 신용카드로 결제 시 카드매출전표가 발급되며, 세금계산서 대용으로 매입세액공제를 받으실 수 있습니다.</li>
          <li><i className="ico-dot mid"></i> 휴대전화로 결제 후 다음 달, 휴대전화 요금을 납부하면 명의자의 주민등록 번호로 현금영수증이 자동발행됩니다.<span className="add-exp">- 단, 휴대전화 결제금액을 신용카드로 납부 시에는 발행되지 않습니다.</span></li>
          <li><i className="ico-dot mid"></i> 무통장입금 완료 후 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다. (결제 후 다음 달 5일까지)</li>
          <li><i className="ico-dot mid"></i> 현금영수증 신청 시 세금계산서 대용으로 매입세액공제를 받으시려면 지출증빙용으로 신청해 주세요.</li>
          <li><i className="ico-dot mid"></i> 세금계산서 신청 시 기재하신 이메일로 전자 세금계산서를 발송해 드립니다. (우편 발송은 불가)</li>
          <li><i className="ico-dot mid"></i> 세금계산서 문의 : 고객센터 ()</li>
        </ul>
      </div>

      <RodalPopup
        show={displayPayment}
        type={'fade'}
        title="결제내역 상세보기"
        closedHandler={hidePayment}
        mode="normal" size="small"
        className="printing-sec"
      >
        <div className="con-wrap popup-payment">
          <h4>상세 결제내역</h4>
          <table summary="상세 결제내역에 대한 내용" className="table-tp1">
            <caption className="away">상세 결제내역</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>{paymentItem?.odrNum}</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>{paymentItem?.payDt}</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>{paymentItem?.prdNm}</td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>{setComma(paymentItem?.prdSlAmt)}</td>
              </tr>
              <tr>
                <th>자동연장 할인</th>
                <td>{setComma(paymentItem?.dcAmt)}</td>
              </tr>
              <tr>
                <th>쿠폰 할인</th>
                <td>{setComma(paymentItem?.couponDiscount)}</td>
              </tr>
              <tr>
                <th>포인트 사용</th>
                <td>{setComma(paymentItem?.pntAmt)}</td>
              </tr>
              <tr>
                <th>결제금액</th>
                <td className="tx-blue80">{setComma(paymentItem?.payAmt)}</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td className="td-btn-fr">
                  <span className="tx">
                    {paymentItem?.cdNm}
                  </span>
                  {
                    paymentItem?.payMthdCd == '02' &&
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="내역보기"
                      className="fr"
                      onClick={(e) => showHistory(e, "fade")}
                      width={74}
                    />
                  }
                </td>
              </tr>
              <tr>
                <th>세금계산서 발행</th>
                <td>{paymentItem?.evidenceStatus == "01" ? "기간만료" : ""}</td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={48}>
            <Button
              size="big"
              color="blue80"
              line="blue80"
              title="인쇄하기"
              width={172}
              buttonMarkup={true}
              onClick={print}
            />
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={172}
              buttonMarkup={true}
              onClick={e => hidePayment(false)}
            />
          </Buttons>
        </div>
      </RodalPopup>
 
      <RodalPopup
        show={displayHistory}
        type={'fade'}
        closedHandler={hideHistory}
        title={`${paymentItem?.cdNm} 이력조회`}
        mode="normal"
        size="small"
      >
        <div className="con-wrap popup-payment">
          <h4>상세 결제내역</h4>
          <table summary={`${paymentItem?.cdNm} 이력조회에 대한 내용`} className="table-tp1">
            <caption className="away">{paymentItem?.cdNm} 이력조회</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>주문번호</th>
                <td>{paymentItem?.history?.id}</td>
              </tr>
              <tr>
                <th>은행</th>
                <td>{paymentItem?.history?.bankNm}</td>
              </tr>
              <tr>
                <th>입금액</th>
                <td>{setComma(paymentItem?.history?.price)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </RodalPopup>

      <RodalPopup
        show={displayEvidence}
        type={'fade'}
        closedHandler={hideEvidence}
        title="영수증/증빙"
        mode="normal"
        size="small"
      >
        <div className="con-wrap popup-payment">
          <h4>결제정보</h4>
          <table summary="결제정보에 대한 내용" className="table-tp1">
            <caption className="away">결재정보</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>{evidenceItem?.paymentNo}</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>{evidenceItem?.payDt}</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>{evidenceItem?.title}</td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>{setComma(evidenceItem?.payAmt)}</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td>
                  {evidenceItem?.cdNm}
                  {/* paymentMethods?.find(paymentMethod => paymentMethod?.code == evidenceItem?.paymentMethod )?.label || "" */}
                </td>
              </tr>
              <tr>
                <th>영수증/증빙</th>
                <td>
                  {evidenceItem?.evidenceStatus}
                </td>
              </tr>
            </tbody>
          </table>
          <p>세금계산서 신청내역(신청일: 2019-09-09)</p>
          <table summary="세금계산서 신청내역에 대한 내용" className="table-tp1">
            <caption className="away">세금계산서 신청내역</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>발급번호</th>
                <td>{evidenceItem?.history?.code}</td>
              </tr>
              <tr>
                <th>상호</th>
                <td>{evidenceItem?.history?.companyNm}</td>
              </tr>
              <tr>
                <th>대표자명</th>
                <td>{evidenceItem?.history?.ceoNm}</td>
              </tr>
              <tr>
                <th>담당자명</th>
                <td>{evidenceItem?.history?.managerNm}</td>
              </tr>
              <tr>
                <th>업태</th>
                <td>{evidenceItem?.history?.workShape}</td>
              </tr>
              <tr>
                <th>종목</th>
                <td>{evidenceItem?.history?.workCategory}</td>
              </tr>
              <tr>
                <th>사업자등록번호</th>
                <td>{evidenceItem?.history?.workNo}</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{evidenceItem?.history?.contact}</td>
              </tr>
              <tr>
                <th>이메일주소</th>
                <td>{evidenceItem?.history?.email}</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>{evidenceItem?.history?.address}</td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} buttonMarkup={true} onClick={e => hideEvidence(false)} />
          </Buttons>
        </div>
      </RodalPopup>


    </>
  );
};
export default tabPurchaseHistory;
