import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import { insertBiddAction, updateBiddAction, updateCancelAction } from '@src/actions/sellcar/compareEstmAction';

const MypageTender2 = ({ isBidding = false, id, defaultValue = 0, listType, closedHandler }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(defaultValue);
  const [cancel, setCancel] = useState(false);

  const clickHandler = (e) => {
    e.preventDefault();
    const param = {
      hh24AuctId: id.hh24AuctId,
      dlrBiddNo: id.dlrBiddNo,
      biddAmt: price,
      listType
    };
    console.log('clickHandler', param, isBidding);
    if (!isBidding) {
      dispatch(insertBiddAction(param));
    } else {
      if (!cancel) {
        dispatch(updateBiddAction(param));
      } else {
        dispatch(updateCancelAction(param));
      }
    }
    closedHandler(false);
  };

  useEffect(() => {
    console.log('setPrice', defaultValue);
    setPrice(defaultValue);
  }, [defaultValue]);

  return (
    <div className="con-wrap popup-tender pay">
      <form className="register-form">
        <fieldset className="tender-wrap">
          <legend className="away">{isBidding === false ? '입찰하기' : '입찰가격 수정'}</legend>
          <label htmlFor="tender-price" className="hide">
            입찰금액
          </label>
          <Input type="number" id="tender-price" value={price} width={230} height={48} onBlur={(e) => setPrice(e.target.value)} />
          <em>만원</em>
          {isBidding === true && (
            <p>
              <CheckBox id="chk-1" title="입찰취소" onChange={(e) => setCancel(e.target.checked)} />
            </p>
          )}
          <p>
            견적 실수, 찔러보기 식 낮은 견적 주의
            <br />
            (7일 정비, 반복 시 경고)
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
            <Button size="big" background="blue80" title="입찰완료" title={isBidding === false ? '입찰완료' : '수정'} width={127} onClick={clickHandler} />
          </Buttons>
        </fieldset>
      </form>
    </div>
  );
};

export default MypageTender2;
