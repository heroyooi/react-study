import { NONEVAL_STT } from '@src/constant/mbSlReqStt';
import { progressState } from './CmprEstmUtil';
import { isEmpty } from 'lodash';

export const DisplayPrice = {
    NONE : 'NONE',
    BEFORE_ESTM : "BEFORE_ESTM",
    FRST_ESTM : "FRST_ESTM",
    SCND_ESTM : "SCND_ESTM"
};

export const defaultState = {
    activeNo:0,
    displayPriceType:DisplayPrice.NONE,
    btn: {
        nomalCancel:false,
        modify:false,
        saleCancel:false,
        saleProccess:false,
        consignment:false,
        estmRsn:true,
        saleDecide:false,
        cancelDecide:false
    }
};

export const getState = (sellcar, cmprEstm, initState = defaultState) => {
    const state = initState;
    state.activeNo = getActiveNo(sellcar, cmprEstm);
    state.displayPriceType = getDisplayType(sellcar, cmprEstm);
    state.btn.nomalCancel = nomalCancelAvail(sellcar, cmprEstm);
    state.btn.modify = modifyAvail(sellcar, cmprEstm);
    state.btn.saleCancel = saleCancelAvail(sellcar, cmprEstm);
    state.btn.saleProccess = saleProccessAvail(sellcar, cmprEstm);
    state.btn.consignment = consignmentAvail(sellcar, cmprEstm);
    state.btn.estmRsn = estmRsnAvail(sellcar, cmprEstm);
    state.btn.saleDecide = saleDecideAvail(sellcar, cmprEstm);
    state.btn.cancelDecide = cancelDecideAvail(sellcar, cmprEstm);
    return state;
};

function getActiveNo(sellcar){
    if( sellcar.reqSttTpcd === NONEVAL_STT.PUBLIC_TEMP){
        return 1;
    }
    else if (sellcar.reqSttTpcd === NONEVAL_STT.PUBLIC_FORM_COMPLETE){
        return 2;
    }
    else if (sellcar.reqSttTpcd === NONEVAL_STT.NONEVAL_CHECK_ESTIMATE){
        return 3;
    }
    else if (sellcar.reqSttTpcd === NONEVAL_STT.NONEVAL_CONSIGNMENT ){
        return 4;
    }    
    else if (sellcar.reqSttTpcd === NONEVAL_STT.NONEVAL_DECIDED_TO_SALE){
        return 5;
    }
    else if (sellcar.reqSttTpcd === NONEVAL_STT.PUBLIC_FINAL){
        return 6;
    }
    return 0;
}

function getDisplayType(sellcar, cmprEstm){    
    if (sellcar.reqSttTpcd === NONEVAL_STT.PUBLIC_TEMP){
        return  DisplayPrice.NONE;
    } 
    else if (sellcar.reqSttTpcd === NONEVAL_STT.PUBLIC_FORM_COMPLETE){
        return DisplayPrice.BEFORE_ESTM;
    } 
    else if (sellcar.reqSttTpcd === NONEVAL_STT.NONEVAL_CHECK_ESTIMATE){
        return DisplayPrice.FRST_ESTM;
    } 
    else if (sellcar.reqSttTpcd === NONEVAL_STT.NONEVAL_CONSIGNMENT){
        return DisplayPrice.SCND_ESTM;
    } 
    else if (sellcar.reqSttTpcd === NONEVAL_STT.NONEVAL_DECIDED_TO_SALE){
        return DisplayPrice.SCND_ESTM;
    } 
    else if (sellcar.reqSttTpcd === NONEVAL_STT.PUBLIC_FINAL){
        return DisplayPrice.SCND_ESTM;
    } 
    return DisplayPrice.SCND_ESTM;
}

// 신청 취소 버튼 가능 체크
function nomalCancelAvail(sellcar){
    const reqStt = sellcar.reqSttTpcd;
    if( reqStt === NONEVAL_STT.PUBLIC_TEMP
        || reqStt === NONEVAL_STT.PUBLIC_FORM_COMPLETE){
            return true;
        }
    return false;
}

// 신청정보수정 버튼 가능 체크
function modifyAvail(sellcar){
    const reqStt = sellcar.reqSttTpcd;
    if( reqStt === NONEVAL_STT.PUBLIC_TEMP
        || reqStt === NONEVAL_STT.PUBLIC_FORM_COMPLETE){
        return true;
    }
    return false;
}

// 판매취소버튼 가능 체크
function saleCancelAvail(sellcar){    
    const reqStt = sellcar.reqSttTpcd;
    if( reqStt === NONEVAL_STT.NONEVAL_CHECK_ESTIMATE){
        return true;
    }
    return false;
}

// 판매진행버튼 가능 체크
function saleProccessAvail(sellcar){
    const reqStt = sellcar.reqSttTpcd;
    if(reqStt === NONEVAL_STT.NONEVAL_CHECK_ESTIMATE){
       return true;
    }
    return false;
}
 
// 탁송정보 확인
function consignmentAvail(sellcar){
    const reqStt = sellcar.reqSttTpcd;
    if( reqStt === NONEVAL_STT.NONEVAL_CONSIGNMENT){
        return true;
    }
    return false;
}

// 판매 최종 결정 버튼
function saleDecideAvail(sellcar){
    const reqStt = sellcar.reqSttTpcd;
    if( reqStt === NONEVAL_STT.NONEVAL_DECIDED_TO_SALE){
        return true;
    }
    return false;
}

function cancelDecideAvail(sellcar){
    const reqStt = sellcar.reqSttTpcd;
    if( reqStt === NONEVAL_STT.NONEVAL_DECIDED_TO_SALE){
        return true;
    }
    return false;
}

// 견젹사유산정
function estmRsnAvail(sellcar){
    const reqStt = sellcar.reqSttTpcd;    
    if(!isEmpty(sellcar?.saleMethod?.estmCalcRsnCd)){
       return true;
    }
    return false;
}
