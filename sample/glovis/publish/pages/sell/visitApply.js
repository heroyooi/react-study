import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "@src/components/layouts/AppLayout";
import MobSelectLocal from "@src/components/common/MobSelectLocal";
import MobSelectTerms from "@src/components/common/MobSelectTerms";
import MobFullpagePopup from "@src/components/common/MobFullpagePopup";
import Button from "@lib/share/items/Button";
import Buttons from "@lib/share/items/Buttons";
import CheckBox from "@lib/share/items/CheckBox";
import SelectBox from "@lib/share/items/SelectBox";
import Input from "@lib/share/items/Input";
import RodalPopup from "@lib/share/popup/RodalPopup";
import useRodal from "@lib/share/custom/useRodal";
import MobBottomArea from "@lib/share/items/MobBottomArea";
import MobSelectBox from "@lib/share/items/MobSelectBox";
import {
  SECTION_SELL,
  MOBILE_HEADER_TYPE_SUB,
  MOBILE_CONTENT_STYLE,
  MOBILE_FULLPAGE_POPUP,
  MOBILE_FULLPAGE_POPUP_CLOSE
} from "@src/actions/types";
import { select1_list } from "@src/dummy";
import { visitApplyTerm } from "@src/dummy/terms";

const VisitApply = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SECTION_SELL });
  }, []);
  const hasMobile = useSelector(state => state.common.hasMobile);
  const mFullpagePopup = useSelector(state => state.common.mFullpagePopup);

  //const [term1, setTerm1] = useState(false);
  // const [term2, setTerm2] = useState(false);
  // const [term3, setTerm3] = useState(false);
  const [
    rodalShow1,
    setRodalShow1,
    rodalPopupHandler1,
    modalCloseHandler1
  ] = useRodal(false, true);
  // const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);
  // const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false, true);
  const [
    rodalShow4,
    setRodalShow4,
    rodalPopupHandler4,
    modalCloseHandler4
  ] = useRodal(false, true);

  const handleChangeTerm1 = useCallback(e => {
    e.preventDefault();
    rodalPopupHandler1(e, "fade");
    /*
    setTerm1(prevTerm => !prevTerm);
    if (term1 === false) {
      rodalPopupHandler1(e, "fade");
    }
    */
  }, []);
  // const handleChangeTerm2 = useCallback((e) => {
  //   setTerm2(prevTerm => !prevTerm);
  //   if (term2 === false) {
  //     rodalPopupHandler2(e, "fade");
  //   }
  // }, [term2]);
  // const handleChangeTerm3 = useCallback((e) => {
  //   setTerm3(prevTerm => !prevTerm);
  //   if (term3 === false) {
  //     rodalPopupHandler3(e, "fade");
  //   }
  // }, [term3]);

  const handleChangeAgree = useCallback(e => {
    console.log(e.target);
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: "방문평가 판매",
        options: ["back", "close"]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 74,
        color: "#f6f7f8"
      }
    });

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
    const [qName, setQName] = useState(false);
    const [qMobile, setQMobile] = useState(false);
    const [qLocal, setQLocal] = useState(false);
    const [qTerms, setQTerms] = useState(false);

    // 더보기, change되는 값
    const [moreActive, setMoreActive] = useState(false);
    const [isLocalNum, setIsLocalNum] = useState(0);
    const [nameValue, setNameValue] = useState("");
    const [mobileValue, setMobileValue] = useState("");

    // 결과 값
    const [isName, setIsName] = useState("");
    const [isMobile, setIsMobile] = useState("");
    const [isLocal, setIsLocal] = useState("");
    const [isTerms, setIsTerms] = useState(false);

    // 팝업
    const [applyName, setApplyName] = useState(false);
    const [applyMobile, setApplyMobile] = useState(false);
    const [applyLocal, setApplyLocal] = useState(false);
    const [applyTerms, setApplyTerms] = useState(false);
    const [applyConfirm, setApplyConfirm] = useState(false);

    // 인풋 & 셀렉트 & 라디오 값 컨트롤
    const [selValue, setSelValue] = useState(
      mobileOptions[mobileOptions.findIndex(v => v.checked === true)].label
    );
    const [dummyLocal1, setDummyLocal1] = useState("");
    const [dummyLocal2, setDummyLocal2] = useState("");

    const handleClickMobileSel = useCallback(
      e => {
        setSelValue(mobileOptions[e - 1].label);
      },
      [selValue]
    );
    const handleNameValue = useCallback(
      e => {
        setNameValue(e.target.value);
      },
      [nameValue]
    );
    const handleMobileValue = useCallback(
      e => {
        setMobileValue(e.target.value);
      },
      [nameValue]
    );
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

    // 더보기 클릭 시, 방문지역 선택
    const handleLocalMore = useCallback(
      e => {
        e.preventDefault();
        setMoreActive(prevActive => !prevActive);
      },
      [moreActive]
    );

    const timeouts = useRef([]);
    const duration = 500;

    useEffect(() => {
      timeouts.current[0] = setTimeout(() => {
        setQGreet(true);
        timeouts.current[1] = setTimeout(() => {
          setQName(true);
          setApplyName(true);
        }, duration);
      }, duration);

      return () => {
        timeouts.current.forEach(v => {
          clearTimeout(v);
        });
      };
    }, []);

    useEffect(() => {
      if (applyName) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 88,
            color: "#f6f7f8"
          }
        });
      }
      if (applyMobile) {
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
            bottom: 233,
            color: "#f6f7f8"
          }
        });
      }
      if (applyTerms) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 272,
            color: "#f6f7f8"
          }
        });
      }
      if (applyConfirm) {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 297,
            color: "#f6f7f8"
          }
        });
      }
      setTimeout(() => {
        window.scrollTo(0, document.body.clientHeight - window.innerHeight);
      }, 10);
    }, [applyName, applyMobile, applyLocal, applyTerms, applyConfirm]);

    // 전송 클릭 시
    const handleNameApply = useCallback(
      e => {
        e.preventDefault();
        if (nameValue !== "") {
          setIsName(nameValue);
          setApplyName(false);
          timeouts.current[2] = setTimeout(() => {
            setQMobile(true);
            setApplyMobile(true);
          }, duration);
        }
      },
      [isName, nameValue]
    );
    const handleMobileApply = useCallback(
      e => {
        e.preventDefault();
        if (mobileValue !== "") {
          setIsMobile(selValue + mobileValue);
          setApplyMobile(false);
          timeouts.current[3] = setTimeout(() => {
            setQLocal(true);
            setApplyLocal(true);
          }, duration);
        }
      },
      [isMobile, selValue, mobileValue]
    );
    const handleLocalApply = useCallback(
      e => {
        e.preventDefault();
        if (isLocalNum !== 0) {
          setIsLocal(`${dummyLocal1} ${dummyLocal2}`);
          setApplyLocal(false);
          timeouts.current[4] = setTimeout(() => {
            setQTerms(true);
            setApplyTerms(true);
          }, duration);
        }
      },
      [isLocal, dummyLocal1, dummyLocal2]
    );
    const handleTermsApply = useCallback(e => {
      e.preventDefault();
      setIsTerms(true);
      timeouts.current[5] = setTimeout(() => {
        setApplyConfirm(true);
      });
    }, []);

    // 수정 클릭 시
    const handleNameModify = useCallback(() => {
      setApplyMobile(false);
      setApplyLocal(false);
      setApplyTerms(false);
      setApplyConfirm(false);
      setApplyName(true);
    }, []);
    const handleMobileModify = useCallback(() => {
      setApplyName(false);
      setApplyLocal(false);
      setApplyTerms(false);
      setApplyMobile(true);
    }, []);
    const handleLocalModify = useCallback(() => {
      setApplyName(false);
      setApplyMobile(false);
      setApplyTerms(false);
      setApplyConfirm(false);
      setApplyLocal(true);
    }, []);
    const handleTermsModify = useCallback(() => {
      setApplyName(false);
      setApplyMobile(false);
      setApplyLocal(false);
      setApplyConfirm(false);
      setApplyTerms(true);
    }, []);

    const [fpTerms, setFpTerms] = useState(false);

    const handleFullpagePopup = useCallback(name => e => {
      // e.preventDefault();
      if (name === "terms") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: "방문평가 이용약관",
            options: ["back", "close"]
          }
        });
        setFpTerms(true);
      }
      setTimeout(
        () =>
          (document.getElementsByTagName("html")[0].style.overflow = "hidden"),
        35
      );
    });
    const handleFpClose = useCallback(
      e => {
        e.preventDefault();
        setFpTerms(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      },
      [fpTerms]
    );

    return (
      <AppLayout>
        <div className="content-sec">
          <div className="chat-list-wrap">
            <div className="left">
              {qGreet && (
                <p>
                  안녕하세요. 오토벨입니다. 간편 신청을 통해 전담 차량 평가사가
                  방문하여 차량 평가에서 매각까지 도와 드립니다.
                </p>
              )}
              {qName && <p>고객님의 이름을 알려주세요.</p>}
            </div>
            {isName !== "" && (
              <div className="right">
                <p>{isName}입니다.</p>
                <span className="edit" onClick={handleNameModify}>
                  수정
                </span>
              </div>
            )}
            {qMobile && (
              <div className="left">
                <p>전화번호를 입력해주세요.</p>
              </div>
            )}
            {isMobile !== "" && (
              <div className="right">
                <p>{isMobile}입니다.</p>
                <span className="edit" onClick={handleMobileModify}>
                  수정
                </span>
              </div>
            )}
            {qLocal && (
              <div className="left">
                <p>방문지역을 선택해주세요.</p>
              </div>
            )}
            {isLocal !== "" && (
              <div className="right">
                <p>{isLocal}입니다.</p>
                <span className="edit" onClick={handleLocalModify}>
                  수정
                </span>
              </div>
            )}
            {qTerms && (
              <div className="left">
                <p>방문평가 판매를 위해서는 서비스 이용동의가 필요해요.</p>
              </div>
            )}

            {isTerms !== false && (
              <div className="right last-message">
                <p>방문평가 판매 이용에 동의합니다.</p>
                <span className="edit" onClick={handleTermsModify}>
                  수정
                </span>
              </div>
            )}
          </div>

          {/* 채팅창 로딩중 */}
          <MobBottomArea active={true} isSimple={true}>
            <div className="inner">
              <div className="loading-wrap"></div>
            </div>
          </MobBottomArea>

          {/* step01 : 이름작성 */}
          <MobBottomArea
            active={applyName}
            isSimple={true}
            mode="fade"
            className="min"
          >
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <label htmlFor="user-name" className="hide">
                  이름
                </label>
                <Input
                  type="text"
                  placeHolder="이름"
                  id="user-name"
                  uiType={2}
                  width={160}
                  height={32}
                  value={nameValue}
                  onChange={handleNameValue}
                />
                <em className="input-tx">입니다.</em>
                <Button
                  className="fr"
                  size="mid"
                  color="blue80"
                  title="전송"
                  onClick={handleNameApply}
                />
              </div>
            </div>
          </MobBottomArea>

          {/* step02 : 휴대폰번호 작성 */}
          <MobBottomArea
            active={applyMobile}
            isSimple={true}
            mode="fade"
            className="min"
          >
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <MobSelectBox
                  options={mobileOptions}
                  uiType={2}
                  width={74}
                  height={32}
                  onClick={handleClickMobileSel}
                />
                <label htmlFor="user-phone" className="hide">
                  번호
                </label>
                <Input
                  type="number"
                  placeHolder="번호"
                  id="user-phone"
                  uiType={2}
                  width={114}
                  height={32}
                  value={mobileValue}
                  onChange={handleMobileValue}
                />
                <em className="input-tx">입니다.</em>
                <Button
                  className="fr"
                  color="blue80"
                  title="전송"
                  onClick={handleMobileApply}
                />
              </div>
            </div>
          </MobBottomArea>

          {/* step03 : 방문지역 선택 */}
          <MobBottomArea
            active={applyLocal}
            isSimple={true}
            mode="fade"
            className={moreActive ? "" : "half"}
            isFixButton={true}
          >
            <MobSelectLocal
              active={moreActive}
              onMore={handleLocalMore}
              num={isLocalNum}
              onChange={handleLocalValue}
              onClick={handleLocalApply}
            />
          </MobBottomArea>

          {/* step04 : 약관동의 */}
          <MobBottomArea active={applyTerms} isSimple={true} mode="fade">
            <MobSelectTerms
              onTermsClick={handleFullpagePopup("terms")}
              onClick={handleTermsApply}
              termsData={[
                { id: "chk1", title: "방문평가 이용약관 (필수)", checked: true }
              ]}
            />
          </MobBottomArea>

          {/* step05 : 신청팝업 */}
          <MobBottomArea active={applyConfirm} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <p className="tit1">
                입력하신 내용으로
                <br />
                방문평가 판매를 신청하시겠습니까?
              </p>
              <table
                className="table-tp1"
                summary="방문평가 판매 신청에 대한 내용"
              >
                <caption className="away">방문평가 판매 신청</caption>
                <colgroup>
                  <col width="33%" />
                  <col width="67%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>김현대</td>
                  </tr>
                  <tr>
                    <th>휴대전화번호</th>
                    <td>010-2323-2323</td>
                  </tr>
                  <tr>
                    <th>고객방문 지역</th>
                    <td>서울시 강남구</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button
              size="full"
              background="blue80"
              title="확인"
              href="visitComplete"
            />
          </MobBottomArea>
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{visitApplyTerm}</div>
                <Button
                  className="fixed"
                  size="full"
                  background="blue80"
                  title="확인"
                  onClick={handleFpClose}
                />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap visit-apply-wrap">
        <div className="visit-img-sec">
          <i className="ico-sell-01"></i>
        </div>
        <div className="visit-apply-sec">
          <div className="apply-tit">
            <h3>방문평가판매</h3>
            <p>
              간편 신청을 통해 전담 차량 평가사가 방문하여 차량 평가에서
              매각까지 도와 드립니다.
            </p>
          </div>
          <form className="apply-form">
            <fieldset>
              <legend className="away">방문 신청</legend>
              <h4>방문 신청</h4>
              <ul className="register-tp1">
                <li>
                  <label htmlFor="userName">이름</label>
                  <Input type="text" placeHolder="" id="userName" />
                  <p className="tx-exp-tp4">이름을 입력해주세요</p>
                </li>
                <li>
                  <label htmlFor="user-phone">휴대 전화 번호</label>
                  <span className="bridge">
                    <SelectBox
                      id="user-phone"
                      className="items-sbox"
                      options={select1_list}
                      width={157}
                      height={48}
                    />
                  </span>
                  <Input
                    type="text"
                    placeHolder=""
                    id="user-phone2"
                    width={373}
                  />
                </li>
                <li>
                  <label htmlFor="address">
                    거주 지역 <span className="select-option">(선택항목)</span>
                  </label>
                  <span className="bridge">
                    <SelectBox
                      id="address"
                      className="items-sbox"
                      placeHolder="시/도 선택"
                      options={select1_list}
                      width={265}
                      height={48}
                    />
                  </span>
                  <SelectBox
                    id="address2"
                    className="items-sbox"
                    placeHolder="시군구 선택"
                    options={select1_list}
                    width={265}
                    height={48}
                  />
                </li>
              </ul>
            </fieldset>
            <div className="register-agree mt40">
              <CheckBox
                id="chk-useGuide"
                title="방문평가 이용약관 (필수)"
                termPop={true}
                onChange={handleChangeAgree}
                termPopHandle={handleChangeTerm1}
              />

              {/* <CheckBox id='chk-collect' title='개인정보 수집 및 이용에 대한 동의' isSelf={false} checked={term1} onChange={handleChangeTerm1} />
              <CheckBox id='chk-provide' title='제 3자 정보 제공 동의' isSelf={false} checked={term2} onChange={handleChangeTerm2} />
              <CheckBox id='chk-marketing' title='마케팅 활동 동의' sub='(선택)' isSelf={false} checked={term3} onChange={handleChangeTerm3} /> */}
            </div>
          </form>
          <Buttons align="center" marginTop={30}>
            <Button
              size="big"
              background="blue80"
              title="신청하기"
              width={245}
              height={60}
              onClick={e => rodalPopupHandler4(e, "fade")}
            />
          </Buttons>
        </div>
      </div>
      <RodalPopup
        show={rodalShow1}
        type={"fade"}
        closedHandler={modalCloseHandler1}
        title="방문평가 이용약관 (필수)"
        mode="normal"
        size="medium"
      >
        <div className="con-wrap">약관내용</div>
      </RodalPopup>
      {/*       
      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="제 3자 정보 제공 동의(필수)" mode="normal" size="medium">
        <div className="con-wrap">

        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} title="마케팅 활동 동의(선택)" mode="normal" size="medium">
        <div className="con-wrap">

        </div>
      </RodalPopup> */}
      <RodalPopup
        show={rodalShow4}
        type={"fade"}
        closedHandler={modalCloseHandler4}
        mode="normal"
        size="xs"
      >
        <div className="con-wrap">
          <p className="mb33">
            입력하신 내용으로 방문평가 판매를 신청하시겠습니까?
          </p>
          <table summary="방문평가 신청에 대한 내용" className="table-tp1">
            <caption className="away">방문평가</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>김현대</td>
              </tr>
              <tr>
                <th>휴대전화번호</th>
                <td>010-2873-7263</td>
              </tr>
              <tr>
                <th>거주지역</th>
                <td>서울시 강남구</td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={40}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default VisitApply;
