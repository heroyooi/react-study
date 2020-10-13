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
import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';

import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { createValidator } from '@lib/share/validator';
import carSchema from '@lib/share/validator/sellcar/Car';
import formSchema from '@lib/share/validator/sellcar/Form';
import RenderHelper from '@lib/share/render/helper';

import AppLayout from '@src/components/layouts/AppLayout';
import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor.js';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor.js';
import CarAddOptionsEditor from '@src/components/sellcar/self/CarAddOptionsEditor.js';
import CarDetailInfoEditor from '@src/components/sellcar/self/CarDetailInfoEditor.js';
import CarSellerInfoEditor from '@src/components/sellcar/self/CarSellerInfoEditor.js';
import CarPictureApply from '@src/components/common/CarPictureApplyPc';
// import { isAllowedUserType } from "@src/utils/sellcar/AuthUtil";
import { mainPhotoList, subPhotoList } from '@src/constant/sellcar/carPhotoOptions';

import { SystemContext } from '@src/provider/SystemProvider';
import { getReqAction } from '@src/actions/sellcar/sellCarAction';
import { updateRequestComplete } from '@src/api/sellcar/SelfSellcarApi';
import AutobellAppDownload from '@src/components/sellcar/self/sub/AutobellAppDownload';

const nextPage = `/sellcar/self/selfSellCarComplete`;
const prevPage = `/sellcar/self/selfSellCarPicture`;

const carValidator = createValidator({
  ...carSchema,
  ...formSchema
});

/**
 * 셀프 판매 서비스 신청 결과 확인
 * @returns {selfSellCarConfirm}
 */
const selfSellCarConfirm = ({ query }) => {
  // const dispatch = useDispatch();
  const { seller, car } = useSelector((rootStore) => rootStore.sellCarStore);
  const [displayAppDownPop, setDisplayAppDownPop, showAppDownPop, hideAppDownPop] = useRodal(false, true);
  const { showAlert, showConfirm } = useContext(SystemContext);

  /************************************* COMMON FUNCTION ****************************************************/

  const checkAccessAllowed = async () => {
    // 비회원 예약인데
    // 비회원 이름과 휴대전화번호가 스토어에 없으면 튕겨낸다.
    if (!isLogin() && (seller.nmbNm === undefined || seller.hpPn === undefined)) {
      showAlert('비회원 인증을 다시 요청드립니다.', () => {
        location.href = './selfSellCarGuide';
      });
    }
  };

  const goNextStep = (e) => {
    showConfirm('위의 정보로 신청 완료하시겠습니까?', () => {
      updateRequestComplete(seller).then((res) => {
        const { data, statusinfo } = res.data;
        console.log(data, statusinfo);
        if (statusinfo?.returncd === '000') {
          Router.push(nextPage).then(() => {
            window.scrollTo(0, 0);
          });
        } else {
          showAlert('저장중 에러가 발생했습니다.');
        }
      });
    });
  };

  useEffect(() => {}, []);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>
          <span className="stp">
            <b>비교견적</b>으로 내 차 팔기
          </span>
          Step 4
        </h3>
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
              <CarBasicInfoEditor item={car} isEditing={false} />
              <CarOptionsEditor items={car?.optionList} />
              <CarAddOptionsEditor items={car.optionList} item={car} />
              <CarDetailInfoEditor item={car} />
              <CarSellerInfoEditor item={seller} viewAddress={false} viewAccountNo={false} nameEdit={false} isEditing={false} />
            </div>

            <div className="img-upload main mt0">
              <h4 className="mb33">대표 사진 등록</h4>
              <div className="app-down">
                <i className="ico-app-blue"></i>
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

selfSellCarConfirm.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { slReqId } = query;
  if (slReqId) {
    await helper.dispatch(getReqAction(slReqId));
  }
  return { query };
};

export default selfSellCarConfirm;
