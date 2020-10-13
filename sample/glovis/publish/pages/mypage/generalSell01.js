import moment from 'moment'
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import { transformText } from '@src/utils/CommonUtil'
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';

const GeneralSell01 = ({ router }) => {
  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  const now = moment();

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  const [listData, setListData] = useState([{
    id: 1,
    date: "2019-09-19",
    detailButton: "/",
    carPrice: "미정",
    seller: ["박현대", "010-3333-7777"],
    autionButtonLink: "/",
    sellMethod: "방문평가",
    state: "신청완료",
    stateButton: "신청취소"
  }, {
    id: 2,
    date: "2019-09-19",
    detailButton: "/",
    image: ["/images/dummy/product-img-06.png", "차량 이미지"],
    carName: "현대 투싼 ix 디젤 2WD LX20 럭셔리",
    carInfos1: ["84,761km", "09/12식(10년형)"],
    carInfos2: ["00가0000", "오토", "디젤"],
    carPrice: "미정",
    seller: null,
    autionButtonLink: "/",
    sellMethod: "방문평가",
    state: "임시저장",
    stateButton: "수정하기"
  }, {
    id: 3,
    date: "2019-09-19",
    detailButton: "/",
    image: ["/images/dummy/product-img-06.png", "차량 이미지"],
    carName: "현대 투싼 ix 디젤 2WD LX20 럭셔리",
    carInfos1: ["84,761km", "09/12식(10년형)"],
    carInfos2: ["00가0000", "오토", "디젤"],
    carPrice: "미정",
    seller: ["박현대", "010-3333-7777"],
    autionButtonLink: "/",
    sellMethod: "방문평가",
    state: "24시간 실시간 비교견적 신청완료",
    stateButton: "입찰현황보기"
  }, {
    id: 4,
    date: "2019-09-19",
    detailButton: "/",
    image: ["/images/dummy/product-img-06.png", "차량 이미지"],
    carName: "현대 투싼 ix 디젤 2WD LX20 럭셔리",
    carInfos1: ["84,761km", "09/12식(10년형)"],
    carInfos2: ["00가0000", "오토", "디젤"],
    carPrice: "미정",
    seller: ["박현대", "010-3333-7777"],
    autionButtonLink: "/",
    sellMethod: "방문평가",
    state: "1차 견적 완료",
    stateButton: "판매진행"
  }, {
    id: 5,
    date: "2019-09-19",
    detailButton: "/",
    image: ["/images/dummy/product-img-06.png", "차량 이미지"],
    carName: "현대 투싼 ix 디젤 2WD LX20 럭셔리",
    carInfos1: ["84,761km", "09/12식(10년형)"],
    carInfos2: ["00가0000", "오토", "디젤"],
    carPrice: "미정",
    seller: ["박현대", "010-3333-7777"],
    autionButtonLink: "/",
    sellMethod: "방문평가",
    state: "신청완료",
    stateButton: "신청취소"
  }]);
  const dummyData = {
    id: '새로 추가된 데이터 id',
    date: "2019-09-19",
    detailButton: "/",
    image: ["/images/dummy/product-img-06.png", "차량 이미지"],
    carName: "현대 투싼 ix 디젤 2WD LX20 럭셔리",
    carInfos1: ["84,761km", "09/12식(10년형)"],
    carInfos2: ["00가0000", "오토", "디젤"],
    carPrice: "미정",
    seller: ["박현대", "010-3333-7777"],
    autionButtonLink: "/",
    sellMethod: "방문평가",
    state: "신청완료",
    stateButton: "신청취소"
  }
  const handleListMore = (e) => {
    e.preventDefault()
    setListData(listData => [...listData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData])
  };

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '내차 팔기 현황 조회',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 8,
        color: '#fff'
      }
    });

    // 달력 기간 선택
    const handleBtnFilterClick1 = (label, e) => {
      console.log(label);
    }

    // const [fpPop1, setFpPop1] = useState(false);
    // const [fpPop2, setFpPop2] = useState(false);
    // const [fpPop3, setFpPop3] = useState(false);
    // const [fpPop1State, setFpPop1State] = useState(1);
    // const [fpPop2State, setFpPop2State] = useState(1);
    // const [fpPop3State, setFpPop3State] = useState(1);
    // const handleFullpagePopup = useCallback((name, number) => e => {
    //   e.preventDefault();
    //   if (name === "fp1") {
    //     dispatch({
    //       type: MOBILE_FULLPAGE_POPUP,
    //       data: {
    //         isPopup: true,
    //         title: '방문평가 신청 내역',
    //         options: ['close']
    //       }
    //     });
    //     setFpPop1State(number)
    //     setFpPop2(false);
    //     setFpPop3(false);
    //     setFpPop1(true);
    //   } else if (name === "fp2") {
    //     dispatch({
    //       type: MOBILE_FULLPAGE_POPUP,
    //       data: {
    //         isPopup: true,
    //         title: '방문평가 신청 내역',
    //         options: ['close']
    //       }
    //     });
    //     setFpPop2State(number)
    //     setFpPop1(false);
    //     setFpPop3(false);
    //     setFpPop2(true);
    //   } else if (name === "fp3") {
    //     dispatch({
    //       type: MOBILE_FULLPAGE_POPUP,
    //       data: {
    //         isPopup: true,
    //         title: '방문평가 신청 내역',
    //         options: ['close']
    //       }
    //     });
    //     setFpPop3State(number)
    //     setFpPop1(false);
    //     setFpPop2(false);
    //     setFpPop3(true);
    //   }
    //   setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
    // }, [fpPop1]);

    return (
      <AppLayout>
        <div className="general-sell-sec">
          <div className="mypage-admin-title">
            <p className="tx-exp-tp5">&#8251; 내 차 팔기의 판매 현황 및 관리가 가능합니다.</p>
            <p className="tx-exp-tp5">&#8251; 현황 조회는 1년까지 조회하실 수 있으며, 1년이 지나면 삭제됩니다.</p>
          </div>

          <ul className="m-toggle-list search">
            <MenuItem>
              <MenuTitle>내차팔기 현황<span>상세조회</span></MenuTitle>
              <MenuCont>
                <MobButtonFilter checkList={[
                  { title: "1개월", checked: true },
                  { title: "3개월", checked: false },
                  { title: "6개월", checked: false },
                  { title: "1년", checked: false }
                ]} onClick={handleBtnFilterClick1} />
                <div className="mt8">
                  <DatePicker defaultValue={now} width='46%' />
                  <em className="from">~</em>
                  <DatePicker defaultValue={now} width='46%' />
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
          {
            withoutList === true
              ? (
                <div className="list-none-wrap">
                  <div className="list-none">
                    <p>판매 차량정보가 없습니다.</p>
                    <Buttons align="center" marginTop={16}>
                      <Button size="mid" background="blue80" radius={true} title="내차팔기" fontWeight={500} width={100} height={40} />
                    </Buttons>
                  </div>
                </div>
              ) : (
                <div className="list-wrap content-border">
                  <ul className="admin-list-wrap">
                    <li>
                      <div>
                        <ul className="date">
                          <li>2019.09.16</li>
                          <li className="sec tx-black">방문평가</li>
                        </ul>
                        <Button size="sml" background="blue20" color="blue80" radius={true} title="신청완료" width={53} height={24} fontSize={10} fontWeight={500} herf="/mypage/generalSell_v01" />
                        <Button size="sml" background="blue20" color="blue80" radius={true} title="평가사 배정" width={63} height={24} fontSize={10} fontWeight={500} herf="/mypage/generalSell_v02" />
                        <Button size="sml" background="blue20" color="blue80" radius={true} title="방문 및 견적 안내" width={83} height={24} fontSize={10} fontWeight={500} herf="/mypage/generalSell_v03" />
                        <Button size="sml" background="blue20" color="blue80" radius={true} title="견적 완료 및 판매결정" width={103} height={24} fontSize={10} fontWeight={500} herf="/mypage/generalSell_v04" />
                        <p className="tx-disabled">차량확인 후 표시됩니다.</p>
                      </div >
                    </li >

                    <li>
                      <div className="float-wrap btn-xs mb8">
                        <ul className="date">
                          <li>2019.09.16</li>
                          <li className="sec">셀프평가</li>
                        </ul>
                        <Button size="sml" background="blue20" color="blue80" radius={true} title="신청완료" width={53} height={24} fontSize={10} fontWeight={500} />
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
                      <div className="float-wrap btn-xs mb8">
                        <ul className="date">
                          <li>2019.09.16</li>
                          <li className="sec">무평가</li>
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
                  </ul >
                </div >
              )
          }
        </div >
      </AppLayout >
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-sell-sec">
          <div className="mypage-admin-title">
            <h3>내차 팔기 현황 조회</h3>
            <p className="tx-exp-tp5">&#8251; 내 차 팔기의 판매 현황 및 관리가 가능합니다.</p>
            <p className="tx-exp-tp5">&#8251; 현황 조회는 1년까지 조회하실 수 있으며, 1년이 지나면 삭제됩니다.</p>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <Button className="fr" size="big" background="blue80" title="내차팔기 바로가기" width={181} height={48} href="/sell/sellHome" />
            </div>
            <table className="table-tp1 input search th-c" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th rowSpan="3">조회기간</th>
                  <td>
                    <Button className="on" size="mid" line="gray" color="black" title="1개월" width={50} height={40} />
                    <Button size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="6개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="1년" width={50} height={40} marginLeft={8} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <DatePicker defaultValue={now} inputHeight={40} />
                    <em className="mg8">-</em>
                    <DatePicker defaultValue={now} inputHeight={40} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Input type="text" placeHolder="" width={352} height={40} value="차량명을 검색해주세요." />
                    <Button size="mid" background="blue80" title="조회하기" width={130} height={40} marginLeft={16} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="admin-list tp7 mt64">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="11%" />
                    <col width="43%" />
                    <col width="10%" />
                    <col width="13%" />
                    <col width="9%" />
                    <col width="14%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>신청일자</th>
                      <th>신청차량</th>
                      <th>견적금액</th>
                      <th>담당</th>
                      <th>판매방식</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  {
                    withoutList === false
                      ? (
                        <tbody>
                          {listData.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>
                                  {v.date}<br />
                                  <Button size="mid" line="gray" color="black" radius={true} title="상세보기" width={100} height={32} marginTop={8} nextLink={true} href={v.detailButton} />
                                </td>
                                {v.carName !== undefined ? (
                                  <td>
                                    <ImgCover src={v.image[0]} alt={v.image[1]} />
                                    <div className="summary">
                                      <h4 className="subject">{v.carName}</h4>
                                      <ul className="info">
                                        {v.carInfos1.map((car, idx) => <li key={idx}>{car}</li>)}
                                      </ul>
                                      <ul className="info">
                                        {v.carInfos2.map((car, idx) => <li key={idx}>{car}</li>)}
                                      </ul>
                                    </div>
                                  </td>
                                ) : (
                                    <td className="tx-disabled">차량 확인 후 표시됩니다.</td>
                                  )}
                                <td className="tx-blue80">{v.carPrice}</td>
                                <td className="seller">{
                                  v.seller !== null ? (
                                    transformText(`${v.seller[0]}\n${v.seller[1]}`)
                                  ) : "-"
                                }</td>
                                <td>{v.sellMethod}</td>
                                <td className="tx-blue80">
                                  {v.state}<br />
                                  <Button size="mid" line="gray" color="black" radius={true} title={v.stateButton} width={100} height={32} marginTop={8} />
                                </td>
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
                              판매 차량정보가 없습니다.<br />
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

      <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>차량을 삭제하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(GeneralSell01);