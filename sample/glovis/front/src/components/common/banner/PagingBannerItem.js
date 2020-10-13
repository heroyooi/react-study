import React from 'react';
import PropTypes from 'prop-types';
import PageItem from '@lib/share/items/PageItem';
import Pagination from '@lib/share/items/Pagination';
import PageCont from '@lib/share/items/PageCont';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';

const PagingBannerItem = ({ bannerType = 'horizon', min = 1, max = 1, initNum = 1, maxItemsPerPage, pageSize, dataList, ulClass, itrtToggle, url, children, onClickQuickView }) => {
  const pages = new Array();
  for (let i = 0; i < pageSize; i++) {
    pages[i] = i + 1;
  }
  return (
    <div className="list-wrap">
      <PageItem min={min} max={max} initNum={initNum}>
        <div className="list-tit">
          {children}
          {/* <h4>
            수입인증<span>수입인증 인증 가이드 텍스트 영역입니다.</span>
          </h4> */}
          <Pagination />
        </div>
        {pages.map((page) => (
          <PageCont key={page} id={page}>
            <ul className={ulClass}>
              {dataList
                .filter((data, i) => parseInt(i / maxItemsPerPage) + 1 === page)
                // .filter((data, i) => data.page == page)  -- 쿼리에서 페이지 번호를 붙여오는 방법 사용시
                .map((data, i) => {
                  return <BannerItemBuyCar bannerType={bannerType} key={data?.dlrPrdId || data?.brdId || i} data={data} onClickQuickView={onClickQuickView} />;
                })}
            </ul>
          </PageCont>
        ))}
      </PageItem>
    </div>
  );
};
PagingBannerItem.propTypes = {
  bannerType: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  initNum: PropTypes.number,
  maxItemsPerPage: PropTypes.number,
  pageSize: PropTypes.number,
  dataList: PropTypes.array,
  ulClass: PropTypes.string,
  url: PropTypes.string,
  itrtToggle: PropTypes.func,
  children: PropTypes.node
};

export default PagingBannerItem;

PagingBannerItem.propTypes = {
  bannerType: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  initNum: PropTypes.number,
  maxItemsPerPage: PropTypes.number,
  pageSize: PropTypes.number,
  dataList: PropTypes.array,
  ulClass: PropTypes.string,
  url: PropTypes.string,
  itrtToggle: PropTypes.func,
  children: PropTypes.node
};
