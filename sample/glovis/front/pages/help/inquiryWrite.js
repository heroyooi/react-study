import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup'
import Input from '@lib/share/items/Input'
import Textarea from '@lib/share/items/Textarea';
import InputFile from '@lib/share/items/InputFile';
import CheckBox from '@lib/share/items/CheckBox'

const inquiryWrite = () => {
  // Textarea
  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  }
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  }
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  }
  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap help-inquiry-wrap">
          <h3>고객센터</h3>
          
          <TabMenu type="type1" defaultTab={1} tabLink={[
              { index: 0, url: '/help/noticelist' }, 
              { index: 1, url: '/help/inquiry' }, 
              { index: 2, url: '/help/faq' }
            ]}>
            <TabCont tabTitle="공지사항" id="tab1-1" index={0}></TabCont>
            <TabCont tabTitle="1:1상담" id="tab1-2" index={1}>
              <table summary="1:1 상담 문의에 대한 내용" className="table-tp2">
                <caption className="away">1:1 상담 문의하기</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="75%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>유형</th>
                    <td>
                      <RadioGroup dataList={[
                        {id:'inquiry1', value:1, checked:true, disabled:false, title:'내차사기'},
                        {id:'inquiry2', value:2, checked:false, disabled:false, title:'내차팔기'},
                        {id:'inquiry3', value:3, checked:false, disabled:false, title:'시세조회'},
                        {id:'inquiry4', value:4, checked:false, disabled:false, title:'홈서비스'},
                        {id:'inquiry5', value:5, checked:false, disabled:false, title:'기타'}
                      ]} />
                    </td>
                  </tr>
                  <tr>
                    <th>제목</th>
                    <td>
                      <Textarea countLimit={30} type="tp2" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} height={48} />
                    </td>
                  </tr>
                  <tr>
                    <th>내용</th>
                    <td>
                      <Textarea countLimit={1000} type="tp2" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} height={280} />
                    </td>
                  </tr>
                  <tr>
                    <th>첨부파일</th>
                    <td>
                      <InputFile uploadList={uploadList1} />
                      <p className="tx-exp-tp5">&#8251; 첨부가능 : JPG, JPEG, PNG</p>
                    </td>
                  </tr>
                  <tr>
                    <th>첨부파일</th>
                    <td>
                      <InputFile uploadList={uploadList1} />
                      <p className="tx-exp-tp5">&#8251; 첨부가능 : JPG, JPEG, PNG</p>
                    </td>
                  </tr>
                  <tr>
                    <th>답변알림</th>
                    <td>
                    <CheckBox id='chk-answer' title='답변이 등록되면 이메일로 알려드릴까요? (이메일: dealer_hong@glovis.co.kr)' />
                    <p className="tx-exp-tp5">&#8251; 문의내역 및 답변내용은 [마이페이지 > 1:1상담]에서 확인하실 수 있습니다.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabCont>
            <TabCont tabTitle="FAQ" id="tab1-3" index={2}></TabCont>
          </TabMenu>
          <Buttons align="center">
            <Button size="big" background="gray" title="취소" width={180} height={60}/>
            <Button size="big" background="blue80" title="문의 등록" width={180} height={60}/>
          </Buttons>
        </div>
      </div>
    </AppLayout>
  )
}

export default inquiryWrite