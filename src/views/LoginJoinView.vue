<template>
  <div class="loginJoin">
    <!-- 오버레이 백그라운드 색상 -->
    <div class="overlay">
      <!-- ⚪ 로그인 모달 --> <!-- 👇 isActive에 값이 true면 active클래스 추가 : 슬라이드 좌우이동 모션 -->
      <LoginJoinModal :class="{ active: isActive }" class="modal">
        <!-- 헤더부분 : isActive일때 회원가입문구로, 아닐 때는 로그인문구로 -->
        <template v-slot:header v-if="isActive">
          <h1 class="fs_16">Create Account</h1>
        </template>

        <template v-slot:header v-else>
          <h1 class="fs_16">Log into your</h1>
          <h1 class="fs_16">Account</h1>
        </template>

        <!-- 이메일 인풋 -->
        <template v-slot:emailInput>
          <div class="emailInput">
            <input type="text" v-model.trim="email"> <!-- 👇 email 값이 있다면 move 클래스 추가 : 플레이스홀더 문구 위로 올라가는 모션-->
            <span class="loginText emailTextId" :class="{ move: email }">이메일</span>
            <span class="loginText emailWran" :class="{ move: email }" v-show="valid.email">이메일형식 오류</span>
          </div>
        </template>

        <!-- 이름 인풋 : isActive일때 회원가입 창에서만 보이게-->
        <template v-slot:nameInput v-if="isActive">
          <div class="emailInput">
            <input type="text" v-model.trim="displayname">
            <span class="loginText emailTextId" :class="{ move: displayname }">이름</span>
          </div>
        </template>

        <!-- 비밀번호 인풋 -->
        <template v-slot:pwInput>
          <div class="pwInput"><!-- 👇 비밀번호 표시 & 가리기 -->
            <input :type="isPasswordVisible ? 'text' : 'password'" v-model.trim="password" autocomplete="off">
            <span class="passwordText loginTextPw fs_9" :class="{ move: password }"> 비밀번호 </span>
            <span class=" passwordWranF fs_9" :class="{ move: password }" @click="togglePwVisibleClass()">표시</span>
            <span class="passwordWranL fs_9" :class="{ move: password }" v-show="valid.password"> 8-12자 내의 영문, 숫자, 특수문자를
              포함시켜주세요</span>
          </div>
        </template>

        <!--  비밀번호 확인 인풋 : isActive일때 회원가입 창에서만 보이게-->
        <template v-slot:confirmPwInput v-if="isActive">
          <div class="pwInput">
            <input :type="isPasswordVisible ? 'text' : 'password'" v-model.trim="confirmPW" autocomplete="off">
            <span class="passwordText loginTextPw fs_9" :class="{ move: confirmPW }">비밀번호
              확인</span>
            <span class=" passwordWranF fs_9" :class="{ move: confirmPW }" @click="togglePwVisibleClass()">표시</span>
            <span class="passwordWranL fs_9" :class="{ move: confirmPW }" v-show="valid.confirmPW">비밀번호를 다시 확인해주세요</span>
          </div>
        </template>

        <!--  isActive : 회원가입 버튼 바텀 -->
        <template v-slot:loginBottom v-if="isActive">
          <div class="joinBottomWrap">
            <p class="fs_9">가입하기 버튼을 누르면, 플랜케이션의 <span>서비스 이용약관</span>과 <span>개인정보 처리방침</span>을 읽고 동의했음으로 간주합니다.</p>
            <button type="button" class="fs_10" @click="__join()">가입하기</button>
          </div>
        </template>

        <!--  !isActive : 로그인 버튼바텀 -->
        <template v-slot:loginBottom v-else>
          <router-link to="/findpw">
            <p class="getPassword fs_8">비밀번호를 잊으셨나요?</p>
          </router-link>
          <button type="button" class="loginBtn fs_10" @click="__login()">로그인</button>
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

      <!-- ⚪ 슬라이드  --> <!-- 👇 isActive에 값이 true면 active클래스 추가 : 슬라이드 좌우이동 모션-->
      <LoginJoinSlide :class="{ active: isActive }" class="slide">
        <template v-slot:goBtn>
          <button class="goJoinBtn fs_10" @click="toggleSlideButtonClass()">
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
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  // addDoc,
  // collection,
  doc,
  getFirestore,
  setDoc,
  // Timestamp,
  // updateDoc,
} from "firebase/firestore";


export default defineComponent({
  components: {
    LoginJoinModal,
    LoginJoinSlide,
  },
  data() {
    return {
      //슬라이드 화면전환 토글
      isActive: false,

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
    };
  },
  // 👇 `v-model`로 걸어둔 email이랑 password input창이 변하는것을 `watch`로 감시하고,
  //     변경이되면 `methods`가 실행된다. 따라서 실시간으로 이메일 형식이 맞는지 판단할 수 있다.
  watch: {
    'email': function () {
      this.checkEmail()
    },
    'password': function () {
      this.checkPassword()
    },
    'confirmPW': function () {
      this.checkConfirmPW()
    }
  },

  methods: {
    //버튼을 클릭 시 슬라이드화면 전환하는 클래스 추가 토글버튼 
    toggleSlideButtonClass() {
      this.isActive = !this.isActive;
      //이메일 & 비밀번호 인풋 값 초기화
      this.email = ""
      this.password = ""
      this.displayname = ""
      this.confirmPW = ""
    },

    //비밀번호 표시&가리기 토글버튼
    togglePwVisibleClass() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },

    //로그인
    async __login() {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        // console.log(currentUser.user)
        return (this.$router.replace('/home'))
      } catch (error) {
        alert(error)
        console.log(error);
      }
    },

    //회원가입
    async __join() {
      try {
        const db = getFirestore();
        const auth = getAuth();
        const currentUser = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password,
        );
        // 회원가입한 유저의 프로필 등록
        await updateProfile(currentUser.user, {
          displayName: this.displayname,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/plancation-74a7a.appspot.com/o/Apps%2Fdefault_user_image.png?alt=media&token=24c09b27-9fd8-4604-8900-3f9c16c14452',
        })

        //👇firestore로 'Users'라는 컬렉션에 방금 회원가입한 유저정보 추가하기
        await setDoc(doc(db, "Users", currentUser.user.uid), {
          userID: currentUser.user.uid,
          userImagePath: null,
          userName: this.displayname,
        })

        //👇기본 캘린더 부여하기
        //firestore로 'Calendars'라는 컬렉션에 유저UID로 문서추가하기
        await setDoc(doc(db, "Calendars", currentUser.user.uid), {
          calendarAuthorID: currentUser.user.uid,
          calendarTitle: "개인",
          calendarID: currentUser.user.uid,
          calendarUsers: [currentUser.user.uid]
        })
        alert(`${this.displayname}님 안녕하세요! 회원가입되었습니다.`)
        return (this.$router.replace('/home'))
      }
      catch (error) {
        alert(error)
        console.log(error);
      }
    },

    //이메일 형식 검사
    checkEmail() {
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
      // 💡정규 표현식의 test() 메소드 : 인자로 주어진 문자열에서 정규 표현식에 해당하는 패턴이 있는지 검사한 후, 그 결과값을 boolean 타입으로 반환합니다.
      // 즉, 정규 표현식과 문자열을 비교하여 문자열에 해당 패턴이 존재한다면 true를 반환하고, 존재하지 않는다면 false를 반환합니다.
      if (!validateEmail.test(this.email)) {
        this.valid.email = true
        return
      } this.valid.email = false
      this.email.trim()
    },

    //비밀번호 형식 검사(영문, 숫자, 특수문자가 포함되게)
    checkPassword() {
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,12}$/
      if (!validatePassword.test(this.password)) {
        this.valid.password = true
        return
      } this.valid.password = false
      this.password.trim()
    },

    //비밀번호 확인 검사
    checkConfirmPW() {
      if (this.password !== this.confirmPW) {
        this.valid.confirmPW = true
        return
      }
      this.valid.confirmPW = false
      this.confirmPW.trim()
    }
  }
})
</script>

<style lang="scss">
@import '../assets/scss/pages/loginJoin.css';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>