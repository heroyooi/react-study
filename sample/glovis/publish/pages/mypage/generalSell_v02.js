import moment from 'moment'
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps'
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const GeneralSell_v02 = () => {
  const now = moment()

  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const [cancelShow, setCancelShow, cancelPopupHandler, cancelCloseHandler] = useRodal(false, true);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '방문평가 신청 내역',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 8,
        color: '#fff'
      }
    });
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
                <MenuTitle>진행현황<span>평가사 배정</span></MenuTitle>
                <MenuCont>
                  <ul className="pay-detail">
                    <li>
                      <span className="title">1.신청완료</span>
                      <span className="sub">방문평가 신청이<br />완료되었습니다.</span>
                    </li>
                    <li className="tx-blue80">
                      <span className="title">2.평가사 배정</span>
                      <span className="sub">담당 평가사가<br />배정되었습니다.</span>
                    </li>
                    <li>
                      <span className="title">3.방문 및 견적안내</span>
                      <span className="sub">고객님께 방문하여 차량 확인 후<br />견적 안내를 도와드립니다.</span>
                    </li>
                    <li>
                      <span className="title">4.견적 완료 및 판매결정</span>
                      <span className="sub">차량 판매 여부를<br />결정해주세요.</span>
                    </li>
                  </ul>
                </MenuCont>
              </MenuItem>
            </ul>
            <ul>
              <li>
                <div className="float-wrap btn-s">
                  <h4 className="tit2 fl">차량 정보</h4>
                </div>
                <table summary="차량 기본정보에 대한 내용" className="table-tp1">
                  <caption className="away">차량 기본정보</caption>
                  <colgroup>
                    <col width="27%" />
                    <col width="24%" />
                    <col width="23.5%" />
                    <col width="25.5%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>최초등록일</th>
                      <td colSpan="3">2017-05-07</td>
                    </tr>
                    <tr>
                      <th>형식년도</th>
                      <td>2018</td>
                      <th>색상</th>
                      <td>검정</td>
                    </tr>
                    <tr>
                      <th>연료</th>
                      <td>가솔린</td>
                      <th>배기량</th>
                      <td>1,591 cc</td>
                    </tr>
                    <tr>
                      <th>차종</th>
                      <td>대형차</td>
                      <th>용도</th>
                      <td>일반</td>
                    </tr>
                    <tr>
                      <th>출고가격</th>
                      <td colSpan="3">20,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4 className="tit2 mb16">차량 견적</h4>
                <table summary="차량 견적에 대한 내용" className="table-tp1">
                  <caption className="away">차량 견적</caption>
                  <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>견적</th>
                      <td className="tx-lg">평가사 방문 후에 확인 가능합니다.</td>
                    </tr>
                    <tr>
                      <th>계좌번호</th>
                      <td>
                        <span className="bridge2">
                          <MobSelectBox options={[
                            { id: 'bank1', value: 1, checked: true, disabled: false, label: '신한은행' },
                            { id: 'bank2', value: 2, checked: false, disabled: false, label: '기업은행' },
                            { id: 'bank3', value: 3, checked: false, disabled: false, label: '국민은행' },
                            { id: 'bank4', value: 4, checked: false, disabled: false, label: '농협은행' }
                          ]} />
                        </span>
                        <span className="bridge2">
                          <Input type="text" height={40} placeHolder="계좌번호 (‘-‘없이 숫자만)" />
                        </span>
                        <span className="bridge2">
                          <Input type="text" height={40} placeHolder="예금주" width='63%' />
                          <Button size="mid" background="blue80" radius={true} title="계좌인증" measure={'%'} width={34.5} />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4 className="tit2 mb16">담당 평가사</h4>
                <table summary="담당 평가사 정보에 대한 내용" className="table-tp1">
                  <caption className="away">담당 평가사</caption>
                  <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>홍길동</td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>010-1234-1234</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4 className="tit2 mb16">계약자 정보</h4>
                <table summary="계약자 정보에 대한 내용" className="table-tp1">
                  <caption className="away">계약자 정보</caption>
                  <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>명의자</th>
                      <td>김현대</td>
                    </tr>
                    <tr>
                      <th>휴대폰 번호</th>
                      <td>010-1234-1234</td>
                    </tr>
                    <tr>
                      <th>거주지역</th>
                      <td>서울시 강남구</td>
                    </tr>
                    <tr>
                      <th>고객방문 주소</th>
                      <td className="tx-lg">등록되지 않았습니다</td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td className="tx-lg">등록되지 않았습니다</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
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
            <h3 className="border-none">내차 팔기 현황 상세</h3>
            <div className="sub-tit-wrap">
              <p>방문평가 판매로 신청하신 내역입니다.</p>
            </div>
          </div>

          <Steps type={1} contents={['신청완료', '평가사 배정', '방문 및 견적안내', '견적 완료 및 판매결정']} subContents={['방문평가 신청이\n완료되었습니다.', '담당 평가사가\n배정되었습니다.', '고객님께 방문하여\n차량 확인 후 견적안내를\n도와드립니다.', '차량 판매 여부를\n결정해주세요.']} active={2} marginBottom={193} />

          <div className="car-img-info">
            <div className="tit-wrap">
              <h5>차량정보</h5>
            </div>
            <div className="car-info">
              <div className="img-wrap">
                {/* <i className="ico-car"></i> */}{/* 이미지 미등록시 */}
                <img src="/images/dummy/product-img-01.png" alt="" />
              </div>
              <table summary="차량 정보에 대한 내용" className="table-tp1 th-c td-c">
                <caption className="sml">차량명<span>평가사가 방문 후에 확인 가능합니다.</span></caption>
                <colgroup>
                  <col width="20%" />
                  <col width="30%" />
                  <col width="20%" />
                  <col width="30%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td></td>
                    <th>연료</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>연식</th>
                    <td></td>
                    <th>배기량</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>주행거리</th>
                    <td></td>
                    <th>차종</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>변속기</th>
                    <td></td>
                    <th>색상</th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="table-area">
            <div className="table-wrap-left">
              <table summary="차량 견적에 대한 내용" className="table-tp1 th-c">
                <caption>차량 견적</caption>
                <colgroup>
                  <col width="22%" />
                  <col width="78%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>견적</th>
                    <td>평가사가 방문 후에 확인 가능합니다.</td>
                  </tr>
                  <tr>
                    <th rowSpan="2">계좌번호</th>
                    <td rowSpan="2">
                      <span className="bridge2">
                        <SelectBox id="select1" className="items-sbox" options={[
                          { value: '1', label: '기업은행' },
                          { value: '2', label: '우리은행' }
                        ]} width={98} placeHolder="은행명" />
                        <em></em>
                        <Input type="text" placeHolder="" width={178} height={40} value="계좌번호 ('-'없이 숫자만)" />
                      </span>
                      <span className="bridge2">
                        <Input type="text" placeHolder="" width={98} height={40} value="예금주" />
                        <Button size="mid" background="blue80" title="계좌인증" width={98} height={40} marginLeft={8} />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table summary="담당 평가사에 대한 내용" className="table-tp1 th-c">
                <caption className="xs">담당 평가사</caption>
                <colgroup>
                  <col width="22%" />
                  <col width="78%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td className="tx-black">홍길동</td>
                  </tr>
                  <tr>
                    <th>연락처</th>
                    <td className="tx-black">010-5678-5555</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table-wrap-right">
              <table summary="계약자 정보에 대한 내용" className="table-tp1 th-c">
                <caption>계약자 정보</caption>
                <colgroup>
                  <col width="29%" />
                  <col width="20%" />
                  <col width="18%" />
                  <col width="33%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>주민등록상 주소</th>
                    <td className="tx-black">김현대</td>
                    <th>주민번호</th>
                    <td>등록되지 않았습니다.</td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td colSpan="3" className="tx-black">
                      010-1234-5678<Button size="mid" line="gray" color="black" radius={true} title="회원정보 변경" width={109} height={32} marginLeft={23} />
                    </td>
                  </tr>
                  <tr>
                    <th>거주 지역</th>
                    <td colSpan="3" className="tx-black">서울시 강남구</td>
                  </tr>
                  <tr>
                    <th>주민등록상 주소</th>
                    <td colSpan="3">등록되지 않았습니다.</td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td colSpan="3">등록되지 않았습니다.</td>
                  </tr>
                  <tr>
                    <th>차량양도계약서</th>
                    <td colSpan="3">등록되지 않았습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Buttons marginTop={65}>
            <span className="step-btn-c">
              <Button size="big" background="gray" title="신청취소" width={180} height={60} onClick={(e) => cancelPopupHandler(e, "fade")} />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="목록으로" width={180} height={60} mode="normal" href="/mypage/generalSell01" />
            </span>
          </Buttons>
        </div>
      </div>

      <RodalPopup show={cancelShow} type={'slideUp'} closedHandler={cancelCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>신청을 취소하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default GeneralSell_v02
