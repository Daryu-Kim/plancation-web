<template>
  <div class="diaryList" v-for:="item in    allDiary   " :key="item.id">
    <div class="diaryContent" @click="$emit('diaryClick', item)">
      <div class="imageWrap">
        <div v-if="item.postImage === ''" class="nullPath">
          <p>{{ item.postContent }}</p>
        </div>
        <div v-else :style="{ 'background-image': `url(${item.postImage})` }" class="diaryImageBox">
        </div>
      </div>
      <div class="userInfo">
        <p class="fs_9">{{ item.postAuthorID }}</p>
        <!-- <p class="fs_9" style="display: none;">{{ findUser(item.postAuthorID) }}</p> -->
        <p class="fs_9">{{ userNickname }}</p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/plancation-74a7a.appspot.com/o/Apps%2Fdefault_user_image.png?alt=media&token=24c09b27-9fd8-4604-8900-3f9c16c14452"
          alt="유저이미지">
      </div>
      <div class="diaryText">
        <p class="diaryTitle fs_9">{{ item.postTitle }}</p>
        <p class="fs_9">{{ item.postTime.seconds }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";


export default {
  props: {
    //보유중인 캘린더의 정보
    allDiary: Object,
  },
  created() {
    console.log(this.allDiary);
    // this.findUser()
  },
  data() {
    return {
      userNickname: '',

    };
  },
  emits: ['diaryClick'],
  methods: {
    //다이어리 글쓴이와 일치하는 유저찾아 가져오기
    async findUser(user) {
      try {
        const db = getFirestore();
        const q = query(collection(db, "Users"), where("userID", "==", `${user}`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          const userName = doc.data().userName;
          console.log(doc.data().userName);
          return this.userNickname = userName
        });

      } catch (err) { console.log(err) }
    }

  }
}
</script>
<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/components/DiaryList.css';
</style>