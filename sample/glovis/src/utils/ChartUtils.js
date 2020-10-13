export function LineSeries(
  _label= "",
  _data= [],
  _yAxisID= "",
  _color= "",
  _position= "left",
  _lineTension= 0.1,
  _backgroundColor= "#c3cfef",
  _borderColor= "#c3cfef",
  _borderCapStyle= "butt",
  _borderDash= [],
  _borderDashOffset= 0.0,
  _borderJoinStyle= 'miter',
  _pointBorderColor= "#c3cfef",
  _pointBackgroundColor= "#c3cfef",
  _pointBorderWidth= 1,
  _pointHoverRadius= 5,
  _pointHoverBackgroundColor= "#c3cfef",
  _pointHoverBorderColor= "#c3cfef",
  _pointHoverBorderWidth= 2,
  _pointRadius= 4,
  _pointHitRadius= 10,
) {
  let dataset = {
    type: "line",
    label: _label,
    fill: false,
    lineTension: _lineTension,
    backgroundColor: _color !== "" ? _color : _backgroundColor,
    borderColor: _color !== "" ? _color :  _borderColor,
    borderCapStyle: _borderCapStyle,
    borderDash: _borderDash,
    borderDashOffset: _borderDashOffset,
    borderJoinStyle: _borderJoinStyle,
    pointBorderColor: _color !== "" ? _color :  _pointBorderColor,
    pointBackgroundColor: _color !== "" ? _color :  _pointBackgroundColor,
    pointBorderWidth: _pointBorderWidth,
    pointHoverRadius: _pointHoverRadius,
    pointHoverBackgroundColor: _color !== "" ? _color :  _pointHoverBackgroundColor,
    pointHoverBorderColor: _color !== "" ? _color :  _pointHoverBorderColor,
    pointHoverBorderWidth: _color !== "" ? _color :  _pointHoverBorderWidth,
    pointRadius: _pointRadius,
    pointHitRadius: _pointHitRadius,
    data: _data,
    yAxisID: _yAxisID,
    position: _position,
  }

  return dataset
}

export function BarSeries(
  _label= "",
  _data= [],
  _yAxisID= "",
  _color= "",
  _position="left",
  _fill= false,
  _bgColor= "#95c4c0",
  _borderColor= "#95c4c0",
  _borderWidth= 1,
  _bgAlpha= 1,
  _hoverBgColor= "#95c4c0",
  _hoverBorderColor= "#95c4c0",
) {

  let dataset = {
    type: 'bar',
    label: _label,
    data: _data,
    fill: _fill,
    yAxisID: _yAxisID,
    backgroundColor: _color !== "" ? _color : _bgColor,
    borderColor: _color !== "" ? _color : _borderColor,
    borderWidth: _borderWidth,
    backgroundAlpha: _bgAlpha,
    hoverBackgroundColor: _color !== "" ? _color : _hoverBgColor,
    hoverBorderColor: _color !== "" ? _color : _hoverBorderColor,
    position: _position,
  }

  return dataset
}

export function AreaSeries(
  _label= "",
  _data= [],
  _yAxisID= "",
  _color= "",
  _position="left",
  _lineTension= 0.1,
  _backgroundColor= "#c3cfef",
  _borderColor= "#c3cfef",
  _borderCapStyle= "butt",
  _borderDash= [],
  _borderDashOffset= 0.0,
  _borderJoinStyle= 'miter',
  _pointBorderColor= "#c3cfef",
  _pointBackgroundColor= "#c3cfef",
  _pointBorderWidth= 1,
  _pointHoverRadius= 5,
  _pointHoverBackgroundColor= "#c3cfef",
  _pointHoverBorderColor= "#c3cfef",
  _pointHoverBorderWidth= 2,
  _pointRadius= 4,
  _pointHitRadius= 10,
) {
  let dataset = {
    type: "line",
    label: _label,
    fill: true,
    lineTension: _lineTension,
    backgroundColor: _backgroundColor,
    borderColor: _borderColor,
    borderCapStyle: _borderCapStyle,
    borderDash: _borderDash,
    borderDashOffset: _borderDashOffset,
    borderJoinStyle: _borderJoinStyle,
    pointBorderColor: _pointBorderColor,
    pointBackgroundColor: _pointBackgroundColor,
    pointBorderWidth: _pointBorderWidth,
    pointHoverRadius: _pointHoverRadius,
    pointHoverBackgroundColor: _pointHoverBackgroundColor,
    pointHoverBorderColor: _pointHoverBorderColor,
    pointHoverBorderWidth: _pointHoverBorderWidth,
    pointRadius: _pointRadius,
    pointHitRadius: _pointHitRadius,
    data: _data,
    yAxisID: _yAxisID,
    position: _position,
  }

  return dataset
}

export function ConvertData(list, xField, yField){
  let data = {}
  let xFieldList = []

  yField.map( (field,index) => {
      data[field] = []
      list.map( (item) => {
          if(index === 0) {
              xFieldList.push(item[xField])
          }
      
      data[field].push(item[field])
      })
  })

  data[xField] = xFieldList
  return data
}