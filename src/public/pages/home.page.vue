<script>
import hdSectionComponent from '../components/hd-section.component.vue';
import principalSectionComponent from "../views/principal-section.view.vue";
import ftSectionComponent from "../components/ft-section.component.vue";
import clientSectionComponent from "../views/client-section.view.vue";
import stockSectionComponent from "../views/stock-section.view.vue";
import inventorySectionComponent from "../views/inventory-section.view.vue";
import supportSectionComponent from "../views/support-section.view.vue";
export default {
  name: "landing",
  components:{
    hdSection: hdSectionComponent,
    principalSection: principalSectionComponent,
    ftSection: ftSectionComponent,
    clientSection: clientSectionComponent,
    stockSection: stockSectionComponent,
    inventorySection: inventorySectionComponent,
    supportSection: supportSectionComponent
  }
}
</script>

<template>
  <hd-section/>
  <main>
    <div><principal-section/></div>
    <div><client-section/></div>
    <div><stock-section/></div>
    <div><inventory-section/></div>
    <div><support-section/></div>
    <div><ft-section/></div>
  </main>

</template>

<style scoped>
main{
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-type: y var(--tw-scroll-snap-strictness);
  --tw-scroll-snap-strictness: mandatory;
}
div{
  scroll-snap-align: center;
}
</style>