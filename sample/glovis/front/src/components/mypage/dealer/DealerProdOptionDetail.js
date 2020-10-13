/**
 * 설명 : 딜러 >마이페이지 > 내차팔기(딜러) > 차량 상품 소개 작성 컴포넌트
 * @fileoverview 마이페이지 내차팔기(딜러)
 * @author 최승희
 */

import { useState, useEffect, useContext, useCallback, memo } from 'react';
import produce from 'immer';
import { axiosGet, axiosPost, frontUrl } from '@src/utils/HttpUtils';

import Radio from '@lib/share/items/Radio';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import SimpleTextarea from '@lib/share/items/SimpleTextarea';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import InputFile from '@lib/share/items/InputFile';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Input from '@lib/share/items/Input';
import { SystemContext } from '@src/provider/SystemProvider';

const commentApi = {
  insert: '/api/autobell/mypage/dealer/insertMyCarComment.do',
  selectList: '/api/autobell/mypage/dealer/selectMyCarCommentList.do',
  selectItem: '/api/autobell/mypage/dealer/selectMyCarComment.do',
}

const explainCategories = [
  { title: '직접입력', category: 'editedExplain' },
  { title: '나의 설명글 사용', category: 'myExplain' }
];

const getExampleExplains = () => axiosGet(frontUrl + '/mock/dealer/selcar/exampleExplains.json').then((res) => res?.data?.data);
const getMyExplains = () => axiosPost(commentApi.selectList, {
  pageNo: 1,
  // recordSize: 5,
  // DlrID: "hjjeon",
}).then((res) => res?.data?.data).then(res => {
  console.log('res : ', res)
  console.log('res : ', res)
  return res
})

const DealerProdOptionDetail = ({ onChangeValues, onCheck, item = {} }) => {
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [explainCategory, setExplainCategory] = useState(`editedExplain`);
  const [explains] = useState([
    { title: 'Key Point', code: "0010", className: 'key-point', key: 'kpntCntn', yn: 'kpntYn', fileup: true },
    { title: 'Wear & Tear', code: "0020", className: 'scratch-photo', key: 'scrcCntn', yn: 'scrcYn', fileup: true },
    { title: '이 차의 History', code: "0030", className: 'history', key: 'hstCntn', yn: 'hstYn', fileup: false },
    { title: '진단소견', code: "0040", className: 'diagnosis', key: 'opnCntn', yn: 'opnYn', fileup: false },
    { title: '기타', code: "0050", className: 'other', key: 'etcCntn', yn: 'etcYn', fileup: false }
  ]);
  const [editedExplain, setEditedExplain] = useState(item);
  const [example, setExample] = useState([]);
  // const [myExplains, setMyExplains] = useState([]);
  const [myExplainOptions, setMyExplainOptions] = useState([{ label: '선택하세요', value: '' }]);

  const [exTitle, setExTitle] = useState('');
  const [savePop, setSavePop, showSavePop, hideSavePop] = useRodal(false);
  const [countLimit, setCountLimit] = useState(2000);

  const { dealerProdCmntPicList = [] } = item


  const getFilePath = useCallback((code) =>
    dealerProdCmntPicList.filter(pic => pic.pstnDvcd === code).map(pic => pic?.fileNm ?? '').join(', ')
    , [dealerProdCmntPicList])

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
    },
    []
  );

  useEffect(() => {
    console.log("useEffect item : ", item)
    setEditedExplain(item);
  }, [item])

  useEffect(() => {
    const getExplains = async () => {
      console.log('getExplains')
      const [newExample = [], newMyExplains = []] = await Promise.all([getExampleExplains(), getMyExplains()])
      console.log("getExplains -> newExample", newExample)
      console.log("getExplains -> newMyExplains", newMyExplains)

      setExample(newExample);
      // setMyExplains([{}, ...newMyExplains.map((newMyExplain) => newMyExplain.value)]);
      setMyExplainOptions([
        { label: '선택하세요', value: "" },
        ...newMyExplains?.map((myExplain, i) => ({
          label: myExplain.ttlCntn,
          value: myExplain.prdCmntSno
        }))
      ]);

    };
    getExplains();
  }, []);


  const changeExplainCategory = (e) => {
    const { value, name } = e.target;
    console.log("changeExplainCategory -> value", value)
    console.log("changeExplainCategory -> name", name)
    console.log("changeExplainCategory -> editedExplain", editedExplain)

    setExplainCategory(value);

    if (value == 'value') {

    } else if (value == 'example') {
      onChangeValues(example);
    } else if (value == 'myExplain') {
      onChangeValues({
        kpntCntn: '',
        scrcCntn: '',
        hstCntn: '',
        opnCntn: '',
        etcCntn: '',
      });
    }
  };

  const selectMyExplain = async (option, target) => {
    const { value } = option;
    console.log("selectMyExplain -> value", value)

    if (!value) {
      return
    }

    showLoader()
    const { data, statusinfo } = await axiosPost(commentApi.selectItem, {
      PRD_CMNT_SNO: value
    }).then(res => res?.data)
    hideLoader()

    if (statusinfo.returncd === '000') {
      const {
        kpntCntn = '',
        kpntYn = 'N',
        hstCntn = '',
        hstYn = 'N',
        opnCntn = '',
        opnYn = 'N',
        etcCntn = '',
        etcYn = 'N',
        scrcCntn = '',
        scrcYn = 'N',
      } = data
      onChangeValues({ kpntCntn, kpntYn, hstCntn, hstYn, opnCntn, opnYn, etcCntn, etcYn, scrcCntn, scrcYn, });
    } else {
      showAlert('실패했습니다')
    }

  };

  const saveMyEx = async (e) => {
    showConfirm('저장하시겠습니까?', async () => {
      showLoader()
      const { data, statusinfo } = await axiosPost(commentApi.insert, {
        ...editedExplain, ttlCntn: exTitle,
      }).then(res => res?.data)
      hideLoader()

      if (statusinfo.returncd === '000') {
        showAlert('저장되었습니다')

        const newMyExplains = await getMyExplains() ?? []
        console.log("getExplains -> newMyExplains", newMyExplains)

        setMyExplainOptions([
          { label: '선택하세요', value: "" },
          ...newMyExplains?.map((myExplain, i) => ({
            label: myExplain.ttlCntn,
            value: myExplain.prdCmntSno
          }))
        ]);
        hideSavePop(false)
      } else {
        showAlert('실패하였습니다')
      }
    })
  }

  const inputExTitle = (e) => {
    const { value } = e.target
    setExTitle(value)
  }

  const changeCntn = (e) => {
    console.log('changeCntn')
    const { name, value } = e.target

    console.log('cntn : ', {
      [name]: value
    })

    onChangeValues({
      [name]: value
    })
  }

  const reset = (e) => {
    console.log("reset -> e ", e)
    const initialData = {
      kpntCntn: '',
      scrcCntn: '',
      hstCntn: '',
      opnCntn: '',
      etcCntn: '',
    }
    onChangeValues(initialData);
  }

  const uploadImage = (files, key) => {
    console.log('TCL: upload -> files', files);
    console.log('TCL: upload -> key', key);
  }

  return (
    <>
      <fieldset>
        <legend className="away">차량 설명글 입력</legend>
        <div className="register-car-ex">
          <h4>차량 설명글 입력</h4>
          <div className="ex-option-wrap">
            <div className="radio-group">
              <ul className="vertical">
                {explainCategories?.map((explain, i) => (
                  <li key={i}>
                    <Radio id={`explains-${i}`} value={explain.category} checked={explainCategory} title={explain.title} size="large" onChange={changeExplainCategory} name="explains" />
                  </li>
                ))}
              </ul>
            </div>
            <SelectBox
              id="mortgage3"
              className="items-sbox"
              placeHolder="선택하세요"
              disabled={explainCategory != 'myExplain'}
              options={myExplainOptions}
              width={190}
              height={40}
              onChange={selectMyExplain}
              name="myExplain"
            />
          </div>
          <div className="btn-wrap">
            <Button size="sml" line="gray" color="gray" radius={true} title="내용초기화" width={99} height={24} buttonMarkup={true} onClick={reset} />
          </div>

          {explains.map((explain, i) => (
            <div key={i} className={`${explain.className}-wrap`}>
              <CheckBox id={`chk-${explain.className}`} value={explain.yn} title={explain.title} checked={item?.[explain.yn] === 'Y'} onChange={onCheck} name={explain.yn} isSelf={true} />
              <div className="area">
                <SimpleTextarea
                  id={`explain-${i}`}
                  type="tp1"
                  countLimit={countLimit}
                  disabled={item?.[explain.yn] !== 'Y'}
                  // disabled={item?.[explain.yn] !== 'Y' || explainCategory !== 'editedExplain'}
                  placeHolder="설명을 입력하세요"
                  onBlur={changeCntn}
                  name={explain?.key}
                  value={editedExplain?.[explain?.key]}
                />
                {/* <div className="textarea-wrap">
                  <textarea
                    id={`explain-${i}`}
                    className={`textarea-tp1`}
                    maxLength={countLimit}
                    placeholder="에디터 화면 노출 영역"
                    disabled={item?.[explain.yn] !== 'Y' || explainCategory !== 'editedExplain'}
                    value={editedExplain?.[explain?.key]}
                    onChange={changeCntn}
                    name={explain?.key}
                  />
                  {countLimit !== undefined && (
                    <p className={`text-counter ${editedExplain?.[explain?.key]?.length > countLimit ? ` error` : ''}`} style={{ bottom: '5%' }}>
                      <span>{editedExplain?.[explain?.key]?.length}</span>/{countLimit}
                    </p>
                  )}
                </div> */}
              </div>
              {
                explain.fileup &&
                <InputFile
                  accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp" //image/* 안됨...
                  name={explain?.code}
                  uploadList={(files) => uploadImage(files, explain.yn)}
                  defaultFilePath={getFilePath(explain?.code)}
                  max={4}
                  placeHolder='최대 4장까지 가능합니다'
                />}
            </div>
          ))}
        </div>
      </fieldset>

      <Buttons align="right" marginTop={32}>
        <Button size="big" background="blue80" title="설명글 저장하기" width={155} buttonMarkup={true} onClick={showSavePop} />
      </Buttons>


      <RodalPopup show={savePop} type={'slideUp'} closedHandler={hideSavePop} title="나의 설명글 관리" mode="normal" size="small">
        <div className="con-wrap popup-my-ex">
          <p>설명글 제목을 입력하세요.</p>
          <Input
            type="text"
            height={48}
            name="exTitle"
            value={exTitle}
            onChange={inputExTitle}
            maxLength={12}
          />
          <div className="input-limit">{exTitle?.length || 0}/12</div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} buttonMarkup={true} onClick={() => hideSavePop(false)} />
            <Button size="big" background="blue80" title="확인" width={130} buttonMarkup={true} onClick={(e) => saveMyEx(e, "fade")} />
          </Buttons>
        </div>
      </RodalPopup>


    </>
  );
};

export default DealerProdOptionDetail;
