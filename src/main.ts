import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC0lZ3Po28qt8JIaD4w_GJdgovseBcZyUw',
  authDomain: 'plancation-74a7a.firebaseapp.com',
  projectId: 'plancation-74a7a',
  storageBucket: 'plancation-74a7a.appspot.com',
  messagingSenderId: '33008958055',
  appId: '1:33008958055:web:91c5ab620dd69f6b6832c2',
  measurementId: 'G-07THDVQF70'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export const analytics = getAnalytics(firebaseApp)
const app = createApp(App)
const authService = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

app.use(createPinia())
app.use(router)

app.mount('#app')

//필요한 곳에서 사용할 수 있도록 내보내기
export { db, authService }
