const changeAddress = {
  hsvcId: {
    // VARCHAR(36) 홈서비스ID
    // required: true,
    type: 'string',
    label: '홈서비스ID'
  },
  reciNm: {
    // VARCHAR(20) 수령인명
    // required: true,
    type: 'string', //"string", "number", "boolean", "date", "array", "object", //type 미작성시 기본값 "string"
    label: '수령인명',

    maxLength: 6
  },
  zcd: {
    // CHAR(18) 우편번호
    // required: true,
    type: 'string',
    label: '우편번호',
    pattern: '[0-9]',
    maxLength: 18
  },
  addr1: {
    // VARCHAR(250) 주소1
    // required: true,
    type: 'string',
    label: '주소1',
    maxLength: 83
  },
  addr2: {
    // VARCHAR(250) 주소2
    // required: true,
    type: 'string',
    label: '주소2',
    maxLength: 83
  },
  pn1: {
    // VARCHAR(15) 전화번호
    // required: true,
    type: 'string',
    label: '전화번호',
    pattern: '[0-9]'
  },
  pn2: {
    // VARCHAR(15) 전화번호
    // required: true,
    type: 'string',
    label: '전화번호',
    pattern: '[0-9]',
    minLength: 3,
    maxLength: 4
  },
  pn3: {
    // VARCHAR(15) 전화번호
    // required: true,
    type: 'string',
    label: '전화번호',
    pattern: '[0-9]',
    minLength: 4,
    maxLength: 4
  },
  locCd: {
    // VARCHAR(3) 지역코드
    // required: true,
    type: 'string',
    label: '지역코드',
    pattern: '[0-9]',
    maxLength: 4
  },
  ctyCd: {
    // VARCHAR(2) 도시코드
    // required: true,
    type: 'string',
    label: '도시코드',
    pattern: '[0-9]',
    maxLength: 6
  },
  certNum1: {
    // 입력한 인증번호
    // required: true,
    type: 'string',
    label: '인증번호',
    pattern: '[0-9]'
  }
};
//type, format, required, min, max, pattern, chidlren, props, messages, 순서로 선언해야합니다.
//기타 type은 joi 공식문서와 sample코드를 참고하세요

export default changeAddress;
