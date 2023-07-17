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
          <WritePost :class="{ active: isActive }" />
          <div class="diaryListWrap" @click="addPost()" :class="{ active: isActive }">
            <DiaryList class="diaryListasd" :class="{ active: !isActive }" :allDiary="postList" />
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
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";

export default {
  components: {
    SideBar,
    HeaderBar,
    DiaryList,
    CurrentUsers,
    WritePost
  },
  data() {
    return {
      isActive: false,
      postList: [] as any[],
      calendarID: this.$route.params.id
    }
  },
  created() {
    this.getDiary()
  },
  // computed: {
  //   calendarID() {
  //     return this.$route.params.id;
  //   }
  // },
  methods: {
    addPost() {
      this.isActive = true
    },

    //post 가져오기
    async getDiary() {
      const db: Firestore = getFirestore();
      // const q = query(collection(db, `${this.calendarID} / Posts`));

      // getDocs 함수에 위에 정의한 쿼리를 적용해서 모든 문서들을 가져온다.
      const querySnapshot = await getDocs(
        collection(db, `Calendars/${this.calendarID}/Posts`)
      );
      querySnapshot.forEach((doc) => {
        // 가져온 모든 문서들을 확인
        this.postList.push(doc.data()); //배열에 문서 데이터를 푸시
        console.log(this.postList);
      });
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/pages/diary.css';

.mainScreen {
  overflow: scroll;
}
</style>