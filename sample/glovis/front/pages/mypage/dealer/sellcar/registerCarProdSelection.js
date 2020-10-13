const globalThis = require('globalthis')();
import { useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Steps from '@lib/share/items/Steps';
import IniPayButton from '@lib/share/inipay/IniPayButton';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobPaymentGoods from '@src/components/common/MobPaymentGoods';
import MobPaymentInfo from '@src/components/common/MobPaymentInfo';

import CouponSelector from '@src/components/common/couponSelector/CouponSelector';
import PointSelector from '@src/components/common/couponSelector/PointSelector';
import EvidenceSelector from '@src/components/common/couponSelector/EvidenceSelector';
import ProdCarSummary from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdCarSummary';

import RenderHelper from '@lib/share/render/helper';
import { SystemContext } from '@src/provider/SystemProvider';
import { setComma } from '@src/utils/StringUtil';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi';
import * as dealerAdverApi from '@src/api/mypage/dealer/dealerAdverApi';
import * as memberApi from '@src/api/common/memberApi';
import { imgUrl, frontUrl } from '@src/utils/HttpUtils';
import { commonPaymentMethodList } from '@src/constant/payment';

import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { getCommonCodeAsync } from '@src/utils/DataUtils';

const nextPage = `/mypage/dealer/sellcar/registerCarComplete`;
const prevPage = `/mypage/dealer/sellcar/registerCarPhoto`;

const popContents = [
  { key: 'cashReceipt', title: '현금영수증 신청 (필수)', contents: '내용1' },
  { key: 'regRule', title: '상품 약관 확인(필수)', contents: '내용2' }
];

const registerCarProdSelection = ({ query, freepassinfo = {}, updatefreepassinfo = {}, advItem = {}, couponList = [], prodItem = {}, memberInfo = {}, photoList = [] }) => {
  console.log('registerCarIntroducing -> prodItem', prodItem);
  console.log('registerCarProdSelection -> freepassinfo', freepassinfo);
  const { phtUrl } = photoList?.[0] || {};

  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '차량등록',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#f6f7f8'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  console.log('freepassinfo : ', freepassinfo);
  console.log('updatefreepassinfo : ', updatefreepassinfo);
  console.log('advItem : ', advItem);
  console.log('registerCarProdSelection -> prodItem', prodItem);

  const [paymentPhase, setPaymentPhase] = useState(false); //false : 결제리스트, true : 결제상세
  const { car } = prodItem;
  const { dlrPrdId } = query;
  const { showAlert, showConfirm, showLoader, hideLoader, showLoginForm, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [selectedAdv, setSelectedAdv] = useState();
  const [currentPop, setCurrentPop] = useState();
  const [displayTermsPop, setDisplayTermsPop, showTermsPop, hideTermsPop] = useRodal(false);
  const [usingPoint, setUsingPoint] = useState(0);
  const [selectedCoupon, selectCoupon] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState();
  const [selectedPayment, selectPayment] = useState({ id: 'Card' });
  const [agreeItem, setAgreeItem] = useState({
    cashReceipt: false,
    regRule: false
  });
  const [fuelTypes, setFuelTypes] = useState([]);
  const [mssTypes, setMssTypes] = useState([]);

  const inicisCallback = (message) => {
    console.log('inicisCallback -> message', message);
    const { merchantData, statusinfo, vbankinfo } = message?.data || {};

    console.log('페이지 이동 전 1 : ', dlrPrdId);
    if(merchantData) {
      globalThis?.window?.INIStdPay.viewOff();
      console.log('페이지 이동 전 2 : ', dlrPrdId);
      if(statusinfo?.returncd === '000'){
        Router.push(nextPage + '?' + qs.stringify({ ...vbankinfo, ...merchantData, ...statusinfo }));
      } else {
        showAlert('결제 실패하였습니다')
      }
    }
  };

  useEffect(() => {
    getCommonCodeAsync('FM047').then(setMssTypes);
    getCommonCodeAsync('FM048').then(setFuelTypes);
    window.addEventListener('message', inicisCallback);
    return () => {
      initAlert();
      initConfirm();
      window.removeEventListener('message', inicisCallback);
    };
  }, []);

  const goPaymentPhase = (e) => {
    if (selectedAdv) {
      if (selectedAdv?.prdSgrpCd === '05') {
        showConfirm('자유 이용권을 통해 등록하시겠습니까?', async () => {
          console.log('자유 이용권 등록');
          showLoader();
          const { data, statusinfo } = await dealerProdApi
            .updateFreePassData({
              afterDlrPrdId: dlrPrdId,
              passType: 'freePass',
              ...selectedAdv
            })
            .then((res) => res?.data);

          if (statusinfo?.returncd === '000') {
            console.log('자유이용권차감');
            await Router.push(nextPage);
            hideLoader();
          } else if (statusinfo?.returncd === 'MBR4005') {
            hideLoader();
            showLoginForm(Router.router.asPath, (data) => {
              console.log('loginCallback data ::::: ', data);
              if (data?.isLogin) {
                goPaymentPhase();
              } else {
                showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다');
              }
            });
          }
        });
      } else {
        setPaymentPhase(true);
        window.scrollTo(0, 0);
      }
    } else {
      showAlert('결제 상품을 선택하세요');
    }
  };

  const handleChangeAgree = (e) => {
    const { name, checked } = e.target;

    setAgreeItem({
      ...agreeItem,
      [name]: checked
    });
  };

  const openTermsPop = (name) => {
    const con = popContents.find((popContent) => popContent.key == name);
    showTermsPop();
    setCurrentPop(con);
  };

  const inputPoint = (point) => {
    setUsingPoint(point ?? 0);
    console.log('point : ', point);
  };

  const checkPayment = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      const checkedItem = commonPaymentMethodList.find((tempPaymentMethod) => tempPaymentMethod.id == value);
      selectPayment(checkedItem);

      if (checkedItem?.id !== 'VBank') {
        setSelectedEvidence(null);
      }
    }
  };

  const canclePayment = () => {
    setPaymentPhase(false);
    setUsingPoint(0);
    selectPayment({ id: 'Card' });
    setSelectedEvidence();
  };

  const beforeRequest = () => {
    //결제요청 전 벨리데이션 체크
    console.log('beforeRequest usingPoint : ', usingPoint);
    console.log('beforeRequest selectedCoupon : ', selectedCoupon);
    console.log('beforeRequest selectedPayment : ', selectedPayment);
    console.log('beforeRequest selectedEvidence : ', selectedEvidence);
    console.log('beforeRequest agreeItem : ', agreeItem);

    return new Promise((resolve, reject) => {
      if (!agreeItem?.regRule && !hasMobile) {
        showAlert('상품 약관을 확인하세요');
        reject();
      }
      if (!agreeItem?.cashReceipt && !hasMobile) {
        showAlert('매물등록 규정을 확인하세요');
        reject();
      } else {
        resolve({
          valid: true
        });
      }
    });
  };

  const getMssNm = useCallback((mssDvcd) => mssTypes.find((carMss) => carMss.value == mssDvcd)?.label, []);
  const getFuelNm = useCallback((fuelDvcd) => fuelTypes.find((carFuel) => carFuel.value == fuelDvcd)?.label, []);

  const [fpGoods, setFpGoods] = useState(false);
  const [fpGoodsType, setFpGoodsType] = useState('free');
  const [fpPayment, setFpPayment] = useState(false);
  const handleFullpagePopup = useCallback(
    (name, dataInfo, type) => (e) => {
      setSelectedAdv(dataInfo);
      e.preventDefault();
      if (name === 'goods') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '이용권 구매',
            options: ['close']
          }
        });
        setFpGoodsType(type);
        setFpPayment(false);
        setFpGoods(true);
      } else if (name === 'payment') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '이용권 결제',
            options: ['close']
          }
        });
        setFpGoods(false);
        setFpPayment(true);
      }
    },
    [fpGoods, fpPayment]
  );

  const goodsClose = (e) => {
    setFpGoods(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };
  const goodsCallback = (e) => {
    e.preventDefault();
    if (fpGoodsType === 'free') {
      console.log('===> 이용권 구매, 자유이용권 콜백처리');
    } else if (fpGoodsType === 'update') {
      console.log('===> 이용권 구매, 업데이트 자유권 콜백처리');
    } else if (fpGoodsType === 'pricing') {
      console.log('===> 이용권 구매, 프라이싱 조회권 콜백처리');
    }
    setFpGoods(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };
  const onClosePayment = (e) => {
    e.preventDefault();
    setFpPayment(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };

  const checkEvidence = (e, item) => {
    setSelectedEvidence(item);
  };

  if (hasMobile) {
    return (
      <AppLayout>
        <div className className="dealer-register-form">
          <Steps mode="stick" type={1} contents={['차량정보 입력', '성능점검', '가격 및 차량소개', '차량 설명글 입력', '차량사진 등록', '결제', '등록완료']} active={6} />
          <form className="register-form">
            <fieldset>
              <legend className="away">결제</legend>
              <div className="payment-sec method pd20">
                <h3 className="tit2 mb16">기본상품</h3>
                <ul className="usage-wrap mb20">
                  {/* 
                  {
                      prodItem?.auctSbidCrYn === 'Y' ?
                        advItem?.auction?.map((ticket, i) => (
                          <li key={i}>
                            <Radio id={`auction-${i}`} value={ticket?.prdDvcd} checked={selectedAdv?.prdDvcd} onChange={() => setSelectedAdv(ticket)} size="large" name="prod" title={ticket?.prdNm}>
                              <p>경매장에서 낙찰받은 차량 한대를 등록할 수 있습니다.</p>
                              <span className="price">{setComma(ticket?.prdSlAmt)}원</span>
                            </Radio>
                          </li>
                        ))
                        :
                        <>
                          {advItem?.perCar?.map((ticket, i) => (
                            <li key={i}>
                              <Radio id={`perCar-${i}`} value={ticket?.prdDvcd} checked={selectedAdv?.prdDvcd} onChange={() => setSelectedAdv(ticket)} size="large" name="prod" title={ticket?.prdNm}>
                                <p>차종 제한없이 차량 한대를 등록할 수 있습니다.</p>
                                <span className="price">{setComma(ticket?.prdSlAmt)}원</span>
                              </Radio>
                            </li>
                          ))}
                          {freepass?.map((ticket, i) =>
                            <li key={i}>
                              <Radio id={`freepass-${i}`} value={ticket?.prdDvcd} checked={selectedAdv?.prdDvcd} onChange={() => setSelectedAdv(ticket)} size="large" name="prod" title={ticket?.prdNm}>
                                <p>잔여 {(ticket?.crSlot - ticket?.totalPassUseageCnt) ?? 0}대</p>
                                <span className="price">0 원</span>
                              </Radio>
                            </li>
                          )}
                        </>
                    }
                   */}
                  {prodItem?.auctSbidCrYn === 'Y' ? (
                    advItem?.auction?.map((ticket, idx) => {
                      return (
                        <>
                          <li key={idx}>
                            <div className="float-wrap btn-xs">
                              <p>{ticket?.prdNm}</p>
                              <Button
                                size="sml"
                                background="blue80"
                                color="white"
                                radius={true}
                                title="구입하기"
                                width={67}
                                height={24}
                                fontSize={10}
                                fontWeight={500}
                                onClick={handleFullpagePopup('payment', ticket)}
                              />
                            </div>
                          </li>
                          <div className="price-wrap">
                            <p className="price-tp4">
                              {setComma(ticket?.prdSlAmt)}
                              <span className="won">원</span>
                            </p>
                          </div>
                          <p>경매장에서 낙찰받은 차량 한대를 등록할 수 있습니다.</p>
                        </>
                      );
                    })
                  ) : (
                    <>
                      {advItem?.perCar?.map((ticket, idx) => {
                        return (
                          <li key={idx}>
                            <div className="float-wrap btn-xs">
                              <p>{ticket?.prdNm}</p>
                              <Button
                                size="sml"
                                background="blue80"
                                color="white"
                                radius={true}
                                title="구입하기"
                                width={67}
                                height={24}
                                fontSize={10}
                                fontWeight={500}
                                onClick={handleFullpagePopup('payment', ticket)}
                              />
                            </div>
                            <div className="price-wrap">
                              <p className="price-tp4">
                                {setComma(ticket?.prdSlAmt)}
                                <span className="won">원</span>
                              </p>
                              {/* <p className="period">최대 1개월</p> */}
                            </div>
                            <p>차종 제한없이 차량 한대를 등록할 수 있습니다.</p>
                          </li>
                        );
                      })}
                      {(freepassinfo?.crSlot || 0) - (freepassinfo?.prodCnt || 0) > 0 && (
                        <li>
                          <Radio
                            id={`freepass-0`}
                            value={freepassinfo?.prdDvcd}
                            checked={selectedAdv?.prdDvcd}
                            onChange={() => setSelectedAdv(freepassinfo)}
                            size="large"
                            name="prod"
                            title={freepassinfo?.prdNm}
                          >
                            <p>잔여 {freepassinfo?.crSlot - freepassinfo?.prodCnt ?? 0}대</p>
                            <span className="price">0 원</span>
                          </Radio>
                        </li>
                        // freepassinfo?.map((ticket, idx) => {
                        //   return (
                        //     <li key={idx}>
                        //       <div className="float-wrap btn-xs">
                        //         <p>{ticket?.prdNm}</p>
                        //         <p>잔여 {(ticket?.crSlot - ticket?.totalPassUseageCnt) ?? 0}대</p>
                        //         <span className="price">0 원</span>
                        //         <Button size="sml" background="blue80" color="white" radius={true} title="구입하기" width={67} height={24} fontSize={10} fontWeight={500} onClick={handleFullpagePopup('payment')} />
                        //       </div>
                        //     </li>
                        //   )
                        // }))
                      )}
                    </>
                  )}
                  {/* <li>
                    <div className="float-wrap btn-xs">
                      <p>대당 이용권</p>
                      <Button size="sml" background="blue80" color="white" radius={true} title="구입하기" width={67} height={24} fontSize={10} fontWeight={500} onClick={handleFullpagePopup('payment')} />
                    </div>
                    <div className="price-wrap">
                      <p className="price-tp4">24,000<span className="won">원</span></p>
                      <p className="period">최대 1개월</p>
                    </div>
                    <p>차량을  1대당으로 광고로 등록할 수 있는 서비스</p>
                    <p className="tx-tp3">* 일반등록차량리스트에 노출됩니다.</p>
                  </li>
                  <li>
                    <div className="float-wrap btn-xs">
                      <p>자유이용권</p>
                      <Button size="sml" background="blue80" color="white" radius={true} title="구입하기" width={67} height={24} fontSize={10} fontWeight={500} onClick={handleFullpagePopup('goods', 'free')} />
                    </div>
                    <div className="price-wrap">
                      <p className="price-tp4">165,000<span className="won">원~</span></p>
                      <p className="period">최대 1개월<span>월구독결제가능</span></p>
                    </div>
                    <p>선택 기간 동안 선택한 차량 대수를 등록할 수 있는 이용권입니다.</p>
                    <p className="tx-tp3">* 일반등록차량리스트에 노출됩니다.</p>
                    <p className="tx-tp3 mt0">* 등록 차량 판매 완료 시, 기간이 남았다면 다른 차량을 등록할 수 있습니다.</p>
                  </li> */}
                </ul>
              </div>
              <Button
                className="fixed"
                size="full"
                background="blue20"
                color="blue80"
                title="이전"
                buttonMarkup={true}
                onClick={() => {
                  showConfirm('이전 단계로 이동하시겠습니까?', async () => {
                    showLoader();
                    console.log('이전 페이지');
                    await Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }));
                    hideLoader();
                  });
                }}
              />
            </fieldset>
          </form>
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={72}>
          {fpGoods && <MobPaymentGoods type={fpGoodsType} callback={goodsCallback} onClose={goodsClose} />}
          {fpPayment && (
            <>
              <h3 className="tit2 pd20">결제정보</h3>
              <MobPaymentInfo title={'경매 낙찰 이용권'} payment={selectedAdv} paymentMethodList={commonPaymentMethodList} selectedPayment={selectedPayment} onPaymentMethodChanged={selectPayment} />
              <Buttons align="center" className="full fixed">
                <Button size="big" background="blue20" color="blue80" title="취소" onClick={onClosePayment} />
                <IniPayButton
                  directUrl={encodeURIComponent(`${frontUrl}${nextPage}?`)}
                  // directUrl={encodeURIComponent('http://58.87.52.197/mypage/dealer/sellcar/registerCarComplete?')}
                  isMobile={true}
                  size="big"
                  background="blue80"
                  title="결제"
                  width={172}
                  height={60}
                  mode="normal"
                  beforeRequestAsync={beforeRequest}
                  paymethod={selectedPayment?.id}
                  point={usingPoint}
                  coupon={selectedCoupon?.id}
                  items={[selectedAdv]}
                  prodType="pass"
                  type={selectedEvidence?.id}
                  dlrPrdId={dlrPrdId}
                  mobPayMethod={selectedPayment?.id}
                />
              </Buttons>
            </>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  console.log('paymentPhase ~~~~~~~~~~~~~', paymentPhase);
  return (
    <AppLayout>
      <div className="content-wrap register-wrap">
        <MypageNavi />
        <div className={`mypage-state-sec payment-sec ${paymentPhase && `method`}`}>
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={5} />
          </div>

          {!paymentPhase ? (
            <>
              <h3 className="sub-tit">이용권 결제1</h3>
              <div className="admin-list tp2">
                <div className="content-top">
                  {/* <div className="img-cover">
                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                  </div> */}
                  <div className="img-cover">
                    <img src={phtUrl ? imgUrl + phtUrl : frontUrl + '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
                  </div>

                  <ProdCarSummary
                    item={car}
                    slAmt={prodItem?.slAmt}
                    mss={car?.mssNm}
                    fuel={car?.fuelNm}
                  />
                  {/* <div className="summary">
                        <h5 className="subject">{car?.crNm ?? `${car?.crMnfcCdNm} ${car?.crMdlCdNm} ${car?.crClsCdNm}`}</h5>

                        <ul className="info">
                          <li>{car?.crNo}</li>
                          <li>{car?.frmYyyy}</li>
                          <li>{setComma(car?.drvDist)}km</li>
                          <li>{getMssNm(car?.mssDvcd)} - {car?.mssDvcd}</li>
                          <li>{getFuelNm(car?.fuelDvcd)} - {car?.fuelDvcd}</li>
                        </ul>
                        <p className="price-tp6">
                          {setComma(prodItem?.slAmt)}<span className="won">만원</span>
                        </p>
                      </div> */}
                </div>
              </div>

              <div className="usage-wrap">
                <p className="tag-tp5">차량등록상품</p>
                <div className="radio-group tx-list">
                  <ul className="vertical">
                    {prodItem?.auctSbidCrYn === 'Y' ? (
                      advItem?.auction?.map((ticket, i) => (
                        <li key={i}>
                          <Radio id={`auction-${i}`} value={ticket?.prdDvcd} checked={selectedAdv?.prdDvcd} onChange={() => setSelectedAdv(ticket)} size="large" name="prod" title={ticket?.prdNm}>
                            <p>경매장에서 낙찰받은 차량 한대를 등록할 수 있습니다.</p>
                            <span className="price">{setComma(ticket?.prdSlAmt)}원</span>
                          </Radio>
                        </li>
                      ))
                    ) : (
                      <>
                        {advItem?.perCar?.map((ticket, i) => (
                          <li key={i}>
                            <Radio id={`perCar-${i}`} value={ticket?.prdDvcd} checked={selectedAdv?.prdDvcd} onChange={() => setSelectedAdv(ticket)} size="large" name="prod" title={ticket?.prdNm}>
                              <p>차종 제한없이 차량 한대를 등록할 수 있습니다.</p>
                              <span className="price">{setComma(ticket?.prdSlAmt)}원</span>
                            </Radio>
                          </li>
                        ))}
                        {(freepassinfo?.crSlot || 0) - (freepassinfo?.prodCnt || 0) > 0 && (
                          <li>
                            <Radio
                              id={`freepass-0`}
                              value={freepassinfo?.prdDvcd}
                              checked={selectedAdv?.prdDvcd}
                              onChange={() => setSelectedAdv(freepassinfo)}
                              size="large"
                              name="prod"
                              title={freepassinfo?.prdNm}
                            >
                              <p>잔여 {freepassinfo?.crSlot - freepassinfo?.prodCnt ?? 0}대</p>
                              <span className="price">0 원</span>
                            </Radio>
                          </li>
                        )}
                      </>
                    )}

                    {/* { value: 1, title: '경매 낙찰 이용권', text: '경매장에서 낙찰받은 차량 한대를 등록할 수 있습니다.', price: 50000 },
                        { value: 2, title: '대당 이용권', text: '차종 제한없이 차량 한대를 등록할 수 있습니다.', price: 24000 },
                        { value: 3, title: '10대 자유 이용권', text: '잔여 3대', price: 0 } */}
                  </ul>
                </div>
              </div>
              {/* 
                  <div className="usage-wrap">
                    <p className="tag-tp5">부가상품</p>

                    <ul className="tx-list">
                      {tempAdditionalProdList.map((tempAdditionalProd, i) => (
                        <li key={i}>
                          <CheckBox id={`chk-${i}`} title={tempAdditionalProd.title} onChange={check} name="addProd" />
                          <p>{tempAdditionalProd.text}</p>
                          <span className="price">
                            {setComma(tempAdditionalProd.price)}
                            <em>원</em>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div> */}

              <div className="pick-list">
                {selectedAdv && (
                  <ul>
                    <li>{selectedAdv?.prdNm}</li>
                    <li>{/* {selectedAdv?.prdAdNot}대 */}</li>
                    <li>{setComma(selectedAdv?.prdSlAmt)} 원</li>
                  </ul>
                )}
              </div>
              <div className="sum">
                <p>합계 금액</p>
                <p className="price">
                  {setComma(selectedAdv?.prdSlAmt)}
                  <span>원</span>
                </p>
              </div>

              <Buttons marginTop={51}>
                <span className="step-btn-l">
                  <Button
                    size="big"
                    background="gray"
                    title="이전"
                    width={150}
                    height={60}
                    buttonMarkup={true}
                    onClick={() => {
                      showConfirm('이전 단계로 이동하시겠습니까?', async () => {
                        showLoader();
                        console.log('이전 페이지');
                        await Router.push(prevPage + '?' + qs.stringify({ dlrPrdId }));
                        hideLoader();
                      });
                    }}
                  />
                </span>
                <span className="step-btn-r">
                  <Button size="big" background="blue80" title="다음" width={127} height={60} buttonMarkup={true} onClick={goPaymentPhase} />
                </span>
              </Buttons>
            </>
          ) : (
            <>
              <h3 className="sub-tit">이용권 결제</h3>
              <div className="point-area">
                <div className="pay-detail">
                  <h4>구매내역</h4>
                  <div className="pick-list">
                    {/*
                        prdDvcd: "223000001"
                        prdMgrpDvcd: "23"
                        prdNm: "경매낙찰이용권"
                        prdSlAmt: 44000
                        prdSlAmt: 44000
                        dcRt: 0
                        prdDtlSno: 1
                        prdUseTrmNot: 1 //개월수
                        prdAdNot: 1 //차량 대수
                        prdUseNot: 0
                      */}
                    {selectedAdv && (
                      <ul>
                        <li>{selectedAdv?.prdNm}</li>
                        {selectedAdv?.prdUseTrmNot && selectedAdv?.prdAdNot && (
                          <li>
                            {selectedAdv?.prdUseTrmNot}개월 {selectedAdv?.prdAdNot}대
                          </li>
                        )}
                        <li>{setComma(selectedAdv?.prdSlAmt)}원</li>
                      </ul>
                    )}
                    {/* <ul>
                        <li>업데이트 20 자유</li>
                        <li>3개월 10대</li>
                        <li>742,000원</li>
                      </ul>
                      <ul>
                        <li>프라이싱 10회</li>
                        <li>10회</li>
                        <li>10,000원</li>
                      </ul>
                      <div className="sum">
                        <p>합계 금액</p>
                        <p className="price">890,000<span>원</span></p>
                      </div> */}
                  </div>
                </div>

                {/* <PointSelector
                  point={usingPoint}
                  onChange={inputPoint}
                /> */}

                {/* <CouponSelector
                  item={selectedCoupon}
                  onChange={selectCoupon}
                >
                  <p className="ex">
                    적립된 포인트는 3,000원부터 사용이 가능하며 쿠폰, 포인트 결제 금액을 제외한 구매 금액의 N%가 포인트로 적립됩니다.<br />
                    <span className="tx-red80">쿠폰 적용 시에는 추가 결제와 혼합 사용하실 수 없습니다.</span>
                  </p>
                </CouponSelector> */}
              </div>
              <div className="last-sum">
                <ul>
                  <li>
                    이용권금액
                    <span>
                      {setComma(selectedAdv?.prdSlAmt)}
                      <em>원</em>
                    </span>
                  </li>
                  <li>
                    할인금액
                    <span>
                      0<em>원</em>
                    </span>
                  </li>
                  <li>
                    최종결제금액
                    <span>
                      {setComma(selectedAdv?.prdSlAmt)}
                      <em>원</em>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="method-wrap">
                <p>결제 수단</p>
                <div className="radio-group">
                  {commonPaymentMethodList.map((tempPaymentMethod, i) => (
                    <Radio
                      key={i}
                      id={`payment-${tempPaymentMethod?.id}`}
                      title={tempPaymentMethod?.title}
                      checked={selectedPayment?.id}
                      value={tempPaymentMethod?.id}
                      name="payment"
                      onChange={checkPayment}
                    />
                  ))}
                </div>
              </div>

              {/* #a1 증빙선택 추가, 약관추가 start */}
              {selectedPayment?.id === 'VBank' && <EvidenceSelector item={selectedEvidence} onChange={checkEvidence} />}

              <div className="register-agree">
                <CheckBox
                  id="chk-useGuide2"
                  checked={agreeItem?.regRule}
                  title="상품 약관 확인(필수)"
                  termPop={true}
                  onChange={handleChangeAgree}
                  termPopHandle={() => openTermsPop('regRule')}
                  name="regRule"
                />
                <CheckBox
                  id="chk-useGuide1"
                  checked={agreeItem?.cashReceipt}
                  title="현금영수증 신청 (필수)"
                  termPop={true}
                  onChange={handleChangeAgree}
                  termPopHandle={() => openTermsPop('cashReceipt')}
                  name="cashReceipt"
                />
              </div>
              {/* #a1 증빙선택 추가, 약관추가 팝업 end */}

              <Buttons marginTop={51}>
                <span className="step-btn-l">
                  <Button size="big" background="gray" title="취소" buttonMarkup={true} onClick={canclePayment} width={150} height={60} />
                </span>
                <span className="step-btn-r">
                  <IniPayButton
                    size="big"
                    background="blue80"
                    title="결제"
                    width={150}
                    height={60}
                    mode="normal"
                    beforeRequestAsync={beforeRequest}
                    paymethod={selectedPayment?.id}
                    point={usingPoint}
                    coupon={selectedCoupon?.id}
                    items={[selectedAdv]}
                    prodType="pass"
                    type={selectedEvidence?.id}
                    dlrPrdId={dlrPrdId}
                  />
                </span>
              </Buttons>
            </>
          )}
        </div>
      </div>
      <RodalPopup show={displayTermsPop} type={'fade'} closedHandler={hideTermsPop} title={currentPop?.title} mode="normal" size="medium">
        <div className="con-wrap">{currentPop?.contents}</div>
      </RodalPopup>
    </AppLayout>
  );
};

registerCarProdSelection.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query, url, accessToken } = helper;
  const { dlrPrdId } = query;

  console.log('registerCarProdSelection.getInitialProps -> accessToken 111 ', accessToken);
  await helper
    .setRedirectUrl(prevPage, { dlrPrdId })
    .requiredQuery('dlrPrdId')
    .accessControl()
    .memberAccessControlAsync()
    .then(() => {
      helper.error();
    });

  const [advProd = {}, advItem, prodItem, memberInfo = {}, couponList = []] = await Promise.all([
    dealerAdverApi.selectAdverPassInfo().then((res) => res?.data?.data),
    dealerAdverApi.selectAdverProductList().then((res) => res?.data),
    dealerProdApi.selectSaleProdItem(dlrPrdId).then((res) => res?.data?.data),
    memberApi.selectMbInfo().then((res) => res?.data?.data)
    // dealerAdverApi.selectCouponList().then((res) => res?.data?.data),
  ]);

  console.log('registerCarProdSelection.getInitialProps 111111111111111111 advProd', advProd);
  console.log("registerCarProdSelection.getInitialProps 111111111111111111 advItem", advItem)
  console.log("registerCarProdSelection.getInitialProps 111111111111111111 prodItem", prodItem)
  console.log("registerCarProdSelection.getInitialProps 111111111111111111 memberInfo", memberInfo)

  const { freepassinfo, updatefreepassinfo } = advProd;

  if (!prodItem) {
    helper.error({ code: 204, message: '상품이 없습니다' });
  }

  const { crId, sttDvcd } = prodItem || {};
  // console.log("registerCarProdSelection.getInitialProps -> crId", crId)
  // console.log("registerCarProdSelection.getInitialProps -> sttDvcd", sttDvcd)
  console.log('registerCarProdSelection.getInitialProps -> accessToken 222 ', accessToken);

  const { data: photoList = [], statusinfo: picStatusinfo } = await dealerProdApi.selectSaleCarPic(crId).then((res) => res?.data);

  // console.log("registerCarProdSelection.getInitialProps -> photoList", photoList)
  // console.log("registerCarProdSelection.getInitialProps -> picStatusinfo", picStatusinfo)
  console.log('registerCarProdSelection.getInitialProps -> accessToken 333 ', accessToken);

  return {
    query,
    freepassinfo,
    updatefreepassinfo,
    advItem,
    couponList,
    prodItem,
    photoList,
    memberInfo
  };
};

export default registerCarProdSelection;
