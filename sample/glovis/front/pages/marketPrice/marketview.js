import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import PricingReport from '@src/components/pricingSystem/pricingReport';
import PricingSearchCar from '@src/components/pricingSystem/pricingSearchCar';
import PricingCarGradePopUp from '@src/components/pricingSystem/pricingCarGradePopUp';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Button from '@lib/share/items/Button';
import ShareCarInfo from '@src/components/common/ShareCarInfo';
import { dateFormat, getCarOptionText, getSharedUrl, getSharedTitle, isValidationCarInfo, numberWithCommas } from '@src/components/pricingSystem/pricingUtil';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import withPricing from '@src/hoc/pricing/withPricing';
import withSearchCar from '@src/hoc/pricing/withSearchCar';

const MarketView = ({ hasCarInfo, hasPricing, marketPrice, pricingCarInfo, router, onGetPricingCarInfo, onGetPricing, onSearchCarNo, onSellCar, onSelectOptions, onUpdateCarInfo }) => {
  const { result, report, search } = router.query;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MARKET_PRICE });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const hasHyundai = router?.query.hyundai === 'Y';
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [carInfo, setCarInfo] = useState(pricingCarInfo || {});

  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [fpFilter01, setFpFilter01] = useState(false);
  const [fpCarModify, setFpCarModify] = useState(false);
  const [withoutList] = useState(result === 'no' ? true : false);

  const handleFullpagePopup = useCallback(
    (name) => (e) => {
      e.preventDefault();
      if (name === 'f1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: carInfo.crNm || '',
            options: ['back']
          }
        });
        setFpCarModify(false);
        setFpFilter01(true);
      } else if (name === 'car_modify') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 정보 수정',
            options: ['back', 'close']
          }
        });
        setFpFilter01(false);
        setFpCarModify(true);
      }
    },
    [dispatch, carInfo.crNm]
  );

  const handleOpenReport = useCallback(
    (e) => {
      e.preventDefault();
      if (carInfo.resStatus.rstCode === '1' && isValidationCarInfo(carInfo) === false) {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 정보 수정',
            options: ['back', 'close']
          }
        });
        setFpFilter01(false);
        setFpCarModify(true);
        return;
      }

      setActive1(true);
      setDimm1(true);

      if (carInfo.resStatus.rstCode === '1') {
        onGetPricing(e, carInfo);
      } else if (carInfo.resStatus.rstCode === '2') {
        onSearchCarNo(e, carInfo);
      }
    },
    [carInfo, dispatch, onGetPricing, onSearchCarNo]
  );

  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, []);

  const handleCloseDimm2 = useCallback(() => {
    setActive2(false);
    setDimm2(false);
    preventScroll(false);
  }, []);

  const handleSelectGrade = useCallback(
    (e, deps) => {
      const newCarInfo = Object.assign({ ...carInfo }, { seriesNo: deps.seriesNo, seriesNm: deps.seriesNm });
      setCarInfo(newCarInfo);
      onGetPricingCarInfo(carInfo.crNo, newCarInfo);
      setFpFilter01(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [carInfo, dispatch, onGetPricingCarInfo]
  );

  const handleCarInfoUpdated = useCallback(
    (e, deps) => {
      setCarInfo(deps);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      onUpdateCarInfo(e, deps);
    },
    [dispatch, onUpdateCarInfo]
  );

  const handleOpenShare = useCallback((e) => {
    e.preventDefault();
    setActive2(true);
    setDimm2(true);
    preventScroll(true);
  }, []);

  const handleSellClick = useCallback(
    (e) => {
      e.preventDefault();

      if (hasHyundai === true) {
        setDimm1(false);
        setActive1(false);
        preventScroll(false);
      } else {
        onSellCar(e);
      }
    },
    [hasHyundai, onSellCar]
  );

  useEffect(() => {
    if (pricingCarInfo) {
      setCarInfo({ ...pricingCarInfo });
      if (pricingCarInfo.modelNo && onSelectOptions) {
        onSelectOptions({}, { detailModelId: pricingCarInfo.modelNo });
      }
    } else {
      setCarInfo({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricingCarInfo]);

  useEffect(() => {
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '조회결과',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: search === 'number' ? (hasHyundai ? 0 : 56) : 0
        }
      });
      if (Boolean(report) === true) {
        preventScroll(true);
      }
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 120,
          color: '#fff'
        }
      });
      if (search === 'number') {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 120,
            color: '#fff'
          }
        });
      }
      if (search === 'condition') {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 48,
            color: '#fff'
          }
        });
      }
      if (withoutList) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 0,
            color: '#fff'
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasMobile) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap market-view-sec pt14">
          {withoutList === true ? (
            <>
              <div className="search-none">
                <h3>검색결과가 없습니다.</h3>
                <p>
                  1. 검색 옵션을 변경해서 다시 검색해 보세요.
                  <br />
                  2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                </p>
                <p className="tx-disabled">* 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.</p>
              </div>
            </>
          ) : (
            <>
              <div className="tit-wrap">
                <h4 className="fl">{search === 'number' ? '차량 기본 정보' : '차량 정보'}</h4>
                {search === 'number' && !objIsEmpty(carInfo.grades) && (
                  <div className="btn-wrap fr">
                    <Button size="sml" line="gray" radius={true} title="모델재선택" width={72} onClick={handleFullpagePopup('f1', 'research=yes')} />
                  </div>
                )}
              </div>
              <table summary="차량 정보에 대한 내용" className="table-tp1">
                <caption className="away">차량 정보</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="25%" />
                  <col width="20%" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량명</th>
                    <td colSpan="4">{carInfo.crNm}</td>
                  </tr>

                  <tr>
                    <th>차량번호</th>
                    <td colSpan="4">{carInfo.crNo}</td>
                  </tr>
                  <tr>
                    <th>차량연식</th>
                    <td>{carInfo.noy ? `${carInfo.noy}년` : ''}</td>
                    <th>배기량</th>
                    <td>
                      {carInfo.dspl
                        ? `${numberWithCommas(
                            carInfo.dspl
                              .toString()
                              .replace(/cc/g, '')
                              .replace(/,/g, '')
                          )}cc`
                        : ''}
                    </td>
                  </tr>
                  {carInfo && carInfo.rlsPrc ? (
                    <tr>
                      <th>신차출고가</th>
                      <td>
                        <span style={{ marginRight: 3 }}>{numberWithCommas(parseInt(carInfo.rlsPrc) / 10000)}</span>
                        <span style={{ display: 'inline-block' }}>만원</span>
                      </td>
                      <th>연료</th>
                      <td>{carInfo.fuel}</td>
                    </tr>
                  ) : null}
                  {carInfo && carInfo.drvDist ? (
                    <tr>
                      <th>주행거리</th>
                      <td>
                        <span style={{ marginRight: 3 }}>{numberWithCommas(carInfo.drvDist)}</span>
                        <span style={{ display: 'inline-block' }}>km</span>
                      </td>
                      <th>색상</th>
                      <td>{carInfo.clr}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <th>차량옵션</th>
                    <td colSpan="4">{getCarOptionText(carInfo.carOptions, true)}</td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td colSpan="4">{dateFormat(carInfo.frstRegDt)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-tp2 mt8">* 옵션 정보가 실제와 다르다면 아이콘 ON/OFF를 해주세요</p>
              {search === 'number' && (
                <>
                  {hasCarInfo && pricingCarInfo.resStatus.rstCode === '1' && (
                    <Button className="fr" size="sml" line="gray" radius={true} title="차량정보 수정" width={96} marginTop={8} onClick={handleFullpagePopup('car_modify')} />
                  )}

                  {hasCarInfo && pricingCarInfo.resStatus.rstCode === '2' ? null : (
                    <Button className="fixed" size="full" background="blue80" title={isValidationCarInfo(pricingCarInfo) ? '결과보기' : '세부정보입력'} height={56} onClick={handleOpenReport} />
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm1} />
        <MobBottomArea active={active1} zid={102}>
          <PricingReport dataContext={pricingCarInfo} marketPrice={marketPrice} hasMobile={true} hasShare={false} hasHyundai={hasHyundai} onOpenShare={handleOpenShare} onSellClick={handleSellClick} />
        </MobBottomArea>

        <div className={dimm2 ? 'modal-bg v-3 active' : 'modal-bg v-3'} onClick={handleCloseDimm2} />

        <MobBottomArea active={active2} zid={102}>
          <div className="inner">
            <h3 className="tit1 mb24">공유하기</h3>
            {active2 && pricingCarInfo && pricingCarInfo.resStatus && pricingCarInfo.resStatus.uid && marketPrice && marketPrice.reportId ? (
              <ShareCarInfo url={getSharedUrl(marketPrice.reportId, pricingCarInfo.resStatus.uid)} title={getSharedTitle()} />
            ) : null}
          </div>
        </MobBottomArea>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpFilter01 && <PricingCarGradePopUp dataContext={pricingCarInfo.grades} hasMobile={true} modelNo={pricingCarInfo.modelNo} onGradeSelect={handleSelectGrade} />}
          {fpCarModify && (
            <PricingSearchCar hasMobile={true} hasMobileEdit={true} hasNoInit={true} dataContext={pricingCarInfo} hasPricing={hasPricing} type="marketPrice" onCarInfoUpdated={handleCarInfoUpdated} />
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

MarketView.propTypes = {
  hasCarInfo: PropTypes.bool,
  hasPricing: PropTypes.bool,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  router: PropTypes.object,
  onGetPricing: PropTypes.func,
  onGetPricingCarInfo: PropTypes.func,
  onSearchCarNo: PropTypes.func,
  onSelectOptions: PropTypes.func,
  onSellCar: PropTypes.func,
  onUpdateCarInfo: PropTypes.func
};

export default withRouter(withPricing(withSearchCar(MarketView)));
