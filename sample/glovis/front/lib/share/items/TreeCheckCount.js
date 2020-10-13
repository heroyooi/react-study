import { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TreeItem from './TreeItem';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import PropTypes from 'prop-types';
/**
 * 200328 김상진 컴포넌트 통합 완료 TreeCheckCount.js
 * hasMobile 기능관련 통합
 */
const TreeCheckCount = memo(({ dataProvider, onClick, mode = 'checkbox' }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const modeCheck = mode === 'checkbox';
  const [selectTarget, setSelectTarget] = useState(false);
  const clickHandle = (e, data, self, checkIdx) => {
    if (!self) setSelectTarget(checkIdx);
    if (onClick) onClick(e, data);
  };
  let idx = 0;
  const createTree = (makeList, tempList) => {
    makeList.map((item, index) => {
      let children = [];
      if (item.hasOwnProperty('category')) {
        tempList.push(
          <li className="category" key={index}>
            {item.category}
          </li>
        );
      } else {
        ++idx;
        tempList.push(<TreeItem key={index} idx={idx} data={item} checked={selectTarget === idx} isSelf={modeCheck} children={children} depth={hasMobile ? item.level : null} onClick={clickHandle} />);
        if (item.hasOwnProperty('children') && item.children.length > 0) {
          createTree(item.children, children);
        }
      }
    });
    return tempList;
  };

  if (hasMobile) {
    return (
      <div className="content-wrap filter-list-wrap">
        <div className="m-tree-wrap">
          <ul className="tree depth-1">{createTree(dataProvider, [])}</ul>
        </div>
      </div>
    );
  }

  return (
    <ColoredScrollbars>
      <div className="tree-wrap">
        <ul className="tree">{createTree(dataProvider, [])}</ul>
      </div>
    </ColoredScrollbars>
  );
});

TreeCheckCount.propsTypes = {
  dataProvider: PropTypes.array,
  onClick: PropTypes.func
};

export default TreeCheckCount;
