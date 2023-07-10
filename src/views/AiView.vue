<template>
  <div class="app">
    <h1>Scroll down to see the animations</h1>
    <div
      v-for="(item, index) in boxes"
      :key="index"
      ref="box"
      class="box"
      :class="visible[index] ? 'animate' : ''"
    >
      Box {{ index + 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const boxes = [1, 2, 3]
const visible = reactive(boxes.map(() => false))
const box = ref<HTMLElement[] | null>(null)

const handleScroll = () => {
  if (box.value) {
    const windowHeight = window.innerHeight
    const triggerPoint = 150
    box.value.forEach((element, index) => {
      const boxTop = element.getBoundingClientRect().top
      if (boxTop < windowHeight - triggerPoint) {
        visible[index] = true
      } else {
        visible[index] = false
      }
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.app {
  min-height: 300vh;
  padding-top: 10vh;
}

.box {
  height: 100px;
  background-color: red;
  width: 100%;
  position: relative;
  margin-top: 50vh;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease-out;
}

.animate {
  opacity: 1;
  transform: translateY(0);
}
</style>
