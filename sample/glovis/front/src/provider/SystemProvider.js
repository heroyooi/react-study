import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Router from 'next/router';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import LoginPopup from '@src/components/common/popup/LoginPop';

const globalThis = require('globalthis')();
export const SystemContext = React.createContext();

class SystemProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Alert: {
        msg: '처리되었습니다',
        state: 'hide',
        callback: null
      },
      Confirm: {
        msg: '진행하시겠습니까?',
        state: 'hide',
        callback: null,
        cancelCallback: null
      },
      Loader: {
        state: 'hide',
        color: '#fff',
        size: 80
      },
      LoginForm: {
        state: 'hide',
        url: Router?.router?.asPath ?? '/main',
        callback: null
      }
    };
  }

  componentDidUpdate() {
    const isClient = !!globalThis.window;

    if (isClient) {
      const rodals = document?.querySelectorAll('.rodal[class*=enter]');
      const html = document?.getElementsByTagName('html')[0] || '';
      const body = document?.getElementsByTagName('body')[0] || '';

      html.style.overflow = this?.state?.Alert?.state === 'show' || this?.state?.Confirm?.state === 'show' ? 'hidden' : rodals.length <= 1 ? 'auto' : 'hidden';
      body.style.overflow = this?.state?.Alert?.state === 'show' || this?.state?.Confirm?.state === 'show' ? 'hidden' : rodals.length <= 1 ? 'auto' : 'hidden';
    }
  }

  AlertCallback = (e) => {
    e.persist();
    this.setState(
      {
        Alert: {
          ...this.state.Alert,
          state: 'success'
        }
      },
      () => {
        typeof this.state.Alert.callback === 'function' && this.state.Alert.callback(e);
      }
    );
  };

  ConfirmCallback = (e) => {
    e.preventDefault();
    e.persist();
    this.setState(
      {
        Confirm: {
          ...this.state.Confirm,
          state: 'success'
        }
      },
      () => {
        typeof this.state.Confirm.callback === 'function' && this.state.Confirm.callback(e);
      }
    );
  };

  showAlert = (msg, callback = null) => {
    this.setState({
      Alert: {
        ...this.state.Alert,
        msg,
        state: 'show',
        callback
      }
    });
  };

  showConfirm = (msg, callback = null, cancelCallback = null, customName = false) => {
    this.setState({
      Confirm: {
        ...this.state.Confirm,
        msg,
        state: 'show',
        callback,
        cancelCallback,
        customName
      }
    });
  };

  showLoader = (color = '#fff', size = 80) => {
    this.setState({
      Loader: {
        ...this.state.Loader,
        state: 'show',
        color,
        size
      }
    });
  };

  showLoginForm = (url = this.state.LoginForm.url, callback = null) => {
    this.setState({
      LoginForm: {
        ...this.state.LoginForm,
        url,
        state: 'show',
        callback
      }
    });
  };

  hideLoader = () => {
    this.setState({
      Loader: {
        ...this.state.Loader,
        state: 'hide'
      }
    });
  };

  LoginCallback = (data) => {
    this.setState(
      {
        LoginForm: {
          ...this.state.LoginForm,
          state: 'success'
        }
      },
      () => {
        typeof this.state.LoginForm.callback === 'function' && this.state.LoginForm.callback(data);
      }
    );
  };

  initAlert = (e) => {
    e && e.preventDefault && e.preventDefault();
    this.setState({
      Alert: {
        ...this.state.Alert,
        state: 'hide',
        callback: null
      }
    });
  };

  initConfirm = (e, cancelCallback = null) => {
    e && e.preventDefault && e.preventDefault();
    this.setState(
      {
        Confirm: {
          ...this.state.Confirm,
          state: 'hide',
          cancelCallback
        }
      },
      () => {
        typeof this.state.Confirm.cancelCallback === 'function' && this.state.Confirm.cancelCallback();
      }
    );
  };

  initLoginForm = (e) => {
    e && e.preventDefault && e.preventDefault();
    this.setState({
      LoginForm: {
        ...this.state.LoginForm,
        state: 'hide'
      }
    });
  };

  render() {
    const { Alert, Confirm, Loader, LoginForm } = this.state;
    const { hasMobile } = this.props;

    return (
      <div>
        <SystemContext.Provider
          value={{
            Alert,
            Confirm,
            Loader,
            LoginForm,
            showAlert: this.showAlert,
            showConfirm: this.showConfirm,
            showLoginForm: this.showLoginForm,
            initAlert: this.initAlert,
            initConfirm: this.initConfirm,
            initLoginForm: this.initLoginForm,
            showLoader: this.showLoader,
            hideLoader: this.hideLoader
          }}
        >
          {this.props.children}

          {Loader.state === 'show' && (
            <div className="page-loading">
              <span className="dim" />
              <ClipLoader size={Loader.size} color={Loader.color} loading={Loader.state === 'show'} />
            </div>
          )}

          <RodalPopup
            show={Alert.state === 'show'}
            type={'fade'}
            width={380}
            closedHandler={this.initAlert}
            mode="normal"
            closeOnEsc={false}
            closeMaskOnClick={!hasMobile ? false : true}
            topMost={true}
          >
            <div className="con-wrap compact">
              {typeof Alert.msg === 'object' ? <p>{Alert.msg}</p> : <p dangerouslySetInnerHTML={{ __html: Alert.msg }} />}
              {!hasMobile ? (
                <Buttons align="center" marginTop={24}>
                  <Button size="mid" background="blue80" title="확인" width={72} buttonMarkup={true} onClick={this.AlertCallback} />
                </Buttons>
              ) : (
                <Buttons align="right" marginTop={24}>
                  <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" buttonMarkup={true} onClick={this.AlertCallback} />
                </Buttons>
              )}
            </div>
          </RodalPopup>
          <RodalPopup
            show={Confirm.state === 'show'}
            type={'fade'}
            width={380}
            closedHandler={(e) => this.initConfirm(e, this.state.Confirm.cancelCallback)}
            mode="normal"
            closeOnEsc={true}
            closeMaskOnClick={true}
            topMost={true}
          >
            <div className="con-wrap compact">
              <p dangerouslySetInnerHTML={{ __html: Confirm.msg }} />
              {!hasMobile ? (
                <Buttons align="center" marginTop={24}>
                  <Button
                    fontSize={!hasMobile ? null : 14}
                    size={!hasMobile ? 'mid' : null}
                    background={!hasMobile ? 'gray' : null}
                    title="취소"
                    width={!hasMobile ? 72 : null}
                    buttonMarkup={true}
                    onClick={(e) => this.initConfirm(e, this.state.Confirm.cancelCallback)}
                  />
                  <Button size="mid" background="blue80" title="확인" width={72} buttonMarkup={true} onClick={this.ConfirmCallback} />
                </Buttons>
              ) : (
                <Buttons align="right" marginTop={24}>
                  <Button fontSize={14} title={Confirm.customName ? "아니오" : "취소"} color="blue80" onClick={(e) => this.initConfirm(e, this.state.Confirm.cancelCallback)} />
                  <Button fontSize={14} title={Confirm.customName ? "예" : "확인"} color="blue80" marginLeft={16} fontWeight="bold" onClick={this.ConfirmCallback} />
                </Buttons>
              )}
            </div>
          </RodalPopup>
          <RodalPopup show={LoginForm.state === 'show'} type={'slideUp'} closedHandler={this.initLoginForm} mode="normal" size="small" title="로그인" topMost={true}>
            <LoginPopup url={LoginForm.url} successCallback={this.LoginCallback} />
          </RodalPopup>
        </SystemContext.Provider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hasMobile: state.common.hasMobile
});

SystemProvider.getInitialProps = ({ reduxStore }) => {
  const state = reduxStore.getState();
  console.log(state);
  return {};
};

SystemProvider.propTypes = {
  hasMobile: PropTypes.bool,
  children: PropTypes.any
};

SystemProvider.defaultProps = {
  hasMobile: false
};

export default connect(mapStateToProps)(SystemProvider);
