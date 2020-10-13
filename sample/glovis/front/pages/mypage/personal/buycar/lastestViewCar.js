import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import { getLastViewList } from '@src/actions/mypage/personal/buycar/buycarActions';
import MypageCompare from '@src/components/common/popup/MypageCompare';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import { numberFormat } from '@src/utils/CommonUtil';
import RadioGroup from '@lib/share/items/RadioGroup';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost, imgUrl as baseURL } from '@src/utils/HttpUtils';
import PricingToPrintButton from '@src/components/pricingSystem/pricingToPrintButton';

const LastestViewCar = () => {
  const dispatch = useDispatch();
  let printRef = React.createRef();

  // 팝업
  const [deleteShow, setDeleteShow, deletePopupHandler, deleteCloseHandler] = useRodal(false, true);
  const [comparisonShow, setComparisonShow, comparisonPopupHandler, comparisonCloseHandler] = useRodal(false, true);
  const [attentionShow, setAttentionShow, attentionPopupHandler, attentionCloseHandler] = useRodal(false, true);
  const [withoutList, setWithoutList] = useState(true);
  const [checkall, setCheckall] = useState(false);
  const [checkData, setCheckData] = useState({});
  const [targetData, setTargetData] = useState([]);
  const { lastViewList, recentNowCount, recentTotalCount } = useSelector((rootStore) => rootStore.personalPage);
  const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [itemCount, setItemCount] = useState(5);

  // 목록 더보기
  const [listData, setListData] = useState([]);
  console.log("recentTotalCount -> recentTotalCount", recentTotalCount);
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    console.log('loading');
    const param = {
      pageNo: 1
    };
    dispatch(getLastViewList(param));
  }, [dispatch]);

  useEffect(() => {
    if (typeof lastViewList !== 'undefined' && lastViewList.length > 0) {
      setWithoutList(false);
      const count = recentTotalCount < 5 ? recentTotalCount : 5;
      setListData([]);
      for (let i = 0; i < count; i++) {
        setListData(
          produce((draft) => {
            draft.push(lastViewList[i]);
          })
        );
      }
      setItemCount(recentNowCount);
    } else {
      setWithoutList(true);
    }
  }, [lastViewList]);

  const handleListMore = (e) => {
    e.preventDefault();

    let nextPage = itemCount + 5;

    console.log('nextPage : ' + nextPage + ', itemCount :' + itemCount);
    if (nextPage > recentTotalCount) {
      nextPage = recentTotalCount;
    }

    if (itemCount < recentTotalCount && nextPage > itemCount) {

      for (let i = itemCount; i < nextPage; i++) {
        setListData(
          produce((draft) => {
            draft.push(lastViewList[i]);
          })
        );
      }
      setItemCount(nextPage);
    }
  };

  const handleCheckChange = useCallback((e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setCheckall(false);
    setCheckData(
      produce((draft) => {
        draft[name] = checked;
      })
    );

    if (checked) {
      setTargetData(
        produce((draft) => {
          draft.push(name);
        })
      );
    } else {
      setTargetData(
        produce((draft) => {
          draft.splice(draft.indexOf(name), 1);
        })
      );
    }
  }, []);
  const onClickAll = (e) => {
    const bool = e.target.checked;
    setCheckall(bool);
    setCheckData(
      produce((draft) => {
        listData.map((data) => {
          draft[String(data.dlrPrdId)] = bool;
        });
      })
    );

    setTargetData([]);

    if (bool) {
      setTargetData(
        produce((draft) => {
          listData.map((data) => {
            draft.push(data.dlrPrdId);
          });
        })
      );
    }
  };

  const handleOneDelete = (e, idx) => {
    console.log(idx);
    e.preventDefault();

    //체크박스 풀기
    setCheckall(false);

    setCheckData(
      produce((draft) => {
        listData.map((data) => {
          draft[String(data.dlrPrdId)] = false;
        });
      })
    );

    //한개씩 지우는거라 기존 지우기는 해제
    setTargetData([]);

    setTargetData(
      produce((draft) => {
        draft.push(idx);
      })
    );

    deletePopupHandler(e, 'fade');
  };

  const deleteSelectedCar = (e) => {
    e.preventDefault();
    if (targetData.length < 1) {
      showAlert('삭제할 차량을 선택해주세요');
      return false;
    }

    deletePopupHandler(e, 'fade');
  };

  const handleDeleteAction = (e) => {
    deleteCloseHandler(e, 'fade');
    setDeleteShow(false);
    deleteRecentlyCar();
  };

  const deleteRecentlyCar = () => {
    const param = {
      prdNums: targetData.join(',')
    };

    axiosPost(`/api/mypage/user/deleteRecentlyCar.do`, param).then((res) => {
      console.log(res.data.data);

      const result = Number(res.data.data);

      if (result > 0) {
        showAlert('삭제되었습니다.');

        //삭제된 뒤에는 체크 리스트 해제
        setTargetData([]);

        const param = {
          pageNo: 1
        };

        dispatch(getLastViewList(param));
      } else {
        showAlert('삭제에 실패하였습니다.');
        return false;
      }
    });
  };

  const handleDeleteCancel = (e) => {
    deleteCloseHandler(e);
    setDeleteShow(false);
  };

  const onChangeOrderBy = (e) => {
    const { value } = e.target;
    console.log(value);
    let orderBy = 'price';

    if (value == 1) {
      orderBy = 'price';
    } else {
      orderBy = 'date';
    }

    const searchParam = {
      pageNo: 1,
      order: orderBy
    };

    dispatch(getLastViewList(searchParam));
  };

  const testPrint = (e) => {
    e.preventDefault();
    const trigger = document.getElementById('trigger');
    trigger.click();
  };

  const compareCar = (e) => {
    e.preventDefault();

    console.log(targetData);
    if (targetData.length < 2) {
      showAlert('비교하실차량을 2개이상 선택해주세요(최대4개)');
      return false;
    } else if (targetData.length > 4) {
      showAlert('비교하실 차량은 최대4개까지 선택가능합니다.');
      return false;
    }

    const param = {
      prdNums: targetData.join(',')
    };

    axiosPost(`/api/mypage/user/selectCompareCarList.do`, param).then((res) => {
      console.log(res.data.data);
      setCompareData(res.data.data);
      setComparisonShow(true);
    });

    //
  };

  const addInterestCar = (e) => {
    e.preventDefault();
    if (targetData.length < 1) {
      showAlert('차량을 선택해주세요');
      return false;
    }

    const param = {
      prdNums: targetData.join(',')
    };

    axiosPost(`api/mypage/user/insertInterestCar.do`, param).then((res) => {
      console.log(res.data.data);
      const result = Number(res.data.data);

      if (result === 99) {
        showAlert('이미 관심차량으로 등록된 차량이 있습니다.');
        return false;
      }
      if (result === 1) {
        setAttentionShow(true);
      } else {
        showAlert('관심차량 등록이 실패하였습니다. 관리자에게 문의바랍니다.');
      }
    });

    //attentionPopupHandler(e, 'fade')
  };

  const closeAttetionHandler = (e) => {
    e.preventDefault();

    setCheckall(false);
    setCheckData(
      produce((draft) => {
        listData.map((data) => {
          draft[String(data.dlrPrdId)] = false;
        });
      })
    );

    setAttentionShow(false);
  }

  const linkDetailCar = (e, data) => {
    e.preventDefault();
    console.log('onclick');
    console.log(data);
    if (data.sttDvNm === '0060') {
      showAlert('해당차량은 판매종료 되었습니다.');
    } else  if (data.sttDvNm === '0050' || data.sttDvNm === '0090' || data.sttDvNm === '0070') {
      showAlert('해당차량은 광고 종료 되었습니다.');
    } else {
      Router.push('/buycar/buyCarDetailType?dlrPrdId='+ data.dlrPrdId);
    }
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-buy-sec">
          <div className="mypage-admin-title">
            <h3>최근 본 차량</h3>
            <p className="tx-exp-tp5">&#8251; 최근 3개월간 관심차량으로 등록한 차량의 정보입니다.</p>
            <p className="tx-exp-tp5">&#8251; 판매완료/삭제/관심등록 3개월 이전 차량은 자동 삭제됩니다.</p>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <Button size="mid" line="gray" radius={true} title="선택한 차량 비교" width={129} height={38} onClick={(e) => compareCar(e)} />

              <Button size="mid" line="gray" radius={true} title="선택한 차량 삭제" width={129} height={38} marginLeft={16} onClick={(e) => deleteSelectedCar(e)} />
              <Button size="mid" 비 line="gray" color="blue80" radius={true} title="선택한 차량을 관심차량으로 등록" width={222} height={38} marginLeft={16} onClick={(e) => addInterestCar(e)} />
              <RadioGroup
                className="sort-r"
                dataList={[
                  { id: 'sortUpload', value: 1, checked: true, disabled: false, title: '가격순' },
                  { id: 'sortPrice', value: 2, checked: true, disabled: false, title: '등록순' }
                ]}
                defaultValue={1}
                onChange={(e) => onChangeOrderBy(e)}
              />
            </div>
            <div className="admin-list tp7 chk">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="2%" />
                    <col width="51%" />
                    <col width="14%" />
                    <col width="14%" />
                    <col width="12%" />
                    <col width="7%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>
                        <CheckBox id="register-car-chk1" name="checkAll" onChange={onClickAll} checked={checkall} isSelf={false} />
                      </th>
                      <th>차량정보</th>
                      <th>가격</th>
                      <th>판매자</th>
                      <th>지역</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  {withoutList === false ? (
                    <tbody>
                      {!isEmpty(listData) &&
                        listData.map((v, i) => {
                          console.log(v);
                          return (
                            <tr key={v.dlrPrdId}>
                              <td>
                                <CheckBox id={'chk-' + v.dlrPrdId} name={String(v.dlrPrdId)} onChange={handleCheckChange} checked={checkData[String(v.dlrPrdId)]} isSelf={false} />
                              </td>
                              <td>
                                <a href="#" onClick={(e) => linkDetailCar(e, v)}>
                                  <ImgCover src={baseURL + v.phtUrl} alt={v.imgAlt} />
                                  <div className="summary max220">
                                    <h5 className="subject">{v.crNm}</h5>
                                    <ul className="info">
                                      <li>{v.crNo}</li>
                                      <li>{v.frmYyyy}</li>
                                    </ul>
                                    <ul className="info">
                                      <li>{v.fuelDvcd}</li>
                                      <li>{v.drvDistCnt} km</li>
                                    </ul>
                                  </div>
                                </a>
                              </td>
                              <td>
                                <p className="price-tp6">
                                  {numberFormat(v.slAmt)}
                                  <span className="won">만원</span>
                                </p>
                              </td>
                              <td className="seller">
                                {v.mbNm}
                                <br />
                                {v.mbHpPn}
                              </td>
                              <td>{v.mbAcLocNm}</td>
                              <td>
                                <button className="btn-close" onClick={(e) => handleOneDelete(e, v.dlrPrdId)} />
                              </td>
                            </tr>
                          );
                        })}
                      {recentNowCount < recentTotalCount && (
                        <tr className="more">
                          <td colSpan="6" className="more">
                            <div className="cate-list-btn2">
                              <button onClick={handleListMore}>
                                더보기({recentNowCount > recentTotalCount ? recentTotalCount : itemCount}/{recentTotalCount})
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  ) : (
                      <tbody>
                        <tr className="list-none">
                          <td colSpan="6">
                            최근 조회하신 차량이 없습니다.
                          <br />
                            <Button size="big" background="blue80" title="차량검색 하러 가기" width={245} height={60} marginTop={16} href="/buycar/buyCarList" />
                          </td>
                        </tr>
                      </tbody>
                    )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={comparisonShow} type={'slideUp'} closedHandler={comparisonCloseHandler} mode="normal" size="large">
        <PricingToPrintButton trigger={() => <a href="#" id="trigger"></a>} content={() => printRef} pageStyle="" />
        <div ref={(el) => (printRef = el)} id={'printDiv'}>
          <MypageCompare show={comparisonShow} onClickPrint={testPrint} compareList={compareData} />
        </div>
      </RodalPopup>

      <RodalPopup show={deleteShow} type={'slideUp'} closedHandler={deleteCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>차량을 삭제하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} onClick={(e) => handleDeleteCancel(e)} buttonMarkup={true} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={handleDeleteAction} buttonMarkup={true} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={attentionShow} type={'slideUp'} closedHandler={attentionCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>
            관심차량으로 등록되었습니다.
            <br />
            바로 확인하시겠습니까?
            <br />
            <span className="tx-blue80">[마이페이지>관심차량]에서 확인이 가능합니다.</span>
          </p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} buttonMarkup={true} onClick={(e) => closeAttetionHandler(e)} />
            <Button size="big" background="blue80" title="확인" width={130} href="/mypage/personal/buycar/interestCar" />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
};

export default withRouter(LastestViewCar);
