import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const CheckColors = ({ isTitle = true, onClose, onClick, data, selectData = [], onCancel, onSearch }) => {
  const [selectColor, setSelectColor] = useState(selectData);
  const [colorOptionMore, setColorOptionMore] = useState(false);
  let mainColor = [];
  let subColor = [];
  useEffect(() => {
    if (selectData !== selectColor) {
      setSelectColor(selectData);
    }
  }, [selectData]);

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      onClose && onClose();
    },
    [onClose]
  );

  const handleColorOption = useCallback(
    (e) => {
      e.preventDefault();
      setColorOptionMore(!colorOptionMore);
    },
    [colorOptionMore]
  );

  useEffect(() => {
    onClick(selectColor);
  }, [selectColor]);

  if (!isEmpty(data)) {
    mainColor = data.filter((item) => item.mainYn === 'Y');
    subColor = data.filter((item) => item.mainYn === 'N');
  }

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      onClick && onClick(selectColor);
    },
    [onClick, selectColor]
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setSelectColor(
      produce((draft) => {
        if (checked) {
          draft.push(name);
        } else {
          draft.splice(draft.indexOf(name), 1);
        }
      })
    );
  };

  return (
    <>
      {isTitle && <h4>주요색상</h4>}
      <ul className="color-list">
        {!isEmpty(mainColor) &&
          mainColor.map((data, idx) => {
            return (
              <>
                <li key={idx}>
                  <CheckBox id={'chk-mainClr-' + data.sno} title={data.tby010ClrSnm} name={data.sno} checked={selectColor.includes(data.sno + '')} isSelf={false} onChange={handleChange} />
                </li>
              </>
            );
          })}
      </ul>
      <div className={colorOptionMore ? 'cate-list-btn active' : 'cate-list-btn'}>
        <button onClick={handleColorOption}>{colorOptionMore ? '색상전체 닫기' : '색상전체 열기'}</button>
      </div>
      <Transition in={colorOptionMore} timeout={300}>
        {(state) => (
          <ul className={`color-list border fade fade-${state}`}>
            {!isEmpty(subColor) &&
              subColor.map((data, idx) => {
                return (
                  <>
                    <li key={idx}>
                      <CheckBox id={'chk-' + data.sno} title={data.tby010ClrSnm} name={data.sno} checked={selectColor.includes(data.sno + '')} isSelf={false} onChange={handleChange} />
                    </li>
                  </>
                );
              })}
          </ul>
        )}
      </Transition>
      <Buttons align="center" marginTop={40}>
        <Button size="big" marginRight={10} background="gray" title="취소" width={180} buttonMarkup={true} onClick={onCancel} />
        <Button size="big" background="blue80" title="검색" width={180} buttonMarkup={true} onClick={onSearch} />
      </Buttons>
    </>
  );
};

CheckColors.propTypes = {
  isTitle: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  onSearch: PropTypes.func,
  selectData: PropTypes.array,
  data: PropTypes.array
};

export default CheckColors;
