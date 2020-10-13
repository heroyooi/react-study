import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import uuid from "uuid";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MypageCompare from '@src/components/common/popup/MypageCompare';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import RadioGroup from '@lib/share/items/RadioGroup';
import { SECTION_MYPAGE } from '@src/actions/types';
import { numberFormat } from '@src/utils/CommonUtil';
import { wishCarList } from '@src/dummy';
import Link from 'next/link';

const generalBuy02 = ({router}) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  // 팝업
  const [deleteShow, setDeleteShow, deletePopupHandler, deleteCloseHandler] = useRodal(false, true);
  const [comparisonShow, setComparisonShow, comparisonPopupHandler, comparisonCloseHandler] = useRodal(false, true);
  const [attentionShow, setAttentionShow, attentionPopupHandler, attentionCloseHandler] = useRodal(false, true);

  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  // 목록 더보기
  const [listData, setListData] = useState(wishCarList);
  const createDummy = (num) => {
    const dummyArr = [];
    for (let i=0; i<num; i++) {
      dummyArr.push({
        id: uuid.v4(),
        imgSrc: "/images/dummy/product-img-06.png",
        imgAlt: "새로 추가된 차량 이미지",
        subject: "새로 추가된 차 이름",
        info1: ["00가0000", "09/12식(10년형)"],
        info2: ["84,761km", "오토", "디젤"],
        price: 9999,
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

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-buy-sec">
          <div className="mypage-admin-title">
            <h3>최근 본 차량</h3>
            <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <Button size="mid" line="gray" radius={true} title="선택한 차량 비교" width={129} height={38} onClick={result === "no" ? e => e.preventDefault() : (e) => comparisonPopupHandler(e, "fade")} />
              <Button size="mid" line="gray" radius={true} title="선택한 차량 삭제" width={129} height={38} marginLeft={16} onClick={result === "no" ? e => e.preventDefault() : (e) => deletePopupHandler(e, "fade")}/>
              <Button size="mid" line="gray" color="blue80" radius={true} title="선택한 차량을 관심차량으로 등록" width={222} height={38} marginLeft={16} onClick={result === "no" ? e => e.preventDefault() : (e) => attentionPopupHandler(e, "fade")}/>
              <RadioGroup className="sort-r" dataList={[{id:'sortUpload', value:1, checked:true, disabled:false, title:'가격순'},{id:'sortPrice', value:2, checked:true, disabled:false, title:'등록순'}]} />
              {/* <SelectBox id="select1" className="items-sbox" options={[
                { value: '1', label: '조회순' },
                { value: '2', label: '가격순' }
              ]} width={148} height={36} placeHolder="조회순" /> */}
            </div>
            <div className="admin-list tp7 chk">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="2%" />
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
                                  <a>
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
                            최근 조회하신 차량이 없습니다.<br />
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

      <RodalPopup show={attentionShow} type={'slideUp'} closedHandler={attentionCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>관심차량으로 등록되었습니다.<br />바로 확인하시겠습니까?<br /><span className="tx-blue80">[마이페이지>관심차량]에서 확인이 가능합니다.</span></p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} href="/mypage/generalBuy01" />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(generalBuy02);