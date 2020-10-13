import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import moment from 'moment'
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list, excelData } from '@src/dummy';
/*
  html 변경이력
  03.12 : + 행삭제 ->  - 행삭제로 변경
*/

const DealerSell07 = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const now = moment();

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false);

  const [tableData, setTableData] = useState(excelData);
  const rowData = {
    no: tableData.length + 1,
    date: null,
    carNumber: null,
    carName: null,
    isSale: null,
    purchasePrice: null,
    sellingPrice: null,
    sellingDate: null
  };
  const rowAdd = (e) => {
    e.preventDefault();
    setTableData([...tableData, rowData]);
  }
  const rowDel = (e) => {
    e.preventDefault();
    if (tableData.length === 1) {
      alert("최소 1개의 행이 있어야합니다.");
      return;
    }
    const data = [...tableData];
    data.pop();
    setTableData(data);
  }
  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '재고관리',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });

    // 달력 기간 선택
    const handleBtnFilterClick1 = (label, e) => {
      console.log(label);
    }
    const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
    return (
      <AppLayout>
        <div className="inventory-sec">
          <div className="content-wrap pt20">
            <p className="tx-exp-tp5 tx-gray">&#8251; 차량 등록은 [PC]마이페이지>내차 팔기>재고관리에서 등록하실 수 있습니다.</p>
            <ul className={withoutList ? "m-toggle-list search mb0 none" : "m-toggle-list search mb0"}>
              <MenuItem>
                <MenuTitle><p className="tit2">재고관리</p><span>상세조회</span></MenuTitle>
                <MenuCont>
                  <div className="float-wrap mb16">
                    <p className="movie-link-wrap">판매상태</p>
                    <MobSelectBox placeHolder="전체" options={[
                      { id: 'state-type1', value: 1, checked: true, disabled: false, label: '전체' },
                      { id: 'state-type2', value: 2, checked: false, disabled: false, label: '광고대기' },
                      { id: 'state-type3', value: 3, checked: false, disabled: false, label: '광고중' },
                      { id: 'state-type4', value: 4, checked: false, disabled: false, label: '판매완료' }
                    ]} width='70%' />
                  </div>
                  <MobButtonFilter checkList={[
                    { title: "15일", checked: false },
                    { title: "1개월", checked: true },
                    { title: "3개월", checked: false },
                    { title: "6개월", checked: false }
                  ]} onClick={handleBtnFilterClick1} />
                  <div className="mt8">
                    <DatePicker defaultValue={now} width='46%' />
                    <em className="from">~</em>
                    <DatePicker defaultValue={now} width='46%' />
                  </div>
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} />
                </MenuCont>
              </MenuItem>
              {
                withoutList === true
                  ? (
                    <></>
                  ) : (
                    <li>
                      <div className="float-wrap">
                        <p>2019.08.17 ~ 2019.09.16</p>
                        <p>총 <span className="tx-blue80">123</span>건</p>
                      </div>
                    </li>
                  )}
            </ul>
          </div>
          <div className="list-wrap content-border">
            {
              withoutList === true
                ? (
                  <div className="list-none-wrap">
                    <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
                  </div>
                ) : (
                  <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
                    <caption className="away">딜러정보 관리</caption>
                    <colgroup>
                      <col width="25.5%" />
                      <col width="26.5%" />
                      <col width="26.5%" />
                      <col width="21.5%" />
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
                )
            }
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec inventory-sec">
          <div className="mypage-admin-title">
            <h3>재고관리</h3>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <colgroup>
                <col width="8.8%" />
                <col width="91.2%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>판매상태</th>
                  <td>
                    <CheckBox id='chk-all' title='전체' />
                    <CheckBox id='chk1' title='광고대기' />
                    <CheckBox id='chk2' title='광고중' />
                    <CheckBox id='chk3' title='판매완료' />
                  </td>
                </tr>
                <tr>
                  <th>등록일자</th>
                  <td>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    <em className="mg8">~</em>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                    <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
                    <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td><p className="tx-exp-tp6">(* 최대 [6개월] 까지 조회 가능합니다.)</p></td>
                </tr>
              </tbody>
            </table>

            <div className="tx-list">
              <ul className="float-wrap">
                <li>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={148} height={36} placeHolder="제조사" />
                </li>
                <li>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} width={148} height={36} placeHolder="모델" />
                </li>
                <li>
                  <SelectBox id="select1" className="items-sbox" options={[
                    { value: '1', label: '등록순' },
                    { value: '2', label: '판매일순' }
                  ]} width={148} height={36} placeHolder="등록순" />
                </li>
              </ul>
              <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
                <caption className="away">딜러정보 관리</caption>
                <colgroup>
                  <col width="9%" />
                  <col width="13%" />
                  <col width="13%" />
                  <col width="19%" />
                  <col width="11%" />
                  <col width="10%" />
                  <col width="13%" />
                  <col width="12%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>등록일자</th>
                    <th>차량번호</th>
                    <th>차량명</th>
                    <th>판매여부</th>
                    <th>매입가</th>
                    <th>판매가</th>
                    <th>판매일자</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.no}</td>
                        <td>{v.date}</td>
                        <td>{v.carNumber}</td>
                        <td>{v.carName}</td>
                        <td>{v.isSale}</td>
                        <td>{v.purchasePrice}</td>
                        <td>{v.sellingPrice}</td>
                        <td>{v.sellingDate}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <Buttons align="right" marginTop={33}>
                <Button size="big" background="blue80" title="재고차량 등록" width={150} height={48} onClick={(e) => rodalPopupHandler(e, "fade")} />
              </Buttons>
              <PageNavigator recordCount={50} className="mt32" />
            </div>
          </div>
        </div>

      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" width={974}>
        <div className="popup-inventory">
          <Buttons align="right">
            <Button size="big" background="blue80" title="Excel 양식 받기" width={150} height={48} />
            <Button size="big" background="blue80" title="Excel로 등록" width={150} height={48} />
          </Buttons>
          <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
            <caption className="away">딜러정보 관리</caption>
            <colgroup>
              <col width="9%" />
              <col width="13%" />
              <col width="13%" />
              <col width="19%" />
              <col width="11%" />
              <col width="10%" />
              <col width="13%" />
              <col width="12%" />
            </colgroup>
            <thead>
              <tr>
                <th>NO.</th>
                <th>등록일자</th>
                <th>차량번호</th>
                <th>차량명</th>
                <th>판매여부</th>
                <th>매입가</th>
                <th>판매가</th>
                <th>판매일자</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{v.no}</td>
                    <td>{v.date}</td>
                    <td>{v.carNumber}</td>
                    <td>{v.carName}</td>
                    <td>{v.isSale}</td>
                    <td>{v.purchasePrice}</td>
                    <td>{v.sellingPrice}</td>
                    <td>{v.sellingDate}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Buttons align="left">
            <Button size="mid" line="gray" radius={true} title="+ 행추가" width={100} height={32} onClick={rowAdd} />
            <Button size="mid" line="gray" radius={true} title="- 행삭제" width={100} height={32} onClick={rowDel} />
          </Buttons>
          <Buttons align="center" marginTop={32}>
            <Button size="big" background="gray" title="취소" width={130} height={48} />
            <Button size="big" background="blue80" title="등록" width={130} height={48} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(DealerSell07);