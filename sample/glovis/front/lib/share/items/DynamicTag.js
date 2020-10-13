import React from 'react';
import PropTypes from 'prop-types';

class DynamicTag extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onHandleClick.bind(this);
    this.onKeyDown = this.onHandleKeyDown.bind(this);
  }

  onHandleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e, this.props.dataContext);
    }
  }
  onHandleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e, this.props.dataContext);
    }
  }

  render() {
    const TagName = this.props.tagName;

    return (
      <TagName id={this.props.id} className={this.props.className} onClick={this.onClick} onKeyDown={this.onKeyDown}>
        {this.props.children}
      </TagName>
    );
  }
}

DynamicTag.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  dataContext: PropTypes.any,
  id: PropTypes.string,
  tagName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func
};

export default DynamicTag;
