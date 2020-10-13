import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

const NoticeMenu = ({ active = false }) => {
  const dealerMypageInfo = useSelector((state) => state.layout.dealerMypageInfo);
  return (
    <div className={!active ? 'notice-menu' : 'notice-menu active'}>
      <div className="inner">
        <h3 className="tit2">알림함</h3>
        <ul className="notice">
          <li>
            <Link href="/mypage/dealer/sellcar/homeServiceStatus">
              <a>
                <p>
                  홈 서비스 예약
                  <span>홈서비스 예약 차량의 숫자입니다.</span>
                </p>
                <em>{dealerMypageInfo?.homeServiceResCount}</em>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/mypage/dealer/common/counselCar">
              <a>
                <p>
                  쪽지
                  <span>딜러님의 답변을 기다리는 쪽지의 숫자입니다.</span>
                </p>
                <em>{dealerMypageInfo?.noteSentBoxCount}</em>
              </a>
            </Link>
          </li>
          {/* <li>
            <Link href="#">
              <a>
                <p>
                  공지사항
                  <span>새로운 공지사항이 등록되었습니다. 확인해 보세요. 새로운 공지사항이 등록되었습니다. 확인해 보세요. 새로운 공지사항이 등록되었습니다. 확인해 보세요. 새로운 공지사항이 등록되었습니다. 확인해 보세요. 새로운 공지사항이 등록되었습니다. 확인해 보세요. 새로운 공지사항이 등록되었습니다. 확인해 보세요. 새로운 공지사항이 등록되었습니다. 확인해 보세요.</span>
                </p>
                <em className="bg-red">11</em>
              </a>
            </Link>
          </li> */}
          <li>
            <Link href="/mypage/dealer/buycar/list">
              <a>
                <p>
                  비교 견적 입찰 건수
                  <span>입찰 중인 차량을 확인해 보세요.</span>
                </p>
                <em>{dealerMypageInfo?.compareEstimateCount}</em>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NoticeMenu;
