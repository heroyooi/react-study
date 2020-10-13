import { useState, useCallback, useContext } from 'react';
import { CategoryContext } from './CategoryContext';

const CategoryItem = ({ category, onClickRemove, CateIdx, onClick }) => {
  const [show, setShow] = useState(true);
  const { categoryNum, setCategoryNum } = useContext(CategoryContext);

  const handleClick = useCallback(
    (e) => {
      onClickRemove(CateIdx);
      // e.preventDefault()
      // setShow(false)
      // setCategoryNum(categoryNum-1)
    },
    [show, categoryNum]
  );

  return (
    <>
      {show ? (
        <div className="del-tag">
          <p>
            <a>
              <span onClick={(e) => onClick(e)}>
                {category.map((v, i) => {
                  if (i < category.length - 1) {
                    if (i === 0) {
                      return <em key={i}>{v}</em>;
                    } else {
                      return (
                        <span className="sub-tit" key={i}>
                          <i className="line"></i> {v}
                        </span>
                      );
                    }
                  } else {
                    return (
                      <span className="sub-tit" key={i}>
                        <i className="line"></i> {v}
                      </span>
                    );
                  }
                })}
              </span>
            </a>
          </p>
          <i className="ico-del" onClick={handleClick}></i>
        </div>
      ) : null}
    </>
  );
};

export default CategoryItem;
