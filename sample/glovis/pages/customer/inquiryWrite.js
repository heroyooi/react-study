import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import Textarea from '@lib/share/items/Textarea';
import InputFile from '@lib/share/items/InputFile';
import CheckBox from '@lib/share/items/CheckBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_CUSTOMER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const inquiryWrite = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_CUSTOMER });
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

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

  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);
  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '1:1 상담',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#ffffff'
      }
    });
    
    return (
      <AppLayout>     
        <div className="content-wrap help-inquiry-wrap">
          <table summary="1:1 상담 문의에 대한 내용" className="table-tp2 pd20">
            <caption className="away">1:1 상담 문의하기</caption>
            <colgroup>
              <col width="79px" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th className="ver-t">유형</th>
                <td>
                  <RadioGroup dataList={[
                    {id:'inquiry1', value:1, checked:true, disabled:false, label:'내차사기'},
                    {id:'inquiry2', value:2, checked:false, disabled:false, label:'내차팔기'},
                    {id:'inquiry3', value:3, checked:false, disabled:false, label:'시세조회'},
                    {id:'inquiry4', value:4, checked:false, disabled:false, label:'홈서비스'},
                    {id:'inquiry5', value:5, checked:false, disabled:false, label:'기타'}
                  ]} />
                </td>
              </tr>
              <tr>              
                <td colSpan="2">
                  <Textarea countLimit={30} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} disabledEnter={true} height={50} placeHolder='제목을 입력해주세요.' />
                  <Textarea className="mt16" countLimit={1000} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} height={280} placeHolder='문의내용을 입력해주세요.' />
                </td>
              </tr>
              <tr>              
                <td colSpan="2">
                  <InputFile uploadList={uploadList1} resVertical={true} type="special" />
                  <p className="tx-exp-tp6">&#8251; 첨부가능 : JPG, JPEG, PNG</p>
                </td>
              </tr>            
              <tr>              
                <td colSpan="2">
                  <CheckBox id='chk-basic-sml' title='답변이 등록되면 이메일로 알려드릴까요?' size="small" />
                  <span className="sm-info">이메일 : dealer_hong@glovis.co.kr</span>
                  <p className="tx-exp-tp6 mt16">&#8251; 문의내역 및 답변내용은 [마이페이지 > 1:1상담]에서 확인하실 수 있습니다.</p>
                </td>
              </tr>
            </tbody>
          </table>                                              
          <MobBottomArea isFix={true} isSimple={true}>
            <Buttons align="center" className="full">
              <Button size="big" background="blue20" color="blue80" title="취소" height={56} />
              <Button size="big" background="blue80" title="등록" height={56} onClick={(e) => openMpop(e, "fade")} />
            </Buttons>
          </MobBottomArea>           
        </div>

        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1"></p>
            <p>문의유형을 선택해주세요</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeMpop} />             
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
     
      <div className="content-wrap help-inquiry-wrap">
          <h3>고객센터</h3>
          
          <TabMenu type="type1" defaultTab={1} tabLink={[
              { index: 0, url: '/customer/noticeList' }, 
              { index: 1, url: '/customer/inquiry' }, 
              { index: 2, url: '/customer/faq' }
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
                      <Textarea countLimit={30} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} height={48} placeHolder='제목을 입력해주세요.' />
                    </td>
                  </tr>
                  <tr>
                    <th>내용</th>
                    <td>
                      <Textarea countLimit={1000} type="tp1" onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} height={280} placeHolder='문의내용을 입력해주세요.' />
                    </td>
                  </tr>
                  <tr>
                    <th>첨부파일<em>(선택)</em></th>
                    <td>
                      <InputFile uploadList={uploadList1} resVertical={true} />
                      <p className="tx-exp-tp6">&#8251; 첨부가능 : JPG, JPEG, PNG</p>
                    </td>
                  </tr>
                  <tr>
                    <th>첨부파일<em>(선택)</em></th>
                    <td>
                      <InputFile uploadList={uploadList1} resVertical={true} />
                      <p className="tx-exp-tp6">&#8251; 첨부가능 : JPG, JPEG, PNG</p>
                    </td>
                  </tr>
                  <tr>
                    <th>답변알림<em>(선택)</em></th>
                    <td>
                    <CheckBox id='chk-answer' title='답변이 등록되면 이메일로 알려드릴까요? (이메일: dealer_hong@glovis.co.kr)' />
                    <p className="tx-exp-tp6">&#8251; 문의내역 및 답변내용은 [마이페이지 > 1:1상담]에서 확인하실 수 있습니다.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabCont>
            <TabCont tabTitle="FAQ" id="tab1-3" index={2}></TabCont>
          </TabMenu>
          <Buttons align="center">
            <Button size="big" background="gray" title="취소" width={180} height={60}/>
            <Button size="big" background="blue80" title="문의 등록" width={180} height={60} onClick={(e) => rodalPopupHandler1(e, "fade")} />
          </Buttons>
        </div>
     

      <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="xs">
        <div className="con-wrap popup-inquiry">
          <p>고객님께서 문의하신 내용이 정상적으로 접수되었습니다.<br />문의내역은 [마이페이지>1:1상담]에서 확인하실 수 있습니다.</p>
          <Buttons align="center" className="w-line" marginTop={40}>
            <Button size="big" background="blue80" title="확인" width={245} height={48}/>
          </Buttons>
        </div>

        {/* <div className="con-wrap popup-inquiry">
          <p>문의유형을 선택해주세요</p>
          <Buttons align="center" marginTop={40}>
            <Button size="big" background="blue80" title="확인" width={245} height={48}/>
          </Buttons>
        </div> */}
      </RodalPopup>
    </AppLayout>
  )
}

export default inquiryWrite