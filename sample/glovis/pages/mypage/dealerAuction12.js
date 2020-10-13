import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import SwipeableInkTabBar from "rc-tabs/lib/SwipeableInkTabBar";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Input from '@lib/share/items/Input';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import PageNavigator from '@src/components/common/PageNavigator'
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list } from '@src/dummy';

const DealerAuction12 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const now = moment();
  // 달력 기간 선택
  const handleBtnFilterClick1 = (label, e) => {
    console.log(label);
  }

  
  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '경매장 이용 현황',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 76,
        color: '#fff'
      }
    });

    const [tabKey, setTabKey] = useState(1);
    const tabCallback = useCallback(key => {
      if (+key < 2) {
        setTabKey('first');
      } else if (+key >= 2 && +key < 5) {
        setTabKey(key);
      } else {
        setTabKey('last');
      }      
    }, []);

    return (
      <AppLayout>
        <div className="auction-info-sec">
          <div className={`tabmenu-swipe active-${tabKey}`}>
            <Tabs 
              renderTabBar={() => <SwipeableInkTabBar pageSize={3} />}
              renderTabContent={() => <TabContent />}
              defaultActiveKey="1"
              onChange={tabCallback}
            >
              <TabPane tab="낙찰정보 조회" data-extra="tabpane" key="1">
                <div className="content-wrap">
                  <div className="essential-point tp2 fs12 mt20 pd0">
                    <ul>
                      <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                      <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
                    </ul>
                  </div>
                  <ul className="m-toggle-list search mt16 pd0">
                    <MenuItem>
                      <MenuTitle><p className="tit2">낙찰내역</p><span>상세조회</span></MenuTitle>
                      <MenuCont>
                        <div className="float-wrap mb12">
                          <p className="movie-link-wrap">경매구분</p>
                          <MobSelectBox placeHolder="전체"  options={select1_list} width='70%'/>
                        </div>
                        <MobButtonFilter checkList={[
                          {title: "1주일", checked: true}, 
                          {title: "1개월", checked: false}, 
                          {title: "3개월", checked: false},
                          {title: "6개월", checked: false}
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

                <div className="list-wrap content-wrap content-border">
                  
                  <div className="goods-list admin-list tp6 mt8">
                    <ul>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <Button size="sml" line="gray" color="gray" radius={true} title="경매" width={35} height={24} fontSize={10} marginRight={8}/>
                            <p className="fl fs12 tx-gray">951회(08/30) 1019번</p>
                          </div>
                          <h5 className="subject tp2">소나타(LF) AG280</h5>
                          <div className="info-wrap mt8">
                            <div className="info tx-black">
                              <span>2,330만원 낙찰 </span>
                              <span>수수료 40,000원</span>
                              <span>탁송료 미신청</span>
                            </div>
                          </div>
                          <p className="tit5 tx-n tx-gray mt5">탁송신청주소 : 경기도 수원시 권선구 평동</p>
                          <div className="price-wrap mt20">
                            <div className="fl">
                              <p className="price-tp9 fs12 mt5">결제후 반출 가능</p>
                            </div>
                            <div className="fr">
                              <p className="price-tp9">7,760<span className="won tx-black">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <Button size="sml" line="gray" color="gray" radius={true} title="경매" width={35} height={24} fontSize={10} marginRight={8}/>
                            <p className="fl fs12 tx-gray">951회(08/30) 1019번</p>
                          </div>
                          <h5 className="subject tp2">소나타(LF) AG280소나타(LF) AG280소나타(LF) AG280소나타</h5>
                          <div className="info-wrap mt8">
                            <div className="info tx-black">
                              <span>2,330만원 낙찰 </span>
                              <span>수수료 40,000원</span>
                              <span>탁송료 미신청</span>
                            </div>
                          </div>
                          <p className="tit5 tx-n tx-gray mt5">탁송신청주소 : 경기도 수원시 권선구 평동</p>
                          <div className="price-wrap mt20">
                            <div className="fl">
                              <p className="price-tp9 fs12 mt5">결제후 반출 가능</p>
                            </div>
                            <div className="fr">
                              <p className="price-tp9">7,760<span className="won tx-black">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <Button size="sml" line="gray" color="gray" radius={true} title="경매" width={35} height={24} fontSize={10} marginRight={8}/>
                            <p className="fl fs12 tx-gray">951회(08/30) 1019번</p>
                          </div>
                          <h5 className="subject tp2">소나타(LF) AG280소나타(LF) AG280소나타</h5>
                          <div className="info-wrap mt8">
                            <div className="info tx-black">
                              <span>2,330만원 낙찰 </span>
                              <span>수수료 40,000원</span>
                              <span>탁송료 미신청</span>
                            </div>
                          </div>
                          <div className="price-wrap mt20">
                            <div className="fl">
                              <p className="price-tp9 fs12 mt5">결제후 반출 가능</p>
                            </div>
                            <div className="fr">
                              <p className="price-tp9">7,760<span className="won tx-black">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* 리스트 없을때 */}
                  {/* <div className="search-none pd0" style={{ height: '176px' }}>
                    <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
                  </div> */}

                </div>
              </TabPane>

              <TabPane tab="입찰정보 조회" data-extra="tabpane" key="2">
                <div className="content-wrap">
                  <div className="essential-point tp2 fs12 mt20 pd0">
                    <ul>
                      <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                      <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
                    </ul>
                  </div>
                  <ul className="m-toggle-list search mt16 pd0">
                    <MenuItem>
                      <MenuTitle><p className="tit2">입찰내역</p><span>상세조회</span></MenuTitle>
                      <MenuCont>
                        <div className="float-wrap mb12">
                          <p className="movie-link-wrap">입찰구분</p>
                          <MobSelectBox placeHolder="전체"  options={select1_list} width='70%'/>
                        </div>
                        <MobButtonFilter checkList={[
                          {title: "1주일", checked: true}, 
                          {title: "1개월", checked: false}, 
                          {title: "3개월", checked: false},
                          {title: "6개월", checked: false}
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

                <div className="list-wrap content-wrap content-border">
                  
                  <div className="goods-list admin-list tp6 mt8">
                    <ul>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <Button size="sml" line="gray" color="gray" radius={true} title="부재자" width={44} height={24} fontSize={10} marginRight={8}/>
                            <p className="fl fs12 tx-gray">출품번호 1019</p>
                          </div>
                          <h5 className="subject tp2">소나타(LF) AG280소나타(LF) AG280소나타 AG280소나타 </h5>
                          <div className="price-wrap mt16">
                            <div className="fl">
                              <p className="price-tp9 fs12 mt5 tx-gray">2019.09.02</p>
                            </div>
                            <div className="fr">
                              <p className="price-tp9">1,540<span className="won tx-black">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <Button size="sml" line="gray" color="gray" radius={true} title="후상담" width={44} height={24} fontSize={10} marginRight={8}/>
                            <p className="fl fs12 tx-gray">출품번호 1019</p>
                          </div>
                          <h5 className="subject tp2">임팔라 IM640 Prime</h5>
                          <div className="price-wrap mt16">
                            <div className="fl">
                              <p className="price-tp9 fs12 mt5 tx-gray">2019.09.02</p>
                            </div>
                            <div className="fr">
                              <p className="price-tp9">1,540<span className="won tx-black">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <Button size="sml" line="gray" color="gray" radius={true} title="후상담" width={44} height={24} fontSize={10} marginRight={8}/>
                            <p className="fl fs12 tx-gray">출품번호 1019</p>
                          </div>
                          <h5 className="subject tp2">임팔라 IM640 Prime</h5>
                          <div className="price-wrap mt16">
                            <div className="fl">
                              <p className="price-tp9 fs12 mt5 tx-gray">2019.09.02</p>
                            </div>
                            <div className="fr">
                              <p className="price-tp9">1,540<span className="won tx-black">만원</span></p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* 리스트 없을때 */}
                  {/* <div className="search-none pd0" style={{ height: '176px' }}>
                    <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
                  </div> */}

                </div>
              </TabPane>

              <TabPane tab="클라임 신청 현황" data-extra="tabpane" key="3">
                <div className="content-wrap">
                  <div className="essential-point tp2 fs12 mt20 pd0">
                    <ul>
                      <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                      <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
                    </ul>
                  </div>
                  <ul className="m-toggle-list search mt16 pd0">
                    <MenuItem>
                      <MenuTitle><p className="tit2">클레임 내역</p><span>상세조회</span></MenuTitle>
                      <MenuCont>
                        <div className="float-wrap mb12">
                          <p className="movie-link-wrap">경매구분</p>
                          <MobSelectBox placeHolder="전체"  options={select1_list} width='70%'/>
                        </div>
                        <MobButtonFilter checkList={[
                          {title: "1주일", checked: true}, 
                          {title: "1개월", checked: false}, 
                          {title: "3개월", checked: false},
                          {title: "6개월", checked: false}
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

                <div className="list-wrap content-wrap content-border">
                  
                  <div className="goods-list admin-list tp6 mt8">
                    <ul>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <p className="fl fs12 tx-gray">951회(08/30) 1019번</p>
                          </div>
                          <h5 className="subject tp2">소나타(LF) AG280소나타(LF) AG280소나타 AG280소나타 </h5>
                          <div className="price-wrap mt16">
                            <div className="fl">
                              <p className="price-tp9 fs12 tx-gray">59버 4650</p>
                            </div>
                            <div className="fr">
                              <p className="price-tp9 fs12 tx-gray">2019.09.03<span className="ml4 tx-blue80">처리완료</span></p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <p className="fl fs12 tx-gray">951회(08/30) 1019번</p>
                          </div>
                          <h5 className="subject tp2">소나타(LF) AG280</h5>
                          <div className="price-wrap mt16">
                            <div className="fl">
                              <p className="price-tp9 fs12 tx-gray">59버 4650</p>
                            </div>
                            <div className="fr">
                              <p className="price-tp9 fs12 tx-gray">2019.09.03<span className="ml4 tx-blue80">처리완료</span></p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* 리스트 없을때 */}
                  {/* <div className="search-none pd0" style={{ height: '176px' }}>
                    <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
                  </div> */}

                </div>
              </TabPane>

              <TabPane tab="내 차 팔기 현황" data-extra="tabpane" key="4">
                <div className="content-wrap">
                  <div className="essential-point tp2 fs12 mt20 pd0">
                    <ul>
                      <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                      <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
                    </ul>
                  </div>
                  <ul className="m-toggle-list search mt16 pd0">
                    <MenuItem>
                      <MenuTitle><p className="tit2">나의 출품내역</p><span>상세조회</span></MenuTitle>
                      <MenuCont>
                        <div className="float-wrap mb12">
                          <p className="movie-link-wrap">경매구분</p>
                          <MobSelectBox placeHolder="전체"  options={select1_list} width='70%'/>
                        </div>
                        <MobButtonFilter checkList={[
                          {title: "1주일", checked: true}, 
                          {title: "1개월", checked: false}, 
                          {title: "3개월", checked: false},
                          {title: "6개월", checked: false}
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

                <div className="list-wrap content-wrap content-border">
                  
                  <div className="goods-list admin-list tp6 mt8">
                    <ul>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <p className="fl fs12 tx-gray">951회(08/30) 1019번  A/1</p>
                            <p className="fs12 tx-blue80">경매대기</p>
                          </div>
                          <h5 className="subject tp2">소나타(LF) AG280소나타(LF) AG280소나타 AG280소나타 </h5>
                          <div className="info-wrap mt16">
                            <div className="info tx-b">
                              <span>시작가: 1200만원</span>
                              <span>희망가: 1400만원</span>
                              <span>탁송상태: 신청</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="summary">
                          <div className="float-wrap btn-xs">
                            <p className="fl fs12 tx-gray">951회(08/30) 1019번  A/1</p>
                            <p className="fs12 tx-blue80">경매진행</p>
                          </div>
                          <h5 className="subject tp2">소나타(LF) AG280</h5>
                          <div className="info-wrap mt16">
                            <div className="info tx-b">
                              <span>시작가: 1200만원</span>
                              <span>희망가: 1400만원</span>
                              <span>탁송상태: 신청</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* 리스트 없을때 */}
                  {/* <div className="search-none pd0" style={{ height: '176px' }}>
                    <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
                  </div> */}

                </div>
              </TabPane>
            </Tabs>
          </div>
          

        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap auction-info-sec">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <TabMenu type="type1" defaultTab={1} mount={false} tabLink={[{ index: 0, url: '/mypage/dealerAuction01' }]}>
            <TabCont tabTitle="경매회원안내" id="tab1-1" index={0}>
              Content1
            </TabCont>
            <TabCont tabTitle="경매장 이용 현황" id="tab1-2" index={1}>
              <TabMenu type="type6" className="mt64" defaultTab={0} mount={false} tabLink={[{ index: 0, url: '/mypage/dealerAuction12' },{ index: 1, url: '/mypage/dealerAuction13' },{ index: 2, url: '/mypage/dealerAuction14' },{ index: 3, url: '/mypage/dealerAuction15' }]}>
                <TabCont tabTitle="낙찰정보 조회" id="tab6-1" index={0} className="">
                  <table className="table-tp1 search th-c mt40" summary="조회 영역">
                    <caption className="away">조회 영역</caption>
                    <colgroup>
                      <col width="74px" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>구분</th>
                        <td>
                          <SelectBox id="select4" className="items-sbox" options={[
                            { value: '1', label: '전체' },
                            { value: '2', label: '경매' },
                            { value: '2', label: '부재자' },
                            { value: '2', label: '후상담' },
                            { value: '2', label: '지정시간' }
                          ]} width={188} placeHolder="전체"/>
                        </td>
                      </tr>
                      <tr>
                        <th>기간</th>
                        <td>
                          <DatePicker defaultValue={now} inputHeight={40} />
                          <em className="mg8">~</em>
                          <DatePicker defaultValue={now} inputHeight={40} />
                          <Button className="on" size="mid" line="gray" color="black" title="3개월" width={50} height={40} marginLeft={16} />
                          <Button size="mid" line="gray" color="black" title="1개월" width={50} height={40} marginLeft={8} />
                          <Button size="mid" line="gray" color="black" title="1주일" width={50} height={40} marginLeft={8} />
                          <Button size="mid" background="blue80" title="조회" width={114} height={40 } marginLeft={16} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tx-exp-tp5 mt40">&#8251; 현황 조회만 가능하며, 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</p>
                  <div className="admin-list tp7 auto mt10">
                    <table className="table-tp1 th-c td-c dashed" summary="오토옥션 출품내역에 대한 내용">
                      <caption className="away">오토옥션 출품내역</caption>
                      <colgroup>
                        <col width="10%"/>
                        <col width="12%"/>
                        <col width="*"/>
                        <col width="18%"/>
                        <col width="12%"/>
                        <col width="10%"/>
                      </colgroup>
                      <thead>
                        <tr>
                          <th>경매일</th>
                          <th>출품번호</th>
                          <th>차량정보</th>
                          <th>입금금액</th>
                          <th>결제현황</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowSpan="2">954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-lg">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td><strong className="tx-blue80 h5-tit">17,374,000</strong>만원</td>
                          <td>결제완료</td>
                          <td><Button size="small" radius="true" background="blue80" title="광고등록" width={64} height={24} /></td>
                        </tr>
                        <tr>
                          <td>경매</td>
                          <td colSpan="2" className="tx-l tx-disabled">낙찰금액: <span className="tx-blue80">1,700</span>만원 ㅣ 수수료: <span className="tx-blue80">374,000</span>원 ㅣ 탁송료: <span className="tx-blue80">31,000</span>원</td>
                          <td>차량반출완료</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td rowSpan="2">954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-lg">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td><strong className="tx-blue80 h5-tit">17,374,000</strong>만원</td>
                          <td>결제완료</td>
                          <td><Button size="small" radius="true" line="gray" color="darkgray" title="광고등록" width={64} height={24} /></td>
                        </tr>
                        <tr>
                          <td>후상담</td>
                          <td colSpan="2" className="tx-l tx-disabled">낙찰금액: <span className="tx-blue80">1,700</span>만원 ㅣ 수수료: <span className="tx-blue80">374,000</span>원 ㅣ 탁송료: <span className="tx-red80">미신청</span></td>
                          <td>차량미반출</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td rowSpan="2">954회<br />19.10.01</td>
                          <td>1020</td>
                          <td className="tx-l"><span className="h5-tit">[현대] 그랜저(IG) IG240 Gdi Modern</span><br /><span className="tx-lg">2018 | A/T | 가솔린 | 2,359cc | NB9)미드나잇블랙</span></td>
                          <td><strong className="tx-blue80 h5-tit">17,374,000</strong>만원</td>
                          <td>결제완료</td>
                          <td><Button size="small" radius="true" line="gray" color="darkgray" title="광고등록" width={64} height={24} /></td>
                        </tr>
                        <tr>
                          <td>후상담</td>
                          <td colSpan="2" className="tx-l tx-disabled">낙찰금액: <span className="tx-blue80">1,700</span>만원 ㅣ 수수료: <span className="tx-blue80">374,000</span>원 ㅣ 탁송료: <span className="tx-red80">미신청</span></td>
                          <td>차량미반출</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan="6" className="tx-disabled">조회된 낙찰정보가 없습니다.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <PageNavigator recordCount={50} className="mt32" />
                </TabCont>
                <TabCont tabTitle="입찰정보 조회" id="tab6-2" index={1}>
                  Content2
                </TabCont>
                <TabCont tabTitle="클레임 신청 현황" id="tab6-3" index={2}>
                  Content3
                </TabCont>
                <TabCont tabTitle="내 차 팔기 현황" id="tab6-4" index={3}>
                  Content4
                </TabCont>
              </TabMenu>
            </TabCont>
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerAuction12