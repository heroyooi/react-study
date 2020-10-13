import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import PricingToPrintButton from '@src/components/pricingSystem/pricingToPrintButton';
import { axiosGet } from '@src/utils/HttpUtils';
/**
 * 외부, 골격 프레임 이미지에 차량 결함부위 표시
 * @param {object} data
 * @param {string} inOut 외부:panel, 골격:frame
 * @param {string} carType 차종코드
 */
export function setFlawImage(data, inOut = 'panel') {
  /**
   * suv 차량 이미지 적용대상 [{7 : RV}, {8 : SUV}, {9 : 승합차}]
   * 이외 차량은 sedan 이미지 적용
   */
  const carTypeName = ['7', '8', '9'].some((e) => e === data.crTypeCd) ? 'suv' : 'sedan';
  const createIco = (num, state) => {
    if (!state || state === '0010') {
      return false;
    }
    return (
      <span className={`ico-wrap${num}`}>
        {state === '0020' && <i className="ico-state-w on" />}
        {state === '0030' && <i className="ico-state-x on" />}
      </span>
    );
  };

  return inOut === 'panel' ? (
    <>
      <img src={`/images/contents/${carTypeName}-${inOut}.png`} alt="자동차 외부패널" />
      {data.hood && data.hood !== '0010' && <img src={`/images/contents/${carTypeName}-hood.png`} alt="자동차 후드" />}
      {data.trunkLid && data.trunkLid !== '0010' && <img src={`/images/contents/${carTypeName}-trunk-lid.png`} alt="자동차 트렁크리드" />}
      {data.frtFender && data.frtFender !== '0010' && <img src={`/images/contents/${carTypeName}-front-fender.png`} alt="자동차 프론트휀더" />}
      {data.roofPnst && data.roofPnst !== '0010' && <img src={`/images/contents/${carTypeName}-roof-panel.png`} alt="자동차 루프패널" />}
      {data.door && data.door !== '0010' && <img src={`/images/contents/${carTypeName}-door.png`} alt="자동차 도어" />}
      {data.sidePnst && data.sidePnst !== '0010' && <img src={`/images/contents/${carTypeName}-sideseal-panel.png`} alt="자동차 사이드실패널" />}
      {data.rdarSpprt && data.rdarSpprt !== '0010' && <img src={`/images/contents/${carTypeName}-raditor-support.png`} alt="자동차 라디에이터 서포트" />}
      {data.qrtrPnst && data.qrtrPnst !== '0010' && <img src={`/images/contents/${carTypeName}-quarter-panel.png`} alt="자동차 쿼터패널" />}
    </>
  ) : (
    <>
      <img src={`/images/contents/${carTypeName}-${inOut}.png`} alt="자동차 주요골격" />
      {createIco(1, data.frtPnst)}
      {createIco(2, data.crossMem)}
      {createIco(3, data.insdPnst)}
      {createIco(4, data.sideMem)}
      {createIco(5, data.whlHouse)}
      {createIco(6, data.dashPnst)}
      {createIco(7, data.floorPnst)}
      {createIco(8, data.pillaPnst)}
      {createIco(9, data.rearPnst)}
      {createIco(10, data.trunkFloor)}
    </>
  );
}

/**
 * 수정 : D191379
 * @param {inspData} autobellInsp 오토벨성능점검 기록부 데이터
 */
const DetailDiagnosis = memo(({ inspData }) => {
  const nf = Intl.NumberFormat();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [count1, setCount1] = useState(7);
  const [count2, setCount2] = useState(0);
  const [accidentRate, setAccidentRate] = useState();
  let printRef = React.createRef();
  const numberToMsg = (number) => {
    const num = Number(number);
    let msg = '';
    if (num === 1) msg = '양호';
    if (num === 2) msg = '수리/보수';
    if (num === 3) msg = '미세손상/교환필요';
    if (num === 4) msg = '이상';
    if (num === 5) msg = '이염/이색';
    if (num === 6) msg = '있음';
    if (num === 7) msg = '없음';
    if (num === 8) msg = '광택Y';
    if (num === 9) msg = '광택N';

    return msg;
  };

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

  const onClickPrint = (e) => {
    e.preventDefault();

    const html = document.querySelector('html');
    const printContents = document.querySelector('.print-area').innerHTML;
    const printDiv = document.createElement('div');
    printDiv.className = 'print-div';

    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
  };

  useEffect(() => {
    axiosGet('/api/api/homeservice/selectAccidentRate.do?seqNo=1').then(({ data }) => {
      if (data.statusinfo.returncd === '000') {
        setAccidentRate(data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (inspData) {
      const arr = [];
      Object.keys(inspData).forEach((key) => {
        if (!key.includes('Memo') && typeof inspData[key] === 'number' && key !== 'atbInspNo' && key !== 'dentSttCnt' && key !== 'scrcSttCnt') {
          arr.push({ key: key, data: inspData[key] });
        }
      });
      if (arr.length > 0) {
        let cnt1 = 7;
        let cnt2 = 0;

        arr.forEach((v) => {
          if (v.key.includes('DrvStt') || v.key.includes('PssngStt')) {
            cnt1 = cnt1 + 1;
          } else if (v.data === 1 || v.data === 6 || v.data === 'Y') {
            cnt1 = cnt1 + 1;
          } else {
            cnt2 = cnt2 + 1;
          }
        });
        setCount1(cnt1);
        setCount2(cnt2);
      }
    }
  }, [inspData]);

  if (hasMobile) {
    return (
      <TabMenu type="type2" mount={false}>
        <TabCont tabTitle="진단평가" id="tab2-1" index={0}>
          <div className="autobell-wrap">
            <div className="tit-wrap bg">
              <p>
                해당 차량은 라이브스튜디오 진단 점검 중<br />
                <em>
                  [<span>{inspData ? `${inspData?.crAcdtDivNm || ''} 차량` : ''}</span>]
                </em>{' '}
                입니다.
              </p>
            </div>
            <TabMenu type="type1" mount={false}>
              <TabCont tabTitle="외부 패널" id="tab1-1" index={0}>
                <div className="label-img-wrap mt32">
                  <div className="img-wrap">{setFlawImage(inspData, 'panel')}</div>

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
                        <span className={inspData ? classNm(inspData.hood) : ''}>{inspData ? codeNm(inspData.hood) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>프론트휀더</th>
                      <td>
                        <span className={inspData ? classNm(inspData.frtFender) : ''}>{inspData ? codeNm(inspData.frtFender) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>도어</th>
                      <td>
                        <span className={inspData ? classNm(inspData.door) : ''}>{inspData ? codeNm(inspData.door) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>트렁크리드</th>
                      <td>
                        <span className={inspData ? classNm(inspData.trunkLid) : ''}>{inspData ? codeNm(inspData.trunkLid) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        라디에이터 서포트
                        <br />
                        (볼트체결부품)
                      </th>
                      <td>
                        <span className={inspData ? classNm(inspData.rdarSpprt) : ''}>{inspData ? codeNm(inspData.rdarSpprt) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>루프패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.roofPnst) : ''}>{inspData ? codeNm(inspData.roofPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>퀴터패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.qrtrPnst) : ''}>{inspData ? codeNm(inspData.qrtrPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>사이드실패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.sidePnst) : ''}>{inspData ? codeNm(inspData.sidePnst) : ''}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </TabCont>
              <TabCont tabTitle="주요 골격" id="tab1-1" index={1}>
                <div className="label-img-wrap mt32">
                  <div className="img-wrap">{setFlawImage(inspData, 'frame')}</div>
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
                        <span className={inspData ? classNm(inspData.frtPnst) : ''}>{inspData ? codeNm(inspData.frtPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>크로스맴버</th>
                      <td>
                        <span className={inspData ? classNm(inspData.crossMem) : ''}>{inspData ? codeNm(inspData.crossMem) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>인사이드패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.insdPnst) : ''}>{inspData ? codeNm(inspData.insdPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>사이드멤버</th>
                      <td>
                        <span className={inspData ? classNm(inspData.sideMem) : ''}>{inspData ? codeNm(inspData.sideMem) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>휠하우스</th>
                      <td>
                        <span className={inspData ? classNm(inspData.whlHouse) : ''}>{inspData ? codeNm(inspData.whlHouse) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>대쉬패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.dashPnst) : ''}>{inspData ? codeNm(inspData.dashPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>플로어패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.floorPnst) : ''}>{inspData ? codeNm(inspData.floorPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>필러패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.pillaPnst) : ''}>{inspData ? codeNm(inspData.pillaPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>리어패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.rearPnst) : ''}>{inspData ? codeNm(inspData.rearPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>트렁크 플로어</th>
                      <td>
                        <span className={inspData ? classNm(inspData.trunkFloor) : ''}>{inspData ? codeNm(inspData.trunkFloor) : ''}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </TabCont>
            </TabMenu>
          </div>
        </TabCont>
        <TabCont tabTitle="진단기준" id="tab2-2" index={1}>
          <div className="content-wrap autobell-wrap mt20">
            <h4 className="tit2 mb16">오토벨 라이브 스튜디오 진단 분류 기준</h4>
            <table summary="오토벨 라이브 스튜디오 진단 분류 기준에 대한 내용" className="table-tp1">
              <caption className="away">오토벨 라이브 스튜디오 진단 분류 기준</caption>
              <colgroup>
                <col width="26%" />
                <col width="74%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>완전무사고</th>
                  <td>사고이력 없음</td>
                </tr>
                <tr>
                  <th>무사고</th>
                  <td>외부패널의 교체 및 수리</td>
                </tr>
                <tr>
                  <th>유사고</th>
                  <td>골격의 교체 및 수리</td>
                </tr>
              </tbody>
            </table>

            <div className="essential-point tp2 fs12 mt16">
              <ul>
                <li>
                  <span className="tx-black">&#8251; 완전무사고 :</span> 교환, 판금, 도색, 사고이력이 없는 한 건의 수리도 받지 않은 정비이력을 가진 차량
                </li>
                <li>
                  <span className="tx-black">&#8251; 무사고 :</span> 골격이나 성능에 문제가 없지만, 가벼운 사고로 차량 외관 일부분을 구리 및 교체한 차량
                </li>
                <li>
                  <span className="tx-black">&#8251; 유사고 :</span> 자동차의 주요 프레임(골격)을 교체했거나 수리한 이력이 있는 차량
                </li>
              </ul>
            </div>

            <table summary="차량 교체 및 수리 주요 위치에 대한 내용" className="table-tp1 mt16">
              <caption className="away">차량 교체 및 수리 주요 위치</caption>
              <colgroup>
                <col width="26%" />
                <col width="74%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>외부패널</th>
                  <td>후드/프론트휀더/도어/트렁크리드/라디에이터 서포트/루프패널/퀴터패널/사이드실패널</td>
                </tr>
                <tr>
                  <th>주요골격</th>
                  <td>프론트패널/크로스맴버/인사이드패널/사이드멤버/휠하우스/대쉬패널/플로어패널/필러패널/리어패널/트렁크플로어</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabCont>
        <TabCont tabTitle="점검결과" id="tab2-3" index={2}>
          <div className="content-wrap autobell-wrap mt20">
            <div className="tit-wrap">
              <h4 className="tit2">오토벨 라이브 스튜디오 61가지 점검 보기</h4>
              <ul>
                <li>
                  양호 <span className="tx-blue60">{count1}</span>
                </li>
                <li>
                  수리/보수 <span className="tx-red60">{count2}</span>
                </li>
              </ul>
            </div>
            <ul className="m-toggle-list up-blue">
              <MenuItem>
                <MenuTitle>1. 중고차 사고이력 정보(요약)</MenuTitle>
                <MenuCont>
                  <table summary="중고차 사고이력 정보(요약)에 대한 내용" className="table-tp1">
                    <caption className="away">1. 중고차 사고이력 정보(요약)</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>제조사</th>
                        <td>{inspData ? inspData.mnfc : ''}</td>
                      </tr>
                      <tr>
                        <th>모델</th>
                        <td>{inspData ? inspData.mdl : ''}</td>
                      </tr>
                      <tr>
                        <th>등급</th>
                        <td>{inspData ? inspData.cls : ''}</td>
                      </tr>
                      <tr>
                        <th>색상</th>
                        <td>{inspData ? inspData.clr : ''}</td>
                      </tr>
                      <tr>
                        <th>주행거리</th>
                        <td>{inspData && nf.format(inspData?.drvDist || 0) + ' km'}</td>
                      </tr>
                      <tr>
                        <th>차대번호</th>
                        <td>{inspData ? inspData.vin : ''}</td>
                      </tr>
                      <tr>
                        <th>최초등록일</th>
                        <td>{inspData ? moment(inspData.frstRegDt).format('YYYY년 MM월 DD일') : ''}</td>
                      </tr>
                      <tr>
                        <th>리콜 여부</th>
                        <td>{inspData ? (inspData.rcllYn === 'Y' ? '리콜' : '-') : ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>2. 외장</MenuTitle>
                <MenuCont>
                  <table summary="외장에 대한 내용" className="table-tp1">
                    <caption className="away">2. 외장</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>앞 유리 상태</th>
                        <td>{inspData ? numberToMsg(inspData.frtGrsStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>뒷 유리 상태</th>
                        <td>{inspData ? numberToMsg(inspData.bhdGrsStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>창문 상태</th>
                        <td>{inspData ? numberToMsg(inspData.windStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>스티커 제거 (규정 외)</th>
                        <td>{inspData ? numberToMsg(inspData.stckRmv2) : ''}</td>
                      </tr>
                      <tr>
                        <th>광택 상태</th>
                        <td>{inspData ? numberToMsg(inspData.plshStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>와이퍼 작동 상태</th>
                        <td>{inspData ? numberToMsg(inspData.wprWkStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>덴트, 흡칩 상태</th>
                        <td>{inspData ? numberToMsg(inspData.dentScrcStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>도장 상태 (페인트)</th>
                        <td>{inspData ? numberToMsg(inspData.ctngStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>휠 상태</th>
                        <td>{inspData ? numberToMsg(inspData.whlStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>타이어 상태</th>
                        <td>{inspData ? numberToMsg(inspData.tireStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>번호판 상태</th>
                        <td>{inspData ? numberToMsg(inspData.lcnsPltStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>플라스틱류 부품 상태</th>
                        <td>{inspData ? numberToMsg(inspData.plstcPartStt) : ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>3. 실내</MenuTitle>
                <MenuCont>
                  <table summary="실내에 대한 내용" className="table-tp1">
                    <caption className="away">3. 실내</caption>
                    <colgroup>
                      <col width="53%" />
                      <col width="47%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>실내 상태 (마모, 흡집, 파손)</th>
                        <td>{inspData ? numberToMsg(inspData.insStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>실내 세정 확인</th>
                        <td>{inspData ? numberToMsg(inspData.insClnCnfm) : ''}</td>
                      </tr>
                      <tr>
                        <th>금연 차량 여부</th>
                        <td>{inspData ? (inspData.nosmkCrYn === 'Y' ? '양호' : '수리/보수') : ''}</td>
                      </tr>
                      <tr>
                        <th>글로브박스 상태</th>
                        <td>{inspData ? numberToMsg(inspData.glvboxStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>대시보드 상태</th>
                        <td>{inspData ? numberToMsg(inspData.dashbrdStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>실내 장식 상태</th>
                        <td>{inspData ? numberToMsg(inspData.insDecoStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>룸미러, 거울 상태</th>
                        <td>{inspData ? numberToMsg(inspData.rmmirrorStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>유리창 내면 상태</th>
                        <td>{inspData ? numberToMsg(inspData.itwStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>트렁크 상태</th>
                        <td>{inspData ? numberToMsg(inspData.trunkStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>모든 시트 상태</th>
                        <td>{inspData ? numberToMsg(inspData.stStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>모든 매트 상태</th>
                        <td>{inspData ? numberToMsg(inspData.matStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>안전벨트 청결 상태</th>
                        <td>{inspData ? numberToMsg(inspData.sftBeltClnStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>악취 처리/제거 확인</th>
                        <td>{inspData ? numberToMsg(inspData.stkTrtmRmv) : ''}</td>
                      </tr>
                      <tr>
                        <th>루프 라이닝 상태</th>
                        <td>{inspData ? numberToMsg(inspData.roofLngStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>보조키 확인</th>
                        <td>{inspData ? numberToMsg(inspData.scndKeyCnfmStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>매뉴얼 확인</th>
                        <td>{inspData ? numberToMsg(inspData.mnlCnfmStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>스페어 타이어 (KIT) 확인</th>
                        <td>{inspData ? numberToMsg(inspData.spareTireCnfmStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>도어 및 내장 트림 상태</th>
                        <td>{inspData ? numberToMsg(inspData.doorTrimStt) : ''}</td>
                      </tr>
                      <tr>
                        <th>스티커 제거 (규정 외)</th>
                        <td>{inspData ? numberToMsg(inspData.stckRmv1) : ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>4. 기능</MenuTitle>
                <MenuCont>
                  <table summary="기능에 대한 내용" className="table-tp1">
                    <caption className="away">4. 기능</caption>
                    <colgroup>
                      <col width="53%" />
                      <col width="47%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>모든 잠금장치 작동</th>
                        <td>{inspData ? numberToMsg(inspData.lockWk) : ''}</td>
                      </tr>
                      <tr>
                        <th>스마트키 작동</th>
                        <td>{inspData ? numberToMsg(inspData.smrtkyWk) : ''}</td>
                      </tr>
                      <tr>
                        <th>모든 실내등 작동</th>
                        <td>{inspData ? numberToMsg(inspData.intrLamp) : ''}</td>
                      </tr>
                      <tr>
                        <th>외부 라이트 작동</th>
                        <td>{inspData ? numberToMsg(inspData.osdLght) : ''}</td>
                      </tr>
                      <tr>
                        <th>계기판 등 작동</th>
                        <td>{inspData ? numberToMsg(inspData.insbrdLmp) : ''}</td>
                      </tr>
                      <tr>
                        <th>메모리 시트 작동</th>
                        <td>{inspData ? numberToMsg(inspData.memorySt) : ''}</td>
                      </tr>
                      <tr>
                        <th>전동 시트조절 작동</th>
                        <td>{inspData ? numberToMsg(inspData.trsmsnStCntl) : ''}</td>
                      </tr>
                      <tr>
                        <th>열선 스티어링 작동</th>
                        <td>{inspData ? numberToMsg(inspData.htwreStrg) : ''}</td>
                      </tr>
                      <tr>
                        <th>창문 개폐 작동</th>
                        <td>{inspData ? numberToMsg(inspData.windStch) : ''}</td>
                      </tr>
                      <tr>
                        <th>썬루프 작동</th>
                        <td>{inspData ? numberToMsg(inspData.sunroof) : ''}</td>
                      </tr>
                      <tr>
                        <th>경적 작동</th>
                        <td>{inspData ? numberToMsg(inspData.horn) : ''}</td>
                      </tr>
                      <tr>
                        <th>시트 열선, 통풍, 마사지 작동</th>
                        <td>{inspData ? numberToMsg(inspData.sthtwreVntnMssgwk) : ''}</td>
                      </tr>
                      <tr>
                        <th>12v 충전 단자, USB 작동</th>
                        <td>{inspData ? numberToMsg(inspData.chrgTrmlUsb) : ''}</td>
                      </tr>
                      <tr>
                        <th>안전벨트 작동</th>
                        <td>{inspData ? numberToMsg(inspData.sftBelt) : ''}</td>
                      </tr>
                      <tr>
                        <th>에어컨, 히터 작동</th>
                        <td>{inspData ? numberToMsg(inspData.airHitter) : ''}</td>
                      </tr>
                      <tr>
                        <th>네비게이션 작동</th>
                        <td>{inspData ? numberToMsg(inspData.navi) : ''}</td>
                      </tr>
                      <tr>
                        <th>후방 카메라 작동</th>
                        <td>{inspData ? numberToMsg(inspData.rearCmr) : ''}</td>
                      </tr>
                      <tr>
                        <th>360 어라운드 뷰 작동</th>
                        <td>{inspData ? numberToMsg(inspData.arndVw) : ''}</td>
                      </tr>
                      <tr>
                        <th>주차 보조 시스템 작동</th>
                        <td>{inspData ? numberToMsg(inspData.prknAsstSys) : ''}</td>
                      </tr>
                      <tr>
                        <th>후방 카메라 작동</th>
                        <td>{inspData ? numberToMsg(inspData.rearCmr) : ''}</td>
                      </tr>
                      <tr>
                        <th>360 어라운드 뷰 작동</th>
                        <td>{inspData ? numberToMsg(inspData.arndVw) : ''}</td>
                      </tr>
                      <tr>
                        <th>주차 보조 시스템 작동</th>
                        <td>{inspData ? numberToMsg(inspData.prknAsstSys) : ''}</td>
                      </tr>
                      <tr>
                        <th>컨버터블 작동</th>
                        <td>{inspData ? numberToMsg(inspData.cnvt) : ''}</td>
                      </tr>
                      <tr>
                        <th>모든 수납공간 작동</th>
                        <td>{inspData ? numberToMsg(inspData.strSpc) : ''}</td>
                      </tr>
                      <tr>
                        <th>스피커 작동</th>
                        <td>{inspData ? numberToMsg(inspData.spkr) : ''}</td>
                      </tr>
                      <tr>
                        <th>라디오, DMB 작동</th>
                        <td>{inspData ? numberToMsg(inspData.radioDmb) : ''}</td>
                      </tr>
                      <tr>
                        <th>블루투스 작동</th>
                        <td>{inspData ? numberToMsg(inspData.blth) : ''}</td>
                      </tr>
                      <tr>
                        <th>헤드업 디스플레이 작동</th>
                        <td>{inspData ? numberToMsg(inspData.hud) : ''}</td>
                      </tr>
                      <tr>
                        <th>뒷좌석 엔터테이먼트 작동</th>
                        <td>{inspData ? numberToMsg(inspData.bkstEnt) : ''}</td>
                      </tr>
                      <tr>
                        <th>실내, 실외 개조 및 튜닝 확인</th>
                        <td>{inspData ? numberToMsg(inspData.insOutdrRemodeTun) : ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
            </ul>
          </div>
        </TabCont>
        <TabCont tabTitle="보상범위" id="tab2-4" index={3}>
          <div className="content-wrap autobell-wrap mt20">
            <h4 className="tit2 mb16">
              보상범위에 대한 한도 고지
              <p className="mt16">
                라이브스튜디오에서 차량명, 옵션, 사고유무에 대하여 <span className="tx-blue80">점검오류 및 누락이 발생</span>하였을 경우 이로 인해 발생한 고객의 피해는 오토벨 진단 보상프로그램에
                의거하여 진단 서비스의 경우 진단 후 3개월 /5천 km이내 <span className="tx-blue80">진단비의 최대 20배</span>까지 보상해 드립니다.
              </p>
            </h4>
            <table summary="사고감가표에 대한 내용" className="table-tp1">
              <caption className="away">사고감가표</caption>
              <colgroup>
                <col width="53%" />
                <col width="47%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>앞펜더(부위별)</th>
                  <td>{accidentRate ? accidentRate.frtFenderReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>본넷교체</th>
                  <td>{accidentRate ? accidentRate.bonReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>플라스틱 라디에이터 서포트</th>
                  <td>{accidentRate ? accidentRate.plstcRdarSpprtReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>프론트패널</th>
                  <td>{accidentRate ? accidentRate.frtPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>A필러 (부위별)</th>
                  <td>{accidentRate ? accidentRate.aPillaReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>B필러(부위별)</th>
                  <td>{accidentRate ? accidentRate.bPillaReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>사이드실(부위별)</th>
                  <td>{accidentRate ? accidentRate.sideReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>인사이드패널 (부위별)</th>
                  <td>{accidentRate ? accidentRate.insdPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>휠하우스(부위별)</th>
                  <td>{accidentRate ? accidentRate.whlHouseReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>뒤휠하우스(부위별)</th>
                  <td>{accidentRate ? accidentRate.rearWhlHouseReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>트렁크플로어패널</th>
                  <td>{accidentRate ? accidentRate.trunkFloorPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>도어(부위별)</th>
                  <td>{accidentRate ? accidentRate.doorReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>루프패널</th>
                  <td>{accidentRate ? accidentRate.roofPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>우물정자프레임</th>
                  <td>{accidentRate ? accidentRate.wellSpermFrmReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>리어패널</th>
                  <td>{accidentRate ? accidentRate.rearPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>퀴터패널(부위별)</th>
                  <td>{accidentRate ? accidentRate.qrtrPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>침수차량</th>
                  <td>{accidentRate ? accidentRate.fludCrReduRt : ''}%</td>
                </tr>
              </tbody>
            </table>
            <p className="tx-exp-tp5">&#8251; 거래금액은 오토벨 3개월 평균시세의 10% 이상은 인정하지 않는다.</p>
          </div>
        </TabCont>
      </TabMenu>
    );
  }

  return (
    <div className="con-wrap popup-autobell">
      <TabMenu type="type1" mount={false}>
        <TabCont tabTitle="진단평가 결과" id="tab1-1" index={0}>
          <div className="autobell-wrap">
            <div className="tit-wrap bg">
              <p>
                해당 차량은 라이브스튜디오 진단 점검 중{' '}
                <em>
                  [<span>{inspData ? `${inspData?.crAcdtDivNm || ''} 차량` : ''}</span>]
                </em>
                입니다.
              </p>
            </div>
            <ul>
              <li>
                <div className="label-img-wrap">
                  <span>외부패널</span>
                  <div className="img-wrap">{setFlawImage(inspData, 'panel')}</div>
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
                        <span className={inspData ? classNm(inspData.hood) : ''}>{inspData ? codeNm(inspData.hood) : ''}</span>
                      </td>
                      <th>트렁크리드</th>
                      <td>
                        <span className={inspData ? classNm(inspData.trunkLid) : ''}>{inspData ? codeNm(inspData.trunkLid) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>프론트휀더</th>
                      <td>
                        <span className={inspData ? classNm(inspData.frtFender) : ''}>{inspData ? codeNm(inspData.frtFender) : ''}</span>
                      </td>
                      <th>루프패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.roofPnst) : ''}>{inspData ? codeNm(inspData.roofPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>도어</th>
                      <td>
                        <span className={inspData ? classNm(inspData.door) : ''}>{inspData ? codeNm(inspData.door) : ''}</span>
                      </td>
                      <th>퀴터패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.qrtrPnst) : ''}>{inspData ? codeNm(inspData.qrtrPnst) : ''}</span>
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
                        <span className={inspData ? classNm(inspData.rdarSpprt) : ''}>{inspData ? codeNm(inspData.rdarSpprt) : ''}</span>
                      </td>
                      <th>사이드실패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.sidePnst) : ''}>{inspData ? codeNm(inspData.sidePnst) : ''}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <div className="label-img-wrap">
                  <span>주요골격</span>
                  <div className="img-wrap">{setFlawImage(inspData, 'frame')}</div>
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
                        <span className={inspData ? classNm(inspData.frtPnst) : ''}>{inspData ? codeNm(inspData.frtPnst) : ''}</span>
                      </td>
                      <th>대쉬패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.dashPnst) : ''}>{inspData ? codeNm(inspData.dashPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>크로스맴버</th>
                      <td>
                        <span className={inspData ? classNm(inspData.crossMem) : ''}>{inspData ? codeNm(inspData.crossMem) : ''}</span>
                      </td>
                      <th>플로어패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.floorPnst) : ''}>{inspData ? codeNm(inspData.floorPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>인사이드패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.insdPnst) : ''}>{inspData ? codeNm(inspData.insdPnst) : ''}</span>
                      </td>
                      <th>필러패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.pillaPnst) : ''}>{inspData ? codeNm(inspData.pillaPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>사이드멤버</th>
                      <td>
                        <span className={inspData ? classNm(inspData.sideMem) : ''}>{inspData ? codeNm(inspData.sideMem) : ''}</span>
                      </td>
                      <th>리어패널</th>
                      <td>
                        <span className={inspData ? classNm(inspData.rearPnst) : ''}>{inspData ? codeNm(inspData.rearPnst) : ''}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>휠하우스</th>
                      <td>
                        <span className={inspData ? classNm(inspData.whlHouse) : ''}>{inspData ? codeNm(inspData.whlHouse) : ''}</span>
                      </td>
                      <th>트렁크 플로어</th>
                      <td>
                        <span className={inspData ? classNm(inspData.trunkFloor) : ''}>{inspData ? codeNm(inspData.trunkFloor) : ''}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </TabCont>
        <TabCont tabTitle="진단기준" id="tab1-2" index={1}>
          <div className="autobell-wrap">
            <div className="tit-wrap">
              <h4>
                오토벨 라이브 스튜디오 <span>진단 분류 기준</span>
              </h4>
            </div>
            <table summary="오토벨 라이브 스튜디오 진단 분류 기준에 대한 내용" className="table-tp1 th-c td-c">
              <caption className="away">오토벨 라이브 스튜디오 진단 분류 기준</caption>
              <colgroup>
                <col width="33.33%" />
                <col width="33.33%" />
                <col width="33.33%" />
              </colgroup>
              <thead>
                <tr>
                  <th>완전무사고</th>
                  <th>무사고</th>
                  <th>유사고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>사고이력 없음</td>
                  <td>외부패널의 교체 및 수리</td>
                  <td>골격의 교체 및 수리</td>
                </tr>
              </tbody>
            </table>
            <p className="table-exp">
              완전무사고 : 교환, 판금, 도색, 사고이력이 없는 한 건의 수리도 받지 않은 정비이력을 가진 차량
              <br />
              무사고 : 골격이나 성능에 문제가 없지만, 가벼운 사고로 차량 외관 일부분을 구리 및 교체한 차량
              <br />
              유사고 차량 : 자동차의 주요 프레임(골격)을 교체했거나 구리한 이력이 있는 차량
            </p>
            <table summary="차량 교체 및 수리 주요 위치에 대한 내용" className="table-tp1 th-c">
              <caption className="away">차량 교체 및 수리 주요 위치</caption>
              <colgroup>
                <col width="10%" />
                <col width="90%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>외부패널</th>
                  <td>후드/프론트휀더/도어/트렁크리드/라디에이터 서포트/루프패널/퀴터패널/사이드실패널</td>
                </tr>
                <tr>
                  <th>주요골격</th>
                  <td>프론트패널/크로스맴버/인사이드패널/사이드멤버/휠하우스/대쉬패널/플로어패널/필러패널/리어패널/트렁크플로어</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabCont>
        <TabCont tabTitle="점검 결과" id="tab1-3" index={2}>
          <div className="print-area" ref={(el) => (printRef = el)} id={'printDiv'}>
            <div className="autobell-wrap">
              <div className="tit-wrap bg">
                <h4>
                  오토벨 라이브 스튜디오 <span>61가지 점검</span> 보기
                </h4>
                <ul>
                  <li>
                    양호 <span className="tx-blue60">{count1}</span>
                  </li>
                  <li>
                    수리/보수 <span className="tx-red60">{count2}</span>
                  </li>
                </ul>
                <PricingToPrintButton trigger={() => <a>인쇄하기</a>} content={() => printRef} pageStyle="" />
                {/* <Button size="mid" line="gray" radius={true} title="인쇄하기" width={85} onClick={(e) => onClickPrint(e)} /> */}
              </div>
              <table summary="차량정보에 대한 내용" className="table-tp1 th-c td-c">
                <caption>1. 차량정보</caption>
                <colgroup>
                  <col width="33.33%" />
                  <col width="33.33%" />
                  <col width="33.33%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>점검 내용</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>제조사</th>
                    <td>{inspData ? inspData.mnfc : ''}</td>
                    <td>{inspData ? inspData.mnfcMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>모델</th>
                    <td>{inspData ? inspData.mdl : ''}</td>
                    <td>{inspData ? inspData.mdlMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>등급</th>
                    <td>{inspData ? inspData.cls : ''}</td>
                    <td>{inspData ? inspData.clsMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>색상</th>
                    <td>{inspData ? inspData.clr : ''}</td>
                    <td>{inspData ? inspData.clrMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>주행거리</th>
                    <td>{inspData && nf.format(inspData?.drvDist || 0) + ' km'}</td>
                    <td>{inspData ? inspData.drvDistMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>차대번호</th>
                    <td>{inspData ? inspData.vin : ''}</td>
                    <td>{inspData ? inspData.vinMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>{inspData ? moment(inspData.frstRegDt).format('YYYY년 MM월 DD일') : ''}</td>
                    <td>{inspData ? inspData.frstRegDtMemo : ''}</td>
                  </tr>
                  {/* <tr>
                    <th>리콜 여부</th>
                    <td>{inspData ? (inspData.rcllYn === 'Y' ? '리콜' : '-') : ''}</td>
                    <td>{inspData ? inspData.rcllYnMemo : ''}</td>
                  </tr> */}
                </tbody>
              </table>
              <table summary="외장에 대한 내용" className="table-tp1 th-c td-c">
                <caption>2. 외장</caption>
                <colgroup>
                  <col width="33.33%" />
                  <col width="33.33%" />
                  <col width="33.33%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>점검 내용</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>앞 유리 상태</th>
                    <td>{inspData ? numberToMsg(inspData.frtGrsStt) : ''}</td>
                    <td>{inspData ? inspData.frtGrsSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>뒷 유리 상태</th>
                    <td>{inspData ? numberToMsg(inspData.bhdGrsStt) : ''}</td>
                    <td>{inspData ? inspData.bhdGrsSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>창문 상태</th>
                    <td>{inspData ? numberToMsg(inspData.windStt) : ''}</td>
                    <td>{inspData ? inspData.windSttMemo : ''}</td>
                  </tr>
                  {/* <tr>
                    <th>스티커 제거(규정 외)</th>
                    <td>{inspData ? numberToMsg(inspData.stckRmv2) : ''}</td>
                    <td>{inspData ? inspData.stckRmvMemo2 : ''}</td>
                  </tr> */}
                  <tr>
                    <th>광택 상태</th>
                    <td>{inspData ? numberToMsg(inspData.plshStt) : ''}</td>
                    <td>{inspData ? inspData.plshSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>와이퍼 작동 상태</th>
                    <td>{inspData ? numberToMsg(inspData.wprWkStt) : ''}</td>
                    <td>{inspData ? inspData.wprWkSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>덴트 상태</th>
                    <td>{inspData ? (inspData.dentStt === 1 ? numberToMsg(inspData.dentStt) : `${numberToMsg(inspData.dentStt)} ${inspData.dentSttCnt}개`) : ''}</td>
                    {/* <td>{inspData ? (numberToMsg(inspData.dentStt) + inspData.dentStt !== 1 ? ` ${inspData.dentSttCnt}개` : '') : ''}</td> */}
                    <td>{inspData ? inspData.dentSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>흠집 상태</th>
                    <td>{inspData ? (inspData.scrcStt === 1 ? numberToMsg(inspData.scrcStt) : `${numberToMsg(inspData.scrcStt)} ${inspData.scrcSttCnt}개`) : ''}</td>
                    {/* <td>{inspData ? (numberToMsg(inspData.scrcStt) + inspData.scrcStt !== 1 ? ` ${inspData.scrcSttCnt}개` : '') : ''}</td> */}
                    <td>{inspData ? inspData.scrcSttMemo : ''}</td>
                  </tr>
                  {/* <tr>
                    <th>덴트, 흡칩 상태</th>
                    <td>{inspData ? numberToMsg(inspData.dentScrcStt) : ''}</td>
                    <td>{inspData ? inspData.dentScrcSttMemo : ''}</td>
                  </tr> */}
                  <tr>
                    <th>도장 상태(페인트)</th>
                    <td>{inspData ? numberToMsg(inspData.ctngStt) : ''}</td>
                    <td>{inspData ? inspData.ctngSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>휠 상태</th>
                    <td>{inspData ? numberToMsg(inspData.whlStt) : ''}</td>
                    <td>{inspData ? inspData.whlSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>타이어 상태(앞 운전석)</th>
                    <td>{inspData ? `트레드 높이 ${inspData.tireFrtDrvStt}mm` : ''}</td>
                    <td>{inspData ? inspData.tireFrtDrvSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>타이어 상태(앞 조수석)</th>
                    <td>{inspData ? `트레드 높이 ${inspData.tireFrtPssngStt}mm` : ''}</td>
                    <td>{inspData ? inspData.tireFrtPssngSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>타이어 상태(뒤 운전석)</th>
                    <td>{inspData ? `트레드 높이 ${inspData.tireRearDrvStt}mm` : ''}</td>
                    <td>{inspData ? inspData.tireRearDrvSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>타이어 상태(뒤 조수석)</th>
                    <td>{inspData ? `트레드 높이 ${inspData.tireRearPssngStt}mm` : ''}</td>
                    <td>{inspData ? inspData.tireRearPssngSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>번호판 상태</th>
                    <td>{inspData ? numberToMsg(inspData.lcnsPltStt) : ''}</td>
                    <td>{inspData ? inspData.lcnsPltSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>플라스틱류 부품 상태</th>
                    <td>{inspData ? numberToMsg(inspData.plstcPartStt) : ''}</td>
                    <td>{inspData ? inspData.plstcPartSttMemo : ''}</td>
                  </tr>
                </tbody>
              </table>
              <table summary="실내에 대한 내용" className="table-tp1 th-c td-c">
                <caption>3. 실내</caption>
                <colgroup>
                  <col width="33.33%" />
                  <col width="33.33%" />
                  <col width="33.33%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>점검 내용</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <th>실내 상태(마모, 흡집, 파손)</th>
                    <td>{inspData ? numberToMsg(inspData.insStt) : ''}</td>
                    <td>{inspData ? inspData.insSttMemo : ''}</td>
                  </tr> */}
                  <tr>
                    <th>실내 세정 확인</th>
                    <td>{inspData ? numberToMsg(inspData.insClnCnfm) : ''}</td>
                    <td>{inspData ? inspData.insClnCnfmMemo : ''}</td>
                  </tr>
                  {/* <tr>
                    <th>금연 차량 여부</th>
                    <td>{inspData ? (inspData.nosmkCrYn === 'Y' ? '양호' : '수리/보수') : ''}</td>
                    <td>{inspData ? inspData.nosmkCrYnMemo : ''}</td>
                  </tr> */}
                  <tr>
                    <th>글로브박스 상태</th>
                    <td>{inspData ? numberToMsg(inspData.glvboxStt) : ''}</td>
                    <td>{inspData ? inspData.glvboxSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>대시보드 상태</th>
                    <td>{inspData ? numberToMsg(inspData.dashbrdStt) : ''}</td>
                    <td>{inspData ? inspData.dashbrdSttMemo : ''}</td>
                  </tr>
                  {/* <tr>
                    <th>실내 장식 상태</th>
                    <td>{inspData ? numberToMsg(inspData.insDecoStt) : ''}</td>
                    <td>{inspData ? inspData.insDecoSttMemo : ''}</td>
                  </tr> */}
                  <tr>
                    <th>룸미러, 거울 상태</th>
                    <td>{inspData ? numberToMsg(inspData.rmmirrorStt) : ''}</td>
                    <td>{inspData ? inspData.rmmirrorSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>유리창 내면 상태</th>
                    <td>{inspData ? numberToMsg(inspData.itwStt) : ''}</td>
                    <td>{inspData ? inspData.itwSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>트렁크 상태</th>
                    <td>{inspData ? numberToMsg(inspData.trunkStt) : ''}</td>
                    <td>{inspData ? inspData.trunkSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>모든 시트 상태</th>
                    <td>{inspData ? numberToMsg(inspData.stStt) : ''}</td>
                    <td>{inspData ? inspData.stSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>모든 매트 상태</th>
                    <td>{inspData ? numberToMsg(inspData.matStt) : ''}</td>
                    <td>{inspData ? inspData.matSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>안전벨트 청결 상태</th>
                    <td>{inspData ? numberToMsg(inspData.sftBeltClnStt) : ''}</td>
                    <td>{inspData ? inspData.sftBeltClnSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>악취 처리/제거 확인</th>
                    <td>{inspData ? numberToMsg(inspData.stkTrtmRmv) : ''}</td>
                    <td>{inspData ? inspData.stkTrtmRmvMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>루프 라이닝 상태</th>
                    <td>{inspData ? numberToMsg(inspData.roofLngStt) : ''}</td>
                    <td>{inspData ? inspData.roofLngSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>보조키 확인</th>
                    <td>{inspData ? numberToMsg(inspData.scndKeyCnfmStt) : ''}</td>
                    <td>{inspData ? inspData.scndKeyCnfmSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>매뉴얼 확인</th>
                    <td>{inspData ? numberToMsg(inspData.mnlCnfmStt) : ''}</td>
                    <td>{inspData ? inspData.mnlCnfmSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>스페어 타이어(KIT) 확인</th>
                    <td>{inspData ? numberToMsg(inspData.spareTireCnfmStt) : ''}</td>
                    <td>{inspData ? inspData.spareTireCnfmMemo : ''}</td>
                  </tr>
                  {/* <tr>
                    <th>도어 및 내장 트림 상태</th>
                    <td>{inspData ? numberToMsg(inspData.doorTrimStt) : ''}</td>
                    <td>{inspData ? inspData.doorTrimSttMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>스티커 제거(규정 외)</th>
                    <td>{inspData ? numberToMsg(inspData.stckRmv1) : ''}</td>
                    <td>{inspData ? inspData.stckRmvMemo1 : ''}</td>
                  </tr> */}
                </tbody>
              </table>
              <table summary="기능에 대한 내용" className="table-tp1 th-c td-c">
                <caption>4. 기능</caption>
                <colgroup>
                  <col width="33.33%" />
                  <col width="33.33%" />
                  <col width="33.33%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>점검 내용</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>모든 잠금장치 작동</th>
                    <td>{inspData ? numberToMsg(inspData.lockWk) : ''}</td>
                    <td>{inspData ? inspData.lockWkMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>스마트키 작동</th>
                    <td>{inspData ? numberToMsg(inspData.smrtkyWk) : ''}</td>
                    <td>{inspData ? inspData.smrtkyWkMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>모든 실내등 작동</th>
                    <td>{inspData ? numberToMsg(inspData.intrLamp) : ''}</td>
                    <td>{inspData ? inspData.intrLampMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>외부 라이트 작동</th>
                    <td>{inspData ? numberToMsg(inspData.osdLght) : ''}</td>
                    <td>{inspData ? inspData.osdLghtMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>계기판 등 작동</th>
                    <td>{inspData ? numberToMsg(inspData.insbrdLmp) : ''}</td>
                    <td>{inspData ? inspData.insbrdLmpMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>메모리 시트 작동</th>
                    <td>{inspData ? numberToMsg(inspData.memorySt) : ''}</td>
                    <td>{inspData ? inspData.memoryStMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>전동 시트조절 작동</th>
                    <td>{inspData ? numberToMsg(inspData.trsmsnStCntl) : ''}</td>
                    <td>{inspData ? inspData.trsmsnStCntlMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>열선 스티어링 작동</th>
                    <td>{inspData ? numberToMsg(inspData.htwreStrg) : ''}</td>
                    <td>{inspData ? inspData.htwreStrgMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>창문 개폐 작동</th>
                    <td>{inspData ? numberToMsg(inspData.windStch) : ''}</td>
                    <td>{inspData ? inspData.windStchMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>썬루프 작동</th>
                    <td>{inspData ? numberToMsg(inspData.sunroof) : ''}</td>
                    <td>{inspData ? inspData.sunroofMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>경적 작동</th>
                    <td>{inspData ? numberToMsg(inspData.horn) : ''}</td>
                    <td>{inspData ? inspData.hornMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>시트 열선, 통풍, 마사지 작동</th>
                    <td>{inspData ? numberToMsg(inspData.sthtwreVntnMssgwk) : ''}</td>
                    <td>{inspData ? inspData.sthtwreVntnMssgwkMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>12v 충전 단자, USB 작동</th>
                    <td>{inspData ? numberToMsg(inspData.chrgTrmlUsb) : ''}</td>
                    <td>{inspData ? inspData.chrgTrmlUsbMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>안전벨트 작동</th>
                    <td>{inspData ? numberToMsg(inspData.sftBelt) : ''}</td>
                    <td>{inspData ? inspData.sftBeltMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>에어컨, 히터 작동</th>
                    <td>{inspData ? numberToMsg(inspData.airHitter) : ''}</td>
                    <td>{inspData ? inspData.airHitterMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>네비게이션 작동</th>
                    <td>{inspData ? numberToMsg(inspData.navi) : ''}</td>
                    <td>{inspData ? inspData.naviMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>후방 카메라 작동</th>
                    <td>{inspData ? numberToMsg(inspData.rearCmr) : ''}</td>
                    <td>{inspData ? inspData.rearCmrMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>360 어라운드 뷰 작동</th>
                    <td>{inspData ? numberToMsg(inspData.arndVw) : ''}</td>
                    <td>{inspData ? inspData.arndVwMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>주차 보조 시스템 작동</th>
                    <td>{inspData ? numberToMsg(inspData.prknAsstSys) : ''}</td>
                    <td>{inspData ? inspData.prknAsstSysMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>컨버터블 작동</th>
                    <td>{inspData ? numberToMsg(inspData.cnvt) : ''}</td>
                    <td>{inspData ? inspData.cnvtMemo : ''}</td>
                  </tr>
                  {/* <tr>
                    <th>모든 수납공간 작동</th>
                    <td>{inspData ? numberToMsg(inspData.strSpc) : ''}</td>
                    <td>{inspData ? inspData.strSpcMemo : ''}</td>
                  </tr> */}
                  <tr>
                    <th>스피커 작동</th>
                    <td>{inspData ? numberToMsg(inspData.spkr) : ''}</td>
                    <td>{inspData ? inspData.spkrMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>라디오, DMB 작동</th>
                    <td>{inspData ? numberToMsg(inspData.radioDmb) : ''}</td>
                    <td>{inspData ? inspData.radioDmbMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>블루투스 작동</th>
                    <td>{inspData ? numberToMsg(inspData.blth) : ''}</td>
                    <td>{inspData ? inspData.blthMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>헤드업 디스플레이 작동</th>
                    <td>{inspData ? numberToMsg(inspData.hud) : ''}</td>
                    <td>{inspData ? inspData.hudMemo : ''}</td>
                  </tr>
                  <tr>
                    <th>뒷좌석 엔터테이먼트 작동</th>
                    <td>{inspData ? numberToMsg(inspData.bkstEnt) : ''}</td>
                    <td>{inspData ? inspData.bkstEntMemo : ''}</td>
                  </tr>
                  {/* <tr>
                    <th>실내, 실외 개조 및 튜닝 확인</th>
                    <td>{inspData ? numberToMsg(inspData.insOutdrRemodeTun) : ''}</td>
                    <td>{inspData ? inspData.insOutdrRemodeTunMemo : ''}</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </TabCont>
        <TabCont tabTitle="보상범위" id="tab1-4" index={3}>
          <div className="autobell-wrap">
            <div className="tit-wrap">
              <h4>보상범위에 대한 한도 고지</h4>
            </div>
            <p className="tit-exp">
              라이브스튜디오에서 차량명, 옵션, 사고유무에 대하여 점검오류 및 누락이 발생하였을 경우 이로 인해 발생한 고객의 피해는 오토벨 진단 보상프로그램에 의거하여 진단 서비스의 경우 진단 후 3개월
              /5천 km이내 진단비의 최대 20배까지 보상해 드립니다.
            </p>
            <table summary="보상범위에 대한 한도 고지에 대한 내용" className="table-tp1 th-c td-c">
              <caption className="away">보상범위에 대한 한도 고지</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th>사고여부</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>진단비의 20배 이내</td>
                  <td>
                    보상범위 내에서 <span className="tx-blue80">사고 감가표</span> 적용
                  </td>
                </tr>
              </tbody>
            </table>
            <table summary="사고감가표에 대한 내용" className="table-tp1 th-c td-c">
              <caption>사고감가표</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th>평가항목</th>
                  <th>감가율</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>앞펜더(부위별)</th>
                  <td>{accidentRate ? accidentRate.frtFenderReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>본넷교체</th>
                  <td>{accidentRate ? accidentRate.bonReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>플라스틱 라디에이터 서포트</th>
                  <td>{accidentRate ? accidentRate.plstcRdarSpprtReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>프론트패널</th>
                  <td>{accidentRate ? accidentRate.frtPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>A필러 (부위별)</th>
                  <td>{accidentRate ? accidentRate.aPillaReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>B필러(부위별)</th>
                  <td>{accidentRate ? accidentRate.bPillaReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>사이드실(부위별)</th>
                  <td>{accidentRate ? accidentRate.sideReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>인사이드패널 (부위별)</th>
                  <td>{accidentRate ? accidentRate.insdPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>휠하우스(부위별)</th>
                  <td>{accidentRate ? accidentRate.whlHouseReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>뒤휠하우스(부위별)</th>
                  <td>{accidentRate ? accidentRate.rearWhlHouseReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>트렁크플로어패널</th>
                  <td>{accidentRate ? accidentRate.trunkFloorPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>도어(부위별)</th>
                  <td>{accidentRate ? accidentRate.doorReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>루프패널</th>
                  <td>{accidentRate ? accidentRate.roofPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>우물정자프레임</th>
                  <td>{accidentRate ? accidentRate.wellSpermFrmReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>리어패널</th>
                  <td>{accidentRate ? accidentRate.rearPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>퀴터패널(부위별)</th>
                  <td>{accidentRate ? accidentRate.qrtrPnstReduRt : ''}%</td>
                </tr>
                <tr>
                  <th>침수차량</th>
                  <td>{accidentRate ? accidentRate.fludCrReduRt : ''}%</td>
                </tr>
              </tbody>
            </table>
            <p className="table-exp">* 거래금액은 오토벨 3개월 평균시세의 10% 이상은 인정하지 않는다.</p>
          </div>
        </TabCont>
      </TabMenu>
    </div>
  );
});

DetailDiagnosis.propTypes = {
  inspData: PropTypes.object
};
DetailDiagnosis.displayName = 'DetailDiagnosis';
export default DetailDiagnosis;
