export default {
    mbId : {}, // 회원 ID
    mbNm : {}, // 회원 명
    mbPwdEnc : {}, // 회원 비밀번호 암호화
    mbHpPnEnc : {
        format:'phone',
        label : '회원 휴대폰번호',
    }, // 회원 휴대폰 전화번호 암호화
    mbTpcd : {}, // 회원 유형코드
    mbZcd : {}, // 회원 우편번호
    mbAddrEnc : {}, // 회원 주소 암호화
    mbDtlAddrEnc : {}, // 회원 상세 주소 암호화
    mbEmlAddrEnc : {}, // 회원 이메일 주소 암호화
    mbCi : {}, // 회원 CI
    mbJoinPathKncd : {}, // 회원 가입 경로 종류코드
    mbSnsKncd : {}, // 회원 SNS 종류코드
    mbSnsEmlAddr : {}, // 회원 SNS 이메일 주소
    mbSnsAcrtCntn : {}, // 회원 SNS 인증 내용
    mbSnsAcrtDt : {}, // 회원 SNS 인증 일시
    mbSnsRfrsTknCntn : {}, // 회원 SNS 리프래쉬 토큰 내용
    mbSnsTknEprYmd : {}, // 회원 SNS 토큰 만기 일자
    mbJoinDvcd : {}, // 회원 가입 구분코드
    mbEn : {}, // 회원 종사원번호
    mbEnEprYmd : {}, // 회원 종사원번호 만기 일자
    mbEnFrnFileId : {}, // 회원 종사원번호 앞면 파일 ID
    mbEnFrnFileUrl : {}, // 회원 종사원번호 앞면 파일 URL
    mbEnBckFileId : {}, // 회원 종사원번호 뒷면 파일 ID
    mbEnBckFileUrl : {}, // 회원 종사원번호 뒷면 파일 URL
    mbBrn : {}, // 회원 사업자등록번호
    mbProfFileId : {}, // 회원 프로필 파일 ID
    mbProfFileUrl : {}, // 회원 프로필 파일 URL
    mbProfFileOpYn : {}, // 회원 프로필 파일 공개 여부
    mbBankcd : {
        label: '회원 은행'
    }, // 회원 은행코드
    mbAcntnoEnc : {
        label : '회원 계좌번호'
    }, // 회원 계좌번호 암호화
    mbDpstNm : {}, // 회원 예금주 명
    mbPrtnDvcd : {}, // 회원 제휴 구분코드
    mbLiveshotYn : {}, // 회원 LIVESHOT 여부
    mbStrZcd : {}, // 회원 판매점 우편번호
    mbStrAddr : {}, // 회원 판매점 주소
    mbStrDtlAddr : {}, // 회원 판매점 상세 주소
    mbStrPn : {
        format:'phone'
    }, // 회원 판매점 전화번호
    mbStrFaxno : {
        format:'phone'
    }, // 회원 판매점 팩스번호
    mbStrSlHmCntn : {}, // 회원 판매점 영업시간 내용
    mbQscnYn : {}, // 회원 휴면 여부
    mbPoaFileId : {}, // 회원 위임장 파일 ID
    mbPoaFileUrl : {}, // 회원 위임장 파일 URL
    mbWrkPrtnCntrFileId : {}, // 회원 업무 제휴 계약 파일 ID
    mbWrkPrtnCntrFileUrl : {}, // 회원 업무 제휴 계약 파일 URL
    mbPwdTmpYn : {}, // 회원 비밀번호 임시 여부
    mbPwdLastUpdDt : {}, // 회원 비밀번호 최종 수정 일시
    mbPwdFailNot : {
        format: "number"
    }, // 회원 비밀번호 실패 횟수
    mbLastLgnDt : {}, // 회원 최종 로그인 일시
    mbAprvKncd : {}, // 회원 승인 종류코드
    mbWthdYn : {}, // 회원 탈퇴 여부
    mbWthdRsnCntn : {}, // 회원 탈퇴 사유 내용
    mbWthdApvrId : {}, // 회원 탈퇴 승인자 ID
    mbWthdDt : {}, // 회원 탈퇴 일시
    apvrId : {}, // 승인자 ID
    aprvDt : {}, // 승인 일시
    regDt : {}, // 등록 일시
    rgstId : {}, // 등록자 ID
    updDt : {}, // 수정 일시
    updtId : {}, // 수정자 ID
    mbLastLgnIp : {}, // 회원 최종 로그인 IP
    mbWthdKncd : {}, // 회원 탈퇴 종류코드
    mbWthdRsnCd : {}, // 회원 탈퇴 사유코드
    authCd : {}, // 권한
    mfInfo : {}, // 주력정보
    slfIntrd : {}, // 자기소개
    omcTelNo : {}, // 오마이콜전화번호
    rsdnRegNoEnc : {}, // 주민등록번호
    enVldStrtDt : {}, // 종사원유효기간 시작일

    //custom
    isDroped : {},//임시
    dropReason : {},//임시

}