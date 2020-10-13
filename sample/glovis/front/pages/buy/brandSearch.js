import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button'
import MobSearchFilter from '@src/components/common/MobSearchFilter';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import React, { useEffect } from 'react';

const BrandSearch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_BUY });
  }, []);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile) {
    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: 'BMW 인증중고차 차량검색',
          options: ['back', 'reset']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#fff'
        }
      });
    }, []);
    
    return (
      <AppLayout>
        <MobSearchFilter mode="brand" />
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}
  
export default BrandSearch;
