/* 제조사 */
export const carMnfcCdList = [
  { value: '1', label: '현대' },
  { value: '2', label: '제네시스' },
  { value: '3', label: '기아' },
  { value: '4', label: '쉐보레' },
  { value: '5', label: '르노삼성' },
  { value: '6', label: '쌍용' },
  { value: '7', label: '기타 제조사' },
  { value: '8', label: '벤츠' },
  { value: '9', label: 'BMW' },
  { value: '10', label: '아우디' },
  { value: '11', label: '폭스바겐' },
  { value: '12', label: '미니' },
  { value: '13', label: '랜드로버' },
  { value: '14', label: '렉서스' },
  { value: '15', label: '포드' },
  { value: '16', label: '포르쉐' },
  { value: '17', label: '재규어' },
  { value: '18', label: '지프' },
  { value: '19', label: '인피니티' },
  { value: '20', label: '푸조' },
  { value: '21', label: '볼보' },
  { value: '22', label: '도요타' },
  { value: '23', label: '마세라티' },
  { value: '24', label: '혼다' },
  { value: '25', label: '닛산' },
  { value: '26', label: '케딜락' }
];

/* 차급 */
export const carGradeList = [
  {
    mnfc: '1',
    children: [
      { value: '1', label: '경차' },
      { value: '2', label: '소형' },
      { value: '3', label: '준중형' },
      { value: '4', label: '중형' },
      { value: '5', label: '대형' },
      { value: '6', label: '스포츠/쿠페' },
      { value: '7', label: 'SUV' },
      { value: '8', label: 'RV/짚' },
      { value: '9', label: '승합/밴' },
      { value: '10', label: '트럭/화물' },
      { value: '11', label: '버스' },
      /* { value: "12", label: "CUV" }, */
      { value: '13', label: '기타' }
    ]
  },
  {
    mnfc: '2',
    children: [
      { value: '4', label: '중형' },
      { value: '5', label: '대형' }
    ]
  },
  {
    mnfc: '3',
    children: [
      { value: '1', label: '경차' },
      { value: '2', label: '소형' },
      { value: '3', label: '준중형' },
      { value: '4', label: '중형' },
      { value: '5', label: '대형' },
      { value: '6', label: '스포츠/쿠페' },
      { value: '7', label: 'SUV' },
      { value: '8', label: 'RV/짚' },
      { value: '9', label: '승합/밴' },
      { value: '10', label: '트럭/화물' },
      { value: '11', label: '버스' },
      { value: '12', label: 'CUV' }
    ]
  },
  {
    mnfc: '4',
    children: [
      { value: '1', label: '경차' },
      { value: '2', label: '소형' },
      { value: '3', label: '준중형' },
      { value: '4', label: '중형' },
      { value: '5', label: '대형' },
      { value: '6', label: '스포츠/쿠페' },
      { value: '7', label: 'SUV' },
      { value: '8', label: 'RV/짚' },
      { value: '9', label: '승합/밴' },
      { value: '10', label: '트럭/화물' },
      { value: '11', label: '버스' }
    ]
  },
  {
    mnfc: '5',
    children: [
      { value: '1', label: '경차' },
      { value: '2', label: '소형' },
      { value: '3', label: '준중형' },
      { value: '4', label: '중형' },
      { value: '5', label: '대형' },
      { value: '7', label: 'SUV' },
      { value: '10', label: '트럭/화물' }
    ]
  }
];

/* 차종(모델) */
export const carModelList = [
  {
    mnfc: '1',
    grade: '1',
    children: [
      { value: '1', label: '블루온' },
      { value: '2', label: '아토스' }
    ]
  }
];

/* 세부모델 */
export const carDtlModelList = [
  {
    mnfc: '1',
    grade: '1',
    model: '1',
    children: [{ value: '1', label: '블루온' }]
  },
  {
    mnfc: '1',
    grade: '1',
    model: '2',
    children: [{ value: '1', label: '아토스' }]
  }
];

/* 세부 등급 */
export const carClsList = [];

/* 세부 등급 */
export const carDtlClsList = [];

/* 연식 */
export const carFrmYyyyList = [
  { value: '', label: '전체' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
  { value: '2014', label: '2014' },
  { value: '2013', label: '2013' },
  { value: '2012', label: '2012' },
  { value: '2011', label: '2011' },
  { value: '2010', label: '2010' },
  { value: '2009', label: '2009' },
  { value: '2008', label: '2008' },
  { value: '2007', label: '2007' },
  { value: '2006', label: '2006' },
  { value: '2005', label: '2005' },
  { value: '2004', label: '2004' },
  { value: '2003', label: '2003' },
  { value: '2002', label: '2002' },
  { value: '2001', label: '2001' },
  { value: '2000', label: '2000' },
  { value: '1999', label: '1999' },
  { value: '1998', label: '1998' },
  { value: '1997', label: '1997' },
  { value: '1996', label: '1996' },
  { value: '1995', label: '1995' },
  { value: '1994', label: '1994' },
  { value: '1993', label: '1993' },
];

/* 미션 */
export const carMssList = [
  { value: '01', label: '수동' },
  { value: '02', label: '오토' },
  { value: '03', label: '세미오토' },
  { value: '04', label: 'CVT' },
];


/* 연료 */
export const carFuelList = [
  { value: '01', label: '가솔린' },
  { value: '02', label: '디젤' },
  { value: '03', label: 'LPG' },
  { value: '04', label: '겸용' },
  { value: '05', label: 'Hybrid' },
  { value: '06', label: 'CNG' },
  { value: '07', label: '전기' },
  { value: '08', label: '수소' },
];

/* 보증유형 */
export const carWrntTpOptions = [
  { value: '1', label: '자가보증' },
  { value: '2', label: '보험사보증' },
]


/* 사용용도 */
/* id 설정이 없는 예전 코드들. 몇몇 UTIL 에서 오류가 발생. ID 추가 */
export const carUseDvcdList = [
  { id: '0010', value: '0010', label: '일반' },
  { id: '0020', value: '0020', label: '영업' }
];

/* 대기차량 */
export const waitingCarList =[
  {value: "01", label:"경매낙찰차량"},
  {value: "02", label:"등록진행중"},
  {value: "03", label:"Live Studio"},
  {value: "04", label:"Live Shot"},
  {value: "05", label:"받은차량"},
  {value: "06", label:"프렌차이즈"},
]

