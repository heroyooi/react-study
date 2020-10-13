import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setComma } from '@src/utils/StringUtil';

import Radio from '@lib/share/items/Radio';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import MypageSellPrice from '@src/components/mypage/dealer/DealerProdOption/MypageSellPrice'
import MypageExposureType from '@src/components/mypage/dealer/DealerProdOption/MypageExposureType';

import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi'

import { SystemContext } from '@src/provider/SystemProvider'

import { createValidator } from '@lib/share/validator';
import dealerProdSchema from '@lib/share/validator/mypage/dealer/dealerProd';
import produce from 'immer';

const validator = createValidator(dealerProdSchema, {
  required: [
    'slAmt',
  ]
});

const modifyPricePop = ({ changingEvent, onClose, prodItem = {}, memberInfo = {} }) => {
  console.log("modifyPricePop -> prodItem", prodItem)
  console.log("modifyPricePop -> memberInfo", memberInfo)

  const { showAlert, showConfirm, showLoader, hideLoader } = useContext(SystemContext)
  const [ prod, setProd ] = useState()
  // const [price, setPrice] = useState(prodItem?.slAmt || 0);
  const { hasMobile, marketPrice } = useSelector((state) => ({
    hasMobile : state.common.hasMobile,
    marketPrice : state.buyCarDetail.marketPrice ?? {},
  }));

  const { dlrPrdId } = prodItem

  // const {
  //   frnchsCrYn,
  //   hsvcCrYn,
  //   icmAcrtCrYn,
  //   dlrPrdId,
  // } = prodItem

  // const [exposure, setExposure] = useState(() => {
  //   return {
  //     frnchsCrYn,
  //     hsvcCrYn,
  //     icmAcrtCrYn,
  //   }
  // });

  const sendData = (e) => {
    let param = {
      ...prod,
      // slAmt: parseInt(price),
      // ...exposure,
      // dlrPrdId,
    }

    if(marketPrice?.appPrice > 0){
      param = {...param, ...marketPrice}
    }
    
    const valid = validator.validate(param);
    const { error } = valid;
    console.log('TCL: goNextStep -> valid : ', valid);

    if (error) {
      const { messages, field, label} = error[0]
      let message =  `[${label}] ${messages[0]}`
      showAlert(message);
    } else {
      showConfirm('저장하시겠습니까?', () => {
        changingEvent(param, 'updateProdPrice');
        onClose(e);
      })
    }
  };

  const onChangePrice = (e) => {
    const { value } = e.target;
    console.log('prod ::::: ', prod)
    // setPrice(value);

    setProd(produce(prod, draft => {
      draft['slAmt'] = parseInt(value)
    }))
  };

  const onChangeProdValues= values => {
    console.log("modifyPricePop onChangeProdValues -> values", values)
    // setExposure(values);

    setProd(produce(prod, draft => {
      Object.keys(values).forEach(key => {
        draft[key] = values[key]
      })
    }))
  }

  useEffect(() => {
    showLoader()
    dealerProdApi.selectSaleProdItem(dlrPrdId).then((res) => {
      const { data:prodItem, statusinfo } = res?.data

      console.log("modifyPricePop ::::::: prodItem", prodItem)

      if(statusinfo.returncd === '000'){
        console.log("modifyPricePop ::::::: 정상 prodItem", prodItem)
        setProd({
          ...prodItem,
          cmnt : prodItem?.cmnt ?? {}
        })
      }
    })
  }, [])

  return (
    <div className="con-wrap price-modify">
      {/* 노출유형 입력 */}
      <MypageExposureType item={prod} onChangeValues={onChangeProdValues} memberInfo={memberInfo} />

      {/* 판매가격 */}
      <MypageSellPrice mode="viewer" value={prod?.slAmt} item={prod} onChange={onChangePrice} />

      <Buttons align="center" marginTop={48}>
        <Button size="big" background="gray" title="취소" buttonMarkup={true} width={172} height={60} onClick={onClose} />
        <Button size="big" background="blue80" title="수정" buttonMarkup={true} width={172} height={60} onClick={sendData} />
      </Buttons>
    </div>
  );
};

export default modifyPricePop;
