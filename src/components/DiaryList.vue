<template>
  <div class="diaryList" v-for="item in allDiary" :key="item.allDiary">
    <div class="diaryContent">
      <div class="imageWrap">
        <div
          :style="{ 'background-image': 'url(https://ilyo.co.kr/contents/article/images/2022/1205/1670245148372767.jpg)' }"
          class="diaryImageBox">
        </div>
      </div>
      <div class="userInfo">
        <p class="fs_9">르세라핌 흥해라</p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/plancation-74a7a.appspot.com/o/Apps%2Fdefault_user_image.png?alt=media&token=24c09b27-9fd8-4604-8900-3f9c16c14452"
          alt="유저이미지">
        <!-- <img src="https://ilyo.co.kr/contents/article/images/2022/1205/1670245148372767.jpg" alt="유저이미지"> -->
      </div>
      <div class="diaryText">
        <p class="diaryTitle fs_9">테스트기록제목</p>
        <p class="fs_9">2023.06.10</p>
        <!-- <p class="fs_9">{{ calendarID }}</p> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    allDiary: Object,
  },

  data() {
    return {

    }
  },

  methods: {

  }
}
</script>
<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/components/DiaryList.css';
</style>