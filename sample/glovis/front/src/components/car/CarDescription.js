/**
 * @desc 차량 기본정보 테이블 (라디오, 셀렉트, 초기화 등 설명글 양식 입력용 공통 컴포넌트)
 * @module CarDescription
 * @requires [src/actions/carDescriptionAction,src/reducers/carDescriptionReducer]
 * @author 한관영
 */

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSampleComment, getSelectOptions, inputRadio, inputSelect, inputSet, inputReset } from '@src/actions/carDescriptionAction';

import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import { initialState } from '@src/reducers/carDescriptionReducer';

export default function CarDescription() {
  const inputState = useSelector((state) => state.carDescription, []);
  const dispatch = useDispatch();
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  useEffect(() => {
    dispatch(getSampleComment('userId'));
    dispatch(getSelectOptions('userId'));
  }, [dispatch]);

  useEffect(() => {
    switch (inputState.radio) {
      case 1: //직접입력
        dispatch(inputSet({ ...initialState }));
        break;
      case 2: //샘플보기
        dispatch(inputSet({ ...inputState, ...inputState.sampleComments }));
        break;
      case 3: //나의 설명글 사용
        // inputSelect 에서 처리
        break;
      default:
        break;
    }
  }, [dispatch, inputState.radio]);

  const onHandleRadioChange = (e) => {
    dispatch(inputRadio(e));
  };

  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(inputReset());
      modalCloseHandler();
    },
    [dispatch]
  );

  const handleSelect = useCallback(
    (value, actionMeta) => {
      dispatch(inputSelect({ name: actionMeta.name, value: value.value }));
    },
    [dispatch]
  );

  const onCancelHandler = useCallback((e) => {
    e.preventDefault();
    modalCloseHandler();
  }, []);

  return (
    <div className="ex-option-wrap">
      <RadioGroup
        onToggle={onHandleRadioChange}
        checkedValue={inputState.radio}
        dataList={[
          { id: 'car_ex1', name: 'radio', value: 1, checked: true, disabled: false, title: '직접입력' },
          { id: 'car_ex3', name: 'radio', value: 3, checked: false, disabled: false, title: '나의 설명글 사용' }
        ]}
      />
      <SelectBox
        id="mortgage3"
        name="select"
        className="items-sbox"
        placeHolder="선택하세요"
        disabled={inputState.radio !== 3}
        onChange={handleSelect}
        value={inputState.select}
        options={inputState.selectOptions}
        width={318}
        height={40}
      />
      <Button color="blue80" title="내용 초기화" onClick={rodalPopupHandler} width={90} height={40} marginLeft={10} />
      <Button color="blue80" title="미리보기" width={60} height={40} />
      {/* <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} title="나의 설명글 관리" mode="normal" size="small"> */}
      <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} mode="normal" size="small">
        <div className="con-wrap compact">
          <h4>
            작성 중인 내용이 초기화됩니다.
            <br />
            <br /> 초기화 하시겠습니까?
          </h4>
          <Buttons marginTop={30}>
            <Button size="big" background="blue80" title="예" onClick={handleReset} width={140} marginLeft={10} />
            <Button size="big" background="light-gray" color="white" title="아니오" onClick={onCancelHandler} width={140} marginLeft={10} />
          </Buttons>
        </div>
      </RodalPopup>
    </div>
  );
}
