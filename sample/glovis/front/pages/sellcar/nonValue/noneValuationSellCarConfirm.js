/**
 * 설명 : 셀프 판매 서비스 신청 결과 확인
 * @fileoverview 셀프 판매 서비스 신청 결과 확인 화면
 * @author 최승희
 * @requires CarBasicInfoEditor
 * @requires CarOptionsEditor
 * @requires CarAddOptionsEditor
 * @requires CarDetailInfoEditor
 * @requires CarSellerInfoEditor
 * @requires CarPhotoList
 */
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';
import PropTypes from 'prop-types';

import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import RenderHelper from '@lib/share/render/helper';

import AppLayout from '@src/components/layouts/AppLayout';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor.js';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor.js';
// import CarAddOptionsEditor from '@src/components/sellcar/self/CarAddOptionsEditor.js';
// import CarDetailInfoEditor from '@src/components/sellcar/self/CarDetailInfoEditor.js';
import CarSellerInfoEditor from '@src/components/sellcar/self/CarSellerInfoEditor.js';
import CarSpecificsEditor from '@src/components/sellcar/self/CarSpecificsEditor.js';
import CarPictureApply from '@src/components/common/CarPictureApplyPc';
import { mainPhotoList, subPhotoList } from '@src/constant/sellcar/carPhotoOptions';
import { SystemContext } from '@src/provider/SystemProvider';
import { updateRequestComplete } from '@src/api/sellcar/NonevalSellcarApi';
import { isLogin, gInfo, UserType } from '@src/utils/LoginUtils';
import { isAllowedUserType } from '@src/utils/sellcar/AuthUtil';
import { getReqAction } from '@src/actions/sellcar/sellCarAction';
import AutobellAppDownload from '@src/components/sellcar/self/sub/AutobellAppDownload';

const nextPage = `/sellcar/nonValue/noneValuationSellCarComplete`;
const prevPage = `/sellcar/nonValue/noneValuationSellCarPicture`;

/**
 * 셀프 판매 서비스 신청 결과 확인
 * @returns {selfSellCarConfirm}
 */
const NoneValuationSellCarComplete = ({ query }) => {
  console.log('query:', query);
  const dispatch = useDispatch();
  const { seller, car } = useSelector((rootStore) => rootStore.sellCarStore);
  const [displayAppDownPop, setDisplayAppDownPop, showAppDownPop, hideAppDownPop] = useRodal(false, true);
  const { showAlert, showConfirm, initAlert, initConfirm } = useContext(SystemContext);

  const goNextStep = (e) => {
    showConfirm('신청완료 후에는 수정이 불가능 합니다.<br/>위의 정보로 신청 완료하시겠습니까?', () => {
      updateRequestComplete(seller).then((res) => {
        Router.push(nextPage + '?' + qs.stringify(query.slReqId)).then(() => {
          window.scrollTo(0, 0);
        });
      });
    });
  };

  useEffect(() => {
    if (!isLogin()) Router.back(); // 로그인되어있지 않으면 이전 페이지로 돌아감
    if (!isAllowedUserType()) {
      showAlert('일반 회원만 이용 가능합니다.', () => {
        location.href = '/main';
      });
    }
    dispatch(getReqAction(encodeURI(query.slReqId)));
  }, []);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>신청 내용 확인</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps type={2} contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인', '신청 완료']} active={4} />
        </div>
      </div>
      <div className="content-wrap sell-register-wrap">
        <form className="register-form">
          <fieldset>
            <legend className="away">차량 정보 조회</legend>
            <div className="mb33">
              <CarBasicInfoEditor item={car} noneValuaction={true} />
              {/* 수정 */}
              <CarOptionsEditor items={car?.optionList} />
              {/* <CarAddOptionsEditor items={car.optionList} item={car} /> */}
              {/* 삭제 */}
              <CarSpecificsEditor items={car.optionList} item={car} />
              {/* 추가 */}
              {/* <CarDetailInfoEditor item={car} /> */}
              <CarSellerInfoEditor item={seller} viewAddress={true} viewAccountNo={true} viewResidence={false} nameEdit={false} />
            </div>
            <div className="img-upload main mt0">
              <h4 className="mb33">대표 사진 등록</h4>
              <div className="app-down">
                <i className="ico-app-blue" />
                <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => showAppDownPop(e, 'fade')} />
              </div>
              <CarPictureApply options={mainPhotoList} items={car.photoList} name="sortNo" disabled={true} />
            </div>
            <div className="img-upload detail">
              <h4 className="mb33">상세 사진 등록</h4>
              <p>옵션, 하자 부분이 잘 나오게 등록하시면 더 정확한 견적을 받으실 수 있습니다.</p>
              <CarPictureApply options={subPhotoList} items={car.photoList} name="sortNo" disabled={true} />
            </div>
          </fieldset>
        </form>
        <Buttons marginTop={48}>
          <span className="step-btn-l">
            <Button
              size="big"
              background="gray"
              title="이전 단계(차량 사진 등록)"
              width={249}
              height={60}
              buttonMarkup={true}
              onClick={() =>
                showConfirm('이전 단계로 이동하시겠습니까?', () => {
                  location.href = `${prevPage}?slReqId=${query.slReqId}`;
                })
              }
            />
          </span>
          <span className="step-btn-r">
            <Button size="big" background="blue80" title="신청하기" width={173} height={60} buttonMarkup={true} onClick={goNextStep} />
          </span>
        </Buttons>
      </div>
      <RodalPopup show={displayAppDownPop} type={'fade'} closedHandler={hideAppDownPop} mode="normal" size="xs" className="today-banner sml">
        <AutobellAppDownload />
      </RodalPopup>
    </AppLayout>
  );
};

NoneValuationSellCarComplete.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { slReqId } = query;
  if (slReqId) {
    console.log('신청서정보 가져오기');
    await helper.dispatch(getReqAction(slReqId));
  }

  return {
    query
  };
};

NoneValuationSellCarComplete.propTypes = {
  query: PropTypes.object
};

export default NoneValuationSellCarComplete;
