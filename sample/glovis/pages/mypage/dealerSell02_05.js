import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout'
import MypageNavi from '@src/components/common/MypageNavi'
import CarInfo from '@src/components/common/CarInfo'
import CarStatus from '@src/components/common/CarStatus'
import CarHistory from '@src/components/common/CarHistory'
import CarDetails from '@src/components/common/CarDetails'
import CarPicture from '@src/components/common/CarPicture'
import CarSignature from '@src/components/common/CarSignature'
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import { select1_list } from '@src/dummy';
import { SECTION_MYPAGE } from '@src/actions/types';

/*
html 변경이력
  03.17 : 가격 및 차량소개와 성능점검 서로 위치 바뀜 
*/

const DealerSell02_05 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  return (
    <AppLayout>
      <div className="content-wrap register-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">

          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={2} />{/* 가격 및 차량소개와 성능점검 서로 위치 바뀜 active값 수정 */}
          </div>

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
              <li>중고자동차 성능 • 상태 점검기록부
              {/* <SelectBox id="select1" className="items-sbox" placeHolder="기존 입력 정보 수정" width={318} hieght={40} options={select1_list} /> */}
              </li>
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
                    <td><Input type="text" id="expert-opinion" /></td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <CarPicture />
            <CarSignature />
          </form>

          <Buttons marginTop={48}>
            <span className="step-btn-l">
              <Button size="big" background="gray" title="이전" width={150} height={60} />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="다음" width={150} height={60} />
            </span>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerSell02_05