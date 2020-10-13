import { useState, useCallback } from 'react';
import moment from 'moment';
import RadioGroup from '@lib/share/items/RadioGroup';
import CheckBox from '@lib/share/items/CheckBox';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import Button from '@lib/share/items/Button';

const MobFalseSaleReport = ({ callback }) => {
  const now = moment();
  const [dep1Panel, setDep1Panel] = useState(0);
  const [dep2Panel, setDep2Panel] = useState(0);
  const tabDep1Click = useCallback((e, idx) => {
    setDep1Panel(idx);
  }, []);
  const tabDep2Click = useCallback((e, idx) => {
    setDep2Panel(idx);
  }, []);

  const [isCal, setIsCal] = useState(false); // 기본값은 false
  const handleCal = useCallback((e) => {
    e.preventDefault();
    setIsCal(true);
    if (callback) callback(e)
  }, []);

  const [agreeReply, setAgreeReply] = useState(false);
  const handleAgreeChange = useCallback((e) => setAgreeReply(Number(e.target.value) == 1 ? true : false), []);

  return (
    <>
      <div className="content-wrap false-report-car">
        <h3>신고차량</h3>
        <table summary="1년분" className="table-tp1">
          <caption className="away">신고차량</caption>
          <colgroup>
            <col width="30%" />
            <col width="70%" />
          </colgroup>
          <tbody>
            <tr>
              <th>등록번호</th>
              <td>12454801</td>
            </tr>
            <tr>
              <th>신고차량번호</th>
              <td>23다 4567</td>
            </tr>
            <tr>
              <th>차량정보</th>
              <td>기아 니로 프레스티지</td>
            </tr>
          </tbody>
        </table>
        <ul className="desc-list">
          <li>
            고객님께서 허위매물로 인한 피해를 신고해주세요.<br /> 
          (신고내용은 비공개입니다.) 
          </li>
        </ul>
      </div>
      <div className="content-wrap false-report-sale">
        <h3>신고매물</h3>
        <TabMenu type="type1" mount={false} callBack={tabDep1Click} isFix={false} defaultTab={0}>
          <TabCont tabTitle="팔린매물" id="tab1-1" index={0}>
          </TabCont>
          <TabCont tabTitle="정보허위차량" id="tab1-2" index={1}>
            <h3>정보 허위 유형을 선택해주세요 (복수 선택 가능)</h3>
            <ul className="false-chk-list">
              <li><CheckBox id='ss-chk1' title='가격허위' /></li>
              <li><CheckBox id='ss-chk2' title='주행거리허위' /></li>
              <li><CheckBox id='ss-chk3' title='차량정보허위' /></li>
              <li><CheckBox id='ss-chk4' title='사고유무오류' /></li>
              <li><CheckBox id='ss-chk5' title='미끼매물' /></li>
              <li><CheckBox id='ss-chk6' title='차량설명허위' /></li>
              <li><CheckBox id='ss-chk7' title='옵션정보허위' /></li>
              <li><CheckBox id='ss-chk8' title='차량번호오류' /></li>
            </ul>
          </TabCont>
          <TabCont tabTitle="자동차세" id="tab1-3" index={2}>
            <fieldset className="write-form">
              <legend>기타신고</legend>
              <div className="field-group">
                <div className="category"><label htmlFor="etc-report-subject">제목</label></div>
                <div className="field">
                  <Input type="text" countLimit={30} id="etc-report-subject" placeHolder="제목을 입력해주세요.(최대30자)" height={38} />
                </div>
              </div>
              <div className="field-group">
                <div className="category"><label htmlFor="etc-report-content">내용</label></div>
                <div className="field">
                  <Textarea countLimit={200} type="tp1" placeHolder="신고사유를 입력해주세요. (최대200자)" />
                </div>
              </div>
            </fieldset>
          </TabCont>
        </TabMenu>
        <div className="false-report-reply">
          <p className="user-agree">
            신고 내용에 대한 답변을 받으시겠습니까??<br />
            (마이페이지 &gt; 허위매물 신고에서 확인)
          </p>
          <RadioGroup
            defaultValue={0}
            dataList={[
              { id: 'chk-areee', value: 1, checked: false, disabled: false, label: '동의' },
              { id: 'chk-disagree', value: 2, checked: false, disabled: false, label: '미동의' }
            ]}
            className="chk"
            onChange={handleAgreeChange}
          ></RadioGroup>
          {
            agreeReply === true &&
            <>
              <p className="user-email-address"><Input type="text" id="report-user-email" placeHolder="이메일 주소를 입력해주세요." height={38} /></p>
            </>
          }
        </div>
      </div>
      <Button size="full" background="blue80" className="fixed" title="신고하기" onClick={handleCal} />
    </>
  )
}

export default MobFalseSaleReport;