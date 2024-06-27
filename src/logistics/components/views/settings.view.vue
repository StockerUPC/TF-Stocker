<script>
import apiService from "../../services/stocker-api.service.js";

export default {
  name: "orders",
  data() {
    return {
       settings: {
      plan: '',
      nombre: '',
      correo: '',
      contrasena: '',
      comentarios: '',
      soporte: '',
    },
      showDialog: false,
    }
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
      cancelSettingsUpdate() {
    this.showDialog = false;
  },
     saveSettings() {
    this.plan = this.settings.plan;
    this.nombre = this.settings.nombre;
    this.correo = this.settings.correo;
    this.contrasena = this.settings.contrasena;
    this.comentarios = this.settings.comentarios;
    this.soporte = this.settings.soporte;
    this.showDialog = false;
  },
  },
  async created() {
    try{
      const response = await apiService.getAllOrders();
      if (response && response.data) {
        this.orders = response.data.map(order => new Order(order));
      }
      else{
        console.error("Error al obtener las ordenes");
      }
    } catch (error) {
      console.error("Error al obtener las ordenes", error);
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
            <h3>{{$t('Setting')}}</h3>
            <div class="table">
              <div class="info-box">
                <i class="pi pi-money-bill icon"></i>
                <span class="info-key">Plan:</span>
                <span class="info-value">{{ plan }}</span>
              </div>
              <div class="info-box">
                <i class="pi pi-user icon"></i>
                <span class="info-key">Nombre:</span>
                <span class="info-value">{{ nombre }}</span>
              </div>
              <div class="info-box">
                <i class="pi pi-envelope icon"></i>
                <span class="info-key">Correo:</span>
                <span class="info-value">{{ correo }}</span>
              </div>
              <div class="info-box">
                <i class="pi pi-lock icon"></i>
                <span class="info-key">Contraseña:</span>
                <span class="info-value">{{ contrasena }}</span>
              </div>
            </div>
            <div class="info-box">
              <button class="save-button" @click="openDialog">Editar información</button>
            </div>
            <div>
              <pv-dialog v-model:visible="showDialog" :modal="true" :style="{width: '50vw'}" :closable="false">
                <template #header>
                  {{ dialogTitle }}
                </template>
                <div class="p-fluid">
                  <div class="p-field">
                    <label for="plan">Plan</label>
                    <pv-inputtext class="dialog-input" id="plan" v-model="settings.plan"/>
                  </div>
                  <div class="p-field">
                    <label for="nombre">Nombre</label>
                    <pv-inputtext class="dialog-input" id="nombre" v-model="settings.nombre"/>
                  </div>
                  <div class="p-field">
                    <label for="correo">Correo</label>
                    <pv-inputtext class="dialog-input" id="correo" v-model="settings.correo"/>
                  </div>
                  <div class="p-field">
                    <label for="contrasena">Contraseña</label>
                    <pv-inputtext class="dialog-input" id="contrasena" v-model="settings.contrasena"/>
                  </div>
                </div>
                <template #footer>
                  <pv-button label="Guardar" icon="pi pi-check" @click="saveSettings()"></pv-button>
                  <pv-button label="Cancelar" icon="pi pi-times" class="p-button-secondary" @click="cancelSettingsUpdate()"></pv-button>
                </template>
              </pv-dialog>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>

.dialog-input {
  color: green;
}

.save-button {
  background-color: #b8fc5c;
  color: black;
  border: none;
  padding: 10px;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
}

.info-value {
  border: none;
  background: none;
  color: green;
  outline: none;
}

.icon {
  padding-right: 10px;
  margin-right: 10px;
}

.info-box {
  display: flex;
  justify-content: left;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

.info-key {
  color: blue;
}

.info-value {
  color: green;
}

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
  padding: 1rem;
}
.boxS img{
  margin: 0 auto;
  padding: 2rem 0;
  display: block;

}

.table table {
  width: 100%;
}
.table {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 2em 0
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
