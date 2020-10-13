/**
 * 설명 : 홈서비스 신청완료
 * @fileoverview 홈서비스>홈서비스>신청완료
 * @requires [getHomeStep1Data, estimatedAmounts]
 * @author 추호진
 */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import Steps from '@lib/share/items/Steps';

import AppLayout from '@src/components/layouts/AppLayout';
import { getHsvcReqInfo } from '@src/actions/homeservice/homeserviceAction';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST } from '@src/actions/types';

import { imgUrl } from '@src/utils/HttpUtils';

/**
 * 설명 : 홈서비스 신청 중 5단계인 홈서비스 신청완료를 수행한다.
 * @param {hsvcReqInfo, hsvcReqInfo} 차량정보, 결재정보
 * @returns {carDataSe, hsvcReqInfo} 차량정보, 결재정보
 */
const HomeServiceComplete = ({ query }) => {
  const { hsvcId } = query;
  const nf = Intl.NumberFormat();
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_HOME_SERVICE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '홈서비스',
          options: ['back', 'gnb']
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
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);
  const { hsvcReqInfo } = useSelector((state) => state.home);
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  useEffect(() => {
    if (!hsvcReqInfo) {
      setIsLoading(true);
      dispatch(getHsvcReqInfo(hsvcId)).then(() => setIsLoading(false));
    }
  }, [hsvcReqInfo]);

  if (hasMobile) {
    return (
      <AppLayout>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="service-step">
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={5} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4 className="tit2">
              홈서비스 신청완료
            </h4>
          </div>
          <div className="service-detail">
            <div className="service-car-info">
              <div className="img-wrap">
                <img src={`${imgUrl}${hsvcReqInfo?.crPhtURL}`} alt="홈서비스 차량 이미지" />
              </div>
              <table summary="차량 정보에 대한 내용" className="table-tp1 mb24">
                <caption className="away">차량 정보</caption>
                <colgroup>
                  <col width="22.5%" />
                  <col width="27.5%" />
                  <col width="22.5%" />
                  <col width="27.5%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량명</th>
                    <td colSpan="4">{hsvcReqInfo?.crNm}</td>
                  </tr>
                  <tr>
                    <th>금액</th>
                    <td colSpan="4">{hsvcReqInfo?.crAmt ? nf.format(hsvcReqInfo?.crAmt / 10000) : 0}만원</td>
                  </tr>
                  <tr>
                    <th>차량번호</th>
                    <td colSpan="4">{hsvcReqInfo?.crNo}</td>
                  </tr>
                  <tr>
                    <th>차량연식</th>
                    <td>{hsvcReqInfo?.frmYyyy}</td>
                    <th>연료</th>
                    <td>{hsvcReqInfo?.fuelNm}</td>
                  </tr>
                  <tr>
                    <th>주행거리</th>
                    <td>{hsvcReqInfo.drvDist ? nf.format(hsvcReqInfo.drvDist) : 0}km</td>
                    <th>배기량</th>
                    <td>{hsvcReqInfo.dspl ? nf.format(hsvcReqInfo.dspl) : 0}cc</td>
                  </tr>
                  <tr>
                    <th>변속기</th>
                    <td>{hsvcReqInfo?.mssNm}</td>
                    <th>차종</th>
                    <td>{hsvcReqInfo?.crTypeNm}</td>
                  </tr>
                  <tr>
                    <th>사고유무</th>
                    <td>{hsvcReqInfo?.crAcdtYn}</td>
                    <th>색상</th>
                    <td>{hsvcReqInfo?.crClrNm}</td>
                  </tr>
                  <tr>
                    <th>압류저당</th>
                    <td>{hsvcReqInfo?.szrMorCnt}</td>
                    <th>제시번호</th>
                    <td>{hsvcReqInfo?.crPrsnNum}</td>
                  </tr>
                </tbody>
              </table>
              <table summary="결제정보에 대한 내용" className="table-tp1 td-r mb16">
                <caption>결제정보</caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량가격</th>
                    <td>{hsvcReqInfo.crAmt ? nf.format(hsvcReqInfo.crAmt) : 0}원</td>
                  </tr>
                  <tr>
                    <th>이전 관리비</th>
                    <td>{nf.format(Number(hsvcReqInfo?.crMgmtAmt) + Number(hsvcReqInfo?.rdpmAgcyFeeAmt) + Number(hsvcReqInfo?.regAcqAmt))}원</td>
                  </tr>
                  <tr>
                    <th>EW 상품비</th>
                    <td>{hsvcReqInfo.atbWrntAmt ? nf.format(hsvcReqInfo.atbWrntAmt) : 0}원</td>
                  </tr>
                  <tr>
                    <th>배송비</th>
                    <td>{hsvcReqInfo.deliAmt ? nf.format(hsvcReqInfo.deliAmt) : 0}원</td>
                  </tr>
                  <tr>
                    <th className="tx-b">총 결제 금액</th>
                    <td>
                      <span className="price">{hsvcReqInfo.hsvcUseAmt ? nf.format(hsvcReqInfo.hsvcUseAmt) : 0}</span>원
                    </td>
                  </tr>
                </tbody>
              </table>
              <table summary="결제방식에 대한 내용" className="table-tp1">
                <caption className="away">결제방식</caption>
                <colgroup>
                  <col width="33%" />
                  <col width="67%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>결제방식</th>
                    <td>
                      {hsvcReqInfo?.athMthdNm} {hsvcReqInfo?.athMthdDvcd === '0030' ? '(이체금액 ' + nf.format(hsvcReqInfo.trnsAmt) + '원)' : ''}
                    </td>
                  </tr>
                  <tr>
                    <th>신청일</th>
                    <td>{hsvcReqInfo?.reqDt}</td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-exp-tp5 fs14">신청현황은 마이페이지에서 확인하실 수 있습니다.</p>
            </div>
          </div>
        </div>
        <Buttons align="center" className="full" marginTop={32}>
          <Button size="big" background="blue20" color="blue80" title="마이페이지" href="/mypage/personal/buycar/homeService" />
          <Button size="big" background="blue80" title="확인" href="/main" />
        </Buttons>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3 style={{paddingTop: 103}}>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={5} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4>홈서비스 신청완료</h4>
        </div>
        <div className="service-detail">
          <div className="tit-wrap">
            <li>
              <h5>{hsvcReqInfo?.crNm}</h5>
            </li>
          </div>
          <div className="service-car-info">
            <div className="img-wrap">
              <img src={hsvcReqInfo?.crPhtURL ? `${imgUrl}${hsvcReqInfo?.crPhtURL}` : ''} alt="홈서비스 차량 이미지" />
            </div>
            <table summary="홈서비스 차량 정보에 대한 내용" className="table-tp1">
              <caption className="away">홈서비스 차량 정보</caption>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>{hsvcReqInfo?.crNo}</td>
                  <th>연료</th>
                  <td>{hsvcReqInfo?.fuelNm}</td>
                </tr>
                <tr>
                  <th>연식</th>
                  <td>{hsvcReqInfo?.frmYyyy}년식</td>
                  <th>배기량</th>
                  <td>{hsvcReqInfo.dspl ? nf.format(hsvcReqInfo.dspl) : 0} cc</td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>{hsvcReqInfo.drvDist ? nf.format(hsvcReqInfo.drvDist) : 0} km</td>
                  <th>차종</th>
                  <td>{hsvcReqInfo?.crTypeNm}</td>
                </tr>
                <tr>
                  <th>변속기</th>
                  <td>{hsvcReqInfo?.mssNm}</td>
                  <th>색상</th>
                  <td>{hsvcReqInfo?.crClrNm}</td>
                </tr>
                <tr>
                  <th>사고유무</th>
                  <td>{hsvcReqInfo?.crAcdtYn}</td>
                  <th>압류/저당</th>
                  <td>{hsvcReqInfo?.szrMorCnt}</td>
                </tr>
                <tr>
                  <th>제시번호</th>
                  <td>{hsvcReqInfo?.crPrsnNum}</td>
                  <th />
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
          <table summary="결제 정보에 대한 내용" className="table-tp1 th-c td-c service-payment mt64">
            <caption>결제 정보</caption>
            <colgroup>
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
              <col width="14.2%" />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan="2">차량가격</th>
                <th colSpan="3">
                  이전관리비
                  <Tooltip placement="bottom" width={514} event="click">
                    <TooltipItem>
                      <i className="ico-question" />
                    </TooltipItem>
                    <TooltipCont>
                      <div className="transfer-cost">
                        <p>중고차 이전비는 아래와 같은 항목으로 구성됩니다.</p>
                        <div className="service-notify">
                          <p>
                            <i className="ico-dot sml" /> 취등록세: 차량 취득에 부과되는 취득세와 등록을 위해 부과되는 등록세로 이루어집니다.
                          </p>
                          <p>
                            <i className="ico-dot sml" /> 차량관리비: 차량을 보관한 중고차 상사에게 납부하는 비용입니다.
                          </p>
                          <p>
                            <i className="ico-dot sml" /> 이전대행료: 등록신청대행에 소요되는 실제비용입니다.
                          </p>
                        </div>
                      </div>
                    </TooltipCont>
                  </Tooltip>
                </th>
                <th rowSpan="2">EW 상품비</th>
                <th rowSpan="2">배송비</th>
                <th rowSpan="2">총 결제 금액</th>
              </tr>
              <tr>
                <th>취등록세</th>
                <th>차량관리비</th>
                <th>이전대행료</th>
              </tr>
              <tr>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{hsvcReqInfo?.crAmt ? nf.format(hsvcReqInfo?.crAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{hsvcReqInfo?.regAcqAmt ? nf.format(hsvcReqInfo?.regAcqAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{hsvcReqInfo.crMgmtAmt ? nf.format(hsvcReqInfo.crMgmtAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{hsvcReqInfo.rdpmAgcyFeeAmt ? nf.format(hsvcReqInfo.rdpmAgcyFeeAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{hsvcReqInfo.atbWrntAmt ? nf.format(hsvcReqInfo.atbWrntAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4 tx-gray">
                    <span className="won">{hsvcReqInfo.deliAmt ? nf.format(hsvcReqInfo.deliAmt) : 0} 원</span>
                  </p>
                </td>
                <td>
                  <p className="price-tp4">
                    <span className="won">{hsvcReqInfo.hsvcUseAmt ? nf.format(hsvcReqInfo.hsvcUseAmt) : 0} 원</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <table summary="결제 정보에 대한 내용" className="table-tp1 th-c td-c">
            <caption className="away">결제 정보</caption>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제 방식</th>
                <th>신청일</th>
              </tr>
              <tr>
                <td>
                  {hsvcReqInfo?.athMthdNm} {hsvcReqInfo?.athMthdDvcd === '0030' ? '(이체금액 ' + nf.format(hsvcReqInfo.trnsAmt) + '원)' : ''}
                </td>
                <td>{hsvcReqInfo?.reqDt}</td>
              </tr>
            </tbody>
          </table>
          <div className="service-notify">
            <p className="tx-exp-tp5">* 신청현황은 마이페이지에서 확인하실 수 있습니다.</p>
          </div>
        </div>
        <Buttons align="center" marginTop={60}>
          <Button size="big" line="black" title="마이페이지" width={180} height={60} href="/mypage/personal/buycar/homeService" />
          <Button size="big" background="blue80" title="확인" width={180} height={60} href="/main" />
        </Buttons>
        {/* <div className="service-banner" /> */}
      </div>
    </AppLayout>
  );
};

HomeServiceComplete.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getHsvcReqInfo(query.hsvcId));

  return {
    query
  };
};

export default withRouter(HomeServiceComplete);
