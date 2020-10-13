import React, { useState, useEffect, useContext } from 'react';
import { isEmpty } from 'lodash';

import Steps from '@lib/share/items/Steps';

import { SystemContext } from '@src/provider/SystemProvider';
import { selectMbInfo, selectDealerAutoAuctionPolicy } from '@src/api/mypage/dealer/AuctionApi';
import AuctionPolicyAgreement from '@src/components/autoAuction/auctionPolicyAgreement';
import AuctionCertify from '@src/components/autoAuction/auctionCertify';
import AuctionMemberRegInfo from '@src/components/autoAuction/auctionMemberRegInfo';
import AuctionRegistrationComplete from '@src/components/autoAuction/auctionRegistrationComplete';

const AuctionJoin = ({}) => {
  const { showAlert, showConfirm, Confirm, Alert, initAlert, initConfirm, showLoader, hideLoader } = useContext(SystemContext);
  const [stepNo, setStepNo] = useState(1);
  const [mbInfo, setMbInfo] = useState({});
  const [policyList, setPolicyList] = useState([]);
  const [certData, setCertData] = useState({});
  const [joinRes, setJoinRes] = useState({});

  const onChange = (e, data, target) => {
    if (target === 'cert') {
      console.log(target, 'data :: => ', data);
      setCertData(data);
    } else if (target === 'memberReg') {
      console.log(target, 'data :: => ', data);
      setJoinRes(data);
    }
    setStepNo(e);
  };

  useEffect(() => {
    //selectMbInfo().then((res) => res?.data);
    if (isEmpty(mbInfo)) {
      selectMbInfo().then((res) => {
        console.log('mbInfo res >>>>> ', res.data);
        if (res.data.statusinfo.returncd === '000') {
          setMbInfo(res.data.data[0]);
        }
      });
    }

    if (isEmpty(policyList)) {
      selectDealerAutoAuctionPolicy().then((res) => {
        console.log('policy res >>>>> ', res.data);
        if (res.data.statusinfo.returncd === '000') {
          setPolicyList(res.data.data);
        }
      });
    }

    return () => {
      initAlert();
      initConfirm();
    };
  }, []);

  return (
    <>
      <div className="auction-membership-steps bg-blue80">
        <Steps type={2} contents={['약관동의', '본인인증', '개인정보입력', '회원가입완료']} active={stepNo} />
      </div>
      {stepNo === 1 && <AuctionPolicyAgreement onChange={onChange} />}
      {stepNo === 2 && <AuctionCertify policyList={policyList} onChange={onChange} />}
      {stepNo === 3 && <AuctionMemberRegInfo memberinfo={mbInfo} item={certData} onChange={onChange} />}
      {stepNo === 4 && <AuctionRegistrationComplete item={joinRes} />}
    </>
  );
};

export default AuctionJoin;
