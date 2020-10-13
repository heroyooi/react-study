import qs from 'qs';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { selectMbInfo } from '@src/api/common/memberApi';
import { location } from 'globalthis/implementation';
const globalThis = require('globalthis')();

export default class RenderHelper {
  constructor(http) {
    const { reduxStore, req, res } = http;
    this.http = http;
    this.isServer = !!req;
    this.req = req;
    this.res = res;
    this.reduxStore = reduxStore;
    this.redirectUrl = `/error`;
    this.url = this?.req?.originalUrl ?? this?.http?.asPath;
    this.pathname = this?.req?._parsedUrl?.pathname ?? this?.http?.pathname;
    this.host = this?.isServer ? `http://${this?.http?.req?.headers?.host}` : globalThis?.window?.location?.origin;
    this.query = this?.req?.query || this?.http?.query || {};
    this.accessToken = this?.req?.cookies?.accessToken ?? Cookies.get('accessToken') ?? null
    this.memberInfo = null;
    this.code = null;
    this.message = '';
    this.subMessage = '';
  }
  //에러 발생시 리디렉션할 페이지 설정
  setRedirectUrl(url, params) {
    this.redirectUrl = url;
    if (params) {
      this.redirectUrl +
        '?' +
        qs.stringify(params);
    }
    return this;
  }
  //필수로 가지고 있어야할 param 설정. 없으면 리디렉트
  requiredQuery(...params) {
    if (!params.every((param) => this.query?.[param] !== undefined && this.query?.[param] !== null)) {
      this.redirect();
    }
    return this;
  }
  redirect(url) {
    const newRedirectUrl = url || this.redirectUrl;

    if (this.isServer) {
      this.res.writeHead(302, {
        Location: newRedirectUrl
      });
      this.res.end();
    } else {
      // Router.push(newRedirectUrl);
      globalThis.window.location.href = newRedirectUrl
    }
    return this;
  }

  error(errorInfo = {}) {
    const {code = this.code, message=this.message, subMessage=this.subMessage} = errorInfo
    if(code || message){
      let errorPage = `/error?` + qs.stringify({
        code,
        message,
        subMessage
      })
      if(this.isServer) {
        this.res.writeHead(302, {
          Location: errorPage
        });
        this.res.end();
      } else {
        Router.push(errorPage);
      }
    }
    return this;
  }

  accessControl(){
    if(!this.accessToken){
      console.info('this.accessToken : ', this.accessToken)
      this.redirect('/login' + '?' + qs.stringify({url:this.url}))
    }
    return this
  }

  async memberAccessControlAsync(){
    const result = await selectMbInfo().then(res => res?.data)
    const {data, statusinfo} = result

    if(statusinfo.returncd === '000'){
      this.memberInfo = data
      const { mbTpcd, useRestrictDivCd } = data
      if(!['0020','0030', '0040'].includes(mbTpcd)){
        this.code = 403
        this.message = '딜러회원만 접근 할 수 있습니다.'
        this.subMessage = '회원정보를 확인해주십시요.'
      } else if(!!useRestrictDivCd){
        this.code = 403
        this.message = '접근 제한된 회원입니다.'
        this.subMessage = '회원정보를 확인해주십시요.'
      }
    }
    return result
  }
  
  async dispatch(...actions) {
    const results = await Promise.all(actions.map((action) => this.reduxStore.dispatch(action))).catch((error) => {
      console.error(error);
      this.redirect();
    });
    return results;
  }
}
