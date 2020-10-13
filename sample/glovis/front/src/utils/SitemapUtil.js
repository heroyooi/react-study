import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';

export function getMyPageUrl(memberType, hasMobile) {
  //const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);

  console.log('getMyPageUrl>memberType=%o,cookies.membertype=%o,cookies.membertype=%o', memberType, Cookies.get('membertype'), Cookies.get('type'));
  if (memberType === '0010' || Cookies.get('membertype') === '0010' || (isEmpty(Cookies.get('membertype')) && Cookies.get('type') === 'nonmember')) {
    return '/mypage/personal/personalMain';
  }

  if (hasMobile === true) {
    return '/mypage/dealer/sellcar/carManagement?management=dealerMain';
  }
  return '/mypage/dealer/sellcar/carManagement';
}

export function getIsPersonalMember(memberType) {
  let isPersonal = false;
  //|| (isEmpty(Cookies.get('membertype')) && Cookies.get('type') === 'nonmember') 비회원
  if (memberType === '0010' || Cookies.get('membertype') === '0010') {
    isPersonal = true;
  }
  console.log('SiteMap>getIsPersonalMember()>isPersonal=%o, memberType=%o, cookies.membertype=%o, cookies.type=%o', isPersonal, memberType, Cookies.get('membertype'), Cookies.get('type'));
  return isPersonal;
}

export function getDomainUrl(domainName) {
  switch (domainName) {
    case 'home':
      return '/main';
    case 'login':
      return '/login';
    case 'liveShotAssign':
      return '/mypage/dealer/sellcar/liveAssignList';
    case 'memberJoin':
      return '/member/choiceMemberType';
    case 'pricingSystem':
      return '/pricingSystem/pricing';
  }
}

export function getQuickMenus() {
  return [
    { title: '최근 본 차량', idx: 1, url: '/mypage/personal/buycar/interestCar?seq=1', className: 'qm-recent' },
    { title: '관심차량', idx: 2, url: '/mypage/personal/buycar/interestCar?seq=2', className: 'qm-inter' },
    { title: '차량비교함', idx: 3, url: '/mypage/personal/buycar/interestCar?seq=3', className: 'qm-compare' }
  ];
}

export function getAppDownloadUrl() {
  if (typeof window !== 'undefined' && navigator && navigator.userAgent) {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.match('android') !== null) {
      return 'https://play.google.com/store/apps/details?id=glovis.glovisaa.autobell';
    } else if (varUA.includes('iphone') || varUA.includes('ipad') || varUA.includes('ipod')) {
      return 'https://apps.apple.com/kr/app/id1492011865?mt=8';
    }
  }

  return '';
}
