import { useCallback } from 'react';
import Slider from 'react-slick';
import ImgCover from '@lib/share/items/ImgCover';
import StarScore from '@lib/share/items/StarScore';

const BidderInfo = ({onClick}) => {
    const PrevArrow = useCallback(({ onClick }) => <button className="btn-arrow-prev-mid" onClick={onClick}></button>, []);
    const NextArrow = useCallback(({ onClick }) => <button className="btn-arrow-next-mid" onClick={onClick}></button>, []);
    const settings = {
        dots: false,
        infinite: true,
        draggable: false,
        touchMove: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    }
    const handleClick = () => {
      if (onClick) onClick();
    }
    return (
        <div className="con-wrap popup-bidder-info">
            <div className="person-img-info">
                <div className="person-info">
                    <div className="img-wrap">
                    <img src="/images/dummy/bidder-img.png" alt="입찰자 이미지" />
                    </div>
                    <table summary="판매 차량에 대한 내용" className="table-tp1 th-c">
                        <caption className="sml">장현대 딜러</caption>
                        <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>지역</th>
                                <td>서울 강서구</td>
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td>010-****-***<em>(연락처는 딜러 선택 후 공개)</em></td>
                            </tr>
                            <tr>
                                <th>주력정보</th>
                                <td>#수입전문 #BMW #5시리즈</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="introduce">
              <p>안녕하세요. 오토벨 인증 딜러 장현대 입니다.<br />항상 신념과 믿음으로 함께하는 진실된 장현대  딜러가 되겠습니다.<br />항상 신념과 믿음으로 함께하는 진실된 장현대  딜러가 되겠습니다.</p>
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
                        <td>20대</td>
                        <th>총 낙찰 대수</th>
                        <td>30대</td>
                        <th>성사율</th>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <th>평가등급</th>
                        <td colSpan="5"><StarScore grade={4.2} /> <span>(4.2/5.0)</span></td>
                    </tr>
                    <tr>
                        <th rowSpan="3">만족도</th>
                        <th>가격만족</th>
                        <td colSpan="4">3.58</td>
                    </tr>
                    <tr>
                        <th>서비스</th>
                        <td colSpan="4">4.8</td>
                    </tr>
                    <tr>
                        <th>추천여부</th>
                        <td colSpan="4">4.5</td>
                    </tr>
                </tbody>
            </table>
            <div className="review-wrap">
                <h5>고객이용후기</h5>
                <div className="review-slide">
                    <Slider {...settings}>
                        {Array(3*3).fill().map((v,i) => {
                            return (
                                <div className="inner" key={i}>
                                    <div className="content">
                                        <p>기아 그랜드카니발 GLX 11인승<br />GLX 11인승</p>
                                        <span className="gpa"><StarScore /></span>
                                        <span>최고의 가격과 최고의 서비스를 받았습니다. 최고의 가격과 최고의 서비스를 받았습니다. 최고의 가격과 최고의 서비스를 받았습니다.</span>
                                    </div>
                                    <div className="user">
                                        <p>김*광 고객님</p>
                                        <span>2019-10-10</span>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
            <div className="review-wrap dealer">
                <h5>딜러거래 후기</h5>
                <div className="review-slide">
                    <Slider {...settings}>
                        {Array(3*3).fill().map((v,i) => {
                            return (
                                <div className="inner" key={i} onClick={handleClick}>
                                    <ImgCover src="/images/dummy/review-car-img-1.png" alt="딜러거래 후기 차량 이미지" />
                                    <div className="summary">
                                        <h5 className="subject">강원도 춘천에서 그렌저IG<br />매입한 후기</h5>
                                        <div className="info">현대 그랜저IG 프리미엄</div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default BidderInfo;