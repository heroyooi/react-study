import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getLiveAssignDetail } from '@src/actions/mypage/dealer/liveStudioAssignAction';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import KakaoMap from '@src/components/common/KakaoMap';

/**
 * @module LiveAssignView
 * @desc LiveStudio배정리스트 보기 팝업
 * @author D200066
 * @param  {Boolean} props.livePopupShow - RodalPopup의 활성화 여부
 * @param  {Function} props.setLivePopupShow - 버튼으로 RodalPopup 닫는 콜백함수
 * @param  {Function} props.closeLivePopup - RodalPopup의 closedHandler prop 에 적용되어 RodalPopup 닫는 콜백함수
 * @param  {Object} props.LiveInfo - { rptCarNo: 차량번호, rptCarNm: 차량정보 풀네임(제조사 모델명 등등) }
 */
const LiveAssignView = ({ livePopupShow, setLivePopupShow, closeLivePopup, liveInfo }) => {
  const dispatch = useDispatch();
  const pageData = {
    redId: liveInfo.redId,
    dlrPrdId: liveInfo.dlrPrdId
  };
  const { liveAssignData } = useSelector((state) => state.liveAssign);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch(getLiveAssignDetail(pageData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <div className="content-wrap pt24">
        <table summary="차량 기본정보에 대한 내용" className="table-tp1">
          <caption>차량 기본정보</caption>
          <colgroup>
            <col width="32%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>차량번호</th>
              <td>{liveAssignData?.crNo}</td>
            </tr>
            <tr>
              <th>차량명</th>
              <td>{liveAssignData?.crNm}</td>
            </tr>
            <tr>
              <th>최초등록일</th>
              <td>{liveAssignData?.crNm}</td>
            </tr>
            <tr>
              <th>색상</th>
              <td>{liveAssignData?.crNm}</td>
            </tr>
            <tr>
              <th>배기량</th>
              <td>{liveAssignData?.crNm}cc</td>
            </tr>
            <tr>
              <th>용도</th>
              <td>{liveAssignData?.crNm}</td>
            </tr>
            <tr>
              <th>형식년도</th>
              <td>{liveAssignData?.crNm}</td>
            </tr>
            <tr>
              <th>연료</th>
              <td>{liveAssignData?.crNm}</td>
            </tr>
            <tr>
              <th>차종</th>
              <td>{liveAssignData?.crNm}</td>
            </tr>
            <tr>
              <th>출고가격</th>
              <td>{liveAssignData?.crNm}원</td>
            </tr>
          </tbody>
        </table>

        <div className="float-wrap btn-s mb10 mt48">
          <h3 className="tit2">신청자 정보</h3>
          <Button size="sml" background="blue20" color="blue80" radius={true} title="전화하기" width={61} fontWeight={500} href="tel:01012341234" />
        </div>
        <table summary="신청자 기본정보에 대한 내용" className="table-tp1">
          <caption className="away">신청자 기본정보</caption>
          <colgroup>
            <col width="32%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>신청인</th>
              <td>{liveAssignData?.mbNm}</td>
            </tr>
            <tr>
              <th>방문일시</th>
              <td>2019.10.30 14:00</td>
            </tr>
            <tr>
              <th>방문장소</th>
              <td>
                {liveInfo.LiveAddr}
                <div className="map-wrap mt8">
                  <KakaoMap style={{ width: '100%', height: '106', frameBorder: '0' }} addr={liveInfo.LiveAddr} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <RodalPopup show={livePopupShow} type={'fade'} closedHandler={closeLivePopup} mode="normal" title="방문정보" size="large">
      <div className="con-wrap popup-visit">
        <table summary="차량 기본정보에 대한 내용" className="table-tp1">
          <caption>차량 기본정보</caption>
          <colgroup>
            <col width="20%" />
            <col width="30%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>
          <tbody>
            <tr>
              <th>차량번호</th>
              <td colSpan="3">03라4567</td>
            </tr>
            <tr>
              <th>차량명</th>
              <td colSpan="3">제네시스 G80 3.3 GDI AWD 프리미엄 럭셔리</td>
            </tr>
            <tr>
              <th>최초등록일</th>
              <td>2017-05-07</td>
              <th>형식년도</th>
              <td>2018</td>
            </tr>
            <tr>
              <th>색상</th>
              <td>검정</td>
              <th>연료</th>
              <td>가솔린</td>
            </tr>
            <tr>
              <th>배기량</th>
              <td>1,591cc</td>
              <th>차종</th>
              <td>준중형차</td>
            </tr>
            <tr>
              <th>용도</th>
              <td>일반</td>
              <th>출고가격</th>
              <td>50,700,000원</td>
            </tr>
          </tbody>
        </table>

        <table summary="신청자 정보에 대한 내용" className="table-tp1 mt64">
          <caption>신청자 정보</caption>
          <colgroup>
            <col width="20%" />
            <col width="30%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>
          <tbody>
            <tr>
              <th>신청인</th>
              <td>김현대</td>
              <th>연락처</th>
              <td>010-9000-1909</td>
            </tr>
            <tr>
              <th>방문일시</th>
              <td colSpan="3">2019.10.30 14:00</td>
            </tr>
            <tr>
              <th>방문장소</th>
              <td colSpan="3">
                <div className="map-wrap mt0 mb16">{livePopupShow ? <KakaoMap style={{ width: '100%', height: '100%', frameBorder: '0' }} addr={liveInfo.LiveAddr} /> : null}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <Buttons align="center" marginTop={60}>
          <Button size="big" background="blue80" title="확인" width={245} height={48} buttonMarkup={true} onClick={() => closeLivePopup()} />
        </Buttons>
      </div>
    </RodalPopup>
  );
};

LiveAssignView.propTypes = {
  livePopupShow: PropTypes.bool,
  setLivePopupShow: PropTypes.func,
  closeLivePopup: PropTypes.func,
  liveInfo: PropTypes.object
};

LiveAssignView.displayName = 'LiveAssignView';
export default LiveAssignView;
