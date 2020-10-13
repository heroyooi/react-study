import Radio from '@lib/share/items/Radio'
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

import { setComma } from '@src/utils/StringUtil';

const CarSeriesSelection = ({items, onSelect, selectedSeries, onClose, onSubmit}) => {

    return (
        <div className="con-wrap popup-adeffect">
          <table className="table-tp1" summary="상세모델을 선택하세요">
            <caption className="away">상세모델을 선택하세요</caption>
            <colgroup>
              <col width="75%" />
              <col width="25%" />
            </colgroup>
            <tbody>
                {
                  items?.length ?
                    items.map((item,i) =>
                      <tr key={i} onClick={(e) => onSelect(item)} style={{cursor:'pointer'}} >
                        <td>
                          <div className="summary">
                              <h4 className="subject">
                                <Radio
                                  size="small"
                                  value={item?.seriesno}
                                  checked={selectedSeries?.seriesno}
                                />
                                {item?.modelname} {item?.seriesname}
                              </h4>
                          </div>
                        </td>
                        <td>
                          <p className="price">{setComma(item?.seriesprice)}원</p>
                        </td>
                      </tr>
                    )
                  :
                    <tr>
                      <td colSpan="2" style={{textAlign:'center'}}>
                          등록된 차량이 없습니다
                      </td>
                    </tr>
                }
            </tbody>
          </table>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" buttonMarkup={true} width={130} onClick={() => {onClose && onClose(false)}} />
            <Button size="big" background="blue80" title="확인" buttonMarkup={true} width={130} onClick={onSubmit} />
          </Buttons>
        </div>
    )
}

export default CarSeriesSelection