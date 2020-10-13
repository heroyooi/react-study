import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { CheckContext } from '@lib/share/items/CheckContext';

const Editor = dynamic(() => import('@lib/share/textEditor/editor'), {
  ssr: false,
  loading() {
    return <span>Loading...</span>;
  }
});

const PolicyCheckBoxGroup = ({ title, id, agreeList, agreeTerm, onChange }) => {
  const checkArray = [];
  for (const element of agreeList) {
    checkArray.push(element.checked);
  }
  const allState = checkArray.every((i) => i === true);

  const [isAgreeChecked, setIsAgreeChecked] = useState(checkArray);
  const [allAgreeChecked, setAllAgreeChecked] = useState(allState);
  const [rodalShow, setRodalShow, popupOpenHandler, popupCloseHandler] = useRodal(false, true);
  const [policyTitle, setPolicyTitle] = useState('');
  const [policyCntn, setPolicyCntn] = useState('');
  const [policyIndex, setPolicyIndex] = useState(0);

  const value = useMemo(
    () => ({
      isAgreeChecked,
      allAgreeChecked,
      setIsAgreeChecked,
      setAllAgreeChecked,
      agree_list: agreeList
    }),
    [isAgreeChecked, allAgreeChecked]
  );

  const onHandleChange = (e, index) => {
    const { checked } = e.target;
    if (!e.target.id.includes('all')) {
      if (checked) {
        setRodalShow(true);
        setPolicyTitle(agreeList[index].indYn === 'N' ? agreeList[index].title : agreeList[index].title + '(필수)');
        setPolicyCntn(agreeTerm[index].value);
        setPolicyIndex(index);
      } else {
        setRodalShow(false);
        setPolicyTitle('');
        setPolicyCntn('');
        setPolicyIndex(0);
      }
    }
    if (onChange) onChange(e, index);
  };

  const rodalClose = () => {
    setRodalShow(false);
    setPolicyTitle('');
    setPolicyCntn('');
    popupCloseHandler();
  };

  useEffect(() => {
    setIsAgreeChecked(checkArray);
    setAllAgreeChecked(allState);
  }, [agreeList]);

  return (
    <div className="chk-agree-wrap">
      <CheckContext.Provider value={value}>
        <div className="chk-agree-all">
          <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} onChange={onHandleChange} />
        </div>
        <ul className="chk-agree-list">
          {agreeList.map((v, i) => {
            return (
              <li key={i}>
                <CheckBox id={v.id} title={v.indYn === 'N' ? v.title : v.title + '(필수)'} checked={isAgreeChecked[i]} agreeType={true} onChange={(e) => onHandleChange(e, i)} />
              </li>
            );
          })}
        </ul>
        <RodalPopup show={rodalShow} type={'fade'} closedHandler={rodalClose} title={policyTitle} mode="normal" size="medium">
          <div className="con-wrap">
            <Editor value={policyCntn} editing={false} />
          </div>
          {/* <div className="con-wrap">{policyCntn}</div> */}
          {/* {agreeTerm &&
            agreeTerm.map((v, i) => {
              if (i === policyIndex) {
                return (
                  <div className="con-wrap">
                    {v.value.split('\n').map((item, index) => {
                      return (
                        <span key={index} style={{ color: '#222', textAlign: 'left', wordBreak: 'break-all' }}>
                          {item}
                          <br />
                        </span>
                      );
                    })}
                  </div>
                );
              }
            })} */}
        </RodalPopup>
      </CheckContext.Provider>
    </div>
  );
};

PolicyCheckBoxGroup.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  agreeList: PropTypes.array,
  agreeTerm: PropTypes.array,
  onChange: PropTypes.func
};

export default PolicyCheckBoxGroup;
