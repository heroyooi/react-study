import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Textarea from '@lib/share/items/Textarea';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { createValidator } from '@lib/share/validator';
import { updateDelayRsn } from '@src/actions/sellcar/compareEstmAction';
import { SystemContext } from '@src/provider/SystemProvider';
import DealDelaySchema from '@lib/share/validator/mypage/dealer/buycar/DealDelaySchema';

const validator = createValidator(DealDelaySchema,
  {
    required: [
      "slReqId",
      "hh24AuctId",
      "dlrBiddNo",
      "bsDlRsnCntn"
    ]
  }
);

const DealDelayPop1 = ({ data, closedHandler }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [bsDlRsnCntn, setBsDlRsnCntn] = useState('');
  const { showAlert } = useContext(SystemContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const param = {
      slReqId: data.slReqId,
      hh24AuctId: data.hh24AuctId,
      dlrBiddNo: data.dlrBiddNo,
      bsDlRsnCntn
    };

    const valid = validator.validate(param);
    if( valid.success ){
      const success = await dispatch(updateDelayRsn(param));
      if ( success ) {
        showAlert(`저장 되었습니다.`);
      } else {
        showAlert(`에러가 발생했습니다..`);
      }
      setBsDlRsnCntn('');
      if (hasMobile) return closedHandler(e);
      closedHandler(false);
    } else {
      showAlert(`${valid.error[0].label}`);
    }
  };

  const textareaBlur = (e) => {
    setBsDlRsnCntn(e.target.value);
  };

  // 모바일
  // Textarea
  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  };
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  };

  if (hasMobile) {
    return (
      <>
        <div className="inner popup-tender">
          <form className="register-form">
            <fieldset>
              <h3 className="tit1 mb24">거래지연 사유 입력</h3>
              <Textarea countLimit={500} type="tp1" height={133} value={bsDlRsnCntn} placeHolder="거래지연 사유를 작성해주세요" onBlur={textareaBlur} />
            </fieldset>
          </form>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="취소" fontWeight="500" onClick={closedHandler} />
          <Button size="big" background="blue80" title="입력" fontWeight="500" onClick={onSubmit} />
        </Buttons>
      </>
    )
  }
  return (
    <div className="con-wrap popup-tender">
      <Textarea countLimit={500} type="tp1" onBlur={textareaBlur} value={bsDlRsnCntn} height={208} placeHolder="사유를 입력하세요." />
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
        <Button size="big" background="blue80" title="입력" width={127} onClick={onSubmit} />
      </Buttons>
    </div>
  );
};

export default DealDelayPop1;
