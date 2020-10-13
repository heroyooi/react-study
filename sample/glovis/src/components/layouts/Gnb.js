import GnbItem from './GnbItem'

const Gnb = ({isSection}) => {
  const gnb_item = [
    {id: 'buy', title: '내차사기', sub: [], link: '/buy/list'},
    {id: 'sell', title: '내차팔기', sub: [], link: '/sell/sellHome'},
    {id: 'marketPrice', title: '시세조회', sub: [], link: '/marketPrice/marketPrice'}
  ];

  return (
    <div className="gnb-wrap">
      <h2 className="hide">주메뉴</h2>
      <ul id="gnb">
        {gnb_item.map((item, index) => 
          <GnbItem key={item.id} title={item.title} sub={item.sub} link={item.link} isSection={isSection} id={item.id} />
        )}
      </ul>
    </div>
  )
}

export default Gnb