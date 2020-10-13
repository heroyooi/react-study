/**
 * 설명 : 스마트옥션 경매장 정보
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires [autoAuctionAction]
 * @author 박진하
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';

import KakaoMap from '@src/components/common/KakaoMap';

/**
 * 설명 : 스마트옥션 경매장 정보
 * @param {state.autoAuction.auctionHouseList} 경매장 목록
 * @returns {LocationAutoAuction} 스마트옥션 경매장 정보
 */
const LocationAutoAuction = ({ dataList, defaultTabValue, show = false, onChange }) => {
  const dispatch = useDispatch();
  const [rodalShow, setRodalShow] = useRodal(show);
  const [defaultTab, setDefaultTab] = useRodal(defaultTabValue);

  useEffect(() => {
    setRodalShow(show);
    if (show === true) setDefaultTab(defaultTabValue);
  }, [defaultTabValue, setDefaultTab, setRodalShow, show]);

  const modalClose = (e) => {
    if (onChange) onChange(e);
  };

  return (
    <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalClose} title="경매장 위치 안내" mode="normal" size="small">
      <div className="con-wrap">
        {!isEmpty(dataList) && (
          <TabMenu type="type1" className="auction-house" defaultTab={defaultTab} mount={true}>
            {dataList.map((house, index) => {
              return (
                <TabCont tabTitle={house.auctNm} id={'auction-house-' + (index + 1)} index={index} key={index}>
                  <KakaoMap style={{ width: '100%', height: '400px', frameBorder: '0' }} addr={house.auctAddr} />
                  <table className="table-tp1 th-c td-c" style={{ marginTop: '15px' }}>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>구분</th>
                        <td>{house.auctNm}</td>
                      </tr>
                      <tr>
                        <th>전화</th>
                        <td>{house.auctTelNo}</td>
                      </tr>
                      <tr>
                        <th>팩스</th>
                        <td>{house.auctFaxNo}</td>
                      </tr>
                      <tr>
                        <th>주소</th>
                        <td>{house.auctAddr}</td>
                      </tr>
                    </tbody>
                  </table>
                </TabCont>
              );
            })}
          </TabMenu>
        )}
      </div>
    </RodalPopup>
  );
};

LocationAutoAuction.propTypes = {
  show: PropTypes.bool,
  onChange: PropTypes.func,
  defaultTabValue: PropTypes.number
};

export default LocationAutoAuction;
