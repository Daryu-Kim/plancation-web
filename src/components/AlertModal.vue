<template>
  <div class="wrapper">
    <ul>
      <li v-for="(list, index) in alertList" :key="index" @click="$emit('updateAlert', list)">
        {{ list.alert }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const alertList = ref([
  { number: 0, alert: "없음" },
  { number: 1, alert: "당일" },
  { number: 2, alert: "하루전" },
  { number: 3, alert: "일주일전" },
]);

</script>
<style lang="scss">
.wrapper {
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  background-color: #fff;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  ul {
    li {
      cursor: pointer;
      height: 2.5rem;
      border-bottom: 1px solid black;
    }
  }
}
</style>