import React, { useState, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Radio from '@lib/share/items/Radio';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobPaymentInfo from '@src/components/common/MobPaymentInfo';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import FreeTicketList from '@src/components/mypage/dealer/DealerAdManagement/tabAdGuide/FreeTicketList';
import UpdateTicketList from '@src/components/mypage/dealer/DealerAdManagement/tabAdGuide/UpdateTicketList';
import PricingTicketList from '@src/components/mypage/dealer/DealerAdManagement/tabAdGuide/PricingTicketList';
import { setComma } from '@src/utils/StringUtil';
import IniPayButton from '@lib/share/inipay/IniPayButton';
import { SystemContext } from '@src/provider/SystemProvider';
import { commonPaymentMethodList } from '@src/constant/payment';
import { selectCouponList } from '@src/api/mypage/dealer/dealerAdverApi';
import { preventScroll } from '@src/utils/CommonUtil';
import { frontUrl } from '@src/utils/HttpUtils';

const MobPaymentGoods = ({ callback, onClose, type, params = {} }) => {
  // type props = ["free", "update", "pricing"]
  const dispatch = useDispatch();
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const { prdDvcd, crSlot } = params;
  const dealerAdverStore = useSelector((rootStore) => rootStore.dealerAdver);
  const { usingTicketList, free = [], update = [], pricing = [] } = dealerAdverStore;
  // console.log('mobPaymentGoods -> usingTicketList', usingTicketList);
  // console.log('mobPaymentGoods -> update', update);
  const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);

  // 각 이용권 선택시 저장할 객체
  const [checkedFreeTicket, setCheckedFreeTicket] = useState(null);
  const [checkedUpdateTicket, setCheckedUpdateTicket] = useState(null);
  const [checkedPricingTicket, setCheckedFrPricingcket] = useState(null);

  // MobPaymentInfo로 넘어가서 작동할 객체
  // 쿠폰
  const [selectedCoupon, selectCoupon] = useState(null);
  // 결제방식
  const [selectedPayment, selectPayment] = useState({ id: 'Card' });
  // 영수증
  const [selectedEvidence, selectEvidence] = useState({ id: '01' });
  // 약관 확인
  // 매매규정
  const [isConfirm1, setIsConfirm1] = useState(null);
  // 상품이용약관
  const [isConfirm2, setIsConfirm2] = useState(null);
  console.log('payment mehtod : ', selectedPayment);

  // 약관 선택 함수 => 한번에 넘긴 값들의 checked값을 감지해서 각 변수에 삽입
  const onChangeTerms = useCallback(
    (e) => {
      console.log(e);
      if (e[0].checked && !e[1].checked) {
        console.log(e[0]);
        setIsConfirm1(e[0]);
        setIsConfirm2(null);
      } else if (!e[0].checked && e[1].checked) {
        console.log(e[1]);
        setIsConfirm1(null);
        setIsConfirm2(e[1]);
      } else if (e[0].checked === true && e[1].checked === true) {
        console.log('both : ', e[0], e[1]);
        setIsConfirm1(e[0]);
        setIsConfirm2(e[1]);
      }
    },
    [isConfirm1, isConfirm2]
  );

  // 이용권 선택 핸들러
  const selectItem = (e) => {
    const { name, value } = e.target;

    console.log('value : ', name, value);
    switch (name) {
      case 'freeTicket':
        setCheckedFreeTicket(free.find((item) => item?.prdDtlSno === Number(value)));
        setCheckedUpdateTicket(null);
        setCheckedFrPricingcket(null);
        break;
      case 'updateTicket':
        setCheckedFreeTicket(null);
        setCheckedUpdateTicket(update.find((item) => item?.prdDtlSno === Number(value)));
        setCheckedFrPricingcket(null);
        break;
      case 'pricingTicket':
        setCheckedFreeTicket(null);
        setCheckedUpdateTicket(null);
        setCheckedFrPricingcket(pricing.find((item) => item?.prdDtlSno === Number(value)));
        break;
    }
  };

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback(
    (e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    },
    [isValue1]
  );

  const [isValue2, setIsValue2] = useState(0);
  const handleChange2 = useCallback(
    (e) => {
      e.preventDefault();
      setIsValue2(Number(e.target.value));
    },
    [isValue2]
  );

  // 이용권 선택후 결제확정 팝업 핸들러
  const paymentOpen = (e) => {
    e.preventDefault();
    // 아무런 이용권 선택하지 않았을때의 alert
    if (checkedFreeTicket === null && checkedUpdateTicket === null && checkedPricingTicket === null) {
      showAlert('이용권을 선택해주세요.');
      return false;
    }
    handleFullpagePopup(e);
  };

  // 이용권 선택후 다음 페이지 팝업. MobPaymentInfo창과 함께 결제버튼 출력
  const [fpPayment, setFpPayment] = useState(false);
  const handleFullpagePopup = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '이용권 결제',
          options: ['close']
        }
      });
      setFpPayment(true);
      preventScroll(true);
    },
    [dispatch]
  );
  const onCloseSt1 = useCallback((e) => {
    e.preventDefault();
    if (onClose) onClose(e);
  }, []);
  const onCloseSt2 = useCallback((e) => {
    e.preventDefault();
    setFpPayment(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    preventScroll(false);
  }, []);
  const paymentCallback = useCallback((e) => {
    e.preventDefault();
    if (callback) callback(e);
    onCloseSt2(e);
    if (onClose) onClose(e);
  }, []);

  //결제요청 전 벨리데이션 체크
  const beforeRequest = () => {
    console.log('beforeRequest selectedCoupon : ', selectedCoupon);
    console.log('beforeRequest selectedPayment : ', selectedPayment);

    return new Promise((resolve, reject) => {
      if (selectedPayment && isConfirm1 && isConfirm2) {
        resolve();
      } else if (!selectedPayment) {
        showAlert('결제 수단을 선택하세요');
        reject();
      } else if (!isConfirm1) {
        showAlert('매물등록 규정을 확인해주세요');
        reject();
      } else if (!isConfirm2) {
        showAlert('상품이용약관을 확인해주세요');
        reject();
      }
    });
  };

  return (
    <>
      <div className="payment-sec goods">
        {type === 'free' && (
          <TabMenu type="type2" mount={false}>
            <TabCont tabTitle="자유 이용권" id="tab2-1" index={0}>
              <div className="usage-wrap content-wrap">
                <div className="float-wrap mt20 mb16">
                  <p>모든 차량 이용가능</p>
                  <span>단위 : 원 (VAT포함)</span>
                </div>
                <FreeTicketList
                  items={free}
                  selectable={true}
                  onChange={selectItem}
                  checkedValue={checkedFreeTicket}
                  checkableProps={{ prdDvcd, crSlot }}
                  usingTicketList={usingTicketList?.freepassinfo}
                />
                
                <div className="float-wrap bg">
                  <p>
                    자유이용권
                    <br />
                    {checkedFreeTicket ? `${checkedFreeTicket?.regMm}개월 ${checkedFreeTicket?.crSlot}대` : '1개월 10대'}
                  </p>
                  <p className="price-tp4">
                    {checkedFreeTicket ? setComma(checkedFreeTicket?.prdSlAmt) : '330,000'} <span className="won">원</span>
                  </p>
                </div>
              </div>
            </TabCont>

            <TabCont tabTitle="월 구독" id="tab2-2" index={1}>
              <div className="usage-wrap content-wrap">
                <div className="mt20 mb16">
                  {/* 자동결제 가능한 이용권 있을 시 */}
                  <p>월 구독(자동결제)하실 이용권을 확인해주세요.</p>

                  {/* 자동결제 가능한 이용권 없을 시
                  <p className="tac lh15">월 구독 (자동결제)이 가능한 이용권이 없습니다.<br />자유이용권을 먼저 구매해주세요.</p>
                  */}
                  {/* 자동결제 이용중 일 시
                  <p className="tac lh15">월 구독 (자동결제)을 이미 이용중입니다.<br />월 구독 취소는 pc버전에서 진행해주세요</p>
                  */}
                </div>
                {/* 자동결제 가능한 이용권 있을 시 */}
                <FreeTicketList
                  items={free}
                  selectable={true}
                  onChange={selectItem}
                  checkedValue={checkedFreeTicket}
                  checkableProps={{ prdDvcd, crSlot }}
                  usingTicketList={usingTicketList?.freepassinfo}
                  subscribe={true}
                />
              </div>
            </TabCont>
          </TabMenu>
        )}

        {type === 'update' && (
          <TabMenu type="type2" mount={false}>
            <TabCont tabTitle="업데이트 자유권" id="tab2-1" index={0}>
              <div className="usage-wrap content-wrap">
                <div className="float-wrap mt20 mb16">
                  <span className="fr">단위 : 원 (VAT포함)</span>
                </div>
                <UpdateTicketList
                  items={update}
                  selectable={true}
                  onChange={selectItem}
                  checkedValue={checkedUpdateTicket}
                  checkableProps={{ prdDvcd, crSlot }}
                  usingTicketList={usingTicketList?.updatefreepassinfo}
                />
                <div className="float-wrap bg">
                  <p>
                    업데이트자유권
                    <br />
                    {checkedUpdateTicket ? `${checkedUpdateTicket?.regMm}개월 ${checkedUpdateTicket?.crSlot}대` : '1개월 10대'}
                  </p>
                  <p className="price-tp4">
                    {checkedUpdateTicket ? setComma(checkedUpdateTicket?.prdSlAmt) : '110,000'}
                    <span className="won">원</span>
                  </p>
                </div>
              </div>
            </TabCont>

            <TabCont tabTitle="월 구독" id="tab2-2" index={1}>
              <div className="usage-wrap content-wrap">
                <div className="mt20 mb16">
                  {/* 자동결제 가능한 이용권 있을 시 */}
                  <p>월 구독(자동결제)하실 이용권을 확인해주세요.</p>

                  {/* 자동결제 가능한 이용권 없을 시
                  <p className="tac lh15">월 구독 (자동결제)이 가능한 이용권이 없습니다.<br />자유이용권을 먼저 구매해주세요.</p>
                  */}
                  
                  {/* 자동결제 이용중 일 시
                  <p className="tac lh15">월 구독 (자동결제)을 이미 이용중입니다.<br />월 구독 취소는 pc버전에서 진행해주세요</p>
                  */}
                </div>
                
                {/* 자동결제 가능한 이용권 있을 시 */}
                <UpdateTicketList
                  items={update}
                  selectable={true}
                  onChange={selectItem}
                  checkedValue={checkedUpdateTicket}
                  checkableProps={{ prdDvcd, crSlot }}
                  usingTicketList={usingTicketList?.updatefreepassinfo}
                  subscribe={true}
                />
              </div>
            </TabCont>
          </TabMenu>
        )}

        {type === 'pricing' && (
          <div className="usage-wrap content-wrap">
            <h5>프라이싱 조회권</h5>
            <div className="float-wrap mb16">
              <p>조회권의 유효기간은 5년입니다.</p>
              <span>단위 : 원 (VAT포함)</span>
            </div>
            <PricingTicketList items={pricing} selectable={true} onChange={selectItem} checkedValue={checkedPricingTicket} checkableProps={{ prdDvcd, crSlot }} />
            <div className="float-wrap bg">
              <p>프라이싱 조회권 {checkedPricingTicket ? checkedPricingTicket?.prdUseCnt : '-'}회</p>
              <p className="price-tp4">
                {checkedPricingTicket ? setComma(checkedPricingTicket?.prdSlAmt) : '-'} <span className="won">원</span>
              </p>
            </div>
          </div>
        )}
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="취소" measure="%" width={50} height={56} onClick={onCloseSt1} />
          <Button size="big" background="blue80" title="다음" measure="%" width={50} height={56} onClick={paymentOpen} />
        </Buttons>
      </div>

      {/* 결제작업 풀페이지 팝업 */}
      <MobFullpagePopup active={mFullpagePopup} paddingBottom={56} subPop={true}>
        {fpPayment && checkedFreeTicket && (
          <>
            <h3 className="tit2 pd20">결제정보</h3>
            <MobPaymentInfo
              paymentMethodList={commonPaymentMethodList}
              selectedPayment={selectedPayment}
              onPaymentMethodChanged={selectPayment}
              selectedCoupon={selectedCoupon}
              onCouponChange={selectCoupon}
              onTermsChange={onChangeTerms}
              selectedEvidence={selectedEvidence}
              onEvidenceChange={selectEvidence}
              title={`${checkedFreeTicket.prdNm} ${checkedFreeTicket.regMm}개월 ${checkedFreeTicket.crSlot}대`}
              payment={checkedFreeTicket}
            />
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" onClick={onCloseSt2} />
              <IniPayButton
                size="big"
                background="blue80"
                title="결제"
                mode="normal"
                isMobile={true}
                directUrl={encodeURIComponent(`${frontUrl}/mypage/dealer/sellcar/carManagement?tabA=1&tabB=1&`)}
                failUrl={`${frontUrl}/mypage/dealer/sellcar/carManagement?tabA=1&tabB=1&`}
                beforeRequestAsync={beforeRequest}
                // paymethod={selectedPayment?.id}
                coupon={selectedCoupon?.id}
                type={selectedEvidence?.id}
                items={[checkedFreeTicket]}
                prodType="pass"
                mobPayMethod={selectedPayment?.id}
              />
              {/* <Button size="big" background="blue80" title="결제" onClick={paymentCallback} /> */}
            </Buttons>
          </>
        )}
        {fpPayment && checkedUpdateTicket && (
          <>
            <h3 className="tit2 pd20">결제정보</h3>
            <MobPaymentInfo
              paymentMethodList={commonPaymentMethodList}
              selectedPayment={selectedPayment}
              onPaymentMethodChanged={selectPayment}
              selectedCoupon={selectedCoupon}
              onCouponChange={selectCoupon}
              onTermsChange={onChangeTerms}
              selectedEvidence={selectedEvidence}
              onEvidenceChange={selectEvidence}
              title={`${checkedUpdateTicket.prdNm} ${checkedUpdateTicket.regMm}개월 ${checkedUpdateTicket.crSlot}대`}
              payment={checkedUpdateTicket}
            />
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" onClick={onCloseSt2} />
              <IniPayButton
                size="big"
                background="blue80"
                title="결제"
                mode="normal"
                isMobile={true}
                directUrl={encodeURIComponent(`${frontUrl}/mypage/dealer/sellcar/carManagement?tabA=1&tabB=1&`)}
                failUrl={`${frontUrl}/mypage/dealer/sellcar/carManagement?tabA=1&tabB=1&`}
                beforeRequestAsync={beforeRequest}
                // paymethod={selectedPayment?.id}
                coupon={selectedCoupon?.id}
                type={selectedEvidence?.id}
                items={[checkedUpdateTicket]}
                prodType="pass"
                mobPayMethod={selectedPayment?.id}
              />
            </Buttons>
          </>
        )}
        {fpPayment && checkedPricingTicket && (
          <>
            <h3 className="tit2 pd20">결제정보</h3>
            <MobPaymentInfo
              paymentMethodList={commonPaymentMethodList}
              selectedPayment={selectedPayment}
              onPaymentMethodChanged={selectPayment}
              selectedCoupon={selectedCoupon}
              onCouponChange={selectCoupon}
              onTermsChange={onChangeTerms}
              selectedEvidence={selectedEvidence}
              onEvidenceChange={selectEvidence}
              title={`${checkedPricingTicket.prdNm} ${checkedPricingTicket.prdUseCnt}회`}
              payment={checkedPricingTicket}
            />
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" onClick={onCloseSt2} />
              <IniPayButton
                size="big"
                background="blue80"
                title="결제"
                mode="normal"
                isMobile={true}
                directUrl={encodeURIComponent(`${frontUrl}/mypage/dealer/sellcar/carManagement?tabA=1&tabB=1&`)}
                failUrl={`${frontUrl}/mypage/dealer/sellcar/carManagement?tabA=1&tabB=1&`}
                beforeRequestAsync={beforeRequest}
                // paymethod={selectedPayment?.id}
                coupon={selectedCoupon?.id}
                type={selectedEvidence?.id}
                items={[checkedPricingTicket]}
                prodType="pass"
                mobPayMethod={selectedPayment?.id}
              />
            </Buttons>
          </>
        )}
        {/* <>
          <h3 className="tit2 pd20">결제정보</h3>
          <MobPaymentInfo title={'자유이용권 1개월 10대'} />
          <Buttons align="center" className="full fixed">
            <Button size="big" background="blue20" color="blue80" title="취소" onClick={onCloseSt2} />
            <Button size="big" background="blue80" title="결제" onClick={paymentCallback} />
          </Buttons>
        </> */}
      </MobFullpagePopup>
    </>
  );
};

export default MobPaymentGoods;
