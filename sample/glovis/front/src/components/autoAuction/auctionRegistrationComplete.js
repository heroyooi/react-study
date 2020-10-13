import React from 'react';
import { useSelector } from 'react-redux';

const AuctionRegistrationComplete = ({ item = {} }) => {
  const { auctMbInfo, auctMbCorpInfo, auctMbResult } = useSelector((RootStore) => RootStore.auctionMember);
  console.log('item : ', item);
  console.log('auctMbInfo : ', auctMbInfo);
  console.log('auctMbResult : ', auctMbResult);

  return (
    <div className="auction-membership-complete">
      <h2 className="h2-tit">
        회원가입 신청이 완료되었습니다.
        <br />
        <strong className="tx-blue80">회원 승인이</strong> 완료된 후에 이용이 가능합니다.
      </h2>
      <h4 className="h4-tit">현대글로비스 스마트옥션은 항상 최선의 서비스를 위해 노력하겠습니다.</h4>
      <table summary="가입한 정보" className="table-tp1 input">
        <caption className="away">가입한 정보</caption>
        <colgroup>
          <col width="140px" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>이름</th>
            <td>{auctMbResult?.mbNm || item?.mbNm}</td>
          </tr>
          <tr>
            <th>아이디</th>
            <td>{auctMbResult?.membCustNo || item?.membCustNo}</td>
          </tr>
          <tr>
            <th>임시 패스워드</th>
            <td>{auctMbResult?.tmpPw || item?.tmpPw}</td>
          </tr>
        </tbody>
      </table>
      <p className="tx-exp-tp2">* 해당 패스워드는 가입하신 휴대폰번호로 문자 발송했습니다.</p>
    </div>
  );
};

export default AuctionRegistrationComplete;
