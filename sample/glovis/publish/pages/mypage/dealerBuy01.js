import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import MypageTender from '@src/components/common/popup/MypageTender';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import Radio from '@lib/share/items/Radio';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import InputFile from '@lib/share/items/InputFile';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Textarea from '@lib/share/items/Textarea';
import BannerItem from '@src/components/common/banner/BannerItem';
import moment from 'moment';
import { select1_list, auction_list } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
/*
  html 변경이력
  03.16 : #a1 title 수정
        : #a2 추가
*/
const DealerBuy01 = ({ mode="radio", router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { auction, bidding } = router.query;
  const [isAuction, setIsAuction] = useState(auction === String(true) ? true : false);
  const [isBidding, setIsBidding] = useState(bidding === String(true) ? true : false);

  const now = moment();
  const [isMode, setIsMode] = useState(mode); // radio, textarea
  const [viewOpt, setViewOpt] = useState(false);
  const handleClick = useCallback((e) => {
    e.preventDefault();
    setViewOpt(prev => !prev);
  }, []);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.\n입찰하기(or입찰가격 수정) 버튼을 클릭했습니다.`);
  }, []);

  // textarea
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

  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };

  // 팝업
  const [visitPop1, setVisitPop1, openVisitPop1, closeVisitPop1] = useRodal(false);
  const [visitPop2, setVisitPop2, openVisitPop2, closeVisitPop2] = useRodal(false);
  const [customPop, setCustomPop, openCustomPop, closeCustomPop] = useRodal(false);
  const [dealDelayPop1, setDealDelayPop1, openDealDelayPop1, closeDealDelayPop1] = useRodal(false);
  const [dealDelayPop2, setDealDelayPop2, openDealDelayPop2, closeDealDelayPop2] = useRodal(false);
  const [dealNotifyPop1, setDealNotifyPop1, openDealNotifyPop1, closeDealNotifyPop1] = useRodal(false);
  const [dealNotifyPop2, setDealNotifyPop2, openDealNotifyPop2, closeDealNotifyPop2] = useRodal(false);
  const [dealNotifyPop3, setDealNotifyPop3, openDealNotifyPop3, closeDealNotifyPop3] = useRodal(false);
  const [dealNotifyPop4, setDealNotifyPop4, openDealNotifyPop4, closeDealNotifyPop4] = useRodal(false);
  const [dealCoPop, setDealCoPop, openDealCoPop, closeDealCoPop] = useRodal(false);
  const [dealFeePop, setDealFeePop, openDealFeePop, closeDealFeePop] = useRodal(false);
  const [tenderPop, setTenderPop, openTenderPop, closeTenderPop] = useRodal(false);

  const [isValue, setIsValue] = useState(0);
  const handleChange = useCallback((e) => {
    e.preventDefault();
    setIsValue(Number(e.target.value));
  }, [isValue]);

  const [disabledSel2, setDisabledSel2] = useState(true);
  const [disabledSel3, setDisabledSel3] = useState(true);
  const handleSel1 = useCallback(() => {
    setDisabledSel2(false);
  }, [disabledSel2]);
  const handleSel2 = useCallback(() => {
    setDisabledSel3(false);
  }, [disabledSel3]);

  const gearData = [
    {id:'chk-auto', title:'오토', checked:true},
    {id:'chk-stick', title:'수동', checked:true},
    {id:'chk-semi', title:'세미', checked:true},
    {id:'chk-auto-2', title:'오토', checked:true},
    {id:'chk-cvt', title:'CVT', checked:true},
    {id:'chk-etc', title:'기타', checked:true},
  ]

  const localData = [
    {id:'chk-seoul', title:'서울', checked:true},
    {id:'chk-gyeonggi', title:'경기', checked:true},
    {id:'chk-incheon', title:'인천', checked:true},

    {id:'chk-daejeon', title:'대전', checked:true},
    {id:'chk-sejong', title:'세종', checked:true},
    {id:'chk-chungnam', title:'충남', checked:true},
    {id:'chk-chungbuk', title:'충북', checked:true},
    {id:'chk-gangwon', title:'강원', checked:true},

    {id:'chk-busan', title:'부산', checked:true},
    {id:'chk-daegu', title:'대구', checked:true},
    {id:'chk-ulsan', title:'울산', checked:true},
    {id:'chk-gyeongnam', title:'경남', checked:true},
    {id:'chk-gyeongbuk', title:'경북', checked:true},

    {id:'chk-gwangju', title:'광주', checked:true},
    {id:'chk-jeonnam', title:'전남', checked:true},
    {id:'chk-jeonbuk', title:'전북', checked:true},
    {id:'chk-jeju', title:'제주', checked:true}
  ];

  const [chkGear, setChkGear] = useState(gearData);
  const [chkGearAll, setChkGearAll] = useState(gearData.every(v => v.checked === true));
  const [chkLocal, setChkLocal] = useState(localData);
  const [chkLocalAll, setChkLocalAll] = useState(localData.every(v => v.checked === true));

  const handleChkGear = (id) => () => {
    const copyGear = [...chkGear];
    copyGear.map(v => {
      if (v.id === id) {
        v.checked = !v.checked
      }
    });
    setChkGear(copyGear);
    setChkGearAll(copyGear.every(v => v.checked === true))
  }
  const handleChkGearAll = (e) => {
    const copyGear = [...chkGear];
    copyGear.map(v => v.checked = (e.target.checked === true) ? true : false);
    setChkGear(copyGear);
    setChkGearAll(prevCheck => !prevCheck);
  }  
  const handleChkLocal = (id) => () => {
    const copyLocal = [...chkLocal];
    copyLocal.map(v => {
      if (v.id === id) {
        v.checked = !v.checked
      }
    });
    setChkLocal(copyLocal);
    setChkLocalAll(copyLocal.every(v => v.checked === true))
  }
  const handleChkLocalAll = (e) => {
    const copyLocal = [...chkLocal];
    copyLocal.map(v => v.checked = (e.target.checked === true) ? true : false);
    setChkLocal(copyLocal);
    setChkLocalAll(prevCheck => !prevCheck);
  }
  const handleTenderPopup = (e) => {
    openTenderPop(e, "fade");
    setIsBidding(true);
  }

  const { seq } = router.query;
  // 달력 기간 선택
  const handleBtnFilterClick1 = (label, e) => {
  console.log(label);
  }

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '24시간 실시간 비교견적',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 76,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="mypage-state-sec">
          <TabMenu type="type2" mount={false} defaultTab={seq !== undefined ? Number(seq)-1 : 0}>

            <TabCont tabTitle="셀프평가 차량" id="tab1-1" index={0}> 
            </TabCont>

            <TabCont tabTitle="낙찰 및 입찰차량 관리" id="tab1-2" index={1}>
              <div className=" mt16">
                <TabMenu type="type1" mount={false} defaultTab={seq !== undefined ? Number(seq)-1 : 0}>
                  <TabCont tabTitle="낙찰차량 구매관리" id="tab2-1" index={0}>
                  </TabCont>

                  <TabCont tabTitle="입찰완료 내역" id="tab2-2" index={1}>
                    <ul className="m-toggle-list search mb0">
                      <MenuItem>
                        <MenuTitle><p className="tit2">입찰내역</p><span>상세조회</span></MenuTitle>
                        <MenuCont>
                          <MobButtonFilter checkList={[
                            {title: "15일", checked: true}, 
                            {title: "1개월", checked: false}, 
                            {title: "3개월", checked: false},
                            {title: "6개월", checked: false}
                          ]} onClick={handleBtnFilterClick1} />
                          {/* 2개 이상인 경우 - 사용시 주석 삭제 요망 */}
                          {/* <MobButtonFilter checkList={[
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
                          <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} />
                        </MenuCont>
                      </MenuItem>
                      <li>
                        <div className="float-wrap">
                          <p>2019.08.17 ~ 2019.09.16</p>
                          <p>총 <span className="tx-blue80">123</span>건</p>
                        </div>
                      </li>
                    </ul>

                    <div className="admin-list-wrap  content-wrap content-border">
                      {/* 차량리스트 */}
                      <div className="goods-list admin-list tp5">
                        <ul>
                          <li>
                            <span>
                              <div className="img-cover">
                                <div className="img-wrap">
                                  <img src="/images/dummy/list-service-img.jpg" alt="차량 이미지" />
                                </div>
                                <span className="state">낙찰완료</span>
                              </div>
                              <div className="summary">
                                <h5 className="subject mt0">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                                <div className="info-wrap">
                                  <div className="info">
                                    <span>17/01식</span>
                                    <span>가솔린</span>
                                    <span>42,330km</span>
                                    <span>경기</span>
                                  </div>
                                  <div className="status">
                                    <span>관심 21명</span>
                                    <span>입찰 45명</span>
                                  </div>
                                </div>
                              </div>
                            </span>
                            <ul className="car-date-wrap tp2">
                              <li>선택가 : <span className="tx-blue80">4,400</span>만원</li>
                              <li>최고가 : <span className="tx-blue80">4,780</span>만원</li>
                              <li>내견적 : <span className="tx-blue80">4,420</span>만원</li>
                            </ul>
                          </li>
                          <li>
                            <span>
                              <div className="img-cover">
                                <div className="img-wrap">
                                  <img src="/images/dummy/list-service-img.jpg" alt="차량 이미지" />
                                </div>
                                <span className="state end">낙찰종료</span>
                              </div>
                              <div className="summary">
                                <h5 className="subject mt0">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                                <div className="info-wrap">
                                  <div className="info">
                                    <span>17/01식</span>
                                    <span>가솔린</span>
                                    <span>42,330km</span>
                                    <span>경기</span>
                                  </div>
                                  <div className="status">
                                    <span>관심 21명</span>
                                    <span>입찰 45명</span>
                                  </div>
                                </div>
                              </div>
                            </span>
                            <ul className="car-date-wrap tp2">
                              <li>선택가 : <span className="tx-blue80">4,400</span>만원</li>
                              <li>최고가 : <span className="tx-blue80">4,780</span>만원</li>
                              <li>내견적 : <span className="tx-blue80">4,420</span>만원</li>
                            </ul>
                          </li>
                          <li>
                            <span>
                              <div className="img-cover">
                                <div className="img-wrap">
                                  <img src="/images/dummy/list-service-img.jpg" alt="차량 이미지" />
                                </div>
                                <span className="state">입찰진행중</span>
                              </div>
                              <div className="summary">
                                <h5 className="subject mt0">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                                <div className="info-wrap">
                                  <div className="info">
                                    <span>17/01식</span>
                                    <span>가솔린</span>
                                    <span>42,330km</span>
                                    <span>경기</span>
                                  </div>
                                  <div className="status">
                                    <span>관심 21명</span>
                                    <span>입찰 45명</span>
                                  </div>
                                </div>
                              </div>
                            </span>
                            <ul className="car-date-wrap tp2">
                              <li>선택가 : <span className="tx-blue80">4,400</span>만원</li>
                              <li>최고가 : <span className="tx-blue80">4,780</span>만원</li>
                              <li>내견적 : <span className="tx-blue80">4,420</span>만원</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      {/* 리스트 없을때 */}
                      {/* <div className="search-none pd0" style={{ height: '176px' }}>
                        <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
                      </div> */}
                    </div>
                  </TabCont>
                  
                </TabMenu>
              </div>
            </TabCont>
          </TabMenu>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false}>
            <TabCont tabTitle="셀프평가 차량" id="tab1-1" index={0}>
              <div className="admin-tender-sec">
                <table className="table-tp1 input search" summary="조회 영역">
                  <caption className="away">조회 영역</caption>
                  <tbody>
                    <tr>
                      <td>
                        <CheckBox id='chk-internal' title='국산' />
                        <CheckBox id='chk-foreign' title='수입' />
                        <SelectBox id="select1" className="items-sbox" options={select1_list} width={170} height={40} placeHolder="제조사" onChange={handleSel1} />
                        <em></em>
                        <SelectBox id="select2" className="items-sbox" options={select1_list} width={170} height={40} placeHolder="모델" disabled={disabledSel2} onChange={handleSel2} />
                        <em></em>
                        <SelectBox id="select3" className="items-sbox" options={select1_list} width={170} height={40} placeHolder="연식" disabled={disabledSel3} />
                        <Button size="mid" line="gray" title={viewOpt ? "- 상세옵션 설정" : "+ 상세옵션 설정"} width={159} height={40} className="fr" onClick={handleClick} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="detail-option-set" style={viewOpt ? { display: 'block' } : { display: 'none' }}>
                  <ul>
                    <li className="opt-gearbox">
                      <p>변속기</p>
                      <CheckBox id='chk-all-1' title='전체' isSelf={false} checked={chkGearAll} onChange={handleChkGearAll} />
                      <table summary="상세 옵션 변속기 선택" className="table-tp1 area">
                        <caption className="away">변속기</caption>
                        <tbody>
                          <tr>
                            <td>
                              {chkGear.map((v, i) => {
                                return (<CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkGear(v.id)} />)
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                    <li className="opt-area">
                      <p>지역</p>
                      <CheckBox id='chk-all-2' title='전체' isSelf={false} checked={chkLocalAll} onChange={handleChkLocalAll} />
                      <table summary="상세 옵션 지역 선택" className="table-tp1 area">
                        <caption className="away">지역</caption>
                        <colgroup>
                          <col width="12.5%" />
                          <col width="12.5%" />
                          <col width="12.5%" />                 
                          <col width="12.5%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>서울/경인</th>
                            <th>충청/강원</th>
                            <th>영남</th>
                            <th>호남/제주</th>
                          </tr>
                          <tr>
                            <td>
                              {chkLocal.map((v, i) => {
                                if (i < 3) {
                                  return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />
                                }
                              })}
                            </td>
                            <td>
                              {chkLocal.map((v, i) => {
                                if (i >= 3 && i < 8) {
                                  return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />
                                }
                              })}
                            </td>
                            <td>
                              {chkLocal.map((v, i) => {
                                if (i >= 8 && i < 13) {
                                  return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />
                                }
                              })}
                            </td>
                            <td>
                              {chkLocal.map((v, i) => {
                                if (i >= 13) {
                                  return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />
                                }
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                  </ul>
                  <Buttons align="center" marginTop={48}>
                    <Button size="big" background="gray" title="취소" width={172} />
                    <Button size="big" background="blue80" title="검색" width={172} />
                  </Buttons>
                </div>
                <ul className="float-wrap">
                  <li><p>총 {auction_list.length}대</p></li>
                  <li><RadioGroup dataList={[
                    { id: 'latest', value: 1, checked: true, disabled: false, title: '최근 등록 순' },
                    { id: 'imminent', value: 2, checked: false, disabled: false, title: '마감 임박 순' }
                  ]} /><CheckBox id='chk-interest-car-1' title='관심차량만' /></li>
                </ul>
                <ul className="goods-list auction">
                  {
                    auction_list.map((v, i) => {
                      return (
                        <BannerItem key={v.id} name={v.name} image={v.image} alt={v.alt} buttonName={v.buttonName} infos={v.infos} auction={true} limitTime={v.limitTime} limitNum={v.limitNum} btnClick={handleBtnClick} btnId={v.id} interest={v.interest} />
                      )
                    })
                  }
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="낙찰 및 입찰차량 관리" id="tab1-2" index={1}>
              <div className="admin-tender-tab">
                <TabMenu type="type6" defaultTab={0} mount={false}>
                  <TabCont tabTitle="낙찰차량 구매관리" id="tab6-1" index={0}>
                    <div className="admin-tender-sec">
                      <table className="table-tp1 input search" summary="조회 영역">
                        <caption className="away">조회 영역</caption>
                        <colgroup>
                          <col width="8.8%" />
                          <col width="91.2%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>기간</th>
                            <td>
                              <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                              <em className="mg8">~</em>
                              <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                              <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                              <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="15일" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
                              <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
                            </td>
                          </tr>
                          <tr>
                            <th></th>
                            <td><p className="tx-exp-tp6">(* 최대 6개월까지 조회 가능합니다.)</p></td>
                          </tr>
                        </tbody>
                      </table>
                      <ul className="float-wrap">
                        <li><p>총 35대</p></li>
                        <li><CheckBox id='chk-interest-car-2-1' title='관심차량만' /></li>
                      </ul>
                      <div className="admin-list tp6">
                        <div className="content-top">
                          <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                            <caption className="away">결제내역</caption>
                            <colgroup>
                              <col width="13%" />
                              <col width="57%" />
                              <col width="15%" />
                              <col width="15%" />
                            </colgroup>
                            <thead>
                              <tr>
                                <th>낙찰일</th>
                                <th>차량정보</th>
                                <th>진행상태</th>
                                <th>수정/확인</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>2019-09-19</td>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td>낙찰완료</td>
                                <td>
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="고객연락처 확인" width={129} marginBottom={8} onClick={(e) => openCustomPop(e, "fade")} />
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 입력" width={129} marginBottom={8} onClick={(e) => openVisitPop1(e, "fade")} />
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" width={129} onClick={(e) => openDealDelayPop1(e, "fade")} />
                                </td>
                              </tr>
                              <tr>
                                <td>2019-09-19</td>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td>방문예정<br />2019-09-20</td>
                                <td>
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="고객연락처 확인" width={129} marginBottom={8} onClick={(e) => openCustomPop(e, "fade")} />
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 수정" width={129} marginBottom={8} onClick={(e) => openVisitPop2(e, "fade")} />
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연 내용확인" width={129} onClick={(e) => openDealDelayPop2(e, "fade")} />
                                </td>
                              </tr>
                              <tr>
                                <td>2019-09-19</td>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td>방문예정<br />2019-09-28</td>
                                <td>
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 불발 신고" width={129} marginBottom={8} onClick={(e) => openDealNotifyPop1(e, "fade")} />
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 완료 신고" width={129} onClick={(e) => openDealCoPop(e, "fade")} />
                                </td>
                              </tr>
                              <tr>
                                <td>2019-09-19</td>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td>위장거래</td>
                                <td>
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 불발 내용확인" width={129} marginBottom={8} onClick={(e) => openDealNotifyPop2(e, "fade")} />
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 소명" width={129} onClick={(e) => openDealNotifyPop3(e, "fade")} />
                                </td>
                              </tr>
                              <tr>
                                <td>2019-09-19</td>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td>거래완료<br />2019-09-30</td>
                                <td>
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="거래내용 확인" width={129} marginBottom={8} href="/mypage/dealerBuy01_01?auction=false" />
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="딜러 수수료 입금" width={129} onClick={(e) => openDealFeePop(e, "fade")} />
                                </td>
                              </tr>
                              <tr>
                                <td>2019-09-19</td>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td>소명 사유 불가</td>
                                <td>
                                  <Button size="mid" line="blue80" color="blue80" radius={true} title="소명 불가 사유 확인" width={129} onClick={(e) => openDealNotifyPop4(e, "fade")} />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <PageNavigator recordCount={50} className="mt32" />
                        </div>
                      </div>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="입찰완료 내역" id="tab6-2" index={1}>
                    <div className="admin-tender-sec co-sec">
                      <table className="table-tp1 input search" summary="조회 영역">
                        <caption className="away">조회 영역</caption>
                        <colgroup>
                          <col width="8.8%" />
                          <col width="91.2%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>기간</th>
                            <td>
                              <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                              <em className="mg8">~</em>
                              <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                              <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                              <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="15일" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                              <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
                              <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
                            </td>
                          </tr>
                          <tr>
                            <th></th>
                            <td><p className="tx-exp-tp6">(* 최대 6개월까지 조회 가능합니다.)</p></td>
                          </tr>
                        </tbody>
                      </table>
                      <ul className="float-wrap">
                        <li><p>총 35대 입찰완료</p></li>
                        <li><CheckBox id='chk-interest-car-2-2' title='관심차량만' /></li>
                      </ul>
                      <div className="admin-list tp6">
                        <div className="content-top">
                          <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                            <caption className="away">결제내역</caption>
                            <colgroup>
                              <col width="59%" />
                              <col width="7%" />
                              <col width="7%" />
                              <col width="7%" />
                              <col width="20%" />
                            </colgroup>
                            <thead>
                              <tr>
                                <th>차량정보</th>
                                <th>선택가</th>
                                <th>최고가</th>
                                <th>내견적</th>
                                <th>진행상태</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td><span>4,420</span>만원</td>
                                <td><span>4,420</span>만원</td>
                                <td><span>4,420</span>만원</td>
                                <td>
                                  <span className="tender-co">낙찰되었습니다</span>
                                  ( 관심 21명 | 입찰 45명 )
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td><span>4,420</span>만원</td>
                                <td><span>4,420</span>만원</td>
                                <td><span>4,420</span>만원</td>
                                <td>
                                  <span className="tender-end">입찰 종료</span>
                                  ( 관심 21명 | 입찰 45명 )
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="img-cover">
                                    <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                  </div>
                                  <div className="summary">
                                    <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                                    <ul className="info">
                                      <li>00가0000</li>
                                      <li>09/12식(10년형)</li>
                                      <li>84,761km</li>
                                      <li>오토</li>
                                      <li>디젤</li>
                                    </ul>
                                  </div>
                                </td>
                                <td><span>4,420</span>만원</td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                  <Button size="mid" background="blue80" title="입찰가격 수정" width={160} onClick={handleTenderPopup}/>
                                  ( 관심 21명 | 입찰 45명 )
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <PageNavigator recordCount={50} className="mt32" />
                        </div>
                      </div>
                    </div>
                  </TabCont>
                </TabMenu>
              </div>
            </TabCont>
          </TabMenu>
        </div>
      </div>

      <RodalPopup show={tenderPop} type={'fade'} closedHandler={closeTenderPop} title={isBidding === false ? "입찰하기" : "입찰가격 수정"} mode="normal" size="small">
        <MypageTender isBidding={isBidding} />
      </RodalPopup>

      <RodalPopup show={visitPop1} type={'fade'} closedHandler={closeVisitPop1} title="방문일자 입력" mode="normal" size="small">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <legend className="away">방문일자 수정</legend>
              <ul className="form-list">
                <li>
                  <span className="tit">방문일자 선택</span>
                  <DatePicker defaultValue={now} inputWidth={276} inputHeight={40} />
                </li>
                <li>
                  <span className="tit">방문시간 선택</span>
                  <span className="bridge"><SelectBox id="select1" className="items-sbox" options={select1_list} width={134} height={40} placeHolder="00" /></span>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={134} height={40} placeHolder="00" />
                </li>
                <li>
                  <span className="tit">지역 선택</span>
                  <span className="bridge"><SelectBox id="select1" className="items-sbox" options={select1_list} width={134} height={40} placeHolder="시/도" /></span>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={134} height={40} placeHolder="구/군" />
                </li>
              </ul>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={127} />
                <Button size="big" background="blue80" title="입력" width={127} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup>
      <RodalPopup show={visitPop2} type={'fade'} closedHandler={closeVisitPop2} title="방문일자 수정" mode="normal" size="small">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <legend className="away">방문일자 수정</legend>
              <ul className="form-list">
                <li>
                  <span className="tit">방문일자 선택</span>
                  <DatePicker defaultValue={now} inputWidth={276} inputHeight={40} />
                </li>
                <li>
                  <span className="tit">방문시간 선택</span>
                  <span className="bridge"><SelectBox id="select1" className="items-sbox" options={select1_list} width={134} height={40} placeHolder="00" /></span>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={134} height={40} placeHolder="00" />
                </li>
                <li>
                  <span className="tit">지역 선택</span>
                  <span className="bridge"><SelectBox id="select1" className="items-sbox" options={select1_list} width={134} height={40} placeHolder="시/도" /></span>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={134} height={40} placeHolder="구/군" />
                </li>
              </ul>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={127} />
                <Button size="big" background="blue80" title="수정" width={127} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup>

      <RodalPopup show={customPop} type={'fade'} closedHandler={closeCustomPop} title="고객연락처 확인" mode="normal" size="small">
        <div className="con-wrap popup-tender">
          <table summary="고객연락처 확인" className="table-tp1">
            <caption className="away">고객연락처 확인</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>김현대</td>
              </tr>
              <tr>
                <th>휴대전화번호</th>
                <td>010-1234-1234</td>
              </tr>
              <tr>
                <th>거주지역</th>
                <td>서울특별시 강남구</td>
              </tr>
            </tbody>
          </table>
          <span className="sub">※ 고객님께 연락하시고 방문일자를 입력해주세요.</span>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={dealDelayPop1} type={'fade'} closedHandler={closeDealDelayPop1} title="거래지연 사유 입력" mode="normal" size="small">
        <div className="con-wrap popup-tender">
          <Textarea countLimit={500} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} height={208} placeHolder="사유를 입력하세요." />
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} />
            <Button size="big" background="blue80" title="입력" width={127} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={dealDelayPop2} type={'fade'} closedHandler={closeDealDelayPop2} title="거래지연 내용 확인" mode="normal" size="small">
        <div className="con-wrap popup-tender">
          <Textarea countLimit={500} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} disabled={true} height={208} placeHolder="사유를 입력하세요." />
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={dealNotifyPop1} type={'fade'} closedHandler={closeDealNotifyPop1} title="거래불발 사유 입력" mode="normal" size="small">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <legend className="away">거래불발 사유 입력</legend>
              <ul className="radio-list">
                <li><Radio className="simple" id="deal-notify-1" title="매입단가 불일치" value={1} checked={isValue} onChange={handleChange} /></li>
                <li><Radio className="simple" id="deal-notify-2" title="차량정보 불일치" value={2} checked={isValue} onChange={handleChange} /></li>
                <li><Radio className="simple" id="deal-notify-3" title="고객성향 불량" value={3} checked={isValue} onChange={handleChange} /></li>
                <li><Radio className="simple" id="deal-notify-4" title="기타(텍스트 입력)" value={4} checked={isValue} onChange={handleChange} /></li>
              </ul>
              <Textarea countLimit={500} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} height={128} placeHolder="사유를 입력하세요." />
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={127} />
                <Button size="big" background="blue80" title="입력" width={127} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup>
      <RodalPopup show={dealNotifyPop2} type={'fade'} closedHandler={closeDealNotifyPop2} title="거래불발 내용확인" mode="normal" size="small">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <ul className="form-list">
                <li>신고일 : 2019-09-12</li>
                <li>
                  신고사유
                  {
                    isMode === "radio" &&
                    <div className="tx-wrap tx-l">매입단가 불일치</div>
                  }
                  {
                    isMode === "textarea" &&
                    <Textarea countLimit={500} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} placeHolder="딜러가 입력한 사유가 노출되는 영역입니다." /> 
                  }
                </li>
              </ul>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="blue80" title="확인" width={245} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup>
      <RodalPopup show={dealNotifyPop3} type={'fade'} closedHandler={closeDealNotifyPop3} title="거래 소명" mode="normal" size="medium">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <ul className="form-list">
                <li className="w">
                  소명사유
                  <Textarea countLimit={500} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} height={128} placeHolder="사유를 입력하세요." />
                </li>
                <li className="mt40">
                  첨부파일(최대 5개까지 등록가능)
                  <InputFile uploadList={uploadList1} resVertical={true} />
                </li>
              </ul>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={127} />
                <Button size="big" background="blue80" title="입력" width={127} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup>
      <RodalPopup show={dealNotifyPop4} type={'fade'} closedHandler={closeDealNotifyPop4} title="소명 불가 사유 확인" mode="normal" size="medium">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <ul className="form-list">
                <li className="w">
                  소명사유
                  <Textarea countLimit={500} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} disabled={true} height={128} placeHolder="사유를 입력하세요. 고객이 싫다고 했어요." />
                </li>
                <li className="w">
                  소명사유 불가
                  <Textarea countLimit={500} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} disabled={true} height={128} placeHolder="관리자가 입력한 사항이 노출되는 영역" />
                </li>
              </ul>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="blue80" title="확인" width={245} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup>

      <RodalPopup show={dealCoPop} type={'fade'} closedHandler={closeDealCoPop} title="거래 성사 완료 신고" mode="normal" size="medium">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <ul className="form-list line">
                <li>
                  <span className="tit">최종 거래일자 선택(필수)</span>
                  <DatePicker defaultValue={now} inputWidth={276} inputHeight={40} />
                </li>
                <li>
                  <span className="tit v-top">감가 항목 입력(선택)</span>
                  <ul className="radio-list">
                    {/* #a1 start */}
                    <li><Radio className="simple" id="deal-notify-1" title="외판 이상(수리필요)" value={1} checked={isValue} onChange={handleChange} /></li>
                    <li><Radio className="simple" id="deal-notify-2" title="사고 이력(패널 교환 등)" value={2} checked={isValue} onChange={handleChange} /></li>
                    <li><Radio className="simple" id="deal-notify-3" title="차량정보 불일치(옵션, 등급정보 등)" value={3} checked={isValue} onChange={handleChange} /></li>
                    <li><Radio className="simple" id="deal-notify-4" title="기타(텍스트 입력)" value={4} checked={isValue} onChange={handleChange} />
                      <Textarea countLimit={500} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} placeHolder="사유를 입력하세요." />
                    </li>
                    {/* #a1 end */}
                    <li>
                      <InputFile uploadList={uploadList1} resVertical={true} />
                    </li>
                  </ul>
                </li>
                <li>
                  <ul className="form-list">
                    {/* #a2 start */}
                    <li>
                      <span className="tit">입찰 금액(필수)</span>
                      <label className="hide" htmlFor="biddingPrice">입찰 금액</label>
                      <Input type="text" id="biddingPrice" placeHolder="입력하세요." width={276} height={40} disabled={true} /><em className="mg8">만원</em>
                    </li>
                    {/* #a2 end */}
                    <li>
                      <span className="tit">최종 매입가(필수)</span>
                      <label className="hide" htmlFor="price">최종 매입가</label>
                      <Input type="text" id="price" placeHolder="입력하세요." width={276} height={40} /><em className="mg8">만원</em>
                    </li>
                    <li>
                      <span className="tit v-top mt8">이전 등록이미지(필수)</span>
                      <InputFile uploadList={uploadList1} resVertical={true} />
                    </li>
                    <li>
                      <span className="tit v-top mt8">성능점검기록부(필수)</span>
                      <InputFile uploadList={uploadList1} resVertical={true} />
                    </li>
                  </ul>
                </li>
              </ul>
              <Buttons align="center" marginTop={56}>
                <Button size="big" background="gray" title="취소" width={127} />
                <Button size="big" background="blue80" title="입력" width={127} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup>

      <RodalPopup show={dealFeePop} type={'fade'} closedHandler={closeDealFeePop} title="딜러 수수료 입금" mode="normal" size="small">
        <div className="con-wrap popup-tender">
          <form className="register-form">
            <fieldset>
              <ul className="form-list mg">
                <li>
                  가상계좌 안내
                  <div className="tx-wrap">[하나은행] 123132165465465</div>
                </li>
                <li>
                  수수료 총액 : 10 만원(VAT 포함)<br />
                  수수료 입금기한 : <span className="tx-red80">2019-09-09-23:59</span> 까지<br />
                  세금계산서 발행
                  <div className="tx-wrap">
                    <RadioGroup dataList={[
                      { id: 'account-num', value: 1, checked: true, title: '사업자 등록 번호 [123-45-67890]' }
                    ]} />
                  </div>
                </li>
              </ul>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="blue80" title="확인" width={245} />
              </Buttons>
            </fieldset>
          </form>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(DealerBuy01);
