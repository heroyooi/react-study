import React, { memo, useContext, useEffect, useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import moment from 'moment';

import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Radio from '@lib/share/items/Radio';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { insertJoinGroup } from '@src/api/mypage/dealer/dealerProdApi';
import { SystemContext } from '@src/provider/SystemProvider';
import { preventScroll } from '@src/utils/CommonUtil';

const listClass = ['state-green', 'state-red', 'state-yellow', 'state-blue'];

const filterList = [
  { title: '정상판매중', className: 'state-green', code: '0010' },
  { title: '관리필요', className: 'state-red', code: '0020' },
  { title: '판단보류', className: 'state-yellow', code: '0030' },
  { title: '대기차량', className: 'state-blue', code: '0050' }
];

// mainItmCd: "0020"
// mainItmCdNm: "셀프평가 이용제한 (7일)"
// mbHpPnEnc: "010-****-****"
// mbId: "DDDDDD1"
// mbIdVdi: "DDDD********"
// mbNm: "T***1"
// mbTpcd: "0020"
// mbTpcdNm: "개인딜러"
// no: 1
// regDt: "2019-12-17"
// restrictCd: "0010"
// restrictCdNm: "7일 제한"
// useRestrictDivCd: "0010"
// useRuleStrtDt: "2020-05-25"

const ProdFilterTab = memo(({ active, isRestrained = false, items = [], isMobile, memberInfo = {}, eventHandler }) => {
  console.log("ProdFilterTab -> isRestrained", isRestrained)
  
  const { showAlert, showConfirm } = useContext(SystemContext);
  const {
    useRestrictDivCd,
    useRestrictRns,
    useRuleStartDt,
    useRuleEndDt,
    periodDt,
    memo,
    mbTpcd,
    mbJoinDvcd,
    aprvSttCd,
    seqNo = 0,
    siMbId,
  } = memberInfo;
  console.log("ProdFilterTab -> memberInfo", memberInfo)

  const [showPopCtx, setShowPopCtx] = useState(isRestrained);

  const [cookies, setCookie] = useCookies();
  const [noGroupIdPop, setNoGroupIdPop, openNoGroupIdPop, closeNoGroupIdPop] = useRodal(false, true);
  const [memberType, setMemberType] = useState('0030');
  const [showGroupPopCtx, setShowGroupPopCtx] = useState(
    mbTpcd === '0020' && //개인딜러면서
    mbJoinDvcd === '0020' && //대표딜러면서 경우
    !aprvSttCd && //제휴&단체 가입신청상태가 아닌 경우
    seqNo === 0 //가입중이 아닐 경우
  );

  const [oneDayLook, setOneDayLook] = useState(false);
  const [neverLook, setNeverLook] = useState(false);

  const handleClick = (sttDvcd) => {
    eventHandler({
      sttDvcd,
      watingSortType: null,
      currentPage: 1,
      crMnfcCd: null,
      crMdlCd: null,
      startDt: null,
      endDt: null
    });
  };

  const closePop = (e) => {
    e.preventDefault();
    setShowPopCtx(false);
  };

  const setCookieAndClose = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setShowGroupPopCtx(false);
    if (neverLook || oneDayLook) {
      const today = new Date();
      neverLook ? today.setDate(today.getDate() + 3650) : today.setDate(today.getDate() + 1);
      setCookie('nolook', true, {
        expires: today
      });
    }
  };

  const handleMember = (e) => {
    const { value, checked } = e.target;

    if (value === 'oneday') {
      setOneDayLook(checked);
    } else if (value === 'never') {
      if (checked) {
        showConfirm(
          '<p>다시 보지 않기를 클릭 시 <br/>단체회원/제휴법인 회원 ID를 발급 받으실 수 없습니다. <br/> 그래도 진행하시겠습니까?</p>',
          () => {
            setNeverLook(true);
          },
          () => {
            setNeverLook(false);
          }
        );
      } else {
        setNeverLook(false);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    showConfirm('신청하시겠습니까?', async () => {
      const { data, statusinfo } = await insertJoinGroup({ mbTpcd: memberType }).then((res) => res?.data);
      console.log('onSubmit -> data', data);
      console.log('onSubmit -> statusinfo', statusinfo);
  
      if (statusinfo.returncd === '000') {
        showAlert('신청되었습니다');
        setShowGroupPopCtx(false);
      } else {
        if (data === 0) {
          showAlert('이미 신청중입니다');
        } else {
          showAlert('실패했습니다');
        }
      }
      setNoGroupIdPop(false);
    })
  };

  useEffect(() => {
    setShowPopCtx(isRestrained)
  }, [ isRestrained ]);

  useEffect(() => {
    if (cookies.nolook) {
      setShowGroupPopCtx(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [todayCheck, setTodayCheck] = useState(false);
  const [mPopDimm, setMPopDimm] = useState(false);
  const [mPopActive, setMPopActive] = useState(false);
  const [mPop, setMPop] = useRodal(false);

  const handleOpenPop = useCallback((e) => {
    e.preventDefault();
    setMPopActive(true);
    setMPopDimm(true);
    preventScroll(true);
  }, []);

  const handleCloseDimm = useCallback(() => {
    setMPopActive(false);
    setMPopDimm(false);
    preventScroll(false);
  }, []);

  const closeMPop = useCallback(
    (e) => {
      e.preventDefault();
      setMPop(false);
      setTodayCheck(false);
    },
    [setMPop]
  );
  const handleMPop = (e) => {
    e.preventDefault();
    setTodayCheck(true);
    setMPop(true);
  };
  const confirmMPop = (e) => {
    e.preventDefault();
    setMPop(false);
  };

  if (isMobile === true) {
    return (
      <>
        {showGroupPopCtx ? (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={setCookieAndClose} />
            <p>
              소속상사 대표 회원이시군요.
              <br />
              편하게 소속 딜러와 소속 차량을 관리할 수 있는
              <br />
              단쳬회원/ 제휴법인회원 ID를 신청해보세요.
            </p>
            <Buttons align="center" marginTop={12}>
              <Button size="sml" line="gray" radius={true} title="신청하기" width={61} height={30} onClick={handleOpenPop} />
            </Buttons>
            <CheckBox id="chk-close" title="다시보지않기" size="small" checked={todayCheck} isSelf={false} onChange={handleMPop} />
          </div>
        ) : !showPopCtx ? null : (
          <div className="stop-cover">
            <a href="#" className="popup-close" onClick={closePop} />
            <p>
              회원님은 현재 차량제한 중입니다.
              <br />
              광고제한기간은 {periodDt}까지 입니다.
              <span className="ex">&#8251; 제한사유 - {memo}</span>
            </p>
          </div>
        )}

        <div className={mPopDimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm} />
        <MobBottomArea active={mPopActive} isFixButton={true}>
          <div className="inner">
            <p className="tit1 mb24">단체회원/제휴법인 신청</p>
            <ul className="radio-group vertical">
              <li>
                <Radio id="member1" label="단체회원" value={'0030'} checked={memberType} onChange={(e) => setMemberType(e.target.value)} />
              </li>
              <li>
                <Radio id="member2" label="제휴회원" value={'0040'} checked={memberType} onChange={(e) => setMemberType(e.target.value)} />
              </li>
            </ul>
            <div className="mypage-admin-title mt24">
              <p className="tx-exp-tp5">&#8251; 회원유형 선택 후 신청을 하시면 회원님의 휴대폰 카카오톡 메세지로 신청양식 URL이 발송됩니다.</p>
              <p className="tx-exp-tp5">&#8251; 최종 승인까지는 영업일 기준 1~2일 소요됩니다.</p>
            </div>
          </div>
          <Button className="fixed" size="full" background="blue80" title="신청하기" onClick={onSubmit} />
        </MobBottomArea>

        <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeMPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">
              다시 보지 않기를 클릭 시 단체회원/제휴법인회원 ID를 발급받으실 수 없습니다.
              <br />
              그래도 진행하시겠습니까?
            </p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="취소" color="blue80" marginLeft={16} onClick={closeMPop} />
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight={500} onClick={confirmMPop} />
            </Buttons>
          </div>
        </RodalPopup>
      </>
    );
  }

  return (
    <>
      {showGroupPopCtx ? (
        <div className="no-group-id-cover">
          <a href="#" className="popup-close" onClick={setCookieAndClose} />
          <p>
            소속상사 대표 회원이시군요?
            <span>편하게 소속 딜러와 소속 차량을 관리할 수 있는 단체회원 / 제휴법인회원 ID를 신청해보세요.</span>
          </p>
          <Buttons align="center" marginTop={23}>
            <Button size="mid" line="black" title="자세히 보기" width={160} onClick={(e) => openNoGroupIdPop(e, 'fade')} buttonMarkup={true} />
          </Buttons>
          <CheckBox id="chk-close2" className="nolook" title="하루동안 보지 않기" size="small" name="nolook" value="oneday" onChange={handleMember} />
          {/*<CheckBox id="chk-close3" title="다시 보지 않기" size="small" name="nolook" value="never" checked={neverLook} onChange={handleMember} />*/}
        </div>
      ) : !showPopCtx ? (
        <ul className="register-admin-tab">
          {filterList.map((filter, i) => (
            <li className={classNames(listClass[i], { on: active === filter?.code })} key={i}>
              <span onClick={() => handleClick(filter.code)}>{items[i]}</span>
              {filter.title}
            </li>
          ))}
        </ul>
      ) : (
        <div className="stop-cover">
          <a href="#" className="popup-close" onClick={closePop} />
          <p>
            회원님은 현재 차량제한 중입니다.
            <span>광고제한기간은 {periodDt}까지 입니다.</span>
            <span className="ex">* 사유 - {memo}</span>
          </p>
          <CheckBox
            id="chk-close"
            title="닫기"
            size="small"
            onChange={(e) => {
              if (e.target.checked) {
                closePop(e);
              }
            }}
          />
        </div>
      )}

      <RodalPopup show={noGroupIdPop} type={'fade'} closedHandler={closeNoGroupIdPop} mode="normal" size="small">
        <div className="con-wrap popup-no-group-id">
          <ul>
            <li>
              단체 회원이란?
              <span>소속 상사의 딜러들과 소속 차량들을 편하게 관리할 수 있는 기능 있는 회원입니다. 단체회원은 각 상사 대표만 신청할 수 있습니다.</span>
            </li>
            <li>
              제휴법인회원이란?
              <span>
                오토벨과의 별도 협약을 통해 제휴 관계를 유지하는 회원입니다. 금융사/수입인증 제휴회원으로 구분되며, 단체회원에게 제공되는 기능 이외에 인증몰 기능을 추가로 이용할 수 있습니다.
              </span>
            </li>
            <li>
              제휴법인회원이란?
              <span>1. 아래 신청을 원하는 회원유형 선택 후, ‘신청하기’ 버튼을 클릭</span>
              <span>2. 문자로 받은 URL로 접속 후, 신청양식 작성&amp;제출</span>
              <span>
                3. 고객센터에서 확인 후 승인하면 단체ID 발급 완료!
                <br />
                (영업일 기준 1~2일 소요)
              </span>
            </li>
          </ul>

          <div className="radio-group">
            <Radio id="memberTypes01" value="0030" checked={memberType} onChange={(e) => setMemberType(e.target.value)} title="단체회원" />
            <Radio id="memberTypes02" value="0040" checked={memberType} onChange={(e) => setMemberType(e.target.value)} title="제휴회원" />
          </div>

          <Buttons align="center" marginTop={54}>
            <Button size="big" background="gray" title="닫기" width={130} height={48} buttonMarkup={true} onClick={(e) => closeNoGroupIdPop(false)} />
            <Button size="big" background="blue80" title="신청하기" width={130} height={48} buttonMarkup={true} onClick={onSubmit} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  );
});

ProdFilterTab.propTypes = {
  active: PropTypes.any,
  memberInfo: PropTypes.object,
  isMobile: PropTypes.bool,
  items: PropTypes.array,
  eventHandler: PropTypes.func
};
ProdFilterTab.displayName = 'ProdFilterTab';
export default ProdFilterTab;
