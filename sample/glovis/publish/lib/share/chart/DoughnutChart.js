import { Doughnut } from 'react-chartjs-2'
import PropTypes from 'prop-types'

const DoughnutChart = ({width, height, dataProvider}) => {

  const data = {
		labels: [
			'현대',
			'기아',
			'르노삼성'
		],
		datasets: [{
			data: dataProvider,
			backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			],
			hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			]
		}]
  }
  
  return (
    <div id="chart" style={{"width":width, "height":height}}>
      <Doughnut data={data} />
    </div>
  )
}

DoughnutChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  dataProvider: PropTypes.array
}

export default DoughnutChart