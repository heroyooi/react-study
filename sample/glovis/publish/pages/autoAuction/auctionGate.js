import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import Link from 'next/link'
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const AuctionGate = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleRouter = (href) => (e) => {
    e.preventDefault();
    Router.push(href);
  }


  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '',
        options: ['back', 'gnb', 'transparent']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 76,
        color: '#f6f7f8'
      }
    });
    return (
      <AppLayout>
        <div className="content-sec auction-wrap">
          <div className="content-wrap member-contents">
            <div className="member-tit-area auction">
              <h4>
                <img src="/images/common/autobell-logo.png" alt="오토벨 로고" />
                <span className="option-wrap">
                  <em className="option-tp bg-indigo70">스마트</em>
                  <em className="option-tp bg-indigo40">옥션</em>
                </span>
              </h4>
            </div>
            <div className="member-co-wrap auction">
              <p className="ment">현대 글로비스의 <span>스마트한</span> 경매서비스를 경험해보세요</p>
              <ul>
                <li>
                  <span>경쟁 할수록 내차의 가격이 상승한다</span>
                  <p>내차 출품하기</p>
                  <Link href="/autoAuction/exhibitStep01"><a>바로가기</a></Link>
                </li>
                <li>
                  <span>언제 어디서나 실시간 경매참여</span>
                  <p>온라인경매 참여</p>
                  <Link href="#"><a onClick={handleRouter('/autoAuction/auctionInfo?seq=2')}>바로가기</a></Link>
                </li>
                <li>
                  <span>경매를 이용하는 입문자를 위한 안내서</span>
                  <p>이용안내 보기</p>
                  <Link href="#"><a onClick={handleRouter('/autoAuction/auctionInfo?seq=3')}>바로가기</a></Link>
                </li>
              </ul>
            </div>
            <Button className="fixed" size="full" background="blue80" title="메인으로" href="/autoAuction/auctionHome" />
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>
                <img src="/images/common/autobell-logo-big.png" alt="오토벨 로고" />
                <span className="option-wrap">
                  <em className="option-tp bg-indigo70">스마트</em>
                  <em className="option-tp bg-indigo40">옥션</em>
                </span>
              </h4>
            </div>
            <div className="member-co-wrap auction">
              <p className="ment">현대 글로비스의 <span>스마트한</span> 경매서비스를 경험해보세요</p>
              <ul>
                <li>
                  <span>경쟁 할수록<br />내차의 가격이 상승한다</span>
                  <p>내차 출품하기</p>
                  <Link href="/autoAuction/exhibitStep01"><a>바로가기</a></Link>
                </li>
                <li>
                  <span>언제 어디서나<br />실시간 경매참여</span>
                  <p>온라인경매 참여</p>
                  <Link href="#"><a onClick={handleRouter('/autoAuction/auctionInfo?seq=2')}>바로가기</a></Link>
                </li>
                <li>
                  <span>경매를 이용하는<br />입문자를 위한 안내서</span>
                  <p>이용안내 보기</p>
                  <Link href="#"><a onClick={handleRouter('/autoAuction/auctionInfo?seq=3')}>바로가기</a></Link>
                </li>
              </ul>
            </div>
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="메인으로" width={180} height={60} href="/autoAuction/auctionHome" />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default AuctionGate;