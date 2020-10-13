import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RadioGroup from '@lib/share/items/RadioGroup';
import { setComma } from '@src/utils/StringUtil';

const dateFormat = (yyyyMMdd) => {
  const year = yyyyMMdd?.substring(0,4);
  const month = yyyyMMdd?.substring(4,6);
  const day = yyyyMMdd?.substring(6,8);
  return year+'-'+month+'-'+day;
}

const DealFeePop = ({ data, closedHandler }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    return (
      <>
        <div className="inner popup-tender">
          <form className="register-form">
            <fieldset>
              <h3 className="tit1 mb24">딜러 수수료 입금</h3> 
              <ul className="form-list mg">
                <li>
                  가상계좌 안내
                  <div className="tx-wrap">하나은행 123132165465465</div>
                </li>
                <li>
                  <i className="ico-dot" /> 수수료 총액 : {setComma(data?.feeAmt / 10000)} 만원 (VAT 포함)
                  <br />
                  <i className="ico-dot" /> 수수료 입금기한 : <span className="tx-red80">{dateFormat(data?.feeDpsEprYmd)}</span> 까지<br />
                  <i className="ico-dot" /> 세금계산서 발행
                  <div className="tx-wrap">
                    <RadioGroup dataList={[{ id: 'account-num', value: 1, checked: true, title: '사업자 등록 번호 [123-45-67890]' }]} />
                  </div>
                </li>
              </ul>
              <p className="tx-exp-tp5 tx-red80">&#8251; 상기 입금기한까지 수수료 확인이 되지 않을 경우, 이후 거래 진행이 제한됩니다.</p>
            </fieldset>
          </form>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight="500" onClick={closedHandler} />
      </>
    );
  }
  return (
    <div className="con-wrap popup-tender">
      <form className="register-form">
        <fieldset>
          <ul className="form-list mg">
            <li>
              가상계좌 안내
              <div className="tx-wrap">[하나은행] 123132165465465</div>
            </li>
            <li>
              수수료 총액 : {setComma(data?.feeAmt/10000)} 만원(VAT 포함)
              <br />
              수수료 입금기한 : <span className="tx-red80">{dateFormat(data?.feeDpsEprYmd)}</span> 까지
              <br />
              세금계산서 발행
              <div className="tx-wrap">
                <RadioGroup dataList={[{ id: 'account-num', value: 1, checked: true, title: '사업자 등록 번호 [123-45-67890]' }]} />
              </div>
            </li>
          </ul>
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
        </fieldset>
      </form>
    </div>
  );
};

export default DealFeePop;
