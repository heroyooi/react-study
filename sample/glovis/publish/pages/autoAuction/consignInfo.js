import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';


const consignInfo = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { seq } = router.query;
  useEffect(() => {
    if (seq !== undefined) window.scrollTo(0, 0);
  }, [])

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '경마장 위치 안내',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <TabMenu type="type2" mount={false} defaultTab={seq !== undefined ? Number(seq)-1 : 0}>
          <TabCont tabTitle="분당 경매장" id="tab1-1" index={0}>
            <div className="content-wrap">
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>서울1</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울2</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울3</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="양산 경매장" id="tab1-2" index={1}>
            <div className="content-wrap">
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>서울1</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울2</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울3</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="시화 경매장" id="tab1-3" index={2}>
            <div className="content-wrap">
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>서울1</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울2</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>서울3</MenuTitle>
                  <MenuCont>
                    <table summary="탁송료 안내 정보" className="table-tp1">
                      <caption className="away">탁송료 안내 정보</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울1</th>
                          <td>강남구,강동구,강서구,관악구,광진구,구로구,금천구,동작구,서초구,성동구,송파구,양천구,영등포구,용산구</td>
                        </tr>
                        <tr>
                          <th>45톤미만</th>
                          <td>37,000원</td>
                        </tr>
                        <tr>
                          <th>8톤미만</th>
                          <td>67,000원</td>
                        </tr>
                        <tr>
                          <th>8톤이상</th>
                          <td>80,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </div>
          </TabCont>
        </TabMenu>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default withRouter(consignInfo);