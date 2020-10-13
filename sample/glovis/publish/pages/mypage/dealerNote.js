import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import uuid from "uuid";
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import MypageChat from '@src/components/common/popup/MypageChat';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobCounsel from '@src/components/common/MobCounsel';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';
import { MsgInquiryList } from '@src/dummy';
/*
  html 변경이력
  03.12 : 시분 노출 #a1
        : 1달 -> 1개월 텍스트 변경
*/
const DealerNote = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

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
  const handleClosePopup = useCallback((e) => {
    e.preventDefault();
    setPopupShow(false);
  }, [popupShow]);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '쪽지 상담 내역',
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
        <div className="content-wrap pt20">
          <div className="mypage-admin-title">
            <p className="tx-exp-tp5">&#8251; 최근 1개월 이내 쪽지 상담하신 내역입니다.</p>
            <p className="tx-exp-tp5">&#8251; 쪽지 상담을 하신 정보는 1개월까지 조회하실 수 있으며, 1개월이 지나면 삭제됩니다.</p>
          </div>
          {
            withoutList === true
              ? (
                <div className="list-none-wrap">
                  <div className="list-none">
                    <p>최근 조회하신 차량이 없습니다.</p>
                    <Buttons align="center" marginTop={16}>
                      <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={84} height={40} href="/buy/list" />
                    </Buttons>
                  </div>
                </div>
              ) : (
                <ul className="admin-list-wrap mt8">
                  <li onClick={handleFullpagePopup("counsel")} >
                    <div className="mb8">
                      <ul className="date">
                        <li>2019.09.16</li>
                        <li className="sec">답변완료</li>
                      </ul>
                    </div>
                    <div className="goods-list admin-list tp4 note">
                      <ul>
                        <li>
                          <span>
                            <div className="img-cover">
                              <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h5 className="subject">제네시스 G80 3.3. GDI AWD</h5>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="mb8">
                      <ul className="date">
                        <li>2019.09.16</li>
                        <li className="sec tx-red80">답변대기</li>
                      </ul>
                    </div>
                    <div className="goods-list admin-list tp4 note">
                      <ul>
                        <li>
                          <span>
                            <div className="img-cover">
                              <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리 초럭셔리 스페셜</h5>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="mb8">
                      <ul className="date">
                        <li>2019.09.16</li>
                        <li className="sec tx-red80">답변대기</li>
                      </ul>
                    </div>
                    <div className="goods-list admin-list tp4 note">
                      <ul>
                        <li>
                          <span>
                            <div className="img-cover">
                              <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h5 className="subject">제네시스 G80 3.3. GDI AWD 프리미엄 럭셔리3.3. GDI AWD 프리미엄 럭셔리3.3. GDI AWD 프리미엄 럭셔리</h5>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              )
          }
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
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-sec">
          <div className="mypage-admin-title">
            <h3>쪽지상담 내역</h3>
            <p className="tx-exp-tp5">&#8251; 최근 1개월 이내 쪽지상담하신 내역입니다.</p>
            <p className="tx-exp-tp5">&#8251; 쪽지 상담을 하신 정보는 1개월까지 조회하실 수 있으며, 1개월이 지나면 삭제됩니다.</p>
          </div>

          <div className="list-wrap">
            <div className="admin-list tp7 note">
              <div className="content-top">
                <p className="inquire-num mb16">총 19건</p>
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="14%" />
                    <col width="30%" />
                    <col width="42%" />
                    <col width="14%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>최종상담일시</th>
                      <th>상담진행차량</th>
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
                                <td className="tx-l">{v.inquiryContent}</td>
                                <td>
                                  {
                                    v.replyState === "답변대기"
                                      ? <span className="tx-blue80">{v.replyState}</span>
                                      : <span>{v.replyState}</span>
                                  }
                                  <br />
                                  <Button size="mid" line="gray" color="black" radius={true} title="내용보기" width={100} height={32} marginTop={8} onClick={e => popupOpenHandler(e, "slideUp")} />
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr className="list-none">
                            <td colSpan="4">최근 쪽지상담 하신 내역이 없습니다.</td>
                          </tr>
                        </tbody>
                      )
                  }
                </table>
                {withoutList === false && <PageNavigator recordCount={50} className="mt32" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={popupShow} type={'slideUp'} closedHandler={popupCloseHandler} mode="normal" width={400} >
        <MypageChat onClose={handleClosePopup} />
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(DealerNote);