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
          <CurrentUsers @addClick="openReadModal" />
          <WriteTodo v-if="showPostModal" />
          <TodoList class="flex" />
          <TodoList class="flex" />
          <TodoList class="flex" />
          <!-- <WriteTodo /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "../components/SideBar.vue"
import HeaderBar from '../components/HeaderBar.vue'
import TodoList from '../components/TodoList.vue'
import WriteTodo from '../components/WriteTodo.vue'
import CurrentUsers from '../components/CurrentUsers.vue'

export default {
  components: {
    SideBar,
    HeaderBar,
    TodoList,
    CurrentUsers,
    WriteTodo
  },
  emits: ['diaryClick', 'addClick'],
  data() {
    return {
      isActive: false, //오버레이
      postList: [] as any[], //현재 캘린더의 모든 Posts의 문서
      calendarID: this.$route.params.id, //현재 캘린더 id
      selectedPost: null, //클릭한 게시물
      showPostModal: false, //게시글 상세보기 모달
      showWriteModal: false //게시글 작성 모달
    }
  },
  methods: {
    openReadModal(item) {
      this.isActive = true
      //item은 diaryList에서 현재 클릭한 기록문서
      this.selectedPost = item
      this.showPostModal = true;
      console.log(item)
    },
  }
}
</script>
<style lang="scss">
@import '../assets/scss/pages/todo.css'
</style>