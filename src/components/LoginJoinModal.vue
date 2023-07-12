<template>
  <div class="LoginJoinModal">
    <form action="">
      <div class="form">
        <div class="header">
          <slot name="header">
            <!-- 상위 컴포넌트or페이지에서 정의할 영역 -->
          </slot>
        </div>
        <slot name="emailInput">
          <!-- <div class="emailInput">
            <input type="text" v-model="email">
            <span class="loginText emailTextId">이메일</span>
            <span class="loginText emailWran">이메일형식 오류</span>
          </div> -->
        </slot>
        <slot name="nameInput">
          <!-- 상위 컴포넌트or페이지에서 정의할 영역 -->
        </slot>
        <slot name="pwInput">
          <!-- 상위 컴포넌트or페이지에서 정의할 영역 -->
          <!-- <div class="pwInput">
            <input type="password" v-model="password">
            <span class="passwordText loginTextPw fs_9">비밀번호</span>
            <span class="passwordWranF fs_9">표시</span>
            <span class="passwordWranL fs_9">8-12자내로 입력해주세요</span>
          </div> -->
        </slot>
        <slot name="confirmPwInput">
          <!-- 상위 컴포넌트or페이지에서 정의할 영역 -->
        </slot>
        <slot name="loginBottom">
          <!-- 상위 컴포넌트or페이지에서 정의할 영역 -->
        </slot>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/components/LoginJoinModal.css';
</style>
