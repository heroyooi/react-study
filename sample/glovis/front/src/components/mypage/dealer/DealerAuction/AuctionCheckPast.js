import { useState, useEffect } from 'react';

import Input from '@lib/share/items/Input';
import Radio from '@lib/share/items/Radio';

const AuctionCheckPast = ({ item, onChange }) => {
  const [agreeReply, setAgreeReply] = useState(true);

  return (
    <table summary="경매회원 업체정보 입력" className="table-tp1 input">
      <caption className="away">과거 가입 유무 확인</caption>
      <colgroup>
        <col width="140px" />
        <col width="180px" />
        <col width="140px" />
        <col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>과거 가입 유무</th>
          <td>
            <div className="radio-group">
              <Radio id="isDroped-1" value="Y" checked={item?.isDroped} title="예" onChange={onChange} name="isDroped" />
              <Radio id="isDroped-2" value="N" checked={item?.isDroped} title="아니요" onChange={onChange} name="isDroped" />
            </div>
          </td>
          <th>과거 탈퇴 사유</th>
          <td>
            <Input type="text" id="da-out-reason" disabled={item?.isDroped == 'N'} width={380} height={40} value={item?.dropReason} onBlur={onChange} isSelf={false} name="dropReason" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AuctionCheckPast;
