import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import { freeTerm } from '@src/dummy/terms';
import { setComma } from '@src/utils/StringUtil';
import { tempEvidenceList } from '@src/constant/payment';
import { preventScroll } from '@src/utils/CommonUtil';

const MobPaymentInfo = memo(
  ({ title, payment, paymentMethodList, selectedPayment, onPaymentMethodChanged, selectedCoupon, onCouponChange, itemOptions, onChangeItem, onTermsChange, selectedEvidence, onEvidenceChange }) => {
    // const mFullpageCPopup = useSelector((state) => state.common.mFullpageCPopup);
    // mobPaymentInfo 내에서 갖고있는 쿠폰정보 => 확인버튼 누르면 prop으로 받아온 함수로 넘김
    const [checkedCoupon, setCheckedCoupon] = useState(!selectedCoupon ? 0 : selectedCoupon);

    // 결제수단에 따른 증빙선택부 출력용 객체
    const [availEvidence, setAvaleEvidence] = useState(false);

    // 증빙선택 객체
    const [isValue2, setIsValue2] = useState(selectedEvidence);
    const [selectedOption, setSelectedOption] = useState(0);

    // 증빙자료 선택 핸들러
    const handleChange2 = useCallback(
      (e, value) => {
        console.log('check evidence :::', e.target.value, value);
        e.preventDefault();
        setIsValue2(value);
        if (onEvidenceChange) {
          onEvidenceChange(value);
        }
      },
      [onEvidenceChange]
    );

    // 약관 관련 팝업
    const [fpTerms1, setFpTerms1] = useState(false);
    const [fpTerms2, setFpTerms2] = useState(false);

    // 약관 확인 핸들러
    const handleTermsApply = useCallback(
      (e, value) => {
        console.log('terms e :::', e, 'terms value :::', value);
        if (onTermsChange) {
          onTermsChange(value);
        }
      },
      [onTermsChange]
    );

    // 원래 사용하던 풀페이지 약관 확인부 주석
    // const handleTermsPopup = useCallback((e, v) => {
    //   e.preventDefault();
    //   if (v.id === 'chk1') {
    //     handleFullpagePopup('terms1')(e);
    //   } else if (v.id === 'chk2') {
    //     handleFullpagePopup('terms2')(e);
    //   }
    // }, []);

    // const handleFullpagePopup = useCallback(
    //   (name) => (e) => {
    //     e.preventDefault();
    //     if (name === 'terms1') {
    //       dispatch({
    //         type: MOBILE_FULLPAGE_CPOPUP,
    //         data: {
    //           isPopup: true,
    //           title: '상품약관확인 (필수)',
    //           options: ['back', 'close']
    //         }
    //       });
    //       setFpTerms2(false);
    //       setFpTerms1(true);
    //     } else if (name === 'terms2') {
    //       dispatch({
    //         type: MOBILE_FULLPAGE_CPOPUP,
    //         data: {
    //           isPopup: true,
    //           title: '매물등록 규정 확인 (필수)',
    //           options: ['back', 'close']
    //         }
    //       });
    //       setFpTerms1(false);
    //       setFpTerms2(true);
    //     }
    //     preventScroll(true);
    //   },
    //   []
    // );

    // const handleFpTermsClose = useCallback(
    //   (e) => {
    //     e.preventDefault();
    //     setFpTerms1(false);
    //     setFpTerms2(false);
    //     dispatch({ type: MOBILE_FULLPAGE_CPOPUP_CLOSE });
    //     preventScroll(false);
    //   },
    //   [fpTerms1, fpTerms2]
    // );

    // 각 약관별 bottom 팝업 핸들러
    const handleTermsPopup = useCallback((e, v) => {
      e.preventDefault();
      if (v.id === 'chk1') {
        // handleFullpagePopup('terms1')(e);
        setDimm(true);
        setActive(true);
        setFpTerms2(false);
        setFpTerms1(true);
      } else if (v.id === 'chk2') {
        setDimm(true);
        setActive(true);
        setFpTerms1(false);
        setFpTerms2(true);
        // handleFullpagePopup('terms2')(e);
      }
    }, []);

    const handleFpTermsClose = useCallback((e) => {
      e.preventDefault();
      setActive(false);
      setDimm(false);
      preventScroll(false);
    }, []);

    const [couponPop, setCouponPop] = useState(false);

    // 결제방법 선택 핸들러
    const checkPayment = (e) => {
      const { checked, value } = e.target;
      console.log('checkPayment -> value', value);

      if (checked) {
        onPaymentMethodChanged(paymentMethodList.find((tempPaymentMethod) => tempPaymentMethod.id === value));
        // 결제수단이 무통장입금일때만 증빙선택 부분 출력하도록 지정
        if (value === 'Card') {
          setAvaleEvidence(false);
        } else if (value === 'VBank') {
          setAvaleEvidence(true);
        }
      }
    };

    // useEffect(() => {
    //   selectCouponList()
    //     .then((res) => res?.data?.data)
    //     .then(({ coupon }) => setCouponList(coupon));
    // }, []);

    // 쿠폰 라디오버튼 클릭 => MobPaymentInfo내의 쿠폰변수에 임시로 쿠폰데이터 저장
    // 1차 쿠폰선택
    const couponChange = (e) => {
      e.preventDefault();
      const { checked, value } = e.target;
      // if (value === 0) setCheckedCoupon(null);
      if (checked) {
        // setCheckedCoupon(couponList.find((tempCoupon) => tempCoupon.id === value));
        setCheckedCoupon(value);
      }
    };

    // 쿠폰 bottom팝업창에서 확인버튼을 누르면 MobPaymentInfo의 쿠폰변수를 상위 컴포넌트로 전달
    // 상위 컴포넌트 쿠폰선택
    const selectCoupon = (e) => {
      e.preventDefault();
      onCouponChange(checkedCoupon);
      setCouponPop(false);
    };

    // 쿠폰 선택창 bottom팝업 오픈
    const onClickCoupon = useCallback((e) => {
      e.preventDefault();
      setCouponPop(true);
      preventScroll(true);
    }, []);

    const couponClose = useCallback((e) => {
      e.preventDefault();
      setCouponPop(false);
    }, []);

    const radioCheckChange = useCallback(
      (e) => {
        setSelectedOption(e.target.value);
        onChangeItem(e);
      },
      [onChangeItem]
    );

    // 약관 상세보기 bottom 팝업 객체
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);
    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      preventScroll(false);
    }, []);

    return (
      <>
        <div className="reserve-wrap payment-sec method">
          {itemOptions ? (
            <div className="pick-list">
              <ul>
                {itemOptions.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>
                        <Radio id={`radio-${index}`} label={item?.prdNm} value={index} checked={selectedOption} onChange={(e) => radioCheckChange(e)} />
                      </p>
                      <p className="price">
                        {setComma(item?.prdSlAmt)}
                        <span>원</span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="pick-list">
              <p>{title}</p>
              <p className="price">
                {setComma(payment?.prdSlAmt)}
                <span>원</span>
              </p>
            </div>
          )}

          {!itemOptions ? (
            <>
              {/* <div className="coupon-wrap">
              <p>
                쿠폰/포인트 할인
                <span>신규 쿠폰 등록은 '마이페이지 > 쿠폰등록'에서 가능합니다.</span>
              </p>
              <Input type="text" id="coupon" width="70%" height={40} value={checkedCoupon === 0 ? '' : checkedCoupon} />
              <Button size="mid" background="blue80" radius={true} title="쿠폰적용" measure="%" width={27.5} height={40} mgMeasure="%" marginLeft={2.5} onClick={onClickCoupon} />
            </div> */}
              <div className="last-sum">
                <p>
                  최종결제금액<span> (VAT포함)</span>
                </p>
                <p className="price">
                  {setComma(payment?.prdSlAmt)}
                  <span>원</span>
                </p>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="method-wrap pt0">
            <p>결제수단</p>
            <ul className="radio-block tp2 method">
              {/* <li>
                <Radio className="txt" id="block1-1" label="신용카드" value={1} checked={isValue1} onChange={handleChange1} />
              </li>
              <li>
                <Radio className="txt" id="block1-2" label="간편결제" value={2} checked={isValue1} onChange={handleChange1} />
              </li>
              <li>
                <Radio className="txt" id="block1-3" label="무통장입금" value={3} checked={isValue1} onChange={handleChange1} />
              </li> */}
              {paymentMethodList &&
                paymentMethodList.map((tempPaymentMethod, idx) => (
                  <li key={idx}>
                    <Radio
                      className="txt"
                      id={`payment-${tempPaymentMethod?.id}`}
                      label={tempPaymentMethod?.title}
                      checked={selectedPayment?.id}
                      value={tempPaymentMethod?.id}
                      name="payment"
                      onChange={checkPayment}
                    />
                  </li>
                ))}
            </ul>
            {!itemOptions && (
              <>
                {availEvidence && (
                  <>
                    <p>증빙선택</p>
                    <ul className="radio-block tp2 proof">
                      {tempEvidenceList.map((tempEvidence, i) => (
                        <li key={i}>
                          <Radio
                            className="txt"
                            id={`evidence-item-${tempEvidence?.id}`}
                            title={tempEvidence?.title}
                            checked={isValue2?.id}
                            value={tempEvidence?.id}
                            name={tempEvidence?.name}
                            onChange={(e) => handleChange2(e, tempEvidence)}
                          />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {/* <ul className="radio-block tp2 proof">
                  <li>
                    <Radio className="txt" id="block2-1" label="현금영수증 신청" value={1} checked={isValue2} onChange={handleChange2} />
                  </li>
                  <li>
                    <Radio className="txt" id="block2-2" label="세금계산서 신청" value={2} checked={isValue2} onChange={handleChange2} />
                  </li>
                </ul> */}

                {/* 약관 확인 */}
                <MobSelectTerms
                  onChange={handleTermsApply}
                  onTermsClick={handleTermsPopup}
                  allAgree={false}
                  termsData={[
                    { id: 'chk1', title: '매물등록 규정 확인 (필수)', checked: false },
                    { id: 'chk2', title: '상품약관확인 (필수)', checked: false }
                  ]}
                />
              </>
            )}
          </div>
        </div>

        {/* 쿠폰 팝업 */}
        {/* <div className={couponPop ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={couponClose} />
        <MobBottomArea active={couponPop} isFixButton={true} zid={101}>
          <div className="inner">
            <div className="point-area">
              <h3 className="tit1 mb8">쿠폰적용</h3>
              <ul className="radio-group vertical border">
                <li>
                  <Radio id="coupon1" label="사용안함" value={0} checked={checkedCoupon} onChange={couponChange} />
                </li>
                {couponList?.map((tempCoupon, i) => (
                  <li key={i}>
                    <Radio id={`coupon-${tempCoupon?.id}`} title={tempCoupon?.title} checked={checkedCoupon?.id} value={tempCoupon?.id} name="coupon" size="small" onChange={couponChange} />
                    <span>{tempCoupon?.title}</span>
                  </li>
                ))}
              </ul>
              <table summary="쿠폰적용에 대한 내용" className="table-tp1 td-r">
                <caption className="away">쿠폰적용</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>할인금액</th>
                    <td>0원</td>
                  </tr>
                  <tr>
                    <th>
                      <span className="tx-b">최종결제금액</span>
                      <span className="fs12"> (VAT포함)</span>
                    </th>
                    <td>
                      {itemOptions ? (
                        <></>
                      ) : (
                        <>
                          <span className="price">{setComma(payment?.prdSlAmt)}</span>원
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Buttons align="center" className="full fixed" marginTop={48}>
            <Button size="full" background="blue20" color="blue80" title="취소" height={56} onClick={couponClose} />
            <Button size="full" background="blue80" title="적용" height={56} onClick={selectCoupon} />
          </Buttons>
        </MobBottomArea> */}
        <div className={dimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm} />
        <MobBottomArea active={active} className="v-fp" zid={101}>
          {fpTerms1 && (
            <div className="member-terms-wrap">
              <div className="view-tit">상품약관확인 (필수)</div>
              <div className="view-wrap">
                <div className="content">{freeTerm[0]}</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
          {fpTerms2 && (
            <div className="member-terms-wrap">
              <div className="view-tit">매물등록 규정 확인 (필수)</div>
              <div className="view-wrap">
                <div className="content">{freeTerm[1]}</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
        </MobBottomArea>

        {/* <MobFullpagePopup active={mFullpageCPopup} paddingBottom={80} cPop={true} subPop={true}>
          {fpTerms1 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{freeTerm[0]}</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
          {fpTerms2 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{freeTerm[1]}</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
        </MobFullpagePopup> */}
      </>
    );
  }
);

MobPaymentInfo.propTypes = {
  title: PropTypes.string,
  payment: PropTypes.object.isRequired,
  paymentMethodList: PropTypes.array,
  selectedPayment: PropTypes.object,
  onPaymentMethodChanged: PropTypes.func,
  selectedCoupon: PropTypes.object,
  onCouponChange: PropTypes.func,
  itemOptions: PropTypes.array,
  onChangeItem: PropTypes.func,
  onTermsChange: PropTypes.func,
  selectedEvidence: PropTypes.object,
  onEvidenceChange: PropTypes.func
};
MobPaymentInfo.displayName = 'MobPaymentInfo';
export default MobPaymentInfo;
