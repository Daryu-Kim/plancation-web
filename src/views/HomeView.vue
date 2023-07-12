<template>
  <div class="wrapper">
    <SideBar></SideBar>
    <HeaderBar></HeaderBar>
  </div>
</template> 
<script lang="ts">
import HeaderBar from '../components/HeaderBar.vue'
import SideBar from "../components/SideBar.vue";

export default {
  components: {
    SideBar,
    HeaderBar,
  }
}
</script>

<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/pages/home.css';
</style>