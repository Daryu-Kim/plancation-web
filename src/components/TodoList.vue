<template>
  <div class="todoList">
    <div class="todoHeader">
      <p class="fs_10">7월 20일 목요일</p>
      <img src="../assets/images/main/icon_pencil.svg" alt="연필모양 아이콘">
    </div>

    <div class="ListBox">
      <ul>
        <li class="listItem">
          <label for="checkBox">
            <img src="../assets/images/main/icon_emptyBox.svg"
              :style="isChecked ? { display: 'none' } : { display: 'block' }" alt="체크없는박스">
            <img src="../assets/images/main/icon_checked.svg"
              :style="isChecked ? { display: 'block' } : { display: 'none' }" alt="체크박스">
            <input id="checkBox" type="checkbox" v-model="isChecked">
          </label>

          <div class="listContent">
            <p class="fs_10">와이어프레임 작업</p>
            <div class="right">
              <div class="userImage"
                :style="{ 'background-image': 'url(https://firebasestorage.googleapis.com/v0/b/plancation-74a7a.appspot.com/o/Apps%2Fdefault_user_image.png?alt=media&token=24c09b27-9fd8-4604-8900-3f9c16c14452)' }">
              </div>
              <img src="../assets/images/main/icon_close.svg" alt="닫기아이콘">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      isChecked: true
    }
  },
  methods: {
    //토글로 체크버튼 이벤트조절
    setCheckToggle() {

    }
  }

}
</script>

<style lang="scss">
@import '../assets/scss/components/TodoList.css';
</style>