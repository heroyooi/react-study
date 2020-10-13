import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';

const MobSelectTerms = ({ termsData, onClick, onTermsClick }) => {
  const [termsCheck, setTermsCheck] = useState(termsData);
  const [termsCheckAll, setTermsCheckAll] = useState(termsData.every((v) => v.checked === true));
  const handleCheck = (id) => () => {
    const copyLocal = [...termsCheck];
    copyLocal.map((v) => {
      if (v.id === id) {
        v.checked = !v.checked;
      }
    });
    setTermsCheck(copyLocal);
    console.log(copyLocal);
    setTermsCheckAll(copyLocal.every((v) => v.checked === true));
  };

  const handleCheckAll = (e) => {
    const copyLocal = [...termsCheck];
    copyLocal.map((v) => (v.checked = e.target.checked === true ? true : false));
    setTermsCheck(copyLocal);
    setTermsCheckAll((prevCheck) => !prevCheck);
  };

  const handleApply = useCallback(
    (e) => {
      e.preventDefault();

      if (onClick) {
        onClick(e, termsCheckAll);
      }
    },
    [onClick, termsCheckAll]
  );

  const handleTermsClick = (v) => (e) => {
    if (onTermsClick) onTermsClick(e, v);
  }  

  return (
    <div className="inner check-list-wrap">
      <ul className="check-select-list">
        {termsCheck.map((v) => {
          return (
            <li key={v.id}>
              <CheckBox id={v.id} title={v.title} size="noborder" checked={v.checked} isSelf={false} onChange={handleCheck(v.id)} />
              <span className="term-view" onClick={handleTermsClick(v)}></span>
            </li>
          );
        })}
      </ul>
      <div className="float-wrap">
        <CheckBox className="fl" id="chk4" title="전체동의 합니다." checked={termsCheckAll} isSelf={false} onChange={handleCheckAll} />
        <Button className="fr" size="big" background="blue80" radius={true} title="신청" width={94} height={56} onClick={handleApply} />
      </div>
    </div>
  );
};

MobSelectTerms.propTypes = {
  termsData: PropTypes.array,
  onClick: PropTypes.func
};

export default MobSelectTerms;
