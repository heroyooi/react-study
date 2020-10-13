import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import BannerItem from '@src/components/common/banner/BannerItem';
import Link from 'next/link';
import { car_list, mCarList } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const generalMain = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const { result1, result2 } = router.query;
  const [withoutList1, setWithoutList1] = useState(result1 === "no" ? true : false);
  const [withoutList2, setWithoutList2] = useState(result2 === "no" ? true : false);

  if (hasMobile) {
    const handleRouter = (href) => (e) => {
      e.preventDefault();
      Router.push(href);
    };
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '마이페이지',
        options: ['back', 'search', 'gnb'],
        events: [null, handleRouter('/buy/listSearch'), null]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    const { result } = router.query;
    const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
    return (
      <AppLayout>
        <div className="general-sec">
          <div className="mypage-profile pd20">
            <div className="float-wrap btn-s">
              <p className="ml0">김현대님, 환영합니다.</p>
              <Button size="sml" line="gray" color="gray" title="회원정보수정" width={83} height={30} fontWeight={500} />
            </div>
          </div>

          <ul className="general-admin-tab">
            <li><span>15</span>관심 차량</li>
            <li><span>0</span>최근 본 차량</li>
            <li><span>2</span>쪽지상담내역</li>
            <li><span>2</span>문의내역</li>
          </ul>

          <div className="content-wrap">
            <div className="list-wrap mb16">
              <h3 className="tit2">서비스 이용내역</h3>
              <p className="tx-exp-tp4">최근 1년 내 신청 내역 1건이 표시됩니다.</p>
            </div>
            {
              withoutList === true
                ? (
                  <div className="list-none-wrap">
                    <div className="list-none">
                      <p>최근 조회하신 차량이 없습니다.</p>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={84} height={40} />
                      </Buttons>
                    </div>
                  </div>
                ) : (
                  <div className="goods-list admin-list tp1">
                    <ul>
                      <li>
                        <div className="img-cover">
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <span className="list-tag2">
                            <em className="tag-tp2">홈서비스</em>
                          </span>
                          <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                          <Button size="sml" background="blue20" color="blue80" radius={true} title="신청완료" width={53} height={24} fontSize={10} fontWeight={500} marginTop={17} />
                        </div>
                      </li>
                      <li>
                        <div className="img-cover">
                          <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                        </div>
                        <div className="summary">
                          <span className="list-tag2">
                            <em className="tag-tp2">내차팔기</em>
                            <em className="tag-tp2">셀프평가</em>
                          </span>
                          <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                          <Button size="sml" line="gray" color="gray" radius={true} title="임시저장" width={53} height={24} fontSize={10} fontWeight={500} marginTop={17} />
                        </div>
                      </li>
                    </ul>
                  </div>
                )
            }
          </div>

          <MypageNavi />

          <Buttons>
            <Button size="full" background="blue20" color="blue80" radius={true} title="금융서비스" />
          </Buttons>

          <ul className="sell-ico-wrap border">
            <li>
              <Link href="#">
                <a>
                  <i className="ico-sell-01"></i>
                  <div className="tx-wrap">
                    <p className="tit">방문평가 판매</p>
                    <p className="exp">클릭 한 번이면 끝!<br />견적부터 판매까지 내 집 앞에서 편하게</p>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>
                  <i className="ico-sell-02"></i>
                  <div className="tx-wrap">
                    <p className="tit">셀프등록 판매</p>
                    <p className="exp">딜러와의 불편한 흥정은 이제 그만!<br />직접 등록하고 쉽게 견적 받으세요!</p>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>
                  <i className="ico-sell-03"></i>
                  <div className="tx-wrap">
                    <p className="tit">무평가 판매</p>
                    <p className="exp">신청완료와 동시에 차량 대금 먼저 지급! <br />이제 대금 먼저 받고 차량 판매하세요!</p>
                  </div>
                </a>
              </Link>
            </li>
          </ul>

          <div className="list-wrap content-border">
            <div className="float-wrap btn-s">
              <h3 className="tit2">최근 본 차량</h3>
              <Button size="sml" line="gray" color="gray" radius={true} title="15개 전체보기" width={88} height={30} fontWeight={500} />
            </div>
            {
              withoutList === true
                ? (
                  <div className="list-none-wrap">
                    <p className="list-none">서비스 이용 내역이 없습니다.</p>
                  </div>
                ) : (
                  <ul className="goods-list list-type">
                    {mCarList.map((v, i) => {
                      if (i < 2) {
                        return (
                          <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                        )
                      }
                    })}
                  </ul>
                )
            }
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-sec">
          <ul className="general-admin-tab">
            <li><Link href="/mypage/generalBuy01"><a><span>15</span>관심 차량</a></Link></li>
            <li><Link href="/mypage/generalBuy02"><a><span>0</span>최근 본 차량</a></Link></li>
            <li><Link href="/mypage/generalBuy03"><a><span>2</span>쪽지상담내역</a></Link></li>
            <li><Link href="/mypage/generalBuy04"><a><span>2</span>문의내역</a></Link></li>
          </ul>
          {
            withoutList1 === false
              ? (
                <>
                  <div className="list-wrap border mt64">
                    <div className="list-tit">
                      <h3>홈 서비스 내역<span>최근 1년 내 신청 내역 1건이 표시됩니다.</span></h3>
                      <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} href="/mypage/generalBuy04" />
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
                      <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} href="/mypage/generalBuy03" />
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
                              <td>안녕하세요. 내일 이 차량 보러</td>
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
                      <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} href="/mypage/generalSell01" />
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
                </>
              ) : (
                <div className="list-none">서비스 이용 내역이 없습니다.</div>
              )
          }
          <ul className="sell-ico-wrap">
            <li>
              <Link href="/sell/visitApply">
                <a>
                  <i className="sell-service-img-01"></i>
                  <p className="exp">클릭 한 번이면 끝!<br />견적부터 판매까지 내 집 앞에서 편하게</p>
                  <p className="tit">방문평가 판매</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sell/selfHome">
                <a>
                  <i className="sell-service-img-02"></i>
                  <p className="exp">딜러와의 불편한 흥정은 이제 그만!<br />직접 등록하고 쉽게 견적 받으세요!</p>
                  <p className="tit">셀프등록판매</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sell/freeHome">
                <a>
                  <i className="sell-service-img-03"></i>
                  <p className="exp">신청완료와 동시에 차량 대금 먼저 지급! <br />이제 대금 먼저 받고 차량 판매하세요!</p>
                  <p className="tit">무평가판매</p>
                </a>
              </Link>
            </li>
          </ul>

          <div className="list-wrap recently">
            <div className="list-tit">
              <h4>최근 본 차량</h4>
              <Button className="fr" size="mid" line="gray" color="black" radius={true} title="27개 전체보기" width={116} height={32} href="/mypage/generalBuy02" />
            </div>
            {
              withoutList2 === false
                ? (
                  <ul className="goods-list col3">
                    {car_list.map((v, i) => {
                      if (i < 3) {
                        return (
                          <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                        )
                      }
                    })}
                  </ul>
                ) : (
                  <p className="list-none">최근 본 차량이 없습니다.</p>
                )
            }
          </div>
        </div>
      </div>

    </AppLayout>
  )
}

export default withRouter(generalMain);