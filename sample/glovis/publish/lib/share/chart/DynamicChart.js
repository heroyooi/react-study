import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import PropTypes from 'prop-types'

export const verticalGridLine = true
export const horizontalGridLine = true

const DynamicChart = ({xFieldList, serieslist, style}) => {
  const [data, setData] = useState({})
  const [options, setOptions] = useState({
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
      xAxes: [
        {
          display: true,
          gridLines: {
            display: verticalGridLine
          },
          labels: xFieldList,
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: horizontalGridLine
          },
          labels: {
            show: false
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
        }
      ]
    }
  })

  useEffect(() => {
    createSeries(serieslist)
  }, [])

  const createSeries = (list) => {
    setData({
      datasets: list
    })
  }

  return (
    <div style={style}>
      <Bar data={data} options={options} />
    </div>
  )
}

DynamicChart.propTypes = {
  xFieldList: PropTypes.array,
  serieslist: PropTypes.array,
  style: PropTypes.object
}

export default DynamicChart