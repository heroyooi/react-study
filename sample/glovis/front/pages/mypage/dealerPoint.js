import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import DatePicker from '@src/components/common/calendar/DatePicker';
import moment from 'moment';
// eslint-disable-next-line camelcase
import { select1_list } from '@src/dummy';

const DealerSell13 = () => {
  const now = moment();
  // 팝업
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  return (
    <AppLayout>
      <div className="content-sec">
        <MypageNavi />

        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false}>
            <TabCont tabTitle="Ponit" id="tab1-1" index={0}>
              <div className="point-current">
                <p className="tit">보유포인트</p>
                <p className="exp">
                  P 12,000
                  <p className="tx-exp-tp4">7일 내 만료예정 포인트: 10,000</p>
                </p>
              </div>
              <div className="point-tx-list">
                <ul className="inquire-filter">
                  <li>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                  </li>
                  <li className="period-mark">~</li>
                  <li>
                    <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                  </li>
                  <li>
                    <Button size="mid" background="blue80" title="조회" width="114" height="40" />
                  </li>
                  <li>
                    <SelectBox id="select1" className="items-sbox" options={select1_list} width={176} height={40} placeHolder="등록순" />
                  </li>
                </ul>
                <table className="table-tp1 th-c td-c" summary="보유포인트에 대한 내용">
                  <caption className="away">보유포인트</caption>
                  <colgroup>
                    <col width="8%" />
                    <col width="13%" />
                    <col width="32%" />
                    <col width="13%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="13%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>구분</th>
                      <th>일자</th>
                      <th>내역</th>
                      <th>유효기간</th>
                      <th>적립포인트</th>
                      <th>사용포인트</th>
                      <th>잔여포인트</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>지급</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>사용</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>-</td>
                      <td>1,000</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>회수</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>만료</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>지급</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>사용</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>-</td>
                      <td>1,000</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>회수</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>만료</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>지급</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>사용</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>-</td>
                      <td>1,000</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>회수</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>만료</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>사용</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>-</td>
                      <td>1,000</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>회수</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                    <tr>
                      <td>만료</td>
                      <td>2019-09-16</td>
                      <td>31~60일 이내 판매신고 시 1,000 P</td>
                      <td>2019-09-16</td>
                      <td>1,000</td>
                      <td>-</td>
                      <td>55,000</td>
                    </tr>
                  </tbody>
                </table>
                <ul className="pagination tp2">
                  <li>
                    <a href="#">
                      <i></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li>
                    <a href="#">4</a>
                  </li>
                  <li>
                    <a href="#">5</a>
                  </li>
                  <li>
                    <a href="#">
                      <i></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i></i>
                    </a>
                  </li>
                </ul>
              </div>
              {/* <div className="point-tx-list">
                <ul className="inquire-filter">
                  <li><DatePicker defaultValue={now} inputWidth={160} inputHeight={40} /></li>
                  <li className="period-mark">~</li>
                  <li><DatePicker defaultValue={now} inputWidth={160} inputHeight={40} /></li>
                  <li>
                    <Button size="mid" background="blue80" title="조회" width="114" height="40" />
                  </li>
                  <li>
                    <SelectBox id="select1" className="items-sbox" options={select1_list} width={176} height={40} placeHolder="등록순" />
                  </li>
                </ul>
                <table className="table-tp1 th-c td-c" summary="보유포인트에 대한 내용">
                  <caption className="away">보유포인트</caption>
                  <colgroup>
                    <col width="8%" />
                    <col width="13%" />
                    <col width="32%" />
                    <col width="13%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="13%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>구분</th>
                      <th>일자</th>
                      <th>내역</th>
                      <th>유효기간</th>
                      <th>적립포인트</th>
                      <th>사용포인트</th>
                      <th>잔여포인트</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="7" className="list-state-none">포인트 내역이 없습니다.<br />(문의:000-0000-0000)</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
            </TabCont>
            <TabCont tabTitle="쿠폰" id="tab1-2" index={1}>
              <div className="coupon-current">
                <TabMenu type="type6" defaultTab={0} mount={false}>
                  <TabCont tabTitle="사용가능한 쿠폰" id="tab6-1" index={0}>
                    <div className="coupon-tx-list">
                      <ul className="inquire-filter mix">
                        <li>
                          <p className="inquire-num">총 보유 쿠폰 수 00개 (00일 내 만료 예정 쿠폰: 00개)</p>
                        </li>
                        <li>
                          <Button size="mid" background="blue80" radius={true} title="+ 쿠폰등록" width="131" onClick={(e) => rodalPopupHandler(e, 'fade')} />
                        </li>
                      </ul>
                      <table className="table-tp1 th-c td-c" summary="사용가능한 쿠폰에 대한 내용">
                        <caption className="away">사용가능한 쿠폰</caption>
                        <colgroup>
                          <col width="24%" />
                          <col width="16%" />
                          <col width="30%" />
                          <col width="30%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>구분</th>
                            <th>등록일</th>
                            <th>쿠폰명</th>
                            <th>유효기간</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                      <ul className="pagination tp2">
                        <li>
                          <a href="#">
                            <i></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">4</a>
                        </li>
                        <li>
                          <a href="#">5</a>
                        </li>
                        <li>
                          <a href="#">
                            <i></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="coupon-tx-list">
                      <p className="inquire-num">총 보유 쿠폰 수 00개 (00일 내 만료 예정 쿠폰: 00개)</p>
                      <table className="table-tp1 th-c td-c" summary="사용가능한 쿠폰에 대한 내용">
                        <caption className="away">사용가능한 쿠폰</caption>
                        <colgroup>
                          <col width="24%" />
                          <col width="16%" />
                          <col width="30%" />
                          <col width="30%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>구분</th>
                            <th>등록일</th>
                            <th>쿠폰명</th>
                            <th>유효기간</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td colSpan="4" className="list-state-none">쿠폰 내역이 없습니다.<br />(문의:000-0000-0000)</td>
                            </tr>
                        </tbody>
                      </table>
                    </div> */}
                  </TabCont>
                  <TabCont tabTitle="사용 및 만료 쿠폰" id="tab6-2" index={1}>
                    <div className="coupon-tx-list">
                      <p className="inquire-num">총 사용(만료) 00개</p>
                      <table className="table-tp1 th-c td-c" summary="사용가능한 쿠폰에 대한 내용">
                        <caption className="away">사용가능한 쿠폰</caption>
                        <colgroup>
                          <col width="14%" />
                          <col width="14%" />
                          <col width="22%" />
                          <col width="16%" />
                          <col width="16%" />
                          <col width="18%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>구분</th>
                            <th>등록일</th>
                            <th>쿠폰명</th>
                            <th>사용일</th>
                            <th>사용내역</th>
                            <th>유효기간</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                      <ul className="pagination tp2">
                        <li>
                          <a href="#">
                            <i></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">4</a>
                        </li>
                        <li>
                          <a href="#">5</a>
                        </li>
                        <li>
                          <a href="#">
                            <i></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="coupon-tx-list">
                      <p className="inquire-num">총 사용(만료) 00개</p>
                      <table className="table-tp1 th-c td-c" summary="사용가능한 쿠폰에 대한 내용">
                        <caption className="away">사용가능한 쿠폰</caption>
                        <colgroup>
                          <col width="14%" />
                          <col width="14%" />
                          <col width="22%" />
                          <col width="16%" />
                          <col width="16%" />
                          <col width="18%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>구분</th>
                            <th>등록일</th>
                            <th>쿠폰명</th>
                            <th>사용일</th>
                            <th>사용내역</th>
                            <th>유효기간</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="6" className="list-state-none">사용 및 만료 쿠폰 내역이 없습니다.<br />(문의:000-0000-0000)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div> */}
                  </TabCont>
                </TabMenu>
              </div>
            </TabCont>
          </TabMenu>
        </div>
      </div>
      <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} title="쿠폰등록" mode="normal" size="small">
        <div className="con-wrap popup-coupon">
          <label htmlFor="coupon-num">쿠폰번호</label>
          <span className="bridge">
            <Input type="text" placeHolder="예) 030480293-2348" id="coupon-num" width={259} height={48} />
          </span>
          <Button size="big" background="blue80" title="조회" width="119" />
          {/* <div className="none-coupon">
            조회되는 쿠폰이 없습니다.
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} />
            <Button size="big" background="light-gray" title="등록" width={127} />
          </Buttons> */}
          {/* <div className="have-coupon">
            쿠폰명:  [쿠폰명 노출]<br />
            유효기간: ~0000-00-00까지
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} />
            <Button size="big" background="blue80" title="등록" width={127} />
          </Buttons> */}
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default DealerSell13;
