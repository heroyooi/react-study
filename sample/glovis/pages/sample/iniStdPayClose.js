import React from 'react';
import { withRouter } from 'next/router';

class iniStdPayClose extends React.Component {
  constructor(props) {
    super(props);
    this.onPayClick = this.onHandlePayClick.bind(this);
  }

  componentDidMount() {
    const jqueryUiScript = document.createElement('script');
    jqueryUiScript.type = 'text/javascript';
    jqueryUiScript.src = 'https://stgstdpay.inicis.com/stdjs/INIStdPay_close.js';
    document.head.appendChild(jqueryUiScript);

    console.log(this.props);
  }

  shouldComponentUpdate() {
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
    return (
      <React.Fragment>
        <div style={{ padding: '10px', width: '100%', fontSize: '14px', color: '#ffffff', backgroundColor: '#000', textAlign: 'center' }}>
          이니시스 표준결제 인증결과 수신 / 승인요청, 승인결과 표시 샘플
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(iniStdPayClose);
