<template>
  <div class="findPw">
    <div class="overlay">
      <LoginJoinModal class="modal">
        <template v-slot:header>
          <img @click="goBack" class="arrowIcon" src="@/assets/images/LoginJoin/icon_arrow.svg" alt="뒤로가기 아이콘">
          <h1 class="fs_16">비밀번호를 잊으셨나요?</h1>
          <p>비밀번호를 재설정하려는 계정(이메일)을 입력해 주세요.</p>
        </template>

        <template v-slot:emailInput>
          <div class="emailInput">
            <input type="text" v-model="email"> <!-- 👇 email 값이 있다면 move 클래스 추가 : 플레이스홀더 문구 위로 올라가는 모션-->
            <span class="loginText emailTextId" :class="{ move: email }">이메일</span>
            <span class="loginText emailWran" :class="{ move: email }" v-show="valid.email">이메일형식 오류</span>
          </div>
        </template>

        <template v-slot:loginBottom>
          <button type="button" class="loginBtn fs_10" @click="__sendEmail()">이메일 전송</button>
        </template>
      </LoginJoinModal>

      <LoginJoinSlide class="slide" />
    </div>
  </div>
</template>

<script lang="ts">
import LoginJoinModal from '../components/LoginJoinModal.vue'
import LoginJoinSlide from '../components/LoginJoinSlide.vue'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth();

export default {
  components: {
    LoginJoinModal,
    LoginJoinSlide,
  },
  data() {
    return {
      email: '',
      //유효성 테스트
      valid: {
        email: false,
      },
    }
  },
  watch: {
    'email': function () {
      this.checkEmail()
    }
  },
  methods: {
    //뒤로가기
    goBack() {
      this.$router.go(-1);
    },

    //이메일 형식 검사
    checkEmail() {
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
      if (!validateEmail.test(this.email)) {
        this.valid.email = true
        return
      } this.valid.email = false
      this.email.trim()
    },

    async __sendEmail() {
      try {
        await sendPasswordResetEmail(
          auth,
          this.email,
        );
        return alert('비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요!')

      } catch (error) {
        alert(error)
        console.log(error);
      }
    },
  }
}
</script>

<style lang="scss">
@import '../assets/scss/pages/findPw.css';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>