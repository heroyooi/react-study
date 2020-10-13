import { useState, useCallback } from 'react';
import Link from 'next/link';
import Button from '@lib/share/items/Button'
import animateScrollTo from 'animated-scroll-to'

const QuickMenu = () => {
  const [quickActive, setQuickActive] = useState(false);
  const handleQuickMenu = useCallback((e) => {
    e.preventDefault();
    setQuickActive(quickActive => !quickActive);
  }, [quickActive]);
  const handleQuickClose = useCallback((e) => {
    e.preventDefault();
    setQuickActive(false);
  }, []);
  const handleQuickTop = useCallback((e) => {
    e.preventDefault();
    animateScrollTo(0);
  }, []);
  return (
    <div className={quickActive ? "quick-menu-wrap active" : "quick-menu-wrap"}>
      <div className="btn-qm-set">
        <button type="button" className="btn-quick-menu" onClick={handleQuickMenu}>Quick<br />Menu</button>
        <button type="button" className="btn-top" onClick={handleQuickTop}>Top</button>
      </div>
      <div className="quick-menu">
        <h3>Quick Menu</h3>
        <div className="car-thumbnail">
          <h4>차량비교함</h4>
          {/* <p className="empty">비교함이 비었습니다.</p> */}
          <ul className="ct-list">
            <li className="on">
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
            <li>
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
            <li>
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
          </ul>
          <div className="slide-navi">
            <Link href="#"><a className="prev"><img src="/images/contents/btn-qm-ct-prev.png" alt="이전"/></a></Link>
            <Link href="#"><a className="num on">1</a></Link>
            <Link href="#"><a className="num">2</a></Link>
            <Link href="#"><a className="num">3</a></Link>
            <Link href="#"><a className="next"><img src="/images/contents/btn-qm-ct-next.png" alt="다음"/></a></Link>
          </div>
          <Button size="sml" line="gray" color="darkgray" radius={true} title="비교하기" width={64} className="btn-compare" />
        </div>
        <div className="car-thumbnail">
          <h4>최근 본 차량</h4>
          {/* <p className="empty">최근 본 차량이 없습니다.</p> */}
          <ul className="ct-list">
            <li className="on">
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="edit">
                  <button type="button"><img src="/images/contents/ico-qm-ct-compare.png" alt=""/>비교함</button>
                  <b>|</b>
                  <button type="button"><img src="/images/contents/ico-qm-ct-like.png" alt=""/>관심</button>
                </p>
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
            <li>
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="edit">
                  <button type="button"><img src="/images/contents/ico-qm-ct-compare.png" alt=""/>비교함</button>
                  <b>|</b>
                  <button type="button"><img src="/images/contents/ico-qm-ct-like.png" alt=""/>관심</button>
                </p>
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
            <li>
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="edit">
                  <button type="button"><img src="/images/contents/ico-qm-ct-compare.png" alt=""/>비교함</button>
                  <b>|</b>
                  <button type="button"><img src="/images/contents/ico-qm-ct-like.png" alt=""/>관심</button>
                </p>
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
          </ul>
          <div className="slide-navi">
            <Link href="#"><a className="prev"><img src="/images/contents/btn-qm-ct-prev.png" alt="이전"/></a></Link>
            <Link href="#"><a className="num on">1</a></Link>
            <Link href="#"><a className="num">2</a></Link>
            <Link href="#"><a className="num">3</a></Link>
            <Link href="#"><a className="next"><img src="/images/contents/btn-qm-ct-next.png" alt="다음"/></a></Link>
          </div>
        </div>
        <div className="car-thumbnail">
          <h4>관심 차량</h4>
          {/* <p className="empty">로그인 후 확인 가능합니다.</p>
          <div className="btn_login">
            <Button size="sml" background="blue80" radius={true} title="로그인" width={54} />
          </div> */}
          <ul className="ct-list">
            <li className="on">
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="edit">
                  <button type="button"><img src="/images/contents/ico-qm-ct-compare.png" alt=""/>비교함</button>
                </p>
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
            <li>
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="edit">
                  <button type="button"><img src="/images/contents/ico-qm-ct-compare.png" alt=""/>비교함</button>
                </p>
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
            <li>
              <div className="photo">
                <img src="/images/dummy/market-thum-img.png" alt="기아 뉴스포티지"/>
              </div>
              <div className="cont">
                <p className="edit">
                  <button type="button"><img src="/images/contents/ico-qm-ct-compare.png" alt=""/>비교함</button>
                </p>
                <p className="name">기아 뉴스포티지</p>
                <p className="desc">디젤(VGT) 2WD LX 레져형</p>
                <p className="price">
                  <strong>430</strong>만원
                </p>
              </div>
              <button type="button" className="btn-delete"><img src="/images/contents/btn-qm-ct-delete.png" alt="삭제"/></button>
            </li>
          </ul>
          <div className="slide-navi">
            <Link href="#"><a className="prev"><img src="/images/contents/btn-qm-ct-prev.png" alt="이전"/></a></Link>
            <Link href="#"><a className="num on">1</a></Link>
            <Link href="#"><a className="num">2</a></Link>
            <Link href="#"><a className="num">3</a></Link>
            <Link href="#"><a className="next"><img src="/images/contents/btn-qm-ct-next.png" alt="다음"/></a></Link>
          </div>
        </div>
        <button type="button" className="btn-qm-close" onClick={handleQuickClose}><img src="/images/contents/btn-qm-close.png" alt="닫기"/></button>
      </div>
    </div>
  )
}

export default QuickMenu