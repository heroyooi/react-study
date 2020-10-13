import PropTypes from 'prop-types';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';

const ServiceLabel = ({ hSvcUseCnt = 0, aSvcUseCnt = 0, pSvcUseCnt = 0 }) => {
  return (
    <ul className="car-service-label">
      {hSvcUseCnt > 0 && (
        <li>
          <Tooltip placement="bottomRight" width={306} exception="service-label">
            <TooltipItem>
              <em className="tag-tp4 bg-sky80">홈</em>
            </TooltipItem>
            <TooltipCont>
              <p>
                홈서비스<span>서비스 이용중인 판매자 입니다.</span>
              </p>
            </TooltipCont>
          </Tooltip>
        </li>
      )}
      {aSvcUseCnt > 0 && (
        <li>
          <Tooltip placement="bottomRight" width={306} exception="service-label">
            <TooltipItem>
              <em className="tag-tp4 bg-purple">오</em>
            </TooltipItem>
            <TooltipCont>
              <p>
                스마트옥션<span>서비스 이용중인 판매자 입니다.</span>
              </p>
            </TooltipCont>
          </Tooltip>
        </li>
      )}
      {pSvcUseCnt > 0 && (
        <li>
          <Tooltip placement="bottomRight" width={306} exception="service-label">
            <TooltipItem>
              <em className="tag-tp4 bg-orange">프</em>
            </TooltipItem>
            <TooltipCont>
              <p>
                프라이싱<span>서비스 이용중인 판매자 입니다.</span>
              </p>
            </TooltipCont>
          </Tooltip>
        </li>
      )}
    </ul>
  );
};

ServiceLabel.propTypes = {
  hSvcUseCnt: PropTypes.number,
  aSvcUseCnt: PropTypes.number,
  pSvcUseCnt: PropTypes.number
};

export default ServiceLabel;
