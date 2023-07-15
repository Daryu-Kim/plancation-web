<template>
  <div class="changePwModal">
    <div class="overlay">
      <LoginJoinModal class="modal">
        <template v-slot:header>
          <img @click="goBack()" class="arrowIcon" src="@/assets/images/LoginJoin/icon_arrow.svg" alt="뒤로가기 아이콘">
          <h1 class="fs_16">비밀번호를 바꾸시겠어요?</h1>
          <p>재설정하려는 비밀번호를 입력해 주세요.</p>
        </template>

        <template v-slot:emailInput>
          <div class="pwInput"><!-- 👇 비밀번호 표시 & 가리기 -->
            <input :type="isPasswordVisible ? 'text' : 'password'" v-model.trim="password" autocomplete="off">
            <span class="passwordText loginTextPw fs_9" :class="{ move: password }"> 비밀번호 </span>
            <span class=" passwordWranF fs_9" :class="{ move: password }" @click="togglePwVisibleClass()">표시</span>
            <span class="passwordWranL fs_9" :class="{ move: password }" v-show="valid.password"> 8-12자 내의 영문, 숫자, 특수문자를
              포함시켜주세요</span>
          </div>

          <div class="pwInput">
            <input :type="isPasswordVisible ? 'text' : 'password'" v-model.trim="confirmPW" autocomplete="off">
            <span class="passwordText loginTextPw fs_9" :class="{ move: confirmPW }">비밀번호
              확인</span>
            <span class=" passwordWranF fs_9" :class="{ move: confirmPW }" @click="togglePwVisibleClass()">표시</span>
            <span class="passwordWranL fs_9" :class="{ move: confirmPW }" v-show="valid.confirmPW">비밀번호를 다시 확인해주세요</span>
          </div>
        </template>

        <template v-slot:loginBottom>
          <button type="button" class="loginBtn fs_10" @click="__updatePassword()">비밀번호 변경</button>
        </template>
      </LoginJoinModal>
    </div>
  </div>
</template>
<script lang="ts">
import LoginJoinModal from '../components/LoginJoinModal.vue'
import { getAuth, updatePassword } from "firebase/auth";
// import PageMixin from '../mixins/pagemixin.ts';

export default {
  components: {
    LoginJoinModal,
  },
  // mixins: [PageMixin],
  data() {
    return {
      //패스워드 감추기&표시하기 토글
      isPasswordVisible: false,

      //로그인& 회원가입 데이터
      email: '',
      password: '',
      displayname: '',
      confirmPW: '',

      //유효성 테스트
      valid: {
        email: false,
        password: false,
        confirmPW: false
      },
    }
  },
  methods: {
    //메인으로 가기
    goBack() {
      this.$router.go(-1);
    },
    //비밀번호 표시&가리기 토글버튼
    togglePwVisibleClass() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    //비밀번호 변경
    async __updatePassword() {
      const auth = getAuth();
      const user: any = auth.currentUser;
      const newPassword: string = "123456"

      updatePassword(user, newPassword)
        .then(() => {
          alert("Update successful.")
        }).catch((err) => {
          console.log(err)
          alert(err)
        })
    },
  }
}
</script>
<style lang="scss"></style>