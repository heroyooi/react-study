import {useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import PageNavigator from '@src/components/common/PageNavigator';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerMember02 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량 판매 후기 관리',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap">                   
          <div className="mypage-state-sec member-review mt20">                      
            <div className="float-wrap btn-xs">
              <h3 className="tit2">이용후기<span>(<em className="tx-blue80">2</em>건)</span></h3>
              <Button size="sml" line="gray" radius={true} title="후기 등록" width={56} height={24} fontSize={10} fontWeight={500} href="/mypage/dealerMember02_01" nextLink={true}/>
            </div>
            <ul className="notice v-2">
              <li>
                <Link href="#">
                  <a>
                    <p>
                      기아 더 프레스티지 K7 3.0 GDI 럭셔리
                      <span>친절하고 쿨하고 전반적으로 만족! 만족만족만족만친절하고 쿨하고 전반적으로 만족! 만족만족만족만친절하고 쿨하고 전반적으로 만족! 만족만족만족만</span>
                    </p>
                    <span>등록일: 2019.09.16</span><span>최종수정: 2019.09.16</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>
                    <p>
                      기아 더 프레스티지 K7 3.0 GDI 럭셔리
                      <span>친절하고 쿨하고 전반적으로 만족! 만족만족만족만친절하고 쿨하고 전반적으로 만족! 만족만족만족만친절하고 쿨하고 전반적으로 만족! 만족만족만족만</span>
                    </p>
                    <span>등록일: 2019.09.16</span><span>최종수정: 2019.09.16</span>
                  </a>
                </Link>
              </li>              
            </ul>                             
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        
        <div className="mypage-state-sec member-review">
          <div className="mypage-admin-title">
            <h3>차량 판매 후기 관리</h3>
            <p className="tx-exp-tp5">&#8251; 셀프판매 낙찰 시 회원에게 노출됩니다.</p>
          </div>

          <div className="tx-list">
            <p className="inquire-num">총 15건</p>
            <table summary="차량 판매 후기 관리" className="table-tp1 th-c td-c">
              <caption className="away">차량 판매 후기 관리</caption>
              <colgroup>
                <col width="8%" />
                <col width="30%" />
                <col width="39%" />
                <col width="23%" />
              </colgroup>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>제목</th>
                  <th>차량명</th>
                  <th>등록일(최종 수정일)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">친절하고 쿨하고 전반적으로 만족!</a></Link></td>
                  <td>기아 던 프레스티지 K7 3.0 GDI 럭셔리</td>
                  <td>2019-10-01<br />(2019-10-04)</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">친절하고 쿨하고 전반적으로 만족!</a></Link></td>
                  <td>기아 던 프레스티지 K7 3.0 GDI 럭셔리</td>
                  <td>2019-10-01<br />(2019-10-04)</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">친절하고 쿨하고 전반적으로 만족!</a></Link></td>
                  <td>기아 던 프레스티지 K7 3.0 GDI 럭셔리</td>
                  <td>2019-10-01<br />(2019-10-04)</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">친절하고 쿨하고 전반적으로 만족!</a></Link></td>
                  <td>기아 던 프레스티지 K7 3.0 GDI 럭셔리</td>
                  <td>2019-10-01<br />(2019-10-04)</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">친절하고 쿨하고 전반적으로 만족!</a></Link></td>
                  <td>기아 던 프레스티지 K7 3.0 GDI 럭셔리</td>
                  <td>2019-10-01<br />(2019-10-04)</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td><Link href=""><a className="tx-blue80 t-underline">친절하고 쿨하고 전반적으로 만족!</a></Link></td>
                  <td>기아 던 프레스티지 K7 3.0 GDI 럭셔리</td>
                  <td>2019-10-01<br />(2019-10-04)</td>
                </tr>
              </tbody>
            </table>
          </div>          
          <Buttons align="right" marginTop={26}>
            <Button size="big" background="blue80" title="후기등록" width={180} height={48} nextLink={true} href="/mypage/dealerMember02_01" />
          </Buttons>
          <PageNavigator recordCount={50} className="mt32" />    
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerMember02