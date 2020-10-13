import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const CheckColors = ({ isTitle=true, selectedColor, onClose, onClick, mode='check', isSelectButton=true }) => {
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
    setSelectColor(e.target.name);
  }, []);
  const modeCheck = mode === 'check';

  const [checkValue, setCheckValue] = useState('색상');
  // const handleSelectColors = (e) => {
  //   e.preventDefault();
  //   if (onSelect) onSelect(selectColor, e);
  // }

  return (
    <>
      {isTitle && <h4 className="tit2">주요색상</h4>}
      <ul className="color-list">
        <li>
          <CheckBox id="chk-white-02" title="흰색" name="흰색" checked={selectColor === '흰색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#fff" />
        </li>
        <li>
          <CheckBox id="chk-black-02" title="검정색" name="검정색" checked={selectColor === '검정색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#000" chkColor="white" />
        </li>
        <li>
          <CheckBox id="chk-silver-2" title="은색" name="은색" checked={selectColor === '은색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#e5e5e5" chkColor="black" />
        </li>
        <li>
          <CheckBox id="chk-silvergray-2" title="회색" name="회색" checked={selectColor === '회색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#bcbcbc" chkColor="white" />
        </li>
        <li>
          <CheckBox id="chk-pearl-02" title="진주색" name="진주색" checked={selectColor === '진주색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#f8f7e2" chkColor="black" />
        </li>
        {/* <li>
          <CheckBox
            id="chk-black2-02"
            type="chk-color2"
            title="검정투톤"
            name="검정투톤"
            checked={selectColor === '검정투톤'}
            isSelf={modeCheck}
            onChange={handleChange}
            isColor={true}
            bgColor1="#616161"
            bgColor2="#000"
            chkColor="white"
          />
        </li>
        <li>
          <CheckBox id="chk-gray-02" title="쥐색" name="쥐색" checked={selectColor === '쥐색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#616161" chkColor="white" />
        </li> */}
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
            <li>
              <CheckBox id="chk-blue-2" title="파랑색" name="파랑색" checked={selectColor === '파랑색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#12427f" chkColor="white" />
            </li>
            <li>
              <CheckBox id="chk-sky-2" title="하늘색" name="하늘색" checked={selectColor === '하늘색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#75919c" chkColor="white" />
            </li>
            <li>
              <CheckBox id="chk-red-2" title="빨강색" name="빨강색" checked={selectColor === '빨강색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#cc001f" chkColor="white" />
            </li>
            <li>
              <CheckBox id="chk-brown-2" title="갈색" name="갈색" checked={selectColor === '갈색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#685a36" chkColor="white" />
            </li>
            <li>
              <CheckBox id="chk-green-2" title="초록색" name="초록색" checked={selectColor === '초록색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#2ecd00" chkColor="white" />
            </li>
            <li>
              <CheckBox
                id="chk-yellow-2"
                title="노랑색"
                name="노랑색"
                checked={selectColor === '노랑색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#fff845"
                chkColor="black"
              />
            </li>
            <li>
              <CheckBox
                id="chk-gold-2"
                className="chip-gold chk-white"
                title="금색"
                name="금색"
                checked={selectColor === '금색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#827438"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox
                id="chk-orange-2"
                title="주황색"
                name="주황색"
                checked={selectColor === '주황색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#fb7902"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox id="chk-wine-2" title="자주색" name="자주색" checked={selectColor === '자주색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#7d265b" chkColor="white" />
            </li>
            <li>
              <CheckBox id="chk-pink-2" title="분홍색" name="분홍색" checked={selectColor === '분홍색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#fdc3d8" chkColor="black" />
            </li>
            {/* <li>
              <CheckBox id="chk-silver-2" title="은색" name="은색" checked={selectColor === '은색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#e5e5e5" chkColor="black" />
            </li>
            <li>
              <CheckBox
                id="chk-silvergray-2"
                title="회색"
                name="회색"
                checked={selectColor === '회색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#bcbcbc"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox
                id="chk-silver2-2"
                title="은색투톤"
                type="chk-color2"
                name="은색투톤"
                checked={selectColor === '은색투톤'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#bcbcbc"
                bgColor2="#464741"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox
                id="chk-white2-2"
                title="흰색투톤"
                type="chk-color2"
                name="흰색투톤"
                checked={selectColor === '흰색투톤'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#fff"
                bgColor2="#d7d7d7"
                chkColor="black"
              />
            </li>
            <li>
              <CheckBox
                id="chk-pearl2-2"
                title="진주투톤"
                type="chk-color2"
                name="진주투톤"
                checked={selectColor === '진주투톤'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#f8f7e2"
                bgColor2="#ddddc9"
                chkColor="black"
              />
            </li>
            <li>
              <CheckBox
                id="chk-galactic-2"
                title="은하색"
                name="은하색"
                checked={selectColor === '은하색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#a6b2b0"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox
                id="chk-lightsilver-2"
                title="명은색"
                name="명은색"
                checked={selectColor === '명은색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#d0d9e7"
                chkColor="black"
              />
            </li>
            <li>
              <CheckBox id="chk-red-2" title="빨강색" name="빨강색" checked={selectColor === '빨강색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#cc001f" chkColor="white" />
            </li>
            <li>
              <CheckBox
                id="chk-orange-2"
                title="주황색"
                name="주황색"
                checked={selectColor === '주황색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#fb7902"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox id="chk-wine-2" title="자주색" name="자주색" checked={selectColor === '자주색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#7d265b" chkColor="white" />
            </li>
            <li>
              <CheckBox
                id="chk-purple-2"
                title="보라색"
                name="보라색"
                checked={selectColor === '보라색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#640780"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox id="chk-pink-2" title="분홍색" name="분홍색" checked={selectColor === '분홍색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#fdc3d8" chkColor="black" />
            </li>
            <li>
              <CheckBox
                id="chk-yellow-2"
                title="노랑색"
                name="노랑색"
                checked={selectColor === '노랑색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#fff845"
                chkColor="black"
              />
            </li>
            <li>
              <CheckBox id="chk-reed-2" title="갈대색" name="갈대색" checked={selectColor === '갈대색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#808174" chkColor="white" />
            </li>
            <li>
              <CheckBox
                id="chk-lightgold-2"
                title="연금색"
                name="연금색"
                checked={selectColor === '연금색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#8e8574"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox id="chk-brown-2" title="갈색" name="갈색" checked={selectColor === '갈색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#685a36" chkColor="white" />
            </li>
            <li>
              <CheckBox
                id="chk-brown2-2"
                title="갈색투톤"
                type="chk-color2"
                name="갈색투톤"
                checked={selectColor === '갈색투톤'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#685a36"
                bgColor2="#464741"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox
                id="chk-gold-2"
                className="chip-gold chk-white"
                title="금색"
                name="금색"
                checked={selectColor === '금색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#827438"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox
                id="chk-gold2-2"
                title="금색투톤"
                type="chk-color2"
                name="금색투톤"
                checked={selectColor === '금색투톤'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#827438"
                bgColor2="#464741"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox id="chk-blue-2" title="파랑색" name="파랑색" checked={selectColor === '파랑색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#12427f" chkColor="white" />
            </li>
            <li>
              <CheckBox id="chk-sky-2" title="하늘색" name="하늘색" checked={selectColor === '하늘색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#75919c" chkColor="white" />
            </li>
            <li>
              <CheckBox
                id="chk-palegreen-2"
                title="담초록색"
                name="담초록색"
                checked={selectColor === '담초록색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#1e444b"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox id="chk-green-2" title="초록색" name="초록색" checked={selectColor === '초록색'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#2ecd00" chkColor="white" />
            </li>
            <li>
              <CheckBox
                id="chk-lightgreen-2"
                title="연두색"
                name="연두색"
                checked={selectColor === '연두색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#9ab95c"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox
                id="chk-bluegreen-2"
                title="청옥색"
                name="청옥색"
                checked={selectColor === '청옥색'}
                isSelf={modeCheck}
                onChange={handleChange}
                isColor={true}
                bgColor1="#1f7d7c"
                chkColor="white"
              />
            </li>
            <li>
              <CheckBox id="chk-other-2" title="기타" name="기타" checked={selectColor === '기타'} isSelf={modeCheck} onChange={handleChange} isColor={true} bgColor1="#fff" />
            </li> */}
          </ul>
        )}
      </Transition>
      {(hasMobile && isSelectButton) && <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />}
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
  isTitle: PropTypes.bool,
  mode: PropTypes.string,
  selectedColor: PropTypes.string,
  onClose: PropTypes.func,
  onClick: PropTypes.func
};

export default CheckColors;
