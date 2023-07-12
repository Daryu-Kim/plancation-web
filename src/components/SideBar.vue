<template>
  <div class="sidebar">
    <div class="profilePart">
      <div class="avatar">
        <img src="@/assets/images/main/icon_user.svg" alt="유저프로필기본">
      </div>

      <div enter-class="profileName">
        <input type="text" value={} placeholder="닉네임을 입력해주세요">
        <img src="@/assets/images/main/icon_pencil.svg" alt="연필모양아이콘">
      </div>
      <p>userName</p>
    </div>

    <div class="sidebarMenu">
      <!-- 👇현재 라우터의 이름이 home이면 ? 보여줄 것  -->
      <template v-if="this.$route.name === 'home'">
        <ul class="sidebarList">
          <li>
            <img src="@/assets/images/main/icon_key.svg" alt="열쇠아이콘">
            <p>비밀번호 변경</p>
          </li>
          <li>
            <img src="@/assets/images/main/icon_logout.svg" alt="로그아웃아이콘">
            <p>로그아웃</p>
          </li>
        </ul>
        <div class="sidebarBottom">
          <div class="line"></div>
          <p>버전 정보</p>
          <p>V22.01</p>
        </div>
      </template>

      <!-- 👇현재 라우터의 이름이 home이 아니면 ? 그 외의 캘린더, 투두, 기록, ai등에서 보여줄 것  -->
      <template v-else>
        <ul class="sidebarList">
          <li>
            <img src="@/assets/images/main/icon_calendar.svg" alt="캘린더아이콘">
            <p>캘린더</p>
          </li>
          <li>
            <img src="@/assets/images/main/icon_todo.svg" alt="할일아이콘">
            <p>할 일</p>
          </li>
          <li>
            <img src="@/assets/images/main/icon_ai.svg" alt="AI아이콘">
            <p>AI</p>
          </li>
          <li>
            <img src="@/assets/images/main/icon_diary.svg" alt="기록아이콘">
            <p>기록/다이어리</p>
          </li>
        </ul>
        <div class="sidebarBottom">
          <img src="@/assets/images/main/icon_back.svg" alt="뒤로가기아이콘">
          <p>메인으로 이동</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  //믹스인으로 공통 스타일 묶기
}
</script>
<style lang="scss">
@import '../assets/scss/components/SideBar.scss'
</style>