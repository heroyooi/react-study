// import uuid from 'uuid';
// import { isDayBefore, objIsEmpty, stringToDate } from '@src/utils/CommonUtil';
import { isEmpty } from 'lodash';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
// import { dateToString } from '@src/utils/DateUtils';
import { objIsEmpty } from '@src/utils/CommonUtil';

// 차종 : 경차 (0) / 세단 (1) / SUV (2) / RV (3)
// !!!! 주의 ::: MobLiveShot 에서 이미 같은 코드가 내장되어 실행되고 있음. 중복사용되지 않도록 주의할 것!
export const switchCarTypes = (crTypeCd) => {
  let _changedCarType = 0;
  switch (Number(crTypeCd)) {
    case 1: //경차
      _changedCarType = 0;
      break;
    case 2: //소형차
    case 3: //준중형차
    case 4: //중형차
    case 5: //대형차
    case 6: //스포츠카
    case 24: //하이브리드
    case 25: //전기차
      _changedCarType = 1;
      break;
    case 7: // RV
      _changedCarType = 3;
      break;
    case 8: // SUV
    case 9: // 승합차
      _changedCarType = 2;
      break;
    case 10: // 화물차
    case 11: // 버스
    case 21: // 특장차
    case 20: // 기타
      _changedCarType = 99;
      break;
    default:
      break;
  }
  return _changedCarType;
};

// MB_TPCD == '0010' 일반회원
// MB_TPCD == '0020' 개인딜러
// MB_TPCD == '0030' 단체회원
// MB_TPCD == '0040' 제휴법인
// 유저타입 : 사용자 (0) / 딜러 (1) / 평가사 (2)
// export const switchUserTypes = (memberType) => {
//   let _changedMemberType = 0;
//   switch (memberType) {
//     case '0010': //일반회원
//       _changedMemberType = 0;
//       break;
//     case '0020': //개인딜러
//       _changedMemberType = 3;
//       break;
//     case '0030': //단체회원
//       _changedMemberType = 3;
//       break;
//     case '0040': //제휴법인
//       _changedMemberType = 2;
//       break;
//     default:
//       break;
//   }
//   return _changedMemberType;
// };

export const validatePicture = async (formRef, photoList, addedList, deletedList) => {
  // 대표 사진이 전부 등록되어야 함.
  const mustSavedSortNo = [1, 2, 3, 4, 5];
  console.warn('addedList : ', addedList);
  console.warn('deletedList : ', deletedList);

  let deleteListCheck = true;
  mustSavedSortNo.forEach((mustItem) => {
    if (deletedList.includes(mustItem)) deleteListCheck = false;
  });
  if (!deleteListCheck) return deleteListCheck;

  const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file]'));
  const inputFileSortSet = [];
  fileInputs.forEach((i) => {
    if (i.files[0] !== undefined) {
      inputFileSortSet.push(parseInt(i.dataset.sortNo));
    }
  });
  const savedFilesSortSet = photoList?.map((p) => p.sortNo);
  const mergedSortSet = inputFileSortSet.concat(savedFilesSortSet);
  let result = true;
  mustSavedSortNo.forEach((sortNo) => {
    if (!mergedSortSet.includes(sortNo)) {
      result = false;
    }
  });
  return result;
};

export const carInfoNullCheck = (car) => {
  if (isEmpty(car.frstRegDt)) { //최초등록일
    return true;
  } else if (isEmpty(car.frmYyyy)) { //형식년도
    return true;
  }
  // else if (isEmpty(car.crClrCdNm)) { //색상 //TODO 매매플래폼 색상 적용 하고 활성화
  //   return true;
  // } 
  else if (isEmpty(car.fuelDvcd)) { //연료
    return true;
  }
  // else if (isEmpty(car.dspl)) { //배기량 //TODO PC 입력 방식 -> 선택으로 바뀌면 활성화
  //   return true;
  // }
  else if (isEmpty(car.crTypeCd)) { //차종
    return true;
  } 
  // else if (isEmpty(car.crUseDvcd)) { //용도 //TODO 용도코드 재정의 활성화
  //   return true;
  // } 
  else if (objIsEmpty(car.crRlsPrc)) { //출고가격
    return true;
  } else if (isEmpty(car.mssDvcd)) { //변속기
    return true;
  }
  return false;
};

// TODO 차량 스펙, 옵션 필수 값 체크. 모델에 따른 옵션 가져오는 작업하고서 반영
export const carOptionNullCheck = (car) => {
  return false;
};

export const photoCountCheck = (seller) => {
  const _photoList = seller?.car?.photoList;
  const mustSavedSortNo = [1, 2, 3, 4, 5];
  if (isEmpty(_photoList)) return false;
  mustSavedSortNo.forEach((sortNo) => {
    if (!_photoList.includes(sortNo)) return false;
  });
  return true;
};

export function getSellCarImgList(slReqId, rgstId) {
  return new Promise((resolve) => {
    axiosPost(`/api/sellcar/self/selectCarPhotoList.do`, { slReqId: slReqId, rgstId: rgstId })
      .then((res) => {
        if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
          resolve(res.data.data);
        } else {
          resolve(null);
        }
      })
      .catch(() => {
        resolve(null);
      });
  });
}

export function checkRegistPeriodAllowed(date) { //POLD0SS000-2028
  return date.format('YYYY') > new Date().getFullYear();
}

export function getChkFontColor(cdId) {
  switch (cdId) {
    case '0150': //흰색
      return null;
    case '0010': //갈색
    case '0020': //검정
    case '0030': //금색
    case '0060': //빨강
    case '0080': //자주
    case '0090': //주황
    case '0110': //초록
    case '0120': //파랑
    case '0130': //하늘
    case '0140': //회색
      return 'white';
    case '0040': //노랑
    case '0050': //분홍
    case '0070': //은색
    case '0100': //진주
      return 'black';
    default:
      return null;
  }
}
