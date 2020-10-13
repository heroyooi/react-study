import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import KakaoMap from '@src/components/common/KakaoMap';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';

const MobViewMap = ({ seq }) => {
  const { auctionHouseList } = useSelector((state) => state.autoAuction);   
  console.log(auctionHouseList)
  return (
      <>
      {!isEmpty(auctionHouseList) && (
        <TabMenu type="type2" mount={true} defaultTab={seq !== undefined ? Number(seq) - 1 : 0}>
        {auctionHouseList.map((house, index) => {
            return (
            <TabCont tabTitle={house.auctNm} id={'tab1-' + (index + 1)} index={index} key={index}>
                <div className="content-wrap pt24 fs0">
                <table summary="경매장 위치에 대한 내용" className="table-tp1 mb16">
                    <caption className="away">경매장 위치 안내</caption>
                    <colgroup>
                    <col width="25%" />
                    <col width="65%" />
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>구분</th>
                        <td>{house.auctNm}</td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>{house.auctTelNo}</td>
                    </tr>
                    <tr>
                        <th>팩스</th>
                        <td>{house.auctFaxNo}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>{house.auctAddr}</td>
                    </tr>
                    </tbody>
                </table>
                <KakaoMap style={{ width: '100%', height: '400px', frameBorder: '0' }} addr={house.auctAddr} />
                </div>
            </TabCont>
            );
        })}
        </TabMenu>
    )}
      </>
  )
}

export default MobViewMap;