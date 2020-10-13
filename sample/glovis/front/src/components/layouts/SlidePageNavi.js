/**
 * 설명 : quick menu sliding Page Navi
 * @fileoverview 슬라이딩 페이징 네비게이션
 * @requires
 * @author D191367
 */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, orderBy, filter } from 'lodash';

const SlidePageNavi = ({ totalCount, currentPage, changed }) => {
  const dispatch = useDispatch();
  const [curPage, setCurPage] = useState(currentPage);
  const [pageBlockSize, setPageBlockSize] = useState(5);
  let pages = [];
  for (let i = 1; i <= totalCount; i++) {
    pages = pages.concat(i);
  }
  console.log('SlidePageNavi>페이지 생성>curPage=%o, pages=%o', curPage, pages);

  useEffect(() => {}, [totalCount]);

  //페이지 클릭
  // const onSelected = (e, pageNo) => {
  //   e.preventDefault();
  //   console.log('SlidePageNavi>페이지 클릭>pageNo=%o', pageNo);
  //   if (changed) {
  //     changed(e, pageNo);
  //   }
  // };
  // console.log('SlidePageNavi>pages[totalCount]=%o', totalCount);

  const onSelected = (e, pageNo) => {
    e.preventDefault();
    console.log('SlidePageNavi>페이지 클릭>pageNo=%o', pageNo);

    if (totalCount > 0 && pageNo > 0 && totalCount + 1 > pageNo) {
      if (curPage !== pageNo) {
        if (changed) {
          setCurPage(pageNo);
          changed(e, pageNo);
        }
      }
    } else {
      console.log('SlidePageNavi>페이지 skip>totalCount=%o,pageNo=%o', totalCount, pageNo);
    }
  };
  return (
    <div className="slide-navi">
      <Link href="#">
        <a className="first" onClick={(e) => onSelected(e, 1)}>
          처음
        </a>
      </Link>
      <Link href="#">
        <a className="prev" onClick={(e) => onSelected(e, curPage - 1)}>
          <img src="/images/contents/btn-qm-ct-prev.png" alt="이전" />
        </a>
      </Link>
      {!isEmpty(pages) &&
        pages.map((pageNo, index) => (
          <Link key={index} href="#">
            <a onClick={(e) => onSelected(e, pageNo)} className={pageNo === curPage ? 'num on' : 'num'}>
              {pageNo}
            </a>
          </Link>
        ))}

      <Link href="#">
        <a className="next" onClick={(e) => onSelected(e, curPage + 1)}>
          <img src="/images/contents/btn-qm-ct-next.png" alt="다음" />
        </a>
      </Link>
      <Link href="#">
        <a className="last" onClick={(e) => onSelected(e, totalCount)}>
          마지막
        </a>
      </Link>
    </div>
  );
};

export default SlidePageNavi;
