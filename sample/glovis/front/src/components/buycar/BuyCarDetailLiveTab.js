import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import TabCont from '@lib/share/tab/TabCont';
import TabMenu from '@lib/share/tab/TabMenu';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { setFlawImage } from '@src/components/common/popup/DetailDiagnosis';

const BuyCarDetailLiveTab = memo(({ autobellIns, isMobile, onAutoBellPopUpOpen, onTabCallBack, onViewDisgnosis, onHistoryPopUpOpen, onPfmcPopUpOpen }) => {
  const classNm = (code) => {
    if (code === '0010') return '';
    if (code === '0020') return 'w';
    if (code === '0030') return 'x';
  };

  const codeNm = (code) => {
    if (code === '0010') return '정상';
    if (code === '0020') return '판금/용접';
    if (code === '0030') return '교환';
  };

  if (isMobile) {
    return (
      <>
        <div className="content-sec">
          <i />
          <p>오토벨의 경험과 노하우로 차량진단 및 확인이 완료된 차량입니다.</p>
        </div>
        <TabMenu type="type1" mount={false} callBack={onTabCallBack}>
          <TabCont tabTitle="외부 패널" id="tab1-1" index={0}>
            <div className="tit-wrap bg">
              <p>
                해당 차량은 라이브스튜디오 진단 점검 중<br />
                <em>
                  [<span>{autobellIns ? `${autobellIns?.crAcdtDivNm || ''} 차량` : ''}</span>]
                </em>{' '}
                입니다.
              </p>
              <Button size="sml" line="gray" radius={true} title="오토벨 상세진단서" width={108} marginTop={16} onClick={onViewDisgnosis} />
            </div>
            <div className="label-img-wrap">
              <div className="img-wrap">{setFlawImage(autobellIns, 'panel')}</div>
              <ul className="car-record-label">
                <li>
                  <i className="ico-state-w on" />
                  판금/용접
                </li>
                <li>
                  <i className="ico-state-x on" />
                  교환
                </li>
              </ul>
            </div>
            <table summary="외부패널에 대한 내용" className="table-tp1">
              <caption className="away">외부패널</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>후드</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.hood) : ''}>{autobellIns ? codeNm(autobellIns.hood) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>프론트휀더</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.frtFender) : ''}>{autobellIns ? codeNm(autobellIns.frtFender) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>도어</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.door) : ''}>{autobellIns ? codeNm(autobellIns.door) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>트렁크리드</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.trunkLid) : ''}>{autobellIns ? codeNm(autobellIns.trunkLid) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    라디에이터 서포트
                    <br />
                    (볼트체결부품)
                  </th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.rdarSpprt) : ''}>{autobellIns ? codeNm(autobellIns.rdarSpprt) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>루프패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.roofPnst) : ''}>{autobellIns ? codeNm(autobellIns.roofPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>퀴터패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.qrtrPnst) : ''}>{autobellIns ? codeNm(autobellIns.qrtrPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>사이드실패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.sidePnst) : ''}>{autobellIns ? codeNm(autobellIns.sidePnst) : ''}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </TabCont>
          <TabCont tabTitle="주요 골격" id="tab1-1" index={1}>
            <div className="tit-wrap bg">
              <p>
                해당 차량은 라이브스튜디오 진단 점검 중<br />
                <em>
                  [<span>{autobellIns ? `${autobellIns?.crAcdtDivNm || ''} 차량` : ''}</span>]
                </em>{' '}
                입니다.
              </p>
              <Button size="sml" line="gray" radius={true} title="오토벨 상세진단서" width={108} marginTop={16} onClick={onViewDisgnosis} />
            </div>
            <div className="label-img-wrap">
              <div className="img-wrap">{setFlawImage(autobellIns, 'frame')}</div>
              <ul className="car-record-label">
                <li>
                  <i className="ico-state-w on" />
                  판금/용접
                </li>
                <li>
                  <i className="ico-state-x on" />
                  교환
                </li>
              </ul>
            </div>
            <table summary="주요골격에 대한 내용" className="table-tp1">
              <caption className="away">주요골격</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>프론트패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.frtPnst) : ''}>{autobellIns ? codeNm(autobellIns.frtPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>크로스맴버</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.crossMem) : ''}>{autobellIns ? codeNm(autobellIns.crossMem) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>인사이드패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.insdPnst) : ''}>{autobellIns ? codeNm(autobellIns.insdPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>사이드멤버</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.sideMem) : ''}>{autobellIns ? codeNm(autobellIns.sideMem) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>휠하우스</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.whlHouse) : ''}>{autobellIns ? codeNm(autobellIns.whlHouse) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>대쉬패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.dashPnst) : ''}>{autobellIns ? codeNm(autobellIns.dashPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>플로어패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.floorPnst) : ''}>{autobellIns ? codeNm(autobellIns.floorPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>필러패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.pillaPnst) : ''}>{autobellIns ? codeNm(autobellIns.pillaPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>리어패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.rearPnst) : ''}>{autobellIns ? codeNm(autobellIns.rearPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>트렁크 플로어</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.trunkFloor) : ''}>{autobellIns ? codeNm(autobellIns.trunkFloor) : ''}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </TabCont>
        </TabMenu>
      </>
    );
  }

  return (
    <>
      <div className="content-wrap autobell-wrap">
        <div className="tit-wrap bg">
          <p>
            해당 차량은 라이브스튜디오 진단 점검 중 [<span>{autobellIns ? `${autobellIns?.crAcdtDivNm || ''} 차량` : ''}</span>]입니다.
          </p>
          <Buttons align="center" marginTop={17}>
            <Button size="mid" line="gray" radius={true} title="보험이력 자세히 보기" width={162} onClick={onHistoryPopUpOpen} buttonMarkup={true} />
            <Button size="mid" line="gray" radius={true} title="성능점검 자세히 보기" width={162} onClick={onPfmcPopUpOpen} buttonMarkup={true} />
          </Buttons>
        </div>
        <ul>
          <li>
            <div className="label-img-wrap">
              <span>외부패널</span>
              <div className="img-wrap">{setFlawImage(autobellIns, 'panel')}</div>
            </div>
            <table summary="외부패널에 대한 내용" className="table-tp3">
              <caption className="away">외부패널</caption>
              <colgroup>
                <col width="27%" />
                <col width="23%" />
                <col width="27%" />
                <col width="23%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>후드</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.hood) : ''}>{autobellIns ? codeNm(autobellIns.hood) : ''}</span>
                  </td>
                  <th>트렁크리드</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.trunkLid) : ''}>{autobellIns ? codeNm(autobellIns.trunkLid) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>프론트휀더</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.frtFender) : ''}>{autobellIns ? codeNm(autobellIns.frtFender) : ''}</span>
                  </td>
                  <th>루프패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.roofPnst) : ''}>{autobellIns ? codeNm(autobellIns.roofPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>도어</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.door) : ''}>{autobellIns ? codeNm(autobellIns.door) : ''}</span>
                  </td>
                  <th>퀴터패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.qrtrPnst) : ''}>{autobellIns ? codeNm(autobellIns.qrtrPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    라디에이터
                    <br />
                    서포트
                    <br />
                    <em>(볼트체결부품)</em>
                  </th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.rdarSpprt) : ''}>{autobellIns ? codeNm(autobellIns.rdarSpprt) : ''}</span>
                  </td>
                  <th>사이드실패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.sidePnst) : ''}>{autobellIns ? codeNm(autobellIns.sidePnst) : ''}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
          <li>
            <div className="label-img-wrap">
              <span>주요골격</span>
              <div className="img-wrap">{setFlawImage(autobellIns, 'frame')}</div>
              <ul className="car-record-label">
                <li>
                  <i className="ico-state-w on" />
                  판금/용접
                </li>
                <li>
                  <i className="ico-state-x on" />
                  교환
                </li>
              </ul>
            </div>
            <table summary="주요골격에 대한 내용" className="table-tp3">
              <caption className="away">주요골격</caption>
              <colgroup>
                <col width="27%" />
                <col width="23%" />
                <col width="27%" />
                <col width="23%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>프론트패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.frtPnst) : ''}>{autobellIns ? codeNm(autobellIns.frtPnst) : ''}</span>
                  </td>
                  <th>대쉬패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.dashPnst) : ''}>{autobellIns ? codeNm(autobellIns.dashPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>크로스맴버</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.crossMem) : ''}>{autobellIns ? codeNm(autobellIns.crossMem) : ''}</span>
                  </td>
                  <th>플로어패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.floorPnst) : ''}>{autobellIns ? codeNm(autobellIns.floorPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>인사이드패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.insdPnst) : ''}>{autobellIns ? codeNm(autobellIns.insdPnst) : ''}</span>
                  </td>
                  <th>필러패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.pillaPnst) : ''}>{autobellIns ? codeNm(autobellIns.pillaPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>사이드멤버</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.sideMem) : ''}>{autobellIns ? codeNm(autobellIns.sideMem) : ''}</span>
                  </td>
                  <th>리어패널</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.rearPnst) : ''}>{autobellIns ? codeNm(autobellIns.rearPnst) : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th>휠하우스</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.whlHouse) : ''}>{autobellIns ? codeNm(autobellIns.whlHouse) : ''}</span>
                  </td>
                  <th>트렁크 플로어</th>
                  <td>
                    <span className={autobellIns ? classNm(autobellIns.trunkFloor) : ''}>{autobellIns ? codeNm(autobellIns.trunkFloor) : ''}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
        <Buttons align="center" marginTop={40}>
          <Button size="big" background="blue80" title="오토벨 상세진단서" width={243} height={60} onClick={onAutoBellPopUpOpen} buttonMarkup={true} />
        </Buttons>
      </div>
    </>
  );
});

BuyCarDetailLiveTab.propTypes = {
  autobellIns: PropTypes.object,
  isMobile: PropTypes.bool,
  onAutoBellPopUpOpen: PropTypes.func,
  onHistoryPopUpOpen: PropTypes.func,
  onPfmcPopUpOpen: PropTypes.func,
  onTabCallBack: PropTypes.func,
  onViewDisgnosis: PropTypes.func
};
BuyCarDetailLiveTab.displayName = 'BuyCarDetailLiveTab';
export default BuyCarDetailLiveTab;
