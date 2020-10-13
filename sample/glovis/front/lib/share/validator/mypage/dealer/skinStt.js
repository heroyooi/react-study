export default {
  perfInspId : {
    type:'string',
    pattern: '[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+',
    label:'성능검사번호',
    maxLength:22,
  }, // 성능검사번호
  hood : {type:'number'}, // 후드
  frontFenderLeft : {type:'number'}, // 프론트 휀더 - 좌
  frontFenderRight : {type:'number'}, // 프론트 휀더 - 우
  frontDoorLeft : {type:'number'}, // 프론트 도어 - 좌
  frontDoorRight : {type:'number'}, // 프론트 도어 - 우
  rearDoorLeft : {type:'number'}, // 리어 도어 - 좌
  rearDoorRight : {type:'number'}, // 리어 도어 - 우
  trunklid : {type:'number'}, // 트렁크리드
  rdarSpt : {type:'number'}, // 라디에이터서포트
  roofPnst : {type:'number'}, // 루프 패널
  qrtrPnstLeft : {type:'number'}, // 쿼터 패널 - 좌
  qrtrPnstRight : {type:'number'}, // 쿼터 패널 - 우
  sideSealPnstLeft : {type:'number'}, // 사이드 실 패널 - 좌
  sideSealPnstRight : {type:'number'}, // 사이드 실 패널 - 우
  frtPnst : {type:'number'}, // 프론트패널
  crossMem : {type:'number'}, // 크로스멤버
  insdPnstLeft : {type:'number'}, // 인사이드 패널 - 좌
  insdPnstRight : {type:'number'}, // 인사이드 패널 - 우
  frtSideMemLeft : {type:'number'}, // 프론트 사이드 멤버 - 좌
  frtSideMemRight : {type:'number'}, // 프론트 사이드 멤버 - 우
  rearSideMemLeft : {type:'number'}, // 리어 사이드 멤버 - 좌
  rearSideMemRight : {type:'number'}, // 리어 사이드 멤버 - 우
  frtWhlHouseRight : {type:'number'}, // 프론트 휠 하우스 - 좌
  frtWhlHouseLeft : {type:'number'}, // 프론트 휠 하우스 - 우
  dashPnst : {type:'number'}, // 대쉬 패널
  floorPnst : {type:'number'}, // 플로어 패널
  pilrPnstFrtLeft : {type:'number'}, // 필라 패널 앞 - 좌
  pilrPnstFrtRight : {type:'number'}, // 필라 패널 앞 - 우
  pilrPnstMedmLeft : {type:'number'}, // 필라 패널 중간 - 좌
  pilrPnstMedmRight : {type:'number'}, // 필라 패널 중간 - 우
  pilrPnstRearLeft : {type:'number'}, // 필라 패널 뒤 - 좌
  pilrPnstRearRight : {type:'number'}, // 필라 패널 뒤 - 우
  rearPnst : {type:'number'}, // 리어패널
  trunkFloor : {type:'number'}, // 트렁크 플로어
  pckgTray : {type:'number'}, // 패키지 트레이
  rearWhlHouseLeft : {type:'number'}, //리얼 휠하우스 레프트
  rearWhlHouseRight : {type:'number'}, //리얼 휠하우스 라이트
  regDt: {
    format: 'dateTime',
  }, //등록 일시
  rgstId: {}, //등록자 ID
  updDt: {
    format: 'dateTime',
  }, //수정 일시
  updtId: {} //수정자 ID
};
