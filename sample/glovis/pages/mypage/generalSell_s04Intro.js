
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import StarScore from '@lib/share/items/StarScore';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';
import { m_dealer } from '@src/dummy';

const GeneralSell_s04Intro = ({ router }) => {
  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '딜러소개',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    const [fpCounsel, setFpCounsel] = useState(false);
    const handleFullpagePopup = useCallback((name) => (e) => {
      e.preventDefault();
      if (name === "counsel") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '딜러 거래후기',
            options: ['close']
          }
        });
        setFpCounsel(true)
      }
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, [fpCounsel]);

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
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    return (
      <AppLayout>
        <div className="general-sell-sec">
          <div className="seller-wrap">
            <div className="profile">
              <div className="img-wrap">
                <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />
              </div>
              <div className="tx-wrap">
                <h2>김현대 딜러</h2>
                <p>010-****-****</p>
                <ul className="employee-card">
                  <li>서울 강서구</li>
                </ul>
                <span className="tx-blue80">연락처는 딜러 선택 후 공개됩니다.</span>
              </div>
            </div>
            <div className="introduce-wrap mt16">
              <p><span>#수입전문 #BMW #5시리즈 #최고가</span>안녕하세요. 오토벨 인증 딜러 장현대 입니다.<br />항상 신념과 믿음으로 함께하는 진실된 장현대  딜러가 되겠습니다.</p>
            </div>
          </div>

          {
            withoutList === true
              ? (
                <TabMenu type="type2" defaultTab={0} mount={false}>
                  <TabCont tabTitle="참여 현황" id="tab2-1" index={0}>
                    <div className="list-none-wrap tp2">
                      <p className="list-none">셀프평가 참여 이력이 없습니다.</p>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="이용 후기" id="tab2-2" index={1}>
                    <div className="list-none-wrap tp2">
                      <p className="list-none">등록된 후기가 없습니다.</p>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="거래 후기" id="tab2-3" index={2}>
                    <div className="list-none-wrap tp2">
                      <p className="list-none">등록된 후기가 없습니다.</p>
                    </div>
                  </TabCont>
                </TabMenu>
              ) : (
                <TabMenu type="type2" defaultTab={0} mount={false}>
                  <TabCont tabTitle="참여 현황" id="tab2-1" index={0}>
                    <table summary="셀프평가 이용현황에 관한 내용" className="table-tp1 th-c td-c">
                      <caption className="away">셀프평가 이용현황</caption>
                      <colgroup>
                        <col width="35%" />
                        <col width="65%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th colSpan="2">평가등급</th>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <ul className="star-wrap">
                              <li><span className="start-group"><StarScore grade={4.2} /></span><span className="score-txt">4.2</span></li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <th colSpan="2">만족도</th>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <ul className="star-wrap">
                              <li><span className="score-tit">가격</span><span className="start-group"><StarScore grade={4.5} /></span><span className="score-txt">4.5</span></li>
                              <li><span className="score-tit">서비스</span><span className="start-group"><StarScore grade={2.5} /></span><span className="score-txt">2.5</span></li>
                              <li><span className="score-tit">추천의향</span><span className="start-group"><StarScore grade={4.2} /></span><span className="score-txt">4.2</span></li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="bidding-inquiry">
                      <ul>
                        <li>총 입찰 대수<p className="price-tp7">200<span className="won">대</span></p></li>
                        <li>총 낙찰 대수<p className="price-tp7">200<span className="won">대</span></p></li>
                        <li>성사율(%)<p className="price-tp7">15</p></li>
                      </ul>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="이용 후기" id="tab2-2" index={1}>
                    <div className="review-wrap">
                      <p className="inquire-num">총<span> 2</span>건</p>
                      <div className="inner">
                        <p>기아 그랜드카니발 GLX 11인승 GLX 11인승</p>
                        <div className="float-wrap">
                          <ul>
                            <li>2019.12.04</li>
                            <li>김*대 고객님</li>
                          </ul>
                          <p className="star"><i className="ico-fill-star"></i> 4.2</p>
                        </div>
                        <span>쉐보레 스파크 차량을 구매하려고 두 곳의 딜러들과 만나고 차를 샀는데 자신이 팔고있는 차를 사게하려는 압박이 느껴지지 않고 차량 구매 전 후의 친절함과 차량에 대한 어떤 기능 절차 등 여러가지 정보를 알려주셔서 좋았다.</span>
                      </div>
                      <div className="inner">
                        <p>기아 그랜드카니발 GLX 11인승 GLX 11인승</p>
                        <div className="float-wrap">
                          <ul>
                            <li>2019.12.04</li>
                            <li>김*대 고객님</li>
                          </ul>
                          <p className="star"><i className="ico-fill-star"></i> 4.2</p>
                        </div>
                        <span>최고의 가격과 최고의 서비스를 받았습니다. 최고의 가격과 최고의 서비스를 받았습니다. 최고의 가격과 최고의 서비스를 받았습니다.</span>
                      </div>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="거래 후기" id="tab2-3" index={2}>
                    <div className="review-wrap">
                      <p className="inquire-num">총<span> 2</span>건</p>
                      <div className="inner">
                        <div className="img-cover">
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <span className="date">2019.12.04</span>
                          <h5 className="subject">BMW시리즈 (F10) 520 xDrive</h5>
                          <div className="info">강원도 춘천에서 그렌저IG 매입한 후기</div>
                          <Link href="/mypage/generalSell_s04Review"><a>더 보기</a></Link>
                        </div>
                      </div>
                      <div className="inner">
                        <div className="img-cover">
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <span className="date">2019.12.04</span>
                          <h5 className="subject">BMW시리즈 (F10) 520 xDrive</h5>
                          <div className="info">강원도 춘천에서 그렌저IG 매입한 후기</div>
                          <Link href="/mypage/generalSell_s04Review"><a>더 보기</a></Link>
                        </div>
                      </div>
                    </div>
                  </TabCont>
                </TabMenu>
              )
          }
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

            <p className="tx-tit mt24 mb8">기타사유<em>(선택)</em></p>
            <Textarea countLimit={200} type="tp1" height={133} placeHolder="기타 사유를 작성해주세요." />
          </div>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" />
            <Button size="big" background="blue80" title="확인" />
          </Buttons>
        </MobBottomArea>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={24}>
          {fpCounsel && <MobDealReview />}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default withRouter(GeneralSell_s04Intro);
