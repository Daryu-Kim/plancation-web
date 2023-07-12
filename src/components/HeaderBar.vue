<template>
  <div class="headerBar">
    <div class="left">
      <img src="@/assets/images/LoginJoin/mainLogo.png" alt="로고심볼">
      <img src="@/assets/images/about/logotext.png" alt="로고심볼">
    </div>
    <router-link to="/setting">
      <img src="@/assets/images/main/icon_set.svg" alt="설정아이콘">
    </router-link>
  </div>
</template>
<script lang="ts">
export default {

}
</script>
<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/components/HeaderBar.scss';
@import '../assets/scss/abstracts/_variables.scss';
</style>