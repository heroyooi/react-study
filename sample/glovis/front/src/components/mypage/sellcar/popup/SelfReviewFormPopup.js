/* eslint-disable no-unused-vars */
/**
 * 내차팔기 셀프평가 후기 작성 팝업
 * @fileoverview 내차팔기 셀프평가 후기 작성 팝업
 * @author 김민철
 */
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { produce } from 'immer';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Textarea from '@lib/share/items/Textarea';
import StarScore from '@lib/share/items/StarScore';
import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { SystemContext } from '@src/provider/SystemProvider';
import { addReviewAction } from '../../../../actions/sellcar/SelfSellCarAction';
import { getReqAction } from '@src/actions/sellcar/sellCarAction';
import * as api from '../../../../api/sellcar/AllSellcarSearchApi';
import { setComma } from '@src/utils/StringUtil';
// import { addReview } from '@src/actions/mypage/sellcar/mySelfSellCarAction';

/**
 * 내차팔기 셀프평가 후기 작성 팝업
 * @param {bool} popupOpen
 * @param {object} req
 * @returns {SelfReviewFormPopup}
 */
const SelfReviewFormPopup = ({ seller={}, cmprEstm={}, closedHandler }) => {
  const dispatch = useDispatch();
  const { showAlert } = useContext(SystemContext);
  const [usePur4Cntn, setUsePur4Cntn] = useState('');
  const [biddList, setBiddList] = useState([]);
  const [sbidAmt, setSbidAmt] = useState(0);
  const [grade, setGrade] = useState([0, 0, 0]);

  // 리뷰 점수 핸들러
  const reviewTextareaHandler = (e) => {
    e.preventDefault();
    setUsePur4Cntn(e.target.value);
  };

  // 리뷰 등록 핸들러
  const reviewSumbitHandler = async (e) => {
    e.preventDefault();
    const params = {
      slReqId: seller.slReqId,
      usePs1Cntn: grade[0],
      usePs2Cntn: grade[1],
      usePs3Cntn: grade[2],
      usePs4Cntn: usePur4Cntn
    };
    // console.log("reviewSumbitHandler::",params);
    const success = await dispatch(addReviewAction(params));
    if (success) {
      closedHandler(false);
      await dispatch(getReqAction(params.slReqId));
      showAlert('등록했습니다.');
    } else {
      showAlert('실패했습니다.');
    }
  };

  const gradeChange = (e, idx, value) => {
    console.log(idx, value);
    let temp = [...grade];
    temp[idx] = value;

    setGrade(temp);
  };

  useEffect( () => {
    // 딜러 목록 조회
    api.selectBiddDealerList({ slReqId: seller.slReqId })
       .then( res => {
         const { data, statusinfo } = res.data;
         if(statusinfo.returncd === '000'){
          setBiddList(data);
         }
       });
  }, [cmprEstm]);

  return (
    <div className="con-wrap general-sell-sec review">
      <div className="bidding-inquiry">
        <h5>입찰 결과 조회</h5>
        <ul>
          <li>
            입찰자수
            <p className="price-tp7">
              {cmprEstm.biddDrlCnt}
              <span className="won"> 명</span>
            </p>
          </li>
          <li>
            최종 판매가
            <p className="price-tp7">
              {setComma(cmprEstm.sbidAmt)}
              <span className="won"> 만원</span>
            </p>
          </li>
        </ul>
      </div>
      <div className="admin-list tp6">
        <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
          <caption className="away">결제내역</caption>
          <colgroup>
            <col width="15%" />
            <col width="15%" />
            <col width="20%" />
            <col width="15%" />
            <col width="35%" />
          </colgroup>
          <thead>
            <tr>
              <th>사진</th>
              <th>딜러명</th>
              <th>소속</th>
              <th>연락처</th>
              <th>지역</th>
            </tr>
          </thead>
          <tbody>            
            {biddList.map((bidd, idx) => {
                if(bidd.sbidYn === 'Y'){
                  // setSbidAmt(bidd.biddAmt);
                  return(
                    <tr key={idx}>
                      <td>
                        <div className="img-cover">
                          <img src={(bidd.phtUrl)?imgUrl+bidd.phtUrl:'/images/ico/ico-dealer-none.svg'} alt="프로필 없음 이미지" />
                        </div>
                      </td>
                      <td>
                        {/* <Link href="#"> */}
                          <a onClick={(e) => { e.preventDefault(); _dealerInfoPopupHandler(bidd.mbId);}}>
                            {bidd.mbNm} 딜러
                          </a>
                        {/* </Link> */}
                      </td>
                      <td>{bidd.locNm}</td>
                      <td>
                        {bidd.dlrMbHpPn}
                      </td>
                      <td className="price">
                        {bidd.biddAmt}
                        <span>만원</span>
                      </td>
                    </tr>
                  )
                } 
              }
            )}
          </tbody>
        </table>
      </div>

      <div className="review-input-wrap">
        <h4>24시간 실시간 비교견적 이용후기를 입력해 주세요.</h4>
        <ul>
          <li>
            1. 최종 판매 금액에 만족하시나요?
            <span>
              <StarScore type="click" grade={grade[0]} idx={0} gradeChange={gradeChange} />
            </span>
          </li>
          <li>
            2. 구매 딜러의 서비스에 만족하시나요?
            <span>
              <StarScore type="click" grade={grade[1]} idx={1} gradeChange={gradeChange} />
            </span>
          </li>
          <li>
            3. 주변분들에게 구매 딜러를 추천 의향은 어느 정도 되시나요?
            <span>
              <StarScore type="click" grade={grade[2]} idx={2} gradeChange={gradeChange} />
            </span>
          </li>
          <li>4. 이용후기를 간단하게 한 줄로 남겨주세요.</li>
          <li>
            <Textarea type="tp2" height={80} onBlur={reviewTextareaHandler} countLimit={2000} />
          </li>
        </ul>
      </div>

      <Buttons align="center" marginTop={48}>
        <Button
          size="big"
          background="gray"
          title="취소"
          width={172}
          height={60}
          onClick={(e) => {
            e.preventDefault();
            closedHandler(false);
          }}
        />
        <Button size="big" background="blue80" title="확인" width={172} height={60} onClick={reviewSumbitHandler} />
      </Buttons>
    </div>
  );
};

SelfReviewFormPopup.propTypes = {
  popupOpen: PropTypes.bool,
  req: PropTypes.string
};

export default SelfReviewFormPopup;
