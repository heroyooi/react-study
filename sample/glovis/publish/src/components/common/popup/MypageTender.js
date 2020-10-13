import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
/*
  html 변경이력
  03.12 : 텍스트 변경 #a1
 
*/

const MypageTender = ({isBidding=false}) => {
  return (
    <div className="con-wrap popup-tender pay">
      <form className="register-form">
        <fieldset className="tender-wrap">
          <legend className="away">{isBidding === false ? "입찰하기" : "입찰가격 수정"}</legend>
          <label htmlFor="tender-price" className="hide">입찰금액</label>
          {
            isBidding === false
              ? <Input type="number" id="tender-price" width={230} height={48} />
              : <Input type="number" id="tender-price2" value="3,800" width={230} height={48} />
          }              
          <em>만원</em>
          <p>견적 실수, 찔러보기 식 낮은 견적 주의<br />(반복 시 경고 및 이용 제한)<br /><span className="tx-red80">※ 입찰가격 수정 3회 이용 제한 주의</span></p> {/* #a1 */}
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={127} />
            <Button size="big" background="blue80" title="입찰완료" title={isBidding === false ? "입찰완료" : "수정"} width={127} />
          </Buttons>
        </fieldset>
      </form>
    </div>
  )
}

export default MypageTender;