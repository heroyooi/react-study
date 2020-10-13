import React from 'react';
import PropTypes from 'prop-types';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import TreeViewItem from './TreeViewItem';

class TreeView extends React.Component {
  constructor(props) {
    super(props);

    this.onTreeViewItemClick = this.onHandleTreeViewItemClick.bind(this);
    this.state = {
      modeCheck: this.props.mode === 'checkbox'
    };
  }

  onHandleTreeViewItemClick(e, deps) {
    console.log('onHandleTreeViewItemClick', e, deps);

    if (this.props.onClick) {
      this.props.onClick(e, deps);
    }
  }

  render() {
    if (this.props.hasMobile) {
      return (
        <div className="content-wrap filter-list-wrap">
          <div className="m-tree-wrap">
            <ul className="tree depth-1">
              {this.props.itemsSource.map((item, idx) => {
                return (
                  <TreeViewItem
                    key={idx}
                    checkedMemerPath={this.props.checkedMemerPath}
                    childMemberPath={this.props.childMemberPath}
                    counterMemberPath={this.props.counterMemberPath}
                    dataContext={item}
                    depth={0}
                    descriptionMemberPath={this.props.descriptionMemberPath}
                    displayMemberPath={this.props.displayMemberPath}
                    hasMobile={this.props.hasMobile}
                    onClick={this.onTreeViewItemClick}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <ColoredScrollbars>
        <div className="tree-wrap">
          <ul className="tree">
            {this.props.itemsSource.map((item, idx) => {
              return <TreeViewItem key={idx} dataContext={item} />;
            })}
          </ul>
        </div>
      </ColoredScrollbars>
    );
  }
}

TreeView.propTypes = {
  checkedMemerPath: PropTypes.string,
  childMemberPath: PropTypes.string,
  counterMemberPath: PropTypes.string,
  descriptionMemberPath: PropTypes.string,
  displayMemberPath: PropTypes.string,
  hasMobile: PropTypes.bool,
  itemsSource: PropTypes.array,
  mode: PropTypes.string,
  onClick: PropTypes.func
};

TreeView.defaultProps = {
  hasMobile: true,
  itemsSource: [],
  mode: 'checkbox'
};

export default TreeView;
