import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import SearchArea from '@src/components/common/SearchArea';
import MobSearchFilter from '@src/components/common/MobSearchFilter';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button'
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ServiceSearch = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량검색',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="service-search-wrap">
          <TabMenu type="type2" defaultTab={0} mount={false}>
            <TabCont tabTitle="상세 검색" id="tab2-1" index={0}>
              <MobSearchFilter />
              <Button className="fixed" size="full" background="blue80" title="3,123대 검색" height={56} />
            </TabCont>
            <TabCont tabTitle="키워드 검색" id="tab2-2" index={1}>
              <div className="content-wrap">
                <SearchArea section="buy" wrapperClass="search-tp1" />
                <p className="tit2 mb6">추천검색어</p>
                <ul className="m-list basic">
                  <li>1. 싼타페</li>
                  <li>2. 쏘렌토</li>
                  <li>3. 그랜저</li>
                  <li>4. 카니발</li>
                  <li>5. K7</li>
                </ul>
              </div>
            </TabCont>
          </TabMenu>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default ServiceSearch;
