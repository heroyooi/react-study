import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Radio from '@lib/share/items/Radio';
import Textarea from '@lib/share/items/Textarea';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RadioGroup from '@lib/share/items/RadioGroup';
import { SystemContext } from '@src/provider/SystemProvider';
import { updateFailReasonAction } from '@src/actions/sellcar/compareEstmAction';

const failRsnTpcdList = ['f001', 'f002', 'f003', 'f004'];

const idxToTpcd = (idx) => {
  return failRsnTpcdList[idx];
};

const tpcdToIdx = (tpcd) => {
  return failRsnTpcdList.findIndex((v) => v === tpcd);
};

const DealNofityPop1 = ({ data, closedHandler }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [isValue, setIsValue] = useState(0);
  const [failRsnCntn, setFailRsnCntn] = useState('');
  const { showAlert } = useContext(SystemContext);
  const [etcDisabled, setEtcDisabled] = useState(true);

  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      setIsValue(Number(e.target.value));
      setEtcDisabled(Number(e.target.value) === 4 ? false : true);
    },
    [isValue]
  );
  const onSubmit = async (e) => {
    e.preventDefault();

    if (isValue === undefined) {
      showAlert(`거래불발 사유 선택`);
      return false;
    }
    if (isValue === 4 && isEmpty(failRsnCntn)) {
      showAlert(`거래불발 사유 입력하세요`);
      return false;
    }
    const param = {
      slReqId: data.slReqId,
      hh24AuctId: data.hh24AuctId,
      dlrBiddNo: data.dlrBiddNo,
      bsFailYmd: moment().format('YYYY-MM-DD'),
      failRsnTpcd: idxToTpcd(isValue - 1),
      failRsnCntn
    };
    console.log(param);
    const success = await dispatch(updateFailReasonAction(param));
    if (success) {
      showAlert(`저장 되었습니다.`);
      if (hasMobile) return closedHandler(e);
      closedHandler(false);
    } else {
      showAlert(`에러가 발생했습니다..`);
      if (hasMobile) return closedHandler(e);
      closedHandler(false);
    }
  };
  useEffect(() => {
    setIsValue(tpcdToIdx(data?.failRsnTpcd));
  }, [data]);
  
  // 모바일
  // Textarea
  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  }
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  }
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  }

  if (hasMobile) {
    return (
      <>
        <div className="inner popup-tender">
          <form className="register-form">
            <fieldset>
              <h3 className="tit1">거래불발 신고</h3>
              <p className="mt24">사유선택</p>
              <ul className="radio-list tp2">
                <li>
                  <Radio id="deal-notify-1" title="매입단가 불일치" value={1} checked={isValue} onChange={handleChange} />
                </li>
                <li>
                  <Radio id="deal-notify-2" title="차량정보 불일치" value={2} checked={isValue} onChange={handleChange} />
                </li>
                <li>
                  <Radio id="deal-notify-3" title="고객성향 불량" value={3} checked={isValue} onChange={handleChange} />
                </li>
                <li>
                  <Radio id="deal-notify-4" title="기타(텍스트 입력)" value={4} checked={isValue} onChange={handleChange} />
                </li>
              </ul>
              <p className="mt24 mb8">기타사유</p>
              <Textarea
                countLimit={500}
                type="tp1"
                height={133}
                placeHolder="기타 사유를 작성해주세요."
                onBlur={(e) => {
                  setFailRsnCntn(e.target.value);
                }}
                disabled={etcDisabled}
                value={data?.failRsnCntn}
              />
            </fieldset>
          </form>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight="500" onClick={onSubmit} />
      </>
    );
  }
  return (
    <div className="con-wrap popup-tender">
      <form className="register-form">
        <fieldset>
          <legend className="away">거래불발 사유 입력</legend>
          <ul className="radio-list">
            <li>
              <Radio className="simple" id="deal-notify-1" title="매입단가 불일치" value={1} checked={isValue} onChange={handleChange} />
            </li>
            <li>
              <Radio className="simple" id="deal-notify-2" title="차량정보 불일치" value={2} checked={isValue} onChange={handleChange} />
            </li>
            <li>
              <Radio className="simple" id="deal-notify-3" title="고객성향 불량" value={3} checked={isValue} onChange={handleChange} />
            </li>
            <li>
              <Radio className="simple" id="deal-notify-4" title="기타(텍스트 입력)" value={4} checked={isValue} onChange={handleChange} />
            </li>
          </ul>
          <Textarea
            countLimit={500}
            type="tp1"
            onBlur={(e) => {
              setFailRsnCntn(e.target.value);
            }}
            height={128}
            placeHolder="사유를 입력하세요."
            value={data.failRsnCntn}
          />
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
        </fieldset>
      </form>
    </div>
  );
};

export default DealNofityPop1;
