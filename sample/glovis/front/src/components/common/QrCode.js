import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

class QrCode extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.url !== this.props.url || nextProps.size !== this.props.size) {
      return false;
    }

    return true;
  }

  render() {
    return <QRCode value={this.props.url} size={this.props.size} renderAs={'svg'} />;
  }
}

QrCode.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number
};

QrCode.defaultProps = {
  size: 256
};

export default QrCode;
