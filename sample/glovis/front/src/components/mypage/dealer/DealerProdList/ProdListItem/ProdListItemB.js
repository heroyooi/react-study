import React, { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import qs from 'qs';

import className from 'classnames/bind';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';

import { imgUrl, frontUrl } from '@src/utils/HttpUtils';
import { setComma } from '@src/utils/StringUtil';
import ProdCarSummary from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdCarSummary';

const headingGroup = {
  auctSbidCrYn: {
    label: '경매낙찰차량',
    color: 'bg-blue80'
  },
  sbidCrYn: {
    label: '비교견적차량',
    color: ''
  },
  tmpSaveYn: {
    label: '등록대기차량',
    color: 'bg-gray'
  },
  lvstdCrYn: {
    label: 'Live Studio',
    color: 'bg-red'
  },
  lvshotCrYn: {
    label: 'Live Shot',
    color: 'bg-red'
  },
  frnchsCrYn: {
    label: '프랜차이즈',
    color: ''
  }
};

const statusLabel = {
  auctSbidCrYn: {
    label: '경매낙찰차량',
    color: 'state normal'
  },
  sbidCrYn: {
    label: '비교견적차량',
    color: ''
  },
  tmpSaveYn: {
    label: '등록대기차량',
    color: 'state hold'
  },
  lvstdCrYn: {
    label: 'Live Studio',
    color: 'state need'
  },
  lvshotCrYn: {
    label: 'Live Shot',
    color: 'state need'
  },
  frnchsCrYn: {
    label: '프랜차이즈',
    color: 'state fran'
  }
};

const ProdListItemB = ({ idx, item = {}, mss, fuel, checked, checkItem, showPopEventHandler, extendPeriod, reloadListHandler, memberInfo = {} }) => {
  console.log('ProdListItemB item : ', item);
  console.log('ProdListItemB memberInfo : ', memberInfo);
  const { mbJoinDvcd } = memberInfo;
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const {
    assgnDlrId,
    mgmtDlrMbId,
    dlrPrdId,
    auctSbidCrYn,
    sbidCrYn,
    car: { tmpSaveYn, photoList = [] },
    lvstdCrYn,
    lvshotCrYn,
    frnchsCrYn,
    sttDvcd,
  } = item;
  const { phtUrl = '' } = photoList[0];

  const carStatusStr = useMemo(() => {
    const heading = { auctSbidCrYn, sbidCrYn, tmpSaveYn, lvstdCrYn, lvshotCrYn, frnchsCrYn };
    return Object.keys(heading).filter((tag) => heading[tag] === 'Y')[0];
  }, [item]);

  return (
    <>
      {!hasMobile ? (
        <div className="admin-list tp3">
          <div className="content-top">
            {
              sttDvcd === '0050' &&
              <CheckBox
                id={`register-car-chk-${idx}`}
                onChange={(e) => {
                  checkItem(e, item);
                }}
                checked={checked}
              />
            }
            <div className="img-cover">
              <img src={phtUrl ? imgUrl + phtUrl : frontUrl + '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
            </div>
            <ProdCarSummary
              heading={headingGroup[carStatusStr] ? <span className={`option-tp4 ${headingGroup[carStatusStr].color}`}>{headingGroup[carStatusStr].label}</span> : null}
              item={item.car}
              mss={mss}
              fuel={fuel}
              // slAmt={item?.slAmt}
            />
            {tmpSaveYn === 'Y' && (
              <p className="price-tp7">
                <em>판매금액</em>
                {item?.slAmt ? (
                  <>
                    {setComma(item?.slAmt)} <span className="won">만원</span>
                  </>
                ) : (
                  '미입력'
                )}
              </p>
            )}
            <div className="btn-wrap">
              {tmpSaveYn === 'Y' && (
                <Button size="mid" line="blue80" color="blue80" radius={true} title="등록진행" width={100} href={`/mypage/dealer/sellcar/registerCarInfo?${qs.stringify({ dlrPrdId })}`} />
              )}
              {tmpSaveYn === 'N' && (
                <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} href={`/mypage/dealer/sellcar/registerCarProdSelection?${qs.stringify({ dlrPrdId })}`} />
              )}
              {auctSbidCrYn === 'Y' && mbJoinDvcd === '0020' && (
                <Button size="mid" line="blue80" color="blue80" radius={true} title="낙찰차량 보내기" width={100} marginTop={8} onClick={(e) => showPopEventHandler(e, 'popSendProd', item)} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* <CheckBox
            id={`register-car-chk-${idx}-m`}
            onChange={(e) => {
              checkItem(e, item);
            }}
            checked={checked}
          /> */}
          <span>
            <div className="img-cover">
              {statusLabel[carStatusStr] ? <p className={statusLabel[carStatusStr].color}>{statusLabel[carStatusStr].label}</p> : null}
              <img src={phtUrl ? imgUrl + phtUrl : frontUrl + '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
            </div>
            <div className="summary">
              <Link href="/buycar/buyCarDetailType">
                <a>
                  <h5 className="subject">{item?.car?.crNm}</h5>
                </a>
              </Link>
              <div className="info-wrap">
                <div className="info">
                  <span>{item?.car?.crNo}</span>
                  <span>{item?.car?.frmYyyy}</span>
                  <span>{setComma(item?.car?.drvDist)}km</span>
                </div>
                <div className="price-wrap">
                  <div className="price-left">
                    <>
                      {item?.slAmt ? (
                        <p className="price-tp2">
                          {setComma(item.slAmt)}
                          <span className="won">만원</span>
                        </p>
                      ) : null}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <Buttons align="center" marginTop={16}>
            {tmpSaveYn === 'Y' && (
              <Button size="mid" line="blue80" color="blue80" radius={true} title="등록진행" width={100} href={`/mypage/dealer/sellcar/registerCarInfo?${qs.stringify({ dlrPrdId })}`} />
            )}
            {tmpSaveYn === 'N' && (
              <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" width={100} href={`/mypage/dealer/sellcar/registerCarProdSelection?${qs.stringify({ dlrPrdId })}`} />
            )}
            {auctSbidCrYn === 'Y' && <Button size="mid" line="blue80" color="blue80" radius={true} title="낙찰차량 보내기" width={100} marginTop={8} onClick={(e) => showPopEventHandler(e, 'popSendProd', item)} />}
            {/* <Button size="mid" line="blue80" color="blue80" radius={true} title="매물보내기" fontWeight="500" measure="%" width={49} onClick={handleSendPop} />
            <Button size="mid" line="blue80" color="blue80" radius={true} title="광고등록" fontWeight="500" measure="%" width={49} mgMeasure="%" marginLeft={2} /> */}
          </Buttons>
        </>
      )}
    </>
  );
};

export default memo(ProdListItemB);
