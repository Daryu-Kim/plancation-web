<template>
  <div class="home">
    <div class="fixMenu">
      <!-- 사이드바 컴포넌트 -->
      <SideBar class="fixSideBar" />
      <div class="fixHeaderBar">
        <!-- 헤더바 컴포넌트 -->
        <HeaderBar class="rightHeader" />
        <div class="mainScreen">
          <p class="homeTitle fs_12">캘린더 목록</p>
          <div class="CalendarListWrap">
            <!-- 캘린더 리스트 컴포넌트 -->
            <CalendarList class="calendarListItem" />
            <CalendarList class="calendarListItem" />
            <CalendarList />
          </div>
          <div class="notifyTitle">
            <p class="homeTitle fs_12">새로운 알림</p>
            <button class="fs_12">
              알림 모두 지우기
            </button>
          </div>
          <!-- 알림리스트 컴포넌트 -->
          <NotifyItem />
        </div>
      </div>

    </div>
  </div>
</template> 
<script lang="ts">
import HeaderBar from '../components/HeaderBar.vue';
import SideBar from "../components/SideBar.vue";
import CalendarList from "../components/CalendarList.vue";
import NotifyItem from "../components/NotifyItem.vue";

export default {
  components: {
    SideBar,
    HeaderBar,
    CalendarList,
    NotifyItem,
  },
}
</script>

<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/pages/home.css';
</style>