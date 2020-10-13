import { useState, useCallback } from 'react';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

const MobPayment = () => {

  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [dimm3, setDimm3] = useState(false);
  const [dimm4, setDimm4] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const handleOpenData = useCallback((e) => { // 증빙자료 신청
    e.preventDefault();
    setActive1(true);
    setDimm1(true);
    document.getElementsByTagName('html')[0].style.overflow = "hidden";
  }, []);
  const handleOpenReceipt = useCallback((e) => { // 현금영수증 증빙자료
    e.preventDefault();
    setActive2(true);
    setDimm2(true);
    document.getElementsByTagName('html')[0].style.overflow = "hidden";
  }, []);
  const handleOpenTax = useCallback((e) => { // 세금계산서 증빙자료
    e.preventDefault();
    setActive3(true);
    setDimm3(true);
    document.getElementsByTagName('html')[0].style.overflow = "hidden";
  }, []);
  const handleOpenDeposit = useCallback((e) => { // 신용카드 외 입금내역
    e.preventDefault();
    setActive4(true);
    setDimm4(true);
    document.getElementsByTagName('html')[0].style.overflow = "hidden";
  }, []);

  const handleCloseDimm1 = useCallback((e) => {
    e.preventDefault();
    setActive1(false);
    setDimm1(false);
    document.getElementsByTagName('html')[0].style.overflow = "auto";
  }, []);
  const handleCloseDimm2 = useCallback((e) => {
    e.preventDefault();
    setActive2(false);
    setDimm2(false);
    document.getElementsByTagName('html')[0].style.overflow = "auto";
  }, []);
  const handleCloseDimm3 = useCallback((e) => {
    e.preventDefault();
    setActive3(false);
    setDimm3(false);
    // document.getElementsByTagName('html')[0].style.overflow = "auto";
  }, []);
  const handleCloseDimm4 = useCallback((e) => {
    e.preventDefault();
    setActive4(false);
    setDimm4(false);
    document.getElementsByTagName('html')[0].style.overflow = "auto";
  }, []);

  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
  const [viewFilter, setViewFilter] = useState(1);
    const handleFilter = useCallback(filter => e => {
      e.preventDefault();
      setViewFilter(filter === "cash_receipt" ? 1 : 2);
    }, [viewFilter]);

  return (
    <>
      <div className="content-wrap pt20">
        <div className="float-wrap btn-s mb10">
          <h4 className="tit2">판매완료 차량</h4>
          <Button size="sml" line="gray" color="gray" radius={true} title="증빙자료" width={61} height={30} fontSize={12} fontWeight={500} onClick={handleOpenData} />
        </div>
        <table summary="판매완료 차량에 대한 내용" className="table-tp1">
          <caption className="away">판매완료 차량</caption>
          <colgroup>
            <col width="40%" />
            <col width="60%" />
          </colgroup>
          <tbody>
            <tr>
              <th>결제번호</th>
              <td>20190916-0003426</td>
            </tr>
            <tr>
              <th>결제일</th>
              <td>2019-08-16</td>
            </tr>
            <tr>
              <th>결제내용</th>
              <td>대당이용권</td>
            </tr>
            <tr>
              <th>상품금액</th>
              <td>230,000원</td>
            </tr>
            <tr>
              <th>쿠폰할인</th>
              <td>-0원</td>
            </tr>
            <tr>
              <th>포인트사용</th>
              <td>-0원</td>
            </tr>
            <tr>
              <th>결제금액</th>
              <td className="tx-blue80">230,000원</td>
            </tr>
            <tr>
              <th>결제수단</th>
              {/* 시용카드 외 */}
              <td className="float-wrap btn-s">
                <span>무통장</span>
                <Button size="sml" line="gray" color="gray" radius={true} title="입금내역" width={61} height={30} fontSize={12} fontWeight={500} onClick={handleOpenDeposit} />
              </td>

              {/* 신용카드 */}
              {/* <td className="float-wrap btn-s">
                <span>신용카드</span>
                <Button size="sml" line="gray" color="gray" radius={true} title="카드전표" width={61} height={30} fontSize={12} fontWeight={500} />
              </td> */}
            </tr>
            <tr>
              <th>세금계산서 발행</th>
              <td>기간만료</td>
            </tr>
          </tbody>
        </table>

        <table summary="차량정보에 대한 내용" className="table-tp1 mt24">
          <caption>차량정보</caption>
          <colgroup>
            <col width="40%" />
            <col width="60%" />
          </colgroup>
          <tbody>
            <tr>
              <th>번호</th>
              <td>20190916-0003426</td>
            </tr>
            <tr>
              <th>제조사</th>
              <td>현대 투싼 ix 디젤 2WD LX20 럭셔리</td>
            </tr>
            <tr>
              <th>차량번호</th>
              <td>00가0000</td>
            </tr>
            <tr>
              <th>차량상태</th>
              <td>등록차량</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={dimm1 ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm1}></div>
      <MobBottomArea active={active1} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">현금영수증</p>
          <table summary="현금영수증에 대한 내용" className="table-tp1">
            <caption className="away">현금영수증</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>발급번호</th>
                <td>201910164100009680071234</td>
              </tr>
              <tr>
                <th>상호</th>
                <td>오토오토 모터스</td>
              </tr>
              <tr>
                <th>대표자명</th>
                <td>전진섭</td>
              </tr>
              <tr>
                <th>업태</th>
                <td>도매 및 소매업</td>
              </tr>
              <tr>
                <th>종목</th>
                <td>중고자동차판매</td>
              </tr>
              <tr>
                <th>사업자등록번호</th>
                <td>123123123</td>
              </tr>
              <tr>
                <th>담당자명</th>
                <td>김현대</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <th>이메일주소</th>
                <td className="tx-blue80 t-underline">abcedf@jets.com</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>서울 양천구 화곡로 6 10000호</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight={500} onClick={handleCloseDimm1} />
      </MobBottomArea>

      <div className={dimm2 ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm2}></div>
      <MobBottomArea active={active2} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">증빙자료</p>
          <p className="tit3">대당 이용권 1개월</p>
          <ul className="pay-tx-list border mb16">
            <li>
              <ul>
                <li><span>결제일</span>2019.08.16</li>
                <li><span>결제 번호</span>12373404</li>
                <li className="tx-b"><span>결제 금액</span>230,000원</li>
                <li><span>결제 수단</span>무통장입금</li>
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
                  <Button size="sml" line="gray" color="gray" radius={true} title="현금영수증" width={72} height={30} fontSize={12} fontWeight={500} />
                </td>
              </tr>
            </tbody>
          </table>
          <p className="tx-exp-tp5 mt8"><span className="tx-black">&#8251; 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다.</span> (결제 후 다음 달 5일까지)</p>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight={500} onClick={handleCloseDimm2} />
      </MobBottomArea>

      <div className={dimm3 ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm3}></div>
      <MobBottomArea active={active3} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">증빙자료</p>
          <p className="tit3">대당 이용권 1개월</p>
          <ul className="pay-tx-list border mb16">
            <li>
              <ul>
                <li><span>결제일</span>2019.08.16</li>
                <li><span>결제 번호</span>12373404</li>
                <li className="tx-b"><span>결제 금액</span>230,000원</li>
                <li><span>결제 수단</span>무통장입금</li>
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
                <td>2019092103233428</td>
              </tr>
              <tr>
                <th>상호</th>
                <td>(주)글로비스</td>
              </tr>
              <tr>
                <th>대표자명</th>
                <td>김대표</td>
              </tr>
              <tr>
                <th>담당자명</th>
                <td>김직원</td>
              </tr>
              <tr>
                <th>업태</th>
                <td>도매 및 소매업</td>
              </tr>
              <tr>
                <th>종목</th>
                <td>중고자동차판매</td>
              </tr>
              <tr>
                <th>사업자등록번호</th>
                <td>0123456</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>010-0000-0000</td>
              </tr>
              <tr>
                <th>이메일주소</th>
                <td>00112233@glovis.com</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>서울 강남구 논현동 1234</td>
              </tr>
            </tbody>
          </table>
          <p className="tx-exp-tp5 mt8"><span className="tx-black">&#8251; 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다.</span> (결제 후 다음 달 5일까지)</p>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight={500} onClick={handleCloseDimm3} />
      </MobBottomArea>

      <div className={dimm4 ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm4}></div>
      <MobBottomArea active={active4} isFixButton={true} zid={101} subPop={true}>
        <div className="inner">
          <p className="tit1 mb20">입금내역</p>
          <p className="tit4 mb8">결제번호<span className="tx-blue80 ml8">20190916-0003426</span></p>
          <table summary="무통장 입금내역에 대한 내용" className="table-tp1 th-c td-c">
            <caption className="away">무통장 입금내역</caption>
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
                <td>농협</td>
                <td className="tx-r">230,000원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleCloseDimm4} />
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
  )
}

export default MobPayment;