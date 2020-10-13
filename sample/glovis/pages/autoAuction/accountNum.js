import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';


const accountNum = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  
  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '최신계좌번호',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap ">
          <table summary="최근 계좌번호 제목" className="table-tp1 th-c td-c mt20">
            <caption className="away">최근 계좌번호 제목</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr>
                <th>예금주</th>
                <th>은행명</th>
                <th>계좌번호</th>
              </tr>
              <tr>
                <td>김현대</td>
                <td>국민</td>
                <td>010101-02-334455667</td>
              </tr>
              <tr>
                <td>나현대</td>
                <td>산업</td>
                <td>010101-02-334455667</td>
              </tr>
              <tr>
                <td>박현대</td>
                <td>우리</td>
                <td>010101-02-334455667</td>
              </tr>
              <tr>
                <td>이현대</td>
                <td>하나</td>
                <td>010101-02-334455667</td>
              </tr>
              <tr>
                <td>차현대</td>
                <td>국민</td>
                <td>010101-02-334455667</td>
              </tr>
              <tr>
                <td>김현대</td>
                <td>국민</td>
                <td>010101-02-334455667</td>
              </tr>
              <tr>
                <td>김현대</td>
                <td>국민</td>
                <td>010101-02-334455667</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default accountNum;