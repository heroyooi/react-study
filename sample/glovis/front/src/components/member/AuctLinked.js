/* eslint-disable prettier/prettier */
/**
 * 설명 : 오토옥션 계정연동
 * @fileoverview 오토옥션 계정연동
 * @requires :
 * @author D191364
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import Buttons from '@lib/share/items/Buttons';

import { axiosPost } from '@src/utils/HttpUtils';
import { getAuctIdByBusimanno } from '@src/actions/mypage/member/memberMngAction';

//mobile
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { console, alert } from 'globalthis/implementation';


/**
 * 회원 기본 정보
 * @param {object} 회원 정보
 * @return {AuctLinked}
 */
const AuctLinked = ({ mbTpcd, busimanno, onClick }) => {
  const dispatch = useDispatch();
  const { auctIdList } = useSelector((state) => ({
    auctIdList: state.memberMng.auctIdList ? state.memberMng.auctIdList  : [{ value: '', label: '연결가능 계정없음' }] //아이디리스트
  }));

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup2 = useSelector((state) => state.common.mFullpagePopup);
  //오토옥션
  const [auctMbId, setAuctMbId] = useState(''); //스마트옥션ID
  const [auctPwd, setAuctPwd] = useState(''); //스마트옥션 pwd
  const [auctMsg, setAuctMsg] = useState(''); //스마트옥션ID MSG
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [term3, setTerm3] = useState(false);

  //스마트옥션 취소
  const onCancleAuct = () => {
    onClick('cancle', null);   
  };

  //스마트옥션 연동
  const onSearchAuct = () => {
    //console.log("auctMbId:", auctMbId)
    if (isEmpty(auctMbId)) {
      const msg = mbTpcd === '0010' ? '아이디' : '경매번호';
      setAuctMsg( msg + '를 확인해 주세요');
    } else if (isEmpty(auctPwd)) {
      setAuctMsg('비밀번호를 확인해 주세요');
    } else if (!term1 || !term2 || !term3) {
      setAuctMsg('약관 동의가 필요합니다.');
    } else {
      const param = { auctMbId: auctMbId, auctPwd: auctPwd, mbTpcd: mbTpcd };
      console.log('param:::', param);
      axiosPost(`/api/member/selectAuctId.do`, param).then(({ data }) => {
        console.log('data:', data);
        if (data.statusinfo.returncd === 'SUCCESS') {
       //   onChange(param);
       //   closeAuctPopup();
          onClick('search', param);   
          setAuctMsg('');
        //  alert('계정이 확인되었습니다.');
        } else {
          setAuctMsg(data.statusinfo.returnmsg);
        }
      });
    }
  };

  //스마트 옥션 약관
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
  const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false);
  const handleChangeTerm1 = useCallback((e) => {
    e.preventDefault();
    rodalPopupHandler1(e, 'fade');
  }, []);

  const handleChangeTerm2 = useCallback((e) => {
    e.preventDefault();
    rodalPopupHandler2(e, 'fade');
  }, []);

  const handleChangeTerm3 = useCallback((e) => {
    e.preventDefault();
    rodalPopupHandler3(e, 'fade');
  }, []);

  
  useEffect(() => {
    setAuctMbId('');
    setAuctPwd('');
    setAuctMsg('');
    if (mbTpcd === '0020') {
      if(isEmpty(busimanno)) {
        alert('사업자등록번호를 입력하세요');
        onClick('cancle', null);
      } else {
        dispatch(getAuctIdByBusimanno(busimanno)); 
      }  
    } 
  }, []);

  //console.log("auctIdList:", auctIdList);

  if (hasMobile) {
    
    const [mobAuctIdList, setMobAuctIdList] = useState([]); //모바일 소속상사 ID 리스트
    // 풀페이지 팝업 START
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleFullpagePopup = useCallback(
      (name) => (e) => {
        e.preventDefault();
        if (name === 'term1') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '스마트 옥션 이용약관',
              options: ['close']
            }
          });
          setTerm1(true);
          setTerm2(false);
          setTerm3(false);
        } else if (name === 'term2'){
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '개인정보 활용동의',
              options: ['close']
            }
          });
          setTerm1(false);
          setTerm2(true);
          setTerm3(false);
        } else if (name === 'term3'){
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '개인정보 제3자 제공동의',
              options: ['close']
            }
          });
          setTerm1(false);
          setTerm2(false);
          setTerm3(true);
        }
      },
      [term1, term2, term3]
    );

    const closeFullpagePopup = useCallback((e) => {
      e.preventDefault();
      setTerm1(false);
      setTerm2(false);
      setTerm3(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [term1, term2, term3]
  );
  
  // 모바일용 소속상사 ID 리스트
  useEffect(() => {
    const tmpArr = auctIdList.map((el, i) => {
      return { codeValue: el.value, id: `auctID_${i + 1}`, label: el.label, value:i+1, checked: false };
    });
    setMobAuctIdList(tmpArr);
  }, [auctIdList]);

    return (
      <>
          {/*<div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={onCancleAuct} />*/}
      <div className={'modal-bg v-2 active'} onClick={onCancleAuct} />
        <MobBottomArea isFixButton={true} active={true} zid={102}>
            <div className="inner bottom-write-area">
              {mbTpcd === '0010' ? (
                <p className="txt-auto">기존 오토옥션 계정 확인</p>
              ) : (
                <p className="txt-auto">연결을 원하는 소속사 경매회원 번호를 선택한 후 비밀번호를 입력해주세요</p>
              )}

              <table summary="회원정보 등록에 대한 내용" className="table-tp1">
              <caption className="away">회원정보 등록</caption>
              <colgroup>
                <col width="25%" />
                <col width="*%" />
              </colgroup>
              <tbody>
              

              {mbTpcd === '0010' ? (
              <tr>
                <th>아이디</th>
                <td>
                  <Input type="text" id="auct-id" width='100%' height={40} value={auctMbId} onChange={(e) => setAuctMbId(e.target.value)} />
                  {/*<p className="tx-sub tx-red80">아이디를 확인해 주세요.</p>*/}
                </td>
              </tr> 

              ) : (
              <tr>
                <th>경매번호</th>
                <td>
                  <MobSelectBox 
                    id="auction-num" 
                    options={mobAuctIdList}
                    onChange={(e) => {
                      setAuctMbId(e.target.dataset.label);
                    }}
                    placeHolder="소속사 경매회원 번호" width='100%' 
                  />                  
                  <p className="txt-auto2 mt8">(오토옥션(www.glovisaa.com) 사이트에서<br />소속사 사업자등록번호로 가입된 경매회원 계정입니다.)</p>
                </td>
              </tr>
              )}

              <tr>
                <th>비밀번호</th>
                <td>
                  <Input type="password" id="auct-pwd" width='100%' height={40} value={auctPwd} onChange={(e) => setAuctPwd(e.target.value)} />
                  {/* 유효성 체크 문구  */}
                  {/* <p className="tx-sub tx-red80">비밀번호를 확인해 주세요.</p> */}
                </td>
              </tr>
              </tbody>
              </table>
              
              <p className="tx-sub tx-red80 txt-red80">{auctMsg}</p>
              <div className="mt16 terms-check">
                <CheckBox id="chk-auto-term1" title="스마트옥션 이용약관" sub="(필수)" termPop={true} onChange={(e) => (e.target.checked ? setTerm1(true) : setTerm1(false))} termPopHandle={handleFullpagePopup('term1')} />

                <CheckBox id="chk-auto-term2" className="mt8" title="개인정보 활용동의" sub="(필수)" termPop={true} onChange={(e) => (e.target.checked ? setTerm2(true) : setTerm2(false))} termPopHandle={handleFullpagePopup('term2')} />
                <CheckBox id="chk-auto-term3" className="mt8"  title="개인정보 제3자 제공동의" sub="(필수)" termPop={true} onChange={(e) => (e.target.checked ? setTerm3(true) : setTerm3(false))} termPopHandle={handleFullpagePopup('term3')} />
              </div>
              
            </div>
            <Buttons align="center" className="full fixed">
              <Button size="big" background="blue20" color="blue80" title="확인" onClick={onSearchAuct} buttonMarkup={true} />
              <Button size="big" background="blue80" title="취소" onClick={onCancleAuct} buttonMarkup={true} />
            </Buttons>          
          </MobBottomArea>

          <MobFullpagePopup active={mFullpagePopup2}>
          {term1 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: '<p>내용1</p><p>내용1</p><p>내용1</p>' }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFullpagePopup} />
              </div>
            </div>
          )}
          {term2 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: '<p>내용2</p>' }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFullpagePopup} />
              </div>
            </div>
          )}
          {term3 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: '<p>내용3</p>' }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={closeFullpagePopup} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
       
      </>
    );
  }
  //pc
  return (
    <>
    <div className="con-wrap">
      {mbTpcd === '0010' ? (
        <p className="txt-auto">기존 오토옥션 계정 확인</p>
      ) : (
        <p className="txt-auto">연결을 원하는 소속사 경매회원 번호를 선택한 후 비밀번호를 입력해주세요</p>
      )}

      <table summary="회원정보 등록에 대한 내용" className="table-tp1" style={{width:'410px',margin:'0 auto'}}>
        <caption className="away">회원정보 등록</caption>
        <colgroup>
          <col width="25%" />
          <col width="*%" />
        </colgroup>
        <tbody>
          {mbTpcd === '0010' ? (
            <tr>
              <th>아이디</th>
              <td>
                <Input type="text" id="auct-id" width={280} height={40} value={auctMbId} onChange={(e) => setAuctMbId(e.target.value)} />
                {/*<p className="tx-sub tx-red80">아이디를 확인해 주세요.</p>*/}
              </td>
            </tr>
          ) : (
            <tr>
              <th>경매번호</th>
              <td>
                <SelectBox
                  id="auction-num"
                  className="items-sbox"
                  options={auctIdList}
                  onChange={(e) => {
                    setAuctMbId(e.value);
                  }}
                  placeHolder="소속사 경매회원 번호"
                  width={280}
                />
                <p className="txt-auto2 mt8">(오토옥션(www.glovisaa.com) 사이트에서<br />소속사 사업자등록번호로 가입된 경매회원 계정입니다.)</p>
              </td>
            </tr>
          )}
          <tr>
            <th>비밀번호</th>
            <td>
              <Input type="password" id="auct-pwd" width={280} height={40} value={auctPwd} onChange={(e) => setAuctPwd(e.target.value)} />
              {/* <p className="tx-sub tx-red80">비밀번호를 확인해 주세요.</p> */}
            </td>
          </tr>
        </tbody>
      </table>

      <p className="tx-sub tx-red80 txt-auto-val">{auctMsg}</p>
      <div className="mp-terms-sec" style={{width:'410px',margin:'20px auto 0'}}>
        <ul>
          <li>
            <CheckBox
              id="chk-auto-term1"
              title="스마트옥션 이용약관"
              sub="(필수)"
              termPop={true}
              onChange={(e) => (e.target.checked ? setTerm1(true) : setTerm1(false))}
              termPopHandle={handleChangeTerm1}
            />
          </li>
          <li>
            <CheckBox
              id="chk-auto-term2"
              title="개인정보 활용동의"
              sub="(필수)"
              termPop={true}
              onChange={(e) => (e.target.checked ? setTerm2(true) : setTerm2(false))}
              termPopHandle={handleChangeTerm2}
            />
          </li>
          <li>
            <CheckBox
              id="chk-auto-term3"
              title="개인정보 제3자 제공동의"
              sub="(필수)"
              termPop={true}
              onChange={(e) => (e.target.checked ? setTerm3(true) : setTerm3(false))}
              termPopHandle={handleChangeTerm3}
            />
          </li>
        </ul>
      </div>

      <Buttons align="center" marginTop={48}>
        <Button size="big" background="blue80" title="확인" width={172} buttonMarkup={true} onClick={onSearchAuct} />
        <Button size="big" background="gray" title="취소" width={172} buttonMarkup={true} onClick={onCancleAuct} />
      </Buttons>
    </div>

    <RodalPopup show={rodalShow1} type={'fade'} subPop={true} closedHandler={modalCloseHandler1} title="스마트옥션 이용약관" mode="normal" size="medium">
      <div className="con-wrap">
        <div className="frminbox" dangerouslySetInnerHTML={{ __html: '<p>내용1</p>' }} />
      </div>
    </RodalPopup>

    <RodalPopup show={rodalShow2} type={'fade'} subPop={true} closedHandler={modalCloseHandler2} title="개인정보 활용동의" mode="normal" size="medium">
      <div className="con-wrap">
        <div className="frminbox" dangerouslySetInnerHTML={{ __html: '<p>내용2</p>' }} />
      </div>
    </RodalPopup>

    <RodalPopup show={rodalShow3} type={'fade'} subPop={true} closedHandler={modalCloseHandler3} title="개인정보 제3자 제공동의" mode="normal" size="medium">
      <div className="con-wrap">
        <div className="frminbox" dangerouslySetInnerHTML={{ __html: '<p>내용3</p>' }} />
      </div>
    </RodalPopup>
    </>
  );
};

AuctLinked.propTypes = {
  mbTpcd: PropTypes.string,
  busimanno: PropTypes.string,
  onClick: PropTypes.func
};

export default AuctLinked;
