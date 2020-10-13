const MarketPriceGraph = () => {
  return (
    <ul className="market-price-graph">
      <li>
        <span className="tit">현재시세<span>가격단위: 만원</span></span>
        <span className="con">
          <img src="/images/dummy/graph1.jpg" alt="현재시세 그래프" />
        </span>
      </li>
      <li>
        <span className="tit">미래시세<span>가격단위: 만원</span></span>
        <span className="con">
          <img src="/images/dummy/graph2.jpg" alt="미래시세 그래프" /></span>
      </li>
    </ul>
  )
}

export default MarketPriceGraph;