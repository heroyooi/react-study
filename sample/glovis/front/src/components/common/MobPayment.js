import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Iframe from 'react-iframe';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { setComma } from '@src/utils/StringUtil';
import { getEvidenceAction } from '@src/actions/mypage/dealer/dealerAdverAction';
import { preventScroll } from '@src/utils/CommonUtil';

const MobPayment = ({ paymentItem }) => {
  const dispatch = useDispatch();
  // console.log(paymentItem);
  // 일반 증빙자료(신용카드 외 결제수단)
  const [dimm1, setDimm1] = useState(false);
  // 증빙자료 팝업에서 다시 호출하는 현금영수증 팝업
  const [dimm2, setDimm2] = useState(false);
  // 증빙자료 팝업에서 다시 호출하는 세금계산서 팝업
  const [dimm3, setDimm3] = useState(false);
  // 무통장 입금내역 팝업
  const [dimm4, setDimm4] = useState(false);
  // 카드결제시 출력하는 카드전표 팝업
  const [dimm5, setDimm5] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);

  const [evidenceItem, setEvidenceItem] = useState();

  const handleOpenData = useCallback((e) => {
    // 증빙자료 신청
    e.preventDefault();

    setActive1(true);
    setDimm1(true);
    preventScroll(true);
  }, []);

  const handleOpenReceipt = async (e, item) => {
    // 현금영수증 증빙자료
    e.preventDefault();
    // location.href = `https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/Cash_mCmReceipt.jsp?noTid=${paymentItem?.pgOrgCd}&clpaymethod=22`;
    console.log('showBillsPop -> item ', item);
    // const { evidence } = await dispatch(getEvidenceAction(item.paymentNo));
    // console.log('showBillsPop -> evidence ', evidence);

    // setEvidenceItem(evidence);

    setActive2(true);
    setDimm2(true);
    preventScroll(true);
  };

  const handleOpenTax = useCallback((e) => {
    // 세금계산서 증빙자료
    e.preventDefault();
    setActive3(true);
    setDimm3(true);
    preventScroll(true);
  }, []);

  // 신용카드 외 입금내역 오픈 핸들러
  const handleOpenDeposit = useCallback((e) => {
    e.preventDefault();
    setActive4(true);
    setDimm4(true);
    preventScroll(true);
  }, []);

  // 신용카드 결제시 카드전표 오픈 핸들러
  const handleOpenCardDeposit = useCallback((e) => {
    e.preventDefault();
    // location.href = `https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=${paymentItem?.pgOrgCd}&noMethod=1`;
    setActive5(true);
    setDimm5(true);
    preventScroll(true);
  }, []);

  // 팝업 닫기
  const handleCloseDimm1 = useCallback((e) => {
    e.preventDefault();
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, []);

  const handleCloseDimm2 = useCallback((e) => {
    e.preventDefault();
    setActive2(false);
    setDimm2(false);
    preventScroll(false);
  }, []);

  const handleCloseDimm3 = useCallback((e) => {
    e.preventDefault();
    setActive3(false);
    setDimm3(false);
  }, []);

  const handleCloseDimm4 = useCallback((e) => {
    e.preventDefault();
    setActive4(false);
    setDimm4(false);
    preventScroll(false);
  }, []);

  const handleCloseDimm5 = useCallback((e) => {
    e.preventDefault();
    setActive5(false);
    setDimm5(false);
    preventScroll(false);
  }, []);

  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
  const [viewFilter, setViewFilter] = useState(1);
  const handleFilter = useCallback(
    (filter) => (e) => {
      e.preventDefault();
      setViewFilter(filter === 'cash_receipt' ? 1 : 2);
    },
    [viewFilter]
  );

  return (
    <>
      <div className="content-wrap pt20">
        <div className="float-wrap btn-s mb10">
          <h4 className="tit2 fl">결제내역 상세</h4>
          {/* 시용카드 외인 경우에만 버튼 생성 (현금영수증&세금계산서) */}
          {paymentItem?.payMthdCd !== '01' && paymentItem?.payMthdCd !== '02' && (
            <Button size="sml" line="gray" color="gray" radius={true} title="증빙자료" width={61} height={30} fontSize={12} fontWeight={500} onClick={handleOpenData} />
          )}
        </div>
        <table summary="결제내역 상세에 대한 내용" className="table-tp1">
          <caption className="away">결제내역 상세</caption>
          <colgroup>
            <col width="40%" />
            <col width="60%" />
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
              <th>쿠폰할인</th>
              <td>{setComma(paymentItem?.couponDiscount)}</td>
            </tr>
            <tr>
              <th>포인트사용</th>
              <td>{setComma(paymentItem?.pntAmt)}</td>
            </tr>
            <tr>
              <th>결제금액</th>
              <td className="tx-blue80">{setComma(paymentItem?.payAmt)}</td>
            </tr>
            <tr>
              <th>결제수단</th>
              {/* 시용카드 외 */}
              {paymentItem?.payMthdCd !== '01' && paymentItem?.payMthdCd !== '02' ? (
                <td className="float-wrap btn-s">
                  <span>{paymentItem?.cdNm}</span>
                  <Button size="sml" line="gray" color="gray" radius={true} title="입금내역" width={61} height={30} fontSize={12} fontWeight={500} onClick={handleOpenDeposit} />
                </td>
              ) : (
                // 신용카드
                <td className="float-wrap btn-s">
                  <span>신용카드</span>
                  <Button size="sml" line="gray" color="gray" radius={true} title="카드전표" width={61} height={30} fontSize={12} fontWeight={500} onClick={handleOpenCardDeposit} />
                </td>
              )}
            </tr>
            <tr>
              <th>세금계산서 발행</th>
              <td>{paymentItem?.evidenceStatus === '01' ? '기간만료' : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 증빙자료(신용카드 외의 결제) */}
      <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm1}></div>
      <MobBottomArea active={active1} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">증빙자료</p>
          <p className="tit3">{paymentItem?.prdNm}</p>
          <ul className="pay-tx-list border mb16">
            <li>
              <ul>
                <li>
                  <span>결제일</span> {paymentItem?.payDt}
                </li>
                <li>
                  <span>결제 번호</span> {paymentItem?.odrNum}
                </li>
                <li className="tx-b">
                  <span>결제 금액</span> {setComma(paymentItem?.payAmt)}
                </li>
                <li>
                  <span>결제 수단</span> {paymentItem?.cdNm}
                </li>
              </ul>
            </li>
          </ul>
          <p className="tit5 tx-blue80 mb8">신청일: 2019-09-09</p>
          <table summary="무통장 입금내역에 대한 내용" className="table-tp1">
            <caption className="away">무통장 입금내역</caption>
            <colgroup>
              <col width="15%" />
              <col width="85%" />
            </colgroup>
            <tbody>
              <tr>
                <th>구분</th>
                <td className="float-wrap btn-s">
                  <span>지출증빙용</span>
                  {/* 이부분 현금영수증이랑 세금계산서 둘중 하나로 신청가능하게 */}
                  <Button
                    size="sml"
                    line="gray"
                    color="gray"
                    radius={true}
                    title="현금영수증"
                    width={72}
                    height={30}
                    fontSize={12}
                    fontWeight={500}
                    onClick={(e) => handleOpenReceipt(e, paymentItem)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p className="tx-exp-tp5 mt8">
            <span className="tx-black">&#8251; 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다.</span> (결제 후 다음 달 5일까지)
          </p>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight={500} onClick={handleCloseDimm1} />
      </MobBottomArea>

      {/* 현금영수증 => 이니시스 현금영수증 띄우는걸로 */}
      <div className={dimm2 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm2}></div>
      <MobBottomArea active={active2} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">현금영수증</p>
          <Iframe
            src={`https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/Cash_mCmReceipt.jsp?noTid=${paymentItem?.pgOrgCd}&clpaymethod=22`}
            width={'100%'}
            height={'700'}
            display="initial"
            position="relative"
            allowFullScreen="true"
            scrolling="yes"
            style="ZOOM:90%"
          />
          {/* <table summary="현금영수증에 대한 내용" className="table-tp1">
            <caption className="away">현금영수증</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
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
                <th>담당자명</th>
                <td>{evidenceItem?.history?.managerNm}</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{evidenceItem?.history?.contact}</td>
              </tr>
              <tr>
                <th>이메일주소</th>
                <td className="tx-blue80 t-underline">{evidenceItem?.history?.email}</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>{evidenceItem?.history?.address}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight={500} onClick={handleCloseDimm2} />
      </MobBottomArea>

      {/* 세금계산서(세금계산서 신청시 증빙서류) */}
      <div className={dimm3 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm3}></div>
      <MobBottomArea active={active3} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">증빙자료</p>
          <p className="tit3">{evidenceItem?.title}</p>
          <ul className="pay-tx-list border mb16">
            <li>
              <ul>
                <li>
                  <span>결제일</span>
                  {evidenceItem?.payDt}
                </li>
                <li>
                  <span>결제 번호</span>
                  {evidenceItem?.paymentNo}
                </li>
                <li className="tx-b">
                  <span>결제 금액</span>
                  {setComma(evidenceItem?.payAmt)}
                </li>
                <li>
                  <span>결제 수단</span>
                  {evidenceItem?.cdNm}
                </li>
              </ul>
            </li>
          </ul>
          <p className="tit5 tx-blue80 mb8">신청일: 2019-09-09</p>
          <table summary="무통장 입금내역에 대한 내용" className="table-tp1">
            <caption className="away">무통장 입금내역</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
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
          <p className="tx-exp-tp5 mt8">
            <span className="tx-black">&#8251; 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다.</span> (결제 후 다음 달 5일까지)
          </p>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight={500} onClick={handleCloseDimm3} />
      </MobBottomArea>

      {/* 단순 입금내역(신용카드 외) */}
      <div className={dimm4 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm4}></div>
      <MobBottomArea active={active4} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">입금내역</p>
          <p className="tit4 mb8">
            결제번호<span className="tx-blue80 ml8">{paymentItem?.odrNum}</span>
          </p>
          <table summary="무통장 입금내역에 대한 내용" className="table-tp1 th-c td-c">
            <caption className="away">{paymentItem?.cdNm} 입금내역</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <thead>
              <tr>
                <th>은행</th>
                <th>입금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{paymentItem?.history?.bankNm}</td>
                <td className="tx-r">{setComma(paymentItem?.history?.price)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleCloseDimm4} />
      </MobBottomArea>

      {/* 카드전표 (이니시스 카드전표 출력) */}
      <div className={dimm5 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm5}></div>
      <MobBottomArea active={active5} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">카드전표</p>
          <Iframe
            src={`https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=${paymentItem?.pgOrgCd}&noMethod=1`}
            width={'100%'}
            height={'700'}
            display="initial"
            position="relative"
            allowFullScreen="true"
            scrolling="no"
            style="ZOOM:90%"
          />
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleCloseDimm5} />
      </MobBottomArea>

      <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
        <div className="con-wrap">
          <p>신청이 완료되었습니다.</p>
          <Buttons align="right" marginTop={16}>
            <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
};

export default MobPayment;
