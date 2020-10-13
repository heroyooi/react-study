import { useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';

import FrameLayout from '@src/components/layouts/FrameLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

const Error = ({ router = {} }) => {
  const {
    query: { code, message, subMessage }
  } = router;
  console.log('Error -> message', message);
  console.log('Error -> code', code);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    return (
      <FrameLayout>
        <div className="error-area">
          <p>이용에 불편을 드려 죄송합니다.</p>
          <span>
            일시적인 서버접속 오류일 수
            <br />
            있으므로 잠시 후 다시
            <br />
            접속 바랍니다.
          </span>
          <Buttons align="center" marginTop={32}>
            <Button size="sml" background="blue80" radius={true} title="메인페이지로 이동" width={140} href="/main" nextLink={true} />
          </Buttons>
        </div>
      </FrameLayout>
    );
  }

  return (
    <FrameLayout>
      <div className="error-area">
        {message ? <p dangerouslySetInnerHTML={{ __html: message }}></p> : <p>이용에 불편을 드려 죄송합니다.</p>}
        {subMessage ? (
          <span dangerouslySetInnerHTML={{ __html: subMessage }}></span>
        ) : (
          <span>
            일시적인 서버접속 오류일 수
            <br />
            있으므로 잠시 후 다시
            <br />
            접속 바랍니다.
          </span>
        )}
        <Button size="big" background="blue80" title="메인페이지로 이동" width={184} marginTop={88} href="/main" nextLink={true} />
      </div>
    </FrameLayout>
  );
};

export default withRouter(Error);
