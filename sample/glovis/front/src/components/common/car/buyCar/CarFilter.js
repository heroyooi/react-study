import React, { useState, useCallback, useEffect, useContext } from 'react';

import { produce } from 'immer';
import { isEmpty, cloneDeep, isUndefined } from 'lodash';
import { useCookies } from 'react-cookie';
import CarOptions from '@src/components/common/car/buyCar/CarOptions';
import CheckColors from '@src/components/common/CheckColors';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import TreeCheckCount from '@lib/share/items/TreeCheckCount';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import FilterRange from '@lib/share/items/FilterRange';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import DynamicCategory from '@lib/share/items/DynamicCategory';
import CategoryItem from '@lib/share/items/CategoryItem';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { axiosPost } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { createCate, getCarDefaultFilter, getCarDistance, getCarNumberOfYears } from '@src/utils/CarFilterUtil';
import { preventScroll } from '@src/utils/CommonUtil';

//const [cookies, setCookie, removeCookie] = useCookies(['recentView']);
let treeDataCheck;
let treeData;
let tempCrMdlCd = [];
let tempClsCd = [];
const CarFilter = ({ title = '차량검색', type = 'normal', onChange, selected, pagetype }) => {
  const { showAlert, initAlert, showConfirm } = useContext(SystemContext);
  const [cookies, setCookie, removeCookie] = useCookies(['item']);

  if (cookies.item === undefined) {
    setCookie('item', []);
  }
  const selectDsitance = getCarDistance();

  const pad = (n) => {
    n = n + '';
    const width = 2;
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  };

  useEffect(() => {    
    if (selected.crMnfcCd) {
      console.log("selectCountData.do::","crMnfcCd");
      axiosPost('/api/buycar/selectCountData.do', { ...form, ...selected }).then((payload) => {
        setFilterData(
          produce((draft) => {
            draft.model = payload.data.data.model;
            draft.svc = payload.data.data.svc;
          })
        );
        resetFilter(selected);
      });
    }
  }, [selected]);

  const [subFormData, setSubFormData] = useState({ fuel: [], mss: [], carOption: [], color: [] });
  const [activeSubFormData, setActiveSubFormData] = useState({});
  const selectYear = getCarNumberOfYears();
  const date = new Date();

  const selectMonth = [];
  for (let i = 1; i <= 12; i++) {
    selectMonth.push({ value: pad(i), label: pad(i) });
  }
  date.getFullYear();
  // 필터
  const [filterData, setFilterData] = useState({});
  useEffect(() => {
    axiosPost('/api/buycar/selectFilterTreedata.do', form).then((payload) => {
      setFilterData(payload.data.data);
    });
  }, []);
  // 선택초기화
  const resetFilter = useCallback((selected) => {
    if (isEmpty(selected)) {
      setForm({ ...formInitData, crMnfcCd: '', crMdlCd: '', cdMnfcNm: '', crMdlNm: '', crDtlMdlCd: [], crClsCd: [], crDtlClsCd: [], crDtlMdlNm: [], crClsNm: [], crDtlClsNm: [] });
    } else {
      setForm({ ...formInitData, ...selected, crClsCd: [], crDtlClsCd: [], crClsNm: [], crDtlClsNm: [] });
    }
    setActiveSubFormData({ fuel: [], mss: [], carOption: [], color: [] });
    setSubFormData({ fuel: [], mss: [], carOption: [], color: [] });
  }, []);

  // 필더 더보기 클릭 시 팝업
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const modalCloseButtonHandler = (e, flag) => {
    e.preventDefault();
    setRodalShow(flag);
    preventScroll(false);
  };
  const [carOptionMore, setCarOptionMore] = useState(false);
  const handleCarOption1 = (e) => {
    e.preventDefault();
    setCarOptionMore(!carOptionMore);
  };

  const [filterCheck3, setFilterCheck3] = useState(false);
  const [filterCheck2, setFilterCheck2] = useState(false);
  const [filterCheck1, setFilterCheck1] = useState(false);

  const handleChangeFilter1 = () => {
    setFilterCheck1(!filterCheck1);
  };
  const handleChangeFilter2 = () => {
    setFilterCheck2(!filterCheck2);
  };
  const handleChangeFilter3 = () => {
    setFilterCheck3(!filterCheck3);
  };

  const formInitData = getCarDefaultFilter(type);

  const [form, setForm] = useState(formInitData);
  const handleCho = (e, title) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setForm(
      produce((draft) => {
        if (checked) {
          if (draft[title] === undefined) {
            draft[title] = [];
          }
          draft[title].push(name);
        } else {
          draft[title].splice(draft[title].indexOf(name), 1);
        }
      })
    );
  };

  const setPriceRange = (value) => {
    setForm(
      produce((draft) => {
        draft.priceRange = value;
      })
    );
  };
  const setDistanceRange = (value) => {
    setForm(
      produce((draft) => {
        draft.distanceRange = value;
      })
    );
  };

  const setPriceRangeInput = (e, type) => {
    const v = e.target.value;
    setForm(
      produce((draft) => {
        draft.priceRange[type] = v;
      })
    );
  };
  const setDistanceRangeSelect = (value, type) => {
    if (type === 'max') {
      if (value.value <= form.distanceRange.min) return;
    } else {
      if (value.value >= form.distanceRange.max) return;
    }
    setForm(
      produce((draft) => {
        draft.distanceRange[type] = value.value;
      })
    );
  };

  const setYearRange = (value) => {
    setForm(
      produce((draft) => {
        draft.yearRange = value;
      })
    );
  };

  const handleYearSelect = (d, e) => {
    if (e.name === 'min' && d.value > form.yearRange.max) return;
    if (e.name === 'max' && d.value < form.yearRange.min) return;

    if (e.name)
      setForm(
        produce((draft) => {
          draft.yearRange[e.name] = d.value;
        })
      );
  };

  const handleOptClick = (e) => {
    setSubFormData(
      produce((draft) => {
        draft.carOption = e;
      })
    );
  };

  const handleClrClick = (e) => {
    console.log("handleClrClick -> e", e)
    setSubFormData(
      produce((draft) => {
        draft.color = e;
      })
    );
  };
  const handleFuelClick = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setSubFormData(
      produce((draft) => {
        if (checked) {
          if (draft.fuel === undefined) {
            draft.fuel = [];
          }
          draft.fuel.push(name);
        } else {
          draft.fuel.splice(draft.fuel.indexOf(name), 1);
        }
      })
    );
  };

  const handleMssClick = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setSubFormData(
      produce((draft) => {
        if (checked) {
          if (draft.mss === undefined) {
            draft.mss = [];
          }
          draft.mss.push(name);
        } else {
          draft.mss.splice(draft.mss.indexOf(name), 1);
        }
      })
    );
  };

  const handleTreeClick = (e, data, data2) => {
    const checked = e.target.checked;
    treeData = data;
    treeDataCheck = checked;
    if (data.level === '0') {
      axiosPost('/api/buycar/selectFilterCarData.do', { ...form, crMnfcCd: checked ? data.value : '', crMdlCd: '', crDtlMdlCd: [], crClsCd: [], crDtlClsCd: [] }).then((payload) => {
        let newTree = [];
        if (checked) {
          newTree = cloneDeep(filterData.model.filter((item) => item.value === data.value));
          newTree[0].defaultChecked = true;
          newTree[0].children = payload.data.data.model;
        } else {
          newTree = payload.data.data.model;
        }

        setFilterData(
          produce((draft) => {
            draft.model = newTree;
          })
        );
      });
    } else if (data.level === '1') {
      axiosPost('/api/buycar/selectFilterCarData.do', { ...form, crMdlCd: checked ? data.value : '', crDtlMdlCd: [], crClsCd: [], crDtlClsCd: [] }).then((payload) => {
        let finditem = [];
        if (checked) {
          finditem = cloneDeep(filterData.model[0].children.filter((item) => item.value === data.value));
          finditem[0].defaultChecked = true;
          finditem[0].children = payload.data.data.model;
        } else {
          finditem = cloneDeep(filterData.model.filter((item) => item.value === form.crMnfcCd));
          finditem[0].defaultChecked = true;
          finditem[0].children = payload.data.data.model;
        }

        setFilterData(
          produce((draft) => {
            if (checked) draft.model[0].children = finditem;
            else draft.model = finditem;

            draft.service = payload.data.data.svc;
          })
        );
      });
    } else if (data.level === '2') {
      if (tempCrMdlCd === undefined || tempCrMdlCd.length === 0) {
        const crDtlMdlCd = [];
        if (checked) crDtlMdlCd.push(data.value);
        else crDtlMdlCd.splice(tempCrMdlCd.indexOf(data.value), 1);
        axiosPost('/api/buycar/selectFilterCarData.do', {
          ...form,
          crDtlMdlCd: crDtlMdlCd,
          crClsCd: [],
          crDtlClsCd: []
        }).then((payload) => {
          let finditem = [];
          if (checked) {
            const findItemIdx = filterData.model[0].children[0].children.findIndex((item) => item.value === data.value);
            finditem = cloneDeep(filterData.model[0].children[0].children);
            finditem[findItemIdx].defaultChecked = true;
            finditem[findItemIdx].children = payload.data.data.model;
          } else {
            finditem = cloneDeep(filterData.model[0].children.filter((item) => item.value === form.crMdlCd));
            finditem[0].defaultChecked = true;
            finditem[0].children = payload.data.data.model;
          }

          setFilterData(
            produce((draft) => {
              if (checked) draft.model[0].children[0].children = finditem;
              else draft.model[0].children = finditem;

              draft.service = payload.data.data.svc;
            })
          );
        });
      } else {
        if (tempCrMdlCd.length > 0) {
          setFilterData(
            produce((draft) => {
              draft.model[0].children[0].children.map((item) => {
                item.children = [];
              });
            })
          );
        }
      }
    } else if (data.level === '3') {
      if (tempClsCd === undefined || tempClsCd.length === 0) {
        const crClsCd = [];
        if (checked) crClsCd.push(data.value);
        else crClsCd.splice(tempClsCd.indexOf(data.value), 1);
        axiosPost('/api/buycar/selectFilterCarData.do', {
          ...form,
          crClsCd: crClsCd,
          crDtlClsCd: []
        }).then((payload) => {
          let finditem = [];
          if (checked) {
            const findDtMdIdx = filterData.model[0].children[0].children.findIndex((item) => item.value === form.crDtlMdlCd[form.crDtlMdlCd.length - 1]);
            const findClssIdx = filterData.model[0].children[0].children[findDtMdIdx].children.findIndex((item) => item.value === data.value);
            finditem = cloneDeep(filterData.model[0].children[0].children[findDtMdIdx]);

            finditem.defaultChecked = true;
            finditem.children[findClssIdx].defaultChecked = true;
            const validList = payload.data.data.model.filter((item) => item.label !== undefined);
            if (validList.length > 0) {
              finditem.children[findClssIdx].children = validList;
            }
          } else {
            return;
            // finditem = cloneDeep(filterData.model[0].children.filter((item) => item.value === form.crMdlCd));
            // finditem[0].defaultChecked = true;
            // finditem[0].children = payload.data.data.model;
          }

          setFilterData(
            produce((draft) => {
              if (checked) {
                draft.model[0].children[0].children = [];
                draft.model[0].children[0].children.push(finditem);
              }

              draft.service = payload.data.data.svc;
            })
          );
        });
      } else {
        setFilterData(
          produce((draft) => {
            draft.model[0].children[0].children[0].children.map((item) => {
              item.children = [];
            });
          })
        );
      }
    }

    setForm(
      produce((draft) => {
        if (data.level === '0' && checked) {
          draft.crMnfcCd = data.value;
          draft.crMnfcNm = data.label;
        } else if (data.level === '0' && !checked) {
          draft.crMnfcCd = '';
          draft.crMdlCd = '';
          draft.crDtlMdlCd = [];
          draft.crClsCd = [];
          draft.crDtlClsCd = [];
          draft.crMnfcNm = '';
          draft.crMdlNm = '';
          draft.crDtlMdlNm = [];
          draft.crClsNm = [];
          draft.crDtlClsNm = [];
        } else if (data.level === '1' && checked) {
          draft.crMdlCd = data.value;
          draft.crMdlNm = data.label;
        } else if (data.level === '1' && !checked) {
          draft.crMdlCd = '';
          draft.crDtlMdlCd = [];
          draft.crClsCd = [];
          draft.crDtlClsCd = [];
          draft.crMdlNm = '';
          draft.crDtlMdlNm = [];
          draft.crClsNm = [];
          draft.crDtlClsNm = [];
        } else if (data.level === '2' && checked) {
          if (draft.crDtlMdlCd === undefined) draft.crDtlMdlCd = [];
          if (draft.crDtlMdlNm === undefined) draft.crDtlMdlNm = [];
          draft.crDtlMdlCd.push(data.value);
          draft.crDtlMdlNm.push(data.label);
        } else if (data.level === '2' && !checked) {
          if (draft.crDtlMdlCd === undefined) draft.crDtlMdlCd = [];
          draft.crDtlMdlCd.splice(draft.crDtlMdlCd.indexOf(data.value), 1);
          draft.crDtlMdlNm.splice(draft.crDtlMdlNm.indexOf(data.label), 1);
          draft.crClsCd = [];
          draft.crDtlClsCd = [];
          draft.crClsNm = [];
          draft.crDtlClsNm = [];
        } else if (data.level === '3' && checked) {
          if (draft.crClsCd === undefined) draft.crClsCd = [];
          if (draft.crDtlClsCd === undefined) draft.crDtlClsCd = [];
          if (draft.crClsNm === undefined) draft.crClsNm = [];
          draft.crDtlClsCd = [];
          draft.crClsCd.push(data.value);
          draft.crDtlClsNm = [];
          draft.crClsNm.push(data.label);
        } else if (data.level === '3' && !checked) {
          if (draft.crClsCd === undefined) draft.crClsCd = [];
          draft.crClsCd.splice(draft.crClsCd.indexOf(data.value), 1);
          draft.crDtlClsCd = [];
          draft.crClsNm.splice(draft.crClsNm.indexOf(data.label), 1);
          draft.crDtlClsNm = [];
        } else if (data.level === '4' && checked) {
          if (draft.crDtlClsCd === undefined) draft.crDtlClsCd = [];
          if (draft.crDtlClsNm === undefined) draft.crDtlClsNm = [];
          draft.crDtlClsCd.push(data.value);
          draft.crDtlClsNm.push(data.label);
        } else if (data.level === '4' && !checked) {
          if (draft.crDtlClsCd === undefined) draft.crDtlClsCd = [];
          draft.crDtlClsCd.splice(draft.crDtlClsCd.indexOf(data.value), 1);
          draft.crDtlClsNm.splice(draft.crDtlClsNm.indexOf(data.label), 1);
        }
      })
    );
  };

  useEffect(() => {
    tempCrMdlCd = form.crDtlMdlCd;
    tempClsCd = form.crClsCd;
  }, [form.crDtlMdlCd, form.crClsCd]);

  useEffect(() => {}, [subFormData]);

  useEffect(() => {
    setForm({ ...form, ...activeSubFormData });
  }, [activeSubFormData]);

  const handlerSubSearch = (data) => {
    console.log('handlerSubSearch data : ', data)
    setActiveSubFormData(subFormData);
    setRodalShow(false);
    modalCloseHandler();
  };

  const handlerCancelSubSearch = (data) => {
    console.log('handlerCancelSubSearch data : ', data)
    if (!isEmpty(activeSubFormData)) {
      setSubFormData(activeSubFormData);
    } else setSubFormData({ fuel: [], mss: [], carOption: [], color: [] });
    setRodalShow(false);
    modalCloseHandler();
  };

  useEffect(() => {
    if (form === formInitData) return;    
    axiosPost('/api/buycar/selectCountData.do', form).then((payload) => {
      setFilterData(
        produce((draft) => {
          draft.model = payload.data.data.model;
          draft.svc = payload.data.data.svc;
        })
      );
    });
  }, [form.cho, form.carType, form.yearRange, form.priceRange, form.distanceRange, form.svc, form.loc, form.carOption, form.fuel, form.mss, form.color]);

  useEffect(() => {
    onChange(form);
    if (form.crMnfcCd && form.crMdlCd) {
      const test = cloneDeep(cookies.item);
      const idx = cookies.item.findIndex((item) => item.crMnfcCd === form.crMnfcCd && item.crMdlCd === form.crMdlCd && item.crDtlMdlCd === form.crDtlMdlCd);
      if (idx >= 0) {
        test[idx] = cloneDeep(form);
        //test[idx].treeData = [filterData.model[0].
      } else {
        if (test.length >= 5) {
          test.splice(0, 1);
          test.push(form);
        } else {
          test.push(form);
        }
      }

      setCookie('item', test);
    }
  }, [form]);

  const onRemove = (idx) => {
    showConfirm('삭제하시겠습니까??', () => {
      const test = cloneDeep(cookies.item);
      test.splice(idx, 1);
      setCookie('item', test);
    });
  };

  return (
    <>
      {type !== 'home' && (
        <div className="search-sec-tit">
          <h3>{title}</h3>
          <Button color="black" title="선택초기화" iconType="reset" onClick={() => resetFilter(selected)} buttonMarkup={true} />
        </div>
      )}
      {type === 'home' && (
        <div className="search-sec-tit home">
        <h3>{title}</h3>
        <Button color="black" title="선택초기화" iconType="reset" onClick={() => resetFilter(selected)} buttonMarkup={true}/>
      </div>
      )}
      <ul className="menu-list search-filter">
        <MenuItem isValue={true}>
          <MenuTitle>
            <h4>국산/수입</h4>
          </MenuTitle>
          <MenuCont>
            <p className="domestic-income">
              {!isEmpty(filterData) &&
                filterData.cho.map((data, idx) => {
                  return (
                    <CheckBox
                      id={'chk-cho' + data.id}
                      title={data.dispnm}
                      name={data.id + ''}
                      checked={form.cho.includes(String(data.id))}
                      onChange={(e) => handleCho(e, 'cho')}
                      isSelf={false}
                      key={idx}
                    />
                  );
                })}
            </p>
          </MenuCont>
        </MenuItem>
        <MenuItem>
          <MenuTitle>
            <h4>차종</h4>
          </MenuTitle>
          <MenuCont>
            <div className="car-type">
              <ColoredScrollbars autoHeightMax={170}>
                {!isEmpty(filterData) &&
                  filterData.carType.map((data, idx) => {
                    return (
                      <CheckBox
                        id={'chk-carType' + idx}
                        title={data.dispnm}
                        name={data.id + ''}
                        checked={form.carType.includes(String(data.id))}
                        onChange={(e) => handleCho(e, 'carType')}
                        isSelf={false}
                        key={idx}
                      />
                    );
                  })}
              </ColoredScrollbars>
            </div>
          </MenuCont>
        </MenuItem>
        <MenuItem isValue={true}>
          <MenuTitle>
            <h4>제조사/모델/등급</h4>
          </MenuTitle>
          <MenuCont>
            <div className="tree-wrapper">{!isEmpty(filterData) && <TreeCheckCount dataProvider={filterData.model} onClick={handleTreeClick} />}</div>
          </MenuCont>
        </MenuItem>
        <MenuItem>
          <MenuTitle>
            <h4>연식</h4>
          </MenuTitle>
          <MenuCont>
            <div className={filterCheck1 === false ? 'year-filter-tp1' : 'year-filter-tp1 hidden'}>
              <FilterRange rangeUnit="연식" initMin={1990} initMax={2020} defaultValue={form.yearRange} onChange={(value) => setYearRange(value)} />
            </div>
            <div className={filterCheck1 === true ? 'year-filter-tp2' : 'year-filter-tp2 hidden'}>
              <div className="mb8">
                <SelectBox id="from-year" className="items-sbox mr8" options={selectYear} width={100} height={40} placeHolder="년" value={form.yearRange.min} name="min" onChange={handleYearSelect} />
                {/* <SelectBox
                  id="from-month"
                  className="items-sbox mr8"
                  options={selectMonth}
                  width={100}
                  height={40}
                  placeHolder="월"
                  value={form.yearRange.minMonth}
                  name="minMonth"
                  onChange={handleYearSelect}
                /> */}
                부터
              </div>
              <div>
                <SelectBox id="until-year" className="items-sbox mr8" options={selectYear} width={100} height={40} placeHolder="년" name="max" value={form.yearRange.max} onChange={handleYearSelect} />
                {/* <SelectBox
                  id="until-month"
                  className="items-sbox mr8"
                  options={selectMonth}
                  width={100}
                  height={40}
                  placeHolder="월"
                  value={form.yearRange.maxMonth}
                  name="maxMonth"
                  onChange={handleYearSelect}
                /> */}
                까지
              </div>
            </div>
            <p className="mt20">
              <CheckBox id="chk-year-self" title="직접 입력" checked={filterCheck1} onChange={handleChangeFilter1} isSelf={false} />
            </p>
          </MenuCont>
        </MenuItem>
        <MenuItem>
          <MenuTitle>
            <h4>주행거리</h4>
          </MenuTitle>
          <MenuCont>
            <div className={filterCheck2 === false ? 'distance-filter-tp1' : 'distance-filter-tp1 hidden'}>
              <FilterRange rangeUnit="주행거리" initMin={0} initMax={200000} defaultValue={form.distanceRange} step={10000} onChange={(value) => setDistanceRange(value)} />
            </div>
            <div className={filterCheck2 === true ? 'distance-filter-tp2' : 'distance-filter-tp2 hidden'}>
              <div className="mb8">
                <SelectBox
                  id="from-distance"
                  className="items-sbox mr8"
                  options={selectDsitance}
                  width={208}
                  height={40}
                  placeHolder="선택"
                  value={form.distanceRange.min}
                  onChange={(value) => setDistanceRangeSelect(value, 'min')}
                />
                부터
              </div>
              <div>
                <SelectBox
                  id="until-distance"
                  className="items-sbox mr8"
                  options={selectDsitance}
                  width={208}
                  height={40}
                  placeHolder="선택"
                  value={form.distanceRange.max}
                  onChange={(value) => setDistanceRangeSelect(value, 'max')}
                />
                까지
              </div>
            </div>
            <p>
              <CheckBox id="chk-distance-self" className="mt20" title="직접 입력" checked={filterCheck2} onChange={handleChangeFilter2} isSelf={false} />
            </p>
          </MenuCont>
        </MenuItem>
        <MenuItem>
          <MenuTitle>
            <h4>가격</h4>
          </MenuTitle>
          <MenuCont>
            <div className={filterCheck3 === false ? 'price-filter-tp1' : 'price-filter-tp1 hidden'}>
              <FilterRange rangeUnit="가격" initMin={0} initMax={10000} defaultValue={form.priceRange} step={100} onChange={(value) => setPriceRange(value)} />
            </div>
            <div className={filterCheck3 === true ? 'price-filter-tp2' : 'price-filter-tp2 hidden'}>
              <p>
                <Input type="text" placeHolder="만원" width={89} height={40} value={form.priceRange.min} onBlur={(value) => setPriceRangeInput(value, 'min')} />
                &nbsp;~&nbsp;
                <Input type="text" placeHolder="만원" width={89} height={40} value={form.priceRange.max} onBlur={(value) => setPriceRangeInput(value, 'max')} />
                <span className="ico-search" onClick={handleChangeFilter3} />
              </p>
            </div>
            <p>
              <CheckBox id="chk-price-self" className="mt20" title="직접 입력" checked={filterCheck3} onChange={handleChangeFilter3} isSelf={false} />
            </p>
          </MenuCont>
        </MenuItem>
        {type !== 'home' && (
          <MenuItem isValue={true}>
            <MenuTitle>
              <h4>오토벨서비스</h4>
            </MenuTitle>
            <MenuCont>
              <ul className="car-type-filter">
                {!isEmpty(filterData) &&
                  filterData.svc.map((data, idx) => {
                    return (
                      <li key={idx}>
                        <CheckBox
                          id={'chk-svc' + data.cdId}
                          title={data.cdNm}
                          name={data.cdId + ''}
                          checked={form.svc.includes(String(data.cdId))}
                          onChange={(e) => handleCho(e, 'svc')}
                          isSelf={false}
                          key={idx}
                          disabled={(type === 'live' && data.cdId === '0010') || (type === 'auction' && data.cdId === '0020')}
                        />
                        <Tooltip placement="bottom" width={data.cdNm === '홈서비스차량' ? 272 : 242}>
                          <TooltipItem>
                            <i className="ico-question" />
                          </TooltipItem>
                          <TooltipCont half={true}>
                            <p className="car-type-exp" dangerouslySetInnerHTML={{ __html: data.cdCmnt }} />
                          </TooltipCont>
                        </Tooltip>
                        <span className="count">{data.count}</span>
                      </li>
                    );
                  })}
              </ul>
            </MenuCont>
          </MenuItem>
        )}
        <MenuItem>
          <MenuTitle>
            <h4>지역</h4>
          </MenuTitle>
          <MenuCont>
            <div className="dom-wrap">
              <ColoredScrollbars autoHeightMax={170}>
                <ul className="domestic-income">
                  {!isEmpty(filterData) &&
                    filterData.loc.map((data, idx) => {
                      return (
                        <CheckBox
                          id={'chk-loc' + data.locCd}
                          title={data.shortNm}
                          name={data.locCd + ''}
                          checked={form.loc.includes(String(data.locCd))}
                          onChange={(e) => handleCho(e, 'loc')}
                          isSelf={false}
                          key={idx}
                        />
                      );
                    })}
                </ul>
              </ColoredScrollbars>
            </div>
          </MenuCont>
        </MenuItem>
      </ul>
      {type !== 'home' && (
        <div className="search-filter-btn">
          <Button size="full" line="black" color="black" title="상세 조건검색" className="mb8" onClick={(e) => rodalPopupHandler(e, 'fade')} />
          <Tooltip placement="right" width={486} event="click">
            {type !== 'live' && type !== 'auction' && (
              <>
                <TooltipItem>
                  <Button size="full" background="blue80" title="최근 검색조건" width={242} />
                </TooltipItem>
              </>
            )}
            <TooltipCont>
              <div className="search-filter-tooltip">
                <p>최근 검색조건은 모델 기준으로 최대 5개까지 자동 저장됩니다.</p>
                <DynamicCategory>
                  {cookies?.item?.map((cateItem, idx) => {
                    const cateContents = createCate(cateItem);
                    return <CategoryItem category={cateContents} onClickRemove={onRemove} CateIdx={idx} key={idx} onClick={() => setForm(cateItem)} />;
                  })}
                </DynamicCategory>
              </div>
            </TooltipCont>
          </Tooltip>
          <RodalPopup show={rodalShow} type={'slideUp'} width={894} mode="tabmenu" closedHandler={modalCloseHandler}>
            <TabMenu type="popup" onClick={modalCloseButtonHandler}>
              <TabCont tabTitle="옵션" id="tab4-1" index={0}>
                <h4>기본옵션</h4>
                {!isEmpty(filterData) && <CarOptions type={1} popup={true} mode={''} data={filterData.carOpt} onClick={handleOptClick} selectData={subFormData?.carOption} />}
                <Buttons align="center" marginTop={40}>
                  <Button size="big" marginRight={10} background="gray" title="취소" width={180} buttonMarkup={true} onClick={handlerCancelSubSearch} />
                  <Button size="big" background="blue80" title="검색" width={180} buttonMarkup={true} onClick={handlerSubSearch} />
                </Buttons>
              </TabCont>
              <TabCont tabTitle="색상" id="tab4-2" index={1}>
                {!isEmpty(filterData) && (
                  // <CheckColors data={filterData.clr} onClick={handleClrClick} selectData={subFormData?.color} onCancel={handlerCancelSubSearch} onSearch={handlerSubSearch} />
                  <CheckColors
                    colorList={filterData.clr}
                    displayMemberPath={'tby010ClrSnm'}
                    itemsSource={filterData.clr}
                    selectedColor={subFormData?.color}
                    selectedValuePath={'sno'}
                    onChange={handleClrClick}
                    onClick={handlerSubSearch}
                    onClose={handlerCancelSubSearch}
                  />
                )}
              </TabCont>
              <TabCont tabTitle="연료" id="tab4-3" index={2}>
                <h4>연료를 선택해주세요.</h4>
                <ul className="color-list border">
                  {!isEmpty(filterData) &&
                    filterData.fuel.map((data, idx) => {
                      return (
                        <li key={idx}>
                          <CheckBox
                            id={'chk-fuel-' + data.cdId}
                            title={data.cdNm}
                            name={data.cdId + ''}
                            checked={subFormData.fuel.includes(data.cdId)}
                            onChange={(e) => handleFuelClick(e, 'fuel')}
                            isSelf={false}
                          />
                        </li>
                      );
                    })}
                </ul>
                <Buttons align="center" marginTop={40}>
                  <Button size="big" marginRight={10} background="gray" title="취소" width={180} onClick={handlerCancelSubSearch} buttonMarkup={true} />
                  <Button size="big" background="blue80" title="검색" width={180} onClick={handlerSubSearch} buttonMarkup={true} />
                </Buttons>
              </TabCont>
              <TabCont tabTitle="변속기" id="tab4-4" index={3}>
                <h4>변속기를 선택해주세요.</h4>
                <ul className="color-list border">
                  {!isEmpty(filterData) &&
                    filterData.mss.map((data, idx) => {
                      return (
                        <li key={'chk-mss' + idx}>
                          <CheckBox
                            id={'chk-mss-' + data.cdId}
                            title={data.cdNm}
                            name={data.cdId + ''}
                            checked={subFormData.mss.includes(data.cdId)}
                            onChange={(e) => handleMssClick(e, 'mss')}
                            isSelf={false}
                            key={idx}
                          />
                        </li>
                      );
                    })}
                </ul>
                <Buttons align="center" marginTop={40}>
                  <Button size="big" marginRight={10} background="gray" title="취소" width={180} onClick={handlerCancelSubSearch} buttonMarkup={true} />
                  <Button size="big" background="blue80" title="검색" width={180} onClick={handlerSubSearch} buttonMarkup={true} />
                </Buttons>
              </TabCont>
            </TabMenu>
          </RodalPopup>
        </div>
      )}
    </>
  );
};

export default CarFilter;
