/**
 * 설명 : 일반 & 딜러 회원가입 시 가입완료 화면
 * @fileoverview 가입완료
 * @requires
 * @author D191364
 */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import Link from 'next/link';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';

import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

/**
 * 설명 : 일반 & 딜러 회원가입 시 가입완료
 * @param {}
 * @returns {}
 */
const MemberRegistrationComplete = (response) => {
  const dispatch = useDispatch();
  //const mbTpcd = useSelector((state) => state.member.mbTpcd);
  const mbTpcd = response.data;
  console.log('mbTpcd:', mbTpcd);

  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleRouter = (href) => (e) => {
    e.preventDefault();
    Router.push(href);
  };

  if (hasMobile) {
    let titleText = '회원가입 신청';
    if (mbTpcd === '0020') {
      titleText = '딜러회원 가입';
    } else if (mbTpcd === '0030') {
      titleText = '단체회원 가입';
    } else if (mbTpcd === '0040') {
      titleText = '제휴회원 가입';
    }

    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: titleText,
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 88,
        color: '#f6f7f8'
      }
    });
    return (
      <AppLayout>
        {!['0030', '0040'].includes(mbTpcd) && <Steps type={1} contents={['약관동의', '본인인증', '회원가입 신청', '회원가입 완료']} active={4} reverse={true} mode="stick" />}
        <div className="member-sec-w bg-white v-2">
          {['0010'].includes(mbTpcd) ? (
            <div className="content-wrap">
              <h3>
                환영합니다.
                <br />
                회원가입이 완료되었습니다.
              </h3>
              <p className="ment">
                현대 글로비스 오토벨에서 다양한
                <br />
                중고차 서비스와 혜택을 받아보세요.
              </p>
            </div>
          ) : (
            <div className="content-wrap">
              <h3>회원가입 신청이 완료되었습니다.</h3>
              <h4>
                <span className="tx-blue80">회원 승인</span>이 완료된 후에 이용이 가능합니다.
              </h4>
              <p className="ment">
                <span className="tx-red80">승인이 완료되면 SMS/이메일로 안내됩니다.</span>
                <br />
                현대 글로비스 오토벨에서 다양한 중고차 서비스와 혜택을 받아보세요.
              </p>
            </div>
          )}
        </div>
        <div className="member-sec">
          <div className="content-wrap member-contents">
           {/*['0020'].includes(mbTpcd) ? (
            <div className="member-co-wrap auction mt20">
              <ul>
                <li>
                  <span>경쟁 할수록 내차의 가격이 상승한다</span>
                  <p>내차 출품하기</p>
                  <Link href="/autoAuction/autoAuctionPolicyAggrement">
                    <a>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>언제 어디서나 실시간 경매참여</span>
                  <p>온라인경매 참여</p>
                  <Link href="/autoAuction/auctionInfo?seq=2">
                    <a>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>경매를 이용하는 입문자를 위한 안내서</span>
                  <p>이용안내 보기</p>
                  <Link href="/autoAuction/auctionInfo?seq=3">
                    <a>바로가기</a>
                  </Link>
                </li>
              </ul>
            </div>
          */}
            <div className="member-co-wrap mt20">
              <ul>
                <li>
                  <span>믿을 수 있는 현대 오토벨에서</span>
                  <p>내차사기</p>
                  <Link href="/buycar/buyCarList">
                    <a>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>나에게 맞는 방법으로 편리하게</span>
                  <p>내차팔기</p>
                  <Link href="/sellcar/sellCar">
                    <a>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>내차 상태에 맞는 시세리포트 제공</span>
                  <p>시세조회</p>
                  <Link href="/marketPrice/marketprice">
                    <a>바로가기</a>
                  </Link>
                </li>
              </ul>
            </div>
            <Button className="fixed" size="full" background="blue80" title="메인으로" href="/main" nextLink={true} />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        {['0010', '0020'].includes(mbTpcd) && (
          <div className="member-sec-w">
            <div className="content-wrap member-steps">
              <div className="member-tit-area">
                <h3>
                  {mbTpcd === '0020' ? '딜러' : '일반'}
                  회원 가입
                </h3>
              </div>
              <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={4} reverse={true} marginTop={59} />
            </div>
          </div>
        )}
        <div className="member-sec">
          <div className="content-wrap member-contents">
            {['0010'].includes(mbTpcd) ? (
              <div className="member-tit-area">
                <h4>
                  환영합니다
                  <br />
                  회원가입이 완료되었습니다.
                </h4>
              </div>
            ) : (
              <div className="member-tit-area">
                <h4>
                  회원가입 신청이 완료되었습니다.
                  <br />
                  <span>회원 승인</span>이 완료된 후에 이용이 가능합니다.
                </h4>
              </div>
            )}
             {/*['0020'].includes(mbTpcd) ? (
              <div className="member-co-wrap auction dealer">
                <p className="ment">
                  <span>승인이 완료되면 SMS/이메일로 안내됩니다.</span>
                  <br />
                  현대 글로비스 오토벨에서 다양한 중고차 서비스와 혜택을 받아보세요.
                </p>
                <ul>
                  <li>
                    <span>
                      경쟁 할수록
                      <br />
                      내차의 가격이 상승
                    </span>
                    <p>내차 출품하기</p>
                    <Link href="#">
                      <a onClick={handleRouter('/autoAuction/autoAuctionPolicyAggrement')}>바로가기</a>
                    </Link>
                  </li>
                  <li>
                    <span>
                      언제 어디서나
                      <br />
                      실시간 경매참여
                    </span>
                    <p>온라인경매 참여</p>
                    <Link href="#">
                      <a onClick={handleRouter('/autoAuction/auctionInfo?seq=2')}>바로가기</a>
                    </Link>
                  </li>
                  <li>
                    <span>
                      경매를 이용
                      <br />
                      입문자 안내서
                    </span>
                    <p>이용안내 보기</p>
                    <Link href="#">
                      <a onClick={handleRouter('/autoAuction/auctionInfo?seq=3')}>바로가기</a>
                    </Link>
                  </li>
                </ul>
              </div>
             */}
            <div className="member-co-wrap">
              <p className="ment">
                현대 글로비스 오토벨에서 <span>다양한 중고차 서비스와 혜택</span>을 받아보세요.
              </p>
              <ul>
                <li>
                  <span>
                    믿을 수 있는
                    <br />
                    현대 글로비스 오토벨에서
                  </span>
                  <p>내차사기</p>
                  <Link href="/buycar/buyCarList">
                    <a>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>
                    나에게 맞는 방법으로
                    <br />
                    편리하게
                  </span>
                  <p>내차팔기</p>
                  <Link href="/sellcar/sellCar">
                    <a>바로가기</a>
                  </Link>
                </li>
                <li>
                  <span>
                    내 차 상태에 맞는
                    <br />
                    시세 리포트 제공
                  </span>
                  <p>시세조회</p>
                  <Link href="/marketPrice/marketprice">
                    <a>바로가기</a>
                  </Link>
                </li>
              </ul>
            </div>
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="메인으로" width={180} height={60} href="/main" />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

MemberRegistrationComplete.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  return {
    data: query.mbTpcd
  };
};

export default MemberRegistrationComplete;
