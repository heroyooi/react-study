import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const CheckColors = ({ colorList, displayMemberPath, isTitle = true, isSelectButton = true, mode = 'check', selectedColor = [], selectedValuePath, onClose, onClick, onChange }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [colorOptionMore, setColorOptionMore] = useState(true);
  const [selectedColors, setSelectedColors] = useState(Array.isArray(selectedColor) ? selectedColor : [selectedColor]);

  // useEffect(() => {
  //   if (!isEqual(selectedColor, selectedColors)) {
  //     console.log(selectedColor);
  //     console.log(selectedColors);
  //     setSelectedColors(selectedColor);
  //   }
  // }, [selectedColor]);

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
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (onClick) {
        onClick(e, selectedColors);
      }
    },
    [onClick, selectedColors]
  );

  const handleChange = useCallback(
    (e, deps) => {
      console.log('selectedColors', selectedColors);
      let tmp = [...selectedColors];
      if (mode !== 'check') {
        tmp = [deps[selectedValuePath]];
      } else if (mode === 'check' && tmp.includes(deps[selectedValuePath])) {
        tmp.splice(tmp.indexOf(deps[selectedValuePath]), 1);
      } else {
        tmp.push(deps[selectedValuePath]);
      }

      setSelectedColors(tmp);
      // onChange && onChange(selectedColors);
      onChange && onChange(tmp);
    },
    [mode, selectedColors, selectedValuePath]
  );

  // useEffect(() => {
  //   onChange && onChange(selectedColors);
  // }, [selectedColors]);

  return (
    <>
      {isTitle && <h4 className="tit2">주요색상</h4>}
      <ul className="color-list">
        {(colorList || [])
          .filter((x) => x.mainYn === 'Y')
          .map((data, idx) => {
            return (
              <li key={idx}>
                <CheckBox
                  id={`chk-main-color-${idx}`}
                  title={data[displayMemberPath]}
                  name={data[displayMemberPath]}
                  dataContext={data}
                  checked={Array.isArray(selectedColors) ? selectedColors.includes(data[selectedValuePath]) : selectedColors === data[selectedValuePath]}
                  isSelf={false}
                  onChange={handleChange}
                  isColor={true}
                  bgColor1={data.clr1Cd}
                  bgColor2={data.clr2Cd || null}
                  chkColor={data.chkColor || null}
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
            {(colorList || [])
              .filter((x) => x.mainYn === 'N')
              .map((data, idx) => {
                return (
                  <li key={idx}>
                    <CheckBox
                      id={`chk-color-${idx}`}
                      title={data[displayMemberPath]}
                      name={data[displayMemberPath]}
                      dataContext={data}
                      checked={Array.isArray(selectedColors) ? selectedColors.includes(data[selectedValuePath]) : selectedColors === data[selectedValuePath]}
                      isSelf={false}
                      onChange={handleChange}
                      isColor={true}
                      bgColor1={data.clr1Cd}
                      bgColor2={data.clr2Cd || null}
                      chkColor={data.chkColor || null}
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
          <Button size="big" background="blue80" title="검색" width={180} onClick={handleClick} />
        </Buttons>
      )}
    </>
  );
};

CheckColors.propTypes = {
  colorList: PropTypes.array,
  displayMemberPath: PropTypes.string,
  isSelectButton: PropTypes.bool,
  isTitle: PropTypes.bool,
  mode: PropTypes.string,
  selectedColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  selectedValuePath: PropTypes.string,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

export default CheckColors;
