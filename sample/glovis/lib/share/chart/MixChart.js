import { Bar } from 'react-chartjs-2'
import PropTypes from 'prop-types'

const MixChart = ({width}) => {
  const data = {
    //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Sales',
      type:'line',
      data: [51, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    },
    {
      type: 'bar',
      label: 'Visitor',
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    },
    {
      type: 'bar',
      label: 'zzz',
      data: [1, 2, 3, 4, 5, 6, 8],
      fill: false,
      backgroundColor: '#ff0000',
      borderColor: '#ff0000',
      hoverBackgroundColor: '#ff0000',
      hoverBorderColor: '#ff0000',
      yAxisID: 'y-axis-3'
    }]
  }

  const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: true
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      }],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: true
          },
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
              display: false
          },
          labels: {
              show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-3',
          gridLines: {
              display: false
          },
          labels: {
            show: true
          }
        }
      ]
    }
  }

  const plugins = [{
    afterDraw: (chartInstance, easing) => {
      const ctx = chartInstance.chart.ctx;
      ctx.fillText("This text drawn by a plugin", 100, 100);
    }
  }]

  return (
    <div style={{"width": width}}>
      <Bar data={data} options={options} />
    </div>
  )
}

MixChart.propTypes = {
  width: PropTypes.number
}

export default MixChart