import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import DatePicker from '@src/components/common/calendar/DatePicker';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const totalCostCalculation = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 총 비용 계산
  const now = moment();
  const [dep1Panel, setDep1Panel] = useState(0);
  const [dep2Panel, setDep2Panel] = useState(0);
  const tabDep1Click = useCallback((e, idx) => {
    setDep1Panel(idx);
  }, []);
  const tabDep2Click = useCallback((e, idx) => {
    setDep2Panel(idx);
  }, []);

  const [isCal, setIsCal] = useState(false); // 기본값은 false
  const handleCal = useCallback((e) => {
    e.preventDefault();
    setIsCal(true);
  }, []);

  useEffect(() => {
    if (dep1Panel === 2 && dep2Panel === 0) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
        }
      });
    } else {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
        }
      });
    }
  }, [dep1Panel, dep2Panel]);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '총 비용 계산',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 72,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>
        <TabMenu type="type2" mount={false} callBack={tabDep1Click} isFix={true} defaultTab={0}>
          <TabCont tabTitle="총비용" id="tab1-1" index={0}>
            <div className="content-wrap">
              <fieldset className="write-form">
                <legend>거주지 선택 폼</legend>
                <div className="field-group">
                  <div className="category"><label htmlFor="local-select">거주지 선택</label></div>
                  <div className="field">
                    <MobSelectBox options={[
                      {id: 'radio_local_1', value: 1, checked: true, disabled: false, label: '서울'},
                      {id: 'radio_local_2', value: 2, checked: false, disabled: false, label: '인천'},
                      {id: 'radio_local_3', value: 3, checked: false, disabled: false, label: '대전'},
                      {id: 'radio_local_4', value: 4, checked: false, disabled: false, label: '부산'},
                    ]} />
                  </div>
                </div>
              </fieldset>
              <div className="calculation-table">
                <table summary="차량가격에 대한 내용" className="table-tp1 td-r">
                  <caption className="away">차량가격</caption>
                  <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차량가격</th>
                      <td><strong className="result">42,200,000</strong>원</td>
                    </tr>
                  </tbody>
                </table>
                <div className="ico-symbol">
                  <i>+</i>
                </div>
                <table summary="이전등록비 합계에 대한 내용" className="table-tp1 td-r">
                  <caption className="away">이전등록비 합계</caption>
                  <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>이전등록비 합계</th>
                      <td><strong className="result">3,633,200</strong>원</td>
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
                <div className="ico-symbol">
                  <i>=</i>
                </div>
                <table summary="총 구매 예상 비용에 대한 내용" className="table-tp1 td-r">
                  <caption className="away">총 구매 예상 비용</caption>
                  <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>총 구매 예상 비용</th>
                      <td><strong className="result">45,833,200</strong>원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="desc-list">
                <li>위 금액은 예상비용으로 실제 금액과 상이할 수 있으며, 경우에 따라 매도비용, 알선수수료가 발생할 수 있습니다.</li>
                <li>실제 거래신고 금액이 과세표준금액보다 적으면, 과세표준금액 기준으로 이전등록비가 부과됩니다.</li>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="할부내역" id="tab1-2" index={1}>
            <div className="content-wrap">
              <fieldset className="write-form col2">
                <legend>할부계산</legend>
                <div className="field-group">
                  <div className="category"><label htmlFor="local-select">할부기간</label></div>
                  <div className="field">
                    <MobSelectBox options={[
                      {id: 'radio_month_1', value: 1, checked: true, disabled: false, label: '24개월'},
                      {id: 'radio_month_2', value: 2, checked: false, disabled: false, label: '36개월'},
                      {id: 'radio_month_3', value: 3, checked: false, disabled: false, label: '48개월'},
                      {id: 'radio_month_4', value: 4, checked: false, disabled: false, label: '60개월'},
                    ]} />
                  </div>
                </div>
                <div className="field-group">
                  <div className="category"><label htmlFor="local-select">선수율</label></div>
                  <div className="field">
                    <MobSelectBox options={[
                      {id: 'radio_rate_1', value: 1, checked: true, disabled: false, label: '13%'},
                      {id: 'radio_rate_2', value: 2, checked: false, disabled: false, label: '15%'},
                      {id: 'radio_rate_3', value: 3, checked: false, disabled: false, label: '17%'},
                      {id: 'radio_rate_4', value: 4, checked: false, disabled: false, label: '19%'},
                    ]} />
                  </div>
                </div>
              </fieldset>
              <div className="calculation-table">
                <table summary="차량가격" className="table-tp1 td-r">
                  <caption className="away">차량가격</caption>
                  <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차량가격</th>
                      <td><strong className="result">42,200,000</strong>원</td>
                    </tr>
                    <tr>
                      <th>선수금(20%)</th>
                      <td>8,440,000원</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="총 할부 금액" className="table-tp1 td-r">
                  <caption className="away">총 할부 금액</caption>
                  <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>총 할부 금액</th>
                      <td><strong className="result">3,633,200</strong>원</td>
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
              </div>
              <ul className="desc-list">
                <li>기준이율 : 13% (할부기간, 할부업체, 개인 신용상태 등에 따라 변동 가능)</li>
              </ul>
              <div className="calculation-table">
                <table summary="월 할부 예상 금액(24개월)" className="table-tp1 td-r">
                  <caption className="away">월 할부 예상 금액(24개월)</caption>
                  <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>월 할부 예상 금액(24개월)</th>
                      <td><strong className="result">1,605,012</strong>원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="desc-list">
                <li>대출 이용 시 또는 할부 판매 가능 차량의 경우에 대략적인 월 할부금을 확인하실 수 있습니다.</li>
                <li>위 금액은 참고자료이며, 정확한 금액은 대출/할부 업체에 문의하세요.</li>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="자동차세" id="tab1-3" index={2}>
            <div className="content-wrap">
              <TabMenu type="type1" mount={false} isFix={false} callBack={tabDep2Click}>
                <TabCont tabTitle="일반승용차" id="tab2-1" index={0} className="w-fix-btn">
                  {
                    isCal === false
                      ? (
                        <>
                          <table summary="일반승용차 자동차세 정보에 대한 내용" className="table-tp2 input th-c th-l">
                            <caption className="away">일반승용차 자동차세</caption>
                            <colgroup>
                              <col width="33.1%" />
                              <col width="66.9%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th>용도</th>
                                <td>
                                  <RadioGroup className="full-radio-group col2" dataList={[
                                    {id: 'non-business', value: 1, checked: true, disabled: false, label: '비영업용'},
                                    {id: 'business', value: 2, checked: false, disabled: false, label: '영업용'}
                                  ]} />
                                </td>
                              </tr>
                              <tr>
                                <th>등록구분</th>
                                <td>
                                  <RadioGroup className="full-radio-group col2" dataList={[
                                    {id: 'first-half', value: 1, checked: true, disabled: false, label: '1/1~6/30등록'},
                                    {id: 'second-half', value: 2, checked: false, disabled: false, label: '7/1~12/31 등록'}
                                  ]} />
                                </td>
                              </tr>
                              <tr>
                                <th><label htmlFor="year">연식</label></th>
                                <td>
                                <MobSelectBox options={[
                                  {id: 'radio_year_1', value: 1, checked: true, disabled: false, label: '2010'},
                                  {id: 'radio_year_2', value: 2, checked: false, disabled: false, label: '2013'},
                                  {id: 'radio_year_3', value: 3, checked: false, disabled: false, label: '2015'},
                                  {id: 'radio_year_4', value: 4, checked: false, disabled: false, label: '2018'},
                                ]} />
                                </td>
                              </tr>
                              <tr>
                                <th><label htmlFor="exhaust-volume">배기량(cc)</label></th>
                                <td>
                                  <Input type="text" id="engine-cc" placeHolder="1951" height={38} />
                                </td>
                              </tr>
                              <tr>
                                <th>일할계산여부</th>
                                <td>
                                  <RadioGroup className="full-radio-group col2" dataList={[
                                    {id: 'daily-calculation-1', value: 1, checked: true, disabled: false, label: '예'},
                                    {id: 'daily-calculation-2', value: 2, checked: false, disabled: false, label: '아니오'}
                                  ]} />
                                </td>
                              </tr>
                              <tr>
                                <th>차량양도일</th>
                                <td>
                                  <DatePicker defaultValue={now} inputWidth={100} inputMeasure={'%'} inputHeight={38} />
                                </td>
                              </tr>
                              <tr>
                                <th>양수/양도인</th>
                                <td>
                                  <RadioGroup className="full-radio-group col2" dataList={[
                                    {id: 'transferor', value: 1, checked: true, disabled: false, label: '양도인'},
                                    {id: 'grantee', value: 2, checked: false, disabled: false, label: '양수인'}
                                  ]} />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <Button size="full" background="blue80" className="fixed" title="계산하기" onClick={handleCal} />
                        </>
                      ) : (
                        <>
                          <div className="calculation-table">
                            <h3>계산결과<span className="desc">(과세년도: 2019년, cc당 세액 200원)</span></h3>
                            <table summary="1년분" className="table-tp1 td-r">
                              <caption className="away">1년분</caption>
                              <colgroup>
                                <col width="50%" />
                                <col width="50%" />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th>1년분<p className="criteria">차령: 9년, 경감률: 35%</p></th>
                                  <td><strong className="result">325,000</strong>원</td>
                                </tr>
                                <tr>
                                  <th>자동차세</th>
                                  <td>250,000원</td>
                                </tr>
                                <tr>
                                  <th>교육세</th>
                                  <td>75,000원</td>
                                </tr>
                              </tbody>
                            </table>
                            <table summary="1기분(6월)" className="table-tp1 td-r">
                              <caption className="away">1기분(6월)</caption>
                              <colgroup>
                                <col width="50%" />
                                <col width="50%" />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th>1기분(6월)<p className="criteria">차령: 9년, 경감률: 35%</p></th>
                                  <td><strong className="result">169,000</strong>원</td>
                                </tr>
                                <tr>
                                  <th>자동차세</th>
                                  <td>130,000원</td>
                                </tr>
                                <tr>
                                  <th>교육세</th>
                                  <td>39,000원</td>
                                </tr>
                              </tbody>
                            </table>
                            <table summary="2기분(12월)" className="table-tp1 td-r">
                              <caption className="away">2기분(12월)</caption>
                              <colgroup>
                                <col width="50%" />
                                <col width="50%" />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th>2기분(12월)<p className="criteria">차령: 9년, 경감률: 35%</p></th>
                                  <td><strong className="result">156,000</strong>원</td>
                                </tr>
                                <tr>
                                  <th>자동차세</th>
                                  <td>120,000원</td>
                                </tr>
                                <tr>
                                  <th>교육세</th>
                                  <td>36,000원</td>
                                </tr>
                              </tbody>
                            </table>
                            <table summary="일할계산" className="table-tp1 td-r">
                              <caption className="away">일할계산</caption>
                              <colgroup>
                                <col width="50%" />
                                <col width="50%" />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th>일할계산<p className="criteria">차령: 10년, 경감률: 40%, 기준일 : 48일</p></th>
                                  <td><strong className="result">53,410</strong>원</td>
                                </tr>
                                <tr>
                                  <th>자동차세</th>
                                  <td>41,090원</td>
                                </tr>
                                <tr>
                                  <th>교육세</th>
                                  <td>12,320원</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <ul className="desc-list">
                            <li>위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요. </li>
                          </ul>
                        </>
                      )
                  }
                </TabCont>
                <TabCont tabTitle="승합차/버스" id="tab2-2" index={1}>
                  <div className="calculation-table">
                    <h3>1년분 자동차세</h3>
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
                  </div>
                  <ul className="desc-list">
                    <li>단, 10인승 이하의 승합차는 일반승용차의 세율이 적용됩니다.</li>
                    <li>위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요.</li>
                  </ul>
                </TabCont>
                <TabCont tabTitle="화물/특장" id="tab2-3" index={2}>
                  <div className="calculation-table">
                    <h3>화물차 1년분 자동차세</h3>
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
                  </div>
                  <div className="calculation-table">
                    <h3>특장차 1년분 자동차세</h3>
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
                  </div>
                  <ul className="desc-list">
                    <li>위 금액은 참고자료이며 정확한 금액은 해당 지역 세무 담당 부서에 문의하세요. </li>
                  </ul>
                </TabCont>
              </TabMenu>
            </div>
          </TabCont>
        </TabMenu>
      </AppLayout>
    )
  }
  
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default withRouter(totalCostCalculation);