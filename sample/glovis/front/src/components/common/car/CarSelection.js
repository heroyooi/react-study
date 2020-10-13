/**
 * 설명 : 차량선택 (단일) 팝업 Car객체
 * @fileoverview 차량 선택 팝업
 * @author 최승희
 * @param {Object} props - props object
 * @param {Object} props.item - 입력받을 Car 객체
 * @param {String} props.item.crMnfcCd - 입력받을 Car 객체의 제조사 코드
 * @param {String} props.item.crMdlCd - 입력받을 Car 객체 모델 코드
 * @param {String} props.item.crDtlMdlCd - 입력받을 Car 객체 상세 모델 코드
 * @param {String} props.item.crClsCd - 입력받을 Car 객체 등급 코드
 * @param {String} props.item.crDtlClsCd - 입력받을 Car 객체 상세 등급 코드
 */

import React, { useState, useEffect, memo, useContext } from 'react';
import { produce } from 'immer';
import PropTypes from 'prop-types';
import { axiosGet } from '@src/utils/HttpUtils';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import CarRadioGroups from '@src/components/common/car/carRadioGroups';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import { getLabelFromArray } from '@src/utils/StringUtil';
import { SystemContext } from '@src/provider/SystemProvider';

const asyncUrls = [
  //추후삭제. getDataAsync와 합쳐야함
  `/api/commonCarInfo/selectManufacturerList.do`, //`/mock/common/car/carManufacturers.json`,
  `/api/commonCarInfo/selectModelList.do`, //`/mock/common/car/carMainModels.json`,
  `/api/commonCarInfo/selectModelDetailList.do`, // `/mock/common/car/carModels.json`,
  `/api/commonCarInfo/selectClassList.do`, //`/mock/common/car/carGrades.json`,
  `/api/commonCarInfo/selectDetailClassList.do` //`/mock/common/car/carGrades.json`,
  // `/api/commonCarInfo/selectClassAndPriceList.do` //`/mock/common/car/carGrades.json`,
];

const getDataAsync = [
  (nationId) => axiosGet(`${asyncUrls[0]}?nationId=${nationId}`).then((res) => convert(res?.data?.data)),
  (manufactureId) => axiosGet(`${asyncUrls[1]}?manufactureId=${manufactureId}`).then((res) => convert(res?.data?.data)),
  (modelId) => axiosGet(`${asyncUrls[2]}?modelId=${modelId}`).then((res) => convert(res?.data?.data)),
  (detailModelId) => axiosGet(`${asyncUrls[3]}?detailModelId=${detailModelId}`).then((res) => convert(res?.data?.data)),
  (classId) => axiosGet(`${asyncUrls[4]}?classId=${classId}`).then((res) => convert(res?.data?.data))
  // (classId) => axiosGet(`${asyncUrls[5]}?classId=${classId}`).then((res) => converStr(res?.data?.data))
];

const convert = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      value: item.id.toString(), //현재 int값으로 넘어오고 있음
      label: item.name,
      ...item
    }));
  }
  return data;
};

const CarSelection = memo(({ item = {}, saveCallback, cancleEmitter, useLoader = true, disabledTabIndex = [] }) => {
  const { crMnfcCd, crMdlCd, crDtlMdlCd, crClsCd, crDtlClsCd, crMnfcCdNm, crMdlCdNm, crDtlMdlCdNm, crClsCdNm, crDtlClsCdNm } = item;
  const { showAlert, showLoader, hideLoader, initAlert, initConfirm } = useContext(SystemContext);

  console.log('CarSelection', item);
  const [active, setActive] = useState(!!crDtlClsCd);
  const [tabIndex, setTabIndex] = useState(0);
  const [disableIdx, setDisableIdx] = useState(disabledTabIndex);
  const [tabData, setTabData] = useState([
    { title: '제조사', column: 'crMnfcCd', code: crMnfcCd, text: crMnfcCdNm },
    { title: '모델', column: 'crMdlCd', code: crMdlCd, text: crMdlCdNm },
    { title: '상세모델', column: 'crDtlMdlCd', code: crDtlMdlCd, text: crDtlMdlCdNm },
    { title: '제원등급', column: 'crClsCd', code: crClsCd, text: crClsCdNm },
    { title: '세부등급', column: 'crDtlClsCd', code: crDtlClsCd, text: crDtlClsCdNm }
  ]);

  const [options, setOptions] = useState([]);
  const [modelPrice, setModelPrice] = useState(0);

  useEffect(() => {
    if (useLoader) {
      showLoader();
    }
    const { crMnfcCd, crMdlCd, crDtlMdlCd, crClsCd, crDtlClsCd } = item; //테이블 컬럼을 몰라서 대충 이름 변경해서 씀... 추후 변경 필요
    const carSelectionValues = [crMnfcCd, crMdlCd, crDtlMdlCd, crClsCd, crDtlClsCd];
    const carSelectionNames = [undefined, undefined, undefined, undefined, undefined];
    const carOptionPrms = [getDataAsync[0](0)];

    for (let i = 0, len = carSelectionValues.length - 1; i < len; i++) {
      const value = carSelectionValues[i];
      if (value === null || value === undefined) {
        break;
      }
      carOptionPrms.push(getDataAsync[i + 1](value));
    }

    Promise.all(carOptionPrms)
      .then((results) => {
        setOptions(results);
        setTabData(
          produce(tabData, (draft) => {
            results.forEach((result, i) => {
              console.log("CarSelection -> carSelectionNames[i]", carSelectionNames[i])
              console.log("CarSelection -> result", result)

              const target = result?.find((item) => item?.value === carSelectionValues[i])
              const name = carSelectionNames[i] ?? target?.orgName ?? target?.label;
              
              draft[i].text = name;
            });
          })
        );
      })
      .finally(() => {
        if (useLoader) {
          hideLoader();
        }
      });

    const filterd = carSelectionValues.filter((value) => !!value);
    setTabIndex(filterd.length ? filterd.length - 1 : 0);
    setNextDisabledIdx(filterd.length ? filterd.length - 1 : 0);

    return () => {
      initAlert();
      initConfirm();
    };
  }, []);

  //check 이벤트
  const onCheck = async (e, item) => {
    const { name, value } = e.target;
    const { price } = item;

    const tabIndex = tabData.findIndex((tab) => tab.column === name);
    const nextIndex = tabIndex + 1;

    if (nextIndex < tabData.length) {
      const nextOptions = await getDataAsync[nextIndex](value);
      console.log('nextOptions : ', nextOptions);
      setActive(!nextOptions.length);
      setNextOptions(nextIndex, nextOptions);
      setTabIndex(nextIndex);
      setNextDisabledIdx(nextIndex);
    } else if (nextIndex >= tabData.length) {
      setActive(true);
    }
    setModelPrice(price ?? 0);
    setNextTabData(tabIndex, value);
  };

  const setNextTabData = (tabIndex, value) => {
    setTabData(
      produce(tabData, (draft) => {
        draft.forEach((tab, i) => {
          const label = getLabelFromArray(options[tabIndex], value, 'label');
          const orgName = getLabelFromArray(options[tabIndex], value, 'orgName');
          if (tabIndex === i) {
            draft[i].code = value;
            draft[i].text = orgName || label;
          } else if (tabIndex < i) {
            draft[i].code = null;
            draft[i].text = '';
          }
        });
      })
    );
  };

  //기준 tab index 기준으로 이후 탭들의 클릭을 막음
  const setNextDisabledIdx = (tabIndex) => {
    const newDisabledIdx = disabledTabIndex;
    for (let len = tabData.length, i = tabIndex + 1; i < len; i++) {
      newDisabledIdx.push(i);
    }
    setDisableIdx(newDisabledIdx);
  };

  const setNextOptions = (tabIndex, nextOptions) => {
    setOptions(
      produce(options, (draft) => {
        tabData.forEach((tab, i) => {
          if (tabIndex === i) {
            draft[i] = nextOptions;
          } else if (tabIndex < i) {
            draft[i] = [];
          }
        });
      })
    );
  };

  const tabCallBack = (e, idx) => {
    setTabIndex(idx);
  };

  const onClose = (e) => {
    e.preventDefault();
    cancleEmitter && cancleEmitter(e);
  };

  const save = (e) => {
    e.preventDefault();
    if (!active) {
      showAlert('차량을 선택하세요');
    } else {
      saveCallback && saveCallback(tabData, modelPrice);
    }
  };

  return (
    <div className="car-name-mod">
      <TabMenu type="type7" defaultTab={tabIndex} mount={false} liClicked={true} disabled={disableIdx} callBack={tabCallBack}>
        {item &&
          tabData.map((tab, i) => (
            <TabCont key={i} tabTitle={`${tab.title} ${tab.text ? `(${tab.text})` : ``}`} id={`name-tab${i + 1}`} index={i}>
              <div className={`car-name-tab t${i + 1}`}>
                <ColoredScrollbars autoHeightMax={300}>
                  {options[i]?.length ? <CarRadioGroups options={options[i]} selectedValue={tabData[i].code} onChange={onCheck} name={tabData[i].column} /> : `${tab?.title} 목록이 없습니다`}
                </ColoredScrollbars>
              </div>
            </TabCont>
          ))}
      </TabMenu>
      <Buttons align="center" marginTop={40}>
        <Button size="big" onClick={onClose} marginRight={10} background="gray" title="취소" width={180} />
        <Button size="big" onClick={save} background={active ? 'blue80' : 'gray'} title="저장" width={180} buttonMarkup={true} disabled={!active} />
      </Buttons>
    </div>
  );
});

CarSelection.displayName = 'CarSelection';
CarSelection.propTypes = {
  disabledTabIndex: PropTypes.array,
  item: PropTypes.object,
  useLoader: PropTypes.bool,
  saveCallback: PropTypes.func,
  cancleEmitter: PropTypes.func
};
export default CarSelection;
