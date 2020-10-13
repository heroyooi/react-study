export default {
  perfInspId : {
    type:'string',
    pattern: '[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+',
    label:'성능검사번호',
    maxLength:22,
  }, // 성능검사번호
  selfDnsMortor : {type:'number'}, //자가진단 원동기 (추가필)
  selfDnsMss : {type:'number'}, // 자가진단 변속기 (추가필)
  mortorWkStt : {type:'number'}, // 원동기 작동 상태
  mortorCylHd : {type:'number'}, // 원동기 실린더 헤드    
  mortorOilLkRocArmCov : {type:'number'}, //원동기 오일누유 로커암커버 (추가필)
  mortorOilLkOilFan : {type:'number'}, //원동기 오일누유 오일팬 (추가필)
  mortorOilLkageCylBlok : {type:'number'}, // 원동기 오일누유 실린더 블럭
  mortorOilFlowRtCntm : {type:'number'}, // 원동기 오일유량 및 오염
  mortorClngwtrLkCylBlok : {type:'number'}, // 원동기 냉각수 누수 실린더 블럭
  mortorClngwtrLkCylhd : {type:'number'}, // 원동기 냉각수 누수 실린더헤드/가스켓
  mortorClngwtrLkWtrpmp : {type:'number'}, // 원동기 냉각수 누수 워터펌프
  mortorClngwtrLkRdar : {type:'number'},   //원동기 냉각수 누수 라디에이터 (추가필)
  mortorClngwtrLkClngwtrAmount : {type:'number'},   //원동기 냉각수 누수 냉각수 수량 (추가필)
  mortorClngwtrLkClnclr : {type:'number'}, // 원동기 냉각수 누수 냉각쿨러
  mortorHighPressurePmp : {type:'number'}, // 원동기 고압펌프
  mssAtTmOilLkage : {type:'number'}, // 변속기 자동변속기 오일누유
  mssAtTmOilFlowRtStt : {type:'number'}, // 변속기 자동변속기 오일유량 및 상태
  mssAtTmWkStt : {type:'number'}, // 변속기 자동변속기 작동상태
  powerTransCltcAssem : {type:'number'}, // 동력전달 클러치 어셈블러
  powerTransConsJoin : {type:'number'}, // 동력전달 등속조인트
  powerTransPropellerBear : {type:'number'}, // 동력전달 추진측 및 베어링
  powerSteerWkOilLkage : {type:'number'}, // 동력조항 작동 오일 누유
  strgGear : {type:'number'}, // 스티어링 기어
  wkSttStrgPmp : {type:'number'}, //  스티어링 펌프
  wkSttTre : {type:'number'}, // 타이로드 앤드 및 볼죠인트
  brkBrkeMstCylOilLk : {type:'number'}, // 브레이크 마스터 실린더오일 누유 (추가필)   
  brkBrkeOilFluxstt : {type:'number'}, // 브레이크 오일 유랭 상태
  brkBrkeOilLkage : {type:'number'}, // 브레이크 오일 누유
  brkBstStt : {type:'number'}, // 브레이크 배력장치 상태
  eltGenOput : {type:'number'}, // 전기 발전기 출력
  eltStrtMt : {type:'number'}, // 전기 시동 모터
  eltGenOput1 : {type:'number'}, // 전기 발전기 출력
  eltWiperFlct : {type:'number'}, // 전기 와이퍼 기능
  eltInsBlowMt : {type:'number'}, // 전기 실내 통풍 모터
  eltRdarFanMt : {type:'number'}, // 전기 라디에이터 팬모터
  eltWindMtWk : {type:'number'}, // 전기윈도우 모터 작동
  etcFuelLkage : {type:'number'}, // 연료 누출
  mortorClngwtrRdar : {type:'number'}, //원동기 냉각수 누수 라디에이터
  regDt: {
    format: 'dateTime'
  }, //등록 일시
  rgstId: {}, //등록자 ID
  updDt: {
    format: 'dateTime'
  }, //수정 일시
  updtId: {} //수정자 ID
};
