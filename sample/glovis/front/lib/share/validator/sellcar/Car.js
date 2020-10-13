import CarPhotoSchema from '@lib/share/validator/sellcar/CarPhoto';
import CarOptionSchema from '@lib/share/validator/sellcar/CarOption';

export default {
  //빈객체 {} 로 넣으면 기본값으로 type:"string", required:false이 들어갑니다
  slReqId: {}, // 판매 신청
  crId: {}, // 차량 ID
  crTypeCdNm: {},
  regDt: {
    // type:'date',
    // format: 'YYYY-MM-DD HH:mm:ss'
  },
  rgstId: {},
  updDt: {
    // type: 'date',
    // format: 'YYYY-MM-DD HH:mm:ss'
  },
  updtId: {},
  perfInspId: {
    label:'성능검사번호',
  },
  crNo: {
    type: 'string',
    pattern: '[가-힣]*[0-9]+[가-힣][0-9]{4}',
    label: '차량번호'
    // required: true,
    // messages: {
    //   'string.base': '차량 번호가 필요합니다.',
    //   'string.pattern.base': '올바른 차량 번호를 입력해주세요(예 12가1234)'
    // }
  }, // 차량번호
  crTypeCd: {
    'label': '차종'
    // required: true,
    // messages: {
    //   'string.base': '차종을 선택하세요..'
    // }
  }, // 차종 코드
  crMnfcCd: {
    label: '제조사'
    // required: true,
    // messages: {
    //   'string.base': '제조사를 선택하세요.'
    // }
  }, // 차량 제조사 코드
  crMnfcCdNm: {}, //
  crMdlCd: {
    label: '차량 모델'
    // required: true,
    // messages: {
    //   'string.base': '모델을 선택하세요.'
    // }
  }, // 차량 모델 코드
  crMdlCdNm: {}, //
  crDtlMdlCd: {
    label: '차량 상세모델'
    // required: true,
    // messages: {
    //   'string.base': '상세 모델을 선택하세요.'
    // }
  }, // 차량 상세 모델 코드
  crDtlMdlCdNm: {}, //
  crClsCd: {
    label: '제원등급'
    // required: true,
    // messages: {
    //   'string.base': '제원등급 선택하세요.'
    // }
  }, // 차량 등급 코드
  crClsCdNm: {}, //
  crDtlClsCd: {
    label: '세부등급'
    // required: true,
    // messages: {
    //   'string.base': '세부등급 선택하세요.'
    // }
  }, // 차량 상세 등급 코드
  crDtlClsCdNm: {}, //
  crClrCd: {
    label: '색상'
    // required:true,
    // messages: {
    //   'string.base': '색상을 선택하세요.'
    // }
  }, // 차량 색상 코드
  crClrCdNm: {}, //
  crCmnt: {}, // 차량 설명
  crUseDvcd: {
    label: '용도'
    // required: true,
    // messages:{
    //   'string.base': '차량의 용도를 선택하세요.'
    // }
  }, // 차량 사용 구분코드
  crUseDvcdNm: {}, //
  crRlsPrc: {
    type: 'number',
    // required: true,
    minimum: 1,
    label: '출고가격'
    // messages: {
    //   'number.base': '출고가격을 입력해주세요',
    //   'number.min': '출고가격을 입력해주세요'
    // }
  }, // 차량 출고 가격
  dspl: {
    type: 'number',
    minimum: 330,
    label: '배기량'
    // required: true,
    // messages:{
    //   'number.base': '배기량을 입력해주세요.',
    //   'number.min': '배기량은 최소 330cc 이상입니다.'
    // }
  }, // 배기량
  frmYyyy: {
    type:'string',
    label: '형식년도'
    // required: true,
    // messages:{
    //   'string.base': '형식년도를 선택해주세요.'
    // }
  }, // 형식 년도
  frstRegDt: {    
    type:'string',
    label:'최초등록일'
  }, // 최초 등록 일시
  cho: {}, // ??
  phtUrl: {}, // ??
  fileSaveId: {}, // ??
  enginType: {}, // 엔진타입
  fuelDvcd: {
    label:'연료를 선택해주세요.'
    // required: true,
    // messages:{
    //   'date.base': '연료를 선택해주세요.'
    // }
  }, // 연료 구분코드
  fuelNm: {}, // 연료 텍스트
  drvDist: {
    type: 'number',
    minimum: 0,
    label:'주행거리'
  }, // 주행 거리
  mssDvcd: {
    label:'변속기'
  }, // 변속기 구분코드
  mssNm: {}, // 변속기 텍스트
  spExchYn: {
    label:'판금 교환 여부'
  }, // 판금 교환 여부
  spExchCntn: {}, // 판금 교환 내용
  addOptCntn: {}, // 추가 옵션 내용
  atbInspNo: {
    type: 'number'
  }, // NOTNULL;
  perfInspId: {
    label:'성능검사번호',
  },
  crMvUrl: {},
  szrMorCnt: {
    type: 'number'
  },
  enginType: {},
  dlrPrdId: {},
  crNm: {},
  crDoorCnt: {
    type: 'number'
  }, //차량 도어 수
  crTkcarPsncpa: {
    type: 'number'
  }, //차량 승차 정원
  holdRsn: {}, //보류 사유
  crDelRsn: {}, //보류 사유
  regRstnRsn: {}, //등록 제한 사유
  tmpSaveYn: {}, //임시 저장 여부
  seriesno: {}, //
  frstInsuRegDt: {
    // type:'date',
    // format: 'YYYY-MM-DD'
  },
  optionList: {
    type: 'array',
    items: CarOptionSchema
  }, // 옵션
  choiceOPTList: {
    type: 'array',
  }, // 옵션
  photoList: {
    type: 'array',
    items: CarPhotoSchema
  } // 사진 목록
};
