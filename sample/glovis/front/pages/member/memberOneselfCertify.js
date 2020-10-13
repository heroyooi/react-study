/**
 * 설명 : 본인인증 창(추후, 통신사 연결)
 * @fileoverview :
 * @requires  :
 * @author 김지현
 */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { axiosPost } from '@src/utils/HttpUtils';
//import window from 'global'

import Certification from '@src/components/common/Certification';
import CertificationMod from '@src/components/common/CertificationMod';
import AppLayout from '@src/components/layouts/AppLayout';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import { rtnBirthData } from '@src/utils/MemberUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import { setMemberCertify } from '@src/actions/member/memberAction';

import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const MemberOneselfCertify = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
  }, []);

  const { showAlert } = useContext(SystemContext);
  const mbTpcd = useSelector((state) => state.member.mbTpcd);
  const mbTpcdNm = mbTpcd === '0010' ? '일반' : '딜러';

  // eslint-disable-next-line no-unused-vars
  const [certData, setCertData] = useState({});
  const [certShow, setCertShow] = useState(false);
  const [certModShow, setCertModShow] = useState(false);

  //본인인증 click
  const onHandleSearchClick = (e, type) => {
    e.preventDefault();
    if (type === 'M') {
      setCertModShow(true);
    } else {
      setCertShow(true);
    }
  };

  //본인인증 callback
  const certCallback = (e, type) => {
    if (type === 'M') {
      setCertModShow(false);
    } else {
      setCertShow(false);
    }

    if (e.RETURN_CD === '0000') {

      const mbCi = e.LGD_AUTHSUB_CI;
      const genderNo = e.LGD_MOBILE_SUBAUTH_SEX;
      const paramObj = {
        mbCi: mbCi,
        mbNm: e.LGD_MOBILE_SUBAUTH_NAME,
        mbHpPnEnc: e.LGD_MOBILENUM,
        genderNo: genderNo,
        birth: rtnBirthData(e.LGD_MOBILE_SUBAUTH_BIRTH, genderNo),
        diCol: e.LGD_AUTHSUB_DI
      };
      dispatch(setMemberCertify(paramObj));

      const paramObj2 = {
        mbCi: mbCi,
        mbTpcd: mbTpcd
      };

      axiosPost(`/api/member/selectWthdByPeriodYn.do`, paramObj2).then((payload) => {
        console.log('selectWthdByPeriodYn payload :', payload);
        if (payload.data.data > 0) {
          //showAlert('탈퇴회원입니다.<br/>탈퇴한 날로부터 30일간 가입이 불가합니다.<br/>콜센터 1600 - 0080');
          showAlert('탈퇴 회원으로 재가입은 30일 후 가입 가능 합니다.<br/>콜센터(1600-0080)로 문의주세요.');
          const url = '/member/choiceMemberType';
          Router.push({ pathname: url, query: {} }, url).then(() => {
            window.scrollTo(0, 0);
          });
        } else {
          axiosPost(`/api/member/selectMbTpcdCnt.do`, paramObj2).then((payload) => {
            console.log(' selectMbTpcdCnt payload :', payload);
            if (payload.data.data > 0) {
              showAlert(`이미 가입된 ${mbTpcdNm}회원 아이디가 있습니다`);
              //Router.push('/member/choiceMemberType');
              const url = '/member/choiceMemberType';
              Router.push({ pathname: url, query: {} }, url).then(() => {
                window.scrollTo(0, 0);
              });
            } else {
              console.log('넘어가야지:', mbTpcd);
              if (mbTpcd === '0010') {
                const url = '/member/personalMemberInfo';
                Router.push({ pathname: url, query: {} }, url).then(() => {
                  window.scrollTo(0, 0);
                });
              } else {
                const url = '/member/dealerMemberInfo';
                Router.push({ pathname: url, query: {} }, url).then(() => {
                  window.scrollTo(0, 0);
                });
              }
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (mbTpcd === '') {
      alert('잘못된 접근입니다.');
      Router.push('/member/choiceMemberType').then(() => {
        window.scrollTo(0, 0);
      });
    }
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원가입 신청',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>
        <Steps type={1} contents={['약관동의', '본인인증', '가입정보입력', '회원가입완료']} active={2} reverse={true} mode="stick" />
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="certify-wrap member">
              <span className="ico-wrap">
                <i className="ico-certify" />
              </span>
              <p className="tx-sub">
                안전한 회원가입을 위해
                <br />
                휴대폰 본인인증을 진행해 주세요.
              </p>
              <Button size="mid" background="blue80" radius={true} title="휴대폰 본인인증" width={126} height={40} marginTop={16} onClick={(e) => onHandleSearchClick(e, 'M')} />
              <CertificationMod show={certModShow} callback={(e) => certCallback(e, 'M')} />
            </div>
            <p className="tx-small">
              입력하신 회원님의 개인 정보는 본인인증 이외의 목적으로
              <br />
              활용하지 않습니다.
            </p>
          </div>
        </div>
        {/*Button className="fixed" size="full" background="blue80" title="다음" href="memberStep03" nextLink={true} />*/}
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec-w">
          <div className="content-wrap member-steps">
            <div className="member-tit-area">
              <h3>{mbTpcdNm}회원 가입</h3>
            </div>
            <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={2} reverse={true} marginTop={59} />
          </div>
        </div>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>본인인증</h4>
              <p>안전한 회원가입을 위해 휴대폰 본인인증을 진행해 주세요.</p>
            </div>
            <div className="certify-wrap member">
              <span className="ico-wrap">
                <i className="ico-certify" />
              </span>
              <p className="tx-sub">
                입력하신 회원님의 개인 정보는
                <br />
                <span>본인인증 이외의 목적으로 활용하지 않습니다.</span>
              </p>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="blue80" title="휴대폰 본인인증" width={172} height={60} onClick={(e) => onHandleSearchClick(e, 'P')} />
                <Certification data={certData} show={certShow} callback={(e) => certCallback(e, 'P')} />
              </Buttons>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MemberOneselfCertify;
