/**
 * 설명 : 셀프 판매 서비스 차량 사진 등록
 * @fileoverview 셀프 판매 서비스 차량 사진 등록 화면
 * @author 최승희
 * @requires CarPhotoList
 */
import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import qs from 'qs';

import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { createValidator } from '@lib/share/validator';
import carPhotoSchema from '@lib/share/validator/sellcar/CarPhoto';
import RenderHelper from '@lib/share/render/helper';

import CarPictureApply from '@src/components/common/CarPictureApplyPc';
import AppLayout from '@src/components/layouts/AppLayout';
import AutobellAppDownload from '@src/components/sellcar/self/sub/AutobellAppDownload';

import { mainPhotoList, subPhotoList } from '@src/constant/sellcar/carPhotoOptions';

import { SystemContext } from '@src/provider/SystemProvider';
import { uploadCarPhoto } from '@src/api/sellcar/CommonSellcarApi';
import { getReqAction } from '@src/actions/sellcar/sellCarAction';
import { isLogin, gInfo, UserType } from '@src/utils/LoginUtils';
import { isAllowedUserType } from '@src/utils/sellcar/AuthUtil';
const nextPage = `/sellcar/nonValue/noneValuationSellCarConfirm`;
const prevPage = `/sellcar/nonValue/noneValuationSellCarInfo`;

/**
 * 셀프 판매 서비스 차량 사진 등록
 * @returns {selfSellCarInfo}
 */
const NoneValuationSellCarPicture = ({ query }) => {
  const formRef = useRef(null); // For new
  const { showAlert, showConfirm } = useContext(SystemContext);
  const { seller, car } = useSelector((rootStore) => rootStore.sellCarStore);
  const { crId, photoList } = car; // for new
  const { slReqId } = query;

  const [displayAppDownPop, setDisplayAppDownPop, showAppDownPop, hideAppDownPop] = useRodal(false, true);

  // for new
  const sendData = async (e) => {
    const formData = new FormData();
    const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file]'));
    formData.append('crId', crId);
    formData.append('crNo', car.crNo);
    formData.append('slReqId', slReqId);
    let uploadSize = 0;
    fileInputs.forEach((input) => {
      const file = input.files[0];
      if (file) {
        uploadSize++;
        formData.append('files', file, input.dataset.sortNo);
      }
    });

    if (uploadSize > 0) {
      return await uploadCarPhoto(formData)
        .then((res) => res?.data)
        .then((res) => {
          const { statusinfo } = res;
          if (statusinfo?.returncd === '000') {
            return true;
          }
          return false;
        })
        .catch(() => {
          return false;
        });
    } else {
      return true;
    }
  };

  const validate = async (e) => {
    // 대표 사진이 전부 등록되어야 함.
    const mustSavedSortNo = [1, 2, 3, 4, 5];
    const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file]'));
    const inputFileSortSet = [];
    fileInputs.forEach((i) => {
      if (i.files[0] !== undefined) {
        inputFileSortSet.push(parseInt(i.dataset.sortNo));
      }
    });
    const savedFilesSortSet = photoList.map((p) => p.sortNo);
    const mergedSortSet = inputFileSortSet.concat(savedFilesSortSet);
    let result = true;
    mustSavedSortNo.forEach((sortNo) => {
      if (!mergedSortSet.includes(sortNo)) {
        result = false;
      }
    });
    return result;
  };

  const tempSave = async (e) => {
    e.preventDefault();
    const result = await sendData();
    if (result) {
      showAlert(`임시저장 되었습니다.<br />입력하신 내용은 [마이페이지]에서 확인이 가능합니다.`);
    } else {
      showAlert(`임시저장이 실패했습니다.`);
    }
  };

  const goNextStep = async (e) => {
    e.preventDefault();
    const validSuccess = await validate();
    if (!validSuccess) {
      showAlert(`대표사진을 등록해주세요.`);
      return false;
    }
    showConfirm(`저장 후, 다음단계로 이동하시겠습니까?`, async () => {
      const result = await sendData();
      if (result) {
        showAlert(`저장이 완료되었습니다. 다음단계로 이동합니다.`, () => {
          Router.push(nextPage + '?' + qs.stringify({ slReqId })).then(() => {
            window.scrollTo(0, 0);
          });
        });
      }
    });
  };

  useEffect(() => {
    if (!isLogin()) Router.back(); // 로그인되어있지 않으면 이전 페이지로 돌아감
    if (!isAllowedUserType()) {
      showAlert('일반 회원만 이용 가능합니다.', () => {
        location.href = '/main';
      });
    }
  }, []);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>무평가 판매 Step3</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps type={2} contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인', '신청 완료']} active={3} />
        </div>
      </div>
      <div className="content-wrap sell-register-wrap">
        <form ref={formRef}>
          <div className="img-upload main mt0">
            <h4 className="mb33">대표 사진 등록</h4>
            <div className="app-down">
              <i className="ico-app-blue" />
              <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => showAppDownPop(e, 'fade')} />
            </div>
            <CarPictureApply options={mainPhotoList} items={photoList} name="sortNo" />
          </div>
          <div className="img-upload detail">
            <h4 className="mb33">상세 사진 등록</h4>
            <p>옵션, 하자 부분이 잘 나오게 등록하시면 더 정확한 견적을 받으실 수 있습니다.</p>
            <CarPictureApply options={subPhotoList} items={photoList} name="sortNo" />
          </div>
        </form>

        <Buttons marginTop={48}>
          <span className="step-btn-l">
            <Button
              size="big"
              background="gray"
              title="이전 단계(차량 정보 등록)"
              width={249}
              height={60}
              buttonMarkup={true}
              onClick={() => {
                showConfirm('이전 단계로 이동하시겠습니까?', () => {
                  Router.push(`/sellcar/nonValue/noneValuationSellCarInfo?slReqId=${slReqId}`);
                });
              }}
            />
          </span>
          <span className="step-btn-r">
            <Button size="big" background="gray" title="임시 저장" width={125} height={60} onClick={tempSave} buttonMarkup={true} />
            <Button size="big" background="blue80" title="다음 단계(신청 내용 확인)" width={239} height={60} onClick={goNextStep} buttonMarkup={true} />
          </span>
        </Buttons>
      </div>

      <RodalPopup show={displayAppDownPop} type={'fade'} closedHandler={hideAppDownPop} mode="normal" size="xs" className="today-banner sml">
        <AutobellAppDownload />
      </RodalPopup>
    </AppLayout>
  );
};

/**
 * @memberof module:selfSellCarPicture
 * @desc scheme object를 조합해서 데이터검증을 할 수 있게 도와주는 인스턴스 객체
 */
const carPhotoValidator = createValidator(carPhotoSchema);

NoneValuationSellCarPicture.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;
  const { slReqId } = query;
  if (slReqId) {
    // console.log('신청서정보 가져오기');
    await helper.dispatch(getReqAction(slReqId));
  }

  return {
    query
  };
};

NoneValuationSellCarPicture.propTypes = {
  query: PropTypes.object
};

export default NoneValuationSellCarPicture;
