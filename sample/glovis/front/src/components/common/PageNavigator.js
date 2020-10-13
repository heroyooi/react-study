import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const PageNavigator = ({ blockSize, currentPage, recordCount, recordSize, changed, className }) => {
  function getNavigaionInfo() {
    let _pageCount = parseInt(recordCount / recordSize);

    if (recordCount % recordSize > 0) {
      _pageCount++;
    }

    let rest = parseInt(currentPage) % parseInt(blockSize);

    if (rest === 0) {
      rest = parseInt(blockSize);
    }

    const i = parseInt(currentPage) - rest;
    const tmp = [];

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
      tmp.push({ index: index, isSelected: index === currentPage });
    }

    return {
      startAt: _startAt,
      endAt: _endAt,
      pages: tmp,
      isFirst: 1,
      isPrev: currentPage === 1 ? 1 : currentPage - 1,
      isNext: currentPage >= _pageCount ? _pageCount : currentPage + 1,
      isLast: _pageCount,
      pageCount: _pageCount
    };
  }

  const onSelected = (e, pageNo) => {
    e.preventDefault();
    /**
     * 레코드카운트가 있을때만 페이지 이벤트 발생하도록 수정
     * 2020-04-16
     * 신동열
     * 현재페이지와 이동페이지가 다를경우만 발생하도록 함
     * 2020-04-18
     * ]신동열
     */
    console.log("currentPage :" + currentPage  + ", pageNO:" +pageNo);
    if (recordCount > 0)  {
      if (currentPage !== pageNo) {
        if (changed) {
          changed(e, pageNo);
        }
      }
    }
  };

  const pageInfo = getNavigaionInfo();
  const pageNaviClass = `pagination tp2 ${className}`;
  useEffect(() => {
    getNavigaionInfo();
  }, [currentPage, recordCount, recordSize]);

  return (
    <ul className={pageNaviClass}>
      <li className="first">
        <a href="#" onClick={(e) => onSelected(e, pageInfo.isFirst)}>
          <i />
        </a>
      </li>
      <li className="prev">
        <a href="#" onClick={(e) => onSelected(e, pageInfo.isPrev)}>
          <i />
        </a>
      </li>
      {pageInfo.pages.map((page, index) => {
        return (
          <li key={index} className={page.isSelected ? 'on' : null}>
            <a href="#" onClick={(e) => onSelected(e, page.index)}>
              {page.index}
            </a>
          </li>
        );
      })}
      <li className="next">
        <a href="#" onClick={(e) => onSelected(e, pageInfo.isNext)}>
          <i />
        </a>
      </li>
      <li className="last">
        <a href="#" onClick={(e) => onSelected(e, pageInfo.isLast)}>
          <i />
        </a>
      </li>
    </ul>
  );
};

PageNavigator.propTypes = {
  blockSize: PropTypes.number,
  currentPage: PropTypes.number,
  recordCount: PropTypes.number,
  recordSize: PropTypes.number,
  changed: PropTypes.func,
  className: PropTypes.string
};

PageNavigator.defaultProps = {
  blockSize: 10,
  currentPage: 1,
  recordCount: 0,
  recordSize: 10
};

export default React.memo(PageNavigator);
