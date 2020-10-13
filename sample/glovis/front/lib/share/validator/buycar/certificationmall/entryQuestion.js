const entryQuestionSchema = {
  prtnDvcd: {
    // VARCHAR(8) 인증몰 제휴 구분 코드
    // required: true,
    type: 'string',
    label: '인증몰 제휴 구분 코드'
  },
  cmpnNm: {
    // VARCHAR(50) 회사명
    // required: true,
    type: 'string',
    label: '회사명',
    maxLength: 16
  },
  charger: {
    // VARCHAR(100) 담당자명
    // required: true,
    type: 'string', //"string", "number", "boolean", "date", "array", "object", //type 미작성시 기본값 "string"
    label: '담당자명',
    maxLength: 33
  },
  pn1: {
    // VARCHAR(15) 전화번호
    // required: true,
    type: 'string',
    label: '전화번호',
    pattern: '[0-9]', //정규식으로 체크하고 싶을 경우 type을 string으로 하고 pattern을 추가
    maxLength: 3
  },
  pn2: {
    // VARCHAR(15) 전화번호
    // required: true,
    type: 'string',
    label: '전화번호',
    pattern: '[0-9]', //정규식으로 체크하고 싶을 경우 type을 string으로 하고 pattern을 추가
    maxLength: 4
  },
  pn3: {
    // VARCHAR(15) 전화번호
    // required: true,
    type: 'string',
    label: '전화번호',
    pattern: '[0-9]', //정규식으로 체크하고 싶을 경우 type을 string으로 하고 pattern을 추가
    maxLength: 4
  },
  emlAddr1: {
    // VARCHAR(50) 이메일주소
    // required: true,
    type: 'string',
    label: '이메일주소',
    pattern: '^[A-Za-z0-9_.-]', //정규식으로 체크하고 싶을 경우 type을 string으로 하고 pattern을 추가
    maxLength: 24
  },
  emlAddr2: {
    // VARCHAR(50) 이메일주소
    // required: true,
    type: 'string',
    label: '이메일주소',
    pattern: '[A-Za-z0-9-]+.[A-Za-z0-9-]+', //정규식으로 체크하고 싶을 경우 type을 string으로 하고 pattern을 추가
    maxLength: 24
  },
  quesCntn: {
    // VARCHAR(2000) 문의내용
    // required: true,
    type: 'string',
    label: '문의내용',
    maxLength: 400
  }
  // birthDate : {
  //     type : "date",
  //     format : "YYYY-MM-DD" //type이 date일 경우 format 프로퍼티도 같이 입력. 미 입력시 기본 YYYYMMDD
  // },
  // age: {
  //     type : "number",
  //     min : 20, //number type의 경우 글자수가 아니라 최소숫자를 뜻합니다
  //     max : 45, //20~45 숫자 통과. 4자리 정수를 나타내고 싶을경우 9999를 입력합니다
  //     messages : {
  //         "number.min" : "최소숫자 보다 낮을 경우 출력할 에러 메세지",
  //         "number.max" : "최대숫자 보다 높을 경우 출력할 에러 메세지",
  //     }
  // }
};
//type, format, required, min, max, pattern, chidlren, props, messages, 순서로 선언해야합니다.
//기타 type은 joi 공식문서와 sample코드를 참고하세요

export default entryQuestionSchema;
