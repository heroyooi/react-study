import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItem from '@src/components/common/banner/BannerItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { car_list, mCarList } from '@src/dummy';

const QuickMenu = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

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

    // 팝업 삭제
    const [popActive, setPopActive] = useState(true);
    const handlePop = useCallback((e) => {
      e.preventDefault();
      setPopActive(false);
    }, []);

    // 전체선택 - 차량 목록
    const checkData = [
      {id: 'banner-item-chk-1', checked: true},
      {id: 'banner-item-chk-2', checked: true},
      {id: 'banner-item-chk-3', checked: false},
      {id: 'banner-item-chk-4', checked: true}
    ]
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

    return (
      <AppLayout>
        <div className="quick-menu-wrap">
          <TabMenu type="type2" defaultTab={isTab} mount={false} forceChange={forceChange}>
            <TabCont tabTitle="최근 본 차량 10" id="tab2-1" index={0}>
              {
                withoutList === true
                  ? (
                    <div className="list-none-wrap">
                      <div className="list-none">
                        <p>최근 조회하신 차량이 없습니다.</p>
                        <Buttons align="center" marginTop={16}>
                          <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={84} height={40} href="/buy/list" />
                        </Buttons>
                      </div>
                    </div>
                  ) : (
                    <>
                    {popActive && <div className="select-car-wrap">
                      <p className="tit2">선택차량<span> 1</span>개</p>
                      <span>차량 비교하기는 2대만 가능합니다.(PC 4대 가능)</span>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" color="gray" line="gray" radius={true} title="관심등록" width={88} height={30} fontSize={12} fontWeight={500} />
                        <Button size="mid" color="gray" line="gray" radius={true} title="비교하기" width={88} height={30} fontSize={12} fontWeight={500} />
                        <Button size="mid" color="gray" line="gray" radius={true} title="삭제" width={88} height={30} fontSize={12} fontWeight={500} />
                      </Buttons>
                      <a href="#" className="popup-close" onClick={handlePop}></a>
                    </div>}

                    <div className="content-wrap pt16">
                      <div className="float-wrap sel-s mb16">
                        <CheckBox id='sell-all-chk1' title='전체선택' checked={chkCarAll} isSelf={false} onChange={handleChkCarAll} />
                        <MobSelectBox width={136} options={[
                          { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최신 등록순' },
                          { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '낮은 가격순' }
                        ]} />
                      </div>

                      <ul className="goods-list list-type">
                        {mCarList.map((v, i) => {
                          if (i < 4) {
                            return (
                              <BannerItem key={v.id} id={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} mode="check" chkId={chkCar[i].id} chkChecked={chkCar[i].checked} chkChange={handleChkCar(v.id)} />
                            )
                          }
                        })}
                      </ul>
                    </div>
                    </>
                  )
              }
            </TabCont>
            <TabCont tabTitle="관심차량 10" id="tab2-2" index={1}>
              {
                withoutList === true
                  ? (
                    <div className="list-none-wrap">
                      {/* <div className="list-none">
                        <p>관심차량으로 등록한 차량이 없습니다.</p>
                        <Buttons align="center" marginTop={16}>
                          <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={84} height={40} href="/buy/list" />
                        </Buttons>
                      </div> */}

                      <div className="list-none">
                        <p>로그인 후 확인 가능합니다.</p>
                        <Buttons align="center" marginTop={16}>
                          <Button size="mid" background="blue80" radius={true} title="로그인" fontWeight={500} width={71} height={40} />
                        </Buttons>
                      </div>
                    </div>
                  ) : (
                    <>
                    <div className="select-car-wrap">
                      <p className="tit2">선택차량<span> 1</span>개</p>
                      <span>차량 비교하기는 2대만 가능합니다.(PC 4대 가능)</span>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" color="gray" line="gray" radius={true} title="비교하기" width={88} height={30} fontSize={12} fontWeight={500} />
                        <Button size="mid" color="gray" line="gray" radius={true} title="삭제" width={88} height={30} fontSize={12} fontWeight={500} />
                      </Buttons>
                      <a href="#" className="popup-close"></a>
                    </div>

                    <div className="content-wrap pt16">
                      <div className="float-wrap sel-s mb16">
                        <CheckBox id='sell-all-chk1' title='전체선택' />
                        <MobSelectBox width={136} options={[
                          { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최신 등록순' },
                          { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '낮은 가격순' }
                        ]} />
                      </div>

                      <ul className="goods-list list-type">
                        {mCarList.map((v, i) => {
                          if (i < 4) {
                            return (
                              <BannerItem key={v.id} id={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} mode="check" />
                            )
                          }
                        })}
                      </ul>
                    </div>
                    </>
                  )
              }
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
                        <Button size="mid" color="gray" line="gray" radius={true} title="관심" width={73} height={30} fontSize={12} fontWeight={500} marginTop={4} onClick={handleTab(2)} />
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
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default withRouter(QuickMenu);