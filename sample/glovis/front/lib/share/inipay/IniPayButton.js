import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import moment from 'moment';
import Router from 'next/router';

import Button from '@lib/share/items/Button';
import { axiosPost, apiUrl, frontUrl } from '@src/utils/HttpUtils';

import { SystemContext } from '@src/provider/SystemProvider';

const globalThis = require('globalthis')();
const today = new Date();
const addTime = 24 * 60 * 60 * 1000; //24시간

class IniPayButton extends React.Component {
  static contextType = SystemContext;

  constructor(props) {
    super(props);
    this.onPayClick = this.onHandlePayClick.bind(this);
    const paymentUrl = this.props.isMobile ? apiUrl : frontUrl;
    // hResult.put("mid", mid);
    // hResult.put("oid", oid);
    // hResult.put("price", price);
    // hResult.put("timestamp", timestamp);
    // hResult.put("signature", signature);
    // hResult.put("mKey", mKey);
    // const localHost = 'http://58.87.52.197:8080';
    this.state = {
      paymethod: '',
      acceptmethod: '',
      version: '1.0',
      // mid: 'INIpayTest',
      // oid: 'INIpayTest__1335233672723',//`INIpayTest__${}`,
      // price: 1000,
      currency: 'WON',
      buyername: '홍길동',
      buyertel: '010-1234-5678',
      buyeremail: 'test@inicis.com',
      // timestamp: new Date().getTime(),
      // signature: '47a146be53da5920f59293788f441681657d2043babe7537b45dcc02a75a397a',
      returnUrl: `${paymentUrl}/common/IniPayRequest`,
      closeUrl: `${paymentUrl}/common/IniPayClose`,
      quotabase: '2:3:4:5:6:7:8:9:10:11:12',
      ini_onlycardcode: '',
      merchantData: '',
      requestByJs: 'true',
      mobReturnUrl: `${paymentUrl}/api/common/pay/mobile/INIStdPayResponse.do`,
      mobVbankReutrnUrl: `${paymentUrl}/api/common/pay/mobile/vBankINIStdPayResponse.do`,
      // mobReturnUrl: `${localHost}/api/common/pay/mobile/INIStdPayResponse.do`,
      // mobVbankReutrnUrl: `${localHost}/api/common/pay/mobile/vBankINIStdPayResponse.do`,

      // 이니시스 결제 모듈에서 현금영수증 신청부 출력 방지
      reserved: 'vbank_receipt=N'
    };
  }

  allowRequest(e) {
    e.persist();
    // eslint-disable-next-line react/prop-types
    const { beforeRequestAsync } = this.props;
    if (this.props.onValidation) {
      const isValid = this.props.onValidation();
      if (isValid === false) {
        return;
      }
    }
    if (beforeRequestAsync) {
      beforeRequestAsync()
        .then((params) => {
          if (params === false) {
            return;
          }
          console.log('beforeRequestAsync', params);
          this.onPayClick(e, params);
        })
        .catch((error) => {
          console.error('결제 실패: ', error);
        });
    } else {
      this.onPayClick(e);
    }
  }

  componentDidMount() {
    if (this.props.isMobile) {
      this.setMobAcceptmethod();
    } else {
      const stdpayScript = document.createElement('script');
      stdpayScript.type = 'text/javascript';

      console.log('process?.env?.NODE_ENV : ', process?.env?.NODE_ENV);

      // stdpayScript.src = process?.env?.NODE_ENV === 'development' ? 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js' : 'https://stdpay.inicis.com/stdjs/INIStdPay.js';
      stdpayScript.src = 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js' //개발용
      // stdpayScript.src = 'https://stdpay.inicis.com/stdjs/INIStdPay.js' //운영용
      
      document.head.appendChild(stdpayScript);
      this.setAcceptmethod();
    }
  }

  componentDidUpdate(prevProps) {
    const { paymethod, billing = false } = this.props;
    console.log('IniPayButton -> componentDidUpdate -> paymethod', paymethod);

    if (prevProps.paymethod !== paymethod) {
      if (this.props.isMobile) {
        this.setMobAcceptmethod();
      } else {
        this.setAcceptmethod();
      }
    }
  }
  setMobAcceptmethod() {
    const mobPVbankDtTemp = today.setTime(today.getTime() + addTime);
    const mobPVbankTimeTemp = today.setTime(today.getTime() + addTime);
    const mobPVbankDt = moment(mobPVbankDtTemp).format('YYYYMMDD');
    const mobPVbankTime = moment(mobPVbankTimeTemp).format('HHmm');
    console.log('mobPVbankDt : ', mobPVbankDt);
    console.log('mobPVbankTime : ', mobPVbankTime);
  }

  setAcceptmethod() {
    const { paymethod, billing = false } = this.props;

    let acceptmethod = '';

    switch (paymethod) {
      case 'Card': {
        if (billing) acceptmethod += 'BILLAUTH(card):';
        acceptmethod += 'CARDPOINT:vbanknoreg(0):va_receipt:popreturn';
        // case 'VCard' :
        //   acceptmethod = 'VCARD:popreturn'
        // case 'DirectBank' :
        //   acceptmethod = 'VCARD:popreturn'
        // case 'HPP' :
        //   acceptmethod = `vbanknoreg(0):below1000:va_receipt:popreturn:BILLAUTH(HPP):HPP1`
        break;
      }
      // case 'VCard': {
      //   if (billing) acceptmethod += 'BILLAUTH(card):';
      //   acceptmethod += 'CARDPOINT:vbanknoreg(0):va_receipt:popreturn';
      //   break;
      // }
      case 'Acct': {
        acceptmethod = 'va_receipt:popreturn';
        break;
      }
      case 'VBank': {
        // console.log("IniPayButton -> setAcceptmethod -> today", today)
        // console.log("IniPayButton -> setAcceptmethod -> addTime", addTime)
        // today.setTime(today.getTime() + addTime);

        acceptmethod = `vbank(${moment(today)
          .add(1, 'days')
          .format('YYYYMMDD') + '0000'}):va_receipt:popreturn`;
        break;
      }
      case 'EasyPay': {
        acceptmethod = 'va_receipt:popreturn';
        break;
      }
      default:
        acceptmethod = 'CARDPOINT:vbanknoreg(0):below1000:va_receipt:popreturn';
    }

    const newState = {
      paymethod,
      acceptmethod
    };

    if (billing) {
      newState['type'] = 'Billing';
    }

    this.setState(newState);
  }

  async onHandlePayClick(e, params = {}) {
    e && e?.preventDefault();
    const { dlrPrdId, point = 0, coupon, items, prodType, type, billing, mobPayDataKey } = this.props;
    console.log('selected items : ', items);
    // const { prdNms, prdDvcds } = items.reduce(
    //   (obj, item) => {
    //     const { prdNm, prdDvcd } = item;
    //     obj.prdNms += `,'${prdNm}'`;
    //     obj.prdDvcds += `,'${prdDvcd}'`;
    //     return obj;
    //   },
    //   { prdNms: '', prdDvcds: '' }
    // );
    // console.log('params : ', params);

    const newParams = {
      dlrPrdId,
      point,
      coupon,
      // prdNms: prdNms.substring(1),
      // prdDvcds: prdDvcds.substring(1),
      items,
      prodType,
      type,
      billing,
      mobPayDataKey,
      billing,
      ...params
    };

    console.log('newParams :::::::::::::::::::::: ', newParams);

    await axiosPost('/api/common/pay/getPayData.do', newParams).then((res) => {
      const { data, statusinfo } = res?.data;
      console.log('getPayData res.data : ', res.data);
      console.log('getPayData statusinfo : ', statusinfo);
      //mid, oid, timestamp, signature
      //mid: "INIpayTest"
      //oid: "INIpayTest_1585030280993"
      //price: "1000"
      //timestamp: "1585030280993"
      //signature: "e18621eefbed9976fe8a1759ac9863330d046f91f28e0c99c0d8d2fea6828e6b"
      //mKey: "3a9503069192f207491d4b19bd743fc249a761ed94246c8c42fed06c3cd15a33"
      //cardQuotaBase: "2:3:4:5:6:11:12:24:36"
      //cardNoInterestQuota: "11-2:3:,34-5:12,14-6:12:24,12-12:36,06-9:12,01-3:4"

      if (statusinfo?.returncd === 'MBR4005') {
        console.log('this.context : ', this.context);
        const { showLoginForm } = this.context;
        console.log('IniPayButton -> onHandlePayClick -> showLoginForm', showLoginForm);
        if (showLoginForm) {
          showLoginForm(Router.router.asPath, () => {
            this.onHandlePayClick(e, params);
          });
        }
        return;
      }

      if (data) {
        const newState = {
          ...this.state,
          ...data,
          merchantData: data.merchantData + '&' + qs.stringify(params)
        };

        if (this.props.isMobile) {
          this.setState(newState, () => {
            console.log('mobIniPaySendForm => {}', document.querySelector('#mobIniPaySendForm'));

            const form = document.getElementById('mobIniPaySendForm');
            form.submit();
          });
        } else {
          this.setState(newState, () => {
            const formInfo = qs.parse(new URLSearchParams(new FormData(document.querySelector('#SendPayForm_id'))).toString());

            Object.keys(formInfo).forEach((key) => console.log(key, ' : ', formInfo[key]));

            if (typeof INIStdPay == 'object') {
              console.log('결제창');
              INIStdPay.pay('SendPayForm_id');
            }
          });
        }
      }
    });
  }

  render() {
    // const { paymethod = 'Card', point, price, coupon, goodsname, type } = this.state;
    const { paymethod, point, price, coupon, goodsname, type } = this.state;
    console.log('render -> this.props.isMobile', this.props.isMobile);

    if (this.props.isMobile) {
      return (
        <>
          <Button buttonMarkup={true} {...this.props} onClick={this.allowRequest.bind(this)} />
          <form id="mobIniPaySendForm" name="mobIniPaySendForm" method="POST" action="https://mobile.inicis.com/smart/payment/" acceptCharset="euc-kr">
            <input type="hidden" name="P_INI_PAYMENT" id="gopaymethod" value={this.props.mobPayMethod.toUpperCase()} readOnly />
            <input type="hidden" name="P_MID" id="mid" defaultValue={this.state.mid} />
            <input type="hidden" name="P_GOODS" id="goodsname" defaultValue={goodsname} />
            <input type="hidden" name="P_OID" id="oid" defaultValue={this.state.oid} />
            <input type="hidden" name="P_AMT" id="price" defaultValue={this.state.price} />
            {/* <input type="hidden" name="P_AMT" id="price" defaultValue="2000" /> */}
            <input type="hidden" name="P_UNAME" id="buyername" defaultValue={this.state.buyername} />
            <input type="hidden" name="P_EMAIL" defaultValue={this.state.buyeremail} />
            <input type="hidden" name="P_MOBILE" defaultValue={this.state.buyertel} />
            <input type="hidden" name="P_NOTI" id="merchantData" defaultValue={`${this.state.merchantData}&payMethod=${this.props.mobPayMethod.toUpperCase()}&directUrl=${this.props.directUrl}`} />
            <input type="hidden" name="P_NEXT_URL" id="returnUrl" defaultValue={this.state.mobReturnUrl} />
            <input type="hidden" name="P_ONLY_CARDCODE" id="ini_onlycardcode" defaultValue={this.state.ini_onlycardcode} />
            <input type="hidden" name="P_QUOTABASE" id="quotabase" defaultValue={this.state.quotabase} />
            <input type="hidden" name="P_RESERVED" id="reserved" defaultValue={this.state.reserved} />
            {/*가상계좌 관련 필드*/}
            <input type="hidden" name="P_NOTI_URL" id="pNotiUrl" defaultValue={this.props.mobPayMethod === 'CARD' ? '' : this.state.mobVbankReutrnUrl} />
            <input type="hidden" name="P_VBANK_DT" id="vbankDt" defaultValue={this.state.mobPVbankDt} />
            <input type="hidden" name="P_VBANK_TM" id="vbankTm" defaultValue={this.state.mobPVbankTime} />

            {/* <input type="hidden" name="version" id="version" defaultValue={this.state.version} /><br/>
            <input type="hidden" name="currency" id="currency" defaultValue={this.state.currency} /><br/>
            <input type="hidden" name="buyertel" id="buyertel" defaultValue={this.state.buyertel} /><br/>
            <input type="hidden" name="timestamp" id="timestamp" defaultValue={this.state.timestamp} /><br/>
            <input type="hidden" name="signature" id="signature" defaultValue={this.state.signature} /><br/>
            <input type="hidden" name="requestByJs" id="requestByJs" defaultValue={this.state.requestByJs} /><br/>
            <input type="hidden" name="mKey" id="mKey" defaultValue={this.state.mKey} /><br/>
            <input type="hidden" name="acceptmethod" id="acceptmethod" value={this.state.acceptmethod} readOnly /><br/>
            <input type="hidden" name="closeUrl" id="closeUrl" defaultValue={this.state.closeUrl} /><br/>

            <input type="hidden" name="offerPeriod" value='M2' readOnly /><br/>
            <input type="hidden" name="billPrint_msg" id="billPrint_msg" value="고객님의 매월 결제일은 24일 입니다." readOnly /><br/> */}
          </form>
        </>
      );
    }
    return (
      <>
        <Button buttonMarkup={true} {...this.props} onClick={this.allowRequest.bind(this)} />
        <form id="SendPayForm_id" style={{display:'none'}} name="" method="POST" action="https://stdpay.inicis.com/payMain/pay">
          <input type="hidden" name="goodsname" id="goodsname" defaultValue={goodsname} />
          <br />
          <input type="hidden" name="buyeremail" defaultValue="test@inicis.com" />
          <br />
          <input type="hidden" name="gopaymethod" id="gopaymethod" value={paymethod} readOnly />
          <br />
          <input type="hidden" name="version" id="version" defaultValue={this.state.version} />
          <br />
          <input type="hidden" name="mid" id="mid" defaultValue={this.state.mid} />
          <br />
          <input type="hidden" name="oid" id="oid" defaultValue={this.state.oid} />
          <br />
          <input type="hidden" name="price" id="price" defaultValue={this.state.price} />
          {/* <input type="hidden" name="price" id="price" defaultValue="2000" /> */}
          <br />
          <input type="hidden" name="currency" id="currency" defaultValue={this.state.currency} />
          <br />
          <input type="hidden" name="buyername" id="buyername" defaultValue={this.state.buyername} />
          <br />
          <input type="hidden" name="buyertel" id="buyertel" defaultValue={this.state.buyertel} />
          <br />
          <input type="hidden" name="timestamp" id="timestamp" defaultValue={this.state.timestamp} />
          <br />
          <input type="hidden" name="signature" id="signature" defaultValue={this.state.signature} />
          <br />
          <input type="hidden" name="returnUrl" id="returnUrl" defaultValue={this.state.returnUrl} />
          <br />
          <input type="hidden" name="requestByJs" id="requestByJs" defaultValue={this.state.requestByJs} />
          <br />
          <input type="hidden" name="mKey" id="mKey" defaultValue={this.state.mKey} />
          <br />
          <input type="hidden" name="acceptmethod" id="acceptmethod" value={this.state.acceptmethod} readOnly />
          <br />
          <input type="hidden" name="closeUrl" id="closeUrl" defaultValue={this.state.closeUrl} />
          <br />
          <input type="hidden" name="quotabase" id="quotabase" defaultValue={this.state.quotabase} />
          <br />
          <input type="hidden" name="ini_onlycardcode" id="ini_onlycardcode" defaultValue={this.state.ini_onlycardcode} />
          <br />
          <input type="hidden" name="merchantData" id="merchantData" defaultValue={this.state.merchantData} />
          <br />

          <input type="hidden" name="offerPeriod" value="M2" readOnly />
          <br />
          <input type="hidden" name="billPrint_msg" id="billPrint_msg" value="고객님의 매월 결제일은 24일 입니다." readOnly />
          <br />
        </form>
      </>
    );
  }
}

IniPayButton.propTypes = {
  directUrl: PropTypes.string,
  failUrl: PropTypes.string,
  isMobile: PropTypes.bool,
  mobPayMethod: PropTypes.string,
  onValidation: PropTypes.func
};
export default IniPayButton;
