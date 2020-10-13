import { Line } from 'react-chartjs-2'
import { ColorList } from '../../../src/utils/ColorUtil'
import PropTypes from 'prop-types'

const LineChart = ({width, height}) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '기아 판매량',
        fill: false,
        lineTension: 0.1,
        backgroundColor: ColorList(2),
        borderColor: ColorList(2),
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: ColorList(2),
        pointBackgroundColor: ColorList(2),
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: ColorList(2),
        pointHoverBorderColor: ColorList(2),
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: '현대 판매량',
        fill: false,
        lineTension: 0.1,
        backgroundColor: ColorList(1),
        borderColor: ColorList(1),
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: ColorList(1),
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: ColorList(1),
        pointHoverBorderColor: ColorList(1),
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [11, 23, 66, 81, 2, 43, 12]
      }
    ]
  }

  return (
    <div style={{"width": width, "height": height}}>
      <Line data={data} />
    </div>
  )
}

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default LineChart
