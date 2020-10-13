import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import CarInfo from '@src/components/common/CarInfo';
import CarStatus from '@src/components/common/CarStatus';
import CarHistory from '@src/components/common/CarHistory';
import CarDetails from '@src/components/common/CarDetails';
import CarPicture from '@src/components/common/CarPicture';
import CarSignature from '@src/components/common/CarSignature';

const popModifyPerfInspPhoto = ({eventHandler}) =>{
    return (
        <div className="con-wrap popup-perform-record">
          <div className="performance-chk">
            <ul className="pt-number">
              <li>제시번호</li>
              <li><Input type="text" id="Propose01" width={262} /></li>
              <li className="ex">예)202020</li>
              <li>매매회원이 중요정보(제시번호,성능점검기록부,조합/상사명) 미기재 또는 허위 기재시 표시 광고의 공정화에 관한 법률(20조 제1항 제1호)에 의해1억원이하의 과태료가부과될 수 있습니다.</li>
            </ul>
            <div className="management-law">
              <p>자동차관리법 시행규칙 개정(적용일 : 2018.07.01)에 따라 [자동차 성능과 상태, 가격정보]를 함께 제공하도록 개선되었습니다.</p>
            </div>
            <ul className="record">
              <li>중고자동차 성능 • 상태 점검기록부</li>
              <li className="number fr">
                <em className="mr8">제</em>
                <Input type="text" id="record01" width={50} height={40} />
                <em className="mg8">-</em>
                <Input type="text" id="record02" width={50} height={40} />
                <em className="mg8">-</em>
                <Input type="text" id="record03" width={87} height={40} />
                <em className="ml8">호</em>
              </li>
            </ul>
          </div>
          <form className="register-form history-form">
            <CarInfo />
            <CarStatus />
            <CarHistory />
            <CarDetails />
            <fieldset className="car-expert">
              <legend className="away">특기사항 및 점검자의 의견</legend>
              <table summary="특기사항 및 점검자의 의견에 대한 내용" className="table-tp1 input">
                <caption className="away">특기사항 및 점검자의 의견</caption>
                <colgroup>
                  <col width="19%" />
                  <col width="24%" />
                  <col width="57%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>특기사항 및 점검자의 의견</th>
                    <td>성능•상태 점검자</td>
                    <td><Input type="text" id="expert-opinion" disabled={true} /></td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <CarPicture />
            <CarSignature />
          </form>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="닫기" buttonMarkup={true} width={172} />
            <Button size="big" background="blue80" title="등록완료" buttonMarkup={true} width={172} onClick={(e)=>eventHandler(e)}/>
          </Buttons>
        </div>
    )
}

export default popModifyPerfInspPhoto