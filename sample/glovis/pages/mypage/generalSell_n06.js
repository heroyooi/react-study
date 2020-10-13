
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import CarOptions from '@src/components/common/CarOptions';
import CarPictureApply from '@src/components/common/CarPictureApply';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const GeneralSell_n06 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

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
                <MenuTitle>진행현황<span className="tx-gray">취소신청</span></MenuTitle>
                <MenuCont>
                  <ul className="pay-detail">
                    <li>
                      <span className="title">1.차량정보등록</span>
                      <span className="sub">차량정보를<br />등록해주세요.</span>
                    </li>
                    <li>
                      <span className="title">2. 신청완료</span>
                      <span className="sub">신청이 완료되었습니다.<br />전문 평가사의 예상견적이 곧 제공됩니다.</span>
                    </li>
                    <li>
                      <span className="title">3. 예상견적 확인</span>
                      <span className="sub">전문 평가사의 예상 견적 산정이 완료되었습니다.<br />차량 판매여부를 결정해주세요.</span>
                    </li>
                    <li>
                      <span className="title">4. 차량 상태 점검</span>
                      <span className="sub">차량의 점검을 위해  탁송절차가 진행되며,<br />입고된 차량은 전문화된 시스템을 통해<br />성능점검이 진행됩니다.</span>
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
            <p>반송 탁송비 입금이후<br />차량 반출이 완료됩니다.</p>
            <ul className="float-tx">
              <li><em>반송탁송비</em><span>19,000 원</span></li>
              <li><em>입금계좌</em><span>하나은행 12312312312321<br />㈜현대글로비스</span></li>
            </ul>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="gray" radius={true} title="견적확인" width={88} height={30} href="/mypage/generalSell_n06Check" nextLink={true} />
            </Buttons>
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
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default GeneralSell_n06;