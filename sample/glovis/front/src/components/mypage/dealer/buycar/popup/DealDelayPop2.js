import { useSelector } from 'react-redux';
import React from 'react';
import Textarea from '@lib/share/items/Textarea';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const DealDelayPop2 = ({ data, closedHandler }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if (hasMobile) {
    return (
      <>
        <div className="inner popup-tender">
          <form className="register-form">
            <fieldset>
              <h3 className="tit1 mb24">거래지연 사유 확인</h3>
              <Textarea countLimit={500} type="tp1" height={133} disabled={true} placeHolder={data?.bsDlRsnCntn} />
            </fieldset>
          </form>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight="500" onClick={closedHandler} />
      </>
    );
  }
  return (
    <div className="con-wrap popup-tender">
      <Textarea countLimit={500} type="tp1" disabled={true} height={208} placeHolder={data?.bsDlRsnCntn} />
      <Buttons align="center" marginTop={48}>
        <Button
          size="big"
          background="blue80"
          title="확인"
          width={245}
          onClick={(e) => {
            e.preventDefault();
            closedHandler(false);
          }}
        />
      </Buttons>
    </div>
  );
};

export default DealDelayPop2;
