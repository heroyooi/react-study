import moment from 'moment'
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
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
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps'
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const GeneralSell_s02 = () => {
  const now = moment()

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  // 팝업
  const [cancelShow2, setCancelShow2, cancelPopupHandler2, cancelCloseHandler2] = useRodal(false, true);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '무평가 신청 내역',
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

    // 판매취소 bottom
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);
    const handleOpenPop = useCallback((e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      document.getElementsByTagName('html')[0].style.overflow = "hidden";
    }, []);
    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      document.getElementsByTagName('html')[0].style.overflow = "auto";
    }, []);

    // 판매취소 라디오
    const [isValue1, setIsValue1] = useState(1);
    const [isTextArea, setIsTextArea] = useState(isValue1 === 4 ? true : false);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
      setIsTextArea(Number(e.target.value) === 4 ? true : false);
    }, [isValue1, isTextArea]);

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
                <MenuTitle>진행현황<span>신청완료</span></MenuTitle>
                <MenuCont>
                  <ul className="pay-detail">
                    <li>
                      <span className="title">1.차량정보등록</span>
                      <span className="sub">차량정보를<br />등록해주세요.</span>
                    </li>
                    <li className="tx-blue80">
                      <span className="title">2. 신청완료</span>
                      <span className="sub">신청이 완료되었습니다.<br />전문 평가사의 예상견적이 곧 제공됩니다.</span>
                    </li>
                    <li>
                      <span className="title">3. 예상견적 확인</span>
                      <span className="sub">전문 평가사의 예상 견적 산정이 완료되었습니다.<br />차량 판매여부를 결정해주세요.</span>
                    </li>
                    <li>
                      <span className="title">4. 차량 상태 점검</span>
                      <span className="sub">차량의  점검을 위해  탁송절차가 진행되며,<br />입고된 차량은 전문화된 시스템을 통해<br />성능점검이 진행됩니다.</span>
                    </li>
                    <li>
                      <span className="title">5. 견적 완료 및 판매결정</span>
                      <span className="sub">최종 견적 산정이 완료되었습니다.<br />차량 판매 여부를 결정해주세요.</span>
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
                  <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} onClick={handleOpenPop} />
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
                  <CarPictureApply isButton={false} fileDisabled={true} />
                </MenuCont>
              </MenuItem>
            </ul>
          </div>

          {bluePop && <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop} />
            <p>
              신청이 완료되었습니다.<br />
              전문 평가사의 예상견적이 곧 제공됩니다.
            </p>
          </div>}
        </div>

        <div className={dimm ? "modal-bg active" : "modal-bg"} onClick={handleCloseDimm}></div>
        <MobBottomArea active={active}>
          <div className="inner">
            <p className="tit1 mb24">판매취소</p>
            <p className="tx-tit">취소사유</p>
            <ul className="radio-block tp3">
              <li><Radio className="txt" id="cancel1" label="단순 변심" value={1} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio className="txt" id="cancel2" label="정보수정필요 / 재판매예정" value={2} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio className="txt" id="cancel3" label="견적 불만 / 입찰자 없음" value={3} checked={isValue1} onChange={handleChange1} /></li>
              <li><Radio className="txt" id="cancel4" label="기타" value={4} checked={isValue1} onChange={handleChange1} /></li>
            </ul>

            {isTextArea && <><p className="tx-tit mt24 mb8">기타사유<em>(선택)</em></p>
            <Textarea countLimit={200} type="tp1" height={133} placeHolder="기타 사유를 작성해주세요." /></>}
          </div>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" />
            <Button size="big" background="blue80" title="확인" />
          </Buttons>
        </MobBottomArea>
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
              <p>무평가 판매로 신청하신 내역입니다.</p>
            </div>
          </div>

          <Steps type={1} contents={['차량정보등록', '신청완료', '예상견적 확인', '차량 상태 점검', '견적 완료 및 판매결정']} subContents={['차량정보를\n등록해주세요.', '신청이 완료되었습니다.\n전문 평가사의 예상견적이\n곧 제공됩니다.', '전문 평가사의 예상 견적\n신청이 완료되었습니다.\n차량 판매여부를\n결정해주세요.', '차량의 점검을 위해\n탁송절차가 진행되며,\n차량은 전문화된 시스템을 통해\n성능점검이 진행됩니다.', '최종 견적 산정이\n완료되었습니다.\n차량 판매 여부를\n결정해주세요.']} active={2} marginBottom={193} />

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
            <CarAddOption />
            <p className="tx-exp-tp3 tx-red80 fr mt16">* 실제 차량 정보와 상이할 경우 추후 견적이 달라질 수 있습니다.</p>
          </div>

          <table summary="추가 상세 정보에 대한 내용" className="table-tp1 mt80">
            <caption>추가 상세 정보</caption>
            <colgroup>
              <col width="18%" />
              <col width="82%" />
            </colgroup>
            <tbody>
              <tr>
                <th>주행 거리(현재기준)</th>
                <td>20,000 km</td>
              </tr>
              <tr>
                <th>차량 설명<em>(선택)</em></th>
                <td>등록안됨</td>
              </tr>
            </tbody>
          </table>

          <div className="sell-info">
            <table summary="판매자 정보에 대한 내용" className="table-tp1 mt80">
              <caption>판매자 정보</caption>
              <colgroup>
                <col width="18%" />
                <col width="82%" />
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
                  <th>주소<em>(선택)</em></th>
                  <td>서울특별시 강남구</td>
                </tr>
                <tr>
                  <th>계좌번호<em>(선택)</em></th>
                  <td>국민은행 111222-55-48854  (예금주 : 김현대)</td>
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
                <td>신청이 완료되었습니다. 전문 평가사의 예상견적이 곧 제공됩니다.</td>
              </tr>
            </tbody>
          </table>

          <Buttons align="center" marginTop={80}>
            <Button size="big" background="gray" title="신청 취소" width={160} height={48} onClick={(e) => cancelPopupHandler2(e, "fade")} />
            <Button size="big" background="blue80" title="신청 정보 수정" width={160} height={48} href="/sell/freeStep02" />
          </Buttons>
        </div>
      </div>

      <RodalPopup show={cancelShow2} type={'slideUp'} closedHandler={cancelCloseHandler2} mode="normal" size="xs" >
        <div className="con-wrap popup-cancel">
          <p>무평가 신청을 취소하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default GeneralSell_s02
