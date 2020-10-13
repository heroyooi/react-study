import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import { isEmpty } from 'lodash';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Button from '@lib/share/items/Button';
//import { select1_list } from '@src/dummy';
import { axiosGet } from '@src/utils/HttpUtils';
import { getWinningBidList } from '@src/actions/autoAuction/autoAuctionAction';

const MobSearchBid = ({ router }) => {
  const { result } = router.query;

  //닫기, 더보기
  const [isActive, setIsActive] = useState(false);
  const handleActive = useCallback(
    (e) => {
      e.preventDefault();
      setIsActive((prevActive) => !prevActive);
    },
    [isActive]
  );

  // 모바일 구현
  const dispatch = useDispatch();
  const winningBidList = useSelector((state) => state.autoAuction.auctionWinningList);
  const nf = new Intl.NumberFormat();

  const [crMnfcCdList, setCrMnfcCdList] = useState([]); // 제조사 리스트
  const [crTypeCdList, setCrTypeCdList] = useState([]); // 차급 리스트
  const [crMdlCdList, setCrMdlCdList] = useState([]); // 차종 리스트
  const [crMssCdList, setMssCdList] = useState([]); // 미션 리스트
  const [crFrmYyyyCdList, setCrFrmYyyyCdList] = useState([]); // 연식 리스트
  const [crFuelCdList, setCrFuelCdList] = useState([]); // 연료 리스트

  const [crMnfcCd, setCrMnfcCd] = useState(''); // 제조사
  const [crTypeCd, setCrTypeCd] = useState(''); // 차급
  const [crMdlCd, setCrMdlCd] = useState(''); // 차종
  const [crMssCd, setCrMssCd] = useState(''); // 미션
  const [crFrmYyyyCd, setCrFrmYyyyCd] = useState(''); // 연식
  const [crFuelCd, setCrFuelCd] = useState(''); // 연료

  useEffect(() => {
    // 제조사 리스트 조회
    if (isEmpty(crMnfcCdList)) {
      axiosGet('/api//commonCarInfo/selectManufacturerList.do?nationId=0')
        .then(({ data }) => {
          if (data.statusinfo.returncd === '000') {
            const mnfcList = [
              {
                codeValue: '',
                id: 'mnfc_select',
                label: '제조사',
                value: 1,
                checked: true
              }
            ];
            data.data.map((list, i) => {
              const data = {
                codeValue: list.id,
                id: `mnfc_${i + 2}`,
                label: list.name,
                value: i + 2,
                checked: false
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

    // 미션 리스트 조회
    if (isEmpty(crMssCdList)) {
      axiosGet('/api//autoauction/selectMssList.do')
        .then(({ data }) => {
          if (data.statusinfo.returncd === '000') {
            const mssList = [
              {
                codeValue: '',
                id: 'mss_select',
                label: '미션',
                value: 1,
                checked: true
              }
            ];
            data.data.map((list, i) => {
              const data = {
                codeValue: list.id,
                id: `mss_${i + 2}`,
                label: list.name,
                value: i + 2,
                checked: false
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

    // 연식 리스트
    if (isEmpty(crFrmYyyyCdList)) {
      setCrFrmYyyyCdList(() => {
        const now = new Date();
        const nowYear = now.getFullYear();

        now.setFullYear(1993);
        const startYear = now.getFullYear();
        const frmYyyy = [
          {
            codeValue: '',
            id: 'frmYyyy_select',
            label: '연식',
            value: 1,
            checked: true
          }
        ];
        for (let i = startYear; i <= nowYear; i++) {
          frmYyyy.push({
            codeValue: i - 1992,
            id: `frmYyyy_${i - 1992 + 1}`,
            label: i,
            value: i - 1992 + 1,
            checked: false
          });
        }

        return frmYyyy;
      });
    }

    // 연료 리스트
    if (isEmpty(crFuelCdList)) {
      axiosGet('/api//autoauction/selectFuelList.do')
        .then(({ data }) => {
          if (data.statusinfo.returncd === '000') {
            const fuelList = [
              {
                codeValue: '',
                id: 'fuel_select',
                label: '연료',
                value: 1,
                checked: true
              }
            ];
            data.data.map((list, i) => {
              const data = {
                codeValue: list.id,
                id: `fuel_${i + 2}`,
                label: list.name,
                value: i + 2,
                checked: false
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

    if (isEmpty(winningBidList)) {
      dispatch(getWinningBidList());
    }
  }, []);

  useEffect(() => {
    // 차급 조회 (제조사 선택시점)
    axiosGet('/api//autoauction/selectCarTypeList.do?mnfcCd=' + crMnfcCd).then(({ data }) => {
      const typeList = [{ codeValue: '', id: 'type_select', label: '차급', value: 1, checked: true }];
      if (data.statusinfo.returncd === '000') {
        data.data.map((list, i) => {
          const data = {
            codeValue: list.id,
            id: `type_${i + 2}`,
            label: list.name,
            value: i + 2,
            checked: false
          };
          typeList.push(data);
        });
      }
      setCrTypeCdList(typeList);
    });
  }, [crMnfcCd]);

  useEffect(() => {
    // 차종 조회 (차급 선택시점)
    axiosGet('/api//autoauction/selectTypeMdlList.do?mnfcCd=' + crMnfcCd + '&typeCd=' + crTypeCd).then(({ data }) => {
      const mdlList = [{ codeValue: '', id: 'mdl_select', label: '차종', value: 1, checked: true }];
      if (data.statusinfo.returncd === '000') {
        data.data.map((list, i) => {
          const data = {
            codeValue: list.id,
            id: `mdl_${i + 2}`,
            label: list.name,
            value: i + 2,
            checked: false
          };
          mdlList.push(data);
        });
      }
      setCrMdlCdList(mdlList);
    });
  }, [crMnfcCd, crTypeCd]);

  // 선택한 검색조건 등록
  const onChangeSelect = useCallback((e, target) => {
    switch (target) {
      case 'crMnfcCd':
        console.log('*** crMnfcCd', crMnfcCdList[e.target.value - 1].label);
        setCrMnfcCd(crMnfcCdList[e.target.value - 1].codeValue);
        setCrTypeCd('');
        setCrMdlCd('');
        return;
      case 'crTypeCd':
        console.log('*** crMnfcCd', crTypeCdList[e.target.value - 1].label);
        setCrTypeCd(crTypeCdList[e.target.value - 1].codeValue);
        setCrMdlCd('');
        return;
      case 'crMdlCd':
        console.log('*** crMnfcCd', crMdlCdList[e.target.value - 1].label);
        setCrMdlCd(crMdlCdList[e.target.value - 1].codeValue);
        return;
      case 'crMssCd':
        console.log('*** crMnfcCd', crMssCdList[e.target.value - 1].label);
        setCrMssCd(crMssCdList[e.target.value - 1].codeValue);
        return;
      case 'crFrmYyyyCd':
        console.log('*** crMnfcCd', crFrmYyyyCdList[e.target.value - 1].label);
        setCrFrmYyyyCd(crFrmYyyyCdList[e.target.value - 1].codeValue);
        return;
      case 'crFuelCd':
        console.log('*** crMnfcCd', crFuelCdList[e.target.value - 1].label);
        setCrFuelCd(crFuelCdList[e.target.value - 1].codeValue);
        return;
    }
  });

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

  useEffect(() => {
    console.log('*** winningBidList', winningBidList);
  }, [winningBidList]);

  return (
    <div className="mt20 bg-gray20">
      <div className="content-wrap search-wrap bid mb10">
        <ul>
          <li className="bridge2">
            <MobSelectBox
              placeHolder="제조사"
              id="car-manufacturer"
              options={crMnfcCdList}
              width="31.6%"
              subPop={true}
              onChange={(e) => {
                onChangeSelect(e, 'crMnfcCd');
              }}
            />
            <MobSelectBox
              placeHolder="차급"
              id="car-model"
              options={crTypeCdList}
              width="31.6%"
              subPop={true}
              onChange={(e) => {
                onChangeSelect(e, 'crTypeCd');
              }}
            />
            <MobSelectBox
              placeHolder="차종"
              id="car-model-detail"
              options={crMdlCdList}
              width="31.6%"
              subPop={true}
              onChange={(e) => {
                onChangeSelect(e, 'crMdlCd');
              }}
            />
          </li>
          <li className="bridge2">
            <MobSelectBox
              placeHolder="미션"
              id="car-mission"
              options={crMssCdList}
              width="31.6%"
              subPop={true}
              onChange={(e) => {
                onChangeSelect(e, 'crMssCd');
              }}
            />
            <MobSelectBox
              placeHolder="연식"
              id="car-year"
              options={crFrmYyyyCdList}
              width="31.6%"
              subPop={true}
              onChange={(e) => {
                onChangeSelect(e, 'crFrmYyyyCd');
              }}
            />
            <MobSelectBox
              placeHolder="연료"
              id="car-fuel"
              options={crFuelCdList}
              width="31.6%"
              subPop={true}
              onChange={(e) => {
                onChangeSelect(e, 'crFuelCd');
              }}
            />
          </li>
        </ul>
        <Button size="full" background="blue80" radius={true} title="검색하기" height={40} marginTop={16} onClick={winningBidSearch} />
      </div>

      {/* 결과o */}
      <div className="content-wrap search-wrap bid pt16">
        <p className="tx-exp-tp3 tit tx-gray">※ 주행거리(년): 상(2만 이하), 중(2만~3만), 하(3만 이상)</p>
        <ul className="exhibit-list line">
          {!isEmpty(winningBidList) &&
            winningBidList.map((bidList, index) => {
              return (
                (index < 2 || isActive) && (
                  <li>
                    <h4 className="subject">{bidList.crNm}</h4>
                    <div className="info mt8">
                      <span>{bidList.frmYyyy}</span>
                      <span>{bidList.mssCd}</span>
                      <span>{bidList.fuelCd}</span>
                      <span>{nf.format(bidList.dspl)}cc</span>
                      <span>{bidList.crClrCd}</span>
                    </div>
                    <div className="info2 mt8">
                      <span>
                        용도 : <em className="tx-blue80">{bidList.crUseCd}</em>
                      </span>
                      <span>
                        거리 : <em className="tx-blue80">{bidList.drvDist <= 20000 ? '상' : bidList.drvDist > 20000 && bidList.drvDist <= 30000 ? '중' : '하'}</em>
                      </span>
                      <span>
                        평가 : <em className="tx-blue80">{bidList.appraisal}</em>
                      </span>
                    </div>
                    <div className="price-wrap mt16">
                      <div className="price-left fl">
                        <p className="price-tp1">경매일 : {bidList.bidDt}</p>
                      </div>
                      <div className="price-right fr">
                        <p className="price-tit">낙찰가</p>
                        <p className="price-tp2">
                          {nf.format(bidList.winBidPrice)}
                          <span className="won">만원</span>
                        </p>
                      </div>
                    </div>
                  </li>
                )
              );
            })}
        </ul>
        <Button
          size="full"
          line="gray"
          radius={true}
          title={isActive ? '닫기' : '더보기'}
          height={38}
          fontSize={14}
          marginTop={8}
          iconType={isActive ? 'arrow-top-gray' : 'arrow-bottom-gray'}
          onClick={handleActive}
        />
      </div>
    </div>
  );
};

export default withRouter(MobSearchBid);
