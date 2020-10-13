import { useSelector } from 'react-redux';
import FrameLayout from '@src/components/layouts/FrameLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

const AuthFail = ({}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  
  if(hasMobile){
    return (
      <FrameLayout>
        <div className="error-area auth">
          <p>해당 페이지에 접근 권한이 없습니다.<br />불편을 드려 죄송합니다.</p>
          <span>요청하신 페이지에 대해 접근 권한을<br />가지고 있지 않습니다.<br />접근 권한이 있는 계정으로 로그인 후<br />사용하시기 바랍니다.</span>
          <Buttons align="center" marginTop={32}>
            <Button size="sml" background="blue80" radius={true} title="메인페이지로 이동" width={140} href="/main" nextLink={true} />
          </Buttons>
        </div>
      </FrameLayout>
    );
  };

  return (
    <FrameLayout>
      <div className="error-area auth">
        <p>해당 페이지에 접근 권한이 없습니다.<br />불편을 드려 죄송합니다.</p>
        <span>요청하신 페이지에 대해 접근 권한을 가지고 있지 않습니다.<br />접근 권한이 있는 계정으로 로그인 후 사용하시기 바랍니다.</span>
        <Button size="big" background="blue80" title="메인페이지로 이동" width={184} marginTop={88} href="/main" nextLink={true} />
      </div>
    </FrameLayout>
  );
};

export default AuthFail;