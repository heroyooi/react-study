import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MypageCompare from '@src/components/common/popup/MypageCompare';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import RadioGroup from '@lib/share/items/RadioGroup';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost, imgUrl as baseURL } from '@src/utils/HttpUtils';
import { numberFormat } from '@src/utils/CommonUtil';
import { getinterList, getLastViewList } from '@src/actions/mypage/personal/buycar/buycarActions';
import {
  MOBILE_CONTENT_STYLE,
  MOBILE_FOOTER_EXIST,
  MOBILE_FULLPAGE_POPUP,
  MOBILE_HEADER_TYPE_SUB,
  MOBILE_QUICK_EXIST,
  SECTION_MYPAGE
} from '@src/actions/types';
import BannerItem from '@src/components/common/banner/BannerItem';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import PricingToPrintButton from '@src/components/pricingSystem/pricingToPrintButton';
import { ITEM_TYPE_INTEREST_CAR, ITEM_TYPE_MYCAR } from '@src/constant/buyCarConstant';
import { setComma } from '@src/utils/StringUtil';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobTotalCostCalculation from '@src/components/common/MobTotalCostCalculation';
import { fetchCarAccidentAction, fetchCarBaseOptionInfoAction } from '@src/actions/buycar/buyCarDetailActions';
import MobSelectList from '@lib/share/items/MobSelectList';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { findLabelValue } from '@src/components/pricingSystem/pricingUtil';


/*
  html 변경이력
  03.11 : alert 샘플 추가 #a1 참고

*/
const InterestCar = ({ router }) => {
  const dispatch = useDispatch();
  let printRef = React.createRef();

  // Mobile용 -> mobile은 탭으로 한페이지로 구성.
  const [iCheckData, setICheckData] = useState({});
  const [iTargetData, setITargetData] = useState([])
  const [iCheckAll, setICheckAll] = useState(false);

  const [lCheckData, setLCheckData] = useState({});
  const [lTargetData, setLTargetData] = useState([])
  const [lCheckAll, setLCheckAll] = useState(false);

  const [lListData, setLListData] = useState([]);
  const [iListData, setIListData] = useState([]);
  const [withoutLList, setWithoutLList] = useState(false);
  const [withoutIList, setWithoutIList] = useState(false);

  const [popHead1, setPopHead1] = useState(false);
  const [popHead2, setPopHead2] = useState(true);
  const [lDeleteShow, setLDeleteShow, lDeletePopupHandler, lDeleteCloseHandler] = useRodal(false);
  const [iDeleteShow, setIDeleteShow, iDeletePopupHandler, iDeleteCloseHandler] = useRodal(false);
  // Mobile용 variable 끝

  // 팝업
  const [deleteShow, setDeleteShow, deletePopupHandler, deleteCloseHandler] = useRodal(false);
  const [attentionShow, setAttentionShow, attentionPopupHandler, attentionCloseHandler] = useRodal(false, true);
  const [comparisonShow, setComparisonShow, comparisonPopupHandler, comparisonCloseHandler] = useRodal(false);
  const [statusMsgShow, setstatusMsgShow, statusMsgPopupHandler, statusMsgCloseHandler] = useRodal(false); //#a1
  const [withoutList, setWithoutList] = useState(false);
  const [interestPage, setInterestPage] = useState(1);
  const [lastestCarPage, setLastestCarPage] = useState(1);
  const [checkall, setCheckall] = useState(false);
  const [checkData, setCheckData] = useState({});
  const [targetData, setTargetData] = useState([]);
  const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const { interList, icurrentPage, nowCount, totalCount } = useSelector((rootStore) => rootStore.personalPage);
  const { lastViewList, lcurrentPage, recentNowCount, recentTotalCount } = useSelector((rootStore) => rootStore.personalPage);
  const [mobCompareData, setMobCompareData] = useState([]);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [fpBottom, setFpBottom] = useState(80);
  const carAccident = useSelector((state) => state.buyCarDetail.carAccident, {});
  const carBaseInfo = useSelector((state) => state.buyCarDetail.carBaseOptionInfo, {});
  const [lRadioCheck, setLRadioCheck] = useState(null);
  const [iRadioCheck, setIRadioCheck] = useState(1);
  const [lRadioOptions, setLRadioOptions] = useState([]);
  const [iRadioOptions, setIRadioOptions] = useState([]);
  const [itemCount, setItemCount] = useState(5);

  // 목록 더보기
  const [listData, setListData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [showTotalCostCalculation, setShowTotalCostCalculation] = useState(false);
  const [totalCostCalculation, setTotalCostCalculation] = useState();

  //로그인여부 판단
  const [cookies, setCookie, removeCookie] = useCookies(['recentCar']);
  const [hiddenTab, setHiddenTab] = useState([]);

  const { isLogin } = useSelector((state) => ({
    isLogin: state.login.isLogin // state.login.isLogin
  }));
  const [isLoginScreen, setIsLoginScreen] = useState(false); //isEmpty(cookies.accessToken) ? isLogin : true); // 화면단 사용
  const recentCarValidMinute = 1000 * 60 * 60 * 24 * 90; //최근본차량(로그오프시 노출) 유효시간 3개월


  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '내차사기',
          options: ['back', 'gnb']
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
          exist: false
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log('초기 :' + isEmpty(Cookies.get('accessToken')) ? isLogin : true );
    setIsLoginScreen(isEmpty(Cookies.get('accessToken')) ? isLogin : true);
    const param = {
      pageNo: interestPage
    };
    dispatch(getinterList(param));
    // Mobile 추가, PC 는 별도, 모바일은 한페이지로 구성됨.
    if (hasMobile) {
      dispatch(getLastViewList({ pageNo: lastestCarPage }));
    }
  }, []);

  useEffect(() => {
    if (hasMobile) {
      if (typeof interList !== 'undefined' && interList.length > 0) {
        setWithoutIList(false);
        setIListData(interList);
        setInterestPage(icurrentPage);
      } else {
        setWithoutIList(true);
      }

      console.log('로그인 상태 : ' + isLoginScreen);

      if(isLoginScreen) {
        const hTab = [];
        setHiddenTab(hTab);
        if (typeof lastViewList !== 'undefined' && lastViewList.length > 0) {
          setWithoutLList(false);
          setLListData(lastViewList);
          setLastestCarPage(lcurrentPage);
        } else {
          setWithoutLList(true);
        }
      } else {
        console.log('비로그인 상태 최근 본 차량 가져오기');
        const hTab = [1,2];
        setHiddenTab(hTab);
        const recentCarCookieList = cookies.recentCar;
        if (typeof recentCarCookieList !== 'undefined' && recentCarCookieList.length > 0) {
          setWithoutLList(false);
          console.log(recentCarCookieList);
          setLListData(recentCarCookieList);
          setLastestCarPage(1);
        } else {
          setWithoutLList(true);
        }
      }


    } else {
      if (typeof interList !== 'undefined' && interList.length > 0) {
        setWithoutList(false);

        const count = totalCount < 5 ? totalCount : 5;
        setListData([]);
        for (let i = 0; i < count; i++) {
          setListData(
            produce((draft) => {
              draft.push(interList[i]);
            })
          );
        }
        setItemCount(nowCount);
      }else {

        setWithoutList(true);
      }
    }
  }, [interList, lastViewList]);

  useEffect(() => {
    const lRadioOptions = [
      { id: 'list-align_1', value: 1, checked: true, disabled: false, orderBy: 'date', label: '최신 등록순' },
      { id: 'list-align_2', value: 2, checked: false, disabled: false, orderBy: 'price', label: '낮은 가격순' }
    ];

    setLRadioOptions(lRadioOptions);
    setLRadioCheck(lRadioOptions[0]);

    const iRadioOptions = [
      { id: 'list-align_1', value: 1, checked: true, disabled: false, label: '최신 등록순' },
      { id: 'list-align_2', value: 2, checked: false, disabled: false, label: '낮은 가격순' }
    ];

    setIRadioOptions(iRadioOptions);
    setIRadioCheck(iRadioOptions[0]);
  }, []);

  const addInterestCar = (e) => {
    e.preventDefault();

    if (!isLoginScreen) {
      showAlert('로그인 시 가능한 기능입니다.');
      return false;
    }

    if (lTargetData.length < 1) {
      // showAlert('차량을 선택해주세요');
      return false;
    }

    const param = {
      prdNums: lTargetData.join(',')
    };

    console.log('target join data ---->', param);

    axiosPost(`api/mypage/user/insertInterestCar.do`, param).then((res) => {
      console.log(res.data.data);
      const result = Number(res.data.data);

      if (result === 99) {
        showAlert('이미 관심차량으로 등록된 차량이 있습니다.');
        return false;
      }
      if (result === 1) {
        setAttentionShow(true);
      } else {
        showAlert('관심차량 등록이 실패하였습니다. 관리자에게 문의바랍니다.');
      }
    });
  };
  const closeAttetionHandler = (e) => {
    e.preventDefault();

    setCheckall(false);
    setCheckData(
      produce((draft) => {
        listData.map((data) => {
          draft[String(data.dlrPrdId)] = false;
        });
      })
    );

    setAttentionShow(false);
  };

  const onLClickAll = useCallback(
    (e) => {
      const bool = e.target.checked;
      setLCheckAll(bool);
      setLCheckData(
        produce((draft) => {
          lListData.map((data) => {
            draft[String(data.dlrPrdId)] = bool;
          });
        })
      );

      setLTargetData([]);

      if (bool) {
        setLTargetData(
          produce((draft) => {
            lListData.map((data) => {
              draft.push(data.dlrPrdId);
            });
          })
        );
        setPopHead1(true);
      } else {
        setPopHead1(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lCheckData, lListData, iCheckData, iListData]
  );

  const onChangeOrderByL = useCallback((e, deps) => {
    setLRadioCheck(deps);

    const searchParam = {
      pageNo: lastestCarPage,
      order: deps.orderBy
    };
    dispatch(getLastViewList(searchParam));
  }, []);

  const onChangeOrderByI = useCallback((e, deps) => {
    setIRadioCheck(deps);

    const searchParam = {
      pageNo: interestPage,
      order: deps.orderBy
    };
    dispatch(getinterList(searchParam));
  }, []);

  const onIClickAll = useCallback(
    (e) => {
      const bool = e.target.checked;
      setICheckAll(bool);
      setICheckData(
        produce((draft) => {
          iListData.map((data) => {
            draft[String(data.dlrPrdId)] = bool;
          });
        })
      );

      setITargetData([]);

      if (bool) {
        setITargetData(
          produce((draft) => {
            iListData.map((data) => {
              draft.push(data.dlrPrdId);
            });
          })
        );
        setPopHead2(true);
      } else {
        setPopHead2(false);
      }
    }, [lCheckData, lListData, iCheckData, iListData]);

  const isLCheckedEmpty = (lCheckData, id) => {
    let good = true;
    Object.entries(lCheckData).map(([key, value]) => {
      if (value === true && key !== good) {
        good = false;
      }
    });

    return good;
  }

  const isICheckedEmpty = (iCheckData, id) => {
    let good = true;
    Object.entries(iCheckData).map(([key, value]) => {
      if (value === true && key !== good) {
        good = false;
      }
    });

    return good;
  }

  const selectedLcount = () => {
    if (lListData === undefined || lListData.length === 0) {
      return 0;
    }

    if (isEmpty(lCheckData)) {
      return 0;
    }

    let cnt = 0;
    Object.values(lCheckData).map((data) => {
      if (data === true) {
        cnt++;
      }
    });

    return cnt;
  };

  const selectedIcount = () => {
    if (iListData === undefined || iListData.length === 0) {
      return 0;
    }

    if (isEmpty(iCheckData)) {
      return 0;
    }

    let cnt = 0;
    Object.values(iCheckData).map((data) => {
      if (data === true) {
        cnt++;
      }
    });

    return cnt;
  };

  const handleLCheckCarChange = (id) => (e) => {
    const id = e.target.id;
    const checked = e.target.checked;

    setLCheckAll(false);
    setLCheckData(
      produce((draft) => {
        draft[id] = checked;
      })
    );

    if (checked) {
      setLTargetData(
        produce((draft) => {
          draft.push(id);
        })
      );
      setPopHead1(true);
    } else {
      setLTargetData(
        produce((draft) => {
          draft.splice(draft.indexOf(id), 1);
        })
      );
      if (isLCheckedEmpty(lCheckData, id)) {
        setPopHead1(false);
      }
    }
  };

  const handleICheckCarChange = (id) => (e) => {
    const id = e.target.id;
    const checked = e.target.checked;

    setICheckAll(false);
    setICheckData(
      produce((draft) => {
        draft[id] = checked;
      })
    );

    if (checked) {
      setITargetData(
        produce((draft) => {
          draft.push(id);
        })
      );
      setPopHead2(true);
    } else {
      setITargetData(
        produce((draft) => {
          draft.splice(draft.indexOf(id), 1);
        })
      );
      if (isICheckedEmpty(iCheckData, id)) {
        setPopHead2(false);
      }
    }
  };

  const lDeleteSelectedCar = (e) => {
    e.preventDefault();
    if (lTargetData.length < 1) {
      showAlert('삭제할 차량을 선택해주세요');
      return false;
    }

    lDeletePopupHandler(e, 'fade');
  };

  const lHandleDeleteCancel = (e) => {
    lDeleteCloseHandler(e);
    setLDeleteShow(false);
  };
  const lHandleDeleteAction = (e) => {
    lDeleteCloseHandler(e, 'fade');
    setLDeleteShow(false);
    lDeleteRecentlyCar();
  };

  const lDeleteRecentlyCar = () => {
    const param = {
      prdNums: lTargetData.join(',')
    };

    axiosPost(`/api/mypage/user/deleteRecentlyCar.do`, param).then((res) => {
      const result = Number(res.data.data);

      if (result > 0) {
        showAlert('삭제되었습니다.');

        //삭제된 뒤에는 체크 리스트 해제
        setLTargetData([]);

        const param = {
          pageNo: 1
        };

        dispatch(getLastViewList(param));
      } else {
        showAlert('삭제에 실패하였습니다.');
        return false;
      }
    });
  };

  const iDeleteSelectedCar = (e) => {
    e.preventDefault();
    if (iTargetData.length < 1) {
      showAlert('삭제할 차량을 선택해주세요');
      return false;
    }

    iDeletePopupHandler(e, 'fade');
  };

  const iHandleDeleteCancel = (e) => {
    iDeleteCloseHandler(e);
    setIDeleteShow(false);
  };
  const iHandleDeleteAction = (e) => {
    iDeleteCloseHandler(e, 'fade');
    setIDeleteShow(false);
    iDeleteRecentlyCar();
  };

  const iDeleteRecentlyCar = () => {
    const param = {
      prdNums: iTargetData.join(',')
    };

    axiosPost(`/api/mypage/user/interest/deleteInterestMemberCar.do`, param).then((res) => {
      console.log(res.data.data);

      const result = Number(res.data.data);

      if (result > 0) {
        showAlert('삭제되었습니다.');

        //삭제된 뒤에는 체크 리스트 해제
        setITargetData([]);

        const param = {
          pageNo: 1
        };

        dispatch(getinterList(param));
      } else {
        showAlert('삭제에 실패하였습니다.');
        return false;
      }
    });
  };

  if (hasMobile) {
    const { seq } = router.query;

    const [isTab, setIsTab] = useState(seq !== undefined ? +seq - 1 : 0);
    const [forceChange, setForceChange] = useState(false);
    const handleTab = (num) => (e) => {
      e.preventDefault();
      setForceChange((prev) => !prev);
      setIsTab(num - 1);
    };

    useEffect(() => {
      console.log('seq =========== >  ' + seq);
      if (seq !== undefined) {
        setIsTab(seq - 1);
        window.scrollTo(0, 0);
      }
    }, [seq]);


    const closePopHead1 = (e) => {
      e.preventDefault();
      setPopHead1(false);
    };
    const closePopHead2 = (e) => {
      e.preventDefault();
      setPopHead2(false);
    };

    const mobCompareLCar = (e) => {
      e.preventDefault();

      if (!isLoginScreen) {
        showAlert('로그인 시 가능한 기능입니다.');
        return false;
      }

      if (lTargetData.length < 2) {
        showAlert('비교하실차량을 2개 선택해주세요(최대2개)');
        return false;
      } else if (lTargetData.length > 2) {
        showAlert('비교하실 차량은 최대2개까지 선택가능합니다.');
        return false;
      }
      const param = {
        prdNums: lTargetData.join(',')
      };
      axiosPost(`/api/mypage/user/selectCompareCarList.do`, param).then((res) => {
        setMobCompareData(res.data.data);
        setIsTab(2);
      });
    };

    const mobCompareICar = (e) => {
      e.preventDefault();
      if (iTargetData.length < 2) {
        showAlert('비교하실차량을 2개 선택해주세요(최대2개)');
        return false;
      } else if (iTargetData.length > 2) {
        showAlert('비교하실 차량은 최대2개까지 선택가능합니다.');
        return false;
      }
      const param = {
        prdNums: iTargetData.join(',')
      };
      axiosPost(`/api/mypage/user/interest/selectInterestCompareCarList.do`, param).then((res) => {
        //여기서부터 수정하면됨
        setMobCompareData(res.data.data);
        setIsTab(2);
      });
    };
    const popCalculation = useCallback((data, e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '총비용 계산',
          options: ['close']
        }
      });
      setTotalCostCalculation(data);
      if (data.carNo) {
        dispatch(fetchCarAccidentAction(data.carNo)); // 보험(사고)이력 조회
      }
      if (data.acdtYn !== '없음' && data.dlrPrdId) {
        dispatch(fetchCarBaseOptionInfoAction(data.dlrPrdId));
      }

      setShowTotalCostCalculation(true);
    });

    const handleCallback = useCallback((e, id) => {
      setIsTab(id);
    }, []);

    return (
      <AppLayout>
        <div className="general-buy-sec">
          <TabMenu type="type2" defaultTab={isTab} mount={true} hiddenTab={hiddenTab} forceChange={forceChange} callBack={handleCallback}>
            <TabCont tabTitle={`최근 본 차량 ${lListData.length}`} id="tab2-1" index={0}>
              <div className="mypage-admin-title pd20">
                <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
                <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
              </div>
              <div className="list-wrap">
                {withoutLList === true ? (
                  <div className="list-none-wrap">
                    <div className="list-none">
                      <p>최근 조회하신 차량이 없습니다.</p>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={100} height={40} href="/buy/list" />
                      </Buttons>
                    </div>
                  </div>
                ) : (
                  <>
                    {popHead1 && selectedLcount() !== 0 && (
                      <div className="select-car-wrap mb16">
                        <p className="tit2">
                          선택차량<span>{` ${selectedLcount()}`}</span>개
                        </p>
                        <span>차량 비교하기는 2대만 가능합니다.(PC 4대 가능)</span>
                        <Buttons align="center" marginTop={16}>
                          <Button size="mid" color="gray" line="gray" radius={true} title="관심등록" onClick={(e) => addInterestCar(e)} width={88} height={30} fontSize={12} fontWeight={500} />
                          <Button size="mid" color="gray" line="gray" radius={true} title="비교하기" width={88} height={30} fontSize={12} fontWeight={500} onClick={(e) => mobCompareLCar(e)} />
                          <Button size="mid" color="gray" line="gray" radius={true} title="삭제" width={88} height={30} fontSize={12} fontWeight={500} onClick={(e) => lDeleteSelectedCar(e)} />
                        </Buttons>
                        <a href="#" className="popup-close" onClick={closePopHead1} />
                      </div>
                    )}

                    <div className="content-wrap">
                      <div className="float-wrap sel-s mb16">
                        <CheckBox id="sell-all-chk1" title="전체선택" checked={lCheckAll} isSelf={false} onChange={onLClickAll} />
                        <MobSelectList width={136} itemsSource={lRadioOptions} selectedItem={lRadioCheck} displayMemberPath={'label'} selectedValuePath={'value'} onClick={onChangeOrderByL} />
                      </div>

                      <ul className="goods-list list-type">
                        {lListData?.map((car, idx) => {
                          return (
                            <BannerItem
                              itemMode={ITEM_TYPE_MYCAR}
                              key={`oninterest${idx}`}
                              data={car}
                              mode="check"
                              chkId={car.dlrPrdId}
                              chkChecked={lCheckData[String(car.dlrPrdId)]}
                              chkChange={handleLCheckCarChange(car.dlrPrdId)}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </TabCont>
            <TabCont tabTitle={`관심차량 ${iListData.length}`} id="tab2-2" index={1}>
              <div className="mypage-admin-title pd20">
                <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
                <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
              </div>
              <div className="list-wrap">
                {withoutList === true ? (
                  <div className="list-none-wrap">
                    <div className="list-none">
                      <p>관심차량으로 등록한 차량이 없습니다.</p>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={100} height={40} href="/buy/list" />
                      </Buttons>
                    </div>
                  </div>
                ) : (
                  <>
                    {popHead2 && selectedIcount() !== 0 && (
                      <div className="select-car-wrap mb16">
                        <p className="tit2">
                          선택차량<span>{` ${selectedIcount()}`}</span>개
                        </p>
                        <span>차량 비교하기는 2대만 가능합니다.(PC 4대 가능)</span>
                        <Buttons align="center" marginTop={16}>
                          <Button size="mid" color="gray" line="gray" radius={true} title="비교하기" width={88} height={30} fontSize={12} fontWeight={500} onClick={(e) => mobCompareICar(e)} />
                          <Button size="mid" color="gray" line="gray" radius={true} title="삭제" width={88} height={30} fontSize={12} fontWeight={500} onClick={(e) => iDeleteSelectedCar(e)} />
                        </Buttons>
                        <a href="#" className="popup-close" onClick={closePopHead2} />
                      </div>
                    )}

                    <div className="content-wrap">
                      <div className="float-wrap sel-s mb16">
                        <CheckBox id="sell-all-chk2" title="전체선택" checked={iCheckAll} isSelf={false} onChange={onIClickAll} />
                        <MobSelectList width={136} itemsSource={iRadioOptions} selectedItem={iRadioCheck} displayMemberPath={'label'} selectedValuePath={'value'} onClick={onChangeOrderByI} />
                      </div>

                      <ul className="goods-list list-type">
                        {iListData.map((v, i) => {
                          return (
                            <BannerItem
                              itemMode={ITEM_TYPE_INTEREST_CAR}
                              key={v.dlrPrdId}
                              data={v}
                              mode="check"
                              chkId={v.dlrPrdId}
                              chkChecked={iCheckData[String(v.dlrPrdId)]}
                              chkChange={handleICheckCarChange(v.dlrPrdId)}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </TabCont>
            <TabCont tabTitle="차량비교" id="tab2-3" index={2}>
              <div className="content-wrap pt20">
                <ul className="goods-list card-type">
                  {!mobCompareData[0] ? (
                    <li>
                      <div className="comparison-bn">
                        <p>
                          비교하실 차량을
                          <br />
                          선택해주세요.
                        </p>
                        <Buttons align="center" marginTop={8}>
                          <Button size="mid" color="gray" line="gray" radius={true} title="최근" width={39} measure="%" height={30} fontSize={12} fontWeight={500} onClick={handleTab(1)} />
                          <Button
                            size="mid"
                            color="gray"
                            line="gray"
                            radius={true}
                            title="관심"
                            width={39}
                            measure="%"
                            marginLeft={4}
                            mgMeasure="%"
                            height={30}
                            fontSize={12}
                            fontWeight={500}
                            onClick={handleTab(2)}
                          />
                        </Buttons>
                      </div>
                    </li>
                  ) : (
                    <BannerItem itemMode={ITEM_TYPE_MYCAR} data={mobCompareData[0]} />
                  )}
                  {!mobCompareData[1] ? (
                    <li>
                      <div className="comparison-bn">
                        <p>
                          비교하실 차량을
                          <br />
                          선택해주세요.
                        </p>
                        <Buttons align="center" marginTop={8}>
                          <Button size="mid" color="gray" line="gray" radius={true} title="최근" width={39} measure="%" height={30} fontSize={12} fontWeight={500} onClick={handleTab(1)} />
                          <Button
                            size="mid"
                            color="gray"
                            line="gray"
                            radius={true}
                            title="관심"
                            width={39}
                            measure="%"
                            marginLeft={4}
                            mgMeasure="%"
                            height={30}
                            fontSize={12}
                            fontWeight={500}
                            onClick={handleTab(2)}
                          />
                        </Buttons>
                      </div>
                    </li>
                  ) : (
                    <BannerItem itemMode={ITEM_TYPE_MYCAR} data={mobCompareData[1]} />
                  )}
                </ul>

                <table summary="챠량 기본정보에 대한 내용" className="table-tp1">
                  <caption className="away">챠량 기본정보</caption>
                  <colgroup>
                    <col width="28%" />
                    <col width="36%" />
                    <col width="36%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차종</th>
                      <td>{mobCompareData[0]?.carTypeName ? mobCompareData[0]?.carTypeName : '-'}</td>
                      <td>{mobCompareData[1]?.carTypeName ? mobCompareData[1]?.carTypeName : '-'}</td>
                    </tr>
                    <tr>
                      <th>연식</th>
                      <td>{mobCompareData[0]?.years ? mobCompareData[0]?.years : '-'}</td>
                      <td>{mobCompareData[1]?.years ? mobCompareData[1]?.years : '-'}</td>
                    </tr>
                    <tr>
                      <th>주행거리</th>
                      <td>{mobCompareData[0]?.drvDistCnt ? mobCompareData[0]?.drvDistCnt : '-'}</td>
                      <td>{mobCompareData[1]?.drvDistCnt ? mobCompareData[1]?.drvDistCnt : '-'}</td>
                    </tr>
                    <tr>
                      <th>변속기</th>
                      <td>{mobCompareData[0]?.mssDvcd ? mobCompareData[0]?.mssDvcd : '-'}</td>
                      <td>{mobCompareData[1]?.mssDvcd ? mobCompareData[1]?.mssDvcd : '-'}</td>
                    </tr>
                    <tr>
                      <th>색상</th>
                      <td>{mobCompareData[0]?.color ? mobCompareData[0]?.color : '-'}</td>
                      <td>{mobCompareData[1]?.color ? mobCompareData[1]?.color : '-'}</td>
                    </tr>
                    <tr>
                      <th>연료/배기량</th>
                      <td>{mobCompareData[0]?.fuelDvcd ? mobCompareData[0]?.fuelDvcd : '-'}</td>
                      <td>{mobCompareData[1]?.fuelDvcd ? mobCompareData[1]?.fuelDvcd : '-'}</td>
                    </tr>
                    <tr>
                      <th>인승/도어수</th>
                      <td>{mobCompareData[0]?.doorCnt ? mobCompareData[0]?.doorCnt : '-'}</td>
                      <td>{mobCompareData[1]?.doorCnt ? mobCompareData[1]?.doorCnt : '-'}</td>
                    </tr>
                  </tbody>
                </table>
                <ul className="m-toggle-list up-blue table">
                  <MenuItem>
                    <MenuTitle>예상가격</MenuTitle>
                    <MenuCont>
                      <table summary="예상가격에 대한 내용" className="table-tp1 td-r">
                        <caption className="away">예상가격</caption>
                        <colgroup>
                          <col width="28%" />
                          <col width="36%" />
                          <col width="36%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>판매가</th>
                            <td>{mobCompareData[0]?.slAmt ? `${setComma(mobCompareData[0]?.slAmt)} 만원` : '-'}</td>
                            <td>{mobCompareData[1]?.slAmt ? `${setComma(mobCompareData[1]?.slAmt)} 만원` : '-'}</td>
                          </tr>
                          <tr>
                            <th>이전등록비</th>
                            <td>{mobCompareData[0]?.transcost ? `${setComma(mobCompareData[0]?.transcost)} 만원` : '-'}</td>
                            <td>{mobCompareData[1]?.transcost ? `${setComma(mobCompareData[1]?.transcost)} 만원` : '-'}</td>
                          </tr>
                          <tr>
                            <th>총 예상비용</th>
                            <td>{mobCompareData[0]?.slAmt ? `${setComma(mobCompareData[0]?.slAmt)} 만원` : '-'}</td>
                            <td>{mobCompareData[1]?.slAmt ? `${setComma(mobCompareData[1]?.slAmt)} 만원` : '-'}</td>
                          </tr>
                          <tr>
                            <th>상세</th>
                            {mobCompareData[0] ? (
                              <td>
                                <Button
                                  size="sml"
                                  background="blue20"
                                  color="blue80"
                                  radius={true}
                                  title="계산기"
                                  width={100}
                                  measure={'%'}
                                  height={24}
                                  fontSize={10}
                                  onClick={(e) => popCalculation(mobCompareData[0], e)}
                                />
                              </td>
                            ) : (
                              <td>-</td>
                            )}
                            {mobCompareData[1] ? (
                              <td>
                                <Button
                                  size="sml"
                                  background="blue20"
                                  color="blue80"
                                  radius={true}
                                  title="계산기"
                                  width={100}
                                  measure={'%'}
                                  height={24}
                                  fontSize={10}
                                  onClick={(e) => popCalculation(mobCompareData[1], e)}
                                />
                              </td>
                            ) : (
                              <td>-</td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>차량옵션</MenuTitle>
                    <MenuCont>
                      <table summary="차량옵션에 대한 내용" className="table-tp1">
                        <caption className="away">차량옵션</caption>
                        <colgroup>
                          <col width="28%" />
                          <col width="36%" />
                          <col width="36%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>옵션갯수</th>
                            <td>{mobCompareData[0]?.optCnt ? `${setComma(mobCompareData[0]?.optCnt)} 개` : '-'}</td>
                            <td>{mobCompareData[1]?.optCnt ? `${setComma(mobCompareData[1]?.optCnt)} 개` : '-'}</td>
                          </tr>
                          {mobCompareData[0]?.majorOptions.map((v, i) => {
                            return (
                              <tr key={i}>
                                <th>{v.part}</th>
                                <td>{v.isClass === 'on' ? 'O' : '-'}</td>
                                <td>{mobCompareData[1]?.majorOptions[i].isClass === 'on' ? 'O' : '-'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>기타정보</MenuTitle>
                    <MenuCont>
                      <table summary="기타정보에 대한 내용" className="table-tp1">
                        <caption className="away">기타정보</caption>
                        <colgroup>
                          <col width="28%" />
                          <col width="36%" />
                          <col width="36%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>보험이력</th>
                            <td>{mobCompareData[0]?.acdtYn ? mobCompareData[0]?.acdtYn : '-'}</td>
                            <td>{mobCompareData[1]?.acdtYn ? mobCompareData[1]?.acdtYn : '-'}</td>
                          </tr>
                          <tr>
                            <th>성능점검</th>
                            <td>{mobCompareData[0]?.smplRprYn ? mobCompareData[0]?.smplRprYn : '-'}</td>
                            <td>{mobCompareData[1]?.smplRprYn ? mobCompareData[1]?.smplRprYn : '-'}</td>
                          </tr>
                          <tr>
                            <th>오토벨인증</th>
                            <td>{mobCompareData[0]?.atbInsp ? mobCompareData[0]?.atbInsp : '-'}</td>
                            <td>{mobCompareData[1]?.atbInsp ? mobCompareData[1]?.atbInsp : '-'}</td>
                          </tr>
                          <tr>
                            <th>제공서비스</th>
                            <td>{mobCompareData[0]?.hsvcYn ? mobCompareData[0]?.hsvcYn : '-'}</td>
                            <td>{mobCompareData[1]?.hsvcYn ? mobCompareData[1]?.hsvcYn : '-'}</td>
                          </tr>
                          <tr>
                            <th>판매자</th>
                            <td>
                              {mobCompareData[0]?.seller[0] ? `${mobCompareData[0]?.seller[0]}` : ''}
                              <br />
                              {mobCompareData[0]?.seller[1] ? `${mobCompareData[0]?.seller[1]}` : ''}
                              <br />
                              {mobCompareData[0]?.seller[2] ? `${mobCompareData[0]?.seller[2]}` : ''}
                            </td>
                            <td>
                              {mobCompareData[1]?.seller[0] ? `${mobCompareData[1]?.seller[0]}` : ''}
                              <br />
                              {mobCompareData[1]?.seller[1] ? `${mobCompareData[1]?.seller[1]}` : ''}
                              <br />
                              {mobCompareData[1]?.seller[2] ? `${mobCompareData[1]?.seller[2]}` : ''}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                </ul>
              </div>
            </TabCont>
          </TabMenu>
        </div>
        <RodalPopup show={attentionShow} type={'fade'} closedHandler={attentionCloseHandler} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>
              관심차량으로 등록되었습니다.
              <br />
              바로 확인하시겠습니까?
              <br />
              <span className="tx-blue80">[마이페이지>관심차량]에서 확인이 가능합니다.</span>
            </p>
            <Buttons align="center" marginTop={56}>
              <Button size="big" background="gray" title="취소" width={130} buttonMarkup={true} onClick={(e) => closeAttetionHandler(e)} />
              <Button size="big" background="blue80" title="확인" width={130} href="/mypage/personal/buycar/interestCar" />
            </Buttons>
          </div>
        </RodalPopup>
        <RodalPopup show={lDeleteShow} type={'fade'} closedHandler={lDeleteCloseHandler} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>차량을 삭제하시겠습니까?</p>
            <Buttons align="center" marginTop={56}>
              <Button size="big" background="gray" title="취소" width={130} onClick={(e) => lHandleDeleteCancel(e)} buttonMarkup={true} />
              <Button size="big" background="blue80" title="확인" width={130} onClick={lHandleDeleteAction} buttonMarkup={true} />
            </Buttons>
          </div>
        </RodalPopup>
        <RodalPopup show={iDeleteShow} type={'fade'} closedHandler={iDeleteCloseHandler} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p>차량을 삭제하시겠습니까?</p>
            <Buttons align="center" marginTop={56}>
              <Button size="big" background="gray" title="취소" width={130} onClick={(e) => iHandleDeleteCancel(e)} buttonMarkup={true} />
              <Button size="big" background="blue80" title="확인" width={130} onClick={iHandleDeleteAction} buttonMarkup={true} />
            </Buttons>
          </div>
        </RodalPopup>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={fpBottom}>
          {showTotalCostCalculation && (
            <MobTotalCostCalculation
              BuyViewInfo={{
                carPrice: totalCostCalculation?.slAmt * 10000,
                commercialYn: carAccident.carPlug,
                crTypeCd: carAccident.carTypeNo,
                dspl: carBaseInfo.dspl,
                seatingCapacity: carBaseInfo.crTkcarPsncpa,
                maxTon: carBaseInfo.crMaxton
              }}
            />
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  const handleListMore = (e) => {
    e.preventDefault();

    let nextPage = itemCount + 5;

    if (nextPage > totalCount) {
      nextPage = totalCount;
    }

    if (itemCount < totalCount && nextPage > itemCount) {
      for (let i = itemCount; i < nextPage; i++) {
        setListData(
          produce((draft) => {
            draft.push(interList[i]);
          })
        );
      }
      setItemCount(nextPage);
    }
  };

  const handleCheckChange = useCallback((e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setCheckall(false);

    console.log(name);

    setCheckData(
      produce((draft) => {
        draft[name] = checked;
      })
    );

    if (checked) {
      setTargetData(
        produce((draft) => {
          draft.push(name);
        })
      );
    } else {
      setTargetData(
        produce((draft) => {
          draft.splice(draft.indexOf(name), 1);
        })
      );
    }
  }, []);

  const onClickAll = (e) => {
    const bool = e.target.checked;
    setCheckall(bool);
    setCheckData(
      produce((draft) => {
        listData.map((data) => {
          draft[String(data.dlrPrdId)] = bool;
        });
      })
    );

    setTargetData([]);

    if (bool) {
      setTargetData(
        produce((draft) => {
          listData.map((data) => {
            draft.push(data.dlrPrdId);
          });
        })
      );
    }
  };

  //alertType 차량정보 클릭 시 팝업타입여부 (현재는 test 용도로 true 처리)
  const [alertType, setAlertType] = useState(false); //#a1 start
  //alertType 차량 dummy 상태 값(판매완료 : sellComplete, 나머지 : etc 값)
  const [status, setStatus] = useState('sellComplete'); //#a1 start

  const onChangeOrderBy = (e) => {
    const { value } = e.target;
    let orderBy = 'price';

    if (value == 1) {
      orderBy = 'price';
    } else {
      orderBy = 'date';
    }

    const searchParam = {
      pageNo: 1,
      order: orderBy
    };

    dispatch(getinterList(searchParam));
  };

  const compareCar = (e) => {
    e.preventDefault();
    console.log(targetData);
    if (targetData.length < 2) {
      showAlert('비교하실차량을 2개이상 선택해주세요(최대4개)');
      return false;
    } else if (targetData.length > 4) {
      showAlert('비교하실 차량은 최대4개까지 선택가능합니다.');
      return false;
    }

    const param = {
      prdNums: targetData.join(',')
    };
    axiosPost(`/api/mypage/user/interest/selectInterestCompareCarList.do`, param).then((res) => {
      console.log(res.data.data);
      setCompareData(res.data.data);
      setComparisonShow(true);
    });
  };

  const deleteSelectedCar = (e) => {
    e.preventDefault();
    if (targetData.length < 1) {
      showAlert('삭제할 차량을 선택해주세요');
      return false;
    }

    deletePopupHandler(e, 'fade');
  };

  const handleOneDelete = (e, idx) => {
    console.log(idx);
    e.preventDefault();

    //체크박스 풀기
    setCheckall(false);

    setCheckData(
      produce((draft) => {
        listData.map((data) => {
          draft[String(data.dlrPrdId)] = false;
        });
      })
    );

    //한개씩 지우는거라 기존 지우기는 해제
    setTargetData([]);

    setTargetData(
      produce((draft) => {
        draft.push(idx);
      })
    );

    deletePopupHandler(e, 'fade');
  };

  const handleDeleteAction = (e) => {
    deleteCloseHandler(e, 'fade');
    setDeleteShow(false);
    deleteRecentlyCar();
  };

  const deleteRecentlyCar = () => {
    const param = {
      prdNums: targetData.join(',')
    };

    axiosPost(`/api/mypage/user/interest/deleteInterestMemberCar.do`, param).then((res) => {
      console.log(res.data.data);

      const result = Number(res.data.data);

      if (result > 0) {
        showAlert('삭제되었습니다.');
        //삭제된 뒤에는 체크 리스트 해제
        setTargetData([]);

        const param = {
          pageNo: 1
        };

        dispatch(getinterList(param));
      } else {
        showAlert('삭제에 실패하였습니다.');
        return false;
      }
    });
  };

  const handleDeleteCancel = (e) => {
    deleteCloseHandler(e);
    setDeleteShow(false);
  };

  const testPrint = (e) => {
    e.preventDefault();
    const trigger = document.getElementById('trigger');
    trigger.click();
  };

  const inkDetailCar = (e, data) => {
    e.preventDefault();
    console.log('onclick');
    console.log(data);
    if (data.sttDvNm === '0060') {
      showAlert('해당차량은 판매종료 되었습니다.');
    } else  if (data.sttDvNm === '0050' || data.sttDvNm === '0090' || data.sttDvNm === '0070') {
      showAlert('해당차량은 광고 종료 되었습니다.');
    } else {
      Router.push('/buycar/buyCarDetailType?dlrPrdId='+ data.dlrPrdId);
    }
  }


  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-buy-sec">
          <div className="mypage-admin-title">
            <h3>관심 차량</h3>
            <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <Button size="mid" line="gray" radius={true} title="선택한 차량 비교"
                       width={129} height={38}
                        disabled={withoutList}
                        color= {withoutList === true ? 'gray' : ''}
                        onClick={withoutList === true ? (e) => e.preventDefault() : (e) => compareCar(e)} />
              <Button
                size="mid"
                line="gray"
                radius={true}
                title="선택한 차량 삭제"
                width={129}
                height={38}
                marginLeft={16}
                disabled={withoutList}
                color= {withoutList === true ? 'gray' : ''}
                onClick={withoutList === true ? (e) => e.preventDefault() : (e) => deleteSelectedCar(e)}
              />
              <RadioGroup
                className="sort-r"
                dataList={[
                  { id: 'sortUpload', value: 1, checked: true, disabled: false, title: '가격순' },
                  { id: 'sortPrice', value: 2, checked: true, disabled: false, title: '등록순' }
                ]}
                defaultValue={1}
                onChange={(e) => onChangeOrderBy(e)}
              />
            </div>
            <div className="admin-list tp7 chk">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="36px" />
                    <col width="51%" />
                    <col width="14%" />
                    <col width="14%" />
                    <col width="12%" />
                    <col width="7%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>
                        <CheckBox id="register-car-chk1" name="checkAll" onChange={onClickAll} checked={checkall} isSelf={false} />
                      </th>
                      <th>차량정보</th>
                      <th>가격</th>
                      <th>판매자</th>
                      <th>지역</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  {withoutList === false ? (
                    <tbody>
                      {listData.map((v) => {
                        return (
                          <tr key={v.dlrPrdId}>
                            <td>
                              <CheckBox id={'chk-' + v.dlrPrdId} name={String(v.dlrPrdId)} onChange={handleCheckChange} checked={checkData[String(v.dlrPrdId)]} isSelf={false} />
                            </td>
                            <td>
                              <a href="#" onClick={(e) => inkDetailCar(e, v)}>
                                {' '}
                                {/* #a1 */}
                                <ImgCover src={baseURL + v.phtUrl} alt={v.imgAlt} />
                                <div className="summary">
                                  <h5 className="subject">{v.crNm}</h5>
                                  <ul className="info">
                                    <li>{v.crNo}</li>
                                    <li>{v.frmYyyy}</li>
                                  </ul>
                                  <ul className="info">
                                    <li>{v.fuelDvcd}</li>
                                    <li>{v.drvDistCnt} km</li>
                                  </ul>
                                </div>
                              </a>
                            </td>
                            <td>
                              <p className="price-tp6">
                                {numberFormat(v.slAmt)}
                                <span className="won">만원</span>
                              </p>
                            </td>
                            <td className="seller">
                              {v.mbNm}
                              <br />
                              {v.mbHpPn}
                            </td>
                            <td>{v.mbAcLocNm}</td>
                            <td>
                              <button className="btn-close" onClick={(e) => handleOneDelete(e, v.dlrPrdId)} />
                            </td>
                          </tr>
                        );
                      })}
                      {nowCount < totalCount && (
                        <tr className="more">
                          <td colSpan="6" className="more">
                            <div className="cate-list-btn2">
                              <button onClick={(e) => handleListMore(e)}>
                                더보기({nowCount > totalCount ? totalCount : itemCount}/{totalCount})
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr className="list-none">
                        <td colSpan="6">
                          관심차량으로 등록한 차량이 없습니다.
                          <br />
                          <Button size="big" background="blue80" title="차량검색 하러 가기" width={245} height={60} marginTop={16} href="/buycar/buyCarList" />
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={comparisonShow} type={'slideUp'} closedHandler={comparisonCloseHandler} mode="normal" size="large">
        <PricingToPrintButton trigger={() => <a href="#" id="trigger"></a>} content={() => printRef} pageStyle="" />
        <div ref={(el) => (printRef = el)} id={'printDiv'}>
          <MypageCompare show={comparisonShow} onClickPrint={testPrint} compareList={compareData} />
        </div>
      </RodalPopup>

      <RodalPopup show={deleteShow} type={'slideUp'} closedHandler={deleteCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>차량을 삭제하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} onClick={(e) => handleDeleteCancel(e)} buttonMarkup={true} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={handleDeleteAction} buttonMarkup={true} />
          </Buttons>
        </div>
      </RodalPopup>

      {/* #a1 start */}
      <RodalPopup show={statusMsgShow} type={'slideUp'} closedHandler={statusMsgCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          {status === 'sellComplete' ? <p>해당 차량은 판매완료 되었습니다.</p> : <p>해당 차량은 광고종료 되었습니다.</p>}
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
      {/* #a1 end */}
    </AppLayout>
  );
};
InterestCar.displayName = 'InterestCar';

export default withRouter(InterestCar);
