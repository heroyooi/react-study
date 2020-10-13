import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import uuid from "uuid";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MypageCompare from '@src/components/common/popup/MypageCompare';
import BannerItem from '@src/components/common/banner/BannerItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { numberFormat } from '@src/utils/CommonUtil';
import { wishCarList, car_list, mCarList} from '@src/dummy';
import Link from 'next/link';
import { easePoly } from 'd3-ease';

/*
  html 변경이력
  03.11 : alert 샘플 추가 #a1 참고
 
*/
const generalBuy01 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 팝업
  const [deleteShow, setDeleteShow, deletePopupHandler, deleteCloseHandler] = useRodal(false);
  const [comparisonShow, setComparisonShow, comparisonPopupHandler, comparisonCloseHandler] = useRodal(false);

  const [statusMsgShow, setstatusMsgShow, statusMsgPopupHandler, statusMsgCloseHandler] = useRodal(false); //#a1 

  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  // 목록 더보기
  const [listData, setListData] = useState(wishCarList);
  const createDummy = (num) => {
    const dummyArr = [];
    for (let i = 0; i < num; i++) {
      dummyArr.push({
        id: uuid.v4(),
        imgSrc: "/images/dummy/product-img-06.png",
        imgAlt: "새로 추가된 차량 이미지",
        subject: "새로 추가된 차 이름",
        info1: ["00가0000", "09/12식(10년형)"],
        info2: ["84,761km", "오토", "디젤"],
        price: numberFormat(9999),
        sellerName: "박현대",
        sellerMobile: "010-3333-7777",
        location: "서울/강서구"
      });
    }
    return dummyArr;
  }
  const handleListMore = useCallback((e) => {
    e.preventDefault();
    const dummyData = createDummy(5);
    setListData(listData => [...listData, ...dummyData]);
  }, []);

  //alertType 차량정보 클릭 시 팝업타입여부 (현재는 test 용도로 true 처리)
  const [alertType, setAlertType] = useState(true); //#a1 start
  //alertType 차량 dummy 상태 값(판매완료 : sellComplete, 나머지 : etc 값)
  const [status, setStatus] = useState('sellComplete'); //#a1 start

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '내차사기',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });

    const handleBtnClick = useCallback((e, id) => {
      alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
    }, []);

    const { seq } = router.query;
    useEffect(() => {
      if (seq !== undefined) window.scrollTo(0, 0);
    }, [])

    const [isTab, setIsTab] = useState(seq !== undefined ? +seq-1 : 0)
    const [forceChange, setForceChange] = useState(false);
    const handleTab = (num) => (e) => {
      e.preventDefault();
      setForceChange(prev => !prev);
      setIsTab(num-1);
    }
    const [popHead1, setPopHead1] = useState(true);
    const [popHead2, setPopHead2] = useState(true);
    const closePopHead1 = (e) => {
      e.preventDefault();
      setPopHead1(false);
    }
    const closePopHead2 = (e) => {
      e.preventDefault();
      setPopHead2(false);
    }

    // 전체선택 - 차량 목록
    const checkData1 = [
      {id: 'banner-item1-chk-1', checked: true},
      {id: 'banner-item1-chk-2', checked: true},
      {id: 'banner-item1-chk-3', checked: false},
      {id: 'banner-item1-chk-4', checked: true}
    ];
    const checkData2 = [
      {id: 'banner-item2-chk-1', checked: true},
      {id: 'banner-item2-chk-2', checked: true},
      {id: 'banner-item2-chk-3', checked: false},
      {id: 'banner-item2-chk-4', checked: true}
    ]
    const [chkCar1, setChkCar1] = useState(checkData1);
    const [chkCar2, setChkCar2] = useState(checkData2);
    const [chkCarAll1, setChkCarAll1] = useState(checkData1.every(v => v.checked === true));
    const [chkCarAll2, setChkCarAll2] = useState(checkData2.every(v => v.checked === true));
    const handleChkCar1 = (id) => (e) => {
      const copyCar = [...chkCar1];
      copyCar.map(v => {
        if (v.id === e.target.id) {
          v.checked = !v.checked
        }
      });
      setChkCar1(copyCar);
      setChkCarAll1(copyCar.every(v => v.checked === true));
    }
    const handleChkCarAll1 = (e) => {
      const copyCar = [...chkCar1];
      copyCar.map(v => v.checked = (e.target.checked === true) ? true : false);
      setChkCar1(copyCar);
      setChkCarAll1(prevCheck => !prevCheck);
    }
    const handleChkCar2 = (id) => (e) => {
      const copyCar = [...chkCar2];
      copyCar.map(v => {
        if (v.id === e.target.id) {
          v.checked = !v.checked
        }
      });
      setChkCar2(copyCar);
      setChkCarAll2(copyCar.every(v => v.checked === true));
    }
    const handleChkCarAll2 = (e) => {
      const copyCar = [...chkCar2];
      copyCar.map(v => v.checked = (e.target.checked === true) ? true : false);
      setChkCar2(copyCar);
      setChkCarAll2(prevCheck => !prevCheck);
    }
    
    return (
      <AppLayout>
        <div className="general-buy-sec">
          <TabMenu type="type2" defaultTab={isTab} mount={false} forceChange={forceChange}>
            <TabCont tabTitle="최근 본 차량 10" id="tab2-1" index={0}>
              <div className="mypage-admin-title pd20">
                <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
                <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
              </div>
              <div className="list-wrap">
                {
                  withoutList === true
                    ? (
                      <div className="list-none-wrap">
                        <div className="list-none">
                          <p>최근 조회하신 차량이 없습니다.</p>
                          <Buttons align="center" marginTop={16}>
                            <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={100} height={40} href="/buy/list" />
                          </Buttons>
                        </div>
                      </div>
                    ) : (
                      <>
                        {popHead1 && <div className="select-car-wrap mb16">
                          <p className="tit2">선택차량<span> 1</span>개</p>
                          <span>차량 비교하기는 2대만 가능합니다.(PC 4대 가능)</span>
                          <Buttons align="center" marginTop={16}>
                            <Button size="mid" color="gray" line="gray" radius={true} title="관심등록" width={88} height={30} fontSize={12} fontWeight={500} />
                            <Button size="mid" color="gray" line="gray" radius={true} title="비교하기" width={88} height={30} fontSize={12} fontWeight={500} />
                            <Button size="mid" color="gray" line="gray" radius={true} title="삭제" width={88} height={30} fontSize={12} fontWeight={500} />
                          </Buttons>
                          <a href="#" className="popup-close" onClick={closePopHead1}></a>
                        </div>}

                        <div className="content-wrap">
                          <div className="float-wrap sel-s mb16">
                            <CheckBox id='sell-all-chk1' title='전체선택' checked={chkCarAll1} isSelf={false} onChange={handleChkCarAll1} />
                            <MobSelectBox width={136} options={[
                              { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최신 등록순' },
                              { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '낮은 가격순' }
                            ]} />
                          </div>

                          <ul className="goods-list list-type">
                            {mCarList.map((v, i) => {
                              if (i < 4) {
                                return (
                                  <BannerItem key={v.id} id={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} mode="check" chkId={chkCar1[i].id} chkChecked={chkCar1[i].checked} chkChange={handleChkCar1(v.id)} />
                                )
                              }
                            })}
                          </ul>
                        </div>
                      </>
                    )
                }
              </div>
            </TabCont>
            <TabCont tabTitle="관심차량 10" id="tab2-2" index={1}>
              <div className="mypage-admin-title pd20">
                <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
                <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
              </div>
              <div className="list-wrap">
                {
                  withoutList === true
                    ? (
                      <div className="list-none-wrap">
                        <div className="list-none">
                          <p>관심차량으로 등록한 차량이 없습니다.</p>
                          <Buttons align="center" marginTop={16}>
                            <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={100} height={40} href="/buy/list" />
                          </Buttons>
                        </div>
                      </div>
                    ) : (
                      <>
                        {popHead2 && <div className="select-car-wrap mb16">
                          <p className="tit2">선택차량<span> 1</span>개</p>
                          <span>차량 비교하기는 2대만 가능합니다.(PC 4대 가능)</span>
                          <Buttons align="center" marginTop={16}>
                            <Button size="mid" color="gray" line="gray" radius={true} title="비교하기" width={88} height={30} fontSize={12} fontWeight={500} />
                            <Button size="mid" color="gray" line="gray" radius={true} title="삭제" width={88} height={30} fontSize={12} fontWeight={500} />
                          </Buttons>
                          <a href="#" className="popup-close" onClick={closePopHead2}></a>
                        </div>}

                        <div className="content-wrap">
                          <div className="float-wrap sel-s mb16">
                            <CheckBox id='sell-all-chk2' title='전체선택' checked={chkCarAll2} isSelf={false} onChange={handleChkCarAll2} />
                            <MobSelectBox width={136} options={[
                              { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최신 등록순' },
                              { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '낮은 가격순' }
                            ]} />
                          </div>

                          <ul className="goods-list list-type">
                            {mCarList.map((v, i) => {
                              if (i < 4) {
                                return (
                                  <BannerItem key={v.id} id={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} mode="check" chkId={chkCar2[i].id} chkChecked={chkCar2[i].checked} chkChange={handleChkCar2(v.id)} />
                                )
                              }
                            })}
                          </ul>
                        </div>
                      </>
                    )
                }
              </div>
            </TabCont>
            <TabCont tabTitle="차량비교" id="tab2-3" index={2}>
              <div className="content-wrap pt20">
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
                        <Button size="mid" color="gray" line="gray" radius={true} title="최근" width={73} height={30} fontSize={12} fontWeight={500} onClick={handleTab(1)} />
                        <Button size="mid" color="gray" line="gray" radius={true} title="관심" width={73} height={30} fontSize={12} fontWeight={500} onClick={handleTab(2)} />
                      </Buttons>
                    </div>
                  </li>
                </ul>

                <table summary="챠량 기본정보에 대한 내용" className="table-tp1">
                  <caption className="away">챠량 기본정보</caption>
                  <colgroup>
                    <col width="28%" />
                    <col width="36%" />
                    <col width="36%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차종</th>
                      <td>SUV</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>연식</th>
                      <td>13/08식</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>주행거리</th>
                      <td>110,939km</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>변속기</th>
                      <td>오토</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>색상</th>
                      <td>블랙</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>연료/배기량</th>
                      <td>가솔린 / 2,495cc</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>인승/도어수</th>
                      <td>7인승 / 4도어</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
                <ul className="m-toggle-list up-blue table">
                  <MenuItem>
                    <MenuTitle>예싱가격</MenuTitle>
                    <MenuCont>
                      <table summary="예상가격에 대한 내용" className="table-tp1 td-r">
                        <caption className="away">예상가격</caption>
                        <colgroup>
                          <col width="28%" />
                          <col width="36%" />
                          <col width="36%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>판매가</th>
                            <td>42,200,000원</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>이전등록비</th>
                            <td>3,006,348원</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>총 예상비용</th>
                            <td>46,422,000원</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>상세</th>
                            <td><Button size="sml" background="blue20" color="blue80" radius={true} title="계산기" width={100} measure={'%'} height={24} fontSize={10} href="/buy/totalCostCalculation" /></td>
                            <td>-</td>
                          </tr>
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>차량옵션</MenuTitle>
                    <MenuCont>
                      <table summary="차량옵션에 대한 내용" className="table-tp1">
                        <caption className="away">차량옵션</caption>
                        <colgroup>
                          <col width="28%" />
                          <col width="36%" />
                          <col width="36%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>옵션갯수</th>
                            <td>123개</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>옵션1</th>
                            <td>O</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>옵션2</th>
                            <td>X</td>
                            <td>-</td>
                          </tr>
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>기타정보</MenuTitle>
                    <MenuCont>
                      <table summary="기타정보에 대한 내용" className="table-tp1">
                        <caption className="away">기타정보</caption>
                        <colgroup>
                          <col width="28%" />
                          <col width="36%" />
                          <col width="36%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>보험이력</th>
                            <td>없음</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>성능점검</th>
                            <td>있음</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>오토벨인증</th>
                            <td>인증</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>제공서비스</th>
                            <td>홈서비스 EW</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <th>판매자</th>
                            <td>
                              김현대<br />
                              010-5452-7455<br />
                              경기/김포시
                            </td>
                            <td>-</td>
                          </tr>
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                </ul>
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
        <MypageNavi />

        <div className="mypage-state-sec general-buy-sec">
          <div className="mypage-admin-title">
            <h3>관심 차량</h3>
            <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <Button size="mid" line="gray" radius={true} title="선택한 차량 비교" width={129} height={38} onClick={result === "no" ? e => e.preventDefault() : (e) => comparisonPopupHandler(e, "fade")} />
              <Button size="mid" line="gray" radius={true} title="선택한 차량 삭제" width={129} height={38} marginLeft={16} onClick={result === "no" ? e => e.preventDefault() : (e) => deletePopupHandler(e, "fade")} />
              <RadioGroup className="sort-r" dataList={[{ id: 'sortUpload', value: 1, checked: true, disabled: false, title: '가격순' }, { id: 'sortPrice', value: 2, checked: true, disabled: false, title: '등록순' }]} />
              {/*
              <SelectBox id="select1" className="items-sbox" options={[
                { value: '1', label: '등록순' },
                { value: '2', label: '가격순' }
              ]} width={148} height={36} placeHolder="등록순" />
              */}
            </div>
            <div className="admin-list tp7 chk">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="36px" />
                    <col width="51%" />
                    <col width="14%" />
                    <col width="14%" />
                    <col width="12%" />
                    <col width="7%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th><CheckBox id='register-car-chk1' /></th>
                      <th>차량정보</th>
                      <th>가격</th>
                      <th>판매가</th>
                      <th>지역</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  {
                    withoutList === false
                      ? (
                        <tbody>
                          {listData.map(v => {
                            return (
                              <tr key={v.id}>
                                <td><CheckBox id={"register-car-chk1" + v.id} /></td>
                                <td>
                                  <Link href="/buy/viewA">
                                    <a onClick={alertType ? (e) => statusMsgPopupHandler(e, "fade") : ''}> {/* #a1 */}
                                      <ImgCover src={v.imgSrc} alt={v.imgAlt} />
                                      <div className="summary">
                                        <h4 className="subject">{v.subject}</h4>
                                        <ul className="info">{v.info1.map((v, i) => <li key={i}>{v}</li>)}</ul>
                                        <ul className="info">{v.info2.map((v, i) => <li key={i}>{v}</li>)}</ul>
                                      </div>
                                    </a>
                                  </Link>
                                </td>
                                <td><p className="price-tp6">{numberFormat(v.price)}<span className="won">만원</span></p></td>
                                <td className="seller">{v.sellerName}<br />{v.sellerMobile}</td>
                                <td>{v.location}</td>
                                <td><button className="btn-close" onClick={(e) => deletePopupHandler(e, "fade")}></button></td>
                              </tr>
                            )
                          })}
                          <tr className="more">
                            <td colSpan="6" className="more">
                              <div className="cate-list-btn2">
                                <button onClick={handleListMore}>더보기</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          <tr className="list-none">
                            <td colSpan="6">
                              관심차량으로 등록한 차량이 없습니다.<br />
                              <Button size="big" background="blue80" title="차량검색 하러 가기" width={245} height={60} marginTop={16} href="/buy/list" />
                            </td>
                          </tr>
                        </tbody>
                      )
                  }
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={comparisonShow} type={'slideUp'} closedHandler={comparisonCloseHandler} mode="normal" size="large">
        <MypageCompare show={comparisonShow} />
      </RodalPopup>

      <RodalPopup show={deleteShow} type={'slideUp'} closedHandler={deleteCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>차량을 삭제하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      {/* #a1 start */}
      <RodalPopup show={statusMsgShow} type={'slideUp'} closedHandler={statusMsgCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          {status === "sellComplete" ?
            <p>해당 차량은 판매완료 되었습니다.</p>
            :
            <p>해당 차량은 광고종료 되었습니다.</p>
          }
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
      {/* #a1 end */}
    </AppLayout>
  )
}

export default withRouter(generalBuy01);