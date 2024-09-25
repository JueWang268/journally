import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, LineElement } from 'chart.js'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, LineElement)

const TODAY = new Date(10, 10, 2022)

const DataPointGraph = () => {
  // Data to be visualized
  const data = {
    datasets: [
      {
        label: 'Work productivity',
        data: [
          { x: 0, y: 100 },
          { x: 1, y: 20 },
          { x: 2, y: 25 },
          { x: 3, y: 25 },
          { x: 4, y: 15 },
          { x: 5, y: 55 },
          { x: 6, y: 35 },
        ],
        backgroundColor: 'red',
        borderColor: 'red',
        showLine: true, // Disconnected points
        pointRadius: 6, // Size of the points
      },{
        label: 'Coffee consumed',
        data: [
          { x: 0, y: 30 },
          { x: 1, y: 30 },
          { x: 2, y: 32 },
          { x: 3, y: 34 },
          { x: 5, y: 40 },
          { x: 6, y: 55 },
          { x: 7, y: 50 },
        ],
        backgroundColor: 'turquoise',
        borderColor: 'turquoise',
        showLine: true, // Disconnected points
        pointRadius: 6, // Size of the points
      },{
        label: 'Miles run in morning',
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
          { x: 5, y: 10 },
          { x: 6, y: 0 },
          { x: 7, y: 10 },
        ],
        backgroundColor: 'green',
        borderColor: 'green',
        showLine: true, // Disconnected points
        pointRadius: 6, // Size of the points
      }
    ],
  }

  const options = {
    scales: {
      x: {
        // type: 'category',
        labels: data.labels, // Dates for x-axis
        grid: {
          display: true, // Show grid
          color: '#ddd', // Color of the grid
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true, // Show grid
          color: '#ddd', // Color of the grid
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },

  }

  return (
    <div style={{ width: '800px', margin: '0 0' }}>
      <Scatter data={data} options={options} />
    </div>
  )
}

export default DataPointGraph
