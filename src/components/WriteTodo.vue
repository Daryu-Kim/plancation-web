<template>
  <div class="writeTodo">
    <div class="todoHeader">
      <p>할 일 추가</p>
      <img src="../assets/images/main/icon_close.svg" alt="연필모양 아이콘">
    </div>

    <div class="writeBox">
      <ul class="writeItem">
        <li class="title">
          <p>제목</p>
          <input class="fs_10" type=" text" placeholder="어떤 계획이 있으신가요?">
        </li>

        <li class="periodWrap">
          <div class="period">
            <p>기간</p>
            <div class="periodBtn">
              <button>하루종일</button>
              <button>구간설정</button>
            </div>
          </div>

          <div class="datePicker">
            <VueDatePicker v-model="sDate" range :partial-range="false" :enable-time-picker="false" />
            <div></div>
            <VueDatePicker v-model="eDate" range :partial-range="false" :enable-time-picker="false" />
          </div>

          <div class="period">
            <p>시간</p>
            <div class="periodBtn">
              <button>지정없음</button>
              <button>시간설정</button>
            </div>
          </div>

          <div class="datePicker">
            <VueDatePicker v-model="sTime" time-picker />
            <div></div>
            <VueDatePicker v-model="eTime" time-picker />
          </div>
        </li>

        <!-- <li>

        </li> -->
        <li class="alert">
          <p>알림</p>
          <!-- <알림의 모달띄울곳> -->
          <div>
            <p>rkdgoals</p>
            <!-- <p>rkdgoals</p>
            <p>rkdgoals</p>
            <p>rkdgoals</p> -->
          </div>
        </li>
        <li class="addUser">
          <p class="addUserTitle">참여자 추가</p>

          <label v-for="(user, index) in users" :key="index" :for="'userCheck' + index">
            <div class="userInfo">
              <div class="userImage"
                :style="{ 'background-image': 'url(https://firebasestorage.googleapis.com/v0/b/plancation-74a7a.appspot.com/o/Apps%2Fdefault_user_image.png?alt=media&token=24c09b27-9fd8-4604-8900-3f9c16c14452)' }">
              </div>
              <p>{{ user.nickname }}</p>
            </div>

            <img v-show="!user.checked" src="../assets/images/main/icon_userEmptyBox.svg" alt="체크없는박스">
            <img v-show="user.checked" src="../assets/images/main/icon_userCheckBox.svg" alt="체크박스">
            <input :id="'userCheck' + index" type="checkbox" v-model="user.checked">
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<!-- <script lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: { VueDatePicker },
  setup() {
    const date = ref();

    const time = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    });
    
    return {
      date,
      time,
      // month
    }
  },
};

</script> -->

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';

const sDate = ref();
const eDate = ref();
const sTime = ref();
const eTime = ref();

const users = ref([
  { nickname: '유저닉네임1', checked: false },
  { nickname: '유저닉네임2', checked: false },
  { nickname: '유저닉네임3', checked: false },
  { nickname: '유저닉네임4', checked: false },
]);

</script>

<style lang="scss">
@import '../assets/scss/components/WriteTodo.css';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>