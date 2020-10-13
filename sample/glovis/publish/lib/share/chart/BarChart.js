import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

import { ColorList } from '../../../src/utils/ColorUtil'
import { clone } from '../../../src/utils/CommonUtil'

import PropTypes from 'prop-types'

const BarChart = ({width, height, dataProvider}) => {
  const [data, setData] = useState({})
  useEffect(() => {
    setData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '현대',
          backgroundColor: ColorList(12),
          borderColor: ColorList(12),
          borderWidth: 1,
          backgroundAlpha: 1,
          hoverBackgroundColor: ColorList(12),
          hoverBorderColor: ColorList(12),
          data: dataProvider,
        },
        {
          label: '기아',
          backgroundColor: ColorList(3),
          borderColor: ColorList(3),
          borderWidth: 1,
          backgroundAlpha: 1,
          hoverBackgroundColor: ColorList(3),
          hoverBorderColor: ColorList(3),
          data: [265, 359, 380, 181, 156, 155, 140],
        }
      ]
    })
  }, [])

  const clickHandler = () => {
    dataProvider.push(33)
  }

  return (
    <div style={{"width": width, "height": height}} onClick={clickHandler}>
      <Bar data={clone(data)} options={{maintainAspectRatio: false}} />
    </div>
  )
}

BarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  dataProvider: PropTypes.array
}

export default BarChart
