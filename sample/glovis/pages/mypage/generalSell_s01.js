import moment from 'moment'
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import BidderInfo from '@src/components/common/popup/BidderInfo';
import CarOptions from '@src/components/common/CarOptions';
import CarAddOption from '@src/components/common/CarAddOption';
import CarImageUpload from '@src/components/common/CarImageUpload';
import CarPictureApply from '@src/components/common/CarPictureApply';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import SelectBox from '@lib/share/items/SelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import ImgCover from '@lib/share/items/ImgCover';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';


const GeneralSell_s01 = () => {
  const now = moment()

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  // Textarea
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

  // 팝업
  const [biddingShow, setBiddingShow, biddingPopupHandler, biddingCloseHandler] = useRodal(false, true);
  const [bidderInfoShow, setBiddersInfoShow, bidderInfoPopupHandler, bidderInfoCloseHandler] = useRodal(false, true);
  const [proceedShow, setProceedShow, proceedPopupHandler, proceedCloseHandler] = useRodal(false, true);
  const [cancelShow, setCancelShow, cancelPopupHandler, cancelCloseHandler] = useRodal(false, true);
  const [cancelChkShow, setCancelChkShow, cancelChkPopupHandler, cancelChkCloseHandler] = useRodal(false, true);
  const [cancelShow2, setCancelShow2, cancelPopupHandler2, cancelCloseHandler2] = useRodal(false, true);
  const [againShow, setAgainlChkShow, againPopupHandler, againCloseHandler] = useRodal(false, true);

  // 팝업의 라디오 버튼
  const [isValue, setIsValue] = useState(1);
  const handleChange = useCallback((e) => {
    e.preventDefault();
    setIsValue(Number(e.target.value));
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '셀프평가 신청 내역',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });
    const [isValue, setIsValue] = useState(false);

    const handleOpenList = useCallback((e) => {
      e.preventDefault();
      setIsValue(true)
    }, []);

    const handleCloseList = useCallback((e) => {
      e.preventDefault();
      setIsValue(false)
    }, []);

    const [bluePop, setBluePop] = useState(true);
    const closeBluePop = (e) => {
      e.preventDefault();
      setBluePop(false);
    }

    return (
      <AppLayout>
        <div className="general-sell-sec">
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

          <div className="table-area content-border">
            <ul className="m-toggle-list up-blue fs16">
              <MenuItem>
                <MenuTitle>진행현황<span>차량정보등록</span></MenuTitle>
                <MenuCont>
                  <ul className="pay-detail">
                    <li className="tx-blue80">
                      <span className="title">1.차량정보등록</span>
                      <span className="sub">차량정보를<br />등록해주세요.</span>
                    </li>
                    <li>
                      <span className="title">2. 신청완료</span>
                      <span className="sub">신청이 완료되었습니다.<br />관리자 확인 후 비교견적이 시작됩니다.</span>
                    </li>
                    <li>
                      <span className="title">3. 비교견적 진행 중</span>
                      <span className="sub">24시간 실시간 비교견적 진행 중입니다.<br />입찰 현황을 확인해보세요.</span>
                    </li>
                    <li>
                      <span className="title">4. 비교견적 완료</span>
                      <span className="sub">24시간 실시간 비교견적이 완료되었습니다.<br />입찰현황을 확인하시고,<br />차량 판매 여부를 결정해주세요.</span>
                    </li>
                    <li>
                      <span className="title">5. 거래완료</span>
                      <span className="sub">딜러와의 거래는 어떠셨나요?<br />이용후기를 남겨주세요.</span>
                    </li>
                  </ul>
                </MenuCont>
              </MenuItem>
              <li className="pt20 pb8">
                <div className="float-wrap btn-s">
                  {
                    isValue === true
                      ? <Button size="sml" line="gray" color="gray" radius={true} title="전체 항목닫기" width={85} onClick={handleCloseList} />
                      : <Button size="sml" line="gray" color="gray" radius={true} title="전체 항목보기" width={85} onClick={handleOpenList} />
                  }
                </div>
              </li>
              <MenuItem isValue={isValue}>
                <MenuTitle>차량 기본 정보</MenuTitle>
                <MenuCont>
                  <table summary="차량 기본 정보에 대한 내용" className="table-tp1">
                    <caption className="away">차량 기본 정보</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>최종등록일</th>
                        <td>2017-05-07</td>
                      </tr>
                      <tr>
                        <th>형식년도</th>
                        <td>2019</td>
                      </tr>
                      <tr>
                        <th>색상</th>
                        <td>검정</td>
                      </tr>
                      <tr>
                        <th>연료</th>
                        <td>가솔린</td>
                      </tr>
                      <tr>
                        <th>배기량</th>
                        <td>1,591cc</td>
                      </tr>
                      <tr>
                        <th>차종</th>
                        <td>준중형차</td>
                      </tr>
                      <tr>
                        <th>용도</th>
                        <td>일반</td>
                      </tr>
                      <tr>
                        <th>출고가격</th>
                        <td>20,700,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>옵션정보</MenuTitle>
                <MenuCont>
                  <CarOptions addOption={true} isMore={false} />
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>추가 상세 정보</MenuTitle>
                <MenuCont>
                  <table summary="추가 상세 정보에 대한 내용" className="table-tp1">
                    <caption className="away">추가 상세 정보</caption>
                    <colgroup>
                      <col width="40%" />
                      <col width="80%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>주행거리(현재기준)</th>
                        <td>20,000 km</td>
                      </tr>
                      <tr>
                        <th>차량설명</th>
                        <td>정말 무사고 차량이에요</td>
                      </tr>
                      <tr>
                        <th>판금/교환여부</th>
                        <td>없음</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>판매자 정보</MenuTitle>
                <MenuCont>
                  <table summary="추가 상세 정보에 대한 내용" className="table-tp1">
                    <caption className="away">추가 상세 정보</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>이름</th>
                        <td>김현대</td>
                      </tr>
                      <tr>
                        <th>휴대전화번호</th>
                        <td>010-1234-1234</td>
                      </tr>
                      <tr>
                        <th>거주지역</th>
                        <td>서울특별시 강남구</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem isValue={isValue}>
                <MenuTitle>차량 사진</MenuTitle>
                <MenuCont>
                  <CarPictureApply isButton={false} fileDisabled={false} />
                  {/* <div className="dim-wrap">
                    <p>입력이 완료되지 않았습니다.<br /> [이어하기]를 통해 정보를 입력해주세요.</p>
                  </div> */}
                </MenuCont>
              </MenuItem>
            </ul>
          </div>

          {bluePop && <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>등록이 완료되지 않았습니다.<br />계속 등록하시겠습니까?</p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="이어하기" width={88} height={30} href="/sell/selfStep01" nextLink={true} />
            </Buttons>
          </div>}
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
            <h3 className="border-none">내차 팔기 현황 상세</h3>
            <div className="sub-tit-wrap">
              <p>셀프평가 판매로 신청하신 내역입니다.</p>
            </div>
          </div>

          <Steps type={1} contents={['차량정보등록', '신청완료', '비교견적 진행 중', '비교견적 완료', '거래완료']} subContents={['차량정보를\n등록해주세요.', '신청이 완료되었습니다\n관리자 확인 후\n비교견적이 시작됩니다.', '비교견적 진행 중입니다.\n입찰 현황을\n확인해보세요..', '비교견적이 완료되었습니다.\n입찰 현황을 확인하시고,\n차량 판매 여부를 결정해주세요.', '딜러와의 거래는\n어떠셨나요?\n이용후기를 남겨주세요.']} active={1} marginBottom={193} />

          <CarImageUpload />

          <div className="car-basic-info">
            <table summary="차량 기본 정보에 대한 내용" className="table-tp1 mt0">
              <caption>차량 기본 정보</caption>
              <colgroup>
                <col width="13%" />
                <col width="27%" />
                <col width="13%" />
                <col width="47%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량 번호</th>
                  <td>01가1234</td>
                  <th>차량명</th>
                  <td>
                    <span className="car-name">기아 K3 쿱 1.6 터보 GDI 프레스티지
                    <span>K3 2DR 1.6T / GDI 프레스티지 M/T</span></span>
                  </td>
                </tr>
                <tr>
                  <th>최초 등록일</th>
                  <td>2017-05-07</td>
                  <th>형식 년도</th>
                  <td>2018</td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>검정</td>
                  <th>연료</th>
                  <td>가솔린</td>
                </tr>
                <tr>
                  <th>배기량</th>
                  <td>1,591cc</td>
                  <th>차종</th>
                  <td>준중형차</td>
                </tr>
                <tr>
                  <th>용도</th>
                  <td>일반</td>
                  <th>출고 가격</th>
                  <td>20,700,000원</td>
                </tr>
              </tbody>
            </table>
            <Button className="fr" size="big" background="blue80" title="차량 정보 수정" width={180} marginTop={33} href="/sell/selfStep02" />
          </div>
          <CarOptions title="차량 옵션" more={false} type={2} />

          <div className="option-add-wrap">
            <CarAddOption disabled={true} />
            <p className="tx-exp-tp3 tx-red80 fr mt16">* 실제 차량 정보와 상이할 경우 추후 견적이 달라질 수 있습니다.</p>
          </div>

          <table summary="추가 상세 정보에 대한 내용" className="table-tp1 mt80">
            <caption>추가 상세 정보</caption>
            <colgroup>
              <col width="16%" />
              <col width="84%" />
            </colgroup>
            <tbody>
              <tr>
                <th>주행 거리(현재기준)</th>
                <td>20,000 km</td>
              </tr>
              <tr>
                <th>차량 설명</th>
                <td>2019년 10월 미쉐린 광폭 타이어로 교환</td>
              </tr>
              <tr>
                <th>판금/교환 여부</th>
                <td>없음</td>
              </tr>
            </tbody>
          </table>

          <div className="sell-info">
            <table summary="판매자 정보에 대한 내용" className="table-tp1 mt80">
              <caption>판매자 정보</caption>
              <colgroup>
                <col width="16%" />
                <col width="84%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>이름</th>
                  <td>김현대</td>
                </tr>
                <tr>
                  <th>휴대 전화 번호</th>
                  <td>010-4325-0987</td>
                </tr>
                <tr>
                  <th>거주 지역</th>
                  <td>서울특별시 강남구</td>
                </tr>
              </tbody>
            </table>
            <Button className="fr" size="big" background="blue80" title="판매자 정보 수정" width={180} marginTop={33} href="#" />
          </div>

          <table summary="차량 견적에 대한 내용" className="table-tp1 mt80 car-estimate">
            <caption>차량 견적</caption>
            <colgroup>
              <col width="16%" />
              <col width="84%" />
            </colgroup>
            <tbody>
              <tr>
                <th>금액</th>
                <td className="none">
                  <strong>- -</strong>만원
                </td>
              </tr>
            </tbody>
          </table>

          <Buttons align="center" marginTop={80}>
            <Button size="big" background="gray" title="신청 취소" width={160} height={48} onClick={(e) => cancelPopupHandler2(e, "fade")} />
            <Button size="big" background="blue80" title="신청 정보 수정" width={160} height={48} href="/sell/selfStep02" />
          </Buttons>
        </div>
      </div>

      <RodalPopup show={biddingShow} type={'slideUp'} closedHandler={biddingCloseHandler} mode="normal" title="24시간 실시간 비교견적 입찰현황" width={1200}>
        <div className="con-wrap popup-bidding-inquiry">
          <p className="view-count">이 차의 조회수 : <span><em className="tx-blue80">25</em>회</span></p>
          <div className="car-img-info">
            <div className="car-info">
              <div className="img-wrap">
                <img src="/images/dummy/list-auction-img-1.png" alt="홈서비스 차량 이미지" />
              </div>
              <table summary="판매 차량에 대한 내용" className="table-tp1">
                <caption className="away">판매 차량 조회</caption>
                <colgroup>
                  <col width="18%" />
                  <col width="22%" />
                  <col width="18%" />
                  <col width="42%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td>09소0119</td>
                    <th>차량명</th>
                    <td>현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>2016-04-18</td>
                    <th>형식 년도</th>
                    <td>2016</td>
                  </tr>
                  <tr>
                    <th>색상</th>
                    <td>흰색</td>
                    <th>연료</th>
                    <td>하이브리드</td>
                  </tr>
                  <tr>
                    <th>배기량</th>
                    <td>1,999 cc</td>
                    <th>차종</th>
                    <td>중형차</td>
                  </tr>
                  <tr>
                    <th>용도</th>
                    <td>일반</td>
                    <th>출고 가격</th>
                    <td>38,510,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bidding-inquiry">
            <ul>
              <li>남은시간<p className="time tx-blue80">12 : 59 : 59</p></li>
              <li>입찰자수<p className="price-tp7">3<span className="won">명</span></p></li>
              <li>최종 판매가<p className="price-tp7">1,800<span className="won">만원</span></p></li>
            </ul>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="판매취소" width={172} height={60} onClick={(e) => cancelPopupHandler(e, "fade")} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={bidderInfoShow} type={'slideUp'} closedHandler={bidderInfoCloseHandler} mode="normal" title="입찰자 정보" width={1200}>
        <BidderInfo />
      </RodalPopup>

      <RodalPopup show={proceedShow} type={'slideUp'} closedHandler={proceedCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>판매를 진행하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={cancelShow} type={'slideUp'} closedHandler={cancelCloseHandler} mode="normal" size="medium" title="판매를 취소하시겠습니까?">
        <div className="con-wrap popup-cancel">
          <p>취소 사유를 선택해주세요.</p>
          <ul>
            <li className="on"><span>단순 변심</span></li>
            <li><span>정보 수정 필요/<br />재 판매 예정</span></li>
            <li><span>견적 불만/<br />입찰자 없음</span></li>
            <li><span>기타</span></li>
          </ul>
          <Textarea countLimit={200} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} placeHolder="기타 사유를 작성해주세요." />
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="판매취소" width={180} height={60} onClick={(e) => cancelChkPopupHandler(e, "fade")} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={cancelChkShow} type={'slideUp'} closedHandler={cancelChkCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>판매 취소 신청이 완료되었습니다.</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={cancelShow2} type={'slideUp'} closedHandler={cancelCloseHandler2} mode="normal" size="xs" >
        <div className="con-wrap popup-cancel">
          <p>셀프평가 신청을 취소하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={againShow} type={'slideUp'} closedHandler={againCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>다시 24시간 실시간 비교견적을<br />진행하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default GeneralSell_s01
