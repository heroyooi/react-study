
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import Radio from '@lib/share/items/Radio';
import Input from '@lib/share/items/Input';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const GeneralSell_n06Check = () => {
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
        bottom: 24,
        color: '#fff'
      }
    });
    // 견적산정 사유확인 bottom
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);
    const handleOpenReason = useCallback((e) => {
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
              <li>
                2차 견적<p className="price-tp7">2,100<span className="won">만원</span></p>
                <Button size="mid" line="gray" color="gray" radius={true} title="견적 산정 사유 확인" width={97} height={24} fontSize={10} fontWeight={500} marginTop={8} onClick={handleOpenReason} />
              </li>
            </ul>
            <p className="tx-exp-tp3 tx-red80">* 차량 탁송 후 2차 견적 진행 시,1차 견적 금액과 차이가 발생할 수 있습니다.</p>
          </div>

          <div className="list-none-wrap tp3">
            <p className="list-none">견적 산정 기준 안내 텍스트</p>
          </div>
        </div>
        <Buttons className="pdside20">
          <Button size="full" background="blue20" color="blue80" radius={true} title="취소 처리 중" />
        </Buttons>

        <div className={dimm ? "modal-bg active" : "modal-bg"} onClick={handleCloseDimm}></div>
        <MobBottomArea active={active} isFixButton={true}>
          <div className="inner">
            <p className="tit1 mb24">견적 산정 사유 확인</p>
            <p className="tx-tit">사유</p>
            <Input placeHolder="사고이력" id="car-num" height={38} disabled={true} />

            <p className="tx-tit mb16 mt24">기타사유</p>
            <Textarea countLimit={200} type="tp1" height={144} placeHolder="사고이력이 너무 많아서 150만원 감가처리 합니다." disabled={true} />
            <div className="mypage-admin-title mt8">
              <p className="tx-exp-tp5">&#8251; 관리자 확인 후 반송 탁송비 처리를 위한 가상계좌 발급이 진행됩니다.</p>
              <p className="tx-exp-tp5">&#8251; 반송 탁송비 입금이후 차량 반출이 완료됩니다.</p>
            </div>
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

export default GeneralSell_n06Check;