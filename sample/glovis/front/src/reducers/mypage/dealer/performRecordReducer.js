import { produce } from 'immer';
import performRecordTypes from '@src/actions/mypage/dealer/performRecordTypes';

const initialPerfInspState = {
  // perfInspId, //성능 검사 번호
  // crNm, //차량명
  // crNo, //차량번호
  // crRlsPrc, //출고가격
  // crClcPrc, //산정가격
  // drvdistInsbrdStt, //주행거리/계기상태
  // drvDist, //주행거리
  // frmYyyy, //형식년도
  // inspVldty, //검사유효기간
  // frstRegDt, //최초등록일
  // mortorFrm, //원동기 형식
  // mssKnds, //변속기 종류
  // fuelDvcd, //연로 구분코드
  // vin, //차대번호
  // wrntTp, //보증 유형
  // samssCnfm, //동일성 확인
  // illglStrcChng, //불법구조 변경
  // tuningStrc1Yn, //구조
  // tuningStrc2Yn, //장치
  // mortorEvlDvcd, //원동기 평가 구분코드
  // acdtYn, //사고유무
  // fludYn, //침수유무
  // ehstGas1, //배출가스1
  // ehstGas2, //배출가스2
  // ehstGasMemo, //배출가스 메모
  // perfInsDt, //성능점검 일시
  // uniqChkrOpn, //특이사항 및 점검자 의견
  // sttChckr, //상태 점검자
  // sttNtc, //상태 점검 고지자
  // regDt, //등록 일시
  // rgstId, //등록자 ID
  // updDt, //수정 일시
  // updtId, //수정자 ID
  mainDevice: {
    // perfInspId, //성능 검사 번호
    //selfDnsMortor, //자가진단 원동기 (추가필)
    //selfDnsMss, // 자가진단 변속기 (추가필)
    //mortorWkStt, // 원동기 작동 상태
    //mortorCylHd, // 원동기 실린더 헤드    
    //mortorOilLkRocArmCov, //원동기 오일누유 로커암커버 (추가필)
    //mortorOilLkOilFan, //원동기 오일누유 오일팬 (추가필)
    //mortorOilLkageCylBlok, // 원동기 오일누유 실린더 블럭
    //mortorOilFlowRtCntm, // 원동기 오일유량 및 오염
    //mortorClngwtrLkCylBlok, // 원동기 냉각수 누수 실린더 블럭
    //mortorClngwtrLkCylhd, // 원동기 냉각수 누수 실린더헤드/가스켓
    //mortorClngwtrLkWtrpmp, // 원동기 냉각수 누수 워터펌프
    //mortorClngwtrLkRdar,   //원동기 냉각수 누수 라디에이터 (추가필)
    //mortorClngwtrLkClngwtrAmount,   //원동기 냉각수 누수 냉각수 수량 (추가필)
    //mortorClngwtrLkClnclr, // 원동기 냉각수 누수 냉각쿨러
    //mortorHighPressurePmp, // 원동기 고압펌프
    //mssAtTmOilLkage, // 변속기 자동변속기 오일누유
    //mssAtTmOilFlowRtStt, // 변속기 자동변속기 오일유량 및 상태
    //mssAtTmWkStt, // 변속기 자동변속기 작동상태
    //powerTransCltcAssem, // 동력전달 클러치 어셈블러
    //powerTransConsJoin, // 동력전달 등속조인트
    //powerTransPropellerBear, // 동력전달 추진측 및 베어링
    //powerSteerWkOilLkage, // 동력조항 작동 오일 누유
    //strgGear, // 스티어링 기어
    //wkSttStrgPmp, //  스티어링 펌프
    //wkSttTre, // 타이로드 앤드 및 볼죠인트
    //brkBrkeMstCylOilLk, // 마스터 실린더오일 누유 (추가필)   
    //brkBrkeOilFluxstt, // 브레으크 오일 유랭 상태
    //brkBrkeOilLkage, // 브레이크 오일 누유
    //brkBstStt, // 브레이크 배력장치 상태
    //eltGenOput, // 전기 발전기 출력
    //eltStrtMt, // 전기 시동 모터
    //eltGenOput1, // 전기 발전기 출력
    //eltWiperFlct, // 전기 와이퍼 기능
    //eltInsBlowMt, // 전기 실내 통풍 모터
    //eltRdarFanMt, // 전기 라디에이터 팬모터
    //etcFuelLkage, // 전기 연료 누출
    //etcWindMtWk, // 윈도우 모터 작동
    //rgstId, // 등록자ID
    //regDt, // 등록일
    //updtId, // 수정자ID
    //updDt, // 수정일
  },
  skinStt: {
    // perfInspId, //성능 검사 번호
    // hood, //후드
    // frontFenderLeft, //프론트 휀더 - 좌
    // frontFenderRight, //프론트 휀더 - 우
    // frontDoorLeft, //프론트 도어 - 좌
    // frontDoorRight, //프론트 도어 - 우
    // rearDoorLeft, //리어 도어 - 좌
    // rearDoorRight, //리어 도어 - 우
    // trunklid, //트렁크리드
    // rdarSpt, //라디에이터 서포트
    // roofPnst, //루프 패널
    // qrtrPnstLeft, //쿼터 패널 - 좌
    // qrtrPnstRight, //쿼터 패널 - 우
    // sideSealPnstLeft, //사이드 실 패널 - 좌
    // sideSealPnstRight, //사이드 실 패널 - 우
    // frtPnst, //프론트패널
    // crossMem, //크로스 멤버
    // insdPnstLeft, //인사이드 패널 - 좌
    // insdPnstRight, //인사이드 패널 - 우
    // frtSideMemLeft, //프론트 사이드 멤버 - 좌
    // frtSideMemRight, //프론트 사이드 멤버 - 우
    // rearSideMemLeft, //리어 사이드 멤버 - 좌
    // rearSideMemRight, //리어 사이드 멤버 - 우
    // frtWhlHouseLeft, //프론트 휠 하우스 - 좌
    // frtWhlHouseRight, //프론트 휠 하우스 - 우
    // rearWhlHouseLeft, //프론트 휠 하우스 - 좌
    // rearWhlHouseRight, //프론트 휠 하우스 - 우
    // frtDashPnst, //프론트 대쉬 패널
    // floorPnst, //플로어 패널
    // pilrPnstFrtLeft, //필라 패널 앞 - 좌
    // pilrPnstFrtRight, //필라 패널 앞 - 우
    // pilrPnstMedmLeft, //필라 패널 중간 - 좌
    // pilrPnstMedmRight, //필라 패널 중간 - 우
    // pilrPnstRearLeft, //필라 패널 뒤 - 좌
    // pilrPnstRearRight, //필라 패널 뒤 - 우
    // rearPnst, //리어 패널
    // trunkFloor, //트렁크 플로어
    // pckfgTray, //패키지 트레이
    // regDt, //등록 일시
    // rgstId, //등록자 ID
    // updDt, //수정 일시
    // updtId, //수정자 ID
  }
  // photoList: [],
  // phtNo, //사진번호
  // crId, //차량 ID
  // pstnDvcd, //위치 구분코드
  // phtTpcd, //사진 유형코드
  // phtUrl, //사진 URL
  // osrtNo, //정렬 번호
  // delephtYn, //대표사진 여부
  // fileSaveId, //파일 저장 ID
  // regDt, //등록 일시
  // rgstId, //등록자 ID
  // updDt, //수정 일시
  // updtId, //수정자 ID
};

export default function dealerProdReducer(store = initialPerfInspState, action) {
  switch (action.type) {
    case performRecordTypes.INIT_PERFOM_RECORD:
      return produce(store, (draft) => {
        const { record = { mainDevice: {}, skinStt: {} } } = action.payload;

        Object.keys(record).forEach((name) => {
          draft[name] = record[name];
        });
      });
    case performRecordTypes.INPUT_PROP:
      return produce(store, (draft) => {
        const { value, name } = action.payload;

        if (![name, value].some((item) => item === undefined)) {
          draft[name] = value;
        }
      });
    case performRecordTypes.INPUT_MAIN_DEVICE_PROP:
      return produce(store, (draft) => {
        const { value, name } = action.payload;

        if (![name, value].some((item) => item === undefined) && draft['mainDevice']) {
          draft['mainDevice'][name] = value;
        }
      });
    case performRecordTypes.INPUT_SKIN_PROP:
      return produce(store, (draft) => {
        const { value, name } = action.payload;

        if (![name, value].some((item) => item === undefined) && draft['skinStt']) {
          draft['skinStt'][name] = value;
        }
      });
    default:
      return store;
  }
}
