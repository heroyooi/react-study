import { useState, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import PageNavigator from '@src/components/common/PageNavigator';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MypageFilterSelect from '@src/components/common/MypageFilterSelect';
import MobFilterModel from '@src/components/common/MobFilterModel';
import DatePicker from '@src/components/common/calendar/DatePicker';
import SelectBox from '@lib/share/items/SelectBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { DealerContext } from '@pages/mypage/dealerSell01';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { MOBILE_FULLPAGE_POPUP } from '@src/actions/types';

const MypageManageList5 = () => {
  const now = moment();

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const dispatch = useDispatch();
  if (hasMobile) {
    const { withoutList, fpFilter01, handleFullpagePopup } = useContext(DealerContext);

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

    const createBodyPortal1 = useCreatePortalInBody(null, "wrap");
    const createBodyPortal2 = useCreatePortalInBody(null, "wrap");
    const createBodyPortal3 = useCreatePortalInBody(null, "wrap");

    const [viewFilter, setViewFilter] = useState(1);
    const handleFilter = useCallback(filter => e => {
      e.preventDefault();
      setViewFilter(filter === "sales_completed" ? 1 : 2);
    }, [viewFilter]);

    return (
      <>
        <div className="register-admin-sec">
          <div className="float-wrap btn-s">
            <h3 className="tit2">판매완료 차량</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="상세조회" width={61} onClick={handleOpenPop} />
          </div>

          <ul className="admin-list-wrap">
            <li>
              {withoutList ? (
                <div className="list-none-wrap">
                  <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
                </div>
              ) : (
                <>
                <div>
                  <ul className="date tx-black mb20">
                    <li>총 <span className="tx-blue80">123</span>건</li>
                    <li>&nbsp;(2017.02.08 ~ 2017.05.07)</li>
                  </ul>
                </div>
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
                            <div className="price-wrap">
                              <div className="price-left">
                                <p className="price-tp2">7,760<span className="won">만원</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <ul className="car-date-wrap">
                        <li>등록일 : 2019.00.00</li>
                        <li>판매일 : 2019.00.00</li>
                        <li>소요일 : <span className="tx-blue80">00</span></li>
                      </ul>
                    </li>
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
                            <div className="price-wrap">
                              <div className="price-left">
                                <p className="price-tp2">7,760<span className="won">만원</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <ul className="car-date-wrap">
                        <li>등록일 : 2019.00.00</li>
                        <li>판매일 : 2019.00.00</li>
                        <li>소요일 : <span className="tx-blue80">00</span></li>
                      </ul>
                    </li>
                  </ul>
                </div>
                </>
              )}
            </li>
          </ul>
        </div>

        {createBodyPortal1(<div className={dimm ? "modal-bg v-2 active" : "modal-bg v-2"} onClick={handleCloseDimm}></div>)}
        {createBodyPortal2(<MobBottomArea active={active} isFixButton={true} zid={101}>
          <div className="inner pb7">
            <h3 className="tit1 pb7">상세조회</h3>
            <ul className="m-menu-list tp1">
              <li onClick={handleFullpagePopup("f1")}>
                <div className="sel-wrap">
                  <span className="tit">제조사/모델</span>
                </div>
              </li>
              <li className="btn-wrap">
                <span className="tit">구분</span>
                <Buttons align="center">
                  <Button
                    size="mid"
                    background={viewFilter === 1 ? "blue80" : null}
                    line={viewFilter === 2 ? "gray" : null}
                    color={viewFilter === 2 ? "gray" : null}
                    radius={true}
                    title="판매완료신고일순"
                    width={48}
                    height={38}
                    measure={'%'}
                    onClick={handleFilter("sales_completed")}
                  />
                  <Button
                    size="mid"
                    background={viewFilter === 2 ? "blue80" : null}
                    line={viewFilter === 1 ? "gray" : null}
                    color={viewFilter === 1 ? "gray" : null}
                    radius={true}
                    title="등록일순"
                    width={48}
                    height={38}
                    marginLeft={4}
                    measure={'%'}
                    mgMeasure={'%'}
                    onClick={handleFilter("register")}
                  />
                </Buttons>
                <Buttons align="center" marginTop={9}>
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="15일" width={23} measure={'%'} height={30} />
                  <Button size="sml" line="gray" color="gray" radius={true} title="1개월" width={23} measure={'%'} height={30} marginLeft={2.5} mgMeasure={'%'} />
                  <Button size="sml" line="gray" color="gray" radius={true} title="3개월" width={23} measure={'%'} height={30} marginLeft={2.5} mgMeasure={'%'} />
                  <Button size="sml" line="gray" color="gray" radius={true} title="6개월" width={23} measure={'%'} height={30} marginLeft={2.5} mgMeasure={'%'} />
                </Buttons>
                <div className="step-btn mt8">
                  <DatePicker defaultValue={now} width='46%' disabled={true} />
                  <em className="from">~</em>
                  <DatePicker defaultValue={now} width='46%' disabled={true} />
                </div>
              </li>
            </ul>
          </div>
          <Button className="fixed" size="full" background="blue80" title="조회" />
        </MobBottomArea>)}
        {createBodyPortal3(
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
          {fpFilter01 && (<><MobFilterModel hiddenTab={[2]} /><Button className="fixed" size="full" background="blue80" title="전체선택" /></>)}
        </MobFullpagePopup>
        )}
      </>
    )
  }
  return (
    <div className="register-admin-sec standby-car-sec">
      <MypageFilterSelect />
      <table className="table-tp1 input search" summary="조회 영역">
        <caption className="away">조회 영역</caption>
        <tbody>
          <tr>
            <th>판매완료일</th>
            <td>
              <DatePicker defaultValue={now} inputWidth={152} inputHeight={40} />
              <em className="mg8">-</em>
              <DatePicker defaultValue={now} inputWidth={152} inputHeight={40} />
              <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={8} />
              <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
              <Button size="mid" line="gray" color="black" title="15일" width={50} height={40} marginLeft={8} />
              <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
              <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
              <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} />
            </td>
          </tr>
          <tr>
            <th></th>
            <td><p className="tx-exp-tp6">(* 최대 1년까지 조회 가능합니다.)</p></td>
          </tr>
        </tbody>
      </table>
      <ul className="float-wrap">
        <li><p className="inquire-num">판매완료차량 : 총 15대</p></li>
        <li>
          <SelectBox id="select1" className="items-sbox" options={[
            { value: '1', label: '판매완료 신고일순' },
            { value: '2', label: '등록일순' }
          ]} width={176} height={40} placeHolder="판매완료 신고일순" />
        </li>
      </ul>
      <ul className="prepare-img-list">
        <li>
          <div className="admin-list tp2">
            <div className="content-top">
              <div className="img-cover">
                <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
              </div>
              <div className="summary">
                <h5 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h5>
                <ul className="info">
                  <li>00가0000</li>
                  <li>09/12식(10년형)</li>
                  <li>84,761km</li>
                  <li>오토</li>
                  <li>디젤</li>
                </ul>
                <p className="product-name">대당이용권, 자동업데이트</p>
              </div>
              <p className="price-tp7"><em>낙찰금액</em>3,475<span className="won">만원</span></p>
              <ul className="numerical">
                <li><i className="ico-dot sml"></i>등록일<span>209-08-08</span></li>
                <li><i className="ico-dot sml"></i>판매일<span>2019-09-23</span></li>
                <li><i className="ico-dot sml"></i>소요일<span>48일</span></li>
              </ul>
            </div>
          </div>
        </li>

        <li>
          <div className="admin-list tp2">
            <div className="content-top">
              <div className="img-cover">
                <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
              </div>
              <div className="summary">
                <h5 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h5>
                <ul className="info">
                  <li>00가0000</li>
                  <li>09/12식(10년형)</li>
                  <li>84,761km</li>
                  <li>오토</li>
                  <li>디젤</li>
                </ul>
                <p className="product-name">대당이용권, 자동업데이트</p>
              </div>
              <p className="price-tp7"><em>낙찰금액</em>3,475<span className="won">만원</span></p>
              <ul className="numerical">
                <li><i className="ico-dot sml"></i>등록일<span>209-08-08</span></li>
                <li><i className="ico-dot sml"></i>판매일<span>2019-09-23</span></li>
                <li><i className="ico-dot sml"></i>소요일<span>48일</span></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <PageNavigator recordCount={50} className="mt32" />
    </div>
  )
}

export default MypageManageList5;