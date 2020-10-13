import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import CheckBox from '@lib/share/items/CheckBox';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import { CheckContext } from '@lib/share/items/CheckContext';

/*
 * terms-box display : none => block 변경을 위한 변수 추가
 * 수정 : 박진하
 */
const AuctionCheckBoxGroup = ({ title, id, agree_list, agree_term, termView, onChange, events, links }) => {
  const checkArray = [];
  for (const element of agree_list) {
    checkArray.push(element.checked);
  }
  const allState = checkArray.every((i) => i === true);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isAgreeChecked, setIsAgreeChecked] = useState(checkArray);
  const [allAgreeChecked, setAllAgreeChecked] = useState(allState);
  const [policyTitle, setPolicyTitle] = useState('');
  const [policyCntn, setPolicyCntn] = useState('');

  const value = useMemo(() => ({ isAgreeChecked, allAgreeChecked, setIsAgreeChecked, setAllAgreeChecked, agree_list }), [isAgreeChecked, allAgreeChecked]);

  const onHandleChange = (e, index) => {
    const { checked } = e.target;
    if (!e.target.id.includes('all')) {
      if (checked) {
        setPolicyTitle(agree_list[index].title);
        setPolicyCntn(agree_term[index]);
      } else {
        setPolicyTitle('');
        setPolicyCntn('');
      }
    }
    if (onChange) onChange(e, index);
  };

  useEffect(() => {
    setIsAgreeChecked(checkArray);
    setAllAgreeChecked(allState);
  }, [agree_list]);
  if (hasMobile) {
    return (
      <div className="inner check-list-wrap">
        <CheckContext.Provider value={value}>
          <ul className="check-select-list">
            {agree_list.map((v, i) => {
              return (
                <li key={i}>
                  <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true} size="noborder" onChange={(e) => onHandleChange(e, i)} />
                  <span className="term-view" onClick={events[i]}></span>
                </li>
              );
            })}
          </ul>
          <div className="terms-agree-all">
            <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} onChange={onHandleChange} />
          </div>
        </CheckContext.Provider>
      </div>
    );
  }
  return (
    <div className="terms-agree-wrap">
      <CheckContext.Provider value={value}>
        <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} onChange={onHandleChange} />
        <ul className="terms-content-list">
          {agree_list.map((v, i) => {
            return (
              <li key={i}>
                <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true} onChange={(e) => onHandleChange(e, i)} />
                <div className="terms-box" style={{ display: termView === true ? 'block' : 'none' }}>
                  <ColoredScrollbars autoHeightMax={160}>
                    <div className="frminbox">{agree_term[i]}</div>
                  </ColoredScrollbars>
                </div>
              </li>
            );
          })}
        </ul>
      </CheckContext.Provider>
    </div>
  );
};

AuctionCheckBoxGroup.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  agree_list: PropTypes.array,
  agree_term: PropTypes.array
};

export default AuctionCheckBoxGroup;
