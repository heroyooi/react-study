import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { select1_list} from '@src/dummy';

const searchBid = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);
  
  //닫기, 더보기
  const [isActive, setIsActive] = useState(false);
  const handleActive = useCallback((e) => {
    e.preventDefault();
    setIsActive(prevActive => !prevActive)
  }, [isActive]);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '경매 낙찰가 조회',
        options: ['back', 'close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        color: '#fff'
      }
    });

    return (
      <AppLayout>
        <div className="mt20 bg-gray20">
          <div className="content-wrap search-wrap bid mb10">
            <ul>
              <li className="bridge2">
                <MobSelectBox placeHolder="제조사"  id="car-manufacturer" options={select1_list} width='31.6%'/>
                <MobSelectBox placeHolder="모델" id="car-model" options={select1_list} width='31.6%'/>
                <MobSelectBox placeHolder="세부모델" id="car-model-detail" options={select1_list} width='31.6%'/>
              </li>
              <li className="bridge2">
                <MobSelectBox placeHolder="미션"  id="car-mission" options={select1_list} width='31.6%'/>
                <MobSelectBox placeHolder="연식" id="car-year" options={select1_list} width='31.6%'/>
                <MobSelectBox placeHolder="연료" id="car-fuel" options={select1_list} width='31.6%'/>
              </li>
            </ul>
            <Buttons align="center" marginTop={16}>
              <Button size="full" background="blue80"  radius={true} title="검색하기" href=""/>
            </Buttons>
          </div>

          {!withoutList && (
            <div className="content-wrap search-wrap bid pt16">
              <p className="tx-exp-tp3 tit tx-gray">※ 주행거리(년): 상(2만 이하), 중(2만~3만), 하(3만 이상)</p>
              <ul className="exhibit-list line">
                <li>
                  <h4 className="subject">제네시스(DH) G330 Premium</h4>
                  <div className="info mt8">
                    <span>2016</span>
                    <span>A/T</span>
                    <span>가솔린</span>
                    <span>3342cc</span>
                    <span>YB6)오닉스블랙</span>
                  </div>
                  <div className="info2 mt8">
                    <span>용도 : <em className="tx-blue80">리스</em></span>
                    <span>거리 : <em className="tx-blue80">상</em></span>
                    <span>평가 : <em className="tx-blue80">A6</em></span>
                  </div>
                  <div className="price-wrap mt16">
                    <div className="price-left fl">
                      <p className="price-tp1">경매일 : 2019.07</p>
                    </div>
                    <div className="price-right fr">
                      <p className="price-tit">낙찰가</p>
                      <p className="price-tp2">1,050<span className="won">만원</span></p>
                    </div>
                  </div>
                </li>
                <li>
                  <h4 className="subject">제네시스(DH) G330 Premium</h4>
                  <div className="info mt8">
                    <span>2016</span>
                    <span>A/T</span>
                    <span>가솔린</span>
                    <span>3342cc</span>
                    <span>YB6)오닉스블랙</span>
                  </div>
                  <div className="info2 mt8">
                    <span>용도 : <em className="tx-blue80">리스</em></span>
                    <span>거리 : <em className="tx-blue80">상</em></span>
                    <span>평가 : <em className="tx-blue80">A6</em></span>
                  </div>
                  <div className="price-wrap mt16">
                    <div className="price-left fl">
                      <p className="price-tp1">경매일 : 2019.07</p>
                    </div>
                    <div className="price-right fr">
                      <p className="price-tit">낙찰가</p>
                      <p className="price-tp2">1,050<span className="won">만원</span></p>
                    </div>
                  </div>
                </li>
                {
                  isActive && (
                    <>
                      <li>
                        <h4 className="subject">제네시스(DH) G330 Premium</h4>
                        <div className="info mt8">
                          <span>2016</span>
                          <span>A/T</span>
                          <span>가솔린</span>
                          <span>3342cc</span>
                          <span>YB6)오닉스블랙</span>
                        </div>
                        <div className="info2 mt8">
                          <span>용도 : <em className="tx-blue80">리스</em></span>
                          <span>거리 : <em className="tx-blue80">상</em></span>
                          <span>평가 : <em className="tx-blue80">A6</em></span>
                        </div>
                        <div className="price-wrap mt16">
                          <div className="price-left fl">
                            <p className="price-tp1">경매일 : 2019.07</p>
                          </div>
                          <div className="price-right fr">
                            <p className="price-tit">낙찰가</p>
                            <p className="price-tp2">1,050<span className="won">만원</span></p>
                          </div>
                        </div>
                      </li>
                    </>
                  )
                }

              </ul>
              <Button size="full" line="gray" radius={true} title={isActive ? "닫기" : "더보기"} height={38} fontSize={14} marginTop={8} iconType={isActive ? "arrow-top-gray" : "arrow-bottom-gray"} onClick={handleActive} />
            </div>
          )}

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

export default withRouter(searchBid);