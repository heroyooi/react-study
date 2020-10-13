import React, { useCallback } from 'react';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

const MobGeneralSell = ({ state = 1 }) => {
  // 1: 신청완료, 2: 평가사 배정, 3: 방문 및 견적 안내, 4: 견적 완료 및 판매결정
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(state === 1 ? false : false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);
  return (
    <div className="general-sell-sec">
      {/* {state === 1 && <p className={state === 1 ? "st1" : null}>신청완료</p>} */}
      {state === 1 && (
        <p className="ask-tx">
          평가사 배정 후에 차량 정보를
          <br />
          확인하실 수 있습니다.
        </p>
      )}
      {state !== 1 && <p className={state !== 1 ? 'not-is-st1' : 'st1'}>신청완료가 아닐 경우</p>}
      {state === 2 && <p>평가사</p>}
      {state === 3 && <p>방문</p>}
      {state === 4 && <p>견적</p>}
      <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isButton={false} subPop={false} isMask={false}>
        <div className="con-wrap">
          <p className="tit1">정 말 나가시겠습니까?</p>
          <p>작성한 내용은 임시저장 됩니다.</p>
          <Buttons align="right" marginTop={24}>
            <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
            <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
          </Buttons>
        </div>
      </RodalPopup>

      <div className="table-area">
        <ul className="m-toggle-list up-blue fs16">
          <MenuItem>
            {state === 1 && (
              <MenuTitle>
                진행현황<span>신청완료</span>
              </MenuTitle>
            )}
            {state === 2 && (
              <MenuTitle>
                진행현황<span>평가사 배정</span>
              </MenuTitle>
            )}
            {state === 3 && (
              <MenuTitle>
                진행현황<span>방문 및 견적안내</span>
              </MenuTitle>
            )}
            {state === 4 && (
              <MenuTitle>
                진행현황<span>판매완료</span>
              </MenuTitle>
            )}
            <MenuCont>
              <ul className="pay-detail">
                <li className={state === 1 ? 'tx-blue80' : null}>
                  <span className="title">1.신청완료</span>
                  <span className="sub">
                    방문평가 신청이
                    <br />
                    완료되었습니다.
                  </span>
                </li>
                <li className={state === 2 ? 'tx-blue80' : null}>
                  <span className="title">2.평가사 배정</span>
                  <span className="sub">
                    담당 평가사가
                    <br />
                    배정되었습니다.
                  </span>
                </li>
                <li className={state === 3 ? 'tx-blue80' : null}>
                  <span className="title">3.방문 및 견적안내</span>
                  <span className="sub">
                    고객님께 방문하여 차량 확인 후<br />
                    견적 안내를 도와드립니다.
                  </span>
                </li>
                <li className={state === 4 ? 'tx-blue80' : null}>
                  <span className="title">4.견적 완료 및 판매결정</span>
                  <span className="sub">
                    차량 판매 여부를
                    <br />
                    결정해주세요.
                  </span>
                </li>
              </ul>
            </MenuCont>
          </MenuItem>
        </ul>
        <ul>
          <li>
            <div className="float-wrap btn-s">
              <h4 className={state === 1 ? 'fl tit2' : 'tit2'}>차량 정보</h4>
              {state === 1 && <Button size="sml" line="gray" color="gray" radius={true} title="취소신청" width={61} />}
            </div>
            {state === 1 && <p className="list-none">평가사가 배정 후에 확인 가능합니다.</p>}
            {state !== 1 && (
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
            )}
          </li>
          <li>
            <h4 className="tit2 mb16">차량 견적</h4>
            {(state === 1 || state === 2) && (
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
                    <td className="pr0">
                      <span className="bridge2">
                        <MobSelectBox
                          options={[
                            { id: 'bank1', value: 1, checked: true, disabled: false, label: '신한은행' },
                            { id: 'bank2', value: 2, checked: false, disabled: false, label: '기업은행' },
                            { id: 'bank3', value: 3, checked: false, disabled: false, label: '국민은행' },
                            { id: 'bank4', value: 4, checked: false, disabled: false, label: '농협은행' }
                          ]}
                        />
                      </span>
                      <span className="bridge2">
                        <Input type="text" height={40} placeHolder="계좌번호 (‘-‘없이 숫자만)" />
                      </span>
                      <span className="bridge2">
                        <Input type="text" height={40} placeHolder="예금주" width="63%" />
                        <Button size="mid" background="blue80" radius={true} title="계좌인증" measure={'%'} width={34.5} />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {(state === 3 || state === 4) && (
              <table summary="차량 견적에 대한 내용" className="table-tp1">
                <caption className="away">차량 견적</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>견적</th>
                    <td>
                      <p className="price-tp5">
                        1,950<span className="won">만원</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td>
                      국민 101010-10-101010
                      <br />
                      (예금주: 김현대)
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </li>
          <li>
            <h4 className="tit2 mb16">담당 평가사</h4>
            {state === 1 && <p className="list-none">평가사 배정 후에 확인 가능합니다.</p>}
            {state !== 1 && (
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
            )}
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
  );
};

export default MobGeneralSell;
