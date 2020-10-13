import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button'
import FaqList from '@src/components/common/FaqList';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';

const SellHome = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({ type: SECTION_SELL });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          options: ['back', 'gnb', 'transparent']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, []);  

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="sell-main-area">
          <div className="sell-top-banner">
            <div className="content-wrap">
              <h3>내차 팔기</h3>
              <p className="guide">
                믿을 수 있는 현대 오토벨에서 편리하게<br />
                내 차를 팔 수 있게 도와드립니다.<br />
                나에게 맞는 방법을 확인해보세요.
              </p>
              <i className="top-banner-bg"></i>
            </div>
          </div>
          <div className="content-sec">
            <ul className="sell-ask-list">
              <li>
                <Button size="full" background="white" color="black" shadow={true} title="방문평가 판매" sub="전담 차량 평가삭가 방문, 차량 평가에서 매각까지!" iconType="next-black" nextLink={true} href="visitApply" />
              </li>
              <li>
                <Button size="full" background="white" color="black" shadow={true} title="셀프등록 판매" sub="24시간 실시간 경쟁 입찰을 통해 최고가로 판매" iconType="next-black" nextLink={true} href="selfHome" />
              </li>
              <li>
                <Button size="full" background="white" color="black" shadow={true} title="무평가 판매" sub="무평가, 비대면 서비스로 차를 판매할 수 있는 서비스" iconType="next-black" nextLink={true} href="freeHome" />
              </li>
            </ul>
          </div>
          <div className="faq-wrap">
            <FaqList />
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="mycar-sell-intro">
        <div className="content-wrap">
          <h3>내차 팔기</h3>
          <p className="guide">
            믿을 수 있는 현대 오토벨에서 편리하게 내 차를 팔 수 있게 도와드립니다.<br />
            나에게 맞는 방법을 확인해보세요.
          </p>
          <ul className="sell-ask-list">
            <li>
              <h4>방문평가 판매</h4>
              <ul className="keyword">
                <li>#오래된차</li>
                <li>#누가대신해줬으면</li>
                <li>#원하는장소와시간</li>
              </ul>
              <p className="intro">간편 신청을 통해 전담 차량 평가사가 방문하여 차량 평가에서 매각까지 도와드립니다.</p>
              <div className="btn-ask">
                <Link href="visitApply"><a>신청하기</a></Link>
              </div>
            </li>
            <li>
              <h4>셀프등록 판매</h4>
              <ul className="keyword">
                <li>#비대면_만나지않아도</li>
                <li>#내가직접</li>
                <li>#온라인으로</li>
              </ul>
              <p className="intro">모바일로 직접 차량을 평가하여 24시간 실시간 경쟁 입찰을 통해 최고가로 판매하는 서비스입니다.</p>
              <div className="btn-ask">
                <Link href="selfHome"><a>자세히보기</a></Link>
              </div>
            </li>
            <li>
              <h4>무평가 판매</h4>
              <ul className="keyword">
                <li>#빠른거래</li>
                <li>#상태좋은중고차</li>
              </ul>
              <p className="intro">무평가, 비대면 서비스를 통해 차를 빠르게 판매할 수 있는 서비스입니다.</p>
              <div className="btn-ask">
                <Link href="freeHome"><a>자세히보기</a></Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="content-wrap sell-home-wrap">
        <div className="content-wrap">
          <FaqList />
        </div>
      </div>
    </AppLayout>
  )
}

export default SellHome