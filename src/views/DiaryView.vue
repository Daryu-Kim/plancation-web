<template>
  <div class="diary">
    <div class="fixMenu">
      <!-- 사이드바 컴포넌트 -->
      <SideBar class="fixSideBar" />
      <div class="fixHeaderBar">
        <!-- 헤더바 컴포넌트 -->
        <HeaderBar class="rightHeader" />
        <div class="mainScreen">
<<<<<<< HEAD
          <div class="overlay" @click="isActivefalse()" :class="{ active: isActive }"></div>
          <!-- 해당 캘린더의 제목과 참여유저! -->
          <CurrentUsers @addClick="openWriteModal" />
          <!-- 기록/다이어리 리스트 컴포넌트 -->
          <ReadDiaryModal v-if="showPostModal" :postId="selectedPostID" @cancle="isActivefalse"
            @updateClick="openUpdateModal" />
          <WritePost v-if="showWriteModal" @cancle="isActivefalse" />
          <div class="diaryListWrap" :class="{ active: isActive }">
            <!-- 👇 $emit으로 자식컴포넌트에서 부모컴포넌트에게 diaryClick이라는 클릭이벤트를 넘겨줌. -->
            <DiaryList @diaryClick="openReadModal" :allDiary="postList" />
=======
          <!-- 해당 캘린더의 제목과 참여유저! -->
          <CurrentUsers />
          <!-- 기록/다이어리 리스트 컴포넌트 -->
          <WritePost />
          <div class="diaryListWrap" :class="{ active: isActive }">
            <!-- 👇 $emit으로 자식컴포넌트에서 부모컴포넌트에게 diaryClick이라는 클릭이벤트를 넘겨줌. -->
            <DiaryList @diaryClick="isActiveTrue()" :allDiary="postList" />
>>>>>>> 1db605773ef36f33997639b0c4d1df759a45c142
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script lang="ts">
import SideBar from "../components/SideBar.vue";
import HeaderBar from '../components/HeaderBar.vue'
import DiaryList from '../components/DiaryList.vue'
import CurrentUsers from '../components/CurrentUsers.vue'
import WritePost from '../components/WritePost.vue'
<<<<<<< HEAD
import ReadDiaryModal from '../components/ReadDiaryModal.vue'
=======
>>>>>>> 1db605773ef36f33997639b0c4d1df759a45c142
import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";

export default {
  components: {
    SideBar,
    HeaderBar,
    DiaryList,
    CurrentUsers,
<<<<<<< HEAD
    WritePost,
    ReadDiaryModal
=======
    WritePost
>>>>>>> 1db605773ef36f33997639b0c4d1df759a45c142
  },

  created() {
    this.getDiary()
  },
<<<<<<< HEAD
  emits: ['diaryClick', 'addClick'],
=======

>>>>>>> 1db605773ef36f33997639b0c4d1df759a45c142
  data() {
    return {
      isActive: false,
      postList: [] as any[],
<<<<<<< HEAD
      calendarID: this.$route.params.id,
      selectedPostID: null,
      showPostModal: false,
      showWriteModal: false
=======
      calendarID: this.$route.params.id
>>>>>>> 1db605773ef36f33997639b0c4d1df759a45c142
    }
  },

  methods: {
<<<<<<< HEAD
    openReadModal(item) {
      this.isActive = true
      this.selectedPostID = item
      this.showPostModal = true;
      console.log(item)
    },

    openWriteModal() {
      this.isActive = true
      this.showWriteModal = true
    },

    openUpdateModal(item) {
      this.showPostModal = false
      this.showWriteModal = true
    },

    isActivefalse() {
      this.isActive = false
      this.showWriteModal = false
      this.showPostModal = false
    },

    // //캘린더 목록에서 선택하면 해당 캘린더로 페이지 넘어가기
    // openReadModal(calendarID: string) {
    //   this.$router.push(`/calendar/${calendarID}`)
    // },

=======
    isActiveTrue() {
      this.isActive = true
    },

>>>>>>> 1db605773ef36f33997639b0c4d1df759a45c142
    //현재 캘린더의 Posts내에 전체문서 가져오기
    async getDiary() {
      const db: Firestore = getFirestore();

      // getDocs 함수에 위에 정의한 쿼리를 적용해서 모든 문서들을 가져온다.
      const yourCalendars = await getDocs(
        collection(db, `Calendars/${this.calendarID}/Posts`)
      );
      yourCalendars.forEach((doc) => {
        // 가져온 모든 문서들을 확인
        this.postList.push(doc.data()); //배열에 문서 데이터를 푸시
      });
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/pages/diary.css';
<<<<<<< HEAD
</style>


<!-- 다이어리 리스트들 중 하나를 클릭  - 모달과 오버레이에 active클래스로 화면에 나타나기 - 클릭한 아이템의 PostID로 도큐먼트 접근 -- 상세보기모달에 정보받아서 띄우기 -->
=======
</style>
>>>>>>> 1db605773ef36f33997639b0c4d1df759a45c142
