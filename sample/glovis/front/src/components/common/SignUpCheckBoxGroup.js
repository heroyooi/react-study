import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import CheckBox from '@lib/share/items/CheckBox';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import { CheckContext } from '@lib/share/items/CheckContext';
// eslint-disable-next-line no-unused-vars
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
// eslint-disable-next-line no-unused-vars
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';

const SignUpCheckBoxGroup = ({ title, id, sub_title, sub_id, agree_list, agree_term, onChange, events, links }) => {
  const checkArray = [];
  const isEssentialChecked = [];
  for (let i = 0; i < agree_list.length; i++) {
    checkArray.push(agree_list[i].checked);
    isEssentialChecked.push(agree_list[i].essential);
  }
  const allState = checkArray.every((i) => i === true);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isAgreeChecked, setIsAgreeChecked] = useState(checkArray);
  const [allAgreeChecked, setAllAgreeChecked] = useState(allState);
  const [essentialChecked, setEssentialChecked] = useState(JSON.stringify(checkArray) === JSON.stringify(isEssentialChecked) || allState);

  useEffect(() => {
    setIsAgreeChecked(checkArray);
    setEssentialChecked(JSON.stringify(checkArray) === JSON.stringify(isEssentialChecked) || allState);
    setAllAgreeChecked(allState);
  }, [agree_list]);

  const value = useMemo(
    () => ({
    isAgreeChecked, allAgreeChecked,
    setIsAgreeChecked, setAllAgreeChecked,
    essentialChecked, setEssentialChecked,
    agree_list
    }),
    [isAgreeChecked, allAgreeChecked, essentialChecked]
  );

  const onHandleChange = useCallback((e, val) => {
    if (onChange) onChange(e, val);
  }, [onChange]);

  return (
    <fieldset>
      <legend className="away">이용약관 및 개인정보수집 및 이용에 관한 동의</legend>
      {!hasMobile ? (
        <div className="terms-agree-wrap">
          <CheckContext.Provider value={value}>
            <ul className="terms-content-list">
              {agree_list.map((v, i) => {
                return (
                  <li key={i}>
                    <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true} onChange={(e, val) => onHandleChange(e, val)} />
                    <div className="terms-box">
                      <ColoredScrollbars autoHeightMax={160}>
                        <div className="frminbox" dangerouslySetInnerHTML={{ __html: agree_term[i] }}></div>
                      </ColoredScrollbars>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="terms-agree-all">
              {!isEmpty(sub_id) && <CheckBox id={sub_id} title={sub_title} checked={essentialChecked} agreeType={true} agreeEssential={true} onChange={onHandleChange} />}
              {!isEmpty(id) && <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} onChange={onHandleChange} />}
            </div>
          </CheckContext.Provider>
        </div>
      ) : (
        <>
          <div className="inner check-list-wrap">
            <CheckContext.Provider value={value}>
              <ul className="check-select-list">
                {agree_list.map((v, i) => {
                  return (
                    <li key={i}>
                      <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true} size="noborder" onChange={(e, val) => onHandleChange(e, val)} />
                      {/* <span className="term-view" onClick={() => Router.push(links[i])}></span> */}
                      <span className="term-view" onClick={events[i]} />
                    </li>
                  );
                })}
              </ul>
              <div className="terms-agree-all">
                <CheckBox id={sub_id} title={sub_title} checked={essentialChecked} agreeType={true} agreeEssential={true} onChange={onHandleChange} />
                <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} onChange={onHandleChange} />
              </div>
            </CheckContext.Provider>
          </div>
        </>
      )}
    </fieldset>
  );
};

SignUpCheckBoxGroup.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  sub_title: PropTypes.string,
  sub_id: PropTypes.string,
  agree_list: PropTypes.array,
  agree_term: PropTypes.array,
  onChange: PropTypes.func
};

export default SignUpCheckBoxGroup;
