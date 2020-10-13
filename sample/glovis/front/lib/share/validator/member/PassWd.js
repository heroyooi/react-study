export default {
    //빈객체 {} 로 넣으면 기본값으로 type:"string", required:false이 들어갑니다
    mbPwdEnc : {
        type :"string",
        // required : true,
        pattern : '^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$',
        // messages : {
        //     "string.pattern.base" : "올바른 비밀번호를 입력해주세요."
        // },
    }, // 현재비밀번호
    mbPwdEncNew : {
        type :"string",
        // required : true,
        //ref: "mbPwdEncChk",
        pattern : '^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$',
        // messages : {Z
        //     "string.pattern.base" : "올바른 비밀번호를 입력해주세요."
        // },
    }, // 새비밀번호
    mbPwdEncChk : {
        type :"string",
        // required : true,
        //ref: "mbPwdEncNew",
        pattern : '^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$',
        // messages : {
        //     "string.pattern.base" : "올바른 비밀번호를 입력해주세요."
        //     //"any.only" : '현재 비밀번호와 새비밀번호는 같아야 합니다.'
        // },
    }   // 새 비밀번호 확인
}