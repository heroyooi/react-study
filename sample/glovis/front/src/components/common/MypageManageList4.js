import { useState, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'
import PageNavigator from '@src/components/common/PageNavigator';
import MypageFilterSelect from '@src/components/common/MypageFilterSelect';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import Radio from '@lib/share/items/Radio';
import Input from '@lib/share/items/Input';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { select1_list } from '@src/dummy';
import { DealerContext } from '@pages/mypage/dealer/sellcar/carManagement';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { preventScroll } from '@src/utils/CommonUtil';
/*
  html 변경이력
  03.12 : content5, content6, content7 부분에 LI 로 된 차량컨텐츠 삽입
        : option-tp4 class 뒤 bg-XXX 컬러 클래스 변경(라이브 스튜디오, 라이브샷, 프랜차이즈)
        : 등록진행중 -> 등록대기중 으로 수정 #a1 부분 참고
        : 기간만료 탭항목 추가 #a2 부분 참고
        : 재촬영 신청버튼 삭제  #a3 부분 참고     
*/

const MypageManageList4 = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    const { withoutList, handleFullpagePopup } = useContext(DealerContext);

    const createBodyPortal = useCreatePortalInBody(null, "wrap");

    const [viewFilter, setViewFilter] = useState(1);
    const handleFilter = useCallback(filter => e => {
      e.preventDefault();
      setViewFilter(filter === "register" ? 1 : 2);
    }, [viewFilter]);
    
    const [dimm1, setDimm1] = useState(false);
    const [dimm2, setDimm2] = useState(false);
    const [dimm3, setDimm3] = useState(false);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const handleOpenPop = useCallback((e) => {
      e.preventDefault();
      setActive1(true);
      setDimm1(true);
      preventScroll(true);
    }, []);
    const handleSendPop = useCallback((e) => {
      e.preventDefault();
      setActive2(true);
      setDimm2(true);
      preventScroll(true);
    }, []);
    const handleCompletePop = useCallback((e) => {
      e.preventDefault();
      setActive3(true);
      setDimm3(true);
      preventScroll(true);
    }, []);
    const handleCloseDimm1 = useCallback(() => {
      setActive1(false);
      setDimm1(false);
      preventScroll(false);
    }, []);
    const handleCloseDimm2 = useCallback(() => {
      setActive2(false);
      setDimm2(false);
      preventScroll(false);
    }, []);
    const handleCloseDimm3 = useCallback(() => {
      setActive3(false);
      setDimm3(false);
      preventScroll(false);
    }, []);

    const handleClose = useCallback((e) => {
      e.preventDefault();
      handleCloseDimm1();
      handleCloseDimm2();
      handleCloseDimm3();
      
    }, []);

    const handleSearch = (e) => {
      e.preventDefault();
      handleClose(e);
    }
    const handleConfirm = (e) => {
      e.preventDefault();
      handleClose(e);
      setCheckPop(false);
    }
    
    const [dealerPop, setDealerPop, openDealerPop, closeDimmDealerPop] = useRodal(false);
    const handleCallback = useCallback((val, e) => {
      e.preventDefault();
      setDealerPop(true);
    }, []);
    const callbackDealerPop = useCallback((e) => {
      e.preventDefault();
      setDealerPop(false);
    }, []);

    const [checkPop, setCheckPop, openCheckPop, closeDimmCheckPop] = useRodal(false);
    const closeCheckPop = useCallback((e) => {
      e.preventDefault();
      setCheckPop(false);
    }, []);

    const [applyPop, setApplyPop, openApplyPop, closeDimmApplyPop] = useRodal(false);
    const closeApplyPop = useCallback((e) => {
      e.preventDefault();
      setApplyPop(false);
    }, []);

    const [senderPop, setSenderPop, openSenderPop, closeDimmSenderPop] = useRodal(false);
    const closeSenderPop = useCallback((e) => {
      e.preventDefault();
      setSenderPop(false);
    }, []);

    // 버튼식 라디오
    const [isValue4_1, setIsValue4_1] = useState(0);
    const [isValue4_2, setIsValue4_2] = useState(0);
    const handleChange4_1 = useCallback((e) => {
      e.preventDefault();
      setIsValue4_1(Number(e.target.value));
    }, [isValue4_1]);
    const handleChange4_2 = useCallback((e) => {
      e.preventDefault();
      setIsValue4_2(Number(e.target.value));
    }, [isValue4_2]);

    return (
      <>
        <div className="register-admin-sec">
          <div className="float-wrap btn-s">
            <h3 className="tit2">대기차량 목록</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="상세조회" width={61} onClick={handleOpenPop} />
          </div>

          <ul className="admin-list-wrap">
            <li>
              {withoutList ? (
                <div className="list-none-wrap">
                  <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
                </div>
              ) : (
                <div className="goods-list admin-list tp4">
                  <ul>
                    <li>
                      <CheckBox id="chk-list-1" />
                      <span>
                        <div className="img-cover">
                          <p className="state normal">경매낙찰차량</p>
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <Link href="/buycar/buyCarDetailType"><a><h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5></a></Link>
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
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="매물보내기" fontWeight="500" measure="%" width={49} onClick={handleSendPop} />
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" fontWeight="500" measure="%" width={49} mgMeasure="%" marginLeft={2} />
                      </Buttons>
                    </li>
                    <li>
                      <CheckBox id="chk-list-2" />
                      <span>
                        <div className="img-cover">
                          <p className="state hold">기간만료</p>
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <Link href="/buycar/buyCarDetailType"><a><h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5></a></Link>
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
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="판매완료신고" fontWeight="500" measure="%" width={49} onClick={handleCompletePop} />
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" fontWeight="500" measure="%" width={49} mgMeasure="%" marginLeft={2} />
                      </Buttons>
                      {/* <Buttons align="center" marginTop={16}>
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="판매완료신고" fontWeight="500" measure="%" width={100} onClick={handleCompletePop} />
                      </Buttons> */}
                    </li>
                    <li>
                      <CheckBox id="chk-list-3" />
                      <span>
                        <div className="img-cover">
                          <p className="state hold">등록대기</p>
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <Link href="/buycar/buyCarDetailType"><a><h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5></a></Link>
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
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="등록진행" fontWeight="500" measure="%" width={100}/>
                      </Buttons>
                    </li>
                    <li>
                      <CheckBox id="chk-list-4" />
                      <span>
                        <div className="img-cover">
                          <p className="state hold">받은차량</p>
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <Link href="/buycar/buyCarDetailType"><a><h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5></a></Link>
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
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="보낸사람 보기" fontWeight="500" measure="%" width={49}onClick={(e) => openSenderPop(e, "fade")} />
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" fontWeight="500" measure="%" width={49} mgMeasure="%" marginLeft={2} />
                      </Buttons>
                    </li>
                    <li>
                      <CheckBox id="chk-list-5" />
                      <span>
                        <div className="img-cover">
                          <p className="state fran">프랜차이즈</p>
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <Link href="/buycar/buyCarDetailType"><a><h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5></a></Link>
                          <div className="info-wrap">
                            <div className="info">
                              <span>00가 0000</span>
                              <span>09/12식 (10년형)</span>
                              <span>84,761km</span>
                            </div>
                            <div className="price-wrap">
                              <div className="price-left">
                                <p className="price-tp2">미입력</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" fontWeight="500" measure="%" width={100}/>
                      </Buttons>
                    </li>
                    <li>
                      <CheckBox id="chk-list-6" />
                      <span>
                        <div className="img-cover">
                          <p className="state need">Live Studio</p>
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <Link href="/buycar/buyCarDetailType"><a><h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5></a></Link>
                          <div className="info-wrap">
                            <div className="info">
                              <span>00가 0000</span>
                              <span>09/12식 (10년형)</span>
                              <span>84,761km</span>
                            </div>
                            <div className="price-wrap">
                              <div className="price-left">
                                <p className="price-tp2">미입력</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" fontWeight="500" measure="%" width={100} />
                      </Buttons>
                    </li>
                    <li>
                      <CheckBox id="chk-list-7" />
                      <span>
                        <div className="img-cover">
                          <p className="state need">Live Shot</p>
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <Link href="/buycar/buyCarDetailType"><a><h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5></a></Link>
                          <div className="info-wrap">
                            <div className="info">
                              <span>00가 0000</span>
                              <span>09/12식 (10년형)</span>
                              <span>84,761km</span>
                            </div>
                            <div className="price-wrap">
                              <div className="price-left">
                                <p className="price-tp2">미입력</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" fontWeight="500" measure="%" width={100}/>
                      </Buttons>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        {createBodyPortal(<>
        <div className={dimm1 ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm1}></div>
        <MobBottomArea active={active1} isFixButton={true} zid={101}>
          <div className="inner pb7">
            <h3 className="tit1 pb7">상세조회</h3>
            <ul className="m-menu-list tp1">
              <li onClick={handleFullpagePopup("f1")}>
                <div className="sel-wrap">
                  <span className="tit">제조사/모델</span>
                </div>
              </li>
              <li className="btn-wrap">
                <span className="tit">정렬</span>
                <ul className="radio-block small col3">
                  <li><Radio className="txt" id="all" label="전체" value={1} checked={isValue4_1} onChange={handleChange4_1} /></li>
                  <li><Radio className="txt" id="bid" label="경매낙찰" value={2} checked={isValue4_1} onChange={handleChange4_1} /></li>
                  <li><Radio className="txt" id="apply" label="등록진행" value={3} checked={isValue4_1} onChange={handleChange4_1} /></li>
                  <li><Radio className="txt" id="studio" label="Live Studio" value={4} checked={isValue4_1} onChange={handleChange4_1} /></li>
                  <li><Radio className="txt" id="shot" label="Live Shot" value={5} checked={isValue4_1} onChange={handleChange4_1} /></li>
                  <li><Radio className="txt" id="take" label="받은차량" value={6} checked={isValue4_1} onChange={handleChange4_1} /></li>
                  <li><Radio className="txt" id="finish" label="기간만료" value={7} checked={isValue4_1} onChange={handleChange4_1} /></li>
                  <li><Radio className="txt" id="franchise" label="프랜차이즈" value={8} checked={isValue4_1} onChange={handleChange4_1} /></li>
                </ul>
              </li>
            </ul>
          </div>
          <Button className="fixed" size="full" background="blue80" title="조회" onClick={handleSearch} />
        </MobBottomArea>
        
        <div className={dimm2 ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm2}></div>
        <MobBottomArea active={active2} isFixButton={true} zid={101}>
          <div className="inner">
            <div className="popup-declare">
              <h3 className="tit1">경매 낙찰차량 보내기</h3>
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
                <p className="label">딜러선택</p>
                <MobSelectBox
                  options={[
                    { id: 'dealer1', value: 1, checked: true, disabled: false, label: '장현대 (010-1234-5678)' },
                    { id: 'dealer2', value: 2, checked: false, disabled: false, label: '김현대 (010-1234-5678)' },
                    { id: 'dealer3', value: 3, checked: false, disabled: true, label: '송현대 (010-1234-5678)' },
                    { id: 'dealer4', value: 4, checked: false, disabled: false, label: '장현대 (010-1234-5678)' },
                    { id: 'dealer5', value: 5, checked: false, disabled: false, label: '김현대 (010-1234-5678)' },
                    { id: 'dealer6', value: 6, checked: false, disabled: false, label: '송현대 (010-1234-5678)' }
                  ]} width="68%" onClick={handleCallback} />
                <span className="tx-exp-tp5 pl0">※ 낙찰차량은 같은 소속 상사 회원에게만 보내기가 가능합니다.</span>
              </div>
            </div>
          </div>
          <Buttons align="center" className="full fixed">
            <Button size="big" background="blue20" color="blue80" title="취소" measure='%' width={50} height={56} onClick={handleClose} />
            <Button size="big" background="blue80" title="확인" measure='%' width={50} height={56} onClick={(e) => openCheckPop(e, "fade")} />
          </Buttons>
        </MobBottomArea>
        
        <div className={dimm3 ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm3}></div>
        <MobBottomArea active={active3} zid={101}>
          <div className="inner pb0">
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
                    <li><Radio className="txt" id="autobell" label="오토벨" value={1} checked={isValue4_2} onChange={handleChange4_2} /></li>
                    <li><Radio className="txt" id="othersite" label="타사이트" value={2} checked={isValue4_2} onChange={handleChange4_2} /></li>
                    <li><Radio className="txt" id="offline" label="오프라인" value={3} checked={isValue4_2} onChange={handleChange4_2} /></li>
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
            </div>
          </div>
          <Buttons align="center" className="full" marginTop={19}>
            <Button size="big" background="blue20" color="blue80" title="취소" measure='%' width={50} height={56} onClick={handleClose}/>
            <Button size="big" background="blue80" title="판매완료" measure='%' width={50} height={56} onClick={handleConfirm} />
          </Buttons>
        </MobBottomArea>
        
        <RodalPopup show={dealerPop} type={'fade'} closedHandler={closeDimmDealerPop} isMask={true} isButton={false} subPop={false} >
          <div className="con-wrap">
            <p className="exp">종사원증 유효기간이 만료된 직원을 선택하셨습니다. 원활한 서비스 이용을 위하여 종사원증 정보 업데이트를 요청해주세요.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={callbackDealerPop} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={checkPop} type={'fade'} closedHandler={closeDimmCheckPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            {/* 경매 낙찰 차량 보내기 확인 버튼 클릭시 - 팝업오픈 */}
            <p className="exp">한 번 보낸 차량은 다시 회수가 불가능합니다.<br />차량을 보내시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeCheckPop} />
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} />
            </Buttons>
            {/* 경매 낙찰 차량 보내기 팝업 확인 버튼 클릭 시 - 팝업 내부에서 텍스트변경 */}
            {/* <p className="exp">차량 보내기를 완료하였습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={handleConfirm} />
            </Buttons> */}
          </div>
        </RodalPopup>

        {/* 매물보내기 기능 제한 시 */}
        <RodalPopup show={applyPop} type={'fade'} closedHandler={closeDimmApplyPop} isMask={true} isButton={false} subPop={false} >
          <div className="con-wrap">
            <p className="exp">매물 보내기 기능은 단체 계정 생성 및 소속딜러로 승인이 완료된 이후 이용하실 수 있습니다. 상사 대표님께 단체 계정 생성을 요청해주세요.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={closeApplyPop} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={senderPop} type={'fade'} closedHandler={closeDimmSenderPop} isMask={true} isButton={false} subPop={false} >
          <div className="con-wrap">
            <p className="exp">보낸사람 : 강기아<br />받은일시 : 2016.12.10 16:00</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={closeSenderPop} />
            </Buttons>
          </div>
        </RodalPopup>
        </>)}
      </>
    )
  }

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);
  const [rodalShow2_1, setRodalShow2_1, rodalPopupHandler2_1, modalCloseHandler2_1] = useRodal(false, true);
  const [rodalShow2_2, setRodalShow2_2, rodalPopupHandler2_2, modalCloseHandler2_2] = useRodal(false, true);
  const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false, true);
  const [rodalShow4, setRodalShow4, rodalPopupHandler4, modalCloseHandler4] = useRodal(false);

  return (
    <>
      <div className="register-admin-sec standby-car-sec">
        <MypageFilterSelect />

        <TabMenu type="type9" defaultTab={0} >
          <TabCont id="tab9-1" tabTitle="전체 12" index={0}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-blue80">경매낙찰차량</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="낙찰차량 보내기" width={100} marginTop={8} onClick={(e) => rodalPopupHandler2(e, "fade")}/>
                    </div>
                  </div>
                </div>
              </li>
              {/* #a4 등록대기중, 기간만료 행 추가 start */}
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">등록대기중</span>
                      <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7">1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="등록진행" width={100} />                    
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">등록대기중</span>
                      <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7">1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">                     
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} marginTop={8} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">기간만료차량</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7">1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} /> 
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="판매완료신고" width={100} marginTop={8} onClick={(e) => rodalPopupHandler4(e, "fade")}/>                     
                    </div>
                  </div>
                </div>
              </li>
              {/* #a4 등록대기중, 기간만료 행 추가 end */}
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gold">프랜차이즈</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="보낸사람 보기" width={100}  onClick={(e) => rodalPopupHandler3(e, "fade")}/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-red">Live Studio</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                      {/* <Button size="mid" line="blue80" color="blue80" radius={true} title="재촬영신청" width={100} marginTop={8} onClick={(e) => rodalPopupHandler(e, "fade")}/> */}
                      {/* #a3  재촬영 신청버튼 삭제*/}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-red">Live Shot</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-2" tabTitle="낙찰차량 1" index={1}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-blue80">경매낙찰차량</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="재촬영신청" width={100} marginTop={8} onClick={(e) => rodalPopupHandler(e, "fade")}/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-3" tabTitle="등록대기중 1" index={2}>  {/* #a1 */}
          {/* #a4  탭타이트 변경*/}
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">등록대기중</span>
                       {/* #a4 텍스트 변경*/}
                      <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    {/* #a4 항목추가 start */}
                    <p className="price-tp7">1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">                     
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="등록진행" width={100} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} marginTop={8} onClick={(e) => rodalPopupHandler2(e, "fade")}/>
                    </div>
                    {/* #a4 항목추가 end */}
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-4" tabTitle="Live Studio 1" index={3}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-red">Live Studio</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-5" tabTitle="Live Shot 1" index={4}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-red">Live Shot</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-6" tabTitle="받은차량 2" index={5}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">받은차량</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-7" tabTitle="보류차량 1" index={6}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">보류차량</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          {/* #a2 탭항목 추가 start */}
          <TabCont id="tab9-8" tabTitle="기간만료 1" index={7}>
            < ul className="prepare-img-list">             
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">기간만료차량</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7">1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} /> 
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="판매완료신고" width={100} marginTop={8} onClick={(e) => rodalPopupHandler4(e, "fade")} />                     
                    </div>
                  </div>
                </div>
              </li>
            </ul>  
          </TabCont>
           {/* #a2 탭항목 추가 end */}
           <TabCont id="tab9-9" tabTitle="프랜차이즈 5" index={8}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gold">프랜차이즈</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
        </TabMenu>
      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs">
      <div className="con-wrap">
        <p>해당 차량의 재촬영을 신청하시겠습니까?</p>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="gray" title="취소" width={130} />
          <Button size="big" background="blue80" title="확인" width={130} onClick={(e) => rodalPopupHandler1(e, "fade")}/>
        </Buttons>
      </div>
      </RodalPopup>
      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} mode="normal" size="xs">
        <div className="con-wrap">
          <p>재촬영 신청이 접수되었습니다.<br />고객센터에서 확인 후 연락드리겠습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} mode="normal" size="small" title="낙찰차량 보내기">
        <div className="con-wrap popup-bid-send">
          <table summary="차량정보에 대한 내용" className="table-tp1">
            <caption>차량정보</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량명</th>
                <td>현대 투싼 ix 디젤 2WD LX20 럭셔리</td>
              </tr>
              <tr>
                <th>차량번호</th>
                <td>00가1234</td>
              </tr>
              <tr>
                <th>년식</th>
                <td>09/12식 (10년형)</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>84,761km</td>
              </tr>
              <tr>
                <th>변속기</th>
                <td>오토</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>디젤</td>
              </tr>
            </tbody>
          </table>
          <ul className="dot-wrap">
            <li><i className="ico-dot sml"></i><span>낙찰 받은 날짜</span><strong>2019.12.10</strong></li>
            <li><i className="ico-dot sml"></i><span>낙찰 금액</span><strong>2,060<span>만원</span></strong></li>
          </ul>
          <form>
            <fieldset>
              <legend>받는사람</legend>
              <SelectBox id="select1" className="items-sbox mr8" options={select1_list} width={168} height={40}/>
              <Input type="text" placeHolder="" width={346} height={40} />
            </fieldset>
          </form>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} onClick={(e) => rodalPopupHandler2_1(e, "fade")}/>
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow2_1} type={'fade'} closedHandler={modalCloseHandler2_1} mode="normal" size="xs">
        <div className="con-wrap">
          <p>한 번 보낸 차량은 다시 회수가 안됩니다.<br />차량을 보내시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={(e) => rodalPopupHandler2_2(e, "fade")}/>
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow2_2} type={'fade'} closedHandler={modalCloseHandler2_2} mode="normal" size="xs">
        <div className="con-wrap">
          <p>차량 보내기를 완료하였습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} mode="normal" size="xs">
        <div className="con-wrap send-person">
          <ul className="dot-wrap">
            <li><i className="ico-dot sml"></i><span>보낸 사람</span><strong>강기아</strong></li>
            <li><i className="ico-dot sml"></i><span>받은 일시</span><strong>2019.12.10</strong></li>
          </ul>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow4} type={'fade'} closedHandler={modalCloseHandler4} title="판매완료 신고" mode="normal" size="medium">
        <div className="con-wrap popup-declare">
          <div className="admin-list tp4">
            <div className="content-top">
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
            </div>
          </div>
          <div className="sell-declare">
            <p>현재광고가격<span><em>4,150</em>만원</span></p>
            <div className="sell-price-wrap">
              <label htmlFor="sell-price">실제판매가격</label>
              <span>
                <Input type="text" id="sell-price" value="4,050" width={282} height={64} />
                <em>만원</em>
              </span>
            </div>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} />
            <Button size="big" background="blue80" title="판매완료" width={172} height={60} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  )
}

export default MypageManageList4;