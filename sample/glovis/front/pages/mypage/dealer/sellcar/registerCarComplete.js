import React, { useEffect, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';

import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RenderHelper from '@lib/share/render/helper';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

import { setComma } from '@src/utils/StringUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import { getCommonCodeAsync } from '@src/utils/DataUtils';

const RegisterCarComplete = ({ query, paymentInfo }) => {
  const { showAlert } = useContext(SystemContext);
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '차량등록',
          options: ['back']
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
  }, []);

  const { dlrPrdId, buyerTel, buyerName, resultMsg, custEmail, CARD_PurchaseName, totprice, vactBankName, vactDate, vactName, vactNum, vactTime } = query;
  const [mobVBank, setMobVBank] = useState(false);

  console.log('registerCarComplete -> dlrPrdId', dlrPrdId);
  console.log('registerCarComplete -> buyerName', buyerName);
  const [bankList, setBankList] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBankName = useCallback((bankCode) => {
    debugger;
    if (bankList !== undefined) {
      bankList.forEach((item) => {
        item.cdnm;
      });
    }
  }, []);

  useEffect(() => {
    getCommonCodeAsync('FM053').then((codeList) => setBankList(codeList));
  }, []);

  useEffect(() => {
    if(hasMobile){
      if (typeof paymentInfo !== 'undefined' && JSON.stringify(paymentInfo) !== JSON.stringify({})) {
        console.log('paymentInfo : ', paymentInfo);
        if (paymentInfo.returnCd === 'success') {
          if (paymentInfo.payMethod === 'VBANK') {
            setMobVBank(true);
          }
        } else {
          console.log('paymentInfo : ', paymentInfo);
          showAlert('결제 실패하였습니다. \n 다시 시도 해주세요.');
        }
      }
    }
  }, [paymentInfo]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="dealer-register-form">
          <Steps mode="stick" type={1} contents={['차량정보 입력', '성능점검', '가격 및 차량소개', '차량 설명글 입력', '차량사진 등록', '결제', '등록완료']} active={7} />
          <div className="co-sec">
            <div className="co-wrap">
              <p className="tit">등록이 완료되었습니다.</p>
              <p className="exp fs14 mt5">등록 현황은 마이페이지에서 확인이 가능합니다.</p>
              {mobVBank && (
                <table summary="예약정보" className="table-tp1 mt32">
                  <caption className="away">예약정보</caption>
                  <colgroup>
                    <col width="25%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>금액</th>
                      <td>{setComma(paymentInfo.vBankAmt)}</td>
                    </tr>
                    <tr>
                      <th>납부계좌</th>
                      <td>
                        <p className="essential">{paymentInfo.vBankNum}</p>
                        {/* KEB하나은행, 현대글로비스(주) */}
                        {`${getBankName(paymentInfo.vBankCode)}, ${paymentInfo.vBankOwnerName}`}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="등록차량 관리" href="/mypage/dealer/sellcar/carManagement" nextLink={true} />
          <Button size="big" background="blue80" title="확인" href="/mypage/dealer/sellcar/carManagement" nextLink={true} />
        </Buttons>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap register-wrap">
        <MypageNavi />
        <div className="mypage-state-sec">
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={6} /> {/* 가격 및 차량소개와 성능점검 서로 위치 바뀜  */}
          </div>

          <div className="co-wrap">
            {vactBankName ? (
              <>
                <p className="tit">입금대기중입니다.</p>
                <p className="exp">입금내역은 마이페이지에서 확인이 가능합니다.</p>

                <div style={{ width: '400px', margin: '50px auto' }}>
                  <table className="table-tp1 mt24" summary="결제내역에 대한 내용">
                    <caption style={{ position: 'absolute', clip: 'rect(0,0,0,0)' }}>결제내역</caption>
                    <colgroup>
                      <col width="40%" />
                      <col width="60%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>은행</th>
                        <td>{vactBankName}</td>
                      </tr>
                      <tr>
                        <th>계좌번호</th>
                        <td>{vactNum}</td>
                      </tr>
                      <tr>
                        <th>결제금액</th>
                        <td>{setComma(totprice)}원</td>
                      </tr>
                      <tr>
                        <th>입금기한</th>
                        <td>{`${vactDate.substring(0, 4)}년 ${vactDate.substring(4, 6)}월 ${vactDate.substring(6, 8)}일 ${vactTime.substring(0, 2)}시 ${vactTime.substring(2, 4)}분까지`}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <p className="tit">등록이 완료되었습니다.</p>
                <p className="exp">등록 현황은 마이페이지에서 확인이 가능합니다.</p>
              </>
            )}

            <Buttons align="center" marginTop={80}>
              <Button size="big" line="blue80" color="blue80" title="등록차량 관리로 이동" width={200} height={60} nextLink={true} href="/mypage/dealer/sellcar/carManagement" />
              <Button size="big" background="blue80" title="확인" width={200} height={60} nextLink={true} href="/mypage/dealer/sellcar/registerCarSearch" />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

RegisterCarComplete.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;

  return {
    query,
    paymentInfo: {
      returnCd: query.returnCd,
      payMethod: query.payMethod,
      vBankNum: query.vBankNum,
      vBankCode: query.vBankCode,
      vBankOwnerName: query.vBankOwnerName,
      vBankDate: query.vBankDate,
      vBankTime: query.vBankTime,
      vBankAmt: query.vBankAmt,
      mobPayDataKey: query.mobPayDataKey
    }
  };
};

RegisterCarComplete.displayName = 'registerCarComplete';

RegisterCarComplete.propTypes = {
  paymentInfo: PropTypes.object
};

export default RegisterCarComplete;
