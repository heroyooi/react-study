import RadioGroup from '@lib/share/items/RadioGroup'
import Button from '@lib/share/items/Button'
import React from 'react';

const MypageAcidentRecord = ({data, userData, onInput}) =>{

  const onChangeAccidentsHis =(e) => {
    const value = e.target.value;
    onInput({target:{value: Number(value)}}, 'history');
  }

  return(
    <>
      <form className="register-form accident-record">
        <fieldset>
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
              <td>{data.carInfo}</td>
              <th>자동차 특수 사고이력<br />(전손, 침수, 도난)</th>
              <td>전손 : {data.specials.breakAll}, 도난 : {data.specials.theft}<br />침수(전손/분손) : {data.specials.flooding}</td>
            </tr>
            <tr>
              <th>자동차<br />용도변경이력</th>
              <td>{data.usageChange}</td>
              <th>보험사고이력<br />: 내차 피해 / 타차 가해</th>
              <td>{data.inssurance.mine == 0 ? '없음' : data.inssurance.mine +' 회'} / 1회</td>
            </tr>
         {/*   <tr>
              <th>차량 사고 이력 조회<br />유/무 선택</th>
              <td colSpan="3" className="td-btn-fr">
                      <span className="tx">
                        <RadioGroup dataList={[
                          {id:'accident-record1', value:1, checked:true, disabled:false, title:'공개'},
                          {id:'accident-record2', value:2, checked:false, disabled:false, title:'비공개'}
                        ]}
                                    defaultValue ={ typeof userData ==='undefined' ? 1 :  userData.history}
                                    onChange={onChangeAccidentsHis}
                        />
                      </span>
                <Button size="big" background="blue80" title="중고차 사고이력정보 보고서 보기" width={303} />
              </td>
            </tr>*/}
            </tbody>
          </table>
        </fieldset>
      </form>
      <div className="accident-record btn-wrap">
        <Button size="big" background="blue80" title="중고차 사고이력정보 보고서 보기" width={303} />
      </div>

      <div className="essential-point tp2 mt25 mb80">
        <ul>
          <li>중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여, 보험개발원에서 보유하고 있는 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.</li>
          <li>본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.</li>
          <li>사고이력정보는 현대 글로비스 오토벨 광고를 위한 목적으로만 사용되어야 하며 무단으로 복제, 도용, 배포할 수 없습니다.</li>
        </ul>
      </div>
    </>
  )
}

export default MypageAcidentRecord;