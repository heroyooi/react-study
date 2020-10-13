import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from 'next/link';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import CarInfo from '@src/components/common/CarInfo';
import CarStatus from '@src/components/common/CarStatus';
import CarHistory from '@src/components/common/CarHistory';
import CarDetails from '@src/components/common/CarDetails';
import CarPicture from '@src/components/common/CarPicture';
import CarSignature from '@src/components/common/CarSignature';

const ViewPerformance = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 성능점검기록부
  const now = moment();
  const [dep1Panel, setDep1Panel] = useState(0);
  const [dep2Panel, setDep2Panel] = useState(0);
  const tabDep1Click = useCallback((e, idx) => {
    setDep1Panel(idx);
  }, []);
  const tabDep2Click = useCallback((e, idx) => {
    setDep2Panel(idx);
  }, []);

  const [isCal, setIsCal] = useState(false); // 기본값은 false
  const handleCal = useCallback((e) => {
    e.preventDefault();
    setIsCal(true);
  }, []);

  const [agreeReply, setAgreeReply] = useState(false);
  const handleAgreeChange = useCallback((e) => setAgreeReply(Number(e.target.value) == 1 ? true : false), []);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '성능점검기록부',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>
        <div className="used-car-summary">
          <h2>투싼(TUCSAN) 66부00**</h2>
          <p className="info">정보조회일자: 2019-09-27</p>
        </div>
        <div className="content-wrap">
          <ul className="m-toggle-list up-blue">
            <MenuItem>
              <MenuTitle>자동차 기본정보</MenuTitle>
              <MenuCont>
                <CarInfo mode="viewer" />
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>자동차 종합상태</MenuTitle>
              <MenuCont>
                <CarStatus mode="viewer" />
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>사고 •교환 •수리 등 이력</MenuTitle>
              <MenuCont>
                <CarHistory mode="viewer" />
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>자동차 세부사항</MenuTitle>
              <MenuCont>
                <CarDetails mode="viewer" />
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>점검장면 촬영 사진</MenuTitle>
              <MenuCont>
                <CarPicture mode="viewer" />
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>특이사항 및 점검자의 의견</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <p className="intro">자동차관리법」 제58조제1항 및 같은 법 시행규칙 제120조 제1항에 따라 중고차동차의 성능 · 상태를 점검하였음을 확인합니다.</p>
                  <table summary="특이사항 및 점검자의 의견" className="table-tp1">
                    <caption className="away">윈도우 모터 작동</caption>
                    <colgroup>
                      <col width="40%" />
                      <col width="60%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>성능 · 상태 점검자</th>
                        <td>-</td>
                      </tr>
                      <tr>
                        <th>성능 · 상태 고지자</th>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>성능 · 상태 점검의 보증에 관한 사항 등</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <p className="intro">1.성능 · 상태점검자 및 매매업자는 아래의 보증기간 또는 보증거리 이내에 중고자동차성능 · 상태점검기록부에 기재된 내용과 자동차의 실제 성능 · 상태가 다른 경우 계약 또는 관계법령에 따라 매수인에 대하여 책임을 집니다. · 자동차인도일부터 보증기간은 (30)일, 보증거리는 (2000)킬로미터로 합니다. (보증기간은 30일 이내, 보증거리는 2천 킬로미터 이내이어야 하며, 그 중 먼저 도래한 것을 적용합니다.</p>
                  <p className="intro">2.중고자동차의 구조 · 장치 등의 성능 · 상태를 허위로 기재하거나 고지한 자는 「자동차관리법」 제80조제6호 내지 제80조제7호에 따라 2년 이하의 징역 또는 500만원 이하의 벌금에 처합니다.</p>
                  <p className="intro">3.성능 · 상태점검자가 성능점검에 중대한 과실이 있는 경우 자동차관리법 제21조제2항의 규정에 의한 행정처분의 기준과 절차에 관한 규칙 제5조 제1항에 따라 1차 사업정지 30일, 2차 사업정지 90일, 3차 사업취소 등의 행정처분을 받습니다.</p>
                  <p className="intro">4.사고/침수유무(단순수리 제외)는 사고로 자동차 주요골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. 단, 루프패널, 쿼터패널, 사이드실패널 부위는 절단, 용접시에만 사고로 표기합니다.(후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다.)</p>
                  <p className="intro">5.자기진단사항의 경우 중고자동차성능 · 상태점검기록부에 기록하는 것 외에 자기진단기로 측정한 내역을 매수인에게 고지하고 그 내역을 점검일부터 120일간 보관하여야 합니다.(전산정보처리조직에 의하여 보관할 수도 있습니다.)</p>
                  <p className="intro">6.성능점검 방법은 자동차검사방법을 준용하여 점검합니다.</p>
                  <p className="intro">7.체크항목 판단기준?</p>
                  <ul className="matters-list">
                    <li>미세누유(미세누수) : 해당부위에 비치는 정도로 운행에 지장이 없다고 인정되는 부품 노후로 인환 현상</li>
                    <li>누유(누수) : 해당부위에서 오일(냉각수)이 맺혀서 떨어지는 상태?</li>
                    <li>소음/유격 : 부품 노후에 인한 현상으로 결정하기에는 정도가 큰 소음 및 유격</li>
                    <li>정비요 : 현재 상태로 운행시 해당 부품의 고장으로 운행에 지장을 받을 정도로 수리가 필요한 상태</li>
                  </ul>
                </div>
              </MenuCont>
            </MenuItem>
          </ul>
          <CarSignature mode="viewer" />
        </div>
      </AppLayout>
    )
  }
  
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default withRouter(ViewPerformance);