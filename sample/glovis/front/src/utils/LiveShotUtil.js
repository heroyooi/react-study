import { objIsEmpty } from '@src/utils/CommonUtil';
import { dateToString } from '@src/utils/DateUtils';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

export function getRegStates() {
  return ['성능점검', '사진촬영', '등록완료'];
}

export function getStepUrl(idx) {
  const urls = [
    '/mypage/dealer/sellcar/liveShotRegister01',
    '/mypage/dealer/sellcar/liveShotRegister02',
    '/mypage/dealer/sellcar/liveShotRegister03',
    '/mypage/dealer/sellcar/liveStudioAssignList?seq=1'
  ];

  return urls[idx];
}

export function getBuyCarSelectAtbInstp(reqId, crId, crNo, userId) {
  return new Promise((resolve) => {
    axiosPost(`/api/liveShot/admin/selectAtbInsp.do`, { reqId })
      .then((res) => {
        if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
          axiosPost('/api/pricing/getCarInfo.do', { crNo, crId }, null).then((carInfoRes) => {
            if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
              resolve(convertData(reqId, crId, crNo, userId, carInfoRes.data.data, res.data.data));
            } else {
              alert(carInfoRes?.data?.statusinfo?.returnmsg);
            }
          });
        } else {
          alert(res?.data?.statusinfo?.returnmsg);
        }
      })
      .catch(() => {
        resolve(null);
      });
  });
}

export function convertData(reqId, crId, crNo, userId, carInfo, data) {
  const defaltValue = process.env.systemEnv !== 'local' ? null : '1';
  const defaultSelectValue = process.env.systemEnv !== 'local' ? null : '0010';

  const source = [
    {
      title: '차량정보',
      category: 0,
      items: [
        { category: 0, key: 'reqId', title: 'reqId', value: reqId, memo: '', isRadio: false, isDisplay: false, useYn: 'Y', memoKey: '' },
        { category: 0, key: 'crId', title: 'crId', value: crId, memo: '', isRadio: false, isDisplay: false, useYn: 'N', memoKey: '' },
        { category: 0, key: 'crNo', title: 'crNo', value: crNo, memo: '', isRadio: false, isDisplay: false, useYn: 'N', memoKey: '' },
        { category: 0, key: 'atbInspNo', title: '오토벨 검사 번호', value: '', memo: '', isRadio: false, isDisplay: false, memoKey: '', isRequired: false },
        { category: 0, key: 'regDt', title: '등록 일시', value: dateToString(new Date(), ''), memo: '', isRadio: false, isDisplay: false, memoKey: '', isRequired: false },
        { category: 0, key: 'rgstId', title: '등록자', value: userId, memo: '', isRadio: false, isDisplay: false, memoKey: '' },
        { category: 0, key: 'updDt', title: '수정 일시', value: dateToString(new Date(), ''), memo: '', isRadio: false, isDisplay: false, memoKey: '', isRequired: false },
        { category: 0, key: 'updtId', title: '수정자 ID', value: userId, memo: '', isRadio: false, isDisplay: false, memoKey: '' },
        { category: 0, key: 'mnfc', title: '제조사', text: carInfo?.crMnfcNm || '', value: carInfo?.crMnfcCd || '', memo: '', isRadio: false, memoKey: '', isRequired: false },
        { category: 0, key: 'mdl', title: '모델', text: carInfo?.crMdlNm || '', value: carInfo?.crMdlCd || '', memo: '', isRadio: false, memoKey: '', isRequired: false },
        { category: 0, key: 'cls', title: '등급', text: carInfo?.crDtlClsNm || '', value: carInfo?.crClsCd || '', memo: '', isRadio: false, memoKey: '', isRequired: false },
        { category: 0, key: 'clr', title: '색상', text: carInfo?.crClrNm || '', value: carInfo?.crClrCd || '', dataType: 'color', memo: '', isRadio: false, memoKey: '' },
        { category: 0, key: 'drvDist', title: '주행거리', value: '', memo: '', isRadio: false, memoKey: '', isReadOnly: false, dataType: 'number' },
        { category: 0, key: 'vin', title: '차대번호', value: carInfo?.vin, memo: '', isRadio: false, memoKey: '', isDisplay: false, isRequired: false },
        { category: 0, key: 'frstRegDt', title: '최초등록일', value: carInfo?.frstRegDt || '', memo: '', dataType: 'date', memoKey: '' },
        { category: 0, key: 'crAcdtDivCd', title: '차량 사고 구분 코드', value: null, memo: '', isRadio: true, memoKey: '', isDisplay: false, isRequired: false },
        { category: 0, key: 'crAcdtDivNm', title: '차량 사고 구분 명', value: null, memo: '', isRadio: true, memoKey: '', isDisplay: false, isRequired: false }
      ]
    },
    {
      title: '외장',
      category: 1,
      items: [
        { category: 1, key: 'frtGrsStt', title: '앞 유리 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'frtGrsSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'bhdGrsStt', title: '뒷 유리 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'bhdGrsSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'windStt', title: '창문 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'windSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'plshStt', title: '광택 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'plshSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'wprWkStt', title: '와이퍼 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'wprWkSttMemo', checkedValue: '1', unCheckedValue: '2' },
        {
          category: 1,
          key: 'dentStt',
          title: '덴트 상태',
          value: defaltValue,
          memo: '',
          cnt: '',
          isRadio: true,
          countKey: 'dentSttCnt',
          memoKey: 'dentSttMemo',
          checkedValue: '1',
          unCheckedValue: '2'
        },
        {
          category: 1,
          key: 'scrcStt',
          title: '흠집 상태',
          value: defaltValue,
          memo: '',
          cnt: '',
          isRadio: true,
          countKey: 'scrcSttCnt',
          memoKey: 'scrcSttMemo',
          checkedValue: '1',
          unCheckedValue: '2'
        },
        { category: 1, key: 'ctngStt', title: '도장 상태', value: defaltValue, memo: '', cnt: '', isRadio: true, memoKey: 'ctngSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'whlStt', title: '훨 상태', value: defaltValue, memo: '', isRadio: true, countKey: 'whlSttCnt', memoKey: 'whlSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'tireFrtDrvStt', title: '타이어앞운전석상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'tireFrtDrvSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'tireFrtPssngStt', title: '타이어앞조수석상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'tireFrtPssngSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'tireRearDrvStt', title: '타이어뒤운전석상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'tireRearDrvSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'tireRearPssngStt', title: '타이어뒤조수석상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'tireRearPssngSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'lcnsPltStt', title: '번호판 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'lcnsPltSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 1, key: 'plstcPartStt', title: '플라스틱류 부품 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'plstcPartSttMemo', checkedValue: '1', unCheckedValue: '2' }
      ]
    },
    {
      title: '실내',
      category: 2,
      items: [
        { category: 2, key: 'insClnCnfm', title: '실내 세정 확인', value: defaltValue, memo: '', isRadio: true, memoKey: 'insClnCnfmMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'glvboxStt', title: '글로브박스 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'glvboxSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'dashbrdStt', title: '대시보드 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'dashbrdSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'rmmirrorStt', title: '룸미러, 거울 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'rmmirrorSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'itwStt', title: '유리창 내면 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'itwSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'trunkStt', title: '트렁크 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'trunkSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'stStt', title: '모든 시트 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'stSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'matStt', title: '모든 매트 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'matSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'sftBeltClnStt', title: '안전벨트 청결 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'sftBeltClnSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'stkTrtmRmv', title: '악취 처리/제거 확인', value: defaltValue, memo: '', isRadio: true, memoKey: 'stkTrtmRmvMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'roofLngStt', title: '루프 라이닝 상태', value: defaltValue, memo: '', isRadio: true, memoKey: 'roofLngSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'scndKeyCnfmStt', title: '보조키 확인', value: defaltValue, memo: '', isRadio: true, memoKey: 'scndKeyCnfmSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'mnlCnfmStt', title: '매뉴얼 확인', value: defaltValue, memo: '', isRadio: true, memoKey: 'mnlCnfmSttMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 2, key: 'spareTireCnfmStt', title: '스페어 타이어 확인', value: defaltValue, memo: '', isRadio: true, memoKey: 'spareTireCnfmMemo', checkedValue: '1', unCheckedValue: '2' }
      ]
    },
    {
      title: '기능',
      category: 3,
      items: [
        { category: 3, key: 'lockWk', title: '모든 잠금장치 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'lockWkMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'smrtkyWk', title: '스마트키 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'smrtkyWkMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'intrLamp', title: '모든 실내등 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'intrLampMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'osdLght', title: '외부 라이트 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'osdLghtMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'insbrdLmp', title: '계기판 등 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'insbrdLmpMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'memorySt', title: '메모리 시트 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'memoryStMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'trsmsnStCntl', title: '전동 시트조절 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'trsmsnStCntlMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'htwreStrg', title: '열선 스티어링 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'htwreStrgMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'windStch', title: '창문 개폐 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'windStchMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'sunroof', title: '썬루프 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'sunroofMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'horn', title: '경적 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'hornMemo', checkedValue: '1', unCheckedValue: '2' },
        {
          category: 3,
          key: 'sthtwreVntnMssgwk',
          title: '시트 열선, 통풍, 마사지<br />작동',
          value: defaltValue,
          memo: '',
          isRadio: true,
          memoKey: 'sthtwreVntnMssgwkMemo',
          checkedValue: 1,
          unCheckedValue: 2
        },
        { category: 3, key: 'chrgTrmlUsb', title: '12v 충전 단자, USB 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'chrgTrmlUsbMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'sftBelt', title: '안전벨트 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'sftBeltMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'airHitter', title: '에어컨, 히터 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'airHitterMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'navi', title: '네비게이션 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'naviMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'rearCmr', title: '후방 카메라 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'rearCmrMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'arndVw', title: '360 어라운드 뷰 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'arndVwMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'prknAsstSys', title: '주차 보조 시스템 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'prknAsstSysMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'cnvt', title: '컨버터블 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'cnvtMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'spkr', title: '스피커 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'spkrMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'radioDmb', title: '라디오, DMB 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'radioDmbMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'blth', title: '블루투스 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'blthMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'hud', title: '헤드업 디스플레이 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'hudMemo', checkedValue: '1', unCheckedValue: '2' },
        { category: 3, key: 'bkstEnt', title: '뒷자석 엔터테이먼트 작동', value: defaltValue, memo: '', isRadio: true, memoKey: 'bkstEntMemo', checkedValue: '1', unCheckedValue: '2' }
      ]
    },
    {
      title: '외부패널',
      category: 4,
      items: [
        { category: 4, key: 'hood', title: '후드', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 4, key: 'trunkLid', title: '트렁크 리드', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 4, key: 'frtFender', title: '프론트 헨더', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 4, key: 'roofPnst', title: '루프 패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 4, key: 'door', title: '도어', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 4, key: 'qrtrPnst', title: '쿼터 패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 4, key: 'rdarSpprt', title: '라디에이터 서포트', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 4, key: 'sidePnst', title: '사이트 패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] }
      ]
    },
    {
      title: '주요골격',
      category: 5,
      items: [
        { category: 5, key: 'frtPnst', title: '프론트 패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'dashPnst', title: '대쉬패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'crossMem', title: '크로스 멤버', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'floorPnst', title: '플로어 패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'insdPnst', title: '인사이드 패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'pillaPnst', title: '필러 패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'sideMem', title: '사이드 멤버', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'rearPnst', title: '리어 패널', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'whlHouse', title: '휠 하우스', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] },
        { category: 5, key: 'trunkFloor', title: '트렁크 플로어', value: defaultSelectValue, memo: '', isSelect: true, source: ['0010', '0020', '0030'] }
      ]
    }
  ];

  if (!objIsEmpty(data)) {
    source.forEach((category) => {
      category.items.forEach((item) => {
        if (!(item.key === 'crId' || item.key === 'crNo' || item.key === 'regDt' || item.key === 'rgstId' || item.key === 'updDt' || item.key === 'updtId')) {
          item.value = data[item.key];
          if (!objIsEmpty(item.memoKey)) {
            item.memo = data[item.memoKey];
          }
          if (!objIsEmpty(item.countKey)) {
            item.cnt = data[item.countKey];
          }
        }
      });
    });
  }

  return source;
}

export function getLiveShotCarImgList(reqId) {
  return new Promise((resolve) => {
    axiosGet(`/api/liveShot/admin/selectLvShotCarImgList.do?reqId=${reqId}`)
      .then((res) => {
        if (res && res.data && res.data.statusinfo && (res.data.statusinfo.returncd === 'SUCCESS' || res.data.statusinfo.returncd === '000')) {
          resolve(res.data.data.prdLst);
        } else {
          resolve(null);
        }
      })
      .catch(() => {
        resolve(null);
      });
  });
}

export function isLiveShotValidItems(groups) {
  return groups.some((menu) => {
    return menu.items.some((item) => {
      const state = objIsEmpty(item.value) && item.isRequired !== false;
      if (state) {
        console.log(item);
      }
      return state;
    });
  });
}
