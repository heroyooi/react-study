/**
 * 회원 마이페이지 내차팔기 신청정보 디테일
 * @fileOverview 회원 마이페이지 내차팔기 신청정보 디테일
 * @requires VisitDetail
 * @requires SelfDetail
 * @requires NonevalDetail
 * @Author 김민철
 */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import VisitDetail from '@src/components/mypage/sellcar/VisitDetail';
import SelfDetail from '@src/components/mypage/sellcar/SelfDetail';
import NonevalDetail from '@src/components/mypage/sellcar/NonevalDetail';
import { isLogin, gInfoLive, UserType } from '@src/utils/LoginUtils';
import { REQ_STT, REQ_TPCD } from '@src/constant/mbSlReqStt';
import { selectSellcar } from '@src/api/sellcar/AllSellcarSearchApi';
import { selectVisitDetail } from '@src/api/sellcar/VisitSellcarApi';
import { selectSellcarAction } from '@src/actions/sellcar/allSellcarSearchAction';
import { getReqAction } from '@src/actions/sellcar/sellCarAction';
import { SystemContext } from '@src/provider/SystemProvider';
import sellCarTypes from '@src/actions/sellcar/sellCarTypes';

/**
 * 마이페이지 내차팔기 신청정보 디테일
 * @param {Object} props
 * @param {Object} props - props object
 * @param {String} props.slReqId - 판매 신청서 아이디
 * @returns {SellCarView}
 */
const SellCarView = ({ slReqId, reqTpcd, wgoodsno }) => {
  const dispatch = useDispatch();

  const { seller, visitDetail } = useSelector((state) => state.sellCarStore, []);
  const [callReq, setCallReq] = useState(false);
  const [activeNo, setActiveNo] = useState(0);
  const { showAlert, showConfirm } = useContext(SystemContext);

  useEffect(() => {
    if (!isLogin()) {
      location.href = '/login';
    }
    //dispatch(getReqAction(slReqId));

    selectSellcar({ slReqId })
      .then((res) => {
        const {
          data: seller,
          statusinfo: { returncd }
        } = res.data;
        if (returncd === '000') {
          const car = seller?.car;
          dispatch({
            type: sellCarTypes.INIT_CAR_STATE,
            payload: { seller, car } || {}
          });
        } else if (returncd === '999') {
          showAlert('진입 불가', () => {
            Router.back();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (reqTpcd === '00001') {
      selectVisitDetail({ wgoodsno: wgoodsno }).then(({ data }) => {
        console.log('visitDetail >>>', data);

        if (data.statusinfo.returncd === '000') {
          const visitDetail = data.data[0];
          dispatch({
            type: sellCarTypes.INIT_VISIT_DETAIL,
            payload: visitDetail
          });
        } else {
          dispatch({
            type: sellCarTypes.INIT_VISIT_DETAIL,
            payload: {}
          });
        }
      });
    }
  }, []);

  /**
   * Redux에서 관리 중인 reqList(판매신청목록)이 수정된 경우 (예:신청상태값 변경 등) req(판매신청)정보도 변경
   */
  useEffect(() => {
    if (!callReq) {
      setCallReq(true);
      dispatch(getReqAction(slReqId));
    }
  }, [callReq, dispatch, slReqId]);

  /**
   * req(판매신청)정보도 변경이 되었을 경우 activeNo(진행상태 값)도 변경이 되었을 수 있기 때문에 처리
   */
  useEffect(() => {
    if (!isEmpty(seller) && reqTpcd !== '00001') {
      setActiveNo(REQ_STT[seller.reqTpcd]?.STATE[seller.reqSttTpcd]?.STEPNO);
    }
  }, [seller]);

  useEffect(() => {
    if (!isEmpty(visitDetail) && reqTpcd === '00001') {
      let active = 0;
      if (visitDetail.counselcode !== '40') active = 1;
      else if (visitDetail.counselcode === '40' && visitDetail.evalproc === '01') active = 2;
      else if (visitDetail.evalproc !== '01' && (visitDetail.deciproc === '01' || visitDetail.deciproc === '02')) active = 3;
      else active = 4;
      setActiveNo(active);
    }
  }, [visitDetail]);

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />
        <div className="mypage-state-sec general-sell-sec">
          <div className="mypage-admin-title">
            <h3 className="border-none">판매 신청 상세 내역</h3>
            <div className="sub-tit-wrap">
              <p>{seller.reqTpcdNm} 판매로 신청하신 내역입니다.</p>
            </div>
          </div>
          {!isEmpty(seller) && seller.reqTpcd === REQ_TPCD.VISIT && <VisitDetail req={visitDetail} activeNo={activeNo} />}
          {!isEmpty(seller) && seller.reqTpcd === REQ_TPCD.SELF && <SelfDetail req={seller} activeNo={activeNo} />}
          {!isEmpty(seller) && seller.reqTpcd === REQ_TPCD.NONEVAL && <NonevalDetail req={seller} activeNo={activeNo} />}
        </div>
      </div>
    </AppLayout>
  );
};

/**
 * 설명 : 페이지 렌더링 하기전에 url query로 넘어오는 값을 추출
 * @return {String} slReqId : 판매 신청서 아이디
 */
SellCarView.getInitialProps = async (http) => {
  const { req, query } = http;
  const slReqId = req ? req.query.slReqId : query.slReqId;
  const reqTpcd = req ? req.query.type : query.type;
  const wgoodsno = req ? req.query.wgoodsno : query.wgoodsno;
  return {
    slReqId,
    reqTpcd,
    wgoodsno
  };
  // return {};
};

SellCarView.propTypes = {
  slReqId: PropTypes.string,
  reqTpcd: PropTypes.string,
  wgoodsno: PropTypes.string
};

export default SellCarView;
