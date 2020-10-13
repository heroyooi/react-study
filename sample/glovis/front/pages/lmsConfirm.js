import { useState } from 'react';
import { useSelector } from 'react-redux';
import FrameLayout from '@src/components/layouts/FrameLayout';
import Button from '@lib/share/items/Button';

const LmsConfirm = ({}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [beforeConfirm, setBeforeConfirm] = useState(false)
  const [confirm, setConfirm] = useState(false)
  if(hasMobile){
    return (
      <FrameLayout>
        <div className="lmsconfirm-area">
          {!beforeConfirm ?
          <>
            <p>접수자와 신차구매자 일치 여부<br />확인을 위해 아래 '본인인증 요청' 버튼을 눌러<br />본인 인증을 진행해주세요.</p>
            <span>본인인증 완료 시, 차량 매각 대금은 고객님의<br />신차 구매 가상계좌로 입금됩니다.</span>
          </>
          :
          <>
            {confirm?
            <p>본인 인증이 완료되었습니다.<br />이용해주셔서 감사합니다</p>
            :
            <p>본인 인증이 실패하였습니다.<br />재인증해 주시기 바랍니다</p>
            }
          </>
          }
        </div>
        {!confirm &&
          <Button className="fixed" size="full" background="blue80" title="본인인증 요청" />
        }
      </FrameLayout>
    );
  };

  return (
    <FrameLayout>
      <div className="lmsconfirm-area">
        <p>Mobile에서만 이용가능합니다. Mobile로 접속해주세요</p>
      </div>
    </FrameLayout>
  );
};

export default LmsConfirm;