
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItem from '@src/components/common/banner/BannerItem';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Textarea from '@lib/share/items/Textarea';
import StarScore from '@lib/share/items/StarScore';
import Radio from '@lib/share/items/Radio';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { mCarList } from '@src/dummy';

const GeneralSell_s05Review = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '이용후기 작성',
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

    //별점
    const [grade, setGrade] = useState([0, 0, 0])
    const gradeChange = (e, idx, value) => {
      console.log(idx, value)
      let temp = [...grade];
      temp[idx] = value;

      setGrade(temp);
    }

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
          <h3 className="tit2 mb16">김현대 딜러님과의 거래는 어떠셨나요?</h3>
          <ul className="goods-list list-type">
            {mCarList.map((v, i) => {
              if (i < 1) {
                return (
                  <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} infos={v.infos} />
                )
              }
            })}
          </ul>

          <ul className="m-toggle-list up-blue fs16">
            <MenuItem>
              <MenuTitle>입찰 결과 조회</MenuTitle>
              <MenuCont>
                <div className="bidding-inquiry">
                  <ul>
                    <li>입찰자수<p className="price-tp7">6<span className="won">명</span></p></li>
                    <li>
                      입찰 최고가<p className="price-tp7">2,100<span className="won">만원</span></p>
                    </li>
                  </ul>
                  <div className="dealer-wrap">
                    <div className="img-cover">
                      <img src="/images/mobile/ico/ico-dealer-none.svg" alt="프로필 없음 이미지" />
                    </div>
                    <ul className="tx-wrap">
                      <li className="dealer">김현대 딜러</li>
                      <li className="num">010-1234-1234</li>
                      <li>서울 강서구 서부 자동차 매매단지</li>
                      <li>주식회사 오토오토</li>
                    </ul>
                    <Button size="mid" background="blue20" color="blue80" radius={true} title="전화하기" width={53} height={24} fontSize={10} fontWeight={500} href="tel:01012341234" />
                  </div>
                </div>
              </MenuCont>
            </MenuItem>
          </ul>
          <div className="review-input-wrap">
            <ul>
              <li>최종 판매 금액에 만족하시나요?<span><StarScore type="click" grade={grade[0]} idx={0} gradeChange={gradeChange} /></span></li>
              <li>구매 딜러의 서비스에 만족하시나요?<span><StarScore type="click" grade={grade[1]} idx={1} gradeChange={gradeChange} /></span></li>
              <li>주변분들에게 구매 딜러를 추천 의향은 어느 정도 되시나요?<span><StarScore type="click" grade={grade[2]} idx={2} gradeChange={gradeChange} /></span></li>
              <li>
                이용후기를 간단하게 한 줄로 남겨주세요.
                <Textarea countLimit={30} type="tp1" height={50} placeHolder="입력해주세요." disabledEnter={true} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
              </li>
            </ul>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="등록" />
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default GeneralSell_s05Review;