<template>
  <div class="writeTodo">
    <div class="todoHeader">
      <p class="fs_10">할 일 추가</p>
      <img src="../assets/images/main/icon_close.svg" alt="연필모양 아이콘">
    </div>

    <div class="writeBox">
      <ul>
        <li class="writeItem">
          <!-- <label for="checkBox">
            <img src="../assets/images/main/icon_emptyBox.svg"
              :style="isChecked ? { display: 'none' } : { display: 'block' }" alt="체크없는박스">
            <img src="../assets/images/main/icon_checked.svg"
              :style="isChecked ? { display: 'block' } : { display: 'none' }" alt="체크박스">
            <input id="checkBox" type="checkbox" v-model="isChecked">
            <p class="fs_10">와이어프레임 작업</p>
          </label> -->
          <p>제목</p>
          <input type="text" placeholder="어떤 계획이 있으신가요?">

          <p>기간</p>
          <button>하루종일</button>
          <button>구간설정</button>
        </li>
      </ul>
      <!-- <VueDatePicker v-model="date" :enable-time-picker="false" range:partial-range="false" /> -->
      <!-- <VueDatePicker v-model="date" :range="false" /> -->
      <VueDatePicker v-model="date" range :partial-range="false" :enable-time-picker="false" />
      <!-- <VueDatePicker v-model="time" time-picker /> -->

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

const date = ref();
</script>

<style lang="scss"></style>