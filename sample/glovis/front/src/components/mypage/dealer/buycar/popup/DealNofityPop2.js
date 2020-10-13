import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Textarea from '@lib/share/items/Textarea';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import * as api from '@src/api/sellcar/SelfSellcarApi';

const DealNofityPop2 = ({ data, closedHandler }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [failRsn, setFailRsn] = useState({});

  // 모바일
  // Textarea
  // const textareaChange = (e) => {
  //   console.log('textareaChange');
  //   console.log(e);
  // }
  // const textareaBlur = (e) => {
  //   console.log('textareaBlur');
  //   console.log(e);
  // }
  // const textareaFocus = (e) => {
  //   console.log('textareaFocus');
  //   console.log(e);
  // }

  useEffect(() => {
    const param = {
      slReqId: data.slReqId,
      hh24AuctId: data.hh24AuctId,
      dlrBiddNo: data.dlrBiddNo
    };
    console.log('거래불발 내용확인', param);
    api
      .selectFailReason(param)
      .then((res) => {
        if (res.data.result.returncd === '000') {
          setFailRsn(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  if (hasMobile) {
    return (
      <>
        <div className="inner popup-tender">
          <form className="register-form">
            <fieldset>
              <h3 className="tit1">거래불발 내용확인</h3>
              <p className="mb8 mt24">신고일</p>
              <Input width="100%" placeHolder={failRsn.uptDt} disabled={true} value={failRsn.uptDt} />
              <p className="mb8 mt24">불발사유</p>
              {failRsn?.failRsnTpcd !== undefined && failRsn?.failRsnTpcd !== 'f004' && <div className="tx-wrap tx-l">{failRsn.failRsnTpcdNm}</div>}
              {failRsn?.failRsnTpcd !== undefined && failRsn?.failRsnTpcd === 'f004' && <Textarea type="tp1" height={133} placeHolder={failRsn.failRsnCntn} disabled={true} />}
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
          <ul className="form-list">
            <li>신고일 : {failRsn?.bsFailYmd}</li>
            <li>
              신고사유
              {failRsn?.failRsnTpcd !== undefined && failRsn?.failRsnTpcd !== 'f004' && <div className="tx-wrap tx-l">{failRsn.failRsnTpcdNm}</div>}
              {failRsn?.failRsnTpcd !== undefined && failRsn?.failRsnTpcd === 'f004' && <Textarea countLimit={500} type="tp1" disabled={true} placeHolder={failRsn.failRsnCntn} />}
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

export default DealNofityPop2;
