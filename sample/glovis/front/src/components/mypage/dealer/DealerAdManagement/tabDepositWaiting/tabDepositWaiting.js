import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PulseLoader } from 'react-spinners';
import PageNavigator from '@src/components/common/PageNavigator';
import Button from '@lib/share/items/Button';

import { setComma } from '@src/utils/StringUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import { updateDepositWaitingItemAction } from '@src/actions/mypage/dealer/dealerAdverAction';

import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Buttons from '@lib/share/items/Buttons';

import * as listActions from '@src/actions/mypage/dealer/dealerProdListAction';
import * as advActions from '@src/actions/mypage/dealer/dealerAdverAction';

const tabDepositWaiting = ({params, eventHandler, advStore}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const dispatch = useDispatch();
  const { showAlert, showConfirm, Confirm, initAlert, initConfirm, showLoader, hideLoader } = useContext(SystemContext);
  const { currentPage, viewPageCnt, order, by, payments, service, startDt, endDt, period} = params
  const { depositWaitingList=[], depositTotalcnt=0, depositTotalpayamt=0 } = advStore
  console.log("tabDepositWaiting -> depositWaitingList", depositWaitingList)

  const cancel = (e, depositWaiting) => {
    if (e !== undefined) e.preventDefault();
    // showConfirm(`<p>해당 입금 대기건을<br>취소하시겠습니까?</p>`, "tabDepositWaiting_cancel")
    showConfirm(`<p>해당 입금 대기건을<br>취소하시겠습니까?</p>`, (e)=>{
      if (e !== undefined) e.preventDefault();
      showLoader()
      console.log('입금대기 취소 : ', depositWaiting);
      if(depositWaiting){
        dispatch(updateDepositWaitingItemAction(depositWaiting)).then(async res => {
          hideLoader()
          console.log('결과 res : ', res)
          showAlert(res)

          // await dispatch(listActions.getDealerProdCntAction(params));
          // await dispatch(advActions.getDepositWaitingListAction(params));

          globalThis.window.location.reload()

          if (hasMobile) {
            eventHandler({ caller: 'waitingCancel' });
            setMobPage(1);
            window.scrollTo(0, 0);
          }
        })
      }
    })
  }

  useEffect(() => () => {
    initAlert();
    initConfirm();
  }, []);

  // 모바일 더보기 버튼
  const [mobPage, setMobPage] = useState(1);
  const [isNeedMoreButton, setIsNeedMoreButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowMore = useCallback((e) => {
    if (e !== undefined) e.preventDefault();
      let _p = mobPage;
      _p++;
      setMobPage(_p);
      eventHandler({ caller: 'waiting', mobPage: _p, type: 'append' });
      setIsLoading(true);
    },
    [depositTotalcnt, mobPage, isLoading]
  );
  useEffect(() => {
    handleMoreButton(mobPage);
  }, [depositTotalcnt]);

  const handleMoreButton = (mobPage) => {
    if (depositTotalcnt > mobPage * viewPageCnt) {
      setIsNeedMoreButton(true);
    } else {
      setIsNeedMoreButton(false);
    }
  };
  useEffect(() => {
    if (isLoading) setIsLoading(false);
    handleMoreButton(mobPage);
  }, [depositWaitingList]);
  // 모바일 더보기 버튼

  if (hasMobile) {
    return (
      <>
        <div className="payment-tx-list content-border">
          <div className="eposit-tx-list pt20">
            <div className="float-wrap">
              <h5 className="tit2">입금대기</h5>
              <span>
                총 <span className="tx-blue80">{depositTotalcnt}</span>건 (입금액 {setComma(depositTotalpayamt)}원)
              </span>
            </div>
            <ul className="m-toggle-list up-blue">
              <MenuItem>
                <MenuTitle>꼭 알아두세요!</MenuTitle>
                <MenuCont>
                  <div className="essential-point tx-black">
                    <ul>
                      <li>
                        <i className="ico-dot" />
                        입금대기 내역은 무통장 결제 시 입금확인이 되지 않은 내역입니다.
                      </li>
                      <li>
                        <i className="ico-dot" />
                        입금확인이 되면 바로 결제내역으로 자동 이동되며, 입금예정일이 지난 내역은 자동 삭제됩니다.
                      </li>
                    </ul>
                  </div>
                </MenuCont>
              </MenuItem>
            </ul>
            <ul className="pay-tx-list">
              {depositWaitingList?.length ? (
                depositWaitingList.map((depositWaiting, i) => (
                  <li key={i}>
                    <div className="float-wrap">
                      <p className="fl">{depositWaiting?.prdNm}</p>
                      {depositWaiting?.odrTrnCd === '0010' && (
                        <Button size="sml" line="gray" color="gray" radius={true} title="취소" width={39} height={30} fontSize={12} fontWeight={500} onClick={(e) => cancel(e, depositWaiting)} />
                      )}
                    </div>
                    <ul>
                      <li>
                        <span>거래 일시</span>
                        {depositWaiting?.regDt}
                      </li>
                      <li className="tx-blue80">
                        <span>입금 상태</span>
                        {depositWaiting?.odrTrnNm}
                      </li>
                      <li>
                        <span>결제 계좌</span>
                        {depositWaiting?.vactBankCdNm} {depositWaiting?.odrNum}
                      </li>
                      <li className="tx-b">
                        <span>입금 금액</span>
                        {setComma(depositWaiting?.payAmt)}원
                      </li>
                    </ul>
                  </li>
                ))
              ) : (
                <li>
                  <div className="float-wrap">
                    <p className="fl">입금대기 내역이 없습니다.</p>
                  </div>
                </li>
              )}
            </ul>
            {isNeedMoreButton && isLoading && (
              <div className="more-loading">
                <PulseLoader size={15} color={'#ddd'} loading={isLoading} />
              </div>
            )}
            {isNeedMoreButton && !isLoading && (
              <Buttons align="center" marginTop={8}>
                <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} lineHeight={40} fontSize={14} onClick={handleShowMore} />
              </Buttons>
            )}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="deposit-tx-list">
        <p className="inquire-num">
          입금대기건 수 : 총 {depositTotalcnt}건 (입금액 {setComma(depositTotalpayamt)}원)
        </p>
        <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
          <caption className="away">결제내역</caption>
          <colgroup>
            <col width="12%" />
            <col width="12%" />
            <col width="20%" />
            <col width="21%" />
            <col width="21%" />
            <col width="14%" />
          </colgroup>
          <thead>
            <tr>
              <th>결제요청일</th>
              <th>입금액</th>
              <th>은행명</th>
              <th>계좌번호</th>
              <th>결제내용</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {
              depositWaitingList?.length ?
                depositWaitingList.map((depositWaiting,i) =>
                  <tr key={i}>
                    <td>{depositWaiting?.regDt}</td>
                    <td>{setComma(depositWaiting?.payAmt)}</td>
                    <td>{depositWaiting?.vactBankCdNm}</td>
                    <td>{depositWaiting?.vactNum}</td>
                    <td>{depositWaiting?.prdNm}</td>
                    <td className="td-btn-fr">
                      <span className="tx">{depositWaiting?.odrTrnNm}</span>
                      {
                        depositWaiting?.odrTrnCd === '0010' &&
                        <Button
                          size="sml"
                          line="gray"
                          color="black"
                          radius={true}
                          title="취소"
                          width={44}
                          marginLeft={6}
                          onClick={(e) => cancel(e, depositWaiting)}
                          buttonMarkup={true}
                        />
                      }
                    </td>
                  </tr>
                )
              :
                <tr className="list-none">
                  <td colSpan="6">입금대기 내역이 없습니다.</td>
                </tr>
            }
          </tbody>
        </table>
        <PageNavigator
          recordCount={depositTotalcnt}
          recordSize={parseInt(viewPageCnt)}
          className="mt32"
          currentPage={parseInt(currentPage)}
          changed={(e, currentPage) =>
            eventHandler({
              currentPage
            })
          }
        />
      </div>

      <div className="essential-point">
        <p>꼭 알아두세요!</p>
        <ul>
          <li>
            <i className="ico-dot mid"></i> 입금대기 내역은 무통장 결제 시 입금확인이 되지 않은 내역입니다.
          </li>
          <li>
            <i className="ico-dot mid"></i> 입금확인이 되면 바로 결제내역으로 자동 이동되며, 입금예정일이 지난 내역은 자동 삭제됩니다.
          </li>
        </ul>
      </div>
    </>
  );
};
export default tabDepositWaiting;
