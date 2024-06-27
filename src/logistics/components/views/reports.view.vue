<script>
import {Product} from "../../model/product.entity.js";
import apiService from "../../../logistics/services/stocker-api.service.js";

import Grafico1 from "../graphic-bar.component.vue";
import GraficoPie from "../graphic-pie.component.vue";
import GraficoLine from "../graphic-line.component.vue";

export default {
  name: "inventory",
  components: {
    Grafico1,
    GraficoPie,
    GraficoLine
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
  calculateGenerated(product) {
    return product.price * 50;
  },
  calculateRemainingQuantity(product) {
    return product.quantity - 50;
  },
  setImageWidth(event) {
    const img = event.target;
    if (img.naturalHeight > img.naturalWidth) {
      img.style.width = '50px';
      img.style.height = 'auto';
    } else {
      img.style.width = '100px';
      img.style.height = 'auto';
    }
  }
},
  async created() {
    try{
      const response = await apiService.getAllProducts();
      if (response && response.data) {
        this.products = response.data.map(product => new Product(product));
        this.products.sort((a, b) => this.calculateGenerated(b) - this.calculateGenerated(a));
      }
      else{
        console.error("Error al obtener los productos");
      }
    } catch (error) {
      console.error("Error al obtener los productos", error);
    }
  }
}
</script>

<template>
  <div class="contenido-principal">
    <div>
      <section class="services">
        <div class="containerS">
          <div class="boxS">
            <h3>{{$t('reports.overview')}}</h3>
            <Grafico1 />   <!-- -->
          </div>

          <div class="boxS">
            <h3>{{$t('reports.bestSelling')}}</h3>
            <GraficoPie /> <!-- -->
          </div>
        </div>

        <div class="containerS2">
          <div class="boxS">
            <h3>{{$t('reports.profitRevenue')}}</h3>
            <GraficoLine /> <!-- -->
          </div>
        </div>
        <div class="containerS2">
          <div class="boxS">
            <h3>{{$t('reports.bestSellingStock')}}</h3>
            <div class="table">
              <table>
                <thead>
                <tr>
                  <th>{{$t('reports.tablePosition')}}</th>
                  <th>{{$t('reports.tableNames')}}</th>
                  <th>{{$t('reports.tableId')}}</th>
                  <th>{{$t('reports.tableCategory')}}</th>
                  <th>{{$t('reports.tableRemainingQuantity')}}</th>
                  <th>{{$t('reports.tableGenerated')}}</th>
                  <th>{{$t('reports.tablePhoto')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(product,index) in products" :key="product.id">
                  <td style="text-align: center" >{{index + 1}}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.id }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ calculateRemainingQuantity(product) }}</td>
                  <td>S/.{{ calculateGenerated(product) }}</td>
                  <td><img :src="product.photoUrl" @load="setImageWidth" ref="productImage"></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      </div>
  </div>
</template>

<style scoped>
.contenido-principal {
  margin-left: 250px;
}
.services{
  padding: 3rem 0;
}

.containerS{
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(18rem,1fr));
  grid-gap: 2rem;
  padding: 1rem 0;

}
.containerS2{
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 2rem;
  padding: 1rem 0;

}
.boxS{

  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  border: white 1px solid;

}
.chart1{
  padding-top: 0.5rem;
  padding-left: 2rem;
  width: 95%;
  height: auto;
}
.table tbody tr td img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.table table {
  width: 100%;
}
.table {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  padding: 2em 0;
}
.table thead th {
  padding: 0.5em 2em;
}
.table tr {
  border-bottom: 1px solid #F0F1F3;
}
.table tbody tr:last-child {
  border-bottom: none;
}
.table tbody tr td {
  font-size: 1.2em;
  word-spacing: 0.2em;
  text-align: center;
  padding: 1em 0;
}

.table tbody tr td:first-child {
  text-align: left;
  padding-left: 1em;
}
h3{
  color: #000000;
  font-size: 1.5rem;
  padding: 2rem 0 1rem 2rem;
  text-align: left;
}

.boxS p{
  text-align: center;
  color: #000000;
}
</style>
