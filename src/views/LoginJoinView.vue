<template>
  <div class="loginJoin">
    <!-- <login-join-modal></login-join-modal> -->
    <LoginJoinModal></LoginJoinModal>
  </div>
</template>
<script lang="ts">
import LoginJoinModal from "../components/LoginJoinModal.vue";

export default {
  components: {
    LoginJoinModal,
  }
}

</script>
<style lang="scss">
@import '../assets/scss/pages/loginJoin.css';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>