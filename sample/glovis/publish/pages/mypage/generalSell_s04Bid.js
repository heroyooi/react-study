
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { m_dealer } from '@src/dummy';

const GeneralSell_s04Bid = ({ router }) => {
  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '24시간 실시간 비교견적 입찰현황',
        options: ['back']
      }
    });
    if (result === "no") {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 46,
          color: '#fff'
        }
      });
    } else {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
          color: '#fff'
        }
      });
    }
    
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

          {
            withoutList === true
              ? (
                <>
                  <div className="bidding-inquiry content-border">
                    <ul>
                      <li>남은시간<p className="time tx-blue80 none">입찰종료<br />되었습니다.</p></li>
                      <li>입찰자수<p className="price-tp7">0<span className="won">명</span></p></li>
                      <li>현재 최고가<p className="price-tp7">-<span className="won">만원</span></p></li>
                    </ul>
                  </div>
                  <div className="content-wrap">
                    <h4 className="tit2 mt32">차량 견적</h4>
                    <p className="tx-exp-tp4">판매를 원하는 입찰자를 선택해주세요.</p>
                    <div className="list-none-wrap tp2">
                      <p className="list-none">아쉽게도 입찰한 딜러가 없습니다.<br />다시한번 비교견적 신청해보세요.</p>
                    </div>
                  </div>
                  <Buttons align="center" className="fixed full">
                    <Button size="big" background="blue20" color="blue80" title="판매취소" onClick={handleOpenPop} />
                    <Button size="big" background="blue80" title="다시 견적받기" />
                  </Buttons>
                </>
              ) : (
                <>
                  <div className="bidding-inquiry content-border">
                    <ul>
                      <li>남은시간<p className="time tx-blue80 none">입찰종료<br />되었습니다.</p></li>
                      <li>입찰자수<p className="price-tp7">1,234<span className="won">명</span></p></li>
                      <li>현재 최고가<p className="price-tp7">1,800<span className="won">만원</span></p></li>
                    </ul>
                  </div>

                  <div className="content-wrap">
                    <h4 className="tit2 mt32">차량 견적</h4>
                    <p className="tx-exp-tp4">판매를 원하는 입찰자를 선택해주세요.</p>
                    <RadioGroup
                      dataList={m_dealer}
                      defaultValue={1}
                      mode="vertical"
                      className="m-radio-list mt16"
                    >
                      <RadioItem>
                        <div className="img-cover">
                          <img src="/images/mobile/ico/ico-dealer-none.svg" alt="프로필 없음 이미지" />
                        </div>
                        <div className="tx-wrap">
                          <ul className="dealer">
                            <li>장** 딜러</li>
                            <li>서울</li>
                          </ul>
                          <p className="price-tp5">2,100<span className="won">만원</span></p>
                          <Link href="#"><a>딜러소개</a></Link>
                          <p className="star"><i className="ico-fill-star black"></i> 4.2</p>
                        </div>
                      </RadioItem>
                      <RadioItem>
                        <div className="img-cover">
                          <img src="/images/mobile/ico/ico-dealer-none.svg" alt="프로필 없음 이미지" />
                        </div>
                        <div className="tx-wrap">
                          <ul className="dealer">
                            <li>장** 딜러</li>
                            <li>서울</li>
                          </ul>
                          <p className="price-tp5">2,100<span className="won">만원</span></p>
                          <Link href="#"><a>딜러소개</a></Link>
                          <p className="star"><i className="ico-fill-star black"></i> 4.2</p>
                        </div>
                      </RadioItem>
                      <RadioItem>
                        <div className="img-cover">
                          <img src="/images/mobile/ico/ico-dealer-none.svg" alt="프로필 없음 이미지" />
                        </div>
                        <div className="tx-wrap">
                          <ul className="dealer">
                            <li>장** 딜러</li>
                            <li>서울</li>
                          </ul>
                          <p className="price-tp5">2,100<span className="won">만원</span></p>
                          <Link href="#"><a>딜러소개</a></Link>
                          <p className="star"><i className="ico-fill-star black"></i> 4.2</p>
                        </div>
                      </RadioItem>
                    </RadioGroup>
                  </div>

                  {/* 딜러 선택 전 버튼 */}
                  <Buttons align="center" className="fixed full">
                    <Button size="big" background="blue20" color="blue80" title="판매취소" onClick={handleOpenPop} />
                    <Button size="big" background="blue80" title="판매진행" />
                  </Buttons>

                  {/* 딜러 선택 후 버튼 */}
                  {/* <Buttons align="center" className="fixed">
                    <Button size="full" background="blue20" color="blue80" radius={true} title="딜러 선택이 완료되었습니다." />
                  </Buttons> */}
                </>
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

export default withRouter(GeneralSell_s04Bid);
