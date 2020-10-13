import React from 'react';

class IniPayClose extends React.Component {
  render() {
    return (
      <script language="javascript" type="text/javascript" src={process?.env?.NODE_ENV === 'development' ? 'https://stgstdpay.inicis.com/stdjs/INIStdPay_close.js' : 'https://stdpay.inicis.com/stdjs/INIStdPay_close.js'} charSet="UTF-8">
        {/* 추후 false를 수정 -> process?.env?.NODE_ENV === 'development' */}
      </script>
    );
  }
}

export default IniPayClose;
