import { useState, useEffect, useCallback, createContext, memo, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import { useCookies } from 'react-cookie';
import classNames from 'classnames/bind';
import BannerItemAuction from '@src/components/common/popup/BannerItemAuction';
import BannerItemQuickView from '@src/components/common/popup/BannerItemQuickView';
// import BannerItemConfirm from '@src/components/common/popup/BannerItemConfirm';
import BannerItemConfirm from '@src/components/common/popup/BannerItemPopup';
import Button from '@lib/share/items/Button';
import ImgCover from '@lib/share/items/ImgCover';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import useRodal from '@lib/share/custom/useRodal';
import CheckBox from '@lib/share/items/CheckBox';
import { setComma, removeComma } from '@src/utils/StringUtil';
import { isLogin } from '@src/utils/LoginUtils';
import { imgUrl } from '@src/utils/HttpUtils';
import { toggleInterestAPI } from '@src/api/buycar/buyCarCommonApi';
import { AUCTION_TYPE, COMMON_TYPE, LIVESTD_TYPE, ITEM_TYPE_BUYCAR, ITEM_TYPE_MYCAR, ITEM_TYPE_INTEREST_CAR } from '@src/constant/buyCarConstant';
import { MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { preventScroll } from '@src/utils/CommonUtil';
import BannerItemBuyCarContext from './BannerItemBuyCarContext';

/*
  html 변경이력
  03.12 : 모바일에서 체크모드 추가 & mode, id props 추가 , #a1 부분 참고
  03.17 : 코드 수정 #a2 참고
        : 뱃지 위치 수정, #a3 참고

        : 모바일 체크모드, 부모 컴포넌트에서 check 데이터 다룰 수 있도록 수정 &
          chkId, chkChecked, chkChange props 추가 , #a4 참고
*/
const BannerItem = memo(
  ({
    itemMode = ITEM_TYPE_BUYCAR,
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
    openMLoginPop,
    closeInfo
  }) => {
    const hasMobile = useSelector((state) => state.common.hasMobile);
    const {
      dlrPrdId = '',
      name = '',
      crNo = '',
      frmYyyy= '',
      drvDist= '',
      drvDistCnt= '',
      fuelNm = '',
      locNm = '',
      price = 0,
      delePhtUrl = '',
      alt = '',
      infos = [],
      tags = [],
      options = [],
      itrtProdYn = 'N',
      lvstdYn = 'N',
      auctSbidYn = 'N'
    } = mapper(itemMode, data);

    chkChecked === undefined ? false : true;

    const [itrtProdYnState, setItrtProdYnState] = useState(itrtProdYn);
    const [cookies, setCookie, removeCookie] = useCookies(['recentCar']);
    const [quickViewData, SetQuickViewData] = useState({});
    const dispatch = useDispatch();

    const createBodyPortal1 = useCreatePortalInBody();
    const createBodyPortal2 = useCreatePortalInBody();
    const createBodyPortal3 = useCreatePortalInBody();
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
    }, []);
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
    }, []);

    const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
    const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
    const [tenderPop, setTenderPop, openTenderPop, closeTenderPop] = useRodal(false);
    const [isInter, setIsInter] = useState(interest);
    const handleOKConfirm = useCallback(
      (e) => {
        // e && e.preventDefault();
        if (isLogin() !== true) {
          setRodalShow2(false);
          modalCloseHandler2();
          openMLoginPop(e);
        } else {
          setRodalShow2(false);
          modalCloseHandler2();
        }
      },
      [modalCloseHandler2, setRodalShow2]
    );
    const handleInterest = () => {
      setIsInter((prevInter) => !prevInter);
    };
    const handleQuickView = useCallback((e) => {
      rodalPopupHandler1(e, 'fade');
    }, []);
    const handleOpenConfirm = useCallback((e) => {
      rodalPopupHandler2(e, 'fade');
    }, []);
    const handleCloseConfirm = useCallback((e) => {
      e && e.preventDefault();
      preventScroll(false);
      setRodalShow2(false);
    }, []);
    const handleOpenTender = useCallback((e) => {
      setTenderPop(e, 'fade');
    }, []);

    const handleOnClickHeart = useCallback(
      (e) => {
        e.preventDefault();
        if (!isLogin()) {
          return rodalPopupHandler2(e, 'fade');
        }
        toggleInterestAPI(dlrPrdId).then(({ data }) => {
          //정상완료시
          if (data.statusinfo.returncd === '000') {
            setItrtProdYnState(data.itrtYn);
            if (data.itrtYn === 'Y') rodalPopupHandler2(e, 'fade');
          } else {
            //console.log('에러 발생!');
          }
        });
      },
      [dlrPrdId, itrtProdYnState, rodalPopupHandler2]
    );

    //========== 내차사기 관련 리스트 시작 ======================================
    //TODO: [임시]상세화면으로 이동 - 차량 상세로 이동할 때 어느 부분을 클릭해야하는지 범위 부정확함 - 현재 차량풀네임 클릭시 이동
    const url = '/buycar/buyCarDetailType';
    let detailType = '';

    switch ('Y') {
      case lvstdYn:
        detailType = LIVESTD_TYPE;
        break;
      case auctSbidYn:
        detailType = AUCTION_TYPE;
        break;
      default:
        detailType = COMMON_TYPE;
        break;
    }

    const param = detailType !== '' ? `&detailType=${detailType}` : '';
    const href = `${url}?dlrPrdId=${dlrPrdId}${param}`;

    const onLinkClick = (e) => {
      e.preventDefault(); //
      onCreateCookieRecentlyCar();
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      // globalThis?.window.open(href, '_blank').focus();
      if(hasMobile){
        Router.push(href);
      } else {
        globalThis?.window.open(href, '새 창', 'width=1400, height=1000, menubar=no, status=no, toolbar=no')
      }
    };

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

      const recentCarValidMinute = 1000 * 60 * 60 * 24 * 90; //유효시간 3개월

      // let recentCarCookieList = [];
      const recentCarCookieList = cookies.recentCar;
      if (typeof recentCarCookieList !== 'undefined' && recentCarCookieList.length > 0) {
        //기존쿠키에 추가
        let cookieList = [];
        cookieList = cookieList.concat(recentCarCookieList);
        cookieList = cookieList.concat(recentCar);
        createCookie('recentCar', cookieList, recentCarValidMinute);
        console.log("onCreateCookieRecentlyCar -> 1::::: cookieList", cookieList)
      } else {
        //쿠키최초 생성
        let cookieList = [];
        cookieList = cookieList.concat(recentCar);
        createCookie('recentCar', cookieList, recentCarValidMinute);
        console.log("onCreateCookieRecentlyCar -> 2::::: cookieList", cookieList)

      }

      onMovePage();
    };

    const createCookie = useCallback(
      (cookieName, cookieValue, validTime) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + validTime);
        setCookie(cookieName, cookieValue, { path: '/', expires });
      },
      [setCookie]
    );

    //상세페이지 이동
    const onMovePage = () => {
      Router.push(href).then(() => window.scrollTo(0, 0));
    };

    // #a4 Start
    const handleChkChange = (e) => {
      if (chkChange) chkChange(e);
    };
    // #a4 End

    const contextValue = useMemo(() => ({ rodalShow1, rodalShow2, tenderPop, modalCloseHandler1, modalCloseHandler2, closeTenderPop, handleOpenConfirm, handleCloseConfirm }), [
      rodalShow1,
      rodalShow2,
      tenderPop
    ]);

    const ImgHover = useCallback(() => {
      return (
        <div className="img-hover">
          {auction === false ? (
            <>
              <p className="scrap-wrap">
                <span className={classNames('heart', { on: itrtProdYnState === 'Y' })} onClick={handleOnClickHeart}>
                  <i className="ico-heart" />
                  <em>관심차량</em>
                </span>
                {!hasMobile && (
                  <span className="compare">
                    <i className="ico-compare" />
                    <em>비교하기</em>
                  </span>
                )}
              </p>
              {!hasMobile ? bannerType === 'horizon' && <Button size="full" background="blue80" title="QUICK VIEW" onClick={handleQuickView} /> : null}
            </>
          ) : (
            <span onClick={handleInterest}>
              <i className={isInter === true ? 'ico-check-white' : 'ico-plus-white'} />
              <em>관심차량</em>
            </span>
          )}
        </div>
      );
    }, [rodalShow1, rodalShow2, isInter, itrtProdYnState]);

    if (bannerType === 'horizon') {
      return auction === false ? (
        <li>
          {isMarkup === true ? (
            children
          ) : (
            <span onDragStart={handleOnDragStart}>
              {hasMobile && mode === 'check' && <CheckBox id={chkId} isSelf={false} checked={chkChecked} onChange={handleChkChange} />} {/* #a1, #a4 */}
              <ImgCover src={`${imgUrl}${delePhtUrl}`} alt={alt}>
                <ImgHover />
                <BannerItemBuyCarContext.Provider value={contextValue}>
                  {/* mode, show, closedHandler, handleOpen, handleClose */}
                  {createBodyPortal2(<BannerItemConfirm mode={2} show={rodalShow2} closeHandler={modalCloseHandler2} handleOpen={handleOKConfirm} handleClose={handleCloseConfirm} />)}
                </BannerItemBuyCarContext.Provider>
                {options.length > 0 && <div className="price-opt">{createOption()}</div>} {/* #a3 */}
              </ImgCover>
              <div className="summary">
                {tags.length > 0 && <span className="list-tag2">{createTag()}</span>}
                {/* <Link href="#"> */}
                  <a onClick={(e) => onLinkClick(e)}>
                    <h5 className="subject">{name}</h5>
                  </a>
                {/* </Link> */}
                <div className="info-wrap">
                  <div className="info">
                    {infos.map((v, i) => (
                      <span key={i}>{v}</span>
                    ))}
                  </div>
                  <div className="price-wrap">
                    <div className="price-left">
                      {/* <Link href="#"> */}
                        <a onClick={(e) => onLinkClick(e)}>
                          <p className="price-tp2">
                            {price}
                            <span className="won">만원</span>
                          </p>
                        </a>
                      {/* </Link> */}
                    </div>
                    {/* #a2 start */}
                    {/* <div className="price-right">
                        {
                          buttonName !== '' && <Button size={!hasMobile ? 'mid' : 'sml'} color="red60" line="red60" radius={true} title={buttonName} width="100" onClick={handleBtnClick} href="/homeService/serviceStep01" />
                        }
                      </div> */}
                    {/* #a2 end */}
                  </div>
                </div>
              </div>
            </span>
          )}
        </li>
      ) : (
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
                <ImgHover />
                <BannerItemBuyCarContext.Provider value={contextValue}>{createBodyPortal2(<BannerItemConfirm />)}</BannerItemBuyCarContext.Provider>
              </div>
            </td>
            <td>
              <div className="summary">
                <span className="list-tag2">{createTag()}</span>
                <Link href="#">
                  <a>
                    <h5>{name}</h5>
                  </a>
                </Link>
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
              {/* {buttonName !== '' && <Button size={!hasMobile ? 'mid' : 'sml'} size="mid" color="red60" line="red60" radius={true} title={buttonName} width={112} onClick={handleBtnClick} />} */}
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
                <BannerItemBuyCarContext.Provider value={contextValue}>{createBodyPortal2(<BannerItemConfirm />)}</BannerItemBuyCarContext.Provider>
              </div>
            </td>
            <td>
              <div className="summary">
                <Link href="#">
                  <a>
                    <h5>{name}</h5>
                  </a>
                </Link>
                <div className="info">
                  {infos.map((v, i) => (
                    <span key={i}>{v}</span>
                  ))}
                </div>
              </div>
            </td>
            <td>
              <div className="price-opt">{createOption()}</div> {/* #a3 */}
              <span className="list-tag2">{createTag()}</span>
            </td>
            <td>
              <p className="price-tp2">
                {price}
                <span className="won">만원</span>
              </p>
              {/* {buttonName !== '' && <Button size={!hasMobile ? 'mid' : 'sml'} color="red60" line="red60" radius={true} title={buttonName} width={112} onClick={handleBtnClick} />} */}
            </td>
          </tr>
        );
      }
    } else if (bannerType === 'brand') {
      return (
        <li
          onClick={
            hasMobile
              ? () => {
                  Router.push(href);
                }
              : null
          }
        >
          <div className="brand-item">
            <ImgCover src={`${imgUrl}${delePhtUrl}`} alt={alt} />
            <p>{name}</p>
          </div>
          <div className="brand-dim">
            <p>{name}</p>
            <Button size="full" background="blue80" title="인증중고차 보기" iconType="arrow-white sml" height={60} nextLink={true} href={href} />
          </div>
        </li>
      );
    }
  }
);

BannerItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  buttonName: PropTypes.string,
  tags: PropTypes.array,
  infos: PropTypes.array,
  options: PropTypes.array,
  isMarkup: PropTypes.bool,
  bannerType: PropTypes.string,
  children: PropTypes.node,
  auction: PropTypes.bool,
  btnClick: PropTypes.func,
  btnId: PropTypes.node
};

export default BannerItem;

/** <BannerItem> 에 맞게 데이터 매핑
 * 서버에서 전송 받은 정보를 화면에 맞는 정보로 매핑함
 * @param {Object} prev 상품정보
 * @returns {object[]} 변환된 상품 정보
 */
const mapper = (itemMode, prev) => {
  const data = { ...prev };
  if (itemMode === ITEM_TYPE_BUYCAR && !isEmpty(data)) {
    // data.name = prev.mnfcNm + ' ' + prev.mdlNm + ' ' + prev.clsNm;
    data.name = prev.crNm;
    data.crNo = prev.crNo;
    data.frmYyyy = prev.frmYyyy; // 최근본차량 쿠키 저장용
    data.drvDist = setComma(prev.drvDist) + 'km' ;   // 최근본차량 쿠키 저장용
    data.fuelNm = prev.fuelNm;  // 최근본차량 쿠키 저장용
    data.locNm = prev.locNm; // 최근본차량 쿠키 저장용
    data.price = setComma(removeComma( prev.slAmt + ''));
    data.alt = prev.name;
    data.itrtProdYn = prev.attYn;
    data.infos = [prev.frmYyyy, setComma(prev.drvDist) + 'km', prev.fuelNm, prev.locNm];
    data.tags = [];
    if (prev.ewYn === 'Y') data.tags.push({ color: 'blue60', value: 'EW' });
    if (prev.hsvcYn === 'Y') data.tags.push({ color: 'purple', value: '홈서비스' });
    if (prev.icmAcrtCrYn === 'Y') data.tags.push({ color: 'sky', value: '수입인증' });
    if (prev.frnchsYn === 'Y') data.tags.push({ color: 'gold', value: '프랜차이즈' });
    if (prev.capMallYn === 'Y') data.tags.push({ color: 'green', value: '금융인증' });
    data.options = [];
    if (prev.lvstdYn === 'Y') data.options.push({ color: 'red', value: '라이브' });
    if (prev.auctSbidYn === 'Y') data.options.push({ color: 'blue60', value: '경매' });
  }
  if (itemMode === ITEM_TYPE_MYCAR && !isEmpty(data)) {
    data.name = prev.crNm;
    data.price = prev.slAmt;
    data.delephtUrl = prev.phtUrl;
    data.delePhtUrl = data.delephtUrl;
    data.itrtProdYn = prev.attYn;
    data.drvDistCnt =  prev.drvDistCnt;
    data.infos = [prev.crNo, prev.frmYyyy, prev.drvDistCnt, prev.fuelDvcd];
  }
  if (itemMode === ITEM_TYPE_INTEREST_CAR && !isEmpty(data)) {
    data.name = prev.crNm;
    data.alt = prev.imgAlt;
    data.price = setComma(removeComma( prev.slAmt + ''));
    data.delephtUrl = prev.phtUrl;
    data.delePhtUrl = data.delephtUrl;
    data.itrtProdYn = prev.itrtProdYn;
    data.infos = [prev.crNo, prev.frmYyyy, prev.drvDistCnt, prev.fuelDvcd];
  }

  return data;
};
