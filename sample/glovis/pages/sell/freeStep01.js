import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import MobLogin from "@src/components/common/MobLogin";
import MobSelectTerms from "@src/components/common/MobSelectTerms";
import MobFullpagePopup from "@src/components/common/MobFullpagePopup";
import MobFilterModel from "@src/components/common/MobFilterModel";
import MobSellRegister from "@src/components/common/MobSellRegister";
import DatePicker from "@src/components/common/calendar/DatePicker";
import CheckColors from "@src/components/common/CheckColors";
import FindAddress from "@src/components/common/popup/FindAddress";
import Button from "@lib/share/items/Button";
import Buttons from "@lib/share/items/Buttons";
import CheckBox from "@lib/share/items/CheckBox";
import Radio from "@lib/share/items/Radio";
import Textarea from "@lib/share/items/Textarea";
import Input from "@lib/share/items/Input";
import RodalPopup from "@lib/share/popup/RodalPopup";
import useRodal from "@lib/share/custom/useRodal";
import Steps from "@lib/share/items/Steps";
import AppLayout from "@src/components/layouts/AppLayout";
import CarOptions from "@src/components/common/CarOptions";
import MobBottomArea from "@lib/share/items/MobBottomArea";
import MobSelectBox from "@lib/share/items/MobSelectBox";
import MobCalendar from "@lib/share/items/MobCalendar";
import {
  SECTION_SELL,
  MOBILE_HEADER_TYPE_SUB,
  MOBILE_CONTENT_STYLE,
  MOBILE_FULLPAGE_POPUP,
  MOBILE_FULLPAGE_POPUP_CLOSE
} from "@src/actions/types";
import { numberFormat, transformText } from "@src/utils/CommonUtil";
import { freeTerm } from "@src/dummy/terms";

/*
  html 변경이력
  03.10 : #a1 참고 septs 항목추가     
*/

const FreeStep01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector(state => state.common.hasMobile);
  const mFullpagePopup = useSelector(state => state.common.mFullpagePopup);

  const now = moment();

  // alert 팝업
  const [alertPop1, setAlertPop1, openAlertPop1, closeAlertPop1] = useRodal(
    false,
    false
  );
  const [alertPop2, setAlertPop2, openAlertPop2, closeAlertPop2] = useRodal(
    false,
    true
  );
  const [alertPop3, setAlertPop3, openAlertPop3, closeAlertPop3] = useRodal(
    false,
    false
  );
  const [alertPop4, setAlertPop4, openAlertPop4, closeAlertPop4] = useRodal(
    false,
    false
  );
  const [applyTerms, setApplyTerms] = useState(true);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: "무평가 판매",
        options: ["back", "close"]
      }
    });

    useEffect(() => {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: "#f6f7f8"
        }
      });
    }, []);

    // 질문
    const [qGreet, setQGreet] = useState(false);
    const [qIntro, setQIntro] = useState(false);
    const [qOwner, setQOwner] = useState(false);
    const [qAutobellMember, setQAutobellMember] = useState(false);
    const [qSellCarConfirm, setQSellCarConfirm] = useState(false);
    const [qCarSearch, setQCarSearch] = useState(false);
    const [qCarBasicInfo, setQCarBasicInfo] = useState(false);
    const [qCarOptions, setQCarOptions] = useState(false);
    const [qDistance, setQDistance] = useState(false);
    const [qMetalExchange, setQMetalExchange] = useState(false);
    const [qSpecial, setQSpecial] = useState(false);
    const [qConsign, setQConsign] = useState(false);
    const [qAccount, setQAccount] = useState(false);

    const [qTerms, setQTerms] = useState(false);
    const [qCarRegist, setQCarRegist] = useState(false);

    // 더보기, change되는 값
    const [isAccountNum, setIsAccountNum] = useState(0);
    const [accountValue, setAccountValue] = useState("");

    // 결과 값
    const [isOwner, setIsOwner] = useState(false);
    const [isMemberType, setIsMemberType] = useState(null);
    const [isSellCar, setIsSellCar] = useState(null);
    const [isCarBasicInfo, setIsCarBasicInfo] = useState(false);
    const [isCarOptions, setIsCarOptions] = useState(false);
    const [isDistance, setIsDistance] = useState("");
    const [isMetalExchange, setIsMetalExchange] = useState("");
    const [isSpecial, setIsSpecial] = useState("");
    const [isConsign, setIsConsign] = useState(false);
    const [isAccount, setIsAccount] = useState("");
    const [isTerms, setIsTerms] = useState(false);

    // 팝업
    const [applyOwner, setApplyOwner] = useState(false);
    const [applyCarInfo, setApplyCarInfo] = useState(false);
    const [applyAutobellMember, setApplyAutobellMember] = useState(false);
    const [applySellCarConfirm, setApplySellCarConfirm] = useState(false);
    const [applyCarSearch, setApplyCarSearch] = useState(false);
    const [applyCarBasicInfo, setApplyCarBasicInfo] = useState(false);
    const [applyCarBasicInfoInner, setApplyCarBasicInfoInner] = useState(false);
    const [applyCarOptions, setApplyCarOptions] = useState(false);
    const [applyCarOptionsInner, setApplyCarOptionsInner] = useState(false);
    const [applyDistance, setApplyDistance] = useState(false);
    const [applyMetalExchange, setApplyMetalExchange] = useState(false);
    const [applySpecial, setApplySpecial] = useState(false);
    const [applyConsign, setApplyConsign] = useState(false);
    const [applyAccount, setApplyAccount] = useState(false);
    const [applyTerms, setApplyTerms] = useState(false);
    const [applyCarRegistration, setApplyCarRegistration] = useState(false);

    // 풀페이지 팝업
    const [fpTerms1, setFpTerms1] = useState(false);
    const [fpTerms2, setFpTerms2] = useState(false);
    const [fpLogin, setFpLogin] = useState(false);
    const [fpFilter, setFpFilter] = useState(false);
    const [fpAddress, setFpAddress] = useState(false);
    const [fpRegist, setFpRegist] = useState(false);

    // 인풋, 텍스트에리어 값 컨트롤
    const [distanceValue, setDistanceValue] = useState("");
    const [textareaValue1, setTextareaValue1] = useState("");
    const [textareaValue2, setTextareaValue2] = useState("");
    const [calcH1, setCalcH1] = useState(80);
    const [calcH2, setCalcH2] = useState(80);

    // 은행명 선택
    const [accountBank, setAccountBank] = useState("은행명");
    const [isChangeBank, setIsChangeBank] = useState(false);
    const handleBankValue = e => {
      e.preventDefault();
      const { value } = e.target;
      setIsAccountNum(+value);
      setAccountBank(e.currentTarget.dataset.label);
    };
    const handleSelectBank = e => {
      e.preventDefault();
      setIsChangeBank(prevChange => !prevChange);
    };
    const handleAccountValue = useCallback(
      e => {
        setAccountValue(e.target.value);
      },
      [accountValue]
    );
    const handleDistance = useCallback(
      e => {
        setDistanceValue(e.target.value);
      },
      [distanceValue]
    );
    const handleTextareaChange1 = useCallback(
      e => {
        const targetH = e.target.scrollHeight;
        setCalcH1(targetH <= 60 ? targetH + 40 : 100);
        setTextareaValue1(e.target.value);
      },
      [textareaValue1]
    );
    const handleTextareaChange2 = useCallback(
      e => {
        const targetH = e.target.scrollHeight;
        setCalcH2(targetH <= 60 ? targetH + 40 : 100);
        setTextareaValue2(e.target.value);
      },
      [textareaValue2]
    );
    const createMetalExchange = cond => {
      if (cond === "no") {
        return <p>없습니다.</p>;
      } else if (cond === "dontknow") {
        return <p>잘 몰라요.</p>;
      } else {
        return <p>{transformText(cond)}</p>;
      }
    };

    // 더보기 클릭 시, 방문지역 선택
    const handleOwnerSearch = useCallback(e => {
      e.preventDefault();
      setApplyCarInfo(true);
    }, []);

    const timeouts = useRef([]);
    const duration = 500;

    useEffect(() => {
      timeouts.current[0] = setTimeout(() => {
        setQGreet(true);
        timeouts.current[1] = setTimeout(() => {
          setQIntro(true);
          timeouts.current[2] = setTimeout(() => {
            setQOwner(true);
            setApplyOwner(true);
          }, duration);
        }, duration);
      }, duration);

      return () => {
        timeouts.current.forEach(v => {
          clearTimeout(v);
        });
      };
    }, []);

    useEffect(() => {
      if (applyOwner) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyCarInfo) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 356,
            color: "#f6f7f8"
          }
        });
      }
      if (applyAutobellMember) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applySellCarConfirm) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyCarSearch) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyCarBasicInfo) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      // if (applyCarBasicInfoInner) {
      //   dispatch({
      //     type: MOBILE_CONTENT_STYLE,
      //     data: {
      //       bottom: 567,
      //       color: '#f6f7f8',
      //     }
      //   });
      // }
      if (applyCarOptions) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      // if (applyCarOptionsInner) {
      //   dispatch({
      //     type: MOBILE_CONTENT_STYLE,
      //     data: {
      //       bottom: 567,
      //       color: '#f6f7f8',
      //     }
      //   });
      // }
      if (applyDistance) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyMetalExchange) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 126,
            color: "#f6f7f8"
          }
        });
      }
      if (applySpecial) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 106,
            color: "#f6f7f8"
          }
        });
      }
      if (applyConsign) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyAccount) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 208,
            color: "#f6f7f8"
          }
        });
      }
      if (applyTerms) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 216,
            color: "#f6f7f8"
          }
        });
      }
      if (applyCarRegistration) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 140,
            color: "#f6f7f8"
          }
        });
      }
      setTimeout(() => {
        window.scrollTo(0, document.body.clientHeight - window.innerHeight);
      }, 10);
    }, [
      applyOwner,
      applyCarInfo,
      applyAutobellMember,
      applySellCarConfirm,
      applyCarSearch,
      applyCarBasicInfo,
      applyCarBasicInfoInner,
      applyCarOptions,
      applyCarOptionsInner,
      applyDistance,
      applyMetalExchange,
      applySpecial,
      applyConsign,
      applyAccount,
      applyTerms,
      applyCarRegistration
    ]);

    // 전송 클릭 시
    const handleOwnerApply = useCallback(e => {
      e.preventDefault();
      setIsOwner(true);
      setApplyOwner(false);
      setApplyCarInfo(false);
      timeouts.current[3] = setTimeout(() => {
        setQAutobellMember(true);
        setApplyAutobellMember(true);
      }, duration);
    }, []);
    const handleMemberApply = useCallback(
      type => e => {
        e.preventDefault();
        setIsMemberType(type);
        setApplyAutobellMember(false);
        timeouts.current[4] = setTimeout(() => {
          setQSellCarConfirm(true);
          setApplySellCarConfirm(true);
        }, duration);
      },
      []
    );
    const handleSellCarApply = useCallback(
      answer => e => {
        e.preventDefault();
        setIsSellCar(answer);
        setApplySellCarConfirm(false);
        if (answer) {
          timeouts.current[5] = setTimeout(() => {
            setQCarBasicInfo(true);
            setApplyCarBasicInfo(true);
          }, duration);
        } else {
          setQCarSearch(true);
          timeouts.current[6] = setTimeout(() => {
            setApplyCarSearch(true);
          }, duration);
        }
      },
      []
    );
    const handleApplyCarBasicInfoInner = useCallback(e => {
      e.preventDefault();
      setApplyCarBasicInfoInner(true);
    }, []);
    const handleCarBasicInfoApply = useCallback(e => {
      e.preventDefault();
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setIsCarBasicInfo(true);
      timeouts.current[7] = setTimeout(() => {
        setQCarOptions(true);
        setApplyCarOptions(true);
      }, duration);
    }, []);
    const handleCarOptionsApply = useCallback(e => {
      e.preventDefault();
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setIsCarOptions(true);
      timeouts.current[8] = setTimeout(() => {
        setQDistance(true);
        setApplyDistance(true);
      }, duration);
    }, []);
    const handleApplyCarOptionsInner = useCallback(e => {
      e.preventDefault();
      setApplyCarOptionsInner(true);
    }, []);
    const handleDistanceApply = useCallback(
      e => {
        e.preventDefault();
        setIsDistance(distanceValue);
        setApplyDistance(false);
        timeouts.current[9] = setTimeout(() => {
          setQMetalExchange(true);
          setApplyMetalExchange(true);
        }, duration);
      },
      [distanceValue]
    );
    const handleMetalExchangeApply = useCallback(
      cond => e => {
        e.preventDefault();
        setIsMetalExchange(cond);
        setApplyMetalExchange(false);
        timeouts.current[10] = setTimeout(() => {
          setQSpecial(true);
          setApplySpecial(true);
        }, duration);
      },
      []
    );
    const handleSpecialApply = useCallback(
      cond => e => {
        e.preventDefault();
        setIsSpecial(cond ? textareaValue2 : false);
        setApplySpecial(false);
        timeouts.current[11] = setTimeout(() => {
          setQConsign(true);
          setApplyConsign(true);
        }, duration);
      },
      [textareaValue2]
    );
    const handleConsignApply = useCallback(e => {
      e.preventDefault();
      setIsConsign(true);
      setApplyConsign(false);
      timeouts.current[12] = setTimeout(() => {
        setQAccount(true);
        setApplyAccount(true);
      }, duration);
    }, []);
    const handleAccountApply = useCallback(
      cond => e => {
        e.preventDefault();
        setApplyAccount(false);
        setIsAccount(
          cond ? `${accountBank} ${accountValue}` : `나중에 입력할게요`
        );
        if (accountValue !== "") {
          timeouts.current[13] = setTimeout(() => {
            setQTerms(true);
            setApplyTerms(true);
          }, duration);
        }
      },
      [isAccountNum, accountBank, accountValue]
    );

    const handleTermsApply = useCallback(e => {
      e.preventDefault();
      setIsTerms(true);
      setApplyTerms(false);
      timeouts.current[14] = setTimeout(() => {
        setQCarRegist(true);
        setApplyCarRegistration(true);
      });
    }, []);

    // 수정 클릭 시
    const handleOwnerModify = useCallback(() => {
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInisAccoufoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyConsign(false);
      setApplyAccount(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyOwner(true);
    }, []);

    const handleAutobellMemberModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyConsign(false);
      setApplyAccount(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyAutobellMember(true);
    }, []);

    const handleSellCarConfirmModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyConsign(false);
      setApplyAccount(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplySellCarConfirm(true);
    }, []);

    const handleCarBasicInfoModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyConsign(false);
      setApplyAccount(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyCarBasicInfo(true);
    }, []);

    const handleCarOptionsModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyConsign(false);
      setApplyAccount(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyCarOptions(true);
    }, []);

    const handleDistanceModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyConsign(false);
      setApplyAccount(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyDistance(true);
    }, []);

    const handleMetalExchangeModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplySpecial(false);
      setApplyConsign(false);
      setApplyAccount(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyMetalExchange(true);
    }, []);

    const handleSpecialModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyMetalExchange(false);
      setApplyDistance(false);
      setApplyConsign(false);
      setApplyAccount(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplySpecial(true);
    }, []);

    const handleConsignModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyAccount(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyConsign(true);
    }, []);

    const handleAccountModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyConsign(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyAccount(true);
    }, []);

    const handleTermsModify = useCallback(() => {
      setApplyOwner(false);
      setApplyCarInfo(false);
      setApplyAutobellMember(false);
      setApplySellCarConfirm(false);
      setApplyCarSearch(false);
      setApplyCarBasicInfo(false);
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyAccount(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyCarRegistration(false);
      setApplyConsign(false);
      setApplyTerms(true);
    }, []);

    const handleFullpagePopup = useCallback(
      name => e => {
        e.preventDefault();
        if (name === "terms1") {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: "무평가 이용약관",
              options: ["back", "close"]
            }
          });
          setFpLogin(false);
          setFpTerms2(false);
          setFpFilter(false);
          setFpAddress(false);
          setFpRegist(false);
          setFpTerms1(true);
        } else if (name === "terms2") {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: "무평가 환불약관",
              options: ["back", "close"]
            }
          });
          setFpLogin(false);
          setFpTerms1(false);
          setFpFilter(false);
          setFpAddress(false);
          setFpRegist(false);
          setFpTerms2(true);
        } else if (name === "login") {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: "로그인",
              options: ["close"]
            }
          });
          setFpTerms1(false);
          setFpTerms2(false);
          setFpFilter(false);
          setFpAddress(false);
          setFpRegist(false);
          setFpLogin(true);
        } else if (name === "filter") {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: "제조사 · 모델 · 등급 선택",
              options: ["back", "reset"]
            }
          });
          setFpTerms1(false);
          setFpTerms2(false);
          setFpLogin(false);
          setFpAddress(false);
          setFpRegist(false);
          setFpFilter(true);
        } else if (name === "address") {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: "주소검색",
              options: ["close"]
            }
          });
          setFpTerms1(false);
          setFpTerms2(false);
          setFpLogin(false);
          setFpFilter(false);
          setFpRegist(false);
          setFpAddress(true);
        } else if (name === "register") {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: "차량사진 등록",
              options: ["close"]
            }
          });
          setFpTerms1(false);
          setFpTerms2(false);
          setFpLogin(false);
          setFpFilter(false);
          setFpAddress(false);
          setFpRegist(true);
        }
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
      },
      []
    );

    const handleTermsPopup = useCallback((e, v) => {
      e.preventDefault();
      if (v.id === "chk1") {
        handleFullpagePopup("terms1")(e);
      } else if (v.id === "chk2") {
        handleFullpagePopup("terms2")(e);
      }
    }, []);

    const handleFpTermsClose = useCallback(
      e => {
        e.preventDefault();
        setFpTerms1(false);
        setFpTerms2(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      },
      [fpTerms1, fpTerms2]
    );
    const handleFpLoginClose = useCallback(
      e => {
        e.preventDefault();
        setFpLogin(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        handleMemberApply("member")(e);
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      },
      [setFpLogin]
    );

    const addressCallback = useCallback(e => {
      e.preventDefault();
      setFpAddress(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      handleConsignApply(e);
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, []);

    // 차량검색 - 제조사·모델·등급 선택
    const filterCallback = useCallback(
      e => {
        e.preventDefault();
        setApplyCarSearch(false);
        setFpFilter(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        handleSellCarApply(true)(e);
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      },
      [fpTerms1, fpTerms2]
    );
    const registerCallback = useCallback(e => {
      e.preventDefault();
      setFpRegist(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, []);

    // 차량 기본정보 - 색상
    const [isClose, setIsClose] = useState(false);
    const [colorChange, setColorChange] = useState("색상");
    const handleSelectColors = useCallback(
      (e, color) => {
        setIsClose(prevChange => !prevChange); //mobselect close
        setColorChange(color);
      },
      [colorChange]
    );

    // 차량 옵션정보 - 옵션선택
    const [carOptionsSelect, setCarOptionsSelect] = useState(false);
    const [dimm, setDimm] = useState(false);
    const handleOptionClick = useCallback(() => {
      setCarOptionsSelect(true);
      setDimm(true);
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }, []);
    const handleCloseDimm = useCallback(() => {
      setCarOptionsSelect(false);
      setDimm(false);
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, []);

    // 차량 기본정보 - 달력
    const [calPop, setCalPop] = useState(false);
    const [isDate, setIsDate] = useState(moment());
    const handleCalendarPop = e => {
      e.preventDefault();
      setCalPop(true);
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    };
    const calendarCallback = (e, date) => {
      e.preventDefault();
      setIsDate(date);
      setCalPop(false);
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    };
    const calendarClose = e => {
      setCalPop(false);
    };

    return (
      <AppLayout>
        <div className="content-sec sell-register-wrap">
          <div className="chat-list-wrap">
            <div className="left">
              {qGreet && (
                <p>
                  안녕하세요. 오토벨입니다. 신청완료와 동시에 차량 대금 먼저
                  지급! 이제 대금 먼저 받고 차량 판매하세요!
                </p>
              )}
              {qIntro && (
                <p>
                  차량 출시 기준 33개월 이하, 주행거리 3만 km이하의 차량이라면
                  무평가 판매 신청이 가능합니다.
                </p>
              )}
              {qOwner && (
                <p>
                  차량 조회를 위해 소유자 정보를 확인합니다. 차량번호와 소유자가
                  일치해야 진행하실 수 있어요.
                </p>
              )}
            </div>
            {isOwner && (
              <div className="right">
                <p>차량 소유자가 맞습니다.</p>
                <span className="edit" onClick={handleOwnerModify}>
                  수정
                </span>
              </div>
            )}

            {/* 컷오프 기준 미달 시 - 내차팔기_v1.6_PPT 38 참조 */}
            {/* <div className="left">
              <p>조회하신 차량은 무평가 판매 가능 차량이 아닙니다. (차량 출시 기준 33개월 이하, 주행거리 3만 km이하의 차량) 방문평가 판매로 신청하시겠어요?</p>
            </div> */}

            {qAutobellMember && (
              <div className="left">
                <p>
                  아직 오토벨 회원이 아니신가요? 로그인하시면 다양한 서비스를
                  편리하게 이용하실 수 있어요.
                </p>
              </div>
            )}
            {isMemberType !== null && (
              <div className="right">
                {isMemberType === "member" && <p>로그인 했어요.</p>}
                {isMemberType === "no-member" && <p>비회원으로 진행할래요.</p>}
                <span className="edit" onClick={handleAutobellMemberModify}>
                  수정
                </span>
              </div>
            )}

            {qSellCarConfirm && (
              <div className="left">
                <p>
                  판매하시려는 차량이 <b>현대 그랜저 IG 2.4 프리미엄</b>{" "}
                  맞으세요?
                </p>
              </div>
            )}
            {isSellCar === false && (
              <div className="right">
                <p>아니오.</p>
              </div>
            )}
            {qCarSearch && (
              <div className="left">
                <p>판매를 원하시는 차량명과 등급을 알려주세요.</p>
              </div>
            )}
            {isSellCar && (
              <div className="right">
                <p>현대 그랜저 IG 2.4 프리미엄입니다.</p>
                <span className="edit" onClick={handleSellCarConfirmModify}>
                  수정
                </span>
              </div>
            )}
            {qCarBasicInfo && (
              <div className="left">
                <p>차량의 기본정보를 확인해주세요.</p>
              </div>
            )}
            {isCarBasicInfo && (
              <div className="right">
                <p>차량 기본정보 확인했습니다.</p>
                <span className="edit" onClick={handleCarBasicInfoModify}>
                  수정
                </span>
              </div>
            )}
            {qCarOptions && (
              <div className="left">
                <p>차량의 옵션정보를 확인해주세요.</p>
              </div>
            )}
            {isCarOptions && (
              <div className="right">
                <p>차량 옵션정보 확인 했습니다.</p>
                <span className="edit" onClick={handleCarOptionsModify}>
                  수정
                </span>
              </div>
            )}
            {qDistance && (
              <div className="left">
                <p>주행거리(Km)는 얼마인가요?</p>
              </div>
            )}
            {isDistance !== "" && (
              <div className="right">
                <p>{numberFormat(isDistance)}km 입니다.</p>
                <span className="edit" onClick={handleDistanceModify}>
                  수정
                </span>
              </div>
            )}
            {qMetalExchange && (
              <div className="left">
                <p>판금 및 교환하신 부위가 있으신가요?</p>
              </div>
            )}
            {isMetalExchange !== "" && (
              <div className="right">
                {createMetalExchange(isMetalExchange)}
                <span className="edit" onClick={handleMetalExchangeModify}>
                  수정
                </span>
              </div>
            )}
            {qSpecial && (
              <div className="left">
                <p>차량에 관한 기타 설명 및 사고, 기타 정보를 입력해주세요.</p>
              </div>
            )}
            {isSpecial !== "" && (
              <div className="right">
                <p>
                  {isSpecial === false
                    ? "특이사항 없음"
                    : transformText(isSpecial)}
                </p>
                <span className="edit" onClick={handleSpecialModify}>
                  수정
                </span>
              </div>
            )}

            {qConsign && (
              <div className="left">
                <p>
                  상담이후 탁송기사님이 차량이 있는 주소로 방문합니다. 주소를
                  입력해주세요.
                </p>
              </div>
            )}
            {isConsign && (
              <div className="right">
                <p>서울시 강남구 언주로 333 입니다.</p>
                <span className="edit" onClick={handleConsignModify}>
                  수정
                </span>
              </div>
            )}

            {qAccount && (
              <div className="left">
                <p>
                  차량 판매가 확정되면 고객님께 바로 차량금액을 보내드립니다.
                  계좌번호를 입력해주세요. (본인계좌만 이용할 수 있어요)
                </p>
              </div>
            )}
            {isAccount !== "" && (
              <div className="right">
                <p>{isAccount}</p>
                <span className="edit" onClick={handleAccountModify}>
                  수정
                </span>
              </div>
            )}
            {qTerms && (
              <div className="left">
                <p>셀프평가 판매를 위해서는 서비스 이용동의가 필요해요</p>
              </div>
            )}
            {isTerms !== false && (
              <div className="right">
                <p>셀프평가 판매 이용에 동의합니다.</p>
                <span className="edit" onClick={handleTermsModify}>
                  수정
                </span>
              </div>
            )}
            {qCarRegist && (
              <div className="left">
                <p>
                  마지막으로 차량사진을 등록해 주세요.(최소5장 ~ 15장)
                  <br />
                  오토벨 App 으로 쉽고 간편하게 촬영하실 수 있어요
                </p>
              </div>
            )}

            {/* 
            
            <div className="left">
              <p>무평가 판매를 위해서는 서비스 이용동의가 필요해요</p>
            </div>
            <div className="right">
              <p>개인정보 수집 및 이용, 제 3자 정보 제공, 마케팅 활동에 동의합니다.</p>
              <span>수정</span>
            </div>
            <div className="left">
              <p>마지막으로 차량사진을 등록해 주세요.(최소5장 ~ 15장)<br />오토벨 App 으로 쉽고 간편하게 촬영하실 수 있어요</p>
            </div>
            <div className="right">
              <p>사진 4장 등록했어요.</p>
              <span>수정</span>
            </div> */}
          </div>

          {/* 채팅창 로딩중 */}
          <MobBottomArea active={true} isSimple={true}>
            <div className="inner">
              <div className="loading-wrap"></div>
            </div>
          </MobBottomArea>

          {/* step01 : 소유자 확인 */}
          <MobBottomArea active={applyOwner} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="소유자 확인"
                iconType="next-black"
                height={48}
                onClick={handleOwnerSearch}
              />
            </div>
          </MobBottomArea>

          {/* step02 : 차량정보 조회 */}
          <MobBottomArea active={applyCarInfo} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <p className="tit1">
                차량정보 조회
                <br />
                <span>
                  차량 정보는 실제 정보와 다를 수 있으나, 수정하실 수 있습니다.
                </span>
              </p>
              <table className="table-tp1" summary="차량정보 조회에 대한 내용">
                <caption className="away">차량정보 조회</caption>
                <colgroup>
                  <col width="34%" />
                  <col width="66%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td>03라4567</td>
                  </tr>
                  <tr>
                    <th>차량명</th>
                    <td>
                      기아 K3 쿱 1.6 터보 GDI 프레스티지 K3 2DR 1.6 T / GDI
                      프레스티지 M/T
                    </td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>2017-04-14</td>
                  </tr>
                  <tr>
                    <th>형식년도</th>
                    <td>2018</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button
              size="full"
              background="blue80"
              title="확인"
              onClick={handleOwnerApply}
            />
          </MobBottomArea>

          {/* step03 : 오토벨 회원여부 확인 */}
          <MobBottomArea
            active={applyAutobellMember}
            isSimple={true}
            mode="fade"
          >
            <div className="inner">
              <Buttons align="center">
                <Button
                  size="big"
                  background="blue20"
                  color="blue80"
                  radius={true}
                  title="비회원으로 신청"
                  width={48}
                  measure={"%"}
                  height={48}
                  onClick={handleMemberApply("no-member")}
                />
                {/* <Button size="big" background="blue80" radius={true} title="로그인" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} onClick={handleMemberApply('member')} /> */}
                <Button
                  size="big"
                  background="blue80"
                  radius={true}
                  title="로그인"
                  width={48}
                  measure={"%"}
                  height={48}
                  marginLeft={4}
                  mgMeasure={"%"}
                  onClick={handleFullpagePopup("login")}
                />
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step05 : 판매차량 확인 */}
          <MobBottomArea
            active={applySellCarConfirm}
            isSimple={true}
            mode="fade"
          >
            <div className="inner">
              <Buttons align="center">
                <Button
                  size="big"
                  background="blue20"
                  color="blue80"
                  radius={true}
                  title="아니오"
                  width={48}
                  measure={"%"}
                  height={48}
                  onClick={handleSellCarApply(false)}
                />
                <Button
                  size="big"
                  background="blue80"
                  radius={true}
                  title="예"
                  width={48}
                  measure={"%"}
                  height={48}
                  marginLeft={4}
                  mgMeasure={"%"}
                  onClick={handleSellCarApply(true)}
                />
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step06 : 차량검색(아니오 버튼 클릭시) */}
          <MobBottomArea active={applyCarSearch} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              {/* <Button className="btn-select" size="full" line="gray" color="black" fontWeight="400" radius={true} title="차량검색" iconType="next-black" height={48} nextLink={true} href="selfStep01Filter01" /> */}
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="차량검색"
                iconType="next-black"
                height={48}
                onClick={handleFullpagePopup("filter")}
              />
            </div>
          </MobBottomArea>

          {/* step07 : 차량기본정보 */}
          <MobBottomArea
            active={applyCarBasicInfo}
            isSimple={true}
            className="min"
            mode="fade"
          >
            <div className="inner bottom-write-area">
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="차량 기본 정보"
                iconType="next-black"
                height={48}
                onClick={handleApplyCarBasicInfoInner}
              />
              <MobBottomArea
                active={applyCarBasicInfoInner}
                isSimple={true}
                className="min"
                mode="fade"
                isFixButton={true}
              >
                <div className="inner bottom-write-area pb0">
                  <form>
                    <fieldset>
                      <legend className="away">차량 기본정보</legend>
                      <table
                        summary="차량 기본정보에 대한 내용"
                        className="table-tp2"
                      >
                        <caption>차량 기본정보</caption>
                        <colgroup>
                          <col width="34%" />
                          <col width="66%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>최초등록일</th>
                            <td>
                              <DatePicker
                                defaultValue={isDate}
                                inputWidth={100}
                                inputMeasure={"%"}
                                onClick={handleCalendarPop}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>형식년도</th>
                            <td>
                              <MobSelectBox
                                options={[
                                  {
                                    id: "radio1",
                                    value: 1,
                                    checked: true,
                                    disabled: false,
                                    label: "2016년"
                                  },
                                  {
                                    id: "radio2",
                                    value: 2,
                                    checked: false,
                                    disabled: false,
                                    label: "2017년"
                                  }
                                ]}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>색상</th>
                            <td>
                              <MobSelectBox
                                customMode={true}
                                customName={colorChange}
                                isClose={isClose}
                              >
                                <div className="inner filter-list-wrap pt0">
                                  <CheckColors
                                    mode="radio"
                                    onClick={handleSelectColors}
                                    selectedColor={colorChange}
                                  />
                                </div>
                              </MobSelectBox>
                            </td>
                          </tr>
                          <tr>
                            <th>연료</th>
                            <td>
                              <MobSelectBox
                                options={[
                                  {
                                    id: "radio3",
                                    value: 1,
                                    checked: true,
                                    disabled: false,
                                    label: "가솔린+전기"
                                  },
                                  {
                                    id: "radio4",
                                    value: 2,
                                    checked: false,
                                    disabled: false,
                                    label: "가솔린"
                                  }
                                ]}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>배기량(cc)</th>
                            <td>
                              <label htmlFor="engine-cc" className="hide">
                                배기량
                              </label>
                              <Input
                                type="text"
                                value="1,591"
                                id="engine-cc"
                                height={40}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>차종</th>
                            <td>
                              <MobSelectBox
                                options={[
                                  {
                                    id: "radio5",
                                    value: 1,
                                    checked: true,
                                    disabled: false,
                                    label: "준중형차"
                                  },
                                  {
                                    id: "radio6",
                                    value: 2,
                                    checked: false,
                                    disabled: false,
                                    label: "중형차"
                                  },
                                  {
                                    id: "radio7",
                                    value: 3,
                                    checked: false,
                                    disabled: false,
                                    label: "소형차"
                                  },
                                  {
                                    id: "radio8",
                                    value: 4,
                                    checked: false,
                                    disabled: false,
                                    label: "경차"
                                  }
                                ]}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>용도</th>
                            <td>
                              <MobSelectBox
                                options={[
                                  {
                                    id: "radio9",
                                    value: 1,
                                    checked: true,
                                    disabled: false,
                                    label: "일반"
                                  },
                                  {
                                    id: "radio10",
                                    value: 2,
                                    checked: false,
                                    disabled: false,
                                    label: "장애인"
                                  },
                                  {
                                    id: "radio11",
                                    value: 3,
                                    checked: false,
                                    disabled: false,
                                    label: "택시"
                                  },
                                  {
                                    id: "radio12",
                                    value: 4,
                                    checked: false,
                                    disabled: false,
                                    label: "렌트카"
                                  },
                                  {
                                    id: "radio13",
                                    value: 5,
                                    checked: false,
                                    disabled: false,
                                    label: "운전교습용"
                                  }
                                ]}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>출고가격(원)</th>
                            <td>
                              <label htmlFor="fac-price" className="hide">
                                출고가격
                              </label>
                              <Input
                                type="text"
                                value="20,700,000"
                                id="fac-price"
                                height={40}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </fieldset>
                  </form>
                </div>
                <Button
                  className="fixed"
                  size="full"
                  background="blue80"
                  title="확인"
                  onClick={handleCarBasicInfoApply}
                />
              </MobBottomArea>
            </div>
          </MobBottomArea>

          {
            <>
              <div
                className={calPop ? `modal-bg v-2 active` : `modal-bg v-2`}
                onClick={calendarClose}
              ></div>
              <MobBottomArea active={calPop} isFixButton={true} zid={102}>
                <MobCalendar date={isDate} callback={calendarCallback} />
              </MobBottomArea>
            </>
          }

          {/* step08 : 차량옵션정보 */}
          <MobBottomArea
            active={applyCarOptions}
            isSimple={true}
            className="min"
            mode="fade"
          >
            <div className="inner bottom-write-area">
              <Button
                className="btn-select"
                size="full"
                line="gray"
                color="black"
                fontWeight="400"
                radius={true}
                title="차량 옵션정보"
                iconType="next-black"
                height={48}
                onClick={handleApplyCarOptionsInner}
              />
              <MobBottomArea
                active={applyCarOptionsInner}
                isSimple={true}
                className="min"
                mode="fade"
                isFixButton={true}
              >
                <div className="inner bottom-write-area pb0">
                  <h3 className="tit1">차량 옵션정보</h3>
                  <CarOptions
                    type={1}
                    isValue={false}
                    selectOption={true}
                    onClick={handleOptionClick}
                  />
                </div>
                <Button
                  className="fixed"
                  size="full"
                  background="blue80"
                  title="확인"
                  onClick={handleCarOptionsApply}
                />
              </MobBottomArea>
            </div>
          </MobBottomArea>

          <div
            className={dimm ? "modal-bg active" : "modal-bg"}
            onClick={handleCloseDimm}
          ></div>
          <MobBottomArea
            active={carOptionsSelect}
            isFixButton={true}
            className="min"
            mode="fade"
          >
            <div className="inner filter-list-wrap pb0">
              <p className="tit1">추가옵션</p>
              <ul className="float-wrap col2">
                <li>
                  <CheckBox
                    id="chk-optiton-1"
                    title="가솔린 24 엔진"
                    name="가솔린 24 엔진"
                  />
                  <CheckBox id="chk-optiton-2" title="패키지1" name="패키지1" />
                </li>
                <li>
                  <CheckBox id="chk-optiton-3" title="패키지2" name="패키지2" />
                  <CheckBox id="chk-optiton-4" title="패키지3" name="패키지3" />
                </li>
                <li>
                  <CheckBox id="chk-optiton-5" title="패키지4" name="패키지4" />
                  <CheckBox id="chk-optiton-6" title="패키지5" name="패키지5" />
                </li>
                <li>
                  <CheckBox id="chk-optiton-7" title="패키지6" name="패키지6" />
                  <CheckBox id="chk-optiton-8" title="패키지7" name="패키지7" />
                </li>
              </ul>
              <Button
                className="fixed"
                size="full"
                background="blue80"
                title="확인"
              />
            </div>
          </MobBottomArea>

          {/* step09 : 주행거리 */}
          <MobBottomArea active={applyDistance} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <label htmlFor="distance" className="hide">
                  주행거리
                </label>
                <Input
                  type="text"
                  placeHolder="예:13,000"
                  type="number"
                  id="distance"
                  uiType={2}
                  width={160}
                  height={32}
                  onChange={handleDistance}
                />
                <em className="input-tx">Km 입니다.</em>
                <Button
                  className="fr"
                  size="mid"
                  color="blue80"
                  title="전송"
                  onClick={handleDistanceApply}
                />
              </div>
            </div>
          </MobBottomArea>

          {/* step10 : 판금교환 여부 */}
          <MobBottomArea
            active={applyMetalExchange}
            isSimple={true}
            mode="fade"
          >
            <div className="chat">
              <Textarea
                type="tp1"
                placeHolder="차량의 판금/교환 부위를 자세히 입력해주세요."
                height={calcH1}
                mode="chat"
                onChange={handleTextareaChange1}
              />
              <Buttons>
                <span className="step-btn-l">
                  <Button
                    size="sml"
                    background="blue20"
                    color="blue80"
                    radius={true}
                    title="없습니다"
                    width={61}
                    height={30}
                    onClick={handleMetalExchangeApply("no")}
                  />
                  <Button
                    size="sml"
                    background="blue20"
                    color="blue80"
                    radius={true}
                    title="잘 몰라요"
                    width={61}
                    height={30}
                    onClick={handleMetalExchangeApply("dontknow")}
                  />
                </span>
                <span className="step-btn-r">
                  <Button
                    size="sml"
                    background="blue80"
                    radius={true}
                    title="입력"
                    width={88}
                    height={30}
                    onClick={handleMetalExchangeApply(textareaValue1)}
                  />
                </span>
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step11 : 특이사항 */}
          <MobBottomArea active={applySpecial} isSimple={true} mode="fade">
            <div className="chat">
              <Textarea
                type="tp1"
                placeHolder="차량에 관한 기타 설명 및 사고, 기타 정보를 입력해주세요."
                height={calcH2}
                mode="chat"
                onChange={handleTextareaChange2}
              />
              <Buttons>
                <span className="step-btn-l">
                  <Button
                    size="sml"
                    background="blue20"
                    color="blue80"
                    radius={true}
                    title="특이사항 없음"
                    width={85}
                    height={30}
                    onClick={handleSpecialApply(false)}
                  />
                </span>
                <span className="step-btn-r">
                  <Button
                    size="sml"
                    background="blue80"
                    radius={true}
                    title="입력"
                    width={88}
                    height={30}
                    onClick={handleSpecialApply(true)}
                  />
                </span>
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step12 : 주소입력 */}
          <MobBottomArea active={applyConsign} isSimple={true}>
            <div className="inner">
              <Buttons align="center">
                <Button
                  size="big"
                  background="blue20"
                  color="blue80"
                  radius={true}
                  title="나중에 입력"
                  width={48}
                  measure={"%"}
                  height={48}
                  onClick={handleConsignApply}
                />
                {/* <Button size="big" background="blue80" radius={true} title="주소 검색" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} href="freeStep01Filter01" onClick={handleConsignApply} /> */}
                <Button
                  size="big"
                  background="blue80"
                  radius={true}
                  title="주소 검색"
                  width={48}
                  measure={"%"}
                  height={48}
                  marginLeft={4}
                  mgMeasure={"%"}
                  onClick={handleFullpagePopup("address")}
                />
              </Buttons>
            </div>
          </MobBottomArea>

          {/* step12 : 계좌입력 */}
          <MobBottomArea active={applyAccount} isSimple={true}>
            <div className="inner bottom-write-area bank-wrap">
              <MobSelectBox
                customMode={true}
                isDimm={true}
                isSimple={true}
                height={48}
                customName={accountBank}
                isClose={isChangeBank}
              >
                <div className="inner bottom-write-area filter-list-wrap pb0">
                  <h3 className="tit2">은행선택</h3>
                  <ul className="float-wrap">
                    <li>
                      <Radio
                        className="simple checkbox"
                        id="bank-1"
                        value={1}
                        checked={isAccountNum}
                        disabled={false}
                        onChange={handleBankValue}
                        label="기업은행"
                      />
                    </li>
                    <li>
                      <Radio
                        className="simple checkbox"
                        id="bank-2"
                        value={2}
                        checked={isAccountNum}
                        disabled={false}
                        onChange={handleBankValue}
                        label="수협은행"
                      />
                    </li>
                    <li>
                      <Radio
                        className="simple checkbox"
                        id="bank-3"
                        value={3}
                        checked={isAccountNum}
                        disabled={false}
                        onChange={handleBankValue}
                        label="농협은행"
                      />
                    </li>
                    <li>
                      <Radio
                        className="simple checkbox"
                        id="bank-4"
                        value={4}
                        checked={isAccountNum}
                        disabled={false}
                        onChange={handleBankValue}
                        label="신한은행"
                      />
                    </li>
                  </ul>
                  <Button
                    className="fixed"
                    size="full"
                    background="blue80"
                    title="선택"
                    onClick={handleSelectBank}
                  />
                </div>
              </MobSelectBox>
              <label htmlFor="user-name" className="hide">
                계좌번호
              </label>
              <Input
                type="text"
                placeHolder="계좌번호 ( ' - ' 없이 숫자만 입력)"
                id="user-name"
                uiType={2}
                width={271}
                height={32}
                value={accountValue}
                onChange={handleAccountValue}
              />
              <em className="input-tx">입니다.</em>
              <div className="float-wrap">
                <p className="tx-blue80" onClick={handleAccountApply(false)}>
                  나중에 입력할게요
                </p>
                <Button
                  size="mid"
                  background="blue80"
                  radius={true}
                  title="입력"
                  width={100}
                  height={38}
                  onClick={handleAccountApply(true)}
                />
              </div>
            </div>
          </MobBottomArea>

          {/* step13 : 약관동의 */}
          <MobBottomArea active={applyTerms} isSimple={true} mode="fade">
            <MobSelectTerms
              onClick={handleTermsApply}
              onTermsClick={handleTermsPopup}
              termsData={[
                { id: "chk1", title: "무평가 이용약관 (필수)", checked: true },
                { id: "chk2", title: "무평가 환불약관 (필수)", checked: false }
              ]}
            />
          </MobBottomArea>

          {/* step14 : 차량사진등록 */}
          <MobBottomArea
            active={applyCarRegistration}
            isSimple={true}
            mode="fade"
          >
            <div className="inner bottom-write-area app-down-wrap">
              <div className="float-wrap">
                <p className="fl">등록된 사진 (0/15)</p>
                <div className="app-down fr">
                  <i className="ico-app"></i>
                  <Button color="blue80" title="오토벨앱 다운로드" href="#" />
                </div>
              </div>
              {/* <Button size="full" background="blue80" radius={true} title="차량 사진 등록" height={48} marginTop={27} href="selfStep03" /> */}
              <Button
                size="full"
                background="blue80"
                radius={true}
                title="차량 사진 등록"
                height={48}
                marginTop={27}
                onClick={handleFullpagePopup("register")}
              />
            </div>
          </MobBottomArea>

          {/* 무평가 판매 차량이 아닐 시 */}
          {/* <MobBottomArea isFix={true} isSimple={true}>
            <div className="inner">
              <Buttons align="center">
                <Button size="big" background="blue20" color="blue80" radius={true} title="다음에 진행" width={48} measure={'%'} height={48} href="freeHome" />
                <Button size="big" background="blue80" radius={true} title="방문평가로 진행" width={48} measure={'%'} height={48} marginLeft={4} mgMeasure={'%'} href="visitApply" />
              </Buttons>
            </div>
          </MobBottomArea> */}
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms1 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{freeTerm[0]}</div>
                <Button
                  className="fixed"
                  size="full"
                  background="blue80"
                  title="확인"
                  onClick={handleFpTermsClose}
                />
              </div>
            </div>
          )}
          {fpTerms2 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{freeTerm[1]}</div>
                <Button
                  className="fixed"
                  size="full"
                  background="blue80"
                  title="확인"
                  onClick={handleFpTermsClose}
                />
              </div>
            </div>
          )}
          {fpLogin && (
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin errorPw={false} callback={handleFpLoginClose} />
              </div>
            </div>
          )}
          {fpFilter && <MobFilterModel callback={filterCallback} />}
          {fpAddress && <FindAddress callback={addressCallback} />}
          {fpRegist && <MobSellRegister callback={registerCallback} />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>무평가 판매</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          {/* #a steps 항목추가 start */}
          <Steps
            type={2}
            contents={[
              "차량 정보 조회",
              "차량 정보 입력",
              "차량 사진 등록",
              "신청 내용 확인",
              "신청 완료"
            ]}
            active={1}
            mode="hasLink"
            links={["/1", "/2", "/3", "/4", "/5"]}
            onClickArr={[
              openAlertPop1,
              openAlertPop2,
              openAlertPop3,
              openAlertPop4
            ]}
          />
          {/* #a steps 항목추가 end  */}
        </div>
      </div>
      <div className="content-wrap sell-register-wrap">
        <form className="register-form">
          <fieldset>
            <legend className="away">차량 정보 조회</legend>
            <table
              summary="차량 기본 정보에 대한 내용"
              className="table-tp1 mt0"
            >
              <caption>차량 기본 정보</caption>
              <colgroup>
                <col width="13%" />
                <col width="27%" />
                <col width="13%" />
                <col width="47%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>01가1234</td>
                  <th>차량명</th>
                  <td>기아 더 뉴 K3 프레스티지</td>
                </tr>
                <tr>
                  <th>최초등록일</th>
                  <td>2017-05-07</td>
                  <th>형식년도</th>
                  <td>2018</td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>검정</td>
                  <th>연료</th>
                  <td>가솔린</td>
                </tr>
                <tr>
                  <th>배기량</th>
                  <td>1,591cc</td>
                  <th>차종</th>
                  <td>준중형차</td>
                </tr>
                <tr>
                  <th>용도</th>
                  <td>일반</td>
                  <th>출고가격</th>
                  <td>20,700,000원</td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <CarOptions title="차량 옵션" mode="view" more="false" type={2} />
        </form>
        <p className="guide-ment">
          해당 정보는 실제 정보와 상이할 수 있습니다.
          <br />
          다음 단계에서 차량정보를 수정하세요.
          <br />
          해당 차량을 판매 차량으로 신청하시겠습니까?
        </p>
        <Buttons align="center" marginTop={48}>
          <Button
            size="big"
            background="gray"
            title="취소"
            width={230}
            height={60}
            href="#"
          />
          <Button
            size="big"
            background="blue80"
            title="확인"
            width={230}
            height={60}
            href="freeStep02"
          />
        </Buttons>
      </div>

      <RodalPopup
        show={alertPop2}
        type={"fade"}
        closedHandler={closeAlertPop2}
        mode="normal"
        size="xs"
        isMask={false}
      >
        <div className="con-wrap">
          <p>
            해당 정보는 실제 정보와 상이할 수 있습니다.
            <br />
            다음 단계에서 차량정보를 수정하세요.
            <br />
            해당 차량을 판매 차량으로 신청하시겠습니까?
          </p>
          <Buttons align="center" marginTop={48}>
            <Button
              size="big"
              background="gray"
              title="취소"
              width={130}
              closedHandler={closeAlertPop2}
            />
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={130}
              href="freeStep02"
            />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default FreeStep01;
