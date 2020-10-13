import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Router, { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import DynamicTag from '@lib/share/items/DynamicTag';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import PriceChart from '@src/components/pricingSystem/chart/priceChart';
import PricingSearchCar from '@src/components/pricingSystem/pricingSearchCar';
import PricingAuctionTableList from '@src/components/pricingSystem/pricingAuctionTableList';
import PricingCarGradeSpec from '@src/components/pricingSystem/pricingCarGradeSpec';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobFilterModel from '@src/components/common/MobFilterModel';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';
import { dateFormat, getPringCarGradeSpecifation, getCarDefaultImage, isValidationCarInfo, numberWithCommas } from '@src/components/pricingSystem/pricingUtil';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import withPricing from '@src/hoc/pricing/withPricing';
import withSearchCar from '@src/hoc/pricing/withSearchCar';

const PricingView = memo(({ bidList, carCondOptions, hasPricing, isLoading, marketPrice, pricingCarInfo, router, onGetPricingCarInfo, onGetPricing, onSelectOptions, onUpdateCarInfo }) => {
  const { result, report } = router.query;
  const dispatch = useDispatch();

  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [carInfo, setCarInfo] = useState(pricingCarInfo || {});
  const [isPopUp, setIsPopUp] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [modelSeries, setModelSeries] = useState([]);
  const [fpFilterModel, setFpFilterModel] = useState(false);
  const [fpGrade, setFpGrade] = useState(false);
  const [fpCarModify, setFpCarModify] = useState(false);
  const [withoutList] = useState(result === 'no' ? true : false);
  const [selectedAuctionInfo, setSelectedAuctionInfo] = useState(null);
  const [pricingCarGradeSpecData, setPricingCarGradeSpecData] = useState({});

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
        setFpFilterModel(false);
        setFpGrade(false);
      } else if (name === 'car_modify') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 정보 수정',
            options: ['close']
          }
        });
        setFpCarModify(true);
        setFpFilterModel(false);
        setFpGrade(false);
      } else if (name === 'car_model') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '차량 모델 재선택',
            options: ['back']
          }
        });
        setFpCarModify(false);
        setFpFilterModel(true);
        setFpGrade(false);
      }
    },
    [dispatch, carInfo.crNm]
  );

  const handleFullpagePopup2 = useCallback(
    (e, deps) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '등급 상세',
          options: ['close']
        }
      });

      getPringCarGradeSpecifation(deps.modelNo, deps.seriesNo).then((list) => {
        const payload = {
          seriesNm: deps.seriesNm,
          seriesPrice: deps.seriesPrice,
          list: list || []
        };
        setPricingCarGradeSpecData(payload);
        setFpGrade(true);
        setFpCarModify(false);
        setFpFilterModel(false);
      });

      console.log(deps);
    },
    [dispatch]
  );

  const handleFullpageClose = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    },
    [dispatch]
  );

  const handleCarModelSelect = useCallback(
    (e, deps) => {
      getCarDefaultImage(deps.detailModelId).then((imgUrl) => {
        const newCarInfo = Object.assign(
          { ...carInfo },
          {
            crNm: `${deps.detailModelNm || ''} ${deps.classNm || ''} ${deps.name || ''}`,
            rlsPrc: deps.price || 0,
            defaultImg: imgUrl,
            seriesNo: '',
            frstRegDt: null,
            drvDist: '',
            clr: '',
            dspl: '',
            fuel: '',
            mss: '',
            noy: '',
            historyData: {},
            modelInfo: {
              crMnfcCd: deps.manufactureId,
              crMdlCd: deps.modelId,
              crDtlMdlCd: deps.detailModelId,
              crClsCd: deps.classId || deps.id,
              crDtlClsCd: deps.classId ? deps.id : '',
              crMnfcCdNm: deps.manufactureNm,
              crMdlCdNm: deps.modelNm,
              crDtlMdlCdNm: deps.detailModelNm,
              crClsCdNm: deps.classNm || deps.name,
              crDtlClsCdNm: deps.classNm ? deps.name : ''
            },
            carOptions: [...carCondOptions]
          }
        );
        onSelectOptions(e, deps);
        setCarInfo(newCarInfo);
        setFpFilterModel(false);
        onUpdateCarInfo(e, newCarInfo);
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      });
    },
    [carCondOptions, carInfo, dispatch, onSelectOptions, onUpdateCarInfo]
  );

  const handleSelectGrade = useCallback(
    (e) => {
      const findGrade = modelSeries.find((x) => x.value === e);
      if (findGrade) {
        const newCarInfo = Object.assign({ ...carInfo }, { seriesNo: findGrade.seriesNo, seriesNm: findGrade.seriesNm });
        setCarInfo(newCarInfo);
        onGetPricingCarInfo(carInfo.crNo, newCarInfo);
      }
    },
    [carInfo, modelSeries, onGetPricingCarInfo]
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

  const handlePopUpToggle = useCallback(
    (e, deps) => {
      e.preventDefault();
      setIsPopUp(!isPopUp);
      setSelectedAuctionInfo(deps || null);
      preventScroll(isPopUp);
    },
    [isPopUp]
  );

  const handleIsMoreToggle = useCallback(
    (e) => {
      e.preventDefault();
      setIsMore(!isMore);
    },
    [isMore]
  );

  const handleDetailView = useCallback((e, deps) => {
    e.preventDefault();
    if (deps) {
      Router.push({ pathname: '/pricingSystem/pricingauction', query: { auctionInfo: JSON.stringify(deps) } }, '/pricingSystem/pricingauction');
    }
  }, []);

  const handleModeAuction = useCallback(
    (e) => {
      e.preventDefault();
      Router.push({ pathname: '/pricingSystem/pricingbidinfo', query: { bidList: JSON.stringify(bidList) } }, '/pricingSystem/pricingbidinfo');
    },
    [bidList]
  );

  useEffect(() => {
    if (pricingCarInfo) {
      const series = (pricingCarInfo.grades || []).map((item) => {
        return {
          id: `p-rdo-${item.seriesNo}`,
          value: item.value,
          checked: item.checked || false,
          disabled: false,
          label: item.seriesNm,
          hasDetail: {
            modelNo: pricingCarInfo.modelNo,
            seriesNo: item.seriesNo,
            seriesNm: item.seriesNm,
            seriesPrice: item.seriesPrice
          },
          price: item.seriesPrice,
          seriesNo: item.seriesNo,
          seriesNm: item.seriesNm
        };
      });
      setCarInfo({ ...pricingCarInfo });
      setModelSeries(series);
      if (pricingCarInfo.modelNo && onSelectOptions) {
        onSelectOptions({}, { detailModelId: pricingCarInfo.modelNo });
      }
    } else {
      setCarInfo({});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricingCarInfo]);

  useEffect(() => {
    if (objIsEmpty(router.query.carInfo)) {
      Router.push('/pricingSystem/pricing');
      return;
    }

    dispatch({ type: SECTION_MARKET_PRICE });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '조회결과',
        options: ['back', 'voucher', 'gnb'],
        events: [
          null,
          () => {
            // eslint-disable-next-line no-alert
            alert('이용 구매 페이지로 이동합니다.');
          },
          null
        ]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    dispatch({
      type: MOBILE_FOOTER_EXIST,
      data: {
        exist: false
      }
    });
    if (Boolean(report) === true) {
      setIsPopUp(true);
      preventScroll(true);
    }
    if (withoutList) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 120
        }
      });
    }

    window.scrollTo(0, 0);
    router.prefetch('/pricingSystem/pricingauction');
    router.prefetch('/pricingSystem/pricingbidinfo');
    router.prefetch('/pricingSystem/pricingperforaccident');
    router.prefetch('/pricingSystem/pricingspecify');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

            <div className="re-price">
              <h3 className="tit2">시세 재검색</h3>
              <Buttons align="center" marginTop={16}>
                <Button size="big" background="blue20" color="blue80" radius={true} title="차량 조건 검색" width={163} height={56} href="marketSearch" />
                <Button size="big" background="blue20" color="blue80" radius={true} title="차량번호로 조회" width={163} height={56} />
              </Buttons>
            </div>
          </>
        ) : (
          <>
            <div className="tit-wrap">
              <h4 className="fl">차량 기본 정보</h4>
              {hasPricing === false && objIsEmpty(pricingCarInfo?.crNo) && (
                <div className="btn-wrap fr">
                  <Button size="sml" line="gray" radius={true} title="모델재선택" width={72} onClick={handleFullpagePopup('car_model')} />
                </div>
              )}
            </div>
            <table summary="차량 정보에 대한 내용" className="table-tp1">
              <caption className="away">차량 정보</caption>
              <colgroup>
                <col width="27%" />
                <col width="25%" />
                <col width="20%" />
                <col width="28%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량명</th>
                  <td colSpan="4">{carInfo?.crNm}</td>
                </tr>
                {isMore && (
                  <>
                    {carInfo && carInfo.crNo && (
                      <tr>
                        <th>차량번호</th>
                        <td colSpan="4">{carInfo?.crNo}</td>
                      </tr>
                    )}
                    <tr>
                      <th>주행거리</th>
                      <td>{numberWithCommas(carInfo.drvDist, ' km')}</td>
                      <th>연식</th>
                      <td>{carInfo.noy}년</td>
                    </tr>
                    <tr>
                      <th>최초등록일</th>
                      <td colSpan="4">{dateFormat(carInfo.frstRegDt)}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            {isMore && hasPricing === false && (
              <Button className="fr" size="sml" line="gray" radius={true} title="차량정보 수정" width={96} marginTop={8} onClick={handleFullpagePopup('car_modify')} />
            )}

            {carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '2' && (
              <div className="mt32">
                <MobSelectBox
                  options={modelSeries}
                  customButton={true}
                  customButtonName="해당등급을 선택하세요"
                  pricingMgrade={handleFullpagePopup2}
                  customButtonHeight={56}
                  areaClass="btn-v"
                  onClick={handleSelectGrade}
                />
              </div>
            )}

            {carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '2' ? null : (
              <Button
                size="full"
                line="gray"
                radius={true}
                title={isMore ? '닫기' : '더보기'}
                height={38}
                marginTop={8}
                iconType={isMore ? 'arrow-top-gray' : 'arrow-bottom-gray'}
                onClick={handleIsMoreToggle}
              />
            )}

            {(carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '2') || isValidationCarInfo(pricingCarInfo) ? (
              isLoading === true ? null : (
                <Button size="full" line="gray" radius={true} marginTop={8} height={38} title={hasPricing === true ? '재조회' : '결과보기'} onClick={onGetPricing} />
              )
            ) : (
              <Button size="full" line="gray" radius={true} marginTop={8} height={38} title={'세부정보입력'} onClick={handleFullpagePopup('car_modify')} />
            )}

            {hasPricing === true && (
              <>
                <div style={{ height: '20px' }} />
                <PriceChart hasPricingSystem={true} marketPrice={marketPrice} hasMobile={true} />
                <div className="bid-info-wrap">
                  <h3 className="tit2">동급차량 실제 낙찰 정보</h3>
                  <ul className="goods-list tx-list">
                    <SlideBanner touch={true} dots={false} autoplay={false} customArrow={true} multiNum={1} infinite={false} markupAll={true} variableWidth={true}>
                      {(bidList || []).slice(0, 5).map((item, idx) => {
                        return (
                          <li key={idx}>
                            <DynamicTag tagName="p" id={`dlide-${idx}`} dataContext={item} className="tit" onClick={handlePopUpToggle}>
                              {item.carnm}
                            </DynamicTag>
                            <div className="cont">
                              <ul>
                                <li>{item.yarn}년식</li>
                                <li>{item.travdist}km</li>
                                <li>경매일 : {item.succymd.substr(0, 6)}</li>
                              </ul>
                              <div className="float-wrap">
                                <p className="fl">
                                  평가 : <span className="tx-blue80">{item.evalpoint}</span>
                                </p>
                                <p className="price-tp8 fr">
                                  {item.succpric}
                                  <span className="won">만원</span>
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </SlideBanner>
                  </ul>
                  <div className={isPopUp ? 'modal-bg active' : 'modal-bg'} onClick={handlePopUpToggle} />
                  <MobBottomArea active={isPopUp} isFixButton={true}>
                    <div className="inner">
                      <div className="float-wrap btn-s mb20">
                        <h3 className="tit1 fl">{selectedAuctionInfo?.carnm}</h3>
                        <Button className="fr" size="sml" line="gray" radius={true} dataContext={selectedAuctionInfo} title="상세보기" width={50} onClick={handleDetailView} />
                      </div>
                      <PricingAuctionTableList dataContext={selectedAuctionInfo} isMobile={true} />
                      <Button className="fixed" size="full" background="blue80" title="확인" onClick={handlePopUpToggle} />
                    </div>
                  </MobBottomArea>
                </div>
                {(bidList || []).length > 0 ? (
                  <Buttons align="center">
                    <Button size="mid" background="blue80" radius={true} title="낙찰정보 더보기" width={126} onClick={handleModeAuction} />
                  </Buttons>
                ) : null}
              </>
            )}
          </>
        )}

        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={40} color={'#fff'} loading={true} />
          </div>
        )}
      </div>

      <MobBottomArea isFix={true} isSimple={true}>
        {withoutList && (
          <Link href="/sell/sellHome">
            <a>
              <div className="bn-wrap mt48">
                <p>
                  현대 오토벨에서<span>내차팔기</span>
                </p>
              </div>
            </a>
          </Link>
        )}
      </MobBottomArea>

      <MobFullpagePopup active={mFullpagePopup} paddingBottom={80} zid={fpGrade ? 105 : null}>
        {fpCarModify && <PricingSearchCar hasMobile={true} hasMobileEdit={true} hasNoInit={true} dataContext={carInfo} hasPricing={hasPricing} onCarInfoUpdated={handleCarInfoUpdated} />}
        {fpFilterModel && (
          <MobFilterModel
            result={'yes'}
            kind={'manufacturer'}
            research={'no'}
            onCarModelSelect={handleCarModelSelect}
            dataContext={{
              manufactureId: carInfo?.modelInfo?.crMnfcCd,
              manufactureNm: carInfo?.modelInfo?.crMnfcCdNm,
              modelId: carInfo?.modelInfo?.crMdlCd,
              modelNm: carInfo?.modelInfo?.crMdlCdNm
            }}
          />
        )}
        {fpGrade && (
          <>
            <PricingCarGradeSpec isMobile={true} pricingCarGradeSpec={pricingCarGradeSpecData} />
            <Button className="fixed" size="full" background="blue80" title="확인" height={56} onClick={handleFullpageClose} />
          </>
        )}
      </MobFullpagePopup>
    </AppLayout>
  );
});

PricingView.propTypes = {
  bidList: PropTypes.array,
  carCondOptions: PropTypes.array,
  hasPricing: PropTypes.bool,
  isLoading: PropTypes.bool,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  router: PropTypes.object,
  onGetPricingCarInfo: PropTypes.func,
  onGetPricing: PropTypes.func,
  onSelectOptions: PropTypes.func,
  onUpdateCarInfo: PropTypes.func
};

PricingView.displayName = 'PricingView';

export default withRouter(withPricing(withSearchCar(PricingView)));
