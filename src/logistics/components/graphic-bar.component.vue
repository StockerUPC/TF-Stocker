<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      // labels [ cantidad de secciones del grafico ]
      // data [ valor por seccion ]
      chartData: {
        labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ], // labels // labels
        datasets: [ 
            {
              data: [15, 20, 18, 22, 24, 35, 39, 36, 45, 67, 89, 116], // data
              backgroundColor: [
                '#ff0000', // January - Red
                '#ff7f00', // February - Orange
                '#ffff00', // March - Yellow
                '#7fff00', // April - Chartreuse
                '#00ff00', // May - Green
                '#00ff7f', // June - Spring Green
                '#00ffff', // July - Cyan
                '#007fff', // August - Azure
                '#0000ff', // September - Blue
                '#7f00ff', // October - Violet
                '#ff00ff', // November - Magenta
                '#ff007f'  // December - Rose
              ]
            }
        ] // y-axis data 
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
