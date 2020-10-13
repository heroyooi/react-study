import { useSelector } from 'react-redux';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';

const DetailDiagnosis = () => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    return (
      <TabMenu type="type2" mount={false}>
        <TabCont tabTitle="진단평가" id="tab2-1" index={0}>
          <div className="autobell-wrap">
            <div className="tit-wrap bg">
              <p>해당 차량은 라이브스튜디오 진단 점검 중<br /><em>[완전 <span>무사고</span> 차량]</em> 입니다.</p>
            </div>
            <TabMenu type="type1" mount={false}>
              <TabCont tabTitle="외부 패널" id="tab1-1" index={0}>
                <div className="label-img-wrap">
                  <div className="img-wrap">
                    <img src="/images/contents/car-outside-img.png" alt="자동차 외부패널" />
                  </div>
                  <ul className="car-record-label">
                    <li><i className="ico-state-w on"></i>판금/용접</li>
                    <li><i className="ico-state-x on"></i>교환</li>
                  </ul>
                </div>
                <table summary="외부패널에 대한 내용" className="table-tp1">
                  <caption className="away">외부패널</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>후드</th>
                      <td>정상</td>
                    </tr>
                    <tr>
                      <th>프론트휀더</th>
                      <td>정상</td>
                    </tr>
                    <tr>
                      <th>도어</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>트렁크리드</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>라디에이터 서포트<br />(볼트체결부품)</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>루프패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>퀴터패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>사이드실패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                  </tbody>
                </table>
              </TabCont>
              <TabCont tabTitle="주요 골격" id="tab1-1" index={1}>
                <div className="label-img-wrap">
                  <div className="img-wrap">
                    <img src="/images/contents/car-inside-img.png" alt="자동차 주요골격" />
                  </div>
                  <ul className="car-record-label">
                    <li><i className="ico-state-w on"></i>판금/용접</li>
                    <li><i className="ico-state-x on"></i>교환</li>
                  </ul>
                </div>
                <table summary="주요골격에 대한 내용" className="table-tp1">
                  <caption className="away">주요골격</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>프론트패널</th>
                      <td>정상</td>
                    </tr>
                    <tr>
                      <th>크로스맴버</th>
                      <td>정상</td>
                    </tr>
                    <tr>
                      <th>인사이드패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>사이드멤버</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>휠하우스</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>대쉬패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>플로어패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>필러패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>리어패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>트렁크 플로어</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                  </tbody>
                </table>
              </TabCont>
            </TabMenu>
          </div>
        </TabCont>
        <TabCont tabTitle="진단기준" id="tab2-2" index={1}>
          <div className="content-wrap autobell-wrap mt20">
            <h4 className="tit2 mb16">오토벨 라이브 스튜디오 진단 분류 기준</h4>
            <table summary="오토벨 라이브 스튜디오 진단 분류 기준에 대한 내용" className="table-tp1">
              <caption className="away">오토벨 라이브 스튜디오 진단 분류 기준</caption>
              <colgroup>
                <col width="26%" />
                <col width="74%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>완전무사고</th>
                  <td>사고이력 없음</td>
                </tr>
                <tr>
                  <th>무사고</th>
                  <td>외부패널의 교체 및 수리</td>
                </tr>
                <tr>
                  <th>유사고</th>
                  <td>골격의 교체 및 수리</td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
            
            <div className="essential-point tp2 fs12 mt16">
              <ul>
                <li><span className="tx-black">&#8251; 완전무사고 :</span> 교환, 판금, 도색, 사고이력이 없는 한 건의 수리도 받지 않은 정비이력을 가진 차량</li>
                <li><span className="tx-black">&#8251; 무사고 :</span> 골격이나 성능에 문제가 없지만, 가벼운 사고로 차량 외관 일부분을 구리 및 교체한 차량</li>
                <li><span className="tx-black">&#8251; 유사고 :</span> 자동차의 주요 프레임(골격)을 교체했거나 수리한 이력이 있는 차량</li>
              </ul>
            </div>
            
            <table summary="차량 교체 및 수리 주요 위치에 대한 내용" className="table-tp1 mt16">
              <caption className="away">차량 교체 및 수리 주요 위치</caption>
              <colgroup>
                <col width="26%" />
                <col width="74%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>외부패널</th>
                  <td>후드/프론트휀더/도어/트렁크리드/라디에이터 서포트/루프패널/퀴터패널/사이드실패널</td>
                </tr>
                <tr>
                  <th>주요골격</th>
                  <td>프론트패널/크로스맴버/인사이드패널/사이드멤버/휠하우스/대쉬패널/플로어패널/필러패널/리어패널/트렁크플로어</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabCont>
        <TabCont tabTitle="점검결과" id="tab2-3" index={2}>
          <div className="content-wrap autobell-wrap mt20">
            <div className="tit-wrap">
              <h4 className="tit2">오토벨 라이브 스튜디오 66가지 점검 보기</h4>
              <ul>
                <li>양호 <span className="tx-blue60">20</span></li>
                <li>수리/보수 <span className="tx-red60">46</span></li>
              </ul>
            </div>
            <ul className="m-toggle-list up-blue">
              <MenuItem>
                <MenuTitle>1. 중고차 사고이력 정보(요약)</MenuTitle>
                <MenuCont>
                  <table summary="중고차 사고이력 정보(요약)에 대한 내용" className="table-tp1">
                    <caption className="away">1. 중고차 사고이력 정보(요약)</caption>
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>제조사</th>
                        <td>현대자동차</td>
                      </tr>
                      <tr>
                        <th>모델</th>
                        <td>제네시스 G80 3.3 GDI AWD</td>
                      </tr>
                      <tr>
                        <th>등급</th>
                        <td>프리미엄 럭셔리</td>
                      </tr>
                      <tr>
                        <th>색상</th>
                        <td>검정</td>
                      </tr>
                      <tr>
                        <th>주행거리</th>
                        <td>123,456km</td>
                      </tr>
                      <tr>
                        <th>차대번호</th>
                        <td>KMHGM41DDHU218412</td>
                      </tr>
                      <tr>
                        <th>최초등록일</th>
                        <td>2017.05.07</td>
                      </tr>
                      <tr>
                        <th>리콜 여부</th>
                        <td>해당없음</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>2. 외장</MenuTitle>
                <MenuCont>
                  <table summary="외장에 대한 내용" className="table-tp1">
                    <caption className="away">2. 외장</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>앞 유리 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>뒷 유리 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>창문 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>스티커 제거 (규정 외)</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>광택 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>와이퍼 작동 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>덴트, 흡칩 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>도장 상태 (페인트)</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>휠 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>타이어 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>번호판 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>플라스틱류 부품 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>3. 실내</MenuTitle>
                <MenuCont>
                  <table summary="실내에 대한 내용" className="table-tp1">
                    <caption className="away">3. 실내</caption>
                    <colgroup>
                      <col width="53%" />
                      <col width="47%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>실내 상태 (마모, 흡집, 파손)</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>실내 세정 확인</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>금연 차량 여부</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>글로브박스 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>대시보드 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>실내 장식 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>룸미러, 거울 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>유리창 내면 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>트렁크 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>모든 시트 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>모든 매트 상태</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>안전벨트 청결 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>악취 처리/제거 확인</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>루프 라이닝 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>보조키 확인</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>매뉴얼 확인</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>스페어 타이어 (KIT) 확인</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>도어 및 내장 트림 상태</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>스티커 제거 (규정 외)</th>
                        <td>양호</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
              <MenuItem>
                <MenuTitle>4. 기능</MenuTitle>
                <MenuCont>
                  <table summary="기능에 대한 내용" className="table-tp1">
                    <caption className="away">4. 기능</caption>
                    <colgroup>
                      <col width="53%" />
                      <col width="47%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>모든 잠금장치 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>스마트키 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>모든 실내등 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>외부 라이트 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>계기판 등 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>메모리 시트 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>전동 시트조절 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>열선 스티어링 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>창문 개폐 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>썬루프 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>경적 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>시트 열선, 통풍, 마사지 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>12v 충전 단자, USB 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>안전벨트 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>에어컨, 히터 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>네비게이션 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>후방 카메라 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>360 어라운드 뷰 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>주차 보조 시스템 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>후방 카메라 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>360 어라운드 뷰 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>주차 보조 시스템 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>컨버터블 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>모든 수납공간 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>스피커 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>라디오, DMB 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>블루투스 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>헤드업 디스플레이 작동</th>
                        <td>수리/보수필요</td>
                      </tr>
                      <tr>
                        <th>뒷좌석 엔터테이먼트 작동</th>
                        <td>양호</td>
                      </tr>
                      <tr>
                        <th>실내, 실외 개조 및 튜닝 확인</th>
                        <td>수리/보수필요</td>
                      </tr>
                    </tbody>
                  </table>
                </MenuCont>
              </MenuItem>
            </ul>
          </div>
        </TabCont>
        <TabCont tabTitle="보상범위" id="tab2-4" index={3}>
          <div className="content-wrap autobell-wrap mt20">
            <h4 className="tit2 mb16">
              보상범위에 대한 한도 고지
              <p className="mt16">라이브스튜디오에서 차량명, 옵션, 사고유무에 대하여 <span className="tx-blue80">점검오류 및 누락이 발생</span>하였을 경우 이로 인해 발생한 고객의 피해는 오토벨 진단 보상프로그램에 의거하여 진단 서비스의 경우 진단 후 3개월 /5천 km이내 <span className="tx-blue80">진단비의 최대 20배</span>까지 보상해 드립니다.</p>
            </h4>
            <table summary="사고감가표에 대한 내용" className="table-tp1">
              <caption className="away">사고감가표</caption>
              <colgroup>
                <col width="53%" />
                <col width="47%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>앞펜더(부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>본넷교체</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>플라스틱 라디에이터 서포트</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>프론트패널</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>A필러 (부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>B필러(부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>사이드실(부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>인사이드패널 (부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>휠하우스(부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>뒤휠하우스(부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>트렁크플로어패널</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>도어(부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>루프패널</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>우물정자프레임</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>리어패널</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>퀴터패널(부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>뒤휠하우스(부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>침수차량</th>
                  <td>1%</td>
                </tr>
              </tbody>
            </table>
            <p className="tx-exp-tp5">&#8251; 거래금액은 오토벨 3개월 평균시세의 10% 이상은 인정하지 않는다.</p>
          </div>
        </TabCont>
      </TabMenu>
    )
  }

  return (
    <div className="con-wrap popup-autobell">
      <TabMenu type="type1" mount={false}>
        <TabCont tabTitle="진단평가 결과" id="tab1-1" index={0}>
          <div className="autobell-wrap">
            <div className="tit-wrap bg">
              <p>해당 차량은 라이브스튜디오 진단 점검 중 <em>[완전 <span>무사고</span> 차량]</em>입니다.</p>
            </div>
            <ul>
              <li>
                <div className="label-img-wrap">
                  <span>외부패널</span>
                  <div className="img-wrap">
                    <img src="/images/contents/car-outside-img.png" alt="자동차 외부패널" />
                  </div>
                </div>
                <table summary="외부패널에 대한 내용" className="table-tp3">
                  <caption className="away">외부패널</caption>
                  <colgroup>
                    <col width="27%" />
                    <col width="23%" />
                    <col width="27%" />
                    <col width="23%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>후드</th>
                      <td>정상</td>
                      <th>트렁크리드</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>프론트휀더</th>
                      <td>정상</td>
                      <th>루프패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>도어</th>
                      <td><span className="w">판금/용접</span></td>
                      <th>퀴터패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>라디에이터<br />서포트<br /><em>(볼트체결부품)</em></th>
                      <td><span className="x">교환</span></td>
                      <th>사이드실패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <div className="label-img-wrap">
                  <span>주요골격</span>
                  <div className="img-wrap">
                    <img src="/images/contents/car-inside-img.png" alt="자동차 주요골격" />
                  </div>
                  <ul className="car-record-label">
                    <li><i className="ico-state-w on"></i>판금/용접</li>
                    <li><i className="ico-state-x on"></i>교환</li>
                  </ul>
                </div>
                <table summary="주요골격에 대한 내용" className="table-tp3">
                  <caption className="away">주요골격</caption>
                  <colgroup>
                    <col width="27%" />
                    <col width="23%" />
                    <col width="27%" />
                    <col width="23%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>프론트패널</th>
                      <td>정상</td>
                      <th>대쉬패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>크로스맴버</th>
                      <td>정상</td>
                      <th>플로어패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>인사이드패널</th>
                      <td>정상</td>
                      <th>필러패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>사이드멤버</th>
                      <td><span className="w">판금/용접</span></td>
                      <th>리어패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>휠하우스</th>
                      <td><span className="x">교환</span></td>
                      <th>트렁크 플로어</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </TabCont>
        <TabCont tabTitle="진단기준" id="tab1-2" index={1}>
          <div className="autobell-wrap">
            <div className="tit-wrap">
              <h4>오토벨 라이브 스튜디오 <span>진단 분류 기준</span></h4>
            </div>
            <table summary="오토벨 라이브 스튜디오 진단 분류 기준에 대한 내용" className="table-tp1 th-c td-c">
              <caption className="away">오토벨 라이브 스튜디오 진단 분류 기준</caption>
              <colgroup>
                <col width="33.33%" />
                <col width="33.33%" />
                <col width="33.33%" />
              </colgroup>
              <thead>
                <tr>
                  <th>완전무사고</th>
                  <th>무사고</th>
                  <th>유사고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>사고이력 없음</td>
                  <td>외부패널의 교체 및 수리</td>
                  <td>골격의 교체 및 수리</td>
                </tr>
              </tbody>
            </table>
            <p className="table-exp">
              완전무사고 :  교환, 판금, 도색, 사고이력이 없는 한 건의 수리도 받지 않은 정비이력을 가진 차량<br />
              무사고 : 골격이나 성능에 문제가 없지만, 가벼운 사고로 차량 외관 일부분을 구리 및 교체한 차량<br />
              유사고 차량 : 자동차의 주요 프레임(골격)을 교체했거나 구리한 이력이 있는 차량
            </p>
            <table summary="차량 교체 및 수리 주요 위치에 대한 내용" className="table-tp1 th-c">
              <caption className="away">차량 교체 및 수리 주요 위치</caption>
              <colgroup>
                <col width="10%" />
                <col width="90%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>외부패널</th>
                  <td>후드/프론트휀더/도어/트렁크리드/라디에이터 서포트/루프패널/퀴터패널/사이드실패널</td>
                </tr>
                <tr>
                  <th>주요골격</th>
                  <td>프론트패널/크로스맴버/인사이드패널/사이드멤버/휠하우스/대쉬패널/플로어패널/필러패널/리어패널/트렁크플로어</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabCont>
        <TabCont tabTitle="점검 결과" id="tab1-3" index={2}>
          <div className="autobell-wrap">
            <div className="tit-wrap bg">
              <h4>오토벨 라이브 스튜디오  <span>66가지 점검</span> 보기</h4>
              <ul>
                <li>양호 <span className="tx-blue60">20</span></li>
                <li>수리/보수 <span className="tx-red60">46</span></li>
              </ul>
              <Button size="mid" line="gray" radius={true} title="인쇄하기" width={85} />
            </div>
            <table summary="차량정보에 대한 내용" className="table-tp1 th-c td-c">
              <caption>1. 차량정보</caption>
              <colgroup>
                <col width="33.33%" />
                <col width="33.33%" />
                <col width="33.33%" />
              </colgroup>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>점검 내용</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>제조사</th>
                  <td>제조사 내용 입력</td>
                  <td>제조사 내용 입력</td>
                </tr>
                <tr>
                  <th>모델</th>
                  <td>모델 내용 입력</td>
                  <td>모델 내용 입력</td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td>등급 내용 입력</td>
                  <td>등급 내용 입력</td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>색상 내용 입력</td>
                  <td>색상 내용 입력</td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>주행거리 내용 입력</td>
                  <td>주행거리 내용 입력</td>
                </tr>
                <tr>
                  <th>차대번호</th>
                  <td>차대번호 내용 입력</td>
                  <td>차대번호 내용 입력</td>
                </tr>
                <tr>
                  <th>최초등록일</th>
                  <td>최초등록일 내용 입력</td>
                  <td>최초등록일 내용 입력</td>
                </tr>
                <tr>
                  <th>리콜 여부</th>
                  <td>리콜 여부 내용 입력</td>
                  <td>리콜 여부 내용 입력</td>
                </tr>
              </tbody>
            </table>
            <table summary="외장에 대한 내용" className="table-tp1 th-c td-c">
              <caption>2. 외장</caption>
              <colgroup>
                <col width="33.33%" />
                <col width="33.33%" />
                <col width="33.33%" />
              </colgroup>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>점검 내용</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>앞 유리 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>뒷 유리 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>창문 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>스티커 제거(규정 외)</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>광택 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>와이퍼 작동 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>덴트, 흡칩 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>도장 상태(페인트)</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>휠 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>타이어 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>번호판 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>플라스틱류 부품 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
            <table summary="실내에 대한 내용" className="table-tp1 th-c td-c">
              <caption>3. 실내</caption>
              <colgroup>
                <col width="33.33%" />
                <col width="33.33%" />
                <col width="33.33%" />
              </colgroup>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>점검 내용</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>실내 상태(마모, 흡집, 파손)</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>실내 세정 확인</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>금연 차량 여부</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>글로브박스 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>대시보드 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>실내 장식 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>룸미러, 거울 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>유리창 내면 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>트렁크 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>모든 시트 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>모든 매트 상태</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>안전벨트 청결 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>악취 처리/제거 확인</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>루프 라이닝 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>보조키 확인</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>매뉴얼 확인</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>스페어 타이어(KIT) 확인</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>도어 및 내장 트림 상태</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>스티커 제거(규정 외)</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
            <table summary="기능에 대한 내용" className="table-tp1 th-c td-c">
              <caption>4. 기능</caption>
              <colgroup>
                <col width="33.33%" />
                <col width="33.33%" />
                <col width="33.33%" />
              </colgroup>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>점검 내용</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>모든 잠금장치 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>스마트키 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>모든 실내등 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>외부 라이트 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>계기판 등 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>메모리 시트 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>전동 시트조절 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>열선 스티어링 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>창문 개폐 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>썬루프 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>경적 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>시트 열선, 통풍, 마사지 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>12v 충전 단자, USB 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>안전벨트 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>에어컨, 히터 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>네비게이션 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>후방 카메라 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>360 어라운드 뷰 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>주차 보조 시스템 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>후방 카메라 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>360 어라운드 뷰 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>주차 보조 시스템 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>컨버터블 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>모든 수납공간 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>스피커 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>라디오, DMB 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>블루투스 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>헤드업 디스플레이 작동</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>뒷좌석 엔터테이먼트 작동</th>
                  <td>양호</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>실내, 실외 개조 및 튜닝 확인</th>
                  <td>수리/보수필요</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabCont>
        <TabCont tabTitle="보상범위" id="tab1-4" index={3}>
          <div className="autobell-wrap">
            <div className="tit-wrap">
              <h4>보상범위에 대한 한도 고지</h4>
            </div>
            <p className="tit-exp">라이브스튜디오에서 차량명, 옵션, 사고유무에 대하여 점검오류 및 누락이 발생하였을 경우 이로 인해 발생한 고객의 피해는 오토벨 진단 보상프로그램에 의거하여 진단 서비스의 경우 진단 후 3개월 /5천 km이내 진단비의 최대 20배까지 보상해 드립니다.</p>
            <table summary="보상범위에 대한 한도 고지에 대한 내용" className="table-tp1 th-c td-c">
              <caption className="away">보상범위에 대한 한도 고지</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th>사고여부</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>진단비의 20배 이내</td>
                  <td>보상범위 내에서 <span className="tx-blue80">사고 감가표</span> 적용</td>
                </tr>
              </tbody>
            </table>
            <table summary="사고감가표에 대한 내용" className="table-tp1 th-c td-c">
              <caption>사고감가표</caption>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th>평가항목</th>
                  <th>감가율</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>앞펜더(부위별)</th>
                  <td>2%</td>
                </tr>
                <tr>
                  <th>본넷교체</th>
                  <td>4%</td>
                </tr>
                <tr>
                  <th>플라스틱 라디에이터 서포트</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>프론트패널</th>
                  <td>4%</td>
                </tr>
                <tr>
                  <th>A필러 (부위별)</th>
                  <td>4%</td>
                </tr>
                <tr>
                  <th>B필러(부위별)</th>
                  <td>4%</td>
                </tr>
                <tr>
                  <th>사이드실(부위별)</th>
                  <td>3%</td>
                </tr>
                <tr>
                  <th>인사이드패널 (부위별)</th>
                  <td>1%</td>
                </tr>
                <tr>
                  <th>휠하우스(부위별)</th>
                  <td>6%</td>
                </tr>
                <tr>
                  <th>뒤휠하우스(부위별)</th>
                  <td>5%</td>
                </tr>
                <tr>
                  <th>트렁크플로어패널</th>
                  <td>4%</td>
                </tr>
                <tr>
                  <th>도어(부위별)</th>
                  <td>3%</td>
                </tr>
                <tr>
                  <th>루프패널</th>
                  <td>8%</td>
                </tr>
                <tr>
                  <th>우물정자프레임</th>
                  <td>3%</td>
                </tr>
                <tr>
                  <th>리어패널</th>
                  <td>3%</td>
                </tr>
                <tr>
                  <th>퀴터패널(부위별)</th>
                  <td>4%</td>
                </tr>
                <tr>
                  <th>뒤휠하우스(부위별)</th>
                  <td>5%</td>
                </tr>
                <tr>
                  <th>침수차량</th>
                  <td>20%</td>
                </tr>
              </tbody>
            </table>
            <p className="table-exp">* 거래금액은 오토벨 3개월 평균시세의 10% 이상은 인정하지 않는다.</p>
          </div>
        </TabCont>
      </TabMenu>
    </div>
  )
}

export default DetailDiagnosis;