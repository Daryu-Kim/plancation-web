<template>
  <div class="todo">
    <div class="fixMenu">
      <!-- 사이드바 컴포넌트 (NAV메뉴,프로필)-->
      <SideBar class="fixSideBar" />
      <div class="fixHeaderBar">
        <!-- 헤더바 컴포넌트 (상단 헤더, 로고& 설정)-->
        <HeaderBar class="rightHeader" />
        <!-- 메인 화면 -->
        <div class="mainScreen">
          <!-- <TodoList /> -->
          <WriteTodo />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "../components/SideBar.vue"
import HeaderBar from '../components/HeaderBar.vue'
// import TodoList from '../components/TodoList.vue'
import WriteTodo from '../components/WriteTodo.vue'

export default {
  components: {
    SideBar,
    HeaderBar,
    // TodoList,
    WriteTodo
  }
}
</script>
<style lang="scss">
@import '../assets/scss/pages/todo.css'
</style>