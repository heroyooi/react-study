const entryQuestionMobileSchema = {
  prtnDvcd: {
    type: 'string',
    label: '인증몰 제휴 구분 코드'
  },
  cmpnNm: {
    type: 'string',
    label: '회사명',
    maxLength: 16
  },
  charger: {
    type: 'string',
    label: '담당자명',
    maxLength: 33
  },
  pn: {
    type: 'string',
    label: '전화번호',
    maxLength: 13
  },
  emlAddr: {
    type: 'string',
    format: 'email',
    label: '이메일주소',
    maxLength: 50
  },
  quesCntn: {
    type: 'string',
    label: '문의내용',
    maxLength: 400
  }
};

export default entryQuestionMobileSchema;
