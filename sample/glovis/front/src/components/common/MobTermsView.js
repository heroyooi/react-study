import React, { useCallback } from 'react';
import Button from '@lib/share/items/Button';
import MobSelectBox from '@lib/share/items/MobSelectBox';

const MobTermsView = ({ seq = '', agree_term, selectDate, selectOptions, callback, onClick }) => {
  const handleClick = useCallback((e) => {
    callback(e);
  }, []);
  const onClickSelect = useCallback((num, e) => {
    if (onClick) onClick(num, e);
  }, []);
  return (
    <div className="member-terms-wrap">
      <div className="view-wrap">
        {selectDate && (
          <div className="select-date-area">
            <p className="select-date-label">시행일</p>
            <MobSelectBox options={selectOptions} subPop={true} onClick={onClickSelect} />
          </div>
        )}
        {seq !== '' ? <div className="content frminbox">{agree_term[seq]}</div> : <div className="content frminbox" dangerouslySetInnerHTML={{ __html: agree_term }} />}
        <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleClick} />
      </div>
    </div>
  );
};

export default MobTermsView;
