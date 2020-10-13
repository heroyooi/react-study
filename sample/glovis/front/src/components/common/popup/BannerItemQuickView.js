// import { useContext } from 'react';
import React, { useState, useEffect } from 'react';
import SlideGallery from '@src/components/common/banner/SlideGallery';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { numberFormat } from '@src/utils/CommonUtil';
import classNames from 'classnames/bind';
import { isUndefined } from 'lodash';
// import { BannerItemBuyCarContext } from '@src/components/common/banner/BannerItemBuyCar';
import { car_gallery } from '@src/dummy';

const BannerItemQuickView = ({ rodalShow1, modalCloseHandler1, qdata, clickInterate, clickCompare, clickView, clickHome }) => {
  // const { rodalShow1, modalCloseHandler1, handleOpenConfirm } = useContext(BannerItemBuyCarContext);
  // console.log('BannerItemQuickView = ', props);
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    setData(qdata?.carInfo);
    setPhoto(qdata?.photos);
  }, [qdata]);

  const [itrtProdYnState, setItrtProdYnState] = useState('N');
  const [compProdYnState, setCompProdYnState] = useState('N');

  return (
    <RodalPopup show={rodalShow1} type="fade" closedHandler={modalCloseHandler1} mode="normal" className="pop-quick-view" size="large">
      <div className="con-wrap view-wrap">
        <ul className="tit-wrap">
          <li>
            <h3>{data?.crNm}</h3>
          </li>
          <li className="fr">
            <p className="price-tp1">
              {numberFormat(data?.slAmt)}

              <span className="won">만원</span>
            </p>
          </li>
          <li>
            <div className="tag-wrap">
              {data?.ewYn === 'Y' && <em className="tag-tp1 tx-blue60">EW</em>}
              {data?.hsvcYn === 'Y' && <em className="tag-tp1 tx-purple">홈서비스</em>}
              {data?.icmAcrtCrYn === 'Y' && <em className="tag-tp1 tx-sky">수입인증</em>}
              {data?.frnchsYn === 'Y' && <em className="tag-tp1 tx-gold">프랜차이즈</em>}
              {data?.capMallYn === 'Y' && <em className="tag-tp1 tx-green">금융인증</em>}
            </div>
          </li>
        </ul>
        <div className="car-img-info">
          <div className="img-wrap">
            <SlideGallery car_gallery={photo} quickView={true} />
            <p className="scrap-wrap">
              <span className={classNames('heart', { on: itrtProdYnState === 'Y' })} onClick={clickInterate}>
                <i className="ico-heart" />
                <em>관심차량</em>
              </span>
              <span className={classNames('compare', { on: compProdYnState === 'Y' })} onClick={clickCompare}>
                <i className="ico-compare" />
                <em>비교하기</em>
              </span>
            </p>
          </div>
          <table summary="차량 기본 정보에 대한 내용" className="table-tp1">
            <caption className="away">차량 기본 정보</caption>
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="20%" />
              <col width="30%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>{data?.crNo}</td>
                <th>연료</th>
                <td>{data?.fuelNm}</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>
                  {data?.frstRegDt}식({data?.frmYyyy}년형)
                </td>
                <th>배기량</th>
                <td>{numberFormat(isUndefined(data?.dspl) ? '0' : data?.dspl)}cc</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>{numberFormat(data?.drvDist)} KM</td>
                <th>차종</th>
                <td>{data?.crTypeNm}</td>
              </tr>
              <tr>
                <th>변속기</th>
                <td>{data?.mss}</td>
                <th>색상</th>
                <td>{data?.crClrNm}</td>
              </tr>
              <tr>
                <th>사고유무</th>
                <td>{data?.acdtYn > 0 ? '유사고' : '무사고'}</td>
                <th>압류/저당</th>
                <td>{data?.szrMorCnt > 0 ? '유' : '무'}</td>
              </tr>
              <tr>
                <th>제시번호</th>
                <td>{data?.perfInspId}</td>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
        <Buttons align="center" marginTop={40} className="w-line">
          <Button size="big" background="blue80" title="자세히보기" width={180} height={60} buttonMarkup={true} onClick={clickView} />
          {/*온라인구매시*/

          data?.hsvcYn === 'Y' && <Button size="big" background="red60" title="온라인구매" width={180} height={60} buttonMarkup={true} onClick={clickHome} />}
        </Buttons>
      </div>
    </RodalPopup>
  );
};

export default BannerItemQuickView;
