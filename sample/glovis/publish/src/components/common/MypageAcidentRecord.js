import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button'
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

const MypageAcidentRecord = () =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [historyPop, setHistoryPop, handleOpenHistoryPop, handleCloseHistoryPop] = useRodal(false, true);
if(hasMobile) {
  return (
    <>
      <fieldset className="accident-record">
        <legend className="away">압류/저당 입력</legend>
        <Button className="fr" size="sml" color="red60" line='red60' radius={true} title="중고차 사고이력정보 보기" width={144} fontWeight={500} marginBottom={8} />
        <table summary="사고 이력 정보에 대한 내용" className="table-tp1 input fs14">
          <caption className="away">사고 이력 정보</caption>
          <colgroup>
            <col width="45%" />
            <col width="55%" />
          </colgroup>
          <tbody>
            <tr>
              <th>자동차 일반사양</th>
              <td>렉서스, LS460L, 2015년식</td>
            </tr>
            <tr>
              <th>자동차 특수 사고이력<br />(전손, 침수, 도난)</th>
              <td>전손 : 0, 도난 : 0<br />침수(전손/분손) : 0</td>
            </tr>
            <tr>
              <th>자동차 용도변경이력</th>
              <td>사용이력있음</td>
            </tr>
            <tr>
              <th>보험사고이력<br />: 내차 피해 / 타차 가해</th>
              <td>없음 / 1회</td>
            </tr>
          </tbody>
        </table>
      </fieldset>
      <div className="essential-point fs12 mt8">
        <ul>
          <li><i className="ico-dot"></i>중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여, 보험개발원에서 보유하고 있는 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.</li>
          <li><i className="ico-dot"></i>본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.</li>
          <li><i className="ico-dot"></i>사고이력정보는 SK엔카사이트 상 광고를 위한 목적으로만 사용되어야 하며 무단으로 복제, 도용, 배포할 수 없습니다.</li>
        </ul>
      </div>
    </>
  )
}
  return(
    <>
      <fieldset className="accident-record">
        <legend className="away">사고 이력 정보</legend>
        <table summary="사고 이력 정보에 대한 내용" className="table-tp1 input fs14">
          <caption>사고 이력 정보</caption>
          <colgroup>
            <col width="20%" />
            <col width="30%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>
          <tbody>
            <tr>
              <th>자동차 일반사양</th>
              <td>렉서스, LS460L, 2015년식</td>
              <th>자동차 특수 사고이력<br />(전손, 침수, 도난)</th>
              <td>전손 : 0, 도난 : 0<br />침수(전손/분손) : 0</td>
            </tr>
            <tr>
              <th>자동차<br />용도변경이력</th>
              <td>사용이력있음</td>
              <th>보험사고이력<br />: 내차 피해 / 타차 가해</th>
              <td>없음 / 1회</td>
            </tr>
          </tbody>
        </table>
      </fieldset>
      <div className="accident-record btn-wrap">
        <Button size="big" background="blue80" title="중고차 사고이력정보 보고서 보기" width={303}  onClick={handleOpenHistoryPop}/>
      </div>

      <div className="essential-point tp2 mt25">
        <ul>
          <li>중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여, 보험개발원에서 보유하고 있는 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.</li>
          <li>본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.</li>
          <li>사고이력정보는 SK엔카사이트 상 광고를 위한 목적으로만 사용되어야 하며 무단으로 복제, 도용, 배포할 수 없습니다.</li>
        </ul>
      </div>

      <RodalPopup show={historyPop} type={'fade'} closedHandler={handleCloseHistoryPop} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory />
      </RodalPopup>
    </>
  )
}

export default MypageAcidentRecord;