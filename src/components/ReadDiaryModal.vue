<template>
  <div class="readDiaryModal">
    <div class="top">
      <p class="fs_11">{{ this.postId.postTime.seconds }}</p>
      <div class="iconWrap">
        <div class="modifyBtn" @click="$emit('updateClick', this.postId)">
          <img src="../assets/images/main/icon_pencil.svg" alt="수정아이콘">
          <p class="fs_9">수정</p>
        </div>
        <div class="removeBtn" @click="__deleteDiary(this.postId.postID)">
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
      <div class="diaryImage" :style="{ 'background-image': `url(${this.postId.postImage})` }">
      </div>
      <div class="bottom">
        <p class="title fs_10">{{ this.postId.postTitle }}</p>
        <p class="fs_10">
          {{ this.postId.postContent }}
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
      postList: ''
    }
  },
  created() {
    // this.getDiary()
    console.log(this.postId.postTitle)
  },
  props: {
    postId: {
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

    // //현재 캘린더의 Posts내에 전체문서 가져오기
    // async getDiary() {
    //   const db: Firestore = getFirestore();

    //   // getDocs 함수에 위에 정의한 쿼리를 적용해서 모든 문서들을 가져온다.
    //   const yourCalendars = await getDocs(
    //     collection(db, `Calendars/${this.$route.params.id}/Posts/${this.postID}`)
    //   );
    //   yourCalendars.forEach((doc) => {
    //     // 가져온 모든 문서들을 확인
    //     this.postList.push(doc.data()); //배열에 문서 데이터를 푸시
    //   });
    // }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/components/ReadDiaryModal.css'
</style>