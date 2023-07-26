<template>
  <div class="LoginJoinSlide">
    <div class="slideLogoWrap">
      <img src="@/assets/images/LoginJoin/mainLogo.png" alt="로고심볼">
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
@import '../assets/scss/components/LoginJoinSlide.css';
</style>