const MarketPriceTitle = ({withoutGrade=false, onClick}) => {
  return (
    <ul className="tit-wrap">
      <li className="img-wrap">
        <img src="/images/dummy/market-thum-img.png" alt="차량 썸네일 이미지" />
      </li>
      <li className="tit">
        <h4>현대 LF쏘나타 하이브리드 2.0 HEV 프리미엄{withoutGrade === false && <i className="ico-pencil" onClick={onClick}></i>}</h4>
      </li>
    </ul>
  )
}

export default MarketPriceTitle;