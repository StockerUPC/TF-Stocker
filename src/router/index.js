//Router
import { createRouter, createWebHistory } from 'vue-router';

// Importar componentes
import landingComponent from "../public/pages/home.page.vue";
import loginSection from "../public/pages/login.page.vue";
import stockerComponent from "../logistics/components/pages/stocker.page.vue";
import notfoundComponent from "../public/pages/notfound.page.vue";
import dashboardComponent from "../logistics/components/views/dashboard.view.vue";
import inventoryComponent from "../logistics/components/views/inventory.view.vue";
import reportsComponent from "../logistics/components/views/reports.view.vue";
import suppliersComponent from "../logistics/components/views/suppliers.view.vue";
import ordersComponent from "../logistics/components/views/orders.view.vue";
import managementComponent from "../logistics/components/views/management.view.vue";
import settingsComponent from "../logistics/components/views/settings.view.vue";
import subscriptionPage from "../logistics/components/pages/subscription.page.vue";

// Crear rutas
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: landingComponent},
        { path: '/login', component: loginSection},
        { path: '/subscription', component: subscriptionPage},
        { path: '/stocker', component: stockerComponent,
            children: [
                { path: 'dashboard', component: dashboardComponent},
                { path: 'inventory', component: inventoryComponent},
                { path: 'reports', component: reportsComponent},
                { path: 'suppliers', component: suppliersComponent},
                { path: 'orders', component: ordersComponent},
                { path: 'management', component: managementComponent},
                { path: 'settings', component: settingsComponent}
            ]
        },


        { path: '/:pathMatch(.*)*', component: notfoundComponent}
    ]
});

export default router;