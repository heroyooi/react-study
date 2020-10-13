import { useContext } from 'react';
//import { DealerContext } from '@pages/mypage/dealerSell01';
import { DealerContext } from '@pages/mypage/dealer/sellcar/carManagement';

const MypageFilterTab = () => {
  const { manageSection, setManageSection, setCarManageSelValue, setParentFilterMode } = useContext(DealerContext);

  const handleManage = (num) => () => {
    setCarManageSelValue(num-1);
    setParentFilterMode(1);
    setManageSection(num);
  }

  return (
    <ul className="register-admin-tab">
      <li className={manageSection === 1 ? "state-green on" : "state-green"}><span onClick={handleManage(1)}>15</span>정상 판매중</li>
      <li className={manageSection === 2 ? "state-red on" : "state-red"}><span onClick={handleManage(2)}>2</span>관리필요</li>
      <li className={manageSection === 3 ? "state-yellow on" : "state-yellow"}><span onClick={handleManage(3)}>1</span>판단보류</li>
      <li className={manageSection === 4 ? "state-blue on" : "state-blue"}><span onClick={handleManage(4)}>7</span>대기차량</li>
    </ul>
  )
}

export default MypageFilterTab;