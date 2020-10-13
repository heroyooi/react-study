import React, { useState, useMemo, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import qs from 'qs';

import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import Radio from '@lib/share/items/Radio';

import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';

import { setComma, removeComma } from '@src/utils/StringUtil';
import { imgUrl, frontUrl } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';

import ProdCarSummary from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdCarSummary';
import { ProdStatusInfo } from '@src/constant/dealer/dealerProd';

import * as listActions from '@src/actions/mypage/dealer/dealerProdListAction';
import { preventScroll } from '@src/utils/CommonUtil';
import Router from 'next/router';

const extenablePrdList = [
  'AA01', //live studio
  'AA02', //live liveShot
  'AA03', //경매낙찰 이용권
  'AA04', //대당이용권
  'AC05' //자유이용권
];

// const updatePrdList = [
//   'AA06', //업데이트(대당)
//   'AB07', //업데이트(자유)
//   'AC07', //업데이트(자유) (장기결제)
// ]

const globalThis = require('globalthis')();

const ProdListItemA = ({ idx, item, mss, fuel, checked, checkItem, showPopEventHandler, extendPeriod, reloadListHandler }) => {
  const dispatch = useDispatch();

  const { showAlert, showConfirm, showLoader, hideLoader, initAlert, initConfirm } = useContext(SystemContext);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const createBodyPortal = useCreatePortalInBody();
  const { phtUrl = '' } = item?.car?.photoList[0];
  const prodStatus = useMemo(() => ProdStatusInfo[item?.sttDvcd] ?? {}, [item?.sttDvcd]);
  const { dlrPrdAdLstList = [], updatePassInfoList } = item;
  //console.log("ProdListItemA -> updatePassInfoList", updatePassInfoList)
  const adTitle = useMemo(() => dlrPrdAdLstList?.map((ad) => ad?.prdNm).join(', ') ?? '', [item?.dlrPrdAdLstList]);
  const extenablePrd = useMemo(() => dlrPrdAdLstList.find((item) => extenablePrdList.includes(item.prdDvcd)), [item]);
  //console.log('ProdListItemA -> dlrPrdAdLstList', dlrPrdAdLstList);

  // 모바일 팝업 처리 함수군
  const [chkBtnValue, setChkBtnValue] = useState(0);
  const [dimm3, setDimm3] = useState(false);
  const [active3, setActive3] = useState(false);

  const handleCompletePop = useCallback((e) => {
    e.preventDefault();
    setActive3(true);
    setDimm3(true);
    preventScroll(true);
  }, []);
  const handleCloseDimm3 = useCallback(() => {
    setActive3(false);
    setDimm3(false);
    preventScroll(false);
  }, []);

  const handleClose = useCallback((e) => {
    e.preventDefault();
    handleCloseDimm3();
  }, []);

  const handleChangeChkBtn = useCallback((e) => {
    e.preventDefault();
    // debugger;
    setChkBtnValue(Number(e.target.value));
  }, []);

  const handleConfirmSaleDone = (e) => {
    e.preventDefault();

    showConfirm('저장하시겠습니까?', async () => {
      showLoader();
      const action = listActions.updateSaleCarConfirmAction;
      if (action) {
        const statusinfo = await dispatch(
          action({
            name: 'list',
            values: { dlrPrdId: item.dlrPrdId, actlSlAmt: inputSlAmt }
          })
        );
        hideLoader();
        if (statusinfo && statusinfo.returncd !== '000') {
          showAlert('에러가 발생했습니다');
        } else {
          showAlert('처리되었습니다');
          //reloadListHandler();
        }
      }
    });

    handleClose(e);
  };

  const [inputSlAmt, setInputSlAmt] = useState('');
  const onChangeSlAmt = (e, val) => {
    setInputSlAmt(removeComma(e.target.value));
  };

  const onLinkClick = (e) => {
    const { dlrPrdId } = extenablePrd;
    const href = `/buycar/buyCarDetailType?dlrPrdId=${dlrPrdId}`;
    e.preventDefault(); //
      globalThis?.window.open(href, '새 창', 'width=1400, height=1000, menubar=no, status=no, toolbar=no')
  }

  const extendAd = () => {
    console.log('extendAd extenablePrd : ', extenablePrd);
    const { dlrPrdId, prdDvcd, crSlot } = extenablePrd;
    console.log('extendAd -> crSlot', crSlot);

    if (crSlot !== undefined) {
      //자유이용권의 경우
      console.log('extendAd -> 자유이용권 crSlot : ', crSlot);
      Router.push(
        '/mypage/dealer/sellcar/carManagement?' +
          qs.stringify({
            management: 'adver',
            sub: 1,
            dlrPrdId,
            prdDvcd,
            crSlot
          })
      );
    } else {
      console.log('extendAd -> 대당이용권 ');
    }
  };

  return (
    <>
      {!hasMobile ? (
        <div className="admin-list tp1">
          <div className="content-top">
            <CheckBox
              id={`register-car-chk-${idx}`}
              onChange={(e) => {
                checkItem(e, item);
              }}
              checked={checked}
            />
            <div className="img-cover">
              <img src={phtUrl ? imgUrl + phtUrl : frontUrl + '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
            </div>

            <ProdCarSummary item={item.car} mss={mss} fuel={fuel} slAmt={item?.slAmt} />

            <ul className="numerical">
              <li>
                <i className="ico-dot sml" />
                판매기간<span>{item?.saleDt}일</span>
              </li>
              <li>
                <i className="ico-dot sml" />
                조회수(일평균)<span>{item?.dailyView}회</span>
              </li>
              <li>
                <i className="ico-dot sml" />
                관심고객(최근2주)<span>{item?.twoWeeksItrtPrd}명</span>
              </li>
              <li>
                <i className="ico-dot sml" />
                동급매물(최근4주)
                <span>
                  <i className="ico-triangle-top" />
                  ??
                </span>
              </li>
            </ul>
          </div>
          <div className="content-bottom">
            <p className={`state ${prodStatus?.iconClass}`}>
              {/* { statusList?.find(status => status.cdId == item.sttDvcd)?.cdNm} */}
              {prodStatus?.label}
              {/* <span>(만료 {item?.sttDvcd}일 전)</span> */}
            </p>
            <ul>
              <li className="product-name">{adTitle}</li>
              <li>
                <span>등록일</span> {item?.regDt}
              </li>
              <li>
                <span>최종수정일</span> {item?.updDt}
              </li>
              {updatePassInfoList && (
                <li>
                  <span>최종업데이트 </span>
                  {updatePassInfoList[0]?.lastUpdHm} ({updatePassInfoList[0]?.updTimeCnt}/{updatePassInfoList[0]?.updTimeMaxCnt}회)
                </li>
              )}
            </ul>
            <div className="btn-wrap">
              <Button
                size="mid"
                line="blue80"
                color="blue80"
                radius={true}
                title="업데이트 시간변경"
                buttonMarkup={true}
                onClick={(e) => showPopEventHandler(e, 'popUpdateTimePicker', item)}
                width={129}
              />
              <Button
                size="mid"
                line="blue80"
                color="blue80"
                radius={true}
                title="광고 상세 페이지"
                buttonMarkup={true}
                onClick={(e) => onLinkClick(e)}
                width={129}
              />
              {item?.sttDvcd === '0010' && extenablePrd && extenablePrd?.periodDt < 15 && (
                <Button size="mid" line="blue80" color="blue80" radius={true} title="광고 연장" buttonMarkup={true} onClick={extendAd} width={129} marginTop={8} />
              )}
            </div>
          </div>
          <div className="btn-wrap">
            <div className="btn-left">
              <Button size="sml" background="blue80" radius={true} title="Live Studio 예약" width={103} buttonMarkup={true} onClick={(e) => showPopEventHandler(e, 'popUpStudioReservation', item)} />
              <Button size="sml" background="blue80" radius={true} title="Live Shot 예약" width={103} buttonMarkup={true} onClick={(e) => showPopEventHandler(e, 'popUpShotReservation', item)} />
            </div>
            <div className="btn-right">
              <Button size="sml" line="gray" radius={true} title="가격 수정" width={101} buttonMarkup={true} name="" onClick={(e) => showPopEventHandler(e, 'popModifyPrice', item)} />
              <Button size="sml" line="gray" radius={true} title="차량정보 수정" width={101} buttonMarkup={true} name="" onClick={(e) => showPopEventHandler(e, 'popModifyCarInfo', item)} />
              <Button size="sml" line="gray" radius={true} title="차량사진 수정" width={101} buttonMarkup={true} name="" onClick={(e) => showPopEventHandler(e, 'popModifyCarPhoto', item)} />
              <Button size="sml" line="gray" radius={true} title="성능기록부 수정" width={101} buttonMarkup={true} name="" onClick={(e) => showPopEventHandler(e, 'popModifyPerfInsp', item)} />
              <Button size="sml" line="gray" radius={true} title="판매완료 신고" width={101} buttonMarkup={true} name="" onClick={(e) => showPopEventHandler(e, 'popComplete', item)} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <CheckBox
            id={`register-car-chk-${idx}-m`}
            onChange={(e) => {
              checkItem(e, item);
            }}
            checked={checked}
          />
          <span>
            <div className="img-cover">
              <p className={`state ${prodStatus?.iconClass}`}>{prodStatus?.label}</p>
              <img src={phtUrl ? imgUrl + phtUrl : frontUrl + '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
            </div>
            <div className="summary">
              <h4 className="subject">{item?.car?.crNm ?? `${item?.car?.crMnfcCdNm || ''} ${item?.car?.crMdlCdNm || ''} ${item?.car?.crClsCdNm || ''}`}</h4>
              <div className="info-wrap">
                <div className="info">
                  <span>{item?.car?.crNo}</span>
                  <span>{item?.car?.frmYyyy}년형</span>
                  <span>{setComma(item?.car?.drvDist)}km</span>
                </div>
                <div className="price-wrap">
                  <div className="price-left">
                    <p className="price-tp2">
                      {setComma(item?.slAmt)}
                      <span className="won">만원</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <ul className="m-toggle-list up-blue car-date-wrap">
            <MenuItem>
              <MenuTitle>
                등록일:<span>{item?.regDt}</span> (최종수정일 {item?.updDt})
              </MenuTitle>
              <MenuCont>
                <table summary="차량정보에 대한 내용" className="table-tp1 th-c td-c mt16">
                  <caption className="away">차량정보</caption>
                  <colgroup>
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>판매기간</th>
                      <th>
                        관심고객
                        <br />
                        (최근2주)
                      </th>
                      <th>
                        조회수
                        <br />
                        (일평균)
                      </th>
                      <th>
                        동급매물
                        <br />
                        (최근4주)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tx-b tx-blue80">{item?.saleDt}일</td>
                      <td className="tx-b tx-blue80">{item?.twoWeeksItrtPrd}명</td>
                      <td className="tx-b tx-blue80">{item?.dailyView}회</td>
                      <td className="tx-b tx-blue80">
                        {item?.samecnt}
                        <i className="ico-triangle-top ml4" />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="float-wrap btn-xs">
                  <h4 className="tit3">대당이용권 자동업데이트</h4>
                  <Button size="sml" line="blue80" color="blue80" radius={true} title="시간변경" width={61} height={24} fontSize={10} onClick={showPopEventHandler('time', item)} />
                </div>
                <table summary="대당이용권 자동업데이트에 대한 내용" className="table-tp1">
                  <caption className="away">대당이용권 자동업데이트</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>업데이트(자동)</th>
                      <td>09:00~23:00</td>
                    </tr>
                    <tr>
                      <th>최종</th>
                      <td>
                        {updatePassInfoList[0]?.lastUpdHm} ({updatePassInfoList[0]?.updTimeCnt}/{updatePassInfoList[0]?.updTimeMaxCnt}회)
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Button line="gray" color="gray" title="정보수정" measure="%" width={49} height={38} fontSize={14} fontWeight={500} onClick={showPopEventHandler('modify', item)} />
                <Button line="gray" color="gray" title="판매완료 신고" measure="%" mgMeasure="%" width={49} height={38} fontSize={14} fontWeight={500} marginLeft={2} onClick={handleCompletePop} />
              </MenuCont>
            </MenuItem>
          </ul>

          {createBodyPortal(
            <>
              <div className={dimm3 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm3} />
              <MobBottomArea active={active3} zid={101}>
                <div className="inner pb0">
                  <div className="popup-declare">
                    <h3 className="tit1">판매완료 신고</h3>
                    <ul className="admin-list-wrap">
                      <li>
                        <div className="goods-list admin-list tp4">
                          <ul>
                            <li>
                              <span>
                                <div className="img-cover">
                                  <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                                </div>
                                <div className="summary">
                                  <h5 className="subject">{item?.car?.crNm}</h5>
                                  <div className="info-wrap">
                                    <div className="info">
                                      <span>{item?.car?.crNo}</span>
                                      <span>{item?.car?.frmYyyy}년형</span>
                                      <span>{setComma(item?.car?.drvDist)}km</span>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                    <div className="sell-declare">
                      {/* <span className="bridge2">
                        <p>판매위치</p>
                        <ul className="radio-block small">
                          <li>
                            <Radio className="txt" id="autobell" label="오토벨" value={1} checked={chkBtnValue === 1 ? 1 : null} onChange={handleChangeChkBtn} />
                          </li>
                          <li>
                            <Radio className="txt" id="othersite" label="타사이트" value={2} checked={chkBtnValue === 2 ? 2 : null} onChange={handleChangeChkBtn} />
                          </li>
                          <li>
                            <Radio className="txt" id="offline" label="오프라인" value={3} checked={chkBtnValue === 3 ? 3 : null} onChange={handleChangeChkBtn} />
                          </li>
                        </ul>
                      </span> */}
                      <span className="bridge2">
                        <label htmlFor="sell-price">현재광고가격</label>
                        <Input type="text" id="ad-sell-price" value={setComma(item?.appPrice)} width="68%" disabled={true} className="w-price won" />
                      </span>
                      <span className="bridge2">
                        <label htmlFor="sell-price">실제판매가격</label>
                        <Input type="text" id="sell-price" value={setComma(item?.slAmt)} width="68%" className="w-price manwon" onChange={onChangeSlAmt} />
                      </span>
                    </div>
                  </div>
                </div>
                <Buttons align="center" className="full" marginTop={19}>
                  <Button size="big" background="blue20" color="blue80" title="취소" measure="%" width={50} height={56} onClick={handleClose} />
                  <Button size="big" background="blue80" title="판매완료" measure="%" width={50} height={56} onClick={handleConfirmSaleDone} />
                </Buttons>
              </MobBottomArea>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProdListItemA;
