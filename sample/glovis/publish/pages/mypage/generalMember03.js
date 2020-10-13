import { useState, useCallback } from 'react';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import Link from 'next/link';

const GeneralMember03 = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const now = moment()
  // 달력 기간 선택
  const handleBtnFilterClick1 = (label, e) => {
    console.log(label);
  }
  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
  
  const handleOpenPop = useCallback((e) => {
    e.preventDefault();
    setActive(true);
    setDimm(true);
    document.getElementsByTagName('html')[0].style.overflow = "hidden";
  }, []);
  const handleCloseDimm = useCallback(() => {
    setActive(false);
    setDimm(false);
    document.getElementsByTagName('html')[0].style.overflow = "auto";
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '나의 문의내역',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="mypage-state-sec general-inquire-sec">
         
          <div className="content-wrap">
            <div className="mypage-admin-title mt20">
              <p className="tx-exp-tp5 tx-gray mt0">&#8251; 1:1 문의하신 내역을 확인하실 수 있습니다.</p>
            </div>
            <ul className="m-toggle-list search mt16">
              <MenuItem>
                <MenuTitle><p className="tit2">나의 문의내역</p><span>상세조회</span></MenuTitle>
                <MenuCont>
                  <MobButtonFilter checkList={[
                    {title: "1개월", checked: true}, 
                    {title: "3개월", checked: false}, 
                    {title: "6개월", checked: false},
                    {title: "1년", checked: false}
                  ]} onClick={handleBtnFilterClick1} />
                  {/* 2개 이상인 경우 - 사용시 주석 삭제 요망 */}
                  {/* <MobButtonFilter checkList={[
                    {title: "11", checked: true}, 
                    {title: "222", checked: false}, 
                    {title: "333", checked: false},
                    {title: "444", checked: false}
                  ]} onClick={handleBtnFilterClick2} /> */}
                  <div className="mt8">
                    <DatePicker defaultValue={now} width='46%'/>
                    <em className="from">~</em>
                    <DatePicker defaultValue={now} width='46%'/>
                  </div>
                  <Input type="text" height={40} placeHolder="차량명을 검색하세요" marginTop={8}/>
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} />
                </MenuCont>
              </MenuItem>
              <li>
                <div className="float-wrap">
                  <p>2019.08.17 ~ 2019.09.16</p>
                  <p>총 <span className="tx-blue80">123</span>건</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-wrap content-border pdside20">
           
            <Buttons align="right" marginTop={16}>
              <Button size="sml" line="gray" color="gray" radius={true} className="" title="1:1 문의하기" width={72} href="/customer/inquiry" />
              <Button size="sml" line="gray" color="gray" radius={true} title="고객센터 바로가기" width={102} marginLeft={8} href="/customer/noticeList" />
            </Buttons>   
            <div className="search-none pd0" style={{ height: '176px' }}>
              <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
            </div>

          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-inquire-sec">
          <div className="mypage-admin-title">
            <h3>나의 문의내역</h3>
            <p className="tx-exp-tp5">&#8251; 1:1 문의하신 내역을 확인하실 수 있습니다.</p>
          </div>

          <div className="list-wrap">
            <div className="list-tit fr">
              <Button size="big" background="blue80" title="1:1 문의하기" width={181} height={48} href="/customer/inquiry" />
              <Button size="big" background="blue80" title="고객센터 바로가기" width={181} height={48} marginLeft={23} href="/customer/noticeList" />
            </div>
            <table className="table-tp1 input search th-c" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th rowSpan="3">조회기간</th>
                  <td>
                    <Button className="on" size="mid" line="gray" color="black" title="1개월" width={50} height={40} />
                    <Button size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="6개월" width={50} height={40} marginLeft={8} />
                    <Button size="mid" line="gray" color="black" title="1년" width={50} height={40} marginLeft={8} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <DatePicker defaultValue={now} inputHeight={40} />
                    <em className="mg8">-</em>
                    <DatePicker defaultValue={now} inputHeight={40} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Input type="text" placeHolder="" width={396} height={40} value="제목 또는 나용을 검색하세요." />
                    <Button size="mid" background="blue80" title="조회하기" width={130} height={40 }marginLeft={16} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="admin-list tp7 mt64">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="15%" />
                    <col width="15%" />
                    <col width="50%" />
                    <col width="20%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>문의일자</th>
                      <th>상담유형</th>
                      <th>제목</th>
                      <th>답변상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      withoutList === false
                        ? (
                          <>
                            <tr>
                              <td>2019-10-01</td>
                              <td>내차사기</td>
                              <td><Link href="/mypage/generalMember03_01"><a>딜러분의 연락처가 변경된 것 같아요.</a></Link></td>
                              <td>답변대기</td>
                            </tr>
                            <tr>
                              <td>2019-10-01</td>
                              <td>내차사기</td>
                              <td><Link href="/mypage/generalMember03_01"><a>딜러분의 연락처가 변경된 것 같아요.</a></Link></td>
                              <td className="tx-blue80">답변완료</td>
                            </tr>
                          </>
                        ) : (
                          <tr className="list-none">
                            <td colSpan="4">조회하신 내용이 없습니다.</td>
                          </tr>
                        )
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <PageNavigator recordCount={50} className="mt32" />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default withRouter(GeneralMember03);