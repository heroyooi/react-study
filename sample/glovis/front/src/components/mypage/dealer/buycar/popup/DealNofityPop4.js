import React from 'react';
import { useSelector } from 'react-redux';
import Textarea from '@lib/share/items/Textarea';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const DealNofityPop4 = ({ closedHandler }) => {

  const hasMobile = useSelector((state) => state.common.hasMobile);
  // textarea
  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  };
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  };
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  };
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
                onChange={textareaChange}
                onBlur={textareaBlur}
                onFocus={textareaFocus}
                disabled={true}
                height={128}
                placeHolder="사유를 입력하세요. 고객이 싫다고 했어요."
              />
            </li>
            <li className="w">
              소명사유 불가
              <Textarea
                countLimit={500}
                type="tp1"
                onChange={textareaChange}
                onBlur={textareaBlur}
                onFocus={textareaFocus}
                disabled={true}
                height={128}
                placeHolder="관리자가 입력한 사항이 노출되는 영역"
              />
            </li>
          </ul>
          <Buttons align="center" marginTop={48}>
            <Button
              size="big"
              background="blue80"
              title="확인"
              width={245}
              onClick={(e) => {
                e.preventDefault();
                if (hasMobile) return closedHandler(e);
                closedHandler(false);
              }}
            />
          </Buttons>
        </fieldset>
      </form>
    </div>
  );
};

export default DealNofityPop4;
