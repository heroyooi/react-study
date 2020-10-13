import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { withRouter } from 'next/router';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import { getConsignmentFee } from '@src/actions/autoAuction/autoAuctionAction';

const MobConsignInfo = ({ router }) => {
  const { consignSeq } = router.query;
  const nf = new Intl.NumberFormat();
  const dispatch = useDispatch();
  const { consignment1, consignment2, consignment3 } = useSelector((state) => state.autoAuction);

  useEffect(() => {
    if (consignSeq !== undefined) window.scrollTo(0, 0);
    if (isEmpty(consignment1)) {
      dispatch(getConsignmentFee());
    }
  }, []);

  return (
    <TabMenu type="type2" mount={false} defaultTab={consignSeq !== undefined ? Number(consignSeq) - 1 : 0}>
      <TabCont tabTitle="분당 경매장1" id="tab1-1" index={0}>
        <div className="content-wrap">
          <ul className="m-toggle-list up-blue">
            {!isEmpty(consignment1) &&
              consignment1.map((consign, index) => {
                return (
                  <MenuItem key={index}>
                    <MenuTitle>{consign.areaNm}</MenuTitle>
                    <MenuCont>
                      <table summary="탁송료 안내 정보" className="table-tp1">
                        <caption className="away">탁송료 안내 정보</caption>
                        <colgroup>
                          <col width="30%" />
                          <col width="70%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>{consign.areaNm}</th>
                            <td>{consign.contAreaNm}</td>
                          </tr>
                          <tr>
                            <th>4.5톤미만</th>
                            <td>{nf.format(consign.deliCost1)} 원</td>
                          </tr>
                          <tr>
                            <th>8톤미만</th>
                            <td>{nf.format(consign.deliCost2)} 원</td>
                          </tr>
                          <tr>
                            <th>8톤이상</th>
                            <td>{nf.format(consign.deliCost3)} 원</td>
                          </tr>
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                );
              })}
          </ul>
        </div>
      </TabCont>
      <TabCont tabTitle="양산 경매장" id="tab1-2" index={1}>
        <div className="content-wrap">
          <ul className="m-toggle-list up-blue">
            {!isEmpty(consignment3) &&
              consignment3.map((consign, index) => {
                return (
                  <MenuItem key={index}>
                    <MenuTitle>{consign.areaNm}</MenuTitle>
                    <MenuCont>
                      <table summary="탁송료 안내 정보" className="table-tp1">
                        <caption className="away">탁송료 안내 정보</caption>
                        <colgroup>
                          <col width="30%" />
                          <col width="70%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>{consign.areaNm}</th>
                            <td>{consign.contAreaNm}</td>
                          </tr>
                          <tr>
                            <th>4.5톤미만</th>
                            <td>{nf.format(consign.deliCost1)} 원</td>
                          </tr>
                          <tr>
                            <th>8톤미만</th>
                            <td>{nf.format(consign.deliCost2)} 원</td>
                          </tr>
                          <tr>
                            <th>8톤이상</th>
                            <td>{nf.format(consign.deliCost3)} 원</td>
                          </tr>
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                );
              })}
          </ul>
        </div>
      </TabCont>
      <TabCont tabTitle="시화 경매장" id="tab1-3" index={2}>
        <div className="content-wrap">
          <ul className="m-toggle-list up-blue">
            {!isEmpty(consignment2) &&
              consignment2.map((consign, index) => {
                return (
                  <MenuItem key={index}>
                    <MenuTitle>{consign.areaNm}</MenuTitle>
                    <MenuCont>
                      <table summary="탁송료 안내 정보" className="table-tp1">
                        <caption className="away">탁송료 안내 정보</caption>
                        <colgroup>
                          <col width="30%" />
                          <col width="70%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>{consign.areaNm}</th>
                            <td>{consign.contAreaNm}</td>
                          </tr>
                          <tr>
                            <th>4.5톤미만</th>
                            <td>{nf.format(consign.deliCost1)} 원</td>
                          </tr>
                          <tr>
                            <th>8톤미만</th>
                            <td>{nf.format(consign.deliCost2)} 원</td>
                          </tr>
                          <tr>
                            <th>8톤이상</th>
                            <td>{nf.format(consign.deliCost3)} 원</td>
                          </tr>
                        </tbody>
                      </table>
                    </MenuCont>
                  </MenuItem>
                );
              })}
          </ul>
        </div>
      </TabCont>
    </TabMenu>
  );
};

export default withRouter(MobConsignInfo);
