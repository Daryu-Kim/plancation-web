<template>
  <div class="setting">
    <SideBar></SideBar>
    <HeaderBar></HeaderBar>
  </div>
</template> 
<script lang="ts">
import SideBar from "../components/SideBar.vue";
import HeaderBar from '../components/HeaderBar.vue'

export default {
  components: {
    SideBar,
    HeaderBar,
  }
}
</script>
<style lang="scss">
.setting {
  display: flex;
}
</style>