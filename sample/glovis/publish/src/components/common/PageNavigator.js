import React from 'react';
import PropTypes from 'prop-types';

const PageNavigator = ({blockSize, currentPage, recordCount, recordSize, changed, className=''}) => {
  function getNavigaionInfo() {
    let _pageCount = parseInt( recordCount / recordSize);

    if (recordCount % recordSize > 0) {
      _pageCount++;
    }

    let rest = parseInt(currentPage) %  parseInt(blockSize);

    if (rest === 0) {
      rest = parseInt(blockSize);
    }

    const i = parseInt(currentPage) - rest;
    const tmp = [] ;

    let _startAt = i + 1;
    let _endAt = _startAt + parseInt(blockSize);


    if (_startAt <= 0) {
        _startAt = 1;
    }

    if (_endAt > _pageCount) {
      _endAt = _pageCount + 1;
    }

    if (_startAt === _endAt) {
      _endAt = 2;
    }

    for (let index = _startAt; index < _endAt; index++) {
        tmp.push( {index: index, isSelected : index === currentPage }) ;
    }

    return {
      startAt: _startAt,
      endAt: _endAt,
      pages : tmp,
      isFirst : _startAt === 1,
      isPrev : _startAt === 1,
      isNext : (_endAt -1 >= _pageCount),
      isLast : (_endAt -1 >= _pageCount),
      pageCount: _pageCount
    };
  }

  const onSelected = (e, pageNo) => {
    e.preventDefault();

    if (changed) {
      changed(e, pageNo);
    }
  };

  const pageInfo = getNavigaionInfo();
  const pageNaviClass = `pagination tp2 ${className}`

  return (
    <ul className={pageNaviClass}>
      <li className="first"><a href="#" onClick={(e) => onSelected(e, 1)}><i /></a></li>
      <li className="prev"><a href="#" onClick={(e) => onSelected(e, pageInfo.startAt -1)}><i /></a></li>
      {pageInfo.pages.map((page, index) => {
        return (
          <li key={index} className={page.isSelected ? "on" : null}><a href="#" onClick={(e) => onSelected(e, page.index)}>{page.index}</a></li>
        );
      })}
      <li className="next"><a href="#" onClick={(e) => onSelected(e, pageInfo.endAt)}><i /></a></li>
      <li className="last"><a href="#" onClick={(e) => onSelected(e, pageInfo.pageCount)}><i /></a></li>
    </ul>
  );
};

PageNavigator.propTypes = {
  blockSize: PropTypes.number,
  currentPage: PropTypes.number,
  recordCount: PropTypes.number,
  recordSize: PropTypes.number,
  changed: PropTypes.func,
  className: PropTypes.string,
};

PageNavigator.defaultProps = {
  blockSize: 10,
  currentPage: 1,
  recordCount: 0,
  recordSize: 10,
};

export default React.memo(PageNavigator);
