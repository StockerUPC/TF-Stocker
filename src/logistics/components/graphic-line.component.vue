<template>
  <Line
      id="my-line-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      // labels [ cantidad de secciones del grafico ]
      // data [ valor por seccion ]
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            data: [15, 20, 18, 22, 24, 35, 39, 36, 45, 67, 89, 116],
            fill: false,
            borderColor: '#D3D3D3', // Light Gray
            borderWidth: 2,
            tension: 0.2,
            pointBackgroundColor: [
              '#FF0000', // Red
              '#FF7F00', // Orange
              '#FFFF00', // Yellow
              '#00FF00', // Green
              '#00FF7F', // Spring Green
              '#00FFFF', // Cyan
              '#007FFF', // Azure
              '#0000FF', // Blue
              '#4B0082', // Indigo
              '#8B00FF', // Violet
              '#FF00FF', // Magenta
              '#FF1493' // Deep Pink
            ]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: true
            }
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        backgroundColor: 'red' // Light Blue Background
      }
    }
  }
}
</script>

