import moment from 'moment'
import PageNavigator from '@src/components/common/PageNavigator';
import MypageFilterSelect from '@src/components/common/MypageFilterSelect';
import DatePicker from '@src/components/common/calendar/DatePicker';
import SelectBox from '@lib/share/items/SelectBox';
import Button from '@lib/share/items/Button';

const MypageManageList6 = () => {
  const now = moment();

  return (
    <div className="register-admin-sec standby-car-sec">
      <MypageFilterSelect />
      <table className="table-tp1 input search" summary="조회 영역">
        <caption className="away">조회 영역</caption>
        <tbody>
          <tr>
            <th>삭제일</th>
            <td>
              <DatePicker defaultValue={now} inputWidth={152} inputHeight={40} />
              <em className="mg8">-</em>
              <DatePicker defaultValue={now} inputWidth={152} inputHeight={40} />
              <Button className="on"size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={8}/>
              <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
              <Button size="mid" line="gray" color="black" title="15일" width={50} height={40} marginLeft={8} />
              <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
              <Button size="mid" line="gray" color="black" title="오늘" width={50} height={40} marginLeft={8} />
              <Button size="mid" background="blue80" title="조회" width={114} height={40 }marginLeft={16} />
            </td>
          </tr>
          <tr>
            <th></th>
            <td><p className="tx-exp-tp6">(* 최대 1년까지 조회 가능합니다.)</p></td>
          </tr>
        </tbody>
      </table>
      <ul className="float-wrap">
        <li><p className="inquire-num">삭제차량 : 총 15대</p></li>
        <li>
          <SelectBox id="select1" className="items-sbox" options={[
            { value: '1', label: '삭제일순' },
            { value: '2', label: '등록일순' }
          ]} width={176} height={40} placeHolder="삭제일순" />
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
                <li><i className="ico-dot sml"></i>삭제일<span>2019-09-23</span></li>
                <li><i className="ico-dot sml"></i>삭제사유<span>직접삭제</span></li>
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
                <li><i className="ico-dot sml"></i>삭제일<span>2019-09-23</span></li>
                <li><i className="ico-dot sml"></i>삭제사유<span>관리자 삭제</span></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <PageNavigator recordCount={50} className="mt32" />
    </div>
  )
}

export default MypageManageList6;