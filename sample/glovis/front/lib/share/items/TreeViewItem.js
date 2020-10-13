import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { numberFormat } from '@src/utils/CommonUtil';

class TreeViewItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onHandleClick.bind(this);
    this.state = {
      isExpanded: true
    };
  }

  onHandleClick(e) {
    if (this.props.dataContext.isLeaf !== true && this.props.dataContext[this.props.childMemberPath] && this.props.dataContext[this.props.childMemberPath].length > 0) {
      this.setState({ isExpanded: !this.state.isExpanded });
      return;
    }
    this.props.onClick(e, this.props.dataContext);
  }

  makeDescription() {
    const desc = this.props.dataContext[this.props.descriptionMemberPath];
    let str = '';
    if (desc !== '' && desc !== undefined) {
      str = ' (' + desc + ')';
    }
    return str;
  }

  render() {
    const tc = this.props.type === 'default' ? `chk-box chk-basic ${this.props.dataContext.checked === true ? 'on' : ''}` : '';
    this.spanStyle = classNames(tc, { on: this.state.isExpanded === true && this.props.dataContext[this.props.childMemberPath] && this.props.dataContext[this.props.childMemberPath].length > 0 });

    return (
      <li>
        <div className="desc" onClick={this.onClick}>
          <span className={this.spanStyle}>
            {this.props.type === 'chk-color2' && (
              <>
                <i className="bg-l" />
                <i className="bg-r" />
              </>
            )}
            <input
              id={`tv-${this.props.dataContext.id}`}
              type="checkbox"
              onClick={this.onExpandedToggle}
              defaultChecked={this.props.dataContext.isLeaf === true ? this.props.dataContext.checked || false : this.props.checked}
            />
            <label className={this.props.dataContext[this.props.childMemberPath] && this.props.dataContext[this.props.childMemberPath].length !== 0 ? 'hasChild' : null}>
              {this.props.dataContext[this.props.displayMemberPath] || 'N/A'}
            </label>
            {this.props.descriptionMemberPath && this.props.dataContext[this.props.descriptionMemberPath] && <em>{this.makeDescription()}</em>}
          </span>
          {this.props.counterMemberPath && this.props.dataContext[this.props.counterMemberPath] && <span className="count">{numberFormat(this.props.dataContext[this.props.counterMemberPath])}</span>}
        </div>
        {this.props.childMemberPath && this.props.dataContext[this.props.childMemberPath] && this.props.dataContext[this.props.childMemberPath].length > 0 && (
          <ul className={'tree ' + (!this.props.hasMobile ? 'tree' : `depth-${this.props.depth + 2}`)} style={{ display: this.state.isExpanded ? 'block' : 'none' }}>
            {/* <SlideAnimate toggle={this.state.isChecked}> */}
            {this.props.dataContext[this.props.childMemberPath].map((item, idx) => {
              return (
                <TreeViewItem
                  key={idx}
                  checkedMemerPath={this.props.checkedMemerPath}
                  childMemberPath={this.props.childMemberPath}
                  counterMemberPath={this.props.counterMemberPath}
                  dataContext={item}
                  depth={this.props.depth + 1}
                  descriptionMemberPath={this.props.descriptionMemberPath}
                  displayMemberPath={this.props.displayMemberPath}
                  hasMobile={this.props.hasMobile}
                  onClick={this.props.onClick}
                />
              );
            })}
            {/* </SlideAnimate> */}
          </ul>
        )}
      </li>
    );
  }
}

TreeViewItem.propTypes = {
  childMemberPath: PropTypes.string,
  checked: PropTypes.bool,
  checkedMemerPath: PropTypes.string,
  counterMemberPath: PropTypes.string,
  dataContext: PropTypes.object,
  depth: PropTypes.number,
  descriptionMemberPath: PropTypes.string,
  displayMemberPath: PropTypes.string,
  hasMobile: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func
};

TreeViewItem.defaultProps = {
  checked: false,
  hasMobile: true,
  type: 'default',
  depth: 0
};

export default TreeViewItem;
