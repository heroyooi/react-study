import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import TreeCheckCount from '@lib/share/items/TreeCheckCount';
import Button from '@lib/share/items/Button';
import { mobDataProvider } from '@src/dummy';

const MobFilterModel = ({ result = 'yes', research = 'no', kind, defaultNum = 0, hiddenTab = [], callback, brandCallback }) => {
  const { isSection } = useSelector((state) => state.common);
  const handleClick = (e) => {
    if (callback) callback(e);
  }
  const domesticList = [
    {
      title: '현대',
      num: '12,345',
      className: 'brand1'
    },
    {
      title: '제네시스',
      num: '12,345',
      className: 'brand2'
    },
    {
      title: '기아',
      num: '12,345',
      className: 'brand3'
    },
    {
      title: '쉐보레(GM대우)',
      num: '12,345',
      className: 'brand4'
    },
    {
      title: '르노삼성',
      num: '12,345',
      className: 'brand5'
    },
    {
      title: '쌍용',
      num: '12,345',
      className: 'brand6'
    },
    {
      title: '기타',
      num: '12,345',
      className: 'except'
    }
  ];
  const foreignList = [
    {
      title: '벤츠',
      num: '12,345',
      className: 'brand1'
    },
    {
      title: 'BMW',
      num: '12,345',
      className: 'brand2'
    },
    {
      title: '아우디',
      num: '12,345',
      className: 'brand3'
    },
    {
      title: '폭스바겐',
      num: '12,345',
      className: 'brand4'
    },
    {
      title: '랜드로버',
      num: '12,345',
      className: 'brand5'
    }
  ];
  const popularList = [
    {
      title: '그랜저',
      num: '12,345'
    },
    {
      title: '쏘나타',
      num: '12,345'
    },
    {
      title: '싼타페',
      num: '12,345'
    },
    {
      title: '제네시스',
      num: '12,345'
    }
  ];
  const nameList = [
    {
      title: 'i30',
      num: '12,345'
    },
    {
      title: 'i40',
      num: '12,345'
    },
    {
      title: '갤로퍼',
      num: '12,345'
    },
    {
      title: '그라나다',
      num: '12,345',
      className: 'none'
    },
    {
      title: '그랜저',
      num: '12,345'
    },
    {
      title: '그랜저 GT',
      num: '12,345',
      className: 'none'
    }
  ];

  const calcTab = () => {
    let num = null;
    if (kind === 'manufacturer') {
      num = 0;
    } else if (kind === 'model') {
      num = 1;
    } else if (kind === 'rating' || research === 'yes') {
      num = 2;
    } else {
      num = defaultNum;
    }
    return num;
  };

  let defaultTreeMode = null;

  if (isSection === 'sell' || isSection === 'marketPrice' || isSection === 'pricingSystem') {
    defaultTreeMode = 'radio'; // 내차팔기, 시세조회, 프리이싱시스템
  } else {
    defaultTreeMode = 'checkbox'; // 내차사기(buy), 홈서비스(homeService)
  }
  const [tabNum, setTabNum] = useState(calcTab());
  const [isDisabled, setIsDisabled] = useState(result === 'no' ? [1, 2] : []);
  const [treeMode, setTreeMode] = useState(defaultTreeMode);

  useEffect(() => {
    if (isSection === 'sell' || isSection === 'marketPrice' || isSection === 'pricingSystem' || isSection === 'mypage') {
      setTreeMode('radio'); // 내차팔기, 시세조회, 프리이싱시스템, 마이페이지
    } else {
      setTreeMode('checkbox'); // 내차사기(buy), 홈서비스(homeService)
    }
  }, [isSection]);

  const handleStep = useCallback(
    (num) => () => {
      setIsDisabled(num === 1 ? [2] : []);
      setTabNum(num);
    },
    []
  );
  const handleBrandCallback = useCallback((v) => (e) => {
    // console.log('수입인증 인 경우');
    brandCallback(e, v);
  }, []);
  const handleCallback = useCallback((e, idx) => {
    setTabNum(idx);
  }, []);

  useEffect(() => {
    if (kind === 'manufacturer') {
      setTabNum(0);
    } else if (kind === 'model') {
      setTabNum(1);
    } else if (kind === 'rating') {
      setTabNum(2);
    }
    if (result === 'no') {
      setTabNum(0);
      setIsDisabled([1, 2]);
    } else {
      setIsDisabled([]);
    }
  }, [result, kind]);

  return (
    <TabMenu type="type2" defaultTab={tabNum} mount={false} fixTab={true} disabled={isDisabled} callBack={handleCallback} hiddenTab={research === 'yes' ? [0, 1, 2] : hiddenTab}>
      <TabCont tabTitle="제조사" id="tab2-1" index={0}>
        <div className="filter-list-wrap">
          <p className="tit">국산차</p>
          <div className="content-wrap float-wrap domestic">
            <ul>
              {domesticList.map((v, i) => {
                return (
                  <li key={i} className={v.className} onClick={handleStep(1)}>
                    <span className="logo" />
                    <span className="name">{v.title}</span>
                    <span className="num">{v.num}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="tit">수입차 인기브랜드 TOP5</p>
          <div className="content-wrap float-wrap foreign">
            <ul>
              {foreignList.map((v, i) => {
                return (
                  <li key={i} className={v.className} onClick={handleStep(1)}>
                    <span className="logo" />
                    <span className="name">{v.title}</span>
                    <span className="num">{v.num}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {(isSection === 'buy' || isSection === 'homeService') && <Button className="fixed" size="full" background="blue80" title="전체선택" onClick={handleClick} />}
      </TabCont>
      <TabCont tabTitle="모델" id="tab2-2" index={1}>
        <div className="filter-list-wrap">
          <p className="tit">인기모델</p>
          <div className="content-wrap float-wrap">
            <ul>
              {popularList.map((v, i) => {
                return (
                  <li key={i} className={v.className} onClick={
                    !brandCallback
                      ? hiddenTab.includes(2) ? null : handleStep(2)
                      : handleBrandCallback(v)
                    
                  }>
                    <span className="name">{v.title}</span>
                    <span className="num">{v.num}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="tit">이름순</p>
          <div className="content-wrap float-wrap">
            <ul>
              {nameList.map((v, i) => {
                return (
                  <li key={i} className={v.className} onClick={hiddenTab.includes(2) ? null : handleStep(2)}>
                    <span className="name">{v.title}</span>
                    <span className="num">{v.num}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {(isSection === 'buy' || isSection === 'homeService') && <Button className="fixed" size="full" background="blue80" title="전체선택" onClick={handleClick} />}
      </TabCont>
      <TabCont tabTitle="등급" id="tab2-3" index={2}>
        <TreeCheckCount dataProvider={mobDataProvider} mode={treeMode} />
        <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />
      </TabCont>
    </TabMenu>
  );
};

MobFilterModel.propTypes = {
  result: PropTypes.string,
  research: PropTypes.string,
  kind: PropTypes.string,
  defaultNum: PropTypes.number,
  hiddenTab: PropTypes.array
};

export default MobFilterModel;
