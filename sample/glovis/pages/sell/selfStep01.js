import moment from "moment";
import { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MobLogin from "@src/components/common/MobLogin";
import MobSelectLocal from "@src/components/common/MobSelectLocal";
import MobSelectTerms from "@src/components/common/MobSelectTerms";
import MobFullpagePopup from "@src/components/common/MobFullpagePopup";
import MobFilterModel from "@src/components/common/MobFilterModel";
import MobSellRegister from "@src/components/common/MobSellRegister";
import Button from "@lib/share/items/Button";
import Buttons from "@lib/share/items/Buttons";
import Input from "@lib/share/items/Input";
import CheckBox from "@lib/share/items/CheckBox";
import Textarea from "@lib/share/items/Textarea";
import RodalPopup from "@lib/share/popup/RodalPopup";
import useRodal from "@lib/share/custom/useRodal";
import Steps from "@lib/share/items/Steps";
import AppLayout from "@src/components/layouts/AppLayout";
import CarOptions from "@src/components/common/CarOptions";
import CarAddOption from "@src/components/common/CarAddOption";
import CheckColors from "@src/components/common/CheckColors";
import DatePicker from "@src/components/common/calendar/DatePicker";
import MobBottomArea from "@lib/share/items/MobBottomArea";
import MobSelectBox from "@lib/share/items/MobSelectBox";
import MobCalendar from "@lib/share/items/MobCalendar";
import LoginPopup from "@src/components/common/popup/Login";
import {
  SECTION_SELL,
  MOBILE_HEADER_TYPE_SUB,
  MOBILE_CONTENT_STYLE,
  MOBILE_FULLPAGE_POPUP,
  MOBILE_FULLPAGE_POPUP_CLOSE
} from "@src/actions/types";
import { numberFormat, transformText, objIsEmpty } from "@src/utils/CommonUtil";
import {
  getTermDummy,
  getLocationDummy,
  getLocationCityDummy
} from "@src/dummy/visitApplyHyundaiDummy";
import { selfTerm } from "@src/dummy/terms";

const SelfStep01 = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SECTION_SELL });
  }, []);
  const hasMobile = useSelector(state => state.common.hasMobile);
  const mFullpagePopup = useSelector(state => state.common.mFullpagePopup);

  const now = moment();

  const [
    rodalShow1,
    setRodalShow1,
    rodalPopupHandler1,
    modalCloseHandler1
  ] = useRodal(false, true);

  // 옵션 더보기
  const [carOptionMore3, setCarOptionMore3] = useState(false);
  const handleCarOption3 = e => {
    e.preventDefault();
    setCarOptionMore3(!carOptionMore3);
  };
  // alert 팝업
  const [alertPop1, setAlertPop1, openAlertPop1, closeAlertPop1] = useRodal(
    false
  );
  const [alertPop2, setAlertPop2, openAlertPop2, closeAlertPop2] = useRodal(
    false
  );
  const [alertPop3, setAlertPop3, openAlertPop3, closeAlertPop3] = useRodal(
    false
  );
  const [alertPop4, setAlertPop4, openAlertPop4, closeAlertPop4] = useRodal(
    false
  );
  const [alertPop5, setAlertPop5, openAlertPop5, closeAlertPop5] = useRodal(
    false
  );

  useEffect(() => {
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: "셀프등록 판매",
          options: ["back", "close"]
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: "#f6f7f8"
        }
      });
    }
  }, []);

  if (hasMobile) {
    // 모바일 팝업
    const [savePop, setSavePop, openSavePop, closeDimmSavePop] = useRodal(
      false
    );
    const closeSavePop = useCallback(e => {
      e.preventDefault();
      setSavePop(false);
    }, []);

    const mobileOptions = [
      {
        id: "radio_phone_1",
        value: 1,
        checked: true,
        disabled: false,
        label: "010"
      },
      {
        id: "radio_phone_2",
        value: 2,
        checked: false,
        disabled: false,
        label: "011"
      },
      {
        id: "radio_phone_3",
        value: 3,
        checked: false,
        disabled: false,
        label: "012"
      },
      {
        id: "radio_phone_4",
        value: 4,
        checked: false,
        disabled: false,
        label: "013"
      },
      {
        id: "radio_phone_5",
        value: 5,
        checked: false,
        disabled: false,
        label: "014"
      },
      {
        id: "radio_phone_6",
        value: 6,
        checked: false,
        disabled: false,
        label: "015"
      },
      {
        id: "radio_phone_7",
        value: 7,
        checked: false,
        disabled: false,
        label: "016"
      },
      {
        id: "radio_phone_8",
        value: 8,
        checked: false,
        disabled: false,
        label: "017"
      },
      {
        id: "radio_phone_9",
        value: 9,
        checked: false,
        disabled: false,
        label: "018"
      },
      {
        id: "radio_phone_10",
        value: 10,
        checked: false,
        disabled: false,
        label: "019"
      }
    ];

    // 질문
    const [qGreet, setQGreet] = useState(false);
    const [qOwner, setQOwner] = useState(false);
    const [qAutobellMember, setQAutobellMember] = useState(false);
    const [qSellCarConfirm, setQSellCarConfirm] = useState(false);
    const [qCarSearch, setQCarSearch] = useState(false);
    const [qCarBasicInfo, setQCarBasicInfo] = useState(false);
    const [qCarOptions, setQCarOptions] = useState(false);
    const [qDistance, setQDistance] = useState(false);
    const [qMetalExchange, setQMetalExchange] = useState(false);
    const [qSpecial, setQSpecial] = useState(false);
    const [qLocal, setQLocal] = useState(false);
    const [qTerms, setQTerms] = useState(false);
    const [qCarRegist, setQCarRegist] = useState(false);

    // 더보기, change되는 값
    const [moreActive, setMoreActive] = useState(false);
    const [isLocalNum, setIsLocalNum] = useState(0);

    // 결과 값
    const [isOwner, setIsOwner] = useState(false);
    const [isMemberType, setIsMemberType] = useState(null);
    const [isSellCar, setIsSellCar] = useState(null);
    const [isCarBasicInfo, setIsCarBasicInfo] = useState(false);
    const [isCarOptions, setIsCarOptions] = useState(false);
    const [isDistance, setIsDistance] = useState("");
    const [isMetalExchange, setIsMetalExchange] = useState("");
    const [isSpecial, setIsSpecial] = useState("");
    const [isLocal, setIsLocal] = useState(null);
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
    const [applyLocal, setApplyLocal] = useState(false);
    const [applyTerms, setApplyTerms] = useState(false);
    const [applyCarRegistration, setApplyCarRegistration] = useState(false);

    // 풀페이지 팝업
    const [fpTerms, setFpTerms] = useState(false);
    const [fpLogin, setFpLogin] = useState(false);
    const [fpFilter, setFpFilter] = useState(false);
    const [fpRegist, setFpRegist] = useState(false);
    const [termCont, setTermCont] = useState("");

    const [selValue, setSelValue] = useState(
      mobileOptions[mobileOptions.findIndex(v => v.checked === true)].label
    );
    const [locationList, setLocationList] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState({
      value: "",
      label: "",
      citys: []
    });
    const [selectedCity, setSeletedCity] = useState({});

    // 인풋, 텍스트에리어 값 컨트롤
    const [distanceValue, setDistanceValue] = useState("");
    const [textareaValue1, setTextareaValue1] = useState("");
    const [textareaValue2, setTextareaValue2] = useState("");
    const [dummyLocal1, setDummyLocal1] = useState("");
    const [dummyLocal2, setDummyLocal2] = useState("");
    const [calcH, setCalcH] = useState(60);
    const handleLocalValue = useCallback(
      e => {
        e.preventDefault();
        const { value } = e.target;
        if (+value >= 1 && +value <= 25) {
          setDummyLocal1("서울특별시");
        } else if (+value > 25 && +value <= 50) {
          setDummyLocal1("부산광역시");
        } else if (+value > 50 && +value <= 75) {
          setDummyLocal1("대구광역시");
        } else if (+value > 76 && +value <= 100) {
          setDummyLocal1("인천광역시");
        }
        setDummyLocal2(e.currentTarget.dataset.label);
        setIsLocalNum(+value);
      },
      [isLocalNum]
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
        setCalcH(targetH <= 60 ? targetH + 40 : 100);
        setTextareaValue1(e.target.value);
      },
      [textareaValue1]
    );
    const handleTextareaChange2 = useCallback(
      e => {
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
    const handleLocalMore = useCallback(
      e => {
        e.preventDefault();
        setMoreActive(prevActive => !prevActive);
      },
      [moreActive]
    );
    const onHandleChangedCity = useCallback(e => {
      setSeletedCity(e);
    }, []);
    const onHandleChangedLocationList = useCallback(
      e => {
        if (e.citys.length === 0) {
          if (process.env.systemEnv === "publisher") {
            const data = getLocationCityDummy.data;

            data.forEach(item => {
              item.value = item.ctyCd;
              item.label = item.ctyNm;
            });
            e.citys = data;
            setSelectedLocation(e);
            setLocationList(locationList);
          } else {
            axiosGet(`/api/pricing/getLocationCity.do?locCd=${e.value}`).then(
              res => {
                const data = res.data.data;

                data.forEach(item => {
                  item.value = item.ctyCd;
                  item.label = item.ctyNm;
                });
                e.citys = data;
                setSelectedLocation(e);
                setLocationList(locationList);
              }
            );
          }
        } else {
          setSelectedLocation(e);
        }
      },
      [locationList]
    );

    useEffect(() => {
      if (process.env.systemEnv === "publisher") {
        setTermCont(getTermDummy.data);

        const data = getLocationDummy.data;

        data.forEach(item => {
          item.value = item.locCd;
          item.label = item.locNm;
          item.citys = [];
        });
        setLocationList(data);
      } else {
        axiosGet(
          "/InfoPolicy/selectInfoPolicy.do?tmsId=AA000010&tmsTp=0010"
        ).then(res => {
          setTermCont(res.data.data);
        });

        axiosGet(`/api/pricing/getLocation.do`).then(res => {
          const data = res.data.data;

          data.forEach(item => {
            item.value = item.locCd;
            item.label = item.locNm;
            item.citys = [];
          });
          setLocationList(data);
        });
      }
    }, []);

    const timeouts = useRef([]);
    const duration = 500;

    useEffect(() => {
      timeouts.current[0] = setTimeout(() => {
        setQGreet(true);
        timeouts.current[1] = setTimeout(() => {
          setQOwner(true);
          setApplyOwner(true);
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
            bottom: 88,
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
      if (applyCarBasicInfoInner) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyCarOptions) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyCarOptionsInner) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
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
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applySpecial) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyLocal) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyTerms) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
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
      applyLocal,
      applyTerms,
      applyCarRegistration
    ]);

    // 전송 클릭 시
    const handleOwnerApply = useCallback(e => {
      e.preventDefault();
      setIsOwner(true);
      setApplyOwner(false);
      setApplyCarInfo(false);
      timeouts.current[2] = setTimeout(() => {
        setQAutobellMember(true);
        setApplyAutobellMember(true);
      }, duration);
    }, []);
    const handleMemberApply = useCallback(
      type => e => {
        e.preventDefault();
        setIsMemberType(type);
        setApplyAutobellMember(false);
        timeouts.current[3] = setTimeout(() => {
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
          timeouts.current[4] = setTimeout(() => {
            setQCarBasicInfo(true);
            setApplyCarBasicInfo(true);
          }, duration);
        } else {
          setQCarSearch(true);
          timeouts.current[4] = setTimeout(() => {
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
      timeouts.current[5] = setTimeout(() => {
        setQCarOptions(true);
        setApplyCarOptions(true);
      }, duration);
    }, []);
    const handleCarOptionsApply = useCallback(e => {
      e.preventDefault();
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setIsCarOptions(true);
      timeouts.current[6] = setTimeout(() => {
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
        timeouts.current[7] = setTimeout(() => {
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
        timeouts.current[8] = setTimeout(() => {
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
        timeouts.current[9] = setTimeout(() => {
          setQLocal(true);
          setApplyLocal(true);
        }, duration);
      },
      [textareaValue2]
    );
    const handleLocalApply = useCallback(
      e => {
        e.preventDefault();
        const location =
          selectedLocation && selectedLocation.label
            ? selectedLocation.label
            : "";
        const city =
          selectedCity && selectedCity.label ? selectedCity.label : "";

        if (!objIsEmpty(location) && !objIsEmpty(city)) {
          setIsLocal(`${location} ${city}`);
          setApplyLocal(false);
          timeouts.current[4] = setTimeout(() => {
            setQTerms(true);
            setApplyTerms(true);
          }, duration);
        }
      },
      [selectedCity, selectedLocation]
    );
    const handleTermsApply = useCallback(e => {
      e.preventDefault();
      setIsTerms(true);
      setApplyTerms(false);
      timeouts.current[11] = setTimeout(() => {
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
      setApplyCarBasicInfoInner(false);
      setApplyCarOptions(false);
      setApplyCarOptionsInner(false);
      setApplyDistance(false);
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyLocal(false);
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
      setApplyLocal(false);
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
      setApplyLocal(false);
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
      setApplyLocal(false);
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
      setApplyLocal(false);
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
      setApplyLocal(false);
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
      setApplyLocal(false);
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
      setApplyLocal(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplySpecial(true);
    }, []);

    const handleLocalModify = useCallback(() => {
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
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyTerms(false);
      setApplyCarRegistration(false);
      setApplyLocal(true);
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
      setApplyMetalExchange(false);
      setApplySpecial(false);
      setApplyCarRegistration(false);
      setApplyLocal(false);
      setApplyTerms(true);
    }, []);

    const handleFullpagePopup = useCallback(name => e => {
      e.preventDefault();
      if (name === "terms") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: "셀프평가 이용약관",
            options: ["back", "close"]
          }
        });
        setFpLogin(false);
        setFpRegist(false);
        setFpFilter(false);
        setFpTerms(true);
      } else if (name === "login") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: "로그인",
            options: ["close"]
          }
        });
        setFpTerms(false);
        setFpRegist(false);
        setFpFilter(false);
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
        setFpTerms(false);
        setFpRegist(false);
        setFpLogin(false);
        setFpFilter(true);
      } else if (name === "register") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: "차량사진 등록",
            options: ["close"]
          }
        });
        setFpLogin(false);
        setFpTerms(false);
        setFpFilter(false);
        setFpRegist(true);
      }
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    });
    const handleFpTermsClose = useCallback(
      e => {
        e.preventDefault();
        setFpTerms(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      },
      [fpTerms]
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

    // 차량검색 - 제조사·모델·등급 선택
    const filterCallback = useCallback(e => {
      e.preventDefault();
      setApplyCarSearch(false);
      setFpFilter(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      handleSellCarApply(true)(e);
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, []);
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
                  안녕하세요. 오토벨입니다. 모바일로 직접 차량을 평가하여 24시간
                  실시간 경쟁 입찰을 통해 최고가로 판매하는 서비스입니다.
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
            {qLocal && (
              <div className="left">
                <p>방문지역을 선택해주세요.</p>
              </div>
            )}
            {!objIsEmpty(isLocal) && (
              <div className="right">
                <p>{`${isLocal}`}입니다.</p>
                <span className="edit" onClick={handleLocalModify}>
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
                <div className="inner bottom-write-area">
                  <CarOptions type={1} mode="check" isValue={false} />
                  <CarAddOption onClick={handleOptionClick} />
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
                height={calcH}
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
                    background={
                      textareaValue1.trim() !== "" ? "blue80" : "gray60"
                    }
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
                height={calcH}
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
                    background={
                      textareaValue2.trim() !== "" ? "blue80" : "gray60"
                    }
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

          {/* step12 : 방문지역 선택 */}
          <MobBottomArea
            active={applyLocal}
            isSimple={true}
            mode="fade"
            className={moreActive ? "" : "half"}
            isFixButton={true}
          >
            <MobSelectLocal
              active={moreActive}
              dataContext={locationList}
              selectedValue={selectedCity ? selectedCity.value : -1}
              onMore={handleLocalMore}
              onChange={onHandleChangedCity}
              onClick={handleLocalApply}
              onMenuClick={onHandleChangedLocationList}
            />
          </MobBottomArea>

          {/* step13 : 약관동의 */}
          <MobBottomArea active={applyTerms} isSimple={true} mode="fade">
            <MobSelectTerms
              onTermsClick={handleFullpagePopup("terms")}
              onClick={handleTermsApply}
              termsData={[
                { id: "chk1", title: "셀프평가 이용약관 (필수)", checked: true }
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
              <Button
                size="full"
                background="blue80"
                radius={true}
                title="차량 사진 등록"
                height={48}
                marginTop={27}
                href="selfStep03"
                onClick={handleFullpagePopup("register")}
              />
            </div>
          </MobBottomArea>
        </div>

        {/* <Button size="mid" background="blue80" radius={true} title="Popup" width={160} onClick={(e) => openMpop(e, "fade")} /> */}

        <RodalPopup
          show={savePop}
          type={"fade"}
          width={380}
          closedHandler={closeDimmSavePop}
          isMask={true}
          isButton={false}
          subPop={false}
        >
          <div className="con-wrap">
            <p className="tit1">정말 나가시겠습니까?</p>
            <p>작성한 내용은 임시저장 됩니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button
                fontSize={14}
                title="취소"
                color="blue80"
                onClick={closeSavePop}
              />
              <Button
                fontSize={14}
                title="확인"
                color="blue80"
                marginLeft={16}
                fontWeight="bold"
              />
            </Buttons>
          </div>
        </RodalPopup>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{selfTerm}</div>
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
                <MobLogin
                  mode="popup"
                  errorPw={false}
                  noMemArea={false}
                  callback={handleFpLoginClose}
                />
              </div>
            </div>
          )}
          {fpFilter && <MobFilterModel callback={filterCallback} />}
          {fpRegist && <MobSellRegister callback={registerCallback} />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>셀프 등록 판매</h3>
        <p>
          모바일로 직접 차량을 평가하여 24시간 실시간 경쟁 입찰을 통해 최고가로
          판매하는 서비스입니다.
        </p>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
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
              openAlertPop4,
              openAlertPop5
            ]}
          />
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
                  <th>차량 번호</th>
                  <td>01가1234</td>
                  <th>차량명</th>
                  <td>
                    <span className="car-name">
                      기아 K3 쿱 1.6 터보 GDI 프레스티지
                      <span>K3 2DR 1.6T / GDI 프레스티지 M/T</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>최초 등록일</th>
                  <td>2017-05-07</td>
                  <th>형식 년도</th>
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
                  <th>출고 가격</th>
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
            href="selfStep02"
            onClick={e => rodalPopupHandler1(e, "fade")}
          />
        </Buttons>
      </div>

      <RodalPopup
        show={rodalShow1}
        type={"slideUp"}
        closedHandler={modalCloseHandler1}
        mode="normal"
        size="small"
        title="로그인"
      >
        <LoginPopup />
      </RodalPopup>

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
              href="selfStep02"
            />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default SelfStep01;
