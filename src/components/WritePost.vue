<template>
  <div class="writePost">
    <input v-bind:value="postTitle" v-on:input="setPostTitle" class="postTitle fs_14" type="text"
      placeholder="기록/다이어리 제목">
    <textarea v-bind:value="postContent" v-on:input="setPostContent" class="fs_14" name="" id="" cols="30" rows="10"
      placeholder="기록/다이어리 텍스트를 입력해주세요."></textarea>
    <input type="file" class="fs_14" accept="image/*" v-on:input="setPhotoURL">
    <button class="fs_14">취소</button>
    <button class="fs_14" @click="__addDiary()">기록에 등록</button>
  </div>
</template>

<script lang="ts">
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, Timestamp, updateDoc, doc } from "firebase/firestore";

export default {
  data() {
    return {
      postTitle: '',
      postContent: '',
      selectedPhoto: '' as any,
      photoURL: ''
      ,
      calendarList: [] as any[]
    }
  },
  methods: {
    //타이틀 값 받아내기
    setPostTitle(e: any) {
      var writeTitle = e.target.value;
      this.postTitle = writeTitle
    },

    //본문 글 값 받아내기
    setPostContent(e: any) {
      var writeContent = e.target.value;
      this.postContent = writeContent
    },

    //선택한 사진 값 받아내기
    setPhotoURL(e: any) {
      this.selectedPhoto = e.target.files[0]
    },

    //기록/다이어리 등록
    async __addDiary() {
      try {
        const auth = getAuth()
        const user: any = auth.currentUser
        const db = getFirestore();

        //랜덤 ID로 문서생성
        const docRef: any = await addDoc(collection(db, `Calendars/${this.$route.params.id}/Posts`), {
          postAuthorID: user.uid,
          postContent: this.postContent,
          postID: "",
          postImage: this.photoURL,
          postTime: Timestamp.fromDate(new Date()),
          postTitle: this.postTitle
        })

        //랜덤으로 받은 PostsID로 문서항목 postID를 업데이트
        const random = docRef.id

        //스토리지에 PostID로 random을 받은 경로로 이미지 업로드
        this.__uploadImage(random)

      } catch (err) {
        console.log(err)
      }
    },

    //파이어베이스 스토리지에 이미지 업로드
    async __uploadImage(postID) {
      //선택한 사진이 있다면?
      if (this.selectedPhoto) {
        try {
          const storage = getStorage()
          //Calendars- 현재 캘린더의 ID - Posts - postID - diaryImage.png
          const storageRef = ref(storage, `Calendars/${this.$route.params.id}/Posts/${postID}/diaryImage.png`)

          const response = await uploadBytes(storageRef, this.selectedPhoto)
          //storage에 담았던 이미지를 url로 받아와서 data에 담기
          const url = await getDownloadURL(response.ref)
          this.photoURL = url

          //가지고온 url로 postImage업데이트, 랜덤으로 받은 Posts아이디로 postID업데이트 
          this.updatePost(postID)
          return console.log(`스토리지 ${postID}에 이미지업로드 완료!`);
        }
        catch (err) { console.log(err) }
      } else {
        //선택한 사진이 없다면?
        this.updatePost(postID)
        return console.log(`이미지없음! 완료!`);
      }
    },

    // 파이어스토어에 Post 사진과 랜덤이름 업데이트
    async updatePost(postID) {
      const db = getFirestore();
      const thisPost = doc(db, `Calendars/${this.$route.params.id}/Posts/${postID}`);
      await updateDoc(thisPost, {
        postID: postID,
        postImage: this.photoURL
      });
      return console.log("지금 작성한 Post문서의 랜덤아이디 : ", postID);
    }
  }
}
</script>

<style lang="scss">
.writePost {
  width: 20rem;
  height: 20rem;
  display: none;

  &.active {
    display: block;
    display: flex;
    flex-direction: column;
  }

  // .postTitle {}
}
</style>
