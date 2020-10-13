import { useState, useCallback, useContext } from 'react';
import moment from 'moment';
import DatePicker from '@src/components/common/calendar/DatePicker';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Textarea from '@lib/share/items/Textarea';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import RadioGroup from '@lib/share/items/RadioGroup';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import { select1_list, select_area } from '@src/dummy';
import { BuyViewContext } from '@pages/buy/viewA';
import { preventScroll } from '@src/utils/CommonUtil';

const BuyViewPopup = () => {
  const {
    counselPopupShow, notifyPopupShow, alertPopupShow, costPopupShow,
    closeCounselPopup, closeNotifyPopup, closeAlertPopup, closeCostPopup,
    setCounselPopupShow, setNotifyPopupShow
  } = useContext(BuyViewContext);

  const now = moment();

  // 1:1 쪽지 상담
  const [sendMsg, setSendMsg] = useState(false);
  const handleMsg = useCallback((e) => {
    e.preventDefault();
    setSendMsg(true);
  }, []);
  const handleCloseCounsel = useCallback((e) => {
    e.preventDefault();
    setCounselPopupShow(false);
    preventScroll(false);
  }, []);

  // 허위 매물 신고
  const [notifyMode, setNotifyMode] = useState(1);
  const [agreeReply, setAgreeReply] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const handleSelect = useCallback((e) => setNotifyMode(Number(e.value)), []);
  const handleAgreeChange = useCallback((e) => setAgreeReply(Number(e.target.value) == 1 ? true : false), []);
  const handleNotify = useCallback((e) => {
    e.preventDefault();
    setIsNotify(true);
  }, []);
  const handleCloseNotify = useCallback((e) => {
    e.preventDefault();
    setNotifyPopupShow(false);
    preventScroll(false);
  }, []);

  // 총 비용 계산
  const [dep1Panel, setDep1Panel] = useState(0);
  const [dep2Panel, setDep2Panel] = useState(0);
  const tabDep1Click = useCallback((e, idx) => {
    setDep1Panel(idx);
  }, []);
  const tabDep2Click = useCallback((e, idx) => {
    setDep2Panel(idx);
  }, []);

  return (
    <>
      <RodalPopup show={counselPopupShow} type={'fade'} closedHandler={closeCounselPopup} mode="normal" title="1:1 쪽지 상담" size="small">
        <div className="popup-inquire">
          <div className="inquire-wrap">
            {
              sendMsg === false
                ? (
                  <>
                    <p className="tx-tit">받는 사람<span className="ml20">현딜러(오토오토 경기점)</span></p>
                    <Textarea countLimit={400} type="tp1" height={320} />
                    <Buttons align="center" marginTop={40} className="w-line">
                      <Button size="big" background="gray" title="취소" width={180} height={60} onClick={handleCloseCounsel} />
                      <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleMsg} />
                    </Buttons>
                  </>
                ) : (
                  <>
                    <div className="co-wrap">
                      <p>
                        <span className="ico-wrap"><i className="ico-counsel"></i></span>
                        쪽지가 성공적으로<br />발송되었습니다.
                      </p>
                    </div>
                    <p className="tx-sub">* 답변은 마이페이지 > 쪽지함 > 받은 쪽지함에서 확인하실 수 있습니다.</p>
                    <Buttons align="center" marginTop={40} className="w-line">
                      <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleCloseCounsel} />
                    </Buttons>
                  </>
                )
            }
          </div>
        </div>
      </RodalPopup>

      <RodalPopup show={notifyPopupShow} type={'fade'} closedHandler={closeNotifyPopup} mode="normal" title="허위 매물 신고" size="small">
        <div className="popup-inquire">
          {isNotify === false && (
            <>
              <div className="inquire-wrap top">
                <table summary="허위 매물 신고 차량 정보에 대한 내용" className="table-tp1">
                  <caption className="away">허위 매물 신고 차량</caption>
                  <colgroup>
                    <col width="28%" />
                    <col width="72%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>등록번호</th>
                      <td>12454801</td>
                    </tr>
                    <tr>
                      <th>신고차량번호</th>
                      <td>23다 4567</td>
                    </tr>
                    <tr>
                      <th>차량정보</th>
                      <td>기아 니로 프레스티지</td>
                    </tr>
                  </tbody>
                </table>
                <p className="tx-sub">고객님께서 허위매물로 인한 피해를 신고해주세요.<br />(신고내용은 비공개입니다.)</p>
              </div>
              <div className="popup-bg">
                <div className="tit">
                  <label htmlFor="notify">신고내용</label>
                  <SelectBox id="notify" className="items-sbox" options={[
                    { value: '1', label: '팔린 매물' },
                    { value: '2', label: '정보허위차량' },
                    { value: '3', label: '기타 신고' }
                  ]} width="100%" height={48} onChange={handleSelect} />
                </div>
                {notifyMode === 2 && (
                  <div className="con chk">
                    <p>항목 (다중 선택 가능)</p>
                    <ul className="chk-info-wrap">
                      <CheckBoxItem id="chk-performance" checked={false}>
                        <p>가격허위</p>
                      </CheckBoxItem>
                      <CheckBoxItem id="chk-insurance" checked={false}>
                        <p>주행거리허위</p>
                      </CheckBoxItem>
                      <CheckBoxItem id="chk-autobel" checked={false}>
                        <p>차량정보허위</p>
                      </CheckBoxItem>
                      <CheckBoxItem id="chk-refundterms" checked={false}>
                        <p>사고유무오류</p>
                      </CheckBoxItem>
                      <CheckBoxItem id="chk-refundterms" checked={false}>
                        <p>미끼매물</p>
                      </CheckBoxItem>
                      <CheckBoxItem id="chk-refundterms" checked={false}>
                        <p>차량실명허위</p>
                      </CheckBoxItem>
                      <CheckBoxItem id="chk-refundterms" checked={false}>
                        <p>옵션정보허위</p>
                      </CheckBoxItem>
                      <CheckBoxItem id="chk-refundterms" checked={false}>
                        <p>차량번호오류</p>
                      </CheckBoxItem>
                    </ul>
                  </div>
                )}
                {notifyMode === 3 && (
                  <div className="con text">
                    <Input type="text" id="title" placeHolder="제목을 입력하세요" />
                    <Textarea countLimit={200} type="tp1" height={140} />
                  </div>
                )}
              </div>
              <div className="inquire-wrap bottom">
                <ul className="float-wrap">
                  <li><p>신고 내용에 대한 답변을 받으시겠습니까?</p></li>
                  <li>
                    <RadioGroup
                      defaultValue={0}
                      dataList={[
                        { id: 'chk-areee', value: 1, checked: false, disabled: false, title: '동의' },
                        { id: 'chk-disagree', value: 2, checked: false, disabled: false, title: '미동의' }
                      ]}
                      onChange={handleAgreeChange}
                    ></RadioGroup>
                  </li>
                </ul>
                {agreeReply === true && (
                  <>
                    <label htmlFor="email" className="hide">이메일</label>
                    <Input type="text" id="email" placeHolder="이메일을 입력해주세요." />
                  </>
                )}
                <Buttons align="center" marginTop={40} className="w-line">
                  <Button size="big" background="gray" title="취소" width={180} height={60} onClick={handleCloseNotify} />
                  <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleNotify} />
                </Buttons>
              </div>
            </>
          )}
          {isNotify === true && (
            <div className="inquire-wrap">
              <p className="tx-co">
                허위매물 신고가 접수되었습니다<br /><span>(신고내용 : 기타신고)</span>
              </p>
              <Buttons align="center" marginTop={40} className="w-line">
                <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleCloseNotify} />
              </Buttons>
            </div>
          )}
        </div>
      </RodalPopup>

      {/* 입력 내용(제목) 초과 시 */}
      <RodalPopup show={alertPopupShow} type={'fade'} closedHandler={closeAlertPopup} mode="normal" size="xs">
        <div className="con-wrap">
          <p className="tx-c">입력 내용이 초과되었습니다.<br />(제목은 30자까지 입력가능합니다.)</p>
          <Buttons align="center" marginTop={40}>
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={costPopupShow} type={'fade'} closedHandler={closeCostPopup} title="총 비용 계산" mode="normal" size="small">
        <div className="popup-inquire">
          <div className="inquire-wrap">
            <TabMenu type="type1" mount={false} callBack={tabDep1Click}>
              <TabCont tabTitle="총비용" id="tab1-1" index={0}>
                <div className="tit-wrap">
                  <label htmlFor="area">거주지 선택</label>
                  <SelectBox id="area" className="items-sbox" options={select_area} placeHolder="서울" width="100%" height={48} />
                </div>
                <div className="table-wrap">
                  <table summary="차량가격에 대한 내용" className="table-tp1 th-c">
                    <caption className="away">차량가격</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>차량가격</th>
                        <td><span>42,200,000</span>원</td>
                      </tr>
                    </tbody>
                  </table>
                  <table summary="이전등록비 합계에 대한 내용" className="table-tp1 th-c">
                    <caption className="away">이전등록비 합계</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>이전등록비 합계</th>
                        <td><span>3,633,200</span>원</td>
                      </tr>
                      <tr>
                        <th>등록세(5%)</th>
                        <td>2,110,000원</td>
                      </tr>
                      <tr>
                        <th>취득세(2%)</th>
                        <td>844,000원</td>
                      </tr>
                      <tr>
                        <th>공채매입비</th>
                        <td>675,200원</td>
                      </tr>
                      <tr>
                        <th>증지대</th>
                        <td>1,000원</td>
                      </tr>
                      <tr>
                        <th>인지대</th>
                        <td>3,000원</td>
                      </tr>
                    </tbody>
                  </table>
                  <table summary="총 구매 예상 비용에 대한 내용" className="table-tp1 th-c">
                    <caption className="away">총 구매 예상 비용</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>총 구매 예상 비용</th>
                        <td><span>45,833,200</span>원</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="ico-wrap">
                    <i className="ico-circle-plus"></i>
                    <i className="ico-circle-equal"></i>
                  </div>
                </div>
                <Buttons align="left" marginTop={25}>
                  <Button size="mid" line="gray" radius={true} title="보험료 조회" width={102} />
                  <Button size="mid" line="gray" radius={true} title="할부상품 조회하기" width={144} />
                </Buttons>
              </TabCont>
              <TabCont tabTitle="할부내역" id="tab1-2" index={1}>
                <ul className="tit-wrap">
                  <li className="fl">
                    <label htmlFor="period">할부기간 선택</label>
                    <SelectBox id="period" className="items-sbox" options={[
                        { value: '1', label: '24개월' },
                        { value: '2', label: '36개월' },
                        { value: '3', label: '48개월' },
                        { value: '4', label: '60개월' }
                      ]} placeHolder="24개월" width={248} height={48} />
                  </li>
                  <li className="fr">
                    <label htmlFor="percent">선수율</label>
                    <SelectBox id="percent" className="items-sbox" options={[
                        { value: '1', label: '0%' },
                        { value: '2', label: '20%' },
                        { value: '3', label: '40%' },
                        { value: '4', label: '60%' },
                        { value: '5', label: '80%' },
                        { value: '6', label: '100%' }
                      ]} placeHolder="20%" width={248} height={48} />
                  </li>
                </ul>
                <div className="table-wrap mt">
                  <table summary="차량가격에 대한 내용" className="table-tp1 th-c">
                    <caption className="away">차량가격</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>차량가격</th>
                        <td><span>42,200,000</span>원</td>
                      </tr>
                      <tr>
                        <th>선수금(20%)</th>
                        <td>8,440,000원</td>
                      </tr>
                    </tbody>
                  </table>
                  <table summary="총 할부 금액에 대한 내용" className="table-tp1 th-c">
                    <caption className="away">총 할부 금액</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>총 할부 금액</th>
                        <td><span>38,520,286</span>원</td>
                      </tr>
                      <tr>
                        <th>할부원금</th>
                        <td>33,760,000원</td>
                      </tr>
                      <tr>
                        <th>할부이자</th>
                        <td>4,760,286원</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tx-sub">※ 기준이율: 13%(할부 기간, 할부 업체, 개인 신용상태 등에 따라 변동가능)</p>
                  <table summary="월 할부 예상 금액에 대한 내용" className="table-tp1 th-c">
                    <caption className="away">월 할부 예상 금액</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>월 할부 예상 금액(24개월)</th>
                        <td><span>1,605,012</span>원</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tx-sub ti16">※ 대출 이용 시 또는 할부 판매 가능 차량의 경우에 대략적인 월 할부금을 확인하실 수 있습니다.</p>
                  <p className="tx-sub">※ 위 금액은 참고자료이며, 정확한 금액은 대출/할부 업체에 문의하세요.</p>
                </div>
                <Buttons align="left" marginTop={40} className="w-line">
                  <Button size="mid" line="gray" radius={true} title="다른 할부상품으로 다시  조회하기" width={237} />
                </Buttons>
              </TabCont>
              <TabCont tabTitle="자동차세" id="tab1-3" index={2}>
                <TabMenu type="type2" mount={false} callBack={tabDep2Click}>
                  <TabCont tabTitle="일반승용차" id="tab2-1" index={0}>
                    <table summary="일반승용차 자동차세 정보에 대한 내용" className="table-tp1 input th-c">
                      <caption className="away">일반승용차 자동차세</caption>
                      <colgroup>
                        <col width="33.1%" />
                        <col width="66.9%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>용도</th>
                          <td>
                            <RadioGroup dataList={[
                              { id: 'non-business', value: 1, checked: true, disabled: false, title: '비영업용' },
                              { id: 'business', value: 2, checked: false, disabled: false, title: '영업용' }
                            ]} />
                          </td>
                        </tr>
                        <tr>
                          <th>등록구분</th>
                          <td className="pd8-12">
                            <RadioGroup dataList={[
                              { id: 'first-half', value: 1, checked: true, disabled: false, title: '1/1~6/30등록차량' },
                              { id: 'second-half', value: 2, checked: false, disabled: false, title: '7/1~2/31등록차량' }
                            ]} />
                          </td>
                        </tr>
                        <tr>
                          <th><label htmlFor="year">연식/배기량</label></th>
                          <td>
                            <SelectBox id="year" className="items-sbox" options={select1_list} placeHolder="2010" width={120} height={38} /><em className="mg8">/</em>
                            <Input type="text" id="engine-cc" placeHolder="1951" width={120} height={38} />
                            <em>CC</em>
                          </td>
                        </tr>
                        <tr>
                          <th>일할계산여부</th>
                          <td>
                            <RadioGroup dataList={[
                              { id: 'yes', value: 1, checked: true, disabled: false, title: '예' },
                              { id: 'no', value: 2, checked: false, disabled: false, title: '아니오' }
                            ]} />
                          </td>
                        </tr>
                        <tr>
                          <th>차량양도일</th>
                          <td>
                            <DatePicker defaultValue={now} inputWidth={245} inputHeight={38} />
                          </td>
                        </tr>
                        <tr>
                          <th>양수/양도인</th>
                          <td>
                            <RadioGroup dataList={[
                              { id: 'transferor', value: 1, checked: true, disabled: false, title: '양도인' },
                              { id: 'grantee', value: 2, checked: false, disabled: false, title: '양수인' }
                            ]} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Buttons align="center" marginTop={40}>
                      <Button size="big" line="black" color="black" title="계산하기" width={180} />
                    </Buttons>
                  </TabCont>
                  <TabCont tabTitle="승합차/버스" id="tab2-2" index={1}>
                    <p className="tx-tit">1년분 자동차세</p>
                    <table summary="승합차/버스 자동차세 정보에 대한 내용" className="table-tp1 th-c td-c">
                      <caption className="away">승합차/버스 자동차세</caption>
                      <colgroup>
                        <col width="33.33%" />
                        <col width="33.33%" />
                        <col width="33.33%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th>영업용</th>
                          <th>비영업용</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>고속버스</td>
                          <td>100,000원</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>대형전세버스</td>
                          <td>70,000원</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>소형전세버스</td>
                          <td>50,000원</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>대형일반버스</td>
                          <td>42,000원</td>
                          <td>115,000원</td>
                        </tr>
                        <tr>
                          <td>소형일반버스</td>
                          <td>25,000원</td>
                          <td>65,000원</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="tx-sub">
                      ※ 단, 10인승 이하의 승합차는 일반승용차의 세율이 적용됩니다.<br />
                      ※ 위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요.
                    </p>
                  </TabCont>
                  <TabCont tabTitle="화물/특장" id="tab2-3" index={2}>
                    <p className="tx-tit">화물차 1년분 자동차세</p>
                    <table summary="화물/특장 자동차세 정보에 대한 내용" className="table-tp1 th-c td-c">
                      <caption className="away">화물/특장 자동차세</caption>
                      <colgroup>
                        <col width="33.33%" />
                        <col width="33.33%" />
                        <col width="33.33%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th>영업용</th>
                          <th>비영업용</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1톤 이하</td>
                          <td>6,600원</td>
                          <td>28,500원</td>
                        </tr>
                        <tr>
                          <td>2톤 이하</td>
                          <td>9,600원</td>
                          <td>34,500원</td>
                        </tr>
                        <tr>
                          <td>3톤 이하</td>
                          <td>13,500원</td>
                          <td>48,000원</td>
                        </tr>
                        <tr>
                          <td>4톤 이하</td>
                          <td>18,000원</td>
                          <td>63,000원</td>
                        </tr>
                        <tr>
                          <td>5톤 이하</td>
                          <td>22,500원</td>
                          <td>79,500원</td>
                        </tr>
                        <tr>
                          <td>8톤 이하</td>
                          <td>36,000원</td>
                          <td>130,000원</td>
                        </tr>
                        <tr>
                          <td>10톤 이하</td>
                          <td>45,000원</td>
                          <td>157,500원</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="tx-tit bt">특장차 1년분 자동차세</p>
                    <table summary="화물/특장 자동차세 정보에 대한 내용" className="table-tp1 th-c td-c">
                      <caption className="away">화물/특장 자동차세</caption>
                      <colgroup>
                        <col width="33.33%" />
                        <col width="33.33%" />
                        <col width="33.33%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th>영업용</th>
                          <th>비영업용</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>4톤 초과(대형)</td>
                          <td>36,000원</td>
                          <td>157,500원</td>
                        </tr>
                        <tr>
                          <td>4톤 이하(소형)</td>
                          <td>13,500원</td>
                          <td>58,500원</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="tx-sub">※ 위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요. </p>
                  </TabCont>
                </TabMenu>
              </TabCont>
            </TabMenu>
          </div>

          {dep1Panel === 0 && ( // 총비용 탭 활성화 시
            <div className="popup-bg bottom">
              <p className="tx-tit">꼭 알아두세요!</p>
              <p className="tx-sub">
                위 금액은 예상비용으로 실제 금액과 상이할 수 있으며, 경우에 따라 매도비용,<br />
                알선수수료가 발생할 수 있습니다. 실제 거래신고 금액이 과세표준금액보다 적으면,<br />
                과세표준금액 기준으로 이전등록비가 부과됩니다.
              </p>
              <p className="tx-tit bt">친환경차 세금감면 안내</p>
              <ul className="tx-sub">
                <li>전기차 : 취득세 최대 140만원 감면, 공채 매입 최대 250만원 면제</li>
                <li>하이브리드차 : 취득세 최대 140만원 감면, 공채 매입 최대 200만원 면제</li>
                <li>플러그인 하이브리드차 : 취득세 최대 140만원 감면, 공채 매입 최대 200만원 면제</li>
                <li>수소전기차 : 취득세 최대 140만원 감면, 공채 매입 최대 250만원 면제<br />(2019년 7월 23일 기준입니다.)</li>
              </ul>
            </div>
          )}

          {(dep1Panel === 2 && dep2Panel === 0) && ( // 자동차세 탭의 일반승용차 탭 활성화 시
            <div className="popup-bg bottom">
              <p className="tx-tit">계산결과 <span>(과세년도 : 2019년 / cc당 세액 : 140원)</span></p>
              <table summary="일반승용차 자동차세 정보에 대한 내용" className="table-tp1 th-c td-c">
                <caption className="away">일반승용차 자동차세</caption>
                <colgroup>
                  <col width="18%" />
                  <col width="18%" />
                  <col width="18%" />
                  <col width="18%" />
                  <col width="14%" />
                  <col width="14%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>합계</th>
                    <th>자동차세</th>
                    <th>교육세</th>
                    <th>차령</th>
                    <th>경감율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1년분</td>
                    <td>363,800 원</td>
                    <td>279,860 원</td>
                    <td>83,940 원</td>
                    <td>8 년</td>
                    <td>30%</td>
                  </tr>
                  <tr>
                    <td>1기분(6월)</td>
                    <td>181,900 원</td>
                    <td>139,930 원</td>
                    <td>41,970 원</td>
                    <td>8 년</td>
                    <td>30%</td>
                  </tr>
                  <tr>
                    <td>2기분(12월)</td>
                    <td>181,900 원</td>
                    <td>139,930 원</td>
                    <td>41,970 원</td>
                    <td>8 년</td>
                    <td>30%</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">일할계산</td>
                    <td><span className="tx-blue80">35,900</span> 원</td>
                    <td><span className="tx-blue80">-27,610</span> 원</td>
                    <td><span className="tx-blue80">-8,290</span> 원</td>
                    <td><span className="tx-blue80">8</span> 원</td>
                    <td><span className="tx-blue80">30</span>%</td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="tx-l">일할 계산 된 자동차 보유일 수: -36일</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </RodalPopup>
    </>
  )
}

export default BuyViewPopup;