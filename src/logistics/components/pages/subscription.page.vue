<script>
import Swal from 'sweetalert2'
import authService from "../../services/auth.service.js";

export default {
  name: "subscription",
  data() {
    return {
      plans: [
        { name: 'Basic', price: 5, features: ['- Ingresar hasta', '100 registros'] },
        { name: 'Premium', price: 15, features: ['- Registros ilimitados', '- Soporte prioritario 24/7'] }
      ]
    };
  },
  methods: {
    selectPlan(plan) {
      Swal.fire({
        title: '<span style="color: white;">Plan seleccionado!</span>',
        html: `<p style="color: white;">Has seleccionado el plan ${plan.name} por ${plan.price} USD / mes</p>`,
        icon: 'success',
        confirmButtonText: 'Genial!',
        confirmButtonColor: '#3085d6',
        background: '#18181b',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
<template>
  <div class="containerS">
    <div class="boxS" v-for="plan in plans" :key="plan.name">
      <div class="header">
        <h3>{{ plan.name }} Plan</h3>
        <hr />
      </div>
      <div class="content">
        <p class="price">{{ plan.price }} USD / month</p>
        <ul class="features">
          <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
        </ul>
        <button @click="selectPlan(plan)" class="button">
          <i class="pi pi-check"></i> Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.containerS {
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.boxS {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  min-height: 400px;
  padding: 1.5rem;
  background-color: #18181b;
  color: #fff;
  border: 1px solid #214729;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  align-items: center;
  margin: 2.5rem;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.boxS:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 1px solid #34D399;
}

.header {
  width: 100%;
  text-align: center;
}

.header h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #fff;
}

.header hr {
  border: none;
  height: 1px;
  background-color: #555;
  margin-bottom: 1rem;
}

.content {
  text-align: center;
}

.price {
  font-size: 1.25rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.features {
  list-style-type: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  width: 100%;
}

.features li {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 0.5rem;
}

.button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button:hover {
  background-color: #0056b3;
}

.button i {
  font-size: 1.2rem;
}
</style>
