import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const SmartFinder = ({active}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    
  }, []);

  return (
    <div className={active === true ? "smart-finder active" : "smart-finder"}>
      <ul className="sf-result-list">
        <li><Link href="#"><a><strong>체어</strong>맨</a></Link>
          <ul className={hasMobile ? "m-list basic" : undefined}>
            <li><Link href="#"><a>쌍용뉴<strong>체어</strong>맨(2003~2008)</a></Link></li>
            <li><Link href="#"><a>쌍용<strong>체어</strong>맨W(2008~2011)</a></Link></li>
            <li><Link href="#"><a>쌍용뉴<strong>체어</strong>맨W(2011~2017)</a></Link></li>
            <li><Link href="#"><a>쌍용<strong>체어</strong>맨H(2008~2011)</a></Link></li>
          </ul>
        </li>
        <li><Link href="#"><a>로<strong>체</strong></a></Link>
          <ul className={hasMobile ? "m-list basic" : undefined}>
            <li><Link href="#"><a>기아로<strong>체 어</strong>드밴스(2007~2008)</a></Link></li>
            <li><Link href="#"><a>기아로<strong>체 어</strong>맨밴티지(2008~2011)</a></Link></li>
            <li><Link href="#"><a>기아로<strong>체 어</strong>맨밴티지(2008~2011)</a></Link></li>
            <li><Link href="#"><a>기아로<strong>체 어</strong>맨밴티지(2008~2011)</a></Link></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default SmartFinder;