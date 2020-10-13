import React, { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Textarea from '@lib/share/items/Textarea';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { isEmpty } from 'lodash';
import InputFile from '@lib/share/items/InputFile';
import { SystemContext } from '@src/provider/SystemProvider';
import { updateCmfgBsExplAction } from '@src/actions/sellcar/compareEstmAction';
import * as api from '@src/api/sellcar/SelfSellcarApi';

const DealNofityPop3 = ({ data, closedHandler }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { showAlert } = useContext(SystemContext);
  const [files, setFiles] = useState([]);

  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    setFiles(_files);
  };

  const [cmfgBsExplCntn, setCmfgBsExplCntn] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty(cmfgBsExplCntn)) {
      showAlert(`감가항목 사유 입력`);
      return false;
    }

    if(files.length > 5){
      showAlert(`파일은 최대 5개 이상 첨부할수 없습니다.`);
      return false;
    }

    const formData = new FormData(); // multipart/form-data로 보낼 파일 생성
    formData.append('slReqId', data.slReqId);
    formData.append('hh24AuctId', data.hh24AuctId);
    formData.append('dlrBiddNo', data.dlrBiddNo);
    formData.append('cmfgBsExplCntn', cmfgBsExplCntn);
    files.map( f => formData.append('files',f));

    const success = await dispatch(updateCmfgBsExplAction(formData));
    if (success) {
      showAlert(`저장 되었습니다.`);
      if (hasMobile) return closedHandler(e);
      closedHandler(false);
    } else {
      showAlert(`에러가 발생했습니다..`);
      if (hasMobile) return closedHandler(e);
      closedHandler(false);
    }
  };

  useEffect( ()=>{
    const param = {
      dlrBiddNo:data.dlrBiddNo,
      hh24AuctId:data.hh24AuctId
    };
    console.log("selectFailReason::","거래소명확인")
    api.selectFailReason(param)
        .then(res => {
          const {data,result:{returncd}} = res.data;
          console.log("selectFailReason::",res);
          if(returncd === '000'){
            setCmfgBsExplCntn(data.cmfgBsExplCntn);
            console.log("selectFailReason::",data.cmfgBsExplCntn);
          }
        })
        .catch(err => {
          console.log("selectFailReason::",err);
        });
  }, []);

  // 모바일
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
  if (hasMobile) {
    return (
      <>
        <div className="inner popup-tender">
          <form className="register-form">
            <fieldset>
              <h3 className="tit1">거래소명</h3>
              <p className="mb8 mt24">소명사유</p>
              <Textarea
                countLimit={500}
                type="tp1"
                className="mb8"
                height={133}
                placeHolder="소명사유를 작성해주세요."
                onBlur={(e) => {
                  e.preventDefault();
                  setCmfgBsExplCntn(e.target.value);
                }}
                value={cmfgBsExplCntn}
              />
              <InputFile uploadList={uploadList1} resVertical={true} type="special" />
            </fieldset>
          </form>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="big" background="blue20" color="blue80" title="취소" fontWeight="500" onClick={closedHandler} />
          <Button size="big" background="blue80" title="입력" fontWeight="500" onClick={onSubmit} />
        </Buttons>
      </>
    )
  }
  return (
    <div className="con-wrap popup-tender">
      <form className="register-form">
        <fieldset>
          <ul className="form-list">
            <li className="w">
              소명사유
              <Textarea
                countLimit={500}
                type="tp1"
                onBlur={(e) => {
                  e.preventDefault();
                  setCmfgBsExplCntn(e.target.value);
                }}
                height={128}
                placeHolder="사유를 입력하세요."
                data={cmfgBsExplCntn}
              />
            </li>
            <li className="mt40">
              첨부파일(최대 5개까지 등록가능)
              <InputFile uploadList={uploadList1} resVertical={true} />
            </li>
          </ul>
          <Buttons align="center" marginTop={48}>
            <Button
              size="big"
              background="gray"
              title="취소"
              width={127}
              onClick={(e) => {
                e.preventDefault();
                closedHandler(false);
              }}
              
            />
            <Button size="big" background="blue80" title="입력" width={127} onClick={onSubmit} />
          </Buttons>
        </fieldset>
      </form>
    </div>
  );
};

export default DealNofityPop3;
