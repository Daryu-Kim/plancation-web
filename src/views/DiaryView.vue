<template>
  <div class="diary">
    <div class="fixMenu">
      <!-- 사이드바 컴포넌트 (NAV메뉴,프로필)-->
      <SideBar class="fixSideBar" />
      <div class="fixHeaderBar">
        <!-- 헤더바 컴포넌트 (상단 헤더, 로고& 설정)-->
        <HeaderBar class="rightHeader" />
        <!-- 메인 화면 -->
        <div class="mainScreen">
          <div class="overlay" @click="isActivefalse()" :class="{ active: isActive }"></div>
          <!-- 👇해당 캘린더의 제목과 참여유저! -->
          <CurrentUsers @addClick="openWriteModal" />

          <!-- 👇showPostModal이 참일 때 클릭했을 때 뜨는 게시물 상세보기 모달 -->
          <!-- ⚪ @cancle= 닫기, @updateClick= 수정버튼 누르면 실행될 이벤트  -->
          <!--  1. diaryList에서 클릭한 게시물을 item으로 여기서 selectedPost으로 저장.
                2. selectedPost으로 가져온 Post게시물의 정보를 readPost로 상세보기 모달에 props 전달 -->
          <ReadDiaryModal v-if="showPostModal" :readPost="selectedPost" @cancle="isActivefalse"
            @updateClick="openUpdateModal" />

          <!-- 👇새글 작성 모달 -->
          <WritePost v-if="showWriteModal" :selectedPost="selectedPost" @cancle="isActivefalse" />

          <div class="diaryListWrap" :class="{ active: isActive }">
            <!-- 👇기록/다이어리 리스트 컴포넌트 -->
            <!-- ⚪ $emit으로 자식컴포넌트에서 부모컴포넌트에게 diaryClick이라는 클릭이벤트를 넘겨줌. -->
            <!-- ⚪ allDiary로 가져온 기록게시물 전부 props 전달하기 -->
            <DiaryList @diaryClick="openReadModal" :allDiary="postList" />
            <DiaryList @diaryClick="openReadModal" :allDiary="postList" />
            <DiaryList @diaryClick="openReadModal" :allDiary="postList" />
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
import ReadDiaryModal from '../components/ReadDiaryModal.vue'
import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";

export default {
  components: {
    SideBar,
    HeaderBar,
    DiaryList,
    CurrentUsers,
    WritePost,
    ReadDiaryModal,
  },

  //게시물 클릭이벤트, 게시물 추가버튼 클릭이벤트
  emits: ['diaryClick', 'addClick'],

  created() {
    this.getDiary()
  },

  data() {
    return {
      isActive: false, //오버레이
      postList: [] as any[], //현재 캘린더의 모든 Posts의 문서
      calendarID: this.$route.params.id, //현재 캘린더 id
      selectedPost: null, //클릭한 게시물
      showPostModal: false, //게시글 상세보기 모달
      showWriteModal: false //게시글 작성 모달
    }
  },

  methods: {
    // 게시글 상세보기 모달
    openReadModal(item) {
      this.isActive = true
      //item은 diaryList에서 현재 클릭한 기록문서
      this.selectedPost = item
      this.showPostModal = true;
      console.log(item)
    },

    // 게시글 작성 모달
    openWriteModal() {
      this.isActive = true
      this.showWriteModal = true
    },

    // 게시글 수정 모달
    openUpdateModal() {
      this.showPostModal = false
      this.showWriteModal = true
    },

    //취소눌렀을 때
    isActivefalse() {
      this.selectedPost = null //선택한 기록데이터 초기화
      this.isActive = false //오버레이 가리기
      this.showWriteModal = false //글작성 모달 없애기
      this.showPostModal = false //상세보기 모달 없애기
    },

    //현재 캘린더의 Posts내에 전체문서 가져오기
    async getDiary() {
      const db: Firestore = getFirestore();

      // getDocs 함수에 위에 정의한 쿼리를 적용해서 현재캘린더의 Posts의 모든 문서들을 가져온다.
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


<!-- 다이어리 리스트들 중 하나를 클릭  - 모달과 오버레이에 active클래스로 화면에 나타나기 - 클릭한 아이템의 PostID로 도큐먼트 접근 -- 상세보기모달에 정보받아서 띄우기 -->
