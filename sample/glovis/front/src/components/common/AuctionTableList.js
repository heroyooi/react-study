const AuctionTableList = ({value, onClick}) => {
  const { location, date, name, year, fuel, km, color, exhaust, purpose, carNumber, grade, initialRegist, mission, options, price } = value;

  const transformDesc = (string) => {
    let stringArr = [];
    let _string = string.split('<br />')
    if(_string.length > 1) {
      _string.map((v, i) => {
        if(i < _string.length-1) {
          stringArr.push(<span key={i}>{v}<br /></span>)
        } else {
          stringArr.push(<span key={i}>{v}</span>)
        }
      })
      return stringArr
    } else {
      return string
    }
  }
  const handleClick = (e) => {
    e.preventDefault();
    onClick(e, value);
  }

  return (
    <>
      <tr>
        <td rowSpan="2">{location}</td>
        <td rowSpan="2">{date}</td>
        <td rowSpan="2" className="name"><a href="#" onClick={handleClick}>{transformDesc(name)}</a></td>
        <td>{year}</td>
        <td>{fuel}</td>
        <td>{km}</td>
        <td>{transformDesc(color)}</td>
        <td>{exhaust}</td>
        <td>{transformDesc(purpose)}</td>
        <td rowSpan="2">{transformDesc(carNumber)}</td>
        <td>{grade}</td>
      </tr>
      <tr>
        <td>{initialRegist}</td>
        <td>{mission}</td>
        <td colSpan="4">{options}</td>
        <td>{price}</td>
      </tr>
    </>
  )
}

export default AuctionTableList;
