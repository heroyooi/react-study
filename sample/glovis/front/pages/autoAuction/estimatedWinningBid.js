/**
 * 설명 : 스마트옥션 낙찰정보 조회
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires [autoAuctionAction]
 * @author 박진하
 */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, orderBy } from 'lodash';
import PropTypes from 'prop-types';

import SelectBox from '@lib/share/items/SelectBox';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Button from '@lib/share/items/Button';

import PageNavigator from '@src/components/common/PageNavigator';
import { axiosPost, axiosGet } from '@src/utils/HttpUtils';
import { getWinningBidList } from '@src/actions/autoAuction/autoAuctionAction';

/**
 * 설명 : 스마트옥션 낙찰정보를 조회한다.
 * @param {state.autoAuction.auctionWinningList} 낙찰차량 목록
 * @returns {EstimatedWinningBid} 스마트옥션 경매낙찰 목록
 */
const EstimatedWinningBid = ({ show = false, onChange }) => {
  const nf = new Intl.NumberFormat();
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const winningBidList = useSelector((state) => state.autoAuction.auctionWinningList);

  const [bidPopup, setBidPopup] = useRodal(show);

  const [crMnfcCdList, setCrMnfcCdList] = useState([]);
  const [crTypeCdList, setCrTypeCdList] = useState([]);
  const [crMdlCdList, setCrMdlCdList] = useState([]);
  const [crMssCdList, setMssCdList] = useState([]);
  const [crFrmYyyyCdList, setCrFrmYyyyCdList] = useState([]);
  const [crFuelCdList, setCrFuelCdList] = useState([]);

  const [crMnfcCd, setCrMnfcCd] = useState('');
  const [crMnfcNm, setCrMnfcNm] = useState('');
  const [crTypeCd, setCrTypeCd] = useState('');
  const [crTypeNm, setCrTypeNm] = useState('');
  const [crMdlCd, setCrMdlCd] = useState('');
  const [crMdlNm, setCrMdlNm] = useState('');
  const [crMssCd, setCrMssCd] = useState('');
  const [crMssNm, setCrMssNm] = useState('');
  const [crFrmYyyyCd, setCrFrmYyyyCd] = useState('');
  const [crFrmYyyyNm, setCrFrmYyyyNm] = useState('');
  const [crFuelCd, setCrFuelCd] = useState('');
  const [crFuelNm, setCrFuelNm] = useState('');

  const yearList = () => {
    const now = new Date();
    const nowYear = now.getFullYear();

    now.setFullYear(1993);
    const startYear = now.getFullYear();

    const frmYyyy = [{ value: '', label: '연식' }];
    for (let i = startYear; i <= nowYear; i++) {
      frmYyyy.push({ value: i - 1992, label: i });
    }
    return frmYyyy;
  };

  useEffect(() => {
    setBidPopup(show);
  }, [setBidPopup, show]);

  useEffect(() => {
    if (show === true) {
      if (isEmpty(winningBidList)) {
        dispatch(getWinningBidList());
      }
      if (isEmpty(crMnfcCdList)) {
        axiosGet('/api//commonCarInfo/selectManufacturerList.do?nationId=0')
          .then(({ data }) => {
            if (data.statusinfo.returncd === '000') {
              const mnfcList = [{ value: '', label: '제조사' }];
              data.data.map((list) => {
                const data = {
                  value: list.id,
                  label: list.name
                };
                mnfcList.push(data);
              });
              setCrMnfcCdList(mnfcList);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (isEmpty(crMssCdList)) {
        axiosGet('/api//autoauction/selectMssList.do')
          .then(({ data }) => {
            if (data.statusinfo.returncd === '000') {
              const mssList = [{ value: '', label: '미션' }];
              data.data.map((list) => {
                const data = {
                  value: list.id,
                  label: list.name
                };
                mssList.push(data);
              });
              setMssCdList(mssList);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (isEmpty(crFrmYyyyCdList)) {
        setCrFrmYyyyCdList(yearList());
      }
      if (isEmpty(crFuelCdList)) {
        axiosGet('/api//autoauction/selectFuelList.do')
          .then(({ data }) => {
            if (data.statusinfo.returncd === '000') {
              const fuelList = [{ value: '', label: '연료' }];
              data.data.map((list) => {
                const data = {
                  value: list.id,
                  label: list.name
                };
                fuelList.push(data);
              });
              setCrFuelCdList(fuelList);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [dispatch, show, winningBidList]);

  const closeBidPopup = (e) => {
    setCrMnfcCd('');
    setCrTypeCd('');
    setCrMdlCd('');
    setCrMssCd('');
    setCrFrmYyyyCd('');
    setCrFuelCd('');
    if (onChange) onChange(e);
  };

  const winningBidSearch = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(
        getWinningBidList({
          mnfc: crMnfcCd,
          type: crTypeCd,
          model: crMdlCd,
          mss: crMssCd,
          frmYyyy: crFrmYyyyCd,
          fuel: crFuelCd
        })
      );
    },
    [crFrmYyyyCd, crFuelCd, crMdlCd, crMnfcCd, crMssCd, crTypeCd, dispatch]
  );

  const onChangeMnfc = (e) => {
    const { value, label } = e;
    setCrMnfcCd(value);
    setCrMnfcNm(label);
    setCrTypeCd('');
    setCrTypeNm('');
    setCrMdlCd('');
    setCrMdlNm('');
    if (value === '') {
      setCrTypeCdList([{ value: '', label: '차급' }]);
      setCrMdlCdList([{ value: '', label: '차종' }]);
    }
  };
  const onChangeType = (e) => {
    const { value, label } = e;
    setCrTypeCd(value);
    setCrTypeNm(label);
    setCrMdlCd('');
    setCrMdlNm('');
    if (value === '') {
      setCrMdlCdList([{ value: '', label: '차종' }]);
    }
  };
  const onChangeMdl = (e) => {
    const { value, label } = e;
    setCrMdlCd(value);
    setCrMdlNm(label);
  };
  const onChangeMss = (e) => {
    const { value, label } = e;
    setCrMssCd(value);
    setCrMssNm(label);
  };
  const onChangeFrmYyyy = (e) => {
    const { value, label } = e;
    setCrFrmYyyyCd(value);
    setCrFrmYyyyNm(label);
  };
  const onChangeFuel = (e) => {
    const { value, label } = e;
    setCrFuelCd(value);
    setCrFuelNm(label);
  };

  useEffect(() => {
    axiosGet('/api//autoauction/selectCarTypeList.do?mnfcCd=' + crMnfcCd).then(({ data }) => {
      if (data.statusinfo.returncd === '000') {
        const typeList = [{ value: '', label: '차급' }];
        data.data.map((list) => {
          const data = {
            value: list.id,
            label: list.name
          };
          typeList.push(data);
        });
        setCrTypeCdList(typeList);
      }
    });
  }, [crMnfcCd]);

  useEffect(() => {
    axiosGet('/api//autoauction/selectTypeMdlList.do?mnfcCd=' + crMnfcCd + '&typeCd=' + crTypeCd).then(({ data }) => {
      if (data.statusinfo.returncd === '000') {
        const mdlList = [{ value: '', label: '차종' }];
        data.data.map((list) => {
          const data = {
            value: list.id,
            label: list.name
          };
          mdlList.push(data);
        });
        setCrMdlCdList(mdlList);
      }
    });
  }, [crTypeCd]);

  if (hasMobile) {
    return (
      <RodalPopup show={bidPopup} type={'fade'} closedHandler={closeBidPopup} title="경매 낙찰가 조회" mode="normal" size="medium" className="account">
        <div className="con-wrap">
          <div className="search-bid-wrap">
            <ul className="search-bid-price">
              <li>
                <SelectBox id="bidCrMnfcCd" className="items-sbox" placeHolder="제조사" options={crMnfcCdList} width={200} height={48} value={crMnfcCd} onChange={onChangeMnfc} />
              </li>
              <li>
                <SelectBox id="bidCrTypeCd" className="items-sbox" placeHolder="차급" options={crTypeCdList} width={200} height={48} value={crTypeCd} onChange={onChangeType} />
              </li>
              <li>
                <SelectBox id="bidCrMdlCd" className="items-sbox" placeHolder="차종" options={crMdlCdList} width={200} height={48} value={crMdlCd} onChange={onChangeMdl} />
              </li>
              <li>
                <SelectBox id="crMssCd" className="items-sbox" placeHolder="미션" options={crMssCdList} width={200} height={48} value={crMssCd} onChange={onChangeMss} />
              </li>
              <li>
                <SelectBox id="crFrmYyyyCd" className="items-sbox" placeHolder="연식" options={crFrmYyyyCdList} width={200} height={48} value={crFrmYyyyCd} onChange={onChangeFrmYyyy} />
              </li>
              <li>
                <SelectBox id="crFuelCd" className="items-sbox" placeHolder="연료" options={crFuelCdList} width={200} height={48} value={crFuelCd} onChange={onChangeFuel} />
              </li>
            </ul>
            <Button size="big" background="blue80" title="검색" width={166} height={106} onClick={winningBidSearch} />
          </div>
          <p className="exp-txt">* 주행거리(년): 상(2만 이하), 중(2만~3만), 하(3만 이상)</p>
          <table summary="경매 낙찰가 조회 제목" className="table-tp1 th-c td-c">
            <caption className="away">경매 낙찰가 조회 제목</caption>
            <colgroup>
              <col width="100px" />
              <col width="*" />
              <col width="90px" />
              <col width="90px" />
              <col width="90px" />
              <col width="107px" />
            </colgroup>
            <thead>
              <tr>
                <th>경매일</th>
                <th>차량정보</th>
                <th>용도</th>
                <th>주행거리</th>
                <th>평가</th>
                <th>낙찰가</th>
              </tr>
            </thead>
          </table>
          <ColoredScrollbars autoHeightMax={336}>
            <table summary="경매 낙찰가 조회 내용" className="table-tp1 th-c td-c">
              <colgroup>
                <col width="100px" />
                <col width="*" />
                <col width="90px" />
                <col width="90px" />
                <col width="90px" />
                <col width="107px" />
              </colgroup>
              <tbody>
                {!isEmpty(winningBidList) &&
                  winningBidList.map((bidList, index) => {
                    return (
                      <tr key={index}>
                        <td>{bidList.bidDt}</td>
                        <td className="tl">
                          {bidList.crNm}
                          <p className="opts">
                            {bidList.frmYyyy}
                            <span>|</span>
                            {bidList.mssCd}
                            <span>|</span>
                            {bidList.fuelCd}
                            <span>|</span>
                            {nf.format(bidList.dspl)}cc<span>|</span>
                            {bidList.crClrCd}
                          </p>
                        </td>
                        <td>{bidList.crUseCd}</td>
                        <td>{bidList.drvDist <= 20000 ? '상' : bidList.drvDist > 20000 && bidList.drvDist <= 30000 ? '중' : '하'}</td>
                        <td>{bidList.appraisal}</td>
                        <td className="price">
                          <span>{nf.format(bidList.winBidPrice)}</span>만원
                        </td>
                      </tr>
                    );
                  })}
                {isEmpty(winningBidList) && (
                  <tr>
                    <td colSpan="6">조회 되는 데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </ColoredScrollbars>
          <PageNavigator recordCount={winningBidList.length} className="mt32" />
        </div>
      </RodalPopup>
    );
  }
  return (
    <RodalPopup show={bidPopup} type={'fade'} closedHandler={closeBidPopup} title="경매 낙찰가 조회" mode="normal" size="medium" className="account">
      <div className="con-wrap">
        <div className="search-bid-wrap">
          <ul className="search-bid-price">
            <li>
              <SelectBox id="bidCrMnfcCd" className="items-sbox" placeHolder="제조사" options={crMnfcCdList} width={200} height={48} value={crMnfcCd} onChange={onChangeMnfc} />
            </li>
            <li>
              <SelectBox id="bidCrTypeCd" className="items-sbox" placeHolder="차급" options={crTypeCdList} width={200} height={48} value={crTypeCd} onChange={onChangeType} />
            </li>
            <li>
              <SelectBox id="bidCrMdlCd" className="items-sbox" placeHolder="차종" options={crMdlCdList} width={200} height={48} value={crMdlCd} onChange={onChangeMdl} />
            </li>
            <li>
              <SelectBox id="crMssCd" className="items-sbox" placeHolder="미션" options={crMssCdList} width={200} height={48} value={crMssCd} onChange={onChangeMss} />
            </li>
            <li>
              <SelectBox id="crFrmYyyyCd" className="items-sbox" placeHolder="연식" options={crFrmYyyyCdList} width={200} height={48} value={crFrmYyyyCd} onChange={onChangeFrmYyyy} />
            </li>
            <li>
              <SelectBox id="crFuelCd" className="items-sbox" placeHolder="연료" options={crFuelCdList} width={200} height={48} value={crFuelCd} onChange={onChangeFuel} />
            </li>
          </ul>
          <Button size="big" background="blue80" title="검색" width={166} height={106} onClick={winningBidSearch} />
        </div>
        <p className="exp-txt">* 주행거리(년): 상(2만 이하), 중(2만~3만), 하(3만 이상)</p>
        <table summary="경매 낙찰가 조회 제목" className="table-tp1 th-c td-c">
          <caption className="away">경매 낙찰가 조회 제목</caption>
          <colgroup>
            <col width="100px" />
            <col width="*" />
            <col width="90px" />
            <col width="90px" />
            <col width="90px" />
            <col width="107px" />
          </colgroup>
          <thead>
            <tr>
              <th>경매일</th>
              <th>차량정보</th>
              <th>용도</th>
              <th>주행거리</th>
              <th>평가</th>
              <th>낙찰가</th>
            </tr>
          </thead>
        </table>
        <ColoredScrollbars autoHeightMax={336}>
          <table summary="경매 낙찰가 조회 내용" className="table-tp1 th-c td-c">
            <colgroup>
              <col width="100px" />
              <col width="*" />
              <col width="90px" />
              <col width="90px" />
              <col width="90px" />
              <col width="107px" />
            </colgroup>
            <tbody>
              {!isEmpty(winningBidList) &&
                winningBidList.map((bidList, index) => {
                  return (
                    <tr key={index}>
                      <td>{bidList.bidDt}</td>
                      <td className="tl">
                        {bidList.crNm}
                        <p className="opts">
                          {bidList.frmYyyy}
                          <span>|</span>
                          {bidList.mssCd}
                          <span>|</span>
                          {bidList.fuelCd}
                          <span>|</span>
                          {nf.format(bidList.dspl)}cc<span>|</span>
                          {bidList.crClrCd}
                        </p>
                      </td>
                      <td>{bidList.crUseCd}</td>
                      <td>{bidList.drvDist <= 20000 ? '상' : bidList.drvDist > 20000 && bidList.drvDist <= 30000 ? '중' : '하'}</td>
                      <td>{bidList.appraisal}</td>
                      <td className="price">
                        <span>{nf.format(bidList.winBidPrice)}</span>만원
                      </td>
                    </tr>
                  );
                })}
              {isEmpty(winningBidList) && (
                <tr>
                  <td colSpan="6">조회 되는 데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </ColoredScrollbars>
        <PageNavigator recordCount={winningBidList.length} className="mt32" />
      </div>
    </RodalPopup>
  );
};

EstimatedWinningBid.propTypes = {
  show: PropTypes.bool,
  onChange: PropTypes.func
};

export default EstimatedWinningBid;
