import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobLiveRefund from '@src/components/common/MobLiveRefund';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import PageNavigator from '@src/components/common/PageNavigator';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Link from 'next/link';
import { select1_list } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';

const adRegistration = ({ router }) => {

   const dispatch = useDispatch();
   dispatch({ type: SECTION_MYPAGE });
   const hasMobile = useSelector((state) => state.common.hasMobile);
  // const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  // const [refundPopupShow, setRefundPopupShow, openRefundPopup, closeRefundPopup] = useRodal(false, true);
  // const [studioReservePopupShow, setStudioReservePopupShow, openStudioReservePopup, closeStudioReservePopup] = useRodal(false, true);
  // const [cancelPop, setCancelPopShow, openCancelPop, closeCancelPop] = useRodal(false, true);

  // const [liveStudioStep, setLiveStudioStep] = useState(1);
  // const handleStep = useCallback((num, kind) => (e) => {
  //   e.preventDefault();
  //   kind === "studio" ? setLiveStudioStep(num) : setLiveShotStep(num);
  // }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '광고 등록 현황',
        options: ['back', 'close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    const now = moment();

    return (
      <AppLayout>    
        <div className="content-wrap pt14 pb76">
          <div className="present-area">
            <div className="info-left">
              <p className="waterman-area"><span>단체</span>현대 오토오토</p>
              <p className="count-area">대표계정</p>
            </div>
            <div className="info-right">
              <em><span>20</span> 대</em>
              <span>등록중</span>
            </div>
          </div>    

          <div className="goods-list admin-list adReg-area tp4 mt20">
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
                          <span>오토</span>
                          <span>디젤</span>
                        </div>
                        <div className="price-wrap">
                          <div className="price-left">
                            <p className="price-tp2">7,760<span className="won">만원</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                 </span>

                 <table summary="광고등록현황에 대한 내용" className="table-tp1 adR-tb">
                  <caption className="away">담당 평가사</caption>
                  <colgroup>
                    <col width="25%" />
                    <col width="75%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>등록일</th>
                      <td>2019.08.01 <span>(최종수정일 : 2019.09.01)</span></td>
                    </tr>
                    <tr>
                      <th>담당자정보</th>
                      <td>
                        현대 오토오토 <span>(02-1234-5678)</span>
                        <Button size="sml" line="blue80" color="blue80" radius={true} title="연락처 변경" width={65} height={24} fontSize={10} fontWeight={500} />
                      </td>
                    </tr>
                  </tbody>
                </table> 
               </li>
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
                          <span>오토</span>
                          <span>디젤</span>
                        </div>
                        <div className="price-wrap">
                          <div className="price-left">
                            <p className="price-tp2">7,760<span className="won">만원</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                 </span>

                 <table summary="광고등록현황에 대한 내용" className="table-tp1 adR-tb">
                  <caption className="away">담당 평가사</caption>
                  <colgroup>
                    <col width="25%" />
                    <col width="75%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>등록일</th>
                      <td>2019.08.01 <span>(최종수정일 : 2019.09.01)</span></td>
                    </tr>
                    <tr>
                      <th>담당자정보</th>
                      <td>
                        현대 오토오토 <span>(02-1234-5678)</span>
                        <Button size="sml" line="blue80" color="blue80" radius={true} title="연락처 변경" width={65} height={24} fontSize={10} fontWeight={500} />
                      </td>
                    </tr>
                  </tbody>
                </table> 
               </li>
             </ul> 
          </div>

        </div>
      </AppLayout >
    )
  }
  return (
    <AppLayout>
      모바일에서만 존재하는 페이지 입니다.
    </AppLayout >
  )
}

export default adRegistration;