import skinSttSchema from '@lib/share/validator/mypage/dealer/skinStt';
import mainDeviceSchema from '@lib/share/validator/mypage/dealer/mainDevice';

export default {
  perfInspId : {
    type:'string',
    pattern: '[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+',
    maxLength:22,
    label:'성능검사번호',
    // required: true,
    // messages : {
    //   "any.required" : "성능검사번호를 입력해주세요",
    //   "string.base" : "성능검사번호를 입력해주세요",
    //   "string.pattern.base" : "올바른 성능검사번호를 입력해주세요."
    // },
  }, // 성능검사번호
  crNm : {}, // 차량명
  crNo : {}, // 차량번호
  vin : {
    format:'abcNum',
    label:'차대번호',
    maxLength:20,
  }, // 차대번호
  drvdistInsbrdStt : {type:"number"}, // 주행거리/계기상태
  frmYyyy : {}, // 형식년도
  inspStrtVldty : {label:'검사 유효 시작기간'}, // 검사 유효 시작기간
  inspEndVldty : {label:'검사 유효 종료기간'}, // 검사 유효 종료기간
  frstRegDt : {label:'최초등록일'}, // 최초등록일
  prsnDrvDist : {type : 'number'}, // 현재주행거리
  mortorFrm : {
    format:'abcNum',
    label:'원동기형식',
    maxLength: 8
  }, // 원동기형식
  mssKnds : {}, // 변속기종류
  fuelDvcd : {}, // 연료구분코드
  wrntTp : {}, // 보증유형
  samssCnfm : {}, // 동일성확인
  illglStrcChng : {type:"number"}, // 불법구조변경
  mortorEvlDvcd : {}, // 원동기평가구분코드
  acdtYn : {}, // 사고유무
  fludYn : {}, // 침수유무
  ehstGas1 : {
    format:'number', //숫자로 이뤄진 문자
    label:'일산화탄소',
  }, // 배출가스1
  ehstGas2 : {
    format:'number', //숫자로 이뤄진 문자
    label:'탄화수소',
  }, // 배출가스2
  ehstGasMemo : {}, // 배출가스메모
  perfInsDt : {}, // 성능점검일시
  uniqChkrOpn : {
    label:'특이사항 및 점검자의견'
  }, // 특이사항및점검자의견
  sttChckr : {label:'상태점검자'}, // 상태점검자
  sttNtc : {label:'상태고지자'}, // 상태고지자
  rgstId : {}, // 등록자ID
  regDt : {}, // 등록일
  updtId : {}, // 수정자ID
  updDt : {}, // 수정일
  acdtHstYn : {}, // 사고이력여부
  smplRprYn : {}, // 단순수리여부
  strcChngYn : {}, // 구조 변경 여부
  deviceChngYn : {}, // 장치 변경 여부
  rentChngYn : {}, // 렌트 여부
  leaseChngYn : {}, // 리스 여부
  commercialChngYn : {}, // 영업용 용도 여부
  clrType : {type:"number"}, // 색상 타입
  fullPaintYn : {}, // 전체 도색 여부
  clrChngYn : {}, // 색상 변경 여부
  optEtcYn : {}, // 옵션 기타 여부
  optSunroofYn : {}, // 옵션 선루프 여부
  optNavigationYn : {}, // 옵션 네비게이션 여부

  partsOutPanelFRankYn : {}, // 부위별 외판 부위 1랭크 이상 여부
  partsOutPanelSRankYn : {}, // 부위별 외판 부위 2랭크 이상 여부
  partsMainSkltYn : {}, // 부위별 주요 골격 이상 여부
  insShotPhtId1 : {}, // 점검 촬영 사진 ID1
  insShotPhtId2 : {}, // 점검 촬영 사진 ID2
  insShotPhtUrl1 : {}, // 점검 촬영 사진 URL1
  insShotPhtUrl2 : {}, // 점검 촬영 사진 URL2
  drvDistStt : {type:'number'},// 주행거리 상태
  vinSttCd : {},//차대번호표기 상태

  skinStt: {
    type: 'object',
    properties: skinSttSchema
  },
  mainDevice: {
    type: 'object',
    properties: mainDeviceSchema
  }
};
