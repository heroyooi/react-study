import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Radio from '@lib/share/items/Radio';
import Button from '@lib/share/items/Button';

// CSS 수정용 - 모바일 주소 선택시 상세주소 데이터셋 예시
// dataContext = [
//   {
//     locCd: "41",
//     locNm: "경기도",
//     shortNm: "경기",
//     citys: [
//       {
//         ctyCd: "113",
//         ctyNm: "수원시 권선구",
//         label: "수원시 권선구",
//         locCd: "41",
//         value: "113"
//       },
//       {
//         ctyCd: "113",
//         ctyNm: "수원시 권선구",
//         label: "수원시 권선구",
//         locCd: "41",
//         value: "113"
//       }
//     ]
//   }
// ]

const MobSelectLocal = ({ active, dataContext, selectedValue, onChange, onClick, onMenuClick, onMore }) => {
  const handleMenuToggle = useCallback(
    (e, deps) => {
      e.preventDefault();

      if (onMenuClick) {
        onMenuClick(deps.dataItem);
      }
    },
    [onMenuClick]
  );

  const handleChange = useCallback(
    (e, deps) => {
      if (onChange) {
        onChange(deps.city);
      }
    },
    [onChange]
  );

  return (
    <>
      <div className="inner pb0">
        <div className="float-wrap btn-s">
          <h3 className="tit1">방문지역 선택</h3>
          <Button size="sml" background="blue20" color="blue80" radius={true} title={active ? '닫기' : '더보기'} width={50} onClick={onMore} />
        </div>
        <ul className="m-toggle-list m-local">
          {dataContext &&
            dataContext.map((v, i) => {
              return (
                <MenuItem key={i}>
                  <MenuTitle key={i} dataContext={v} callback={handleMenuToggle}>
                    {v.label}
                  </MenuTitle>
                  <MenuCont>
                    <ul className="radio-block tp1">
                      {v.citys &&
                        v.citys.map((c, j) => {
                          return (
                            <li key={j}>
                              <Radio
                                className="txt"
                                dataContext={{ location: v, city: c }}
                                id={`rdo-${i}-${j}`}
                                checked={parseInt(selectedValue)}
                                label={c.label}
                                value={parseInt(c.value)}
                                onChange={handleChange}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </MenuCont>
                </MenuItem>
              );
            })}
        </ul>
      </div>
      <Button className="fixed" size="full" background="blue80" title="선택" height={56} onClick={onClick} />
    </>
  );
};

MobSelectLocal.propTypes = {
  active: PropTypes.bool,
  dataContext: PropTypes.array,
  selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onMenuClick: PropTypes.func,
  onMore: PropTypes.func
};

export default MobSelectLocal;
