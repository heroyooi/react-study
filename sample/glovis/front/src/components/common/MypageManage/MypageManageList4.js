
import PageNavigator from '@src/components/common/PageNavigator';
import MypageFilterSelect from '@src/components/common/MypageManage/MypageFilterSelect';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { select1_list } from '@src/dummy';

const MypageManageList4 = () => {
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);
  const [rodalShow2_1, setRodalShow2_1, rodalPopupHandler2_1, modalCloseHandler2_1] = useRodal(false, true);
  const [rodalShow2_2, setRodalShow2_2, rodalPopupHandler2_2, modalCloseHandler2_2] = useRodal(false, true);
  const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false, true);

  return (
    <>
      <div className="register-admin-sec standby-car-sec">
        <MypageFilterSelect />

        <TabMenu type="type9" defaultTab={0} >
          <TabCont id="tab9-1" tabTitle="전체 12" index={0}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-blue80">경매낙찰차량</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="낙찰차량 보내기" width={100} marginTop={8} onClick={(e) => rodalPopupHandler2(e, "fade")}/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">등록진행중차량</span>
                      <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>3,475<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="등록진행" width={100} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-green">프랜차이즈</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="보낸사람 보기" width={100}  onClick={(e) => rodalPopupHandler3(e, "fade")}/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-blue80">Live Studio</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="재촬영신청" width={100} marginTop={8} onClick={(e) => rodalPopupHandler(e, "fade")}/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-2" tabTitle="낙찰차량 1" index={1}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-blue80">경매낙찰차량</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="재촬영신청" width={100} marginTop={8} onClick={(e) => rodalPopupHandler(e, "fade")}/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-3" tabTitle="등록진행중 1" index={2}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">등록진행중차량</span>
                      <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>3,475<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="등록진행" width={100} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-4" tabTitle="Live Studio 1" index={3}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-blue80">Live Studio</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>1,890<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="재촬영신청" width={100} marginTop={8} onClick={(e) => rodalPopupHandler(e, "fade")}/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
          <TabCont id="tab9-5" tabTitle="Live Shot 1" index={4}>
            Content5
          </TabCont>
          <TabCont id="tab9-6" tabTitle="받은차량 2" index={5}>
            Content6
          </TabCont>
          <TabCont id="tab9-7" tabTitle="보류차량 1" index={6}>
            Content7
          </TabCont>
          <TabCont id="tab9-8" tabTitle="프랜차이즈 5" index={7}>
            <ul className="prepare-img-list">
              <li>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-green">프랜차이즈</span>
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <PageNavigator recordCount={50} className="mt32" />
          </TabCont>
        </TabMenu>
      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs">
      <div className="con-wrap">
        <p>해당 차량의 재촬영을 신청하시겠습니까?</p>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="gray" title="취소" width={130} />
          <Button size="big" background="blue80" title="확인" width={130} onClick={(e) => rodalPopupHandler1(e, "fade")}/>
        </Buttons>
      </div>
      </RodalPopup>
      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} mode="normal" size="xs">
        <div className="con-wrap">
          <p>재촬영 신청이 접수되었습니다.<br />고객센터에서 확인 후 연락드리겠습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} mode="normal" size="small" title="낙찰차량 보내기">
        <div className="con-wrap popup-bid-send">
          <table summary="차량정보에 대한 내용" className="table-tp1">
            <caption>차량정보</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량명</th>
                <td>현대 투싼 ix 디젤 2WD LX20 럭셔리</td>
              </tr>
              <tr>
                <th>차량번호</th>
                <td>00가1234</td>
              </tr>
              <tr>
                <th>년식</th>
                <td>09/12식 (10년형)</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>84,761km</td>
              </tr>
              <tr>
                <th>변속기</th>
                <td>오토</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>디젤</td>
              </tr>
            </tbody>
          </table>
          <ul className="dot-wrap">
            <li><i className="ico-dot sml"></i><span>낙찰 받은 날짜</span><strong>2019.12.10</strong></li>
            <li><i className="ico-dot sml"></i><span>낙찰 금액</span><strong>2,060<span>만원</span></strong></li>
          </ul>
          <form>
            <fieldset>
              <legend>받는사람</legend>
              <SelectBox id="select1" className="items-sbox mr8" options={select1_list} width={168} height={40}/>
              <Input type="text" placeHolder="" width={346} height={40} />
            </fieldset>
          </form>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} onClick={(e) => rodalPopupHandler2_1(e, "fade")}/>
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow2_1} type={'fade'} closedHandler={modalCloseHandler2_1} mode="normal" size="xs">
        <div className="con-wrap">
          <p>한 번 보낸 차량은 다시 회수가 안됩니다.<br />차량을 보내시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={(e) => rodalPopupHandler2_2(e, "fade")}/>
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow2_2} type={'fade'} closedHandler={modalCloseHandler2_2} mode="normal" size="xs">
        <div className="con-wrap">
          <p>차량 보내기를 완료하였습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} mode="normal" size="xs">
        <div className="con-wrap send-person">
          <ul className="dot-wrap">
            <li><i className="ico-dot sml"></i><span>보낸 사람</span><strong>강기아</strong></li>
            <li><i className="ico-dot sml"></i><span>받은 일시</span><strong>2019.12.10</strong></li>
          </ul>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  )
}

export default MypageManageList4;