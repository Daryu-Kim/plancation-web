<template lang="">
  <div class="calendarList"  @click="goToCalendar">
    <div class="top">
      <p class="fs_11">dw503 native 실무과정</p>
      <div class="profileWrap">
        <div :style="{ 'background-image': 'url(https://item.kakaocdn.net/do/dc9561970173c28a13654c3f14180b4b617ea012db208c18f6e83b1a90a7baa7)' }" class="avatar" ></div>
        <div :style="{ 'background-image': 'url(https://item.kakaocdn.net/do/dc9561970173c28a13654c3f14180b4b617ea012db208c18f6e83b1a90a7baa7)' }" class="avatar"></div>
        <div :style="{ 'background-image': 'url(https://item.kakaocdn.net/do/dc9561970173c28a13654c3f14180b4b617ea012db208c18f6e83b1a90a7baa7)' }" class="avatar"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <p class="fs_8">강해민</p>
        <p class="fs_9">공유캘린더</p>
        <div class="circle"></div>
      </div>
      <button class="shareBtn fs_9" @click="text()">공유하기</button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  methods: {
    goToCalendar() {
      this.$router.push('/calendar')
    },
    text() {
      alert('공유하기')
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';

.calendarList {
  cursor: pointer;

  width: 14rem;
  height: 14rem;

  background-color: var(--main);
  border-radius: 0.6rem;

  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .top {
    p {
      color: #fff;
      margin-bottom: 0.5rem;
    }

    .profileWrap {
      display: flex;

      .avatar {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 3rem;
        margin-right: 0.3rem;

        background: {
          color: #fff;
          position: center;
          repeat: no-repeat;
          size: cover;
        }

        &> :last-child {
          margin: 0;
        }
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;

    .left {
      p {
        color: #fff;

        &::before {
          content: "";

          width: 1rem;
          height: 0.6rem;
          border-radius: 1rem;

          background-color: #fff;
        }
      }

    }

    // .circle {
    //   width: 0.6rem;
    //   height: 0.6rem;
    //   border-radius: 1rem;

    //   background-color: var(--point);
    // }

    button {
      padding: 0.4rem 0.3rem;
      border-radius: 0.6rem;
      border: none;
      background-color: var(--point);
      color: #fff;
      cursor: pointer;
    }
  }

}
</style>