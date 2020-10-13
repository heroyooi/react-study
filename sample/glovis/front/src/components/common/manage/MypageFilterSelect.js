import { useState, useCallback, useContext } from 'react';
import SelectBox from '@lib/share/items/SelectBox';
import { dummyNumber, carManageFilter } from '@src/dummy';
import { DealerContext } from '@pages/mypage/dealer/sellcar/carManagement';

const MypageFilterSelect = () => {
  const {
    setChildFilterMode, setParentFilterMode, manageSection, setManageSection,
    carManageSelValue, setCarManageSelValue
  } = useContext(DealerContext);
  const [selDisabled, setSelDisabled] = useState(true);
  const handleSelectCarManage = (e) => {
    if (e.label === "정상판매중") {
      setCarManageSelValue(0);
      setParentFilterMode(1);
      setManageSection(1);
    } else if (e.label === "관리필요") {
      setCarManageSelValue(1);
      setParentFilterMode(1);
      setManageSection(2);
    } else if (e.label === "판단보류") {
      setCarManageSelValue(2);
      setParentFilterMode(1);
      setManageSection(3);
    } else if (e.label === "대기차량") {
      setCarManageSelValue(3);
      setParentFilterMode(1);
      setManageSection(4);
    } else if (e.label === "판매완료") {
      setCarManageSelValue(4);
      setParentFilterMode(2);
      setManageSection(0);
    } else if (e.label === "삭제차량") {
      setCarManageSelValue(5);
      setParentFilterMode(3);
      setManageSection(0);
    } else if (e.label === "보류차량") {
      setCarManageSelValue(6);
      setParentFilterMode(4);
      setManageSection(0);
    }
  };
  const handleSelectManufacturer = useCallback((e) => {
    if(Number(e.value) !== null){
      setSelDisabled(false);
      setChildFilterMode(2);
    }
  }, []);

  //console.log(1)

  return (
    <ul className="float-wrap">
      <li>
        <SelectBox id="select1" className="items-sbox" options={carManageFilter} width={176} height={40} isValue={carManageSelValue} onChange={handleSelectCarManage} />
      </li>
      <li>
        <SelectBox id="select2" className="items-sbox" options={dummyNumber} width={176} height={40} placeHolder="제조사" onChange={handleSelectManufacturer} />
      </li>
      <li>
        <SelectBox id="select3" className="items-sbox" options={dummyNumber} width={176} height={40} placeHolder="모델" disabled={selDisabled} />
      </li>
      <li>
        <SelectBox id="select4" className="items-sbox" options={[
          { value: '1', label: '등록순' },
          { value: '2', label: '업데이트순' }
        ]} width={176} height={40} placeHolder="등록순" />
      </li>
    </ul>
  )
}

export default MypageFilterSelect;