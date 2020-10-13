/**
 * 내차팔기 '판매차량조회' 정보 표시
 * @author 김민철
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getLabelFromArray } from '@src/utils/StringUtil';
import { imgUrl } from '@src/utils/HttpUtils';
import { carUseDvcdList } from '@src/constant/carTypeCd';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { selectAllCarTypeList } from '@src/api/common/CarInfoApi';

const parseResults = (result) => {
  const { data } = result?.data;
  if (data?.every((res) => !!res)) {
    return data?.map(({ id, name, bsno }) => ({
      value: id.toString(),
      label: name,
      bsno
    }));
  }
};

/**
 *
 * @param {Object} car 차량정보
 * @param {Array} photoList 사진목록
 */
const SellCarInfo = ({ car, photoList }) => {

  const [carColors, setCarColors] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);

  useEffect(() => {
    Promise.all([selectAllCarTypeList()]).then((results) => {
      const [carTypes] = results;
      if (carTypes) setCarTypes(parseResults(carTypes));
    });
    getCommonCodeAsync('FM048').then(setFuelTypes);
    getCommonCodeAsync('AM104').then(setCarColors);
  }, []);

  return (
    <div className="car-img-info">
      <div className="tit-wrap">
        <h5>판매 차량 조회</h5>
      </div>
      <div className="car-info">
        <div className="img-wrap">
          <img src={`${imgUrl}${photoList[0].phtUrl}`} alt="홈서비스 차량 이미지" />
        </div>
        <table summary="판매 차량에 대한 내용" className="table-tp1">
          <caption className="away">판매 차량 조회</caption>
          <colgroup>
            <col width="18%" />
            <col width="22%" />
            <col width="18%" />
            <col width="42%" />
          </colgroup>
          <tbody>
            <tr>
              <th>차량번호</th>
              <td>{car.crNo}</td>
              <th>차량명</th>
              <td className="pd8-12">
                {car.crMnfcCdNm} {car.crDtlMdlCdNm} {car.crClsCdNm} {car.crDtlClsCdNm}
              </td>
            </tr>
            <tr>
              <th>최초등록일</th>
              <td>{car?.frstRegDt.substring(2)}</td>
              <th>형식 년도</th>
              <td>{car.frmYyyy}</td>
            </tr>
            <tr>
              <th>색상</th>
              <td>{getLabelFromArray(carColors, car.crClrCd)}</td>
              <th>연료</th>
              <td>{getLabelFromArray(fuelTypes, car.fuelDvcd)}</td>
            </tr>
            <tr>
              <th>배기량</th>
              <td>{car.dspl} cc</td>
              <th>차종</th>
              <td>{car.crTypeCdNm}</td>
            </tr>
            <tr>
              <th>용도</th>
              <td>{getLabelFromArray(carUseDvcdList, car.crUseDvcd)}</td>
              <th>출고 가격</th>
              <td>{car.crRlsPrc}원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

SellCarInfo.propTypes = {
  car: PropTypes.object,
  photoList: PropTypes.array
};

export default SellCarInfo;
