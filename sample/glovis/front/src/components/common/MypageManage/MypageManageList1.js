import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import PageNavigator from '@src/components/common/PageNavigator';
import MypageFilterSelect from '@src/components/common/MypageManage/MypageFilterSelect';
import { select1_list } from '@src/dummy';
//import { DealerContext } from '@pages/mypage/dealerSell01';

// DealerContext를 사용하고 싶을 때 다음과 같이 불러와서 사용 할 수 있습니다.
import { DealerContext } from '@pages/mypage/dealer/sellcar/carManagement';
import { getManagementCarList } from '@src/actions/mypage/dealer/sellcar/carManagementAction';

const MypageManageList1 = () => {
  const dispatch = useDispatch();
  //const myTime2 = useSelector((state) => state.carManagement.myTime2);
  //console.log(myTime2);

  // 이제, MypageManageList1 컴포넌트에서 바로 dispatch 를 사용하기 위해서는 useContext 라는 Hook 을 사용해서
  // 앞서 만든 DealerContext Context 를 조회.
  const {
    rodalPopupHandler1, rodalPopupHandler2, rodalPopupHandler3, rodalPopupHandler4, 
    rodalPopupHandler5, rodalPopupHandler6, rodalPopupHandler7, rodalPopupHandler8,
    rodalPopupHandler9, rodalPopupHandler10, rodalPopupHandler11, rodalPopupHandler12,
    withoutList
  } = useContext(DealerContext);

  const [managementCarList, setManagementCarList] = useState([]);
  const managementCarListData = useSelector((state) => state.carManagement.managementCarList);

  useEffect(() => {
    dispatch(getManagementCarList());
  }, []);

  useEffect(() => {
    setManagementCarList(managementCarListData);
  }, [managementCarListData]);

  return (
    <div className="register-admin-sec">
      <MypageFilterSelect />
      {withoutList === false && (
        <div className="register-state-modify">
          <CheckBox id="chk-all" title="" />
          <div className="btn-wrap">
            <Button size="mid" line="gray" color="black" radius={true} title="대기차량으로 이동" width={133} onClick={(e) => rodalPopupHandler3(e, 'slideUp')} />
            <Button size="mid" line="gray" color="black" radius={true} title="선택차량 삭제" width={109} marginLeft={8} onClick={(e) => rodalPopupHandler2(e, 'slideUp')} />
          </div>
        </div>
      )}
      
      {/* <ul className="register-state-modify">
        <li>
          <CheckBox id='chk-all' title='' />
        </li>
        <li>
          <Button size="mid" line="gray" color="black" radius={true} title="선택차량 프리미엄광고 구입" onClick={(e) => rodalPopupHandler1(e, "slideUp")} width="193" />
        </li>
        <li>
          <Button size="mid" line="gray" color="black" radius={true} title="선택차량 프리미엄광고 내용관리" onClick={(e) => rodalPopupHandler2(e, "slideUp")} width="219" />
        </li>
        <li>
          <Button size="mid" line="gray" color="black" radius={true} title="선택차량 삭제" onClick={(e) => rodalPopupHandler3(e, "slideUp")} width="113" />
        </li>
        <li>
          <Button size="mid" line="gray" color="black" radius={true} title="선택차량 업데이트" onClick={(e) => rodalPopupHandler4(e, "slideUp")} width="139" />
        </li>
      </ul> */}

      <ul className="register-img-list">
        {withoutList === false ? (
            <li>
              {managementCarList.map((v, index) => {
                return (
                  <div className="admin-list tp1">
                    <div className="content-top">
                      <CheckBox id="register-car-chk" />
                      <div className="img-cover">
                        <img src={v.putUrl} alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h4 className="subject">
                          {v.manufacturerName} {v.carModelName} {v.carRatingCode}
                        </h4>
                        <ul className="info">
                          <li>{v.carNumber}</li>
                          <li>
                            {v.carYearNumber}({v.carTypeYear})
                          </li>
                          <li>84,761km</li>
                          <li>오토</li>
                          <li>디젤</li>
                        </ul>
                        <p className="price-tp6">
                          7760<span className="won">만원</span>
                        </p>
                      </div>
                      <ul className="numerical">
                        <li>
                          <i className="ico-dot sml" />
                          판매기간<span>53일</span>
                        </li>
                        <li>
                          <i className="ico-dot sml" />
                          조회수(일평균)<span>20회</span>
                        </li>
                        <li>
                          <i className="ico-dot sml" />
                          관심고객(최근2주)<span>13명</span>
                        </li>
                        <li>
                          <i className="ico-dot sml" />
                          동급매물(최근4주)
                          <span>
                            <i className="ico-triangle-top" />
                            4주
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="content-bottom">
                      <p className="state normal">
                        정상<span>(만료 00일 전)</span>
                      </p>
                      <ul>
                        <li className="product-name">대당이용권, 자동업데이트, Best pick</li>
                        <li>
                          <span>등록일</span>2019-08-01
                        </li>
                        <li>
                          <span>최종수정일</span> 2019-09-01
                        </li>
                        <li>
                          <span>최종업데이트 </span> 2019-09-30 23:10 (6/15회)
                        </li>
                      </ul>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="업데이트 시간변경" onClick={(e) => rodalPopupHandler7(e, 'slideUp')} width={129} />
                    </div>
                    <div className="btn-wrap">
                      <div className="btn-left">
                        <Button size="sml" background="blue80" radius={true} title="Live Studio 예약" width={103} href="/mypage/dealerSell06_01" />
                        <Button size="sml" background="blue80" radius={true} title="Live Shot 예약" width={103} href="/mypage/dealerSell06_01" />
                      </div>
                      <div className="btn-right">
                        <Button size="sml" line="gray" radius={true} title="가격 수정" width={101} onClick={(e) => rodalPopupHandler8(e, 'slideUp')} />
                        <Button size="sml" line="gray" radius={true} title="차량정보 수정" width={101} onClick={(e) => rodalPopupHandler9(e, 'slideUp')} />
                        <Button size="sml" line="gray" radius={true} title="차량사진 수정" width={101} onClick={(e) => rodalPopupHandler10(e, 'slideUp')} />
                        <Button size="sml" line="gray" radius={true} title="성능기록부 수정" width={101} onClick={(e) => rodalPopupHandler11(e, 'slideUp')} />
                        <Button size="sml" line="gray" radius={true} title="판매완료 신고" width={101} onClick={(e) => rodalPopupHandler12(e, 'slideUp')} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </li>
          ) : (
            <li className="list-none">
              현재 등록중인 차량이 없습니다.
              <br />
              <Button size="big" background="blue80" title="차량등록하기" width={164} height={48} marginTop={24} href="/mypage/dealerSell02_01" />
            </li>
          )}
      </ul>
      {withoutList === false && <PageNavigator recordCount={50} className="mt32" />}
    </div>
  )
}

export default MypageManageList1;