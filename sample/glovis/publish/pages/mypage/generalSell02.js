import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import moment from 'moment'
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import PageNavigator from '@src/components/common/PageNavigator'
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Input from '@lib/share/items/Input';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list } from '@src/dummy';

/*
html 변경이력
03.09 : Button 삭제 및 text로 처리 #a1 참고

*/
const GeneralSell02 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const now = moment()
  // 달력 기간 선택
  const handleBtnFilterClick1 = (label, e) => {
    console.log(label);
  }

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '오토옥션 출품내역',
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
        <div className="mypage-state-sec general-sell-sec">
          <div className="content-wrap">
            <div className="essential-point tp2 fs12 mt20 pd0">
              <ul>
                <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                <li>&#8251; 출품하신 차량에 출품취소(접수취소) 및 반출신청을 원하시면 경매장 출품담당자에게 문의하여 주시기 바랍니다.</li>
                <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
              </ul>
            </div>
            <ul className="m-toggle-list search mt16 pd0">
              <MenuItem>
                <MenuTitle><p className="tit2">나의 출품내역</p><span>상세조회</span></MenuTitle>
                <MenuCont>
                  <div className="float-wrap mb12">
                    <p className="movie-link-wrap">경매구분</p>
                    <MobSelectBox options={[
                      { id: 'radio_auction_1', value: 1, checked: true, disabled: false, label: '전체' },
                      { id: 'radio_auction_2', value: 2, checked: false, disabled: false, label: '경매대기' },
                      { id: 'radio_auction_3', value: 3, checked: false, disabled: false, label: '경매진행' },
                      { id: 'radio_auction_4', value: 4, checked: false, disabled: false, label: '낙찰' },
                      { id: 'radio_auction_5', value: 5, checked: false, disabled: false, label: '유찰' },
                      { id: 'radio_auction_6', value: 6, checked: false, disabled: false, label: '출품취소' },
                    ]} width='70%'/>
                  </div>
                  <div className="float-wrap mb16">
                    <p className="movie-link-wrap">경매회차</p>
                    <Input type="text" height={40} placeHolder="" width='70%'/>
                  </div>
                  <MobButtonFilter checkList={[
                    {title: "1개월", checked: true}, 
                    {title: "3개월", checked: false}, 
                    {title: "6개월", checked: false},
                    {title: "1년", checked: false}
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
                  <Input type="text" height={40} placeHolder="차량명을 검색하세요" marginTop={8}/>
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
          </div>

          <div className="list-wrap content-border">
            {!withoutList ? (
              <div className="goods-list admin-list tp6 mt8">
                <ul>
                  <li>
                    <div className="summary">
                      <div className="info-wrap mt0">
                        <div className="info">
                          <span>951회(08/30)</span>
                          <span>1019번</span>
                          <span>-</span>
                        </div>
                        <p className="fr tit5">경매대기</p>
                      </div>
                      <h5 className="subject">소나타(LF) AG280</h5>
                      <div className="info-wrap mt16">
                        <div className="info tx-b">
                          <span>시작가: 1200만원</span>
                          <span>희망가: 1400만원</span>
                          <span>탁송상태: 신청</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="summary">
                      <div className="info-wrap mt0">
                        <div className="info">
                          <span>951회(08/30)</span>
                          <span>1019번</span>
                          <span>A/1</span>
                        </div>
                        <p className="fr tit5 tx-blue80">경매진행</p>
                      </div>
                      <h5 className="subject">소나타(LF) AG280</h5>
                      <div className="info-wrap mt16">
                        <div className="info tx-b">
                          <span>시작가: 1200만원</span>
                          <span>희망가: 1400만원</span>
                          <span>탁송상태: 신청</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="summary">
                      <div className="info-wrap mt0">
                        <div className="info">
                          <span>951회(08/30)</span>
                          <span>1019번</span>
                          <span>A/1</span>
                        </div>
                        <p className="fr tit5 tx-gray">낙찰</p>
                      </div>
                      <h5 className="subject">소나타(LF) AG280</h5>
                      <div className="info-wrap mt16">
                        <div className="info tx-b">
                          <span>시작가: 1200만원</span>
                          <span>희망가: 1400만원</span>
                          <span>탁송상태: 신청</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="search-none pd0" style={{ height: '176px' }}>
                <p className="tx-black tx-n mt0 tx">조회하신 내용이 없습니다.</p>
              </div>
            )}
          </div>

        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-sell-sec">
          <div className="mypage-admin-title">
            <h3>오토옥션 출품내역</h3>
            <p className="tx-exp-tp5">&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</p>
            <p className="tx-exp-tp5">&#8251; 현황 조회만 가능하며, 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</p>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <Button className="fr" size="big" background="blue80" title="경매프로그램 안내" width={181} height={48} href="/autoAuction/auctionInfo" />
            </div>
            <table className="table-tp1 input search th-c" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <td>
                    <span className="title">구분</span>
                    <SelectBox id="select1" className="items-sbox" options={[
                      { value: '1', label: '경매대기' },
                      { value: '2', label: '낙찰' },
                      { value: '2', label: '유찰' },
                      { value: '2', label: '출품취소' }
                    ]} width={125} height={40} placeHolder="전체" />
                    <span className="title">회차</span>
                    <label htmlFor="input1" className="hide">회차</label>
                    <Input id="input1" type="text" placeHolder="" width={138} height={40} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button className="on" size="mid" line="gray" color="black" title="1주일" width={50} height={40} />
                    <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8}/>
                    <Button size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={8} marginRight={16} />
                    <DatePicker defaultValue={now} inputHeight={40} />
                    <em className="mg8">-</em>
                    <DatePicker defaultValue={now} inputHeight={40} />
                    <Button size="mid" background="blue80" title="조회하기" width={130} height={40 }marginLeft={16} />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="admin-list tp7 auto">
              <table className="table-tp1 th-c td-c" summary="오토옥션 출품내역에 대한 내용">
                <caption className="away">오토옥션 출품내역</caption>
                <colgroup>
                  <col width="13%"/>
                  <col width="12%"/>
                  <col width="*"/>
                  <col width="14%"/>
                  <col width="14%"/>
                  <col width="14%"/>
                </colgroup>
                <thead>
                  <tr>
                    <th>경매일</th>
                    <th>출품번호</th>
                    <th>차량정보</th>
                    <th>평가</th>
                    <th>진행상태</th>
                    <th>탁송</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="2">954회<br />19.10.01</td>
                    <td>1020</td>
                    <td className="tx-l">[현대] 그랜저(IG) IG240 Gdi Modern<br />2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</td>
                    <td>A/6</td>
                    <td>경매 대기</td>
                    <td>본인</td> {/* #a1 */}
                  </tr>
                  <tr>
                    <td colSpan="7" className="tx-l tx-blue80">시작가 : 300 만원 / 희망가 : 350 만원</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">954회<br />19.10.01</td>
                    <td>1020</td>
                    <td className="tx-l">[현대] 그랜저(IG) IG240 Gdi Modern<br />2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</td>
                    <td>-/-</td>
                    <td>경매 진행</td>
                    <td>본인</td> {/* #a1 */}
                  </tr>
                  <tr>
                    <td colSpan="7" className="tx-l tx-blue80">시작가 : 300 만원 / 희망가 : 350 만원</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">954회<br />19.10.01</td>
                    <td>1020</td>
                    <td className="tx-l">[현대] 그랜저(IG) IG240 Gdi Modern<br />2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</td>
                    <td>A/6</td>
                    <td>낙찰</td>
                    <td>본인</td> {/* #a1 */}
                  </tr>
                  <tr>
                    <td colspan="6" className="tx-disabled">조회된 출품 차량 정보가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <PageNavigator recordCount={50} className="mt32" />
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

export default withRouter(GeneralSell02);
