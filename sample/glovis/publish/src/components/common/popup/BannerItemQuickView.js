import { useContext, memo } from 'react';
import SlideGallery from '@src/components/common/banner/SlideGallery';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { BannerItemContext } from '@src/components/common/banner/BannerItem';
import { car_gallery } from '@src/dummy';

const BannerItemQuickView = memo(() => {

  const { rodalShow1, modalCloseHandler1, handleOpenConfirm } = useContext(BannerItemContext);

  return (
    <RodalPopup show={rodalShow1} type="fade" closedHandler={modalCloseHandler1} mode="normal" className="pop-quick-view" size="large">
      <div className="con-wrap view-wrap">
        <ul className="tit-wrap">
          <li><h3>제네시스 G80 3.3 Premium 럭셔리</h3></li>
          <li className="fr">
            <p className="price-tp1">3,750<span className="won">만원</span></p>
          </li>
          <li>
            <div className="tag-wrap">
              <em className="tag-tp1 tx-blue60">EX</em>
              <em className="tag-tp1 tx-purple">홈서비스</em>
              <em className="tag-tp1 tx-sky">수입인증</em>
            </div>
          </li>
        </ul>
        <div className="car-img-info">
          <div className="img-wrap">
            <SlideGallery car_gallery={car_gallery} quickView={true} />
            <p className="scrap-wrap">
              <span className="heart" onClick={handleOpenConfirm}><i className="ico-heart"></i><em>관심차량</em></span>
              <span className="compare"><i className="ico-compare"></i><em>비교하기</em></span>
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
                <td>47러0383</td>
                <th>연료</th>
                <td>가솔린</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>11/16식(17년형)</td>
                <th>배기량</th>
                <td>3,342cc</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>53,436 KM</td>
                <th>차종</th>
                <td>대형차</td>
              </tr>
              <tr>
                <th>변속기</th>
                <td>오토</td>
                <th>색상</th>
                <td>회색</td>
              </tr>
              <tr>
                <th>사고유무</th>
                <td>무사고</td>
                <th>압류/저당</th>
                <td>무</td>
              </tr>
              <tr>
                <th>제시번호</th>
                <td>21363842937</td>
                <th></th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Buttons align="center" marginTop={40} className="w-line">
          <Button size="big" background="blue80" title="자세히보기" width={180} height={60} />
          <Button size="big" background="red60" title="온라인구매" width={180} height={60} />
        </Buttons>
      </div>
    </RodalPopup>
  )
});

export default BannerItemQuickView;