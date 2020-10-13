import React, { useState, useEffect, useContext } from 'react';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';

import { SystemContext } from '@src/provider/SystemProvider';
import { selectDealerAutoAuctionPolicy } from '@src/api/mypage/dealer/AuctionApi';

const AuctionPolicyAgreement = ({ policyList = [], onChange }) => {
  const { showAlert, showConfirm, Confirm, Alert, initAlert, initConfirm, showLoader, hideLoader } = useContext(SystemContext);
  const [policyCheckingState, setPolicyCheckingState] = useState([false, false, false]);
  const [checkedRequired, setCheckedRequired] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);

  const check = (e) => {
    const { checked, value } = e.target;
    setPolicyCheckingState(policyCheckingState.map((policy, i) => (value === i ? checked : policy)));
  };

  const checkRequired = (e) => {
    const { checked } = e.target;

    setPolicyCheckingState([checked, checked, policyCheckingState[2]]);
  };

  const checkAll = (e) => {
    const { checked } = e.target;
    setPolicyCheckingState([checked, checked, checked]);
  };

  const submit = (e) => {
    if (!policyCheckingState[0]) {
      showAlert('스마트옥션 이용 약관에 동의하셔야 합니다.');
    } else if (!policyCheckingState[1]) {
      showAlert('개인정보 활용 약관에 동의하셔야 합니다.');
    } else {
      //Router.push(nextPage).then(() => window.scrollTo(0, 0));
      if (onChange) onChange(2);
    }
  };

  useEffect(() => {
    setCheckedAll(policyCheckingState.every((policy) => !!policy));
    setCheckedRequired([policyCheckingState[0], policyCheckingState[1]].every((policy) => !!policy));
  }, [policyCheckingState]);

  useEffect(() => {
    selectDealerAutoAuctionPolicy()
      .then((res) => res?.data)
      .then((res) => {
        console.log('res : ', res);
      });

    return () => {
      initAlert();
      initConfirm();
    };
  }, []);

  return (
    <>
      <div className="auction-membership-agree">
        <fieldset>
          <legend className="away">이용약관 및 개인정보수집 및 이용에 관한 동의</legend>
          <ul className="terms-content-list" style={{ width: '100%' }}>
            {policyList.map((termCheck, i) => (
              <li key={i}>
                <CheckBox id={`chk-policy-${i}`} title={termCheck.tmsNm} checked={policyCheckingState[i]} onChange={check} value={i} />
                <div className="terms-box">
                  <ColoredScrollbars autoHeightMax={160}>
                    <div className="frminbox" style={{ whiteSpace: 'pre', maxWidth: '742px' }} dangerouslySetInnerHTML={{ __html: termCheck.tmsCntn }} />
                  </ColoredScrollbars>
                </div>
              </li>
            ))}
          </ul>
          <div className="terms-agree-all">
            <CheckBox id="chk-required" title="필수 약관 동의" checked={checkedRequired} onChange={checkRequired} />
            <CheckBox id="chk-all" title="약관 전체 동의" checked={checkedAll} onChange={checkAll} />
          </div>
        </fieldset>
      </div>
      <p className="tx-exp-tp5">* 제 3자 제공에 동의하지 않으실 경우 스마트옥션 서비스를 이용하는데 제약이 따를 수 있습니다.</p>
      <Buttons align="right" marginTop={48}>
        <Button size="big" background="blue80" title="다음" width={127} height={60} onClick={submit} buttonMarkup={true} />
      </Buttons>
    </>
  );
};

export default AuctionPolicyAgreement;
