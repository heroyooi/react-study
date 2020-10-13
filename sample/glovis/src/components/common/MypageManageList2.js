import { useContext } from 'react';
import MypageFilterSelect from '@src/components/common/MypageFilterSelect';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import { DealerContext } from '@pages/mypage/dealerSell01';

const MypageManageList2 = () => {
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