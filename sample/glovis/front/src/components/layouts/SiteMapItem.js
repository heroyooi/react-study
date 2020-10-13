import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const SiteMapItem = ({ title, sub, link }) => {
  /*
  console.log('useEffect>SiteMapItem_ [title]=%o', title);
  console.log('useEffect>SiteMapItem_ [link]=%o', link);
  console.log('useEffect>SiteMapItem_ [treeFromFlatData]=%o', sub);
*/
  return (
    <li>
      <Link href={link}>
        <a>{title}</a>
      </Link>
      <ul>
        {!isEmpty(sub) &&
          sub.map((item, index) => {
            return item.menuYn === 'Y' ? (
              <li key={index}>
                <Link href={item.tranSrc}>
                  <a>{item.title}</a>
                </Link>
              </li>
            ) : (
              ''
            );
          })}
      </ul>
    </li>
  );
};

SiteMapItem.propTypes = {
  title: PropTypes.string,
  sub: PropTypes.array,
  link: PropTypes.string
};

export default SiteMapItem;
