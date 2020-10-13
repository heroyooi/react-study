import * as React from 'react';
import Cropper from 'react-cropper';
//import "cropperjs/dist/cropper.css" // see installation section above for versions of NPM older than 3.0.0
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

// reducer
//import * as fileReducer from '../../src/reducers/fileReducer';

// Component
import ImageComp from './ImageComp';
// import { nullCheck } from './../src/utils/CommonUtil';
import { isEmpty } from 'lodash';
import ImageCropper from './ImageCropper';
//import Layout from '../../src/components/common/layout/ContentsLayout';

class ImageEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
      test: '',
      status: 'normal',
      cropTarget: 0,
      cropResult: null,
      arr: [
        {
          id: 'img1',
          title: '앞측면(우대//모바일우대)',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img2',
          title: '뒷측면',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img3',
          title: '전면(모바일//프리미엄)',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img4',
          title: '후면(모바일//프리미엄)',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img5',
          title: '휠/타이어',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img6',
          title: '엔진',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img7',
          title: '실내(우대)',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img8',
          title: '계기판',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img9',
          title: '변속기',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img10',
          title: '차량시트',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img11',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img12',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img13',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img14',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img15',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img16',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img17',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img18',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img19',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        },
        {
          id: 'img20',
          title: '옵션',
          src: null,
          cropImage: null,
          selected: false
        }
      ]
    };
  }

  _cropper = null;
  _fileUpload = null;
  _canvas = null;
  _combine1 = null;
  _combine2 = null;
  _combine3 = null;
  _combine4 = null;

  onChange(e) {
    const { arr, cropTarget } = this.state;
    e.preventDefault();
    let files = [];
    let lastIndex = cropTarget;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (files.length <= 0) return;

    for (let i = 0; i < files.length; i++) {
      if (i >= arr.length) continue;

      const reader = new FileReader();
      const file = files[i];
      reader.index = cropTarget + i;
      reader.maxIndex = cropTarget + files.length >= arr.length ? arr.length : cropTarget + files.length;

      reader.onload = (currentStr) => {
        const obj = arr[reader.index];
        if (obj) obj.src = obj.cropImage = reader.result;
        lastIndex++;

        // call onload 마지막에만 render 처리
        if (reader.maxIndex == lastIndex) {
          const maxIndex = reader.maxIndex - 1;
          const currentCropTarget = cropTarget - 1 <= 0 ? 0 : cropTarget - 1;
          arr[currentCropTarget].selected = false;
          arr[maxIndex].selected = true;

          this.setState({
            arr: arr,
            cropTarget: maxIndex,
            src: arr[maxIndex].cropImage
          });
        }
      };

      reader.readAsDataURL(file);
    }
  }

  imageCrop() {
    const { src, cropTarget, arr } = this.state;

    // if (typeof this._cropper.getCroppedCanvas() === 'undefined' || !nullCheck(src)) {
    if (typeof this._cropper.getCroppedCanvas() === 'undefined' || !isEmpty(src)) {
      return;
    }

    const url = this._cropper.getCroppedCanvas().toDataURL();
    const obj = arr[cropTarget];
    obj.src = url;
    obj.cropImage = url;

    this.setState({
      arr: arr,
      src: url,
      status: 'normal'
    });
  }

  imageCombine = () => {
    const { cropTarget, arr } = this.state;

    const combineList = [];
    const obj = arr[cropTarget];
    const width = 400;
    const height = 225;

    const ctx = this._canvas.getContext('2d');
    const image = new Image();

    combineList.push({ src: this._combine1.getSrc(), x: 0, y: 0 });
    combineList.push({ src: this._combine2.getSrc(), x: width, y: 0 });
    combineList.push({ src: this._combine3.getSrc(), x: 0, y: height });
    combineList.push({ src: this._combine4.getSrc(), x: width, y: height });
    if (!isEmpty(this._combine1.getSrc()) || !isEmpty(this._combine2.getSrc()) || !isEmpty(this._combine3.getSrc()) || !isEmpty(this._combine4.getSrc())) {
      // if (!nullCheck(this._combine1.getSrc()) || !nullCheck(this._combine2.getSrc()) || !nullCheck(this._combine3.getSrc()) || !nullCheck(this._combine4.getSrc())) {
      //alert('이미지를 모두 등록해주세요');
      return;
    }

    combineList.map((item) => {
      image.src = item.src;
      ctx.drawImage(image, item.x, item.y, width, height);
    });

    obj.cropImage = ctx.canvas.toDataURL();
    obj.selected = true;
    this.setState({
      status: 'normal',
      src: obj.cropImage,
      arr: arr,
      test: ctx.canvas.toDataURL()
    });
  };

  imageRotate(direction) {
    const { src } = this.state;
    // if (!nullCheck(src)) return;
    if (!isEmpty(src)) return;

    this._cropper.rotate(direction === 'left' ? -15 : 15);
  }

  imageDelete() {
    const { cropTarget, arr } = this.state;
    const obj = arr[cropTarget];
    obj.cropImage = null;

    this._fileUpload.value = '';

    this.setState({
      src: null
    });
  }

  imageReset() {
    const { cropTarget, arr } = this.state;
    const obj = arr[cropTarget];
    obj.cropImage = obj.src;

    // this._cropper.reset()
    // this._cropper.clear()
    this.setState({
      src: obj.src
    });
  }

  createInitImage() {
    const { arr } = this.state;
    const list = [];
    arr.map((item, index) => {
      list.push(<ImageComp key={item.id} item={item} index={index} selected={item.selected} onCbFunction={this.onCropClick.bind(this)} />);
    });
    return list;
  }

  onCropClick(item, index) {
    const { arr, cropTarget } = this.state;

    arr[cropTarget].selected = false;

    if (!isEmpty(item.cropImage) && isEmpty(this._fileUpload)) {
      // if (!nullCheck(item.cropImage) && nullCheck(this._fileUpload)) {
      this._fileUpload.value = '';
      this._fileUpload.click();
    } else {
      arr[index].selected = true;
    }

    this.setState({
      cropTarget: index,
      src: item.cropImage,
      status: 'normal',
      arr: arr
    });
  }

  onExportImage() {
    //const { FileActions } = this.props;
    //FileActions.exportImage(this.state.arr);
  }

  onChangeStatus = (type) => {
    const { src } = this.state;

    switch (type) {
      case 'normal':
        if (this._cropper) {
          this._cropper.reset();
          this._cropper.clear();
        }
        break;
      case 'crop':
        this._cropper.crop();
        if (!isEmpty(src)) return;
        // if (!nullCheck(src)) return;
        break;
    }

    this.setState({
      status: type
    });
  };

  render() {
    const { src, status } = this.state;
    const css = {
      inputFileStyle: {
        opacity: 0,
        width: '800px',
        height: '450px',
        position: 'absolute',
        left: '20px'
      },
      cropperWarrap: {
        width: '800px',
        height: '450px',
        float: 'left',
        background: isEmpty(src) ? '' : 'url(/static/images/crop/bg.png)'
      },
      cropperStyle: {
        width: '800px',
        height: '450px',
        cursor: 'pointer',
        display: isEmpty(src) ? 'flex' : 'none'
      },
      buttonStyle: { width: '95px', height: '80px', border: 'outset' }
    };

    return (
      <>
        {/* <Layout> */}
        <div
          style={{
            textAlign: 'center',
            width: '950px',
            backgroundColor: '#EEEEEE',
            margin: '20px'
          }}
        >
          <div>
            <div style={{ height: '470px' }}>
              <div>
                {status === 'combine' ? (
                  /* 분할 */
                  <div
                    style={{
                      width: '810px',
                      height: '455px',
                      float: 'left',
                      border: 'groove'
                    }}
                  >
                    <ul>
                      <ImageCropper width="400px" height="225px" ref={(ref) => (this._combine1 = ref)} autoCrop={false} />
                      <ImageCropper width="400px" height="225px" ref={(ref) => (this._combine2 = ref)} autoCrop={false} />
                      <ImageCropper width="400px" height="225px" ref={(ref) => (this._combine3 = ref)} autoCrop={false} />
                      <ImageCropper width="400px" height="225px" ref={(ref) => (this._combine4 = ref)} autoCrop={false} />
                    </ul>
                  </div>
                ) : (
                  /* 일반 */
                  <div
                    style={{
                      width: '810px',
                      height: '455px',
                      float: 'left',
                      border: 'groove'
                    }}
                  >
                    <div style={css.inputFileStyle}>
                      <input
                        multiple={true}
                        type="file"
                        style={{
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer'
                        }}
                        ref={(ref) => (this._fileUpload = ref)}
                        onChange={this.onChange.bind(this)}
                      />
                    </div>
                    <div style={css.cropperWarrap}>
                      <Cropper style={css.cropperStyle} aspectRatio={16 / 9} guides={true} src={src} ref={(ref) => (this._cropper = ref)} viewMode={2} autoCrop={false} dragMode="none" />
                    </div>
                  </div>
                )}

                <div style={{ float: 'left', border: 'inset' }}>
                  {status === 'normal' ? (
                    /* 일반 */
                    <ul>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={() => this.imageRotate('left')}>
                          좌로 회전
                        </button>
                      </li>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={() => this.imageRotate('right')}>
                          우로 회전
                        </button>
                      </li>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={() => this.onChangeStatus('crop')}>
                          자르기
                        </button>
                      </li>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={() => this.onChangeStatus('combine')}>
                          분할
                        </button>
                      </li>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={() => this.imageDelete()}>
                          삭제
                        </button>
                      </li>
                    </ul>
                  ) : status === 'crop' ? (
                    /* 자르기 */
                    <ul>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={() => this.imageCrop()}>
                          확인
                        </button>
                      </li>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={() => this.onChangeStatus('normal')}>
                          취소
                        </button>
                      </li>
                    </ul>
                  ) : status === 'combine' ? (
                    /* 분할 */
                    <ul>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={this.imageCombine.bind(this)}>
                          확인
                        </button>
                      </li>
                      <li>
                        <button type="button" style={css.buttonStyle} onClick={() => this.onChangeStatus('normal')}>
                          취소
                        </button>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: '110px' }}>
            <div style={{ width: '805px', float: 'left' }}>
              <ul>{this.createInitImage()}</ul>
            </div>
            <div
              style={{
                float: 'left',
                width: '95px',
                height: '98px',
                textAlign: 'center',
                backgroundColor: 'coral'
              }}
            >
              <button style={{ width: '100%', height: '100%' }} onClick={() => this.onExportImage()}>
                저장
              </button>
            </div>
          </div>

          <div>
            <canvas
              style={{
                display: 'none',
                backgroundColor: '#000000'
              }}
              width="800"
              height="450"
              ref={(ref) => (this._canvas = ref)}
            />
          </div>
          <br style={{ clear: 'both' }} />
        </div>
        {/* </Layout> */}
      </>
    );
  }
}

export default connect(
  (state) => ({
    //status: state.file.status,
  }),
  (dispatch) => ({
    //FileActions: bindActionCreators(fileReducer, dispatch),
  })
)(ImageEditor);
