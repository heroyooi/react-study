/**
 * 설명 : 포인트 제휴몰
 * @fileoverview 포인트 제휴몰
 * @requires
 * @author D191364
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';

import SlideBanner from '@src/components/common/banner/SlideBanner';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import ImgCover from '@lib/share/items/ImgCover';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { event_banner_list as eventBannerList, event_banner_list_m as eventBannerList_m, event_list as eventList } from '@src/dummy';

import { SECTION_EVENT, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { useEffect } from 'react';

const PointMall = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_EVENT });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '포인트제휴몰',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
          color: '#f6f7f8'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [ingEvent, setIngEvent] = useState(true);
  const tabClick = (e, idx) => {
    if (idx === 0) {
      setIngEvent(true);
    } else {
      setIngEvent(false);
    }
  };

  //팝업
  // eslint-disable-next-line no-unused-vars
  const [saveBasePop, setSaveBasePop, OpenSaveBasePop, CloseSaveBasePop] = useRodal(false);

  if (hasMobile) {    
    return (
      <AppLayout>
        <div className="event-contents point">
          <TabMenu type="type2 big" callBack={tabClick} defaultTab={1} tabLink={[{ index: 0, url: '/event/eventList' }]}>
            <TabCont tabTitle="이벤트" id="tab1-1" index={0} />
            <TabCont tabTitle="포인트제휴몰" id="tab1-2" index={1} />
          </TabMenu>
          <SlideBanner car_list={eventBannerList_m} touch={true} dots={true} autoplay={true} slideType="banner-single">
            {//상단 이벤트 배너
            eventBannerList_m.map((v, i) => {
              return (
                <div key={v.id} className="event-banner-item">
                  <Link href={v.href}>
                    <a target="_self">
                      <ImgCover src={v.imgUrl} alt={v.alt} />
                    </a>
                  </Link>
                </div>
              );
            })}
          </SlideBanner>
          <div className="pdside20 bg-white">
            <p className="event-msg">포인트몰 이용 안내</p>
            <div className="auction-process-wrap">
              <ul className="process-list">
                <li className="step1">
                  <span className="ico" />
                  <span className="tit">
                    <em>01</em>이용권 구매
                  </span>
                </li>
                <li className="step2">
                  <span className="ico" />
                  <span className="tit">
                    <em>02</em>포인트 적립
                  </span>
                </li>
                <li className="step3">
                  <span className="ico" />
                  <span className="tit">
                    <em>03</em>포인트몰 이동
                  </span>
                </li>
                <li className="step4">
                  <span className="ico" />
                  <span className="tit">
                    <em>04</em>제휴상품 구매
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pdside20 bg-white mt10">
            <ul className="m-toggle-list">
              <MenuItem>
                <MenuTitle>적립기준 보기</MenuTitle>
                <MenuCont>
                  <table summary="적립기준에 대한 내용" className="table-tp1">
                    <colgroup>
                      <col width="32%"/>
                      <col width="*"/>
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>대당 이용권</th>
                        <td>서비스 종료 시점 D+3일 이내 적립</td>
                      </tr>
                      <tr>
                        <th>자유 이용권</th>
                        <td>서비스 종료 시점 D+3일 이내 적립</td>
                      </tr>
                      <tr>
                        <th>Live Studio</th>
                        <td>관리자가 차량을 등록한 시점 D+3일 이내 적립</td>
                      </tr>
                      <tr>
                        <th>Live Shot</th>
                        <td>관리자가 차량을 등록한 시점 D+3일 이내 적립</td>
                      </tr>
                      <tr>
                        <th>경매낙찰 이용권</th>
                        <td>서비스 종료 시점 D+3일 이내 적립</td>
                      </tr>
                      <tr>
                        <th>프라이싱 조회권</th>
                        <td>적립 불가</td>
                      </tr>
                      <tr>
                        <th>업데이트권 대당</th>
                        <td>서비스 종료 시점 D+3일 이내 적립</td>
                      </tr>
                      <tr>
                        <th>업데이트권 자유</th>
                        <td>서비스 종료 시점 D+3일 이내 적립</td>
                      </tr>
                      <tr>
                        <th>Best Pick</th>
                        <td>적립불가</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tx-sub mt16">
                    * 1 POINT = 현금 1원 <br />* 최소 3,000P 이상부터 결제 시 사용 가능
                  </p>
                  <p className="tx-sub mt24">
                    1포인트는 오토벨 사이트 내 현금 1원을 의미하며, 사용 시 최소 3,000 포인트 이상 부터 결제 가능합니다. 포인트는 어떠한 경우에도 타인에게 매매 또는 양도할 수 없으며, 현금으로 전환할
                    수 없습니다. 지급 원인이 된 사건(상품 결제, 기능 사용 등) 이 무효화된 경우, 해당 포인트는 회수될 수 있습니다.
                  </p>
                  <p className="tx-sub mt16">
                    ※ 유효기간
                    <br />
                    적립일로부터 3년간 유효하며, 이후에는 자동 회수됩니다.
                    <br />
                    단, 포인트 정책에 따라 변동될 수 있습니다.
                  </p>
                </MenuCont>
              </MenuItem>
            </ul>
          </div>
          <div className="pdside20 bg-white mt10">
            <div className="essential-point">
              <p>사용안내</p>
              <ul>
                <li>
                  <i className="ico-dot mid" /> 제휴 된 포인트몰에서 등록된 상품 구매
                </li>
                <li>
                  <i className="ico-dot mid" /> 온라인플랫폼에서 포인트 사용 불가
                  <br />
                  (* 단, 포인트몰에서 온라인플랫폼 할인 쿠폰 구매 가능)
                </li>
              </ul>
              <p>유효기간</p>
              <ul>
                <li>
                  <i className="ico-dot mid" /> 적립일로부터 3년간 유효하며, 미사용 포인트는 적립 후 3년 이후 자동 회수
                  <br />
                  (* 단, 포인트 정책에 따라 변동될 수 있음)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap event-contents point">
        <h3>이벤트</h3>

        <TabMenu
          type="type1"
          callBack={tabClick}
          defaultTab={2}
          tabLink={[
            { index: 0, url: '/event/eventList' },
            { index: 1, url: '/event/eventList?eventType=end' },
            { index: 2, url: '/event/pointMall' }
          ]}
        >
          <TabCont tabTitle="진행중 이벤트" id="tab1-1" index={0} />
          <TabCont tabTitle="종료된 이벤트" id="tab1-2" index={1} />
          <TabCont tabTitle="포인트 제휴몰" id="tab1-3" index={2} />
        </TabMenu>

        <SlideBanner car_list={eventBannerList} touch={true} dots={true} autoplay={true} slideType="banner-single">
          {//상단 이벤트 배너
          eventBannerList.map((v, i) => {
            return (
              <div key={v.id} className="event-banner-item">
                <img src={v.imgUrl} alt={v.alt} />
                {/*<a href={v.href}><img src={v.imgUrl} alt={v.alt}/></a>*/}
              </div>
            );
          })}
        </SlideBanner>
        <p className="event-msg">포인트몰 이용 안내</p>

        <div className="auction-process-wrap">
          <ul className="process-list">
            <li className="step1">
              <span className="ico" />
              <span className="tit">
                <em>01</em>이용권 구매
              </span>
            </li>
            <li className="step2">
              <span className="ico" />
              <span className="tit">
                <em>02</em>포인트 적립
              </span>
            </li>
            <li className="step3">
              <span className="ico" />
              <span className="tit">
                <em>03</em>포인트몰 이동
              </span>
            </li>
            <li className="step4">
              <span className="ico" />
              <span className="tit">
                <em>04</em>제휴상품 구매
              </span>
            </li>
          </ul>
        </div>
        <p className="pointmall-chk" onClick={() => setSaveBasePop(true)}>
          오토벨 포인트몰 적립 기준을 확인해보세요
        </p>
        <div className="essential-point">
          <p>사용안내</p>
          <ul>
            <li>
              <i className="ico-dot mid" /> 제휴 된 포인트몰에서 등록된 상품 구매
            </li>
            <li>
              <i className="ico-dot mid" /> 온라인플랫폼에서 포인트 사용 불가
              <br />
              (* 단,포인트몰에서 온라인플랫폼 할인 쿠폰 구매 가능)
            </li>
          </ul>
          <p>유효기간</p>
          <ul>
            <li>
              <i className="ico-dot mid" /> 적립일로부터 3년간 유효하며, 미사용 포인트는 적립 후 3년 이후 자동 회수
              <br />
              (* 단,포인트 정책에 따라 변동될 수 있음)
            </li>
          </ul>
        </div>
      </div>

      <RodalPopup show={saveBasePop} type={'fade'} closedHandler={CloseSaveBasePop} title="적립기준" mode="normal" size="small">
        <div className="con-wrap popup-save-base">
          <table summary="적립기준에 대한 내용" className="table-tp1">
            <colgroup>
              <col width="30%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>대당 이용권</th>
                <td>서비스 종료 시점 D+3일 이내 적립</td>
              </tr>
              <tr>
                <th>자유 이용권</th>
                <td>서비스 종료 시점 D+3일 이내 적립</td>
              </tr>
              <tr>
                <th>Live Studio</th>
                <td>관리자가 차량을 등록한 시점 D+3일 이내 적립</td>
              </tr>
              <tr>
                <th>Live Shot</th>
                <td>관리자가 차량을 등록한 시점 D+3일 이내 적립</td>
              </tr>
              <tr>
                <th>경매낙찰 이용권</th>
                <td>서비스 종료 시점 D+3일 이내 적립</td>
              </tr>
              <tr>
                <th>프라이싱 조회권</th>
                <td>적립 불가</td>
              </tr>
              <tr>
                <th>업데이트권 대당</th>
                <td>서비스 종료 시점 D+3일 이내 적립</td>
              </tr>
              <tr>
                <th>업데이트권 자유</th>
                <td>서비스 종료 시점 D+3일 이내 적립</td>
              </tr>
              <tr>
                <th>Best Pick</th>
                <td>적립불가</td>
              </tr>
            </tbody>
          </table>
          <p>
            * 1 POINT = 현금 1원 <br /> * 최소 3,000P 이상부터 결제 시 사용 가능
          </p>
        </div>
        <div className="popup-inquire">
          <div className="popup-bg bottom">
            <p className="tx-sub">
              1포인트는 오토벨 사이트 내 현금 1원을 의미하며, 사용 시 최소 3,000 포인트 이상 부터 결제 가능합니다. 포인트는 어떠한 경우에도 타인에게 매매 또는 양도할 수 없으며, 현금으로 전환할 수
              없습니다. 지급 원인이 된 사건(상품 결제, 기능 사용 등) 이 무효화된 경우, 해당 포인트는 회수될 수 있습니다.
            </p>
            <p className="tx-sub bt">
              ※ 적립일로부터 3년간 유효하며, 이후에는 자동 회수됩니다. <br />
              단, 포인트 정책에 따라 변동될 수 있습니다.
            </p>
          </div>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default PointMall;
