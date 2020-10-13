import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';

const MobFilterArea = ({ callback = null }) => {

  const handleClick = useCallback((e) => {
    if (callback) callback(e);
  }, [callback]);

  return (
    <>
      <div className="filter-list-wrap">
        <div className="content-wrap left-wrap col4">
          <h3>서울/경인</h3>
          <ul>
            <li><CheckBox id='chk-seoul' title='서울' /></li>
            <li><CheckBox id='chk-gyeonggi' title='경기' /></li>
            <li><CheckBox id='chk-incheon' title='인천' /></li>
          </ul>

          <h3>충청/강원</h3>
          <ul>
            <li><CheckBox id='chk-daejeon' title='대전' /></li>
            <li><CheckBox id='chk-sejong' title='세종' /></li>
            <li><CheckBox id='chk-chungnam' title='충남' /></li>
            <li><CheckBox id='chk-chungbuk' title='충북' /></li>
            <li><CheckBox id='chk-Gangwon' title='강원' /></li>
          </ul>

          <h3>영남</h3>
          <ul>
            <li><CheckBox id='chk-busan' title='부산' /></li>
            <li><CheckBox id='chk-daegu' title='대구' /></li>
            <li><CheckBox id='chk-ulsan' title='울산' /></li>
            <li><CheckBox id='chk-gyeongnam' title='경남' /></li>
            <li><CheckBox id='chk-gyeongbuk' title='경북' /></li>
          </ul>

          <h3>호남/제주</h3>
          <ul>
            <li><CheckBox id='chk-gwangju' title='광주' /></li>
            <li><CheckBox id='chk-Jeonnam' title='전남' /></li>
            <li><CheckBox id='chk-Jeonbuk' title='전북' /></li>
            <li><CheckBox id='chk-jeju' title='제주' /></li>
          </ul>
        </div>
      </div>
      <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />
    </>
  )
}

MobFilterArea.propTypes = {
  mode: PropTypes.string,
  callback: PropTypes.func
};

export default MobFilterArea;
