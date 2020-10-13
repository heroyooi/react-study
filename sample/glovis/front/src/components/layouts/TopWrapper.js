import React, { memo, useState, useEffect, createContext, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGnbMenuList } from '@src/actions/layout/layoutAction';
import { getTreeFromFlatData } from '@lib/share/tree/tree-data-utils';
import Header from './Header';
import SiteMap from './SiteMap';
import { useCookies } from 'react-cookie';
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';

export const CommonContext = createContext();
const TopWrapper = memo(() => {
  const [siteMapActive, setSiteMapActive] = useState(false);
  const [headerFix, setHeaderFix] = useState(false);
  // const [currentY, setCurrentY] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
  const isSection = useSelector((state) => state.common.isSection);
  const hasMobile = useSelector((state) => state.common.hasMobile); //모바일 페이지 여부

  const onScroll = useCallback(() => {
    const wrapEl = document.getElementById('wrap');
    const topEl = document.getElementById('top-area');
    const target = !hasMobile ? window.pageYOffset : wrapEl.scrollTop;
    const scTop = hasMobile && topEl.childElementCount > 0 ? topEl.scrollHeight : 0;
    if (target > scTop) {
      if (headerFix === false) setHeaderFix(true);
    } else {
      if (headerFix === true) setHeaderFix(false);
    }
  }, [headerFix]);

  // const { isLogin, membertype, loginReturnCheckCd } = useSelector((state) => ({
  //   membertype: state.login.membertype,
  //   loginReturnCheckCd: state.login.loginReturnCd,
  //   isLogin: state.login.isLogin
  // }));

  useEffect(() => {
    const wrapEl = document.getElementById('wrap');
    const topEl = document.getElementById('top-area');
    const target = !hasMobile ? window.pageYOffset : wrapEl.scrollTop;
    const scTop = hasMobile && topEl.childElementCount > 0 ? topEl.scrollHeight : 0;
    setHeaderFix(target > scTop ? true : false);
    if (!hasMobile) {
      window.addEventListener('scroll', onScroll);
    } else {
      document.querySelector('#wrap').addEventListener('scroll', onScroll);
    }
    return () => {
      if (!hasMobile) {
        window.removeEventListener('scroll', onScroll);
      } else {
        document.querySelector('#wrap').removeEventListener('scroll', onScroll);
      }
    };
  }, [headerFix]);

  const gnbMenuList = useSelector((state) => state.layout.gnbMenuList);
  const { menuAuthruleCd } = useSelector((state) => ({ menuAuthruleCd: state.login.menuAuthruleCd }));

  const [treeData, setTreeData] = useState(gnbMenuList || []);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('TopWrapper>useEffect>>gnb조회 [menuAuthruleCd]=%o, [cookies.membertype]=%o,[gnbMenuList]=%o', Cookies.get('menuAuthruleCd'), cookies.membertype, gnbMenuList);

    if (isEmpty(cookies.membertype) || cookies.membertype === undefined) {
      dispatch(getGnbMenuList({ siteDivCd: hasMobile ? '0030' : '0010', authRuleCd: hasMobile ? 'MA1' : 'A1' })); //메뉴조회 > 비로그인
    } else {
      dispatch(getGnbMenuList({ siteDivCd: hasMobile ? '0030' : '0010', authRuleCd: hasMobile ? 'M' + Cookies.get('menuAuthruleCd') : Cookies.get('menuAuthruleCd') })); //메뉴조회 > 회원타입별 조회
    }
  }, [menuAuthruleCd]);

  useEffect(() => {
    // console.log('useEffect>gnb조회 > 트리변환 전1 [gnbMenuList]=%o', gnbMenuList);
    // if (!isEmpty(gnbMenuList)) {
    const treeFromFlatData = getTreeFromFlatData({
      flatData: gnbMenuList,
      getKey: (node) => node.menuId,
      getParentKey: (node) => node.upMenuId,
      rootKey: null
    });
    // console.log('useEffect>gnb조회>트리변환 후  [treeFromFlatData]=%o', treeFromFlatData);

    if (treeFromFlatData.length > 0) setTreeData(treeFromFlatData[0].children);
    // }
  }, [gnbMenuList]);

  const commonValue = useMemo(
    () => ({
      siteMapActive,
      setSiteMapActive,
      headerFix
    }),
    [siteMapActive, headerFix]
  );

  return (
    <CommonContext.Provider value={commonValue}>
      {hasMobile && <div id="top-area"></div>}
      <Header menuTreeData={treeData} />
      {siteMapActive && <SiteMap active={siteMapActive} menuTreeData={treeData} />}
    </CommonContext.Provider>
  );
});

TopWrapper.displayName = 'TopWrapper';
export default TopWrapper;
