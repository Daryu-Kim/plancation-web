<template>
  <div class="loginJoin">
    <!-- 오버레이 백그라운드 색상 -->
    <div class="overlay">
      <!-- ⚪ 로그인 모달 -->
      <LoginJoinModal :class="{ active: isActive }" class="modal">
        <!-- 👇 헤더부분 : isActive일때 회원가입으로, 아닐 때는 로그인으로 -->
        <template v-slot:header v-if="isActive">
          <h1 class="fs_16">Create Account</h1>
        </template>

        <template v-slot:header v-else>
          <h1 class="fs_16">Log into your</h1>
          <h1 class="fs_16">Account</h1>
        </template>

        <!-- 👇 회원가입할 때 이름 인풋 : isActive일때 회원가입 창에서만 보이게-->
        <template v-slot:nameInput v-if="isActive">
          <div class="emailInput">
            <input type="text">
            <span class="loginText emailTextId">이름</span>
          </div>
        </template>

        <!-- 👇 회원가입할 때 비밀번호 확인 : isActive일때 회원가입 창에서만 보이게-->
        <template v-slot:confirmPwInput v-if="isActive">
          <div class="pwInput">
            <input type="password">
            <span class="passwordText loginTextPw fs_9">비밀번호 확인</span>
          </div>

        </template>

        <!-- 👇 비밀번호 창일때 보여질 부분 : isActive일때 , 아닐 때는 로그인 창으로 -->
        <template v-slot:loginBottom v-if="isActive">
          <div class="joinBottomWrap">
            <p class="fs_9">가입하기 버튼을 누르면, 플랜케이션의 <span>서비스 이용약관</span>과 <span>개인정보 처리방침</span>을 읽고 동의했음으로 간주합니다.</p>
            <button type="button" class="fs_10">가입하기</button>
          </div>
        </template>

        <template v-slot:loginBottom v-else>
          <a class="getPassword fs_8" href="">비밀번호를 잊으셨나요?</a>
          <button type="button" class="loginBtn fs_10">로그인</button>
          <div class="lineBox">
            <div class="line"></div>
            <p class="fs_8">다른방법으로 로그인</p>
            <div class="line"></div>
          </div>
          <button class="anotherLogin" type="button">
            <img src="@/assets/images/LoginJoin/GoogleLogo.png" alt="구글로고">
            <p class="fs_10">Google로 로그인</p>
          </button>
          <div class="goJoin">
            <p class="fs_8">계정이 없으세요?</p>
            <p class="fs_8">회원가입 하러가기</p>
          </div>
        </template>
      </LoginJoinModal>

      <!-- ⚪ 슬라이드  -->
      <LoginJoinSlide :class="{ active: isActive }" class="slide">
        <template v-slot:goBtn>
          <button class="goJoinBtn fs_10" @click="toggleButtonClass()">
            <!-- 버튼 부분 active일때 로그인 하러가기 ,
              아니라면 회원가입 하러가기로 텍스트변경 -->
            <template v-if="isActive">
              로그인 하러가기
            </template>
            <template v-else>
              회원가입 하러가기
            </template>
          </button>
        </template>
      </LoginJoinSlide>
    </div>
  </div>
</template>

<script lang="ts">
import LoginJoinModal from "../components/LoginJoinModal.vue";
import LoginJoinSlide from '../components/LoginJoinSlide.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LoginJoinModal,
    LoginJoinSlide,
  },

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    // 토글버튼 : 버튼을 클릭 시 화면 전환하는 클래스 추가
    toggleButtonClass() {
      this.isActive = !this.isActive;
    },
  },
})
</script>

<style lang="scss">
@import '../assets/scss/pages/loginJoin.css';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>