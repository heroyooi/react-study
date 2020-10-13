import { useState, useEffect } from 'react';

import InputFile from '@lib/share/items/InputFile';

const AuctionDocumentUploader = ({ item, onChange }) => {
  return (
    <table summary="서류 업로드" className="table-tp1 input">
      <caption className="away">서류 업로드</caption>
      <colgroup>
        <col width="240px" />
        <col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>사업자등록증 사본</th>
          <td>
            {/* <Input type="text" id="da-business-license" width={470} height={40} /><Button size="big" background="blue80" title="찾아보기" width={140} height={40} /> */}
            <InputFile
              uploadList={onChange}
              inputW={450}
              buttonBackground="blue80"
              height={40}
              isMultiple={false}
              accept=".jpg,jpeg"
              name="entrCeregrtCpFile"
            />
          </td>
        </tr>
        <tr>
          <th>자동차관리사업등록증</th>
          <td>
            <InputFile
              uploadList={onChange}
              inputW={450}
              buttonBackground="blue80"
              height={40}
              isMultiple={false}
              accept=".jpg,jpeg"
              name="crMgmtCeregrtFile"
            />
          </td>
        </tr>
        <tr>
          <th>
            신청인 사진(반명함 사이즈)<em>(선택)</em>
          </th>
          <td>
            <InputFile
              uploadList={onChange}
              isMultiple={false}
              inputW={450}
              buttonBackground="blue80"
              height={40}
              isMultiple={false}
              accept=".jpg,jpeg"
              name="reqPhtFile"
            />
          </td>
        </tr>
        <tr>
          <th>
            회원가입 서약서<em>(선택)</em>
          </th>
          <td>
            <InputFile
              uploadList={onChange}
              isMultiple={false}
              inputW={450}
              buttonBackground="blue80"
              height={40}
              isMultiple={false}
              accept=".jpg,jpeg"
              name="mbJoinCntctFileUrl"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AuctionDocumentUploader;
