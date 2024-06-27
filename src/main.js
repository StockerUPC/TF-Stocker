import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import i18n from "./i18n.js";
import 'primeicons/primeicons.css';
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Card from "primevue/card";
import Divider from "primevue/divider";
import SplitButton from 'primevue/splitbutton';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";
import 'primevue/resources/themes/aura-dark-green/theme.css'

import './style.css'
import App from './App.vue'

//importar router
import router from './router/index.js'


createApp(App)
    .component('pv-button', Button)
    .component('pv-sidebar', Sidebar)
    .component('pv-card', Card)
    .component('pv-divider', Divider)
    .component('pv-splitbutton', SplitButton)
    .component('pv-datatable', DataTable)
    .component('pv-column', Column)
    .component('pv-dialog', Dialog)
    .component('pv-inputtext', InputText)
    .component('pv-dropdown', Dropdown)
    .component('pv-tag', Tag)
    .use(i18n)
    .use(router)
    .use(PrimeVue)
    .mount('#app')
