<script>
import apiService from "../../services/stocker-api.service.js";
export default {
  name: "management",
  data() {
    return {
      products: [],
      suppliers: [],
      orders: [],
      displayDialogProduct: false,
      displayDialogSupplier: false,
      displayDialogOrder: false,
      product: {},
      supplier:{},
      order: {},
      dialogTitle: ""
    }
  },
  created() {
    this.fetchProducts();
    this.fetchSuppliers();
    this.fetchOrders();
  },
  methods:{
    setImageWidth(event) {
      const img = event.target;
      if (img.naturalHeight > img.naturalWidth) {
        img.style.width = '50px';
        img.style.height = 'auto';
      } else {
        img.style.width = '100px';
        img.style.height = 'auto';
      }
    },
    //Products
    async fetchProducts() {
      const response = await apiService.getAllProducts();
      this.products = response.data;
    },
    openAddProductDialog() {
      this.product = {};
      this.dialogTitle = 'Add Product';
      this.displayDialogProduct = true;
    },
    async saveProduct() {
      if(this.product.id) {
        await apiService.updateProduct(this.product.id, this.product);
      } else {
        await apiService.addProduct(this.product);
      }
      this.product= {};
      this.displayDialogProduct = false;
      await this.fetchProducts();
    },
    editProduct(product) {
      this.product ={...product};
      this.dialogTitle = 'Edit Product';
      this.displayDialogProduct = true;
    },
    async updateProduct() {
      await apiService.updateProduct(this.product.id, this.product);
      this.displayDialogProduct = false;
      await this.fetchProducts();
    },
    cancelProductUpdate() {
      this.displayDialogProduct = false;
    },
    async deleteProduct(product) {
      await apiService.deleteProduct(product.id);
      await this.fetchProducts();
    },
    //Suppliers
    async fetchSuppliers() {
      const response = await apiService.getAllSuppliers();
      this.suppliers = response.data;
    },
    openAddSupplierDialog() {
      this.supplier = {};
      this.dialogTitle = 'Add Supplier';
      this.displayDialogSupplier = true;
    },
    async saveSupplier() {
      this.supplier.collectionId = Number(this.supplier.collectionId);
      if(this.supplier.id) {
        await apiService.updateSupplier(this.supplier.id, this.supplier);
      } else {
        await apiService.addSupplier(this.supplier);
      }
      this.supplier= {};
      this.displayDialogSupplier = false;
      await this.fetchSuppliers();
    },
    editSupplier(supplier) {
      this.supplier ={...supplier};
      this.dialogTitle = 'Edit Supplier';
      this.displayDialogSupplier = true;
    },
    async updateSupplier() {
      await apiService.updateSupplier(this.supplier.id, this.supplier);
      this.displayDialogSupplier = false;
      await this.fetchSuppliers();
    },
    async deleteSupplier(supplier) {
      await apiService.deleteSupplier(supplier.id);
      await this.fetchSuppliers();
    },
    cancelSupplierUpdate() {
      this.displayDialogSupplier = false;
    },
    //Orders
    async fetchOrders() {
      const response = await apiService.getAllOrders();
      this.orders = response.data;
    },
    openAddOrderDialog() {
      this.order = {};
      this.dialogTitle = 'Add Order';
      this.displayDialogOrder = true;
    },
    async saveOrder() {
      this.order.collectionId = Number(this.order.collectionId);
      if(this.order.id) {
        await apiService.updateOrder(this.order.id, this.order);
      } else {
        await apiService.addOrder(this.order);
      }
      this.order= {};
      this.displayDialogOrder = false;
      await this.fetchOrders();
    },
    editOrder(order) {
      this.order ={...order};
      this.dialogTitle = 'Edit Order';
      this.displayDialogOrder = true;
    },
    async updateOrder() {
      await apiService.updateOrder(this.order.id, this.order);
      this.displayDialogOrder = false;
      await this.fetchOrders();
    },
    async deleteOrder(order) {
      await apiService.deleteOrder(order.id);
      await this.fetchOrders();
    },
    cancelOrderUpdate() {
      this.displayDialogOrder = false;
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
            <h3>{{$t('management.manageProducts')}}</h3>
            <pv-button label="Add Product" icon="pi pi-plus" @click="openAddProductDialog" style="color:red"></pv-button>
            <pv-datatable :value="products"  paginator :rows="5" tableStyle="min-width: 50rem">
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <pv-column field="id" header="ID"></pv-column>
                <pv-column field="name" header="Name"></pv-column>
                <pv-column field="category" header="Category"></pv-column>
                <pv-column field="price" header="Price"></pv-column>
                <pv-column field="quantity" header="Quantity"></pv-column>
                <pv-column field="expiryDate" header="Expiry Date"></pv-column>
                <pv-column field="available" header="Available"></pv-column>
                <pv-column field="photoUrl" header="Photo">
                  <template #body="slotProps">
                    <img :src="slotProps.data.photoUrl" alt="Product image" @load="setImageWidth">
                  </template>
                </pv-column>
                <pv-column>
                  <template #body="slotProps">
                    <pv-button icon="pi pi-pencil" @click="editProduct(slotProps.data)"></pv-button>
                    <pv-button icon="pi pi-trash" @click="deleteProduct(slotProps.data)"></pv-button>
                  </template>
                </pv-column>
              </div>
            </pv-datatable>
            <pv-dialog v-model:visible="displayDialogProduct" :modal="true" :style="{width: '50vw'}" :closable="false">
              <template #header>
                {{ dialogTitle }}
              </template>
              <div class="p-fluid">
                <div class="p-field">
                  <label for="id">ID</label>
                  <pv-inputtext id="id" v-model="product.id"/>
                </div>
                <div class="p-field">
                  <label for="name">Name</label>
                  <pv-inputtext id="name" v-model="product.name"/>
                </div>
                <div class="p-field">
                  <label for="category">Category</label>
                  <pv-inputtext id="category" v-model="product.category"/>
                </div>
                <div class="p-field">
                  <label for="price">Price</label>
                  <pv-inputtext id="price" v-model="product.price"/>
                </div>
                <div class="p-field">
                  <label for="quantity">Quantity</label>
                  <pv-inputtext id="quantity" v-model="product.quantity"/>
                </div>
                <div class="p-field">
                  <label for="expiryDate">Expiry Date</label>
                  <pv-inputtext id="expiryDate" v-model="product.expiryDate"/>
                </div>
                <div class="p-field">
                  <label for="available">Available</label>
                  <pv-dropdown id="available" v-model="product.available"
                               :options="[true,false]" placeholder="Select the Availability"></pv-dropdown>
                </div>
                <div class="p-field">
                  <label for="photoUrl">Photo URL</label>
                  <pv-inputtext id="photoUrl" v-model="product.photoUrl"/>
                </div>
              </div>
              <template #footer>
                <pv-button v-if="dialogTitle === 'Add Product'" label="Save" icon="pi pi-check" @click="saveProduct()"></pv-button>
                <pv-button v-if="dialogTitle === 'Edit Product'" label="Update" icon="pi pi-check" @click="updateProduct()"></pv-button>
                <pv-button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="cancelProductUpdate()"></pv-button>
              </template>
            </pv-dialog>
          </div>
        </div>
        <div class="containerS">
          <div class="boxS">
            <h3>{{$t('management.manageSuppliers')}}</h3>
            <pv-button label="Add Supplier" icon="pi pi-plus" @click="openAddSupplierDialog" style="color:red"></pv-button>
            <pv-datatable :value="suppliers"  paginator :rows="5">
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <pv-column field="id" header="ID"></pv-column>
                <pv-column field="name" header="Name"></pv-column>
                <pv-column field="product" header="Product"></pv-column>
                <pv-column field="number" header="Number"></pv-column>
                <pv-column field="email" header="Email"></pv-column>
                <pv-column field="type" header="Type"></pv-column>
                <pv-column field="deliveryDays" header="On the Way"></pv-column>
                <pv-column>
                  <template #body="slotProps">
                    <pv-button icon="pi pi-pencil" @click="editSupplier(slotProps.data)"></pv-button>
                    <pv-button icon="pi pi-trash" @click="deleteSupplier(slotProps.data)"></pv-button>
                  </template>
                </pv-column>
              </div>
            </pv-datatable>
            <pv-dialog v-model:visible="displayDialogSupplier" :modal="true" :style="{width: '50vw'}" :closable="false">
              <template #header>
                {{ dialogTitle }}
              </template>
              <div class="p-fluid">
                <div class="p-field">
                  <label for="id">ID</label>
                  <pv-inputtext id="id" v-model="supplier.id"/>
                </div>
                <div class="p-field">
                  <label for="name">Name</label>
                  <pv-inputtext id="name" v-model="supplier.name"/>
                </div>
                <div class="p-field">
                  <label for="product">Product</label>
                  <pv-inputtext id="product" v-model="supplier.product"/>
                </div>
                <div class="p-field">
                  <label for="number">Number</label>
                  <pv-inputtext id="number" v-model="supplier.number"/>
                </div>
                <div class="p-field">
                  <label for="email">Email</label>
                  <pv-inputtext id="email" v-model="supplier.email"/>
                </div>
                <div class="p-field">
                  <label for="type">Type</label>
                  <pv-dropdown id="type" v-model="supplier.type"
                               :options="['Taking Return','Not Taking Return']" placeholder="Select a Type"></pv-dropdown>
                </div>
                <div class="p-field">
                  <label for="deliveryDays">Delivery Days</label>
                  <pv-inputtext id="deliveryDays" v-model="supplier.deliveryDays"/>
                </div>
              </div>
              <template #footer>
                <pv-button v-if="dialogTitle === 'Add Supplier'" label="Save" icon="pi pi-check" @click="saveSupplier()"></pv-button>
                <pv-button v-if="dialogTitle === 'Edit Supplier'" label="Update" icon="pi pi-check" @click="updateSupplier()"></pv-button>
                <pv-button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="cancelSupplierUpdate()"></pv-button>
              </template>
            </pv-dialog>
          </div>
        </div>
        <div class="containerS">
          <div class="boxS">
            <h3>{{$t('management.manageOrders')}}</h3>
            <pv-button label="Add Order" icon="pi pi-plus" @click="openAddOrderDialog" style="color:red"></pv-button>
            <pv-datatable :value="orders"  paginator :rows="5">
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <pv-column field="id" header="ID"></pv-column>
                <pv-column field="productId" header="Product ID"></pv-column>
                <pv-column field="quantity" header="Quantity"></pv-column>
                <pv-column field="deliveryDate" header="Delivery Date"></pv-column>
                <pv-column field="status" header="Status"></pv-column>
                <pv-column>
                  <template #body="slotProps">
                    <pv-button icon="pi pi-pencil" @click="editOrder(slotProps.data)"></pv-button>
                    <pv-button icon="pi pi-trash" @click="deleteOrder(slotProps.data)"></pv-button>
                  </template>
                </pv-column>
              </div>
            </pv-datatable>
            <pv-dialog v-model:visible="displayDialogOrder" :modal="true" :style="{width: '50vw'}" :closable="false">
              <template #header>
                {{ dialogTitle }}
              </template>
              <div class="p-fluid">
                <div class="p-field">
                  <label for="id">ID</label>
                  <pv-inputtext id="id" v-model="order.id"/>
                </div>
                <div class="p-field">
                  <label for="productId">Product ID</label>
                  <pv-inputtext id="productId" v-model="order.productId"/>
                </div>
                <div class="p-field">
                  <label for="quantity">Quantity</label>
                  <pv-inputtext id="quantity" v-model="order.quantity"/>
                </div>
                <div class="p-field">
                  <label for="deliveryDate">Delivery Date</label>
                  <pv-inputtext id="deliveryDate" v-model="order.deliveryDate"/>
                </div>
                <div class="p-field">
                  <label for="status">Status</label>
                  <pv-dropdown id="status" v-model="order.status"
                               :options="['Confirmed','Delayed','Out of delivery']" placeholder="Select a Status"></pv-dropdown>
                </div>
              </div>
              <template #footer>
                <pv-button v-if="dialogTitle === 'Add Order'" label="Save" icon="pi pi-check" @click="saveOrder()"></pv-button>
                <pv-button v-if="dialogTitle === 'Edit Order'" label="Update" icon="pi pi-check" @click="updateOrder()"></pv-button>
                <pv-button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="cancelOrderUpdate()"></pv-button>
              </template>
            </pv-dialog>
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