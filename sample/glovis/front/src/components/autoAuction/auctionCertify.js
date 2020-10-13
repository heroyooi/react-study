import React, { useState, useContext } from 'react';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import { SystemContext } from '@src/provider/SystemProvider';
import Certification from '@src/components/common/Certification';

const AuctionCertify = ({ onChange }) => {
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm, showLoginForm } = useContext(SystemContext);

  const [certShow, setCertShow] = useState(false);
  const [certData, setCertData] = useState({});

  const certify = (e) => {
    console.log('certify e : ', e);
    setCertShow(!certShow);
  };

  const callback = async (e) => {
    showLoader();

    console.log('callback e : ', e);
    // setCertShow(false);
    for (let key in e) {
      console.log('key ::::::::::::::: ', e[key]);
    }

    if (e.RETURN_CD === '0000') {
      console.log('e.RETURN_CD : ', e.RETURN_CD);
      // 임시
      const mbCiO = !e.LGD_AUTHSUB_CI ? e.LGD_MOBILENUM + 'TEMPCI' : e.LGD_AUTHSUB_CI;
      const mbNmO = !e.LGD_MOBILE_SUBAUTH_NAME ? e.LGD_MOBILENUM + '이름' : e.LGD_MOBILE_SUBAUTH_NAME;
      const mbHpPnEncO = e.LGD_MOBILENUM;

      const dataForm = {
        mbCiO: mbCiO,
        mbNmO: mbNmO,
        mbBirth: e?.LGD_MOBILE_SUBAUTH_BIRTH,
        mbHpPnEncO: mbHpPnEncO
      };

      setCertData(dataForm);

      if (onChange) onChange(3, dataForm, 'cert');
    } else {
      showAlert('인증 실패하였습니다');
    }
    hideLoader();
  };

  return (
    <>
      <div className="auction-membership-certified">
        <h5 className="h5-tit">휴대폰 본인 인증을 진행해주세요.</h5>
        <div className="ico-amc">
          <i className="ico-certify" />
        </div>
        <p className="tx-exp-tp5 tx-red80">* 입력하신 회원님의 개인정보는 본인인증 이외의 목적으로 활용하지 않습니다.</p>
      </div>

      <Buttons align="center" marginTop={48}>
        <Button size="big" background="blue80" title="휴대폰 본인인증" width={223} height={60} buttonMarkup={true} onClick={certify} />
      </Buttons>

      <Certification data={certData} show={certShow} callback={callback} />
    </>
  );
};

export default AuctionCertify;
