import { isUndefined } from 'lodash';
import Cookies from 'js-cookie';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { objIsEmpty } from '@src/utils/CommonUtil';

export const accessTokenValidMinute = 1000 * 60 * 15; //15분
export const refreshTokenValidMinute = 1000 * 60 * 30; //30분

const createCookie = (cookieName, cookieValue, validTime) => {
  // console.log("=====1");
  let expires = new Date();
  expires.setTime(expires.getTime() + validTime);
  Cookies.set(cookieName, cookieValue, { path: '/', expires });
};

export const isLogin = () => {
  return !objIsEmpty(Cookies.get('id'));
};

export const isLoginLiveCheck = () => {
  return !isUndefined(Cookies.get('id'));
};

export const gInfoLive = () => {
  return {
    type: Cookies.get('type'),
    membertype: Cookies.get('membertype'),
    id: Cookies.get('id'),
    name: Cookies.get('name'),
    auctPrstlsMbCustno: Cookies.get('auctPrstlsMbCustno'),
    auctPrstlsNrmlMbCustno: Cookies.get('auctPrstlsNrmlMbCustno'),
    url: Cookies.get('url')
  };
};

export const UserType = {
  MEMBER: '0010',
  NONMEMBER: 'NONE'
};

export const login = (memberId, memberPw, checkFalg = '0') => {
  let returnCd = '';
  const param = {
    mbId: memberId,
    mbPwdEnc: memberPw,
    sType: checkFalg
  };
  axiosPost('/api/auth/token.do', param, false)
    .then(({ data }) => {
      console.log('login success ---------------------------->', data);
      createCookie('accessToken', data.accessToken, accessTokenValidMinute);
      createCookie('accessTokenSession', data.accessToken); //세션 close >  쿠키삭제
      createCookie('refreshToken', data.refreshToken, refreshTokenValidMinute);
      createCookie('membertype', data.statusinfo.membertype, accessTokenValidMinute);
      createCookie('id', memberId, accessTokenValidMinute);
      createCookie('type', 'member', accessTokenValidMinute);
      createCookie('auctPrstlsMbCustno', data.auctPrstlsMbCustno, accessTokenValidMinute);
      createCookie('auctPrstlsNrmlMbCustno', data.auctPrstlsNrmlMbCustno, accessTokenValidMinute);
      //createCookie('name', name, accessTokenValidMinute);
      createCookie('menuAuthruleCd', data.menuAuthruleCd, accessTokenValidMinute);
      createCookie('mbLiveshotYn', data.mbLiveshotYn, accessTokenValidMinute);
      createCookie('mbAuthCd', data.mbAuthCd, accessTokenValidMinute);

      returnCd = 'SUCCESS';
    })
    .catch((err) => {
      console.log(err);
      console.log('login failed ---------------------------->', err);

      returnCd = 'FAIL';
    });

  return returnCd;
};

export const nonmemberlogin = (mbStrPn, mbNm) => {
  // let returnCd = '';
  const param = {
    mbStrPn: mbStrPn,
    mbNm: mbNm
  };
  const returnCd = axiosPost('/api/auth/nonmembertoken.do', param, false)
    .then(({ data }) => {
      console.log('login success ---------------------------->', data);
      createCookie('accessToken', data.accessToken, accessTokenValidMinute);
      createCookie('accessTokenSession', data.accessToken); //세션 close >  쿠키삭제
      createCookie('refreshToken', data.refreshToken, refreshTokenValidMinute);
      createCookie('membertype', data.statusinfo.membertype, accessTokenValidMinute);
      createCookie('id', mbStrPn, accessTokenValidMinute);
      createCookie('auctPrstlsMbCustno', '', accessTokenValidMinute);
      createCookie('auctPrstlsNrmlMbCustno', '', accessTokenValidMinute);
      createCookie('type', 'nonmember', accessTokenValidMinute);
      createCookie('name', mbNm, accessTokenValidMinute);
      createCookie('menuAuthruleCd', data.menuAuthruleCd, accessTokenValidMinute);
      createCookie('mbLiveshotYn', data.mbLiveshotYn, accessTokenValidMinute);
      createCookie('mbAuthCd', data.mbAuthCd, accessTokenValidMinute);

      return 'SUCCESS';
    })
    .catch((err) => {
      console.log(err);
      console.log('login failed ---------------------------->', err);

      return 'FAIL';
    });

  return returnCd;
};

export function getMemberType() {
  let memberType = '';

  if (isLogin() === true) {
    memberType = Cookies.get('membertype') || '';
  }

  return memberType;
}

export function getMenuAuthruleCd() {
  let menuAuthruleCd = '';

  if (isLogin() === true) {
    menuAuthruleCd = Cookies.get('menuAuthruleCd') || '';
  }

  return menuAuthruleCd;
}

export function getMemberPhoto(memberId) {
  let imgUrl = null;

  try {
    const str = Cookies.get('memberImgInfo');
    const json = JSON.parse(str);

    if (json.memberId === Cookies.get('id')) {
      imgUrl = json.imgUrl;
    }
  } catch {
    imgUrl = null;
  }

  if (objIsEmpty(imgUrl)) {
    return new Promise((resolve) => {
      if (memberId) {
        axiosGet(`/api/member/getMemberPhoto.do?mbId=${memberId}`)
          .then((res) => {
            createCookie('memberImgInfo', JSON.stringify({ memberId, imgUrl: res.data.data }), accessTokenValidMinute);
            resolve(res.data.data);
          })
          .catch(() => {
            resolve(null);
          });
      } else {
        resolve(null);
      }
    });
  }

  return new Promise((resolve) => {
    resolve(imgUrl);
  });
}

/*
export const validateSession =({accessToken, refreshToken}) => {
  var decoded = jwt.verify(accessToken, secretKey, {
    ignoreExpiration: true //handled by OAuth2 server implementation
});


}
*/
export function setCookieExpireTime(validTime) {
  const expires = new Date();
  expires.setTime(expires.getTime() + validTime);
  return { path: '/', expires };
}
