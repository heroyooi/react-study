/**
 * 설명 : 내 차 출품하기
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires [exhibitorInfo,locationAutoAuction]
 * @author 박진하
 */
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { produce } from 'immer';
import ReactHtmlParser from 'react-html-parser';
import { ClipLoader } from 'react-spinners';

import Steps from '@lib/share/items/Steps';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import useRodal from '@lib/share/custom/useRodal';

import AppLayout from '@src/components/layouts/AppLayout';
import AuctionCheckBoxGroup from '@src/components/common/AuctionCheckBoxGroup';
import { SystemContext } from '@src/provider/SystemProvider';
import { getPolicyList, getAuctionHouseList, setInputInfo, setAuctionOngoing } from '@src/actions/autoAuction/autoAuctionAction';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FOOTER_EXIST } from '@src/actions/types';

/* 모바일 컴포넌트 Import */
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobTermsView from '@src/components/common/MobTermsView';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import LocationAutoAuction from './locationAutoAuction';

const globalThis = require('globalthis')();

/**
 * 설명 : 경매약관 및 주의사항을 확인/출품 경매장을 선택하고 회원정보 입력 페이지를 호출한다.
 * @param null
 * @returns {policyAggrement} 경매약관 및 주의사항 / 출품 경매장
 */
const AutoAuctionPolicyAggrement = ({ query }) => {
  //console.log('*** autoAuctionPolicyAggrement > isLoginLiveCheck', isLoginLiveCheck());
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert, initAlert } = useContext(SystemContext);

  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    if (gInfoLive().type !== 'member') {
      showAlert('스마트옥션 출품 서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    dispatch({ type: SECTION_AUTO_AUCTION });

    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '내 차 출품하기',
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
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  const { inputInfo, policyList, auctionHouseList, auctionHouseRadio } = useSelector((state) => state.autoAuction);
  const [auctionHousePopup, setAuctionHousePopup, openHousePopup, closeHousePopup] = useRodal(false, true);
  //const [auctId, setAuctId] = useState('1100');
  const [defaultTab, setDefaultTab] = useState(0);
  const [policyCheckList, setPolicyCheckList] = useState([]);
  const [policyCntn, setPolicyCntn] = useState([]);
  const [formData, setFormData] = useState(inputInfo);
  const [tmsCnsn, setTmsCnsn] = useState(formData.tmsCnsn);
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  const modalShow = useCallback(
    (e, n) => {
      e.preventDefault();
      setDefaultTab(n);
      setAuctionHousePopup(!auctionHousePopup);
    },
    [auctionHousePopup, setAuctionHousePopup]
  );

  const onChangePolicy = (e, index) => {
    const { checked } = e.target;
    const allYn = e.target.id.includes('all');

    if (allYn) {
      if (checked) {
        setTmsCnsn(
          policyList.map((v) => {
            return { tmsId: v.tmsId, cnsnYn: 'Y' };
          })
        );
      } else setTmsCnsn([]);
    } else {
      if (checked) setTmsCnsn([...tmsCnsn, { tmsId: policyList[index].tmsId, cnsnYn: 'Y' }]);
      else setTmsCnsn(tmsCnsn.filter((el) => el.tmsId !== policyList[index].tmsId));
    }
  };

  const onChangeAuctHouse = (e, value) => {
    //setAuctId(value);
    e.preventDefault();
    setFormData(
      produce((draft) => {
        draft.auctId = value;
      })
    );
  };

  const nextStep = (e, url) => {
    e.preventDefault();
    for (const data of policyCheckList) {
      if (document.getElementById(data.id).checked === false) {
        showAlert(data.title + '를(을) 해주세요.', 'error');
        return;
      }
    }

    setIsLoading(true);
    dispatch(setInputInfo(formData));

    // 경매등록 진행상태로 설정
    dispatch(setAuctionOngoing(true));

    Router.push(url).then(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setFormData(
      produce((draft) => {
        draft.tmsCnsn = tmsCnsn;
      })
    );
  }, [tmsCnsn]);

  useEffect(() => {
    if (!isEmpty(policyList)) {
      const arr1 = [];
      const arr2 = [];
      policyList.map((policy, index) => {
        // 기선택된 값이 있다면 화면에 선택된 상태로 표시한다. (back 버튼 대응)
        const policyChecked = formData.tmsCnsn.filter((el) => {
          return el.tmsId === policy.tmsId && el.cnsnYn === 'Y';
        });
        arr1.push({ id: 'chk-auction-agree-' + (index + 1), title: policy.tmsNm, checked: policyChecked.length > 0 ? true : false });
        arr2.push(ReactHtmlParser(policy.tmsCntn));
      });
      setPolicyCheckList(arr1);
      setPolicyCntn(arr2);
    }
  }, [policyList]);

  if (hasMobile) {
    /* 모바일 팝업 상태 관리 */
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    const [fpTerms, setFpTerms] = useState(false);
    const [termSeq, setTermSeq] = useState(0);
    const termsTitle = ['스마트옥션 경매약관 및 주의사항 동의', '세금계산서 발행의무 동의', '개인정보 활용 동의', '자동차매매(경매) 행위에 대한 위/수임 확인'];

    /* 모바일 약관뷰 핸들러 */
    const termsViewHandler = useCallback((seq) => (e) => {
      e.preventDefault();
      setTermSeq(seq);

      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: termsTitle[seq],
          options: ['close']
        }
      });
      setFpTerms(true);
    });

    const handleTermsClick = (e) => {
      e.preventDefault();
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    };

    return (
      <AppLayout>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={1} mode="stick" />
        </div>
        <div className="member-sec auction-chk-terms">
          <div className="content-wrap member-contents">
            <h3 className="away">경매약관 및 주의사항</h3>
            <form className="register-form">
              <AuctionCheckBoxGroup
                title="전체동의 합니다."
                id="chk-agree-all"
                agree_list={policyCheckList}
                agree_term={policyCntn}
                onChange={onChangePolicy}
                events={[termsViewHandler(0), termsViewHandler(1), termsViewHandler(2), termsViewHandler(3), termsViewHandler(4)]}
                //links={['/autoAuction/termsView?seq=0', '/autoAuction/termsView?seq=1', '/autoAuction/termsView?seq=2', '/autoAuction/termsView?seq=3', '/autoAuction/termsView?seq=4']}
              />
              <p className="tx-sub tx-red80 mt8" style={{ paddingLeft: 28 }}>
                스마트옥션 경매약관 및 주의사항 동의를 해주세요
              </p>
            </form>
            <Button className="fixed" size="full" background="blue80" title="다음" onClick={(e) => nextStep(e, '/autoAuction/autoAuctionHouseInfo')} />
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms && <MobTermsView seq={termSeq} agree_term={policyCntn} callback={handleTermsClick} />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>내 차 출품하기</h3>
          <p>공개 경쟁 입찰의 스마트옥션으로 내 차를 최고가로 판매하세요.</p>
        </div>
      </div>
      <div className="content-wrap auction-step">
        <Steps type={1} contents={['경매약관 및 주의사항', '회원정보', '차량정보', '탁송신청']} active={1} />
      </div>
      <div className="content-sec auction-chk-terms">
        <div className="content-wrap">
          <h3>경매약관 및 주의사항</h3>
          <AuctionCheckBoxGroup title="전체 동의" id="chk-agree-all" agree_list={policyCheckList} agree_term={policyCntn} termView={true} onChange={onChangePolicy} />
        </div>
      </div>
      <div className="content-wrap auction-house-sel">
        <h4>경매장 선택</h4>
        <RadioGroup
          dataList={auctionHouseRadio}
          defaultValue={formData.auctId}
          boxType={true}
          className="mb20"
          onChange={(e) => onChangeAuctHouse(e, e.currentTarget.getElementsByTagName('input')[0].value)}
        >
          {auctionHouseRadio.length > 0 &&
            auctionHouseRadio.map((v, i) => {
              return (
                <RadioItem key={i}>
                  {v.value === '1100' && (
                    <p className="con">
                      서울 중앙/동부/남부/동북부, 경기 남부지역에서
                      <br />
                      이용하시면 편리합니다.
                    </p>
                  )}
                  {v.value === '2100' && (
                    <p className="con">
                      서울 서부/서북부, 인천, 경기 서부지역에서
                      <br />
                      이용하시면 편리합니다.
                    </p>
                  )}
                  {v.value === '3100' && (
                    <p className="con">
                      부산, 울산, 대구, 경상도 지역에서
                      <br />
                      이용하시면 편리합니다.
                    </p>
                  )}
                  <Button size="mid" line="gray" color="darkgray" title="위치보기" width={85} height={32} marginTop={24} fontSize={16} onClick={(e) => modalShow(e, i)} />
                </RadioItem>
              );
            })}
        </RadioGroup>
        <Buttons align="center" marginTop={60}>
          <Button size="big" background="blue80" title="다음 단계로" sub="(회원정보)" className="ws1" width={240} height={72} onClick={(e) => nextStep(e, '/autoAuction/exhibitorInfo')} />
        </Buttons>
      </div>
      <LocationAutoAuction dataList={auctionHouseList} show={auctionHousePopup} onChange={closeHousePopup} defaultTabValue={defaultTab} />
    </AppLayout>
  );
};

AutoAuctionPolicyAggrement.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getPolicyList());
  await reduxStore.dispatch(getAuctionHouseList());

  return {
    query
  };
};

export default AutoAuctionPolicyAggrement;
