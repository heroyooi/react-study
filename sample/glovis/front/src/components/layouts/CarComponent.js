/**
 * 설명 : 차량 컴포넌트 (퀵메뉴)
 * @fileoverview
 * @requires
 * @author D191367
 */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import Link from 'next/link';
import LoginPopup from '@src/components/common/popup/LoginPop';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, orderBy, filter } from 'lodash';
import SlidePageNavi from './SlidePageNavi';
import PageNavigator from '@src/components/common/PageNavigator';

import Router from 'next/router';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import { axiosGet, axiosPost, axiosGetJson, imgUrl } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
// import { getCompareList } from '@src/actions/main/mainAction';
import { LIVESTD_TYPE, AUCTION_TYPE, COMMON_TYPE } from '@src/constant/buyCarConstant';
import PricingToPrintButton from '@src/components/pricingSystem/pricingToPrintButton';
import MypageCompare from '@src/components/common/popup/MypageCompare';

const CarComponent = ({ isLoginState, title, type, listData, currentPage, totalCount, onChangePageHandle, onRefreshHandle, handleDeleteAction, onLoginRefresh }) => {
  const dispatch = useDispatch();
  // const [isLoginState, setIsLoginState] = useState(false); //로그인여부
  const [isRequireLogin, setIsRequireLogin] = useState(true); //로그인 필수 여부
  const [pageSize, setPageSize] = useState(1); //페이지당 노출갯수
  const [targetDlrPrdId, setTargetDlrPrdId] = useState(1); //삭제대상 상품id
  const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [deleteShow, setDeleteShow, deletePopupHandler, deleteCloseHandler] = useRodal(false, true); //삭제 확인팝업
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true); //로그인팝업
  const [comparisonShow, setComparisonShow, comparisonPopupHandler, comparisonCloseHandler] = useRodal(false, true); ///차량비교함 팝업
  // const [attention01Show, setAttention01Show, attention01PopupHandler, attention01CloseHandler] = useRodal(false, true); //관심차량 확인창
  const [compareData, setCompareData] = useState([]); //차량비교함 상품
  let printRef = React.createRef();

  useEffect(() => {
    console.log('useEffect>pages [type]=%s, [totalCount]=%o, [deleteShow]=%o', type, totalCount, deleteShow);
    //차량비교함, 관심차량은 로그인 필수
    if (type === '01' || type === '03') setIsRequireLogin(true);
    else setIsRequireLogin(false); //최근본차량
  }, [totalCount, type]);

  //페이지 이동
  const onChangePage = useCallback((e, pageNoTmp) => {
    e.preventDefault();
    const param = {
      pageSize: pageSize,
      pageNo: pageNoTmp
    };
    console.log('onChangePage>[param]=%o', param);
    onChangePageHandle(e, param);
    // dispatch(getLastViewList(param));
  }, []);

  //내차사기 상세페이지 이동
  const moveBuyCarDetailPage = (e, data) => {
    e.preventDefault(); //
    console.log('moveBuyCarDetailPage>>>[bestPickInfo]=%o,[e]=%o', data, e);
    let url = '/buycar/buyCarDetailType';
    let detailType = '';

    // Router.push('/mypage/admin/adminInfo');
    const dlrPrdId = data.dlrPrdId;
    const lvstdYn = data.lvstdYn; //라이브스튜디오차량여부
    const auctSbidYn = data.auctSbidYn; //라이브스튜디오차량여부

    switch ('Y') {
      case lvstdYn:
        // url += 'C';
        detailType = LIVESTD_TYPE;
        break;
      case auctSbidYn:
        // url += 'B';
        detailType = AUCTION_TYPE;
        break;
      default:
        // url += 'A';
        detailType = COMMON_TYPE;
        break;
    }
    const param = detailType !== '' ? `&detailType=${detailType}` : '';
    const href = `${url}?dlrPrdId=${dlrPrdId}${param}`;
    console.log('상품상세 이동  href=%o', href);
    Router.push(href);
    // Router.push(`${url}?dlrPrdId=${dlrPrdId}`);
    // const href = `${url}?dlrPrdId=${dlrPrdId}`;
  };
  // console.log('type=%s', type);

  //차량비교함 등록
  const addCarCompareBox = (e, dlrPrdId) => {
    e.preventDefault();

    const param = {
      dlrPrdId: dlrPrdId
    };

    console.log('비교함 등록>addCarCompareBox>[param]=%o', param);

    axiosPost(`/api/main/insertCarCompareBox.do`, param).then((res) => {
      console.log('insertCarCompareBox>result>[res]=%o', res);
      const result = res.data.statusinfo.returncd;

      if (result === 'DUP') {
        showAlert('이미 비교함으로 등록된 차량이 있습니다.');
        return false;
      } else if (result === 'FULL') {
        showAlert('차량비교함은 4개까지 등록 가능합니다. 삭제후 추가해주세요.');
      } else if (result === 'SUCCESS') {
        showAlert('차량비교함에 차량이 등록되었습니다.');
        onRefreshHandle(e, 'compare');
      } else {
        showAlert('차량비교함 등록이 실패하였습니다. 관리자에게 문의바랍니다.');
      }
    });
  };

  //최근본차량>관심차량 등록
  const addInterestCar = (e, dlrPrdId) => {
    e.preventDefault();

    const param = {
      prdNums: dlrPrdId
    };

    console.log('관심차량 등록>addInterestCar>[param]=%o', param);

    axiosPost(`/api/mypage/user/insertInterestCar.do`, param).then((res) => {
      const result = Number(res.data.data);

      console.log('관심차량 등록 결과 [result]=%o, res=%o', result, res.data.data);
      if (result === 99) {
        showAlert('이미 관심차량으로 등록된 차량이 있습니다.');
        return false;
      }
      if (result === 1) {
        //attention01Show(true);
        showAlert('관심차량으로 등록 되었습니다.');
        onRefreshHandle(e, 'interest');
      } else {
        showAlert('관심차량 등록이 실패하였습니다. 관리자에게 문의바랍니다.');
      }
    });
  };

  //차량삭제 팝업 버튼
  const handleOneDelete = (e, dlrPrdId) => {
    e.preventDefault();
    console.log('[handleOneDelete]=%s', dlrPrdId);
    setTargetDlrPrdId(dlrPrdId);
    deletePopupHandler(e, 'fade');
  };

  //차량삭제 확인 버튼
  const onDeleteAction = (e) => {
    e.preventDefault();
    deleteCloseHandler(e, 'fade');
    setDeleteShow(false);
    handleDeleteAction(e, type, targetDlrPrdId);
  };

  //삭제 취소 버튼
  const handleDeleteCancel = (e) => {
    deleteCloseHandler(e);
    setDeleteShow(false);
  };

  //비교하기
  const onCompareCar = (e) => {
    e.preventDefault();
    // setSelectedLnbMenuId(menuId);
    console.log('차량 비교하기  > [e]=%o,  ', e);

    //차량 비교함 모든 상품 조회
    const param02 = {
      pageSize: 5,
      pageNo: 1
    };
    getCompareList(param02);
    // if (url.trim().length > 0) Router.push(url);
  };

  //비교함 프린트
  const testPrint = (e) => {
    e.preventDefault();
    const trigger = document.getElementById('trigger');
    trigger.click();
  };

  //차량비교함 조회
  const getCompareList = (param) => {
    axiosGetJson('/api/main/selectCarCompareBoxList.do', param).then((res) => {
      console.log('getCompareList>result>>[res]=%o', res);
      const result = res.data.statusinfo.returncd;
      const list = res.data.data;
      console.log('차량비교 대상 차량 조회 >>>getCompareList=%o', list);
      if (result === 'SUCCESS') {
        if (list?.length > 1 && list?.length < 5) {
          let targetData = [];
          for (let i = 0; i < list.length; i++) {
            console.log('차량비교 대상 차량 조회 >>>list[i]?.dlrPrdId=%o', list[i]?.dlrPrdId);
            targetData = targetData.concat(list[i]?.dlrPrdId);
          }

          const param = {
            prdNums: targetData.join(',')
          };

          axiosPost(`/api/mypage/user/selectCompareCarBoxList.do`, param).then((res) => {
            console.log('selectCompareCarList=%o,', res.data.data);
            setCompareData(res.data.data);
            setComparisonShow(true);
          });
        } else {
          showAlert('차량비교 대상은 2개이상 최대4개까지 가능합니다.');
        }
        // setCompareBoxList(list);
        // setCurrentPageCompare(param.pageNo);
        // setTotalCountCompare(res.data.totalCnt);
      } else {
        //조회결과 없음
        showAlert('차량비교 조회결과 없음');

        //차량비교함
      }
    });
  };

  const LoginCallback = (data) => {
    console.log('LoginCallback > data=%o', data);
    if (data.isLogin) {
      setRodalShow1(false); //로그인창 닫기
      console.log('LoginCallback > setRodalShow1>로그인창 닫기, isLoginState=%o', isLoginState);
      if (onLoginRefresh) onLoginRefresh();
    }
  };
  return (
    <div className="car-thumbnail">
      <h4>{title}</h4>
      {isLoginState === false && isRequireLogin ? (
        <>
          <p className="empty">로그인 후 확인 가능합니다.</p>
          <div className="btn_login">
            <Button size="sml" background="blue80" radius={true} title="로그인" onClick={(e) => rodalPopupHandler1(e, 'fade')} width={54} />
          </div>
        </>
      ) : (
        <>
          {isEmpty(listData) ? (
            <p className="empty">{type === '01' ? '비교함이 비었습니다.' : type === '02' ? '최근 본 차량이 없습니다' : type === '03' ? '관심차량이 비었습니다.' : ''}</p>
          ) : (
            listData.map((item, index) => (
              <ul className="ct-list" key={index}>
                <li className="on">
                  <div className="photo">
                    <img src={imgUrl + item?.phtUrl} alt={item?.crNm} />
                  </div>
                  <div className="cont">
                    <p className="edit">
                      {isLoginState && (type === '02' || type === '03') ? (
                        <>
                          <button type="button" onClick={(e) => addCarCompareBox(e, item?.dlrPrdId)}>
                            <img src="/images/contents/ico-qm-ct-compare.png" alt="" />
                            비교함
                          </button>
                        </>
                      ) : (
                        ''
                      )}
                      {isLoginState && type === '02' ? (
                        <>
                          <b>|</b>
                          <button type="button" onClick={(e) => addInterestCar(e, item?.dlrPrdId)}>
                            <img src="/images/contents/ico-qm-ct-like.png" alt="" />
                            관심
                          </button>
                        </>
                      ) : (
                        ''
                      )}
                    </p>
                    <Tooltip placement="bottom" width={65} simple={true} zid={500}>
                      <TooltipItem>
                        <p className="name" onClick={(e) => moveBuyCarDetailPage(e, item)}>
                          {item?.crNm}
                        </p>
                      </TooltipItem>
                      <TooltipCont>{item?.crNm}</TooltipCont>
                    </Tooltip>
                    <p className="desc"></p>
                    <p className="price">
                      <strong>{item?.slAmt}</strong>만원
                    </p>
                  </div>
                  <button type="button" className="btn-delete" onClick={(e) => handleOneDelete(e, item?.dlrPrdId)}>
                    <img src="/images/contents/btn-qm-ct-delete.png" alt="삭제" />
                  </button>
                </li>
              </ul>
            ))
          )}

          {/*listData.length > 0 && <SlidePageNavi totalCount={totalCount} currentPage={currentPage} changed={(e, pageNo) => onChangePage(e, pageNo)} />*/}
          <PageNavigator className="quick-navi" blockSize={10} currentPage={currentPage} recordCount={totalCount} recordSize={1} changed={(e, pageNo) => onChangePage(e, pageNo)} />
          {type === '01' ? <Button onClick={(e) => onCompareCar(e)} size="sml" line="gray" color="darkgray" radius={true} title="비교하기" width={64} className="btn-compare" /> : ''}
        </>
      )}

      <RodalPopup show={deleteShow} type={'slideUp'} closedHandler={deleteCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>차량을 삭제하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="sml" background="gray" title="취소" width={130} onClick={(e) => handleDeleteCancel(e)} buttonMarkup={true} />
            <Button size="sml" background="blue80" title="확인" width={130} onClick={(e) => onDeleteAction(e)} buttonMarkup={true} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="small" title="로그인">
        <LoginPopup url={'/main'} successCallback={LoginCallback} />
      </RodalPopup>

      <RodalPopup show={comparisonShow} type={'slideUp'} closedHandler={comparisonCloseHandler} mode="normal" size="large">
        <PricingToPrintButton trigger={() => <a href="#" id="trigger"></a>} content={() => printRef} pageStyle="" />
        <div ref={(el) => (printRef = el)} id={'printDiv'}>
          <MypageCompare show={comparisonShow} onClickPrint={testPrint} compareList={compareData} />
        </div>
      </RodalPopup>
    </div>
  );
};

export default CarComponent;
