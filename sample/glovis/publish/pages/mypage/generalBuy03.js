import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import uuid from "uuid";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobCounsel from '@src/components/common/MobCounsel';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';
import { MsgInquiryList } from '@src/dummy';
import MypageChat from '@src/components/common/popup/MypageChat';
/*
  html 변경이력
  03.12 : 시분 노출 #a1
*/
const generalBuy03 = ({router}) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const [popupShow, setPopupShow, popupOpenHandler, popupCloseHandler] = useRodal(false);
  const { result } = router.query;
  const [withoutList, setWithoutList] = useState(result === "no" ? true : false);

  // 목록 더보기
  const [listData, setListData] = useState(MsgInquiryList);
  const createDummy = (num) => {
    const dummyArr = [];
    for (let i = 0; i < num; i++) {
      dummyArr.push({
        id: uuid.v4(),
        date: '2019-09-19',
        imgSrc: "/images/dummy/product-img-06.png",
        imgAlt: "차량 이미지",
        subject: "현대 투싼 ix 디젤 2WD LX20 럭셔리",
        sellerName: "박현대",
        sellerMobile: "010-3333-7777",
        inquiryContent: '가격할인이 되나요?',
        replyState: '답변완료'
      });
    }
    return dummyArr;
  }
  const handleListMore = useCallback((e) => {
    e.preventDefault();
    const dummyData = createDummy(5);
    setListData(listData => [...listData, ...dummyData]);
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '쪽지상담 내역',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });

    const [fpCounsel, setFpCounsel] = useState(false);
    const handleFullpagePopup = useCallback((name) => (e) => {
      e.preventDefault();
      if (name === "counsel") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '상담내역 조회',
            options: ['close']
          }
        });
        setFpCounsel(true)
      }
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, [fpCounsel]);
    return (
      <AppLayout>
        <div className="general-buy-sec">
          <div className="mypage-admin-title pd20">
            <p className="tx-exp-tp5">&#8251; 최근 1개월 이내  쪽지상담하신 내역입니다.</p>
            <p className="tx-exp-tp5">&#8251; 쪽지 상담을 하신 정보는 1개월까지 조회하실 수 있으며, 1개월이 지나면 삭제됩니다.</p>
          </div>
          <div className="list-wrap">
            {
              withoutList === true
                ? (
                  <div className="list-none-wrap tp2">
                    <div className="list-none">
                      <p>최근 쪽지상담 하신 내역이 없습니다.</p>
                      <Buttons align="center" marginTop={16}>
                        <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={100} height={40} href="/buy/list" />
                      </Buttons>
                    </div>
                  </div>
                ) : (
                  <div className="content-wrap">
                    <div className="goods-list admin-list tp3">
                      <ul>
                        <li>
                          <div className="img-cover">
                            <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                          </div>
                          <div className="summary">
                            <ul className="date">
                              <li>2019.09.16</li>
                            </ul>
                            <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                            <div className="info-wrap">
                              <p className="name">장현대 (현대오토오토)</p>
                              <Button size="sml" background="blue20" color="blue80" radius={true} title="답변완료" width={53} height={24} fontSize={10} fontWeight={500} marginTop={8} onClick={handleFullpagePopup("counsel")} />
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="img-cover">
                            <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                          </div>
                          <div className="summary">
                            <ul className="date">
                              <li>2019.09.16</li>
                            </ul>
                            <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리</h5>
                            <div className="info-wrap">
                              <p className="name">장현대 (현대오토오토)</p>
                              <Button size="sml" line="gray" color="gray" radius={true} title="답변대기" width={53} height={24} fontSize={10} fontWeight={500} marginTop={8} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
            }
          </div>
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={100}>
          {fpCounsel && <MobCounsel />}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-buy-sec">
          <div className="mypage-admin-title">
            <h3>쪽지상담 내역</h3>
            <p className="tx-exp-tp5">&#8251; 최근 1달 이내 쪽지상담하신 내역입니다.</p>
            <p className="tx-exp-tp5">&#8251; 쪽지 상담을 하신 정보는 1달까지 조회하실 수 있으며, 1달이 지나면 삭제됩니다.</p>
          </div>

          <div className="list-wrap">
            <div className="admin-list tp7 note">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="14%" />
                    <col width="30%" />
                    <col width="18%" />
                    <col width="24%" />
                    <col width="14%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>최종상담일자</th>
                      <th>상담진행차량</th>
                      <th>판매자</th>
                      <th>최초상담내용</th>
                      <th>답변여부</th>
                    </tr>
                  </thead>
                  {
                    withoutList === false
                      ? (
                        <tbody>
                          {listData.map(v => {
                            return (
                              <tr key={v.id}>
                                <td>{v.date[0]}<br />{v.date[1]}</td> {/* #a1 */}
                                <td>
                                  <ImgCover src={v.imgSrc} alt={v.imgAlt} />
                                  <div className="summary">
                                    <h4 className="subject">{v.subject}</h4>
                                  </div>
                                </td>
                                <td className="seller">{v.sellerName}<br />{v.sellerMobile}</td>
                                <td>{v.inquiryContent}</td>
                                <td>
                                  {
                                    v.replyState === "답변대기"
                                      ? <span className="tx-blue80">{v.replyState}</span>
                                      : <span>{v.replyState}</span>
                                  }<br />
                                  <Button size="mid" line="gray" color="black" radius={true} title="내용보기" width={100} height={32} marginTop={8} onClick={e => popupOpenHandler(e, "slideUp")} />
                                </td>
                              </tr>
                            )
                          })}
                          <tr className="more">
                            <td colSpan="6" className="more">
                              <div className="cate-list-btn2">
                                <button onClick={handleListMore}>더보기</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          <tr className="list-none">
                            <td colSpan="6">
                              최근 쪽지상담 하신 내역이 없습니다.<br />
                              <Button size="big" background="blue80" title="차량검색 하러 가기" width={245} height={60} marginTop={16} href="/buy/list" />
                            </td>
                          </tr>
                        </tbody>
                      )
                  }
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={popupShow} type={'slideUp'} closedHandler={popupCloseHandler} mode="normal" width={400} >
        <MypageChat onClose={() => setPopupShow(false)} />
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(generalBuy03);