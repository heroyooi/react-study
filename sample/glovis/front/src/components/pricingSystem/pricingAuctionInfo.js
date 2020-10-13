import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { isEqual } from 'lodash';
import { objIsEmpty } from '@src/utils/CommonUtil';
import SlideCarDetail from '@src/components/common/SlideCarDetail';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { padLeft } from '@src/components/pricingSystem/pricingUtil';

class PricingAuctionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.onPerformancePopUpToggle = this.onHandleonPerformancePopUpToggle.bind(this);
    this.onAccidentPopUpToggle = this.onHandleAccidentPopUpToggle.bind(this);
  }

  componentDidMount() {
    this.props.router.prefetch('/pricingSystem/pricingperforaccident');
  }

  shouldComponentUpdate(nextProps) {
    if (!isEqual(nextProps.dataContext, this.props.dataContext)) {
      return true;
    }

    return false;
  }

  onHandleonPerformancePopUpToggle(e) {
    e.preventDefault();
    const windowFeatures = this.props.isMobile === true ? '' : 'menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,width=750,height=700,left=200,top=200';
    window.open(
      `https://auction.autobell.co.kr/pop/myCarSellPerformancePop.do?rc=${this.props.dataContext.auctroomcd}&atn=${this.props.dataContext.auctno}&gn=${this.props.dataContext.goodno}&inspectCode=02`,
      'myCarSellPerformancePop',
      windowFeatures
    );
    //if (this.props.onPerformancePopUpToggle) {
    //  this.props.onPerformancePopUpToggle(e, { crNo: this.props.dataContext.carno, crId: '', goodNo: this.props.dataContext.goodno });
    //}
  }

  onHandleAccidentPopUpToggle(e) {
    if (this.props.onAccidentPopUpToggle) {
      this.props.onAccidentPopUpToggle(e, { crNo: this.props.dataContext.carno, crId: '', goodNo: this.props.dataContext.goodno });
    }
  }

  render() {
    const auctionInfo = this.props.dataContext || {};
    const imageList = [];

    for (let cdNum = 2; cdNum <= 10; cdNum++) {
      let image = '';
      if (this.props.isMobile) {
        image = `https://glovisaa.glovis.net/FileUpDown/${auctionInfo.auctroomcd}/carimg/${auctionInfo.goodno.substr(0, 4)}/${auctionInfo.goodno}_02_${padLeft(cdNum, 2, '0')}_M.jpg`;
      } else {
        image = `https://glovisaa.glovis.net/FileUpDown/${auctionInfo.auctroomcd}/carimg/${auctionInfo.goodno.substr(0, 4)}/${auctionInfo.goodno}_02_${padLeft(cdNum, 2, '0')}.jpg`;
      }

      imageList.push({ id: cdNum, image, alt: '' });
    }

    if (this.props.isMobile) {
      return (
        <>
          <SlideCarDetail car_gallery={imageList} />
          <div className="content-wrap">
            <Buttons align="center" marginTop={20}>
              <Button
                size="big"
                line="gray"
                radius={true}
                title="성능점검표"
                fontWeight={500}
                width={48}
                measure={'%'}
                onClick={this.onPerformancePopUpToggle}
                // href={`/pricingSystem/pricingperforaccident?crNo=${auctionInfo?.carno || ''}&crId=${auctionInfo?.crId || ''}&goodNo=${auctionInfo?.goodno || ''}&perf=Y`}
              />
              <Button
                size="big"
                line="red60"
                color="red60"
                radius={true}
                title="사고이력조회"
                fontWeight={500}
                width={48}
                measure={'%'}
                marginLeft={4}
                mgMeasure={'%'}
                href={`/pricingSystem/pricingperforaccident?crNo=${auctionInfo?.carno || ''}&crId=${auctionInfo?.crId || ''}&goodNo=${auctionInfo?.goodno || ''}&perf=N`}
              />
            </Buttons>
            <table summary="경매정보 상세에 대한 내용" className="table-tp1 mt32">
              <caption className="away">경매정보 상세입니다.</caption>
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>거점</th>
                  <td>{auctionInfo?.auctroomnm || ''}</td>
                </tr>
                <tr>
                  <th>판매일</th>
                  <td>{auctionInfo?.sellymd}</td>
                </tr>
                <tr>
                  <th>연식</th>
                  <td>{auctionInfo?.year || ''}</td>
                </tr>
                <tr>
                  <th>최초등록일</th>
                  <td>{auctionInfo?.carregiymd || ''}</td>
                </tr>
                <tr>
                  <th>미션</th>
                  <td>{auctionInfo?.missnm || ''}</td>
                </tr>
                <tr>
                  <th>연료</th>
                  <td>{auctionInfo?.fuelnm || ''}</td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>{auctionInfo?.coloetcnm || ''}</td>
                </tr>
                <tr>
                  <th>배기량</th>
                  <td>{auctionInfo?.exha || ''}cc</td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>{auctionInfo?.travdist || ''}km</td>
                </tr>
                <tr>
                  <th>소유</th>
                  <td>{auctionInfo?.owneclasnm || ''}</td>
                </tr>
                <tr>
                  <th>용도</th>
                  <td>{auctionInfo.useusenm || ''}</td>
                </tr>
                <tr>
                  <th>평가</th>
                  <td>{auctionInfo?.evalpoint || ''}</td>
                </tr>
                <tr>
                  <th>시작가</th>
                  <td>{auctionInfo.starpric || ''}원</td>
                </tr>
                <tr>
                  <th>낙찰가</th>
                  <td>{auctionInfo.succpric || ''}원</td>
                </tr>
                <tr>
                  <th>옵션</th>
                  <td>{auctionInfo.caropnm || ''}</td>
                </tr>
                <tr>
                  <th>특이사항</th>
                  <td>{auctionInfo.specdeta || ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      );
    }
    return (
      <React.Fragment>
        <div className="popup-car-info">
          {!objIsEmpty(imageList) && <SlideCarDetail car_gallery={imageList} />}
          <Buttons align="right" marginTop={32}>
            <Button size="mid" line="gray" radius={true} title="성능점검표" width={100} height={32} onClick={this.onPerformancePopUpToggle} />
            <Button size="mid" line="gray" radius={true} title="사고이력조회" width={100} height={32} onClick={this.onAccidentPopUpToggle} />
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
                <td>{auctionInfo?.auctroomnm || ''}</td>
                <th>소유</th>
                <td>{auctionInfo?.owneclasnm || ''}</td>
              </tr>
              <tr>
                <th>판매일</th>
                <td>{auctionInfo?.sellymd}</td>
                <th>용도</th>
                <td>{auctionInfo?.useusenm || ''}</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>{auctionInfo?.year || ''}</td>
                <th>평가</th>
                <td>{auctionInfo?.evalpoint || ''}</td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td colSpan={3}>{auctionInfo?.carregiymd || ''}</td>
              </tr>
              <tr>
                <th>미션</th>
                <td>{auctionInfo?.missnm || ''}</td>
                <th>시작가</th>
                <td>{auctionInfo?.starpric || ''}원</td>
              </tr>
              <tr>
                <th>연료</th>
                <td>{auctionInfo?.fuelnm || ''}</td>
                <th>낙찰가</th>
                <td>{auctionInfo?.succpric || ''}원</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>{auctionInfo?.coloetcnm || ''}</td>
                <th>옵션</th>
                <td>{auctionInfo?.caropnm || ''}</td>
              </tr>
              <tr>
                <th>배기량</th>
                <td>{auctionInfo?.exha || ''}cc</td>
                <th rowSpan="2">특이사항</th>
                <td rowSpan="2">{auctionInfo?.specdeta || ''}</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>{auctionInfo?.travdist || ''}km</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

PricingAuctionInfo.propTypes = {
  dataContext: PropTypes.object,
  isMobile: PropTypes.bool,
  router: PropTypes.object,
  onPerformancePopUpToggle: PropTypes.func,
  onAccidentPopUpToggle: PropTypes.func
};

PricingAuctionInfo.defaultProps = {
  isMobile: false
};

export default withRouter(PricingAuctionInfo);
