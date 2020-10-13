import React from 'react';
import qs from 'qs'

import { axiosPost } from '@src/utils/HttpUtils';
import RenderHelper from '@lib/share/render/helper';

const globalThis = require('globalthis')();
const frontUrl = globalThis?.window?.location?.origin;

class IniPayRequest extends React.Component {
  componentDidMount() {
    console.log('inicisCallback postMessage :::: ', this.props)
    globalThis?.window?.parent?.postMessage(this.props, frontUrl);
  }

  render() {
    return <>{/* <script language="javascript" type="text/javascript" src="https://stgstdpay.inicis.com/stdjs/INIStdPay_close.js" charSet="UTF-8"></script> */}</>;
  }
}

IniPayRequest.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { isServer, req } = helper;
  if (!isServer) {
    return {};
  }
  console.log('IniPayRequest.getInitialProps :::::::::::::::::: req', req);
  console.log('IniPayRequest.getInitialProps :::::::::::::::::: req.body', req.body);
  const result = await axiosPost(`/api/common/pay/INIStdPayResponse.do`, req.body).then((res) => res?.data);

  const { data, statusinfo, vbankinfo }  = result || {}
  console.log("IniPayRequest.getInitialProps :::::::::::::::::: result", result)
  // const authResult  = JSON.parse(authResultString)
  // const { authSignature, buyerTel, buyerName, resultMsg, custEmail, CARD_PurchaseName } = authResult
  // const { mid, authToken, resultCode, netCancelUrl, charset, format } = req.body

  return {
    data, statusinfo, vbankinfo, merchantData : qs.parse(req.body?.merchantData), 
  }
};

export default IniPayRequest;
