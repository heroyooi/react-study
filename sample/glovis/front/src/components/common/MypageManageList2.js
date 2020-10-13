import { useState, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'
import PageNavigator from '@src/components/common/PageNavigator';
import MypageFilterSelect from '@src/components/common/MypageFilterSelect';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import Radio from '@lib/share/items/Radio';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { DealerContext } from '@pages/mypage/dealer/sellcar/carManagement';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { preventScroll } from '@src/utils/CommonUtil';

const MypageManageList2 = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    const { withoutList, handleFullpagePopup } = useContext(DealerContext);

    const createBodyPortal = useCreatePortalInBody(null, "wrap");

    // 전체선택 - 차량 목록
    const checkData = [
      {id: 'banner-item1-chk-1', checked: true},
      {id: 'banner-item1-chk-2', checked: true},
      {id: 'banner-item1-chk-3', checked: false},
    ];
    const [chkCar, setChkCar] = useState(checkData);
    const [chkCarAll, setChkCarAll] = useState(checkData.every(v => v.checked === true));
    const handleChkCar = (id) => (e) => {
      const copyCar = [...chkCar];
      copyCar.map(v => {
        if (v.id === e.target.id) {
          v.checked = !v.checked
        }
      });
      setChkCar(copyCar);
      setChkCarAll(copyCar.every(v => v.checked === true));
    }
    const handleChkCarAll = (e) => {
      const copyCar = [...chkCar];
      copyCar.map(v => v.checked = (e.target.checked === true) ? true : false);
      setChkCar(copyCar);
      setChkCarAll(prevCheck => !prevCheck);
    }

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
    const handleDeletePop = useCallback((e) => {
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
    }

    // 버튼식 라디오
    const [isValue2_1, setIsValue2_1] = useState(0);
    const [isValue2_2, setIsValue2_2] = useState(0);
    const handleChange2_1 = useCallback((e) => {
      e.preventDefault();
      setIsValue2_1(Number(e.target.value));
    }, [isValue2_1]);
    const handleChange2_2 = useCallback((e) => {
      e.preventDefault();
      setIsValue2_2(Number(e.target.value));
    }, [isValue2_2]);

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

    return (
      <>
        <div className="register-admin-sec">
          <div className="float-wrap btn-s">
            <h3 className="tit2">관리필요차량 목록</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="상세조회" width={61} onClick={handleOpenPop} />
          </div>

          <ul className="admin-list-wrap">
            <li>
              <div className="float-wrap btn-xs mb20">
                <CheckBox id='sell-all-chk1' title='전체선택' isSelf={false} checked={chkCarAll} onChange={handleChkCarAll} />
                <div className="btn-wrap">
                  <Button size="sml" line="gray" color="gray" radius={true} title="선택차량 삭제" width={74} height={24} fontSize={10} fontWeight={500} onClick={handleDeletePop}/>
                </div>
              </div>
              {withoutList ? (
                <div className="list-none-wrap">
                  <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
                </div>
              ) : (
                <div className="goods-list admin-list tp4">
                  <ul>
                    <li>
                      <CheckBox id={chkCar[0].id} checked={chkCar[0].checked} isSelf={false} onChange={handleChkCar(chkCar[0].id)} />
                      <span>
                        <div className="img-cover">
                          <p className="state need">관리필요(만료 D-15)</p>
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
                      <ul className="m-toggle-list up-blue car-date-wrap">
                        <MenuItem>
                          <MenuTitle>등록일:<span>2019-08-01</span>(최종수정일<span>2019-09-01</span>)</MenuTitle>
                          <MenuCont>
                            <table summary="차량정보에 대한 내용" className="table-tp1 th-c td-c mt16">
                              <caption className="away">차량정보</caption>
                              <colgroup>
                                <col width="25%" />
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
                              <Button size="sml" line="blue80" color="blue80" radius={true} title="시간변경" width={61} height={24} fontSize={10} onClick={handleFullpagePopup("time")} />
                            </div>
                            <table summary="대당이용권 자동업데이트에 대한 내용" className="table-tp1">
                              <caption className="away">대당이용권 자동업데이트</caption>
                              <colgroup>
                                <col width="40%" />
                                <col width="60%" />
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

                            <Button line="gray" color="gray" title="정보수정" measure="%" width={49} height={38} fontSize="14" fontWeight={500} onClick={handleFullpagePopup("modify")} />
                            <Button line="gray" color="gray" title="판매완료 신고" measure="%" mgMeasure="%" width={49} height={38} fontSize="14" fontWeight={500} marginLeft={2} onClick={handleCompletePop} />
                          </MenuCont>
                        </MenuItem>
                      </ul>
                    </li>
                    <li>
                      <CheckBox id={chkCar[1].id} checked={chkCar[1].checked} isSelf={false} onChange={handleChkCar(chkCar[1].id)} />
                      <span>
                        <div className="img-cover">
                          <p className="state need">관리필요(만료 D-15)</p>
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
                      <ul className="m-toggle-list up-blue car-date-wrap">
                        <MenuItem>
                          <MenuTitle>등록일:<span>2019-08-01</span>(최종수정일<span>2019-09-01</span>)</MenuTitle>
                          <MenuCont>
                            <table summary="차량정보에 대한 내용" className="table-tp1 th-c td-c mt16">
                              <caption className="away">차량정보</caption>
                              <colgroup>
                                <col width="25%" />
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
                              <Button size="sml" line="blue80" color="blue80" radius={true} title="시간변경" width={61} height={24} fontSize={10} onClick={handleFullpagePopup("time")} />
                            </div>
                            <table summary="대당이용권 자동업데이트에 대한 내용" className="table-tp1">
                              <caption className="away">대당이용권 자동업데이트</caption>
                              <colgroup>
                                <col width="40%" />
                                <col width="60%" />
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

                            <Button line="gray" color="gray" title="정보수정" measure="%" width={49} height={38} fontSize="14" fontWeight={500} onClick={handleFullpagePopup("modify")} />
                            <Button line="gray" color="gray" title="판매완료 신고" measure="%" mgMeasure="%" width={49} height={38} fontSize="14" fontWeight={500} marginLeft={2} onClick={handleCompletePop} />
                          </MenuCont>
                        </MenuItem>
                      </ul>
                    </li>
                    <li>
                      <CheckBox id={chkCar[2].id} checked={chkCar[2].checked} isSelf={false} onChange={handleChkCar(chkCar[2].id)} />
                      <span>
                        <div className="img-cover">
                          <p className="state need">관리필요(만료 D-15)</p>
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
                      <ul className="m-toggle-list up-blue car-date-wrap">
                        <MenuItem>
                          <MenuTitle>등록일:<span>2019-08-01</span>(최종수정일<span>2019-09-01</span>)</MenuTitle>
                          <MenuCont>
                            <table summary="차량정보에 대한 내용" className="table-tp1 th-c td-c mt16">
                              <caption className="away">차량정보</caption>
                              <colgroup>
                                <col width="25%" />
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
                              <Button size="sml" line="blue80" color="blue80" radius={true} title="시간변경" width={61} height={24} fontSize={10} onClick={handleFullpagePopup("time")} />
                            </div>
                            <table summary="대당이용권 자동업데이트에 대한 내용" className="table-tp1">
                              <caption className="away">대당이용권 자동업데이트</caption>
                              <colgroup>
                                <col width="40%" />
                                <col width="60%" />
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

                            <Button line="gray" color="gray" title="정보수정" measure="%" width={49} height={38} fontSize="14" fontWeight={500} onClick={handleFullpagePopup("modify")} />
                            <Button line="gray" color="gray" title="판매완료 신고" measure="%" mgMeasure="%" width={49} height={38} fontSize="14" fontWeight={500} marginLeft={2} onClick={handleCompletePop} />
                          </MenuCont>
                        </MenuItem>
                      </ul>
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
                <Buttons align="center">
                  <Button
                    size="mid"
                    background={viewFilter === 1 ? "blue80" : null}
                    line={viewFilter === 2 ? "gray" : null}
                    color={viewFilter === 2 ? "gray" : null}
                    radius={true}
                    title="등록순"
                    width={48}
                    height={38}
                    measure={'%'}
                    onClick={handleFilter("register")}
                  />
                  <Button
                    size="mid"
                    background={viewFilter === 2 ? "blue80" : null}
                    line={viewFilter === 1 ? "gray" : null}
                    color={viewFilter === 1 ? "gray" : null}
                    radius={true}
                    title="업데이트순"
                    width={48}
                    height={38}
                    marginLeft={4}
                    measure={'%'}
                    mgMeasure={'%'}
                    onClick={handleFilter("update")}
                  />
                </Buttons>
              </li>
            </ul>
          </div>
          <Button className="fixed" size="full" background="blue80" title="조회" onClick={handleSearch} />
        </MobBottomArea>
        
        <div className={dimm2 ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm2}></div>
        <MobBottomArea active={active2} zid={101}>
          <div className="inner">
            <h3 className="tit1 mb8">차량삭제</h3>
            <ul className="radio-group vertical border">
              <li>
                <Radio id="coupon1" label="실차주 요청으로 인한 삭제" value={1} checked={isValue2_1} onChange={handleChange2_1} />
              </li>
              <li>
                <Radio id="coupon2" label="차량 소속 변경" value={2} checked={isValue2_1} onChange={handleChange2_1} />
              </li>
              <li>
                <Radio id="coupon3" label="기타" value={3} checked={isValue2_1} onChange={handleChange2_1} />
              </li>
            </ul>
            <Textarea countLimit={30} type="tp1" height={50} placeHolder="기타 사유 입력" disabledEnter={true} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} disabled={true} />
            <div className="essential-point fs12 tx-red80 mt16">
              <ul>
                <li>&#8251; 삭제 시 복구 및 환불이 불가하며, 판매 수수료는 환불이 불가하오니 주의하시기 바랍니다.</li>
                <li>&#8251; 타사 판매 시 판매 완료를 알려드립니다.</li>
              </ul>
            </div>
          </div>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" onClick={handleClose} />
            <Button size="big" background="blue80" title="확인" onClick={handleConfirm} />
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
                    <li><Radio className="txt" id="autobell" label="오토벨" value={1} checked={isValue2_2} onChange={handleChange2_2} /></li>
                    <li><Radio className="txt" id="othersite" label="타사이트" value={2} checked={isValue2_2} onChange={handleChange2_2} /></li>
                    <li><Radio className="txt" id="offline" label="오프라인" value={3} checked={isValue2_2} onChange={handleChange2_2} /></li>
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
        </>)}
      </>
    )
  }

  const {
    rodalPopupHandler1, rodalPopupHandler2, rodalPopupHandler3, rodalPopupHandler4, 
    rodalPopupHandler5, rodalPopupHandler6, rodalPopupHandler7, rodalPopupHandler8,
    rodalPopupHandler9, rodalPopupHandler10, rodalPopupHandler11
  } = useContext(DealerContext);

  return (
    <div className="register-admin-sec">
      <MypageFilterSelect />

      <div className="register-state-modify">
        <CheckBox id="chk-all" title="" />
        <div className="btn-wrap">
          <Button size="mid" line="gray" color="black" radius={true} title="대기차량으로 이동" width={133} onClick={(e) => rodalPopupHandler3(e, "slideUp")} />
          <Button size="mid" line="gray" color="black" radius={true} title="선택차량 삭제" width={109} marginLeft={8} onClick={(e) => rodalPopupHandler2(e, "slideUp")} />
        </div>
      </div>

      <ul className="register-img-list">
        <li>
          <div className="admin-list tp1">
            <div className="content-top">
              <CheckBox id='register-car-chk' />
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
                <p className="price-tp6">7760<span className="won">만원</span></p>
              </div>
              <ul className="numerical">
                <li><i className="ico-dot sml"></i>판매기간<span>53일</span></li>
                <li><i className="ico-dot sml"></i>조회수(일평균)<span>20회</span></li>
                <li><i className="ico-dot sml"></i>관심고객(최근2주)<span>13명</span></li>
                <li><i className="ico-dot sml"></i>동급매물(최근4주)<span><i className="ico-triangle-top"></i>4주</span></li>
              </ul>
            </div>
            <div className="content-bottom">
              <p className="state need">관리필요<span>(만료 00일 전)</span></p>
              <ul> 
                <li className="product-name">대당이용권, 자동업데이트</li>
                <li><span>등록일</span>2019-08-01</li>
                <li><span>최종수정일</span> 2019-09-01</li>
                <li><span>최종업데이트 </span> 2019-09-30 23:10 (6/15회)</li>
              </ul>
              <Button size="mid" line="blue80" color="blue80" radius={true} title="업데이트 시간변경" onClick={(e) => rodalPopupHandler7(e, "slideUp")} width={129} />
            </div>
            <div className="btn-wrap">
              <div className="btn-left">
                <Button size="sml" background="blue80" radius={true} title="Live Studio 예약" width={103} href="/mypage/dealerSell06_01"/>
                <Button size="sml" background="blue80" radius={true} title="Live Shot 예약" width={103} href="/mypage/dealerSell06_01"/>
              </div>
              <div className="btn-right">
                <Button size="sml" line="gray" radius={true} title="가격 수정" width={101} onClick={(e) => rodalPopupHandler8(e, "slideUp")}  />
                <Button size="sml" line="gray" radius={true} title="차량정보 수정" width={101} onClick={(e) => rodalPopupHandler9(e, "slideUp")}  />
                <Button size="sml" line="gray" radius={true} title="차량사진 수정" width={101} onClick={(e) => rodalPopupHandler10(e, "slideUp")}  />
                <Button size="sml" line="gray" radius={true} title="성능기록부 수정" width={101} onClick={(e) => rodalPopupHandler11(e, "slideUp")}  />
                <Button size="sml" line="gray" radius={true} title="판매완료 신고" width={101} onClick={(e) => rodalPopupHandler12(e, "slideUp")}  />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default MypageManageList2;