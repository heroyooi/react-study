import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
/*
  html 변경이력
  03.12 : 텍스트 변경 #a1
 
*/

const MypageTender = ({ isBidding = false, callback, closedHandler }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const createBodyPortal = useCreatePortalInBody(null, "wrap");

  const [modifyPop, setModifyPop, openModifyPop, closeDimmModifyPop] = useRodal(false);

  const closeModifyPop = useCallback((e) => {
    e.preventDefault();
    if (hasMobile){
      setModifyPop(false);
    }
    callback(e);
  }, []);

  if (hasMobile) {
    return (
      <>
      <div className="inner">
        <h3 className="tit1 mb24">입찰하기</h3>
        <p className="float-wrap mb8">
          <span className="fl">입찰가격</span>
          {isBidding === true && <span className="tx-red80 fs12">수정 1회</span>}
        </p>
        <Input type="text" placeHolder="3,800 만원" width='100%' height={50} />
        <ul className="tx-red80 mt10">
          <li className="fs12">&#8251; 견적 실수,찔러보기 식 낮은견적 주의</li>
          <li className="fs12 mt4">&#8251; 입찰가격 수정 3회 이용 제한 주의</li>
        </ul>
      </div>
      <Button className="fixed" size="full" background="blue80" title={isBidding === false ? '입찰하기' : '입찰가격 수정'} fontWeight="500" onClick={(e) => openModifyPop(e, "fade")} />

      {createBodyPortal(<>
      <RodalPopup show={modifyPop} type={'fade'} closedHandler={closeDimmModifyPop} isMask={true} isButton={false} subPop={false}>
        <div className="con-wrap">
          {isBidding === false ? 
            <p>입찰이 완료되었습니다.</p>:
            <p>입찰가격 수정이 완료되었습니다.</p>
          }
          <Buttons align="right" marginTop={24}>
            <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeModifyPop} />
          </Buttons>
        </div>
      </RodalPopup>
      </>)}
      </>
    )
  }
  return (
    <div className="con-wrap popup-tender pay">
      <form className="register-form">
        <fieldset className="tender-wrap">
          <legend className="away">{isBidding === false ? '입찰하기' : '입찰가격 수정'}</legend>
          <label htmlFor="tender-price" className="hide">
            입찰금액
          </label>
          {isBidding === false ? <Input type="number" id="tender-price" width={230} height={48} /> : <Input type="number" id="tender-price2" value="3,800" width={230} height={48} />}
          <em>만원</em>
          <p>
            견적 실수, 찔러보기 식 낮은 견적 주의
            <br />
            (반복 시 경고 및 이용 제한)
            <br />
            <span className="tx-red80">※ 입찰가격 수정 3회 이용 제한 주의</span>
          </p>{' '}
          {/* #a1 */}
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} onClick={e=>{e.preventDefault(); closedHandler(false);}} />
            <Button size="big" background="blue80" title="입찰완료" title={isBidding === false ? '입찰완료' : '수정'} width={127} />
          </Buttons>
        </fieldset>
      </form>
    </div>
  );
};

MypageTender.propTypes = {
  isBidding: PropTypes.bool,
  callback: PropTypes.func
};

export default MypageTender;
