import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FilterRange from '@lib/share/items/FilterRange';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';

import { setComma, removeComma } from '@src/utils/StringUtil';
import { fetchMarketPriceAction } from '@src/actions/buycar/buyCarDetailActions';
import { SystemContext } from '@src/provider/SystemProvider';

import { iconClass } from '@src/constant/sellcar/carOptions';
import { getPricingCarColors, getPricingCarOptions } from '@src/components/pricingSystem/pricingUtil';
import { numberFormat } from '@src/utils/CommonUtil';

const MypageSellPrice = ({ value = 0, onChange, mode = 'tooltip', item = {} }) => {
  console.log('MypageSellPrice item ::::::: ', item);
  const dispatch = useDispatch();

  const { car } = item;
  const { showLoader, hideLoader } = useContext(SystemContext);
  // const [isCalledMarketPrice, setIsCalledMarketPrice] = useState(false);
  const [isCalledMarketPrice, setIsCalledMarketPrice] = useState(false);

  const { hasMobile, marketPrice } = useSelector((state) => ({
    hasMobile: state.common.hasMobile,
    marketPrice: state.buyCarDetail.marketPrice ?? {}
  }));

  const [commaNumber, setCommaNumber] = useState(setComma(value));

  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [appPrice, setAppPrice] = useState('');

  useEffect(() => {
    setMaxPrice(marketPrice.maxPrice);
    setMinPrice(marketPrice.minPrice);
    setAppPrice(marketPrice.appPrice);
  }, [marketPrice]);

  useEffect(() => {
    setMaxPrice('');
    setMinPrice('');
    setAppPrice('');
    return () => {
      setMaxPrice('');
      setMinPrice('');
      setAppPrice('');
    };
  }, []);

  const inputPrice = (e) => {
    const { value, name } = e.target;
    const pureNumber = removeComma(value); //parseInt(value.replace(/\,/gi, ''));

    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: pureNumber || 0
      }
    });
    setCommaNumber(setComma(pureNumber));
  };

  useEffect(() => {
    setCommaNumber(setComma(value));
  }, [value]);

  useEffect(() => {
    console.log('marketPrice ::::::: ', marketPrice);
  }, [marketPrice]);

  useEffect(() => {
    const { car } = item;
    if (car && !isCalledMarketPrice) {
      //if (car) {
      const pricingCarColors = getPricingCarColors();
      const pricingCarOptions = getPricingCarOptions();
      const colorInfo = pricingCarColors?.find((item) => item?.cdId === car?.crClrCd);
      console.log('colorInfo', colorInfo);
      const parsedCar = {
        ...car,
        carNo: car.crNo,
        clr: colorInfo?.groupCode, //clr
        clrName: colorInfo?.groupCode, //clr
        crClrCdNm: colorInfo?.value || car.crClrCdNm, //clrName
        fuelNm: car.fuelNm,
        mssNm: car.mssNm,
        frstRegDt2: car.frstRegDt,
        crRlsPrc: parseInt(car.crRlsPrc) // * 10000
      };
      console.log('parsedCar', parsedCar);

      const crId = car?.crId;
      const parseOptions =
        car?.optionList
          ?.map((item) => {
            let className = iconClass[item?.optCd];
            if (className === 'sunroof') className = 'sunroof-common';
            return {
              crId,
              optDiv: 'D',
              optNm: pricingCarOptions.find((option) => option.id === className)?.label
            };
          })
          ?.filter((item) => !!item.optNm) ?? [];
      showLoader();
      dispatch(fetchMarketPriceAction(parsedCar, parseOptions)).then(() => {
        hideLoader();
      });
      setIsCalledMarketPrice(true);
    } else {
      hideLoader();
    }
  }, [item.car]);

  const ViewPoint = (mode) => {
    return (
      <>
        <div className="price-grade-tp2">
          <div className="cur-price">
            <p className="veiw-point-tit">
              이 차량의 현재 시세<span> (단위:만원)</span>
            </p>
            <div className="proper-price">
              <FilterRange rangeUnit="적정시세" initMin={Math.floor(minPrice) || 0} initMax={Math.floor(maxPrice) || 1} appPrice={Math.floor(appPrice) || 0} priceSolo={true} disabled={true} />
            </div>
          </div>
        </div>
      </>
    );
  };

  if (hasMobile) {
    return (
      <fieldset>
        <legend className="away">판매가격!</legend>
        <div className="market-price-graph pd20">
          <span className="con">
            <div className="market-graph-box">
              <div className="market-graph-view">
                <img className="graph-bg" src="/images/contents/market-price-range.png" alt="" style={{ width: '94%', marginLeft: '3%' }} />
                <p className="price-tit">적정시세범위</p>
                <dl className="price-box price-current">
                  <dt>현재내차시세</dt>
                  <dd>{numberFormat(appPrice || '')}</dd>
                </dl>
                <dl className="price-box price-min">
                  <dt>최저적정시세</dt>
                  <dd>{numberFormat(minPrice || '')}</dd>
                </dl>
                <dl className="price-box price-max">
                  <dt>최고적정시세</dt>
                  <dd>{numberFormat(maxPrice || '')}</dd>
                </dl>
              </div>
            </div>
          </span>
        </div>
        <div className="register-sell-price">
          <h4>판매가격</h4>
          <Input className="manwon" type="text" value={commaNumber} onChange={inputPrice} name="slAmt" width="68%" />
        </div>
      </fieldset>
    );
  }
  return (
    <fieldset>
      <legend className="away">판매가격</legend>
      <div className="register-sell-price">
        <h4>
          판매가격 <span style={{ color: 'red' }}>*</span>
        </h4>
        <div className="sell-price-wrap">
          <div className={mode === 'tooltip' ? 'sell-price' : 'sell-price viewer'}>
            <span className="input-base type-1">
              <input type="text" value={commaNumber} onChange={inputPrice} style={{ width: '176px', height: '40px' }} name="slAmt" />
            </span>
            <em>만원</em>
            {mode === 'tooltip' ? (
              <div className="tooltip-content">
                <Tooltip placement="right" event="click" exception="tooltip-price-grade">
                  <TooltipItem>
                    <Button size="sml" line="gray" color="gray" radius={true} title="해당차량 시세 확인" width={109} height={24} marginLeft={25} />
                  </TooltipItem>
                  <TooltipCont>
                    <ViewPoint />
                  </TooltipCont>
                </Tooltip>
              </div>
            ) : (
              <ViewPoint />
            )}
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default MypageSellPrice;
