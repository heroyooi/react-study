import React, { useCallback, useState } from 'react';
import { isEmpty } from 'lodash';
import Slider from 'react-slick';
import ImgCover from '@lib/share/items/ImgCover';
import StarScore from '@lib/share/items/StarScore';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Link from 'next/link';
// import e from 'express';

const SelfDealerInfoPopup = ({ dealer = {} }) => {
  const [bidderInfoShow2, setBiddersInfoShow2, bidderInfoPopupHandler2, bidderInfoCloseHandler2] = useRodal(false);
  const PrevArrow = useCallback(({ onClick }) => <button className="btn-arrow-prev-mid" onClick={onClick}></button>, []);
  const NextArrow = useCallback(({ onClick }) => <button className="btn-arrow-next-mid" onClick={onClick}></button>, []);
  const [review, setReview] = useState({});
  const settings = {
    dots: false,
    infinite: true,
    draggable: false,
    touchMove: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };
  const handleClick = (reviewId) => {
    console.log('reviewId', reviewId);
    dealer.dealerReviewList.forEach((r) => {
      if (r.reviewId === reviewId) {
        setReview(r);
      }
    });
    // if (onClick) onClick();
    setBiddersInfoShow2(true);
  };

  return (
    <>
      <div className="con-wrap popup-bidder-info">
        <div className="person-img-info">
          <div className="person-info">
            <div className="img-wrap">
              <img src={dealer.profUrl} alt="입찰자 이미지" />
            </div>
            <table summary="판매 차량에 대한 내용" className="table-tp1 th-c">
              <caption className="sml">{dealer.name} 딜러</caption>
              <colgroup>
                <col width="20%" />
                <col width="80%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td>{dealer.addr}</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>
                    {dealer.tel}
                    {/* 010-****-***<em>(연락처는 딜러 선택 후 공개)</em> */}
                  </td>
                </tr>
                <tr>
                  <th>주력정보</th>
                  <td>{dealer.tags}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="introduce">
          <p dangerouslySetInnerHTML={{ __html: dealer.intro }} />
        </div>
        <table summary="셀프평가 참여 현황에 대한 내용" className="table-tp1 th-c td-c">
          <caption className="mt64">셀프평가 참여 현황</caption>
          <colgroup>
            <col width="16.66%" />
            <col width="16.66%" />
            <col width="16.66%" />
            <col width="16.66%" />
            <col width="16.66%" />
            <col width="16.66%" />
          </colgroup>
          <tbody>
            <tr>
              <th>총 입찰 대수</th>
              <td>{dealer.totalBiddsCnt}대</td>
              <th>총 낙찰 대수</th>
              <td>{isEmpty(dealer.totalSuccBiddsCnt) ? 0 : dealer.totalSuccBiddsCnt}대</td>
              <th>성사율</th>
              <td>{dealer.succRate}%</td>
            </tr>
            <tr>
              <th>평가등급</th>
              <td colSpan="5">
                <StarScore grade={parseInt(dealer.pointRate)} /> <span>({dealer.pointRate}/5.0)</span>
              </td>
            </tr>
            <tr>
              <th rowSpan="3">만족도</th>
              <th>가격만족</th>
              <td colSpan="4">{dealer.pricePointRate}</td>
            </tr>
            <tr>
              <th>서비스</th>
              <td colSpan="4">{dealer.servicePointRate}</td>
            </tr>
            <tr>
              <th>추천여부</th>
              <td colSpan="4">{dealer.recommPointRate}</td>
            </tr>
          </tbody>
        </table>
        {!isEmpty(dealer.userReviewList) && (
        <div className="review-wrap">
          <h5>고객이용후기</h5>
            <div className="review-slide">
              <Slider {...settings}>
                {dealer.userReviewList.map((v, i) => {
                  return (
                    <div className="inner" key={i}>
                      <div className="content">
                        <p>{v.crNm}</p>
                        <span className="gpa">
                          <StarScore grade={v.point} />
                        </span>
                        <span>{v.desc}</span>
                      </div>
                      <div className="user">
                        <p>{v.customerNm} 고객님</p>
                        <span>{v.regDt}</span>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
        </div>
        )}
        {!isEmpty(dealer.dealerReviewList) && (
        <div className="review-wrap dealer">
          <h5>딜러거래 후기</h5>
            <div className="review-slide">
              <Slider {...settings}>
                {dealer.dealerReviewList.map((v, i) => {
                  return (
                    <div className="inner" key={i}>
                      <ImgCover src={v.phtUrl} alt="딜러거래 후기 차량 이미지" />
                      <div className="summary">
                        <h5 className="subject">
                          <Link href="#">
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleClick(v.reviewId);
                              }}
                              dangerouslySetInnerHTML={{ __html: v.title }}
                            />
                          </Link>
                        </h5>
                        <div className="info">{v.crNm}</div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
        </div>
        )}
      </div>
      <RodalPopup show={bidderInfoShow2} type={'slideUp'} closedHandler={bidderInfoCloseHandler2} mode="normal" title="딜러거래 후기" size="large" subPop={true}>
        <div className="con-wrap popup-review-view ">
          <div className="view-wrap">
            <div className="img-cover">
              <img src={review.phtUrl} alt="딜러거래 후기 차량 이미지" />
            </div>
            <div className="review-con">
              <h5 className="subject" dangerouslySetInnerHTML={{ __html: review.title }} />
              <div className="info">
                차량명 : {review.crNm}
                <br />
                작성일자 : {review.regDt}
              </div>
            </div>
          </div>
          <div className="review-tx">{review.desc}</div>
          <ul className="img-wrap">
            {!isEmpty(review.phtList) &&
              review.phtList.map((v, idx) => (
                <li className="img-cover" key={idx}>
                  <img src={v} alt="딜러거래 후기 차량 이미지" />
                </li>
              ))}
          </ul>
          <Buttons align="center" marginTop={48}>
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={172}
              height={60}
              onClick={(e) => {
                e.preventDefault();
                bidderInfoCloseHandler2(false);
              }}
            />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
};

export default SelfDealerInfoPopup;
