<template>
  <div class="changePw">
    <div class="fixMenu">
      <!-- 사이드바 컴포넌트 -->
      <SideBar class="fixSideBar" />
      <div class="fixHeaderBar">
        <!-- 헤더바 컴포넌트 -->
        <HeaderBar class="rightHeader" />
        <div class="mainScreen">
          <div class="centerPwModal">
            <ChangePwModal />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script lang="ts">
import SideBar from "../components/SideBar.vue";
import HeaderBar from '../components/HeaderBar.vue'
import ChangePwModal from '../components/ChangePwModal.vue'

export default {
  components: {
    SideBar,
    HeaderBar,
    ChangePwModal
  },
}

</script>
<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/pages/changePw.css';
</style>