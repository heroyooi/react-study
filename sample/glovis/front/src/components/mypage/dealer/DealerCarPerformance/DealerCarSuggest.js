import Input from '@lib/share/items/Input';
import useSeperator from '@lib/share/custom/useSeperator'

import { combineValues } from '@src/utils/DataUtils';
import { useEffect } from 'react';


const DealerCarSuggest = ({crPrsnNum='', perfInspId='', onChangePrsNum, onChange, isEditing=true}) => {
  const [seperatedPerfInspId, seperatePerfInspId] = useSeperator(perfInspId)
  console.log("DealerCarSuggest -> seperatedPerfInspId", seperatedPerfInspId)

  const handleSeperateChange = (e) => {
    const value = combineValues(e)

    onChange({
        target: {
          value,
          name: e.target.name
        }
    })
  }

  useEffect(()=>{
    seperatePerfInspId(perfInspId)
  }, [ perfInspId ])

  return (
    <div className="performance-chk">
      <ul className="pt-number">
        <li>제시번호 <span style={{color:'red'}}>*</span></li>
        <li>
          <Input
            type="text"
            id="Propose01"
            width={262}
            onBlur={onChangePrsNum}
            name="crPrsnNum"
            value={crPrsnNum}
            disabled={!isEditing}
          />
        </li>
        <li className="ex">예)202020</li>
        <li>매매회원이 중요정보(제시번호,성능점검기록부,조합/상사명) 미기재 또는 허위 기재시 표시 광고의 공정화에 관한 법률(20조 제1항 제1호)에 의해1억원이하의 과태료가부과될 수 있습니다.</li>
      </ul>
      <div className="management-law">
        <p>자동차관리법 시행규칙 개정(적용일 : 2018.07.01)에 따라 [자동차 성능과 상태, 가격정보]를 함께 제공하도록 개선되었습니다.</p>
      </div>
      <ul className="record">
        <li>중고자동차 성능 • 상태 점검기록부 {isEditing && <span style={{color:'red'}}>*</span>}
        </li>
        <li className="number fr">
          <em className="mr8">제</em>
          {
            isEditing ? 
              <>
                <Input
                  type="text"
                  id="record01"
                  width={60}
                  onBlur={handleSeperateChange}
                  height={40}
                  name="perfInspId"
                  value={seperatedPerfInspId?.[0] ?? ''}
                  style={{
                    "padding" : "0 10px"
                  }}
                />
                <em className="mg8">-</em>
                <Input
                  type="text"
                  id="record02"
                  width={60}
                  onBlur={handleSeperateChange}
                  height={40}
                  name="perfInspId"
                  value={seperatedPerfInspId?.[1] ?? ''}
                  style={{
                    "padding" : "0 10px"
                  }}
                />
                <em className="mg8">-</em>
                <Input
                  type="text"
                  id="record03"
                  width={110}
                  onBlur={handleSeperateChange}
                  height={40}
                  name="perfInspId"
                  value={seperatedPerfInspId?.[2] ?? ''}
                />
              </>
            :
              perfInspId
          }
          <em className="ml8">호</em>
        </li>
      </ul>
    </div>
  )
}

export default DealerCarSuggest