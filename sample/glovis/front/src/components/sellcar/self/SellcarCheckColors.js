import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const SellcarCheckColors = ({ isTitle = true, selectedColor, onClose, onClick, mode = 'check', isSelectButton = true, colorList = [] }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [colorOptionMore, setColorOptionMore] = useState(true);
  const [selectColor, setSelectColor] = useState(selectedColor || '');

  useEffect(() => {
    setSelectColor(selectedColor);
  }, [selectedColor]);

  const handleColorOption = useCallback(
    (e) => {
      e.preventDefault();
      setColorOptionMore(!colorOptionMore);
    },
    [colorOptionMore]
  );

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      onClose && onClose();
    },
    [onClose]
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      onClick && onClick(e, selectColor);
    },
    [onClick, selectColor]
  );

  const handleChange = useCallback((e) => {
    const _chkColorId = e.target.id.replace('chk-', '');
    setSelectColor(_chkColorId);
  }, []);
  const modeCheck = mode === 'check';

  return (
    <>
      {isTitle && <h4 className="tit2">주요색상</h4>}
      <ul className="color-list">
        {colorList
          .filter((x) => x.mainYn === 'Y')
          .map((item, index) => {
            return (
              <li key={index}>
                <CheckBox
                  id={item.id}
                  title={item.title || item.label}
                  name={item.label}
                  checked={selectColor === item.value}
                  isSelf={modeCheck}
                  onChange={handleChange}
                  isColor={true}
                  bgColor1={item.bgColor}
                  chkColor={item.chkColor}
                />
              </li>
            );
          })}
      </ul>
      {hasMobile && <h4 className="tit2">추가색상</h4>}
      {!hasMobile && (
        <div className={colorOptionMore ? 'cate-list-btn active' : 'cate-list-btn'}>
          <button onClick={handleColorOption}>{colorOptionMore ? '색상전체 닫기' : '색상전체 열기'}</button>
        </div>
      )}
      <Transition in={colorOptionMore} timeout={300}>
        {(state) => (
          <ul className={`color-list border fade fade-${state}`}>
            {colorList
              .filter((x) => x.mainYn === 'N')
              .map((item, index) => {
                return (
                  <li key={index}>
                    <CheckBox
                      id={item.id}
                      title={hasMobile ? item.title || item.label : item.label}
                      name={item.label}
                      checked={selectColor === item.value}
                      isSelf={modeCheck}
                      onChange={handleChange}
                      isColor={true}
                      bgColor1={item.bgColor}
                      chkColor={item.chkColor}
                    />
                  </li>
                );
              })}
          </ul>
        )}
      </Transition>
      {hasMobile && isSelectButton && <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />}
      {!hasMobile && (
        <Buttons align="center" marginTop={48}>
          <Button size="big" marginRight={10} background="gray" title="취소" width={180} onClick={handleClose} />
          <Button size="big" background="blue80" title="선택" width={180} onClick={handleClick} />
        </Buttons>
      )}
    </>
  );
};

SellcarCheckColors.propTypes = {
  isTitle: PropTypes.bool,
  isSelectButton: PropTypes.bool,
  mode: PropTypes.string,
  selectedColor: PropTypes.string,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  colorList: PropTypes.array
};

export default SellcarCheckColors;
