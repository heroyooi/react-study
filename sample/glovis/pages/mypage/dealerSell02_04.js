import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MypageSellPrice from '@src/components/common/MypageSellPrice';
import MypageMortgage from '@src/components/common/MypageMortgage';
import MypageAcidentRecord from '@src/components/common/MypageAcidentRecord';
import MypageMovieUrl from '@src/components/common/MypageMovieUrl';
import MypageCarEx from '@src/components/common/MypageCarEx';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import Textarea from '@lib/share/items/Textarea';
import InputFile from '@lib/share/items/InputFile';
import { select1_list } from '@src/dummy';
import { SECTION_MYPAGE } from '@src/actions/types';

/*
html 변경이력
  03.17 : 가격 및 차량소개와 성능점검 서로 위치 바뀜 
        :홈서비스 케이스 추가, 인증회원일 경우 추가
*/

const DealerSell02_04 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const [textareaDisabled1, setTextareaDisabled1] = useState(true)
  const [textareaDisabled2, setTextareaDisabled2] = useState(true)
  const [textareaDisabled3, setTextareaDisabled3] = useState(true)
  const [textareaDisabled4, setTextareaDisabled4] = useState(true)
  const [textareaDisabled5, setTextareaDisabled5] = useState(true)

  const handleTextarea1 = useCallback(() => {
    setTextareaDisabled1(!textareaDisabled1)
  }, [textareaDisabled1]);

  const handleTextarea2 = useCallback(() => {
    setTextareaDisabled2(!textareaDisabled2)
  }, [textareaDisabled2]);

  const handleTextarea3 = useCallback(() => {
    setTextareaDisabled3(!textareaDisabled3)
  }, [textareaDisabled3]);

  const handleTextarea4 = useCallback(() => {
    setTextareaDisabled4(!textareaDisabled4)
  }, [textareaDisabled4]);

  const handleTextarea5 = useCallback(() => {
    setTextareaDisabled5(!textareaDisabled5)
  }, [textareaDisabled5]);

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
      <div className="content-wrap register-wrap price-introduce">
        <MypageNavi mode="dealer" />
        
        <div className="mypage-state-sec">
          
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={3} /> {/* 가격 및 차량소개와 성능점검 서로 위치 바뀜 active값 수정 */}
          </div>

          <form className="register-form tp2">
            <fieldset>
              <legend className="away">연락처</legend>
              <div className="register-number">
                <h4>연락처</h4>
                <SelectBox id="register-number" className="items-sbox" placeHolder="010-1234-9287" options={select1_list} width={176} height={40} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="away">노출유형</legend>
              <div className="register-exposure">
                <h4>노출유형</h4>
                {/* 홈서비스 케이스 추가, 프랜차이즈, 홈서비스 선택케이스 동시 노출가능 */}
                <RadioGroup dataList={[
                  {id:'radio1', value:1, checked:true, disabled:false, title:'프랜차이즈'},                  
                  // {id:'radio5', value:5, checked:true, disabled:false, title:'홈서비스'},
                  {id:'radio2', value:2, checked:false, disabled:false, title:'일반'}
                ]} mode="vertical"/>

                {/* 인증회원일 경우 start */}
                {/* <RadioGroup dataList={[
                  {id:'radio3', value:3, checked:true, disabled:false, title:'인증'},
                  {id:'radio4', value:4, checked:false, disabled:false, title:'일반'}
                ]} mode="vertical"/> */}
                 {/* 인증회원일 경우 end */}
              </div>
            </fieldset>

            {/* 판매가격 */}
            <MypageSellPrice />

            {/* 압류/저당 입력 */}
            <MypageMortgage />
            
            {/* 사고이력정보 */}
            <MypageAcidentRecord />

            {/* 동영상 */}
            <MypageMovieUrl />

            {/* 나의설명글 */}
            <MypageCarEx />

          </form>

          <Buttons marginTop={48}>
            <span className="step-btn-l">
              <Button size="big" background="gray" title="이전" width={150} height={60} />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="다음" width={150} height={60} mode="normal" />
            </span>
          </Buttons>

        </div>
      </div>
    </AppLayout>
  )
}

export default DealerSell02_04