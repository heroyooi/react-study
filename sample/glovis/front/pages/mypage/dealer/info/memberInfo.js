/**
 * 설명 : 딜러 회원정보/소개 관리
 * @fileoverview 딜러 기본정보
 * @requires memberInfoAction, memberInfoReducer
 * @author 김지현
 */
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isEmpty } from 'lodash';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Textarea from '@lib/share/items/Textarea';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import StarScore from '@lib/share/items/StarScore';
import MobBottomArea from '@lib/share/items/MobBottomArea';

import { getMyMbInfo, saveInfo } from '@src/actions/mypage/dealer/memberInfoAction';
import { gInfoLive } from '@src/utils/LoginUtils';

import KakaoMap from '@src/components/common/KakaoMap';
import ImgPopup from '@src/components/common/popup/ImagePop';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { SystemContext } from '@src/provider/SystemProvider';

// 풀페이지 팝업 관련 컴포넌트 및 액션 타입명
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobCarInfoModify from '@src/components/common/MobCarInfoModify';
import MobFilterModel from '@src/components/common/MobFilterModel';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import SelfDealerInfoPopup from '@src/components/mypage/sellcar/popup/SelfDealerInfoPopup';
import * as api from '@src/api/sellcar/AllSellcarSearchApi';
import { preventScroll } from '@src/utils/CommonUtil';

const imgBaseUrl = process.env.IMGURL;
/**
 * 설명 : 딜러 회원정보 /소개 관리 & 주력정보 수정, 자기소개 수정
 * @param { powerInfo, myIntroduceInfo } 입력 정보
 * @returns {myMbInfo} 딜러 정보 & 셀프평가 정보
 */
const MemberInfo = ({ router }) => {
  const { showAlert } = useContext(SystemContext);
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    setUserId(gInfoLive().id);
  }, []);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '회원정보/소개관리',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#ffffff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  const [isModalOpen, setModalOpen] = useState(false); // 지도가 먼저뜨는 것을 방지하기 위해
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false); // 지도
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
  const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false);
  const [rodalDealerInfo, setRodalDealerInfo, dealerInfoPopupHandler, dealerInfoModalCloseHandler] = useRodal(false);
  const myMbInfo = useSelector((state) => state.memberInfo.myMbInfoData);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>=%o', myMbInfo);
  const [powerInfo, setPowerInfo] = useState('');
  const [myIntroduceInfo, setMyIntroduceInfo] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imgTtl, setImgTtl] = useState('');
  const [chk, setChk] = useState('');
  const [dealer, setDealer] = useState({});

  // 딜러 정보 보기 버튼 핸들러
  const _dealerInfoPopupHandler = async (mbId) => {
    api
      .selectDealerDetail({ dlrId: mbId })
      .then((res) => {
        console.log(res);
        if (res.data.statusinfo.returncd === '000') {
          setDealer(res.data.data);
          setRodalDealerInfo(true);
        } else if (res.data.statusinfo.returncd === '001') {
          showAlert('입찰자 정보가 없습니다.');
        }
      })
      .catch((err) => console.log(err));
  };

  const modalClosepowerInfoHandler = (e) => {
    e.preventDefault();
    setRodalShow1(false);
  };

  const modalClosemyInfoHandler = (e) => {
    e.preventDefault();
    setRodalShow2(false);
  };

  const rodalMapPopupHandler = useCallback((e, fade) => {
    e.preventDefault();
    setModalOpen(true);
    setRodalShow(true);
  });

  const rodalPopupHandlerPop1 = (e) => {
    e.preventDefault();
    setRodalShow1(true);
    setChk('');
  };

  const rodalPopupHandlerPop2 = (e) => {
    e.preventDefault();
    setRodalShow2(true);
    setChk('');
  };

  const onHandleBtnClick = (e, url) => {
    e.preventDefault();
    Router.push(url);
  };

  const onHandleBtnClick2 = (e) => {
    e.preventDefault();
    //dispatch(initMyMbInfo());
    //Router.push('/mypage/dealer/info/changeMember');
    //Router.push({ pathname: '/mypage/dealer/info/changeMember'}, '/mypage/dealer/info/changeMember');
    //dispatch(initMyMbInfo());
    window.location.href = '/mypage/dealer/info/changeMember';
    //Router.push({ pathname: '/mypage/dealer/info/changeMember'});
  };

  const onHandleImgClick = (e, imgUrl, imgTtl) => {
    e.preventDefault();
    setImgUrl(imgUrl);
    setImgTtl(imgTtl);
    setRodalShow3(true);
  };

  const onChangeAll = (e) => {
    if (e.target.name === 'powerInfo') setPowerInfo(e.target.value);
    if (e.target.name === 'myIntroduceInfo') setMyIntroduceInfo(e.target.value);
  };

  const handleSave = useCallback((e, value) => {
    console.log('memberInfo handleSave validation 필요');

    let paramObj = null;
    if (value === 'p') {
      // 주력 정보 수정
      paramObj = {
        sType: 'p',
        mbId: userId,
        mfInfo: powerInfo
      };
    } else {
      // 자기 소개 수정
      paramObj = {
        sType: 'i',
        mbId: userId,
        slfIntrd: myIntroduceInfo
      };
    }

    dispatch(saveInfo(paramObj));
    setRodalShow1(false);
    setRodalShow2(false);
    setChk('COMPLETE');
    //window.location.reload();
  });

  useEffect(
    (e) => {
      if (isEmpty(myMbInfo)) {
        dispatch(getMyMbInfo(gInfoLive().id));
      }
      if (!isEmpty(myMbInfo)) {
        setPowerInfo(myMbInfo.data.mfInfo);
        setMyIntroduceInfo(myMbInfo.data.slfIntrd);
      }
    },
    [myMbInfo]
  );

  useEffect(
    (e) => {
      if (!isEmpty(myMbInfo) && !rodalShow1 && chk == 'COMPLETE') {
        if (myMbInfo.data.slfIntrd != myIntroduceInfo) {
          dispatch(getMyMbInfo(userId));
          return;
        }
      }
    },
    [myIntroduceInfo, rodalShow1, chk]
  );

  useEffect(
    (e) => {
      if (!isEmpty(myMbInfo) && !rodalShow2 && chk == 'COMPLETE') {
        if (myMbInfo.data.mfInfo != powerInfo) {
          dispatch(getMyMbInfo(userId));
          return;
        }
      }
    },
    [powerInfo, rodalShow2, chk]
  );
  // 모바일
  const { member, seq, popup, fs_popup } = router.query;
  const [memberType, setMemberType] = useState(member === 'organization' ? 'organization' : 'private'); //  private(개인딜러 회원), organization(단체, 제휴 회원)

  const [InfoMode, setInfoMode] = useState('info');
  const handleInfoMode = useCallback(
    (mode) => () => {
      setInfoMode(mode);
    },
    []
  );

  if (hasMobile) {
    const [dimm1, setDimm1] = useState(Boolean(popup) === true ? true : false);
    const [active1, setActive1] = useState(Boolean(popup) === true ? true : false);
    const [active2, setActive2] = useState(Boolean(popup) === true ? true : false);
    const handleOpenCorrect = useCallback((e, name) => {
      e.preventDefault();
      if (name === 'mfInfo') {
        setActive1(true);
      } else {
        setActive2(true);
      }
      setDimm1(true);
      preventScroll(true);
    }, []);

    const handleMobSave = useCallback((e, value) => {
      handleSave(e, value);
      handleCloseDimm1(e);
    });

    const handleCloseDimm1 = useCallback((e) => {
      e.preventDefault();
      setActive1(false);
      setActive2(false);
      setDimm1(false);
      preventScroll(false);
    }, []);

    // 풀페이지 팝업 START
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    const [fpBusinessApply, setFpBusinessApply] = useState(false);
    const [fpManageBusinessApply, setFpManageBusinessApply] = useState(false);
    const [fpMobKakaoMap, setFpMobKakaoMap] = useState(false);
    const handleFullpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'mpop1') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '사업자등록증',
              options: ['back', 'close']
            }
          });
          setFpBusinessApply(true);
          setFpManageBusinessApply(false);
          setFpMobKakaoMap(false);
        } else if (name === 'mpop2') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '관리사업자등록증',
              options: ['back', 'close']
            }
          });
          setFpManageBusinessApply(true);
          setFpBusinessApply(false);
          setFpMobKakaoMap(false);
        } else if (name === 'mpop3') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '판매점 위치',
              options: ['back', 'close']
            }
          });
          setFpManageBusinessApply(false);
          setFpBusinessApply(false);
          setFpMobKakaoMap(true);
        }
      },
      []
    );

    useEffect(() => {
      if (+fs_popup === 1) {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '사업자 등록증',
            options: ['back', 'close']
          }
        });
        setFpBusinessApply(true);
        setFpManageBusinessApply(false);
      } else if (+fs_popup === 2) {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '관리 사업자 등록증',
            options: ['back', 'close']
          }
        });
        setFpManageBusinessApply(true);
        setFpBusinessApply(false);
      }
    }, []);

    const closeFullpagePopup = useCallback((e) => {
      e.preventDefault();
      setFpBusinessApply(false);
      setFpManageBusinessApply(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
    }, []);
    // 풀페이지 팝업 END

    const [isTab, setIsTab] = useState(+seq === 2 ? 1 : 0);
    if (isEmpty(myMbInfo)) {
      return null;
    }
    return (
      <AppLayout>
        <div className="content-wrap seller-wrap">
          {memberType === 'private' && (
            <>
              <div className="profile">
                <div className="img-wrap">
                  <img src={isEmpty(myMbInfo) ? '' : imgBaseUrl + myMbInfo.data.mbProfFileUrl} alt="딜러 이미지" />
                  {/*}<img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />{*/}
                </div>
                <div className="tx-wrap v-2">
                  <h2>{myMbInfo.data.mbNm}</h2>
                  <p>{myMbInfo.data.mbHpPnEnc}</p>
                  <ul className="employee-card">
                    <li>
                      {myMbInfo.data.acId} {myMbInfo.data.entrCorpNm}
                    </li>
                    <li>
                      종사원증번호: {myMbInfo.data.mbEn}
                      {myMbInfo.data.mbEnEprDday > 30 && <span className="d-day tx-blue80">D-{myMbInfo.data.mbEnEprDday}</span>}
                      {myMbInfo.data.mbEnEprDday <= 30 && <span className="d-day tx-red80">D-{myMbInfo.data.mbEnEprDday}</span>}
                    </li>
                  </ul>
                  <Buttons className="tx-btn-wrap mt16">
                    <Button size="sml" line="gray" title="회원정보 수정" width={74} height={24} fontSize={10} radius={true} href="/mypage/dealer/info/changeMember" nextLink={true} />
                    <Button size="sml" line="gray" title="비밀번호 변경" width={74} height={24} fontSize={10} radius={true} href="/mypage/dealer/info/confirmPwd" nextLink={true} />
                  </Buttons>
                </div>
              </div>
              <ul>
                <li>
                  판매중<span>{isEmpty(myMbInfo.carData) ? 0 : myMbInfo.carData.proCnt}</span>
                </li>
                <li>
                  판매완료<span>{isEmpty(myMbInfo.carData) ? 0 : myMbInfo.carData.comCnt}</span>
                </li>
              </ul>
            </>
          )}
          {memberType === 'organization' && (
            <>
              <div className="profile">
                <div className="img-wrap">
                  <img src={isEmpty(myMbInfo) ? '' : imgBaseUrl + myMbInfo.data.mbProfFileUrl} alt="딜러 이미지" />
                </div>
                <div className="tx-wrap v-2">
                  <h2>{myMbInfo.data.entrCorpNm}</h2>
                  <p>{myMbInfo.data.mbHpPnEnc}</p>
                  <ul className="employee-card">
                    <li>
                      {myMbInfo.data.acId} {myMbInfo.data.entrCorpNm}
                    </li>
                  </ul>
                  <Buttons className="tx-btn-wrap mt16">
                    <Button size="sml" line="gray" title="회원정보 수정" width={74} height={24} fontSize={10} radius={true} href="/mypage/dealer/info/changeMember" nextLink={true} />
                    <Button size="sml" line="gray" title="비밀번호 변경" width={74} height={24} fontSize={10} radius={true} href="/mypage/dealer/info/confirmPwd" nextLink={true} />
                  </Buttons>
                </div>
              </div>
              <ul>
                <li>
                  판매중<span>{isEmpty(myMbInfo.carData) ? 0 : myMbInfo.carData.proCnt}</span>
                </li>
                <li>
                  판매완료<span>{isEmpty(myMbInfo.carData) ? 0 : myMbInfo.carData.comCnt}</span>
                </li>
              </ul>
            </>
          )}
        </div>
        <TabMenu type="type2 big" className="mt8" defaultTab={isTab}>
          <TabCont tabTitle="판매점 정보" id="tab7-1" index={0} onClick={handleInfoMode('info')}>
            {/*}
            {memberType === 'organization' && (
            <>{*/}
            <Buttons align="right" className="mb16">
              <Button size="sml" line="gray" title="사업자등록증" width={74} height={24} fontSize={10} radius={true} onClick={handleFullpagePopup('mpop1')} />
              <Button size="sml" line="gray" title="관리사업자등록증" width={90} height={24} fontSize={10} radius={true} onClick={handleFullpagePopup('mpop2')} />
            </Buttons>
            {/*}</>
            )}{*/}
            <table summary="판매자 정보에 대한 내용" className="table-tp1">
              <caption className="away">판매자 정보</caption>
              <colgroup>
                <col width="35%" />
                <col width="65%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>소속상사명</th>
                  <td>{myMbInfo.data.entrCorpNm}</td>
                </tr>
                <tr>
                  <th>대표자명</th>
                  <td>{myMbInfo.data.reprNm}</td>
                </tr>
                <tr>
                  <th>소속단지</th>
                  <td>{myMbInfo.data.acId}</td>
                </tr>
                <tr>
                  <th>사업자등록번호</th>
                  <td>{myMbInfo.data.mbBrn}</td>
                </tr>
                <tr>
                  <th>판매점 주소</th>
                  <td>
                    <span className="tx-blue80 t-underline" onClick={handleFullpagePopup('mpop3')}>
                      {myMbInfo.data.mbStrZcd}
                      <br />
                      {myMbInfo.data.mbStrAddr}
                      <br />
                      {myMbInfo.data.mbStrDtlAddr}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>판매점 연락처</th>
                  <td>{myMbInfo.data.mbStrPn}</td>
                </tr>
                <tr>
                  <th>팩스</th>
                  <td>{myMbInfo.data.mbStrFaxno}</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td>{myMbInfo.data.mbStrSlHmCntn}</td>
                </tr>
              </tbody>
            </table>
          </TabCont>
          <TabCont tabTitle="셀프평가 이용현황" id="tab7-2" index={1} onClick={handleInfoMode('self')}>
            <Buttons align="right" className="mb16">
              <Button size="sml" line="gray" title="주력정보 수정" width={80} height={24} fontSize={10} radius={true} onClick={(e) => handleOpenCorrect(e, 'mfInfo')} />
              <Button size="sml" line="gray" title="소개글 수정" width={80} height={24} fontSize={10} radius={true} onClick={(e) => handleOpenCorrect(e, 'slfIntrd')} />
            </Buttons>
            <table summary="셀프평가 이용현황에 관한 내용" className="table-tp1">
              <caption className="away">셀프평가 이용현황</caption>
              <colgroup>
                <col width="35%" />
                <col width="65%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2">평점</th>
                </tr>
                <tr>
                  <td colSpan="2">
                    <ul className="star-wrap">
                      <li>
                        <span className="start-group">
                          <StarScore grade={isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.psAvg} />
                        </span>
                        <span className="score-txt">{isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.psAvg}</span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">셀프평가 이용현황</th>
                </tr>
                <tr>
                  <td colSpan="2">
                    <dl className="tx-left-group">
                      <dd>입찰: {isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.biddCnt}대</dd>
                      <dd>성사: {isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.succBiddCnt}대</dd>
                      <dd>성사율: {isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.succRate}%</dd>
                    </dl>
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">만족도</th>
                </tr>
                <tr>
                  <td colSpan="2">
                    <ul className="star-wrap">
                      <li>
                        <span className="score-tit">가격</span>
                        <span className="start-group">
                          <StarScore grade={isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps1} />
                        </span>
                        <span className="score-txt">{isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps1}</span>
                      </li>
                      <li>
                        <span className="score-tit">서비스</span>
                        <span className="start-group">
                          <StarScore grade={isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps2} />
                        </span>
                        <span className="score-txt">{isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps2}</span>
                      </li>
                      <li>
                        <span className="score-tit">추천여부</span>
                        <span className="start-group">
                          <StarScore grade={isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps3} />
                        </span>
                        <span className="score-txt">{isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps3}</span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>주력정보</th>
                  <td>{myMbInfo.data.mfInfo}</td>
                </tr>
                <tr>
                  <th>자기소개</th>
                  <td>{myMbInfo.data.slfIntrd}</td>
                </tr>
              </tbody>
            </table>
          </TabCont>
        </TabMenu>

        <div className={dimm1 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm1} />
        <MobBottomArea active={active1}>
          <div className="inner correct">
            <h3 className="tit1 mb12">주력정보 수정</h3>
            <table summary="주력정보 수정" className="table-tp2 th-none">
              <caption className="away">주력정보 수정</caption>
              <tbody>
                <tr>
                  <td>
                    <p className="tx-tit">주력정보</p>
                    <Textarea
                      countLimit={50}
                      type="tp1"
                      height={96}
                      placeHolder="주력정보를 입력하세요."
                      data={isEmpty(myMbInfo.data.mfInfo) ? '' : myMbInfo.data.mfInfo}
                      onChange={onChangeAll}
                      name="powerInfo"
                    />
                    <p className="tx-tp3 mt8">예시) #수입전문 #BMW #5시리즈 #최고가</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" height={56} onClick={handleCloseDimm1} />
            <Button size="big" background="blue80" title="수정완료" height={56} onClick={(e) => handleMobSave(e, 'p')} />
          </Buttons>
        </MobBottomArea>

        <MobBottomArea active={active2}>
          <div className="inner correct">
            <h3 className="tit1 mb12">소개글 수정</h3>
            <table summary="소개글 수정" className="table-tp2 th-none">
              <caption className="away">소개글 수정</caption>
              <tbody>
                <tr>
                  <td>
                    <p className="tx-tit">소개글</p>
                    <Textarea countLimit={500} type="tp1" height={133} data={isEmpty(myMbInfo.data.slfIntrd) ? '' : myMbInfo.data.slfIntrd} onChange={onChangeAll} name="myIntroduceInfo" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" height={56} onClick={handleCloseDimm1} />
            <Button size="big" background="blue80" title="수정완료" height={56} onClick={(e) => handleMobSave(e, 'i')} />
          </Buttons>
        </MobBottomArea>

        <MobFullpagePopup active={mFullpagePopup}>
          {fpMobKakaoMap && (
            <div className="img-wrap v-2 pd20">
              <KakaoMap style={{ width: '100%', height: '500px', frameBorder: '0' }} addr={myMbInfo.data.mbStrAddr} />
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFullpagePopup} />
            </div>
          )}
          {fpBusinessApply && (
            <div className="img-wrap v-2 pd20">
              {myMbInfo?.data?.blFileUrl ? <img src={imgBaseUrl + myMbInfo.data.blFileUrl} alt="사업자등록증 이미지" /> : null}
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFullpagePopup} />
            </div>
          )}
          {fpManageBusinessApply && (
            <div className="img-wrap v-2 pd20">
              {myMbInfo?.data?.mgmtBlFileUrl ? <img src={imgBaseUrl + myMbInfo.data.mgmtBlFileUrl} alt="관리사업자등록증 이미지" /> : null}
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFullpagePopup} />
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  if (isEmpty(myMbInfo)) {
    return null;
  }
  const style = {
    border: '1px solid black',
    width: '586px',
    height: '500px'
  };

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec member-info">
          <div className="mypage-admin-title">
            <h3>회원정보/소개 관리</h3>
          </div>

          <Buttons align="right">
            <Button size="big" background="blue80" title="회원정보 수정" width={170} height={48} onClick={(e) => onHandleBtnClick2(e)} />
            <Button size="big" background="blue80" title="비밀번호 변경" width={170} height={48} onClick={(e) => onHandleBtnClick(e, '/mypage/dealer/info/confirmPwd')} />
          </Buttons>
          <div className="basic-info-wrap">
            <h4>기본정보</h4>
            <div className="img-wrap">
              <img src={isEmpty(myMbInfo) ? '' : imgBaseUrl + myMbInfo.data.mbProfFileUrl} alt="프로필 사진" />
            </div>
            <table className="table-tp1 th-c td-c info-top" summary="회원 기본정보 내용">
              <caption className="away">기본정보</caption>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>판매자</th>
                  <td colSpan="3">{myMbInfo.data.mbNm}</td>
                </tr>
                <tr>
                  <th>종사원증 번호</th>
                  <td colSpan="3">
                    {myMbInfo.data.mbEn}
                    {myMbInfo.data.mbEnEprDday > 30 && <span className="d-day tx-blue80">D-{myMbInfo.data.mbEnEprDday}</span>}
                    {myMbInfo.data.mbEnEprDday <= 30 && <span className="d-day tx-red80">D-{myMbInfo.data.mbEnEprDday}</span>}
                  </td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td colSpan="3">{myMbInfo.data.mbHpPnEnc}</td>
                </tr>
                <tr>
                  <th>판매중 차량</th>
                  <td>{isEmpty(myMbInfo.carData) ? 0 : myMbInfo.carData.proCnt}</td>
                  <th>판매완료 차량</th>
                  <td>{isEmpty(myMbInfo.carData) ? 0 : myMbInfo.carData.comCnt}</td>
                </tr>
              </tbody>
            </table>

            <Buttons align="right" marginBottom={24}>
              <Button size="big" background="gray" title="사업자등록증 이미지" width={200} height={48} onClick={(e) => onHandleImgClick(e, myMbInfo.data.blFileUrl, '사업자등록증 이미지')} />
              <Button
                size="big"
                background="gray"
                title="관리자사업자등록증 이미지"
                width={200}
                height={48}
                onClick={(e) => onHandleImgClick(e, myMbInfo.data.mgmtBlFileUrl, '관리자사업자등록증 이미지')}
              />
            </Buttons>

            <table className="table-tp1 th-c td-c info-bottom" summary="회원 기본정보 내용">
              <caption className="away">기본정보</caption>
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>소속상사명 / 대표자명</th>
                  <td>
                    {myMbInfo.data.entrCorpNm} / {myMbInfo.data.reprNm}
                  </td>
                </tr>
                <tr>
                  <th>소속단지</th>
                  <td>{myMbInfo.data.acId}</td>
                </tr>
                <tr>
                  <th>사업자 등록번호</th>
                  <td>{myMbInfo.data.mbBrn}</td>
                </tr>
                <tr>
                  <th>판매점 주소</th>
                  <td onClick={(e) => rodalMapPopupHandler(e, 'fade')}>
                    {myMbInfo.data.mbStrZcd} {myMbInfo.data.mbStrAddr} {myMbInfo.data.mbStrDtlAddr}
                  </td>
                </tr>
                <tr>
                  <th>판매점 연락처</th>
                  <td>{myMbInfo.data.mbStrPn}</td>
                </tr>
                <tr>
                  <th>팩스</th>
                  <td>{myMbInfo.data.mbStrFaxno}</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td className="pd15">{myMbInfo.data.mbStrSlHmCntn}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <table className="table-tp1 th-c td-c" summary="셀프평가 이용현황에 관한 내용">
            <caption>셀프평가 이용현황</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <tbody>
              <tr>
                <th>평점</th>
                <td colSpan="3">
                  <StarScore grade={parseInt(isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.psAvg)} /> <span>({isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.psAvg}/5.0)</span>
                </td>
              </tr>
              <tr>
                <th>입찰</th>
                <td>{isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.biddCnt}대</td>
                <th>성사</th>
                <td>{isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.succBiddCnt}대</td>
              </tr>
              <tr>
                <th>성사율</th>
                <td colSpan="3">{isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.succRate}%</td>
              </tr>
              <tr>
                <th rowSpan="3">만족도</th>
                <th>가격만족</th>
                <td colSpan="2">
                  {isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps1}% ({isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps1Rate}%)
                </td>
              </tr>
              <tr>
                <th>서비스</th>
                <td colSpan="2">
                  {isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps2}% ({isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps2Rate}%)
                </td>
              </tr>
              <tr>
                <th>추천여부</th>
                <td colSpan="2">
                  {isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps3}% ({isEmpty(myMbInfo.selfData) ? 0 : myMbInfo.selfData.ps3Rate}%)
                </td>
              </tr>
              <tr>
                <th>
                  주력정보
                  <br />
                  <Button size="sml" background="blue80" title="수정" width={67} height={24} onClick={(e) => rodalPopupHandlerPop1(e)} />
                </th>
                <td colSpan="3" className="pd15">
                  {myMbInfo.data.mfInfo}
                </td>
              </tr>
              <tr>
                <th>
                  자기소개
                  <br />
                  <Button size="sml" background="blue80" title="수정" width={67} height={24} onClick={(e) => rodalPopupHandlerPop2(e)} />
                </th>
                <td colSpan="3" className="pd15">
                  {myMbInfo.data.slfIntrd}{' '}
                </td>
              </tr>
            </tbody>
          </table>
          <Buttons align="right" marginTop={48}>
            <Button
              size="big"
              background="blue80"
              title="입찰자 정보"
              width={183}
              height={48}
              onClick={(e) => {
                e.preventDefault();
                _dealerInfoPopupHandler(userId);
              }}
            />
            <Button size="big" background="blue80" title="회원탈퇴" width={183} height={48} onClick={(e) => onHandleBtnClick(e, '/mypage/dealer/info/leaveMember')} />
          </Buttons>
        </div>
      </div>

      {/* 딜러 정보 팝업 */}
      <RodalPopup show={rodalDealerInfo} type={'slideUp'} title="입찰자 정보" closedHandler={dealerInfoModalCloseHandler} mode="normal" size="large">
        <SelfDealerInfoPopup dealer={dealer} />
      </RodalPopup>

      <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="medium" title="주력정보 수정">
        <div className="con-wrap popup-member-info">
          <Input type="text" placeHolder="주력정보를 입력하세요" width="100%" value={isEmpty(myMbInfo.data.mfInfo) ? '' : myMbInfo.data.mfInfo} onChange={onChangeAll} name="powerInfo" />
          <p>예시) #수입전문 #BMW #5시리즈 #최고가</p>
          <Buttons align="center" marginTop={85}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={modalClosepowerInfoHandler} />
            <Button size="big" background="blue80" title="수정완료" width={130} height={48} onClick={(e) => handleSave(e, 'p')} buttonMarkup={true} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'slideUp'} closedHandler={modalCloseHandler2} mode="normal" size="medium" title="소개글 수정">
        <div className="con-wrap popup-member-info">
          <Textarea countLimit={500} type="tp2" data={isEmpty(myMbInfo.data.slfIntrd) ? '' : myMbInfo.data.slfIntrd} onChange={onChangeAll} name="myIntroduceInfo" />
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={modalClosemyInfoHandler} />
            <Button size="big" background="blue80" title="수정완료" width={130} height={48} onClick={(e) => handleSave(e, 'i')} buttonMarkup={true} />
          </Buttons>
        </div>
      </RodalPopup>

      {isModalOpen ? (
        <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} mode="normal" size="small" title="판매점 위치">
          <KakaoMap style={style} addr={'서울특별시 강남구 언주로 520'}></KakaoMap>
        </RodalPopup>
      ) : null}
      {rodalShow3 ? (
        <RodalPopup show={rodalShow3} type={'slideUp'} closedHandler={modalCloseHandler3} mode="normal" size="medium" title={imgTtl}>
          <ImgPopup initImg={imgBaseUrl + imgUrl} />
        </RodalPopup>
      ) : null}
    </AppLayout>
  );
};

export default withRouter(MemberInfo);
