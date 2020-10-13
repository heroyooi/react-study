import React, { useState } from 'react';
import CheckBox from '@lib/share/items/CheckBox';
import { produce } from 'immer';

const MissionSearch = () => {
  const missionList = [
    { title: '오토', name: 'auto' },
    { title: '수동', name: 'stick' },
    { title: '세미', name: 'semi' },
    { title: '오토2', name: 'auto-2' },
    { title: 'CVT', name: 'cvt' },
    { title: '기타', name: 'etc' }
  ];
  const [missionAllCheck, setMissionAllCheck] = useState(false);
  const [missionData, setMissionData] = useState({});

  const handlerMissinChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setMissionAllCheck(false);
    setMissionData(
      produce((draft) => {
        draft[name] = checked;
      })
    );
  };

  const onClickGearAll = (e) => {
    const bool = e.target.checked;
    setMissionAllCheck(bool);
    setMissionData(
      produce((draft) => {
        missionList.map((data) => {
          draft[data.name] = bool;
        });
      })
    );
  };

  return (
    <li className="opt-gearbox">
      <p>변속기{missionAllCheck}</p>

      <CheckBox id="chk-all-1" title="전체" name="gearAll" onChange={onClickGearAll} checked={missionAllCheck} isSelf={false} />
      <table summary="상세 옵션 변속기 선택" className="table-tp1 area">
        <caption className="away">변속기</caption>
        <tbody>
          <tr>
            <td>
              {missionList.map((data, idx) => (
                <CheckBox isSelf={false} key={idx} id={'chk-' + data.name} name={data.name} title={data.title} checked={missionData[data.name]} onChange={handlerMissinChange} />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  );
};

export default MissionSearch;
