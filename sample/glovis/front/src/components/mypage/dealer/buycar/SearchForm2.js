import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobSelectList from '@lib/share/items/MobSelectList';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobFilterModel from '@src/components/common/MobFilterModel';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { selectModelList, selectDetailModelList, selectManufacturerList } from '@src/api/common/CarInfoApi';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const gearData = [
  { id: 'chk-gear-01', title: '오토', checked: true },
  { id: 'chk-gear-02', title: '수동', checked: true },
  { id: 'chk-gear-03', title: '세미', checked: true },
  { id: 'chk-gear-04', title: 'CVT', checked: true }
];

const localData = [
  { id: 'chk-loc-11', title: '서울', checked: true },
  { id: 'chk-loc-41', title: '경기', checked: true },
  { id: 'chk-loc-28', title: '인천', checked: true },

  { id: 'chk-loc-30', title: '대전', checked: true },
  { id: 'chk-loc-36', title: '세종', checked: true },
  { id: 'chk-loc-44', title: '충남', checked: true },
  { id: 'chk-loc-43', title: '충북', checked: true },
  { id: 'chk-loc-42', title: '강원', checked: true },

  { id: 'chk-loc-26', title: '부산', checked: true },
  { id: 'chk-loc-27', title: '대구', checked: true },
  { id: 'chk-loc-31', title: '울산', checked: true },
  { id: 'chk-loc-48', title: '경남', checked: true },
  { id: 'chk-loc-47', title: '경북', checked: true },

  { id: 'chk-loc-29', title: '광주', checked: true },
  { id: 'chk-loc-46', title: '전남', checked: true },
  { id: 'chk-loc-45', title: '전북', checked: true },
  { id: 'chk-loc-50', title: '제주', checked: true }
];

const SearchForm2 = memo(({ children, withOutList, searchHandler }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [domestic, setDomestic] = useState(true);
  const [oversea, setOversea] = useState(true);
  const [mnfcList, setMnfcList] = useState([]);
  const [crMdlCdList, setCrMdlCdList] = useState([]);
  const [crDtlMdlCdList, setCrDtlMdlCdList] = useState([]);
  const [disabledSel2, setDisabledSel2] = useState(true);
  const [disabledSel3, setDisabledSel3] = useState(true);
  const [chkGear, setChkGear] = useState(gearData);
  const [chkGearAll, setChkGearAll] = useState(gearData.every((v) => v.checked === true));
  const [chkLocal, setChkLocal] = useState(localData);
  const [chkLocalAll, setChkLocalAll] = useState(localData.every((v) => v.checked === true));
  const [viewOpt, setViewOpt] = useState(false);

  const [pageNo] = useState(1);
  const [pageQtt] = useState(10);
  const [formData, setFormData] = useState({});

  const { recordCount } = useSelector((store) => store.compareEstm);

  const [isModelSearchPopUp, setIsModelSearchPopUp] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState(1);
  const sortOptions = [
    { id: 'regDt', value: 1, checked: true, disabled: false, title: '최근 등록 순' },
    { id: 'endDt', value: 2, checked: false, disabled: false, title: '마감 임박 순' }
  ];

  const getNationId = () => {
    if (domestic === true && oversea === true) {
      return 0;
    }

    if (domestic === true) return 1;
    if (oversea === true) return 2;

    return 0;
  };

  const handleModelSearchPopUp = useCallback(
    (e) => {
      e.preventDefault();
      const next = !isModelSearchPopUp;

      if (next) {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '옵션',
            options: ['back']
          }
        });
      } else {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
      }

      setIsModelSearchPopUp(next);
    },
    [dispatch, isModelSearchPopUp]
  );

  const handleSelMnfc = useCallback(
    (e) => {
      // console.log("formData ::: handleSelMnfc ", formData)

      const mnfcCd = e.value;
      selectModelList(mnfcCd).then((res) => {
        const list = res.data.data.map((d) => {
          return { value: d.id, label: d.name };
        });
        setCrMdlCdList(list);
      });
      setDisabledSel2(false);
      if (hasMobile) {
        setFormData({
          ...formData,
          crMnfcCd: deps.manufactureId,
          crMdlCd: null,
          crMnfcNm: deps.manufactureNm,
          crMdlNm: null,
          crDtlMdlCd: null
        });
      } else {
        setFormData({
          ...formData,
          crMnfcCd: mnfcCd,
          crMdlCd: null,
          crDtlMdlCd: null
        });
      }
    },
    [formData]
  );

  const handleSelModel = useCallback(
    (e, deps) => {
      // console.log("formData ::: handleSelModel", formData)

      const modelCd = e.value || deps.modelId || deps.id;

      if (hasMobile) {
        setFormData({
          ...formData,
          crMnfcCd: deps.manufactureId,
          crMdlCd: modelCd,
          crMnfcNm: deps.manufactureNm,
          crMdlNm: deps.modelNm || deps.name,
          crDtlMdlCd: null
        });
        handleModelSearchPopUp(e);
      } else {
        setFormData({
          ...formData,
          crMdlCd: modelCd,
          crDtlMdlCd: null
        });
      }

      selectDetailModelList(modelCd).then((res) => {
        if (Array.isArray(res.data.data)) {
          const list = res.data.data.map((d) => {
            return { value: d.id, label: d.name };
          });
          setCrDtlMdlCdList(list);
        }
      });
      setDisabledSel3(false);
    },
    [formData, handleModelSearchPopUp, hasMobile]
  );

  const handleSelNoy = useCallback(
    (e, deps) => {
      const crDtlMdlCd = e.value || deps.value;
      setFormData({ ...formData, crDtlMdlCd });
    },
    [formData]
  );

  const handleClick = useCallback((e) => {
    e.preventDefault();
    setViewOpt((prev) => !prev);
  }, []);

  const handleChkGear = (id) => () => {
    const copyGear = [...chkGear];
    copyGear.map((v) => {
      if (v.id === id) {
        v.checked = !v.checked;
      }
    });
    setChkGear(copyGear);
    setChkGearAll(copyGear.every((v) => v.checked === true));
  };

  /**
   * 관심차량만 체크박스 핸들러
   * @param {} e
   */
  const handleChkItrt = (e) => {
    let param;
    if (e.target.checked) {
      param = { ...formData, interest: 'YES' };
    } else {
      param = { ...formData, interest: 'NO' };
    }
    setFormData(param);
    searchHandler(param);
  };

  const handleChkGearAll = (e) => {
    const copyGear = [...chkGear];
    copyGear.map((v) => (v.checked = e.target.checked === true ? true : false));
    setChkGear(copyGear);
    setChkGearAll((prevCheck) => !prevCheck);
  };

  const handleChkLocal = (id) => () => {
    const copyLocal = [...chkLocal];
    copyLocal.map((v) => {
      if (v.id === id) {
        v.checked = !v.checked;
      }
    });
    setChkLocal(copyLocal);
    setChkLocalAll(copyLocal.every((v) => v.checked === true));
  };
  const handleChkLocalAll = (e) => {
    const copyLocal = [...chkLocal];
    copyLocal.map((v) => (v.checked = e.target.checked === true ? true : false));
    setChkLocal(copyLocal);
    setChkLocalAll((prevCheck) => !prevCheck);
  };

  const searchBtn = (e) => {
    e.preventDefault();
    const locParams = [];
    const mssParams = [];
    chkLocal.map((loc) => {
      if (loc.checked === true) {
        locParams.push(loc.id.split('chk-loc-')[1]);
      }
    });
    chkGear.map((mss) => {
      if (mss.checked === true) {
        mssParams.push(mss.id.split('chk-gear-')[1]);
      }
    });
    setViewOpt((prev) => !prev);
    const param = {
      ...formData,
      pageNo,
      pageQtt,
      locLists: locParams,
      mssLists: mssParams
    };
    if (searchHandler) {
      searchHandler(param);
    }
    // dispatch(selectSelfListAction(param));
  };

  /**
   * 정렬버튼 핸들러
   * @param {} e
   */
  const searchOrder = (e) => {
    const id = e.target.id;
    let param = {};
    if (id === 'regDt') {
      param = { ...formData, pageNo: 1, pageQtt, orderBy: 'regDt' };
    } else if (id === 'endDt') {
      param = { ...formData, pageNo: 1, pageQtt, orderBy: 'endDt' };
    }
    setFormData(param);
    searchHandler(param);
  };

  const handleSortOptionChanged = useCallback((e, deps) => {
    setSelectedSortOption(deps.value);
  }, []);

  useEffect(() => {
    let nationCd = 0;
    if (domestic && oversea) nationCd = 0;
    else if (domestic && !oversea) nationCd = 1;
    else if (!domestic && oversea) nationCd = 2;
    else nationCd = 3;
    // setFormData( { ...formData, crMnfcCd: undefined } );
    selectManufacturerList(nationCd).then((res) => {
      if (Array.isArray(res?.data?.data)) {
        const list = res?.data?.data.map((d) => {
          return { value: d.id, label: d.name };
        });
        setMnfcList(list);
      }
    });
    setFormData({ nationCd: nationCd, crMnfcCd: null, crMdlCd: null, crDtlMdlCd: null, pageNo, pageQtt });
  }, [domestic, oversea]);

  useEffect(() => {
    if (searchHandler) searchHandler(formData);
  }, [formData]);

  if (hasMobile) {
    return (
      <>
        <ul className="m-toggle-list search">
          <MenuItem>
            <MenuTitle>
              <p className="tit2">입찰 진행 중</p>
              <span>상세조회</span>
            </MenuTitle>
            <MenuCont>
              <table summary="입찰 진행 중 검색 필터" className="table-tp3">
                <caption className="away">입찰 진행 중</caption>
                <colgroup>
                  <col width="35%" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>국산/수입</th>
                    <td>
                      <ul className="radio-block small col3">
                        <li>
                          <Radio
                            className="txt"
                            id="domestic"
                            label="국산"
                            value={2}
                            checked={domestic === true ? 2 : null}
                            onClick={(e) => {
                              e.preventDefault();
                              setDomestic(!domestic);
                            }}
                          />
                        </li>
                        <li>
                          <Radio
                            className="txt"
                            id="import"
                            label="수입"
                            value={3}
                            checked={oversea === true ? 3 : null}
                            onClick={(e) => {
                              e.preventDefault();
                              setOversea(!oversea);
                            }}
                          />
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2">
                      <ul className="m-menu-list tp1">
                        <li>
                          <div className="sel-wrap" onClick={handleModelSearchPopUp}>
                            <span className="tit">제조사/모델{formData.crMnfcNm ? `(${formData.crMnfcNm}/${formData.crMdlNm})` : ''} </span>
                          </div>
                        </li>
                      </ul>
                    </th>
                  </tr>
                  <tr>
                    <th>연식</th>
                    <td>
                      <MobSelectList
                        disabled={disabledSel3}
                        displayMemberPath={'label'}
                        itemsSource={crDtlMdlCdList}
                        selectedItem={(crDtlMdlCdList || []).find((x) => x.value === formData?.crDtlMdlCd)}
                        selectedValuePath={'value'}
                        onClick={handleSelNoy}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={10} onClick={searchBtn} />
            </MenuCont>
          </MenuItem>
          <li>
            <div className="float-wrap">
              <p>
                총 <span className="tx-blue80">{recordCount}</span>건
              </p>
            </div>
          </li>
        </ul>
        <div className="content-border pd20">
          <div className="float-wrap sel-s">
            <CheckBox id="chk1" title="관심차량만" onChange={handleChkItrt} />
            <MobSelectList
              itemsSource={sortOptions}
              selectedItem={(sortOptions || []).find((x) => x.value === selectedSortOption)}
              displayMemberPath={'title'}
              selectedValuePath={'value'}
              width={139}
              onClick={handleSortOptionChanged}
            />
          </div>
          {withOutList === true ? (
            <div className="list-none-wrap">
              <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
            </div>
          ) : (
            <>
              <ul className="admin-list-wrap">
                <li>
                  <div className="goods-list admin-list tp4">{children}</div>
                </li>
              </ul>
            </>
          )}
        </div>
        <MobFullpagePopup active={mFullpagePopup}>
          {isModelSearchPopUp && (
            <MobFilterModel
              hiddenTab={[2]}
              isMultiSelect={false}
              nationId={getNationId()}
              result={'yes'}
              kind={'model'}
              selectedDepth={2}
              research={'no'}
              onCarModelSelect={handleSelModel}
              dataContext={{ manufactureId: formData.crMnfcCd, manufactureNm: formData.crMnfcNm }}
            />
          )}
        </MobFullpagePopup>
      </>
    );
  }

  return (
    <>
      <table className="table-tp1 input search" summary="조회 영역">
        <caption className="away">조회 영역</caption>
        <tbody>
          <tr>
            <td>
              <CheckBox id="chk-internal" title="국산" checked={domestic} onChange={(e) => setDomestic(e.target.checked)} />
              <CheckBox id="chk-foreign" title="수입" checked={oversea} onChange={(e) => setOversea(e.target.checked)} />
              <SelectBox id="select1" className="items-sbox" options={mnfcList} value={formData.crMnfcCd} width={170} height={40} placeHolder="제조사" onChange={handleSelMnfc} />
              <em />
              <SelectBox
                id="select2"
                className="items-sbox"
                options={crMdlCdList}
                value={formData.crMdlCd}
                width={170}
                height={40}
                placeHolder="모델"
                disabled={disabledSel2}
                onChange={handleSelModel}
              />
              <em />
              <SelectBox
                id="select3"
                className="items-sbox"
                options={crDtlMdlCdList}
                value={formData.crDtlMdlCd}
                width={170}
                height={40}
                placeHolder="연식"
                disabled={disabledSel3}
                onChange={handleSelNoy}
              />
              <Button size="mid" line="gray" title={viewOpt ? '- 상세옵션 설정' : '+ 상세옵션 설정'} width={159} height={40} className="fr" onClick={handleClick} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="detail-option-set" style={viewOpt ? { display: 'block' } : { display: 'none' }}>
        <ul>
          <li className="opt-gearbox">
            <p>변속기</p>
            <CheckBox id="chk-all-1" title="전체" isSelf={false} checked={chkGearAll} onChange={handleChkGearAll} />
            <table summary="상세 옵션 변속기 선택" className="table-tp1 area">
              <caption className="away">변속기</caption>
              <tbody>
                <tr>
                  <td>
                    {chkGear.map((v) => {
                      return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkGear(v.id)} />;
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
          <li className="opt-area">
            <p>지역</p>
            <CheckBox id="chk-all-2" title="전체" isSelf={false} checked={chkLocalAll} onChange={handleChkLocalAll} />
            <table summary="상세 옵션 지역 선택" className="table-tp1 area">
              <caption className="away">지역</caption>
              <colgroup>
                <col width="12.5%" />
                <col width="12.5%" />
                <col width="12.5%" />
                <col width="12.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>서울/경인</th>
                  <th>충청/강원</th>
                  <th>영남</th>
                  <th>호남/제주</th>
                </tr>
                <tr>
                  <td>
                    {chkLocal.map((v, i) => {
                      if (i < 3) {
                        return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />;
                      }
                    })}
                  </td>
                  <td>
                    {chkLocal.map((v, i) => {
                      if (i >= 3 && i < 8) {
                        return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />;
                      }
                    })}
                  </td>
                  <td>
                    {chkLocal.map((v, i) => {
                      if (i >= 8 && i < 13) {
                        return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />;
                      }
                    })}
                  </td>
                  <td>
                    {chkLocal.map((v, i) => {
                      if (i >= 13) {
                        return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />;
                      }
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="gray" title="취소" width={172} onClick={handleClick} />
          <Button size="big" background="blue80" title="검색" width={172} onClick={searchBtn} />
        </Buttons>
      </div>
      <ul className="float-wrap">
        <li>
          <p>총 {recordCount}대</p>
        </li>
        <li>
          <RadioGroup dataList={sortOptions} onChange={searchOrder} />
          <CheckBox id="chk-interest-car-1" title="관심차량만" onChange={handleChkItrt} />
        </li>
      </ul>
    </>
  );
});

SearchForm2.propTypes = {
  children: PropTypes.any,
  withOutList: PropTypes.bool,
  searchHandler: PropTypes.func
};
SearchForm2.displayName = 'SearchForm2';
export default SearchForm2;
