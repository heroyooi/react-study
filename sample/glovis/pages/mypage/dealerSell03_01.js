import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MypageCarEx from '@src/components/common/MypageCarEx';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerSell03_01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  return (
    <AppLayout>
      <div className="content-wrap my-ex-admin">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>나의 설명글 등록</h3>
            <p>[차량상세>판매자의 차량 가이드]에 노출됩니다.</p>
          </div>
          <MypageCarEx radioGroup={true} title={true} activeTextarea={true} isButtonReset={true} buttonType={2} />
          
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerSell03_01;