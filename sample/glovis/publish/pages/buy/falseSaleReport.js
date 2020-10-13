import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFalseSaleReport from '@src/components/common/MobFalseSaleReport';
import RadioGroup from '@lib/share/items/RadioGroup';
import CheckBox from '@lib/share/items/CheckBox';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import Button from '@lib/share/items/Button';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const falseSaleReport = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 허위 매물 신고
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
        title: '허위 매물 신고',
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
        <MobFalseSaleReport />
      </AppLayout>
    )
  }
  
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default withRouter(falseSaleReport);