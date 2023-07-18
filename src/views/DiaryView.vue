<template>
  <div class="diary">
    <div class="fixMenu">
      <!-- 사이드바 컴포넌트 -->
      <SideBar class="fixSideBar" />
      <div class="fixHeaderBar">
        <!-- 헤더바 컴포넌트 -->
        <HeaderBar class="rightHeader" />
        <div class="mainScreen">
          <!-- 해당 캘린더의 제목과 참여유저! -->
          <CurrentUsers />
          <!-- 기록/다이어리 리스트 컴포넌트 -->
          <WritePost />
          <div class="diaryListWrap" :class="{ active: isActive }">
            <!-- 👇 $emit으로 자식컴포넌트에서 부모컴포넌트에게 diaryClick이라는 클릭이벤트를 넘겨줌. -->
            <DiaryList @diaryClick="isActiveTrue()" :allDiary="postList" />
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
import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";

export default {
  components: {
    SideBar,
    HeaderBar,
    DiaryList,
    CurrentUsers,
    WritePost
  },

  created() {
    this.getDiary()
  },

  data() {
    return {
      isActive: false,
      postList: [] as any[],
      calendarID: this.$route.params.id
    }
  },

  methods: {
    isActiveTrue() {
      this.isActive = true
    },

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
</style>