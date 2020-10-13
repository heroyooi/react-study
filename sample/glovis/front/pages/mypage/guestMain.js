import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import BannerItem from '@src/components/common/banner/BannerItem';
import Link from 'next/link';
import { car_list } from '@src/dummy';
import { SECTION_MYPAGE } from '@src/actions/types';

const generalMain = ({router}) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const { result1, result2 } = router.query;
  const [withoutList1, setWithoutList1] = useState(result1 === "no" ? true : false);
  const [withoutList2, setWithoutList2] = useState(result2 === "no" ? true : false);
  
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="guest"/>

        <div className="mypage-state-sec guest-sec">
          <div className="mypage-admin-title">
            <h3 className="border-none">내차 팔기 현황 조회</h3>
            <div className="sub-tit-wrap">
              <p>김현대(010-****-5678) 님께서 신청하신 내차팔기 현황 조회입니다.</p>
            </div>
          </div>

          <div className="list-wrap border">
            <div className="list-tit">
              <h3>내차팔기<span>신청번호: nnnnnzzzzznn</span></h3>
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
                        신청완료<br />
                        <Button size="mid" line="gray" color="black" radius={true} title="신청취소" width={100} height={32} marginTop={8} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="essential-point">
            <ul>
              <li>[안내]</li>
              <li><i className="ico-dot sml"></i> 신청내역이 다르면 신청번호가 다릅니다.  다른 신청내역을 조회하시려면, 해당 신청번호로 다시 현황조회를 해주세요.</li>
              <li><i className="ico-dot sml"></i> 현대 글로비스 오토벨 회원가입을 하시면 더 다양한 서비스를 이용하실 수 있습니다.<Button size="mid" line="gray" color="black" radius={true} title="회원가입" width={100} height={32} marginLeft={10} /></li>
              <li><i className="ico-dot sml"></i> 문의사항이 있을 경우, 고객센터 전화번호 또는 1:1 문의를 이용해주세요.</li>
            </ul>
          </div>
        </div>
      </div>

    </AppLayout>
  )
}

export default withRouter(generalMain);