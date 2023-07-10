<template>
  <div class="LoginJoinModal">
    <div class="form">
      <div class="header">
        <h1>Log into your</h1>
        <h1>Account</h1>
      </div>

      <div class="emailInput">
        <input type="text" placeholder="">
        <span class="loginText emailTextId">사용자이메일</span>
        <span class="loginText emailWran">이메일형식 오류</span>
      </div>

      <div class="pwInput">
        <input type="password" placeholder="">
        <span class="loginText loginTextPw">비밀번호</span>
        <span class="passwordWranF">비밀번호 표시</span>
        <span class="passwordWranL">8-12자내로 입력해주세요.</span>
        <!-- <span class="password-wran off">숨기기</span> -->
      </div>

      <a class="getPassword" href="">비밀번호를 잊으셨나요?</a>

      <button type="button" class="loginBtn">로그인</button>

      <div class="line-box">
        <div class="line"></div>
        <p>다른방법으로 로그인</p>
        <div class="line"></div>
      </div>


      <button type="button">
        <img src="@/assets/images/LoginJoin/GoogleLogo.png" alt="구글로고">
        <p>Google로 로그인</p>
      </button>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/scss/components/LoginJoinModal.css';
</style>
