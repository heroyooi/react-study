/**
 * 설명 : 차량 판매 후기 관리 등록/수엊
 * @fileoverview 마이페이지(딜러)>회원정보관리>차량판매 후기 등록/수정
 * @requires [sellcarEpilogueAction,sellcarEpilogue]
 * @author 김지현
 */

import React, { memo, useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import produce from 'immer';

import { isEmpty } from 'lodash';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';

import InputPicture from '@lib/share/items/InputPicture';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import CarPictureApply from '@src/components/common/CarPictureApply';

import { getEpilogueList, getEpilogueInfo, saveEpilogueInfo, editEpilogueInfo, deleteEpilogueInfo } from '@src/actions/mypage/dealer/sellcarEpilogueAction';
import { aixosUpFile, imgUrl } from '@src/utils/HttpUtils';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { SystemContext } from '@src/provider/SystemProvider';
import { gInfoLive } from '@src/utils/LoginUtils';

const sellcarEpilogueInfo = memo((props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량 판매 후기',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert, initAlert } = useContext(SystemContext);
  const slPsId = props.router.query.slPsId;

  const myEpilogue = useSelector((state) => state.epliogue.epilogueInfo);
  const result = useSelector((state) => state.epliogue.result);
  // 변경할 필드
  const [inputs, setInputs] = useState({
    ttlNm: '', // 제목
    crNm: '', // 차량명
    psCntn: undefined, // 후기내용
    //   mbCar1FileId : ''
    phPhtId1: null,
    phPhtId2: null,
    phPhtId3: null,
    phPhtId4: null
  });

  const { ttlNm, crNm, psCntn, phPhtId1, phPhtId2, phPhtId3, phPhtId4 } = inputs;

  const [registerPop, setRegisterPop, openRegisterPop, closeDimmRegisterPop] = useRodal(false);
  const [updatePop, setUpdatePop, openUpdatePop, closeDimmUpdatePop] = useRodal(false);
  const [deletePop, setDeletePop, openDeletePop, closeDimmDeletePop] = useRodal(false);
  const [delCompletePop, setDelCompletePop, openDelCompletePop, closeDimmDelCompletePop] = useRodal(false);

  const onChangeText = (e) => {
    const { value, name } = e.target;
    setInputs(
      produce((draft) => {
        draft[name] = value;
      })
    );
  };

  /*
  useEffect(() => {
    console.log(result);
    if(!isEmpty(result)) {
      if(result.statusinfo.returncd ==="000"){
        showAlert("저장되었습니다.");
      }
    }
  }, [result]);
  */
  useEffect(() => {
    if (!isEmpty(slPsId)) {
      dispatch(getEpilogueInfo({ slPsId: slPsId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slPsId]);

  useEffect(() => {
    if (!isEmpty(myEpilogue)) {
      setInputs({
        ttlNm: myEpilogue.ttlNm, // 제목
        crNm: myEpilogue.crNm, // 차량명
        psCntn: myEpilogue.psCntn, // 후기내용
        phPhtId1: myEpilogue.phPhtId1,
        phPhtId2: myEpilogue.phPhtId2,
        phPhtId3: myEpilogue.phPhtId3,
        phPhtId4: myEpilogue.phPhtId4
      });
    } else {
      setInputs({
        ttlNm: '', // 제목
        crNm: '', // 차량명
        psCntn: '', // 후기내용
        phPhtId1: '',
        phPhtId2: '',
        phPhtId3: '',
        phPhtId4: ''
      });
    }
  }, [myEpilogue]);

  const submitAfterRefresh = useCallback(
    async (data, type) => {
      switch (type) {
        case 'ins':
          await dispatch(saveEpilogueInfo(data));
          break;
        case 'upd':
          await dispatch(editEpilogueInfo(data));
          break;
        case 'del':
          await dispatch(deleteEpilogueInfo(data));
          break;
      }
      dispatch(getEpilogueList({ currentPage: 1, recordSize: 30, userId: gInfoLive().id }));
    },
    [dispatch]
  );

  const onDel = useCallback(
    (e) => {
      e.preventDefault();
      const data = Object.assign({ slPsId: slPsId }, inputs);
      submitAfterRefresh(data, 'del');
      if (hasMobile) {
        setDeletePop(false);
        openDelCompletePop(e, 'fade');
      } else {
        showAlert('삭제되었습니다.', () => {
          Router.push('/mypage/dealer/selfsell/sellcarEpilogue').then(() => {
            window.scrollTo(0, 0);
          });
        });
        //window.location.href = '/mypage/dealer/selfsell/sellcarEpilogue';
      }
    },
    [hasMobile, inputs, openDelCompletePop, setDeletePop, showAlert, slPsId, submitAfterRefresh]
  );

  const onUpdate = useCallback(
    (e) => {
      e.preventDefault();
      //setRodalShow(true);
      const data = Object.assign({ slPsId: slPsId }, inputs);
      submitAfterRefresh(data, 'upd');
      if (hasMobile) {
        openUpdatePop(e, 'fade');
      } else {
        showAlert('저장되었습니다.', () => {
          Router.push('/mypage/dealer/selfsell/sellcarEpilogue').then(() => {
            window.scrollTo(0, 0);
          });
        });
      }
    },
    [slPsId, inputs, submitAfterRefresh, hasMobile, openUpdatePop, showAlert]
  );

  const onSave = useCallback(
    (e) => {
      e.preventDefault();
      //setRodalShow(true);
      submitAfterRefresh(inputs, 'ins');
      if (hasMobile) {
        openRegisterPop(e, 'fade');
      } else {
        showAlert('저장되었습니다.', () => {
          Router.push('/mypage/dealer/selfsell/sellcarEpilogue').then(() => {
            window.scrollTo(0, 0);
          });
        });
      }
    },
    [hasMobile, inputs, openRegisterPop, showAlert, submitAfterRefresh]
  );

  const onChangeImg = (e, target) => {
    const formDatas = new FormData();
    formDatas.append('files', e);
    formDatas.append('isSelect', true);
    formDatas.append('subFolderName', 'carsell');

    aixosUpFile(`/api/cmm/file/uploadImageVO.do`, formDatas)
      .then(({ data }) => {
        if (data && data.data && data.data.lengt > 0) {
          setInputs(
            produce((draft) => {
              draft[target] = data.data[0].fileId;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCancel = (e) => {
    e.preventDefault();
    window.location.href = '/mypage/dealer/selfsell/sellcarEpilogue';
  };

  // 모바일
  const closeDeletePop = useCallback(
    (e) => {
      e.preventDefault();
      setDeletePop(false);
    },
    [setDeletePop]
  );

  // 후기등록 input값중 이미지 항목만 추출하여 inputPic에서 요구하는 형태의 값 생성
  const getMobilePhotoList = useCallback((inputList) => {
    let imageList = [
      { name: 'phPhtId1', sortNo: '1' },
      { name: 'phPhtId2', sortNo: '2' },
      { name: 'phPhtId3', sortNo: '3' },
      { name: 'phPhtId4', sortNo: '4' }
    ];

    if (inputList) {
      Object.entries(inputList).map((entry) => {
        const [key, value] = entry;
        const imgObj = key.match(/(phPhtNm)(\d+)/);
        if (imgObj) {
          imageList = Object.assign(imageList, [
            {
              name: 'phPhtId' + imgObj[2],
              sortNo: imgObj[2],
              phtUrl: '/picture/carsell/' + value
            }
          ]);
        }
      });
    }
    return imageList;
  }, []);

  // 이미지 삭제시 callback 함수
  const photoDeleteOfList = (checked) => {
    // 삭제할 이미지 정보를 파라메터로 전달받음
    // 삭제 API 추가에 대비하여 이벤트 추가
    console.log('===> Checked Photo', checked);
  };

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap">
          <div className="mypage-state-sec member-review mt20">
            <table summary="차량판매 후기 등록에 대한 내용" className="table-tp2 th-none">
              <caption className="away">차량판매 후기 등록</caption>
              <tbody>
                <tr>
                  <td>
                    <p className="tx-tit">제목</p>
                    <Textarea countLimit={50} type="tp1" name="ttlNm" height={50} placeHolder="제목을 입력해주세요" disabledEnter={true} data={ttlNm} onChange={onChangeText} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">차량명</p>
                    <Textarea countLimit={50} type="tp1" name="crNm" height={50} placeHolder="차량명을 입력해주세요" disabledEnter={true} data={crNm} onChange={onChangeText} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">후기내용</p>
                    <Textarea countLimit={500} type="tp1" name="psCntn" height={133} placeHolder="내용을 입력해주세요" data={psCntn} onChange={onChangeText} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="tx-tit">사진등록</p>
                    <CarPictureApply
                      mode="basic"
                      photoList={getMobilePhotoList(myEpilogue)}
                      handleDeletePhotoOfList={photoDeleteOfList}
                      onChange={(e, tempf) => {
                        onChangeImg(tempf, e.target.name);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Buttons align="center" className="full fixed">
          {/* 등록 시 버튼 */}
          {isEmpty(myEpilogue) && (
            <>
              <Button size="big" background="blue20" color="blue80" title="취소" onClick={onCancel} />
              <Button size="big" background="blue80" title="등록" onClick={onSave} />
            </>
          )}
          {/* 수정 시 버튼 */}
          {!isEmpty(myEpilogue) && (
            <>
              <Button size="big" background="blue20" color="blue80" title="삭제" onClick={(e) => openDeletePop(e, 'fade')} />
              <Button size="big" background="blue80" title="등록" onClick={onUpdate} />
            </>
          )}
        </Buttons>

        <RodalPopup show={registerPop} type={'fade'} closedHandler={closeDimmRegisterPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            {/* 등록 시 팝업 */}
            <p>등록 되었습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" href="/mypage/dealer/selfsell/sellcarEpilogue" nextLink={true} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={updatePop} type={'fade'} closedHandler={closeDimmUpdatePop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            {/* 수정 시 팝업 */}
            <p>수정 되었습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" href="/mypage/dealer/selfsell/sellcarEpilogue" nextLink={true} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={deletePop} type={'fade'} closedHandler={closeDimmDeletePop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            {/* 삭제 버튼 클릭 시 */}
            <p>삭제하시겠습니까?</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeDeletePop} />
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" marginLeft={16} onClick={onDel} />
            </Buttons>
          </div>
        </RodalPopup>

        <RodalPopup show={delCompletePop} type={'fade'} closedHandler={closeDimmDelCompletePop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            {/* 삭제 팝업 > 확인 버튼 클릭 시 */}
            <p>삭제되었습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" href="/mypage/dealer/selfsell/sellcarEpilogue" nextLink={true} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec member-review">
          <div className="mypage-admin-title">
            <h3>차량 판매 후기</h3>
          </div>

          <table summary="차량 판매 후기 등록" className="table-tp1 input">
            <caption className="away">차량 판매 후기 등록</caption>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th>
                  제목<span className="essential">*</span>
                </th>
                <td>
                  <Input type="text" placeHolder="제목을 입력해주세요." width="100%" height={40} name="ttlNm" value={ttlNm} onChange={onChangeText} />
                </td>
              </tr>
              <tr>
                <th>
                  차량명<span className="essential">*</span>
                </th>
                <td>
                  <Input type="text" placeHolder="차량명은 입력해주세요." width="100%" height={40} name="crNm" value={crNm} onChange={onChangeText} />
                </td>
              </tr>
              <tr>
                <th>
                  후기내용<span className="essential">*</span>
                </th>
                <td>
                  <Textarea countLimit={500} type="tp2" placeHolder="내용을 입력해주세요." name="psCntn" data={psCntn} onChange={onChangeText} isSelf={false} />
                </td>
              </tr>
              <tr>
                <th>
                  사진등록<span className="essential">*</span>
                </th>
                <td>
                  <InputPicture initImg={!isEmpty(myEpilogue) ? imgUrl + '/picture/carsell/' + myEpilogue.phPhtNm1 : ''} onChange={(e) => onChangeImg(e, 'phPhtId1')} />
                  &nbsp;
                  <InputPicture initImg={!isEmpty(myEpilogue) ? imgUrl + '/picture/carsell/' + myEpilogue.phPhtNm2 : ''} onChange={(e) => onChangeImg(e, 'phPhtId2')} />
                  &nbsp;
                  <InputPicture initImg={!isEmpty(myEpilogue) ? imgUrl + '/picture/carsell/' + myEpilogue.phPhtNm3 : ''} onChange={(e) => onChangeImg(e, 'phPhtId3')} />
                  &nbsp;
                  <InputPicture initImg={!isEmpty(myEpilogue) ? imgUrl + '/picture/carsell/' + myEpilogue.phPhtNm4 : ''} onChange={(e) => onChangeImg(e, 'phPhtId4')} />
                </td>
              </tr>
            </tbody>
          </table>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={onCancel} />
            {!isEmpty(myEpilogue) && (
              <>
                <Button size="big" background="gray" title="삭제" width={130} height={48} onClick={onDel} />
                <Button size="big" background="blue80" title="수정완료" width={130} height={48} onClick={onUpdate} />
              </>
            )}
            {isEmpty(myEpilogue) && <Button size="big" background="blue80" title="등록완료" width={130} height={48} onClick={onSave} /*onClick={(e) => rodalPopupHandler(e, "fade")} */ />}
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
});

sellcarEpilogueInfo.displayName = 'sellcarEpilogueInfo';
export default withRouter(sellcarEpilogueInfo);
