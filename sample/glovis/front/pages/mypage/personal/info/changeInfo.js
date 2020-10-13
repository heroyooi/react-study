/**
 * 설명 : 회원정보수정
 * @fileoverview 마이페이지(개인)>회원정보관리>회원정보 수정
 * @requires {memberMngAction}
 * @author D191364
 *
 */
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRodal from '@lib/share/custom/useRodal';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import { MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_HEADER_TYPE_SUB, MOBILE_QUICK_EXIST, SECTION_MYPAGE } from '@src/actions/types';
//mobile
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MypageNavi from '@src/components/common/MypageNavi';
import FindAddress from '@src/components/common/popup/FindAddress';
import AppLayout from '@src/components/layouts/AppLayout';
import ConfirmPassWd from '@src/components/member/ConfirmPassWd';
import MemberBaseInfo from '@src/components/member/MemberBaseInfo';
import MemberTms from '@src/components/member/MemberTms';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { chkEmlAddr, chkTmsAgrNAgrObj, getTmsObj } from '@src/utils/MemberUtil';

const ChangeInfo = (response) => {
  const dispatch = useDispatch();
  const { showAlert } = useContext(SystemContext);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const { memberInfoPwd } = useSelector((state) => ({
    memberInfoPwd: state.memberMng.memberInfoPwd
  }));

  const [fpAddress, setFpAddress] = useState(false);
  const [fpTerms, setFpTerms] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [rodalAlertMsg, setRodalAlertMsg] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [rodalShowAlert, setRodalShowAlert, rodalPopupHandlerAlert, modalCloseHandlerAlert] = useRodal(false, false);

  const [sendData, setSendData] = useState([]);
  const [chkPopup, setChkPopup, openChkPopup, closeChkPopup] = useRodal(false, false);

  const [inputs, setInputs] = useState({
    mbEmlAddrEnc: '',
    mbZcd: '',
    mbAddrEnc: '',
    mbDtlAddrEnc: ''
  });

  const [msgs, setMsgs] = useState({
    altMsg: '',
    chkEmlMsg: ''
  });

  const tmsListT = getTmsObj(response.data.data, memberInfoPwd ? Object(memberInfoPwd.cnsnYn === 'Y' ? '0830' : '') : '');
  const signupCheckList = tmsListT[0];
  // const auctionCheckTerm = tmsListT[1];

  const [memberTmsInfoCont, setMemberTmsInfoCont] = useState('');

  const onChange = (e) => {
    if (e.target) {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      setInputs(
        produce((draft) => {
          draft[name] = value;
        })
      );
    } else {
      for (const [key, value] of Object.entries(e)) {
        setInputs(
          produce((draft) => {
            draft[key] = value;
          })
        );
      }
    }
  };

  //약관
  let checkArr = [];
  const onTermCheck = (e, val) => {
    if (e.target.checked) {
      checkArr = val;
    } else {
      checkArr = '';
    }
  };

  //validation
  const chkValidation = useCallback(() => {
    const rtnEmlMsg = chkEmlAddr(inputs.mbEmlAddrEnc);
    if (!isEmpty(rtnEmlMsg)) {
      setMsgs({ ...msgs, chkEmlMsg: rtnEmlMsg });
      return false;
    }
    return true;
  }, [inputs.mbEmlAddrEnc]);

  //수정
  const handleSave = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if (chkValidation(e)) {
        const chkTmsAgrNAgrList = chkTmsAgrNAgrObj(signupCheckList, checkArr);
        const agrObj = chkTmsAgrNAgrList[0];
        const agrNObj = chkTmsAgrNAgrList[1];

        const paramObj = {
          ...inputs,
          agrList: agrObj,
          agrNList: agrNObj
        };
        console.log('::: paramObj', paramObj);
        const formData = new FormData();
        for (const key in paramObj) {
          formData.append(key, paramObj[key]);
        }
        // dispatch(saveMyMemberInfo(formData));
        // alert('회원정보가 정상적으로 수정되었습니다');
        // Router.push('/mypage/personal/personalMain').then(() => {
        //   window.scrollTo(0, 0);
        // });
        axiosPost(`/api/member/updateMemberInfo.do`, paramObj).then((payload) => {
          console.log('::: payload', payload);
          if (payload.data.data > 0) {
            showAlert('회원정보가 정상적으로 수정되었습니다', () => {
              window.location.href = '/mypage/personal/personalMain';
            });
            // const url = '/mypage/dealer/sellcar/carManagement';
            // Router.push({ pathname: url, query: {} }, url).then(() => {
            //   window.scrollTo(0, 0);
            // });
          } else {
            showAlert(`수정에 실패했습니다.` + payload.data.returncd);
          }
        });
      }
    },
    [checkArr, chkValidation, inputs, showAlert, signupCheckList]
  );

  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShowAlert(false);
  }, []);

  //Mobile
  const handleFullpagePopup = useCallback((name, e, cont = null) => {
    e.preventDefault();
    if (name === 'address') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '주소검색',
          options: ['close']
        }
      });
      setFpTerms(false);
      setFpAddress(true);
    } else if (name === 'terms') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '마케팅 활용 동의',
          options: ['close']
        }
      });
      setFpAddress(false);
      setFpTerms(true);
      setMemberTmsInfoCont(cont);
    }
  }, []);

  const handleFpTermsClose = useCallback(
    (e) => {
      e.preventDefault();
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [fpTerms]
  );

  const addressCallback = useCallback(
    (e, result, target) => {
      e.preventDefault();
      setFpAddress(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      setSendData([result, target]);
    },
    [fpAddress]
  );

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '회원정보 수정',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#fff'
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
  }, [dispatch, hasMobile]);

  useEffect(() => {
    if (!isEmpty(memberInfoPwd)) {
      setInputs(
        produce((draft) => {
          const params = Object.getOwnPropertyNames(inputs);
          params.forEach((inputs) => {
            draft[inputs] = memberInfoPwd[inputs];
          });
        })
      );
    }
  }, [memberInfoPwd]);

  /*
  useEffect(() => {
      if(saveRtn === 1) {
        alert("회원정보가 정상적으로 수정되었습니다")
        Router.push('/main').then(() => {
          window.scrollTo(0, 0);
        });
      } else if (saveRtn === 0) {
        alert("잘못된 정보입니다")
        Router.push('/main').then(() => {
          window.scrollTo(0, 0);
        });
      }
  }, [saveRtn])
  */

  if (hasMobile) {
    return (
      <AppLayout>
        {isEmpty(memberInfoPwd) && (
          <div className="content-wrap">
            <ConfirmPassWd />
          </div>
        )}

        {!isEmpty(memberInfoPwd) && (
          <div className="content-wrap">
            <div className="mypage-admin-title mt20">
              <p className="tx-exp-tp5">&#8251; 보다 다양한 서비스를 받으시려면 정확한 정보를 항상 유지해 주셔야 합니다.</p>
              <p className="tx-exp-tp5">&#8251; 타인의 개인정보를 도용한 피해방지 및 회원님의 개인정보보호를 위해 본인확인 과정을 실시하고 있습니다.</p>
            </div>

            {/* 개인회원 */}
            <MemberBaseInfo
              memberInfoPwd={memberInfoPwd}
              onChange={onChange}
              msgObj={msgs}
              sendData={sendData}
              handleFullpage={(e) => {
                handleFullpagePopup('address', e);
              }}
            />

            {/* 회원 약관 */}
            <MemberTms
              memberInfoPwd={memberInfoPwd}
              memberTmsInfo={response.data.data}
              onChange={onTermCheck}
              handleFullpage={(e, cont) => {
                handleFullpagePopup('terms', e, cont);
              }}
            />

            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="취소" href="/mypage/personal/personalMain" />
              <Button size="big" background="blue80" title="변경" onClick={handleSave} />
            </Buttons>
          </div>
        )}

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpAddress && <FindAddress AddressEvent={addressCallback} />}
          {fpTerms && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{memberTmsInfoCont}</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />
        {isEmpty(memberInfoPwd) && <ConfirmPassWd />}

        {!isEmpty(memberInfoPwd) && (
          <div className="mypage-state-sec general-buy-sec">
            <div className="mypage-admin-title">
              <h3>회원정보 수정</h3>
              <p className="tx-exp-tp5">&#8251; 보다 다양한 서비스를 받으시려면 정확한 정보를 항상 유지해 주셔야 합니다.</p>
              <p className="tx-exp-tp5">&#8251; 타인의 개인정보를 도용한 피해방지 및 회원님의 개인정보보호를 위해 본인확인 과정을 실시하고 있습니다.</p>
              <p className="tx-exp-tp5">&#8251; 이름을 개명하신 경우에는 별도의 본인인증을 거친 후 변경이 가능합니다.</p>
            </div>

            {/* 개인회원 */}
            <MemberBaseInfo memberInfoPwd={memberInfoPwd} onChange={onChange} msgObj={msgs} />

            {/* 회원 약관 */}
            <MemberTms memberInfoPwd={memberInfoPwd} memberTmsInfo={response.data.data} onChange={onTermCheck} />

            <Buttons align="center" marginTop={49}>
              <Button size="big" background="gray" title="취소" width={248} height={60} href="/mypage/personal/personalMain" />
              <Button size="big" background="blue80" title="확인" width={248} height={60} onClick={handleSave} buttonMarkup={true} />
            </Buttons>
          </div>
        )}

        <RodalPopup show={rodalShowAlert} type={'fade'} width={375} closedHandler={modalCloseHandlerAlert} mode="normal" isMask={false} isButton={false}>
          <div className="con-wrap compact">
            <p>{rodalAlertMsg}</p>
            <Buttons align="center" marginTop={30}>
              <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
            </Buttons>
          </div>
        </RodalPopup>
      </div>
    </AppLayout>
  );
};

ChangeInfo.getInitialProps = async () => {
  //약관 불러 오기
  const url = `/api/member/selectTmsList.do?tpcd=0020&tmsDiv=0830`;
  const res = await axiosGet(url, null, false);

  return {
    data: res.data
  };
};

export default ChangeInfo;
