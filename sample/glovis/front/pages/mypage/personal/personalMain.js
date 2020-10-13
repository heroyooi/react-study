/**
 * 설명 : 마이페이지(일반) 메인
 * @fileoverview 마이페이지(일반) 메인
 * @requires [homeserviceAction]
 * @author 김지훈
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import qs from 'qs';
import moment from 'moment';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RenderHelper from '@lib/share/render/helper';
import ImgCover from '@lib/share/items/ImgCover';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
// import BannerItem from '@src/components/common/banner/BannerItem';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';

// import { mCarList } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { getCounselCarListMember } from '@src/actions/mypage/dealer/common/counselCarAction';

import { gInfoLive } from '@src/utils/LoginUtils';
import { getCommonCodeAsync } from '@src/utils/DataUtils';
import * as personalApi from '@src/api/mypage/personal/PersonalApi';
import { setComma } from '@src/utils/StringUtil';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import { selectSellcarList } from '@src/api/sellcar/AllSellcarSearchApi';
import { selectSellcarListAction } from '@src/actions/sellcar/allSellcarSearchAction';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { getHomeServiceList } from '@src/actions/mypage/personal/buycar/homeService/homeServiceAction';
import { getInquireList } from '@src/actions/mypage/personal/info/inquireAction';
import { getInterestList } from '@src/actions/main/mainAction';
import { getLastViewList } from '@src/actions/mypage/personal/buycar/buycarActions';

import { imgUrl } from '@src/utils/HttpUtils';
/**
 * [홈서비스진행상태(sttDvcd) 공통코드 유형 : AM061]
 *    [신청완료:0010, 결제대기중:0020, 배송 준비중:0030, 배송중:0040, 배송완료:0050]
 *    [취소신청:0810, 취소완료:0820, 환불진행중:0910, 환불완료:0920]
 *
 * [탁송상태코드(cnsgStatCd) 공통코드 유형 : AM068]
 *    [전체:0010, 입금:0020, 배차:0030, 완료:0040, 취소:0050]
 */

/**
 * 설명 : 마이페이지(일반) 메인
 * @returns {personalMain} 마이페이지(일반) 메인
 */
const personalMain = (props) => {
  const { router, sellCarData } = props;

  console.log('personalMain ::::: sellCarData : ', sellCarData);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const dispatch = useDispatch();
  const [fuelTypes, setFuelTypes] = useState([]);
  const [mssTypes, setMssTypes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const { homeServiceList: listData, homeServiceTotalCnt } = useSelector((store) => store.myHomeServiceNormal);
  const { reqList } = useSelector((state) => state.sellCarStore, []);
  // const counselCarList = useSelector((state) => state?.counselCar?.counselCarListMember);
  const { counselCarListMember } = useSelector((state) => state?.counselCar);
  const { totalCnt: inquireTotalCnt } = useSelector((state) => state?.personalInquire);
  const { recentTotalCount, lastViewList } = useSelector((rootStore) => rootStore.personalPage); //최근본차량
  const { totalCountInterest } = useSelector((rootStore) => rootStore.main); //관심차량
  const dealerMypageInfo = useSelector((state) => state.layout.dealerMypageInfo); //회원정보 조회
  // const jwt = require('jsonwebtoken');
  // const [memberName, setMemberName] = useState('');

  useEffect(() => {
    getCommonCodeAsync('AM032').then((codeList) => setStatusList(codeList.slice(1)));
    getCommonCodeAsync('FM047').then(setMssTypes);
    getCommonCodeAsync('FM048').then(setFuelTypes);
    dispatch({ type: SECTION_MYPAGE });

    const handleRouter = (href) => (e) => {
      e.preventDefault();
      Router.push(href);
    };

    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '마이페이지',
          options: ['back', 'gnb'],
          events: [null, handleRouter('/buycar/listSearch'), null]
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: true
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, []);
  // useEffect(() => {}, []);

  const handleBtnClick = useCallback((e, id) => {
    e.preventDefault();
    alert(`이 상품의 아이디 값은 ${id}입니다.`);
  }, []);

  const handleShowDetail = useCallback((hsvcId) => {
    let link = `/mypage/personal/buycar/homeService`;
    Router.push(`${link}?${qs.stringify({ hsvcId })}`, link);
  }, []);

  const goDetailCounsel = useCallback((dlrPrdId, mbId) => {
    let link = `/mypage/personal/common/counselCar`;
    Router.push(`${link}?${qs.stringify({ dlrPrdId, mbId })}`, link);
  }, []);

  const getParsedOpt = (options = {}) =>
    Object.keys(options)
      .filter((opt) => options[opt] === 'Y')
      .map((opt) => {
        let color, value;
        switch (opt) {
          case 'auctSbidCrYn':
            color = 'red';
            value = '경매';
            break;
          case 'liveYn':
            color = 'blue80';
            value = '라이브';
            break;
        }
        return {
          color,
          value
        };
      });

  // auctSbidCrYn //경매낙찰
  // frnchsCrYn //프랜차이즈
  // hsvcCrYn //홈서비스
  // sbidCrYn //낙찰
  // icmAcrtCrYn //수입인증
  // financeCrYn //금융
  // liveYn //라이브
  // ewCrYn //ew

  const getParsedTags = (options = {}) =>
    Object.keys(options)
      .filter((opt) => options[opt] === 'N')
      .map((opt) => {
        let color;
        let value;
        switch (opt) {
          case 'frnchsCrYn':
            color = 'gold';
            value = '프렌차이즈';
            break;
          case 'hsvcCrYn':
            color = 'purple';
            value = '홈서비스';
            break;
          case 'icmAcrtCrYn':
            color = 'sky';
            value = '수입인증';
            break;
          case 'ewCrYn':
            color = 'blue60';
            value = 'EW';
            break;
        }
        return {
          color,
          value
        };
      });

  const { result, member } = router.query;
  const [memberType, setMemberType] = useState(member);
  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

  const moveHomeServiceDetail = (e, hsvcId) => {
    e.preventDefault();
    Router.push('/mypage/personal/buycar/homeServiceDetail?hsvcId=' + hsvcId);
  };

  const moveSellcarInfo = (slReqId, reqTpcd) => {
    Router.push(`/mypage/personal/sellcar/sellCarView?slReqId=${slReqId}&type=${reqTpcd}`);
  };

  const listClick = (slReqId, reqTpcd) => {
    // console.log('SellCar Move : ', slReqId, reqTpcd);
    let url = '/mypage/personal/sellcar';
    if (reqTpcd === '00001') {
      url += '/visitSellCarView?slReqId=' + slReqId + '&reqtpcd=' + reqTpcd;
    } else if (reqTpcd === '00002') {
      url += '/selfSellCarView?slReqId=' + slReqId + '&reqtpcd=' + reqTpcd;
    } else if (reqTpcd === '00003') {
      url += '/nonevalSellCarView?slReqId=' + slReqId + '&reqtpcd=' + reqTpcd;
    }
    // console.log('push', url);
    Router.push(url);
    // location.href = url;
  };

  if (hasMobile) {
    const closeBluePop1 = (e) => {
      e.preventDefault();
      setBluePop1(false);
    };
    const closeBluePop2 = (e) => {
      e.preventDefault();
      setBluePop2(false);
    };

    return (
      //mobile
      <AppLayout>
        {/* {memberType === 'stop' && bluePop1 && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop1} />
            <p>
              회원님은 현재 차량제한 중입니다.<br />
              광고제한기간은 2020.01.26까지 입니다.
              <span className="ex">&#8251; 제한사유 - 광고 게시글에 욕설/비속어 사용</span>
            </p>
          </div>
        )}
        {memberType === 'no-group-id' && bluePop2 && (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closeBluePop2} />
            <p>
              소속상사 대표 회원이시군요.<br />
              편하게 소속 딜러와 소속 차량을 관리할 수 있는<br />
              단쳬회원/ 제휴법인회원 ID를 신청해보세요.
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="신청하기" width={61} height={30} onClick={handleOpenPop} />
            </Buttons>
            <CheckBox id="chk-close" title="다시보지않기" size="small" checked={todayCheck} isSelf={false} onChange={handleMPop} />
          </div>
        )} */}
        <div className="general-sec">
          <div className="mypage-profile pd20">
            <div className="float-wrap">
              <div className="s-name">
                <Button size="sml" background="gray" title="일반" width={31} height={20} fontSize={10} fontWeight={500} />
                <p className="u-name">
                  {dealerMypageInfo?.mbNm}님, <span>환영합니다.</span>
                </p>
                {!isEmpty(dealerMypageInfo) && !isEmpty(dealerMypageInfo?.auctPrstlsNrmlMb) ? (
                  <>
                    <br /> <span style={{ marginTop: '30px', marginLeft: '35px' }}>오토옥션 계정 {dealerMypageInfo.auctPrstlsNrmlMb} </span>
                  </>
                ) : (
                  ''
                )}
              </div>
              <Button className="b-modify" size="sml" line="gray" color="gray" title="회원정보수정" width={83} height={30} fontWeight={500} href="/mypage/personal/info/changeInfo" />
            </div>
          </div>

          <ul className="general-total-tab">
            <li>
              <Link href="/mypage/personal/buycar/interestCar?seq=2">
                <a>
                  <span className="ico heart"></span>
                  {totalCountInterest !== 0 && <span className="num">{totalCountInterest ?? 0}</span>}
                  <span className="label">관심 차량</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mypage/personal/buycar/interestCar?seq=1">
                <a>
                  <span className="ico eye"></span>
                  {recentTotalCount !== 0 && <span className="num">{recentTotalCount ?? 0}</span>}
                  <span className="label">최근 본 차량</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mypage/personal/common/counselCar">
                <a>
                  <span className="ico note"></span>
                  {counselCarListMember?.length !== 0 && <span className="num">{counselCarListMember?.length ?? 0}</span>}
                  <span className="label">쪽지함</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mypage/personal/info/inquire">
                <a>
                  <span className="ico qna"></span>
                  {inquireTotalCnt !== 0 && <span className="num">{inquireTotalCnt ?? 0}</span>}
                  <span className="label">1:1 문의</span>
                </a>
              </Link>
            </li>
          </ul>

          <div className="content-wrap">
            <div className="list-wrap mb16">
              <h3 className="tit2">서비스 이용내역</h3>
              <p className="tx-exp-tp4">최근 1년 내 신청 내역 1건이 표시됩니다.</p>
            </div>
            {objIsEmpty(listData?.[0]) && objIsEmpty(reqList) ? (
              <div className="list-none-wrap">
                <div className="list-none">
                  <p>서비스 이용 내역이 없습니다.</p>
                  {/* <Buttons align="center" marginTop={16}>
                    <Link href="/buycar/buyCarList">
                      <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={84} height={40} buttonMarkup />
                    </Link>
                  </Buttons> */}
                </div>
              </div>
            ) : (
              <div className="goods-list admin-list tp1">
                <ul>
                  {!objIsEmpty(listData?.[0]) && (
                    <li onClick={(e) => moveHomeServiceDetail(e, listData?.[0].hsvcId)}>
                      <div className="img-cover">
                        <img src={`${imgUrl}${listData?.[0].carPhotoURL}`} alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <span className="list-tag2">
                          <em className="tag-tp2">홈서비스</em>
                        </span>
                        <h5 className="subject">{listData?.[0].carNm}</h5>
                        <Button
                          size="sml"
                          background="blue20"
                          color="blue80"
                          radius={true}
                          title={listData?.[0]?.cnclSttDvcd ? listData?.[0].cnclSttNm : listData?.[0].sttNm}
                          width={53}
                          height={24}
                          fontSize={10}
                          fontWeight={500}
                          marginTop={17}
                        />
                      </div>
                    </li>
                  )}
                  {!objIsEmpty(reqList) && (
                    <li onClick={() => listClick(reqList[0]?.slReqId, reqList[0]?.reqTpcd)}>
                      <div className="img-cover">
                        <img src={reqList[0]?.phtUrl ? imgUrl + reqList[0]?.phtUrl : '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <span className="list-tag2">
                          <em className="tag-tp2">내차팔기</em>
                          <em className="tag-tp2">{reqList[0]?.reqTpcdNm}</em>
                        </span>
                        <h5 className="subject">
                          {/* {reqList[0]?.crNm} */}
                          {reqList[0]?.crMnfcCdNm} {reqList[0]?.crMdlCdNm} {reqList[0]?.crClsCdNm}
                        </h5>
                        <Button
                          size="sml"
                          background={reqList[0]?.reqSttTpcdNm === '신청완료' ? 'blue80' : 'blue20'}
                          color={reqList[0]?.reqSttTpcdNm === '신청완료' ? 'white' : 'blue80'}
                          radius={true}
                          title={reqList[0]?.reqSttTpcdNm}
                          width={53}
                          height={24}
                          marginTop={17}
                          fontSize={10}
                          fontWeight={500}
                        />
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="mypage-nav-renew">
            <MypageNavi mode="normal" />
          </div>

          {/* <Buttons>
            <Button size="full" background="blue20" color="blue80" radius={true} title="금융서비스" />
          </Buttons> */}

          {/* <ul className="sell-ico-wrap border">
            <li>
              <Link href="/sell/visitApply">
                <a>
                  <i className="sell-service-img-01" />
                  <div className="tx-wrap">
                    <p className="tit">방문평가 판매</p>
                    <p className="exp">
                      클릭 한 번이면 끝!
                      <br />
                      견적부터 판매까지 내 집 앞에서 편하게
                    </p>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sell/selfHome">
                <a>
                  <i className="sell-service-img-02" />
                  <div className="tx-wrap">
                    <p className="tit">셀프등록 판매</p>
                    <p className="exp">
                      딜러와의 불편한 흥정은 이제 그만!
                      <br />
                      직접 등록하고 쉽게 견적 받으세요!
                    </p>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sell/freeHome">
                <a>
                  <i className="sell-service-img-03" />
                  <div className="tx-wrap">
                    <p className="tit">무평가 판매</p>
                    <p className="exp">
                      신청완료와 동시에 차량 대금 먼저 지급! <br />
                      이제 대금 먼저 받고 차량 판매하세요!
                    </p>
                  </div>
                </a>
              </Link>
            </li>
          </ul> */}

          {/* <div className="list-wrap content-border">
            <div className="float-wrap btn-s">
              <h3 className="tit2">최근 본 차량</h3>
              <Button size="sml" line="gray" color="gray" radius={true} title={`전체보기`} width={88} height={30} fontWeight={500} href="/mypage/personal/buycar/interestCar" />
            </div>
            {(lastViewList?.length ?? 0) < 1 ? (
              <div className="list-none-wrap">
                <p className="list-none">최근 본 차량이 없습니다.</p>
              </div>
            ) : (
              <ul className="goods-list list-type">
                {lastViewList?.map((history, i) => {
                  if (i < 3) {
                    return <BannerItemBuyCar key={i} data={history} />;
                  }
                })}
              </ul>
            )}
          </div> */}
        </div>
      </AppLayout>
    );
  }
  return (
    //pc
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-sec">
          <ul className="general-admin-tab">
            <li>
              <Link href="/mypage/personal/buycar/interestCar">
                <a>
                  <span>{totalCountInterest ?? 0}</span>관심 차량
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mypage/personal/buycar/lastestViewCar">
                <a>
                  <span>{recentTotalCount ?? 0}</span>최근 본 차량
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mypage/personal/common/counselCar">
                <a>
                  <span>{counselCarListMember?.length ?? 0}</span>쪽지함
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mypage/personal/info/inquire">
                <a>
                  <span>{inquireTotalCnt ?? 0}</span>1:1 문의
                </a>
              </Link>
            </li>
          </ul>

          <div className="list-wrap border mt64">
            <div className="list-tit">
              <h3>
                홈 서비스 내역<span>최근 1년 내 신청 내역 1건이 표시됩니다.</span>
              </h3>
              <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} href="/mypage/personal/buycar/homeService" />
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
                  {!isEmpty(listData?.[0]) ? (
                    <>
                      <thead>
                        <tr>
                          <th>신청일자</th>
                          <th>신청차량</th>
                          <th>가격</th>
                          <th>판매자</th>
                          <th>상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[listData?.[0]].map((v, i) => (
                          <tr key={i}>
                            <td>
                              {v.reqDay}
                              <br />
                              {v.reqTime}
                            </td>
                            <td>
                              {/* TODO: 이미지 경로 수정할 것 */}
                              {/* <ImgCover src={v.photoUrl} alt={'차량 대표이미지'} /> */}
                              <div className="img-cover">
                                <img src={listData?.[0]?.carPhotoURL ? imgUrl + listData?.[0]?.carPhotoURL : '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
                              </div>
                              <div className="summary">
                                <h4 className="subject" style={{ wordBreak: 'keep-all' }}>
                                  {v.carNm}
                                </h4>
                                <ul className="info">
                                  <li>{v.carNo}</li>
                                  <li>{v.firstRegDt}</li>
                                </ul>
                                <ul className="info">
                                  <li>{setComma(v.drvDist)}km</li>
                                  <li>{v.mssNm}</li>
                                  <li>{v.carFuelNm}</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <p className="price-tp6">
                                {setComma(v.carAmt)}
                                <span className="won">만원</span>
                              </p>
                            </td>
                            <td className="seller">
                              {v.dlrNm}
                              <br />
                              {setHpPnFormat(v.dlrHpno)}
                            </td>
                            <td>
                              {v.cnclSttDvcd ? v.cnclSttNm : v.sttNm}
                              <br />
                              <Button
                                size="mid"
                                line="gray"
                                color="black"
                                radius={true}
                                title="상세보기"
                                width={100}
                                height={32}
                                marginTop={8}
                                buttonMarkup={true}
                                onClick={() => handleShowDetail(v.hsvcId)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  ) : (
                    <tbody>
                      <tr>
                        <td>
                          <div className="list-none">서비스 이용 내역이 없습니다.</div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>

          <div className="list-wrap border">
            <div className="list-tit">
              <h3>
                쪽지상담 내역<span>최근 1년 내 신청 내역 1건이 표시됩니다.</span>
              </h3>
              <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} nextLink={true} href={`/mypage/personal/common/counselCar`} />
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
                  {!isEmpty(counselCarListMember[0]) ? (
                    <>
                      <thead>
                        <tr>
                          <th>신청일자</th>
                          <th>상담진행차량</th>
                          {/* <th>판매자</th> */}
                          <th>최초상담내용</th>
                          <th>답변여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isEmpty(counselCarListMember[0]) &&
                          [counselCarListMember[0]].map((counsel, index) => {
                            return (
                              <tr key={index}>
                                <td style={{ padding: '0px 20px 0px 20px' }}>
                                  {moment(counsel.lastCnsIdt, 'yyyymmddHHmmss').format('YYYY.MM.DD')}
                                  <br />
                                  {moment(counsel.lastCnsIdt, 'yyyymmddHHmmss').format('hh:mm')}
                                </td>
                                <td>
                                  <ImgCover src={imgUrl + counsel.cnslPrgrCrImg} alt="차량이미지" />
                                  <div className="summary">
                                    <h4 className="subject">{counsel.crNm}</h4>
                                  </div>
                                </td>
                                <td>{counsel.noteCntn}</td>
                                <td>
                                  {counsel.answerYn === 'Y' ? '답변완료' : '답변대기'}
                                  <br />
                                  <Button
                                    size="mid"
                                    line="gray"
                                    color="black"
                                    radius={true}
                                    title="내용보기"
                                    width={100}
                                    height={32}
                                    marginTop={8}
                                    buttonMarkup={true}
                                    onClick={() => goDetailCounsel(counsel.dlrPrdId, counsel.mbId)}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </>
                  ) : (
                    <tbody>
                      <tr>
                        <td>
                          <div className="list-none">서비스 이용 내역이 없습니다.</div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>

          {/* <div className="list-wrap border">
            <div className="list-tit">
              <h3>
                내차팔기<span>최근 1년 내 신청 내역 1건이 표시됩니다.</span>
              </h3>
              <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} href="/mypage/personal/sellcar/sellCar" />
            </div>
            <div className="admin-list tp7">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="30%" />
                    <col width="*" />
                    <col width="30%" />
                  </colgroup>
                  {!isEmpty(sellCarData) ? (
                    <>
                      <thead>
                        <tr>
                          <th>신청일자</th>
                          <th>신청차량</th>
                          
                          <th>판매방식</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{(sellCarData?.updtDt || sellCarData?.regDt)?.split(' ')[0] || ''}</td>
                          <td>
                            <div className="img-cover">
                              <img src={sellCarData?.phtUrl ? imgUrl + sellCarData?.phtUrl : '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h4 className="subject">{sellCarData?.crNm}</h4>
                              <ul className="info">
                                <li>{sellCarData?.crNo}</li>
                                <li>{sellCarData?.frmYyyy} 년형</li>
                              </ul>
                              <ul className="info">
                                <li>{setComma(sellCarData?.drvDist)}km</li>
                                <li>{sellCarData?.sttDvcdNm}</li>
                                <li>{sellCarData?.fuel}</li>
                              </ul>
                            </div>
                          </td>
                          
                          <td>{sellCarData?.reqTpcdNm}</td>
                          
                        </tr>
                      </tbody>
                    </>
                  ) : (
                    <tbody>
                      <tr>
                        <td>
                          <div className="list-none">서비스 이용 내역이 없습니다.</div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div> */}

          <ul className="sell-ico-wrap">
            <li>
              <Link href="/sell/visitApply">
                <a>
                  <i className="sell-service-img-01" />
                  <p className="exp">
                    클릭 한 번이면 끝!
                    <br />
                    견적부터 판매까지 내 집 앞에서 편하게
                  </p>
                  <p className="tit">방문평가 판매</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sell/selfHome">
                <a>
                  <i className="sell-service-img-02" />
                  <p className="exp">
                    딜러와의 불편한 흥정은 이제 그만!
                    <br />
                    직접 등록하고 쉽게 견적 받으세요!
                  </p>
                  <p className="tit">셀프등록판매</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sell/freeHome">
                <a>
                  <i className="sell-service-img-03" />
                  <p className="exp">
                    신청완료와 동시에 차량 대금 먼저 지급! <br />
                    이제 대금 먼저 받고 차량 판매하세요!
                  </p>
                  <p className="tit">무평가판매</p>
                </a>
              </Link>
            </li>
          </ul>

          <div className="list-wrap recently">
            <div className="list-tit">
              <h4>최근 본 차량</h4>
              <Button className="fr" size="mid" line="gray" color="black" radius={true} title={`전체보기`} width={116} height={32} href="/mypage/personal/buycar/lastestViewCar" />
            </div>
            {/* "phtUrl": "/images/dummy/photo-best-pick1.png",
            "crNm": "현대 그랜저IG 하이브리드 2.4 HEV 익스클루시브 스페셜",
            "crNo": "61저4544",
            "frmYyyy": "2019",
            "drvDist": 34500,
            "mssNm": "A/T",
            "fuelNm": "디젤",
            "dlrPrdId": "DP20022000015",
            "slAmt": 1111,
            "mbId": "test91798",
            "auctSbidCrYn": "N",
            "frnchsCrYn": "N",
            "hsvcCrYn": "Y",
            "sbidCrYn": "N",
            "icmAcrtCrYn": "N",
            "financeCrYn": "N",
            "liveShotYn": "N",
            "liveStudioYn": "N",
            "totalRecentViewedCnt": 1 */}
            {/* // auctSbidCrYn //경매낙찰
            // frnchsCrYn //프랜차이즈
            // hsvcCrYn //홈서비스
            // sbidCrYn //낙찰
            // icmAcrtCrYn //수입인증
            // financeCrYn //금융
            // liveYn //라이브
            // ewCrYn //ew */}
            <ul className="goods-list col3">
              {lastViewList?.length > 0
                ? lastViewList.map((history, i) => {
                    if (i < 3) {
                      return (
                        <BannerItemBuyCar key={i} data={history} />
                        // <BannerItem
                        //   key={i}
                        //   name={history?.crNm}
                        //   price={setComma(history?.slAmt)}
                        //   image={history?.phtUrl}
                        //   alt={history?.alt}
                        //   isButton={history?.isButton}
                        //   buttonName={history?.buttonName}
                        //   tags={getParsedTags({
                        //     ewCrYn: history?.ewCrYn,
                        //     hsvcCrYn: history?.hsvcCrYn,
                        //     icmAcrtCrYn: history?.icmAcrtCrYn,
                        //     frnchsCrYn: history?.frnchsCrYn
                        //   })}
                        //   infos={[`${setComma(history?.drvDist)}km`, mssTypes?.find((mss) => mss.value === history?.mssDvcd)?.label ?? '']}
                        //   options={getParsedOpt({
                        //     auctSbidCrYn: history?.auctSbidCrYn,
                        //     liveYn: history?.liveYn
                        //   })}
                        //   btnClick={handleBtnClick}
                        //   btnId={history?.dlrPrdId}
                        //   buttonName={history?.hsvcCrYn === 'Y' ? '온라인구매' : ''}
                        // />
                      );
                      //17년식26,530km가솔린대구
                    }
                  })
                : !lastViewList?.length && <p className="list-none">최근 본 차량이 없습니다.</p>}
            </ul>
          </div>
          {/* 
          <div className="list-wrap recently">
            <div className="list-tit">
              <h4>최근 본 차량</h4>
              <Button className="fr" size="mid" line="gray" color="black" radius={true} title="27개 전체보기" width={116} height={32} />
            </div>
            <p className="list-none">최근 본 차량이 없습니다.</p>
          </div> */}
        </div>
      </div>
      {/* ============= 홈서비스 상세 내역 팝업 =================================================== */}
      )}
    </AppLayout>
  );
};

personalMain.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { reduxStore, url, accessToken } = helper;
  const { hasMobile } = reduxStore.getState().common;
  const today = moment(new Date()).format('YYYY-MM-DD');
  const todayAweekAgo = moment()
    .subtract(1, 'months')
    .format('YYYY-MM-DD');
  console.log('personalMain.getInitialProps -> today', today);
  console.log('personalMain.getInitialProps -> todayAweekAgo', todayAweekAgo);
  const params = {
    fromDate: todayAweekAgo,
    endDate: today,
    pageQtt: 1,
    reqTpcd: ['000001', '000002', '000003']
  };

  helper.accessControl();

  const [sellCarData] = await Promise.all([
    // selectSellcarList({
    //   endDate: today,
    //   fromDate: todayAweekAgo,
    //   pageQtt: 10
    // }).then((res) => res?.data), //내차팔기
    // reduxStore.dispatch(
    //   getLastViewList({
    //     //최근본차량
    //     pageNo: 1,
    //     pageSize: 1
    //   })
    // ),
    reduxStore.dispatch(selectSellcarListAction(params)), //내차팔기
    reduxStore.dispatch(getHomeServiceList(1, 1)), //홈서비스
    reduxStore.dispatch(
      getInterestList({
        pageNo: 1
      })
    ), //관심차량
    reduxStore.dispatch(getCounselCarListMember(0)), //쪽지상담
    reduxStore.dispatch(
      getInquireList({
        //문의내역
        endDate: today,
        fromDate: todayAweekAgo,
        pageNo: 1,
        pageUnit: 30,
        searchText: ''
      })
    ) //쪽지상담
    //
  ]);

  console.log('sellCarData :::::::::::::::: ', sellCarData);

  return {
    sellCarData: sellCarData?.data?.[0]
  };
};
export default withRouter(personalMain);
