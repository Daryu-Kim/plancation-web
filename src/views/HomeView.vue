<template>
  <div class="home">
    <div class="fixMenu">
      <SideBar class="fixSideBar" /> <!-- 사이드바 컴포넌트 -->
      <div class="fixHeaderBar">
        <HeaderBar class="rightHeader" /> <!-- 헤더바 컴포넌트 -->
        <div class="mainScreen">
          <CalendarList /> <!-- 캘린더 리스트 컴포넌트 -->
        </div>
      </div>

    </div>
  </div>
</template> 
<script lang="ts">
import HeaderBar from '../components/HeaderBar.vue';
import SideBar from "../components/SideBar.vue";
import CalendarList from "../components/CalendarList.vue";

export default {
  components: {
    SideBar,
    HeaderBar,
    CalendarList,
  }
}
</script>

<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/pages/home.css';
</style>