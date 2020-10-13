import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';

const MobSelectTerms = memo(({ allAgree = true, termsData = null, onChange = null, onClick = null, onTermsClick = null, btnName="신청" }) => {
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
    setTermsCheckAll(copyLocal.every((v) => v.checked === true));
    if (onChange) {
      onChange({}, copyLocal);
    }
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
  };

  return (
    <div className="inner check-list-wrap">
      <ul className="check-select-list">
        {termsCheck.map((v) => {
          return (
            <li key={v.id}>
              <CheckBox id={v.id} title={v.title} size="noborder" checked={v.checked} isSelf={false} onChange={handleCheck(v.id)} />
              <span className="term-view" onClick={handleTermsClick(v)} />
            </li>
          );
        })}
      </ul>
      {allAgree === true && (
        <div className={termsData.length > 1 ? "float-wrap w-agree-chk" : "float-wrap"}>
          {termsData.length > 1 ? (
            <>
              <CheckBox className="fl" id="chk4" title="전체동의 합니다." checked={termsCheckAll} isSelf={false} onChange={handleCheckAll} />
              {/* <Button className="fr" size="big" background="blue80" radius={true} title={btnName} width={94} height={56} onClick={handleApply} /> */}
              <Button className="fixed" size="full" background="blue80" title={btnName} onClick={handleApply} />
            </>
          ) : (
            <Button className="fixed" size="full" background="blue80" title={btnName} onClick={handleApply} />
          )}
        </div>
      )}
    </div>
  );
});

MobSelectTerms.propTypes = {
  allAgree: PropTypes.bool,
  termsData: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onTermsClick: PropTypes.func,
  btnName: PropTypes.string
};

MobSelectTerms.displayName = 'MobSelectTerms';
export default MobSelectTerms;
