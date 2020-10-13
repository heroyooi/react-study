import moment from 'moment'
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import ReactPlayer from 'react-player';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import { MOBILE_HEADER_TYPE_SUB } from '@src/actions/types';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import CarOptions from '@src/components/common/CarOptions';
import BannerItem from '@src/components/common/banner/BannerItem';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
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
import Textarea from '@lib/share/items/Textarea';
import Input from '@lib/share/items/Input';
import StarScore from '@lib/share/items/StarScore';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import MobCalendar from "@lib/share/items/MobCalendar";
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MypageSellPrice from '@src/components/common/MypageSellPrice';
import MypageMortgage from '@src/components/common/MypageMortgage';
import MypageAcidentRecord from '@src/components/common/MypageAcidentRecord';
import MypageMovieUrl from '@src/components/common/MypageMovieUrl';
import MypageCarEx from '@src/components/common/MypageCarEx';
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck';
import MobSellRegister from '@src/components/common/MobSellRegister';
import { foreignBrandList, m_dealer } from '@src/dummy';
import { car_list4, mCarList, mCarList2, m_radio_guaranteed, m_radio_contractor, m_mobile_number_list, mobile_select_area, textDummy } from '@src/dummy';
import Link from 'next/link';

const yrTest2 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({
    type: MOBILE_HEADER_TYPE_SUB,
    data: {
      title: 'Yul Test2 : p',
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
  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop1(false);
    setCalPop2(false);
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  };

  
  // InputFile & InputPicture
  const uploadList1 = (files) => {
    
    if(files !== null) { 
      const _files = Object.values(files);
      _files.map(v => console.log(v)); 
    }
  };

  //별점
  const [grade, setGrade] = useState([0,0,0])
  const gradeChange = (e, idx, value) =>{
    console.log(idx, value)
    let temp = [...grade];
    temp[idx] = value;
    
    setGrade(temp);
  }
  
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

  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  // bottom sheet button select
  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const handleOpenPop1 = useCallback((e) => {
    e.preventDefault();
    setActive1(true);
    setDimm1(true);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);
  const handleOpenPop2 = useCallback((e) => {
    e.preventDefault();
    setActive2(true);
    setDimm2(true);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);
  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, []);
  const handleCloseDimm2 = useCallback(() => {
    setActive2(false);
    setDimm2(false);
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        {/* 마이페이지 - 딜러 */}
        {/* 업데이트 시간 변경 */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div className="time-update">
            <Buttons align="right">
              <Button size="sml" line="gray" color="gray" radius={true} title="자동세팅 적용" width={85} onClick={(e) => openMpop(e, 'fade')} />
              <Button size="sml" line="gray" color="gray" radius={true} title="업데이트 시간 보관함" width={121} onClick={handleOpenPop2} />
            </Buttons>
          </div>
          <div className="time-picker-area">
            <p className="time-picker-msg">최초 등록 시간 : 08:30:25</p>
            <p className="time-picker-msg">업데이트 회수 : 24회</p>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="blue80" color="blue80" radius={true} title="보관함에 저장" width={85} onClick={handleOpenPop1} />
              <Button size="sml" background="blue80" radius={true} title="추가업데이트 구매" width={108} />
            </Buttons>
            <ul className="m-toggle-list time-picker">
              <MenuItem>
                <MenuTitle>오전<span>7:48</span></MenuTitle>
                <MenuCont>time</MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>오전<span>10:48</span></MenuTitle>
                <MenuCont>time</MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>오후<span>22:48</span></MenuTitle>
                <MenuCont>time</MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>오후<span>23:48</span></MenuTitle>
                <MenuCont>time</MenuCont>
              </MenuItem>
            </ul>
          </div>

          {/* 자동세팅 적용 */}
          <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
            {/* 무료 이용시 */}
            <div className="con-wrap">
              <p className="exp">이 차량의 최초 등록 분/초를 기준으로<br />08시/12/16시/20시에 자동 업데이트 됩니다.<br />적용하시겠습니까?</p>
              <Buttons align="right" marginTop={24}>
                <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
                <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
              </Buttons>
            </div>

            {/* 유료 이용시 */}
            {/* <div className="con-wrap">
              <p className="exp">이 차량의 최초 등록 분/초를 기준으로<br />00시~ 23시 사이에 1시간 단위로<br />자동 배치 됩니다. 적용하시겠습니까?</p>
              <Buttons align="right" marginTop={24}>
                <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
                <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
              </Buttons>
            </div> */}

            {/* 완료 */}
            {/* <div className="con-wrap">
              <p>업데이트 시간 저장이 완료되었습니다.</p>
              <Buttons align="right" marginTop={24}>
                <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
                <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
              </Buttons>
            </div> */}
          </RodalPopup>


          {/* 보관함 저장 */}
          <div className={dimm1 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm1}></div>
          <MobBottomArea active={active1} isFixButton={true}>
            <div className="inner search-cover">
              <h3 className="tit1">업데이트 보관함</h3>
              <p className="mt24 mb8">보관함 저장 이름</p>
              <Input type="text" placeHolder="보관명을 입력하세요." width='100%' height={50} />
            </div>
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" measure='%' width={50} height={56} />
              <Button size="big" background="blue80" title="확인" measure='%' width={50} height={56} />
            </Buttons>
          </MobBottomArea>

          {/* 업데이트 시간 보관함 */}
          <div className={dimm2 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm2}></div>
          <MobBottomArea active={active2} isFixButton={true}>
            <div className="inner search-cover">
              <h3 className="tit1">업데이트 시간 보관함</h3>
              <div className="save-box-pop">
                <ul className="radio-group chk">
                  <li>
                    <Radio id="update1" label="소나타1 업데이트" value={1} checked={isValue1} onChange={handleChange1} />
                    <div className="box-item">
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>

                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                    </div>
                  </li>
                  <li>
                    <Radio id="update2" label="G80 업데이트" value={2} checked={isValue1} onChange={handleChange1} />
                    <div className="box-item">
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>

                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                      <span className="time-info">01:00</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" measure='%' width={50} height={56} />
              <Button size="big" background="blue80" title="확인" measure='%' width={50} height={56} />
            </Buttons>
          </MobBottomArea>
        </div>

        {/* 판매완료 신고 */}
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="popup-declare">
            <h3 className="tit1">판매완료 신고</h3>
            <ul className="admin-list-wrap">
              <li>
                <div className="goods-list admin-list tp4">
                  <ul>
                    <li>
                      <span>
                        <div className="img-cover">
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                          <div className="info-wrap">
                            <div className="info">
                              <span>00가 0000</span>
                              <span>09/12식 (10년형)</span>
                              <span>84,761km</span>
                            </div>
                          </div>
                        </div>
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className="sell-declare">
              <span className="bridge2">
                <p>판매위치</p>
                <ul className="radio-block small">
                  <li><Radio className="txt" id="autobell" label="오토벨" value={1} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="othersite" label="타사이트" value={2} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="offline" label="오프라인" value={3} checked={isValue1} onChange={handleChange1} /></li>
                </ul>
              </span>
              <span className="bridge2">
                <label htmlFor="sell-price">현재광고가격</label>
                <Input type="text" id="ad-sell-price" value="4,480" width='68%' disabled={true} className="w-price manwon" />
              </span>
              <span className="bridge2">
                <label htmlFor="sell-price">실제판매가격</label>
                <Input type="text" id="sell-price" value="4,480" width='68%' className="w-price manwon" />
              </span>
            </div>
            <Buttons align="center" className="full" marginTop={19}>
              <Button size="big" background="blue20" color="blue80" title="취소" measure='%' width={50} height={56} />
              <Button size="big" background="blue80" title="판매완료" measure='%' width={50} height={56} />
            </Buttons>
          </div>
        </div>

        {/* 차량 정보 수정 */}
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
                              <td><DatePicker defaultValue={isDate1} width='100%' onClick={handleCalendarPop1} /></td>
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
                <MobSellRegister mode="dealer" />
              </TabCont>
              <TabCont tabTitle="성능기록" id="tab1-4" index={3}>
                <CarPerformanceCheck mode="apply" />
              </TabCont>
            </TabMenu>
          </div>
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


        {/* 마이페이지 - 일반 */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <ul className="general-admin-tab">
            <li><span>15</span>관심 차량</li>
            <li><span>0</span>최근 본 차량</li>
            <li><span>2</span>쪽지상담내역</li>
            <li><span>2</span>문의내역</li>
          </ul>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="list-wrap mb16">
            <h3 className="tit2">서비스 이용내역</h3>
            <p className="tx-exp-tp4">최근 1년 내 신청 내역 1건이 표시됩니다.</p>
          </div>
          <div className="goods-list admin-list tp1">
            <ul>
              <li>
                <div className="img-cover">
                  <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                </div>
                <div className="summary">
                  <span className="list-tag2">
                    <em className="tag-tp2">홈서비스</em>
                  </span>
                  <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="신청완료" width={53} height={24} fontSize={10} fontWeight={500} marginTop={17} />
                </div>
              </li>
              <li>
                <div className="img-cover">
                  <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                </div>
                <div className="summary">
                  <span className="list-tag2">
                    <em className="tag-tp2">내차팔기</em>
                    <em className="tag-tp2">셀프평가</em>
                  </span>
                  <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                  <Button size="sml" line="gray" color="gray" radius={true} title="임시저장" width={53} height={24} fontSize={10} fontWeight={500} marginTop={17} />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="goods-list admin-list tp2">
            <ul>
              <li>
                <div className="img-cover">
                  <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                </div>
                <div className="summary">
                  <ul className="date">
                    <li>2019.09.16<span className="time">18:04</span></li>
                    <li className="state">결제완료</li>
                  </ul>
                  <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                  <div className="info-wrap">
                    <p className="name">장현대 (현대오토오토)</p>
                    <div className="price-wrap">
                      <div className="price-left">
                        <p className="price-tp2">7,760<span className="won">만원</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="goods-list admin-list tp3">
            <ul>
              <li>
                <div className="img-cover">
                  <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                </div>
                <div className="summary">
                  <ul className="date">
                    <li>2019.09.16</li>
                  </ul>
                  <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                  <div className="info-wrap">
                    <p className="name">장현대 (현대오토오토)</p>
                    <Button size="sml" line="gray" color="gray" radius={true} title="임시저장" width={53} height={24} fontSize={10} fontWeight={500} marginTop={8} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="admin-list-wrap">
            <li>
              <div>
                <ul className="date">
                  <li>2019.09.16</li>
                  <li className="sec tx-black">방문평가</li>
                </ul>
                <p className="tx-disabled">차량확인 후 표시됩니다.</p>
              </div>
            </li>

            <li>
              <div className="float-wrap btn-xs mb8">
                <ul className="date">
                  <li>2019.09.16</li>
                  <li className="sec">셀프평가</li>
                </ul>
                <Button size="sml" line="gray" color="gray" radius={true} title="임시저장" width={53} height={24} fontSize={10} fontWeight={500} />
              </div>
              <div className="goods-list admin-list tp4">
                <ul>
                  <li>
                    <span>
                      <div className="img-cover">
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              <p className="price-tp2">7,760<span className="won">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <div>
                <ul className="date tx-black mb20">
                  <li>총 <span className="tx-blue80">123</span>건</li>
                  <li>&nbsp;(2017.02.08 ~ 2017.05.07)</li>
                </ul>
              </div>
              <div className="goods-list admin-list tp4">
                <ul>
                  <li>
                    <span>
                      <div className="img-cover">
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              <p className="price-tp2">7,760<span className="won">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                    <ul className="car-date-wrap">
                      <li>등록일 : 2019.00.00</li>
                      <li>판매일 : 2019.00.00</li>
                      <li>소요일 : <span className="tx-blue80">00</span></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <div className="float-wrap btn-xs mb20">
                <CheckBox id='sell-all-chk1' title='전체선택' />
                <div className="btn-wrap">
                  <Button size="sml" line="gray" color="gray" radius={true} title="선택차량 삭제" width={74} height={24} fontSize={10} fontWeight={500} />
                  <Button size="sml" line="gray" color="gray" radius={true} title="대기차량 이동" width={74} height={24} fontSize={10} fontWeight={500} marginLeft={8} />
                </div>
              </div>
              <div className="goods-list admin-list tp4">
                <ul>
                  <li>
                    <CheckBox id='sell-chk1' />
                    <span>
                      <div className="img-cover">
                        <p className="state normal">정상(만료 D-15)</p>
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              <p className="price-tp2">7,760<span className="won">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                  <li>
                    <CheckBox id='sell-chk3' />
                    <span>
                      <div className="img-cover">
                        <p className="state hold">판단보류(만료 D-15)</p>
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              <p className="price-tp2">7,760<span className="won">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                    <ul className="m-toggle-list up-blue car-date-wrap">
                      <MenuItem>
                        <MenuTitle>등록일:<span>2019-08-01</span>(최종수정일<span>2019-09-01</span>)</MenuTitle>
                        <MenuCont>
                          <table summary="차량정보에 대한 내용" className="table-tp1 th-c td-c mt16">
                            <caption className="away">차량정보</caption>
                            <colgroup>
                              <col width="25%"/>
                            </colgroup>
                            <thead>
                              <tr>
                                <th>판매기간</th>
                                <th>관심고객<br />(최근2주)</th>
                                <th>조회수<br />(일평균)</th>
                                <th>동급매물<br />(최근4주)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="tx-b tx-blue80">52일</td>
                                <td className="tx-b tx-blue80">13명</td>
                                <td className="tx-b tx-blue80">20회</td>
                                <td className="tx-b tx-blue80">4대<i className="ico-triangle-top ml4"></i></td>
                              </tr>
                            </tbody>
                          </table>

                          <div className="float-wrap btn-xs">
                            <h4 className="tit3">대당이용권 자동업데이트</h4>
                            <Button size="sml" line="blue80" color="blue80" radius={true} title="시간변경" width={61} height={24} fontSize={10} />
                          </div>
                          <table summary="대당이용권 자동업데이트에 대한 내용" className="table-tp1">
                            <caption className="away">대당이용권 자동업데이트</caption>
                            <colgroup>
                              <col width="40%"/>
                              <col width="60%"/>
                            </colgroup>
                            <tbody>
                              <tr>
                                <th>업데이트(자동)</th>
                                <td>09:00~23:00</td>
                              </tr>
                              <tr>
                                <th>최종</th>
                                <td>2019.09.09 12:10 (6/15회)</td>
                              </tr>
                            </tbody>
                          </table>
                          
                          <Button line="gray" color="gray" title="정보수정" measure="%" width={49} height={38} fontSize="14" fontWeight={500}/>
                          <Button line="gray" color="gray" title="판매완료 신고" measure="%" mgMeasure="%" width={49} height={38}  fontSize="14" fontWeight={500} marginLeft={2} />
                        </MenuCont>
                      </MenuItem>
                    </ul>
                  </li>
                  <li>
                    <CheckBox id='sell-chk3' />
                    <span>
                      <div className="img-cover">
                        <p className="state need">관리필요(만료 D-15)</p>
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                          <div className="price-wrap">
                            <div className="price-left">
                              <p className="price-tp2">7,760<span className="won">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                    <ul className="m-toggle-list up-blue car-date-wrap arrow-none">
                      <MenuItem>
                        <MenuTitle>등록일:<span>2019-08-01</span>(최종수정일<span>2019-09-01</span>)</MenuTitle>
                      </MenuItem>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="admin-list-wrap">
            <li>
              <div className="mb8">
                <ul className="date">
                  <li>2019.09.16</li>
                  <li className="sec tx-red80">답변대기</li>
                </ul>
              </div>
              <div className="goods-list admin-list tp4 note">
                <ul>
                  <li>
                    <span>
                      <div className="img-cover">
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리3.3. GDI AWD 프리미엄 럭셔리3.3. GDI AWD 프리미엄 럭셔리</h5>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="goods-list card-type">
            <li>
              <span>
                <div className="img-cover-wrap">
                  <div className="img-cover">
                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                  </div>
                </div>
                <div className="summary">
                  <span className="list-tag2">
                    <em className="tag-tp2">EW</em>
                    <em className="tag-tp2">홈서비스</em>
                  </span>
                  <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                  <div className="info-wrap">
                    <div className="info">
                      <span>17/01식</span>
                      <span>가솔린</span>
                      <span>42.330km</span>
                      <span>경기</span>
                    </div>
                    <div className="price-wrap">
                      <div className="price-left">
                        <p className="price-tp2">7,760<span className="won">만원</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </li>
            <li>
              <div className="comparison-bn">
                <p>비교하실 차량을<br />선택해주세요.</p>
                <Buttons align="center" marginTop={8}>
                  <Button size="sml" color="gray" line="gray" radius={true} title="최근" measure='%' width={32} height={24} fontSize={10} fontWeight={500} />
                  <Button size="sml" color="gray" line="gray" radius={true} title="관심" measure='%' width={32} height={24} fontSize={10} fontWeight={500} />
                </Buttons>
              </div>
            </li>
          </ul>
        </div>

        <div style={{ padding: '20px 0px', borderBottom: '1px solid #ddd' }}>
          <MypageNavi />
        </div>

        <div style={{ padding: '20px 0px', borderBottom: '1px solid #ddd' }}>
          <MypageNavi mode="dealer" />
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="sell-ico-wrap border">
                <li>
                  <Link href="#">
                    <a>
                      <i className="ico-sell-01"></i>
                      <div className="tx-wrap">
                        <p className="tit">방문평가 판매</p>
                        <p className="exp">클릭 한 번이면 끝!<br />견적부터 판매까지 내 집 앞에서 편하게</p>
                      </div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <i className="ico-sell-02"></i>
                      <div className="tx-wrap">
                        <p className="tit">셀프등록 판매</p>
                        <p className="exp">딜러와의 불편한 흥정은 이제 그만!<br />직접 등록하고 쉽게 견적 받으세요!</p>
                      </div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <i className="ico-sell-03"></i>
                      <div className="tx-wrap">
                        <p className="tit">무평가 판매</p>
                        <p className="exp">신청완료와 동시에 차량 대금 먼저 지급! <br />이제 대금 먼저 받고 차량 판매하세요!</p>
                      </div>
                    </a>
                  </Link>
                </li>
          </ul>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="float-wrap btn-s">
            <h4 className="tit2">최근 본 차량</h4>
            <Button size="sml" line="gray" color="gray" radius={true} title="15개 전체보기" width={88} />
          </div>
          <div style={{ height: '200px' }}> {/* 사용시 인라인 스타일 삭제 */}
            <p className="list-none">최근 조회하신 차량이 없습니다.</p>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="mypage-admin-title">
            <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
          </div>

          <div className="mypage-admin-title">
            <p className="tx-exp-tp5">&#8251; 최근 1년 이내 홈서비스를 신청하신 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 홈서비스로 구매하신 차량정보는 1년까지 조회하실 수 있으며, 1년이 지나면 삭제됩니다.</p>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="m-toggle-list search">
            <MenuItem>
              <MenuTitle>내차팔기 현황<span>상세조회</span></MenuTitle>
              <MenuCont>
                <MobButtonFilter checkList={[
                  {title: "1개월", checked: true}, 
                  {title: "3개월", checked: false}, 
                  {title: "6개월", checked: false},
                  {title: "1년", checked: false}
                ]} onClick={handleBtnFilterClick1} />
                {/* 2개 이상인 경우 - 사용시 주석 삭제 요망 */}
                {/* <MobButtonFilter check_list={[
                  {title: "11", checked: true}, 
                  {title: "222", checked: false}, 
                  {title: "333", checked: false},
                  {title: "444", checked: false}
                ]} onClick={handleBtnFilterClick2} /> */}
                <div className="mt8">
                  <DatePicker defaultValue={now} width='46%'/>
                  <em className="from">~</em>
                  <DatePicker defaultValue={now} width='46%'/>
                </div>
                <Input type="number" height={40} placeHolder="차량명을 검색하세요" marginTop={8} />
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
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="m-toggle-list up-blue fs16">
            <MenuItem>
              <MenuTitle>진행현황<span>신청완료</span></MenuTitle>
              <MenuCont>
                <ul className="pay-detail">
                  <li className="tx-blue80">
                    <span className="title">1.신청완료</span>
                    <span className="sub">접수가 완료되었습니다.<br />상담사가 곧 연락드릴 예정입니다.</span>
                  </li>
                  <li>
                    <span className="title">2.결제대기중</span>
                    <span className="sub">결제내역을 확인하고<br />있습니다.</span>
                  </li>
                  <li>
                    <span className="title">3.배송준비중</span>
                    <span className="sub">결제완료 후 고객님에게<br />배송하기 위해 준비중입니다.</span>
                  </li>
                  <li>
                    <span className="title">4.배송 중</span>
                    <span className="sub">고객님이 원하는 시간, 장소로 배송이 출발되며<br />진행상황이 안내됩니다.</span>
                  </li>
                  <li>
                    <span className="title">5.배송 완료</span>
                    <span className="sub">차량 인수 후, 3일 이내 최종 구매 확정해주세요.<br />(8일 이후 자동확정)</span>
                  </li>
                </ul>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>진행현황<span>결제대기 중</span></MenuTitle>
              <MenuCont>
                <div className="progress-wrap">
                  <p className="tit">보험증서</p>
                  <p>보험 가입 및 첨부를 해주셔야 차량 배송이 진행됩니다.</p>
                  {/* 다중 선택 - customer/inquiryWrite */}
                  {/* <InputFile uploadList={uploadList1} resVertical={true} type="special" /> */}

                  <InputFile uploadList={uploadList1} placeHolder="보험증서를 첨부해주세요." />
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>진행현황<span>배송완료</span></MenuTitle>
              <MenuCont>
                <div className="progress-wrap">
                  <p className="tit">최종 구매 확인</p>
                  <p>차량은 잘 받으셨나요? 3일 이내에 최종 구매 확정해주세요.<br />(3일 이후 자동으로 구매확정 처리 됩니다.)</p>
                  <Buttons align="center" marginTop={19}>
                    <Button size="sml" line="gray" radius={true} title="구매확정" width={61} fontWeight={500} />
                    <Button size="sml" line="gray" radius={true} title="취소신청" width={61} fontWeight={500} />
                  </Buttons>
                </div>
              </MenuCont>
            </MenuItem>
          </ul>
          <ul className="pay-detail">
            <li>
              <div className="float-wrap btn-s">
                <h4 className="tit2">결제 정보</h4>
                <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} />
              </div>
              <table summary="결제정보에 대한 내용" className="table-tp1 td-r">
                <caption className="away">결제 정보</caption>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량가격</th>
                    <td>10,234,000원</td>
                  </tr>
                  <tr>
                    <th>이전관리비</th>
                    <td>1,000,000원</td>
                  </tr>
                  <tr>
                    <th>BW가입비</th>
                    <td>2,000,000원</td>
                  </tr>
                  <tr>
                    <th>탁송비</th>
                    <td>34,000원</td>
                  </tr>
                  <tr>
                    <th className="tx-b">총 결제금액</th>
                    <td className="tx-b">12,123,000</td>
                  </tr>
                  <tr>
                    <th className="tx-b">결제방식</th>
                    <td>
                      할부 + 계좌이체
                      <span>(이체금액 1,000원)</span>
                    </td>
                  </tr>
                  <tr className="tx-c">
                    <th colSpan="2" className="tx-blue80">입금계좌 : 하나은행 454564456123<br />예금주 : 현대오토벨</th>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <div className="float-wrap btn-s">
                <h4 className="tit2">계약자/배송 정보</h4>
                <Button size="sml" line="gray" color="gray" radius={true} title="배송지변경" width={72} />
              </div>
              <table summary="계약자/배송 정보에 대한 내용" className="table-tp1">
                <caption className="away">계약자/배송 정보</caption>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>명의자</th>
                    <td>김현대</td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td>010-1234-5678</td>
                  </tr>
                  <tr>
                    <th>주민등록상 주소</th>
                    <td>서울시 중구 소파로 1230 5층 123123</td>
                  </tr>
                  <tr>
                    <th>환불 계좌번호</th>
                    <td>국민은행 김현대 221112254789</td>
                  </tr>
                  <tr>
                    <th>배송지 주소</th>
                    <td>서울시 중구 소파로 1230 5층 123123</td>
                  </tr>
                  <tr>
                    <th>수령인</th>
                    <td>김현대</td>
                  </tr>
                  <tr>
                    <th>배송지 연락처</th>
                    <td>010-1234-5678</td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td>auto@naver.com</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <div className="float-wrap btn-s">
                <h4 className="tit2">판매자 정보</h4>
                <Button size="sml" line="gray" color="gray" radius={true} title="전화하기" width={61} />
              </div>
              <table summary="판매자 정보에 대한 내용" className="table-tp1">
                <caption className="away">판매자 정보</caption>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>판매자명</th>
                    <td>김현대</td>
                  </tr>
                  <tr>
                    <th>소속</th>
                    <td>현대오토오토</td>
                  </tr>
                  <tr>
                    <th>연락처</th>
                    <td>010-1234-5678</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>

        <div className="general-sell-sec" style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ul className="m-toggle-list up-blue fs16">
            <MenuItem>
              <MenuTitle>진행현황<span>신청완료</span></MenuTitle>
              <MenuCont>
                <ul className="pay-detail">
                  <li className="tx-blue80">
                    <span className="title">1.신청완료</span>
                    <span className="sub">방문평가 신청이<br />완료되었습니다.</span>
                  </li>
                  <li>
                    <span className="title">2.평가사 배정</span>
                    <span className="sub">담당 평가사가<br />배정되었습니다.</span>
                  </li>
                  <li>
                    <span className="title">3.방문 및 견적안내</span>
                    <span className="sub">고객님께 방문하여 차량 확인 후<br />견적 안내를 도와드립니다.</span>
                  </li>
                  <li>
                    <span className="title">4.견적 완료 및 판매결정</span>
                    <span className="sub">차량 판매 여부를<br />결정해주세요.</span>
                  </li>
                </ul>
              </MenuCont>
            </MenuItem>
          </ul>
          <ul>
            <li>
              <div className="float-wrap btn-s">
                <h4 className="tit2">차량 정보</h4>
                <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} />
              </div>
              <p style={{marginBottom: '16px'}} className="list-none">평가사가 배정 후에 확인 가능합니다.</p> {/* 사용시 인라인 스타일 삭제 */}
              <table summary="차량 기본정보에 대한 내용" className="table-tp1">
                <caption className="away">차량 기본정보</caption>
                <colgroup>
                  <col width="27%" />
                  <col width="24%" />
                  <col width="23.5%" />
                  <col width="25.5%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>최초등록일</th>
                    <td colSpan="3">2017-05-07</td>
                  </tr>
                  <tr>
                    <th>형식년도</th>
                    <td>2018</td>
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
                    <td>대형차</td>
                    <th>용도</th>
                    <td>일반</td>
                  </tr>
                  <tr>
                    <th>출고가격</th>
                    <td colSpan="3">20,000,000</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <h4 className="tit2 mb16">차량 견적</h4>
              <table summary="차량 견적에 대한 내용" className="table-tp1">
                <caption className="away">차량 견적</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>견적</th>
                    <td className="tx-lg">평가사 방문 후에 확인 가능합니다.</td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td>
                      <span className="bridge2">
                        <MobSelectBox options={m_mobile_number_list} />
                      </span>
                      <span className="bridge2">
                        <Input type="text" height={40} value="" />
                      </span>
                      <span className="bridge2">
                        <Input type="text" height={40} value="예금주" width='63%' />
                        <Button size="mid" background="blue80" radius={true} title="계좌인증" measure={'%'} width={34.5} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>견적</th>
                    <td><p className="price-tp5">1,950<span className="won">만원</span></p>(판매완료)</td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td>국민 101010-10-101010<br />(예금주: 김현대)</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <h4 className="tit2 mb16">담당 평가사</h4>
              <p style={{marginBottom: '16px'}} className="list-none">평가사 배정 후에 확인 가능합니다.</p> {/* 사용시 인라인 스타일 삭제 */}
              <table summary="담당 평가사에 대한 내용" className="table-tp1">
                <caption className="away">담당 평가사</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>명의자</th>
                    <td>김현대</td>
                  </tr>
                  <tr>
                    <th>연락처</th>
                    <td>010-1234-1234</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <h4 className="tit2 mb16">계약자 정보</h4>
              <table summary="계약자 정보에 대한 내용" className="table-tp1">
                <caption className="away">계약자 정보</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>명의자</th>
                    <td>김현대</td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td>010-1234-1234</td>
                  </tr>
                  <tr>
                    <th>거주지역</th>
                    <td>서울시 강남구</td>
                  </tr>
                  <tr>
                    <th>고객방문 주소</th>
                    <td className="tx-lg">등록되지 않았습니다</td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td className="tx-lg">등록되지 않았습니다</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="bidding-inquiry">
            <ul>
              <li>남은시간<p className="time tx-blue80">12 : 59 : 59</p></li>
              <li>입찰자수<p className="price-tp7">1,234<span className="won">명</span></p></li>
              <li>현재 최고가<p className="price-tp7">1,800<span className="won">만원</span></p></li>
            </ul>
          </div>
          <div className="bidding-inquiry">
            <ul>
              <li>남은시간<p className="time tx-blue80 none">입찰종료<br />되었습니다.</p></li>
              <li>입찰자수<p className="price-tp7">1,234<span className="won">명</span></p></li>
              <li>현재 최고가<p className="price-tp7">1,800<span className="won">만원</span></p></li>
            </ul>
          </div>

          <h4 className="tit2 mt32">차량 견적</h4>
          <p className="tx-exp-tp4">판매를 원하는 입찰자를 선택해주세요.(최고 입찰자 상위 3명)</p>
          <div style={{ height: '200px' }}> {/* 사용시 인라인 스타일 삭제 */}
            <p className="list-none">24시간 비교견적 종료 후<br />최고 입찰자 상위 3명의 딜러정보가 제공됩니다.</p>
          </div>

          <RadioGroup
            dataList={m_dealer}
            defaultValue={1}
            mode="vertical"
            className="m-radio-list mt16"
          >
            <RadioItem>
              <div className="img-cover">
                <img src="/images/mobile/ico/ico-dealer-none.svg" alt="프로필 없음 이미지"/>
              </div>
              <div className="tx-wrap">
                <ul className="dealer">
                  <li>장** 딜러</li>
                  <li>서울</li>
                </ul>
                <p className="price-tp5">2,100<span className="won">만원</span></p>
                <Link href="#"><a>후기보기</a></Link>
                <p className="star"><i className="ico-fill-star black"></i> 4.2</p>
              </div>
            </RadioItem>
            <RadioItem>
              <div className="img-cover">
                <img src="/images/mobile/ico/ico-dealer-none.svg" alt="프로필 없음 이미지"/>
              </div>
              <div className="tx-wrap">
                <ul className="dealer">
                  <li>장** 딜러</li>
                  <li>서울</li>
                </ul>
                <p className="price-tp5">2,100<span className="won">만원</span></p>
                <Link href="#"><a>후기보기</a></Link>
                <p className="star"><i className="ico-fill-star black"></i> 4.2</p>
              </div>
            </RadioItem>
            <RadioItem>
              <div className="img-cover">
                <img src="/images/mobile/ico/ico-dealer-none.svg" alt="프로필 없음 이미지"/>
              </div>
              <div className="tx-wrap">
                <ul className="dealer">
                  <li>장** 딜러</li>
                  <li>서울</li>
                </ul>
                <p className="price-tp5">2,100<span className="won">만원</span></p>
                <Link href="#"><a>후기보기</a></Link>
                <p className="star"><i className="ico-fill-star black"></i> 4.2</p>
              </div>
            </RadioItem>
          </RadioGroup>  
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="introduce-wrap">
            <p><span>#수입전문 #BMW #5시리즈 #최고가</span>안녕하세요. 오토벨 인증 딜러 장현대 입니다. 항상 신념과 믿음으로 함께하는 진실된 장현대  딜러가 되겠습니다.<br />항상 신념과 믿음으로 함께하는 진실된 장현대  딜러가 되겠습니다.</p>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="review-wrap">
            <p className="inquire-num">총<span> 2</span>건</p>
            <div className="inner">
              <p>기아 그랜드카니발 GLX 11인승 GLX 11인승</p>
              <div className="float-wrap">
                <ul>
                  <li>2019.12.04</li>
                  <li>김*대 고객님</li>
                </ul>
                <p className="star"><i className="ico-fill-star"></i> 4.2</p>
              </div>
              <span>최고의 가격과 최고의 서비스를 받았습니다. 최고의 가격과 최고의 서비스를 받았습니다. 최고의 가격과 최고의 서비스를 받았습니다.</span>
            </div>
            <div className="inner">
              <p>기아 그랜드카니발 GLX 11인승 GLX 11인승</p>
              <div className="float-wrap">
                <ul>
                  <li>2019.12.04</li>
                  <li>김*대 고객님</li>
                </ul>
                <p className="star"><i className="ico-fill-star"></i> 4.2</p>
              </div>
              <span>최고의 가격과 최고의 서비스를 받았습니다. 최고의 가격과 최고의 서비스를 받았습니다. 최고의 가격과 최고의 서비스를 받았습니다.</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="review-wrap">
            <p className="inquire-num">총<span> 2</span>건</p>
            <div className="inner">
              <div className="img-cover">
                <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
              </div>
              <div className="summary">
                <span className="date">2019.12.04</span>
                <h5 className="subject">현대 그랜저IG 프리미엄</h5>
                <div className="info">강원도 춘천에서 그렌저IG 매입한 후기</div>
                <Link href="#"><a>더 보기</a></Link>
              </div>
            </div>
            <div className="inner">
              <div className="img-cover">
                <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
              </div>
              <div className="summary">
                <span className="date">2019.12.04</span>
                <h5 className="subject">현대 그랜저IG 프리미엄</h5>
                <div className="info">강원도 춘천에서 그렌저IG 매입한 후기</div>
                <Link href="#"><a>더 보기</a></Link>
              </div>
            </div>
          </div>
        </div>

        {/* 일반회원 평점 */}
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <table summary="셀프평가 이용현황에 관한 내용" className="table-tp1 th-c td-c">
            <caption className="away">셀프평가 이용현황</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan="2">평가등급</th>
              </tr>
              <tr>
                <td colSpan="2">
                  <ul className="star-wrap">
                    <li><span className="start-group"><StarScore grade={4.2} /></span><span className="score-txt">4.2</span></li>
                  </ul>                    
                </td>
              </tr>
              <tr>
                <th colSpan="2">만족도</th>
              </tr>
              <tr>
                <td colSpan="2">
                  <ul className="star-wrap">
                    <li><span className="score-tit">가격</span><span className="start-group"><StarScore grade={4.5} /></span><span className="score-txt">4.5</span></li>
                    <li><span className="score-tit">서비스</span><span className="start-group"><StarScore grade={2.5} /></span><span className="score-txt">2.5</span></li>
                    <li><span className="score-tit">추천의향</span><span className="start-group"><StarScore grade={4.2} /></span><span className="score-txt">4.2</span></li>
                  </ul>
                </td>
              </tr>                   
            </tbody>
          </table>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }} className="general-sell-sec review">
          <ul className="m-toggle-list up-blue fs16">
            <MenuItem>
              <MenuTitle>입찰 결과 조회</MenuTitle>
              <MenuCont>
                <div className="bidding-inquiry">
                  <ul>
                    <li>입찰자수<p className="price-tp7">6<span className="won">명</span></p></li>
                    <li>
                      입찰 최고가<p className="price-tp7">2,100<span className="won">만원</span></p>
                      <Button size="mid" line="gray" color="gray" radius={true} title="견적 산정 사유 확인" width={97} height={24} fontSize={10} fontWeight={500} marginTop={8} />
                    </li>
                  </ul>
                  <p className="tx-exp-tp3 tx-red80">* 차량 탁송 후 2차 견적 진행 시,1차 견적 금액과 차이가 발생할 수 있습니다.</p>
                  <div className="dealer-wrap">
                    <div className="img-cover">
                      <img src="/images/mobile/ico/ico-dealer-none.svg" alt="프로필 없음 이미지"/>
                    </div>
                    <ul className="tx-wrap">
                      <li className="dealer">김현대 딜러</li>
                      <li className="num">010-1234-1234</li>
                      <li>서울 강서구 서부 자동차 매매단지</li>
                      <li>주식회사 오토오토</li>
                    </ul>
                    <Button size="mid" background="blue20" color="blue80" radius={true} title="전화하기" width={53} height={24} fontSize={10} fontWeight={500} />
                  </div>
                </div>
              </MenuCont>
            </MenuItem>
          </ul>
          <div className="review-input-wrap">
            <ul>
              <li>최종 판매 금액에 만족하시나요?<span><StarScore type="click" grade={grade[0]} idx={0} gradeChange={gradeChange} /></span></li>
              <li>구매 딜러의 서비스에 만족하시나요?<span><StarScore type="click" grade={grade[1]} idx={1} gradeChange={gradeChange} /></span></li>
              <li>주변분들에게 구매 딜러를 추천 의향은 어느 정도 되시나요?<span><StarScore type="click" grade={grade[2]} idx={2} gradeChange={gradeChange} /></span></li>
              <li>
                이용후기를 간단하게 한 줄로 남겨주세요.
                <Textarea countLimit={30} type="tp1" height={50} placeHolder="입력해주세요." disabledEnter={true} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
              </li>
            </ul>
          </div>
        </div>

        {/* 내차사기 */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div className="select-car-wrap">
            <p className="tit2">선택차량<span> 1</span>개</p>
            <span>차량 비교하기는 2대만 가능합니다.(PC 4대 가능)</span>
            <Buttons align="center" marginTop={16}>
              <Button size="mid" color="gray" line="gray" radius={true} title="비교하기" width={88} height={30} fontSize={12} fontWeight={500} />
              <Button size="mid" color="gray" line="gray" radius={true} title="삭제" width={88} height={30} fontSize={12} fontWeight={500} />
           </Buttons>
           <a href="#" className="popup-close"></a>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #ddd', height: '200px' }}>
         <div className="list-none">
           <p>최근 조회하신 차량이 없습니다.</p>
           <Buttons align="center" marginTop={16}>
            <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={84} height={40} />
           </Buttons>
         </div>
        </div>

        <div style={{ padding: '0 0 20px', borderBottom: '1px solid #ddd' }}>
          <div className="content-wrap seller-wrap">
            <div className="profile">
              <div className="img-wrap">
                <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />
              </div>
              <div className="tx-wrap">                
                <h2>김현대</h2>
                <p>010-1234-1234</p>
                <ul className="employee-card">
                  <li>종사원증 : 오토벨모터스</li>
                  <li>종사원증번호: A1240B56</li>
                </ul>
                <Button size="sml" line="gray" radius={true} title="판매자정보" fontSize={10} width={63} height={24} marginTop={16}/>
              </div>
            </div>
            <ul>
              <li>판매중<span>21</span></li>
              <li>판매완료<span>35</span></li>
            </ul>

            <table summary="판매자 정보에 대한 내용" className="table-tp1 td-r">
              <caption className="away">판매자 정보</caption>
              <colgroup>
                <col width="35%" />
                <col width="65%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>판매중 차량</th>
                  <td><span className="tx-blue80">21</span></td>
                </tr>
                <tr>
                  <th>판매완료 차량</th>
                  <td><span className="tx-blue80">1,000</span> (최근 12개월 : 1,000)</td>
                </tr>                
              </tbody>
            </table>

            <div className="map-sec">
              <table summary="판매자 기본정보에 대한 내용" className="table-tp1">
                <caption className="away">판매자 정보</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="75%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>판매점</th>
                    <td>현대 글로비스 경인직영점</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>서울특별시 서초구 신반포로 311</td>
                  </tr>
                  <tr>
                    <th>전화</th>
                    <td>050-0000-0000</td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>050-0000-0000</td>
                  </tr>
                  <tr>
                    <th>영업시간</th>
                    <td>
                      월~토요일 09:00 ~ 18:00<br />
                      일요일/공휴일 휴무<br />
                      (점심시간 12:00 ~ 13:00)
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2">평점</th>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <ul className="star-wrap">
                        <li><span className="start-group"><StarScore grade={4.5} /></span><span className="score-txt">4.5</span></li>                        
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2">만족도</th>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <ul className="star-wrap">
                        <li><span className="score-tit">가격만족</span><span className="start-group"><StarScore grade={4.5} /></span><span className="score-txt">4.5</span></li>
                        <li><span className="score-tit">서비스</span><span className="start-group"><StarScore grade={2.5} /></span><span className="score-txt">2.5</span></li>
                        <li><span className="score-tit">추천여부</span><span className="start-group"><StarScore grade={4.2} /></span><span className="score-txt">4.2</span></li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="map-wrap">
                <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51742.6439164819!2d128.57664396195503!3d35.85108173987436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e23bd9302901%3A0x1c537395158ac1f0!2z7J247YOA7J207Ja066qo7YSw7IqkIOuMgOq1rOyghOyLnOyepQ!5e0!3m2!1sko!2skr!4v1580285264745!5m2!1sko!2skr" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 0', borderBottom: '1px solid #ddd' }}>
          <div className="content-wrap inquire-wrap">
            <p className="tit2">
              받는사람
              <span>김현대</span>
            </p>
            <p className="tit2 mt24 mb16">문의사항</p>
            <Textarea countLimit={400} type="tp1" height={349} placeHolder="문의사항을 입력해주세요." />
          </div>
        </div>


        <div className="detail-wrap" style={{ padding: '20px 0', borderBottom: '1px solid #ddd' }}>
          <div className="content-wrap info-wrap car-exp">
            <div className="video">
              <div className="player-wrapper">
                <ReactPlayer
                  className="react-player"
                  url='https://www.glovis.net/upload/main_video01.mp4'
                  playing={true}
                  loop={true}
                  controls={true}
                  muted={true}
                  width={'100%'}
                  height={'100%'}
                />
              </div>
            </div>
            <div className="pb20">
              <h4>Key Point</h4>
              <ul className="img-wrap">
                <li><img src="/images/dummy/view-info-img-01.jpg" alt="key-point 이미지 01" /></li>
                <li><img src="/images/dummy/view-info-img-02.jpg" alt="key-point 이미지 02" /></li>
                <li><img src="/images/dummy/view-info-img-03.jpg" alt="key-point 이미지 03" /></li>
              </ul>
              <p>파노라마 썬루프로 시원한 개방감! 깔끔한 실내관리로 최상의 실내상태</p>
            </div>

            <div>
              <h4>Wear&amp;Tear</h4>
              <ul className="img-wrap wear-tear">
                <li><img src="/images/dummy/view-info-img-04.jpg" alt="wear&tear 이미지 01" /></li>
                <li><img src="/images/dummy/view-info-img-05.jpg" alt="wear&tear 이미지 02" /></li>
              </ul>
              <p>뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재</p>
              <Button size="full" color="black" title="설명 더보기" fontSize={14} fontWeight={500} iconType="arrow-bottom-gray" />
            </div>

            <div>
              <h4>이 차의 History</h4>
              <dl>
                <dt>전 차주 정보</dt>
                <dd>- 해당 차량은 오토벨 시화센터에서 낙찰 받은 차량입니다.</dd>
                <dt className="mt16">단순수리</dt>
                <dd>- 신차 출고가 6,010만원 상당!! 신차급 차량을 약 400~500만원 상당 저렴하게 만나 보실 수 있습니다.</dd>
                <dd>- 제네시스 G80과 함께 편안하고 안락한 드라이빙을 즐길 수 있습니다.</dd>
              </dl>
              <Button size="full" color="black" title="설명 더보기" fontSize={14} fontWeight={500} iconType="arrow-bottom-gray" />
            </div>

            <div>
              <h4>진단소견</h4>
              <dl>
                <dt>본 차량상태</dt>
                <dd>- 사고여부: 무사고</dd>
                <dd>- 차량모델: 제네시스 G80</dd>
                <dd>- 차량연식: 2016년 11월 (2017년형)</dd>
                <dd>- 차량색상: 회색</dd>
                <dd>- 주행거리: 53,436km</dd>
                <dt className="mt16">관리상태</dt>
                <dd className="superintend">내외관 깔끔하며 무사고 차량이며, 하체잡소리하나 없습니다. 타이어4짝 모두 트레이드 좋습니다. 기름만 주유 후 운행하시면 됩니다.시운전 강력추천드리며, 친절상담약속드립니다.</dd>
              </dl>
              <Button size="full" color="black" title="설명 숨기기" fontSize={14} fontWeight={500} iconType="arrow-top-gray" />
            </div>

            <div className="pb20">
              <h4>기타</h4>
              <p>타시고 계시던 차량 대차&amp;폐차 가능 합니다.</p>
            </div>

          </div>
        </div>


        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
        <div className="market-price-graph">
          <span className="tit">이 차량의 현재시세<span>가격단위: 만원</span></span>
          <span className="con">
            <img src="/images/dummy/graph1.jpg" alt="현재시세 그래프" />
          </span>
        </div>
        
          <div className="float-wrap btn-s mb10">
            <h3 className="tit2">차량 기본 정보</h3>
            <Button size="sml" line="red60" color="red60" radius={true} title="허위매물 신고" width={85} />
          </div>
          <table summary="차량 기본정보에 대한 내용" className="table-tp1">
            <caption className="away">차량 기본정보</caption>
            <colgroup>
              <col width="23%" />
              <col width="27%" />
              <col width="23%" />
              <col width="27%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>47러0383</td>
                <th>연료</th>
                <td>가솔린</td>
              </tr>
              <tr>
                <th>변속기</th>
                <td>오토</td>
                <th>색상</th>
                <td>회색</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>11/16식(17년형)</td>
                <th>배기량</th>
                <td>3,342cc</td>
              </tr>
              <tr>
                <th>사고유무</th>
                <td>무사고</td>
                <th>압료/저당</th>
                <td>무</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>53,436 KM</td>
                <th>차종</th>
                <td>대형차</td>
              </tr>
              <tr>
                <th>사고유무</th>
                <td colSpan="4">12345678901</td>
              </tr>
            </tbody>
          </table>

          <CarOptions type={1} addOption={true} isValue={false} />

          <h3 className="tit2 mb16">선택옵션</h3>
          <ul className="cate-list-detail choice">
            <li><span>하이테크</span><span>하이테크</span></li>
            <li><span>하이테크</span></li>
          </ul>

          <div className="float-wrap btn-s mb10">
            <h3 className="tit2">보험처리 이력</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="자세히 보기" width={88} />
          </div>
          <table summary="보험처리 이력 정보에 대한 내용" className="table-tp3 tx-c">
            <caption className="away">보험처리 이력</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th colSpan="4">자동차 특수사고 이력</th>
              </tr>
              <tr>
                <th>전손</th>
                <th>도난</th>
                <th>침수전손</th>
                <th>침수분손</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
              </tr>
            </tbody>
          </table>
          <div className="essential-point tp2 fs12">
            <ul>
              <li>&#8251; 본 차량의 보험처리 이력정보는 YYYY.MM.DD에 조회한 내용입니다.</li>
              <li>&#8251; 이후 이력 정보의 업데이트가 있을 수 있으며, 보험 이력 조ㅚ서비스에서 확인 가능합니다.</li>
            </ul>
          </div>

          <div className="float-wrap btn-s mb10">
            <h3 className="tit2">성능점검 정보</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="자세히 보기" width={88} />
          </div>
          <table summary="보험처리 이력 정보에 대한 내용" className="table-tp3 tx-c">
            <caption className="away">성능점검 정보</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th colSpan="4">자동차 상태표시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>교화(교체)</th>
                <td>없음</td>
                <th>판금/용접</th>
                <td>없음</td>
              </tr>
              <tr>
                <th>흠집</th>
                <td>없음</td>
                <th>손상</th>
                <td>없음</td>
              </tr>
              <tr>
                <th>요철</th>
                <td>없음</td>
                <th>부식</th>
                <td>없음</td>
              </tr>
            </tbody>
          </table>

          <table summary="보험처리 이력 정보에 대한 내용" className="table-tp3 mt16">
            <caption className="away">성능점검 정보</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>사고이력</th>
                <td>없음</td>
              </tr>
              <tr>
                <th>단순수리</th>
                <td>없음</td>
              </tr>
              <tr>
                <th>성능/상태 점검자</th>
                <td>(사)한국자동차기술인협회</td>
              </tr>
              <tr>
                <th>성능/상태 점검일</th>
                <td>2019.08.01</td>
              </tr>
            </tbody>
          </table>
          <div className="essential-point tp2 fs12">
            <ul>
              <li>&#8251; 단순교환은 사고에 포함되지 않습니다.</li>
              <li>&#8251; 본 성능점검기록부 내용은 판매자가 직접 입력한 내용입니다.</li>
              <li>&#8251; 차량의 상담이나 방문전 성능점검기록부와 차량등록증을 팩스로 요청하시어 차량의 성능점검기록 내용이 일치하는지 확인하실 것을 권장드립니다.</li>
            </ul>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div className="list-banner live">
            <p className="tit">오토벨 <span className="tx-red60">라이브 스튜디오</span>는?</p>
            <p className="exp">
              사고 유무 확인부터 성능까지!<br />
              차의 모든 것을 진단하여 알려드립니다!<br />
              차량 정보에서 <em className="option-tp2 bg-red">라이브</em> 뱃지를<br />
              확인하세요!
            </p>
            <Button size="mid" line="gray" color="black" color="gray" radius={true} title="오토벨 라이브 스튜디오 차량이란?" marginTop={16} width={238} href="liveGuide" />
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div className="list-banner auction">
            <p className="tit tx-blue80">경매낙찰차량</p>
            <p className="exp">
              현대 오토벨 경매장에서만<br />
              낙찰된 믿을 수 있는 낙찰 차량만<br />
              모았습니다!
            </p>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="live-wrap">
            <div className="live-tit">
              <h3>오토벨 <span>라이브 스튜디오 차량이란?</span></h3>
              <p>
                사고 유무 확인부터 성능까지, 구매자가<br />
                직접 확인하기 어려운 모든 부분을 진단하여<br />
                제공되는 엄선된 차량입니다.
              </p>
            </div>

            <div className="live-sec">
              <div className="tit-wrap">
                <h4>왜 믿을 수 있는<br />오토벨 <span>라이브 스튜디오</span>인가요?</h4>
              </div>
              <div className="con-wrap">
                <div className="exp-wrap">
                  <div className="tit">
                    <h5><span>01</span> 사진 촬영</h5>
                    <p>전문 촬영장에서 고해상도 외부 360˚,<br />내부 VR, wear&amp;tear, Key point등을 촬영합니다.</p>
                  </div>
                  <ul className="img-group">
                    <li><img src="/images/dummy/live-img-01.jpg" alt="사진촬영 예시이미지" /></li>
                    <li><img src="/images/dummy/live-img-02.jpg" alt="사진촬영 예시이미지" /></li>
                    <li><img src="/images/dummy/live-img-03.jpg" alt="사진촬영 예시이미지" /></li>
                    <li><img src="/images/dummy/live-img-04.jpg" alt="사진촬영 예시이미지" /></li>
                    <li><img src="/images/dummy/live-img-04.jpg" alt="사진촬영 예시이미지" /></li>
                    <li><img src="/images/dummy/live-img-04.jpg" alt="사진촬영 예시이미지" /></li>
                  </ul>
                </div>
                <div className="exp-wrap">
                  <div className="tit">
                    <h5><span>02</span> 차량 정보 확인</h5>
                    <p>전문 평가사가 실 매물 확인부터, 차량 정보,<br />옵션 등 차별화된 정확한 차량 정보를 확인합니다.</p>
                  </div>
                  <div className="img-wrap"><img src="/images/dummy/live-img-01.jpg" alt="차량정보확인 예시이미지" /></div>
                </div>
                <div className="exp-wrap">
                  <div className="tit">
                    <h5><span>03</span> 사고 진단</h5>
                    <p>정밀 검사를 통해 안전과 직결 되는 중요 부위의<br />사고 손상 유무를 정밀 진단하여 골격(프레임)<br />손상 차량을 선별합니다.</p>
                  </div>
                  <div className="img-wrap"><img src="/images/dummy/live-img-06.png" alt="사고진단 이미지" /></div>
                </div>
                <div className="exp-wrap">
                  <div className="tit">
                    <h5><span>04</span> 기능 진단</h5>
                    <p>오토벨 스튜디오는 차량 기본 및 사고 진단 외에<br />66가지 기능 진단을 통해 품질을 확인합니다.</p>
                  </div>
                  <div className="img-wrap"><img src="/images/dummy/live-img-07.png" alt="기능진단 이미지" /></div>
                </div>
              </div>
            </div>

            <div className="live-sec">
              <div className="tit-wrap">
                <h4 className="tx-l">오토벨 라이브 스튜디오만의<br /><span>제공서비스 3가지</span></h4>
                <p>66가지 차량 진단 (외장/실내/기능)</p>
              </div>
            </div>

            <div className="live-sec content-sec">
              <div className="tit-wrap">
                <h4>오토벨 Live Shot</h4>
                <p>전문 평가사가 직접 방문하여 라이브 스튜디오와<br />동일한 서비스를 제공합니다.</p>
              </div>
            </div>

          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <div className="list-wrap">
            <div className="list-tit">
              <h4>수입인증<span>수입인증 인증 가이드 텍스트 영역입니다.</span></h4>
            </div>
            <ul className="goods-list brand">
              {foreignBrandList.map((v, i) => {
                if (i < 3) {
                  return (
                    <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />
                  )
                }
              })}
            </ul>
          </div>

          <div className="certify-banner">
            <div className="content-wrap">
              <p>오토벨 인증몰 파트너사가 되어보세요</p>
              <Button size="mid" background="blue80" radius={true} title="입점문의" width={61} height={30} fontSize={12} marginTop={14} />
            </div>
          </div>
        </div>

        <div style={{padding: '20px', borderBottom: '1px solid #ddd'}}>
          <div className="live-tit">
            <p>
              인증몰 입점에 관하여 궁금한 사항을 보내주시면<br />
              담당자 확인 후 보다 자세한 상담을 드릴 수 있도록<br />
              하겠습니다.
            </p>
          </div>
          <form>
            <fieldset>
              <legend className="away">인증몰 입점문의</legend>
              <table summary="인증몰 입점문의에 대한 내용" className="table-tp2 certify-inquire">
                <caption className="away">인증몰 입점문의</caption>
                <colgroup>
                  <col width="34%" />
                  <col width="76%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>구분</th>
                    <td>
                      <ul className="radio-block small">
                        <li><Radio className="txt" id="make1" label="수입인증" value={1} checked={isValue1} onChange={handleChange1} /></li>
                        <li><Radio className="txt" id="make2" label="금융사인증" value={2} checked={isValue1} onChange={handleChange1} /></li>
                        <li><Radio className="txt" id="make3" label="프랜차이즈" value={3} checked={isValue1} onChange={handleChange1} /></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>회사명</th>
                    <td><Input type="text" id="agency-name" /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="user-name">담당자 성함</label></th>
                    <td><Input type="text" id="user-name" /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="user-phone">전화번호</label></th>
                    <td><Input type="text" id="user-phone" /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="email">이메일 주소</label></th>
                    <td><Input type="text" id="email" /></td>
                  </tr>
                  <tr>
                    <th>문의내용</th>
                    <td><Textarea countLimit={200} type="tp1" height={176} /></td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-sub">
                메일이 아닌 담당자 직통 전화로도 바로 문의 가능합니다.<br />
                담당자 전화문의 : 02-1234-1234
              </p>
            </fieldset>
          </form>
        </div>

        <div style={{padding: '20px', borderBottom: '1px solid #ddd'}}>
          <div className="list-banner brand">
            <p className="tit">BMW Premium<br />Selection</p>
            <p className="exp">BMW 인증 중고차</p>
          </div>
          <div className="float-wrap">
            <MobSelectBox options={mobile_select_area} width='35%' />
            <MobSelectBox options={mobile_select_area} width='60%' />
          </div>
          <div className="map-sec">
            <table summary="판매자 기본정보에 대한 내용" className="table-tp3">
              <caption className="away">판매자 정보</caption>
              <colgroup>
                <col width="25%" />
                <col width="75%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>주소</th>
                  <td>서울특별시 서초구 신반포로 311</td>
                </tr>
                <tr>
                  <th>전화</th>
                  <td>050-0000-0000</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td>
                    월~토요일 09:00 ~ 18:00<br />
                    일요일/공휴일 휴무<br />
                    (점심시간 12:00 ~ 13:00)
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="map-wrap">
              <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51742.6439164819!2d128.57664396195503!3d35.85108173987436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e23bd9302901%3A0x1c537395158ac1f0!2z7J247YOA7J207Ja066qo7YSw7IqkIOuMgOq1rOyghOyLnOyepQ!5e0!3m2!1sko!2skr!4v1580285264745!5m2!1sko!2skr" allowFullScreen></iframe>
            </div>
          </div>
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

export default withRouter(yrTest2);