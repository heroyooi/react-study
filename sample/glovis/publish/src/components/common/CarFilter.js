import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import CarOptions from '@src/components/common/CarOptions';
import CheckColors from '@src/components/common/CheckColors';
import RadioGroup from '@lib/share/items/RadioGroup';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import TreeCheckCount from '@lib/share/items/TreeCheckCount';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import FilterRange from '@lib/share/items/FilterRange';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import DynamicCategory from '@lib/share/items/DynamicCategory'
import CategoryItem from '@lib/share/items/CategoryItem'
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { dataProvider, select1_list, radio_filter1 } from '@src/dummy';

const CarFilter = ({ title="차량검색", type="normal", section }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  // 필터
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(section === "liveList" ? true : false)
  const [isChecked4, setIsChecked4] = useState(section === "auctionList" ? true : false)
  const [isChecked5, setIsChecked5] = useState(false)
  const [isChecked6, setIsChecked6] = useState(false)
  const [isChecked7, setIsChecked7] = useState(false)
  const [isChecked8, setIsChecked8] = useState(false)
  const [isChecked9, setIsChecked9] = useState(false)
  const [isChecked10, setIsChecked10] = useState(false)
  const [isChecked11, setIsChecked11] = useState(false)
  const [isChecked12, setIsChecked12] = useState(false)
  const [isChecked13, setIsChecked13] = useState(false)
  const [filterCheck1, setFilterCheck1] = useState(false)
  const [filterCheck2, setFilterCheck2] = useState(false)
  const [filterCheck3, setFilterCheck3] = useState(false)
  const [yearRange, setYearRange] = useState({ min: 2011, max: 2015 })
  const [distanceRange, setDistanceRange] = useState({ min: 20000, max: 60000 })
  const [priceRange, setPriceRange] = useState({ min: 2750, max: 3000 })

  const handleCheck1 = useCallback(() => setIsChecked1(!isChecked1), [isChecked1])
  const handleCheck2 = useCallback(() => setIsChecked2(!isChecked2), [isChecked2])
  const handleCheck3 = useCallback(() => setIsChecked3(!isChecked3), [isChecked3])
  const handleCheck4 = useCallback(() => setIsChecked4(!isChecked4), [isChecked4])
  const handleCheck5 = useCallback(() => setIsChecked5(!isChecked5), [isChecked5])
  const handleCheck6 = useCallback(() => setIsChecked6(!isChecked6), [isChecked6])
  const handleCheck7 = useCallback(() => setIsChecked7(!isChecked7), [isChecked7])
  const handleCheck8 = useCallback(() => setIsChecked8(!isChecked8), [isChecked8])
  const handleCheck9 = useCallback(() => setIsChecked9(!isChecked9), [isChecked9])
  const handleCheck10 = useCallback(() => setIsChecked10(!isChecked10), [isChecked10])
  const handleCheck11 = useCallback(() => setIsChecked11(!isChecked11), [isChecked11])
  const handleCheck12 = useCallback(() => setIsChecked12(!isChecked12), [isChecked12])
  const handleCheck13 = useCallback(() => setIsChecked13(!isChecked13), [isChecked13])
  const handleChangeFilter1 = useCallback(() => setFilterCheck1(!filterCheck1), [filterCheck1])
  const handleChangeFilter2 = useCallback(() => setFilterCheck2(!filterCheck2), [filterCheck2])
  const handleChangeFilter3 = useCallback(() => setFilterCheck3(!filterCheck3), [filterCheck3])

  const [value1, setValue1] = useState(null)
  const [value2, setValue2] = useState(null)
  const [value3, setValue3] = useState(null)
  const [value4, setValue4] = useState(null)
  const [value5, setValue5] = useState(null)
  const [value6, setValue6] = useState(null)
  const handleSelect1 = useCallback((value) => {
    setValue1(value)
  }, [value1])
  const handleSelect2 = useCallback((value) => {
    setValue2(value)
  }, [value2])
  const handleSelect3 = useCallback((value) => {
    setValue3(value)
  }, [value3])
  const handleSelect4 = useCallback((value) => {
    setValue4(value)
  }, [value4])
  const handleSelect5 = useCallback((value) => {
    setValue5(value)
  }, [value5])
  const handleSelect6 = useCallback((value) => {
    setValue6(value)
  }, [value6])

  // 선택초기화
  const resetFilter = useCallback((e) => {
    e.preventDefault()

    // 국산/수입
    setIsChecked1(false)
    setIsChecked2(false)

    // 차종
    setIsChecked7(false)
    setIsChecked8(false)
    setIsChecked9(false)
    setIsChecked10(false)
    setIsChecked11(false)
    setIsChecked12(false)
    setIsChecked13(false)

    // 연식, 주행거리, 가격
    setFilterCheck1(false)
    setFilterCheck2(false)
    setFilterCheck3(false)
    setYearRange({ min: 1989, max: 2020 })
    setDistanceRange({ min: 0, max: 200000 })
    setPriceRange({ min: 0, max: 10000 })

    // 제조사/모델/등급 - 체크박스
    setIsChecked3(false)
    setIsChecked4(false)
    setIsChecked5(false)
    setIsChecked6(false)

    // 제조사/모델/등급 - 트리메뉴

    // 연식, 주행거리, 가격 - 셀렉트 박스
    setValue1(null)
    setValue2(null)
    setValue3(null)
    setValue4(null)
    setValue5(null)
    setValue6(null)
  }, []);

  useEffect(() => {
    if (section === "liveList") {

    }
  }, []);

  // 필더 더보기 클릭 시 팝업
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const modalCloseButtonHandler = (e, flag) => {
    e.preventDefault();
    setRodalShow(flag);
    document.getElementsByTagName('html')[0].style.overflow = "auto"
  }
  const [carOptionMore, setCarOptionMore] = useState(false)
  const handleCarOption1 = (e) => {
    e.preventDefault()
    setCarOptionMore(!carOptionMore)
  }
  if(hasMobile){
    return (
      <>
        <ul className="menu-list search-filter">
          <li>
            <h4>국산/수입</h4>
            <p className="domestic-income">
              <RadioGroup dataList={radio_filter1} />
            </p>
          </li>
        </ul>
      </>
    )
  }
  return (
    <>
      <div className="search-sec-tit">
        <h3>{title}</h3>
        {type === "normal" && <Button color="black" title="선택초기화" iconType='reset' onClick={resetFilter} />}
      </div>
      <ul className="menu-list search-filter">
        <MenuItem>
          <MenuTitle>
            <h4>국산/수입</h4>
          </MenuTitle>
          <MenuCont>
            <p className="domestic-income">
              <CheckBox id='chk-domestic' title='국산' checked={isChecked1} onChange={handleCheck1} isSelf={false} />
              <CheckBox id='chk-income' title='수입' checked={isChecked2} onChange={handleCheck2} isSelf={false} />
            </p>
          </MenuCont>
        </MenuItem>

        <MenuItem>
          <MenuTitle>
            <h4>차종</h4>
          </MenuTitle>
          <MenuCont>
            <p className="car-type">
              <CheckBox id='chk-light' title="경차" checked={isChecked7} onChange={handleCheck7} isSelf={false} />
              <CheckBox id='chk-small' title='소형차' checked={isChecked8} onChange={handleCheck8} isSelf={false} />
              <CheckBox id='chk-quasi' title='준중형차' checked={isChecked9} onChange={handleCheck9} isSelf={false} />
              <CheckBox id='chk-medium' title='중형차' checked={isChecked10} onChange={handleCheck10} isSelf={false} />
              <CheckBox id='chk-big' title='대형차' checked={isChecked11} onChange={handleCheck11} isSelf={false} />
              <CheckBox id='chk-sports' title='스포츠카' checked={isChecked12} onChange={handleCheck12} isSelf={false} />
              <CheckBox id='chk-suv' title='SUV' checked={isChecked13} onChange={handleCheck13} isSelf={false} />
            </p>
          </MenuCont>
        </MenuItem>

        <MenuItem>
          <MenuTitle>
            <h4>제조사/모델/등급</h4>
          </MenuTitle>
          <MenuCont>
            <div className="tree-wrapper">
              <TreeCheckCount dataProvider={dataProvider} />
            </div>
          </MenuCont>
        </MenuItem>

        <MenuItem>
          <MenuTitle>
            <h4>연식</h4>
          </MenuTitle>
          <MenuCont>
            <div className={filterCheck1 === false ? 'year-filter-tp1' : 'year-filter-tp1 hidden'}>
              <FilterRange rangeUnit="연식" initMin={1989} initMax={2020} defaultValue={yearRange} onChange={value => setYearRange(value)} />
            </div>
            <div className={filterCheck1 === true ? 'year-filter-tp2' : 'year-filter-tp2 hidden'}>
              <div className="mb8">
                <SelectBox id="from-year" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="년" value={value1} onChange={handleSelect1} />
                <SelectBox id="from-month" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="월" value={value2} onChange={handleSelect2} />부터
              </div>
              <div>
                <SelectBox id="until-year" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="년" value={value3} onChange={handleSelect3} />
                <SelectBox id="until-month" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="월" value={value4} onChange={handleSelect4} />까지
              </div>
            </div>
            <p className="mt20"><CheckBox id='chk-year-self' title='직접 입력' checked={filterCheck1} onChange={handleChangeFilter1} isSelf={false} /></p>
          </MenuCont>
        </MenuItem>

        <MenuItem>
          <MenuTitle>
            <h4>주행거리</h4>
          </MenuTitle>
          <MenuCont>
            <div className={filterCheck2 === false ? 'distance-filter-tp1' : 'distance-filter-tp1 hidden'}>
              <FilterRange rangeUnit="주행거리" initMin={0} initMax={200000} defaultValue={distanceRange} step={1000} onChange={value => setDistanceRange(value)} />
            </div>
            <div className={filterCheck2 === true ? 'distance-filter-tp2' : 'distance-filter-tp2 hidden'}>
              <div className="mb8">
                <SelectBox id="from-distance" className="items-sbox mr8" options={select1_list} width={208} height={40} placeHolder="선택" value={value5} onChange={handleSelect5} />부터
              </div>
              <div>
                <SelectBox id="until-distance" className="items-sbox mr8" options={select1_list} width={208} height={40} placeHolder="선택" value={value6} onChange={handleSelect6} />까지
              </div>
            </div>
            <p><CheckBox id='chk-distance-self' className="mt20" title='직접 입력' checked={filterCheck2} onChange={handleChangeFilter2} isSelf={false} /></p>
          </MenuCont>
        </MenuItem>

        <MenuItem>
          <MenuTitle>
            <h4>가격</h4>
          </MenuTitle>
          <MenuCont>
            <div className={filterCheck3 === false ? 'price-filter-tp1' : 'price-filter-tp1 hidden'}>
              <FilterRange rangeUnit="가격" initMin={0} initMax={10000} defaultValue={priceRange} step={100} onChange={value => setPriceRange(value)} />
            </div>
            <div className={filterCheck3 === true ? 'price-filter-tp2' : 'price-filter-tp2 hidden'}>
              <p>
                <Input type="text" placeHolder="만원" width={89} height={40} value="" />&nbsp;~&nbsp;
                <Input type="text" placeHolder="만원" width={89} height={40} value="" />
                <span className="ico-search"></span>
              </p>
            </div>
            <p><CheckBox id='chk-price-self' className="mt20" title='직접 입력' checked={filterCheck3} onChange={handleChangeFilter3} isSelf={false} /></p>
          </MenuCont>
        </MenuItem>

        {
          type === "normal" &&
          <MenuItem isValue={section === "liveList" || section === "auctionList" ? true : false}>
            <MenuTitle>
              <h4>오토벨서비스</h4>
            </MenuTitle>
            <MenuCont>
              <ul className="car-type-filter">
                <li>
                  <CheckBox id='chk-livestudio' title='라이브스튜디오 차량' checked={isChecked3} onChange={handleCheck3} isSelf={false} />
                  <Tooltip placement="bottom" width={242} >
                    <TooltipItem>
                      <i className="ico-question"></i>
                    </TooltipItem>
                    <TooltipCont half={true}>
                      <p className="car-type-exp">
                        라이브 스튜디오로 등록된<br />
                        차량입니다.
                      </p>
                    </TooltipCont>
                  </Tooltip>
                  <span className="count">23,999</span>
                </li>
                <li>
                  <CheckBox id='chk-bid' title='경매낙찰 차량' checked={isChecked4} onChange={handleCheck4} isSelf={false} />
                  <Tooltip placement="bottom" width={242} >
                    <TooltipItem>
                      <i className="ico-question"></i>
                    </TooltipItem>
                    <TooltipCont half={true}>
                      <p className="car-type-exp">
                        현대오토벨에서 경매낙찰된<br />
                        차량입니다.
                      </p>
                    </TooltipCont>
                  </Tooltip>
                  <span className="count">1,323</span>
                </li>
                <li>
                  <CheckBox id='chk-franchise' title='프랜차이즈 차량' checked={isChecked5} onChange={handleCheck5} isSelf={false} />
                  <Tooltip placement="bottom" width={242} >
                    <TooltipItem>
                      <i className="ico-question"></i>
                    </TooltipItem>
                    <TooltipCont half={true}>
                      <p className="car-type-exp">
                        현대오토벨에서 인증한 프랜차이즈<br />
                        차량입니다.
                      </p>
                    </TooltipCont>
                  </Tooltip>
                  <span className="count">21,323</span>
                </li>
                <li className="mb0">
                  <CheckBox id='chk-homeservice' title='홈서비스 차량' checked={isChecked6} onChange={handleCheck6} isSelf={false} />
                  <Tooltip placement="bottom" width={242} >
                    <TooltipItem>
                      <i className="ico-question"></i>
                    </TooltipItem>
                    <TooltipCont half={true}>
                      <p className="car-type-exp">
                        온라인으로 구매하고 차량을 배송<br />
                        받는 현대 오토벨의 홈서비스<br />
                        차량입니다.
                      </p>
                    </TooltipCont>
                  </Tooltip>
                  <span className="count">1,234</span>
                </li>
              </ul>
            </MenuCont>
          </MenuItem>
        }
        {
          type === "homeService" &&
          <MenuItem>
            <MenuTitle>
              <h4>지역</h4>
            </MenuTitle>
            <MenuCont>
              <ul className="domestic-area">
                <li>
                  <CheckBox id='chk-seoul' title='서울' checked={isChecked3} onChange={handleCheck3} isSelf={false} />
                  <CheckBox id='chk-gyeonggi' title='경기' checked={isChecked4} onChange={handleCheck4} isSelf={false} />
                </li>
                <li>
                  <CheckBox id='chk-incheon' title='인천' checked={isChecked5} onChange={handleCheck5} isSelf={false} />
                  <CheckBox id='chk-daejeon' title='대전' checked={isChecked6} onChange={handleCheck6} isSelf={false} />
                </li>
              </ul>
            </MenuCont>
          </MenuItem>
        }
      </ul>
      {
        type === "normal" &&
        <div className="search-filter-btn">
          <Button size="full" line="black" color="black" title="상세 조건검색" className="mb8" onClick={(e) => rodalPopupHandler(e, "fade")} />
          <Tooltip placement="right" width={486} event="click">
            <TooltipItem>
              <Button size="full" background="blue80" title="최근 검색조건" width={242} />
            </TooltipItem>
            <TooltipCont>
              <div className="search-filter-tooltip">
                <p><span>최근 검색조건은 모델 기준으로 최대 5개까지 자동 저장됩니다.</span></p>
                <DynamicCategory>
                  <CategoryItem category={['SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션', '~2017년2월', '홈서비스차량', '진주색']} />
                  <CategoryItem category={['제네시스 G80', '~1,000만원']} />
                  <CategoryItem category={['현대 그랜저 IG 하이브리드', '경매낙찰 차량', '흰색']} />
                  <CategoryItem category={['SM5 뉴 임프레션', '~2017년2월', '홈서비스차량', '진주색']} />
                  <CategoryItem category={['제네시스 G80', '~1,000만원']} />
                </DynamicCategory>
              </div>
            </TooltipCont>
          </Tooltip>
          <RodalPopup show={rodalShow} type={'slideUp'} width={894} mode='tabmenu' closedHandler={modalCloseHandler}>
            <TabMenu type="popup" onClick={modalCloseButtonHandler}>
              <TabCont tabTitle="지역" id="tab5-1" index={0}>
                <h4>지역을 선택해주세요.</h4>
                <table summary="content" className="table-tp1 area">
                  <caption className="away">지역 선택</caption>
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
                        <CheckBox id='chk-seoul' title='서울' />
                        <CheckBox id='chk-gyeonggi' title='경기' />
                        <CheckBox id='chk-incheon' title='인천' />
                      </td>
                      <td>
                        <CheckBox id='chk-daejeon' title='대전' />
                        <CheckBox id='chk-sejong' title='세종' />
                        <CheckBox id='chk-chungnam' title='충남' />
                        <CheckBox id='chk-chungbuk' title='충북' />
                        <CheckBox id='chk-Gangwon' title='강원' />
                      </td>
                      <td>
                        <CheckBox id='chk-busan' title='부산' />
                        <CheckBox id='chk-daegu' title='대구' />
                        <CheckBox id='chk-ulsan' title='울산' />
                        <CheckBox id='chk-gyeongnam' title='경남' />
                        <CheckBox id='chk-gyeongbuk' title='경북' />
                      </td>
                      <td>
                        <CheckBox id='chk-gwangju' title='광주' />
                        <CheckBox id='chk-Jeonnam' title='전남' />
                        <CheckBox id='chk-Jeonbuk' title='전북' />
                        <CheckBox id='chk-jeju' title='제주' />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Buttons align="center" marginTop={40}>
                  <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                  <Button size="big" background="blue80" title="검색" width={180} />
                </Buttons>
              </TabCont>
              <TabCont tabTitle="옵션" id="tab5-2" index={1}>
                <h4>기본옵션</h4>
                <CarOptions type={1} popup={true} />
                <Buttons align="center" marginTop={40}>
                  <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                  <Button size="big" background="blue80" title="검색" width={180} />
                </Buttons>
              </TabCont>
              <TabCont tabTitle="색상" id="tab5-3" index={2}>
                <CheckColors />
              </TabCont>
              <TabCont tabTitle="연료" id="tab5-4" index={3}>
                <h4>연료를 선택해주세요.</h4>
                <ul className="color-list border">
                  <li>
                    <CheckBox id='chk-petrol' title='가솔린' />
                  </li>
                  <li>
                    <CheckBox id='chk-diesel' title='디젤' />
                  </li>
                  <li>
                    <CheckBox id='chk-petrol-electricity' title='가솔린+전기' />
                  </li>
                  <li>
                    <CheckBox id='chk-lpg-electricity' title='LPG+전기' />
                  </li>
                  <li>
                    <CheckBox id='chk-petrol-lpg' title='가솔린+LPG' />
                  </li>
                  <li>
                    <CheckBox id='chk-petrol-cng' title='가솔린+CNG' />
                  </li>
                  <li>
                    <CheckBox id='chk-electricity' title='전기' />
                  </li>
                  <li>
                    <CheckBox id='chk-cng' title='CNG' />
                  </li>
                  <li>
                    <CheckBox id='chk-hydrogen' title='수소' />
                  </li>
                  <li>
                    <CheckBox id='chk-other' title='기타' />
                  </li>
                </ul>
                <Buttons align="center" marginTop={40}>
                  <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                  <Button size="big" background="blue80" title="검색" width={180} />
                </Buttons>
              </TabCont>
              <TabCont tabTitle="변속기" id="tab5-5" index={4}>
                <h4>변속기를 선택해주세요.</h4>
                <ul className="color-list border">
                  <li>
                    <CheckBox id='chk-auto' title='오토' />
                  </li>
                  <li>
                    <CheckBox id='chk-manual' title='수동' />
                  </li>
                  <li>
                    <CheckBox id='chk-semiauto' title='세미오토' />
                  </li>
                  <li>
                    <CheckBox id='chk-cvt' title='CVT' />
                  </li>
                  <li>
                    <CheckBox id='chk-other' title='기타' />
                  </li>
                </ul>
                <Buttons align="center" marginTop={40}>
                  <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                  <Button size="big" background="blue80" title="검색" width={180} />
                </Buttons>
              </TabCont>
            </TabMenu>
          </RodalPopup>
        </div>
      }

    </>
  )
}

export default CarFilter;