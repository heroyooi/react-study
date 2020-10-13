
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const GeneralSell_n04Check = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '견적확인',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    });

    // 판매취소 bottom
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);
    const handleOpenPop = useCallback((e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      document.getElementsByTagName('html')[0].style.overflow = "hidden";
    }, []);
    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      document.getElementsByTagName('html')[0].style.overflow = "auto";
    }, []);

    // 판매취소 라디오
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    return (
      <AppLayout>
        <div className="general-sell-sec check">
          <ul className="admin-list-wrap">
            <li>
              <div className="goods-list admin-list tp4">
                <ul>
                  <li>
                    <span>
                      <div className="img-cover">
                        <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                      </div>
                      <div className="summary">
                        <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                        <div className="info-wrap">
                          <div className="info">
                            <span>00가 0000</span>
                            <span>09/12식 (10년형)</span>
                            <span>84,761km</span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <div className="bidding-inquiry content-border">
            <ul>
              <li>1차 견적<p className="price-tp7">2,200<span className="won">만원</span></p></li>
              <li>2차 견적<p className="price-tp7">-<span className="won">만원</span></p></li>
            </ul>
            <p className="tx-exp-tp3 tx-red80">* 차량 탁송 후 2차 견적 진행 시,1차 견적 금액과 차이가 발생할 수 있습니다.</p>
          </div>

          <div className="list-none-wrap tp2">
            <p className="list-none">견적 산정 기준 안내 텍스트</p>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="탁송정보" onClick={handleOpenPop} />

        <div className={dimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm}></div>
        <MobBottomArea active={active} isFixButton={true}>
          <div className="inner">
            <p className="tit1 mb20">탁속정보</p>
            <table summary="탁송 정보에 대한 내용" className="table-tp1">
              <caption className="away">탁송 정보</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>시간(탁송일시)</th>
                  <td>2019.08.14  16:42</td>
                </tr>
                <tr>
                  <th>지역</th>
                  <td>서울권</td>
                </tr>
                <tr>
                  <th>탁송기사</th>
                  <td>김현대</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>010-1234-1234</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button className="fixed" size="full" background="blue80" title="확인" />
        </MobBottomArea>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default GeneralSell_n04Check;