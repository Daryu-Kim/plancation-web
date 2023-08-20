<template>
  <div class="headerBar">
    <router-link to="/home">
      <div class="left">
        <img src="@/assets/images/LoginJoin/mainLogo.png" alt="로고심볼">
        <img src="@/assets/images/about/logotext.png" alt="로고심볼">
      </div>
    </router-link>

    <router-link to="/setting">
      <img src="@/assets/images/main/icon_set.svg" alt="설정아이콘">
    </router-link>
    <!-- <div @click="goSetting()">
      <img src="@/assets/images/main/icon_set.svg" alt="설정아이콘">
    </div> -->
  </div>
</template>
<script lang="ts">
export default {
  methods: {
    goSetting() {
      this.$router.push(`/calendar/${this.$route.params.id}/setting`);
    },
  }
}
</script>
<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/components/HeaderBar.scss';
@import '../assets/scss/abstracts/_variables.scss';
</style>