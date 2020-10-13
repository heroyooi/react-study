import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { getCarMartInfoAction, getReqAction, inputStateAction, inputPropAction, pushObjectAction, removeObjectByKeyAction } from '@src/actions/sellcar/sellCarAction';
import { selectSellcarTerms } from '@src/api/sellcar/AllSellcarSearchApi';
/**
 * @module CarAgreeBox
 * @desc 3가지 약관 동의
 * @author 최승희
 * @param  {Object} props - props object
 * @param  {Boolean} props.collectAgree - 개인정보 수집 동의 checkbox의 활성화 여부
 * @param  {Boolean} props.provideAgree - 제 3자 정보 제공 동의 checkbox의 활성화 여부
 * @param  {Boolean} props.marketingAgree - 마케팅 활동 동의 동의 checkbox의 활성화 여부
 * @param  {Function} props.onCheck - checkbox를 check 할때 실행할 콜백함수
 */
const CarAgreeBox = ({ collectAgree, provideAgree, marketingAgree, className, nonevalAgree1, nonevalAgree2, type }) => {
  const dispatch = useDispatch();
  const { validation } = useSelector((rootStore) => rootStore.sellCarValid);
  const [displayCollectPop, setCollectPop, showCollectPop, hideCollectPop] = useRodal(false, true);
  const [displayProvidePop, setProvidePop, showProvidePop, hideProvidePop] = useRodal(false, true);
  const [displayMarketingPop, setyMarketingPop, showMarketingPop, hideMarketingPop] = useRodal(false, true);
  const [nonevalAgree1Pop, setNonevalAgree1Pop, showNonevalAgree1Pop, hideNonevalAgree1Pop] = useRodal(false, true);
  const [nonevalAgree2Pop, setNonevalAgree2Pop, showNonevalAgree2Pop, hideNonevalAgree2Pop] = useRodal(false, true);
  const [terms1, setTerms1] = useState('');
  const [terms2, setTerms2] = useState('');
  const [terms3, setTerms3] = useState('');
  const onCheck = (e) => {
    const { name, type, checked, value } = e.target;

    dispatch(
      inputPropAction({
        state: 'seller',
        prop: name,
        value: type === 'text' ? value : checked
      })
    );
    // inputStateAction({

    //   state: name,
    //   value: type === 'text' ? value : checked
    // })
  };

  const check = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      switch (name) {
        case 'collectAgree':
          showCollectPop(e, 'fade');
          break;
        case 'provideAgree':
          showProvidePop(e, 'fade');
          break;
        case 'marketingAgree':
          showMarketingPop(e, 'fade');
          break;
        case 'nonevalAgree1':
          showNonevalAgree1Pop(e, 'fade');
          break;
        case 'nonevalAgree2':
          showNonevalAgree2Pop(e, 'fade');
          break;
      }
    }

    onCheck(e);
  };

  // 약관 조회
  useEffect(() => {
    selectSellcarTerms({ tmsTp: '0600', tmsDiv: '0610' })
      .then((res) => {
        console.log(res);
        const { data: _terms } = res.data;
        setTerms1(_terms ? _terms : {});
      })
      .catch((err) => console.log(err));
  }, []);

  // 약관 조회
  useEffect(() => {
    selectSellcarTerms({ tmsTp: '0700', tmsDiv: '0710' })
      .then((res) => {
        console.log(res);
        const { data: _terms } = res.data;
        setTerms2(_terms ? _terms : {});
      })
      .catch((err) => console.log(err));
  }, []);

  // 약관 조회
  useEffect(() => {
    selectSellcarTerms({ tmsTp: '0800', tmsDiv: '0820', tmsSbj: '0010' })
      .then((res) => {
        console.log(res);
        const { data: _terms } = res.data;
        setTerms3(_terms ? _terms : {});
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`register-agree ${className}`}>
      {type === 'self' && (
        <>
          <CheckBox id="chk-collectAgree" title="셀프평가 이용 약관(필수)" checked={collectAgree} name="collectAgree" onChange={check} isSelf={true} className="no-margin" />
          {validation.collectAgree && <p className="tx-exp-tp4 mt10">셀프평가 이용 약관에 대한 동의가 필요합니다</p>}
        </>
      )}
      {type === 'nonValue' && (
        <>
          <CheckBox id="chk-nonevalAgree1" title="무평가 이용약관(필수)" checked={nonevalAgree1} name="nonevalAgree1" onChange={check} isSelf={true} className="no-margin" />
          {validation.nonevalAgree1 && <p className="tx-exp-tp4 mt10">무평가 이용약관에 대한 동의가 필요합니다.</p>}
          {/* <CheckBox id="chk-nonevalAgree2" title="무평가 환불약관(필수)" checked={nonevalAgree2} name="nonevalAgree2" onChange={check} isSelf={true} className="no-margin" /> */}
          {/* {validation.nonevalAgree2 && <p className="tx-exp-tp4 mt10">무평가 환불약관에 대한 동의가 필요합니다.</p>} */}
          <CheckBox id="chk-nonevalAgree2" title="개인정보 처리방침(필수)" checked={nonevalAgree2} name="nonevalAgree2" onChange={check} isSelf={true} className="no-margin" />
          {validation.nonevalAgree2 && <p className="tx-exp-tp4 mt10">개인정보 처리방침에 대한 동의가 필요합니다.</p>}
        </>
      )}
      <RodalPopup show={displayCollectPop} type={'fade'} closedHandler={hideCollectPop} title="개인정보 수집 및 이용에 대한 동의(필수)" mode="normal" size="medium">
        <div className="con-wrap frminbox" dangerouslySetInnerHTML={{ __html: terms1.tmsCntn }} />
      </RodalPopup>
      <RodalPopup show={displayProvidePop} type={'fade'} closedHandler={hideProvidePop} title="제 3자 정보 제공 동의(필수)" mode="normal" size="medium">
        <div className="con-wrap frminbox"></div>
      </RodalPopup>
      <RodalPopup show={displayMarketingPop} type={'fade'} closedHandler={hideMarketingPop} title="마케팅 활동 동의(선택)" mode="normal" size="medium">
        <div className="con-wrap frminbox"></div>
      </RodalPopup>
      <RodalPopup show={nonevalAgree1Pop} type={'fade'} closedHandler={hideNonevalAgree1Pop} title="무평가 이용약관(필수)" mode="normal" size="medium">
        <div className="con-wrap frminbox" dangerouslySetInnerHTML={{ __html: terms2.tmsCntn }} />
      </RodalPopup>
      <RodalPopup show={nonevalAgree2Pop} type={'fade'} closedHandler={hideNonevalAgree2Pop} title="개인정보 처리방침(필수)" mode="normal" size="medium">
        <div className="con-wrap frminbox" dangerouslySetInnerHTML={{ __html: terms3.tmsCntn }} />
      </RodalPopup>
      {/* <RodalPopup show={nonevalAgree2Pop} type={'fade'} closedHandler={hideNonevalAgree2Pop} title="무평가 환불약관(필수)" mode="normal" size="medium">
        <div className="con-wrap frminbox" dangerouslySetInnerHTML={{ __html: terms3.tmsCntn }} />
      </RodalPopup> */}
    </div>
  );
};

export default CarAgreeBox;
