import React from 'react';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { getAppDownloadUrl } from '@src/utils/SitemapUtil';

class AutobellAppDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appUrl: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ appUrl: getAppDownloadUrl() });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.appUrl !== this.state.appUrl) {
      return true;
    }

    return false;
  }

  render() {
    return (
      
      <div className="popup-app-down">
        <div className="img-wrap">
          <img src="/images/common/app-down-bg.png" alt="앱 다운로드 이미지" />
        </div>
        <p className="tit">기기별 QR 코드 스캔하여 받기</p>
        <ul className="qrcode-img-wrap">
          <li>
            <img src="/images/common/android-appstore-qrcode.png" alt="앱 다운로드 이미지" />
            안드로이드용<br />(갤럭시 등)
          </li>
          <li>
            <img src="/images/common/ios-appstore-qrcode.png" alt="앱 다운로드 이미지" />
            iOS용<br />(아이폰)
          </li>
        </ul>
      </div>
      

      // <div className="con-wrap compact">
      //   <p>오토벨 앱은 현재 앱스토어 등록 절차를 진행중에 있습니다.<br />앱 다운을 원하시면 오토비즈개발팀 이도형 사원(02-6191-8902) 에게 문의주세요.</p>
      // </div>
    );
  }
}

export default AutobellAppDownload;
