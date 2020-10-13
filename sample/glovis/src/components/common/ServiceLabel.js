import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';

const ServiceLabel = () => {
  return (
    <ul className="car-service-label">
      <li>
        <Tooltip placement="bottomRight" width={306} exception="service-label">
          <TooltipItem>
            <em className="tag-tp4 bg-sky80">홈</em>
          </TooltipItem>
          <TooltipCont>
            <p>홈서비스<span>서비스 이용중인 판매자 입니다.</span></p>
          </TooltipCont>
        </Tooltip>
      </li>
      <li>
        <Tooltip placement="bottomRight" width={306} exception="service-label">
          <TooltipItem>
            <em className="tag-tp4 bg-purple">오</em>
          </TooltipItem>
          <TooltipCont>
            <p>오토옥션<span>서비스 이용중인 판매자 입니다.</span></p>
          </TooltipCont>
        </Tooltip>
      </li>
      <li>
        <Tooltip placement="bottomRight" width={306} exception="service-label">
          <TooltipItem>
            <em className="tag-tp4 bg-orange">프</em>
          </TooltipItem>
          <TooltipCont>
            <p>프라이싱<span>서비스 이용중인 판매자 입니다.</span></p>
          </TooltipCont>
        </Tooltip>
      </li>
    </ul>
  )
}

export default ServiceLabel;