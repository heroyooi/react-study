import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
import { produce } from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { getMenuItemList, getTable, getLiSpan, getThTd, getSpecialAccident, getInsuranceAccident } from '@src/actions/homeservice/carAccidentHistoryAction';
import { getHomeStep1Data } from '@src/actions/homeservice/homeserviceAction';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import AppLayout from '@src/components/layouts/AppLayout';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import Button from '@lib/share/items/Button';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';

const CarAccidentHistoryViewerFull = ({}) => {
  const [chkPop2, setChkPop2, handleOpenChkPop2, handleCloseChkPop2] = useRodal(false, true);
  const dispatch = useDispatch();

  // 컴포넌트내 상태값 변화 처리1
  const [accidentHistory, SetAccidentHistory] = useState([]);
  const accidentHistoryData = useSelector((state) => state.carAccident.carAccident);

  // 컴포넌트내 상태값 변화 처리2
  const [carSpec, SetCarSpec] = useState([]);
  const carSpecData = useSelector((state) => state.carAccident.carSpec);

  // 컴포넌트내 상태값 변화 처리3
  const [specialPurpose, SetSpecialPurpose] = useState([]);
  const specialPurposeData = useSelector((state) => state.carAccident.specialPurpose);

  // 컴포넌트내 상태값 변화 처리4
  const [carNumberOwner, SetCarNumberOwner] = useState([]);
  const carNumberOwnerData = useSelector((state) => state.carAccident.carNumberOwner);
  const [carNumberOwner2, SetCarNumberOwner2] = useState([]);
  const carNumberOwnerData2 = useSelector((state) => state.carAccident.carNumberOwner2);

  // 컴포넌트내 상태값 변화 처리5
  const [specialAccident, SetSpecialAccident] = useState([]);
  const specialAccidentData = useSelector((state) => state.carAccident.specialAccident);

  // 컴포넌트내 상태값 변화 처리6
  const [insuranceAccident, SetInsuranceAccident] = useState([]);
  const insuranceAccidentData = useSelector((state) => state.carAccident.insuranceAccident);

  // 컴포넌트내 차량명,차량번호 변화 처리
  const [carData, SetCarData] = useState([]);
  const carDataData = useSelector((state) => state.homeStep1.carData);

  // 늘쌍으로 추가해야함.
  useEffect(() => {
    console.log('dispatch getMenuItemList!');
    dispatch(getMenuItemList());
    dispatch(getTable());
    dispatch(getLiSpan());
    dispatch(getThTd());
    dispatch(getSpecialAccident());
    dispatch(getInsuranceAccident());
    dispatch(getHomeStep1Data);
  }, []);

  useEffect(() => {
    console.log(accidentHistoryData + accidentHistoryData);
    SetAccidentHistory(accidentHistoryData);
    SetCarSpec(carSpecData);
    SetSpecialPurpose(specialPurposeData);
    SetCarNumberOwner(carNumberOwnerData);
    SetCarNumberOwner2(carNumberOwnerData2);
    SetSpecialAccident(specialAccidentData);
    SetInsuranceAccident(insuranceAccidentData);
    SetCarData(carDataData);
  }, [accidentHistoryData, carSpecData, specialPurposeData, carNumberOwnerData, carNumberOwnerData2, specialAccidentData, insuranceAccidentData, carDataData]);

  return (
    <AppLayout>
      <ul className="chk-info-wrap">
        <CheckBoxItem id="chk-insurance" checked={chkPop2} onClick={handleOpenChkPop2}>
          <p>
            보험이력을
            <br />
            확인하셨습니까?
          </p>
          <p className="ico">
            <i className="ico-insurance"></i>
          </p>
        </CheckBoxItem>
      </ul>

      <RodalPopup show={chkPop2} type={'fade'} closedHandler={handleCloseChkPop2} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <div className="con-wrap popup-history">
          <div className="car-info-wrap">
            <p className="name">
              {carDataData.carname}
              <span>{carDataData.carnum}</span>
            </p>
            <p className="date">정보조회일자 : 2020-07-27</p>
            <Button size="mid" line="gray" ladius={true} title="+ 내용 전체 보기" width={142} height={32} />
            <Button size="mid" line="gray" ladius={true} title="- 항목보기" width={108} height={32} />
          </div>

          <ul className="menu-list history">
            <MenuItem>
              <MenuTitle>
                <h5>1. 중고차 사고이력 정보 (요약)</h5>
              </MenuTitle>
              <MenuCont>
                <ul className="accident">
                  {accidentHistory.map((history, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <li>
                      <span>{history.name}</span>
                      {history.result}
                    </li>
                  ))}
                </ul>
                <div className="tx-c bg">
                  자동차보험 사고기록이 없었다고 해서 반드시 <b>무사고</b>라고 할 수는 없습니다.
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>
                <h5>2. 자동차 일반 사양 정보</h5>
              </MenuTitle>
              <MenuCont>
                <p className="tx-l">자동차의 일반적인 사양 정보를 제공합니다.</p>
                <table summary="자동차 일반 사양 정보에 대한 내용" className="table-tp1">
                  <caption className="away">자동차 일반 사양 정보</caption>
                  <colgroup>
                    <col width="25%" />
                  </colgroup>
                  <tbody>
                    {carSpec.map((spec, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <tr>
                        <th>{spec.name}</th>
                        <td>{spec.result}</td>
                        <th>{spec.name2}</th>
                        <td>{spec.result2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>
                <h5>3. 자동차 특수 용도 이력 정보</h5>
              </MenuTitle>
              <MenuCont>
                <p className="tx-l">
                  과거 자동차번호 변경기록을 모두 검색하여 제공하는 것으로 <b>대여용(렌트카), 영업용(택시 등)으로 사용된 적이 있는지</b> 확인할 수 있습니다.
                </p>
                <ul className="accident special">
                  {specialPurpose.map((specialPurpose, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <li>
                      <span>{specialPurpose.name}</span>
                      {specialPurpose.result}
                    </li>
                  ))}
                </ul>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>
                <h5>4. 자동차 번호/소유자 변경이력 정보</h5>
              </MenuTitle>
              <MenuCont>
                <p className="tx-l">
                  소유자 변경이력 정보는 <b>개인 간의 소유 변경 이외에도 매매상사 간 변경(상품용)까지 모두 포함된 횟수로 제공됩니다.</b> 참고해주시기 바랍니다.
                </p>
                <table summary="자동차 일반 사양 정보에 대한 내용" className="table-tp1 th-c td-c">
                  <caption className="away">자동차 일반 사양 정보</caption>
                  <colgroup>
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      {carNumberOwner.map((carNumber, index) => (
                        <>
                          <th>{carNumber.name}</th>
                          <th>{carNumber.name2}</th>
                          <th>{carNumber.name3}</th>
                          <th>{carNumber.name4}</th>
                        </>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {carNumberOwner2.map((carNumber2, index) => (
                        <>
                          <td>{carNumber2.result}</td>
                          <td>{carNumber2.result2}</td>
                          <td>{carNumber2.result3}</td>
                          <td>{carNumber2.result4}</td>
                        </>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>
                <h5>5. 자동차 특수 사고 이력정보</h5>
              </MenuTitle>
              <MenuCont>
                <p className="tx-l">
                  자동차보험에서 보험금이 지급된 자동차 사고기록 중 자동차품질에 특별히 영향을 미칠 가능성이 있는 사고<b>(전손, 도난, 침수사고)</b>를 확인할 수 있습니다.
                </p>
                <ul className="accident special">
                  {specialAccident.map((specialAccident, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <li>
                      <span>{specialAccident.name}</span>
                      {specialAccident.result}
                    </li>
                  ))}
                </ul>
                <div className="tx-l bg">
                  <b>용어설명</b>
                  <ul className="contents">
                    <li>
                      &#183; 전손 보험사고
                      <span>
                        손상된 자동차의 수리비용이 자동차가치(보험회사에서 적정하다고 인정한)를 초과한 경우(추정전손) 및 손상된 자동차의 수리가 불가능하거나 수리를 하더라도 자도차로서의 기능을 다할 수
                        없는 경우(절대전손)로 자동차보험에서 보상처리 받은 사고
                      </span>
                    </li>
                    <li>
                      &#183; 도난 보험사고
                      <span>자동차를 도낭 당하여 경찰서에 신고한지 30일이 지나도록 도난 당한 자동차를 찾지 못하여 자동차 보험에서 보상처리 받은 사고</span>
                    </li>
                    <li>
                      &#183; 침수 보험사고
                      <span>자동차를 운행하던 중 자동차 내부로 물이 들어와 시동이 꺼지거나, 주차 중 엔진 등에 물이 들어가 운행이 불가능하게 되어 자동차에 손해가 발생한 경우</span>
                    </li>
                  </ul>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>
                <h5>6. 보험사고 이력 상세 정보</h5>
              </MenuTitle>
              <MenuCont>
                <div>
                  <p className="tx-c">
                    66부9732 차량이 자기차량손해담보에 <b>가입하지 않은 동안에는 내 보험으로 처리한 사고이력정보의 제공이 불가능</b>합니다.
                  </p>
                  <p className="tx-c bg mb40">미가입 기간:</p>
                  <p className="tx-l lh mb0">
                    보험금 및 수리(견적)비 출처에 따라서 <b>'가입한 보험사에서 지금된 경우(내차 보험)'와 '다른 차량 보험에서 지급된 경우(상대보험)'로 나뉘어 제공</b>됩니다.
                    <br />
                    자동차사고로 상대 차량 또는 재물에 발생한 <b>손해를 내 보험금에서 지급된 경우의 정보를 제공</b>합니다.
                  </p>
                  <p className="tx-l fs15">* 쌍방과실로 해당 자동차의 손상, 수리 기록이 내차 보험과 상대 보험에서 동시에 처리된 경우에는 '내차 보험’ 에만 표시되고 '상대 보험'에서는 생략됩니다.</p>
                </div>
                <table summary="보험사고 이력 상세 정보에 대한 내용" className="table-tp1 th-c td-c mb40">
                  <caption className="away">보험사고 이력 상세 정보</caption>
                  <colgroup>
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowSpan="2">일자</th>
                      <th colSpan="2">내 차 사고 발생 (피해)</th>
                      <th>상대차 사고 발생 (피해)</th>
                    </tr>
                    <tr>
                      <th>내 차 보험 (처리)</th>
                      <th>상대 보험 (처리)</th>
                      <th>내 차 보험 (처리)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {insuranceAccident.map((insurance, index) => (
                        <>
                          <td>{insurance.result}</td>
                          <td>{insurance.result2}</td>
                          <td>{insurance.result3}</td>
                          <td>{insurance.result4}</td>
                        </>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <p className="tx-l lh">
                  <ul className="contents">
                    <li>
                      &#183;&nbsp;<b>카히스토리 자료수집 방법상 일부 오류가 발생 할 수 있습니다.</b> 의심되는 사항이 있으시면 전화주시기 바랍니다.
                    </li>
                    <li>
                      &#183;&nbsp;위 ‘수리(견적)비용’은 보험사가 지급하는 보험금 중에서 대차료, 휴차료 등 간접손해와 과실상계액 등을 제외한 수리 및 견적(부품/공임/도장) 비용으로
                      <br />
                      <b>&nbsp;&nbsp;실제 지급된 보험금과 차이가 있습니다.</b>
                    </li>
                    <li>
                      &#183;&nbsp;보험사고 이력은 <b>최근 10건의 사고만 표시</b> 등됩니다.
                    </li>
                  </ul>
                </p>
                <div className="tx-l bg">
                  <b>용어설명</b>
                  <ul className="contents">
                    <li>
                      &#183; 수리(견적)비용
                      <span>
                        비용자동차사고로 자동차가 손상된 경우 보험회사가 지급하는 보험금 중에서 자동차 운반비, 대차료(렌트비용), 휴차료 등의 간접손해와 과실상계액 등을 제외한, 자동차를 수리하는데
                        소요되는 비용 또는 견적으로 부품비용, 공임 및 도장료로 이루어집니다.
                      </span>
                    </li>
                    <li>
                      &#183; 미가입기간
                      <span>자기차량손해담보 미가입기간으로 해당기간에 대해서는 자기차량손해담보에 의해 지급된 자동차수리비 정보를 제공할 수 없는 기간</span>
                    </li>
                    <li>
                      &#183; 내 차 보험
                      <span>내 보험으로 처리한 내 차 사고 (대인사고 제외)</span>
                    </li>
                    <li>
                      &#183; 상대 보험
                      <span>다른 차량 보험으로 처리한 내 차 사고 (대인사고 제외)</span>
                    </li>
                    <li>
                      &#183; 상대 차 피해
                      <span>내 보험으로 처리한 상대 차 사고</span>
                    </li>
                  </ul>
                </div>
              </MenuCont>
            </MenuItem>
          </ul>

          <table summary="서비스 이용 정보에 대한 내용" className="table-tp1 th-c service-info">
            <caption className="away">서비스 이용 정보</caption>
            <colgroup>
              <col width="50%" />
            </colgroup>
            <thead>
              <tr>
                <th>부가 이용정보</th>
                <th>서비스 이용 제한 안내</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>본 중고차 사고이력정보는 정보조회 일자를 기준으로 작성된 것입니다.</li>
                    <li>본 정보는 자동차 일반정보로서 조회 차량을 확인하기 위하여 참고로 제공하는 것이며, 일부 차량의 경우, 정보의 누락이나 오류가 있을 수 있습니다.</li>
                    <li>침수사고에는 경미한 부분침수도 포함되며, 자료의 누락으로 ‘이력 없음’ 으로 표시되는 경우가 있습니다.</li>
                    <li>카히스토리 자료수집 방법상 오류가 발생할 수 있으니 의심되는 사항이 있으시면 전화 주시기 바랍니다.</li>
                    <li>수리비용은 보험사에서 지급되는 보험금 산정을 위하여 책정된 차량 수리 관련 항목만의 비용으로 실제 지급받은 보험금과 차이가 있을 수 있습니다.</li>
                  </ul>
                </td>
                <td>
                  <li>
                    중고차 사고이력정보 서비스는 자동차 보험을 취급하는 11개 손해보험사의 자동차 보험수리 지급기록(1996년 이후)에 근거하여 제공하고 있습니다. 따라서 다음과 같은 경우는 중고차 이력정보
                    서비스를 제공할 수 없습니다.
                  </li>
                  <li className="chk">
                    사고가 있었다 하더라도 보험회사에서 사고신고를 하지 않고 자비로 처리한 경우
                    <br />
                    - 사고신고를 하였더라도 면책, 취소 등의 사유로 지급되지 않은 경우
                    <br />- 사고신고 후 자비로 처리한 경우
                  </li>
                  <li className="chk">자동차보험이 아닌 운수 공제(택시공제, 화물공제, 버스공제 등)에 가입되어 운수공제로 부터자동차의 피해에 대한 손해를 보상받은 경우 등</li>
                  <li>
                    본 중고차 사고이력 정보는 중고차 품질확인은 위한 보조정보이며 결정적 판단자료로 사용되어서는 아니됩니다. 따라서 정밀한 중고차 품질확인을 윈하시면 차량진단 전문업체의 진단을
                    받아보시기 바랍니다.
                  </li>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="history-info-ex">
            <h4>
              중고차<span className="tx-blue80">사고이력정보</span>서비스는?
            </h4>
            <p className="tx-c lh mb40">
              중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여,
              <br />
              보험개발원에서 보유하고 있거나 수집한 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.
              <br />
              본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한
              <br />
              결정적인 판단자료로 사용 되어서는 아니 됩니다.따라서 본 정보의 확대해석이나 오·남용으로 발생하는 사항에 대해서
              <br />
              보험개발원은 어떤 책임도 부담하지 아니합니다.
            </p>
            <ul>
              <li>
                중고차 거래
                <br />
                활성화
              </li>
              <li>
                매매시장
                <br />
                투명성
              </li>
            </ul>
            <p className="tx-c lh">
              보험개발원(
              <Link href="www.kidi.or.kr">
                <a>www.kidi.or.kr</a>
              </Link>
              )은 보험입법 제176조에 의하여 설립된 보험요율산출기관이며,
              <br />
              중고차사고이력정보서비스(
              <Link href="www.carhistory.or.kr">
                <a className="tx-blue80">www.carhistory.or.kr</a>
              </Link>
              )는 보험업법시행령 제86조 제1호 근거하여 제공합니다.
            </p>
            <p className="tx-c from">
              <span>2019.07.12</span>보험개발원
            </p>
          </div>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default CarAccidentHistoryViewerFull;
