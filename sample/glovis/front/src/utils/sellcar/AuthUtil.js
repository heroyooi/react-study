import { isLogin, getMemberType } from '@src/utils/LoginUtils';

export const isAllowedUserType = () => {
    const memberType = getMemberType();
    // 로그인한 
    if( isLogin() ){
        // 회원이나 비회원만 
        if( memberType === "0010" || memberType === "nonmember" ){
            return true;
        }
    }
    return false;
}
