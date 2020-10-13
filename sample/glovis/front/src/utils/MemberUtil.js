/**
 * 설명 : 회원 Util
 * @fileoverview 회원 Util
 * @requires :
 * @author D191364
 */
import { isEmpty } from 'lodash';

/**
 * 연속된 문자 카운트 존재 체크
 * @param {String, number}
 * @return {boolean}  true
 */
export function isStrCnt(str, limit) {
  var o,
    d,
    p,
    n = 0,
    l = limit == null ? 4 : limit;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (i > 0 && (p = o - c) > -2 && p < 2 && (n = p == d ? n + 1 : 0) > l - 3) return false;
    (d = p), (o = c);
  }
  return true;
}

/**
 * Email 유효성 정규식
 * @param {String}
 * @return {boolean}  true
 */
export function isEmlAddr(str) {
  const regEml = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regEml.test(str);
}

/**
 * Email  체크
 * @param {String}
 * @return {msg}
 */
export function chkEmlAddr(str) {
  let msg = '';
  if (isEmpty(str)) {
    msg = '이메일을 입력해주세요';
  } else if (!isEmlAddr(str)) {
    msg = '올바른 이메일 주소를 입력해주세요(예: name@gmail.com)';
  }
  return msg;
}

/**
 * Email  체크
 * @param {String, String}
 * @return {msg}
 */
export function chkEmlAddrAll(str, str2) {
  let msg = '';
  if (isEmpty(str)) {
    msg = '이메일을 입력해주세요';
  } else if (isEmpty(str2)) {
    msg = '이메일 계정을 선택해주세요.';
  } else if (!isEmlAddr(str + '@' + str2)) {
    msg = '올바른 이메일 주소를 입력해주세요(예: name@gmail.com)';
  }
  return msg;
}

/**
 * 약관 리스트
 * @param {obj. str}
 * @return {obj}
 */
export function getTmsObj(obj, obj2) {
  let auctionCheckTerm1 = [];
  let signupCheckList1 = [];
  for (let i = 0; i < obj.length; i++) {
    let essentialTxt = obj[i].indYn === 'Y' ? " (필수)" :  " (선택)";
    let tmpObj = { id: `chk-signup-agree-${i}`
                , title: obj[i].cdNm + essentialTxt
                , checked: obj2 && obj2.indexOf(obj[i].tmsTp) > -1 ? true : false
                , essential: obj[i].indYn === 'Y' ? true :false
                , name :  obj[i].tmsTp
              }
    signupCheckList1.push(tmpObj)
    auctionCheckTerm1.push(obj[i].tmsCntn)
  }
  const newObj = [signupCheckList1, auctionCheckTerm1];
  return newObj;
}

/**
 * 약관 동의 리스트 / 미동의 리스트
 * @param {obj. obj2} //약관리스트, 체크리스트
 * @return {obj}
 */
export function chkTmsAgrNAgrObj(signupCheckList1, checkArr) {
  let agrObj = [];
  let agrNObj = [];
  for (let i = 0; i < signupCheckList1.length; i++) {
    if(checkArr[i]) agrObj.push(signupCheckList1[i].name)
    if(!checkArr[i]) agrNObj.push(signupCheckList1[i].name)

    if(signupCheckList1[i].essential) {        
      if(!checkArr[i]) {
        alert(signupCheckList1[i].title + "에 동의해 주세요")
        return;
      } 
    } 
  }    
  const newObj = [agrObj, agrNObj];
  return newObj;
}

/**
 * 사업자등록번호 유효성 체크
 * @param {obj. str}
 * @return {msg}
 */
export function chkMbBrn(obj) {
  let msg = '';
  if (isEmpty(obj)) {
    msg = '사업자등록번호를 입력해주세요.';
  } else if (obj.length !== 10) {
    msg = '사업자등록번호는 10자리입니다.';
  }
  /*
  if(isEmpty(obj)) {   
    msg ='사업자등록번호를 입력해주세요.'
  } else {
    //유효성체크
    // 합 / 체크키
    var sum = 0, key = [1, 3, 7, 1, 3, 7, 1, 3, 5];
    // 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에더합니다.
    for (var i = 0 ; i < 9 ; i++) { sum += (key[i] * Number(obj[i])); }
    // 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다
    // 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.     

    // 체크섬구함
    var chkSum = 0;
    chkSum = Math.floor(key[8] * Number(obj[8]) / 10);
    // 체크섬 합계에 더해줌
    sum +=chkSum;
    var reminder = (10 - (sum % 10)) % 10;
    //값 비교
    if(reminder===Number(obj[9])) {
      console.log("마스킹 + -- 화 필요:")
    //  console.log(inputs)
      //마스킹 + -- 화 필요
      //setInputs({obj: "--"+obj}); 

      //setMsgs({chkMbBrnMsg, ["chkMbBrnMsg"]: ""}); 
      
    } else {
      msg =  "유효하지 않은 사업자등록번호 입니다. 다시 확인해 주세요";
    }
  }
  */
  return msg;
}

/**
 * 데이터 split 후 array return
 * @param {obj, str}
 * @return {Array}
 */
export function getSplitObj(obj, str) {
  return obj ? obj.split(str) : '';
}

/**
 * - return
 * @param {String}
 * @return {String}
 */
export function setHpPnFormat(str) {
  return str ? str.slice(0, 3) + '-' + str.substring(3, str.length === 11 ? 7 : 6) + '-' + str.slice(-4) : '';
}

/**
 * ID 유효성
 * @param {String}
 * @return {boolean}  true
 */
export function isId(str) {
  // const regId =  /^[a-z]+[a-z0-9]{4,14}$/g;
  //const regId = /^(?=.*[a-z])(?=.*[0-9]).{5,15}$/;
  //const regId = /^(?=.*[a-z]).{5,15}$/;
  const regId = /^[a-z]+[a-z0-9]{0,15}$/g;
  return regId.test(str);
}

/**
 * ID  체크
 * @param {String}
 * @return {msg}
 */
export function chkId(str) {
  // console.log("!isId(str):", !isId(str))
  //  console.log("!str.length:", str.length)
  let msg = '';
  if (isEmpty(str)) {
    msg = '아이디를 입력해주세요';
  } else if (!isId(str)) {
    msg = '아이디는 영문 5~15자 이내로 입력해주세요';
  }
  return msg;
}

/**
 * 비밀번호 유효성
 * @param {String}
 * @return {boolean}  true
 */
export function isPassword(str) {
  // const regexPwCnt =  /^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const regexPwCnt = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,15}$/;
  return regexPwCnt.test(str);
}

/**
 * 비밀번호 체크
 * @param {String, String, String}
 * @return {msg}
 */
export const chkPwd = (mbPwdEnc, mbPwdEncChk, mbId) => {
  let msg = '';
  const regexNo = /(\w)\1\1/;
  if (!isEmpty(mbId) && mbPwdEnc.includes(mbId)) {
    msg = '비밀번호에 아이디를 포함할 수 없습니다';
  } else if (!isPassword(mbPwdEnc)) {
    msg = '비밀번호는 영문, 숫자, 특수 문자 혼합하여 8~15자 이내로 입력해 주세요';
  } else {
    //연속된 숫자 테스트
    if (regexNo.test(mbPwdEnc)) {
      msg = '비밀번호에 연속된 문자/숫자 또는 동일한 문자/숫자를 포함할 수 없습니다.';
    } else if (!isStrCnt(mbPwdEnc, 3)) {
      msg = '비밀번호에 연속된 문자/숫자 또는 동일한 문자/숫자를 포함할 수 없습니다.';
    } else if (isEmpty(mbPwdEnc) || isEmpty(mbPwdEncChk)) {
      msg = '비밀번호(비밀번호 확인)를 입력해주세요';
    } else if (mbPwdEnc !== mbPwdEncChk) {
      msg = '비밀번호가 일치하지 않습니다';
    }
  }
  return msg;
};

/**
 * - return 날짜 format
 * @param {String, String}
 * @return {String}
 */
export function setDateFormat(str, strFormat = '-') {
  return str ? str.slice(0, 4) + strFormat + str.substring(4, 6) + strFormat + str.slice(-2) : '';
}

/**
 * 동일 파일명 체크
 * @param {obj. obj}
 * @return {boolean}
 */
export function checkDupFileNm(obj, obj2) {
  let rtnFlag = true;
  console.log('obj:', obj);
  console.log('obj2:', obj2);

  const filterObj = obj.filter((item) => item.value !== undefined && item.name !== obj2.name);
  console.log('filterObj:', filterObj);
  rtnFlag = filterObj.find((item) => item.value.name === obj2.value.name);

  console.log('rtnFlag:', rtnFlag);

  return rtnFlag;
}

/**
 * 주민등록번호로 생년월일 8자리
 */
export function rtnBirthData(eBirth, eSex) {
  let birth = '';
  switch (eSex) {
    case '9':
      birth = '18' + eBirth;
      break;
    case '0':
      birth = '18' + eBirth;
      break;
    case '1':
      birth = '19' + eBirth;
      break;
    case '2':
      birth = '19' + eBirth;
      break;
    case '3':
      birth = '20' + eBirth;
      break;
    case '4':
      birth = '20' + eBirth;
      break;
    case '5':
      birth = '19' + eBirth;
      break;
    case '6':
      birth = '19' + eBirth;
      break;
    case '7':
      birth = '20' + eBirth;
      break;
    case '8':
      birth = '20' + eBirth;
      break;
  }
  return birth;
}

/**
 * 주민등록번호로 생년월일 8자리 + 성별
 */
export function rtnBirthText(birth, gender) {
  let birthText = birth;

  if (birth && birth.length === 8) {
    birthText = birth.slice(0, 4) + '년 ' + birth.slice(4, 6) + '월 ' + birth.slice(6, 8) + '일';
    if (gender !== '') birthText += gender % 2 === 0 ? ' (여자)' : ' (남자)';
  }
  return birthText;
}
