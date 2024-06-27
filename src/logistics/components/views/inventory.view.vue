<template>
  <div class="contenido-principal">
    <div>
      <div class="containerS2">
        <div class="containerS">
          <div class="boxS">
            <div class="header">
              <h3>Categorías</h3>
              <button @click="openModalCategory">+</button>
            </div>
            <div class="table">
              <table>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="category in categories" :key="category.id">
                  <td style="text-align: center">{{category.id}}</td>
                  <td style="text-align: center">{{ category.name }}</td>
                  <td>
                    <pv-button icon="pi pi-trash" @click="deleteCategory(category.id)"></pv-button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="boxS">
          <div class="header">
            <h3>Productos</h3>
            <pv-button @click="openModal">+</pv-button>
          </div>
          <div class="table">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Categoria</th>
                <th>Nombre</th>
                <th>Precio Compra</th>
                <th>Precio Venta</th>
                <th>Stock</th>
                <th>Fecha Expiración</th>
                <th>Foto</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in products" :key="product.id">
                <td style="text-align: center">{{product.id}}</td>
                <td v-if="product.category">{{product.category.name}}</td>
                <td>{{ product.name }}</td>
                <td>S/ {{ product.salePrice }}</td>
                <td>S/ {{ product.purchasePrice }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.expiryDate }}</td>
                <td ><img class="image-cell" :src="product.photoUrl" alt="image" style="width: 50px" ref="productImage"></td>
                <td>
                  <pv-button icon="pi pi-trash" @click="deleteProduct(product.id)"></pv-button>
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
        <h2>Agregar Producto</h2>
        <form @submit.prevent="addProduct">
          <label for="name">Nombre:</label>
          <input type="text" v-model="newProduct.name" required>
          <label for="description">Descripción:</label>
          <input type="text" v-model="newProduct.description" required>
          <label for="categoryId">Categoría:</label>
          <input type="number" v-model="newProduct.categoryId" required>
          <label for="photoUrl">Foto:</label>
          <input type="text" v-model="newProduct.photoUrl" required>
          <label for="purchasePrice">Precio Compra:</label>
          <input type="text" v-model="newProduct.purchasePrice" required>
          <label for="salePrice">Precio Venta:</label>
          <input type="text" v-model="newProduct.salePrice" required>
          <label for="stock">Stock:</label>
          <input type="number" v-model="newProduct.stock" required>
          <label for="expiryDate">Fecha Expiración:</label>
          <input type="date" v-model="newProduct.expiryDate" required>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>

    <div v-if="isModalOpenCategory" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModalCategory">&times;</span>
        <h2>Agregar Categoría</h2>
        <form @submit.prevent="addCategory">
          <label for="name">Nombre:</label>
          <input type="text" v-model="newCategory.name" required>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import authHeader from '../../services/auth.service.js';
import {Product} from "../../model/product.entity.js";
import {Category} from "../../model/category.entity.js";
export default {
  name: 'inventory',
  data() {
    return {
      products: [],
      categories: [],
      isModalOpen: false,
      isModalOpenCategory: false,
      newProduct: {
        name: '',
        description: '',
        categoryId: 0,
        photoUrl: '',
        purchasePrice: 0.00,
        salePrice: 0.00,
        stock: 0,
        expiryDate: ''
      },
      newCategory: {
        name: ''
      }
    };
  },
  created() {
    this.invocaApi();
    this.invocaApiCategory();
  },
  methods: {
    invocaApi() {
      const API_URL = 'http://localhost:5167/api/v1/products';
      axios.get(API_URL, {headers: authHeader()})
          .then(response => {
            console.log('Response:', response);
            this.products = response.data;
          })
          .catch(error => {
            console.error('Error al hacer la solicitud:', error);
          });
    },
    invocaApiCategory() {
      const API_URL = 'http://localhost:5167/api/v1/categories';
      axios.get(API_URL, {headers: authHeader()})
          .then(response => {
            console.log('Response:', response);
            this.categories = response.data;
          })
          .catch(error => {
            console.error('Error al hacer la solicitud:', error);
          });
    },
    /*async fetchProducts() {
      try {
        const response = await stockerApiService.getAllProducts();
        if (response && response.data) {
          this.products = response.data.map(product => new Product(product));
        } else {
          console.error("Error al obtener los Products");
        }
      } catch (error) {
        console.error("Error al obtener los Products", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await stockerApiService.getAllCategories();
        if (response && response.data) {
          this.categories = response.data.map(category => new Category(category));
        } else {
          console.error("Error al obtener las categorías");
        }
      } catch (error) {
        console.error("Error al obtener las categorías", error);
      }
    },*/
    openModal() {
      this.isModalOpen = true;
    },
    openModalCategory() {
      this.isModalOpenCategory = true;
    },
    closeModalCategory() {
      this.isModalOpenCategory = false;
      this.newCategory = {
        name: ''
      };
    },
    closeModal() {
      this.isModalOpen = false;
      this.newProduct = {
        name: '',
        description: '',
        categoryId: 0,
        photoUrl: '',
        purchasePrice: 0,
        salePrice: 0,
        stock: 0,
        expiryDate: ''
      };
    },
    async addProduct() {
      console.log(this.newProduct); // Ver los datos del formulario

      const API_URL = 'http://localhost:5167/api/v1/products';

      try {
        const response = await axios.post(API_URL, this.newProduct, { headers: authHeader() });

        if (response.status !== 200 && response.status !== 201) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }

        const data = response.data;

        // Agrega el nuevo producto a la lista de productos
        this.products.push(new Product(data));

        // Cierra el cuadro modal y limpia el formulario
        this.closeModal();
      } catch (error) {
        console.error('Error al agregar el producto', error);
      }
    },

    async addCategory() {
      console.log(this.newCategory); // Ver los datos del formulario

      const API_URL = 'http://localhost:5167/api/v1/categories';

      try {
        const response = await axios.post(API_URL, this.newCategory, { headers: authHeader() });

        if (response.status !== 200 && response.status !== 201) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }

        const data = response.data;

        // Agrega el nuevo producto a la lista de productos
        this.categories.push(new Category(data));

        // Cierra el cuadro modal y limpia el formulario
        this.closeModal();
      } catch (error) {
        console.error('Error al agregar el Category', error);
      }
    },

    async deleteProduct(productId) {
      const API_URL = `http://localhost:5167/api/v1/products/${productId}`;

      try {
        const response = await axios.delete(API_URL, { headers: authHeader() });

        if (response.status === 200 || response.status === 204) {
          this.products = this.products.filter(product => product.id !== productId);
        } else {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error al eliminar el producto', error);
      }
    },
    async deleteCategory(categoryId) {
      const API_URL = `http://localhost:5167/api/v1/categories/${categoryId}`;

      try {
        const response = await axios.delete(API_URL, { headers: authHeader() });

        if (response.status === 200 || response.status === 204) {
          // Filtra la lista de productos para remover el producto eliminado
          this.categories = this.categories.filter(category => category.id !== categoryId);
        } else {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error al eliminar el producto', error);
      }
    }
  }
}
</script>

<style scoped>
.image-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
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

.table tbody tr td img {
  display: block;
  margin-left: auto;
  margin-right: auto;
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
  color: black;
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
