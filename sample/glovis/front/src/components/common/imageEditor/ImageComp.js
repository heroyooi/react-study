import * as React from 'react';

class ImageComp extends React.PureComponent {
  onClickHandler() {
    const { item, index } = this.props;
    this.props.onCbFunction(item, index);
  }

  render() {
    const { item, selected } = this.props;

    const css = {
      divStyle: { borderColor: '#d3d3d3', width: '80.5px', height: '52px' },
      imgStyle: { width: '75px', height: '46px', cursor: 'pointer', border: selected ? 'groove' : '', borderColor: selected ? 'springgreen' : '' },
      labelStyle: { textAlign: 'center', paddingTop: '10px', fontSize: '12px' }
    };

    return (
      <li style={{ float: 'left' }} onClick={this.onClickHandler.bind(this)}>
        <div style={css.divStyle}>
          <div style={{ position: 'absolute' }}>
            <img style={css.imgStyle} src={item.cropImage} />
          </div>
          <div>
            <h1 style={css.labelStyle}>
              {item.title.split('//').map((line, index) => {
                return (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </h1>
          </div>
        </div>
      </li>
    );
  }
}

export default ImageComp;
