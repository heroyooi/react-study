import { useState, useCallback } from 'react';
import Radio from '@lib/share/items/Radio';

const MobDealerSellAd = ({ mode = "radio" }) => {
  const [isMode, setIsMode] = useState(mode); // radio, viewer

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);

  const [isValue2, setIsValue2] = useState(0);
  const handleChange2 = useCallback((e) => {
    e.preventDefault();
    setIsValue2(Number(e.target.value));
  }, [isValue2]);

  return (
    <div className="usage-wrap content-wrap">
      <h5>자유 이용권</h5>
      <div className="float-wrap mb16">
        <p>모든 차량 이용가능</p>
        <span>단위 : 원 (VAT포함)</span>
      </div>
      <table className="table-tp1 th-c td-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
        <caption className="away">자유 이용권 상품 상세 내역</caption>
        <colgroup>
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <thead>
          <tr>
            <th>구분<br />(할인율)</th>
            <th>1개월</th>
            <th>3개월<br />(5%)</th>
            <th>6개월<br />(5%)</th>
            <th>12개월<br />(5%)</th>
          </tr>
        </thead>
        {
          isMode === "radio" &&
          <tbody>
            <tr>
              <td>5대</td>
              <td><Radio className="txt" id="car-usage1-1" label="165,000" value={1} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-2" label="470,250" value={2} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-3" label="940,500" value={3} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-4" label="1,881,000" valube={4} checked={isValue1} onChange={handleChange1} /></td>
            </tr>
            <tr>
              <td>10대</td>
              <td><Radio className="txt" id="car-usage1-5" label="330,000" value={5} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-6" label="940,500" value={6} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-7" label="1,881,000" value={7} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-8" label="3,762,000" value={8} checked={isValue1} onChange={handleChange1} /></td>
            </tr>
            <tr>
              <td>15대</td>
              <td><Radio className="txt" id="car-usage1-9" label="495,000" value={9} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-10" label="1,410,750" value={10} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-11" label="2,821,500" value={11} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-12" label="5,643,800" value={12} checked={isValue1} onChange={handleChange1} /></td>
            </tr>
            <tr>
              <td>20대</td>
              <td><Radio className="txt" id="car-usage1-13" label="660,000" value={13} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-14" label="1,881,000" value={14} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-15" label="3,762,000" value={15} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-16" label="7,524,000" value={16} checked={isValue1} onChange={handleChange1} /></td>
            </tr>
            <tr>
              <td>30대</td>
              <td><Radio className="txt" id="car-usage1-17" label="990,000" value={17} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-18" label="2,821,500" value={18} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-19" label="5,643,400" value={19} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-20" label="11,286,400" value={20} checked={isValue1} onChange={handleChange1} /></td>
            </tr>
            <tr>
              <td>50대</td>
              <td><Radio className="txt" id="car-usage1-21" label="1,650,000" value={21} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-22" label="4,702,500" value={22} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-23" label="9,405,000" value={23} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-24" label="18,810,000" value={24} checked={isValue1} onChange={handleChange1} /></td>
            </tr>
            <tr>
              <td>70대</td>
              <td><Radio className="txt" id="car-usage1-25" label="2,310,000" value={25} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-26" label="6,583,500" value={26} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-27" label="13,167,000" value={27} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-28" label="26,334,000" value={28} checked={isValue1} onChange={handleChange1} /></td>
            </tr>
            <tr>
              <td>100대</td>
              <td><Radio className="txt" id="car-usage1-29" label="3,300,000" value={29} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-30" label="9,405,000" value={30} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-31" label="18,810,000" value={31} checked={isValue1} onChange={handleChange1} /></td>
              <td><Radio className="txt" id="car-usage1-32" label="37,620,000" value={32} checked={isValue1} onChange={handleChange1} /></td>
            </tr>
          </tbody>
        }
        {
          isMode === "viewer" && (
            <tbody className="td-c td-r">
              <tr>
                <td>5대</td>
                <td>165,000</td>
                <td>470,250</td>
                <td>940,500</td>
                <td>1,881,000</td>
              </tr>
              <tr>
                <td>10대</td>
                <td>330,000</td>
                <td>940,500</td>
                <td>1,881,000</td>
                <td>3,762,000</td>
              </tr>
              <tr>
                <td>15대</td>
                <td>495,000</td>
                <td>1,410,750</td>
                <td>2,821,500</td>
                <td>5,643,800</td>
              </tr>
              <tr>
                <td>20대</td>
                <td>660,000</td>
                <td>1,881,000</td>
                <td>3,762,000</td>
                <td>7,524,000</td>
              </tr>
              <tr>
                <td>30대</td>
                <td>990,000</td>
                <td>2,821,500</td>
                <td>5,643,400</td>
                <td>11,286,400</td>
              </tr>
              <tr>
                <td>50대</td>
                <td>1,650,000</td>
                <td>4,702,500</td>
                <td>9,405,000</td>
                <td>18,810,000</td>
              </tr>
              <tr>
                <td>70대</td>
                <td>2,310,000</td>
                <td>6,583,500</td>
                <td>13,167,000</td>
                <td>26,334,000</td>
              </tr>
              <tr>
                <td>100대</td>
                <td>3,300,000</td>
                <td>9,405,000</td>
                <td>18,810,000</td>
                <td>37,620,000</td>
              </tr>
            </tbody>
          )
        }
      </table>

      <h5>프라이싱 조회권</h5>
      <div className="float-wrap mb16">
        <p>조회권의 유효기간은 5년입니다.</p>
        <span>단위 : 원 (VAT포함)</span>
      </div>
      <table className="table-tp1 th-c td-c" summary="프라이싱 조회권에 대한 내용">
        <caption className="away">프라이싱 조회권 상세 내역</caption>
        <colgroup>
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <thead>
          <tr>
            <th>1회</th>
            <th>3회</th>
            <th>5회</th>
            <th>10회</th>
            <th>22회</th>
          </tr>
        </thead>
        {
          isMode === "radio" &&
          <tbody>
            <tr>
              <td><Radio className="txt" id="car-usage2-1" label="1,100" value={1} checked={isValue2} onChange={handleChange2} /></td>
              <td><Radio className="txt" id="car-usage2-2" label="3,300" value={2} checked={isValue2} onChange={handleChange2} /></td>
              <td><Radio className="txt" id="car-usage2-3" label="5,500" value={3} checked={isValue2} onChange={handleChange2} /></td>
              <td><Radio className="txt" id="car-usage2-4" label="11,000" value={4} checked={isValue2} onChange={handleChange2} /></td>
              <td><Radio className="txt" id="car-usage2-5" label="22,000" value={5} checked={isValue2} onChange={handleChange2} /></td>
            </tr>
          </tbody>
        }
        {
          isMode === "viewer" && (
            <tbody className="td-r">
              <tr>
                <td>1,100</td>
                <td>3,300</td>
                <td>5,500</td>
                <td>11,000</td>
                <td>22,000</td>
              </tr>
            </tbody>
          )
        }
        <thead>
          <tr>
            <th>25회</th>
            <th>100회</th>
            <th>330회</th>
            <th>550회</th>
            <th>1,100회</th>
          </tr>
        </thead>
        {
          isMode === "radio" &&
        <tbody>
          <tr>
            <td><Radio className="txt" id="car-usage2-6" label="55,000" value={6} checked={isValue2} onChange={handleChange2} /></td>
            <td><Radio className="txt" id="car-usage2-7" label="110,000" value={7} checked={isValue2} onChange={handleChange2} /></td>
            <td><Radio className="txt" id="car-usage2-8" label="330,000" value={8} checked={isValue2} onChange={handleChange2} /></td>
            <td><Radio className="txt" id="car-usage2-9" label="550,000" value={9} checked={isValue2} onChange={handleChange2} /></td>
            <td><Radio className="txt" id="car-usage2-10" label="1,100,000" value={10} checked={isValue2} onChange={handleChange2} /></td>
          </tr>
        </tbody>
        }
        {
          isMode === "viewer" && (
            <tbody className="td-r">
              <tr>
                <td>55,000</td>
                <td>110,000</td>
                <td>330,000</td>
                <td>550,000</td>
                <td>1,100,000</td>
              </tr>
            </tbody>
          )
        }
      </table>
    </div>
  )
}

export default MobDealerSellAd;