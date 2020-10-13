import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import BannerItem from '@src/components/common/banner/BannerItem';
import { car_list } from '@src/dummy';
import { SECTION_MYPAGE } from '@src/actions/types';

const generalMain = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);
  
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-sec">
          <ul className="general-admin-tab">
            <li><a href="#" title="정산 판매중">15</a>관심 차량</li>
            <li><a href="#" title="관리필요">0</a>최근 본 차량</li>
            <li><a href="#" title="판단보류">2</a>쪽지상담내역</li>
            <li><a href="#" title="대기차량">2</a>문의내역</li>
          </ul>

          <div className="list-wrap border mt64">
            <div className="list-tit">
              <h3>홈 서비스 내역<span>최근 1년 내 신청 내역 1건이 표시됩니다.</span></h3>
              <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} />
            </div>
            <div className="admin-list tp7">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="14%" />
                    <col width="47%" />
                    <col width="13%" />
                    <col width="13%" />
                    <col width="13%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>신청일자</th>
                      <th>신청차량</th>
                      <th>가격</th>
                      <th>판매가</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2019-09-19<br />
                        <Button size="mid" line="gray" color="black" radius={true} title="상세보기" width={100} height={32} marginTop={8} />
                      </td>
                      <td>
                        <div className="img-cover">
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                          <ul className="info">
                            <li>00가0000</li>
                            <li>09/12식(10년형)</li>
                          </ul>
                          <ul className="info">
                            <li>84,761km</li>
                            <li>오토</li>
                            <li>디젤</li>
                          </ul>
                        </div>
                      </td>
                      <td className="price">7,760만원</td>
                      <td className="seller">박현대<br />010-3333-7777</td>
                      <td className="tx-disabled">신청완료</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="list-wrap border">
            <div className="list-tit">
              <h3>쪽지상담 내역<span>최근 1년 내 신청 내역 1건이 표시됩니다.</span></h3>
              <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} />
            </div>
            <div className="admin-list tp7 note">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="14%" />
                    <col width="30%" />
                    <col width="18%" />
                    <col width="24%" />
                    <col width="14%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>신청일자</th>
                      <th>상담진행차량</th>
                      <th>판매자</th>
                      <th>최초상담내용</th>
                      <th>답변여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2019-09-19<br />
                        <Button size="mid" line="gray" color="black" radius={true} title="상세보기" width={100} height={32} marginTop={8} />
                      </td>
                      <td>
                        <div className="img-cover">
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                        </div>
                      </td>
                      <td className="seller">박현대<br />010-3333-7777</td>
                      <td>안녕하세요. 내일 이 차량 보러</td>
                      <td className="tx-blue80">
                        답변대기<br />
                        <Button size="mid" line="gray" color="black" radius={true} title="내용보기" width={100} height={32} marginTop={8} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="list-wrap border">
            <div className="list-tit">
              <h3>내차팔기<span>최근 1년 내 신청 내역 1건이 표시됩니다.</span></h3>
              <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} />
            </div>
            <div className="admin-list tp7">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="14%" />
                    <col width="47%" />
                    <col width="13%" />
                    <col width="13%" />
                    <col width="13%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>신청일자</th>
                      <th>신청차량</th>
                      <th>견적금액</th>
                      <th>판매방식</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2019-09-19</td>
                      <td>
                        <div className="img-cover">
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                          <ul className="info">
                            <li>00가0000</li>
                            <li>09/12식(10년형)</li>
                          </ul>
                          <ul className="info">
                            <li>84,761km</li>
                            <li>오토</li>
                            <li>디젤</li>
                          </ul>
                        </div>
                      </td>
                      <td>7,760만원</td>
                      <td>셀프평가</td>
                      <td>
                        임시저장<br />
                        <Button size="mid" line="gray" color="black" radius={true} title="내용보기" width={100} height={32} marginTop={8} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="list-none">서비스 이용 내역이 없습니다.</div>

          <ul className="sell-ico-wrap">
            <li>
              <i className="sell-service-img-01"></i>
              <p className="exp">클릭 한 번이면 끝!<br />견적부터 판매까지 내 집 앞에서 편하게</p>
              <p className="tit">방문평가 판매</p>
            </li>
            <li>
              <i className="sell-service-img-02"></i>
              <p className="exp">딜러와의 불편한 흥정은 이제 그만!<br />직접 등록하고 쉽게 견적 받으세요!</p>
              <p className="tit">셀프등록판매</p>
            </li>
            <li>
              <i className="sell-service-img-03"></i>
              <p className="exp">신청완료와 동시에 차량 대금 먼저 지급! <br />이제 대금 먼저 받고 차량 판매하세요!</p>
              <p className="tit">무평가판매</p>
            </li>
          </ul>

          <div className="list-wrap recently">
            <div className="list-tit">
              <h4>최근 본 차량</h4>
              <Button className="fr" size="mid" line="gray" color="black" radius={true} title="27개 전체보기" width={116} height={32} />
            </div>
            <ul className="goods-list col3">
              {car_list.map((v, i) => {
                if (i < 3) {
                  return (
                    <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                  )
                }
              })}
            </ul>
          </div>

          <div className="list-wrap recently">
            <div className="list-tit">
              <h4>최근 본 차량</h4>
              <Button className="fr" size="mid" line="gray" color="black" radius={true} title="27개 전체보기" width={116} height={32} />
            </div>
            <p className="list-none">최근 본 차량이 없습니다.</p>
          </div>
        </div>
      </div>

    </AppLayout>
  )
}

export default generalMain