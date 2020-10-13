import Button from '@lib/share/items/Button';

const MobAdRegistration = () => {
  return (
    <div className="content-wrap pt14">
      <div className="present-area">
        <div className="info-left">
          <p className="waterman-area"><span>단체</span>현대 오토오토</p>
          <p className="count-area">대표계정</p>
        </div>
        <div className="info-right">
          <em><span>20</span> 대</em>
          <span>등록중</span>
        </div>
      </div>
      <div className="goods-list admin-list adReg-area tp4 mt20">
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
                    <span>오토</span>
                    <span>디젤</span>
                  </div>
                  <div className="price-wrap">
                    <div className="price-left">
                      <p className="price-tp2">7,760<span className="won">만원</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </span>

            <table summary="광고등록현황에 대한 내용" className="table-tp1 adR-tb">
            <caption className="away">담당 평가사</caption>
            <colgroup>
              <col width="25%" />
              <col width="75%" />
            </colgroup>
            <tbody>
              <tr>
                <th>등록일</th>
                <td>2019.08.01 <span>(최종수정일 : 2019.09.01)</span></td>
              </tr>
              <tr>
                <th>담당자정보</th>
                <td>
                  현대 오토오토 <span>(02-1234-5678)</span>
                  <Button size="sml" line="blue80" color="blue80" radius={true} title="연락처 변경" width={65} height={24} fontSize={10} fontWeight={500} />
                </td>
              </tr>
            </tbody>
          </table> 
          </li>
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
                    <span>오토</span>
                    <span>디젤</span>
                  </div>
                  <div className="price-wrap">
                    <div className="price-left">
                      <p className="price-tp2">7,760<span className="won">만원</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </span>

            <table summary="광고등록현황에 대한 내용" className="table-tp1 adR-tb">
            <caption className="away">담당 평가사</caption>
            <colgroup>
              <col width="25%" />
              <col width="75%" />
            </colgroup>
            <tbody>
              <tr>
                <th>등록일</th>
                <td>2019.08.01 <span>(최종수정일 : 2019.09.01)</span></td>
              </tr>
              <tr>
                <th>담당자정보</th>
                <td>
                  현대 오토오토 <span>(02-1234-5678)</span>
                  <Button size="sml" line="blue80" color="blue80" radius={true} title="연락처 변경" width={65} height={24} fontSize={10} fontWeight={500} />
                </td>
              </tr>
            </tbody>
          </table> 
          </li>
        </ul> 
      </div>
    </div>
  )
}

export default MobAdRegistration;