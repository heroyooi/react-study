
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import Textarea from '@lib/share/items/Textarea';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { mScreenReview } from '@src/dummy';

const GeneralSell_s04Review = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '딜러 거래후기',
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

    // Textarea
    const textareaChange = (e) => {
      console.log('textareaChange');
      console.log(e);
    }
    const textareaBlur = (e) => {
      console.log('textareaBlur');
      console.log(e);
    }
    const textareaFocus = (e) => {
      console.log('textareaFocus');
      console.log(e);
    }

    return (
      <AppLayout>
        <div className="general-sell-sec review">
          <ul className="date">
            <li>2019.09.16</li>
            <li className="product">결제완료</li>
          </ul>
          <h3 className="tit2">강원도 춘천에서 그랜저 IG 매입한 후기</h3>
          <div className="steps-frame slide-steps-wrap">
            <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={mScreenReview} dots={true}>
              <div className="steps-slide"></div>
              <div className="steps-slide"></div>
              <div className="steps-slide"></div>
              <div className="steps-slide"></div>
            </SlideBanner>
          </div>
          <Textarea countLimit={200} type="tp1" height={133} placeHolder="내용" disabledEnter={true} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
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

export default GeneralSell_s04Review;