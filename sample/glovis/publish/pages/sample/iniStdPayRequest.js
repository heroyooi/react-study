import React from 'react';
import { isEqual } from 'lodash';
import Button from '@lib/share/items/Button';
import { axiosGet } from '@src/utils/HttpUtils';

class IniStdPayRequest extends React.Component {
  constructor(props) {
    super(props);
    this.onPayClick = this.onHandlePayClick.bind(this);

    this.state = {
      payData: null
    };
  }

  componentDidMount() {
    const jqueryUiScript = document.createElement('script');
    jqueryUiScript.type = 'text/javascript';
    jqueryUiScript.src = '//static.priviatravel.com/js/common/plugin/jquery-1.8.2.js';
    document.head.appendChild(jqueryUiScript);

    const crossplatformScript = document.createElement('script');
    crossplatformScript.type = 'text/javascript';
    crossplatformScript.src = 'https://xpay.uplus.co.kr/xpay/js/xpay_crossplatform.js';
    document.head.appendChild(crossplatformScript);

    const stdpayScript = document.createElement('script');
    stdpayScript.type = 'text/javascript';
    stdpayScript.src = 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js';
    document.head.appendChild(stdpayScript);

    const thirdpartyScript = document.createElement('script');
    thirdpartyScript.type = 'text/javascript';
    thirdpartyScript.src = 'https://stdux.inicis.com/stdpay/stdjs/INIStdPay_third-party.js';
    document.head.appendChild(thirdpartyScript);

    axiosGet('http://localhost:9091/api/pay/getpaydata', null, false).then((res) => {
      console.log(res.data);

      this.setState({ payData: res.data });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.state.payData, nextState.payData)) {
      return true;
    }

    return false;
  }

  onHandlePayClick(e) {
    e.preventDefault();

    // eslint-disable-next-line no-undef
    if (INIStdPay) {
      // eslint-disable-next-line no-undef
      INIStdPay.pay('SendPayForm_id');
    }
  }

  render() {
    if (this.state.payData === null) {
      return null;
    }
    console.log('this.state.payData', this.state.payData);
    return (
      <React.Fragment>
        <div style={{ padding: '10px', width: '100%', fontSize: '14px', color: '#ffffff', backgroundColor: '#000', textAlign: 'center' }}>이니시스 표준결제 결제요청 샘플</div>
        <table width="650" border="0" cellSpacing="0" cellPadding="0" style={{ padding: '10px' }} align="center">
          <tbody>
            <tr>
              <td bgcolor="6095BC" align="center" style={{ padding: '10px' }}>
                <table width="100%" border="0" cellSpacing="0" cellPadding="0" bgcolor="#FFFFFF" style={{ padding: '20px' }}>
                  <tbody>
                    <tr>
                      <td>
                        이 페이지는 INIpay Standard 결제요청을 위한 예시입니다.
                        <br />
                        <br />
                        결제처리를 위한 action등의 모든 동작은 Import 된 스크립트에 의해 자동처리됩니다.
                        <br />
                        <br />
                        Form에 설정된 모든 필드의 name은 대소문자 구분하며,
                        <br />
                        이 Sample은 결제를 위해서 설정된 Form은 테스트 / 이해돕기를 위해서 모두 type=&quot;text&quot;로 설정되어 있습니다.
                        <br />
                        운영에 적용시에는 일부 가맹점에서 필요에 의해 사용자가 변경하는 경우를 제외하고
                        <br />
                        모두 type=&quot;hidden&quot;으로 변경하여 사용하시기 바랍니다.
                        <br />
                        <br />
                        <font color="#336699">
                          <strong>함께 제공되는 매뉴얼을 참조하여 작성 개발하시기 바랍니다.</strong>
                        </font>
                        <br />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button size="mid" background="blue80" title="결제요청" width={180} onClick={this.onPayClick} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: 'left' }}>
                                <form id="SendPayForm_id" name="" method="POST" action="https://stdpay.inicis.com/payMain/pay">
                                  <b>***** 필 수 *****</b>
                                  <div style={{ border: '2px #dddddd double', padding: '10px', backgroundColor: '#f3f3f3' }}>
                                    <br />
                                    <input style={{ width: '100%' }} name="version" id="version" readOnly={true} value={this.state.payData.version} />
                                    <br />
                                    <b>mid</b> :
                                    <br />
                                    <input style={{ width: '100%' }} name="mid" id="mid" readOnly={true} value={this.state.payData.mid} />
                                    <br />
                                    <b>goodname</b> :
                                    <br />
                                    <input style={{ width: '100%' }} name="goodname" id="goodname" readOnly={true} value={this.state.payData.goodname} />
                                    <br />
                                    <b>oid</b> :
                                    <br />
                                    <input style={{ width: '100%' }} name="oid" id="oid" readOnly={true} value={this.state.payData.oid} />
                                    <br />
                                    <b>price</b> :
                                    <br />
                                    <input style={{ width: '100%' }} name="price" id="price" readOnly={true} value={this.state.payData.price} />
                                    <br />
                                    <b>currency</b> :
                                    <br />
                                    [WON|USD]
                                    <br />
                                    <input style={{ width: '100%' }} name="currency" id="currency" readOnly={true} value={this.state.payData.currency} />
                                    <br />
                                    <b>buyername</b> :
                                    <br />
                                    <input style={{ width: '100%' }} name="buyername" id="buyername" readOnly={true} value={this.state.payData.buyername} />
                                    <br />
                                    <b>buyertel</b> :
                                    <br />
                                    <input style={{ width: '100%' }} name="buyertel" id="buyertel" readOnly={true} value={this.state.payData.buyertel} />
                                    <br />
                                    <b>buyeremail</b> :
                                    <br />
                                    <input style={{ width: '100%' }} name="buyeremail" readOnly={true} value="test@inicis.com" />
                                    <input type="text" style={{ width: '100%' }} name="timestamp" id="timestamp" readOnly={true} value={this.state.payData.timestamp} />
                                    <input type="text" style={{ width: '100%' }} name="signature" id="signature" readOnly={true} value={this.state.payData.signature} />
                                    <br />
                                    <b>returnUrl</b> :
                                    <br />
                                    <input style={{ width: '100%' }} name="returnUrl" id="returnUrl" readOnly={true} value={this.state.payData.returnUrl} />
                                    <input type="text" name="mKey" id="mKey" readOnly={true} value={this.state.payData.mKey} />
                                  </div>

                                  <br />
                                  <br />
                                  <b>***** 기본 옵션 *****</b>
                                  <div style={{ border: '2px #dddddd double', padding: '10px', backgroundColor: '#f3f3f3' }}>
                                    <b>gopaymethod</b> : 결제 수단 선택
                                    <br />
                                    ex) Card (계약 결제 수단이 존재하지 않을 경우 에러로 리턴)
                                    <br />
                                    사용 가능한 입력 값
                                    <br />
                                    Card,DirectBank,HPP,Vbank,kpay,Swallet,Paypin,EasyPay,PhoneBill,GiftCard,EWallet
                                    <br />
                                    onlypoint,onlyocb,onyocbplus,onlygspt,onlygsptplus,onlyupnt,onlyupntplus
                                    <br />
                                    <input style={{ width: '100%' }} name="gopaymethod" id="gopaymethod" readOnly={true} value={this.state.payData.gopaymethod} />
                                    <b>acceptmethod</b> : acceptmethod
                                    <br />
                                    acceptmethod ex) CARDPOINT:SLIMQUOTA(코드-개월:개월):no_receipt:va_receipt:vbanknoreg(0):vbank(20150425):va_ckprice:vbanknoreg:
                                    <br />
                                    KWPY_TYPE(0):KWPY_VAT(10|0) 기타 옵션 정보 및 설명은 연동정의보 참조 구분자 &quot;:&quot;
                                    <br />
                                    <input style={{ width: '100%' }} name="acceptmethod" id="acceptmethod" readOnly={true} value={this.state.payData.acceptmethod} />
                                  </div>

                                  <br />
                                  <br />
                                  <b>***** 표시 옵션 *****</b>
                                  <div style={{ border: '2px #dddddd double', padding: '10px', backgroundColor: '#f3f3f3' }}>
                                    <br />
                                    close.jsp 샘플사용(생략가능, 미설정시 사용자에 의해 취소 버튼 클릭시 인증결과 페이지로 취소 결과를 보냅니다.)
                                    <br />
                                    <input style={{ width: '100%' }} name="closeUrl" id="closeUrl" readOnly={true} value={this.state.payData.closeUrl} />
                                    <br />
                                    <b>popupUrl</b> : payViewType=&#39;popup&#39;시 팝업을 띄울수 있도록 처리해주는 URL(가맹점에 맞게 설정)
                                    <br />
                                    popup.jsp 샘플사용(생략가능,payViewType=&#39;popup&#39;으로 사용시에는 반드시 설정)
                                    <br />
                                  </div>

                                  <b>***** 결제 수단별 옵션 *****</b>
                                  <br />
                                  <b>-- 카드(간편결제도 사용) --</b>
                                  <div style={{ border: '2px #cccccc solid', padding: '10px', backgroundColor: '#f3f3f3' }}>
                                    <br />
                                    <b>quotabase</b> : 할부 개월 설정
                                    <br />
                                    ex) 2:3:4
                                    <br />
                                    <input style={{ width: '100%' }} name="quotabase" id="quotabase" readOnly={true} value={this.state.payData.quotabase} />
                                    <br />
                                    <b>ini_onlycardcode</b> : 중복 카드 코드
                                    <br />
                                    ex) 01:03:04:11
                                    <br />
                                    <input style={{ width: '100%' }} name="ini_onlycardcode" id="ini_onlycardcode" readOnly={true} value={this.state.payData.ini_onlycardcode} />
                                  </div>

                                  <br />
                                  <br />
                                  <b>***** 추가 옵션 *****</b>
                                  <div style={{ border: '2px #dddddd double', padding: '10px', backgroundColor: '#f3f3f3' }}>
                                    <br />
                                    <b>merchantData</b> : 가맹점 관리데이터(2000byte)
                                    <br />
                                    인증결과 리턴시 함께 전달됨(한글 지원 안됨, 개인정보 암호화(권장))
                                    <br />
                                    <input style={{ width: '100%' }} name="merchantData" id="merchantData" readOnly={true} value={this.state.payData.merchantData} />
                                  </div>
                                  <input id="requestByJs" name="requestByJs" type="text" readOnly={true} value={this.state.payData.requestByJs} />
                                </form>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default IniStdPayRequest;
