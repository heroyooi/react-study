import React, { memo, useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CategoryContext } from './CategoryContext';

const DynamicCategory = memo(({ children }) => {
  const [categoryNum, setCategoryNum] = useState((children || []).length);

  useEffect(() => {
    if (children) setCategoryNum(children.length);
  }, [children]);

  return (
    <CategoryContext.Provider value={{ categoryNum, setCategoryNum }}>
      {categoryNum !== 0 ? (
        <div className="del-tag-wrap">{children}</div>
      ) : (
        <div className="del-tag-wrap no-result">
          <ul className="del-tag">
            <li>최근 검색조건이 없습니다.</li>
          </ul>
        </div>
      )}
    </CategoryContext.Provider>
  );
});

DynamicCategory.propTypes = {
  children: PropTypes.any
};
DynamicCategory.displayName = 'memo';
export default DynamicCategory;
