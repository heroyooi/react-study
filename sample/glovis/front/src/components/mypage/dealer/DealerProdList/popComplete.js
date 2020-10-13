import React, { useState, useContext, useEffect } from 'react';
import { setComma, removeComma } from '@src/utils/StringUtil';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import ProdCarSummary from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdCarSummary'

import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { SystemContext } from '@src/provider/SystemProvider'

const popComplete = ({ changingEvent, prodItem = {}, onClose }) => {
  console.log("popComplete -> prodItem", prodItem)
  const { car } = prodItem
  const { showAlert, showConfirm, showLoader, hideLoader, initAlert, initConfirm, } = useContext(SystemContext)
  const [ actlSlAmt, setActlSlAmt ] = useState()
  const [fuelTypes, setFuelTypes] = useState([]);
  const [mssTypes, setMssTypes] = useState([]);

  const sendData = (e) => {
    console.log('prodItem ::::::::: ', prodItem)
    showConfirm('저장하시겠습니까?', () => {
      changingEvent({
        dlrPrdId : prodItem.dlrPrdId,
        actlSlAmt : removeComma(actlSlAmt)
      },'updateSaleCarConfirm');
      onClose(e);
    })
  };

  const onChangeNumber = e => {
    const { value, name } = e.target

    setActlSlAmt(setComma(removeComma(value)))
  }

  const getMssNm = (mssDvcd) => mssTypes.find((carMss) => carMss.value == mssDvcd)?.label
  const getFuelNm = (fuelDvcd) => fuelTypes.find((carFuel) => carFuel.value == fuelDvcd)?.label

  useEffect(() => {
    showLoader()
    getCommonCodeAsync('FM047').then(setMssTypes);
    getCommonCodeAsync('FM048').then(setFuelTypes);
    hideLoader()
  }, [])

  return (
    <div className="con-wrap popup-declare">
      <div className="admin-list tp4">
        <div className="content-top">
          <div className="img-cover">
            <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
          </div>
          <ProdCarSummary
            item={car}
            mss={getMssNm(car?.mssDvcd)}
            fuel={getFuelNm(car?.fuelDvcd)}
          />
          <div className="summary">
            <h4 className="subject">{prodItem?.crNm}</h4>
            <ul className="info">
              <li>{prodItem?.crNo}</li>
              <li>{prodItem?.frmYyyy}년형</li>
              <li>{setComma(prodItem?.slAmt)}km</li>
              <li>{prodItem?.mssNm}</li>
              <li>{prodItem?.fuelNm}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sell-declare">
        <p>
          현재광고가격
          <span>
            <em>{setComma(prodItem?.slAmt)}</em>만원
          </span>
        </p>
        <div className="sell-price-wrap">
          <label htmlFor="sell-price">실제판매가격</label>
          <span>
            <Input type="text" id="sell-price" value="4,050" width={282} height={64} name="actlSlAmt" value={actlSlAmt}
              onChange={onChangeNumber}
            />
            <em>만원</em>
          </span>
        </div>
      </div>
      <Buttons align="center" marginTop={48}>
        <Button size="big" background="gray" title="취소" buttonMarkup={true} width={172} height={60} onClick={onClose} />
        <Button size="big" background="blue80" title="판매완료" buttonMarkup={true} width={172} height={60} onClick={(e) => sendData(e)} />
      </Buttons>
    </div>
  );
};

export default popComplete;
