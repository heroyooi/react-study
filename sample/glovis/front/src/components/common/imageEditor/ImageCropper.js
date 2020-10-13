import * as React from 'react';
import Cropper from 'react-cropper';

//utils
// import { nullCheck } from '../../../utils/CommonUtil';
import { isEmpty } from 'lodash';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null
    };
  }

  componentDidMount() {
    // this.props.
  }
  _inputfile = null;
  _cropper = null;

  onChange(e) {
    e.preventDefault();
    let files = [];
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (files.length <= 0) return;

    const reader = new FileReader();
    reader.onload = (currentStr) => {
      this.setState({
        src: reader.result
      });
    };
    reader.readAsDataURL(files[0]);
  }

  imageDelete() {
    this.setState({
      src: null
    });

    this._inputfile.value = '';
  }

  imageRotate(direction) {
    const { src } = this.state;

    // if (!nullCheck(src)) return;
    if (!isEmpty(src)) return;
    this._cropper.rotate(direction === 'left' ? -15 : 15);
  }

  imageCrop() {
    const { src } = this.state;
    // if (typeof this._cropper.getCroppedCanvas() === 'undefined' || !nullCheck(src)) {
    if (typeof this._cropper.getCroppedCanvas() === 'undefined' || !isEmpty(src)) {
      return;
    }

    let url = this._cropper.getCroppedCanvas().toDataURL();

    this.setState({
      src: url
    });
  }

  getSrc() {
    const { src } = this.state;
    return src;
  }
  render() {
    const { width, height, autoCrop } = this.props;
    const { src } = this.state;
    // const css = {
    //   inputFileStyle: { opacity: 0, width: width, height: height, position: 'absolute' },
    //   cropperWarrap: { width: width, height: height, float: 'left', background: nullCheck(src) ? '' : 'url(/static/images/crop/bg.png)' },
    //   cropperStyle: { width: width, height: height, cursor: 'pointer', display: nullCheck(src) ? 'flex' : 'none' },
    //   buttonStyle: { width: '70px', height: '20px', border: 'outset', fontSize: '10px', background: '#DDDDDD' }
    // };
    const css = {
      inputFileStyle: { opacity: 0, width: width, height: height, position: 'absolute' },
      cropperWarrap: { width: width, height: height, float: 'left', background: isEmpty(src) ? '' : 'url(/static/images/crop/bg.png)' },
      cropperStyle: { width: width, height: height, cursor: 'pointer', display: isEmpty(src) ? 'flex' : 'none' },
      buttonStyle: { width: '70px', height: '20px', border: 'outset', fontSize: '10px', background: '#DDDDDD' }
    };
    return (
      <li style={{ float: 'left' }}>
        <div>
          <div style={css.inputFileStyle}>
            <input type="file" style={{ width: width, height: height, cursor: 'pointer' }} ref={(ref) => (this._inputfile = ref)} onChange={this.onChange.bind(this)} />
          </div>
          <div style={css.cropperWarrap}>
            <Cropper style={css.cropperStyle} aspectRatio={16 / 9} guides={true} src={src} ref={(ref) => (this._cropper = ref)} viewMode={3} autoCrop={autoCrop} dragMode="move" />
          </div>

          <div style={{ position: 'absolute', marginTop: '200px', marginLeft: '5px', display: src === '' ? 'none' : 'block' }}>
            <button type="button" style={css.buttonStyle} onClick={() => this.imageRotate('left')}>
              좌로 회전
            </button>
            <button type="button" style={css.buttonStyle} onClick={() => this.imageRotate('right')}>
              우로 회전
            </button>
            <button type="button" style={css.buttonStyle} onClick={() => this.imageCrop()}>
              자르기
            </button>
            <button type="button" style={css.buttonStyle} onClick={() => this.imageDelete()}>
              삭제
            </button>
          </div>
        </div>
      </li>
    );
  }
}
export default ImageCropper;
