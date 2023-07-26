<template>
  <div class="diaryList" v-for:="item in  allDiary " :key="item.id">
    <!-- $emit으로 부모컴포넌트에게 클릭이벤트전달 :👇전달인자로 item(클릭한 그 문서데이터)도 같이 올리기-->
    <div class="diaryContent" @click="$emit('diaryClick', item)">
      <div class="imageWrap">
        <!-- 👇게시물에 사진이 없고 글만 있다면 ? -->
        <div v-if="item.postImage === ''" class="nullPath">
          <p>{{ item.postContent }}</p>
        </div>
        <!-- 그 외 사진이 있을 때에 ?-->
        <div v-else :style="{ 'background-image': `url(${item.postImage})` }" class="diaryImageBox">
        </div>
      </div>

      <div class="userInfo">
        <!-- <p class="fs_9">{{ item.postAuthorID }}</p> -->
        <p class="fs_9">유저닉네임</p>
        <div class="userImage" :style="{ 'background-image': `url(${item.postImage})` }">
        </div>
      </div>

      <!-- 리스트에 보일 제목과 타임스탬프(작성날짜) -->
      <div class="diaryText">
        <p class="diaryTitle fs_9">{{ item.postTitle }}</p>
        <p class="fs_9">{{ item.postTime.seconds }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// import { getFirestore, collection, deleteDoc, doc, } from "firebase/firestore";
// @click="$emit('diaryClick', item)"

export default {
  props: {
    //현재 캘린더의 Posts 문서 전부를 props받아온 것
    allDiary: Object,
  },
  created() {
    console.log(this.allDiary);
  },
  data() {
    return {
      userNickname: '',

    };
  },
  emits: ['diaryClick'],
  methods: {
    //다이어리 글쓴이와 일치하는 유저찾아 가져오기
    // async findUser(user) {
    //   try {
    //     const db = getFirestore();
    //     await getDoc(collection(db, `Users/${user}`))
    //       .then((doc: DocumentSnapshot) => {
    //         const userName = doc.data().userName;
    //         console.log(doc.data().userName);
    //         return this.userNickname = userName;
    //       })
    //       .catch((_) => {

    //       });

    //   } catch (err) { console.log(err) }
    // },

    // //캘린더 목록에서 선택하면 해당 캘린더로 페이지 넘어가기
    // goToCalendar(calendarID: string) {
    //   this.$router.push(`/calendar/${calendarID}`)
    // },
  }
}
</script>
<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/components/DiaryList.css';
</style>