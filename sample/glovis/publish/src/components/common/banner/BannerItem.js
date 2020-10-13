import { useState, useEffect, useCallback, createContext, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import BannerItemAuction from '@src/components/common/popup/BannerItemAuction';
import BannerItemQuickView from '@src/components/common/popup/BannerItemQuickView';
import BannerItemConfirm from '@src/components/common/popup/BannerItemConfirm';
import Button from '@lib/share/items/Button';
import ImgCover from '@lib/share/items/ImgCover';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import useRodal from '@lib/share/custom/useRodal';
import CheckBox from '@lib/share/items/CheckBox';

export const BannerItemContext = createContext();

/*
  html 변경이력
  03.12 : 모바일에서 체크모드 추가 & mode, id props 추가 , #a1 부분 참고
  03.17 : 코드 수정 #a2 참고
        : 뱃지 위치 수정, #a3 참고

        : 모바일 체크모드, 부모 컴포넌트에서 check 데이터 다룰 수 있도록 수정 &
          chkId, chkChecked, chkChange props 추가 , #a4 참고
*/
const BannerItem = memo(({ name, price, image, alt, buttonName = '', tags = [], infos = [], options = [], isMarkup = false, bannerType = 'horizon', verticalMode = 1, children, auction = false, limitTime, limitNum, btnClick, btnId, href, isBidding = false, interest = false, mode = "normal", id, chkId, chkChecked, chkChange }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const createBodyPortal1 = useCreatePortalInBody();
  const createBodyPortal2 = useCreatePortalInBody();
  const createBodyPortal3 = useCreatePortalInBody();
  const handleOnDragStart = useCallback((e) => {
    e.preventDefault();
  }, []);
  const createOption = useCallback(() => {
    let arr = []
    options.map((v, i) => {
      arr.push(<em key={i} className={`option-tp2 bg-${v.color}`}>{v.value}</em>)
    })
    return arr
  }, []);
  const createTag = useCallback(() => {
    let arr = []
    tags.map((v, i) => {
      arr.push(<em key={i} className={`tag-tp2 tx-${v.color}`}>{v.value}</em>)
    })
    return arr
  }, []);
  const handleBtnClick = useCallback((e) => {
    e.preventDefault();
    if (btnClick !== undefined) btnClick(e, btnId);
  }, []);

  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
  const [tenderPop, setTenderPop, openTenderPop, closeTenderPop] = useRodal(false);
  const [isInter, setIsInter] = useState(interest);

  const handleInterest = () => {
    setIsInter(prevInter => !prevInter);
  }

  const handleQuickView = useCallback((e) => {
    rodalPopupHandler1(e, "fade");
  }, []);
  const handleOpenConfirm = useCallback((e) => {
    rodalPopupHandler2(e, "fade");
  }, []);
  const handleCloseConfirm = useCallback((e) => {
    e.preventDefault();
    document.getElementsByTagName('html')[0].style.overflow = "auto";
    setRodalShow2(false);
  }, []);
  const handleOpenTender = useCallback((e) => {
    setTenderPop(e, "fade");
  }, []);

  // #a4 Start
  const handleChkChange = (e) => {
    if (chkChange) chkChange(e);
  }
  // #a4 End

  const contextValue = useMemo(() => ({ rodalShow1, rodalShow2, tenderPop, modalCloseHandler1, modalCloseHandler2, closeTenderPop, handleOpenConfirm, handleCloseConfirm }), [rodalShow1, rodalShow2, tenderPop]);

  const ImgHover = useCallback(() => {
    return (
      <div className="img-hover">
        {auction === false
          ? (
            <>
              <p className="scrap-wrap">
                <span className="heart" onClick={(e) => rodalPopupHandler2(e, "fade")}><i className="ico-heart"></i><em>관심차량</em></span>
                {!hasMobile && <span className="compare"><i className="ico-compare"></i><em>비교하기</em></span>}
              </p>
              {
                !hasMobile
                  ? bannerType === 'horizon' && <Button size="full" background="blue80" title="QUICK VIEW" onClick={handleQuickView} />
                  : null
              }
            </>
          ) : (
            <span onClick={handleInterest}><i className={isInter === true ? "ico-check-white" : "ico-plus-white"}></i><em>관심차량</em></span>
          )}
      </div>
    );
  }, [rodalShow1, rodalShow2, isInter]);

  if (bannerType === 'horizon') {
    if (auction === false) {
      return (
        <li>
          {
            isMarkup === true
              ? (children)
              : (<span onDragStart={handleOnDragStart}>
                {(hasMobile && mode === "check") && <CheckBox id={chkId} isSelf={false} checked={chkChecked} onChange={handleChkChange} />} {/* #a1, #a4 */}
                <ImgCover src={image} alt={alt}>
                  <ImgHover />
                  <BannerItemContext.Provider value={contextValue}>
                    {createBodyPortal1(<BannerItemQuickView />)}
                    {createBodyPortal2(<BannerItemConfirm />)}
                  </BannerItemContext.Provider>
                  {options.length > 0 && <div className="price-opt">{createOption()}</div>} {/* #a3 */}
                </ImgCover>
                <div className="summary">
                  {tags.length > 0 && <span className="list-tag2">{createTag()}</span>}
                  <h5 className="subject">{name}</h5>
                  <div className="info-wrap">
                    <div className="info">{infos.map((v, i) => <span key={i}>{v}</span>)}</div>
                    <div className="price-wrap">
                      <div className="price-left">
                        <p className="price-tp2">{price}<span className="won">만원</span></p>
                      </div>
                      {/* #a2 start */}
                      <div className="price-right">
                        {
                          buttonName !== '' && <Button size="mid" color="red60" line="red60" radius={true} title={buttonName} width="100" onClick={handleBtnClick} href="/homeService/serviceStep01" />
                        }
                      </div>
                      {/* #a2 end */}
                    </div>
                  </div>
                </div>
              </span>)
          }
        </li>
      )
    } else {
      return (
        <li>
          {
            <span onDragStart={handleOnDragStart}>
              <ImgCover src={image} alt={alt}>
                <ImgHover />
              </ImgCover>
              <div className="summary">
                <Link href="/mypage/dealerBuy01_01">
                  <a>
                    <div className="info-wrap">
                      <h5 className="subject">{name}</h5>
                      <div className="info">{infos.map((v, i) => <span key={i}>{v}</span>)}</div>
                    </div>
                  </a>
                </Link>
                <div className="limit"><span className="time" className={limitTime.substr(2, 2) < "02" ? "time tx-red80" : "time"}>{limitTime}</span><span className="num">[{limitNum}명 입찰중]</span></div>
                <Button size="big"
                  background={buttonName === "입찰하기" ? "gray" : "blue80"}
                  title={buttonName === "입찰하기" ? "입찰하기" : "입찰가격 수정"}
                  buttonMarkup={true}
                  width={176} marginTop={24} onClick={buttonName === "입찰하기" ? handleOpenTender : handleOpenTender} />
              </div>
            </span>
          }
          <BannerItemContext.Provider value={contextValue}>
            {createBodyPortal3(<BannerItemAuction isBidding={buttonName === "입찰하기" ? false : true} />)}
          </BannerItemContext.Provider>
        </li>
      )
    }

  } else if (bannerType === 'vertical') {
    if (verticalMode === 1) {
      return (
        <tr>
          <td>
            <div className="img-cover-wrap">
              <ImgCover src={image} alt={alt} />
              <div className="price-opt">{createOption()}</div>
              <ImgHover />
              <BannerItemContext.Provider value={contextValue}>
                {createBodyPortal2(<BannerItemConfirm />)}
              </BannerItemContext.Provider>
            </div>
          </td>
          <td>
            <div className="summary">
              <span className="list-tag2">{createTag()}</span>
              <Link href="#"><a><h5>{name}</h5></a></Link>
              <div className="info">{infos.map((v, i) => <span key={i}>{v}</span>)}</div>
            </div>
          </td>
          <td>
            <p className="price-tp2">{price}<span className="won">만원</span></p>
            {buttonName !== '' && <Button size="mid" size="mid" color="red60" line="red60" radius={true} title={buttonName} width={112} onClick={handleBtnClick} />}
          </td>
        </tr>
      )
    } else if (verticalMode === 2) {
      return (
        <tr>
          <td>
            <div className="img-cover-wrap">
              <ImgCover src={image} alt={alt} />
              <ImgHover />
              <BannerItemContext.Provider value={contextValue}>
                {createBodyPortal2(<BannerItemConfirm />)}
              </BannerItemContext.Provider>
            </div>
          </td>
          <td>
            <div className="summary">
              <Link href="#"><a><h5>{name}</h5></a></Link>
              <div className="info">{infos.map((v, i) => <span key={i}>{v}</span>)}</div>
            </div>
          </td>
          <td>
            <div className="price-opt">{createOption()}</div> {/* #a3 */}
            <span className="list-tag2">{createTag()}</span>
          </td>
          <td>
            <p className="price-tp2">{price}<span className="won">만원</span></p>
            {buttonName !== '' && <Button size="mid" size="mid" color="red60" line="red60" radius={true} title={buttonName} width={112} onClick={handleBtnClick} />}
          </td>
        </tr>
      )
    }

  } else if (bannerType === "brand") {
    return (
      <li onClick={hasMobile ? () => { Router.push(href) } : null}>
        <div className="brand-item">
          <ImgCover src={image} alt={alt} />
          <p>{name}</p>
        </div>
        <div className="brand-dim">
          <p>{name}</p>
          <Button size="full" background="blue80" title="인증중고차 보기" iconType='arrow-white sml' height={60} nextLink={true} href={href} />
        </div>
      </li>
    )
  }
});

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
  btnId: PropTypes.node,
}

export default BannerItem