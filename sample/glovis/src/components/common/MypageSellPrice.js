import { useSelector } from 'react-redux';
import Input from '@lib/share/items/Input'
import FilterRange from '@lib/share/items/FilterRange'
import Button from '@lib/share/items/Button';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';

const MypageSellPrice = ({mode="tooltip"}) =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile) {
    return (
      <fieldset>
        <legend className="away">판매가격</legend>
        <div className="register-sell-price">
          <h4>판매가격</h4>
          <Input type="text" id="register-sell-price" value="3,700" width='68%' />
        </div>
    </fieldset>
    )
  }
  const ViewPoint = (mode) => {
    return (
      <div className="price-grade-tp2">
        <div className="cur-price">
          <p className="veiw-point-tit">이 차량의 현재 시세<span> (단위:만원)</span></p>
          <div className="proper-price">
            <FilterRange rangeUnit="적정시세" initMin={3500} initMax={3920} rangeMin={3620} rangeMax={3820} disabled={false} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <fieldset>
      <legend className="away">판매가격</legend>
      <div className="register-sell-price">
        <h4>판매가격</h4>
        <div className="sell-price-wrap">
          <div className={mode === "tooltip" ? "sell-price" : "sell-price viewer"}>
            <Input type="text" id="register-sell-price" value="3,700" width={176} height={40} />
            <em>만원</em>
            {
              mode === "tooltip"
                ? (
                  <div className="tooltip-content">
                    <Tooltip placement="right" event="click" exception="tooltip-price-grade" >
                      <TooltipItem>
                        <Button size="sml" line="gray" color="gray" radius={true} title="해당차량 시세 확인" width={109} height={24} marginLeft={25} />
                      </TooltipItem>
                      <TooltipCont>
                        <ViewPoint />
                      </TooltipCont>
                    </Tooltip>
                  </div>
                ) : <ViewPoint />
            }
          </div>
        </div>
      </div>
    </fieldset>
  )
}

export default MypageSellPrice;