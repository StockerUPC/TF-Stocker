<template>
  <Pie
      id="my-pie-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
      // labels [ cantidad de secciones del grafico ]
      // data [ valor por seccion ]
      chartData: {
        labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ], // labels // labels
        datasets: [ 
            {
              data: [15, 20, 18, 22, 24, 35, 39, 36, 45, 67, 89, 116],
              backgroundColor: [
                '#000000', // Black
                '#000020', // Black
                '#000040', // Midnight Blue
                '#000080', // Navy
                '#0000BF', // Medium Blue
                '#0000FF', // Blue
                '#0040FF', // Medium Blue
                '#0080FF', // Dodger Blue
                '#00BFFF', // Deep Sky Blue
                '#00FFFF', // Cyan
                '#00FFBF', // Medium Spring Green
                '#00FF7F' // Spring Green
              ]
            } 
        ] // data
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>