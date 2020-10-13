import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import SelectBox from '@lib/share/items/SelectBox';
import AppLayout from '@src/components/layouts/AppLayout';
import { selectPolicyEfrcDtList, selectPolicyInfo } from '@src/actions/footer/policyAction';

const policy = (props) => {
  const tmsTp = props.router.query.tmsTp;
  console.log('페이지 시작 > props.router.query.tmsTp=%o', tmsTp);

  const policyEfrcDtList = useSelector((state) => state.policy.policyEfrcDtList); //조회결과
  const [policyEfrcDtListTemp, setPolicyEfrcDtListTemp] = useState([]); //시행일 리스트
  const [policyEfrcDtListSelval, setPolicyEfrcDtListSelval] = useState(''); //

  const policyInfo = useSelector((state) => state.policy.policyInfo); //조회결과

  const policyEfrcDtListTime = useSelector((state) => state.policy.policyEfrcDtListTime); //시행일조회  판단
  const policyInfoTime = useSelector((state) => state.policy.policyInfoTime); //약관조회 판단

  const dispatch = useDispatch();

  useEffect(() => {
    let param = { tmsTp: tmsTp };
    if (tmsTp === '0800') param = { tmsTp: tmsTp, tmsSbj: '0010', tmsDiv: '0820' };
    console.log('페이지 시작>시행일조회> useEffect, tmsTp param=%o', param);
    dispatch(selectPolicyEfrcDtList(param)); //시행일 조회
  }, [tmsTp]);

  useEffect(() => {
    if (policyEfrcDtList.length > 0) {
      setPolicyEfrcDtListTemp(policyEfrcDtList);
      const param = { tmsId: policyEfrcDtList[0].tmsId };
      console.log('페이지 시작 > 시행일 첫번째 조회 policyEfrcDtList, param=%o', param);
      // selectedItemValue = { rgstRsdcDtlAddrCd };
      setPolicyEfrcDtListSelval(policyEfrcDtList[0].tmsId);
      console.log('페이지 시작 > 시행일 첫번째 조회 policyEfrcDtList, policyEfrcDtList[0].tmsId=%o', policyEfrcDtList[0].tmsId);
      dispatch(selectPolicyInfo(param)); //시행일 조회
    }
  }, [policyEfrcDtListTime]);

  //셀렉트박스 변경시
  const onChangeSelect = (e) => {
    console.log('onChangeSelect value = %o', e.value);
    const param = { tmsId: e.value };
    setPolicyEfrcDtListSelval(e.value);
    dispatch(selectPolicyInfo(param));
  };

  return (
    <AppLayout>
      <div className="terms-area">
        <div className="tit-wrap">
          <h3 className="tit">{tmsTp === '0100' ? '이용약관' : tmsTp === '0800' ? '개인정보처리방침' : ''}</h3>
          <div className="enforce-wrap">
            <strong>시행일</strong>
            <SelectBox
              id="select1"
              className="items-sbox"
              options={policyEfrcDtListTemp}
              // hasSelectedItemValue={true}
              // selectedItemValue={policyEfrcDtList[0]?.id}
              value={policyEfrcDtListSelval}
              name="hpPn01"
              width={157}
              height={48}
              onChange={(e) => onChangeSelect(e)}
            />
          </div>
        </div>

        <div className="cont-wrap">
          {/*
          <p dangerouslySetInnerHTML={{ __html: policyInfo.tmsCntn }} />
          <p>{policyInfo.tmsCntn}</p>
        */}
          <div className="frminbox" dangerouslySetInnerHTML={{ __html: policyInfo.tmsCntn }} />
        </div>
      </div>
    </AppLayout>
  );
};
export default withRouter(policy);
