import moment from 'moment'
import Button from '@lib/share/items/Button';
import Router from 'next/router';
import qs from 'qs';
import IniPayButton from '@lib/share/inipay/IniPayButton';

const UsingTicketList = ({item={}}) => {
    console.log('UsingTicketList item : ', item)
    const {
        freepassinfo,
        updatefreepassinfo,
        perupdatepasscnt,
        perpasscnt,
        pricingpassinfo,
        pricingtotal,
    } = item

    const applyAutoPay = (e, tickets) => {
        const { name } = e.target
        console.log("addPeriod -> name", name)
        console.log("addPeriod -> tickets", tickets)
    }

    const addPeriod = (e, tickets) => {
        const { name } = e.target
        const { prdDvcd, crSlot } = tickets

        Router.push('/mypage/dealer/sellcar/carManagement?' + qs.stringify({
            management:'adver',
            sub:'1',
            prdDvcd,
            crSlot
        }) + `#${name}`)
    }

    const beforeRequest = () => {

    }

    return (
        <table className="table-tp1" summary="결제내역에 대한 내용">
            <caption className="away">결제내역</caption>
            <colgroup>
                <col width="24%" />
                <col width="76%" />
            </colgroup>
            <tbody>
                {
                    freepassinfo && 
                    <tr>
                        <th>자유이용권</th>
                        <td className="td-btn-fr">
                        <span className="tx">
                            {freepassinfo?.prodCnt ?? 0}대 이용 중({freepassinfo?.prodCnt ?? 0}/{freepassinfo?.crSlot})&nbsp;
                            <span className="tx-gray">남은기간 {freepassinfo?.retentionperiod ?? 0}일&nbsp;
                            ({moment(freepassinfo?.odrEndDt).format('YYYY/MM/DD')} 만료)</span>
                        </span>
                        <span className="btn-base">
                            {/* <Button
                                size="sml"
                                line="gray"
                                color="black"
                                radius={true}
                                title="자동결제신청"
                                width={84}
                                buttonMarkup={true}
                                name="free"
                                onClick={e => applyAutoPay(e, freepassinfo)}
                            /> */}
                            <IniPayButton
                                size="sml"
                                line="gray"
                                color="black"
                                radius={true}
                                title="자동결제신청"
                                width={84}
                                buttonMarkup={true}
                                name="free"
                                beforeRequestAsync={beforeRequest}
                                paymethod='Card'
                                items={[freepassinfo]}
                                prodType="pass"
                                billing={true} //자동결제
                            />
                            {
                                parseInt(freepassinfo?.retentionperiod ?? 0) < 14 &&
                                <Button
                                    size="sml"
                                    line="gray"
                                    color="black"
                                    radius={true}
                                    title="광고연장"
                                    width={64}
                                    marginRight={4}
                                    buttonMarkup={true}
                                    onClick={e => addPeriod(e, freepassinfo)}
                                    name="free"
                                />
                            }
                        </span>
                        </td>
                    </tr>
                }
                {
                    perpasscnt && 
                    <tr>
                        <th>대당이용권</th>
                        <td>{perpasscnt?.perCnt ?? 0}대 이용 중</td>
                    </tr>
                }
                {
                    updatefreepassinfo && 
                    <tr>
                        <th>업데이트 자유이용권</th>
                        <td className="td-btn-fr">
                        <span className="tx">
                            {updatefreepassinfo?.prodCnt ?? 0}대 이용 중({updatefreepassinfo?.prodCnt ?? 0}/{updatefreepassinfo?.crSlot})&nbsp;
                            <span className="tx-gray">남은기간 {updatefreepassinfo?.retentionperiod ?? 0}일&nbsp;
                            ({moment(updatefreepassinfo?.odrEndDt).format('YYYY/MM/DD')} 만료)</span>
                        </span>
                        <span className="btn-base">
                            <Button
                                size="sml"
                                line="gray"
                                color="black"
                                radius={true}
                                title="자동결제신청"
                                width={84}
                                buttonMarkup={true}
                                onClick={e => applyAutoPay(e, updatefreepassinfo)}
                                name="update20"
                            />
                            {
                                parseInt(updatefreepassinfo?.retentionperiod ?? 0) < 14 &&
                                <Button
                                    size="sml"
                                    line="gray"
                                    color="black"
                                    radius={true}
                                    title="광고연장"
                                    width={64}
                                    marginRight={4}
                                    buttonMarkup={true}
                                    onClick={e => addPeriod(e, updatefreepassinfo)}
                                    name="update20"
                                />
                            }
                        </span>
                        </td>
                    </tr>
                }
                {
                    perupdatepasscnt && 
                    <tr>
                        <th>업데이트 대당권</th>
                        <td>{perupdatepasscnt?.perCnt ?? 0}대 이용 중</td>
                    </tr>
                }
                {
                    pricingpassinfo && 
                    <tr>
                        <th>프라이싱 조회권</th>
                        <td className="td-btn-fr">
                            <span className="tx">
                                {pricingpassinfo?.currentUseAdCnt ?? 0}/{pricingpassinfo?.totalUseAdCnt ?? 0}회 이용
                                ( ※ 프라이싱 조회권 구매 {pricingtotal ?? 0}건 내역은 결제내역 탭에서 확인 하세요.)
                            </span>
                        </td>
                    </tr>
                }
                {
                    !freepassinfo &&
                    !updatefreepassinfo &&
                    !perupdatepasscnt &&
                    !perpasscnt &&
                    !pricingpassinfo && 
                    <tr>
                        <td collSpan="2" style={{textAlign:'center'}}>사용중인 이용권이 없습니다</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default UsingTicketList