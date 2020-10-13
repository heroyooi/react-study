import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import CarOptions from '@src/components/common/CarOptions';
import MypageSlideGallery from '@src/components/common/MypageSlideGallery';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import MypageTender from '@src/components/common/popup/MypageTender';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';
import { car_gallery } from '@src/dummy';
/*
  html 변경이력
  03.12 : CarOption props 변경
 
*/
const DealerBuy01_01 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  
  const { auction, bidding } = router.query;
  const [isAuction, setIsAuction] = useState(auction === String(true) ? true : false);
  const [isBidding, setIsBidding] = useState(bidding === String(true) ? true : false);

  // 팝업
  const [tenderPop, setTenderPop, openTenderPop, closeTenderPop] = useRodal(false);
  const [historyPop, setHistoryPop, handleOpenHistoryPop, handleCloseHistoryPop] = useRodal(false);

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-tender-sec">
          <div className="car-img-info">
            <MypageSlideGallery car_gallery={car_gallery} />
            <div className="car-info-area">
              <div className="info-wrap">
                <h3>현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄 프리미엄 프리미엄</h3>
                <p>
                  <span>19년식</span>
                  <span>22km</span>
                  <span>디젤</span>
                  <span>서울</span>
                </p>
              </div>
              {
                isAuction
                  ? ( // 입찰중
                    <>
                      <p className="time">- 10:45:21</p>
                      <p className="num">[ 21명 입찰중 ]</p>
                      <div className="btn-wrap">
                        {
                          isBidding ? (
                            <>
                              <Button size="big" background="gray" title="v 20" width={138} height={60} />
                              <Button size="big" background="blue80" title="입찰가격 수정" width={244} height={60} onClick={(e) => openTenderPop(e, "fade")} />
                            </>
                          ) : (
                            <>
                              <Button size="big" background="gray" title="+ 20" width={138} height={60} />
                              <Button size="big" background="blue80" title="입찰하기" width={244} height={60} onClick={(e) => openTenderPop(e, "fade")} />
                            </>
                          )
                        }
                      </div>
                    </>
                  ) : ( // 입찰종료
                    <>
                      <p className="time over">경매종료 : 2019-09-30 23:34</p>
                      <ul className="num over">
                        <li>관심 21명</li>
                        <li>입찰자 45명</li>
                      </ul>
                      <ul className="price-wrap">
                        <li>선택가<span className="tx-blue80">4,420만원</span></li>
                        <li>최고가<span>4,780만원</span></li>
                        <li>내견적<span>4,420만원</span></li>
                      </ul>
                    </>
                  )
              }
            </div>
          </div>

          <div className="car-basic-info">
            <table summary="차량 기본정보에 대한 내용" className="table-tp1">
              <caption>차량 기본정보</caption>
              <colgroup>
                <col width="16.66%" />
                <col width="16.66%" />
                <col width="16.66%" />
                <col width="16.66%" />
                <col width="16.66%" />
                <col width="16.66%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>03라4567</td>
                  <th>최초등록일</th>
                  <td>2017-05-07</td>
                  <th>형식년도</th>
                  <td>2018</td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>검정</td>
                  <th>연료</th>
                  <td>가솔린</td>
                  <th>배기량</th>
                  <td>1,591cc</td>
                </tr>
                <tr>
                  <th>차종</th>
                  <td>준중형차</td>
                  <th>출고가격</th>
                  <td>20,700,000원</td>
                  <th>주행거리(현재기준)</th>
                  <td>20,000km</td>
                </tr>
              </tbody>
            </table>

            <CarOptions title="차량 옵션" type={2} more={false} />

            <table summary="차량 옵션정보에 대한 내용" className="table-tp1 mt64">
              <caption className="away">차량 옵션정보</caption>
              <colgroup>
                <col width="20%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>추가옵션</th>
                  <td>사용자가 입력한 텍스트가 들어가는 영역입니다.</td>
                </tr>
                <tr>
                  <th>차량설명</th>
                  <td>사용자가 입력한 텍스트가 들어가는 영역입니다.</td>
                </tr>
                <tr>
                  <th>판금/교환여부</th>
                  <td>없음</td>
                </tr>
              </tbody>
            </table>

            <ul className="float-wrap mt64">
              <li><h4 className="mb33">보험처리 이력</h4></li>
              <li><Button size="mid" line="gray" radius={true} title="보험이력 자세히 보기" width={139} onClick={handleOpenHistoryPop} /></li>
            </ul>
            <table summary="보험처리 이력에 대한 내용" className="table-tp1 td-c">
              <caption className="away">보험처리 이력</caption>
              <colgroup>
                <col width="28%" />
                <col width="18%" />
                <col width="18%" />
                <col width="18%" />
                <col width="18%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>보험처리이력 등록기준일</th>
                  <td colSpan="4">2019.03.11</td>
                </tr>
                <tr>
                  <th>자동차 용도 변경</th>
                  <td colSpan="4">이력없음</td>
                </tr>
                <tr>
                  <th rowSpan="2">자동차 특수사고 이력</th>
                  <th>전손</th>
                  <td>0</td>
                  <th>도난</th>
                  <td>0</td>
                </tr>
                <tr>
                  <th>침수전손</th>
                  <td>0</td>
                  <th>침수분순</th>
                  <td>0</td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <p className="essential">
                      <i className="ico-dot mid"></i> 본 차량의 보험처리 이력정보는 2019년 03월 11일에 조회한 내용입니다.<br />
                      <i className="ico-dot mid"></i> 이후 이력 정보의 업데이트가 있을 수 있으며, 보험 이력 조회서비스에서 확인 가능합니다.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <RodalPopup show={tenderPop} type={'fade'} closedHandler={closeTenderPop} title={isBidding === false ? "입찰하기" : "입찰가격 수정"} mode="normal" size="small">
        <MypageTender isBidding={isBidding} />
      </RodalPopup>

      <RodalPopup show={historyPop} type={'fade'} closedHandler={handleCloseHistoryPop} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory />
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(DealerBuy01_01);