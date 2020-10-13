/**
 * 설명 :평가사(CM) 최초 로그인시 본인인증
 * @fileoverview :
 * @requires  :
 * @author D191367
 */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { axiosPost } from '@src/utils/HttpUtils';
//import window from 'global'

import Certification from '@src/components/common/Certification';
import CertificationMod from '@src/components/common/CertificationMod';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { isEmpty } from 'lodash';
import { SystemContext } from '@src/provider/SystemProvider';
import { setMemberCertify } from '@src/actions/member/memberAction';
import Cookies from 'js-cookie';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const CmCertify = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
  }, []);
  const myMbInfoData = useSelector((state) => state?.myMbInfoData);
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
      const paramObj = {
        mbId: Cookies.get('id'),
        mbCi: mbCi,
        mbNm: e.LGD_MOBILE_SUBAUTH_NAME,
        mbHpPnEnc: e.LGD_MOBILENUM
      };
      console.log('본인인증 callback > paramObj=%o', paramObj);
      dispatch(setMemberCertify(paramObj)); //본인인증 CI를 redux에 저장 (myMbInfoData)

      console.log('본인인증 !isEmpty> myMbInfoData=%o', myMbInfoData);
      Router.push('/member/cmInfo').then(() => {
        window.scrollTo(0, 0);
      });      
    }
  };


  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '본인인증',
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
    }
  }, [dispatch]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="certify-wrap member" style={{ marginTop: '20px' }}>
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
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="login-tit-area">
              <h4>
                최초 <span>로그인</span> 시 <span>본인인증</span>이 필요합니다
              </h4>
            </div>
            <div className="ico-tx-wrap">
              <p>
                카마스터(CM), 평가사 회원 이신가요?
                <br />
                본인인증 후 약관동의와 비밀번호 변경을 진행해주세요.
              </p>
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

export default CmCertify;
