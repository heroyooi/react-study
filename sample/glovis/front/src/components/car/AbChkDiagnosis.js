/**
 * 오토벨상세진단서의 '점검결과 파트'
 * @author 김민철
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';

/**
 * 오토벨상세진단서의 '점검결과 파트'
 * @param {Object} data
 * @param {Object} data.carInfo 차량정보
 * @param {Object} data.outside 외장
 * @param {Object} data.inside 내장
 * @param {Object} data.functions 기능
 * @returns {AutobellDiagnosis}
 */
const AutobellDiagnosis = ({ data = { carInfo: {}, outside: {}, inside: {}, functions: {} } }) => {
  return (
    <div className="pd15">
      <div className="fr">
        <Button size="sml" background="gray" title="인쇄하기" width={120} height={30} />
      </div>
      <h3 className="h3-tit mb20">오토벨 라이브 스튜디오 66가지 점검 보기</h3>
      <p className="mb20">66가지 점검 사항 중 양호 : 20 &nbsp;&nbsp;&nbsp; 수리/보수 : 60</p>
      <h4 className="h4-tit mb10">1. 차량정보</h4>
      <table summary="차량정보" className="table-tp1 mb20">
        <colgroup>
          <col width="20%" />
          <col width="45%" />
          <col width="35%" />
        </colgroup>
        <thead>
          <tr>
            <th>항목</th>
            <th>점검내용</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>제조사</th>
            <td>{data.carInfo.mnfcNm}</td>
            <td>{data.carInfo.mnfcRemark}</td>
          </tr>
          <tr>
            <th>모델</th>
            <td>{data.carInfo.modelNm}</td>
            <td>{data.carInfo.modelRemark}</td>
          </tr>
          <tr>
            <th>등급</th>
            <td>{data.carInfo.gradeNm}</td>
            <td>{data.carInfo.gradeRemark}</td>
          </tr>
          <tr>
            <th>색상</th>
            <td>{data.carInfo.colorNm}</td>
            <td>{data.carInfo.colorRemark}</td>
          </tr>
          <tr>
            <th>주행거리</th>
            <td>{data.carInfo.drvDist}</td>
            <td>{data.carInfo.drvDistRemark}</td>
          </tr>
          <tr>
            <th>차대번호</th>
            <td>{data.carInfo.vin}</td>
            <td>{data.carInfo.vinRemark}</td>
          </tr>
          <tr>
            <th>최초등록일</th>
            <td>{data.carInfo.frstRegDt}</td>
            <td>{data.carInfo.frstRegDtRemark}</td>
          </tr>
          <tr>
            <th>리콜 여부</th>
            <td>{data.carInfo.recallYn}</td>
            <td>{data.carInfo.recallYnRemark}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="h4-tit mb10">2. 외장</h4>
      <table summary="외장" className="table-tp1 mb20">
        <colgroup>
          <col width="20%" />
          <col width="45%" />
          <col width="35%" />
        </colgroup>
        <thead>
          <tr>
            <th>항목</th>
            <th>점검내용</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>앞 유리 상태</th>
            <td>{data.outside.frontGlass}</td>
            <td>{data.outside.frontGlassRemark}</td>
          </tr>
          <tr>
            <th>뒷 유리 상태</th>
            <td>{data.outside.rearGlass}</td>
            <td>{data.outside.rearGlassRemark}</td>
          </tr>
          <tr>
            <th>창문 상태</th>
            <td>{data.outside.window}</td>
            <td>{data.outside.windowRemark}</td>
          </tr>
          <tr>
            <th>스티커 제거(규정 외)</th>
            <td>{data.outside.stickerRemove}</td>
            <td>{data.outside.stickerRemoveRemark}</td>
          </tr>
          <tr>
            <th>광택 상태</th>
            <td>{data.outside.varnish}</td>
            <td>{data.outside.varnishRemark}</td>
          </tr>
          <tr>
            <th>와이퍼 작동 상태</th>
            <td>{data.outside.wiper}</td>
            <td>{data.outside.wiperRemark}</td>
          </tr>
          <tr>
            <th>덴트, 흠집 상태</th>
            <td>{data.outside.dent}</td>
            <td>{data.outside.dentRemark}</td>
          </tr>
          <tr>
            <th>도장 상태(페인트)</th>
            <td>{data.outside.paint}</td>
            <td>{data.outside.paintRemark}</td>
          </tr>
          <tr>
            <th>휠 상태</th>
            <td>{data.outside.wheel}</td>
            <td>{data.outside.wheelRemark}</td>
          </tr>
          <tr>
            <th>타이어 상태</th>
            <td>{data.outside.tire}</td>
            <td>{data.outside.tireRemark}</td>
          </tr>
          <tr>
            <th>번호판 상태</th>
            <td>{data.outside.numberPlate}</td>
            <td>{data.outside.numberPlateRemark}</td>
          </tr>
          <tr>
            <th>플라스틱류 부품 상태</th>
            <td>{data.outside.plasticParts}</td>
            <td>{data.outside.plasticPartsRemark}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="h4-tit mb10">3. 실내</h4>
      <table summary="실내" className="table-tp1 mb20">
        <colgroup>
          <col width="20%" />
          <col width="45%" />
          <col width="35%" />
        </colgroup>
        <thead>
          <tr>
            <th>항목</th>
            <th>점검내용</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>실내상태(마모,흠집,파손)</th>
            <td>{data.inside.status}</td>
            <td>{data.inside.statusRemark}</td>
          </tr>
          <tr>
            <th>실내 세정 확인</th>
            <td>{data.inside.clean}</td>
            <td>{data.inside.cleanRemark}</td>
          </tr>
          <tr>
            <th>금연 차량 여부</th>
            <td>{data.inside.nonsmoke}</td>
            <td>{data.inside.nonsmokeRemark}</td>
          </tr>
          <tr>
            <th>글로브박스 상태</th>
            <td>{data.inside.gloveBox}</td>
            <td>{data.inside.gloveBoxRemark}</td>
          </tr>
          <tr>
            <th>대시보드 상태</th>
            <td>{data.inside.dashboard}</td>
            <td>{data.inside.dashboardRemark}</td>
          </tr>
          <tr>
            <th>실내 장식 상태</th>
            <td>{data.inside.deco}</td>
            <td>{data.inside.decoRemark}</td>
          </tr>
          <tr>
            <th>룸미러, 거울 상태</th>
            <td>{data.inside.roomMirror}</td>
            <td>{data.inside.roomMirrorRemark}</td>
          </tr>
          <tr>
            <th>유리창 내면 상태</th>
            <td>{data.inside.glass}</td>
            <td>{data.inside.glassRemark}</td>
          </tr>
          <tr>
            <th>트렁크 상태</th>
            <td>{data.inside.trunk}</td>
            <td>{data.inside.trunkRemark}</td>
          </tr>
          <tr>
            <th>모든 시트 상태</th>
            <td>{data.inside.allSheet}</td>
            <td>{data.inside.allSheetRemark}</td>
          </tr>
          <tr>
            <th>모든 매트 상태</th>
            <td>{data.inside.mat}</td>
            <td>{data.inside.matRemark}</td>
          </tr>
          <tr>
            <th>안전벨트 청결 상태</th>
            <td>{data.inside.safetyBelt}</td>
            <td>{data.inside.safetyBeltRemark}</td>
          </tr>
          <tr>
            <th>악취 처리/제거 확인</th>
            <td>{data.inside.stink}</td>
            <td>{data.inside.stinkRemark}</td>
          </tr>
          <tr>
            <th>루프 라이닝 상태</th>
            <td>{data.inside.roofLining}</td>
            <td>{data.inside.roofLiningRemark}</td>
          </tr>
          <tr>
            <th>보조키 확인</th>
            <td>{data.inside.secondKey}</td>
            <td>{data.inside.secondKeyRemark}</td>
          </tr>
          <tr>
            <th>매뉴얼 확인</th>
            <td>{data.inside.manuel}</td>
            <td>{data.inside.manuelRemark}</td>
          </tr>
          <tr>
            <th>스페어 타이어(KIT)확인</th>
            <td>{data.inside.spareTire}</td>
            <td>{data.inside.spareTireRemark}</td>
          </tr>
          <tr>
            <th>도어 및 내장 트림 상태</th>
            <td>{data.inside.door}</td>
            <td>{data.inside.doorRemark}</td>
          </tr>
          <tr>
            <th>스티커 제거(규정 외)</th>
            <td>{data.inside.sticker}</td>
            <td>{data.inside.stickerRemark}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="h4-tit mb10">4. 기능</h4>
      <table summary="실내" className="table-tp1 mb20">
        <colgroup>
          <col width="20%" />
          <col width="45%" />
          <col width="35%" />
        </colgroup>
        <thead>
          <tr>
            <th>항목</th>
            <th>점검내용</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>모든 잠금장치 작동</th>
            <td>{data.functions.lock}</td>
            <td>{data.functions.lockRemark}</td>
          </tr>
          <tr>
            <th>스마트키 작동</th>
            <td>{data.functions.smartKey}</td>
            <td>{data.functions.smartKeyRemark}</td>
          </tr>
          <tr>
            <th>모든 실내등 작동</th>
            <td>{data.functions.inLight}</td>
            <td>{data.functions.inLightRemark}</td>
          </tr>
          <tr>
            <th>외부 라이트 작동</th>
            <td>{data.functions.outLight}</td>
            <td>{data.functions.outLightRemark}</td>
          </tr>
          <tr>
            <th>계기판 등 작동</th>
            <td>{data.functions.instrument}</td>
            <td>{data.functions.instrumentRemark}</td>
          </tr>
          <tr>
            <th>메모리 시트 작동</th>
            <td>{data.functions.memSheet}</td>
            <td>{data.functions.memSheetRemark}</td>
          </tr>
          <tr>
            <th>전동 시트 조절 작동</th>
            <td>{data.functions.autoSheet}</td>
            <td>{data.functions.autoSheetRemark}</td>
          </tr>
          <tr>
            <th>열선 스티어링 작동</th>
            <td>{data.functions.heatStearing}</td>
            <td>{data.functions.heatStearingRemark}</td>
          </tr>
          <tr>
            <th>창문 계패 작동</th>
            <td>{data.functions.openWindow}</td>
            <td>{data.functions.openWindowRemark}</td>
          </tr>
          <tr>
            <th>썬루프 작동</th>
            <td>{data.functions.sunRoof}</td>
            <td>{data.functions.sunRoofRemark}</td>
          </tr>
          <tr>
            <th>경적 작동</th>
            <td>{data.functions.horn}</td>
            <td>{data.functions.hornRemark}</td>
          </tr>
          <tr>
            <th>시트 열선,통풍,마사지 작동</th>
            <td>{data.functions.heatSheet}</td>
            <td>{data.functions.heatSheetRemark}</td>
          </tr>
          <tr>
            <th>12v 충천 단자, USB작동</th>
            <td>{data.functions.usb}</td>
            <td>{data.functions.usbRemark}</td>
          </tr>
          <tr>
            <th>안전벨트 작동</th>
            <td>{data.functions.safetyBelt}</td>
            <td>{data.functions.safetyBeltRemark}</td>
          </tr>
          <tr>
            <th>에어컨, 히터 작동</th>
            <td>{data.functions.aircon}</td>
            <td>{data.functions.airconRemark}</td>
          </tr>
          <tr>
            <th>네비게이션 작동</th>
            <td>{data.functions.navi}</td>
            <td>{data.functions.naviRemark}</td>
          </tr>
          <tr>
            <th>후방 카메라 작동</th>
            <td>{data.functions.backCam}</td>
            <td>{data.functions.backCamRemark}</td>
          </tr>
          <tr>
            <th>360 어라운드 뷰 작동</th>
            <td>{data.functions.aroundView}</td>
            <td>{data.functions.aroundViewRemark}</td>
          </tr>
          <tr>
            <th>주차 보조 시스템 작동</th>
            <td>{data.functions.parkingAssi}</td>
            <td>{data.functions.parkingAssiRemark}</td>
          </tr>
          <tr>
            <th>컨버터블 작동</th>
            <td>{data.functions.convertable}</td>
            <td>{data.functions.convertableRemark}</td>
          </tr>
          <tr>
            <th>모든 수납공간 작동</th>
            <td>{data.functions.storage}</td>
            <td>{data.functions.storageRemark}</td>
          </tr>
          <tr>
            <th>스피커 작동</th>
            <td>{data.functions.speaker}</td>
            <td>{data.functions.speakerRemark}</td>
          </tr>
          <tr>
            <th>라디오, DMB 작동</th>
            <td>{data.functions.radio}</td>
            <td>{data.functions.radioRemark}</td>
          </tr>
          <tr>
            <th>블루투스 작동</th>
            <td>{data.functions.blueth}</td>
            <td>{data.functions.bluethRemark}</td>
          </tr>
          <tr>
            <th>헤드업 디스플레이 작동</th>
            <td>{data.functions.hud}</td>
            <td>{data.functions.hudRemark}</td>
          </tr>
          <tr>
            <th>뒷좌석 엔터테인먼트 작동</th>
            <td>{data.functions.backEnt}</td>
            <td>{data.functions.backEntRemark}</td>
          </tr>
          <tr>
            <th>실내,실외 개조 및 튜닝 확인</th>
            <td>{data.functions.tune}</td>
            <td>{data.functions.tuneRemark}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

AutobellDiagnosis.propTypes = {
  data: {
    carInfo: PropTypes.object,
    outside: PropTypes.object,
    inside: PropTypes.object,
    functions: PropTypes.object
  }
};

export default AutobellDiagnosis;
