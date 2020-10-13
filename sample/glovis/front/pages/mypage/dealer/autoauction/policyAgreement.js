import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import qs from 'qs';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import CheckBox from '@lib/share/items/CheckBox';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import RenderHelper from '@lib/share/render/helper';

import { auction_check_term } from '@src/dummy/terms';
import { SystemContext } from '@src/provider/SystemProvider';

import { selectDealerAutoAuctionPolicy } from '@src/api/mypage/dealer/AuctionApi';

const nextPage = '/mypage/dealer/autoauction/oneselfCertify';

const policyAgreement = ({policyList = []}) => {
  console.log('policyList : ', policyList)
  const { showAlert, showConfirm, Confirm, Alert, initAlert, initConfirm } = useContext(SystemContext);
  // const [policyList, setPolicyList] = useState([
  //   { title: '스마트옥션 이용 약관', content: auction_check_term[0] },
  //   { title: '개인정보 활용', content: auction_check_term[0] },
  //   { title: '개인정보의 제3자 제공 동의 (선택)', content: auction_check_term[0] }
  // ]);
  const [policyCheckingState, setPolicyCheckingState] = useState([false, false, false]);
  const [checkedRequired, setCheckedRequired] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  
  console.log("policyAgreement -> auction_check_term[0] ", auction_check_term[0] )
  console.log("policyAgreement -> policyCheckingState", policyCheckingState)
  const check = (e) => {
    const { checked, value } = e.target;
    console.log("check -> checked", checked)
    console.log("check -> value", value)
    setPolicyCheckingState(policyCheckingState.map((policy, i) => (value == i ? checked : policy)));
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
      Router.push(nextPage).then(() => window.scrollTo(0, 0));
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
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="tabmenu tp1">
            <ul className="ui-tab col-2">
              <li className="on tabTitle1">
                <Link href="/mypage/dealer/autoauction/memberGuide">
                  <a>경매회원안내</a>
                </Link>
              </li>
              <li className="tabTitle2">
                <Link href="/mypage/dealer/autoauction/currentState">
                  <a>경매장 이용 현황</a>
                </Link>
              </li>
            </ul>
            <div className="auction-membership-steps bg-blue80">
              <Steps type={2} contents={['약관동의', '본인인증', '개인정보입력', '회원가입완료']} active={1} />
            </div>
            <div className="auction-membership-agree">
              <fieldset>
                <legend className="away">이용약관 및 개인정보수집 및 이용에 관한 동의</legend>
                <ul className="terms-content-list" style={{width:'100%'}}>
                  {policyList.map((termCheck, i) => (
                    <li key={i}>
                      <CheckBox id={`chk-policy-${i}`} title={termCheck.tmsNm} checked={policyCheckingState[i]} onChange={check} value={i} />
                      <div className="terms-box">
                        <ColoredScrollbars autoHeightMax={160}>
                          <div className="frminbox" style={{whiteSpace: 'pre', maxWidth: '742px'}} dangerouslySetInnerHTML={{ __html: termCheck.tmsCntn }} />
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
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

policyAgreement.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);

  const { data } = await selectDealerAutoAuctionPolicy().then((res) => res?.data)

  return {
    policyList : data
  }
}

export default policyAgreement;
