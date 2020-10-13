import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import PageNavigator from '@src/components/common/PageNavigator';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Input from '@lib/share/items/Input';
import RadioGroup from '@lib/share/items/RadioGroup';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list, radio_possession, radio_yn1, radio_yn2, radio_yn3, radio_yn4, select_cash_list, m_radio_yn1, m_radio_yn2, m_radio_yn3, m_radio_yn4 } from '@src/dummy';
import { numberFormat } from '@src/utils/CommonUtil';

const ExhibitStep03 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [isAdd, setIsAdd] = useState(false);
  const [bidPopup, setBidPopup, openBidPopup, closeBidPopup] = useRodal(false, true); // 예상 낙찰가 조회
  const [consignPopup, setConsignPopup, openConsignPopup, closeConsignPopup] = useRodal(false, true); // 탁송료 안내 팝업
  const [confirmPopup, setConfirmPopup, openConfirmPopup, closeConfirmPopup] = useRodal(false, false);
  const [confirmPopup2, setConfirmPopup2, openConfirmPopup2, closeConfirmPopup2] = useRodal(false, false);
  const handleOpenPopup = useCallback((e) => {
    e.preventDefault();
    setConfirmPopup(false);
  }, []);
  const handleClosePopup = useCallback((e) => {
    e.preventDefault();
    setConfirmPopup(false);
    setConfirmPopup2(false);
  }, []);
  const handleAdd = useCallback((e) => {
    e.preventDefault();
    setIsAdd(true);
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    //삭제 로직
    setConfirmPopup2(false);
  }
  
  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '내 차 출품하기',
        options: ['back', 'close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#f6f7f8'
      }
    });

    const { result } = router.query;
    const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
    const submitCarList = [
      {
        id: 1,
        number: "01가1234",
        name: "김현대",
        subject: "[현대] HOT_Hatch_i30 가솔린 1.4 터보튜너 패키지1",
        startPrice: 1000,
        winningBid: 1050
      },
      {
        id: 2,
        number: "01가1234",
        name: "김현대",
        subject: "[현대] HOT_Hatch_i30 가솔린 1.4 터보튜너 패키지2",
        startPrice: 1000,
        winningBid: 1050
      },
      {
        id: 3,
        number: "01가1234",
        name: "김현대",
        subject: "[현대] HOT_Hatch_i30 가솔린 1.4 터보튜너 패키지3",
        startPrice: 1000,
        winningBid: 1050
      }
    ];
    const [carList, setCarList] = useState(!withoutList ? submitCarList : []);
    const handleDelete = (id) => (e) => {
      e.preventDefault();
      const copyList = [...carList].filter(list => list.id !== id);
      setCarList(copyList);
    }

    return (
      <AppLayout>
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={4} mode="stick" />
        </div>
        <div className="auction-sec">
          <div className="content-wrap auction-tb-wrap">
            <div className="auction-tit">
              <h4 className="tit2">차량정보</h4>
            </div>
            <form className="auction-form step4">
              <fieldset>
                <legend className="away">회원정보 등록</legend>
                <table summary="회원정보 등록에 대한 내용" className="table-tp2">
                  <caption className="away">회원정보 등록</caption>
                  <colgroup>
                    <col width="34%" />
                    <col width="76%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차주명<em className="tx-blue80">*</em></th>
                      <td><Input type="text" /></td>
                    </tr>
                    <tr>
                      <th>차량번호<em className="tx-blue80">*</em></th>
                      <td><Input type="text" /></td>
                    </tr>
                    <tr>
                      <th>차종<em className="tx-blue80">*</em></th>
                      <td>
                        <span className="bridge2"><MobSelectBox placeHolder="제조사"  id="car-manufacturer" options={select1_list} /></span>
                        <span className="bridge2"><MobSelectBox placeHolder="모델" id="car-model" options={select1_list} /></span>
                        <span className="bridge2"><MobSelectBox placeHolder="세부모델" id="car-model-detail" options={select1_list} /></span>
                        <span className="bridge2"><Input type="text" placeHolder="모델이 없는 경우 직접 입력하세요" /></span>
                      </td>
                    </tr>
                    <tr>
                      <th>주행거리</th>
                      <td><Input type="text" id="mileage" placeHolder="" /></td>
                    </tr>
                    <tr>
                      <th>소유구분<em className="tx-blue80">*</em></th>
                      <td>
                        <MobSelectBox placeHolder="선택" options={[
                          { id: 'select1', value: 1, checked: true, disabled: false, label: '개인' },
                          { id: 'select2', value: 2, checked: false, disabled: false, label: '법인' },
                          { id: 'select3', value: 3, checked: false, disabled: false, label: '개인사업' },
                          { id: 'select4', value: 4, checked: false, disabled: false, label: '법인지정' },
                          { id: 'select5', value: 5, checked: false, disabled: false, label: '상품용' },
                          { id: 'select6', value: 6, checked: false, disabled: false, label: '종교단체' },
                          { id: 'select7', value: 7, checked: false, disabled: false, label: '법인상품' },
                          { id: 'select8', value: 8, checked: false, disabled: false, label: '재외국인' }
                        ]} />
                      </td>
                    </tr>
                    <tr>
                      <th className="ver-t">확인사항<em className="tx-blue80">*</em></th>
                      <td>
                        <p className="tx-tp3 tx-blue80">※ 침수나 접합 수리 이력이 있을 경우 경매에 출품할 수 없습니다.</p>
                        <span className="bridge2">
                          <p className="tx-tp2 mt16">침수 이력이 있습니까?</p>
                          <RadioGroup dataList={m_radio_yn1} defaultValue={0} className="fl mt8" />
                        </span>
                        <span className="bridge2">
                          <p className="tx-tp2 mt16">접합 수리 이력이 있습니까?</p>
                          <RadioGroup dataList={m_radio_yn2} defaultValue={0} className="fl mt8" />
                        </span>
                        <span className="bridge2">
                          <p className="tx-tp2 mt16">주행거리 기록장치의 변경, 수리 경험이 있습니까?</p>
                          <RadioGroup dataList={m_radio_yn3} defaultValue={0} className="fl mt8" />
                        </span>
                        <span className="bridge2">
                          <p className="tx-tp2 mt16">영업용(텐트, 택시 등) 으로 사용된 적이 있습니까?</p>
                          <RadioGroup dataList={m_radio_yn4} defaultValue={0} className="fl mt8" />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="auction-tit mt48 float-wrap btn-s">
                  <h4 className="tit2 fl">판매 희망가<em className="tx-blue80">*</em></h4>
                  <span className="bridge2 fr tx-r">
                    <Button size="sml" line="gray" radius={true} title="경매 낙찰가 조회" measure={true} width={50} height={30} href="searchBid"/>
                    <Button size="sml" line="gray" radius={true} title="탁송료 안내" measure={true} width={37} height={30} marginLeft={8} href="consignInfo"/>
                  </span>
                  <p className="tx-tp3 mt16">※ 희망 판매가가 너무 높으면 구매자의 관심을 끌기 어려우며 판매가 지연될 수 있습니다. 현재 시세를 참고하시어 가격을 결정하시면 보다 원활한 거래가 이뤄질 수 있습니다.</p>
                </div>
                <legend className="away">판매 희망가</legend>
                <table summary="판매 희망가에 대한 내용" className="table-tp2">
                  <caption className="away">판매 희망가</caption>
                  <colgroup>
                    <col width="34%" />
                    <col width="76%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>시작가</th>
                      <td><Input type="text" id="sell-price1" placeHolder="" className="w-price manwon" /></td>
                    </tr>
                    <tr>
                      <th className="ver-t">낙찰 희망가</th>
                      <td>
                        <span className="bridge2"><Input type="text" id="sell-price2" placeHolder="" className="w-price manwon" /></span>
                        <p className="tx-tp3 tx-blue80">※ 낙찰 희망가는 시작가 보다 30만원 이상 80만원 이하로 등록 가능합니다.</p>
                        <p className="tx-tp3 tx-blue80">※ 출품 수수료 : 22,000원<br />낙찰 수수료 : 낙찰임금의 2.2% (110,000원~440,000원)</p>
                      </td>
                    </tr>
                    <tr>
                      <th>예상 판매가</th>
                      <td>
                        <Input type="text" id="sell-price3" placeHolder="" disabled={true} className="w-price manwon" />
                        <p class="tx-sub tx-red80 mt10">예상 판매가를 입력해주세요.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="auction-tit mt48">
                  <h4 className="tit2">현금영수증<em className="tx-blue80">*</em></h4>
                  <p className="tx-tp3 mt16">※ 여러 대의 차량을 등록 후 함께 출품할 수 있습니다. ‘차량 정보 저장’을 통해 출품 목록에 차량 정보를 추가한 후 탁송 신청까지 완료하셔야 출품 신청이 완료됩니다.</p>
                </div>
                <legend className="away">현금영수증</legend>
                <table summary="현금영수증에 대한 내용" className="table-tp2">
                  <caption className="away">현금영수증</caption>
                  <colgroup>
                    <col width="34%" />
                    <col width="76%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>발급대상</th>
                      <td><MobSelectBox id="cash-receipt" placeHolder="선택" options={select_cash_list} /></td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
            </form>
            <Buttons align="center" marginTop={48}>
              <Button size="full" background="blue20" color="blue80" radius={true} title="차량정보 저장" href=""/>
            </Buttons>
            <p className="tx-tp3 tx-blue80 mt16">※ 먼저  ‘차량 정보 저장하기’를 통해 출품 목록에 차량 정보를 추가 한 후,  다음 단계에서 탁송 신청을 진행해주세요.</p>
          </div>
          
          {/* 출품차량목록 */}
          {carList.length > 0 && (
            <div className="auction-exhibit-wrap">
              <div className="content-wrap">
                <div className="auction-tit">
                  <h4 className="tit2">출품 차량 목록</h4>
                </div>
                <ul className="exhibit-list mt16">
                  {carList.map((v, i) => {
                    return (
                      <li className="select-car" key={v.id}>
                        <div className="info">
                          <span>{v.number}</span>
                          <span>{v.name}</span>
                        </div>
                        <h4 className="subject mt8">{v.subject}</h4>
                        <div className="price-wrap mt8">
                          <div className="price-left fl">
                            <p className="price-tp1">{numberFormat(v.startPrice)}</p>
                          </div>
                          <div className="price-right fr">
                            <p className="price-tit">낙찰 희망가</p>
                            <p className="price-tp2">{numberFormat(v.winningBid)}<span className="won">만원</span></p>
                          </div>
                        </div>
                        <a href="#" className="popup-close" onClick={handleDelete(v.id)}></a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}

          <Button className="fixed" size="full" background="blue80" title="다음" href="exhibitStep04" /> 
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>내 차 출품하기</h3>
          <p>공개 경쟁 입찰의 오토옥션으로 내 차를 최고가로 판매하세요.</p>
        </div>
      </div>
      <div className="content-wrap auction-step">
        <Steps type={1} contents={['경매약관 및 주의사항', '회원정보', '차량정보', '탁송신청']} active={3} />
      </div>
      <div className="content-sec auction-sec">
        <div className="auction-register-wrap">
          <div className="content-wrap">
            <div className="auction-tit">
              <h4>차량정보</h4>
              <h5>차량정보 등록</h5>
            </div>
            <form className="auction-form">
              <fieldset>
                <legend className="away">회원정보 등록</legend>
                <table summary="회원정보 등록에 대한 내용" className="table-tp2">
                  <caption className="away">회원정보 등록</caption>
                  <colgroup>
                    <col width="12.68%" />
                    <col width="37.77%" />
                    <col width="12.68%" />
                    <col width="37.77%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차주명</th>
                      <td>
                        <Input type="text" width={258} />
                      </td>
                      <th>차량번호</th>
                      <td>
                        <Input type="text" width={258} />
                      </td>
                    </tr>
                    <tr>
                      <th>차종</th>
                      <td colSpan="3">
                        <span className="bridge">
                          <SelectBox id="car-manufacturer" className="items-sbox" options={select1_list} placeHolder="제조사" width={253} height={48} />
                        </span>
                        <span className="bridge">
                          <SelectBox id="car-model" className="items-sbox" options={select1_list} placeHolder="모델" width={315} height={48} />
                        </span>
                        <span className="bridge">
                          <SelectBox id="car-model-detail" className="items-sbox" options={select1_list} placeHolder="세부모델" width={390} height={48} />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>주행거리</th>
                      <td colSpan="3">
                        <label htmlFor="mileage" className="hide">주행거리</label>
                        <Input type="text" placeHolder="" id="mileage" width={258} />
                        <em>km</em>
                      </td>
                    </tr>
                    <tr>
                      <th>소유구분</th>
                      <td colSpan="3">
                        <RadioGroup dataList={radio_possession} />
                      </td>
                    </tr>
                    <tr>
                      <th>확인사항</th>
                      <td colSpan="3">
                        <table summary="차량등록정보 확인사항" className="table-tp1 th-c td-c">
                          <caption className="away">차량등록정보 확인사항</caption>
                          <colgroup>
                            <col width="50%" />
                            <col width="50%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th className="tx-blue80">침수 이력이 있습니까?</th>
                              <th className="tx-blue80">접합 수리 이력이 있습니까?</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <RadioGroup dataList={radio_yn1} defaultValue={0} />
                              </td>
                              <td>
                                <RadioGroup dataList={radio_yn2} defaultValue={0} />
                              </td>
                            </tr>
                          </tbody>
                          <thead>
                            <tr>
                              <th>주행거리 기록장치의 변경, 수리 경험이 있습니까?</th>
                              <th>영업용(렌트, 택시 등)으로 사용된 적이 있습니까?</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <RadioGroup dataList={radio_yn3} defaultValue={0} />
                              </td>
                              <td>
                                <RadioGroup dataList={radio_yn4} defaultValue={0} />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="tb-sinfo"><span>※</span>침수나 접합 수리 이력이 있을 경우 경매에 출품할 수 없습니다.</p>
                      </td>
                    </tr>
                    <tr>
                      <th>판매 희망가</th>
                      <td colSpan="3">
                        <span className="bridge2">
                          <span className="bridge w-price">
                            <Input type="text" placeHolder="" id="sell-price1" width={494} paddingLeft={105} paddingRight={55} />
                            <span className="unit unit-s">시작가</span>
                            <span className="unit unit-e">만원</span>
                          </span>
                          <Button size="mid" background="gray" title="예상 낙찰가 조회" width={160} height={48} onClick={(e) => openBidPopup(e, "fade")} />
                        </span>
                        <span className="bridge2">
                          <span className="bridge w-price">
                            <Input type="text" placeHolder="" id="sell-price2" width={494} paddingLeft={105} paddingRight={55} />
                            <span className="unit unit-s">낙찰 희망가</span>
                            <span className="unit unit-e">만원</span>
                          </span>
                          <span className="tip">· 낙찰 희망가는 시작가 보다 30만원 이상 80만원 이하로 등록 가능합니다.<br />· 출품수수료 : 22,000원  /  낙찰수수료 : 낙찰대금의 2.2% (110,000원 ~ 440,000원)</span>
                        </span>
                        <span className="bridge2">
                          <span className="bridge w-price">
                            <Input type="text" placeHolder="" id="sell-price3" width={494} paddingLeft={105} paddingRight={55} disabled={true} />
                            <span className="unit unit-s">예상 판매가</span>
                            <span className="unit unit-e">만원</span>
                          </span>
                          <Button size="mid" background="gray" title="(별도) 탁송료 안내" width={160} height={48} onClick={(e) => openConsignPopup(e, "fade")} />
                        </span>
                        <p className="tb-sinfo"><span>※</span>희망 판매가가 너무 높으면 구매자의 관심을 끌기 어려우며 판매가 지연될 수 있습니다. <br />현재 시세를 참고하시어 가격을 결정하시면 보다 원활한 거래가 이뤄질 수 있습니다.</p>
                      </td>
                    </tr>
                    <tr>
                      <th>현금 영수증</th>
                      <td colSpan="3">
                        <SelectBox id="cash-receipt" className="items-sbox" options={select_cash_list} width={253} height={48} />
                        <p className="tb-sinfo"><span>※</span>출품/낙찰수수료 및 탁송료 거래 발생시 현금영수증 발급대상을 선택하여 주십시오. (법인인 경우 세금계산서 발행)</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="tail-info"><span>※</span>여러 대의 차량을 등록 후 함께 출품할 수 있습니다.  '차량 정보 저장하기'를 통해 출품 목록에 차량 정보를 추가한 후, 탁송 신청까지 완료하셔야 출품 신청이 완료됩니다.</p>
              </fieldset>
            </form>
            <Buttons align="center" marginTop={60}>
              <Button size="big" line="black" color="darkgray" title="차량정보 저장하기" width={220} height={60} onClick={(e) => openConfirmPopup(e, "fade")} />
            </Buttons>
          </div>
        </div>
        <div className="auction-exhibit-wrap">
          <div className="content-wrap">
            <div className="auction-tit">
              <h5>출품 차량 목록</h5>
            </div>
            <table summary="출품 차량 목록" className="table-tp1 th-c td-c mt32">
              <caption className="away">출품 차량 목록</caption>
              <colgroup>
                <col width="*" />
                <col width="172px" />
                <col width="172px" />
                <col width="172px" />
                <col width="172px" />
                <col width="60px" />
              </colgroup>
              <thead>
                <tr>
                  <th>모델명</th>
                  <th>차량번호</th>
                  <th>차주명</th>
                  <th>시작가</th>
                  <th>낙찰 희망가</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                  <td>
                    <i className="ico-delete" onClick={(e) => openConfirmPopup2(e, 'fade')}></i>
                  </td>
                </tr>
                <tr>
                  <td>[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                  <td>
                    <i className="ico-delete" onClick={(e) => openConfirmPopup2(e, 'fade')}></i>
                  </td>
                </tr>
                <tr>
                  <td>[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                  <td>
                    <i className="ico-delete" onClick={(e) => openConfirmPopup2(e, 'fade')}></i>
                  </td>
                </tr>
                <tr>
                  <td>[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                  <td>
                    <i className="ico-delete" onClick={(e) => openConfirmPopup2(e, 'fade')}></i>
                  </td>
                </tr>
                <tr>
                  <td>[현대] HOT_Hatch_i30 가솔린 1.4 터보 튜너 패키지</td>
                  <td>01가1234</td>
                  <td>김현대</td>
                  <td>1,000만원</td>
                  <td>1,050만원</td>
                  <td>
                    <i className="ico-delete" onClick={(e) => openConfirmPopup2(e, 'fade')}></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="tail-info-wrap w-line">
              <p className="tail-info"><span>※</span>먼저 '차량 정보 저장하기'를 통해 출품 목록에 차량 정보를 추가한 후,  다음 단계에서 탁송 신청을 진행해주세요.</p>
            </div>
            <Buttons align="center" marginTop={60}>
              <Button size="big" background="blue80" title="다음 단계로" width={240} height={72} href="exhibitStep04" />
            </Buttons>
          </div>
        </div>
      </div>
      <RodalPopup show={bidPopup} type={'fade'} closedHandler={closeBidPopup} title="경매 낙찰가 조회" mode="normal" size="medium" className="account">
        <div className="con-wrap">
          <div className="search-bid-wrap">
            <ul className="search-bid-price">
              <li>
                <SelectBox id="carBid1" className="items-sbox" options={select1_list} placeHolder="제조사" width={200} height={48} />
              </li>
              <li>
                <SelectBox id="carBid2" className="items-sbox" options={select1_list} placeHolder="차급" width={200} height={48} />
              </li>
              <li>
                <SelectBox id="carBid3" className="items-sbox" options={select1_list} placeHolder="대표차종" width={200} height={48} />
              </li>
              <li>
                <SelectBox id="carBid4" className="items-sbox" options={select1_list} placeHolder="미션" width={200} height={48} />
              </li>
              <li>
                <SelectBox id="carBid5" className="items-sbox" options={select1_list} placeHolder="연식" width={200} height={48} />
              </li>
              <li>
                <SelectBox id="carBid6" className="items-sbox" options={select1_list} placeHolder="연료" width={200} height={48} />
              </li>
            </ul>
            <Button size="big" background="blue80" title="검색" width={166} height={106} />
          </div>
          <p className="exp-txt">* 주행거리(년): 상(2만 이하), 중(2만~3만), 하(3만 이상)</p>
          <table summary="경매 낙찰가 조회 제목" className="table-tp1 th-c td-c">
            <caption className="away">경매 낙찰가 조회 제목</caption>
            <colgroup>
              <col width="100px" />
              <col width="*" />
              <col width="90px" />
              <col width="90px" />
              <col width="90px" />
              <col width="107px" />
            </colgroup>
            <thead>
              <tr>
                <th>경매일</th>
                <th>차량정보</th>
                <th>용도</th>
                <th>주행거리</th>
                <th>평가</th>
                <th>낙찰가</th>
              </tr>
            </thead>
          </table>
          <ColoredScrollbars autoHeightMax={336}>
            <table summary="경매 낙찰가 조회 내용" className="table-tp1 th-c td-c">
              <colgroup>
                <col width="100px" />
                <col width="*" />
                <col width="90px" />
                <col width="90px" />
                <col width="90px" />
                <col width="107px" />
              </colgroup>
              <tbody>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
                <tr>
                  <td>2019.07</td>
                  <td className="tl">
                    i30(신형) 1.6 VGT 유니크
                    <p className="opts">2012<span>|</span>M/T<span>|</span> 디젤<span>|</span>1582cc<span>|</span>TAC)크리미화이트</p>
                  </td>
                  <td>자가</td>
                  <td>상</td>
                  <td>A/4</td>
                  <td className="price"><span>580</span>만원</td>
                </tr>
              </tbody>
            </table>
          </ColoredScrollbars>
          <PageNavigator recordCount={50} className="mt32" />
        </div>
      </RodalPopup>
      <RodalPopup show={consignPopup} type={'fade'} closedHandler={closeConsignPopup} title="탁송료 안내" mode="normal" size="medium" className="account">
        <div className="con-wrap">
          <TabMenu type="type1" className="auction-house">
            <TabCont tabTitle="분당 경매장" id="auction-house-1" index={0}>
              <p className="exp-txt">* 단위 (원)</p>
              <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                <caption className="away">탁송료 안내 정보</caption>
                <colgroup>
                  <col width="100px" />
                  <col width="*" />
                  <col width="102px" />
                  <col width="102px" />
                  <col width="102px" />
                </colgroup>
                <thead>
                  <tr>
                    <th>지역</th>
                    <th>시군구</th>
                    <th>4.5톤 미만</th>
                    <th>8톤 미만</th>
                    <th>8톤 이상</th>
                  </tr>
                </thead>
              </table>
              <ColoredScrollbars autoHeightMax={336}>
                <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                  <colgroup>
                    <col width="100px" />
                    <col width="*" />
                    <col width="102px" />
                    <col width="102px" />
                    <col width="102px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>서울1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울2</td>
                      <td className="tl">마포구, 서대문구, 은평구, 종로구, 중고, 중랑구, 성남시, 광주시, 양평군, 이천시, 하남시</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>43,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부2</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부3</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울2</td>
                      <td className="tl">마포구, 서대문구, 은평구, 종로구, 중고, 중랑구, 성남시, 광주시, 양평군, 이천시, 하남시</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>43,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부2</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부3</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                  </tbody>
                </table>
              </ColoredScrollbars>
              {/* <PageNavigator recordCount={50} className="mt32" /> */}
            </TabCont>
            <TabCont tabTitle="양산 경매장" id="auction-house-2" index={1}>
              <p className="exp-txt">* 단위 (원)</p>
              <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                <caption className="away">탁송료 안내 정보</caption>
                <colgroup>
                  <col width="100px" />
                  <col width="*" />
                  <col width="102px" />
                  <col width="102px" />
                  <col width="102px" />
                </colgroup>
                <thead>
                  <tr>
                    <th>지역</th>
                    <th>시군구</th>
                    <th>4.5톤 미만</th>
                    <th>8톤 미만</th>
                    <th>8톤 이상</th>
                  </tr>
                </thead>
              </table>
              <ColoredScrollbars autoHeightMax={336}>
                <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                  <colgroup>
                    <col width="100px" />
                    <col width="*" />
                    <col width="102px" />
                    <col width="102px" />
                    <col width="102px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>서울1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울2</td>
                      <td className="tl">마포구, 서대문구, 은평구, 종로구, 중고, 중랑구, 성남시, 광주시, 양평군, 이천시, 하남시</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>43,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부2</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부3</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울2</td>
                      <td className="tl">마포구, 서대문구, 은평구, 종로구, 중고, 중랑구, 성남시, 광주시, 양평군, 이천시, 하남시</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>43,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부2</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부3</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                  </tbody>
                </table>
              </ColoredScrollbars>
              {/* <PageNavigator recordCount={50} className="mt32" /> */}
            </TabCont>
            <TabCont tabTitle="시화 경매장" id="auction-house-3" index={2}>
              <p className="exp-txt">* 단위 (원)</p>
              <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                <caption className="away">탁송료 안내 정보</caption>
                <colgroup>
                  <col width="100px" />
                  <col width="*" />
                  <col width="102px" />
                  <col width="102px" />
                  <col width="102px" />
                </colgroup>
                <thead>
                  <tr>
                    <th>지역</th>
                    <th>시군구</th>
                    <th>4.5톤 미만</th>
                    <th>8톤 미만</th>
                    <th>8톤 이상</th>
                  </tr>
                </thead>
              </table>
              <ColoredScrollbars autoHeightMax={336}>
                <table summary="탁송료 안내 정보" className="table-tp1 th-c td-c">
                  <colgroup>
                    <col width="100px" />
                    <col width="*" />
                    <col width="102px" />
                    <col width="102px" />
                    <col width="102px" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>서울1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울2</td>
                      <td className="tl">마포구, 서대문구, 은평구, 종로구, 중고, 중랑구, 성남시, 광주시, 양평군, 이천시, 하남시</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>43,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부2</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부3</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>서울2</td>
                      <td className="tl">마포구, 서대문구, 은평구, 종로구, 중고, 중랑구, 성남시, 광주시, 양평군, 이천시, 하남시</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부1</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>43,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부2</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>37,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                    <tr>
                      <td>경기동부3</td>
                      <td className="tl">강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                      <td>41,000</td>
                      <td>67,000</td>
                      <td>80,000</td>
                    </tr>
                  </tbody>
                </table>
              </ColoredScrollbars>
              {/* <PageNavigator recordCount={50} className="mt32" /> */}
            </TabCont>
          </TabMenu>
        </div>
      </RodalPopup>
      <RodalPopup show={confirmPopup} type={'fade'} closedHandler={closeConfirmPopup} mode="normal" size="xs">
        <div className="con-wrap">
          {
            isAdd === false
              ? (
                <>
                  <p>입력하신 차량이 저장되었습니다.<br /> 출품 차량을 추가하시겠습니까?</p>
                  <Buttons align="center" marginTop={48}>
                    <Button size="big" background="gray" title="취소" width={130} onClick={handleOpenPopup} />
                    <Button size="big" background="blue80" title="확인" width={130} onClick={handleAdd} />
                  </Buttons>
                </>
              ) : (
                <>
                  <p>다음단계에서 탁송 신청을 진행해주세요.</p>
                  <Buttons align="center" marginTop={48}>
                    <Button size="big" background="blue80" title="확인" width={245} onClick={handleClosePopup} />
                  </Buttons>
                </>
              )
          }

        </div>
      </RodalPopup>

      <RodalPopup show={confirmPopup2} type={'fade'} closedHandler={closeConfirmPopup2} mode="normal" size="xs">
        <div className="con-wrap">
          <p>차량을 삭제하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} onClick={handleClosePopup} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={handleDelete} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(ExhibitStep03);