import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const Report = () => {
  return (
    <div className="report-wrap">
      <div className="report-tit">
        <div className="img-wrap">
          <img src="/images/common/ico-certification.svg" alt="오토벨 인증마크" />
        </div>
        <div className="tit-wrap">
          <span className="num">NO.1029-018279</span>
          <span className="date">발급일 2019.10.10</span>
          <h5 className="tit">
            AUTOBELL PRICING REPORT<em>오토벨에서 제공하는 내차판매 시, 시세정보입니다.</em>
          </h5>
          <div className="qr-wrap">
            <span>QR코드인증</span>
            <div className="img-wrap">
              <img src="/images/dummy/qr-code.png" alt="qr코드" />
            </div>
          </div>
        </div>
      </div>

      <div className="report-info">
        <div className="img-wrap">
          <img src="/images/dummy/market-car-img.png" alt="내 차량 이미지" />
        </div>
        <div className="car-info">
          <p className="car-name">현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄</p>
          <table summary="차량 정보에 대한 내용" className="table-report">
            <caption className="away">차량 정보</caption>
            <colgroup>
              <col width="20%" />
              <col width="40%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>09소0119</td>
                <th>주행거리</th>
                <td>62,180km</td>
              </tr>
              <tr>
                <th>차량연식</th>
                <td>2016년</td>
                <th>색상</th>
                <td>흰색</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>전기 + 가솔린</td>
                <th>배기량</th>
                <td>1,999 cc</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>2016년 4월 18일</td>
                <th>신차출고가</th>
                <td>3,851 만원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="car-option">
          <li className="on">
            <i className="ico-sunroof"></i>
            <span>썬루프</span>
          </li>
          <li className="on">
            <i className="ico-navigation"></i>
            <span>네비게이션</span>
          </li>
          <li className="on">
            <i className="ico-smartcruze"></i>
            <span>크루즈컨트롤</span>
          </li>
          <li className="on">
            <i className="ico-hud"></i>
            <span>HUD</span>
          </li>
          <li className="on">
            <i className="ico-around-view"></i>
            <span>어라운드뷰</span>
          </li>
          <li className="on">
            <i className="ico-smart-key"></i>
            <span>스마트키</span>
          </li>
        </ul>
      </div>

      <ul className="report-price">
        <li>
          <span className="tit">
            현재시세<span>가격단위: 만원</span>
          </span>
          <span className="con">
            <img src="/images/dummy/graph1.jpg" alt="현재시세 그래프" />
          </span>
        </li>
        <li>
          <span className="tit">
            미래시세<span>가격단위: 만원</span>
          </span>
          <span className="con">
            <img src="/images/dummy/graph2.jpg" alt="미래시세 그래프" />
          </span>
        </li>
      </ul>

      <div className="report-msg">
        <p>“본 Report견적은 무사고 기준이며, 1주일간 유효합니다.”</p>
        <ul className="logo-wrap">
          <li className="logo-glovis">
            <img src="/images/common/glovis-logo-dark.png" alt="글로비스 로고" />
          </li>
          <li className="logo-autobell">
            <img src="/images/common/autobell-logo.png" alt="오토벨 로고" />
          </li>
        </ul>
      </div>

      <div className="copyright-wrap">
        <p>Copyright HYNDAI GLOVIS co.,ltd all rights reserved.</p>
      </div>
    </div>
  );
};

export default Report;
