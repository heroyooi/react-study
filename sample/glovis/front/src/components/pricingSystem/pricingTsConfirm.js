import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { axiosGet } from '@src/utils/HttpUtils';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { setPricingCarInfoClear } from '@src/actions/pricing/pricingSystemActions';

class PricingTsConfirm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tsHashValue: null,
      tsTimeStamp: null,
      tsSvcCodeArr: null,
      certify: false,
      isCertIng: false,
      uiWidth: this.props.hasTsCert ? 210 : 112,
      uiWidth2: this.props.hasTsCert ? 343 : 694,
      apiUrl: this.props.designMode === 'selfStep' || this.props.designMode === 'freeStep' ? 'https://testautobell.glovis.net' : 'https://price.glovisaa.com'
    };

    this.handleCertToggle = this.onHandleCertToggle.bind(this);
    this.handleChange = this.onHandleChange.bind(this);
    this.handleSubmit = this.onHandleSubmit.bind(this);
    this.handleCarNoChanged = this.onHandlehCarNoChanged.bind(this);
    this.handleNameChanged = this.onHandlehNameChanged.bind(this);
    this.handleCancelSubmit = this.onHandleCancelSubmit.bind(this);
    this.tsWindow = null;
    this.tsTimer = null;
    this.rootCounter = 0;
    this.isWillUnmount = false;
  }

  componentWillUnmount() {
    this.isWillUnmount = true;
    if (this.tsTimer) {
      clearInterval(this.tsTimer);
      this.tsTimer = null;
    }
  }

  onHandlehCarNoChanged(e) {
    if (this.props.onCrNoChanged) {
      this.props.onCrNoChanged(e);
    }
  }

  onHandlehNameChanged(e) {
    if (this.props.onNameChanged) {
      this.props.onNameChanged(e);
    }
  }

  onHandleCancelSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (this.props.onCancel) {
      this.props.onCancel(e);
    }
  }

  onHandleCertToggle(e) {
    e.preventDefault();

    if (process.env.systemEnv !== 'local') {
      if (this.props.isIE === true && window.navigator && window.navigator.userAgent.includes('Windows NT 6.1') === true) {
        // eslint-disable-next-line no-alert
        alert('Window7 운영체제 상 Internet Explorer는 이용이 불가합니다.\n크롬브라우저로 접속하시거나, 차량정보 입력 조회를 이용해주세요.');
        return;
      }
    }

    if (this.isWillUnmount === false) {
      this.setState({ certify: !this.state.certify });
    }
  }

  onHandleChange(e) {
    if (this.isWillUnmount === false) {
      this.setState({ value: e.target.value });
    }
  }

  onHandleSubmit(e) {
    e.preventDefault();
    this.rootCounter = 0;
    this.tsWindow = null;
    this.props.onSetPricingCarInfoClear();

    if (this.tsTimer) {
      clearInterval(this.tsTimer);
      this.tsTimer = null;
    }

    if (this.props.canUseOwnerName === true && objIsEmpty(this.props.ownerName)) {
      // eslint-disable-next-line no-alert
      alert('소유자 성명을 입력하여 주십시오.');
      return;
    }

    if (objIsEmpty(this.props.crNo)) {
      // eslint-disable-next-line no-alert
      alert('차량번호를 입력 하여 주십시오.');
      return;
    }

    if (this.props.designMode === 'selfStep' || this.props.designMode === 'freeStep') {
      if (this.props.hasTsCert === false || process.env.systemEnv === 'local') {
        if (this.props.onCertComplete) {
          this.props.onCertComplete({ crNo: this.props.crNo, hashValue: this.state.tsHashValue });
        }
        return;
      }
    } else {
      if (this.props.hasTsCert === false || process.env.systemEnv === 'local' || process.env.systemEnv === 'production') {
        if (this.props.onCertComplete) {
          this.props.onCertComplete({});
        }
        return;
      }
    }

    axiosGet(`${this.state.apiUrl}/api/ts/data/getTsConfirmValue.do?carNo=${this.props.crNo}&userNm=${this.props.ownerName}`).then((res) => {
      const result = res.data.data;
      if (this.isWillUnmount === false) {
        this.setState(
          {
            tsHashValue: result.hashValue,
            tsTimeStamp: result.timeStamp,
            tsSvcCodeArr: result.svcCodeArr
          },
          () => {
            const tsForm = document.querySelector('#provideHashFromUnifixed');
            this.tsWindow = window.open('', 'privde', 'height=0, width=0');
            this.tsTimer = setInterval(() => {
              if (this.tsWindow.closed) {
                clearInterval(this.tsTimer);
                setTimeout(() => {
                  this.onCheckCert();
                }, 100);
                this.tsTimer = null;
              }
            }, 1000);
            tsForm.target = 'privde';
            try {
              if (this.props.isIE === true) {
                document.charset = 'euc-kr';
              }
            } catch {}
            tsForm.submit();
            try {
              if (this.props.isIE === true) {
                document.charset = 'utf-8';
              }
            } catch {}
          }
        );
      }
    });
  }

  onCheckCert() {
    axiosGet(`${this.state.apiUrl}/api/ts/data/chkTsComfirm.do?hashvalue=${this.state.tsHashValue}`)
      .then((res) => {
        if (this.isWillUnmount === false) {
          const payload = res;
          if (this.rootCounter >= 3) {
            this.setState({ isCertIng: false });
          } else if (payload && payload.data && payload.data.statusRes && payload.data.statusRes.returncd === '000') {
            if (payload.data && payload.data.data && payload.data.data.isSuccess === 'Y') {
              if (this.tsTimer) {
                clearInterval(this.tsTimer);
                this.tsTimer = null;
              }
              if (this.props.onCertComplete) {
                if (this.props.designMode === 'selfStep' || this.props.designMode === 'freeStep') {
                  this.props.onCertComplete({ crNo: this.props.crNo, hashValue: this.state.tsHashValue });
                } else {
                  this.props.onCertComplete({});
                }
              }
              this.setState({ isCertIng: false });
            } else {
              this.setState({ isCertIng: true });
              setTimeout(() => {
                this.onCheckCert();
                this.rootCounter += 1;
              }, 2000);
            }
          } else if (payload && payload.data && payload.data.statusRes && payload.data.statusRes.returnmsg) {
            alert(payload.data.statusRes.returnmsg);
          }
        }
      })
      .catch((err) => {
        alert(err.message);
        if (this.isWillUnmount === false) {
          this.setState({ isCertIng: false });
        }
      });
  }

  renderTsForm() {
    return (
      <>
        <form method="post" action="https://car365.go.kr/aio365/provide/ProvideContent.do" id="provideHashFromUnifixed" name="provideHashFromUnifixed" acceptCharset="euc-kr">
          <input type="hidden" id="hashValue" name="hashValue" value={this.state.tsHashValue || ''} />
          <input type="hidden" id="timeStamp" name="timeStamp" value={this.state.tsTimeStamp || ''} />
          <input type="hidden" id="svcCodeArr" name="svcCodeArr" value={this.state.tsSvcCodeArr || ''} />
          <input type="hidden" id="svcType" name="svcType" value="Y" />
          <input type="hidden" id="carOwner" name="carOwner" value={this.props.ownerName} />
          <input type="hidden" id="carRegNo" name="carRegNo" value={this.props.crNo} />
          <input type="hidden" id="returnURLA" name="returnURLA" value={`${this.state.apiUrl}/api/ts/data/getSuccesTsCompInfo.do?hashvalue=${this.state.tsHashValue}&recCode=A`} />
          <input type="hidden" id="returnURLD" name="returnURLD" value={`${this.state.apiUrl}/api/ts/data/getSuccesTsCompInfo.do?hashvalue=${this.state.tsHashValue}&recCode=D`} />
        </form>
        {this.state.isCertIng === true ? (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={40} color={'#fff'} loading={true} />
          </div>
        ) : null}
      </>
    );
  }

  render() {
    if (this.props.hasMobile === true) {
      // 셀프 판매, 무평가 판매
      if (this.props.designMode === 'selfStep' || this.props.designMode === 'freeStep') {
        return (
          <>
            <div className="sell-login-wrap">
              <form className="login-form">
                <fieldset>
                  <legend className="away">차량 소유자 정보 확인</legend>
                  <ul className="vert-step">
                    <li>
                      <div className="con">
                        <p className="tit">
                          <strong>판매하려는 차량의 소유자를 확인합니다.</strong>
                          <br />
                          자동차등록증 상의 소유자 이름과 차량번호를 <br />
                          입력해주세요.
                        </p>
                        <ul>
                          <li>
                            <label htmlFor="m-user-name" className="hide">
                              이름
                            </label>
                            <Input type="text" placeHolder="이름을 입력해주세요." id="m-user-name" height={48} onChange={this.handleNameChanged} />
                          </li>
                          <li className="mt16">
                            <label htmlFor="m-user-num" className="hide">
                              차량번호
                            </label>
                            <Input type="text" placeHolder="차량번호를 입력해 주세요(예: 12가1234)" id="m-user-num" height={48} onChange={this.handleCarNoChanged} />
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </fieldset>
              </form>
              <Button className="fixed" size="full" background="blue80" title="인증진행" onClick={this.handleSubmit} />
            </div>
            {this.renderTsForm()}
          </>
        );
      }

      return (
        <>
          {this.props.canUseOwnerName === true ? (
            <div className="car-num-cont">
              <Input type="text" placeHolder="이름을 입력해 주세요." width="100%" height={48} isSelf={false} data={this.props.ownerName} onChange={this.handleNameChanged} />
            </div>
          ) : null}
          <div className="car-num-cont">
            <Input type="text" placeHolder="차량번호를 입력해주세요. (예 : 12가1234)" width="100%" height={48} isSelf={false} data={this.props.crNo} onChange={this.handleCarNoChanged} />
            <Buttons align="center" marginTop={16}>
              <Button background="blue80" title="이전" width={100} height={48} onClick={this.handleCancelSubmit} marginRight={8} />
              <Button background="blue80" title="조회" width={100} height={48} onClick={this.handleSubmit} />
            </Buttons>
          </div>
          {this.renderTsForm()}
        </>
      );
    }

    return (
      <>
        {this.props.hasTsCert && (
          <p className="searchCarMsg">
            정확한 시세조회를 위해 차량 소유자 인증철차가 필요합니다.
            <br />
            인증을 위해 차량 소유자 성명과 차량번호를 기입하여 주시기 바랍니다.
          </p>
        )}
        <div className="search-car-num">
          <div className="search-tp2">
            <span className="search-area">
              <label htmlFor="car-num" className="hide">
                차량번호
              </label>
              {this.props.canUseOwnerName === true ? (
                <span style={{ marginRight: '8px' }}>
                  <Input placeHolder="이름을 입력해 주세요." id="user-name" width={343} height={48} isSelf={false} data={this.props.ownerName} onChange={this.handleNameChanged} />
                </span>
              ) : null}
              <Input
                placeHolder="차량번호를 입력해주세요. (예 : 12가1234)"
                id="car-num"
                width={this.state.uiWidth2}
                height={48}
                isSelf={false}
                data={this.props.crNo}
                onChange={this.handleCarNoChanged}
              />
            </span>
            <Button size="big" background="blue80" title="조회" width={this.state.uiWidth} height={48} marginLeft={14} onClick={this.handleSubmit} />
          </div>
          <p className="tx-exp-tp3">* 차량번호 결과가 실제 차량과 상이할 경우, 차량 검색을 이용해주세요.</p>
          {this.props.isPrivacyPolicy === true ? (
            <p className="tx-exp-tp3">* 입력하신 개인정보는 도로교통공단(TS)의 차량 소유자 인증에만 이용되며, 오토벨은 해당 개인 정보를 별도로 수집/이용하지 않습니다.</p>
          ) : null}
        </div>
        {this.renderTsForm()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isIE: state.common.isIE
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    onSetPricingCarInfoClear: () => {
      dispatch(setPricingCarInfoClear());
    }
  };
};

PricingTsConfirm.propTypes = {
  canUseOwnerName: PropTypes.bool,
  crNo: PropTypes.string,
  hasMobile: PropTypes.bool,
  hasTsCert: PropTypes.bool,
  isPrivacyPolicy: PropTypes.bool,
  isIE: PropTypes.bool,
  designMode: PropTypes.string,
  ownerName: PropTypes.string,
  onCancel: PropTypes.func,
  onNameChanged: PropTypes.func,
  onCrNoChanged: PropTypes.func,
  onCertComplete: PropTypes.func,
  onSetPricingCarInfoClear: PropTypes.func
};

PricingTsConfirm.defaultProps = {
  canUseOwnerName: true,
  crNo: '',
  isPrivacyPolicy: false,
  hasMobile: false,
  hasTsCert: true,
  ownerName: ''
};

export default connect(mapStateToProps, mapDispatchProps)(PricingTsConfirm);
