import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const CertifyMallInquire = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '인증몰 입점문의',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 88,
        color: '#fff'
      }
    });
    // 버튼식 라디오
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    // 팝업
    const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
    const closeMPop = useCallback(
      (e) => {
        e.preventDefault();
        setMPop(false);
      },
      [setMPop]
    );

    return (
      <AppLayout>
        <div className="live-tit">
          <p>
            인증몰 입점에 관하여 궁금한 사항을 보내주시면<br />
            담당자 확인 후 보다 자세한 상담을 드릴 수 있도록<br />
            하겠습니다.
            </p>
        </div>
        <div className="content-wrap inquire-wrap">
          <form>
            <fieldset>
              <legend className="away">인증몰 입점문의</legend>
              <table summary="인증몰 입점문의에 대한 내용" className="table-tp2">
                <caption className="away">인증몰 입점문의</caption>
                <colgroup>
                  <col width="34%" />
                  <col width="76%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>구분</th>
                    <td>
                      <ul className="radio-block small">
                        <li><Radio className="txt" id="make1" label="수입인증" value={1} checked={isValue1} onChange={handleChange1} /></li>
                        <li><Radio className="txt" id="make2" label="금융사인증" value={2} checked={isValue1} onChange={handleChange1} /></li>
                        <li><Radio className="txt" id="make3" label="프랜차이즈" value={3} checked={isValue1} onChange={handleChange1} /></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>회사명</th>
                    <td><Input type="text" id="agency-name" /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="user-name">담당자 성함</label></th>
                    <td><Input type="text" id="user-name" /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="user-phone">전화번호</label></th>
                    <td><Input type="text" id="user-phone" /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="email">이메일 주소</label></th>
                    <td><Input type="text" id="email" /></td>
                  </tr>
                  <tr>
                    <th>문의내용</th>
                    <td><Textarea countLimit={200} type="tp1" height={176} /></td>
                  </tr>
                </tbody>
              </table>
              <p className="tx-sub">
                메일이 아닌 담당자 직통 전화로도 바로 문의 가능합니다.<br />
                담당자 전화문의 : 02-1234-1234
              </p>
            </fieldset>
          </form>
          <Button className="fixed" size="full" background="blue80" title="문의하기" onClick={(e) => openMPop(e, 'fade')} />
        </div>

        <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1">인증몰 입점 문의가 접수되었습니다.</p>
            <p>빠른 시일안에 담당자가 연락드리겠습니다.</p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight={500} href="/buy/certifyMall" />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default CertifyMallInquire;
