import moment from 'moment'
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from 'next/link';
import ReactPlayer from 'react-player';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import { MOBILE_HEADER_TYPE_SUB } from '@src/actions/types';
import CarOptions from '@src/components/common/CarOptions';
import BannerItem from '@src/components/common/banner/BannerItem';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MypageSellPrice from '@src/components/common/MypageSellPrice';
import MypageMortgage from '@src/components/common/MypageMortgage';
import MypageAcidentRecord from '@src/components/common/MypageAcidentRecord';
import MypageMovieUrl from '@src/components/common/MypageMovieUrl';
import MypageCarEx from '@src/components/common/MypageCarEx';
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck';
// import CarPictureApply from '@src/components/common/CarPictureApply';
import MobSellRegister from '@src/components/common/MobSellRegister';

import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import InputFile from '@lib/share/items/InputFile';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import Radio from '@lib/share/items/Radio';
import Steps from '@lib/share/items/Steps';
import Textarea from '@lib/share/items/Textarea';
import Input from '@lib/share/items/Input';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobCalendar from "@lib/share/items/MobCalendar";
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
// import useRadioTx from '@lib/share/custom/useRadioTx';
import { foreignBrandList } from '@src/dummy';
import { car_list4, mCarList, mCarList2, m_radio_guaranteed, m_radio_contractor, m_mobile_number_list, mobile_select_area, textDummy } from '@src/dummy';

const yrTest3 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({
    type: MOBILE_HEADER_TYPE_SUB,
    data: {
      title: 'Yul Test3 : p',
      options: ['back']
    }
  });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const now = moment();

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);

  const [isValue2, setIsValue2] = useState(0);
  const handleChange2 = useCallback((e) => {
    e.preventDefault();
    setIsValue2(Number(e.target.value));
  }, [isValue2]);

  /*
  // 라이브샷 점검
  //차량 정보
  const [inspection0, inspectionChange0, inspectionActive0] = useRadioTx(1);
  //외장
  const [inspection1, inspectionChange1, inspectionActive1] = useRadioTx(1);
  const [inspection2, inspectionChange2, inspectionActive2] = useRadioTx(1);
  const [inspection3, inspectionChange3, inspectionActive3] = useRadioTx(2);
  const [inspection4, inspectionChange4, inspectionActive4] = useRadioTx(1);
  const [inspection5, inspectionChange5, inspectionActive5] = useRadioTx(1);
  const [inspection6, inspectionChange6, inspectionActive6] = useRadioTx(1);
  const [inspection7, inspectionChange7, inspectionActive7] = useRadioTx(1);
  const [inspection8, inspectionChange8, inspectionActive8] = useRadioTx(2);
  const [inspection9, inspectionChange9, inspectionActive9] = useRadioTx(1);
  const [inspection10, inspectionChange10, inspectionActive10] = useRadioTx(1);
  const [inspection11, inspectionChange11, inspectionActive11] = useRadioTx(1);
  //실내
  const [inspection12, inspectionChange12, inspectionActive12] = useRadioTx(2);
  const [inspection13, inspectionChange13, inspectionActive13] = useRadioTx(1);
  const [inspection14, inspectionChange14, inspectionActive14] = useRadioTx(1);
  const [inspection15, inspectionChange15, inspectionActive15] = useRadioTx(1);
  const [inspection16, inspectionChange16, inspectionActive16] = useRadioTx(1);
  const [inspection17, inspectionChange17, inspectionActive17] = useRadioTx(1);
  const [inspection18, inspectionChange18, inspectionActive18] = useRadioTx(1);
  const [inspection19, inspectionChange19, inspectionActive19] = useRadioTx(1);
  const [inspection20, inspectionChange20, inspectionActive20] = useRadioTx(1);
  const [inspection21, inspectionChange21, inspectionActive21] = useRadioTx(1);
  const [inspection22, inspectionChange22, inspectionActive22] = useRadioTx(1);
  const [inspection23, inspectionChange23, inspectionActive23] = useRadioTx(1);
  const [inspection24, inspectionChange24, inspectionActive24] = useRadioTx(1);
  const [inspection25, inspectionChange25, inspectionActive25] = useRadioTx(1);
  const [inspection26, inspectionChange26, inspectionActive26] = useRadioTx(1);
  const [inspection27, inspectionChange27, inspectionActive27] = useRadioTx(1);
  const [inspection28, inspectionChange28, inspectionActive28] = useRadioTx(1);
  const [inspection29, inspectionChange29, inspectionActive29] = useRadioTx(1);
  const [inspection30, inspectionChange30, inspectionActive30] = useRadioTx(1);
  //기능
  const [inspection31, inspectionChange31, inspectionActive31] = useRadioTx(2);
  const [inspection32, inspectionChange32, inspectionActive32] = useRadioTx(1);
  const [inspection33, inspectionChange33, inspectionActive33] = useRadioTx(1);
  const [inspection34, inspectionChange34, inspectionActive34] = useRadioTx(1);
  const [inspection35, inspectionChange35, inspectionActive35] = useRadioTx(1);
  const [inspection36, inspectionChange36, inspectionActive36] = useRadioTx(1);
  const [inspection37, inspectionChange37, inspectionActive37] = useRadioTx(1);
  const [inspection38, inspectionChange38, inspectionActive38] = useRadioTx(1);
  const [inspection39, inspectionChange39, inspectionActive39] = useRadioTx(1);
  const [inspection40, inspectionChange40, inspectionActive40] = useRadioTx(1);
  const [inspection41, inspectionChange41, inspectionActive41] = useRadioTx(1);
  const [inspection42, inspectionChange42, inspectionActive42] = useRadioTx(1);
  const [inspection43, inspectionChange43, inspectionActive43] = useRadioTx(1);
  const [inspection44, inspectionChange44, inspectionActive44] = useRadioTx(1);
  const [inspection45, inspectionChange45, inspectionActive45] = useRadioTx(1);
  const [inspection46, inspectionChange46, inspectionActive46] = useRadioTx(1);
  const [inspection47, inspectionChange47, inspectionActive47] = useRadioTx(1);
  const [inspection48, inspectionChange48, inspectionActive48] = useRadioTx(1);
  const [inspection49, inspectionChange49, inspectionActive49] = useRadioTx(1);
  const [inspection50, inspectionChange50, inspectionActive50] = useRadioTx(1);
  const [inspection51, inspectionChange51, inspectionActive51] = useRadioTx(1);
  const [inspection52, inspectionChange52, inspectionActive52] = useRadioTx(1);
  const [inspection53, inspectionChange53, inspectionActive53] = useRadioTx(1);
  const [inspection54, inspectionChange54, inspectionActive54] = useRadioTx(1);
  const [inspection55, inspectionChange55, inspectionActive55] = useRadioTx(1);
  const [inspection56, inspectionChange56, inspectionActive56] = useRadioTx(1);
  const [inspection57, inspectionChange57, inspectionActive57] = useRadioTx(1);

  //기능 입력 컴포넌트
  const InspectionTx = () => {
    return (
      <tr>
        <td colSpan="2">
          <Textarea type="tp1" width="100%" height={96} placeHolder="특이사항 입력" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
        </td>
      </tr>
    );
  }
*/


  const handleRouter = useCallback((href) => (e) => {
    e.preventDefault();
    Router.push(href);
  }, []);

  // 달력 기간 선택
  const handleBtnFilterClick1 = (label, e) => {
    console.log(label);
  }
  // 2개 이상인 경우 - 사용시 주석 삭제 요망
  // const handleBtnFilterClick2 = (label, e) => {
  //   console.log(label);
  // }

  // 차량 기본정보 - 달력
  const [calPop1, setCalPop1] = useState(false);
  const [calPop2, setCalPop2] = useState(false);
  const [isDate1, setIsDate1] = useState(moment());
  const [isDate2, setIsDate2] = useState(moment());
  const handleCalendarPop1 = e => {
    e.preventDefault();
    setCalPop1(true);
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  };
  const handleCalendarPop2 = e => {
    e.preventDefault();
    setCalPop2(true);
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  };
  const calendarCallback1 = (e, date) => {
    e.preventDefault();
    setIsDate1(date);
    setCalPop1(false);
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  };
  const calendarCallback2 = (e, date) => {
    e.preventDefault();
    setIsDate2(date);
    setCalPop2(false);
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  };
  const calendarClose = e => {
    setCalPop1(false);
    setCalPop2(false);
  };

  // InputFile & InputPicture
  const uploadList1 = (files) => {

    if (files !== null) {
      const _files = Object.values(files);
      _files.map(v => console.log(v));
    }
  };

  // Textarea
  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  }
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  }
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  }

  if (hasMobile) {
    return (
      <AppLayout>
        {/* 마이페이지 - 딜러 */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div className="info-modify">
            <TabMenu type="type2" mount={false}>
              <TabCont tabTitle="가격" id="tab1-1" index={0}>
                <div className="market-price-graph pd20">
                  <span className="tit">이 차량의 현재 시세<span>(단위: 만원)</span></span>
                  <img src="/images/mobile/dummy/graph1.png" alt="현재시세 그래프" />
                </div>
                <form className="register-form pdside20">
                  {/* 판매가격 */}
                  <MypageSellPrice />

                  <fieldset>
                    <legend className="away">노출유형</legend>
                    <div className="register-exposure">
                      <h4>노출유형</h4>
                      <ul className="radio-block small">
                        <li><Radio className="txt" id="radio1" label="프랜차이즈" value={1} checked={isValue1} onChange={handleChange1} /></li>
                        <li><Radio className="txt" id="radio2" label="일반" value={2} checked={isValue1} onChange={handleChange1} /></li>
                      </ul>
                    </div>
                  </fieldset>
                </form>
              </TabCont>
              <TabCont tabTitle="차량정보" id="tab1-2" index={1}>
                <div className="register-form">
                  <p className="car-name">
                    03라4567<span>기아 K3 쿱 1.6 터보 GDI 프레스티지</span>
                  </p>
                  <ul className="m-toggle-list up-blue pdside20">
                    <MenuItem>
                      <MenuTitle>차량 기본정보</MenuTitle>
                      <MenuCont>
                        <table summary="차량 기본정보에 대한 내용" className="table-tp3">
                          <caption className="away">차량 기본정보</caption>
                          <colgroup>
                            <col width="32%" />
                            <col width="68%" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>최초등록일</th>
                              <td><DatePicker defaultValue={isDate1} width='100%' /></td>
                            </tr>
                            <tr>
                              <th>형식년도</th>
                              <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
                            </tr>
                            <tr>
                              <th>색상</th>
                              <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
                            </tr>
                            <tr>
                              <th>연료</th>
                              <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
                            </tr>
                            <tr>
                              <th>배기량</th>
                              <td><Input type="text" placeHolder="배기량을 입력해주세요" id="input-tp1" width='100%' /></td>
                            </tr>
                            <tr>
                              <th>차종</th>
                              <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
                            </tr>
                            <tr>
                              <th>용도</th>
                              <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
                            </tr>
                            <tr>
                              <th>출고가격</th>
                              <td><Input type="text" placeHolder="출고가격을 입력해주세요" id="input-tp2" width='100%' /></td>
                            </tr>
                            <tr>
                              <th>주행거리<br />(현재기준)</th>
                              <td><Input type="text" placeHolder="주행거리를 입력해주세요" id="input-tp3" width='100%' /></td>
                            </tr>
                          </tbody>
                        </table>
                      </MenuCont>
                    </MenuItem>
                    <MenuItem>
                      <MenuTitle>압류/저당 입력</MenuTitle>
                      <MenuCont>
                        {/* 압류/저당 입력 */}
                        <MypageMortgage />
                      </MenuCont>
                    </MenuItem>
                    <MenuItem>
                      <MenuTitle>사고이력 정보</MenuTitle>
                      <MenuCont>
                        {/* 사고이력정보 */}
                        <MypageAcidentRecord />
                      </MenuCont>
                    </MenuItem>
                    <MenuItem>
                      <MenuTitle>동영상</MenuTitle>
                      <MenuCont>
                        {/* 동영상 */}
                        <MypageMovieUrl />
                      </MenuCont>
                    </MenuItem>
                  </ul>
                </div>
              </TabCont>
              <TabCont tabTitle="차량사진" id="tab1-3" index={2}>
                {/* <CarPictureApply mode="dealer" /> */}
                <MobSellRegister />
              </TabCont>
              <TabCont tabTitle="성능기록" id="tab1-4" index={3}>
                <CarPerformanceCheck mode="apply" />
              </TabCont>
            </TabMenu>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #ddd' }}>
          <TabMenu type="type2" mount={false}>
            <TabCont tabTitle="포인트" id="tab1-1" index={0}>
              <div className="point-coupon-current">
                <p className="tit">보유포인트</p>
                <div className="float-wrap mt8">
                  <p>12,000<span>p</span></p>
                  <p className="tx-exp-tp4">7일 내 만료예정<span>12,000p</span></p>
                </div>
              </div>
              <ul className="m-toggle-list search">
                <MenuItem>
                  <MenuTitle>적립/사용내역<span>상세조회</span></MenuTitle>
                  <MenuCont>
                    <ul className="float-wrap mb16">
                      <li>판매상태</li>
                      <li><MobSelectBox options={mobile_select_area} width='100%' /></li>
                    </ul>
                    <MobButtonFilter checkList={[
                      { title: "1개월", checked: true },
                      { title: "3개월", checked: false },
                      { title: "6개월", checked: false },
                      { title: "1년", checked: false }
                    ]} onClick={handleBtnFilterClick1} />
                    <div className="mt8">
                      <DatePicker defaultValue={isDate1} width='46%' onClick={handleCalendarPop1} />
                      <em className="from">~</em>
                      <DatePicker defaultValue={isDate2} width='46%' onClick={handleCalendarPop2} />
                    </div>
                    <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={17} />
                  </MenuCont>
                </MenuItem>
                <li>
                  <div className="float-wrap">
                    <p>2019.08.17 ~ 2019.09.16</p>
                    <p>총 <span className="tx-blue80">123</span>건</p>
                  </div>
                </li>
              </ul>
              <ul className="point-tx-list content-border">
                <li>
                  <ul className="float-wrap">
                    <li>2019.08.17 (유효기간 : 2019.09.16)</li>
                    <li className="state">지급</li>
                  </ul>
                  <ul className="float-wrap">
                    <li className="tit">31~60일 이내 판매 신고 시 <span>1,000p</span></li>
                    <li className="point on">-1,000<span>p</span></li>
                  </ul>
                </li>
                <li>
                  <ul className="float-wrap">
                    <li>2019.08.17 (유효기간 : 2019.09.16)</li>
                    <li className="state">만료</li>
                  </ul>
                  <ul className="float-wrap">
                    <li className="tit">31~60일 이내 판매 신고 시 <span>1,000p</span></li>
                    <li className="point">-1,000<span>p</span></li>
                  </ul>
                </li>
              </ul>
            </TabCont>
            <TabCont tabTitle="쿠폰" id="tab1-2" index={1}>
              <div className="point-coupon-current">
                <p className="tit">보유쿠폰</p>
                <div className="float-wrap mt8">
                  <p>10<span>개</span></p>
                  <p className="tx-exp-tp4">7일 내 만료예정<span>1개</span></p>
                </div>
              </div>
              <TabMenu type="type1" mount={false}>
                <TabCont tabTitle="사용 가능한 쿠폰" id="tab1-1" index={0}>
                  <div className="popup-coupon">
                    <label htmlFor="coupon-num">쿠폰번호</label>
                    <span className="bridge"><Input type="text" placeHolder="예) 030480293-2348" id="coupon-num" width='70%' height={48} /></span>
                    <Button size="mid" background="blue80" radius={true} title="조회" measure='%' width={28} height={48} mgMeasure='%' marginLeft={2} />
                  </div>
                  <div className="coupon-area mypage">
                    <ul className="coupon-wrap">
                      <li>
                        <div className="coupon-img">
                          <span>무료 이용권</span>
                          <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                        </div>
                        <div className="con-wrap">
                          <p>무료 이용권</p>
                          <span>2019.12.23 등록</span>
                          <span className="float-wrap tx-black">
                            <em>2020.12.09 까지</em>
                            <em>36일 남음</em>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="coupon-img">
                          <span>무료 이용권</span>
                          <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                        </div>
                        <div className="con-wrap">
                          <p>무료 이용권</p>
                          <span>2019.12.23 등록</span>
                          <span className="float-wrap tx-black">
                            <em>2020.12.09 까지</em>
                            <em className="tx-red80">3일 남음</em>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </TabCont>
                <TabCont tabTitle="사용/만료된 쿠폰" id="tab1-2" index={1}>
                  <div className="coupon-area mypage">
                    <ul className="coupon-wrap">
                      <li>
                        <div className="coupon-img">
                          <span>무료 이용권</span>
                          <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                        </div>
                        <div className="con-wrap">
                          <p>무료 이용권</p>
                          <span>2019.12.23 등록</span>
                          <span className="tx-black">
                            <em>2020.12.09 <em className="tx-red80">사용</em></em>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="coupon-img">
                          <span>무료 이용권</span>
                          <img src="/images/mobile/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                        </div>
                        <div className="con-wrap">
                          <p>무료 이용권</p>
                          <span>2019.12.23 등록</span>
                          <span className="tx-black">
                            <em>2020.12.09 <em className="tx-red80">만료</em></em>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </TabCont>
              </TabMenu>
            </TabCont>
          </TabMenu>
          {
            <>
              <div
                className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`}
                onClick={calendarClose}
              ></div>
              <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
                <MobCalendar date={isDate1} callback={calendarCallback1} />
              </MobBottomArea>
              <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
                <MobCalendar date={isDate2} callback={calendarCallback2} />
              </MobBottomArea>
            </>
          }
        </div>

        <div style={{ paddingBottom: '48px', borderBottom: '1px solid #ddd' }}>
          <div className="live-shot-sec">
            <div className="photo-area">
              <p className="tit2">Live Shot 차량 등록이 완료되었습니다</p>
              <ul className="photo-complete">
                <li>
                  <p>성능점검</p>
                  <div className="photo-wrap"></div>
                  <span>66개 점검항목</span>
                </li>
                <li>
                  <p>사진촬영</p>
                  <div className="photo-wrap"></div>
                  <span>20개 차량사진</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ paddingBottom: '48px', borderBottom: '1px solid #ddd' }}>
          <div className="live-shot-sec">
            <div className="photo-area">
              <p className="tit2">촬영하신 사진을 확인해보세요</p>
              <ul className="float-wrap">
                <li>사진촬영 (10/20)</li>
                <li><Link href="#"><a>미리보기</a></Link></li>
              </ul>
              <div className="photo-wrap"></div>
              <Buttons align="center" marginTop={20}>
                <Button size="mid" line="gray" radius={true} title="재촬영" width={71} height={38} fontWeight={500} />
                <Button size="mid" background="blue80" radius={true} title="업로드" width={71} height={38} fontWeight={500} marginLeft={16} />
              </Buttons>
            </div>
          </div>
        </div>

        <div style={{ paddingBottom: '48px', borderBottom: '1px solid #ddd' }}>
          <div className="live-shot-sec">
            <div className="photo-area">
              <p className="tit2">가이드에 맞춰 사진 촬영을 진행해 주세요</p>
              <div className="photo-wrap"></div>
              <Buttons align="center" marginTop={20}>
                <Button size="mid" background="blue80" radius={true} title="촬영하기" width={84} height={38} fontWeight={500} />
              </Buttons>
            </div>
          </div>
        </div>


        {/* <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="m-toggle-list up-blue">
            <MenuItem>
              <MenuTitle>차량 정보</MenuTitle>
              <MenuCont>
                <table summary="차량 기본정보에 대한 내용" className="table-tp3">
                  <caption className="away">차량 기본정보</caption>
                  <colgroup>
                    <col width="32%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>제조사</th>
                      <td><Input type="text" value="현대자동차" id="input-tp1" disabled={true} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>모델</th>
                      <td><Input type="text" placeHolder="제네시스 G80 3.3 GDI AWD" disabled={true} id="input-tp1" width='100%' /></td>
                    </tr>
                    <tr>
                      <th>등급</th>
                      <td><Input type="text" placeHolder="프리미엄 럭셔리" id="input-tp1" disabled={true} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>색상</th>
                      <td><Input type="text" value="검정" id="input-tp1" width='100%' /></td>
                    </tr>
                    <tr>
                      <th>주행거리</th>
                      <td><Input type="text" value="3,434km" id="input-tp1" width='100%' /></td>
                    </tr>
                    <tr>
                      <th>차대번호</th>
                      <td><Input type="text" placeHolder="KMHGM41DDHU218412" id="input-tp1" disabled={true} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>최초등록일</th>
                      <td><Input type="text" placeHolder="2017-05-07" id="input-tp1" disabled={true} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>리콜여부</th>
                      <td>
                        <ul className="radio-block tp4">
                          <li>
                            <Radio className="txt" id="block3-1" label="해당없음" value={1} checked={inspection0} onChange={inspectionChange0} />
                          </li>
                          <li>
                            <Radio className="txt" id="block3-2" label="리콜진행" value={2} checked={inspection0} onChange={inspectionChange0} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive0 && <InspectionTx />}
                  </tbody>
                </table>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>외장</MenuTitle>
              <MenuCont>
                <table summary="외장에 대한 내용" className="table-tp3">
                  <caption className="away">외장</caption>
                  <colgroup>
                    <col width="47%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>앞 유리 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-1" label="양호" value={1} checked={inspection1} onChange={inspectionChange1} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-2" label="수리/보수 필요" value={2} checked={inspection1} onChange={inspectionChange1} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive1 && <InspectionTx />}
                    <tr>
                      <th>뒷 유리 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-3" label="양호" value={1} checked={inspection2} onChange={inspectionChange2} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-4" label="수리/보수 필요" value={2} checked={inspection2} onChange={inspectionChange2} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive2 && <InspectionTx />}
                    <tr>
                      <th>창문 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-5" label="양호" value={1} checked={inspection3} onChange={inspectionChange3} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-6" label="수리/보수 필요" value={2} checked={inspection3} onChange={inspectionChange3} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive3 && <InspectionTx />}
                    <tr>
                      <th>스티커 제거(규정 외)</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-7" label="양호" value={1} checked={inspection4} onChange={inspectionChange4} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-8" label="수리/보수 필요" value={2} checked={inspection4} onChange={inspectionChange4} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive4 && <InspectionTx />}
                    <tr>
                      <th>광택 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-9" label="양호" value={1} checked={inspection5} onChange={inspectionChange5} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-10" label="수리/보수 필요" value={2} checked={inspection5} onChange={inspectionChange5} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive5 && <InspectionTx />}
                    <tr>
                      <th>덴트, 흠집 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-11" label="양호" value={1} checked={inspection6} onChange={inspectionChange6} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-12" label="수리/보수 필요" value={2} checked={inspection6} onChange={inspectionChange6} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive6 && <InspectionTx />}
                    <tr>
                      <th>도장 상태(페인트)</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-13" label="양호" value={1} checked={inspection7} onChange={inspectionChange7} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-14" label="수리/보수 필요" value={2} checked={inspection7} onChange={inspectionChange7} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive7 && <InspectionTx />}
                    <tr>
                      <th>휠 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-15" label="양호" value={1} checked={inspection8} onChange={inspectionChange8} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-16" label="수리/보수 필요" value={2} checked={inspection8} onChange={inspectionChange8} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive8 && <InspectionTx />}
                    <tr>
                      <th>타이어 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-17" label="양호" value={1} checked={inspection9} onChange={inspectionChange9} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-18" label="수리/보수 필요" value={2} checked={inspection9} onChange={inspectionChange9} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive9 && <InspectionTx />}
                    <tr>
                      <th>번호판 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-19" label="양호" value={1} checked={inspection10} onChange={inspectionChange10} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-20" label="수리/보수 필요" value={2} checked={inspection10} onChange={inspectionChange10} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive10 && <InspectionTx />}
                    <tr>
                      <th>플라스틱류 부품 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block4-21" label="양호" value={1} checked={inspection11} onChange={inspectionChange11} />
                          </li>
                          <li>
                            <Radio className="txt" id="block4-22" label="수리/보수 필요" value={2} checked={inspection11} onChange={inspectionChange11} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive11 && <InspectionTx />}
                  </tbody>
                </table>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>실내</MenuTitle>
              <MenuCont>
                <table summary="실내에 대한 내용" className="table-tp3">
                  <caption className="away">실내</caption>
                  <colgroup>
                    <col width="47%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>실내 상태<br />(마모, 흠집, 파손)</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-1" label="양호" value={1} checked={inspection12} onChange={inspectionChange12} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-2" label="수리/보수 필요" value={2} checked={inspection12} onChange={inspectionChange12} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive12 && <InspectionTx />}
                    <tr>
                      <th>실내 세정 확인</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-3" label="양호" value={1} checked={inspection13} onChange={inspectionChange13} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-4" label="수리/보수 필요" value={2} checked={inspection13} onChange={inspectionChange13} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive13 && <InspectionTx />}
                    <tr>
                      <th>금연 차량 여부</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-5" label="양호" value={1} checked={inspection14} onChange={inspectionChange14} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-6" label="수리/보수 필요" value={2} checked={inspection14} onChange={inspectionChange14} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive14 && <InspectionTx />}
                    <tr>
                      <th>글로브박스 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-7" label="양호" value={1} checked={inspection15} onChange={inspectionChange15} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-8" label="수리/보수 필요" value={2} checked={inspection15} onChange={inspectionChange15} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive15 && <InspectionTx />}
                    <tr>
                      <th>대시보드 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-9" label="양호" value={1} checked={inspection16} onChange={inspectionChange16} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-10" label="수리/보수 필요" value={2} checked={inspection16} onChange={inspectionChange16} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive16 && <InspectionTx />}
                    <tr>
                      <th>실내 장식 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-11" label="양호" value={1} checked={inspection17} onChange={inspectionChange17} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-12" label="수리/보수 필요" value={2} checked={inspection17} onChange={inspectionChange17} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive17 && <InspectionTx />}
                    <tr>
                      <th>룸미러, 거울 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-13" label="양호" value={1} checked={inspection18} onChange={inspectionChange18} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-14" label="수리/보수 필요" value={2} checked={inspection18} onChange={inspectionChange18} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive18 && <InspectionTx />}
                    <tr>
                      <th>유리창 내면 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-15" label="양호" value={1} checked={inspection19} onChange={inspectionChange19} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-16" label="수리/보수 필요" value={2} checked={inspection19} onChange={inspectionChange19} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive19 && <InspectionTx />}
                    <tr>
                      <th>트렁크 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-17" label="양호" value={1} checked={inspection20} onChange={inspectionChange20} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-18" label="수리/보수 필요" value={2} checked={inspection20} onChange={inspectionChange20} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive20 && <InspectionTx />}
                    <tr>
                      <th>모든 시트 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-19" label="양호" value={1} checked={inspection21} onChange={inspectionChange21} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-20" label="수리/보수 필요" value={2} checked={inspection21} onChange={inspectionChange21} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive21 && <InspectionTx />}
                    <tr>
                      <th>모든 매트 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-21" label="양호" value={1} checked={inspection22} onChange={inspectionChange22} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-22" label="수리/보수 필요" value={2} checked={inspection22} onChange={inspectionChange22} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive22 && <InspectionTx />}
                    <tr>
                      <th>안전벨트 청결 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-23" label="양호" value={1} checked={inspection23} onChange={inspectionChange23} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-24" label="수리/보수 필요" value={2} checked={inspection23} onChange={inspectionChange23} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive23 && <InspectionTx />}
                    <tr>
                      <th>악취 처리/제거 확인</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-25" label="양호" value={1} checked={inspection24} onChange={inspectionChange24} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-26" label="수리/보수 필요" value={2} checked={inspection24} onChange={inspectionChange24} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive24 && <InspectionTx />}
                    <tr>
                      <th>루프 라이닝 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-27" label="양호" value={1} checked={inspection25} onChange={inspectionChange25} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-28" label="수리/보수 필요" value={2} checked={inspection25} onChange={inspectionChange25} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive25 && <InspectionTx />}
                    <tr>
                      <th>보조키 확인</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-29" label="양호" value={1} checked={inspection26} onChange={inspectionChange26} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-30" label="수리/보수 필요" value={2} checked={inspection26} onChange={inspectionChange26} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive26 && <InspectionTx />}
                    <tr>
                      <th>매뉴얼 확인</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-31" label="양호" value={1} checked={inspection27} onChange={inspectionChange27} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-32" label="수리/보수 필요" value={2} checked={inspection27} onChange={inspectionChange27} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive27 && <InspectionTx />}
                    <tr>
                      <th>스페어 타이어 확인</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-33" label="양호" value={1} checked={inspection28} onChange={inspectionChange28} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-34" label="수리/보수 필요" value={2} checked={inspection28} onChange={inspectionChange28} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive28 && <InspectionTx />}
                    <tr>
                      <th>도어 및 내장 트림 상태</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-35" label="양호" value={1} checked={inspection29} onChange={inspectionChange29} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-36" label="수리/보수 필요" value={2} checked={inspection29} onChange={inspectionChange29} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive29 && <InspectionTx />}
                    <tr>
                      <th>스티커 제거(규정 외)</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block5-37" label="양호" value={1} checked={inspection30} onChange={inspectionChange30} />
                          </li>
                          <li>
                            <Radio className="txt" id="block5-38" label="수리/보수 필요" value={2} checked={inspection30} onChange={inspectionChange30} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive30 && <InspectionTx />}
                  </tbody>
                </table>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>기능</MenuTitle>
              <MenuCont>
                <table summary="기능에 대한 내용" className="table-tp3">
                  <caption className="away">기능</caption>
                  <colgroup>
                    <col width="47%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>모든 잠금장치 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-1" label="양호" value={1} checked={inspection31} onChange={inspectionChange31} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-2" label="수리/보수 필요" value={2} checked={inspection31} onChange={inspectionChange31} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive31 && <InspectionTx />}
                    <tr>
                      <th>스마트키 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-3" label="양호" value={1} checked={inspection32} onChange={inspectionChange32} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-4" label="수리/보수 필요" value={2} checked={inspection32} onChange={inspectionChange32} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive32 && <InspectionTx />}
                    <tr>
                      <th>모든 실내등 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-5" label="양호" value={1} checked={inspection33} onChange={inspectionChange33} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-6" label="수리/보수 필요" value={2} checked={inspection33} onChange={inspectionChange33} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive33 && <InspectionTx />}
                    <tr>
                      <th>외부 라이트 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-7" label="양호" value={1} checked={inspection34} onChange={inspectionChange34} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-8" label="수리/보수 필요" value={2} checked={inspection34} onChange={inspectionChange34} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive34 && <InspectionTx />}
                    <tr>
                      <th>계기판 등 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-9" label="양호" value={1} checked={inspection35} onChange={inspectionChange35} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-10" label="수리/보수 필요" value={2} checked={inspection35} onChange={inspectionChange35} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive35 && <InspectionTx />}
                    <tr>
                      <th>메모리 시트 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-11" label="양호" value={1} checked={inspection36} onChange={inspectionChange36} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-12" label="수리/보수 필요" value={2} checked={inspection36} onChange={inspectionChange36} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive36 && <InspectionTx />}
                    <tr>
                      <th>전동 시트조절 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-13" label="양호" value={1} checked={inspection37} onChange={inspectionChange37} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-14" label="수리/보수 필요" value={2} checked={inspection37} onChange={inspectionChange37} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive37 && <InspectionTx />}
                    <tr>
                      <th>열선 스티어링 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-15" label="양호" value={1} checked={inspection38} onChange={inspectionChange38} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-16" label="수리/보수 필요" value={2} checked={inspection38} onChange={inspectionChange38} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive38 && <InspectionTx />}
                    <tr>
                      <th>창문 개폐 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-17" label="양호" value={1} checked={inspection39} onChange={inspectionChange39} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-18" label="수리/보수 필요" value={2} checked={inspection39} onChange={inspectionChange39} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive39 && <InspectionTx />}
                    <tr>
                      <th>썬루프 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-19" label="양호" value={1} checked={inspection40} onChange={inspectionChange40} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-20" label="수리/보수 필요" value={2} checked={inspection40} onChange={inspectionChange40} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive40 && <InspectionTx />}
                    <tr>
                      <th>경적 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-21" label="양호" value={1} checked={inspection41} onChange={inspectionChange41} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-22" label="수리/보수 필요" value={2} checked={inspection41} onChange={inspectionChange41} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive41 && <InspectionTx />}
                    <tr>
                      <th>시트 열선, 통풍, 마사지<br />작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-23" label="양호" value={1} checked={inspection42} onChange={inspectionChange42} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-24" label="수리/보수 필요" value={2} checked={inspection42} onChange={inspectionChange42} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive42 && <InspectionTx />}
                    <tr>
                      <th>12v 충전 단자, USB 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-25" label="양호" value={1} checked={inspection43} onChange={inspectionChange43} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-26" label="수리/보수 필요" value={2} checked={inspection43} onChange={inspectionChange43} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive43 && <InspectionTx />}
                    <tr>
                      <th>안전벨트 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-27" label="양호" value={1} checked={inspection44} onChange={inspectionChange44} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-28" label="수리/보수 필요" value={2} checked={inspection44} onChange={inspectionChange44} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive44 && <InspectionTx />}
                    <tr>
                      <th>에어컨, 히터 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-29" label="양호" value={1} checked={inspection45} onChange={inspectionChange45} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-30" label="수리/보수 필요" value={2} checked={inspection45} onChange={inspectionChange45} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive45 && <InspectionTx />}
                    <tr>
                      <th>네비게이션 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-31" label="양호" value={1} checked={inspection46} onChange={inspectionChange46} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-32" label="수리/보수 필요" value={2} checked={inspection46} onChange={inspectionChange46} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive46 && <InspectionTx />}
                    <tr>
                      <th>후방 카메라 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-33" label="양호" value={1} checked={inspection47} onChange={inspectionChange47} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-34" label="수리/보수 필요" value={2} checked={inspection47} onChange={inspectionChange47} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive47 && <InspectionTx />}
                    <tr>
                      <th>360 어라운드 뷰 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-35" label="양호" value={1} checked={inspection48} onChange={inspectionChange48} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-36" label="수리/보수 필요" value={2} checked={inspection48} onChange={inspectionChange48} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive48 && <InspectionTx />}
                    <tr>
                      <th>주차 보조 시스템 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-37" label="양호" value={1} checked={inspection49} onChange={inspectionChange49} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-38" label="수리/보수 필요" value={2} checked={inspection49} onChange={inspectionChange49} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive49 && <InspectionTx />}
                    <tr>
                      <th>컨버터블 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-39" label="양호" value={1} checked={inspection50} onChange={inspectionChange50} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-40" label="수리/보수 필요" value={2} checked={inspection50} onChange={inspectionChange50} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive50 && <InspectionTx />}
                    <tr>
                      <th>모든 수납공간 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-41" label="양호" value={1} checked={inspection51} onChange={inspectionChange51} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-42" label="수리/보수 필요" value={2} checked={inspection51} onChange={inspectionChange51} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive51 && <InspectionTx />}
                    <tr>
                      <th>스피커 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-43" label="양호" value={1} checked={inspection52} onChange={inspectionChange52} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-44" label="수리/보수 필요" value={2} checked={inspection52} onChange={inspectionChange52} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive52 && <InspectionTx />}
                    <tr>
                      <th>라디오, DMB 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-45" label="양호" value={1} checked={inspection53} onChange={inspectionChange53} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-46" label="수리/보수 필요" value={2} checked={inspection53} onChange={inspectionChange53} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive53 && <InspectionTx />}
                    <tr>
                      <th>블루투스 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-47" label="양호" value={1} checked={inspection54} onChange={inspectionChange54} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-48" label="수리/보수 필요" value={2} checked={inspection54} onChange={inspectionChange54} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive54 && <InspectionTx />}
                    <tr>
                      <th>헤드업 디스플레이 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-49" label="양호" value={1} checked={inspection55} onChange={inspectionChange55} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-50" label="수리/보수 필요" value={2} checked={inspection55} onChange={inspectionChange55} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive55 && <InspectionTx />}
                    <tr>
                      <th>뒷자석 엔터테이먼트 작동</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-51" label="양호" value={1} checked={inspection56} onChange={inspectionChange56} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-52" label="수리/보수 필요" value={2} checked={inspection56} onChange={inspectionChange56} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive56 && <InspectionTx />}
                    <tr>
                      <th>실내, 실외 개조 및 튜닝<br />확인</th>
                      <td>
                        <ul className="radio-block tp4 ws">
                          <li>
                            <Radio className="txt" id="block6-53" label="양호" value={1} checked={inspection57} onChange={inspectionChange57} />
                          </li>
                          <li>
                            <Radio className="txt" id="block6-54" label="수리/보수 필요" value={2} checked={inspection57} onChange={inspectionChange57} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                    {inspectionActive57 && <InspectionTx />}
                  </tbody>
                </table>
              </MenuCont>
            </MenuItem>
          </ul>
        </div> */}

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <table summary="차량 기본정보에 대한 내용" className="table-tp1">
            <caption>차량 기본정보</caption>
            <colgroup>
              <col width="32%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>47러0383</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td>현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>2017-05-07</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>검정</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>3,342cc</td>
              </tr>
              <tr>
                <th>용도</th>
                <td>일반</td>
              </tr>
              <tr>
                <th>형식년도</th>
                <td>2016</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>가솔린</td>
              </tr>
              <tr>
                <th>차종</th>
                <td>대형차</td>
              </tr>
              <tr>
                <th>출고가격</th>
                <td>50,700,000원</td>
              </tr>
            </tbody>
          </table>

          <div className="float-wrap btn-s mb10 mt48">
            <h3 className="tit2">신청자 정보</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="전화하기" width={61} fontWeight={500} />
          </div>
          <table summary="신청자 기본정보에 대한 내용" className="table-tp1">
            <caption className="away">신청자 기본정보</caption>
            <colgroup>
              <col width="32%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>신청인</th>
                <td>김현대</td>
              </tr>
              <tr>
                <th>방문일시</th>
                <td>2019.10.30 14:00</td>
              </tr>
              <tr>
                <th>방문장소</th>
                <td>
                  현대글로비스(주) 서울특별시 강남구 테헤란로 301
                  <div className="map-wrap mt8">
                    <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51742.6439164819!2d128.57664396195503!3d35.85108173987436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e23bd9302901%3A0x1c537395158ac1f0!2z7J247YOA7J207Ja066qo7YSw7IqkIOuMgOq1rOyghOyLnOyepQ!5e0!3m2!1sko!2skr!4v1580285264745!5m2!1sko!2skr" allowFullScreen height={106} ></iframe>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ borderBottom: '1px solid #ddd' }} className="live-shot-sec">
          <div className="live-shot">
            <div className="float-wrap">
              <p>방문신청 현황</p>
              <ul>
                <li>진행 중<span>0</span>건</li>
                <li>이번 주<span>10</span>건</li>
              </ul>
            </div>
            <ul className="goods-list">
              <li>
                <div className="date float-wrap btn-s">
                  <ul>
                    <li>2019.09.16 18:04</li>
                    <li>등록완료</li>
                  </ul>
                  <ul>
                    <Button size="sml" line="gray" color="gray" radius={true} title="방문정보" width={61} height={30} fontSize={12} fontWeight={500} />
                  </ul>
                </div>
                <h4 className="subject">
                  <span>12가 2323</span>
                  제네시스(DH) G330 Premium
                </h4>
                <div className="info">
                  <span>홍길동 / 서울시 강남구</span>
                </div>
              </li>
              <li>
                <div className="date float-wrap btn-s">
                  <ul>
                    <li>2019.09.16 18:04</li>
                    <li className="tx-red80">미등록</li>
                  </ul>
                  <ul>
                    <Button size="sml" line="gray" color="gray" radius={true} title="방문정보" width={61} height={30} fontSize={12} fontWeight={500} />
                    <Button size="sml" background="blue80" radius={true} title="등록" width={39} height={30} fontSize={12} fontWeight={500} marginLeft={6} />
                  </ul>
                </div>
                <h4 className="subject">
                  <span>12가 2323</span>
                  제네시스(DH) G330 Premium
                </h4>
                <div className="info">
                  <span>홍길동 / 서울시 강남구</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="car-inquire-sec">
            <p>차량조회 후 신청하실 수 있습니다.</p>
            <div className="car-inquire-wrap pd0">
              <label htmlFor="car-num">차량번호</label>
              <Input type="text" id="car-num" placeHolder="차량번호를 입력해주세요. (예: 12가1234)" height={48} />
              <p className="tx-sub tx-red80">올바른 차량번호를 입력해주세요. (예: 12가 1234)</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <table summary="차량 기본정보에 대한 내용" className="table-tp1">
            <caption className="away">차량 기본정보</caption>
            <colgroup>
              <col width="27%" />
              <col width="23%" />
              <col width="23%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td colSpan="3">47러0383</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td colSpan="3">현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>2016</td>
                <th>형식년도</th>
                <td>2018</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>검정</td>
                <th>연료</th>
                <td>가솔린</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>1,591 cc</td>
                <th>차종</th>
                <td>대형차</td>
              </tr>
              <tr>
                <th>용도</th>
                <td>일반</td>
                <th>출고가격</th>
                <td>20,700만원</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ borderBottom: '1px solid #ddd' }}>
          <p className="ask-tx">
            해당 정보는 실제 정보와 상이할 수 있습니다.<br />
            다음 단계에서 차량정보를 수정하세요.<br />
            해당 차량을 판매 차량으로 신청하시겠습니까?
          </p>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <Steps mode="stick" type={1} contents={['차량정보 입력', '가격 및 차량소개', '차량 설명글 입력', '성능점검', '차량사진 등록', '결제', '등록완료']} active={1} />
        </div>

        <div className="register-form">
          <p className="car-name">
            03라4567<span>기아 K3 쿱 1.6 터보 GDI 프레스티지</span>
          </p>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <table summary="차량 기본정보에 대한 내용" className="table-tp3">
            <caption className="away">차량 기본정보</caption>
            <colgroup>
              <col width="32%" />
              <col width="68%" />
            </colgroup>
            <tbody>
              <tr>
                <th>최초등록일</th>
                <td><DatePicker defaultValue={now} width='100%' /></td>
              </tr>
              <tr>
                <th>형식년도</th>
                <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
              </tr>
              <tr>
                <th>색상</th>
                <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
              </tr>
              <tr>
                <th>연료</th>
                <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
              </tr>
              <tr>
                <th>배기량</th>
                <td><Input type="text" placeHolder="배기량을 입력해주세요" id="input-tp1" width='100%' /></td>
              </tr>
              <tr>
                <th>차종</th>
                <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
              </tr>
              <tr>
                <th>용도</th>
                <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
              </tr>
              <tr>
                <th>출고가격</th>
                <td><Input type="text" placeHolder="출고가격을 입력해주세요" id="input-tp2" width='100%' /></td>
              </tr>
              <tr>
                <th>주행거리<br />(현재기준)</th>
                <td><Input type="text" placeHolder="주행거리를 입력해주세요" id="input-tp3" width='100%' /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <table summary="EW 정보 입력에 대한 내용" className="table-tp1 ew">
            <caption className="away">EW 정보 입력</caption>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>47러0383</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td>현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
              </tr>
              <tr>
                <th>판매일</th>
                <td><DatePicker defaultValue={now} width='100%' /></td>
              </tr>
              <tr>
                <th>고객명</th>
                <td><Input type="text" placeHolder="고객명을 입력해주세요" id="input-tp4" width='100%' /></td>
              </tr>
              <tr>
                <th>보증상품명</th>
                <td><MobSelectBox options={mobile_select_area} width='100%' /></td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td><span className="price">110,000</span>원</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ height: '200px', borderBottom: '1px solid #ddd' }}>
          <div className="co-wrap">
            <p className="tit">등록이 완료되었습니다.</p>
            <p className="exp">등록 내용은 마이페이지 > 보증차량 판매현황에서<br />확인이 가능합니다.</p>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <form className="register-form">
            <ul className="m-toggle-list up-blue">
              <MenuItem>
                <MenuTitle>판매정보</MenuTitle>
                <MenuCont>
                  <fieldset>
                    <legend className="away">연락처</legend>
                    <div className="register-number">
                      <h4>연락처</h4>
                      <MobSelectBox options={mobile_select_area} width='68%' />
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="away">노출유형</legend>
                    <div className="register-exposure">
                      <h4>노출유형</h4>
                      <ul className="radio-block small">
                        <li><Radio className="txt" id="radio1" label="프랜차이즈" value={1} checked={isValue1} onChange={handleChange1} /></li>
                        <li><Radio className="txt" id="radio2" label="일반" value={2} checked={isValue1} onChange={handleChange1} /></li>
                      </ul>
                    </div>
                    <div className="market-price-graph">
                      <img src="/images/mobile/dummy/graph1.png" alt="현재시세 그래프" />
                    </div>
                  </fieldset>

                  {/* 판매가격 */}
                  <MypageSellPrice />
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>압류/저당 입력</MenuTitle>
                <MenuCont>
                  {/* 압류/저당 입력 */}
                  <MypageMortgage />
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>사고이력 정보</MenuTitle>
                <MenuCont>
                  {/* 사고이력정보 */}
                  <MypageAcidentRecord />
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>동영상</MenuTitle>
                <MenuCont>
                  {/* 동영상 */}
                  <MypageMovieUrl />
                </MenuCont>
              </MenuItem>
            </ul>
          </form>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="reserve-wrap">
            <div className="branch">
              <p className="tit4 mb16">지점선택</p>
              <div className="float-wrap">
                <MobSelectBox options={mobile_select_area} width='42%' />
                <MobSelectBox options={mobile_select_area} width='56%' />
              </div>
              <div className="essential-point fs12">
                <ul>
                  <li><i className="ico-dot"></i>토·일요일 및 공휴일은 예약 불가</li>
                  <li><i className="ico-dot"></i>전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
                  <li><i className="ico-dot"></i>진단지점 : 서울시 강서구 신월동 단지 </li>
                </ul>
              </div>
            </div>

            <p className="tit4 mb16 mt24">시간선택</p>
            <table summary="조회 영역" className="table-tp1 th-c td-c" >
              <caption className="away">조회 영역</caption>
              <colgroup>
                <col width="30%" />
                <col width="35%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th>시간</th>
                  <th>2019.10.04(금)</th>
                  <th>2019.10.07(월)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>09:00</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>09:30</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>10:00</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>10:30</td>
                  <td><Radio className="txt" id="reserve1" label="예약" value={1} checked={isValue1} onChange={handleChange1} /></td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>11:00</td>
                  <td><Radio className="txt" id="reserve2" label="예약" value={2} checked={isValue1} onChange={handleChange1} /></td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>11:30</td>
                  <td><Radio className="txt" id="reserve3" label="예약" value={3} checked={isValue1} onChange={handleChange1} /></td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>12:00</td>
                  <td><Radio className="txt" id="reserve4" label="예약" value={4} checked={isValue1} onChange={handleChange1} /></td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>12:30</td>
                  <td><Radio className="txt" id="reserve5" label="예약" value={5} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="reserve6" label="예약" value={6} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>13:00</td>
                  <td><Radio className="txt" id="reserve7" label="예약" value={7} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="reserve8" label="예약" value={8} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>13:30</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>14:00</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>14:30</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>15:00</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>15:30</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>16:00</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>16:30</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
                <tr>
                  <td>17:00</td>
                  <td>예약마감</td>
                  <td>예약마감</td>
                </tr>
              </tbody>
            </table>

            <div className="essential-point fs12">
              <ul>
                <li><i className="ico-dot"></i>지점 이용은 당일/전일 예약제로 운영되며, 당일 방문은 받지 않습니다.</li>
                <li><i className="ico-dot"></i>예약시 10분이내 결제가 이루어지지 않으면 예약은 취소되고, 선택한 시간은 무효가 됩니다.</li>
                <li><i className="ico-dot"></i>예약 취소요구시 위약금이 발생될 수 있습니다.</li>
                <li><i className="ico-dot"></i>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
                <li><i className="ico-dot"></i>Live Studio 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="payment-sec method">

          </div>
        </div>

        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div className="popup-reserve">
            <div className="reserve-wrap">
              <p className="tit4 mb8">차량번호 입력</p>
              <Input type="text" placeHolder="차량번호를 입력해주세요.(예: 12가1234)" />
              <Button size="full" background="blue80" title="조회" radius={true} height={38} marginTop={8} />
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <p className="tit4 mb16">차량 기본정보</p>
          <table summary="차량 기본정보에 대한 내용" className="table-tp1">
            <caption className="away">차량 기본 정보</caption>
            <colgroup>
              <col width="27%" />
              <col width="23%" />
              <col width="23%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td colSpan="3">08라 4567</td>
              </tr>
              <tr>
                <th>차량명</th>
                <td colSpan="3">기아 K3 쿱 1.6 터보 GDI 프레스티지 K3 2DR 1.6 T / GDI 프레스티지 M/T</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td colSpan="3">2016</td>
              </tr>
              <tr>
                <th>형식년도</th>
                <td>2016</td>
                <th>색상</th>
                <td>검정</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>가솔린</td>
                <th>배기량</th>
                <td>1,591 cc</td>
              </tr>
              <tr>
                <th>차종</th>
                <td colSpan="3">준중형차</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <table summary="예약정보 입력에 대한 내용" className="table-tp2 th-none">
            <tbody>
              <tr>
                <td>
                  <p className="tx-tit">방문주소</p>
                  <span className="bridge2">
                    <Input type="text" height={40} value="12345" disabled={true} width='73%' />
                    <Button size="mid" background="blue80" radius={true} title="우편번호" measure={'%'} width={24.5} />
                  </span>
                  <span className="bridge2">
                    <Input type="text" height={40} value="서울특별시 강남구 테헤란로 301" disabled={true} />
                  </span>
                  <span className="bridge2">
                    <Input type="text" height={40} value="현대글로비스(주)" disabled={true} />
                  </span>
                  <p className="tx-sub tx-blue80">* 입력해주신 주소에서 LiveShot 촬영이 진행됩니다. 정확한 주소를 입력해주세요.</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">날짜선택</p>
                  <ul className="radio-block tp3">
                    <li><Radio className="txt" id="date1" label="2019.10.04 (금)" value={1} checked={isValue1} onChange={handleChange1} /></li>
                    <li><Radio className="txt" id="date2" label="2019.10.07 (월)" value={2} checked={isValue1} onChange={handleChange1} /></li>
                    <li><Radio className="txt" id="date3" label="2019.10.08 (화)" value={3} checked={isValue1} onChange={handleChange1} /></li>
                  </ul>
                  <div className="essential-point fs12 lh-none">
                    <ul>
                      <li><i className="ico-dot"></i>토·일요일 및 공휴일은 예약 불가</li>
                      <li><i className="ico-dot"></i>전일 예약 시 월요일 예약은 금요일에 가능합니다.</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="tx-tit">시간선택</p>
                  <ul className="radio-block tp3">
                    <li><Radio className="txt" id="time1" label="오전" value={1} checked={isValue2} onChange={handleChange2} /></li>
                    <li><Radio className="txt" id="time2" label="오후" value={2} checked={isValue2} onChange={handleChange2} /></li>
                  </ul>
                  <ul className="check-select-list mt20">
                    <li><CheckBox id='chk1' title='판매 약관에 동의합니다.' size="noborder" /></li>
                  </ul>
                  <div className="essential-point fs12 tx-lg mt20">
                    <ul>
                      <li><i className="ico-dot"></i>지점 이용은 당일/전일 예약제로 운영되며, 당일 방문은 받지 않습니다.</li>
                      <li><i className="ico-dot"></i>예약시 10분이내 결제가 이루어지지 않으면 예약은 취소되고, 선택한 시간은 무효가 됩니다.</li>
                      <li><i className="ico-dot"></i>예약 취소요구시 위약금이 발생될 수 있습니다.</li>
                      <li><i className="ico-dot"></i>예약건의 날짜와 시간 변경을 원하시는 경우, 예약을 취소하고 재예약 하셔야 합니다.</li>
                      <li><i className="ico-dot"></i>Live Studio 예약의 경우, 예약시간 30분 전까지는 패널티 없이 취소가 가능하고, 예약시간 30분전~예약시간 경과 후 취소시에는 이용권이 차감됩니다.</li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #ddd' }}>
          <div className="popup-refund">
            <p className="tit3 mb16"><i className="ico-dot"></i> 전일예약</p>
            <table summary="전일예약에 대한 내용" className="table-tp1 th-c">
              <colgroup>
                <col width="65%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th>내용</th>
                  <th>취소위약금</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>결제당일 영업시간(18:00) 이전까지</td>
                  <td>전액환불</td>
                </tr>
                <tr>
                  <td>결제당일 영업시간(18:00) 이후부터 ~ 예약시간 1시간 전까지</td>
                  <td>위약금<br />10%공제 후 환불</td>
                </tr>
                <tr>
                  <td>예약시간 1시간 전 ~ 예약시간 30분 전까지</td>
                  <td>위약금<br />50%공제 후 환불</td>
                </tr>
                <tr>
                  <td>예약시간 30분전 ~ 예약시간 경과 후</td>
                  <td>환불불가</td>
                </tr>
              </tbody>
            </table>

            <p className="tit3 mb16"><i className="ico-dot"></i> 당일예약</p>
            <table summary="전일예약에 대한 내용" className="table-tp1 th-c">
              <colgroup>
                <col width="65%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th>내용</th>
                  <th>취소위약금</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>예약시간 1시간 전까지</td>
                  <td>위약금<br />10%공제 후 환불</td>
                </tr>
                <tr>
                  <td>예약시간 1시간 전 ~ 예약시간 30분전 까지</td>
                  <td>위약금<br />50%공제 후 환불</td>
                </tr>
                <tr>
                  <td>예약시간 30분전 ~ 예약시간 경과 후</td>
                  <td>환불불가</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <table summary="재고관리에 대한 내용" className="table-tp1 th-c">
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th>등록일</th>
                <th>차량번호</th>
                <th>판매여부</th>
                <th>매입가</th>
              </tr>
              <tr>
                <th>판매일</th>
                <th colSpan="2">차량명</th>
                <th>판매가</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20191216</td>
                <td>123가1234</td>
                <td>광고대기</td>
                <td>1,200만</td>
              </tr>
              <tr>
                <td>20191216</td>
                <td colSpan="2">현대 투산 ix 디젤 2WD LX20 럭셔리</td>
                <td>1,200만</td>
              </tr>
              <tr>
                <td>20191216</td>
                <td>123가1234</td>
                <td>광고대기</td>
                <td>1,200만</td>
              </tr>
              <tr>
                <td>20191216</td>
                <td colSpan="2">현대 투산 ix 디젤 2WD LX20 럭셔리</td>
                <td>1,200만</td>
              </tr>
              <tr>
                <td>20191216</td>
                <td>123가1234</td>
                <td>광고대기</td>
                <td>1,200만</td>
              </tr>
              <tr>
                <td>20191216</td>
                <td colSpan="2">현대 투산 ix 디젤 2WD LX20 럭셔리</td>
                <td>1,200만</td>
              </tr>
              <tr>
                <td>20191216</td>
                <td>123가1234</td>
                <td>광고대기</td>
                <td>1,200만</td>
              </tr>
              <tr>
                <td>20191216</td>
                <td colSpan="2">현대 투산 ix 디젤 2WD LX20 럭셔리</td>
                <td>1,200만</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="goods-list admin-list tp6 mt8">
            <ul>
              <li>
                <div className="summary">
                  <div className="float-wrap btn-xs">
                    <Button size="sml" line="gray" color="gray" radius={true} title="부재자" width={44} height={24} fontSize={10} marginRight={8} />
                    <p className="fl fs12 tx-gray">출품번호 1019</p>
                  </div>
                  <h5 className="subject tp2">소나타(LF) AG280소나타(LF) AG280소나타 AG280소나타 </h5>
                  <div className="price-wrap mt16">
                    <div className="fl">
                      <p className="price-tp9 fs12 mt5 tx-gray">2019.09.02</p>
                    </div>
                    <div className="fr">
                      <p className="price-tp9">1,540<span className="won tx-black">만원</span></p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="summary">
                  <div className="float-wrap btn-xs">
                    <Button size="sml" line="gray" color="gray" radius={true} title="후상담" width={44} height={24} fontSize={10} marginRight={8} />
                    <p className="fl fs12 tx-gray">출품번호 1019</p>
                  </div>
                  <h5 className="subject tp2">임팔라 IM640 Prime</h5>
                  <div className="price-wrap mt16">
                    <div className="fl">
                      <p className="price-tp9 fs12 mt5 tx-gray">2019.09.02</p>
                    </div>
                    <div className="fr">
                      <p className="price-tp9">1,540<span className="won tx-black">만원</span></p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="summary">
                  <div className="float-wrap btn-xs">
                    <Button size="sml" line="gray" color="gray" radius={true} title="후상담" width={44} height={24} fontSize={10} marginRight={8} />
                    <p className="fl fs12 tx-gray">출품번호 1019</p>
                  </div>
                  <h5 className="subject tp2">임팔라 IM640 Prime</h5>
                  <div className="price-wrap mt16">
                    <div className="fl">
                      <p className="price-tp9 fs12 mt5 tx-gray">2019.09.02</p>
                    </div>
                    <div className="fr">
                      <p className="price-tp9">1,540<span className="won tx-black">만원</span></p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px 0', borderBottom: '1px solid #ddd' }}>
          <div className="reserve-wrap payment-sec method">
            <div className="pick-list">
              <p>Live studio 촬영예약</p>
              <p className="price">150,000<span>원</span></p>
            </div>
            <div className="coupon-wrap">
              <p>
                쿠폰/포인트 할인
                <span>쿠폰, 포인트 중복할인은 불가합니다.</span>
              </p>

              {/* 포인트 활성화 */}
              <ul>
                <li>
                  <RadioGroup dataList={[{ id: 'radio-coupon', value: 1, checked: true, disabled: true, label: '쿠폰' }]} />
                  <p>(적용가능 쿠폰 : <span>4</span>장)</p>
                  <Input type="text" id="coupon" width='70%' height={40} />
                  <Button size="mid" background="gray60" radius={true} title="쿠폰적용" measure='%' width={27.5} height={40} mgMeasure='%' marginLeft={2.5} />
                </li>
                <li>
                  <RadioGroup dataList={[{ id: 'radio-point', value: 1, checked: true, label: '포인트' }]} />
                  <p>(사용가능 금액 : <span>123,456</span>원)</p>
                  <Input type="text" id="point" width='70%' height={40} disabled={true} />
                  <Button size="mid" background="blue80" radius={true} title="전액사용" measure='%' width={27.5} height={40} mgMeasure='%' marginLeft={2.5} />
                </li>
              </ul>

              {/* 쿠폰 활성화 */}
              {/* <ul>
                <li>
                  <RadioGroup dataList={[{ id: 'radio-coupon', value: 1, checked: true, label: '쿠폰' }]} />
                  <p>(적용가능 쿠폰 : <span>4</span>장)</p>
                  <Input type="text" id="coupon" width='70%' height={40} />
                  <Button size="mid" background="blue80" radius={true} title="쿠폰적용" measure='%' width={27.5} height={40} mgMeasure='%' marginLeft={2.5} />
                </li>
                <li>
                  <RadioGroup dataList={[{ id: 'radio-point', value: 1, checked: true, disabled: true, label: '포인트' }]} />
                  <p>(사용가능 금액 : <span>123,456</span>원)</p>
                  <Input type="text" id="point" width='70%' height={40} disabled={true} />
                  <Button size="mid" background="gray60" radius={true} title="전액사용" measure='%' width={27.5} height={40} mgMeasure='%' marginLeft={2.5} />
                </li>
              </ul> */}

              <p className="ex">&#8251; 적립된 포인트는 3,000원부터 사용이 가능합니다</p>
            </div>
            <div className="last-sum">
              <p>최종결제금액<span> (VAT포함)</span></p>
              <p className="price">120,000<span>원</span></p>
            </div>
            <div className="exp">
              적립된 포인트는 3,000원부터 사용이 가능하며 쿠폰, 포인트 결제 금액을 제외한 구매 금액의 N%가 포인트로 적립됩니다.
              <span>쿠폰 적용 시에는 추가 결제와 혼합 사용하실 수 없습니다.</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="inner coupon-wrap">
            <p className="tit1">쿠폰적용</p>
            <ul className="radio-group vertical">
              <li><Radio id="coupon-none" label="사용안함" value={1} checked={isValue1} onChange={handleChange1} /></li>
              <li>
                <Radio id="coupon1" label="1,000원 할인" value={2} checked={isValue1} onChange={handleChange1} />
                <em>1,000원 할인 쿠폰</em>
              </li>
              <li>
                <Radio id="coupon2" label="3,500원 할인" value={3} checked={isValue1} onChange={handleChange1} />
                <em>15% 할인 쿠폰</em>
              </li>
              <li>
                <Radio id="coupon3" label="11,000원 할인" value={4} checked={isValue1} onChange={handleChange1} />
                <em>업데이트20 무료 이용권</em>
              </li>
            </ul>
            <table summary="쿠폰 적용에 대한 내용" className="table-tp1 td-r">
              <caption className="away">쿠폰 적용</caption>
              <colgroup>
                <col widht="40%" />
                <col widht="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>할인금액</th>
                  <td>0원</td>
                </tr>
                <tr>
                  <th className="tx-b">최종결제금액<span>(VAT포함)</span></th>
                  <td><span className="price">11,000</span>원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="popup-tender">
            <form className="register-form">
              <fieldset>
                <ul className="form-list">
                  <li>
                    <span className="tit">최종 거래일자</span>
                    <DatePicker defaultValue={now} width='100%' />
                  </li>
                  <li>
                    <span className="tit">감가 사유 입력 <em>(선택)</em></span>
                    <ul className="radio-list">
                      <li>
                        <RadioGroup
                          mode="vertical"
                          defaultValue={0}
                          dataList={[
                            { id: 'chk-depreciation1', value: 1, checked: true, disabled: false, label: '외판 이상 (수리필요)' },
                            { id: 'chk-depreciation2', value: 2, checked: false, disabled: false, label: '사고 이력 (패널교환 등)' },
                            { id: 'chk-depreciation3', value: 3, checked: false, disabled: false, label: '차량정보 불일치 (옵션, 등급정보 등)' },
                            { id: 'chk-depreciation4', value: 4, checked: false, disabled: false, label: '기타 (텍스트 입력)' }
                          ]}
                          className="chk"
                        ></RadioGroup>
                      </li>
                      <li>
                        <span className="mb8">기타사유</span>
                        <Textarea countLimit={500} type="tp1" height={133} placeHolder="기타 사유를 작성해주세요." onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="tit">첨부파일 (최대 5개까지 등록가능) <em>(선택)</em></span>
                    <InputFile uploadList={uploadList1} />
                  </li>
                  <li>
                    <span className="tit">입찰 금액</span>
                    <label className="hide" htmlFor="biddingPrice">입찰 금액</label>
                    <Input type="text" id="biddingPrice" placeHolder="4,480 만원" disabled={true} />
                  </li>
                  <li>
                    <span className="tit">최종 매입가</span>
                    <label className="hide" htmlFor="price">최종 매입가</label>
                    <Input type="text" id="price" placeHolder="4,480 만원" />
                  </li>
                  <li>
                    <span className="tit">이전 등록이미지</span>
                    <InputFile uploadList={uploadList1} />
                  </li>
                  <li>
                    <span className="tit">성능점검기록부</span>
                    <InputFile uploadList={uploadList1} />
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #ddd' }}>
          <MypageCarEx />
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="con-wrap popup-tender">
            <form className="register-form">
              <fieldset>
                <ul className="form-list mg">
                  <li>
                    가상계좌 안내
                    <div className="tx-wrap">[하나은행] 123132165465465</div>
                  </li>
                  <li>
                    <i className="ico-dot"></i> 수수료 총액 : 10만원 (VAT 포함)<br />
                    <i className="ico-dot"></i> 수수료 입금기한 : <span className="tx-red80">2019-09-09-23:59</span> 까지<br />
                    <i className="ico-dot"></i> 세금계산서 발행
                  </li>
                </ul>
                <p className="tx-exp-tp5 tx-red80">&#8251; ※ 상기 입금기한까지 수수료 확인이 되지 않을 경우, 이후 거래 진행이 제한됩니다.</p>
              </fieldset>
            </form>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="mypage-profile">
            <div className="float-wrap">
              <div className="name">
                <Button size="sml" background="gray" title="딜러회원" width={49} height={20} fontSize={10} fontWeight={500} />
                <p>김현대님, 환영합니다.</p>
              </div>
              <span className="day tx-blue80">-195일</span>
            </div>
            <div className="float-wrap mt16">
              <div className="notice">
                <Button size="sml" line="gray" title="포인트 : 3,000P" fontSize={12} fontWeight={500} />
                <Button size="sml" line="gray" title="쿠폰 : 3개" fontSize={12} fontWeight={500} marginLeft={8} />
              </div>
              <ul className="tag">
                <li className="bg-purple">홈</li>
                <li className="bg-mint">프</li>
                <li className="bg-red-brown">오</li>
                <li className="bg-brown">fc</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div className="register-admin-wrap">
            <div className="float-wrap btn-s">
              <h3 className="tit2">등록 차량 관리<span>60건</span></h3>
              <Button size="sml" line="gray" radius={true} title="전체보기" width={61} fontSize={12} fontWeight={500} />
            </div>
            <ul className="register-admin-tab">
              <li className="state-green on"><span>1</span>정상판매중</li>
              <li className="state-blue"><span>3</span>대기차량</li>
              <li className="state-gray"><span>2</span>판매완료</li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="float-wrap btn-s">
            <h3 className="tit2">사용중인 이용권</h3>
            <Button size="sml" line="gray" radius={true} title="전체보기" width={61} fontSize={12} fontWeight={500} />
          </div>
          <div className="payment-admin-wrap">
            <div>
              <p>자유이용권</p>
              <div className="cont-wrap">
                <div className="cont">
                  <span><em>5</em>대 이용중</span>
                  <em>5/10</em>
                  <Button size="sml" line="gray" color="gray" radius={true} title="연장 및 추가" width={67} height={24} fontSize={10} fontWeight={500} />
                </div>
              </div>
              <span className="date">D-78</span>
            </div>
            <div>
              <p>대당이용권</p>
              <div className="cont-wrap">
                <div className="cont">
                  <span><em>5</em>대 이용중</span>
                </div>
              </div>
            </div>
            <div>
              <p>업데이트 20</p>
              <div className="cont-wrap">
                <div className="cont">
                  <span>미사용중</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <h3 className="tit2">알림함</h3>
          <ul className="notice">
            <li>
              <Link href="#">
                <a>
                  <p>
                    홈 서비스 예약
                    <span>홈서비스 예약 차량의 숫자입니다.</span>
                  </p>
                  <em>3</em>
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>
                  <p>
                    쪽지
                    <span>딜러님의 답변을 기다리는 쪽지의 숫자입니다.</span>
                  </p>
                  <em>23</em>
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>
                  <p>
                    공지사항
                    <span>새로운 공지사항이 등록되었습니다. 확인해 보세요.</span>
                  </p>
                  <em className="bg-red">11</em>
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>
                  <p>
                    비교 견적 입찰 건수
                    <span>입찰 중인 차량을 확인해 보세요.</span>
                  </p>
                  <em>23</em>
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="payment-sec">
            <li>
              <table className="table-tp1 use" summary="사용중인 이용권에 대한 내용">
                <caption>사용중인 이용권</caption>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>자유이용권</th>
                    <td>
                      <span><span className="tx-blue80">5</span>대 이용 중(10/10) <span className="date">D-78</span></span>
                      <Button size="sml" line="gray" color="gray" radius={true} title="기간연장/대수추가하기" width={112} height={24} fontSize={10} />
                    </td>
                  </tr>
                  <tr>
                    <th>대당이용권</th>
                    <td><span className="tx-blue80">5</span>대 이용 중</td>
                  </tr>
                  <tr>
                    <th>업데이트20</th>
                    <td><span className="tx-blue80">4</span>대 이용 중</td>
                  </tr>
                </tbody>
              </table>
            </li>

            <li>
              <div className="float-wrap btn-s">
                <h3 className="tit2">상품안내</h3>
                <Button size="sml" line="gray" color="gray" radius={true} title="자세히보기" width={88} fontSize={12} fontWeight={500} />
              </div>
            </li>

            <li>
              <h3 className="tit2 mb16">기본상품</h3>
              <ul className="tx-list">
                <li>
                  <h5>경매 낙찰 이용권</h5>
                  <p>오토벨 경매장에서 낙찰받은 차량을 광고로 등록하실 수 있는 이용권입니다.</p>
                  <div>
                    <span className="period">최대 2개월</span>
                    <span className="price">50,000<span className="won">원</span></span>
                  </div>
                </li>
                <li>
                  <h5>대당 이용권</h5>
                  <p>차량 1대를 등록할 수 있는 이용권입니다.</p>
                  <div>
                    <span className="period">최대 2개월</span>
                    <span className="price">50,000<span className="won">원</span></span>
                  </div>
                </li>
                <li>
                  <div className="float-wrap btn-xs">
                    <h5>자유 이용권</h5>
                    <Button size="sml" background="blue80" radius={true} title="구입하기" width={67} height={24} fontSize={10} fontWeight={500} />
                  </div>
                  <p>선택 기간 동안 선택한 차량 대수를 등록할 수 있는 이용권입니다.</p>
                  <ul>
                    <li>* 일반등록차량 리스트에 노출됩니다.</li>
                    <li>* 등록차량이 판매완료 시, 기간이 남았다면 다른 차량을 등록할 수 있습니다.</li>
                  </ul>
                  <div>
                    <span className="period">1개월 ~ 12개월</span>
                    <span className="price">27,000<span className="won">원~</span></span>
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <h3 className="tit2 mb16">부가상품</h3>
              <ul className="tx-list">
                <li>
                  <h5>업데이트 20 (대당)</h5>
                  <p>차량 업데이트를 추가로 20회 할 수 있는 이용권입니다. 무료 4회 포함 24회 업데이트 할 수 있습니다.</p>
                  <div>
                    <span className="period">1대</span>
                    <span className="price">10,000<span className="won">원</span></span>
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <h3 className="tit2 mb16">프라이싱 상품</h3>
              <ul className="tx-list">
                <li>
                  <div className="float-wrap btn-xs">
                    <h5>프라이싱 조회권</h5>
                    <Button size="sml" background="blue80" radius={true} title="구입하기" width={67} height={24} fontSize={10} fontWeight={500} />
                  </div>
                  <p>오토옥션에서 실제 거래되었던 차량의 낙찰가를 확인할 수 있는 이용권입니다.</p>
                  <div>
                    <span className="period">1~1,000회</span>
                    <span className="price">1,000<span className="won">원</span></span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="usage-wrap">
            <h5>자유 이용권</h5>
            <div className="float-wrap mb16">
              <p>모든 차량 이용가능</p>
              <span>단위 : 원 (VAT포함)</span>
            </div>
            <table className="table-tp1 th-c td-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
              <caption className="away">자유 이용권 상품 상세 내역</caption>
              <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
              </colgroup>
              <thead>
                <tr>
                  <th>구분<br />(할인율)</th>
                  <th>1개월</th>
                  <th>3개월<br />(5%)</th>
                  <th>6개월<br />(5%)</th>
                  <th>12개월<br />(5%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5대</td>
                  <td><Radio className="txt" id="car-usage1-1" label="165,000" value={1} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-2" label="470,250" value={2} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-3" label="940,500" value={3} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-3" label="1,881,000" value={4} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>10대</td>
                  <td><Radio className="txt" id="car-usage1-8" label="330,000" value={5} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-9" label="940,500" value={6} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-10" label="1,881,000" value={7} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-10" label="3,762,000" value={8} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>15대</td>
                  <td><Radio className="txt" id="car-usage1-15" label="495,000" value={9} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-16" label="1,410,750" value={10} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-17" label="2,821,500" value={11} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-21" label="5,643,800" value={12} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>20대</td>
                  <td><Radio className="txt" id="car-usage1-21" label="660,000" value={13} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-22" label="1,881,000" value={14} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="3,762,000" value={15} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="7,524,000" value={16} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>30대</td>
                  <td><Radio className="txt" id="car-usage1-21" label="990,000" value={17} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-22" label="2,821,500" value={18} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="5,643,400" value={19} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="11,286,400" value={20} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>50대</td>
                  <td><Radio className="txt" id="car-usage1-21" label="1,650,000" value={21} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-22" label="4,702,500" value={22} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="9,405,000" value={23} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="18,810,000" value={24} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>70대</td>
                  <td><Radio className="txt" id="car-usage1-21" label="2,310,000" value={25} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-22" label="6,583,500" value={26} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="13,167,000" value={27} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="26,334,000" value={28} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
                <tr>
                  <td>100대</td>
                  <td><Radio className="txt" id="car-usage1-21" label="3,300,000" value={29} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-22" label="9,405,000" value={30} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="18,810,000" value={31} checked={isValue1} onChange={handleChange1} /></td>
                  <td><Radio className="txt" id="car-usage1-23" label="37,620,000" value={32} checked={isValue1} onChange={handleChange1} /></td>
                </tr>
              </tbody>
            </table>

            <h5>프라이싱 조회권</h5>
            <div className="float-wrap mb16">
              <p>조회권의 유효기간은 5년입니다.</p>
              <span>단위 : 원 (VAT포함)</span>
            </div>
            <table className="table-tp1 th-c td-c" summary="프라이싱 조회권에 대한 내용">
              <caption className="away">프라이싱 조회권 상세 내역</caption>
              <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
              </colgroup>
              <thead>
                <tr>
                  <th>1회</th>
                  <th>3회</th>
                  <th>5회</th>
                  <th>10회</th>
                  <th>22회</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Radio className="txt" id="car-usage3-1" label="1,100" value={1} checked={isValue2} onChange={handleChange2} /></td>
                  <td><Radio className="txt" id="car-usage3-2" label="3,300" value={2} checked={isValue2} onChange={handleChange2} /></td>
                  <td><Radio className="txt" id="car-usage3-3" label="5,500" value={3} checked={isValue2} onChange={handleChange2} /></td>
                  <td><Radio className="txt" id="car-usage3-4" label="11,000" value={4} checked={isValue2} onChange={handleChange2} /></td>
                  <td><Radio className="txt" id="car-usage3-5" label="22,000" value={5} checked={isValue2} onChange={handleChange2} /></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>25회</th>
                  <th>100회</th>
                  <th>330회</th>
                  <th>550회</th>
                  <th>1,100회</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Radio className="txt" id="car-usage3-6" label="55,000" value={6} checked={isValue2} onChange={handleChange2} /></td>
                  <td><Radio className="txt" id="car-usage3-7" label="110,000" value={7} checked={isValue2} onChange={handleChange2} /></td>
                  <td><Radio className="txt" id="car-usage3-8" label="330,000" value={8} checked={isValue2} onChange={handleChange2} /></td>
                  <td><Radio className="txt" id="car-usage3-9" label="550,000" value={9} checked={isValue2} onChange={handleChange2} /></td>
                  <td><Radio className="txt" id="car-usage3-10" label="1,100,000" value={10} checked={isValue2} onChange={handleChange2} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="eposit-tx-list">
            <div className="float-wrap">
              <h5 className="tit2">입금대기</h5>
              <span>총 <span className="tx-blue80">123</span>건 (입금액 1,230,000원)</span>
            </div>

            <ul className="m-toggle-list up-blue">
              <MenuItem>
                <MenuTitle>꼭 알아두세요!</MenuTitle>
                <MenuCont>
                  <div className="essential-point tx-black">
                    <ul>
                      <li><i className="ico-dot"></i>입금대기 내역은 무통장 결제 시 입금확인이 되지 않은 내역입니다.</li>
                      <li><i className="ico-dot"></i>입금확인이 되면 바로 결제내역으로 자동 이동되며, 입금예정일이 지난 내역은 자동 삭제됩니다.</li>
                    </ul>
                  </div>
                </MenuCont>
              </MenuItem>
            </ul>
            <ul className="pay-tx-list">
              <li>
                <div className="float-wrap">
                  <p>대당 이용권 1개월</p>
                  <Button size="sml" line="gray" color="gray" radius={true} title="취소" width={39} height={30} fontSize={12} fontWeight={500} />
                </div>
                <ul>
                  <li><span>거래 일시</span>2019.08.16</li>
                  <li className="tx-blue80"><span>입금 상태</span>입금대기</li>
                  <li><span>결제 계좌</span>우리은행 123-12-123456</li>
                  <li className="tx-b"><span>입금 금액</span>220,000원</li>
                </ul>
              </li>
              <li>
                <div className="float-wrap">
                  <p>대당 이용권 1개월</p>
                  <Button size="sml" line="gray" color="gray" radius={true} title="취소" width={39} height={30} fontSize={12} fontWeight={500} />
                </div>
                <ul>
                  <li><span>거래 일시</span>2019.08.16</li>
                  <li className="tx-blue80"><span>입금 상태</span>취소요청중</li>
                  <li><span>결제 계좌</span>우리은행 123-12-123456</li>
                  <li className="tx-b"><span>입금 금액</span>220,000원</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="eposit-tx-list">
            <div className="float-wrap btn-s">
              <h5 className="tit2">결제내역</h5>
              <span>
                총 <span className="tx-blue80">123</span>건 (입금액 1,230,000원)
                <Button size="sml" background="blue20" color="blue80" radius={true} title="상세조회" width={61} height={30} fontSize={12} fontWeight={500} marginLeft={18} />
              </span>
            </div>

            <ul className="m-toggle-list up-blue">
              <MenuItem>
                <MenuTitle>꼭 알아두세요!</MenuTitle>
                <MenuCont>
                  <div className="essential-point tx-black">
                    <ul>
                      <li><i className="ico-dot"></i>신용카드로 결제 시 카드매출전표가 발급되며, 세금계산서 대용으로 매입세액공제를 받으실 수 있습니다.</li>
                      <li><i className="ico-dot"></i>휴대전화로 결제 후 다음 달, 휴대전화 요금을 납부하면 명의자의 주민등록 번호로 현금영수증이 자동발행됩니다.</li>
                      <li className="chk"><i className="ico-check-gray"></i>단, 휴대전화 결제금액을 신용카드로 납부 시에는 발행되지 않습니다.</li>
                      <li><i className="ico-dot"></i>무통장입금 완료 후 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다. (결제 후 다음 달 5일까지)</li>
                      <li><i className="ico-dot"></i>현금영수증 신청 시 세금계산서 대용으로 매입세액공제를 받으시려면 지출증빙용으로 신청해 주세요.</li>
                      <li><i className="ico-dot"></i>세금계산서 신청 시 기재하신 이메일로 전자 세금계산서를 발송해 드립니다. (우편 발송은 불가)</li>
                      <li><i className="ico-dot"></i>세금계산서 문의 : 고객센터 0000-0000)</li>
                    </ul>
                  </div>
                </MenuCont>
              </MenuItem>
            </ul>
            <ul className="pay-tx-list arrow">
              <li>
                <Link href="">
                  <a>
                    <p className="mb16">대당 이용권 1개월</p>
                    <ul>
                      <li><span>결제일</span>2019.08.16</li>
                      <li><span>결제 번호</span>12373404</li>
                      <li className="tx-b"><span>결제 금액</span>230,000원</li>
                      <li><span>결제 수단</span>무통장입금</li>
                    </ul>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>
                    <p className="mb16">대당 이용권 1개월</p>
                    <ul>
                      <li><span>결제일</span>2019.08.16</li>
                      <li><span>결제 번호</span>12373404</li>
                      <li className="tx-b"><span>결제 금액</span>230,000원</li>
                      <li><span>결제 수단</span>휴대전화</li>
                    </ul>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="float-wrap btn-s mb10">
            <h4 className="tit2">판매완료 차량</h4>
            <Button size="sml" line="gray" color="gray" radius={true} title="증빙자료" width={61} height={30} fontSize={12} fontWeight={500} />
          </div>
          <table summary="판매완료 차량에 대한 내용" className="table-tp1">
            <caption className="away">판매완료 차량</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>20190916-0003426</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>2019-08-16</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>대당이용권</td>
              </tr>
              <tr>
                <th>상품금액</th>
                <td>230,000원</td>
              </tr>
              <tr>
                <th>쿠폰할인</th>
                <td>-0원</td>
              </tr>
              <tr>
                <th>포인트사용</th>
                <td>-0원</td>
              </tr>
              <tr>
                <th>결제금액</th>
                <td className="tx-blue80">230,000원</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td className="float-wrap btn-s">
                  <span>무통장</span>
                  <Button size="sml" line="gray" color="gray" radius={true} title="입금내역" width={61} height={30} fontSize={12} fontWeight={500} />
                </td>
              </tr>
              <tr>
                <th>세금계산서 발행</th>
                <td>기간만료</td>
              </tr>
            </tbody>
          </table>

          <table summary="차량정보에 대한 내용" className="table-tp1 mt24">
            <caption>차량정보</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>번호</th>
                <td>20190916-0003426</td>
              </tr>
              <tr>
                <th>제조사</th>
                <td>현대 투싼 ix 디젤 2WD LX20 럭셔리</td>
              </tr>
              <tr>
                <th>차량번호</th>
                <td>00가0000</td>
              </tr>
              <tr>
                <th>차량상태</th>
                <td>등록차량</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 무통장 증빙자료 */}
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="float-wrap btn-s">
            <p className="tit3">대당 이용권 1개월</p>
            <div className="btn-wrap">
              <Button size="sml" background="blue80" radius={true} title="현금영수증" width={72} height={30} fontSize={12} fontWeight={500} />
              <Button size="sml" line="gray" color="gray" radius={true} title="세금계산서" width={72} height={30} fontSize={12} fontWeight={500} marginLeft={8} />
            </div>
          </div>
          <ul className="pay-tx-list border">
            <li>
              <ul>
                <li><span>결제일</span>2019.08.16</li>
                <li><span>결제 번호</span>12373404</li>
                <li className="tx-b"><span>결제 금액</span>230,000원</li>
                <li><span>결제 수단</span>무통장입금</li>
              </ul>
            </li>
          </ul>
          <p className="tx-exp-tp5 mt8"><span className="tx-black">&#8251; 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다.</span> (결제 후 다음 달 5일까지)</p>
        </div>

        {/* 무통장 입금내역 - 입금내역 */}
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <p className="tit4 mb8">결제번호<span className="tx-blue80 ml8">20190916-0003426</span></p>
          <table summary="무통장 입금내역에 대한 내용" className="table-tp1 th-c td-c">
            <caption className="away">무통장 입금내역</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <thead>
              <tr>
                <th>은행</th>
                <th>입금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>농협</td>
                <td className="tx-r">230,000원</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 무통장 입금내역 - 현금영수증 */}
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <p className="tit5 tx-blue80 mb8">신청일: 2019-09-09</p>
          <table summary="무통장 입금내역에 대한 내용" className="table-tp1">
            <caption className="away">무통장 입금내역</caption>
            <colgroup>
              <col width="15%" />
              <col width="85%" />
            </colgroup>
            <tbody>
              <tr>
                <th>구분</th>
                <td className="float-wrap btn-s">
                  <span>지출증빙용</span>
                  <Button size="sml" line="gray" color="gray" radius={true} title="현금영수증" width={72} height={30} fontSize={12} fontWeight={500} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 무통장 입금내역 - 세금계산서 */}
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <p className="tit5 tx-blue80 mb8">신청일: 2019-09-09</p>
          <table summary="무통장 입금내역에 대한 내용" className="table-tp1">
            <caption className="away">무통장 입금내역</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>발급번호</th>
                <td>2019092103233428</td>
              </tr>
              <tr>
                <th>상호</th>
                <td>(주)글로비스</td>
              </tr>
              <tr>
                <th>대표자명</th>
                <td>김대표</td>
              </tr>
              <tr>
                <th>담당자명</th>
                <td>김직원</td>
              </tr>
              <tr>
                <th>업태</th>
                <td>도매 및 소매업</td>
              </tr>
              <tr>
                <th>종목</th>
                <td>중고자동차판매</td>
              </tr>
              <tr>
                <th>사업자등록번호</th>
                <td>0123456</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>010-0000-0000</td>
              </tr>
              <tr>
                <th>이메일주소</th>
                <td>00112233@glovis.com</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>서울 강남구 논현동 1234</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default withRouter(yrTest3);