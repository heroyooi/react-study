import React, { memo, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import MenuCont from '@lib/share/menu/MenuCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import Radio from '@lib/share/items/Radio';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';

import { historyPanelData, historyPanelData2Lank, historyPanelDataALank, historyPanelDataBLank, historyPanelDataCLank } from '@src/constant/sellcar/historyPanelOptions';

const DealerCarAccidentHistory = memo(({ historyData = {}, isScratch = true, sttArray = ['N', 'N', 'N', 'N', 'N'], target = 'history', type, onChange, onComfirm }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [internalHistoryData, setInternalHistoryData] = useState({});

  const onCheckGroup = (e, value) => {
    const n = e.target.name;
    const v = historyData[n] === value ? null : value;
    if (onChange) {
      onChange(v, target, n);
    }

    if (hasMobile) {
      const newHistory = Object.assign({ ...internalHistoryData }, { [n]: v });
      setInternalHistoryData(newHistory);
    }
  };

  const createIco = useCallback(
    (num, state) => {
      return (
        <span className={`ico-wrap${num}`} key={num}>
          <i className={state === 1 ? 'ico-state-x on active' : 'ico-state-x on'} />
          <i className={state === 2 ? 'ico-state-w on active' : 'ico-state-w on'} />
          {isScratch === true ? <i className={state === 3 ? 'ico-state-c on active' : 'ico-state-c on'} /> : null}
        </span>
      );
    },
    [isScratch]
  );

  const handleConfirm = useCallback(
    (e) => {
      e.preventDefault();
      if (onComfirm) {
        onComfirm(e, internalHistoryData);
      }
    },
    [internalHistoryData, onComfirm]
  );

  useEffect(() => {
    if (hasMobile) {
      setInternalHistoryData(historyData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <div className="accident-history-cont">
        <div className="content-wrap">
          <ul className="m-toggle-list up-blue">
            <MenuItem>
              <MenuTitle>외판 부위의 교환, 부식 및 판금/용접 수리</MenuTitle>
              <MenuCont>
                <fieldset className={`car-record apply`}>
                  <legend className="away">사고 교환 수리 등 이력</legend>
                  <div className="car-record-state1">
                    <img src="/images/mobile/contents/car-img-top.png" alt="자동차 도면(위)" />
                    {historyPanelData?.map((data, index) => {
                      return createIco(index + 1, internalHistoryData[data.name]);
                    })}
                    {historyPanelData2Lank?.map((data, index) => {
                      return createIco(index + 10, internalHistoryData[data.name]);
                    })}
                  </div>
                  <ul className="car-record-label">
                    <li>
                      <i className="ico-state-x on" />
                      교환
                    </li>
                    <li>
                      <i className="ico-state-w on" />
                      판금/용접
                    </li>
                    {isScratch === true ? (
                      <li>
                        <i className="ico-state-c on" />
                        흠집
                      </li>
                    ) : null}
                  </ul>
                  <table summary="사고 교환 수리 등 이력에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="hide">
                      사고 <i className="ico-dot big" /> 교환 <i className="ico-dot big" /> 수리 등 이력
                    </caption>
                    <colgroup>
                      <col width="12%" />
                      {isScratch === true ? <col width="52%" /> : <col width="64%" />}
                      <col width="12%" />
                      <col width="12%" />
                      {isScratch === true ? <col width="12%" /> : null}
                    </colgroup>
                    <thead>
                      <tr>
                        <th colSpan="5">1랭크</th>
                      </tr>
                      <tr>
                        <th>NO</th>
                        <th>부위 명칭</th>
                        <th>X</th>
                        <th>W</th>
                        {isScratch === true ? <th>C</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {historyPanelData?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                            <td>
                              <Radio className="simple checkbox" id={data.id + '1'} name={data.name} value={1} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 1)} />
                            </td>
                            <td>
                              <Radio className="simple checkbox" id={data.id + '2'} name={data.name} value={2} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 2)} />
                            </td>
                            {isScratch === true ? (
                              <td>
                                <Radio className="simple checkbox" id={data.id + '3'} name={data.name} value={3} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 3)} />
                              </td>
                            ) : null}
                          </tr>
                        );
                      })}
                    </tbody>
                    <thead>
                      <tr>
                        <th colSpan="5">2랭크</th>
                      </tr>
                      <tr>
                        <th>NO</th>
                        <th>부위 명칭</th>
                        <th>X</th>
                        <th>W</th>
                        {isScratch === true ? <th>C</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {historyPanelData2Lank?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.idx}</td>
                            <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                            <td>
                              <Radio className="simple checkbox" id={data.id + '1'} name={data.name} value={1} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 1)} />
                            </td>
                            <td>
                              <Radio className="simple checkbox" id={data.id + '2'} name={data.name} value={2} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 2)} />
                            </td>
                            {isScratch === true ? (
                              <td>
                                <Radio className="simple checkbox" id={data.id + '3'} name={data.name} value={3} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 3)} />
                              </td>
                            ) : null}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </fieldset>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>주요 골격 부위의 판금, 용접수리, 교환 및 부식</MenuTitle>
              <MenuCont>
                <fieldset>
                  <div className="car-record-state2">
                    <img src="/images/mobile/contents/car-img-bottom.png" alt="자동차 도면(아래)" />
                    {historyPanelDataALank?.map((data, index) => {
                      return createIco(index + 1, internalHistoryData[data.name]);
                    })}
                    {historyPanelDataBLank?.map((data, index) => {
                      return createIco(index + 7, internalHistoryData[data.name]);
                    })}
                    {historyPanelDataCLank?.map((data, index) => {
                      return createIco(index + 22, internalHistoryData[data.name]);
                    })}
                  </div>
                  <ul className="car-record-label">
                    <li>
                      <i className="ico-state-x on" />
                      교환
                    </li>
                    <li>
                      <i className="ico-state-w on" />
                      판금/용접
                    </li>
                    {isScratch === true ? (
                      <li>
                        <i className="ico-state-c on" />
                        흠집
                      </li>
                    ) : null}
                  </ul>
                  <table summary="사고 교환 수리 등 이력에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="hide">
                      사고 <i className="ico-dot big" /> 교환 <i className="ico-dot big" /> 수리 등 이력
                    </caption>
                    <colgroup>
                      <col width="12%" />
                      {isScratch === true ? <col width="52%" /> : <col width="64%" />}
                      <col width="12%" />
                      <col width="12%" />
                      {isScratch === true ? <col width="12%" /> : null}
                    </colgroup>
                    <thead>
                      <tr>
                        <th colSpan="5">A랭크</th>
                      </tr>
                      <tr>
                        <th>NO</th>
                        <th>부위 명칭</th>
                        <th>X</th>
                        <th>W</th>
                        {isScratch === true ? <th>C</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {historyPanelDataALank?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                            <td>
                              <Radio className="simple checkbox" id={data.id + '1'} value={1} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 1)} />
                            </td>
                            <td>
                              <Radio className="simple checkbox" id={data.id + '2'} value={2} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 2)} />
                            </td>
                            {isScratch === true ? (
                              <td>
                                <Radio className="simple checkbox" id={data.id + '3'} value={3} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 3)} />
                              </td>
                            ) : null}
                          </tr>
                        );
                      })}
                    </tbody>
                    <thead>
                      <tr>
                        <th colSpan="5">B랭크</th>
                      </tr>
                      <tr>
                        <th>NO</th>
                        <th>부위 명칭</th>
                        <th>X</th>
                        <th>W</th>
                        {isScratch === true ? <th>C</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {historyPanelDataBLank?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.idx}</td>
                            <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                            <td>
                              <Radio className="simple checkbox" id={data.id + '1'} value={1} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 1)} />
                            </td>
                            <td>
                              <Radio className="simple checkbox" id={data.id + '2'} value={2} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 2)} />
                            </td>
                            {isScratch === true ? (
                              <td>
                                <Radio className="simple checkbox" id={data.id + '3'} value={3} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 3)} />
                              </td>
                            ) : null}
                          </tr>
                        );
                      })}
                    </tbody>
                    <thead>
                      <tr>
                        <th colSpan="5">C랭크</th>
                      </tr>
                      <tr>
                        <th>NO</th>
                        <th>부위 명칭</th>
                        <th>X</th>
                        <th>W</th>
                        {isScratch === true ? <th>C</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {historyPanelDataCLank?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.idx}</td>
                            <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                            <td>
                              <Radio className="simple checkbox" id={data.id + '1'} value={1} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 1)} />
                            </td>
                            <td>
                              <Radio className="simple checkbox" id={data.id + '2'} value={2} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 2)} />
                            </td>
                            {isScratch === true ? (
                              <td>
                                <Radio className="simple checkbox" id={data.id + '3'} value={3} name={data.name} checked={internalHistoryData[data.name]} onChange={(e) => onCheckGroup(e, 3)} />
                              </td>
                            ) : null}
                          </tr>
                        );
                      })}
                    </tbody>
                    {type !== 'pricing' && (
                      <thead>
                        <tr>
                          <th colSpan="5">
                            <div className="float-wrap">
                              <p>사고이력</p>
                              <ul>
                                <li>
                                  사고이력 : <span className="tx-red80">{sttArray[0] === 'Y' ? '있음' : '없음'}</span>
                                </li>
                                <li>
                                  단순수리 : <span>{sttArray[1] === 'Y' ? '있음' : '없음'}</span>
                                </li>
                              </ul>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th colSpan="5">
                            <div className="float-wrap">
                              <p>부위별 이상여부</p>
                              <ul>
                                <li>
                                  외판부위 1랭크 : <span className="tx-red80">{sttArray[2] === 'Y' ? '있음' : '없음'}</span>
                                </li>
                                <li>
                                  외판부위 2랭크 : <span>{sttArray[3] === 'Y' ? '있음' : '없음'}</span>
                                </li>
                                <li>
                                  주요골격 : <span>{sttArray[4] === 'Y' ? '있음' : '없음'}</span>
                                </li>
                                <li>
                                  <span className="tx-gray">(A랭크, B랭크, C랭크)</span>
                                </li>
                              </ul>
                            </div>
                          </th>
                        </tr>
                      </thead>
                    )}
                  </table>
                </fieldset>
              </MenuCont>
            </MenuItem>
          </ul>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleConfirm} />
      </div>
    );
  }
  return (
    <fieldset className="car-record">
      <ul className="car-record-label">
        <li>
          <i className="ico-state-x on" />
          교환(교체)
        </li>
        <li>
          <i className="ico-state-w on" />
          판금/용접
        </li>
        {isScratch === true ? (
          <li>
            <i className="ico-state-c on" />
            흠집
          </li>
        ) : null}
      </ul>
      <legend className="away">사고 교환 수리 등 이력</legend>
      <table summary="사고 교환 수리 등 이력에 대한 내용" className="table-tp1 th-c td-c">
        <caption>
          사고 <i className="ico-dot big" /> 교환 <i className="ico-dot big" /> 수리 등 이력
        </caption>
        <colgroup>
          <col width="41%" />
          <col width="7%" />
          <col width="5%" />
          {isScratch === true ? <col width="18%" /> : <col width="23%" />}
          <col width="5%" />
          <col width="5%" />
          {isScratch === true ? <col width="5%" /> : null}
        </colgroup>
        <thead>
          <tr>
            <th>외판 부위의 교환, 부식 및 판금/용접 수리</th>
            <th>랭크</th>
            <th>NO</th>
            <th>부위 명칭</th>
            <th>교환</th>
            <th>
              판금/
              <br />
              용접
            </th>
            {isScratch === true ? <th>흠집</th> : null}
          </tr>
        </thead>
        <tbody>
          {historyPanelData?.map((data, index) =>
            index !== 0 ? (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox className="simple checkbox" isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            ) : (
              <tr key={index}>
                <td rowSpan="14">
                  <div className="car-record-state1">
                    <img src="/images/contents/car-img-top.png" alt="자동차 도면(위)" />
                    {historyPanelData?.map((data, index) => {
                      return createIco(index + 1, historyData[data.name]);
                    })}
                    {historyPanelData2Lank?.map((data, index) => {
                      return createIco(index + 10, historyData[data.name]);
                    })}
                  </div>
                </td>
                <td rowSpan="9">1랭크</td>
                <td>{index + 1}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            )
          )}

          {historyPanelData2Lank?.map((data, index) =>
            index !== 0 ? (
              <tr key={index}>
                <td>{data.idx}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            ) : (
              <tr key={index}>
                <td rowSpan="5">2랭크</td>
                <td>{data.idx}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            )
          )}
        </tbody>
        <thead>
          <tr>
            <th>주요 골격 부위의 판금, 용접수리, 교환 및 부식</th>
            <th>랭크</th>
            <th>NO</th>
            <th>부위 명칭</th>
            <th>교환</th>
            <th>
              판금/
              <br />
              용접
            </th>
            {isScratch === true ? <th>흠집</th> : null}
          </tr>
        </thead>
        <tbody>
          {historyPanelDataALank?.map((data, index) =>
            index !== 0 ? (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            ) : (
              <tr key={index}>
                <td rowSpan="23">
                  <div className="car-record-state2">
                    <img src="/images/contents/car-img-bottom.png" alt="자동차 도면(아래)" />
                    {historyPanelDataALank?.map((data, index) => {
                      return createIco(index + 1, historyData[data.name]);
                    })}
                    {historyPanelDataBLank?.map((data, index) => {
                      return createIco(index + 7, historyData[data.name]);
                    })}
                    {historyPanelDataCLank?.map((data, index) => {
                      return createIco(index + 22, historyData[data.name]);
                    })}
                  </div>
                </td>
                <td rowSpan="6">A랭크</td>
                <td>{index + 1}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            )
          )}

          {historyPanelDataBLank?.map((data, index) =>
            index !== 0 ? (
              <tr key={index}>
                <td>{data.idx}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            ) : (
              <tr key={index}>
                <td rowSpan="15">B랭크</td>
                <td>{data.idx}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            )
          )}

          {historyPanelDataCLank?.map((data, index) =>
            index !== 0 ? (
              <tr key={index}>
                <td>{data.idx}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            ) : (
              <tr key={index}>
                <td rowSpan="2">C랭크</td>
                <td>{data.idx}</td>
                <td className="tl" dangerouslySetInnerHTML={{ __html: data.panel }} />
                <td>
                  <CheckBox isSelf={false} id={data.id + '1'} name={data.name} checked={historyData[data.name] === 1} onChange={(e) => onCheckGroup(e, 1)} />
                </td>
                <td>
                  <CheckBox isSelf={false} id={data.id + '2'} name={data.name} checked={historyData[data.name] === 2} onChange={(e) => onCheckGroup(e, 2)} />
                </td>
                {isScratch === true ? (
                  <td>
                    <CheckBox isSelf={false} id={data.id + '3'} name={data.name} checked={historyData[data.name] === 3} onChange={(e) => onCheckGroup(e, 3)} />
                  </td>
                ) : null}
              </tr>
            )
          )}
        </tbody>
      </table>
      {type !== 'pricing' && (
        <table summary="사고 교환 수리 등 이력에 대한 내용2" className="table-tp1">
          <caption className="away">사고 교환 수리 등 이력2</caption>
          <colgroup>
            <col width="19%" />
            <col width="28%" />
            <col width="22%" />
            <col width="18%" />
            <col width="13%" />
          </colgroup>
          <tbody>
            <tr>
              <th>
                사고이력
                <Tooltip placement="rightTop" width={430} exception="car-record" zid={101}>
                  <TooltipItem>
                    <i className="ico-question" />
                  </TooltipItem>
                  <TooltipCont>
                    <div className="car-record-tooltip">
                      <p className="tx-exp-tp2">
                        사고이력은 사고로 자동차의 주요 골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. 단. 쿼터패널, 루프패널, 사이드실패널 부위는 절단, 용접시에만 사고로 표기합니다.
                        <br />
                        (후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다.)
                      </p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </th>
              <td colSpan="4">{sttArray[0] === 'Y' ? '있음' : '없음'}</td>
            </tr>
            <tr>
              <th>
                단순수리
                <Tooltip placement="rightTop" width={430} exception="car-record" zid={101}>
                  <TooltipItem>
                    <i className="ico-question" />
                  </TooltipItem>
                  <TooltipCont>
                    <div className="car-record-tooltip">
                      <p className="tx-exp-tp2">단순수리는 후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위가 교체 및 판금, 용접수리가 된 경우로 한정합니다.</p>
                    </div>
                  </TooltipCont>
                </Tooltip>
              </th>
              <td colSpan="4">{sttArray[1] === 'Y' ? '있음' : '없음'}</td>
            </tr>
            <tr>
              <th rowSpan="3">
                부위별 이상여부
                <br />
                (하단참조)
              </th>
              <td colSpan="4">외판부위 1랭크 : {sttArray[2] === 'Y' ? '있음' : '없음'}</td>
            </tr>
            <tr>
              <td colSpan="4">외판부위 2랭크 : {sttArray[3] === 'Y' ? '있음' : '없음'}</td>
            </tr>
            <tr>
              <td colSpan="4">주요 골격 : {sttArray[4] === 'Y' ? '있음' : '없음'}</td>
            </tr>
          </tbody>
        </table>
      )}
    </fieldset>
  );
});

DealerCarAccidentHistory.propTypes = {
  historyData: PropTypes.object,
  isScratch: PropTypes.bool,
  sttArray: PropTypes.array,
  target: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onComfirm: PropTypes.func
};

DealerCarAccidentHistory.displayName = 'DealerCarAccidentHistory';
export default DealerCarAccidentHistory;
