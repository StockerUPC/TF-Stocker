<script>
import apiService from "../../services/stocker-api.service.js";
import { Supplier } from "../../model/supplier.entity.js";
import authHeader from "../../services/auth.service.js";
import axios from "axios";
import {Purchase} from "../../model/purchase.entity.js";
import {PurchaseDetail} from "../../model/purchaseDetail.js";

export default {
  name: "suppliers",
  data() {
    return {
      suppliers: [],
      purchases: [],
      purchaseDetails: [],
      info: null,
      isModalOpen: false,
      isModalOpenPurchase: false,
      isModalOpenPurchaseDetails: false,
      newSupplier: {
        name: '',
        number: '',
        email: ''
      },
      newPurchase:{
        totalAmount: 0.00,
        supplierId: 0,
      },
      newPurchaseDetail:{
        purchasePrice:0.00,
        salePrice:0.00,
        quantity:0,
        total: 0.00,
        purchaseId: 0,
        productId: 0
      }
    };
  },
  async created() {
    await this.fetchSuppliers();
    await this.fetchPurchases();
    await this.fetchPurchaseDetails();
    this.invocaApi();
    this.invocaApiPurchase();
    this.invocaApiPurchaseDetails();
  },
  methods: {
    //purchase
    invocaApiPurchase() {
      const API_URL = 'http://localhost:5167/api/v1/purchases';
      axios.get(API_URL, {headers: authHeader()})
          .then(response => {
            console.log('Response:', response);
            this.purchases = response.data;
          })
          .catch(error => {
            console.error('Error al hacer la solicitud:', error);
          });
    },
    invocaApiPurchaseDetails() {
      const API_URL = 'http://localhost:5167/api/v1/purchases-details';
      axios.get(API_URL, {headers: authHeader()})
          .then(response => {
            console.log('Response:', response);
            this.purchaseDetails = response.data;
          })
          .catch(error => {
            console.error('Error al hacer la solicitud:', error);
          });
    },
    invocaApi() {
      const API_URL = 'http://localhost:5167/api/v1/suppliers';
      axios.get(API_URL, {headers: authHeader()})
          .then(response => {
            console.log('Response:', response);
            this.suppliers = response.data;
          })
          .catch(error => {
            console.error('Error al hacer la solicitud:', error);
          });
    },
    async fetchPurchases() {
      try {
        const response = await apiService.getAllPurchases();
        if (response && response.data) {
          this.purchases = response.data.map(purchase => new Purchase(purchase));
        } else {
          console.error("Error al obtener los proveedores");
        }
      } catch (error) {
        console.error("Error al obtener los proveedores", error);
      }
    },
    async fetchPurchaseDetails() {
      try {
        const response = await apiService.getAllPurchaseDetails();
        if (response && response.data) {
          this.purchaseDetails = response.data.map(purchaseDetail => new PurchaseDetail(purchaseDetail));
        } else {
          console.error("Error al obtener los purchaseDetail");
        }
      } catch (error) {
        console.error("Error al obtener los purchaseDetail", error);
      }
    },
    async fetchSuppliers() {
      try {
        const response = await apiService.getAllSuppliers();
        if (response && response.data) {
          this.suppliers = response.data.map(supplier => new Supplier(supplier));
        } else {
          console.error("Error al obtener los proveedores");
        }
      } catch (error) {
        console.error("Error al obtener los proveedores", error);
      }
    },
    openModalPurchase() {
      this.isModalOpenPurchase = true;
    },
    closeModalPurchase() {
      this.isModalOpenPurchase = false;
      this.newPurchase = {
        totalAmount: 0.00,
        supplierId: 0,
      };
    },
    openModalPurchaseDetail() {
      this.isModalOpenPurchaseDetails = true;
    },
    closeModalPurchaseDetail() {
      this.isModalOpenPurchaseDetails = false;
      this.newPurchaseDetail = {
        purchasePrice:0.00,
        salePrice:0.00,
        quantity:0,
        total: 0.00,
        purchaseId: 0,
        productId: 0
      };
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.newSupplier = {
        name: '',
        number: '',
        email: ''
      };
    },
    async addPurchase() {
      console.log(this.newPurchase);

      const API_URL = 'http://localhost:5167/api/v1/purchases';

      try {
        const response = await axios.post(API_URL, this.newPurchase, { headers: authHeader() });

        if (response.status !== 200 && response.status !== 201) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }

        const data = response.data;

        // Agrega el nuevo proveedor a la lista de proveedores
        this.purchases.push(new Purchase(data));

        // Cierra el cuadro modal y limpia el formulario
        this.closeModalPurchase();
      } catch (error) {
        console.error('Error al agregar el proveedor', error);
      }
    },async addPurchaseDetail() {
      console.log(this.newPurchaseDetail);

      const API_URL = 'http://localhost:5167/api/v1/purchases-details';

      try {
        const response = await axios.post(API_URL, this.newPurchaseDetail, { headers: authHeader() });

        if (response.status !== 200 && response.status !== 201) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }

        const data = response.data;

        // Agrega el nuevo proveedor a la lista de proveedores
        this.purchaseDetails.push(new PurchaseDetail(data));

        // Cierra el cuadro modal y limpia el formulario
        this.closeModalPurchaseDetail();
      } catch (error) {
        console.error('Error al agregar el proveedor', error);
      }
    },
    async addSupplier() {
      console.log(this.newSupplier);

      const API_URL = 'http://localhost:5167/api/v1/suppliers';

      try {
        const response = await axios.post(API_URL, this.newSupplier, { headers: authHeader() });

        if (response.status !== 200 && response.status !== 201) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }

        const data = response.data;

        // Agrega el nuevo proveedor a la lista de proveedores
        this.suppliers.push(new Supplier(data));

        // Cierra el cuadro modal y limpia el formulario
        this.closeModal();
      } catch (error) {
        console.error('Error al agregar el proveedor', error);
      }
    },
    async deletePurchase(purchaseId) {
      const API_URL = `http://localhost:5167/api/v1/purchases/${purchaseId}`;

      try {
        const response = await axios.delete(API_URL, { headers: authHeader() });

        if (response.status === 200 || response.status === 204) {
          // Filtra la lista de purchases para remover el proveedor eliminado
          this.purchases = this.purchases.filter(purchase => purchase.id !== purchaseId);
        } else {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error al eliminar el purchase', error);
      }
    },async deletePurchaseDetail(purchaseDetailId) {
      const API_URL = `http://localhost:5167/api/v1/purchases-details/${purchaseDetailId}`;

      try {
        const response = await axios.delete(API_URL, { headers: authHeader() });

        if (response.status === 200 || response.status === 204) {
          // Filtra la lista de purchases para remover el proveedor eliminado
          this.purchaseDetails = this.purchaseDetails.filter(purchaseDetail => purchaseDetail.id !== purchaseDetailId);
        } else {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error al eliminar el purchaseDetails', error);
      }
    },
    async deleteSupplier(supplierId) {
      const API_URL = `http://localhost:5167/api/v1/suppliers/${supplierId}`;

      try {
        const response = await axios.delete(API_URL, { headers: authHeader() });

        if (response.status === 200 || response.status === 204) {
          // Filtra la lista de proveedores para remover el proveedor eliminado
          this.suppliers = this.suppliers.filter(supplier => supplier.id !== supplierId);
        } else {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error al eliminar el proveedor', error);
      }
    }
  }
}
</script>

<template>
  <div class="contenido-principal">
    <div>
      <div class="containerS2">
        <div class="containerS">
          <div class="boxS">
            <div class="header">
              <h3>Compras</h3>
              <pv-button @click="openModalPurchase">+</pv-button>
            </div>
            <div class="table">
              <table>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Proveedor ID</th>
                  <th>Proveedor</th>
                  <th>Monto Total</th>
                  <th>Email de Proveedor</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="purchase in purchases" :key="purchase.id">
                  <td style="text-align: center">{{ purchase.id }}</td>
                  <td v-if="purchase.supplier">{{purchase.supplier.id}}</td>
                  <td v-if="purchase.supplier">{{ purchase.supplier.name }}</td>
                  <td>{{ purchase.totalAmount }}</td>

                  <td v-if="purchase.supplier" style="color: blue; text-decoration: underline">
                    <a :href="'mailto:' + purchase.supplier.email">{{ purchase.supplier.email }}</a>
                  </td>
                  <td>
                    <pv-button icon="pi pi-trash" @click="deletePurchase(purchase.id)"></pv-button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--<div class="containerS">
          <div class="boxS">
            <div class="header">
              <h3>Detalles Compras</h3>
              <pv-button @click="openModalPurchaseDetail">+</pv-button>
            </div>
            <div class="table">
              <table>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Precio de Compra</th>
                  <th>Precio de Venta</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>ID de Compra</th>
                  <th>Producto</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="purchaseDetail in purchaseDetails" :key="purchaseDetail.id">
                  <td style="text-align: center">{{ purchaseDetail.id }}</td>
                  <td>{{ purchaseDetail.purchasePrice }}</td>
                  <td>{{ purchaseDetail.salePrice }}</td>
                  <td>{{ purchaseDetail.quantity }}</td>
                  <td>{{ purchaseDetail.total }}</td>
                  <td>{{ purchaseDetail.purchaseId }}</td>
                  <td v-if="purchaseDetail.product">{{ purchaseDetail.product.name }}</td>
                  <td>
                    <pv-button icon="pi pi-trash" @click="deletePurchaseDetail(purchaseDetail.id)"></pv-button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>-->
        <div class="boxS">
          <div class="header">
            <h3>Proveedores</h3>
            <button @click="openModal">+</button>
          </div>
          <div class="table">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="supplier in suppliers" :key="supplier.id">
                <td style="text-align: center">{{ supplier.id }}</td>
                <td>{{ supplier.name }}</td>
                <td>{{ supplier.number }}</td>
                <td style="color: blue; text-decoration: underline">
                  <a :href="'mailto:' + supplier.email">{{ supplier.email }}</a>
                </td>
                <td>
                  <pv-button icon="pi pi-trash" @click="deleteSupplier(supplier.id)"></pv-button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Agregar Proveedor</h2>
        <form @submit.prevent="addSupplier">
          <label for="name">Nombre:</label>
          <input type="text" v-model="newSupplier.name" required>
          <label for="number">Número:</label>
          <input type="text" v-model="newSupplier.number" required>
          <label for="email">Email:</label>
          <input type="email" v-model="newSupplier.email" required>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>

    <div v-if="isModalOpenPurchase" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModalPurchase">&times;</span>
        <h2>Agregar Proveedor</h2>
        <form @submit.prevent="addPurchase">
          <label for="name">ID de proveedor:</label>
          <input type="number" v-model="newPurchase.supplierId" required>
          <label for="number">Monto Total:</label>
          <input type="text" v-model="newPurchase.totalAmount" required>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
    <div v-if="isModalOpenPurchaseDetails" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModalPurchaseDetail">&times;</span>
        <h2>Agregar Detalle de Compra</h2>
        <form @submit.prevent="addPurchaseDetail">
          <label for="number">Precio de Compra:</label>
          <input type="text" v-model="newPurchaseDetail.purchasePrice" required>
          <label for="name">Precio de Venta:</label>
          <input type="text" v-model="newPurchaseDetail.salePrice" required>
          <label for="number">Cantidad:</label>
          <input type="number" v-model="newPurchaseDetail.quantity" required>
          <label for="number">Total:</label>
          <input type="text" v-model="newPurchaseDetail.total" required>
          <label for="number">ID de Compra:</label>
          <input type="number" v-model="newPurchaseDetail.purchaseId" required>
          <label for="number">ID de Product:</label>
          <input type="number" v-model="newPurchaseDetail.productId" required>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contenido-principal {
  margin-left: 250px;
}

.containerS2 {
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 2rem;
  padding: 1rem 0;
}

.boxS {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  border: white 1px solid;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.header h3 {
  margin: 0;
}

.header button {
  background-color: #B4FF58FF;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
}

.header button:hover {
  background-color: #a2e34f;
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

h3 {
  color: #000000;
  font-size: 1.5rem;
  padding: 2rem 0 1rem 2rem;
  text-align: left;
}

.boxS p {
  text-align: center;
  color: #000000;
}

/* Nuevos estilos para la lista de usuarios */
.user-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.user-item {
  color: black; /* Color del texto */
  font-size: 1.2em;
  padding: 0.5em 0;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content label {
  display: block;
  margin-top: 1rem;
  color: black; /* Color del texto en el cuadro de diálogo */
}

.modal-content input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-content button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  background-color: #B4FF58FF;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.modal-content button:hover {
  background-color: #a2e34f;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #000;
}

.table tbody tr td button {
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
}

.table tbody tr td button:hover {
  background-color: #c9302c;
}
</style>
