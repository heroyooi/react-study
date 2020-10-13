// import { SELF_STT, AUCT_STT_DVCD, BS_STT_DVCD, selfStt, REQ_STT_BIDDG, REQ_STT_PCNCL, REQ_STT_SDEAL } from '@src/constant/mbSlReqStt';
import { progressState } from './CmprEstmUtil';
import { isEmpty } from 'lodash';
import { SELF_STT, REQ_TPCD, REQ_TPCD_NM } from '@src/constant/mbSlReqStt';

export const DisplayPrice = {
    NONE : 'NONE',
    BEFORE_BIDD : "BEFORE_BIDD",
    BIDDING : "BIDDING",
    END_BIDD : "END_BIDD",
    SHOW_PRICE : "SHOW_PRICE",
    FAIL_BIDD : "FAIL_BIDD",
    REFUSE : "REFUSE",
    DELAY : "DELAY"
};

export const defaultState = {
    activeNo:0,
    name:'',
    displayPriceType:DisplayPrice.NONE,
    btn: {
        nomalCancel:false,
        modify:false,
        saleCancel:false,
        saleProccess:false,
        restart:false,
        writerReview:false,
        reviewCompleate:false,
        restart:false
    }
};

const REQ_STT_TPCD = {
    PUBLIC_TEMP : '0001',
    PUBLIC_FORM_COMPLETE : '0002',
    PUBLIC_CANCEL : '0003',
    PUBLIC_FINAL : '0004',
    SELF_BIDDING : '0010',
    SELF_DEALING : '0011'
};

const AUCT_STT_DVCD = {
    HOLD: '01',
    APPROVED : '02',
    SUCCESS_BIDD : '03',
    CANCEL : '04',
    CMPR_CANCEL : '05'
};

const AUCT_STT_DTL_DVCD = {
    APPROVE_MODIFY_AVAIL : '000',
    APPROVE_MODIFY_DISABLE : '001',
    ING : '002',
    FINISHED : '003',
    NOBIDD : '004',
};

const BS_STT_DVCD = {
    SUCC_BIDD : '01',
    VISIT_SCHEDULED : '02',
    DELAYED : '03',
    DELAY_FAILED : '08',
    DELAY_FAILED_FINAL : '11',
    FAILURE_COMMENT : '04',
    FAILURE_CONFIRM : '10',
    FAILURE_COMPLETE : '05',
    UNACEPPTABLE_RSN : '07',
    SALE_COMPLETE : '06',
    SALE_FINAL : '09',
}

const BS_STT_DTL_DVCD = {
    SUCCBIDD_COMPLETE : '001',
    SUCCBIDD_COMPLETE_DELAYED : '002',
    VISIT_EXPET_BEFORE : '003',
    VISIT_EXPET_INNER_7DAY : '004',
    VISIT_EXPET_OVER_7DAY : '005',
    COMPET_DEPOSIT_BEFORE : '006',
    COMPET_DEPOSIT_DELAY : '007',
}

export const getState = (sellcar, cmprEstm) => {
    
    const { reqSttTpcd } = sellcar;
    const { hh24AuctSttDvcd, hh24AuctSttDtlDvcd } = cmprEstm;
    const { bsSttDvcd, bsSttDtlDvcd } = cmprEstm?.succBidd ? cmprEstm.succBidd : {} ;
    // state.activeNo = getActiveNo(sellcar, cmprEstm);
    // state.displayPriceType = getDisplayType(sellcar, cmprEstm);
    // state.btn.nomalCancel = nomalCancelAvail(sellcar, cmprEstm);
    // state.btn.modify = modifyAvail(sellcar, cmprEstm);
    // state.btn.saleCancel = saleCancelAvail(sellcar, cmprEstm);
    // state.btn.saleProccess = saleProccessAvail(sellcar, cmprEstm);
    // state.btn.writerReview = writerReviewAvail(sellcar, cmprEstm);
    // state.btn.reviewCompleate = reviewCompleateAvail(sellcar, cmprEstm);
    // state.btn.restart = restartAvail(sellcar, cmprEstm);
    console.log("getState::",reqSttTpcd, hh24AuctSttDvcd, hh24AuctSttDtlDvcd)
    return getState2(reqSttTpcd, hh24AuctSttDvcd, hh24AuctSttDtlDvcd, bsSttDvcd, bsSttDtlDvcd);
};

export const getState2 = (req, act, actDtl, bs, bsDtl, initState = defaultState) => {
    const state = initState;
    if (req === '0001'){
        state.activeNo = 1;
        state.name ='임시저장'
        state.displayPriceType = DisplayPrice.NONE;
        state.btn.nomalCancel =     true;
        state.btn.modify =          true;
        state.btn.saleCancel =      false;
        state.btn.saleProccess =    false;
        state.btn.writerReview =    false;
        state.btn.reviewCompleate = false;
        state.btn.restart =         false;
    } else if (req === '0002'){
        state.activeNo = 2;
        state.name ='신청완료'
        if (act === '01') {
            state.displayPriceType = DisplayPrice.REFUSE;
        } else {
            state.displayPriceType = DisplayPrice.NONE;
        }        
        state.btn.nomalCancel =     true;
        state.btn.modify =          true;
        state.btn.saleCancel =      false;
        state.btn.saleProccess =    false;
        state.btn.writerReview =    false;
        state.btn.reviewCompleate = false;
        state.btn.restart =         false;        
    }  else if (req === '0010'){
        if ( actDtl === '003' ){
            state.activeNo = 4;
            state.name ='견적완료';
            state.displayPriceType = DisplayPrice.END_BIDD;
            state.btn.nomalCancel =     false;
            state.btn.modify =          false;
            state.btn.saleCancel =      true;
            state.btn.saleProccess =    true;
            state.btn.writerReview =    false;
            state.btn.reviewCompleate = false;
            state.btn.restart =         false;
        } else if ( actDtl === '004' ){
            state.activeNo = 4;
            state.name ='견적완료';
            state.displayPriceType = DisplayPrice.END_BIDD;
            state.btn.nomalCancel =     false;
            state.btn.modify =          false;
            state.btn.saleCancel =      true;
            state.btn.saleProccess =    false;
            state.btn.writerReview =    false;
            state.btn.reviewCompleate = false;
            state.btn.restart =         true;
        } else{
            state.activeNo = 3;
            state.name ='진행중';
            state.displayPriceType = DisplayPrice.BIDDING;
            state.btn.nomalCancel =     false;
            state.btn.modify =          false;
            state.btn.saleCancel =      true;
            state.btn.saleProccess =    false;
            state.btn.writerReview =    false;
            state.btn.reviewCompleate = false;
            state.btn.restart =         false;
        }
    } else if (req === '0011'){
        state.activeNo = 5;
        state.name ='거래진행중';
        state.displayPriceType = DisplayPrice.SHOW_PRICE;
        state.btn.nomalCancel =     false;
        state.btn.modify =          false;
        state.btn.saleCancel =      false;
        state.btn.saleProccess =    false;
        state.btn.writerReview =    false;
        state.btn.reviewCompleate = false;
        state.btn.restart =         false;
    } else if ( req === '0004') {
        state.activeNo = 6;
        state.name ='거래완료';
        state.displayPriceType = DisplayPrice.SHOW_PRICE;
        state.btn.nomalCancel =     true;
        state.btn.modify =          true;
        state.btn.saleCancel =      false;
        state.btn.saleProccess =    false;
        state.btn.writerReview =    true;
        state.btn.reviewCompleate = false;
        state.btn.restart =         false;
    } else if (req === '0003'){
        if( AUCT_STT_DVCD.CANCEL === act) {
            state.activeNo = 6;
            state.name = '신청완료';
            state.displayPriceType = DisplayPrice.REFUSE;
            state.btn.nomalCancel =     false;
            state.btn.modify =          false;
            state.btn.saleCancel =      false;
            state.btn.saleProccess =    false;
            state.btn.writerReview =    false;
            state.btn.reviewCompleate = false;
            state.btn.restart =         false;
        }else{
            state.activeNo = 0;
            state.name = '신청취소';
            state.displayPriceType = DisplayPrice.NONE;
            state.btn.nomalCancel =     false;
            state.btn.modify =          false;
            state.btn.saleCancel =      false;
            state.btn.saleProccess =    false;
            state.btn.writerReview =    false;
            state.btn.reviewCompleate = false;
            state.btn.restart =         false;
        }
    } 
    return state;
}

function getActiveNo(sellcar, cmprEstm){
    let result = 0;
    const { reqSttTpcd } = sellcar;
    const { hh24AuctSttDvcd, hh24AuctSttDtlDvcd } = cmprEstm;
    if (reqSttTpcd === REQ_STT_BIDDG) {
        result = selfStt[reqSttTpcd][hh24AuctSttDtlDvcd].activeNo;
    } else if (reqSttTpcd === REQ_STT_PCNCL) {
        result = selfStt[reqSttTpcd][hh24AuctSttDvcd].activeNo;
    } else {
        result = selfStt[reqSttTpcd].activeNo;
    }
    return result ? result : 0;
}

function getDisplayType(sellcar, cmprEstm){
    // if (sellcar.reqSttTpcd === SELF_STT.SELFSALE_COMPARE_APPROVE 
    //     && cmprEstm.hh24AuctSttDvcd === AUCT_STT_DVCD.APPROVED)
    // {
    //     return  DisplayPrice.BEFORE_BIDD;
    // }
    // else if (sellcar.reqSttTpcd === SELF_STT.SELFSALE_COMPARE_APPROVE 
    //     && cmprEstm.hh24AuctSttDvcd === AUCT_STT_DVCD.PROGRESSING)
    // {
    //     return DisplayPrice.BIDDING;
    // }
    // else if (sellcar.reqSttTpcd === SELF_STT.SELFSALE_COMPARE_APPROVE 
    //     && cmprEstm.hh24AuctSttDvcd === AUCT_STT_DVCD.END)
    // {
    //     if(cmprEstm.biddDrlCnt > 0 ){
    //         return  DisplayPrice.END_BIDD;
    //     }else{
    //         return  DisplayPrice.FAIL_BIDD;
    //     }
    // }
    // else if (sellcar.reqSttTpcd === SELF_STT.SELFSALE_DECIDED_TO_SALE
    //     || sellcar.reqSttTpcd === SELF_STT.SELFSALE_CONSIGNMENT
    //     || sellcar.reqSttTpcd === SELF_STT.PUBLIC_FINAL)
    // {
    //     return  DisplayPrice.SHOW_PRICE;
    // }
    // return  DisplayPrice.NONE;
    let priceDp = 0;
    const { reqSttTpcd } = sellcar;
    const { hh24AuctSttDvcd, hh24AuctSttDtlDvcd, bsSttDvcd, bsSttDtlDvcd } = cmprEstm;

    if (reqSttTpcd        === REQ_STT_BIDDG) {
        priceDp = selfStt[reqSttTpcd][hh24AuctSttDtlDvcd].priceDp;
    } else if (reqSttTpcd === REQ_STT_PCNCL) {
        priceDp = selfStt[reqSttTpcd][hh24AuctSttDvcd].priceDp;
    } else if (reqSttTpcd === REQ_STT_SDEAL) {
        if( bsSttDtlDvcd === '002'){
            priceDp = 7;
        }else {
            priceDp = selfStt[reqSttTpcd][hh24AuctSttDvcd].priceDp;
        }
    } else {
        priceDp = selfStt[reqSttTpcd].priceDp;
    }

    priceDp = priceDp ? priceDp : 0;

    if ( priceDp == 1 ){
        return DisplayPrice.REFUSE;
    } else if ( priceDp == 2 ){
        return DisplayPrice.BEFORE_BIDD;
    } else if ( priceDp == 3 ){
        return DisplayPrice.BIDDING;
    } else if ( priceDp == 4 ){
        return DisplayPrice.END_BIDD;
    } else if ( priceDp == 5 ){
        return DisplayPrice.FAIL_BIDD;
    } else if ( priceDp == 6 ){
        return DisplayPrice.SHOW_PRICE;
    } else if ( priceDp == 7 ){
        return DisplayPrice.DELAY;
    }
    return DisplayPrice.NONE;

}

// 취소 버튼 가능 체크
function nomalCancelAvail( sellcar, cmprEstm ){
    const reqStt = sellcar.reqSttTpcd;    
    if( reqStt === '0001'
        || reqStt === '0002'){
            return true;
        }        
    return false;
}

// 신청정보수정 버튼 가능 체크
function modifyAvail(sellcar, cmprEstm){
    const reqStt = sellcar.reqSttTpcd;
    if( reqStt === SELF_STT.PUBLIC_TEMP
        || reqStt === SELF_STT.PUBLIC_FORM_COMPLETE ){
        return true;
    }
    return false;
}

// 판매취소버튼 가능 체크
function saleCancelAvail(sellcar, cmprEstm){
    const reqStt = sellcar.reqSttTpcd;
    if(reqStt === SELF_STT.SELFSALE_COMPARE_APPROVE
       || reqStt === SELF_STT.SELFSALE_CHECK_ESTIMATES){
       return true;
    }
    return false;
}

// 판매진행버튼 가능 체크
function saleProccessAvail(sellcar, cmprEstm ){
    const cmprEstmStt = progressState(cmprEstm);
    const reqStt = sellcar.reqSttTpcd;
    if((reqStt === SELF_STT.SELFSALE_COMPARE_APPROVE && cmprEstmStt.code === 'end' && cmprEstm.biddDrlCnt > 0)
       || reqStt === SELF_STT.SELFSALE_CHECK_ESTIMATES){
       return true;
    }
    return false;
}
 
// 리스타트버튼 가능 체크
function restartAvail(sellcar, cmprEstm){
    const cmprEstmStt = progressState(cmprEstm);
    const reqStt = sellcar.reqSttTpcd;      
    if(reqStt === SELF_STT.SELFSALE_COMPARE_APPROVE
        && cmprEstmStt.code === 'end'
        && cmprEstm.biddDrlCnt === 0){
       return true;
    }
    return false;
}

// 리뷰등록버튼 가능 체크
function writerReviewAvail(sellcar, cmprEstm){
    const reqStt = sellcar.reqSttTpcd;
    if( isEmpty(sellcar.review) && reqStt === SELF_STT.SELFSALE_DECIDED_TO_SALE
        || reqStt === SELF_STT.SELFSALE_CONSIGNMENT){
            if( cmprEstm?.succBidd?.bsSttDvcd === BS_STT_DVCD.SALE_COMPLETE
                || cmprEstm?.succBidd?.bsSttDvcd === BS_STT_DVCD.SALE_FINAL ){
                return true;
            }
    }
    return false;
}

// 리뷰완료버튼 가능 체크
function reviewCompleateAvail(sellcar, cmprEstm){
    const reqStt = sellcar.reqSttTpcd;
    if( reqStt === SELF_STT.PUBLIC_FINAL){
        return true;
    }
    return false;
}

const SELF_COND1  = [SELF_STT.SELFSALE_COMPARE_APPROVE, SELF_STT.SELFSALE_CHECK_ESTIMATES ];
const SELF_COND2  = [SELF_STT.SELFSALE_DECIDED_TO_SALE];
const NONEVAL_COND1  = [SELF_STT.SELFSALE_COMPARE_APPROVE, SELF_STT.SELFSALE_CHECK_ESTIMATES ];
const NONEVAL_COND2  = [SELF_STT.SELFSALE_DECIDED_TO_SALE];

export const reqCarUseCheck = (res) => {
    const result = { newPage: false, myPage: false, alert: false, confirm: false };
    const { data, statusinfo } = res.data;
    const prevAppData = data;
    const slReqId = data?.sellcar?.slReqId;
    const reqTpcd = data?.reqTpcd;
    const reqSttTpcd = data?.reqSttTpcd;
    if (statusinfo.returncd === '000') {
        result.newPage= true;            
    } else if (statusinfo.returncd === '009') {
        if (REQ_TPCD.SELF === reqTpcd) {
            if (prevAppData.availNewApp) {
                result.newPage= true;
                result.myPage= true;
                result.confirm= true;
                result.msg= '<p>기존 비교견적 차량 정보가 있습니다.<br/>새로하시겠습니까[확인]? 이어서 하시겠습니까[취소]?</p>';
                result.slReqId= slReqId;                                
            } else {
                result.myPage= true;
                result.alert= true;
                result.slReqId= slReqId;                                
                if ( SELF_COND1.includes(reqSttTpcd) ){
                    result.msg= '<p>해당 차량은 비교견적이 진행중입니다.</p>';
                } else if ( SELF_COND2.includes(reqSttTpcd)){
                    result.msg= '<p>해당 차량은 비교견적이 완료되었습니다.</p>';                
                } else {
                    result.msg= '<p>해당 차량에 대한 신청정보가 있습니다.</p>';                
                }
            }
        } else if (REQ_TPCD.NONEVAL === reqTpcd) {        
            result.newPage= true;
            result.myPage= true;
            result.confirm= true;
            result.msg= '<p>기존 무평가로 진행중인 차량 정보가 있습니다.<br/>새로하시겠습니까[확인]? 이어서 하시겠습니까[취소]?</p>';        
        }        
    } 
    return result;
}