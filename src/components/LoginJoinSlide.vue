<template>
  <div class="LoginJoinSlide">
    <div class="slideLogoWrap">
      <img src="@/assets/images/LoginJoin/calendarIcon.png" alt="로고심볼">
      <img src="@/assets/images/LoginJoin/logoTextWhite.png" alt="로고텍스트">

      <p class="desc fs_12">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Error enim maiores nihil natus quos omnis ipsum,nam alias
        voluptate eligendi atque molestias eveniet nobis aliquid
        repellendus amet eius nostrum officiis!
      </p>
      <slot name="goBtn">
        <!-- 상위 컴포넌트or페이지에서 정의할 영역 -->
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {

}
</script>
<style lang="scss">
.LoginJoinSlide {
  width: 39rem;
  background-color: var(--main);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .slideLogoWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 5rem;
    // border: 1px solid red;

    &>:first-child {
      width: 8rem;
    }

    &>:nth-child(2) {
      width: 10rem;
      margin-top: 2rem;
    }

    .desc {
      width: 25rem;
      // border: 1px solid red;
      text-align: center;
      color: #fff;
      margin-top: 3.8rem;
    }
  }
}
</style>