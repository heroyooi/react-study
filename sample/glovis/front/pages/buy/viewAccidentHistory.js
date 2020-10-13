import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from 'next/link';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ViewAccidentHistory = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 중고차 사고이력 정보 보고서
  const now = moment();
  const [dep1Panel, setDep1Panel] = useState(0);
  const [dep2Panel, setDep2Panel] = useState(0);
  const tabDep1Click = useCallback((e, idx) => {
    setDep1Panel(idx);
  }, []);
  const tabDep2Click = useCallback((e, idx) => {
    setDep2Panel(idx);
  }, []);

  const [isCal, setIsCal] = useState(false); // 기본값은 false
  const handleCal = useCallback((e) => {
    e.preventDefault();
    setIsCal(true);
  }, []);

  const [agreeReply, setAgreeReply] = useState(false);
  const handleAgreeChange = useCallback((e) => setAgreeReply(Number(e.target.value) == 1 ? true : false), []);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '중고차 사고이력 정보 보고서',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>
        <div className="used-car-summary">
          <h2>투싼(TUCSAN) 66부00**</h2>
          <p className="info">정보조회일자: 2019-09-27</p>
        </div>
        <div className="content-wrap">
          <CarAccidentHistory />
        </div>
      </AppLayout>
    )
  }
  
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default withRouter(ViewAccidentHistory);