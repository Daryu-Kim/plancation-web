<template>
  <div class="calendarList" v-for:="item in myCalendars" @click="goToCalendar">
    <div class="top">
      <p class="fs_11">{{ item?.calendarTitle }}</p>
      <div class="profileWrap">
        <div
          :style="{ 'background-image': 'url(https://firebasestorage.googleapis.com/v0/b/plancation-74a7a.appspot.com/o/Apps%2Fdefault_user_image.png?alt=media&token=24c09b27-9fd8-4604-8900-3f9c16c14452)' }"
          class="avatar"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <!-- <p class="fs_8">Robert Downey Jr.</p> -->
        <!-- <p class="fs_9">{{ item?.calendarTitle }}</p> -->
        <div class="circle"></div>
        <p class="fs_8">{{ item?.calendarID == user ? '개인캘린더' : '공유캘린더' }}</p>
      </div>
      <button class="shareBtn fs_9" @click="text()">공유하기</button>
    </div>
  </div>
</template>
<script lang="ts">
import { getAuth } from 'firebase/auth'
export default {
  props: {
    myCalendars: Object,
  },
  data() {
    return {
      user: ''
    }
  },
  created() {
    this.loadCurrentUserProfile()
    console.log(this.myCalendars)
  },
  methods: {
    //현재 로그인한 사용자의 프로필 정보를 가져오기
    async loadCurrentUserProfile() {
      const auth = getAuth();
      const user: any = auth.currentUser;
      try {
        this.user = user.uid
        console.log(user.uid)
      }
      catch (err) { console.log(err) }
      return
    },

    //캘린더 목록에서 선택하면 해당 캘린더로 페이지 넘어가기
    goToCalendar() {
      this.$router.push('/calendar')
    },

    //캘린더 공유
    text() {
      alert('공유하기')
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/components/CalendarList.css';
</style>