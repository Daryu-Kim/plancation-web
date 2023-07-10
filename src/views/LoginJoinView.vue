<template>
  <div class="loginJoin">
    <div class="wrapper">
      <div class="bgc">

      </div>
      <LoginJoinModal class="test"></LoginJoinModal>
    </div>

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
@import '../assets/scss/pages/loginJoin.scss';
@import '../assets/scss/abstracts/Fontmodule.css';

.wrapper {
  width: 100%;
  position: relative;

  .test {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>