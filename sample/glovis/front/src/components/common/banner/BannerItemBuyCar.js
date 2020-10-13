/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useCallback, memo, useMemo, createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Link from 'next/link';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import { isEmpty } from 'lodash';
import BannerItemAuction from '@src/components/common/popup/BannerItemAuction';
import BannerItemQuickView from '@src/components/common/popup/BannerItemQuickView';
import BannerItemConfirm from '@src/components/common/popup/BannerItemPopup';
import Button from '@lib/share/items/Button';
import ImgCover from '@lib/share/items/ImgCover';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import useRodal from '@lib/share/custom/useRodal';
import LoginPopup from '@src/components/common/popup/LoginPop';
import RodalPopup from '@lib/share/popup/RodalPopup';
import CheckBox from '@lib/share/items/CheckBox';
import { setComma, removeComma } from '@src/utils/StringUtil';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { toggleInterestAPI, selectQuickViewAPI } from '@src/api/buycar/buyCarCommonApi';
import { axiosPost, imgUrl } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { MOBILE_FULLPAGE_POPUP } from '@src/actions/types';
// import { AUCTION_TYPE, COMMON_TYPE, LIVESTD_TYPE } from '@src/constant/buyCarConstant';

import { getCompareList, getInterestList } from '@src/actions/main/mainAction';
import { preventScroll } from '@src/utils/CommonUtil';
const globalThis = require('globalthis')();

/***********************************************************************************
 * TODO :
 * 퀵뷰용 API가 따로 있는데, 클릭할 때마다 로달에 적용가능한지 검토
 **********************************************************************************/
/*
  html 변경이력
  03.12 : 모바일에서 체크모드 추가 & mode, id props 추가 , #a1 부분 참고
  03.17 : 코드 수정 #a2 참고
        : 뱃지 위치 수정, #a3 참고

        : 모바일 체크모드, 부모 컴포넌트에서 check 데이터 다룰 수 있도록 수정 &
          chkId, chkChecked, chkChange props 추가 , #a4 참고
*/

export const BannerItemBuyCarContext = createContext();

const BannerItemBuyCar = memo(
  ({
    data,
    buttonName = '온라인구매',
    isMarkup = false,
    bannerType = 'horizon',
    verticalMode = 1,
    children,
    auction = false,
    limitTime,
    limitNum,
    interest = false,
    mode = 'normal',
    chkId,
    chkChecked,
    chkChange,
    onClickQuickView,
    btnKind,
    openMLoginPop
  }) => {
    const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm, showLoginForm } = useContext(SystemContext);
    const hasMobile = useSelector((state) => state.common.hasMobile);
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    const dispatch = useDispatch();

    const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
    const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
    const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false);
    const [tenderPop, setTenderPop, openTenderPop, closeTenderPop] = useRodal(false);
    const [isInter, setIsInter] = useState(interest);
    const {
      dlrPrdId = '',
      name = '',
      crNo = '',
      frmYyyy= '',
      drvDist='',
      drvDistCnt='',
      fuelNm ='',
      locNm ='',
      price = 0,
      delePhtUrl = '',
      alt = '',
      infos = [],
      tags = [],
      options = [],
      ewYn = 'N',
      hsvcYn = 'N',
      itrtProdYn = 'N',
      compProdYn = 'N',
      impMallYn = 'N',
      frnchsYn = 'N',
      capMallYn = 'N',
      lvstdYn = 'N',
      lvshotYn = 'N',
      auctSbidYn = 'N',
      amllId = '',
      deleShopId = '',
      prtnDvcd = '',
      logoImgUrl = '',
      bnrImgUrl = '',
      amllNm = ''
    } = mapper(data);

    const [itrtProdYnState, setItrtProdYnState] = useState(itrtProdYn);
    const [compProdYnState, setCompProdYnState] = useState(compProdYn);
    const [cookies, setCookie, removeCookie] = useCookies(['recentCar']);

    const [quickViewData, setQuickViewData] = useState({});
    const handleQuickView = useCallback(
      (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
          e.persist();
        }
        //onClickQuickView && onClickQuickView(dlrPrdId);
        selectQuickViewAPI(dlrPrdId).then(({ data }) => {
          setQuickViewData(data.data);

          //정상완료시
          if (data.statusinfo.returncd === '000') {
            rodalPopupHandler1(e, 'fade');
          }
        });
      },
      [dlrPrdId, onClickQuickView]
    );
    const handleOpenConfirm = useCallback(
      (e) => {
        e && e.preventDefault();
        rodalPopupHandler2(e, 'fade');
      },
      [rodalPopupHandler2]
    );

    const tryLogin = useCallback(() => {
      showConfirm('로그인이 필요한 서비스 입니다.<br/>로그인 하시겠습니까?', () => {
        showLoginForm(Router.router.asPath, (data) => {
          if (data?.isLogin) return;
          return showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다');
        });
      });
    }, [showAlert, showConfirm, showLoginForm]);

    const handleOKConfirm = useCallback(
      (e) => {
        e && e.preventDefault();
        if (isLoginLiveCheck() !== true) {
          if (!hasMobile) {
            setRodalShow2(false);
            modalCloseHandler2();
            setRodalShow3(true);
          } else {
            setRodalShow2(false);
            modalCloseHandler2();
            if (openMLoginPop) {
              openMLoginPop(e);
            } else {
              handleFpLoginOpen(e);
            }
          }
        } else {
          setRodalShow2(false);
          modalCloseHandler2();
        }
      },
      [modalCloseHandler2, setRodalShow2, setRodalShow3]
    );

    const handleFpLoginOpen = useCallback((e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '로그인',
          options: ['close']
        }
      });
    }, []);

    const handleCloseConfirm = useCallback(
      (e) => {
        e && e.preventDefault();
        preventScroll(false);
        setRodalShow2(false);
        //modalCloseHandler2(e, 'fade');
      },
      [setRodalShow2]
    );

    const handleOpenTender = useCallback(
      (e) => {
        setTenderPop(e, 'fade');
      },
      [setTenderPop]
    );

    // #a4 Start
    const handleChkChange = (e) => {
      if (chkChange) chkChange(e);
    };
    // #a4 End

    const contextValue = useMemo(() => ({ rodalShow1, rodalShow2, tenderPop, modalCloseHandler1, modalCloseHandler2, closeTenderPop, handleOpenConfirm, handleCloseConfirm }), [
      closeTenderPop,
      handleCloseConfirm,
      handleOpenConfirm,
      modalCloseHandler1,
      modalCloseHandler2,
      rodalShow1,
      rodalShow2,
      tenderPop
    ]);

    //========== 내차사기 관련 리스트 시작 ======================================
    const href = `/buycar/buyCarDetailType?dlrPrdId=${dlrPrdId}`; //타입은 상세화면 진입 후 판단

    //관심상품 하트 클릭
    const handleOnClickHeart = useCallback(
      (e) => {
        //e && e.preventDefault();
        e && e.stopPropagation();
        if (!isLoginLiveCheck()) {
          if (hasMobile) return rodalPopupHandler2(e, 'fade');
          // return showConfirm('로그인이 필요한 서비스 입니다.<br/>로그인 하시겠습니까?', 'login');
          return tryLogin();
        }
        //rodalPopupHandler2(e, 'fade');
        //TODO: 해당 컴포넌트의 스테이트만 바꿀건지, 전체목록을 재조회 할건지 협의필요
        // => 현재 클릭된 배너의 관심여부 스테이트만 변경
        toggleInterestAPI(dlrPrdId).then(({ data }) => {
          //정상완료시
          if (data.statusinfo.returncd === '000') {
            setItrtProdYnState(data.itrtYn);
            const param = {
              pageSize: 1,
              pageNo: 1
            };
            dispatch(getInterestList(param)); //관심차량 조회
            if (data.itrtYn === 'Y') {
              showAlert('관심차량으로 등록되었습니다.<br/> 마이페이지에서 확인가능합니다.'); //rodalPopupHandler2(e, 'fade'); // 이미 중복인 경우 유저에게 별도의 알림을 하지 않고 해제한다.
            }
          }
        });
      },
      [dlrPrdId, rodalPopupHandler2]
    );
    const handleOnClickCompare = useCallback((e) => {
      //e && e.preventDefault();
      e && e.stopPropagation();
      //TODO: 로그인 여부 판단 이 방식 맞는지 확인 필요
      if (!isLoginLiveCheck()) {
        if (hasMobile) return rodalPopupHandler2(e, 'fade');
        // return showConfirm('로그인이 필요한 서비스 입니다.<br/>로그인 하시겠습니까?', 'login');
        return tryLogin();
      }
      //TODO: 해당 컴포넌트의 스테이트만 바꿀건지, 전체목록을 재조회 할건지 협의필요
      // => 현재 클릭된 배너의 관심여부 스테이트만 변경
      // toggleCompareAPI(dlrPrdId).then(({ data }) => {
      //   //정상완료시
      //   if (data.statusinfo.returncd === '000') {
      //     setItrtProdYnState(data.compYn);
      //     if (data.compYn === 'Y') rodalPopupHandler2(e, 'fade');
      //   }
      // });

      const param = {
        dlrPrdId
      };

      if (compProdYnState !== 'Y') {
        axiosPost(`/api/main/insertCarCompareBox.do`, param).then((res) => {
          const result = res.data.statusinfo.returncd;

          if (result === 'DUP') {
            showAlert('이미 비교함으로 등록된 차량이 있습니다.');
            return false;
          } else if (result === 'FULL') {
            showAlert('차량비교함은 4개까지 등록 가능합니다. 삭제후 추가해주세요.');
          } else if (result === 'SUCCESS') {
            setCompProdYnState('Y');
            showAlert('차량비교함에 차량이 등록되었습니다.');
            const param2 = {
              pageSize: 1,
              pageNo: 1
            };
            dispatch(getCompareList(param2));
          } else {
            showAlert('차량비교함 등록이 실패하였습니다. 관리자에게 문의바랍니다.');
          }
        });
      } else {
        const param01 = {
          dlrPrdId
        };
        axiosPost('/api/main/deleteCarCompareBox.do', param01).then((res) => {
          const result = res.data.statusinfo.returncd;
          if (result === 'SUCCESS') {
            setCompProdYnState('N');
            const param2 = {
              pageSize: 1,
              pageNo: 1
            };
            dispatch(getCompareList(param2));
          } else {
            showAlert('삭제에 실패하였습니다.');
            return false;
          }
        });
      }
    });

    //========== 내차사기 관련 리스트 끝 ======================================

    const createBodyPortal1 = useCreatePortalInBody();
    const createBodyPortal2 = useCreatePortalInBody();
    const createBodyPortal3 = useCreatePortalInBody();
    const createBodyPortalLogin = useCreatePortalInBody();
    const handleOnDragStart = useCallback((e) => {
      e.preventDefault();
    }, []);
    const createOption = useCallback(() => {
      const arr = [];
      options.map((v, i) => {
        arr.push(
          <em key={i} className={`option-tp2 bg-${v.color}`}>
            {v.value}
          </em>
        );
      });
      return arr;
    }, [options]);
    const createTag = useCallback(() => {
      const arr = [];
      tags.map((v, i) => {
        arr.push(
          <em key={i} className={`tag-tp2 tx-${v.color}`}>
            {v.value}
          </em>
        );
      });
      return arr;
    }, [tags]);

    //온라인 구매 버튼 클릭시 홈서비스로 이동 (홈서비스에 등록된 차량만 가능 hsvcYn ==='Y')
    const handleBtnClick = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoginLiveCheck()) {
          if (hasMobile) return rodalPopupHandler2(e, 'fade');
          // return showConfirm('로그인이 필요한 서비스 입니다.<br/>로그인 하시겠습니까?', 'login');
          return tryLogin();
        }
        if (gInfoLive().membertype !== '0010') return showAlert('홈서비스 구매는 일반 회원만 가능합니다.', 'error');
        if (hsvcYn === 'Y') {
          modalCloseHandler1(false);
          if(hasMobile){
            Router.push(`/homeService/homeServiceCarInfo?dlrPrdId=${dlrPrdId}`);
          } else {
            globalThis?.window.open(href, '새 창', 'width=1400, height=1000, menubar=no, status=no, toolbar=no')
          }
        }
        // if (btnClick !== undefined) btnClick(e, dlrPrdId);
      },
      [dlrPrdId]
    );

    const handleInterest = () => {
      setIsInter((prevInter) => !prevInter);
    };

    const ImgHover = useCallback(() => {
      return (
        <div className="img-hover">
          {auction === false ? (
            <>
              <p className="scrap-wrap">
                {/* <span className={classNames('heart', { on: itrtProdYn === 'Y' })} onClick={handleOnClickHeart}> */}
                <span className={classNames('heart', { on: itrtProdYnState === 'Y' })} onClick={handleOnClickHeart}>
                  <i className="ico-heart" />
                  <em>관심차량</em>
                </span>
                <span className={classNames('compare', { on: compProdYnState === 'Y' })} onClick={handleOnClickCompare}>
                  <i className="ico-compare" />
                  <em>비교하기</em>
                </span>
              </p>
              {hasMobile === false && bannerType === 'horizon' && <Button size="full" background="blue80" buttonMarkup={true} title="QUICK VIEW" onClick={handleQuickView} />}
            </>
          ) : (
            <span onClick={handleInterest}>
              <i className={isInter === true ? 'ico-check-white' : 'ico-plus-white'} />
              <em>관심차량</em>
            </span>
          )}
        </div>
      );
    }, [auction, bannerType, handleOnClickHeart, handleQuickView, hasMobile, isInter, itrtProdYnState, compProdYnState]);

    //링크클릭 이벤트
    const onLinkClick = (e) => {
      e && e.preventDefault(); //
      onCreateCookieRecentlyCar();
      modalCloseHandler1(false);

      // globalThis?.window.open(href, '_blank').focus();
      if(hasMobile){
        Router.push(href);
      } else {
        globalThis?.window.open(href, '새 창', 'width=1400, height=1000, menubar=no, status=no, toolbar=no')
      }
    };
    const recentCarValidMinute = 1000 * 60 * 60 * 24 * 90; //유효시간 3개월

    const createCookie = useCallback(
      (cookieName, cookieValue, validTime) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + validTime);
        setCookie(cookieName, cookieValue, { path: '/', expires });
      },
      [setCookie]
    );

    //검색된 상품 > 상세페이지 이동전 쿠키 생성
    const onCreateCookieRecentlyCar = () => {
      const recentCar = {
        dlrPrdId: dlrPrdId,
        phtUrl: delePhtUrl,
        crNm: name,
        crNo: crNo,
        frmYyyy :frmYyyy,
        drvDist: drvDist,
        drvDistCnt: drvDist,
        fuelNm: fuelNm,
        locNm: locNm,
        slAmt: price,
        lvstdYn: lvstdYn,
        auctSbidYn: auctSbidYn
      };
      // let recentCarCookieList = [];
      const recentCarCookieList = cookies.recentCar;
      if (typeof recentCarCookieList !== 'undefined' && recentCarCookieList.length > 0) {
        //기존쿠키에 추가
        let cookieList = [];
        cookieList = cookieList.concat(recentCarCookieList);
        cookieList = cookieList.concat(recentCar);
        createCookie('recentCar', cookieList, recentCarValidMinute);
      } else {
        //쿠키최초 생성
        let cookieList = [];
        cookieList = cookieList.concat(recentCar);
        createCookie('recentCar', cookieList, recentCarValidMinute);
      }

      // onMovePage();
    };

    //상세페이지 이동
    const onMovePage = () => {
      Router.push(href).then(() => window.scrollTo(0, 0));
    };

    // const renderLimitTimeClassName = () => {
    //   return limitTime.substr(2, 2) < '02' ? 'time tx-red80' : 'time';
    // };

    if (bannerType === 'horizon') {
      if (auction === false) {
        return (
          <li>
            {isMarkup === true ? (
              children
            ) : (
              <span onDragStart={handleOnDragStart}>
                {hasMobile && mode === 'check' && <CheckBox id={chkId} isSelf={false} checked={chkChecked} onChange={handleChkChange} />} {/* #a1, #a4 */}
                <ImgCover src={imgUrl + delePhtUrl} alt={alt}>
                  <a onClick={(e) => onLinkClick(e)} className="clickTarget"><ImgHover /></a>
                  {createBodyPortal1(
                    <BannerItemQuickView
                      rodalShow1={rodalShow1}
                      modalCloseHandler1={modalCloseHandler1}
                      handleOpenConfirm={handleOpenConfirm}
                      qdata={quickViewData}
                      clickInterate={handleOnClickHeart}
                      clickCompare={handleOnClickCompare}
                      clickView={onLinkClick}
                      clickHome={handleBtnClick}
                    />
                  )}
                  {createBodyPortal2(<BannerItemConfirm mode={2} show={rodalShow2} modalCloseHandler2={modalCloseHandler2} handleOpen={handleOKConfirm} handleClose={handleCloseConfirm} />)}
                  {createBodyPortalLogin(
                    <RodalPopup show={rodalShow3} type={'slideUp'} closedHandler={modalCloseHandler3} mode="normal" size="small" title="로그인">
                      <LoginPopup url={'/buycar/buyCarList'} />
                    </RodalPopup>
                  )}
                  {options.length > 0 && <div className="price-opt">{createOption()}</div>}
                </ImgCover>
                <div className="summary">
                  {/* {tags.length > 0 && <span className="list-tag2">{createTag()}</span>} */}
                  <span className="list-tag2">{tags.length > 0 && createTag()}</span>
                  {/* <h5 className="subject" onClick={handleOnBannerClick}> {name} </h5> */}
                  {/* <Link href=""> */}
                    <a href="#" onClick={(e) => onLinkClick(e)}>
                      <h5 className="subject">{name}</h5>
                      <div className="info-wrap">
                        <div className="info">
                          {infos.map((v, i) => (
                            <span key={i}>{v}</span>
                          ))}
                        </div>
                        <div className="price-wrap">
                          <div className="price-left">
                            <p className="price-tp2">
                              {price}
                              <span className="won">만원</span>
                            </p>
                          </div>
                          <div className="price-right">
                            {hsvcYn === 'Y' && (
                              <Button
                                size={!hasMobile ? 'mid' : 'sml'}
                                color="red60"
                                line="red60"
                                radius={true}
                                title={buttonName}
                                buttonMarkup={true}
                                width={!hasMobile ? '100' : btnKind === 1 ? 57 : 74}
                                height={hasMobile ? (btnKind === 1 ? 24 : null) : null}
                                fontSize={hasMobile ? (btnKind === 1 ? 10 : null) : null}
                                onClick={handleBtnClick}
                              />
                            )}
                          </div>
                        </div>
                      </div>  
                    </a>
                  {/* </Link> */}
                </div>
              </span>
            )}
          </li>
        );
      }
      // 퍼블 신규로직 추가 (auction화면일 것으로 추정..)
      return (
        <li>
          {
            <span onDragStart={handleOnDragStart}>
              <ImgCover src={`${imgUrl}${delePhtUrl}`} alt={alt}>
                <ImgHover />
              </ImgCover>
              <div className="summary">
                <Link href="/mypage/dealerBuy01_01">
                  <a>
                    <div className="info-wrap">
                      <h5 className="subject">{name}</h5>
                      <div className="info">
                        {infos.map((v, i) => (
                          <span key={i}>{v}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                </Link>
                <div className="limit">
                  <span className={limitTime.substr(2, 2) < '02' ? 'time tx-red80' : 'time'}>{limitTime}</span>
                  <span className="num">[{limitNum}명 입찰중]</span>
                </div>
                <Button
                  size="big"
                  background={buttonName === '입찰하기' ? 'gray' : 'blue80'}
                  title={buttonName === '입찰하기' ? '입찰하기' : '입찰가격 수정'}
                  buttonMarkup={true}
                  width={176}
                  marginTop={24}
                  onClick={buttonName === '입찰하기' ? handleOpenTender : handleOpenTender}
                />
              </div>
            </span>
          }
          <BannerItemBuyCarContext.Provider value={contextValue}>{createBodyPortal3(<BannerItemAuction isBidding={buttonName === '입찰하기' ? false : true} />)}</BannerItemBuyCarContext.Provider>
        </li>
      );
    } else if (bannerType === 'vertical') {
      if (verticalMode === 1) {
        return (
          <tr>
            <td>
              <div className="img-cover-wrap">
                <ImgCover src={`${imgUrl}${delePhtUrl}`} alt={alt} />
                <div className="price-opt">{createOption()}</div>
                <ImgHover />
                {createBodyPortal2(<BannerItemConfirm mode={2} show={rodalShow2} modalCloseHandler2={modalCloseHandler2} handleCloseConfirm={handleCloseConfirm} />)}
              </div>
            </td>
            <td>
              <div className="summary">
                <span className="list-tag2">{createTag()}</span>
                {/* <Link href=""> */}
                  <a href="#" onClick={(e) => onLinkClick(e)}>
                    <h5>{name}</h5>
                  </a>
                {/* </Link> */}
                <div className="info">
                  {infos.map((v, i) => (
                    <span key={i}>{v}</span>
                  ))}
                </div>
              </div>
            </td>
            <td>
              <p className="price-tp2">
                {price}
                <span className="won">만원</span>
              </p>
              {hsvcYn === 'Y' && <Button size="mid" color="red60" line="red60" radius={true} title={buttonName} width={112} onClick={handleBtnClick} />}
            </td>
          </tr>
        );
      } else if (verticalMode === 2) {
        return (
          <tr>
            <td>
              <div className="img-cover-wrap">
                <ImgCover src={`${imgUrl}${delePhtUrl}`} alt={alt} />
                <ImgHover />
                {createBodyPortal2(<BannerItemConfirm rodalShow2={rodalShow2} modalCloseHandler2={modalCloseHandler2} handleCloseConfirm={handleCloseConfirm} />)}
              </div>
            </td>
            <td>
              <div className="summary">
                {/* <Link href=""> */}
                  <a href="#" onClick={(e) => onLinkClick(e)}>
                    <h5>{name}</h5>
                  </a>
                {/* </Link> */}
                <div className="info">
                  {infos.map((v, i) => (
                    <span key={i}>{v}</span>
                  ))}
                </div>
              </div>
            </td>
            <td>
              <div className="price-opt">{createOption()}</div>
              <span className="list-tag2">{createTag()}</span>
            </td>
            <td>
              <p className="price-tp2">
                {price}
                <span className="won">만원</span>
              </p>
              {hsvcYn === 'Y' && <Button size="mid" color="red60" line="red60" radius={true} title={buttonName} width={112} onClick={handleBtnClick} />}
            </td>
          </tr>
        );
      }
    } else if (bannerType === 'brand') {
      return (
        <li
          onClick={
            () => {
              Router.push(`/buycar/certificationmall/buyCarCertiView?amllId=${amllId}`);
            }
            // hasMobile
            //   ? () => {
            //       Router.push(`/buycar/certificationmall/buyCarCertiView?amllId=${amllId}`);
            //     }
            //   : null
          }
        >
          <div className="brand-item">
            <ImgCover src={`${imgUrl}${logoImgUrl}`} alt={amllNm} />
            <p>{amllNm}</p>
          </div>
          <div className="brand-dim">
            <p>{amllNm}</p>
            <Button
              size="full"
              background="blue80"
              title="인증중고차 보기"
              iconType="arrow-white sml"
              height={60}
              nextLink={true}
              href={`/buycar/certificationmall/buyCarCertiView?amllId=${amllId}`}
            />
          </div>
        </li>
      );
    }
  }
);

BannerItemBuyCar.propTypes = {
  data: PropTypes.object,
  isMarkup: PropTypes.bool,
  bannerType: PropTypes.string,
  verticalMode: PropTypes.number,
  children: PropTypes.node
};

BannerItemBuyCar.displayName = 'BannerItemBuyCar';
export default BannerItemBuyCar;

/** <BannerItem> 에 맞게 데이터 매핑
 * 서버에서 전송 받은 정보를 화면에 맞는 정보로 매핑함
 * @param {Object} prev 상품정보
 * @returns {object[]} 변환된 상품 정보
 */
const mapper = (prev) => {
  const data = { ...prev };
  if (!isEmpty(data)) {
    // data.name = prev.mnfcNm + ' ' + prev.mdlNm + ' ' + prev.clsNm;
    data.name = prev.crNm;
    data.price = setComma(removeComma(prev.slAmt + ''));
    data.crNo = prev.crNo; // 최근본차량 쿠키 저장용
    data.frmYyyy = prev.frmYyyy; // 최근본차량 쿠키 저장용
    data.drvDist = setComma(prev.drvDist) + 'km' ;   // 최근본차량 쿠키 저장용
    data.drvDistCnt = setComma(prev.drvDist) + 'km' ; // 최근본차량 쿠키 저장용
    data.fuelNm = prev.fuelNm;  // 최근본차량 쿠키 저장용
    data.locNm = prev.locNm; // 최근본차량 쿠키 저장용
    data.alt = data.name;
    //TODO: 연식 표현 어떻게 할 건지 정의 필요함 frmYyyy(카마트) ?? frstRegDt(최초등록일)
    // data.infos = [prev.frstRegDt, setComma(prev.drvDist) + 'km', prev.fuelNm, prev.locNm];
    data.infos = [prev.frmYyyy, setComma(prev.drvDist) + 'km', prev.fuelNm, prev.locNm];
    data.tags = [];
    data.delePhtUrl = data.delePhtUrl || prev.phtUrl;
    if (prev.ewYn === 'Y') data.tags.push({ color: 'blue60', value: 'EW' });
    if (prev.hsvcYn === 'Y') data.tags.push({ color: 'purple', value: '홈서비스' });
    if (prev.icmAcrtCrYn === 'Y') data.tags.push({ color: 'sky', value: '수입인증' });
    if (prev.frnchsYn === 'Y') data.tags.push({ color: 'gold', value: '프랜차이즈' });
    if (prev.capMallYn === 'Y') data.tags.push({ color: 'green', value: '금융인증' });
    data.options = [];
    if (prev.lvstdYn === 'Y' || prev.lvshotYn === 'Y') data.options.push({ color: 'red', value: '라이브' });
    if (prev.auctSbidYn === 'Y') data.options.push({ color: 'blue60', value: '경매' });
  }
  return data;
};
