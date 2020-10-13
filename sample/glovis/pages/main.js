import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "next/router";
import ReactPlayer from 'react-player';
import AppLayout from '@src/components/layouts/AppLayout';
import SearchArea from '@src/components/common/SearchArea';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import BannerItem from '@src/components/common/banner/BannerItem';
import RodalPopup from '@lib/share/popup/RodalPopup'; //#a 
import useRodal from '@lib/share/custom/useRodal';//#a 
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';  
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { SECTION_MAIN, MOBILE_HEADER_TYPE_MAIN, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { select1_list, car_list, mCarList, mobile_select_area } from '@src/dummy';

/*
  html 변경이력
  03.11 : 내차팔기신청버튼 onClick 이벤트추가 , #a 참고(팝업추가)  
*/


const Main = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MAIN });
  dispatch({ type: MOBILE_HEADER_TYPE_MAIN });
  const { popup } = router.query;

  const [mainVisual, setMainVisual] = useState(0);
  const [applyConfirm, setApplyConfirm] = useState(false);
 //#a start
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false); 
  const handleChangeAgree = useCallback((e) =>{
    console.log(e.target)
  }, [])
  const handleChangeTerm1 = useCallback((e) => {
    e.preventDefault();
    rodalPopupHandler2(e, "fade");    
  }, []);
  // #a1 end
  
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const visualChange = useCallback((e, num) => {
    e.preventDefault();
    setMainVisual(num);
  }, [mainVisual]);
  const handleSmartFinder = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#f6f7f8'
      }
    });    
    const [dimm1, setDimm1] = useState(Boolean(popup) === true ? true : false);
    const [applyConfirm, setApplyConfirm] = useState(Boolean(popup) === true ? true : false);
    const handleTermsApply = useCallback((e) => {
      e.preventDefault();
      setApplyConfirm(true);
      setDimm1(true);
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, []);    
    const handleCloseDimm1 = useCallback((e) => {
      e.preventDefault();
      setApplyConfirm(false);
      setDimm1(false);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, []);

    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [fpSterms, setFpSterms] = useState(false); // 방문평가 이용약관    
    
    const handleFullpagePopup = useCallback(name => e => {
      e.preventDefault();
      if (name === "Sterms") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '방문평가 이용약관(필수)',
            options: ['close'],
          }
        });              
        setFpSterms(true);
      }
      setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    }, [fpSterms]);

    const closeFullpagePopup = useCallback((e) => {
      e.preventDefault();
      setFpSterms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, [fpSterms])
    // 풀페이지 팝업 END
    
    return (
      <AppLayout>
        <div className="main-visual">
        {
          mainVisual === 0 &&
          <div className="mv-item buy">
            <div className="mvi-cont">
              <h3>중고차, 스마트하게 <strong>구매하세요!</strong></h3>
              <p className="intro">오토벨은 올바른 중고차 구매의 정석입니다.</p>              
            </div>
          </div>
        }
        {
          mainVisual === 1 &&
          <div className="mv-item sell">
            <div className="mvi-cont">
              <h3>이제 안심하고 <strong>판매하세요!</strong></h3>
              <p className="intro">오토벨은 안전한 내차팔기의 바이블입니다.</p>              
            </div>
          </div>
        }
        {
          mainVisual === 2 &&
          <div className="mv-item price">
            <div className="mvi-cont">
              <h3><strong>차량번호만 입력</strong>하세요!</h3>
              <p className="intro">오토벨은 정확한 시세조회의 지침서입니다.</p>              
            </div>
          </div>
          }
          <div className="pdside20">          
            <div className="indicator-wrap">
              <ul className="indicator">
                <li className="buy">
                  <span onClick={(e) => visualChange(e, 0)} className={mainVisual === 0 ? 'on' : ''}>
                    <strong>Buy</strong>
                    <span>내차사기</span>
                  </span>
                </li>
                <li className="sell">
                  <span onClick={(e) => visualChange(e, 1)} className={mainVisual === 1 ? 'on' : ''}>
                    <strong>Sell</strong>
                    <span>내차팔기</span>
                  </span>
                </li>
                <li className="price">
                  <span onClick={(e) => visualChange(e, 2)} className={mainVisual === 2 ? 'on' : ''}>
                    <strong>Price</strong>
                    <span>내차시세</span>
                  </span>
                </li>
              </ul>
              {
                mainVisual === 0 &&
                <fieldset className="mb16">
                  <legend className="away">Smart Finder</legend>
                  <SearchArea section="main" wrapperClass="search_field" onChange={handleSmartFinder} />
                </fieldset>
              }
              {
                mainVisual === 1 &&
                <>
                <fieldset>
                  <legend className="away">내 정보입력</legend>
                  <div className="search_field v-2">
                    <Input type="text" id="mv-sell-username" placeHolder="이름" height={40} />
                    <Input type="tel" id="mv-sell-phone" placeHolder="휴대폰번호(-없이)" height={40} marginTop={8} />
                    <div className="halfselec-wrap mt8">
                      <span className="halfselect">
                        <MobSelectBox id="mv-sell-address1" options={mobile_select_area} placeHolder="시/도 선택" />
                      </span>
                      <span className="halfselect">
                        <MobSelectBox id="mv-sell-address2" options={mobile_select_area} placeHolder="시/군/구 선택"/>
                      </span>                          
                    </div>                     
                  </div>
                </fieldset>
                <Button size="full" background="red40" title="내차팔기 신청" height={48} onClick={handleTermsApply}/>
                </>
              }
              {
                mainVisual === 2 &&
                <fieldset className="mb16">
                  <legend className="away">차량번호 입력</legend>
                  <div className="search_field v-3">                    
                    <Input type="text" id="mv-car-number" placeHolder="차량번호를 입력하세요."  />                    
                  </div>
                </fieldset>
              }
            </div>
          </div>          
        </div>

        <div className="content-wrap main-best-sec mt0">
          <h3>
            TODAY'S <b>BEST PICK</b>
          </h3>
          <div className="best-pick-wrap pdside20">              
            <ul className="best-pick-01">              
              <SlideBanner car_list={mCarList} touch={true} infinite={false} autoplay={false} slideType="banner-single">
                <BannerItem isMarkup={true}>
                  <div className="car-img">
                    <img src="/images/dummy/photo-best-pick1.png" alt=""/>
                  </div>                
                  <div className="info">
                    <p className="name">기아 셀토스 가솔린 터보 1.6 2WD 노블레스2</p>
                    <p className="price-tp5">
                      1,200<span className="won">만원</span>
                    </p>
                  </div>
                </BannerItem>
                <BannerItem isMarkup={true}>
                  <div className="car-img">
                    <img src="/images/dummy/photo-best-pick1.png" alt=""/>
                  </div>                
                  <div className="info">
                    <p className="name">기아 셀토스 가솔린 터보 1.6 2WD 노블레스2 기아 셀토스 가솔린 터보 1.6 2WD 노블레스2 기아 셀토스 가솔린 터보 1.6 2WD 노블레스2</p>
                    <p className="price-tp5">
                      1,200<span className="won">만원</span>
                    </p>
                  </div>
                </BannerItem>
                <BannerItem isMarkup={true}>
                  <div className="car-img">
                    <img src="/images/dummy/photo-best-pick1.png" alt=""/>
                  </div>                
                  <div className="info">
                    <p className="name">기아 셀토스</p>
                    <p className="price-tp5">
                      1,200<span className="won">만원</span>
                    </p>
                  </div>
                </BannerItem>
              </SlideBanner>
            </ul>
          </div>
        </div>
        <div className="content-sec mt10">
          <div className="content-wrap main-popular-sec">
            <h3>
              오토벨 <b>인기차량 모아보기</b>
            </h3>
            <div className="list-slick">
              <ul className="goods-list">
                <li>
                  <div className="car-img">
                    <img src="/images/mobile/dummy/live-studio-car.png" alt=""/>
                    <i className="ico-touch"></i>
                  </div>
                  <div className="info">
                    <p className="name">오토벨 라이브스튜디오 차량</p>
                    <p className="info-txt">오토벨에서 직접 진단한<br />무사고/무결점 차량</p>
                  </div>
                </li>                                                                 
              </ul>
            </div>
          </div>
        </div>
        <div className="content-wrap main-sell-sec">
          <h3>
            오토벨에서<br /> <b>내차를 파는 3가지 방법</b>
          </h3>
          <p>본인에게 맞는 판매방식을 골라보세요</p>
          <ul className="sell-ico-wrap2 mt24">
            <SlideBanner car_list={mCarList} touch={true} infinite={true} dots={true} autoplay={false} slideType="banner-single">
              <BannerItem isMarkup={true}>           
                <i className="sell-service-img-01"><img src="/images/contents/photo-main-sell1.png" alt=""/></i>
                <p className="exp">어렵고 복잡하신가요?<br />간편하게 전문가에게 맡기는</p>
                <p className="tit">방문평가</p>
              </BannerItem>
              <BannerItem isMarkup={true}>           
                <i className="sell-service-img-01"><img src="/images/contents/photo-main-sell2.png" alt=""/></i>
                <p className="exp">내차 판매는 내가 직접<br />판매방법도 내가 선택하는</p>
                <p className="tit">셀프등록판매</p>
              </BannerItem>
              <BannerItem isMarkup={true}>           
                <i className="sell-service-img-01"><img src="/images/contents/photo-main-sell3.png" alt=""/></i>
                <p className="exp">내 차 상태 자신있는데?<br />평가없이 돈부터 지급받는</p>
                <p className="tit">무평가판매</p>
              </BannerItem>
            </SlideBanner>                       
          </ul>
        </div>
        <div className="content-sec mt10">
          <div className="content-wrap main-price-sec">
            <h3>
              오늘의 인기차량,<br /> <b>시세를 확인해보세요</b>
            </h3>
            <ul className="today-price">
              <li className="price-car">
                <div className="price-car-img">
                  <img src="/images/mobile/dummy/price-car-img.png" alt="현대 LF쏘나타 하이브리드 2.0 GDI 스마트" />
                </div>
                <div className="pdside20">
                  <p className="price-car-name">현대 LF쏘나타 하이브리드 2.0 GDI 스마트</p>
                  <ul className="price-car-state">
                    <li>2016년</li>
                    <li>전기+가솔린</li>
                    <li>3,100만원</li>
                    <li>60,000km</li>
                  </ul>
                </div>
              </li>
              <li className="price-graph">
                <div className="price-graph-in">
                </div>
                <Button size="full" background="blue20" color="blue80" radius={true} title="시세정보 더 확인하기" height={56} marginTop={24} href="/marketPrice/marketPrice" nextLink={true} />
              </li>
            </ul>
          </div>
        </div>
        <div className="content-sec main-banner-wrap">
          <div className="main-banner">
            <Link href="#"><a><img src="/images/mobile/contents/main-banner-hyundaicapital.png" alt=""/></a></Link>
          </div>
        </div>

        {/* #a 내차팔기신청 팝업추가 start */}
        <div className={dimm1 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm1}></div>
        <MobBottomArea active={applyConfirm}>
          <div className="inner bottom-write-area">
            <p className="tit1">입력하신 내용으로<br />방문평가 판매를 신청하시겠습니까?</p>
            <table className="table-tp1" summary="방문평가 판매 신청에 대한 내용">
              <caption className="away">방문평가 판매 신청</caption>
              <colgroup>
                <col width="33%" />
                <col width="67%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>이름</th>
                  <td>김현대</td>
                </tr>
                <tr>
                  <th>휴대전화번호</th>
                  <td>010-2323-2323</td>
                </tr>
                <tr>
                  <th>고객방문 지역</th>
                  <td>서울시 강남구</td>
                </tr>
              </tbody>
            </table>
            <div className="mt16 terms-check">
              <CheckBox id='chk-useGuide' title='방문평가 이용약관 (필수)' termPop={true} onChange={handleChangeAgree} termPopHandle={handleChangeTerm1}/>            
            </div>
          </div>          
          <Button size="full" background="blue80" title="확인" href="visitComplete"/>
        </MobBottomArea>
        
        <MobFullpagePopup>
          {
            fpSterms && (
              <div>개인정보처리방침</div>
            )
          } 
        </MobFullpagePopup>
        {/* #a 내차팔기신청 팝업추가 end */}
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="main-visual">
      {
        mainVisual === 0 &&
        <div className="mv-item buy">
          <div className="mvi-cont">
            <h3>중고차, 스마트하게 <strong>구매하세요!</strong></h3>
            <p className="intro">오토벨은 올바른 중고차 구매의 정석입니다.</p>
            <fieldset>
              <legend className="away">Smart Finder</legend>
              <SearchArea section="main" wrapperClass="search_field" onChange={handleSmartFinder} />
            </fieldset>
          </div>
        </div>
      }
      {
        mainVisual === 1 &&
        <div className="mv-item sell">
          <div className="mvi-cont">
            <h3>이제 안심하고 <strong>판매하세요!</strong></h3>
            <p className="intro">오토벨은 안전한 내차팔기의 바이블입니다.</p>
            <fieldset>
              <legend className="away">내 정보입력</legend>
              <div className="search_field">
                <Input type="text" id="mv-sell-username" placeHolder="이름" width={255} height={44} />
                <Input type="tel" id="mv-sell-phone" placeHolder="휴대폰번호(-없이)" width={255} height={44} />
                <SelectBox id="mv-sell-address1" className="items-sbox" options={select1_list} placeHolder="시/도 선택"  width={255} height={44} />
                <SelectBox id="mv-sell-address2" className="items-sbox" options={select1_list} placeHolder="시군구 선택"  width={255} height={44} />
                <Button size="big" title="내차팔기 신청" className="mv-btn"  onClick={(e) => rodalPopupHandler1(e, "fade")} />{/* #a 이벤트 추가 */}
              </div>
            </fieldset>
          </div>
        </div>
      }
      {
        mainVisual === 2 &&
        <div className="mv-item price">
          <div className="mvi-cont">
            <h3><strong>차량번호만 입력</strong>하세요!</h3>
            <p className="intro">오토벨은 정확한 시세조회의 지침서입니다.</p>
            <fieldset>
              <legend className="away">차량번호 입력</legend>
              <div className="search_field">
                <Input type="text" id="mv-car-number" placeHolder="차량번호를 입력하세요." width={414} height={44} />
                <Button size="big" title="Search" className="mv-btn search" />
              </div>
            </fieldset>
          </div>
        </div>
        }
        <ul className="indicator">
          <li className="buy">
            <span onClick={(e) => visualChange(e, 0)} className={mainVisual === 0 ? 'on' : ''}>
              <strong>Buy</strong>
              <span>내차사기</span>
            </span>
          </li>
          <li className="sell">
            <span onClick={(e) => visualChange(e, 1)} className={mainVisual === 1 ? 'on' : ''}>
              <strong>Sell</strong>
              <span>내차팔기</span>
            </span>
          </li>
          <li className="price">
            <span onClick={(e) => visualChange(e, 2)} className={mainVisual === 2 ? 'on' : ''}>
              <strong>Price</strong>
              <span>내차시세</span>
            </span>
          </li>
        </ul>
      </div>

      <div className="content-wrap main-best-sec">
        <h3>
          TODAY'S <b>BEST PICK</b>
        </h3>
        <div className="best-pick-wrap">
          <ul className="best-pick-01">
            <li>
              <img src="/images/dummy/photo-best-pick1.png" alt=""/>
              <div className="info">
                <p className="name">기아 셀토스 가솔린 터보 1.6 2WD 노블레스2</p>
                <p className="price-tp5">
                  1,200<span className="won">만원</span>
                </p>
              </div>
            </li>
            <li className="info">
              <p className="name">삼성 QM6 디젤 2.0 2WD RE 시그니처</p>
              <p className="price-tp5">
                970<span className="won">만원</span>
              </p>
            </li>
            <li><img src="/images/dummy/photo-best-pick2.png" alt=""/></li>
          </ul>
          <ul className="best-pick-02">
            <li className="info">
              <p className="name">기아 K5 2세대 2.0 가솔린 SX 노블레스</p>
              <p className="price-tp5">720<span className="won">만원</span></p>
            </li>
            <li><img src="/images/dummy/photo-best-pick3.png" alt=""/></li>
            <li><img src="/images/dummy/photo-best-pick4.png" alt=""/></li>
            <li className="info">
              <p className="name">현대 그랜저 IG 3.0 익스클루시브 Special</p>
              <p className="price-tp5">
                850<span className="won">만원</span>
              </p>
            </li>
            <li className="info">
              <p className="name">현대 그랜저 하이브리드 프리미엄</p>
              <p className="price-tp5">1,010<span className="won">만원</span></p>
            </li>
            <li><img src="/images/dummy/photo-best-pick5.png" alt=""/></li>
          </ul>
        </div>
      </div>
      <div className="content-sec">
        <div className="content-wrap main-popular-sec">
          <h3>
            카테고리별 <b>인기 매물</b>
          </h3>
          <div className="list-slick">
            <ul className="goods-list">
              <SlideBanner car_list={car_list} touch={true} dots={true} autoplay={true} customArrow={true} hasMarkup={[0]} variableWidth={true}>
                <BannerItem isMarkup={true}>
                  <div className="main-advertise">
                   <p className="ad-tit">오토벨 LIVE SHOT</p>
                   <p className="ad-exp">오토벨 전문사가<br />직접 진단하고 100% 책임지는<br />신뢰도 높은 차량들입니다.</p>
                   <div className="ad-photo" style={{right:"0px"}}><img src="/images/contents/photo-main-popular1.png" alt=""/></div>
                  </div>
                </BannerItem>
                {/*<BannerItem isMarkup={true}>
                  <div className="main-advertise">
                   <p className="ad-tit">홈서비스 차량</p>
                   <p className="ad-exp">현대 오토벨 경매장에서<br />낙찰된 믿을 수 있는 낙찰 차량만 <br />았습니다!</p>
                   <div className="ad-photo"><img src="/images/contents/photo-main-popular2.png" alt=""/></div>
                  </div>
                </BannerItem>
                <BannerItem isMarkup={true}>
                  <div className="main-advertise">
                   <p className="ad-tit">오토옥션 낙찰차량</p>
                   <p className="ad-exp">현대 오토벨과 함께하는<br />수입/금융사/프랜차이즈 에서<br />확인하고 판매하는 인증 중고차</p>
                   <div className="ad-photo"><img src="/images/contents/photo-main-popular3.png" alt=""/></div>
                  </div>
                </BannerItem>*/}
              </SlideBanner>
            </ul>
          </div>
        </div>
      </div>
      <div className="content-wrap main-sell-sec">
        <h3>
          오토벨에서 <b>내차를 파는 </b>
          <em>3가지 방법</em>
        </h3>
        <p>본인에게 맞는 판매방식을 골라보세요</p>
        <ul className="sell-ico-wrap">
          <li>
            <i className="sell-service-img-01"><img src="/images/contents/photo-main-sell1.png" alt=""/></i>
            <p className="exp">어렵고 복잡하신가요?<br />간편하게 전문가에게 맡기는</p>
            <p className="tit">방문평가</p>
          </li>
          <li>
            <i className="sell-service-img-02"><img src="/images/contents/photo-main-sell2.png" alt=""/></i>
            <p className="exp">내차 판매는 내가 직접<br />판매방법도 내가 선택하는</p>
            <p className="tit">셀프등록판매</p>
          </li>
          <li>
            <i className="sell-service-img-03"><img src="/images/contents/photo-main-sell3.png" alt=""/></i>
            <p className="exp">내 차 상태 자신있는데?<br />평가없이 돈부터 지급받는</p>
            <p className="tit">무평가판매</p>
          </li>
        </ul>
      </div>
      <div className="content-sec">
        <div className="content-wrap main-price-sec">
          <h3>
            오늘의 인기차량, <b>시세를 확인해보세요</b>
          </h3>
          <ul className="today-price">
            <li className="price-car">
              <p className="price-car-name">현대 LF쏘나타 하이브리드 2.0 GDI 스마트</p>
              <div className="price-car-img">
                <img src="/images/dummy/price-car-img.png" alt="현대 LF쏘나타 하이브리드 2.0 GDI 스마트" />
              </div>
              <ul className="price-car-state">
                <li>
                  <p>연식</p>2016<span className="ko">년</span>
                </li>
                <li>
                  <p>연료</p>전기+가솔린
                </li>
                <li>
                  <p>신차가</p>3,100<span className="ko">만원</span>
                </li>
                <li>
                  <p>주행거리</p>60,000<span className="en">km</span>
                </li>
              </ul>
            </li>
            <li className="price-graph">
              <div className="price-graph-in"></div>
              <Buttons align="center">
                <Button size="big" background="white" color="black" title="시세정보 더 확인하기" width={200} fontSize={19} />
              </Buttons>
            </li>
          </ul>
        </div>
      </div>
      <div className="content-wrap main-video-sec">
        <div className="video">
          <div className="player-wrapper">
            <ReactPlayer className="react-player" url="https://www.glovis.net/upload/main_video01.mp4" playing={true} loop={true} controls={true} muted={true} width={'100%'} height={'100%'} />
          </div>
        </div>
      </div>
      <div className="content-sec main-banner-wrap" style={{backgroundColor:"#5B2DDE"}}>
       <div className="main-banner">
         <Link href="#"><a><img src="/images/contents/main-banner-hyundaicapital.png" alt=""/></a></Link>
       </div>
      </div>

      {/* #a 내차팔기신청 팝업추가 start */}
      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} mode="normal" size="xs">
        <div className='con-wrap'>
          <p className="mb33">입력하신 내용으로 방문평가 판매를 신청하시겠습니까?</p>
          <table summary="방문평가 신청에 대한 내용" className="table-tp1">
            <caption className="away">방문평가</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>김현대</td>
              </tr>
              <tr>
                <th>휴대전화번호</th>
                <td>010-2873-7263</td>
              </tr>
              <tr>
                <th>거주지역</th>
                <td>서울시 강남구</td>
              </tr>
            </tbody>
          </table>

          <div className="mt10">
            <CheckBox id='chk-useGuide' title='방문평가 이용약관 (필수)' termPop={true} onChange={handleChangeAgree} termPopHandle={handleChangeTerm1}/>            
          </div>

          <Buttons align="center" marginTop={40}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="방문평가 이용약관 (필수)" mode="normal" size="medium">
        <div className="con-wrap">
          약관내용
        </div>
      </RodalPopup>
      {/* #a 내차팔기신청 팝업추가 end */}

    </AppLayout>
  );
};

export default withRouter(Main);
