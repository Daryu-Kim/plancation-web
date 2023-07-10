<template>
  <div class="LoginJoinModal">
    <div class="form">
      <div class="header">
        <h1 class="fs_16">Log into your</h1>
        <h1 class="fs_16">Account</h1>
      </div>

      <div class="emailInput">
        <input type="text" placeholder="">
        <span class="loginText emailTextId">이메일</span>
        <span class="loginText emailWran">이메일형식 오류</span>
      </div>

      <div class="pwInput">
        <input type="password" placeholder="">
        <span class="passwordText loginTextPw fs_9">비밀번호</span>
        <span class="passwordWranF fs_9">표시</span>
        <span class="passwordWranL fs_9">8-12자내로 입력해주세요.</span>
      </div>

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
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/components/LoginJoinModal.css';
</style>
