import React from 'react';
import PropTypes from 'prop-types';
import { objIsEmpty } from '@src/utils/CommonUtil';
import SlideCarDetail from '@src/components/common/SlideCarDetail';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

class PricingAuctionInfo extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if (objIsEmpty(this.props.dataContext)) {
      return null;
    }

    const { auctionInfo, imageList } = this.props.dataContext;

    return (
      <React.Fragment>
        <div className="popup-car-info">
          {!objIsEmpty(imageList) && <SlideCarDetail car_gallery={imageList} />}
          <Buttons align="right" marginTop={32}>
            <Button size="mid" line="gray" radius={true} title="성능점검표" width={100} height={32} />
            <Button size="mid" line="gray" radius={true} title="사고이력조회" width={100} height={32} />
          </Buttons>
        </div>
        <div className="popup-table-wrap">
          <table summary="경매정보 상세에 대한 내용" className="table-tp1">
            <caption className="away">경매정보 상세입니다.</caption>
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="20%" />
              <col width="30%" />
            </colgroup>
            <tbody>
              <tr>
                <th>거점</th>
                <td>{auctionInfo.location || ''}</td>
                <th>소유</th>
                <td>{auctionInfo.purpose || ''}</td>
              </tr>
              <tr>
                <th>판매일</th>
                <td>{auctionInfo.date}</td>
                <th>용도</th>
                <td>{auctionInfo.props || ''}</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>{auctionInfo.noy || auctionInfo.year || ''}</td>
                <th>평가</th>
                <td>{auctionInfo.evl || auctionInfo.grade || ''}</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>{auctionInfo.frstRegDt || auctionInfo.initialRegist || ''}</td>
                <th>수출항목</th>
                <td>X</td>
              </tr>
              <tr>
                <th>미션</th>
                <td>{auctionInfo.msn || auctionInfo.mission || ''}</td>
                <th>시작가</th>
                <td>{auctionInfo.strtPrc || auctionInfo.price || ''}만원</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>{auctionInfo.fuel || ''}</td>
                <th>낙찰가</th>
                <td>{auctionInfo.sbidPrc || ''}만원</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>{auctionInfo.clr || auctionInfo.color || ''}</td>
                <th>옵션</th>
                <td>{auctionInfo.opt || auctionInfo.options || ''}</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>{auctionInfo.dspl || auctionInfo.exhaust || ''}</td>
                <th rowSpan="2">특이사항</th>
                <td rowSpan="2">{auctionInfo.memo || ''}</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>{auctionInfo.drvDist || auctionInfo.km || ''}km</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

PricingAuctionInfo.propTypes = {
  dataContext: PropTypes.object
};

export default PricingAuctionInfo;
