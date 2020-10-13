import { produce } from 'immer';
import { types } from '@src/actions/buycar/buyCarDetailActions';

const initialState = {
  /**====================================================
   * 차량상세 상단 기본 정보 : carInfo
   * URL: GET /api/buycar/selectProductDetailCarInfo.do
   * PARAM: dlrPrdId
   *  */
  carInfo: {
    dlrMbId: '', // 딜러회원 아이디
    mnfcNm: '', //'현대',   제조사명
    mdlNm: '', //'그랜저IG 하이브리드', 모델명
    clsNm: '', //'3.5 S',   세부등급명
    slAmt: 0, //4000,       판매금액
    auctGoodno: '', // '1912A1417' 경매장 번호
    lvstdYn: 'N', //'Y',    라이브스튜디오 여부
    lvshotYn: 'N', //'Y', 라이브샷 여부
    auctSbidYn: 'N', //'Y', 경매낙찰 여부
    hsvcYn: 'N', //'Y',     홈서비스 여부
    ewYn: 'N', //'Y',       EW 상품 여부
    frnchsYn: 'N', //'Y',   프랜차이즈 여부
    impMallYn: 'N', //'Y',  수입인증 여부
    capMallYn: 'N', //'N',  금융인증 여부
    itrtProdYn: 'N', //'Y', 관심상품 등록여부
    itrtProdCnt: 0, //'3',  관심상품 등록수
    inqCnt: 0, //'6' 조회수
    locNm: '', // 서울       판매지역(단축)
    crId: '',
    crNm: ''
  },

  carBaseOptionInfo: {
    /**====================================================
     * 차량상세 기본정보: carBaseInfo
     * service.selectProductDetailCarBaseInfo.do <== /api/buycar/selectProductDetailCarOption.do 의 서비스에서 호출
     * PARAM: dlrPrdId
     *  */
    carBaseInfo: {
      carNo: null, // 차량번호
      crTypeNm: null, //  차종명
      crClrNm: null, // 색상명
      dspl: 0, //  배기량
      drvDist: 0, // 주행거리
      frstRegDt: null, //  최초등록일 (YYYY"년" MM"월")
      frstRegDt2: null, //  최초등록일2 (YYYYMMDD)
      frmYyyy: null, // 카마트 연식
      fuelNm: null, //  연료명
      mssNm: null, // 변속기종류명
      szrMorYn: null, // 압류/저당 유무 (Y/N)
      acdtYn: null, // 사고 유무 (Y/N)
      perfInspNo: null, //  성능점검번호
      atbInspNo: null, //  오토벨 검사 번호
      crTkcarPsncpa: 0, //  차량 승차 정원
      crMaxton: 0, // 차량적재용량
      crRlsPrc: null, // 출고 가격
      crMnfcCd: null, // 제조사 코드
      crMdlCd: null, //  모델 코드
      crDtlMdlCd: null, //  상세모델 코드
      crDtlClsCd: null, // 상세등급 코드
      crClsCd: null, //  등급 코드
      dlrPrdId: null, //  딜러 상품 ID
      crPrsnNum: 0, //  제시번호
      crNm: null, //  차량 전체 이름
      phtUrl: null, //   대표이미지url
      minPrice: null, // 최소가격
      appPrice: null, // 적정가격
      maxPrice: null //  최대가격
    },

    /**====================================================
     * 차량상세 옵션정보 : carOption
     * URL: GET /api/buycar/selectProductDetailCarOption.do
     * PARAM: dlrPrdId
     *  */
    carOption: [
      {
        crId: '', //'CCCCCC1',
        dlrPrdId: '', //'PPPPPP1',
        optCd: '', //null,
        optNm: '', //'LED',
        optDesc: '', //null,
        optCmnt: '', //null,
        optImgUrl: '', //'/images/contents/car-option-img-01.png',
        optDiv: 'D', //기본옵션:D, 추가옵션:A,
        addOptYn: 'N', //'Y',
        iconClass: '', //
        cat1Seq: 0, //'2',
        cat1Nm: '', //'외장',
        cat2Seq: 0, //'2',
        cat2Nm: '', //'헤드램프',
        cat3Seq: 0, //'6',
        cat3Nm: '' //'LED'
      }
    ]
  },

  /**====================================================
   * 차량상세 설명 [KeyPoint, History, 진단소견, 기타] : carContent
   * URL: GET /api/buycar/selectProductDetailCarContent.do
   * PARAM: dlrPrdId
   *  */
  carContent: {
    dlrPrdId: '', //'PPPPPP1',
    crMvUrl: '', //차량 동영상,
    kpntYn: 'N', //'Y',
    kpntCntn: '', //'<p>키포인트 내용용죽겠지</p>',
    scrcYn: 'N', //'Y',
    scrcCntn: '', //'<p>흠집 내용용죽겠지</p>',
    hstYn: 'N', //'Y',
    hstCntn: '', //'<p>이력 내용용죽겠지</p>',
    opnYn: 'N', //'Y',
    opnCntn: '', //'<p>소견 내용용죽겠지</p>',
    etcYn: 'N', //'Y',
    etcCntn: '', //'<p>기타 내용용죽겠지</p>',
    photos: [
      {
        dlrPrdId: '',
        pstnDvcd: '',
        phtUrl: ''
      }
    ]
  },

  /**====================================================
   * 차량상세 시세정보 : marketPrice
   * URL: GET /api/buycar/
   * PARAM: dlrPrdId
   *  */
  marketPrice: {
    minPrice: 0, //10000,
    maxPrice: 0, //40000,
    rangeMin: 0, //20000,
    rangeMax: 0, //30000,
    appPrice: 0 //25000
  },

  /**====================================================
   * 차량상세 이미지목록 : carPhotos
   * URL: GET /api/buycar/selectProductDetailCarPhoto.do
   * PARAM: dlrPrdId
   *  */
  carPhotos: [
    {
      phtTpcd: '', // 사진유형
      delephtYn: 'N', // 대표사진여부
      phtUrl: '', // 사진URL
      bImg: '', // 큰 사진URL
      bAlt: '', // 큰 사진 대체문구
      sImg: '', // 작은 사진URL
      sAlt: '', // 작은 사진 대체문구
      options: [] // {color:'red', value:'라이브'}
    }
  ],

  /**====================================================
   * 차량상세 딜러정보
   * URL: GET /api/api/buycar/searchSellerInformation.do
   * PARAM: dlrPrdId
   *  */
  dealerInfo: {
    dlrId: '', //           딜러ID
    dlrNm: '', //           딜러명
    dlrHpPnEnc: '', //      딜러핸드폰번호
    omcTelNo: '', //        해당차량 오마이콜 번호
    dlrEn: '', //           딜러 종사원번호
    dlrEntrCorpNm: '', //   딜러 판매지점명
    dlrProfFileUrl: '/images/contents/dealer-basic-img-mid.png', //  딜러프로필파일 URL
    dlrStrPn: '', //        딜러 판매점 전화번호
    dlrStrFaxno: '', //     딜러 판매점 팩스번호
    dlrStrAddr: '', //      딜러 판매점 주소
    dlrStrSlHmCntn: '', //  딜러 판매점 영업시간 안내
    onSaleCarCnt: 0, //     판매중 차량 수
    cmplSaleCarCnt: 0, //   판매완료 차량 수
    cmpl12MonthSaleCarCnt: 0 // 최근 12개월내 판매완료 차량 수
  },

  /** ====================================================
   * 차량상세 경매장 정보 : auctionInfo
   * URL: GET /api/buycar/selectProductDetailAuctionInfo.do
   * PARAM: auctGoodno
   *  */
  auctionInfo: {
    auctInfo: {
      auctroomcd: '', //'1100',
      auctnm: '', //'현대글로비스(주)오토벨분당센터',
      auctcorp: '', //(주)한라자동차
      auctdt: '', //'20191224'
      auctno: '', //970
      goodno: '' //'1912A1417', 경매장상품코드 ==> DLR_PRD_MST.AUCT_GOODNO 와 동일
    },
    auctPht: []
  },

  /** ====================================================
   * TODO: 테스트 완료 후 샘플데이터 삭제
   * 차량상세 보험(사고)이력 정보 : carAccident
   * URL: POST /api/autobell/sitemanagement/carHistory/carHistoryView.do
   * PARAM: {crNo: "12가1234"}
   *  */
  carAccident: {
    firstRegistrationDate: '-',
    carFloodingTotalLess: '',
    recentCheckHistoryDate: '',
    code: '',
    color: '',
    myCarAccidentPay: '',
    officeUse: '',
    fuel: '',
    fuelType1: '',
    factoryPrice: '',
    carYear: '',
    ownerChange: '',
    notJoinDate: '',
    carModelDetail: '',
    carNumberChangeNo: '',
    carType: '',
    carTypeNo: 0,
    carVender: '',
    carGrade: '',
    displacement: '',
    carTotalLess: '',
    carNumberChangeDate: '',
    mileage: '',
    carTheft: '',
    yourCarAccidentPay: '',
    salesUse: '',
    carBodyShape: '',
    carNumber: '',
    carNumberChangePlug: '',
    yourCarAccident: '',
    firstInsJoinDate: '',
    myCarAccident: '',
    carPlug: '',
    rentalUse: '',
    carNumberChange: '',
    carModel: '',
    ownerChangeDate: '',
    damageList: [
      // {
      //   accType: '1',
      //   carBenefits1: '지급보험금 : 10,672,000원',
      //   carBenefits2: '-',
      //   carBenefits3: '-',
      //   damageDate: '20140829'
      // }
    ],
    status: ''
  },
  performance: {}, //항목이 너무 길어서 생략 : InspectionRecordVO
  autobellIns: {} //항목이 너무 길어서 생략 : AutobellInspectionRecordVO
};

/**
 * 설명 : 내차사기 > 차량 상세 조회
 * @author 한관영
 * @param {String} action.type
 * @param {Object?} action.payload
 * @returns {map} state 차량 상세 정보를 store에 보관
 */
export default function buyCarDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CAR_INFO: {
      return produce(state, (draft) => {
        draft.carInfo = action.payload.carInfo;
        draft.carPhotos = action.payload.carPhotos;
      });
    }
    case types.FETCH_CAR_BASE_OPTION_INFO: {
      return produce(state, (draft) => {
        draft.carBaseOptionInfo = action.payload;
      });
    }
    case types.FETCH_CAR_CONTENT: {
      return produce(state, (draft) => {
        draft.carContent = action.payload;
      });
    }
    case types.FETCH_MARKET_PRICE: {
      return produce(state, (draft) => {
        draft.marketPrice = action.payload;
      });
    }
    case types.FETCH_DEALER_INFO: {
      return produce(state, (draft) => {
        draft.dealerInfo = action.payload;
      });
    }
    case types.FETCH_AUCTION_INFO: {
      return produce(state, (draft) => {
        draft.auctionInfo = action.payload;
      });
    }
    case types.FETCH_CAR_ACCIDENT: {
      return produce(state, (draft) => {
        draft.carAccident = action.payload;
      });
    }
    case types.FETCH_CAR_PERFORMANCE: {
      return produce(state, (draft) => {
        draft.performance = action.payload;
      });
    }
    case types.FETCH_CAR_AUTOBELL_INS: {
      return produce(state, (draft) => {
        draft.autobellIns = action.payload;
      });
    }
    case types.FETCH_DETAIL_BANNER_INFO: {
      return produce(state, (draft) => {
        // const name = 'AM054' + action.payload.banGbnCd;
        draft.detailBannerInfo = action.payload;
        // console.log('FETCH_DETAIL_BANNER_INFO> [payload]=%o', action.payload);
        // console.log('### 차량상세 배너 데이터 ### ', action?.payload?.data);
        // if (action.payload.data.statusinfo.returncd === 'SUCCESS') {
        //   if (!action?.payload?.data) return console.log('### 차량상세 배너 데이터가 없습니다.');
        //   const name = 'AM054' + action.payload.data.banGbnCd;
        //   console.log('FETCH_DETAIL_BANNER_INFO> [name] =%s,[data]=%o', name, action.payload.data);
        //   draft.detailBannerInfo[name] = action.payload.data.data;
        // } else {
        //   draft.detailBannerInfo = {};
        // }
        // draft.isCertifiedMallProdListQuery = true;
      });
    }
    default: {
      return state;
    }
  }
}
