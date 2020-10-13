/**
 * '방문평가', '셀프평가', '무평가' 3가지의 판매 방법을 선택하는 화면
 * @fileOverview '방문평가', '셀프평가', '무평가' 3가지의 판매 방법을 선택하는 화면
 * @author 김민철
 */
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import Router from 'next/router';
import qs from 'qs';
import Button from '@lib/share/items/Button';
import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';
import { selectCarMart } from '@src/api/common/CarInfoApi';
import { isLogin, gInfoLive } from '@src/utils/LoginUtils';
import { getSellCarFaqAction, userInfoAction, updateCarSiseAction, resetCarSiseAction } from '@src/actions/sellcar/sellCarAction';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { console } from 'globalthis/implementation';
import { SystemContext } from '@src/provider/SystemProvider';
import { reqCarUseCheck } from '@src/utils/sellcar/SaleCarUtil';

const DEVICE_PC = 'pc';
const DEVICE_MB = 'mobile';
const REQTYPE_VSIT = 'visit';
const REQTYPE_SELF = 'self';
const REQTYPE_NEVL = 'noneval';
const MODE_NRML = 'normal';
const MODE_SISE = 'sise';
const LINK_MAP = {
  pc: {
    visit: {
      normal: '/sellcar/visit/visitValuationRequest',
      sise: '/sellcar/visit/visitValuationRequest'
    },
    self: {
      normal: '/sellcar/self/selfSellCarGuide',
      sise: '/sellcar/self/selfSellCarGuide'
    },
    noneval: {
      normal: '/sellcar/nonValue/noneValuationGuide',
      sise: '/sellcar/nonValue/noneValuationGuide'
    }
  }
};

/**
 * '방문평가', '셀프평가', '무평가' 3가지의 판매 방법을 선택하는 화면
 * @returns {sellCar}
 */
const SellCar = ({ router }) => {
  const query = router ? router.query : {};
  const mode = query.crNo && query.carInfo ? MODE_SISE : MODE_NRML;
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const faqDataList = useSelector((state) => state.sellCarStore.sellFaqList); // 자주하는 질문 리스트
  const { userInfo } = useSelector((rootStore) => rootStore.sellCarStore);
  const { showAlert } = useContext(SystemContext);

  const goNext = (reqType) => {
    const deviceType = !hasMobile ? DEVICE_PC : DEVICE_MB;
    let link = LINK_MAP[deviceType][reqType][mode];
    // 시세차량의 경우 셀프, 무평가의 차량의 버튼 링크가 변경된다.
    // 시세에서 넘어오는 데이터 처리해야함
    // 차량번호, 차량정보가 있어야하며, 로그인한 회원만이 이용가능함    
    if (mode === MODE_SISE && isLogin() && reqType !== REQTYPE_VSIT) {
      const carInfo = JSON.parse(query.carInfo);
      const crNo = query.crNo;
      const seriesno = carInfo?.seriesNo;
      const type = 'sise';
      let params = { crNo, seriesno, type };
      selectCarMart(params)
        .then((res) => {
          const seriesList = res.data.data.seriesList;
          if (seriesList.length > 0) {
            // 차량 목록이 다수 조회된 경우 처리
            // 시세로부터 tsKey가 넘어오지 않으며 조회된 모든 차량의 tsKey가 동일하기 때문에 인덱스의 차량으로부터 tsKey값을 가져온다.
            const tsKey = seriesList[0].tsKey;
            params = { ...params, tsKey };
          }
          dispatch(updateCarSiseAction(params));
          link = `${link}?${qs.stringify(params)}`;
          Router.push(link).then(() => {
            window.scrollTo(0, 0);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      dispatch(resetCarSiseAction());
      Router.push(link).then(() => {
        window.scrollTo(0, 0);
      });
    }
  };

  // 초기화
  useEffect(() => {
    const faqListParam = {
      pageNo: 1,
      tabNo: 2
    };
    dispatch({ type: SECTION_SELL });
    dispatch(getSellCarFaqAction(faqListParam));
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          options: ['back', 'gnb', 'transparent']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, [dispatch, hasMobile]);

  useEffect(() => {
    // TS 인증 - carmart 인포 조회
    // 로그인회원인경우 회원정보 리듀서에 등록
    dispatch(userInfoAction(gInfoLive()));
    //return JSON.stringify(carInfo);
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="sell-main-area">
          <div className="sell-top-banner">
            <div className="content-wrap">
              <h3 style={{ fontSize: 25 }}>
                나에게 맞는 <br />
                판매 방법을 선택하세요!
              </h3>
              <i className="top-banner-bg">
                <img src="/images/mobile/contents/sell-main-car.png" alt="" />
              </i>
            </div>
          </div>
          <div className="content-sec">
            <ul className="sell-ask-list">
              <li>
                <Button
                  size="full"
                  background="white"
                  color="black"
                  shadow={true}
                  title="복잡하고 어렵다면? <br />방문평가로 내 차 팔기 "
                  sub="전담 차량 평가사가 직접 찾아가서 차량 평가에서 매각까지 도와드립니다."
                  iconType="next-black"
                  href="../sell/visitApply"
                />
              </li>
              <li>
                <Button
                  size="full"
                  background="white"
                  color="black"
                  shadow={true}
                  title="최고가로 팔고 싶다면? <br />비교견적으로 내 차 팔기"
                  sub="내가 찍은 사진으로 24시간 비교견적을 통해 최고가로 판매할 수 있습니다."
                  iconType="next-black"
                  href="../sell/selfHome"
                />
              </li>
              <li>
                <Button
                  size="full"
                  background="white"
                  color="black"
                  shadow={true}
                  title="내 차 상태 자신있다면? <br />무평가 판매"
                  sub="복잡한 과정없이 비대면으로 편하게 판매할 수 있습니다."
                  iconType="next-black"
                  href="../sell/freeHome"
                />
              </li>
            </ul>
          </div>
          <div className="faq-wrap">
            <FaqList section="sellcar" faqData={faqDataList} tabNo={2} isShowOnlyOne={true} />
          </div>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="mycar-sell-intro">
        <div className="content-wrap">
          <h3>나에게 맞는 판매 방법을 선택하세요!</h3>
          {/* <h3>나에게 맞는 판매 방법을 선택하세요! [{userName}]</h3> */}
          <ul className="sell-ask-list">
            <li>
              <h4>
                복잡하고 어렵다면?
                <span>
                  <b>방문평가</b>로 내 차 팔기
                </span>
              </h4>
              <p className="intro">전담 차량 평가사가 직접 찾아가서 차량 평가에서 매각까지 도와드립니다.</p>
              <div className="btn-ask">
                <a
                  href="/sellcar/visit/visitValuationRequest"
                  onClick={(e) => {
                    e.preventDefault();
                    goNext(REQTYPE_VSIT);
                  }}
                >
                  자세히보기
                </a>
              </div>
            </li>
            <li>
              <h4>
                최고가로 팔고 싶다면?
                <span>
                  <b>비교견적</b>으로 내 차 팔기
                </span>
              </h4>
              <p className="intro">내가 찍은 사진으로 24시간 비교견적을 통해 최고가로 판매할 수 있습니다.</p>
              <div className="btn-ask">
                <a
                  href="/sellcar/self/selfSellCarGuide"
                  onClick={(e) => {
                    e.preventDefault();
                    goNext(REQTYPE_SELF);
                  }}
                >
                  자세히보기
                </a>
              </div>
            </li>
            <li>
              <h4>
                내 차 상태 자신있다면?
                <span>
                  <b>무평가</b>로 내 차 팔기
                </span>
              </h4>
              <p className="intro">복잡한 과정없이 비대면으로 편하게 판매 할 수 있습니다.</p>
              <div className="btn-ask">
                <a
                  href="/sellcar/nonValue/noneValuationGuide"
                  onClick={(e) => {
                    e.preventDefault();
                    goNext(REQTYPE_NEVL);
                  }}
                >
                  자세히보기
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="content-wrap sell-home-wrap">
        <div className="content-wrap">
          <FaqList faqData={faqDataList} tabNo={2} />
        </div>
      </div>
    </AppLayout>
  );
};

// SellCar.getInitialProps = async (http) => {
//   const { reduxStore } = http;
//   await Promise.all([reduxStore.dispatch(getSellCarFaqAction())]); // 자주하는 질문 리스트 가져오기
//   return {};
// };

// export default SellCar;
export default withRouter(SellCar);
