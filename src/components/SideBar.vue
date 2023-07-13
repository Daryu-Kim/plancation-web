<template>
  <div class="sidebar">
    <div class="profilePart">
      <!-- <img src="@/assets/images/main/icon_user.svg" alt="유저프로필기본"> -->
      <label for="chooseImage">
        <div
          :style="{ 'background-image': 'url(https://item.kakaocdn.net/do/dc9561970173c28a13654c3f14180b4b617ea012db208c18f6e83b1a90a7baa7)' }"
          class="avatar">
          <input type="file" id="chooseImage" accept="image/*" />
        </div>
      </label>

      <div class="profileName">
        <input type="text" value="르세라핌 흥해라" class="fs_9" id="modifyName">
        <label for="modifyName">
          <img src="@/assets/images/main/icon_pencil.svg" alt="연필모양아이콘">
        </label>
        <p class="modifyBtn">수정</p>
      </div>
      <p class="userEmail">ggg222@gmail.com</p>
    </div>

    <div class="sidebarMenu">
      <!-- 👇현재 라우터의 이름이 home이면 ? 보여줄 것  -->
      <template v-if="$route.name === 'home'">
        <ul class="sidebarList">
          <li>
            <img src="@/assets/images/main/icon_key.svg" alt="열쇠아이콘">
            <p>비밀번호 변경</p>
          </li>
          <!-- 로그아웃 -->
          <li @click="__logout()">
            <img src="@/assets/images/main/icon_logout.svg" alt="로그아웃아이콘">
            <p>로그아웃</p>
          </li>
        </ul>
        <div class="sidebarBottom">
          <div class="line"></div>
          <div class="version fs_9">
            <p>버전 정보</p>
            <p>V22.01</p>
          </div>
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
import { getAuth, signOut } from "firebase/auth";

export default {
  methods: {
    //로그아웃
    async __logout() {
      try {
        const auth = getAuth()
        await signOut(auth)
        alert("로그아웃 성공")
      } catch (error) {
        console.log(error)
      }
      //로그아웃되면 로그인페이지로 내보내기
      return this.$router.push('/loginjoin')
    }
  },
}
</script>

<style lang="scss">
@import '../assets/scss/components/SideBar.scss';
@import '../assets/scss/abstracts/Fontmodule.css';
//믹스인으로 공통 스타일 묶기
</style>