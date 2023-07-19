<template>
  <div class="readDiaryModal">
    <div class="top">
      <p class="fs_11">{{ this.readPost.postTime.seconds }}</p>
      <div class="iconWrap">
        <div class="modifyBtn" @click="$emit('updateClick', this.readPost)">
          <img src="../assets/images/main/icon_pencil.svg" alt="수정아이콘">
          <p class="fs_9">수정</p>
        </div>
        <div class="removeBtn" @click="__deleteDiary(this.readPost.postID)">
          <img src="../assets/images/main/icon_trash.svg" alt="삭제아이콘">
          <p class="fs_9">삭제</p>
        </div>
        <div class="closeBtn" @click="$emit('cancle')">
          <img src="../assets/images/main/icon_close.svg" alt="닫기아이콘">
          <p class="fs_9">닫기</p>
        </div>
      </div>
    </div>

    <div class="overflowWrap">
      <div class="diaryImage" :style="{ 'background-image': `url(${this.readPost.postImage})` }">
      </div>
      <div class="bottom">
        <p class="title fs_10">{{ this.readPost.postTitle }}</p>
        <p class="fs_10">
          {{ this.readPost.postContent }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { collection, getFirestore, deleteDoc, doc } from "firebase/firestore";
export default {
  data() {
    return {
      // postList: ''
    }
  },
  created() {
    console.log(this.readPost.postTitle)
  },
  props: {
    readPost: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    // //문서 수정하기
    // async __updateDiary(postID) {
    //   try {

    //   } catch (err) {
    //     console.log(err)
    //   }
    // },

    //문서 삭제하기
    async __deleteDiary(postID) {
      try {
        const db = getFirestore();
        await deleteDoc(doc(collection(db, "Calendars", this.$route.params.id, "Posts"), `${postID}`))
          .then(() => {
            alert("기록삭제완료!")
          })
          .catch((err) => {
            alert(err.code)
          })
        return this.$router.go(0);
      }
      catch (err) {
        console.log(err)
      }
    },
  }
}
</script>
<style lang="scss">
@import '../assets/scss/components/ReadDiaryModal.css'
</style>