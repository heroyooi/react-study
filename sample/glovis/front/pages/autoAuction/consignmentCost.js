/**
 * 설명 : 경매장 탁송수수료
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires [autoAuctionAction]
 * @author 박진하
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';

import { getConsignmentFee } from '@src/actions/autoAuction/autoAuctionAction';

/**
 * 설명 : 경매장 탁송수수료 목록을 조회한다.
 * @param {state.autoAuction.consignment1} 분당경매장 탁송수수료
 * @param {state.autoAuction.consignment2} 시화경매장 탁송수수료
 * @param {state.autoAuction.consignment3} 양산경매장 탁송수수료
 * @returns {ConsignmentCost} 탁송수수료 목록
 */
const ConsignmentCost = ({ show = false, onChange }) => {
  const nf = new Intl.NumberFormat();
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { consignment1, consignment2, consignment3 } = useSelector((state) => state.autoAuction);

  const [consignPopup, setConsignPopup] = useRodal(show);

  useEffect(() => {
    setConsignPopup(show);
  }, [setConsignPopup, show]);

  useEffect(() => {
    if (show === true) {
      if (isEmpty(consignment1)) {
        dispatch(getConsignmentFee());
      }
    }
  }, [show]);

  const closeConsignPopup = (e) => {
    if (onChange) onChange(e);
  };

  if (hasMobile) {
    return (
      <RodalPopup show={consignPopup} type={'fade'} closedHandler={closeConsignPopup} title="탁송료 안내" mode="normal" size="medium" className="account">
        <TabMenu type="type2" mount={false} defaultTab={0}>
          <TabCont tabTitle="분당 경매장" id="tab1-1" index={0}>
            <div className="content-wrap">
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>서울1</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울2</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울3</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="양산 경매장" id="tab1-2" index={1}>
            <div className="content-wrap">
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>서울1</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울2</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울3</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="시화 경매장" id="tab1-3" index={2}>
            <div className="content-wrap">
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>서울1</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울2</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울3</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </div>
          </TabCont>
        </TabMenu>
      </RodalPopup>
    );
  }
  return (
    <RodalPopup show={consignPopup} type={'fade'} closedHandler={closeConsignPopup} title="탁송료 안내" mode="normal" size="medium" className="account">
      <div className="con-wrap">
        <TabMenu type="type1" className="auction-house">
          <TabCont tabTitle="분당 경매장" id="auction-house-1" index={0}>
            <p className="exp-txt">* 단위 (원)</p>
            <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
              <caption className="away">탁송료 안내 정보</caption>
              <colgroup>
                <col width="100px" />
                <col width="*" />
                <col width="102px" />
                <col width="102px" />
                <col width="102px" />
              </colgroup>
              <thead>
                <tr>
                  <th>지역</th>
                  <th>시군구</th>
                  <th>4.5톤 미만</th>
                  <th>8톤 미만</th>
                  <th>7톤 이상</th>
                </tr>
              </thead>
            </table>
            <ColoredScrollbars autoHeightMax={336}>
              <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                <colgroup>
                  <col width="100px" />
                  <col width="*" />
                  <col width="102px" />
                  <col width="102px" />
                  <col width="102px" />
                </colgroup>
                <tbody>
                  {!isEmpty(consignment1) &&
                    consignment1.map((consign, index) => {
                      return (
                        <tr key={index}>
                          <td>{consign.areaNm}</td>
                          <td>{consign.contAreaNm}</td>
                          <td>{nf.format(consign.deliCost1)}</td>
                          <td>{nf.format(consign.deliCost2)}</td>
                          <td>{nf.format(consign.deliCost3)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </ColoredScrollbars>
          </TabCont>
          <TabCont tabTitle="양산 경매장" id="auction-house-2" index={1}>
            <p className="exp-txt">* 단위 (원)</p>
            <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
              <caption className="away">탁송료 안내 정보</caption>
              <colgroup>
                <col width="100px" />
                <col width="*" />
                <col width="102px" />
                <col width="102px" />
                <col width="102px" />
              </colgroup>
              <thead>
                <tr>
                  <th>지역</th>
                  <th>시군구</th>
                  <th>4.5톤 미만</th>
                  <th>8톤 미만</th>
                  <th>7톤 이상</th>
                </tr>
              </thead>
            </table>
            <ColoredScrollbars autoHeightMax={336}>
              <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                <colgroup>
                  <col width="100px" />
                  <col width="*" />
                  <col width="102px" />
                  <col width="102px" />
                  <col width="102px" />
                </colgroup>
                <tbody>
                  {!isEmpty(consignment3) &&
                    consignment3.map((consign, index) => {
                      return (
                        <tr key={index}>
                          <td>{consign.areaNm}</td>
                          <td>{consign.contAreaNm}</td>
                          <td>{nf.format(consign.deliCost1)}</td>
                          <td>{nf.format(consign.deliCost2)}</td>
                          <td>{nf.format(consign.deliCost3)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </ColoredScrollbars>
          </TabCont>
          <TabCont tabTitle="시화 경매장" id="auction-house-3" index={2}>
            <p className="exp-txt">* 단위 (원)</p>
            <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
              <caption className="away">탁송료 안내 정보</caption>
              <colgroup>
                <col width="100px" />
                <col width="*" />
                <col width="102px" />
                <col width="102px" />
                <col width="102px" />
              </colgroup>
              <thead>
                <tr>
                  <th>지역</th>
                  <th>시군구</th>
                  <th>4.5톤 미만</th>
                  <th>8톤 미만</th>
                  <th>7톤 이상</th>
                </tr>
              </thead>
            </table>
            <ColoredScrollbars autoHeightMax={336}>
              <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                <colgroup>
                  <col width="100px" />
                  <col width="*" />
                  <col width="102px" />
                  <col width="102px" />
                  <col width="102px" />
                </colgroup>
                <tbody>
                  {!isEmpty(consignment2) &&
                    consignment2.map((consign, index) => {
                      return (
                        <tr key={index}>
                          <td>{consign.areaNm}</td>
                          <td>{consign.contAreaNm}</td>
                          <td>{nf.format(consign.deliCost1)}</td>
                          <td>{nf.format(consign.deliCost2)}</td>
                          <td>{nf.format(consign.deliCost3)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </ColoredScrollbars>
          </TabCont>
        </TabMenu>
      </div>
    </RodalPopup>
  );
};

ConsignmentCost.propTypes = {
  show: PropTypes.bool,
  onChange: PropTypes.func
};

export default ConsignmentCost;
