import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

const MypageNaviLnb = memo((lnbData) => {
  const [mbLiveshotYn, setMbLiveshotYn] = useState('N'); // 촬영기사권한 여부
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // const onMenuClick = (e, menuId, url) => {
  //   e.preventDefault();
  //   if (url.trim().length > 0) Router.push(url);
  // };

  console.log('MypageNaviLnb:20 > lnbData.lnbData=%o', lnbData.lnbData);
  useEffect(() => {
    if (isEmpty(Cookies.get('mbLiveshotYn'))) {
      console.log('MypageNaviLnb:27 촬영기사 권한  > Cookies.get(mbLiveshotYn)=%o', Cookies.get('mbLiveshotYn'));
      setMbLiveshotYn(Cookies.get('mbLiveshotYn'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile === true) {
    return (
      <div className="mypage-nav-sec">
        <div className="mypage-menu">
          {!isEmpty(lnbData.lnbData)
            ? lnbData.lnbData.map((item) =>
                item.menuYn === 'Y' ? (
                  <ul key={item.menuId} data-id={`${item.menuId}`}>
                    <li className={item.lvl === 3 && isEmpty(item.tranSrc?.trim()) ? 'none' : ''}>
                      {isEmpty(item.tranSrc?.trim()) ? (
                        item.title
                      ) : (
                        <Link href={item.tranSrc}>
                          <a>{item.title}</a>
                        </Link>
                      )}
                    </li>
                    {item.children !== null
                      ? item.children.map((childrenItem) =>
                          childrenItem.menuYn === 'Y' ? (
                            <li key={childrenItem.menuId}>
                              <Link href={childrenItem.tranSrc}>
                                <a>{childrenItem.title}</a>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        )
                      : ''}
                  </ul>
                ) : (
                  ''
                )
              )
            : ''}
        </div>
      </div>
    );
  }
  return (
    <div className="mypage-menu">
      {!isEmpty(lnbData.lnbData)
        ? lnbData.lnbData.map((item) =>
            item.menuYn === 'Y' ? (
              <ul key={item.menuId}>
                <li key={item.menuId} className={item.lvl === 3 && isEmpty(item.tranSrc?.trim()) ? 'none' : ''}>
                  {isEmpty(item.tranSrc?.trim()) ? (
                    item.title
                  ) : (
                    <Link href={item.tranSrc}>
                      <a>{item.title}</a>
                    </Link>
                  )}
                </li>
                {item.children !== null
                  ? item.children.map((childrenItem) =>
                      childrenItem.menuYn === 'Y' ? (
                        <li key={childrenItem.menuId}>
                          <Link href={childrenItem.tranSrc}>
                            <a>{childrenItem.title}</a>
                          </Link>
                        </li>
                      ) : (
                        ''
                      )
                    )
                  : ''}
              </ul>
            ) : (
              ''
            )
          )
        : ''}
    </div>
  );
});

MypageNaviLnb.displayName = 'MypageNaviLnb';
export default MypageNaviLnb;
