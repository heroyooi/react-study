export const REQ_TPCD = {
  VISIT: '00001',
  SELF: '00002',
  NONEVAL: '00003'
};

export const REQ_TPCD_NM = {
  VISIT: '방문평가',
  SELF: '셀프평가',
  NONEVAL: '무평가'
};

export const VISIT_STT = {
  VS001: '0002',
  VS002: 'VS002',
  VS003: 'VS003',
  VS004: 'VS004',
  VS101: 'VS101'
};

export const SELF_STT = {
  PUBLICTEMP: '0001', // '임시저장'
  PUBLICFORMCOMPLETE: '0002', // '신청완료'
  PUBLICCANCEL: '0003', // '취소'
  PUBLICFINAL: '0004', // '판매완료'
  SELFSALECHECKESTIMATES: '0010', // 낙찰가/견적확인
  SELFSALEDECIDEDTOSALE: '0011', // 판매결정
  SELFSALECONSIGNMENT: '0012', // 차량탁송/명의이전
  SELFSALECANCEL: '0013', // 판매취소
  SELFSALECOMPAREAPPROVE: '0014' // 승인
};

export const NONEVAL_STT = {
  PUBLIC_TEMP: '0001', // '차량정보등록'       '임시저장'
  PUBLIC_FORM_COMPLETE: '0002', // '신청완료'           '신청완료'
  PUBLIC_CANCEL: '0003', // '취소',
  PUBLIC_FINAL: '0004', // '판매완료'
  PUBLIC_ADMIN_CANCEL: '0005', // '관리자 취소'
  NONEVAL_CHECK_ESTIMATE: 'NS003', // '견적확인'
  NONEVAL_DECIDED_TO_SALE: 'NS004', // '판매결정'
  NONEVAL_CONSIGNMENT: 'NS005' // 차량탁송/명의이전'
};

export const HH24_AUCT_STT_DVCD = {
  APPROVED: '02', // 승인
  PROGRESSING: '03', // 진행
  END: '05', // 종료
  CANCEL: '04', // 취소
  SUCCEED_BIDDING: '06', // 낙찰
  FAILED_BIDDING: '07', // 유찰
  DENIED: '08' // 거절
};

export const HH24_STT = {
  BS01: 'BS01', // 신청
  BS02: 'BS02', // 승인
  BS03: 'BS03', // 진행
  BS04: 'BS04', // 취소
  BS05: 'BS05', // 종료
  BS06: 'BS06', // 낙찰
  BS07: 'BS07' // 유찰
};

export const carUsages = [
  {
    value: '1',
    label: '일반'
  },
  {
    value: '2',
    label: '렌트'
  }
];

export const frmYyyyList = [
  { id: '2021', name: '2021' },
  { id: '2020', name: '2020' },
  { id: '2019', name: '2019' },
  { id: '2018', name: '2018' },
  { id: '2017', name: '2017' },
  { id: '2016', name: '2016' },
  { id: '2015', name: '2015' },
  { id: '2014', name: '2014' },
  { id: '2013', name: '2013' },
  { id: '2012', name: '2012' },
  { id: '2011', name: '2011' },
  { id: '2010', name: '2010' },
  { id: '2009', name: '2009' },
  { id: '2008', name: '2008' },
  { id: '2007', name: '2007' },
  { id: '2006', name: '2006' },
  { id: '2005', name: '2005' },
  { id: '2004', name: '2004' },
  { id: '2003', name: '2003' },
  { id: '2002', name: '2002' },
  { id: '2001', name: '2001' },
  { id: '2000', name: '2000' },
  { id: '1999', name: '1999' },
  { id: '1998', name: '1998' },
  { id: '1997', name: '1997' },
  { id: '1996', name: '1996' },
  { id: '1995', name: '1995' },
  { id: '1994', name: '1994' }
];

export const REQ_STT = {
  '00001': {
    NAME: '방문평가',
    STATE: {
      '0002': {
        NAME: '신청완료',
        STEPNO: 1
      },
      VS002: {
        NAME: '평가사배정',
        STEPNO: 2
      },
      VS003: {
        NAME: '방문및견적안내',
        STEPNO: 3
      },
      VS004: {
        NAME: '견적완료 및 판매결정',
        STEPNO: 4
      },
      '0003': {
        NAME: '취소',
        STEPNO: 0
      }
    }
  },
  '00002': {
    NAME: '셀프평가',
    STATE: {
      '0001': {
        NAME: '차량정보등록',
        STEPNO: 1
      },
      '0002': {
        NAME: '신청완료',
        STEPNO: 2
      },
      SS003: {
        NAME: '비교견적진행중',
        STEPNO: 3
      },
      SS004: {
        NAME: '비교견적완료',
        STEPNO: 4
      },
      SS005: {
        NAME: '차량탁송/명의이전',
        STEPNO: 5
      },
      '0004': {
        NAME: '거래완료',
        STEPNO: 5
      },
      '0003': {
        NAME: '취소',
        STEPNO: 0
      }
    }
  },
  '00003': {
    NAME: '무평가',
    STATE: {
      '0001': {
        NAME: '차량정보등록',
        STEPNO: 1
      },
      '0002': {
        NAME: '신청완료',
        STEPNO: 2
      },
      NS002: {
        NAME: '예상견적확인',
        STEPNO: 3
      },
      NS003: {
        NAME: '차량상태점검',
        STEPNO: 4
      },
      NS005: {
        NAME: '견적완료 및 판매결정',
        STEPNO: 5
      },
      NS006: {
        NAME: '견적완료 및 판매결정',
        STEPNO: 6
      },
      '0003': {
        NAME: '취소',
        STEPNO: 0
      }
    }
  }
};
