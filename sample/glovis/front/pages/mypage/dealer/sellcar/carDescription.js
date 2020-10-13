import React, { memo, useState, useEffect, useContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { PulseLoader } from 'react-spinners';
import { axiosPost } from '@src/utils/HttpUtils';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import { SystemContext } from '@src/provider/SystemProvider';
import { getMyCommentList } from '@src/actions/mypage/dealer/carDescriptionAction';
import PageNavigator from '@src/components/common/PageNavigator';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

/**
 * 설명 : 나의 설명글 목록을 조회/삭제하고 등록페이지를 호출한다.
 * @param {state.carComment.myCommentList} 나의 설명글 목록
 * @returns {carDescription} 나의 설명글 목록
 */
const CarDescription = memo(({ query }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { myCommentList, currentPage, recordSize, recordCount } = useSelector((state) => state.carComment);
  const { pageNo = 1 } = query;
  const mobCurrentPage = useRef(1);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [selCmntNoArray, setSelCmntNoArray] = useState([]);
  const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
  const [mobMyCommentList, setMobMyCommentList] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const onChangeCheckboxAll = (e) => {
    if (e.target.checked) {
      setSelCmntNoArray(
        myCommentList.map((comment) => {
          return comment.prdCmntSno;
        })
      );
    } else {
      setSelCmntNoArray([]);
    }
    myCommentList.map((val, index) => {
      isChecked[index] = e.target.checked;
    });
    setIsChecked([...isChecked]);
    setIsCheckedAll(!isCheckedAll);
  };

  const onChangeCheckbox = (e) => {
    const idx = e.target.id.split('chk-my-ex')[1];

    if (e.target.checked) {
      setSelCmntNoArray([...selCmntNoArray, myCommentList[idx].prdCmntSno]);
    } else {
      selCmntNoArray.splice(selCmntNoArray.indexOf(myCommentList[idx].prdCmntSno), 1);
      setSelCmntNoArray([...selCmntNoArray]);
    }
    isChecked[idx] = !isChecked[idx];
    setIsChecked([...isChecked]);
  };

  const clickPageNavi = (e, clickedPageNo) => {
    const pageData = {
      pageNo: clickedPageNo,
      recordSize: recordSize
    };
    dispatch(getMyCommentList(pageData));
  };

  const clickDelBtn = () => {
    if (isEmpty(selCmntNoArray)) {
      showAlert('삭제할 대상을 선택해주세요', 'error');
      return;
    }
    if (!isEmpty(selCmntNoArray)) {
      showConfirm('삭제 하시겠습니까?', 'remove');
      return;
    }
  };

  const remove = () => {
    const urlParam = '/api/autobell/mypage/dealer/updateMyCarCommentDelete.do';
    const returnMessage = '삭제되었습니다.';

    axiosPost(urlParam, { CmntIDList: selCmntNoArray })
      .then(({ data }) => {
        console.log(data);
        if (data.result.returncd === '000') {
          showAlert(returnMessage, 'carDescription_remove');
          setIsCheckedAll(false);
          setIsChecked([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if ((mobCurrentPage.current - 1) * recordSize > mobMyCommentList.length) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지\
      setIsLoadingImage(true); // 로딩이미지 on
      mobCurrentPage.current++;
      clickPageNavi(mobCurrentPage.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFlag, mobMyCommentList, dispatch, mobCurrentPage]);

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
    },
    [initAlert, initConfirm]
  );

  useEffect(() => {
    dispatch(getMyCommentList({ pageNo, recordSize }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  useEffect(() => {
    if (Confirm.state === 'success') {
      if (Confirm.callback === 'remove') {
        remove();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Confirm]);

  useEffect(() => {
    if (Alert.state !== 'show' && Alert.callback === 'carDescription_remove') {
      Router.push(`/mypage/dealer/sellcar/carDescription?pageNo=${pageNo}`).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [Alert, pageNo]);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '나의 설명글 관리',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
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

  useEffect(() => {
    setLoadingFlag(true);
    if (myCommentList) {
      setMobMyCommentList(mobMyCommentList.concat(myCommentList));
    }
    setIsLoadingImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCommentList]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
  }, [hasMobile, onScroll, mobMyCommentList]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap my-ex-admin">
          <div className="mypage-admin-title">
            <p className="tx-exp-tp5">&#8251;[차량상세&gt;판매자의 차량 가이드] 에 노출됩니다.</p>
          </div>
          <div className="mypage-state-sec">
            <div className="float-wrap btn-xs mb20">
              <CheckBox id="chk-my-ex-all" title="전체선택" checked={isCheckedAll} onChange={onChangeCheckboxAll} />
              <div className="btn-wrap">
                <Button size="sml" line="gray" color="gray" radius={true} title="선택삭제" width={74} height={24} fontSize={10} fontWeight={500} buttonMarkup={true} onClick={clickDelBtn} />
                <Button
                  size="sml"
                  line="gray"
                  color="gray"
                  radius={true}
                  title="설명글 등록"
                  width={74}
                  height={24}
                  fontSize={10}
                  fontWeight={500}
                  marginLeft={8}
                  href={`/mypage/dealer/sellcar/registerCarDescription`}
                />
              </div>
            </div>
            <ul className="chk-list-wrap tp2">
              {(mobMyCommentList || []).map((comment, index) => {
                return (
                  <CheckBoxItem key={index} id={'chk-my-ex' + index} checked={isChecked[index]} onSelect={onChangeCheckbox}>
                    <p className="tit4">{comment.ttlCntn}</p>
                    <div className="info">
                      <span>등록일: {comment.regDt} </span>
                      <span>최종수정: {comment.updDt}</span>
                    </div>
                    <Link href={`/mypage/dealer/sellcar/carDescriptionView?prdCmntSno=${comment.prdCmntSno}`}>
                      <a />
                    </Link>
                  </CheckBoxItem>
                );
              })}
            </ul>
            {isLoadingImage === true ? (
              <div className="more-loading">
                <PulseLoader size={15} color={'#ddd'} loading={true} />
              </div>
            ) : null}
          </div>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap my-ex-admin">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>나의 설명글 관리</h3>
            <p>[차량상세&gt;판매자의 차량 가이드]에 노출됩니다.</p>
          </div>

          <div className="tx-list">
            <table summary="나의 설명글 관리" className="table-tp1 th-c td-c">
              <caption className="away">나의 설명글 관리</caption>
              <colgroup>
                <col width="6.5%" />
                <col width="68.5%" />
                <col width="25%" />
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <CheckBox id="chk-my-ex-all" checked={isCheckedAll} onChange={onChangeCheckboxAll} />
                  </th>
                  <th>제목</th>
                  <th>등록일(최종수정일)</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(myCommentList) &&
                  myCommentList.map((comment, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <CheckBox id={'chk-my-ex' + index} checked={isChecked[index]} onChange={onChangeCheckbox} />
                        </td>
                        <td>
                          <Link href={`/mypage/dealer/sellcar/carDescriptionView?prdCmntSno=${comment.prdCmntSno}`}>
                            <a>{comment.ttlCntn}</a>
                          </Link>
                        </td>
                        <td>
                          {comment.regDt}
                          {comment.regDt !== comment.updDt ? `(${comment.updDt})` : ''}
                        </td>
                      </tr>
                    );
                  })}
                {isEmpty(myCommentList) && (
                  <tr>
                    <td colSpan="3"> 아직 등록된 설명글이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Buttons marginTop={32}>
            <span className="step-btn-l">
              <Button size="big" background="gray" title="선택삭제" width={150} height={48} buttonMarkup={true} onClick={clickDelBtn} />
            </span>
            <PageNavigator currentPage={Number(pageNo)} recordCount={recordCount} recordSize={recordSize} changed={clickPageNavi} />
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="+ 설명글 등록" width={150} height={48} mode="normal" href={`/mypage/dealer/sellcar/registerCarDescription`} />
            </span>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
});

CarDescription.propTypes = {
  query: PropTypes.object
};

CarDescription.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  return {
    query
  };
};

CarDescription.displayName = 'CarDescription';
export default CarDescription;
