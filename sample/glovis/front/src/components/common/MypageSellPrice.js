import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@lib/share/items/Input';
import FilterRange from '@lib/share/items/FilterRange';
import Button from '@lib/share/items/Button';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import { fetchMarketPriceAction } from '@src/actions/buycar/buyCarDetailActions';
import { setComma, removeComma } from '@src/utils/StringUtil';
import { getPricingCarOptions } from '@src/components/pricingSystem/pricingUtil';
import { numberFormat } from '@src/utils/CommonUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import { iconClass } from '@src/constant/sellcar/carOptions';

const MypageSellPrice = ({ value = 0, onChange, mode = 'tooltip', item = {} }) => {
  const dispatch = useDispatch();
  const { car } = item;
  const { showLoader, hideLoader } = useContext(SystemContext);
  // const [isCalledMarketPrice, setIsCalledMarketPrice] = useState(false);
  const [isCalledMarketPrice, setIsCalledMarketPrice] = useState(car ? true : false);

  const { hasMobile, marketPrice } = useSelector((state) => ({
    hasMobile: state.common.hasMobile,
    marketPrice: state.buyCarDetail.marketPrice ?? {}
  }));

  const [commaNumber, setCommaNumber] = useState(setComma(value));

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
    const { car } = item;

    if (car && !isCalledMarketPrice) {
      const parsedCar = {
        ...car,
        carNo: car.crNo,
        crClrNm: car.crClsCdNm,
        fuelNm: car.fuelNm,
        mssNm: car.mssNm,
        frstRegDt2: car.frstRegDt,
        crRlsPrc: parseInt(car.crRlsPrc) * 10000
      };

      const pricingCarOptions = getPricingCarOptions();
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
    // }, []);
  }, [item]);

  if (hasMobile) {
    return (
      <fieldset>
        <legend className="away">판매가격</legend>
        <div className="register-sell-price">
          <h4>판매가격</h4>
          <Input type="text" value={commaNumber} onChange={inputPrice} name="slAmt" width="68%" />
        </div>
      </fieldset>
    );
  }
  const ViewPoint = (mode) => {
    return (
      <div className="price-grade-tp2">
        <div className="cur-price">
          <p className="veiw-point-tit">
            이 차량의 현재 시세<span> (단위:만원)</span>
          </p>
          <div className="proper-price">
            <FilterRange
              rangeUnit="적정시세"
              initMin={Math.floor(marketPrice?.minPrice) || 0}
              initMax={Math.floor(marketPrice?.maxPrice) || 1}
              appPrice={Math.floor(marketPrice?.appPrice) || 0}
              priceSolo={true}
              disabled={true}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <fieldset>
      <legend className="away">판매가격</legend>
      <div className="register-sell-price">
        <h4>판매가격</h4>
        <div className="sell-price-wrap">
          <div className={mode === 'tooltip' ? 'sell-price' : 'sell-price viewer'}>
            <Input type="text" id="register-sell-price" value="3,700" width={176} height={40} />
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
