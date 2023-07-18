// import Vue from 'vue'
import firebase from 'firebase'

// 사용할거 하나씩 import
import 'firebase/auth' // 사용자 인증
import 'firebase/firebase-database' // database
import firebaseConfig from '../../firebaseConfig'

// firebase.initializeApp(firebaseConfig)

// Vue.prototype.$firebase = firebase // 전역으로 사용하기 위함

firebase.initializeApp(firebaseConfig)

export default firebase
