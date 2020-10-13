import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import TreeView from '@lib/share/items/TreeView';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import DynamigTag from '@lib/share/items/DynamicTag';
import { axiosGet } from '@src/utils/HttpUtils';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { compareBy, sortBy } from '@src/utils/ArrayUtil';

const MobFilterModel = ({ dataContext, defaultNum = 0, hiddenTab = [], isMultiSelect, nationId, kind, result = 'yes', research = 'no', selectedDepth, onCarModelSelect, selectAll }) => {
  const { isSection } = useSelector((state) => state.common);

  const [domesticList, setDomesticList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [selectedModelCar, setSelectedModelCar] = useState([]);

  useEffect(() => {
    if (!objIsEmpty(domesticList)) {
      return;
    }

    axiosGet(`/api/commonCarInfo/selectManufacturerList.do?nationId=${nationId || 0}`, true, null).then((res) => {
      if (res && res.data && res.data.data) {
        const list = res.data.data;
        setDomesticList(list);
        if (!objIsEmpty(dataContext) && !objIsEmpty(dataContext.crMnfcNm) && !objIsEmpty(dataContext.crMnfcCd)) {
          const selectList = list.filter((e) => e.id === Number(dataContext.crMnfcCd));
          console.log('filtering list', selectList);
          setDomesticList(selectList);
        }
      }
    });
    if (kind === 'model' && !objIsEmpty(dataContext) && dataContext.manufactureId && dataContext.manufactureNm) {
      handleSelectManufacturer({}, { id: dataContext.manufactureId, name: dataContext.manufactureNm });
    }

    if (kind === 'class' && !objIsEmpty(dataContext) && dataContext.manufactureId) {
      handleSelectManufacturer({}, { id: dataContext.manufactureId, name: dataContext.manufactureNm });

      if (dataContext.modelId && dataContext.modelNm) {
        handleSelectModelList({}, { manufactureId: dataContext.manufactureId, manufactureNm: dataContext.manufactureNm, id: dataContext.modelId, name: dataContext.modelNm });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calcTab = () => {
    let num = null;
    if (kind === 'manufacturer') {
      num = 0;
    } else if (kind === 'model') {
      num = 1;
    } else if (kind === 'class' || research === 'yes') {
      num = 2;
    } else {
      num = defaultNum;
    }
    return num;
  };

  let defaultTreeMode = null;

  if (isSection === 'sell' || isSection === 'marketPrice' || isSection === 'pricingSystem') {
    defaultTreeMode = 'radio'; // 내차팔기, 시세조회, 프리이싱시스템
  } else {
    defaultTreeMode = 'checkbox'; // 내차사기(buy), 홈서비스(homeService)
  }
  const [tabNum, setTabNum] = useState(calcTab());
  const [isDisabled, setIsDisabled] = useState(result === 'no' ? [1, 2] : []);
  const [treeMode, setTreeMode] = useState(defaultTreeMode);

  useEffect(() => {
    if (isSection === 'sell' || isSection === 'marketPrice' || isSection === 'pricingSystem') {
      setTreeMode('radio'); // 내차팔기, 시세조회, 프리이싱시스템
    } else {
      setTreeMode('checkbox'); // 내차사기(buy), 홈서비스(homeService)
    }
  }, [isSection]);

  // 선택한 제조사 저장객체
  const [selectedManufacturer, setSelectedManufacturer] = useState({
    manufactureId: '',
    manufactureNm: ''
  });

  const handleSelectManufacturer = useCallback(
    (e, deps) => {
      setIsDisabled([2]);
      setTabNum(1);
      setSelectedManufacturer({ manufactureId: deps.id, manufactureNm: deps.name });
      axiosGet(`/api/commonCarInfo/selectModelList.do?manufactureId=${deps.id}`, true, null).then((res) => {
        const list = res.data.data;
        list.forEach((specItem) => {
          specItem.manufactureId = deps.id;
          specItem.manufactureNm = deps.name;
        });

        const nameList = sortBy(
          list,
          compareBy({
            name: 'title',
            reverse: false
          })
        );

        setNameList(nameList);
      });
    },
    [setNameList]
  );

  // 선택한 차량 모델 저장객체
  const [searchModel, setSearchModel] = useState({
    manufactureId: '',
    manufactureNm: '',
    modelId: '',
    modelNm: ''
  });

  const handleSelectModelList = useCallback(
    (e, deps) => {
      setIsDisabled([]);
      if (selectedDepth === 2) {
        setSelectedModelCar(Object.assign({ ...deps }, {}));
        return;
      }
      setTabNum(2);
      // 모델까지만 검색할때 가져갈 데이터 객체에 데이터 삽입.
      setSearchModel({ modelId: deps.id, modelNm: deps.orgName || deps.name, manufactureId: deps.manufactureId, manufactureNm: deps.manufactureNm });

      axiosGet(`/api/commonCarInfo/selectModelDetailList.do?modelId=${deps.id}`, true, null).then((res) => {
        if (res && res.data && res.data.data) {
          const list = res.data.data;
          list.forEach((item) => {
            item.manufactureId = deps.manufactureId;
            item.manufactureNm = deps.manufactureNm;
            item.modelId = deps.id;
            item.modelNm = deps.orgName || deps.name;
          });

          setSeriesList(list);
        }
      });
    },
    [selectedDepth]
  );

  const handleTreeSelect = useCallback(
    (e, deps) => {
      if (selectedDepth === 3) {
        setSelectedModelCar(Object.assign({ ...deps }, {}));
        return;
      }

      if (deps.detailModelId === null || deps.detailModelId === undefined) {
        if (deps.children === null || deps.children === undefined || deps.children.length === 0) {
          axiosGet(`/api/commonCarInfo/selectClassList.do?detailModelId=${deps.id}`, true, null).then((res) => {
            const newSeriesList = [...seriesList].map((item) => {
              if (item.id === deps.id) {
                let children = [];
                if (res && res.data && res.data.data) {
                  children = res.data.data;
                  children.forEach((item) => {
                    item.manufactureId = deps.manufactureId;
                    item.manufactureNm = deps.manufactureNm;
                    item.modelId = deps.modelId;
                    item.modelNm = deps.modelNm;
                    item.detailModelId = deps.id;
                    item.detailModelNm = deps.orgName || deps.name;

                    if (objIsEmpty(item.id)) {
                      item.id = item.value;
                    }
                    item.children = [];
                    if (objIsEmpty(item.name)) {
                      item.name = item.label;
                    }
                  });
                } else if (res && res.data && res.data.statusinfo && res.data.statusinfo.returncd === '001' && res.data.statusinfo.returnmsg) {
                  // eslint-disable-next-line no-alert
                  alert(res.data.statusinfo.returnmsg);
                }

                return Object.assign({ ...item }, { children: children });
              }
              return Object.assign({ ...item }, { children: [] });
            });
            setSeriesList(newSeriesList);
          });
        }
      } else if (deps.detailModelId && deps.isLeaf !== true && (deps.classId === null || deps.classId === undefined)) {
        axiosGet(`/api/commonCarInfo/selectDetailClassList.do?classId=${deps.id}`, true, null).then((res) => {
          const newSeriesList = [...seriesList].map((item) => {
            if (item.id === deps.detailModelId) {
              const newChildren = item.children.map((classItem) => {
                if (classItem.id === deps.id) {
                  let speclist = [];

                  if (res && res.data) {
                    speclist = res.data.data;
                    speclist.forEach((specItem) => {
                      specItem.manufactureNm = deps.manufactureNm;
                      specItem.manufactureId = deps.manufactureId;
                      specItem.modelNm = deps.modelNm;
                      specItem.modelId = deps.modelId;
                      specItem.detailModelNm = deps.detailModelNm;
                      specItem.detailModelId = deps.detailModelId;
                      specItem.classNm = deps.name;
                      specItem.classId = deps.id;
                      specItem.isLeaf = true;
                      specItem.title = specItem.label;
                      specItem.checked = false;
                      specItem.children = [];
                      if (objIsEmpty(specItem.id)) {
                        specItem.id = specItem.seq;
                      }
                      if (objIsEmpty(specItem.name)) {
                        specItem.name = specItem.label;
                      }
                      specItem.specId = specItem.id;
                      specItem.specNm = specItem.name;
                    });
                  } else if (res && res.data && res.data.statusinfo && res.data.statusinfo.returncd === '001' && res.data.statusinfo.returnmsg) {
                    // eslint-disable-next-line no-alert
                    alert(res.data.statusinfo.returnmsg);
                  }

                  const target = {
                    children: speclist,
                    isLeaf: speclist.length === 0,
                    checked: true
                  };

                  const _selectedModel = Object.assign({ ...classItem }, target);
                  if (objIsEmpty(_selectedModel.children)) {
                    setSelectedModelCar(_selectedModel);
                  }

                  return _selectedModel;
                }

                return Object.assign({ ...classItem }, { checked: isMultiSelect === true ? classItem.checked : false });
              });
              return Object.assign(item, { children: newChildren });
            }
            return Object.assign(item, {});
          });
          setSeriesList(newSeriesList);
        });
      } else if (deps.isLeaf === true) {
        const newSeriesList = [...seriesList].map((model) => {
          const models = { ...model }.children.map((detailModel) => {
            const classs = { ...detailModel }.children.map((modelClass) => {
              let _isChecked = isMultiSelect === true ? modelClass.checked : false;

              console.log(_isChecked);

              if (
                modelClass.manufactureId === deps.manufactureId &&
                modelClass.modelId === deps.modelId &&
                modelClass.detailModelId === deps.detailModelId &&
                modelClass.classId === deps.classId &&
                modelClass.id === deps.id
              ) {
                if (deps.checked === false) {
                  _isChecked = true;
                } else {
                  _isChecked = false;
                }
              }

              return Object.assign({ ...modelClass }, { checked: _isChecked });
            });

            let detailModelChecked = isMultiSelect === true ? detailModel.checked : false;

            if (
              detailModel.isLeaf === true &&
              detailModel.manufactureId === deps.manufactureId &&
              detailModel.modelId === deps.modelId &&
              detailModel.detailModelId === deps.detailModelId &&
              detailModel.id === deps.id
            ) {
              if (detailModelChecked === false) {
                detailModelChecked = true;
              } else {
                detailModelChecked = false;
              }
            }
            return Object.assign({ ...detailModel }, { children: classs, checked: detailModelChecked });
          });
          return Object.assign({ ...model }, { children: models });
        });

        setSeriesList(newSeriesList);
        if (!deps.checked) {
          setSelectedModelCar(Object.assign({ ...deps }, {}));
        } else {
          setSelectedModelCar(null);
        }
      }
    },
    [isMultiSelect, selectedDepth, seriesList]
  );

  const handleCallback = useCallback((e, idx) => {
    setTabNum(idx);
  }, []);

  // 전체선택버튼
  // 상위 컴포넌트(최상위는 MobSearchPopUp을 불러올때 selectAll 객체를 true 설정해서 사용)
  const onClickAll = useCallback(
    (e, deps) => {
      e.preventDefault();
      // 모델 선택 화면에서 클릭시 => 선택된 제조사 값만 가져감
      if (deps === 1) {
        onCarModelSelect(e, selectedManufacturer);
      } else {
        // 등급선택 화면에서 클릭시 => 선택된 제조사, 모델값만 가져감
        onCarModelSelect(e, searchModel);
      }
    },
    [selectedManufacturer, searchModel, onCarModelSelect]
  );

  const handleCarModelSelected = useCallback(
    (e) => {
      e.preventDefault();
      if (isMultiSelect === true) {
        const selectedModels = [];
        seriesList.forEach((manufacture) => {
          manufacture.children.forEach((model) => {
            if (!objIsEmpty(model.children)) {
              model.children.forEach((detailModel) => {
                if (detailModel.checked === true) {
                  selectedModels.push({ ...detailModel });
                }
              });
            } else if (model.checked === true) {
              selectedModels.push({ ...model });
            }
          });
        });

        if (objIsEmpty(selectedModels)) {
          // eslint-disable-next-line no-alert
          alert('차량을 선택하세요');
          return;
        }
        if (onCarModelSelect) {
          onCarModelSelect(e, selectedModels);
        }
        return;
      }

      if (objIsEmpty(selectedModelCar)) {
        // eslint-disable-next-line no-alert
        alert('차량을 선택하세요');
        return;
      }
      if (onCarModelSelect) {
        onCarModelSelect(e, selectedModelCar);
      }
    },
    [isMultiSelect, onCarModelSelect, selectedModelCar, seriesList]
  );

  useEffect(() => {
    if (kind === 'manufacturer') {
      setTabNum(0);
    } else if (kind === 'model') {
      if (result === 'yes') {
        if (dataContext?.manufactureId) {
          setTabNum(1);
        } else {
          setTabNum(0);
        }
      } else {
        setTabNum(1);
      }
    } else if (kind === 'class') {
      if (result === 'yes') {
        setTabNum(1);
      } else {
        setTabNum(2);
      }
    }

    if (result === 'no') {
      setTabNum(0);
      setIsDisabled([1, 2]);
    } else {
      setIsDisabled([]);
    }
  }, [result, kind, dataContext]);

  return (
    <TabMenu type="type2" defaultTab={tabNum} mount={false} fixTab={true} disabled={isDisabled} callBack={handleCallback} hiddenTab={research === 'yes' ? [0, 1, 2] : hiddenTab}>
      <TabCont tabTitle="제조사" id="tab2-1" index={0}>
        <div className="filter-list-wrap">
          <div className="content-wrap float-wrap domestic">
            <ul>
              {!objIsEmpty(domesticList) &&
                domesticList.map &&
                domesticList.map((v, i) => {
                  return (
                    <DynamigTag key={i} id={`0-d-${v.id}`} tagName="li" className={v.className} dataContext={v} onClick={handleSelectManufacturer}>
                      <span className="logo" />
                      <span className="name">{v.name}</span>
                    </DynamigTag>
                  );
                })}
            </ul>
          </div>
        </div>
      </TabCont>
      <TabCont tabTitle="모델" id="tab2-2" index={1}>
        <div className="filter-list-wrap">
          {/* <p className="tit">이름순</p> */}
          <div className="content-wrap float-wrap">
            <ul>
              {nameList.map((v, i) => {
                return (
                  <DynamigTag key={i} id={`1-d-${v.id}`} tagName="li" className={v.className} dataContext={v} onClick={handleSelectModelList}>
                    {selectedDepth === 2 ? (
                      <span className={`radio-basic ${selectedModelCar.manufactureId === v.manufactureId && selectedModelCar.id === v.id ? 'on' : ''}`}>
                        <input type="radio" id={`1-d-${v.id}`} value={v.id} readOnly={true} checked={selectedModelCar.manufactureId === v.manufactureId && selectedModelCar.id === v.id} />
                        <label htmlFor={`1-d-${v.id}`}>{v.name}</label>
                      </span>
                    ) : (
                      <>
                        <span className="name">{v.name}</span>
                        <span className="num">{v.num}</span>
                      </>
                    )}
                  </DynamigTag>
                );
              })}
            </ul>
          </div>
        </div>
        {selectedDepth === 2 ? (
          <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleCarModelSelected} />
        ) : selectAll ? (
          <Button
            className="fixed"
            size="full"
            background="blue20"
            color="blue80"
            title="전체선택"
            onClick={(e) => {
              onClickAll(e, 1);
            }}
          />
        ) : null}
      </TabCont>
      {selectedDepth === 3 ? (
        <TabCont tabTitle="등급" id="tab2-3" index={2}>
          <div className="filter-list-wrap">
            <div className="content-wrap float-wrap">
              <ul>
                {seriesList.map((v, i) => {
                  return (
                    <DynamigTag key={i} id={`2-d-${v.id}`} tagName="li" className={v.className} dataContext={v} onClick={handleTreeSelect}>
                      <span className={`radio-basic ${selectedModelCar.manufactureId === v.manufactureId && selectedModelCar.modelId === v.modelId && selectedModelCar.id === v.id ? 'on' : ''}`}>
                        <input
                          type="radio"
                          id={`2-d-${v.id}`}
                          value={v.id}
                          readOnly={true}
                          checked={selectedModelCar.manufactureId === v.manufactureId && selectedModelCar.modelId === v.modelId && selectedModelCar.id === v.id}
                        />
                        <label htmlFor={`2-d-${v.id}`}>{v.name}</label>
                      </span>
                    </DynamigTag>
                  );
                })}
              </ul>
            </div>
          </div>
          <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleCarModelSelected} />
        </TabCont>
      ) : (
        <TabCont tabTitle="등급" id="tab2-3" index={2}>
          <TreeView
            checkedMemerPath={'checked'}
            childMemberPath={'children'}
            counterMemberPath={null}
            displayMemberPath={'name'}
            descriptionMemberPath={null}
            hasMobile={true}
            itemsSource={seriesList}
            mode={treeMode}
            onClick={handleTreeSelect}
          />
          {selectAll ? (
            <Buttons align="center" className="full fixed">
              <Button
                size="big"
                background="blue20"
                color="blue80"
                title="전체선택"
                onClick={(e) => {
                  onClickAll(e, 2);
                }}
              />
              <Button size="big" background="blue80" title="선택" onClick={handleCarModelSelected} />
            </Buttons>
          ) : (
            <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleCarModelSelected} />
          )}
        </TabCont>
      )}
    </TabMenu>
  );
};

MobFilterModel.propTypes = {
  dataContext: PropTypes.object,
  defaultNum: PropTypes.number,
  hiddenTab: PropTypes.array,
  isMultiSelect: PropTypes.bool,
  kind: PropTypes.string,
  nationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  result: PropTypes.string,
  research: PropTypes.string,
  selectedDepth: PropTypes.number,
  onCarModelSelect: PropTypes.func,
  selectAll: PropTypes.bool
};

MobFilterModel.defaultProps = {
  isMultiSelect: false,
  nationId: 0,
  selectedDepth: 5
};

export default MobFilterModel;
