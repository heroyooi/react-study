import { useDispatch } from 'react-redux';
import Link from "next/link"
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerSell03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  
  return (
    <AppLayout>
      <div className="content-wrap my-ex-admin">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>나의 설명글 관리</h3>
            <p>[차량상세>판매자의 차량 가이드]에 노출됩니다.</p>
          </div>

          <div className="tx-list">
            <table summary="나의 설명글 관리" className="table-tp1 th-c td-c">
              <caption className="away">나의 설명글 관리</caption>
              <colgroup>
                <col width="6.5%" />
                <col width="68.5%" />
                <col width="25%" />
              </colgroup>
              <thead>
                <tr>
                  <th><CheckBox id='chk-my-ex-all' /></th>
                  <th>제목</th>
                  <th>등록일(최종수정일)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><CheckBox id='chk-my-ex1' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex2' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex3' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex4' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex5' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex6' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex7' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex8' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex9' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex10' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex11' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex12' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex13' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex14' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
                <tr>
                  <td><CheckBox id='chk-my-ex15' /></td>
                  <td><Link href="/mypage/dealerSell03_02"><a>그랜저 설명글</a></Link></td>
                  <td>2019-09-16(2019-09-16)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <Buttons marginTop={32}>
            <span className="step-btn-l">
              <Button size="big" background="gray" title="선택삭제" width={150} height={48} />
            </span>
            <PageNavigator recordCount={50} />
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="+ 설명글 등록" width={150} height={48} href="dealerSell03_01" />
            </span>
          </Buttons>
          
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerSell03