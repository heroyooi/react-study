import React, { memo, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import { SystemContext } from '@src/provider/SystemProvider';
import { insertBiddAction, updateBiddAction, updateCancelAction, selectSelfListAction } from '@src/actions/sellcar/compareEstmAction';
import { isBidding, isNewBidding, biddBtnData, BTN_TYPE } from '@src/utils/sellcar/CmprEstmUtil';
import { setComma } from '@src/utils/StringUtil';

const BiddPop = memo(({ cmprEstm = {}, formParam, isMobile, closedHandler, type = '01', refresh, mobIsBidding = false }) => {
  const dispatch = useDispatch();
  const [btnName, setBtnName] = useState('');
  const [labelName, setLabelName] = useState('');
  const [price, setPrice] = useState(0);
  const [biddCancel, setBiddCancel] = useState(false);
  const [unableCancelBtn, setUnableCancelBtn] = useState(false);
  const { showAlert } = useContext(SystemContext);

  // 취소
  const doCancel = async (param) => {
    const success = await dispatch(updateCancelAction(param));
    if (success) {
      showAlert('취소되었습니다.', () => {
        // if (formParam){
        refresh && refresh();
        dispatch(selectSelfListAction(formParam));
        // }
      });
    } else {
      showAlert('취소에 실패했습니다.');
    }
    closedHandler(false);
  };

  // 입찰
  const doNewBidd = async (param) => {
    if (param.biddAmt <= 0) {
      showAlert('입찰금액을 입력해주세요.');
      return false;
    }
    const success = await dispatch(insertBiddAction(param));
    if (success) {
      showAlert('등록이 완료 되었습니다.', () => {
        // if (formParam){
        refresh && refresh();
        dispatch(selectSelfListAction(formParam));
        // }
      });
    } else {
      showAlert('등록에 실패했습니다.');
    }
  };

  // 입찰 수정
  const doBiddUpdate = async (param) => {
    if (param.biddAmt <= 0) {
      showAlert('입찰금액을 입력해주세요.');
      return false;
    }
    const biddChngCnt = type === '01' ? cmprEstm.biddChngCnt : cmprEstm.myBidd.biddChngCnt;
    if (biddChngCnt > 2) {
      showAlert('3회 이상은 입찰이 불가능합니다.');
      return false;
    }
    const success = await dispatch(updateBiddAction(param));
    if (success) {
      showAlert('수정 되었습니다.', () => {
        // if (formParam){
        refresh && refresh();
        dispatch(selectSelfListAction(formParam));
        // }
      });
    } else {
      showAlert('수정에 실패했습니다.');
    }
  };

  const biddHandler = async (e) => {
    e.preventDefault();
    const param = {
      hh24AuctId: cmprEstm.hh24AuctId,
      dlrBiddNo: cmprEstm.dlrBiddNo,
      biddAmt: price,
      listType: 'selfList'
    };

    if (param.biddAmt > 99999) {
      showAlert('99,999만원 이상 입찰이 불가능합니다.');
      return false;
    }

    if (biddCancel) {
      doCancel(param);
    } else if (!biddCancel && isNewBidding(cmprEstm, type)) {
      doNewBidd(param);
    } else if (!biddCancel && !isNewBidding(cmprEstm, type)) {
      doBiddUpdate(param);
    }
    closedHandler(false);
  };

  useEffect(() => {
    const btnData = biddBtnData(cmprEstm, type);
    console.log("btnData::",btnData,cmprEstm);
    if (btnData.btnType === BTN_TYPE.NEW_BIDD) {
      setBtnName('입찰');
      setLabelName('입찰하기');
      setPrice(0);
    } else if (btnData.btnType === BTN_TYPE.UPDATE_BIDD) {
      setBtnName('수정');
      setLabelName('입찰가격 수정');
      setPrice(type === '01' ? cmprEstm?.biddAmt : cmprEstm?.myBidd?.biddAmt);
      setUnableCancelBtn(true);
    } else if (btnData.btnType === BTN_TYPE.CANCEL_BIDD) {
      setBtnName('입찰');
      setLabelName('입찰하기');
      setPrice(0);
    }
  }, []);

  if (isMobile === true) {
    return (
      <>
        <div className="inner">
          <h3 className="tit1 mb24">{mobIsBidding === false ? '입찰하기' : '입찰가격 수정'}</h3>
          <p className="float-wrap mb8">
            <span className="fl">입찰금액 : {type === '01' ? setComma(cmprEstm?.biddAmt) : setComma(cmprEstm?.myBidd?.biddAmt)} 만원</span>
            {mobIsBidding === true && <span className="tx-red80 fs12">수정 {type === '01' ? cmprEstm?.biddChngCnt : cmprEstm?.myBidd?.biddChngCnt}회</span>}
          </p>
          {mobIsBidding === false ? (
            <Input type="number" id="tender-price" value={type === '01' ? cmprEstm?.biddAmt : cmprEstm?.myBidd?.biddAmt} width={'100%'} maxLength={5} onBlur={(e) => setPrice(e.target.value)} />
          ) : (
            <Input type="number" id="tender-price2" value={type === '01' ? cmprEstm?.biddAmt : cmprEstm?.myBidd?.biddAmt} width={'100%'} maxLength={5} onBlur={(e) => setPrice(e.target.value)} />
          )}
          <ul className="tx-red80 mt10">
            <li className="fs12">&#8251; 견적 실수,찔러보기 식 낮은견적 주의</li>
            <li className="fs12 mt4">&#8251; 입찰가격 수정 3회 이용 제한 주의</li>
          </ul>
        </div>
        <Button className="fixed" size="full" background="blue80" title={mobIsBidding === false ? '입찰' : '수정'} fontWeight="500" onClick={biddHandler} />
      </>
    );
  }
  return (
    <div className="con-wrap popup-tender pay">
      <form className="register-form">
        <fieldset className="tender-wrap">
          <legend className="away">{labelName}</legend>
          <label htmlFor="tender-price" className="hide">
            입찰금액 {price}
          </label>
          
          <Input type="number" id="tender-price" value={price} width={230} height={48} maxLength={5} onBlur={(e) => setPrice(e.target.value)} />
          <em>만원</em>
          {unableCancelBtn && <CheckBox id="chk-basic" title="입찰 취소" onChange={(e) => setBiddCancel(e.target.checked)} />}
          <p>
            견적 실수, 찔러보기 식 낮은 견적 주의
            <br />
            (반복 시 경고 및 이용 제한)
            <br />
            <span className="tx-red80">※ 입찰가격 수정 3회 이용 제한 주의</span>
            <span className="tx-red80 fs12">( 수정 {type === '01' ? cmprEstm?.biddChngCnt : cmprEstm?.myBidd?.biddChngCnt}회 )</span>
          </p>
          <Buttons align="center" marginTop={48}>
            <Button
              size="big"
              background="gray"
              title="취소"
              width={127}
              onClick={(e) => {
                e.preventDefault();
                closedHandler(false);
              }}
            />
            <Button size="big" background="blue80" title={btnName} width={127} onClick={biddHandler} />
          </Buttons>
        </fieldset>
      </form>
    </div>
  );
});

BiddPop.propTypes = {
  cmprEstm: PropTypes.object,
  formParam: PropTypes.object,
  isMobile: PropTypes.bool,
  closedHandler: PropTypes.func
};
BiddPop.displayName = 'BiddPop';
export default BiddPop;
